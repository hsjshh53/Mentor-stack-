
import { ref, get, update, set } from "firebase/database";
import { db } from "../lib/firebase";
import { UserProgress, CareerPath, CurriculumLesson, CurriculumModule, CurriculumPath, CurriculumStage } from "../types";

const DEFAULT_PATH: CareerPath = "Frontend Developer";
const DEFAULT_PROGRAM_ID = "frontend-dev";

let onboardingCache = new Set<string>();

export const OnboardingService = {
  /**
   * Main entry point for onboarding/self-healing.
   * Checks if user progress is valid and fixes it if not.
   */
  async ensureUserOnboarding(uid: string, currentProgress: any = null): Promise<UserProgress> {
    // 💡 GLOBAL SAFETY GUARD
    if (onboardingCache.has(uid)) {
      console.warn(`[OnboardingService] Bypass: Onboarding already active for ${uid}`);
      return currentProgress;
    }

    // ⛔ RULES: Run onboarding ONLY IF not completed and not locked
    if (currentProgress?.onboardingCompleted || currentProgress?.profileLocked) {
      console.log(`[OnboardingService] Bypass: User ${uid} already onboarded.`);
      return currentProgress;
    }

    onboardingCache.add(uid);

    try {
      console.log(`[OnboardingService] Validating university enrollment for user: ${uid}`);
      
      let finalProgress: UserProgress;

      // 1. If no progress, create fresh university start
      if (!currentProgress || Object.keys(currentProgress).length === 0) {
        finalProgress = await this.initializeFreshProgress(uid);
      } else {
        // 2. Validate essential fields (STRICT MODE)
        const needsRepair = 
          !currentProgress.selectedPath || 
          !currentProgress.activeProgramId ||
          currentProgress.xp === undefined ||
          !currentProgress.currentStage ||
          (currentProgress.completedLessons && !Array.isArray(currentProgress.completedLessons));

        if (needsRepair) {
          console.log(`[OnboardingService] Repairing curriculum access for user: ${uid}`);
          finalProgress = await this.repairProgress(uid, currentProgress);
        } else if (!currentProgress.currentLessonId) {
          // 3. Ensure currentLessonId is active for Phase 0
          console.log(`[OnboardingService] Assigning Mandatory Phase 0 Lesson...`);
          finalProgress = await this.assignFirstLesson(uid, currentProgress);
        } else {
          finalProgress = currentProgress as UserProgress;
        }
      }

      // ✅ AFTER successful onboarding: Hard stop flags
      console.log(`[OnboardingService] Locking profile for ${uid}...`);
      const completionUpdates = {
        onboardingCompleted: true,
        profileLocked: true,
        onboardingVersion: 1,
        onboardingCompletedAt: Date.now()
      };

      await update(ref(db, `users/${uid}/progress`), completionUpdates);
      
      return { ...finalProgress, ...completionUpdates };

    } finally {
      onboardingCache.delete(uid);
    }
  },

  /**
   * Initializes a brand new progress object
   */
  async initializeFreshProgress(uid: string): Promise<UserProgress> {
    const timestamp = new Date().toISOString();
    
    const freshProgress: UserProgress = {
      selectedPath: DEFAULT_PATH,
      activeProgramId: "html-css", // Default language/skill
      currentStage: "Beginner",
      xp: 0,
      level: 1,
      streak: 0,
      lastActive: timestamp,
      completedLessons: [],
      completedTests: [],
      completedExams: [],
      completedProjects: [],
      submissions: {},
      certificates: [],
      weakAreas: [],
      skills: {},
      unlockedPaths: [DEFAULT_PATH],
      experienceLevel: "Beginner",
      dailyGoal: 50,
      dailyGoalMinutes: 20,
      currentLessonId: null
    };

    // Find first lesson for the default skill
    const firstLessonId = await this.getFirstLessonForPath("html-css");
    if (firstLessonId) {
      freshProgress.currentLessonId = firstLessonId;
    }

    await set(ref(db, `users/${uid}/progress`), freshProgress);
    return freshProgress;
  },

  /**
   * Repairs an existing progress object without overwriting completions
   */
  async repairProgress(uid: string, current: any): Promise<UserProgress> {
    const timestamp = new Date().toISOString();
    
    const repaired: UserProgress = {
      ...current,
      selectedPath: current.selectedPath || DEFAULT_PATH,
      activeProgramId: current.activeProgramId || "html-css",
      currentStage: current.currentStage || "Beginner",
      xp: current.xp ?? 0,
      level: current.level ?? 1,
      streak: current.streak ?? 0,
      lastActive: current.lastActive || timestamp,
      completedLessons: Array.isArray(current.completedLessons) ? current.completedLessons : [],
      completedTests: Array.isArray(current.completedTests) ? current.completedTests : [],
      completedExams: Array.isArray(current.completedExams) ? current.completedExams : [],
      completedProjects: Array.isArray(current.completedProjects) ? current.completedProjects : [],
      submissions: current.submissions || {},
      certificates: Array.isArray(current.certificates) ? current.certificates : [],
      weakAreas: Array.isArray(current.weakAreas) ? current.weakAreas : [],
      skills: current.skills || {},
      unlockedPaths: Array.isArray(current.unlockedPaths) ? current.unlockedPaths : [DEFAULT_PATH],
      experienceLevel: current.experienceLevel || "Beginner",
      dailyGoal: current.dailyGoal || 50,
      dailyGoalMinutes: current.dailyGoalMinutes || 20,
      currentLessonId: current.currentLessonId || null
    };

    if (!repaired.currentLessonId) {
      const firstId = await this.getFirstLessonForPath(repaired.activeProgramId as string);
      if (firstId) repaired.currentLessonId = firstId;
    }

    await set(ref(db, `users/${uid}/progress`), repaired);
    return repaired;
  },

  /**
   * Specifically handles assigning the first lesson if missing
   */
  async assignFirstLesson(uid: string, current: UserProgress): Promise<UserProgress> {
    const firstId = await this.getFirstLessonForPath(current.activeProgramId as string);
    if (firstId) {
      const updates = { currentLessonId: firstId };
      await update(ref(db, `users/${uid}/progress`), updates);
      return { ...current, ...updates };
    }
    return current;
  },

  /**
   * Curriculum traversal logic to find the very first lesson
   */
  async getFirstLessonForPath(skillId: string): Promise<string | null> {
    try {
      // 1. Get Curriculum Paths for this skill
      const pathsRef = ref(db, 'curriculum_paths');
      const pathsSnap = await get(pathsRef);
      if (!pathsSnap.exists()) return null;

      const paths = pathsSnap.val();
      const pathId = Object.keys(paths).find(id => paths[id].skillId === skillId);
      if (!pathId) return null;

      // 2. Get Stages for this path
      const stagesRef = ref(db, 'curriculum_stages');
      const stagesSnap = await get(stagesRef);
      if (!stagesSnap.exists()) return null;

      const stages = stagesSnap.val();
      const stageId = Object.keys(stages)
        .filter(id => stages[id].curriculumPathId === pathId)
        .sort((a, b) => (stages[a].order || 0) - (stages[b].order || 0))[0];

      if (!stageId) return null;

      // 3. Get Modules for this stage
      const modulesRef = ref(db, 'curriculum_modules');
      const modulesSnap = await get(modulesRef);
      if (!modulesSnap.exists()) return null;

      const modules = modulesSnap.val();
      const moduleId = Object.keys(modules)
        .filter(id => modules[id].stageId === stageId)
        .sort((a, b) => (modules[a].order || 0) - (modules[b].order || 0))[0];

      if (!moduleId) return null;

      // 4. Get Lessons for this module
      const lessonsRef = ref(db, 'curriculum_lessons');
      const lessonsSnap = await get(lessonsRef);
      if (!lessonsSnap.exists()) return null;

      const lessons = lessonsSnap.val();
      const lessonId = Object.keys(lessons)
        .filter(id => lessons[id].moduleId === moduleId)
        .sort((a, b) => (lessons[a].order || 0) - (lessons[b].order || 0))[0];

      return lessonId || null;

    } catch (error) {
      console.error("[OnboardingService] Error finding first lesson:", error);
      return null;
    }
  }
};
