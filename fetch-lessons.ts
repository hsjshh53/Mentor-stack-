
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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
const db = getDatabase(app);

async function fetchLessons() {
  try {
    const publishedRef = ref(db, "lessons");
    const aiPoolRef = ref(db, "ai_generated_lessons");

    const [publishedSnap, aiPoolSnap] = await Promise.all([
      get(publishedRef),
      get(aiPoolRef)
    ]);

    const published = publishedSnap.exists() ? publishedSnap.val() : {};
    const aiPool = aiPoolSnap.exists() ? aiPoolSnap.val() : {};

    console.log(JSON.stringify({ published, aiPool }, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fetchLessons();
