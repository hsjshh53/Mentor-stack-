import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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

export const sanitizeFirebaseKey = (key: string): string => {
  if (!key) return '';
  return key
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[.#$[\]\/]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};
