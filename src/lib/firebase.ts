import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeFirestore, getDocFromServer, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo1USpFDXZe6ysNGq5ZRCx90BcB1KZYtM",
  authDomain: "nexus-social-51352.firebaseapp.com",
  databaseURL: "https://nexus-social-51352-default-rtdb.firebaseio.com",
  projectId: "nexus-social-51352",
  storageBucket: "nexus-social-51352.firebasestorage.app",
  messagingSenderId: "464011180094",
  appId: "1:464011180094:web:c3def27c6533868417396f",
  measurementId: "G-50GSERB7HY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// Use initializeFirestore with experimentalForceLongPolling for better reliability in iframes
export const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Critical: Test connection to Firestore to diagnose "client is offline" issues
async function testConnection() {
  try {
    console.log("Firebase: Testing Firestore connection...");
    await getDocFromServer(doc(firestore, 'test', 'connection'));
    console.log("Firebase: Firestore connection successful");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase: Firestore connection failed - the client is offline. This usually indicates an incorrect configuration.");
    } else {
      // Skip logging for other errors (like "not found" or "permission denied") as this is just a connection test
      console.log("Firebase: Firestore connection test completed (non-offline error)");
    }
  }
}

testConnection();
