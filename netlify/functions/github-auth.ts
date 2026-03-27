import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  
  if (!GITHUB_CLIENT_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GITHUB_CLIENT_ID is not configured" }),
    };
  }

  // Scopes: 
  // - 'repo' for creating and pushing to repositories
  // - 'user' for getting user info
  const scope = "repo user";
  const redirectUri = "https://mentorstackai.netlify.app/.netlify/functions/github-callback";
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return {
    statusCode: 302,
    headers: {
      Location: githubAuthUrl,
      "Cache-Control": "no-cache",
    },
    body: "",
  };
};
