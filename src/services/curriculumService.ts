import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { LessonContent } from "../types/index";

export const saveGeneratedLesson = async (skill: string, level: string, lessonNumber: number, content: LessonContent) => {
  const lessonId = `lesson-${skill.toLowerCase().replace(/\s+/g, '-')}-${level.toLowerCase()}-${lessonNumber}`;
  const lessonRef = doc(db, "curriculum", "lessons", "items", lessonId);
  await setDoc(lessonRef, {
    ...content,
    skill,
    level,
    lessonNumber,
    updatedAt: new Date().toISOString()
  });
  return lessonId;
};

export const getSavedLesson = async (skill: string, level: string, lessonNumber: number): Promise<LessonContent | null> => {
  const lessonId = `lesson-${skill.toLowerCase().replace(/\s+/g, '-')}-${level.toLowerCase()}-${lessonNumber}`;
  const lessonRef = doc(db, "curriculum", "lessons", "items", lessonId);
  const snapshot = await getDoc(lessonRef);
  if (snapshot.exists()) {
    return snapshot.data() as LessonContent;
  }
  return null;
};

export const updateSkillStatus = async (skill: string, status: 'coming-soon' | 'in-progress' | 'completed') => {
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  const skillRef = doc(db, "curriculum", "skills", "items", skillId);
  await setDoc(skillRef, {
    name: skill,
    status,
    updatedAt: new Date().toISOString()
  });
};

export const getSkillStatuses = async () => {
  const skillsRef = collection(db, "curriculum", "skills", "items");
  const snapshot = await getDocs(skillsRef);
  const statuses: Record<string, any> = {};
  snapshot.forEach((doc) => {
    statuses[doc.id] = doc.data();
  });
  return statuses;
};
