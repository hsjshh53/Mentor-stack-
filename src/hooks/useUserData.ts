import { useEffect, useState } from 'react';
import { ref, onValue, set, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { UserProgress, ProjectSubmission, ProjectStarterCode, PathProgress } from '../types/index';
import { OnboardingService } from '../services/OnboardingService';

const defaultProgress: UserProgress = {
  selectedPath: null,
  activeProgramId: '',
  currentStage: 'Beginner',
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: null,
  completedLessons: [],
  completedTests: [],
  completedExams: [],
  completedProjects: [],
  submissions: {},
  certificates: [],
  weakAreas: [],
  skills: {},
  unlockedPaths: ['Frontend Developer', 'Full-Stack Developer']
};

export const useUserData = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const userRef = ref(db, `users/${user.uid}/progress`);
    const unsubscribe = onValue(userRef, async (snapshot) => {
      const data = snapshot.val() as UserProgress | null;
      
      // 🛡️ INFINITE LOOP PROTECTION
      if (initializing) return;

      // Self-healing / Onboarding Check
      const needsInit = !snapshot.exists() || !data?.selectedPath || data?.xp === undefined || !data?.currentLessonId;
      const isCompleted = data?.onboardingCompleted || data?.profileLocked;
      
      if (needsInit && !isCompleted && !initializing) {
        setInitializing(true);
        try {
          console.log(`[useUserData] Data check failed for ${user.uid}. Triggering Onboarding/Repair...`);
          const repaired = await OnboardingService.ensureUserOnboarding(user.uid, data);
          setProgress(repaired);
        } catch (err) {
          console.error("[useUserData] Onboarding failed:", err);
        } finally {
          setInitializing(false);
          setLoading(false);
        }
        return;
      }

      if (snapshot.exists()) {
        setProgress({
          ...defaultProgress,
          ...data,
          completedLessons: data.completedLessons || [],
          completedTests: data.completedTests || [],
          completedExams: data.completedExams || [],
          completedProjects: data.completedProjects || [],
          submissions: data.submissions || {},
          certificates: data.certificates || [],
          weakAreas: data.weakAreas || [],
          unlockedPaths: data.unlockedPaths || defaultProgress.unlockedPaths
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, initializing]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user || !progress) return;
    
    const userRef = ref(db, `users/${user.uid}/progress`);
    
    // If the update includes currentPath related changes, we should sync to the isolated path storage too
    if (progress.selectedPath && (updates.completedLessons || updates.xp || updates.currentLessonId)) {
      const pathId = progress.selectedPath.replace(/\s+/g, '_').toLowerCase();
      const pathRef = ref(db, `users/${user.uid}/paths/${pathId}`);
      
      const pathUpdates: Partial<PathProgress> = {
        lastActive: Date.now(),
        pathId: pathId,
        pathName: progress.selectedPath as string
      };

      if (updates.completedLessons) {
        pathUpdates.completedLessons = updates.completedLessons;
        pathUpdates.completedLessonsCount = updates.completedLessons.length;
      }
      if (updates.xp) pathUpdates.xp = updates.xp;
      if (updates.currentLessonId) pathUpdates.currentLessonId = updates.currentLessonId;
      if (updates.currentStage) pathUpdates.stage = updates.currentStage;
      
      await update(pathRef, pathUpdates);
    }

    await update(userRef, updates);
  };

  const updateProfileName = async (newName: string) => {
    if (!user) return;
    const { updateProfile } = await import('firebase/auth');
    await updateProfile(user, { displayName: newName });
    // Also save to a central users profile for easier lookup/admin
    const profileRef = ref(db, `users/${user.uid}/profile`);
    await update(profileRef, { 
      displayName: newName,
      updatedAt: Date.now()
    });
  };

  const addXP = async (amount: number) => {
    if (!progress || !user) return;
    const newXP = progress.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    await updateProgress({ xp: newXP, level: newLevel });
  };

  const submitProject = async (projectId: string, submission: Omit<ProjectSubmission, 'id' | 'userId' | 'projectId' | 'submittedAt' | 'status'>) => {
    if (!user || !progress) return;

    const submissionId = `sub_${Date.now()}`;
    const fullSubmission: ProjectSubmission = {
      ...submission,
      id: submissionId,
      userId: user.uid,
      projectId,
      submittedAt: Date.now(),
      status: 'pending'
    };

    const newSubmissions = {
      ...progress.submissions,
      [projectId]: fullSubmission
    };

    const newCompletedProjects = progress.completedProjects.includes(projectId)
      ? progress.completedProjects
      : [...progress.completedProjects, projectId];

    await updateProgress({
      submissions: newSubmissions,
      completedProjects: newCompletedProjects
    });

    // Add XP for completion
    await addXP(500); // Base XP for any project
  };

  const saveProjectDraft = async (projectId: string, draft: ProjectStarterCode) => {
    if (!user) return;
    const projectRef = ref(db, `users/${user.uid}/projects/${projectId}`);
    await update(projectRef, {
      draft,
      updatedAt: Date.now()
    });
  };

  return { progress, loading: loading || initializing, updateProgress, updateProfileName, addXP, submitProject, saveProjectDraft };
};
