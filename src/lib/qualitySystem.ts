
import { LessonContent, CurriculumLesson } from "../types";

export interface QualityMetrics {
  clarity: number;
  depth: number;
  examples: number;
  practical: number;
  structure: number;
}

export interface Deficiencies {
  missingExplanation: boolean;
  missingExample: boolean;
  weakStructure: boolean;
  unclearOutcome: boolean;
  tooShort: boolean;
}

/**
 * Calculates a quality score (0-100) for a lesson based on defined criteria.
 */
export const calculateLessonScore = (lesson: Partial<LessonContent | CurriculumLesson>): { score: number, metrics: QualityMetrics } => {
  const metrics: QualityMetrics = {
    clarity: 0,
    depth: 0,
    examples: 0,
    practical: 0,
    structure: 0
  };

  if (!lesson) return { score: 0, metrics };

  const content = lesson.explanation || (lesson as any).body || "";
  const example = lesson.codeExample || "";
  const practice = lesson.practice || "";
  const quiz = lesson.quiz || [];
  const title = lesson.title || "";

  // 1. Clarity (0-20)
  // Based on presence of clear headings, formatting, and readability
  if (title.length > 5) metrics.clarity += 5;
  if (content.length > 300) metrics.clarity += 10;
  if (content.includes('\n') || content.includes('**')) metrics.clarity += 5;

  // 2. Depth of explanation (0-20)
  // Based on word count and technical depth indicators
  const wordCount = content.split(' ').length;
  if (wordCount > 50) metrics.depth += 5;
  if (wordCount > 150) metrics.depth += 10;
  if (wordCount > 300) metrics.depth += 5;

  // 3. Example quality (0-20)
  // Based on presence of code and line-by-line explanation
  if (example.length > 20) metrics.examples += 10;
  if (lesson.lineByLine && lesson.lineByLine.length > 20) metrics.examples += 10;

  // 4. Practical value (0-20)
  // Based on practice tasks and challenges
  if (practice.length > 20) metrics.practical += 10;
  if (lesson.challenge && lesson.challenge.length > 20) metrics.practical += 10;

  // 5. Structure completeness (0-20)
  // Based on having all required sections
  let sections = 0;
  if (lesson.todayYouAreLearning) sections++;
  if (lesson.whyItMatters) sections++;
  if (lesson.analogy) sections++;
  if (quiz.length >= 3) sections++;
  if (lesson.recap || lesson.summary) sections++;
  if (lesson.lineByLine) sections++;
  if (lesson.practice) sections++;
  
  metrics.structure = Math.min(20, sections * 2.5);

  const score = Object.values(metrics).reduce((a, b) => a + b, 0);
  return { score, metrics };
};

/**
 * Identifies what's missing or weak in a lesson.
 */
export const analyzeLessonDeficiencies = (lesson: Partial<LessonContent | CurriculumLesson>): Deficiencies => {
  const content = lesson.explanation || (lesson as any).body || "";
  return {
    missingExplanation: !content || content.length < 300,
    missingExample: !lesson.codeExample || lesson.codeExample.length < 20,
    weakStructure: !lesson.quiz || lesson.quiz.length < 3 || !(lesson.recap || (lesson as any).summary),
    unclearOutcome: !lesson.todayYouAreLearning || lesson.todayYouAreLearning.length < 10,
    tooShort: content.length < 500
  };
};

/**
 * Utility to map score to status.
 */
export const getStatusFromScore = (score: number): 'published' | 'approved' | 'needs_repair' | 'rejected' => {
  if (score >= 90) return 'published';
  if (score >= 70) return 'approved';
  if (score >= 40) return 'needs_repair';
  return 'rejected';
};
