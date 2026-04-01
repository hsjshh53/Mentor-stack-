import { useEffect, useState } from 'react';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  getDoc 
} from 'firebase/firestore';
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
  isPremium: false,
  dailyGoalMinutes: 20,
  dailyMinutesLearned: 0,
  lastLessonId: null,
  lastLessonTitle: null,
  lastActiveDate: null
};

export const useUserData = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    console.log("useUserData: Initializing for user:", user?.uid);
    
    if (!user) {
      setProgress(null);
      setLoading(false);
      setIsNewUser(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    
    // Fallback timeout for user data loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn("useUserData: Loading timed out after 5s, using default data");
        if (!progress) {
          setProgress(defaultProgress);
        }
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onSnapshot(userRef, async (snapshot) => {
      console.log("useUserData: Snapshot received. Exists:", snapshot.exists());
      
      try {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          const data = userData.progress as UserProgress || defaultProgress;
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
            } catch (e) {
              console.error("useUserData: Error updating daily reset:", e);
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
          setIsNewUser(!data.selectedPath); // If no path selected, consider them "new" for onboarding
        } else {
          console.log("useUserData: User document does not exist. Marking as new user.");
          setIsNewUser(true);
          // Initialize new user document in Firestore
          try {
            await setDoc(userRef, {
              email: user.email,
              name: user.displayName || 'Anonymous',
              progress: defaultProgress,
              createdAt: Date.now()
            });
            setProgress(defaultProgress);
          } catch (e) {
            console.error("useUserData: Error initializing user document:", e);
            // Still set progress to default so app can continue
            setProgress(defaultProgress);
          }
        }
      } catch (err) {
        console.error("useUserData: Error processing snapshot:", err);
        if (!progress) setProgress(defaultProgress);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    }, (error) => {
      console.error('useUserData: Error in snapshot listener:', error);
      if (!progress) setProgress(defaultProgress);
      setLoading(false);
      clearTimeout(timeoutId);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user]);

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    
    // Flatten updates for Firestore updateDoc
    const firestoreUpdates: any = {};
    Object.entries(updates).forEach(([key, value]) => {
      firestoreUpdates[`progress.${key}`] = value;
    });
    
    await updateDoc(userRef, firestoreUpdates);
  };

  const addXP = async (amount: number) => {
    if (!progress || !user) return;
    const newXP = progress.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    await updateProgress({ xp: newXP, level: newLevel });
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

    await updateProgress({
      completedLessons: newCompletedLessons,
      streak: newStreak,
      lastActiveDate: today,
      lastLessonId: lessonId,
      lastLessonTitle: lessonTitle,
      xp: newXP,
      level: newLevel
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

    await updateProgress({
      submissions: newSubmissions,
      completedProjects: newCompletedProjects,
      xp: newXP,
      level: newLevel
    });
  };

  const saveProjectDraft = async (projectId: string, draft: ProjectStarterCode) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      [`progress.projects.${projectId}.draft`]: draft,
      [`progress.projects.${projectId}.updatedAt`]: Date.now()
    });
  };

  return { progress, loading, isNewUser, updateProgress, addXP, completeLesson, addMinutesLearned, submitProject, saveProjectDraft };
};
