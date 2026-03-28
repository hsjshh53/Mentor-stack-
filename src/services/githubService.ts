import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { GithubConnection, GithubRepoMetadata } from "../types";

const FUNCTIONS_BASE_URL = "/.netlify/functions";

export const githubService = {
  // Connect GitHub (Triggers OAuth flow)
  connectGithub: async (userId: string): Promise<GithubConnection | null> => {
    return new Promise((resolve, reject) => {
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

      const handleMessage = async (event: MessageEvent) => {
        if (event.data?.type === 'GITHUB_AUTH_SUCCESS' && event.data?.accessToken) {
          window.removeEventListener('message', handleMessage);
          
          try {
            const accessToken = event.data.accessToken;
            const userResponse = await fetch(`${FUNCTIONS_BASE_URL}/github-user?accessToken=${accessToken}`);
            if (!userResponse.ok) throw new Error('Failed to fetch GitHub user info');
            
            const userData = await userResponse.json();
            
            const connection: GithubConnection = {
              accessToken,
              username: userData.username,
              avatarUrl: userData.avatarUrl,
              connectedAt: Date.now()
            };
            
            const connectionRef = doc(db, 'users', userId);
            await setDoc(connectionRef, { githubConnection: connection }, { merge: true });
            
            resolve(connection);
          } catch (error) {
            reject(error);
          }
        }
      };

      window.addEventListener('message', handleMessage);

      const checkClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);
    });
  },

  // Get GitHub connection
  getGithubConnection: async (userId: string): Promise<GithubConnection | null> => {
    const path = `users/${userId}`;
    try {
      const connectionRef = doc(db, 'users', userId);
      const snapshot = await getDoc(connectionRef);
      return snapshot.exists() ? snapshot.data()?.githubConnection : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  // Disconnect GitHub
  disconnectGithub: async (userId: string) => {
    const path = `users/${userId}`;
    try {
      const connectionRef = doc(db, 'users', userId);
      await setDoc(connectionRef, { githubConnection: null }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
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
        commitMessage: `Update from MentorStack Playground - ${new Date().toLocaleString()}`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to push files to GitHub');
    }

    const data = await response.json();

    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      const metadata: GithubRepoMetadata = {
        repoName,
        repoUrl: `https://github.com/` + connection.username + `/` + repoName,
        publishedAt: Date.now(),
        lastSyncedAt: Date.now(),
        publishStatus: 'published'
      };
      
      await setDoc(projectRef, { githubMetadata: metadata }, { merge: true });
      return metadata;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      return null;
    }
  },

  // Subscribe to connection
  subscribeToConnection: (userId: string, callback: (connection: GithubConnection | null) => void) => {
    const path = `users/${userId}`;
    const connectionRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(connectionRef, (snapshot) => {
      callback(snapshot.data()?.githubConnection || null);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return unsubscribe;
  }
};
