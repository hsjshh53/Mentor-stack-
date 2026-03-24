export type CareerPath = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'Mobile App Developer'
  | 'Software Engineer'
  | 'Game Developer'
  | 'DevOps Engineer'
  | 'Cloud Engineer'
  | 'Data Analyst'
  | 'Data Scientist'
  | 'AI Engineer'
  | 'Cybersecurity Engineer'
  | 'Blockchain Developer'
  | 'UI/UX Designer'
  | 'QA Engineer'
  | 'API Developer'
  | 'Systems Architect';

export type Stage = 'Beginner' | 'Intermediate' | 'Advanced' | 'Projects' | 'Final Exam';

export interface UserProgress {
  selectedPath: CareerPath | null;
  currentStage: Stage;
  xp: number;
  level: number;
  streak: number;
  lastActive: string | null;
  completedLessons: string[];
  completedTests: string[];
  completedExams: string[];
  weakAreas: string[];
  skills: Record<string, number>; // skillName: level
  unlockedPaths: CareerPath[];
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  progress: UserProgress;
}

export interface LessonContent {
  id: string;
  title: string;
  todayYouAreLearning: string;
  whyItMatters: string;
  explanation: string;
  analogy: string;
  codeExample: string;
  lineByLine: string;
  commonMistakes: string[];
  practice: string;
  challenge: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  recap: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StageTest {
  id: string;
  title: string;
  stage: Stage;
  path: CareerPath;
  description: string;
  questions: QuizQuestion[];
  minScoreToPass: number;
  xpReward: number;
}

export interface FinalExam {
  id: string;
  title: string;
  path: CareerPath;
  description: string;
  theoryQuestions: QuizQuestion[];
  practicalQuestions: QuizQuestion[];
  debuggingQuestions: QuizQuestion[];
  codingTask: {
    prompt: string;
    starterCode: string;
    solution: string;
  };
  xpReward: number;
}
