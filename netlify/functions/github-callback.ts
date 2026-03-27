import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  const { code } = event.queryStringParameters || {};
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing code parameter" }),
    };
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GitHub environment variables not configured" }),
    };
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json() as any;

    if (data.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.error_description || data.error }),
      };
    }

    // Return HTML that sends the token back to the opener window and closes itself
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <!DOCTYPE html>
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'GITHUB_AUTH_SUCCESS', 
                  accessToken: '${data.access_token}' 
                }, '*');
                window.close();
              } else {
                // Fallback if not in a popup
                window.location.href = '/dashboard';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to exchange code for token" }),
    };
  }
};
