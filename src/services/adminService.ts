import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  setDoc,
  deleteDoc,
  Timestamp,
  increment
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserProjectProgress, LessonContent, Certificate } from "../types";

export const adminService = {
  // Stats
  getStats: async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const projectsSnapshot = await getDocs(collection(db, "projects")); // This might need a different collection if projects are global
    const certsSnapshot = await getDocs(collection(db, "certificates"));
    
    // For a real app, we'd use a stats document that increments on triggers
    // but for now we'll count snapshots
    return {
      totalUsers: usersSnapshot.size,
      activeLearners: usersSnapshot.size, // Placeholder
      lessonsCompleted: 0, // Placeholder
      projectsSubmitted: 0, // Placeholder
      certificatesIssued: certsSnapshot.size,
    };
  },

  // Users
  getAllUsers: async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  updateUserStatus: async (userId: string, suspended: boolean) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { suspended });
  },

  resetUserProgress: async (userId: string) => {
    const progressRef = doc(db, "users", userId, "progress", "data");
    await updateDoc(progressRef, {
      completedLessons: [],
      completedTests: [],
      completedExams: [],
      xp: 0,
      level: 1,
      streak: 0
    });
  },

  // Curriculum
  getSkills: async () => {
    const querySnapshot = await getDocs(collection(db, "curriculum", "skills", "list"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  updateSkillStatus: async (skillId: string, status: 'active' | 'in_progress' | 'coming_soon') => {
    const skillRef = doc(db, "curriculum", "skills", "list", skillId);
    await setDoc(skillRef, { status }, { merge: true });
  },

  // Lessons
  getAllLessons: async () => {
    const querySnapshot = await getDocs(collection(db, "curriculum", "lessons", "content"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  deleteLesson: async (lessonId: string) => {
    await deleteDoc(doc(db, "curriculum", "lessons", "content", lessonId));
  },

  // Projects
  getAllSubmissions: async () => {
    // This would typically query a global submissions collection
    const querySnapshot = await getDocs(collection(db, "submissions"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Announcements
  getAnnouncements: async () => {
    const querySnapshot = await getDocs(query(collection(db, "announcements"), orderBy("createdAt", "desc")));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  createAnnouncement: async (announcement: any) => {
    const docRef = doc(collection(db, "announcements"));
    await setDoc(docRef, {
      ...announcement,
      createdAt: Timestamp.now()
    });
  },

  // Settings
  getSettings: async () => {
    const docRef = doc(db, "settings", "global");
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : {};
  },

  updateSettings: async (settings: any) => {
    const docRef = doc(db, "settings", "global");
    await setDoc(docRef, settings, { merge: true });
  }
};
