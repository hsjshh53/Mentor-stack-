
import { ref, get, update, remove, set, serverTimestamp } from "firebase/database";
import { db, auth } from "../lib/firebase";

export interface ModerationStats {
  pending: number;
  published: number;
  deleted: number;
}

export const ModerationService = {
  /**
   * Publishes a lesson: Moves it to the public /lessons path and updates status
   */
  async publishLesson(skillId: string, lessonId: string) {
    const adminUid = auth.currentUser?.uid;
    if (!adminUid) throw new Error("Unauthorized");

    const sourceRef = ref(db, `ai_generated_lessons/${skillId}/${lessonId}`);
    const snap = await get(sourceRef);
    
    if (!snap.exists()) throw new Error("Lesson not found");
    
    const lessonData = snap.val();
    const publishedAt = Date.now();

    const updates: any = {};
    
    // 1. Move to public lessons path
    updates[`lessons/${skillId}/${lessonId}`] = {
      ...lessonData,
      status: "published",
      isPublished: true,
      reviewedBy: adminUid,
      publishedAt
    };

    // 2. Update status in moderation path
    updates[`ai_generated_lessons/${skillId}/${lessonId}/status`] = "published";
    updates[`ai_generated_lessons/${skillId}/${lessonId}/isPublished`] = true;
    updates[`ai_generated_lessons/${skillId}/${lessonId}/reviewedBy`] = adminUid;
    updates[`ai_generated_lessons/${skillId}/${lessonId}/publishedAt`] = publishedAt;

    await update(ref(db), updates);
    return { success: true };
  },

  /**
   * Soft deletes a lesson
   */
  async deleteLesson(skillId: string, lessonId: string) {
    const updates: any = {};
    updates[`ai_generated_lessons/${skillId}/${lessonId}/status`] = "deleted";
    updates[`lessons/${skillId}/${lessonId}`] = null; // Remove from public if it was there
    
    await update(ref(db), updates);
    return { success: true };
  },

  /**
   * Restores a deleted lesson to pending
   */
  async restoreLesson(skillId: string, lessonId: string) {
    await update(ref(db, `ai_generated_lessons/${skillId}/${lessonId}`), {
      status: "pending"
    });
  },

  /**
   * Hard delete from all paths
   */
  async hardDeleteLesson(skillId: string, lessonId: string) {
    const updates: any = {};
    updates[`ai_generated_lessons/${skillId}/${lessonId}`] = null;
    updates[`lessons/${skillId}/${lessonId}`] = null;
    await update(ref(db), updates);
  },

  /**
   * Bulk quality score calculation (Simulation for UI)
   */
  calculateQualityScore(lesson: any): number {
    let score = 70; // Base
    if (lesson.technicalExplanation?.length > 300) score += 10;
    if (lesson.codeExample || lesson.codeImplementation) score += 10;
    if (lesson.quiz && lesson.quiz.length >= 5) score += 10;
    return Math.min(score, 100);
  }
};
