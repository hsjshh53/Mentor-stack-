import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const { repoName, username, files, accessToken, commitMessage } = JSON.parse(event.body || "{}");

  if (!repoName || !username || !files || !accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameters" }),
    };
  }

  const results = [];
  const fileList = [
    { path: "index.html", content: files.html },
    { path: "style.css", content: files.css },
    { path: "script.js", content: files.js },
  ];

  try {
    for (const file of fileList) {
      if (file.content === undefined) continue;

      // 1. Check if file exists to get SHA
      const getFileResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${file.path}`, {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let sha;
      if (getFileResponse.status === 200) {
        const fileData = await getFileResponse.json() as any;
        sha = fileData.sha;
      }

      // 2. Create or update file
      const putFileResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${file.path}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage || `Update ${file.path} from OLYNQ Stack`,
          content: Buffer.from(file.content).toString("base64"),
          sha,
        }),
      });

      const putData = await putFileResponse.json();
      results.push({ path: file.path, status: putFileResponse.status, data: putData });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to push files to GitHub" }),
    };
  }
};
