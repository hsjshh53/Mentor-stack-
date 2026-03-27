import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const { name, isPrivate, accessToken } = JSON.parse(event.body || "{}");

  if (!name || !accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameters" }),
    };
  }

  try {
    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        private: isPrivate,
        auto_init: true, // Initialize with a README
      }),
    });

    const data = await response.json() as any;

    if (response.status !== 201) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || "Failed to create repository" }),
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create repository" }),
    };
  }
};
