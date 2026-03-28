import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
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
  isPremium: false,
  dailyGoalMinutes: 20,
  dailyMinutesLearned: 0,
  lastLessonId: null,
  lastLessonTitle: null,
  lastActiveDate: null,
  followers: [],
  following: [],
  badges: []
};

import { recordActivity } from '../services/socialService';
import { BADGES } from '../constants/badges';

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

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, async (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        const data = userData.progress as UserProgress;
        const today = new Date().toISOString().split('T')[0];
        const lastActiveDate = data.lastActiveDate;
        
        let streak = data.streak || 0;
        let dailyMinutesLearned = data.dailyMinutesLearned || 0;

        // Reset daily minutes if it's a new day
        if (lastActiveDate !== today) {
          dailyMinutesLearned = 0;
          
          // Reset streak if missed a day
          if (lastActiveDate) {
            const lastDate = new Date(lastActiveDate);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
              streak = 0;
            }
          }
          
          // Persist the reset
          try {
            await updateDoc(userRef, { 
              'progress.dailyMinutesLearned': dailyMinutesLearned, 
              'progress.streak': streak, 
              'progress.lastActiveDate': today 
            });
          } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
          }
        }

        setProgress({
          ...defaultProgress,
          ...data,
          streak,
          dailyMinutesLearned,
          completedLessons: data.completedLessons || [],
          completedTests: data.completedTests || [],
          completedExams: data.completedExams || [],
          completedProjects: data.completedProjects || [],
          submissions: data.submissions || {},
          certificates: data.certificates || [],
          weakAreas: data.weakAreas || [],
          unlockedPaths: data.unlockedPaths || defaultProgress.unlockedPaths
        });
      } else {
        // Initialize new user profile
        try {
          await setDoc(userRef, {
            displayName: user.displayName || 'Developer',
            photoURL: user.photoURL || null,
            progress: defaultProgress
          });
          setProgress(defaultProgress);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}`);
        }
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const firestoreUpdates: any = {};
    Object.entries(updates).forEach(([key, value]) => {
      firestoreUpdates[`progress.${key}`] = value;
    });
    try {
      await updateDoc(userRef, firestoreUpdates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addXP = async (amount: number) => {
    if (!progress || !user) return;
    const newXP = progress.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    const updates: Partial<UserProgress> = { xp: newXP, level: newLevel };
    
    const newBadges = [...(progress.badges || [])];
    if (newXP >= 100 && !newBadges.includes('xp-100')) {
      newBadges.push('xp-100');
      updates.badges = newBadges;
      await recordActivity({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userPhoto: user.photoURL || undefined,
        type: 'badge_earned',
        content: 'earned the Centurion badge!'
      });
    }

    if (newLevel > progress.level) {
      await recordActivity({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userPhoto: user.photoURL || undefined,
        type: 'level_up',
        content: `reached Level ${newLevel}!`
      });
    }

    await updateProgress(updates);
  };

  const completeLesson = async (lessonId: string, lessonTitle: string) => {
    if (!progress || !user) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActiveDate = progress.lastActiveDate;
    
    let newStreak = progress.streak;
    if (!lastActiveDate) {
      newStreak = 1;
    } else if (lastActiveDate !== today) {
      const lastDate = new Date(lastActiveDate);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const newCompletedLessons = progress.completedLessons.includes(lessonTitle)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonTitle];

    const newXP = progress.xp + 10;
    const newLevel = Math.floor(newXP / 100) + 1;

    const updates: any = {
      completedLessons: newCompletedLessons,
      streak: newStreak,
      lastActiveDate: today,
      lastLessonId: lessonId,
      lastLessonTitle: lessonTitle,
      xp: newXP,
      level: newLevel
    };

    const newBadges = [...(progress.badges || [])];
    if (newCompletedLessons.length === 1 && !newBadges.includes('first-lesson')) {
      newBadges.push('first-lesson');
      updates.badges = newBadges;
      await recordActivity({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userPhoto: user.photoURL || undefined,
        type: 'badge_earned',
        content: 'earned the First Step badge!'
      });
    }
    if (newStreak === 7 && !newBadges.includes('streak-7')) {
      newBadges.push('streak-7');
      updates.badges = newBadges;
      await recordActivity({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userPhoto: user.photoURL || undefined,
        type: 'streak_milestone',
        content: `reached a 7-day streak! 🔥`
      });
    }

    await updateProgress(updates);

    await recordActivity({
      userId: user.uid,
      userName: user.displayName || 'Developer',
      userPhoto: user.photoURL || undefined,
      type: 'lesson_complete',
      content: `completed ${lessonTitle}`
    });
  };

  const addMinutesLearned = async (minutes: number) => {
    if (!progress || !user) return;
    const newMinutes = (progress.dailyMinutesLearned || 0) + minutes;
    await updateProgress({ dailyMinutesLearned: newMinutes });
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

    const newXP = progress.xp + 50;
    const newLevel = Math.floor(newXP / 100) + 1;

    const updates: any = {
      submissions: newSubmissions,
      completedProjects: newCompletedProjects,
      xp: newXP,
      level: newLevel
    };

    const newBadges = [...(progress.badges || [])];
    if (newCompletedProjects.length === 1 && !newBadges.includes('first-project')) {
      newBadges.push('first-project');
      updates.badges = newBadges;
      await recordActivity({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userPhoto: user.photoURL || undefined,
        type: 'badge_earned',
        content: 'earned the Builder badge!'
      });
    }

    await updateProgress(updates);

    await recordActivity({
      userId: user.uid,
      userName: user.displayName || 'Developer',
      userPhoto: user.photoURL || undefined,
      type: 'project_complete',
      content: `built a new project: ${projectId}`
    });
  };

  const saveProjectDraft = async (projectId: string, draft: ProjectStarterCode) => {
    if (!user) return;
    const projectRef = doc(db, 'users', user.uid, 'projects', projectId);
    try {
      await setDoc(projectRef, {
        draft,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/projects/${projectId}`);
    }
  };

  return { progress, loading, updateProgress, addXP, completeLesson, addMinutesLearned, submitProject, saveProjectDraft };
};
