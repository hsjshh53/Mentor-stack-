export type PathStatus = 'active' | 'partial' | 'locked';

export type CareerCategory = 
  | 'Core Software Development'
  | 'Data & AI'
  | 'Security'
  | 'Infrastructure & Systems'
  | 'Specialized Development'
  | 'Product & Design'
  | 'Emerging High-Income Skills'
  | 'Business & Operations';

export type CareerPath = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'Mobile App Developer'
  | 'Software Engineer'
  | 'Systems Architect'
  | 'QA Engineer'
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
  | 'Network Engineer'
  | 'Database Administrator'
  | 'Embedded Systems'
  | 'Game Developer'
  | 'AR/VR'
  | 'IoT'
  | 'Blockchain'
  | 'Web3'
  | 'Robotics'
  | 'UI/UX'
  | 'Product Design'
  | 'UX Designer'
  | 'Product Manager'
  | 'Project Manager'
  | 'Business Analyst'
  | 'AI Automation'
  | 'Prompt Engineering'
  | 'Technical Writer'
  | 'SEO Specialist'
  | 'Digital Marketer'
  | 'Content Creator'
  | 'HR Specialist'
  | 'Sales Specialist'
  | 'Customer Support'
  | 'Virtual Assistant';

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
  levels: {
    beginner: PathLevel;
    intermediate: PathLevel;
    advanced: PathLevel;
  };
  tools: string[]; // TechTool IDs
  finalExamId: string;
}

export type TechCategory = 
  | 'Programming Languages'
  | 'Frontend Tools & Frameworks'
  | 'Backend Frameworks'
  | 'Databases'
  | 'Cloud & Hosting'
  | 'Authentication & Payments'
  | 'Testing Tools'
  | 'Version Control'
  | 'Development Tools'
  | 'Package Managers'
  | 'DevOps & Deployment'
  | 'APIs & Real-Time'
  | 'UI/UX & Design Tools'
  | 'Specialized Tech';

export interface TechTool {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  icon?: string;
}

export interface PathLevel {
  id: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  modules: Module[];
  projects: Project[];
}

export type CertificateTier = 'Foundation' | 'Intermediate' | 'Advanced' | 'Professional';

export interface Certificate {
  id: string;
  userId: string;
  fullName: string;
  pathName: CareerPath;
  tier: CertificateTier;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  issueDate: string;
  finalScore: number;
  skills: string[];
  projectTitle?: string;
  projects: {
    title: string;
    githubLink: string;
    liveLink?: string;
  }[];
  verificationUrl: string;
  isValid: boolean;
  issuedBy: string; // "MentorStack AI by OLYNQ SOCIAL"
}

export interface ProjectSubmission {
  id: string;
  userId: string;
  projectId: string;
  githubLink: string;
  liveLink: string;
  code?: ProjectStarterCode; // For playground submissions
  submittedAt: number;
  status: 'pending' | 'reviewed' | 'approved';
  githubMetadata?: GithubRepoMetadata;
  notes?: string;
}

export interface GithubConnection {
  accessToken: string;
  username: string;
  avatarUrl: string;
  connectedAt: number;
}

export interface GithubRepoMetadata {
  repoName: string;
  repoUrl: string;
  publishedAt: number;
  lastSyncedAt: number;
  publishStatus: 'published' | 'syncing' | 'failed';
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
  completedProjects: string[]; // Project IDs
  submissions: Record<string, ProjectSubmission>; // projectId: submission
  certificates: string[]; // Certificate IDs
  weakAreas: string[];
  skills: Record<string, number>; // skillName: level
  unlockedPaths: CareerPath[];
  isPremium: boolean;
  dailyGoalMinutes: number;
  dailyMinutesLearned: number;
  lastLessonId: string | null;
  lastLessonTitle: string | null;
  lastActiveDate: string | null;
  goal?: string;
  experienceLevel?: string;
  followers?: string[];
  following?: string[];
  badges?: string[];
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  type: 'lesson_complete' | 'level_up' | 'project_complete' | 'badge_earned' | 'streak_milestone';
  content: string;
  timestamp: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'skill' | 'community';
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
  proTip?: string;
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

export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  explanation: string;
  tasks: string[];
  checklist: string[];
  miniChallenge: string;
  nextStep: string;
  hints: string[];
  commonMistakes: string[];
}

export interface ProjectCheckpoint {
  id: string;
  title: string;
  description: string;
  xpReward: number;
}

export interface ProjectStarterCode {
  html: string;
  css: string;
  js: string;
}

export interface DetailedProject {
  id: string;
  title: string;
  category: CareerPath | string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  tags: string[];
  skillsUsed: string[];
  isCapstone: boolean;
  isPremium?: boolean;
  estimatedTime: string;
  objectives: string[];
  prerequisites: string[];
  instructions: string[];
  phases: ProjectPhase[];
  checkpoints: ProjectCheckpoint[];
  expectedOutcome: string;
  starterTasks: string[];
  starterCode?: ProjectStarterCode;
  snippets?: Record<string, string>;
}

export interface UserProjectProgress {
  projectId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentPhaseId: string;
  completedPhases: string[];
  completedCheckpoints: string[];
  draft?: ProjectStarterCode;
  githubMetadata?: GithubRepoMetadata;
  startedAt: number;
  updatedAt: number;
  completedAt: number | null;
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
