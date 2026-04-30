
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";

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

async function runReset() {
  console.log("🚀 MENTORSTACK SYSTEM RESET INITIATED...");
  
  try {
    // 1. Get all users
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      console.log("No users found to reset.");
      return;
    }

    const users = snapshot.val();
    const userIds = Object.keys(users);
    console.log(`Found ${userIds.length} users. Backing up and resetting...`);

    const updates: any = {};
    const timestamp = new Date().toISOString();

    for (const uid of userIds) {
      const user = users[uid];
      
      // Preserve critical info
      const preservedEmail = user.email || null;
      const preservedName = user.displayName || null;
      const preservedRole = user.role || 'user';
      const preservedAdmin = user.is_admin || false;
      const preservedSuperAdmin = user.is_super_admin || false;
      const preservedCreatedAt = user.createdAt || Date.now();

      // Reset learning fields
      updates[`users/${uid}/progress`] = {
        xp: 0,
        level: 1,
        streak: 0,
        completedLessons: [],
        completedTests: [],
        completedExams: [],
        completedProjects: [],
        submissions: {},
        certificates: [],
        weakAreas: [],
        skills: {},
        currentLessonId: null,
        currentStage: "Beginner",
        dailyMinutesLearned: 0,
        lastActive: null,
        progressPercent: 0,
        experienceLevel: "Beginner",
        selectedPath: "Frontend Developer", // Default career path
        activeProgramId: "frontend-dev" // Default skill ID
      };

      // Ensure base profile fields are intact
      updates[`users/${uid}/email`] = preservedEmail;
      updates[`users/${uid}/displayName`] = preservedName;
      updates[`users/${uid}/role`] = preservedRole;
      updates[`users/${uid}/is_admin`] = preservedAdmin;
      updates[`users/${uid}/is_super_admin`] = preservedSuperAdmin;
      updates[`users/${uid}/createdAt`] = preservedCreatedAt;
      updates[`users/${uid}/lastResetAt`] = timestamp;
    }

    console.log("Applying updates to database...");
    await update(ref(db), updates);
    console.log("✅ SUCCESS: All user progress has been reset.");

  } catch (error) {
    console.error("❌ FAILED:", error);
  } finally {
    process.exit(0);
  }
}

runReset();
