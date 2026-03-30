export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Lesson {
  title: string;
  learningObjective: string;
  simpleExplanation: string;
  whyItMatters: string;
  analogy: string;
  stepByStep: string;
  codeExample: string;
  visualExplanation: string;
  commonMistakes: string;
  practiceTask: string;
  miniChallenge: string;
  reflectionQuestion: string;
  quiz: QuizQuestion[];
}

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
