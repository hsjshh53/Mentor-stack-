
import { ref, get, update } from "firebase/database";
import { db } from "./src/lib/firebase";
import { calculateLessonScore, getStatusFromScore } from "./src/lib/qualitySystem";

async function scoreAllLessons() {
  console.log("Starting full system lesson audit and scoring...");

  // 1. Audit AI Generated Pool
  const aiRef = ref(db, 'ai_generated_lessons');
  const aiSnap = await get(aiRef);
  
  if (aiSnap.exists()) {
    const skills = aiSnap.val();
    for (const skillId in skills) {
        console.log(`Auditing AI Pool for Skill: ${skillId}`);
        const lessons = skills[skillId];
        const updates: any = {};
        
        for (const lessonId in lessons) {
            const lesson = lessons[lessonId];
            const { score, metrics } = calculateLessonScore(lesson);
            updates[`${lessonId}/score`] = score;
            updates[`${lessonId}/qualityMetrics`] = metrics;
            
            // If it was rejected or pending, we might update status based on score
            if (lesson.status === 'draft_generated' || lesson.status === 'pending' || !lesson.status) {
                updates[`${lessonId}/status`] = getStatusFromScore(score);
            }
        }
        
        if (Object.keys(updates).length > 0) {
            await update(ref(db, `ai_generated_lessons/${skillId}`), updates);
        }
    }
  }

  // 2. Audit Main Approved Lessons
  const mainRef = ref(db, 'lessons');
  const mainSnap = await get(mainRef);
  
  if (mainSnap.exists()) {
    console.log("Auditing Live Approved Lessons...");
    const lessons = mainSnap.val();
    const updates: any = {};
    
    for (const lessonId in lessons) {
        const lesson = lessons[lessonId];
        const { score, metrics } = calculateLessonScore(lesson);
        updates[`${lessonId}/score`] = score;
        updates[`${lessonId}/qualityMetrics`] = metrics;
    }
    
    if (Object.keys(updates).length > 0) {
        await update(mainRef, updates);
    }
  }

  console.log("Full system audit and scoring complete.");
  process.exit(0);
}

scoreAllLessons().catch(err => {
    console.error(err);
    process.exit(1);
});
