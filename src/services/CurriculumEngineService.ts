
import { ref, get, update, set, push } from "firebase/database";
import { db } from "../lib/firebase";
import { firebaseSafeGet, firebaseSafeSet } from "../lib/FirebaseService";
import { smartGenerate, safeJsonParse, isAiConfigured, ultraFastGenerate } from "../lib/gemini-utils";
import { generateSlug } from "./aiGeneratorService";
import { ModerationService } from "./ModerationService";

/**
 * MENTORSTACK CURRICULUM ENGINE V5
 * Implements BEGINNER-FIRST (Phase 0) logic, sequential generation, 
 * and multi-model fallback with OpenRouter.
 */

export interface CurriculumCheckpoint {
  path: string;
  skillId: string;
  lastLessonIndex: number;
  currentStage: string;
  completedStages: string[];
  nextLessonTitle: string;
  timestamp: number;
}

export const CurriculumEngineService = {

  /**
   * The Mandatory Curriculum Stages in Order
   */
  STAGES: [
    "Foundations",
    "Core Concepts",
    "Practical Skills",
    "Real Projects",
    "Advanced Systems",
    "Career Readiness"
  ],

  /**
   * Difficulty order for sorting
   */
  DIFFICULTIES: ["Beginner", "Intermediate", "Advanced", "Expert"],

  /**
   * Defines the mandatory Phase 0 Foundations for all paths.
   */
  getPhase0Lessons(pathTitle: string): string[] {
    const commonBasics = [
      "What is a computer?",
      "How software works",
      "What is coding?",
      "What is the Internet?",
      "How the Web Works"
    ];

    if (pathTitle === "Frontend Developer" || pathTitle === "Full Stack Developer") {
      return [
        ...commonBasics,
        "What is Frontend Development?",
        "Introduction to HTML",
        "Basic HTML Tags",
        "Building Your First Webpage",
        "Accessibility Fundamentals (WCAG & A11y)"
      ];
    }
    if (pathTitle === "Backend Developer") {
      return [
        ...commonBasics,
        "What is Backend Development?",
        "How Servers Work",
        "Introduction to Databases",
        "What is an API?",
        "The Request-Response Cycle",
        "JSON Basics"
      ];
    }
    if (pathTitle === "Python Developer") {
      return [
        ...commonBasics,
        "What is Python?",
        "Setting up your Environment",
        "Variables and Data Types",
        "The Python Shell",
        "Running your first script"
      ];
    }
    if (pathTitle === "UI/UX Designer") {
      return [
        "What is Design?",
        "UI vs UX: The Difference",
        "Color Theory for Beginners",
        "Typography Basics",
        "Spacing and Alignment",
        "Introduction to Figma"
      ];
    }
    if (pathTitle === "Cybersecurity Analyst") {
      return [
        ...commonBasics,
        "What is Cybersecurity?",
        "The CIA Triad",
        "Basic Networking for Security",
        "Common Cyber Threats",
        "Passwords and MFA"
      ];
    }
    return commonBasics;
  },

  /**
   * Calculates the appropriate OpenRouter model based on difficulty level.
   */
  getOpenRouterModel(level: string): string {
    const l = level.toLowerCase();
    if (l.includes('beginner') || l.includes('phase 0') || l.includes('phase 1')) return "openai/gpt-4o-mini";
    if (l.includes('intermediate') || l.includes('phase 2') || l.includes('phase 3')) return "anthropic/claude-3-haiku";
    if (l.includes('advanced') || l.includes('phase 4')) return "anthropic/claude-3.5-sonnet"; 
    if (l.includes('expert') || l.includes('phase 5')) return "anthropic/claude-3-opus";
    return "google/gemini-2.0-flash-exp:free"; 
  },

  /**
   * Deterministic Template Engine for when AI fails.
   */
  generateFromTemplate(path: string, stage: string, difficulty: string, title: string, index: number): any {
    return {
      title,
      path,
      difficulty,
      stage,
      lessonNumber: index,
      objective: `Understand the core principles of ${title} within the context of ${path}.`,
      analogy: `Think of ${title} as a specialized tool in a master craftsman's toolkit. It serves a specific, indispensable purpose.`,
      explanation: `In the world of ${path}, ${title} is a fundamental concept. It allows developers to structure logic and data effectively. This lesson covers the technical definition, usage patterns, and why it's critical for modern engineering standards.`,
      codeExample: `// Example usage of ${title}\nfunction demo() {\n  console.log("Mastering ${title} in ${path}");\n}`,
      codeExplanation: `This code snippet demonstrates the basic syntax and implementation of ${title}. Notice how it integrates with the surrounding system logic.`,
      commonMistakes: [
        `Ignoring proper initialization of ${title}.`,
        `Over-complicating the implementation logic.`,
        `Failing to consider edge cases in ${path}.`
      ],
      exercises: [
        `Implement a basic version of ${title} in your IDE.`,
        `Modify the demo code to include a new parameter.`,
        `Write a short paragraph explaining the benefits of ${title}.`
      ],
      summary: `${title} is a cornerstone of ${path}. By mastering it, you ensure your software is robust and scalable.`,
      knowledgeCheck: [
        { "question": `What is the primary role of ${title}?`, "options": ["Option A", "Option B", "Option C"], "answer": "Option A" },
        { "question": `Which stage is ${title} associated with?`, "options": [stage, "Advanced", "None"], "answer": stage }
      ],
      project: {
        "title": `Mini Lab: ${title}`,
        "steps": ["Initialize environment", `Implement ${title}`, "Verify output"]
      },
      interviewQuestions: [`Explain ${title} to a non-technical stakeholder.`, `What are the trade-offs of using ${title}?`],
      realWorldInsight: `At companies like Google and Netflix, ${title} is used to ensure system scalability and maintainability.`,
      nextLessonConnection: `This foundation leads directly into more complex ${path} patterns.`,
      status: "draft"
    };
  },

  /**
   * Adaptive Decision Engine: Determines the next lesson based on performance.
   * Now strictly follows: difficulty > stage > orderIndex
   */
  async decideNextLesson(skillId: string, userId: string, pathTitle: string): Promise<{ title: string, stage: string, difficulty: string, orderIndex: number }> {
    const foundations = this.getPhase0Lessons(pathTitle);
    const checkpointRef = ref(db, `curriculum_checkpoints/${skillId}`);
    const checkpoint = await firebaseSafeGet<CurriculumCheckpoint>(checkpointRef, "Checkpoint");
    
    // Default to first foundation
    if (!checkpoint) {
      return { 
        title: foundations[0], 
        stage: this.STAGES[0], 
        difficulty: "Beginner",
        orderIndex: 0
      };
    }

    const nextIndex = checkpoint.lastLessonIndex + 1;

    // Phase 0: Foundations (Always Beginner)
    if (nextIndex < foundations.length) {
      return { 
        title: foundations[nextIndex], 
        stage: this.STAGES[0], 
        difficulty: "Beginner",
        orderIndex: nextIndex
      };
    }

    // Advanced Logic: Map index to stages and difficulties
    // We want a smooth progression
    const totalFoundations = foundations.length;
    const offsetIndex = nextIndex - totalFoundations;
    
    // Determine Stage
    // Each stage has approx 10-15 lessons
    const stageIndex = Math.min(Math.floor(offsetIndex / 12) + 1, this.STAGES.length - 1);
    const stage = this.STAGES[stageIndex];
    
    // Determine Difficulty
    // Stages 0-1: Beginner, 2-3: Intermediate, 4: Advanced, 5: Expert
    let difficulty = "Beginner";
    if (stageIndex >= 2 && stageIndex <= 3) difficulty = "Intermediate";
    if (stageIndex === 4) difficulty = "Advanced";
    if (stageIndex === 5) difficulty = "Expert";

    const title = `Advanced ${pathTitle}: ${stage} Deep Dive - Module ${offsetIndex + 1}`;

    return { 
      title, 
      stage, 
      difficulty,
      orderIndex: nextIndex
    };
  },

  /**
   * Autonomous Generation Run: Processes a batch of lessons sequentially.
   * Optimized for SPEED and DETERMINISTIC FAILBACK.
   */
  async runAutonomousLoop(skillId: string, pathTitle: string, onProgress: (msg: string) => void) {
    if (!isAiConfigured()) {
      onProgress("AI not configured. Using Template Engine...");
    }

    onProgress(`[Ultra-Speed Engine] Initializing for ${pathTitle}...`);

    let checkpointRef = ref(db, `curriculum_checkpoints/${skillId}`);
    let checkpoint = await firebaseSafeGet<CurriculumCheckpoint>(checkpointRef, "Checkpoint");

    if (!checkpoint) {
      checkpoint = {
        path: pathTitle,
        skillId,
        lastLessonIndex: -1,
        currentStage: this.STAGES[0],
        completedStages: [],
        nextLessonTitle: this.getPhase0Lessons()[0],
        timestamp: Date.now()
      };
      await firebaseSafeSet(checkpointRef, checkpoint, "InitCheckpoint");
    }

    const BATCH_SIZE = 5; 
    let count = 0;
    let circuitBroken = false;

    while (count < BATCH_SIZE) {
      const next = await this.decideNextLesson(skillId, "global", pathTitle);
      
      try {
        let data = null;

        if (!circuitBroken) {
          const model = this.getOpenRouterModel(next.difficulty);
          const prompt = this.getLessonPrompt(pathTitle, next.stage, next.difficulty, next.title);
          
          onProgress(`[AI] Processing: ${next.title}...`);
          const result = await ultraFastGenerate(prompt, model);

          if (result === "ERROR_QUOTA_REACHED") {
            onProgress(`[Circuit Breaker] Quota reached. Switching to Deterministic Template Engine.`);
            circuitBroken = true;
          } else if (result && result !== "ERROR_AI_FAILED") {
            try {
              data = safeJsonParse(result);
            } catch (e) {
              console.warn("[Speed Engine] Result decoding failed.", e);
            }
          }
        }

        // 🛡 Use Template Engine if AI failed or circuit is broken
        if (!data) {
          if (!circuitBroken) onProgress(`[Strategy] AI Failed. Engaging Template Engine...`);
          data = this.generateFromTemplate(pathTitle, next.stage, next.difficulty, next.title, next.orderIndex);
        }

        if (data) {
          const lessonId = generateSlug(next.title);
          const qualityScore = ModerationService.calculateQualityScore(data);

          const lessonData = {
            ...data,
            lessonId,
            path: pathTitle,
            pathId: skillId,
            stage: next.stage,
            difficulty: next.difficulty,
            title: next.title,
            lessonNumber: next.orderIndex,
            orderIndex: next.orderIndex,
            checkpointIndex: next.orderIndex,
            estimatedMinutes: 20, // Default estimation
            isPublished: false,
            status: "draft",
            active: false,
            qualityScore,
            updatedAt: Date.now(),
            createdAt: Date.now()
          };

          await firebaseSafeSet(`ai_generated_lessons/${skillId}/${lessonId}`, lessonData, "LessonSave");

          checkpoint.lastLessonIndex++;
          checkpoint.currentStage = next.stage;
          checkpoint.timestamp = Date.now();
          
          await firebaseSafeSet(checkpointRef, checkpoint, "CheckpointUpdate");
          
          onProgress(`✔ Step ${checkpoint.lastLessonIndex} complete.`);
          count++;

          if (checkpoint.lastLessonIndex % 10 === 0 && checkpoint.lastLessonIndex > 0) {
            onProgress(`Generating Capstone Project...`);
            await this.generateStageProject(skillId, pathTitle, next.stage, next.difficulty);
          }
        }
      } catch (err) {
        onProgress(`✘ Engine bypass error. Checkpoint: ${checkpoint.lastLessonIndex}.`);
        break;
      }
    }
  },

  /**
   * RE-SEQUENCING ENGINE: Realigns user progress based on corrected ordering.
   */
  async realignUserProgress(userId: string, skillId: string) {
    const progressRef = ref(db, `users/${userId}/progress`);
    const snap = await get(progressRef);
    if (!snap.exists()) return;
    const progress = snap.val();

    const lessonsRef = ref(db, `lessons/${skillId}`);
    const lessonsSnap = await get(lessonsRef);
    if (!lessonsSnap.exists()) return;
    const lessonsRaw = lessonsSnap.val();

    const difficultyWeights: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
    const stageWeights: Record<string, number> = {
      'Foundations': 1,
      'Core Concepts': 2,
      'Practical Skills': 3,
      'Real Projects': 4,
      'Advanced Systems': 5,
      'Career Readiness': 6
    };

    const sortedLessons: any[] = Object.values(lessonsRaw).sort((a: any, b: any) => {
      const diffA = difficultyWeights[a.difficulty] || 99;
      const diffB = difficultyWeights[b.difficulty] || 99;
      if (diffA !== diffB) return diffA - diffB;
      
      const stageA = stageWeights[a.stage] || 99;
      const stageB = stageWeights[b.stage] || 99;
      if (stageA !== stageB) return stageA - stageB;
      
      return (a.orderIndex ?? a.lessonNumber ?? 0) - (b.orderIndex ?? b.lessonNumber ?? 0);
    });

    const nextLesson: any = sortedLessons.find((l: any) => !progress.completedLessons?.includes(l.lessonId || l.id));
    
    if (nextLesson) {
       await update(progressRef, {
          currentLessonId: nextLesson.lessonId || nextLesson.id,
          currentStage: nextLesson.difficulty || 'Beginner',
          currentPhaseId: nextLesson.stage || 'Foundations'
       });
       return { success: true, nextLesson: nextLesson.title };
    }
    return { success: false, msg: "Already completed all lessons." };
  },

  async generateStageProject(skillId: string, path: string, stage: string, difficulty: string) {
    const prompt = `
      You are a Senior Project Architect at a top engineering university.
      Generate a professional Capstone Project for the "${stage}" of the ${path} program.
      
      DIFFICULTY TARGET: ${difficulty}
      - Beginner: Small interactive UI apps or basic logic scripts. Focus on syntax.
      - Intermediate: Multi-component functional apps with state management.
      - Advanced: Full systems with API integration, optimization, and testing.
      - Expert: High-scale architecture, infrastructure-as-code, and complex algorithms.
      
      The project should be a definitive test of all concepts learned in this phase.
      
      Format (JSON):
      {
        "title": "...",
        "description": "...",
        "objectives": ["Goal 1", "Goal 2"],
        "tasks": ["Task 1", "Task 2"],
        "difficulty": "${difficulty}",
        "xpReward": ${difficulty === 'Beginner' ? 200 : difficulty === 'Intermediate' ? 500 : 1000}
      }
    `;
    const raw = await smartGenerate(prompt);
    const data = safeJsonParse(raw);
    if (data) {
      await firebaseSafeSet(`curriculum_projects/${skillId}/${generateSlug(data.title)}`, data, "ProjectSave");
    }
  },

  getLessonPrompt(path: string, stage: string, difficulty: string, title: string) {
    return `
      You are a world-class, strict university professor teaching ${path}. 
      Target: Absolute beginners with zero knowledge.
      
      CURRICULUM FLOW:
      Every path must progress from:
      1. Foundations (Zero knowledge)
      2. Core Concepts
      3. Practical Skills
      4. Real Projects
      5. Advanced Systems
      6. Career Readiness
      
      CONTEXT:
      Path: ${path}
      Stage: ${stage}
      Difficulty: ${difficulty}
      Lesson Title: "${title}"
      
      STRICT TEACHING RULES:
      1. objective: One clear learning goal.
      2. analogy: Memorable real-world comparison.
      3. explanation: Deep academic but clear technical text.
      4. codeExample: Clean, professional code snippet.
      5. codeExplanation: Line-by-line breakdown of the code.
      6. commonMistakes: 3-5 common pitfalls for beginners.
      7. exercises: 3 hands-on tasks for students.
      8. summary: 2-3 sentences of core takeaways.
      9. knowledgeCheck: 3-5 multiple choice questions.
      10. project: Tiny lab with steps.
      11. interviewQuestions: 2-3 potential job interview questions on this topic.
      12. realWorldInsight: How this is used at big tech companies (FAANG).
      13. nextLessonConnection: Logical bridge to the next topic.
      
      RETURN JSON ONLY:
      {
        "title": "${title}",
        "path": "${path}",
        "difficulty": "${difficulty}",
        "stage": "${stage}",
        "lessonNumber": 0,
        "estimatedMinutes": 20,
        "objective": "...",
        "analogy": "...",
        "explanation": "...",
        "codeExample": "...",
        "codeExplanation": "...",
        "commonMistakes": ["...", "..."],
        "exercises": ["...", "..."],
        "summary": "...",
        "knowledgeCheck": [
          { "question": "...", "options": ["...", "..."], "answer": "..." }
        ],
        "project": {
          "title": "...",
          "steps": ["..."]
        },
        "interviewQuestions": ["...", "..."],
        "realWorldInsight": "...",
        "nextLessonConnection": "..."
      }
    `;
  }
};
