import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { PathProgress, UserProgress } from '../types';

export const ProgressionService = {
  /**
   * Calculates the true progress percentage for a given path based on published lessons.
   */
  async calculateTrueProgress(userId: string, pathId: string): Promise<{ percent: number, completedCount: number, totalCount: number }> {
    try {
      // 1. Get all published lessons for this path
      const lessonsRef = ref(db, `lessons/${pathId}`);
      const lessonsSnap = await get(lessonsRef);
      
      if (!lessonsSnap.exists()) {
        return { percent: 0, completedCount: 0, totalCount: 0 };
      }

      const allLessons = lessonsSnap.val();
      const publishedLessons = Object.values(allLessons).filter((l: any) => l.isPublished || l.status === 'published');
      const totalCount = publishedLessons.length;

      if (totalCount === 0) return { percent: 0, completedCount: 0, totalCount: 0 };

      // 2. Get user's completed lessons for this path
      const progressRef = ref(db, `users/${userId}/progress/completedLessons`);
      const completedSnap = await get(progressRef);
      const completedLessonIds: string[] = completedSnap.exists() ? completedSnap.val() : [];

      // Only count completed lessons that are actually in this path
      const publishedIds = publishedLessons.map((l: any) => l.id || l.lessonId);
      const completedInPath = completedLessonIds.filter(id => publishedIds.includes(id));
      const completedCount = completedInPath.length;

      const percent = Math.round((completedCount / totalCount) * 100);

      return { percent, completedCount, totalCount };
    } catch (err) {
      console.error("[ProgressionService] Error calculating progress:", err);
      return { percent: 0, completedCount: 0, totalCount: 0 };
    }
  },

  /**
   * Syncs the isolated path progress with the global progress
   */
  async syncPathStats(userId: string, pathId: string) {
    const { percent, completedCount, totalCount } = await this.calculateTrueProgress(userId, pathId);
    
    const pathRef = ref(db, `users/${userId}/paths/${pathId}`);
    await update(pathRef, {
      progressPercent: percent,
      completedLessonsCount: completedCount,
      totalLessons: totalCount,
      lastSyncedAt: Date.now()
    });

    return { percent, completedCount, totalCount };
  },

  /**
   * Resets all learning progress for a user while keeping account/subscription intact.
   */
  async resetLearningProgress(userId: string, selectedPath: string, firstLessonId: string | null) {
    try {
      const progressRef = ref(db, `users/${userId}/progress`);
      
      const resetData = {
        completedLessons: [],
        completedTests: [],
        completedExams: [],
        completedProjects: [],
        progressPercent: 0,
        currentLessonId: firstLessonId || null,
        xp: 0,
        level: 1,
        streak: 0,
        weakAreas: [],
        skills: {},
        lastResetAt: Date.now()
      };

      await update(progressRef, resetData);

      // Reset path-specific records if they exist
      const pathsRef = ref(db, `users/${userId}/paths`);
      const pathsSnap = await get(pathsRef);
      if (pathsSnap.exists()) {
        const paths = pathsSnap.val();
        const pathUpdates: any = {};
        Object.keys(paths).forEach(pathId => {
          pathUpdates[`${pathId}/progressPercent`] = 0;
          pathUpdates[`${pathId}/completedLessonsCount`] = 0;
          pathUpdates[`${pathId}/completedLessons`] = [];
          if (paths[pathId].pathName === selectedPath) {
             pathUpdates[`${pathId}/currentLessonId`] = firstLessonId || null;
          }
        });
        await update(pathsRef, pathUpdates);
      }

      // Log activity
      const logRef = push(ref(db, `activity_logs`));
      await set(logRef, {
        userId,
        action: 'RESET_LEARNING_PROGRESS',
        selectedPath,
        timestamp: Date.now(),
        details: 'User manually reset their entire learning journey.'
      });

      return { success: true };
    } catch (err) {
      console.error("[ProgressionService] Reset Error:", err);
      throw err;
    }
  }
};

import { update, set, push } from 'firebase/database';
