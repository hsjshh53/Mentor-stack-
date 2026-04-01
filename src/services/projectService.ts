import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserProjectProgress } from "../types/index";

export const projectService = {
  // Initialize project progress
  startProject: async (userId: string, projectId: string, initialPhaseId: string) => {
    const userRef = doc(db, 'users', userId);
    const now = Date.now();
    
    const initialProgress: UserProjectProgress = {
      projectId,
      status: 'in_progress',
      currentPhaseId: initialPhaseId,
      completedPhases: [],
      completedCheckpoints: [],
      startedAt: now,
      updatedAt: now,
      completedAt: null
    };
    
    await updateDoc(userRef, {
      [`progress.projects.${projectId}`]: initialProgress
    });
    return initialProgress;
  },

  // Get project progress
  getProjectProgress: async (userId: string, projectId: string): Promise<UserProjectProgress | null> => {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data.progress?.projects?.[projectId] || null;
    }
    return null;
  },

  // Update current phase
  updateCurrentPhase: async (userId: string, projectId: string, phaseId: string) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`progress.projects.${projectId}.currentPhaseId`]: phaseId,
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  },

  // Update phase progress
  updatePhaseProgress: async (userId: string, projectId: string, phaseId: string, isCompleted: boolean) => {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) return;

    const data = snapshot.data();
    const progress: UserProjectProgress = data.progress?.projects?.[projectId];
    if (!progress) return;

    let completedPhases = progress.completedPhases || [];
    
    if (isCompleted && !completedPhases.includes(phaseId)) {
      completedPhases.push(phaseId);
    } else if (!isCompleted) {
      completedPhases = completedPhases.filter(id => id !== phaseId);
    }

    await updateDoc(userRef, {
      [`progress.projects.${projectId}.completedPhases`]: completedPhases,
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  },

  // Update checkpoint progress
  updateCheckpointProgress: async (userId: string, projectId: string, checkpointId: string, isCompleted: boolean) => {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) return;

    const data = snapshot.data();
    const progress: UserProjectProgress = data.progress?.projects?.[projectId];
    if (!progress) return;

    let completedCheckpoints = progress.completedCheckpoints || [];
    
    if (isCompleted && !completedCheckpoints.includes(checkpointId)) {
      completedCheckpoints.push(checkpointId);
    } else if (!isCompleted) {
      completedCheckpoints = completedCheckpoints.filter(id => id !== checkpointId);
    }

    await updateDoc(userRef, {
      [`progress.projects.${projectId}.completedCheckpoints`]: completedCheckpoints,
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  },

  // Complete project
  completeProject: async (userId: string, projectId: string) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`progress.projects.${projectId}.status`]: 'completed',
      [`progress.projects.${projectId}.completedAt`]: Date.now(),
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  },

  // Save project draft (playground code)
  saveProjectDraft: async (userId: string, projectId: string, draft: any) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`progress.projects.${projectId}.draft`]: draft,
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  },

  // Submit project
  submitProject: async (userId: string, projectId: string, submission: any) => {
    const userRef = doc(db, 'users', userId);
    const now = Date.now();
    
    await updateDoc(userRef, {
      [`progress.submissions.${projectId}`]: {
        ...submission,
        id: projectId,
        userId,
        projectId,
        submittedAt: now,
        status: 'pending'
      },
      [`progress.projects.${projectId}.status`]: 'completed',
      [`progress.projects.${projectId}.updatedAt`]: now
    });
  },

  // Listen to all user projects
  subscribeToProjects: (userId: string, callback: (projects: Record<string, UserProjectProgress>) => void) => {
    const userRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        callback(data.progress?.projects || {});
      } else {
        callback({});
      }
    });
    return unsubscribe;
  }
};
