import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { PathCurriculum, LessonContent, CareerPath, Roadmap, GenerationProgress } from '../types';
import { CURRICULUM } from '../constants/curriculum';
import { LESSON_CONTENT } from '../constants/lessons';

const CURRICULUM_COLLECTION = 'curriculum';
const LESSONS_COLLECTION = 'lessons';
const ROADMAPS_COLLECTION = 'roadmaps';
const PROGRESS_COLLECTION = 'generation_progress';

export const curriculumService = {
  // Roadmap Methods
  async saveRoadmap(roadmap: Roadmap) {
    await setDoc(doc(firestore, ROADMAPS_COLLECTION, roadmap.skillId), roadmap);
  },

  async getRoadmap(skillId: string): Promise<Roadmap | null> {
    const snap = await getDoc(doc(firestore, ROADMAPS_COLLECTION, skillId));
    return snap.exists() ? snap.data() as Roadmap : null;
  },

  // Generation Progress Methods
  async saveGenerationProgress(progress: GenerationProgress) {
    await setDoc(doc(firestore, PROGRESS_COLLECTION, progress.skillId), progress);
  },

  async getGenerationProgress(skillId: string): Promise<GenerationProgress | null> {
    const snap = await getDoc(doc(firestore, PROGRESS_COLLECTION, skillId));
    return snap.exists() ? snap.data() as GenerationProgress : null;
  },

  subscribeToGenerationProgress(skillId: string, callback: (progress: GenerationProgress | null) => void) {
    return onSnapshot(doc(firestore, PROGRESS_COLLECTION, skillId), (snap) => {
      callback(snap.exists() ? snap.data() as GenerationProgress : null);
    });
  },

  // Initialize Firestore with constant data if empty
  async initializeData() {
    const curriculumSnap = await getDocs(collection(firestore, CURRICULUM_COLLECTION));
    if (curriculumSnap.empty) {
      console.log('Initializing curriculum in Firestore...');
      for (const [path, data] of Object.entries(CURRICULUM)) {
        await setDoc(doc(firestore, CURRICULUM_COLLECTION, path), data);
      }
    }

    const lessonsSnap = await getDocs(collection(firestore, LESSONS_COLLECTION));
    if (lessonsSnap.empty) {
      console.log('Initializing lessons in Firestore...');
      for (const [id, data] of Object.entries(LESSON_CONTENT)) {
        await setDoc(doc(firestore, LESSONS_COLLECTION, id), data);
      }
    }
  },

  // Get all curriculum paths
  async getAllPaths(): Promise<PathCurriculum[]> {
    const snap = await getDocs(collection(firestore, CURRICULUM_COLLECTION));
    return snap.docs.map(doc => doc.data() as PathCurriculum);
  },

  // Subscribe to all paths
  subscribeToPaths(callback: (paths: PathCurriculum[]) => void) {
    return onSnapshot(collection(firestore, CURRICULUM_COLLECTION), (snap) => {
      callback(snap.docs.map(doc => doc.data() as PathCurriculum));
    });
  },

  // Update path status
  async updatePathStatus(path: string, status: PathCurriculum['status']) {
    await updateDoc(doc(firestore, CURRICULUM_COLLECTION, path), { status });
  },

  // Update path data
  async updatePath(path: string, data: Partial<PathCurriculum>) {
    await updateDoc(doc(firestore, CURRICULUM_COLLECTION, path), data);
  },

  // Get lessons for a module
  async getLessons(lessonIds: string[]): Promise<LessonContent[]> {
    if (lessonIds.length === 0) return [];
    
    const lessons: LessonContent[] = [];
    for (const id of lessonIds) {
      const snap = await getDoc(doc(firestore, LESSONS_COLLECTION, id));
      if (snap.exists()) {
        lessons.push(snap.data() as LessonContent);
      }
    }
    return lessons;
  },

  // Add/Update Lesson
  async saveLesson(lesson: LessonContent) {
    await setDoc(doc(firestore, LESSONS_COLLECTION, lesson.id), lesson);
  },

  // Publish Lesson (link to module)
  async publishLesson(lessonId: string, pathId: string, levelId: string, moduleId: string) {
    // 1. Update lesson status to published
    await updateDoc(doc(firestore, LESSONS_COLLECTION, lessonId), { status: 'published' });

    // 2. Add to curriculum path if not already there
    const pathSnap = await getDoc(doc(firestore, CURRICULUM_COLLECTION, pathId));
    if (pathSnap.exists()) {
      const pathData = pathSnap.data() as PathCurriculum;
      const level = pathData.levels[levelId as keyof typeof pathData.levels];
      if (level) {
        const module = level.modules.find(m => m.id === moduleId);
        if (module && !module.lessons.includes(lessonId)) {
          module.lessons.push(lessonId);
          await setDoc(doc(firestore, CURRICULUM_COLLECTION, pathId), pathData);
        }
      }
    }
  },

  // Delete Lesson
  async deleteLesson(lessonId: string, pathId: string, levelId: string, moduleId: string) {
    // 1. Delete from lessons collection
    await deleteDoc(doc(firestore, LESSONS_COLLECTION, lessonId));

    // 2. Remove from curriculum path
    const pathSnap = await getDoc(doc(firestore, CURRICULUM_COLLECTION, pathId));
    if (pathSnap.exists()) {
      const pathData = pathSnap.data() as PathCurriculum;
      const level = pathData.levels[levelId as keyof typeof pathData.levels];
      if (level) {
        const module = level.modules.find(m => m.id === moduleId);
        if (module) {
          module.lessons = module.lessons.filter(id => id !== lessonId);
          await setDoc(doc(firestore, CURRICULUM_COLLECTION, pathId), pathData);
        }
      }
    }
  }
};
