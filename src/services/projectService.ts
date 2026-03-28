import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { UserProjectProgress } from "../types";

export const projectService = {
  // Initialize project progress
  startProject: async (userId: string, projectId: string, initialPhaseId: string) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
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
      
      await setDoc(projectRef, initialProgress);
      return initialProgress;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return null;
    }
  },

  // Get project progress
  getProjectProgress: async (userId: string, projectId: string): Promise<UserProjectProgress | null> => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      const snapshot = await getDoc(projectRef);
      return snapshot.exists() ? snapshot.data() as UserProjectProgress : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  // Update current phase
  updateCurrentPhase: async (userId: string, projectId: string, phaseId: string) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      await updateDoc(projectRef, {
        currentPhaseId: phaseId,
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Update phase progress
  updatePhaseProgress: async (userId: string, projectId: string, phaseId: string, isCompleted: boolean) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      const snapshot = await getDoc(projectRef);
      if (!snapshot.exists()) return;

      const progress = snapshot.data() as UserProjectProgress;
      let completedPhases = progress.completedPhases || [];
      
      if (isCompleted && !completedPhases.includes(phaseId)) {
        completedPhases.push(phaseId);
      } else if (!isCompleted) {
        completedPhases = completedPhases.filter(id => id !== phaseId);
      }

      await updateDoc(projectRef, {
        completedPhases,
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Update checkpoint progress
  updateCheckpointProgress: async (userId: string, projectId: string, checkpointId: string, isCompleted: boolean) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      const snapshot = await getDoc(projectRef);
      if (!snapshot.exists()) return;

      const progress = snapshot.data() as UserProjectProgress;
      let completedCheckpoints = progress.completedCheckpoints || [];
      
      if (isCompleted && !completedCheckpoints.includes(checkpointId)) {
        completedCheckpoints.push(checkpointId);
      } else if (!isCompleted) {
        completedCheckpoints = completedCheckpoints.filter(id => id !== checkpointId);
      }

      await updateDoc(projectRef, {
        completedCheckpoints,
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Complete project
  completeProject: async (userId: string, projectId: string) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      await updateDoc(projectRef, {
        status: 'completed',
        completedAt: Date.now(),
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Save project draft (playground code)
  saveProjectDraft: async (userId: string, projectId: string, draft: any) => {
    const path = `users/${userId}/projects/${projectId}`;
    try {
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      await updateDoc(projectRef, {
        draft,
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Submit project
  submitProject: async (userId: string, projectId: string, submission: any) => {
    const subPath = `users/${userId}/submissions/${projectId}`;
    const projPath = `users/${userId}/projects/${projectId}`;
    try {
      const submissionRef = doc(db, 'users', userId, 'submissions', projectId);
      const projectRef = doc(db, 'users', userId, 'projects', projectId);
      
      await setDoc(submissionRef, {
        ...submission,
        id: projectId,
        userId,
        projectId,
        submittedAt: Date.now(),
        status: 'pending'
      });

      await updateDoc(projectRef, {
        status: 'completed',
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, subPath);
    }
  },

  // Listen to all user projects
  subscribeToProjects: (userId: string, callback: (projects: Record<string, UserProjectProgress>) => void) => {
    const path = `users/${userId}/projects`;
    const projectsRef = collection(db, 'users', userId, 'projects');
    const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
      const projects: Record<string, UserProjectProgress> = {};
      snapshot.forEach(doc => {
        projects[doc.id] = doc.data() as UserProjectProgress;
      });
      callback(projects);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return unsubscribe;
  }
};
