export type PathStatus = 'active' | 'partial' | 'locked';

export type ProgramCategory = 
  | 'development-skill'
  | 'career-path'
  | 'coding-languages'
  | 'tool-foundation'
  | 'career-prep';

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
  | 'Virtual Assistant'
  | 'JavaScript Programming'
  | 'Python Programming'
  | 'Java Programming'
  | 'C++ Programming'
  | 'C# Programming'
  | 'Go Programming'
  | 'Rust Programming'
  | 'Swift Programming'
  | 'PHP Programming';

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
  category: ProgramCategory | string;
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

export type SubscriptionStatus = 'inactive' | 'pending' | 'active';

export interface UserProgress {
  selectedPath: CareerPath | null;
  activeProgramId?: string; // ID of the Skill/Program the user is currently focused on
  currentStage: Stage;
  currentWeek?: string;
  currentPhaseId?: string;
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
  subscription_status?: SubscriptionStatus;
  subscription_start_date?: number;
  subscription_expiry_date?: number;
  subscription_reference?: string;
  is_whitelisted?: boolean;
  role?: 'admin' | 'user';
  goal?: string;
  experienceLevel?: string;
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
  difficulty?: string;
}

export interface Skill {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: ProgramCategory;
  difficultyRange: string;
  estimatedCompletionTime: string;
  estimatedWeeks: number;
  estimatedMonths: number;
  weeklyStudyPlan?: string;
  careerOutcome: string;
  toolsCovered: string[];
  careerOutcomes: string[];
  targetLessons?: number;
  targetModules?: number;
  targetProjects?: number;
  totalStages?: number;
  totalModules?: number;
  totalLessons?: number;
  totalProjects?: number;
  certificateEligible: boolean;
  lessonCount?: number;
  published: boolean;
  status: 'active' | 'draft';
  dueDate?: number;
}

export interface CurriculumPath {
  id: string;
  skillId: string;
  title: string;
  description: string;
  summary?: string;
  durationWeeks?: number;
  targetOutcome?: string;
  status: 'active' | 'draft';
  totalModules: number;
  totalLessons: number;
  estimatedDuration: string;
  projectsCount?: number;
  jobOutcome?: string;
}

export interface CurriculumStage {
  id: string;
  curriculumPathId: string;
  skillId: string;
  title: string;
  levelName: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Career Prep';
  order: number;
}

export interface CurriculumWeek {
  id: string;
  skillId: string;
  curriculumPathId: string;
  stageId: string;
  weekNumber: number;
  title: string;
  description: string;
  learningGoals: string[];
}

export interface CurriculumModule {
  id: string;
  skillId: string;
  curriculumPathId: string;
  stageId: string;
  weekId: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: string;
}

export interface CurriculumLesson extends LessonContent {
  moduleId: string;
  weekId: string;
  skillId: string;
  curriculumPathId: string;
  stageId: string;
  slug: string;
  summary: string;
  objectives: string;
  body: string;
  order: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedDuration: string;
  prerequisites: string[];
  tags: string[];
  resources?: string[];
  exercise?: string;
  project?: {
    title: string;
    description: string;
    steps: string[];
  };
  miniProject?: {
    title: string;
    description: string;
  };
  interviewTips?: string;
  careerTips?: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft_generated';
}

export interface GeneratedLesson extends CurriculumLesson {
  createdAt: number;
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
  dueDate?: number;
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

export interface PaymentRecord {
  id: string;
  user_id: string;
  email: string;
  amount: number;
  status: 'initiated' | 'paid_pending_verification' | 'approved' | 'rejected' | 'cancelled';
  payment_source: string;
  timestamp: number;
  reference_id: string; // Selar External Ref
  payment_reference: string; // MentorStack Internal Ref
  cancelled_at?: number;
}

export interface ReceiptRecord {
  id: string;
  user_id: string;
  email: string;
  image_url: string;
  amount_entered?: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  timestamp: number;
  cancelled_at?: number;
}

export type TicketCategory = 'payment' | 'access' | 'technical' | 'other';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export interface SupportTicket {
  id: string;
  user_id: string;
  email: string;
  category: TicketCategory;
  message: string;
  image_attachment?: string | null;
  status: TicketStatus;
  admin_response?: string;
  timestamp: number;
  resolved_at?: number;
}
