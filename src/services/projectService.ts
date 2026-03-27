import { ref, set, get, update, onValue, off } from "firebase/database";
import { db } from "../lib/firebase";
import { UserProjectProgress } from "../types";

export const projectService = {
  // Initialize project progress
  startProject: async (userId: string, projectId: string, initialPhaseId: string) => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
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
    
    await set(projectRef, initialProgress);
    return initialProgress;
  },

  // Get project progress
  getProjectProgress: async (userId: string, projectId: string): Promise<UserProjectProgress | null> => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
    const snapshot = await get(projectRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // Update current phase
  updateCurrentPhase: async (userId: string, projectId: string, phaseId: string) => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
    await update(projectRef, {
      currentPhaseId: phaseId,
      updatedAt: Date.now()
    });
  },

  // Update phase progress
  updatePhaseProgress: async (userId: string, projectId: string, phaseId: string, isCompleted: boolean) => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
    const snapshot = await get(projectRef);
    if (!snapshot.exists()) return;

    const progress: UserProjectProgress = snapshot.val();
    let completedPhases = progress.completedPhases || [];
    
    if (isCompleted && !completedPhases.includes(phaseId)) {
      completedPhases.push(phaseId);
    } else if (!isCompleted) {
      completedPhases = completedPhases.filter(id => id !== phaseId);
    }

    await update(projectRef, {
      completedPhases,
      updatedAt: Date.now()
    });
  },

  // Update checkpoint progress
  updateCheckpointProgress: async (userId: string, projectId: string, checkpointId: string, isCompleted: boolean) => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
    const snapshot = await get(projectRef);
    if (!snapshot.exists()) return;

    const progress: UserProjectProgress = snapshot.val();
    let completedCheckpoints = progress.completedCheckpoints || [];
    
    if (isCompleted && !completedCheckpoints.includes(checkpointId)) {
      completedCheckpoints.push(checkpointId);
    } else if (!isCompleted) {
      completedCheckpoints = completedCheckpoints.filter(id => id !== checkpointId);
    }

    await update(projectRef, {
      completedCheckpoints,
      updatedAt: Date.now()
    });
  },

  // Complete project
  completeProject: async (userId: string, projectId: string) => {
    const projectRef = ref(db, `users/${userId}/projects/${projectId}`);
    await update(projectRef, {
      status: 'completed',
      completedAt: Date.now(),
      updatedAt: Date.now()
    });
  },

  // Listen to all user projects
  subscribeToProjects: (userId: string, callback: (projects: Record<string, UserProjectProgress>) => void) => {
    const projectsRef = ref(db, `users/${userId}/projects`);
    onValue(projectsRef, (snapshot) => {
      callback(snapshot.val() || {});
    });
    return () => off(projectsRef);
  }
};
