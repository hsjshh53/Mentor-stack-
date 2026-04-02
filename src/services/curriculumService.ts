import { ref, get, set } from 'firebase/database';
import { db } from '../lib/firebase';
import { PathCurriculum } from '../types';

export const getCurriculum = async (skillId: string): Promise<PathCurriculum | null> => {
  try {
    const roadmapRef = ref(db, `roadmaps/${skillId}`);
    const snapshot = await get(roadmapRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return null;
  }
};

export const saveCurriculum = async (skillId: string, curriculum: PathCurriculum): Promise<void> => {
  const roadmapRef = ref(db, `roadmaps/${skillId}`);
  await set(roadmapRef, {
    ...curriculum,
    updatedAt: Date.now()
  });
};

export const curriculumService = {
  getCurriculum,
  saveCurriculum
};

export default curriculumService;
