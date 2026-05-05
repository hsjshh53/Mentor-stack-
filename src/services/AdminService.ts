
import { ref, get, update, set } from "firebase/database";
import { db } from "../lib/firebase";
import { UserProgress } from "../types";

export const performFullSystemReset = async () => {
  console.log("🚀 OLYNQ STACK SYSTEM RESET INITIATED (ADMIN CONTEXT)...");
  
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      return { success: true, count: 0, message: "No users found to reset." };
    }

    const users = snapshot.val();
    const userIds = Object.keys(users);
    const timestamp = new Date().toISOString();
    const updates: any = {};

    for (const uid of userIds) {
      const user = users[uid];
      
      // Reset only learning fields
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
        selectedPath: "Frontend Developer",
        activeProgramId: "frontend-dev",
        unlockedPaths: ["Frontend Developer", "Full-Stack Developer"]
      };

      // Log reset metadata
      updates[`users/${uid}/lastSystemResetAt`] = timestamp;
    }

    await update(ref(db), updates);
    return { success: true, count: userIds.length, message: `Successfully reset ${userIds.length} users.` };

  } catch (error: any) {
    console.error("❌ SYSTEM RESET FAILED:", error);
    throw new Error(error.message);
  }
};
