export type PathStatus = 'active' | 'partial' | 'locked';

export type CareerCategory = 
  | 'Core Software Development'
  | 'Data & AI'
  | 'Security'
  | 'Infrastructure & Systems'
  | 'Specialized Development'
  | 'Product & Design'
  | 'Emerging High-Income Skills';

export type CareerPath = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'Mobile App Developer'
  | 'Data Analyst'
  | 'AI Engineer'
  | 'Machine Learning'
  | 'Data Scientist'
  | 'Data Engineer'
  | 'Cybersecurity'
  | 'Ethical Hacking'
  | 'Network Security'
  | 'Application Security'
  | 'DevOps Engineer'
  | 'Cloud Engineer'
  | 'SRE'
  | 'System Admin'
  | 'Game Developer'
  | 'AR/VR'
  | 'IoT'
  | 'Blockchain'
  | 'UI/UX'
  | 'Product Design'
  | 'AI Automation'
  | 'Prompt Engineering'
  | 'Web3'
  | 'Robotics';

export type Stage = 'Beginner' | 'Intermediate' | 'Advanced' | 'Projects' | 'Final Exam';

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: string[]; // Lesson IDs
  testId?: string;
  projectId?: string;
}

export interface PathCurriculum {
  id: string;
  title: string;
  description: string;
  category: CareerCategory;
  status: PathStatus;
  icon?: string;
  skills?: string[];
  recommended?: boolean;
  modules: Module[];
  finalExamId: string;
}

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

export interface Project {
  id: string;
  title: string;
  path: CareerPath;
  description: string;
  objective: string;
  steps: string[];
  output: string;
  xpReward: number;
}
