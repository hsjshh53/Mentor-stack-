import { ref, set, get, update, onValue, off } from "firebase/database";
import { db } from "../lib/firebase";
import { GithubConnection, GithubRepoMetadata } from "../types";

const FUNCTIONS_BASE_URL = "/.netlify/functions";

export const githubService = {
  // Connect GitHub (Triggers OAuth flow)
  connectGithub: async (userId: string): Promise<GithubConnection | null> => {
    return new Promise((resolve, reject) => {
      // 1. Open OAuth popup
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        `${FUNCTIONS_BASE_URL}/github-auth`,
        'github_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!authWindow) {
        reject(new Error('Popup blocked. Please allow popups for this site.'));
        return;
      }

      // 2. Listen for message from popup
      const handleMessage = async (event: MessageEvent) => {
        // Validate origin if possible, but '*' is often used for these popups
        if (event.data?.type === 'GITHUB_AUTH_SUCCESS' && event.data?.accessToken) {
          window.removeEventListener('message', handleMessage);
          
          try {
            const accessToken = event.data.accessToken;
            
            // 3. Fetch user info to confirm connection
            const userResponse = await fetch(`${FUNCTIONS_BASE_URL}/github-user?accessToken=${accessToken}`);
            if (!userResponse.ok) throw new Error('Failed to fetch GitHub user info');
            
            const userData = await userResponse.json();
            
            const connection: GithubConnection = {
              accessToken,
              username: userData.username,
              avatarUrl: userData.avatarUrl,
              connectedAt: Date.now()
            };
            
            // 4. Save connection to Firebase
            const connectionRef = ref(db, `users/${userId}/githubConnection`);
            await set(connectionRef, connection);
            
            resolve(connection);
          } catch (error) {
            reject(error);
          }
        }
      };

      window.addEventListener('message', handleMessage);

      // 3. Check if window is closed without success
      const checkClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          // We don't reject here because the message might have been sent just before closing
        }
      }, 1000);
    });
  },

  // Get GitHub connection
  getGithubConnection: async (userId: string): Promise<GithubConnection | null> => {
    const connectionRef = ref(db, `users/${userId}/githubConnection`);
    const snapshot = await get(connectionRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // Disconnect GitHub
  disconnectGithub: async (userId: string) => {
    const connectionRef = ref(db, `users/${userId}/githubConnection`);
    await set(connectionRef, null);
  },

  // Create Repository
  createRepo: async (userId: string, name: string, isPrivate: boolean) => {
    const connection = await githubService.getGithubConnection(userId);
    if (!connection) throw new Error('GitHub not connected');

    const response = await fetch(`${FUNCTIONS_BASE_URL}/github-create-repo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isPrivate,
        accessToken: connection.accessToken
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create repository');
    }

    return await response.json();
  },

  // Publish to GitHub
  publishToGithub: async (userId: string, projectId: string, repoName: string, files: any) => {
    const connection = await githubService.getGithubConnection(userId);
    if (!connection) throw new Error('GitHub not connected');

    const response = await fetch(`${FUNCTIONS_BASE_URL}/github-push-files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repoName,
        username: connection.username,
        files,
        accessToken: connection.accessToken,
        commitMessage: `Update from OLYNQ Stack Playground - ${new Date().toLocaleString()}`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to push files to GitHub');
    }

    const data = await response.json();

    // Save metadata to Firebase
    const metadataRef = ref(db, `users/${userId}/projects/${projectId}/githubMetadata`);
    const metadata: GithubRepoMetadata = {
      repoName,
      repoUrl: `https://github.com/` + connection.username + `/` + repoName,
      publishedAt: Date.now(),
      lastSyncedAt: Date.now(),
      publishStatus: 'published'
    };
    
    await set(metadataRef, metadata);
    return metadata;
  },

  // Subscribe to connection
  subscribeToConnection: (userId: string, callback: (connection: GithubConnection | null) => void) => {
    const connectionRef = ref(db, `users/${userId}/githubConnection`);
    onValue(connectionRef, (snapshot) => {
      callback(snapshot.val());
    });
    return () => off(connectionRef);
  }
};
