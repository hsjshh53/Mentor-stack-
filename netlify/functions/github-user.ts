import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  const { accessToken } = event.queryStringParameters || {};

  if (!accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing access token" }),
    };
  }

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await response.json() as any;

    if (response.status !== 200) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || "Failed to fetch user info" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        username: data.login,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch GitHub user info" }),
    };
  }
};
