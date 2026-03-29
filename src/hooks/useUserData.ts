import { useEffect, useState } from 'react';
import { ref, onValue, set, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { UserProgress, ProjectSubmission, ProjectStarterCode } from '../types/index';

const defaultProgress: UserProgress = {
  selectedPath: null,
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
  unlockedPaths: ['Frontend Developer', 'Full-Stack Developer'],
  currentLessonId: null,
  isPremium: false
};

export const useUserData = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const userRef = ref(db, `users/${user.uid}/progress`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setProgress({
          ...defaultProgress,
          ...data,
          // Ensure arrays exist even if they were missing in the database
          completedLessons: data.completedLessons || [],
          completedTests: data.completedTests || [],
          completedExams: data.completedExams || [],
          completedProjects: data.completedProjects || [],
          submissions: data.submissions || {},
          certificates: data.certificates || [],
          weakAreas: data.weakAreas || [],
          unlockedPaths: data.unlockedPaths || defaultProgress.unlockedPaths,
          currentLessonId: data.currentLessonId || null
        });
      } else {
        // Initialize new user progress
        set(userRef, defaultProgress);
        setProgress(defaultProgress);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}/progress`);
    await update(userRef, updates);
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

  return { progress, loading, updateProgress, addXP, submitProject, saveProjectDraft };
};
