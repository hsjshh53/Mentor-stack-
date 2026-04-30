/**
 * MENTORSTACK AI GENERATOR V3 (ELITE EDITION)
 * Focus: High-density technical knowledge, Career Readiness, and Premium Content.
 * Provider: Gemini 1.5 Pro (Exclusive)
 */

import { ref, update, set, get } from "firebase/database";
import { db } from "../lib/firebase";
import { safeJsonParse, smartGenerate, isAiConfigured } from "../lib/gemini-utils";
import { ModerationService } from "./ModerationService";

// -- CONFIG --

/**
 * Normalizes a title for consistent comparison.
 */
export const generateSlug = (title: string): string => {
  if (!title) return `item-${Math.random().toString(36).substr(2, 9)}`;
  return String(title).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// -- ELITE PROMPTS --

const CURRICULUM_PROMPT = (skillTitle: string) => `
You are MentorStack AI Router. Generate a compact career Learning Path for: "${skillTitle}".
ABSOLUTE RULE: Return ONLY valid JSON. No markdown. No code blocks. No preamble. Single-line strings.

MENTORSTACK STAGES (Mandatory Order):
1. Foundations (Absolute Beginner)
2. Core Concepts (Foundations)
3. Practical Skills (Core Principles)
4. Real Projects (Hand-on Building)
5. Advanced Systems (Industry Grade)
6. Career Readiness (Job-Ready)

{
  "title": "${skillTitle}",
  "careerOverview": "Quick industry summary",
  "salaryRange": { "entry": "$40k+", "mid": "$80k+", "senior": "$130k+" },
  "weeksToMastery": 12,
  "difficulty": "Intermediate",
  "jobReadinessChecklist": ["Skill A", "Skill B"],
  "stages": [
    {
      "title": "Foundations",
      "weeks": [
        {
          "weekNumber": 1,
          "topic": "Main Theme",
          "modules": [
            {
              "title": "Module A",
              "duration": "45m",
              "objective": "Goal",
              "lessons": ["L1", "L2"]
            }
          ]
        }
      ]
    },
    { "title": "Core Concepts", "weeks": [] },
    { "title": "Practical Skills", "weeks": [] },
    { "title": "Real Projects", "weeks": [] },
    { "title": "Advanced Systems", "weeks": [] },
    { "title": "Career Readiness", "weeks": [] }
  ],
  "capstoneProject": {
    "title": "Project",
    "description": "Summary",
    "deliverables": ["A", "B"]
  }
}
`;

export const LESSON_PROMPT = (skillTitle: string, path: string, difficulty: string, topic: string) => `
You are an expert curriculum designer for MentorStack AI Academy.
Generate a structured lesson for:
Topic: "${topic}"
Path: "${path}"
Difficulty: "${difficulty}"

🎯 DIFFICULTY RULES
- Beginner: Absolute zero knowledge. Simple explanations, no heavy jargon, real-life analogies, basic examples only.
- Intermediate: Assumes basic knowledge, introduce real frameworks/tools, structured code, small projects.
- Advanced: Deep system design, optimization concepts, architecture thinking, production-level examples.
- Expert: Industry-level engineering, scalability, distributed systems, performance tuning, real-world case studies.

ABSOLUTE RULES:
- Return ONLY valid JSON. No markdown. No code blocks. No preamble.
- No empty fields. No placeholders.
- Use real-world examples and industry standards.

{
  "title": "${topic}",
  "objective": "1-2 sentences on what will be learned",
  "analogy": "Real-world analogy (difficulty-scaled)",
  "difficulty": "${difficulty}",
  "estimatedMinutes": 20,
  "technicalExplanation": "Deep high-density explanation based on ${difficulty} level",
  "codeExample": "Production-grade working code snippet showing ${difficulty} techniques",
  "stepByStep": ["Step 1 logic", "Step 2 logic"],
  "commonMistakes": ["Mistake 1", "Mistake 2"],
  "careerUseCase": "Real-world scenario in industry",
  "industryInsight": "Industry perspective or trend",
  "knowledgeCheck": {
    "question": "Deep conceptual question tied to ${difficulty} level",
    "options": ["Opt A", "Opt B", "Opt C", "Opt D"],
    "answer": "Opt A"
  },
  "practicalProject": {
    "title": "Real-world Project Name",
    "description": "Project goal and scope scaled for ${difficulty}",
    "steps": ["Actionable step 1", "Actionable step 2", "Actionable step 3"]
  },
  "interviewMastery": ["Interview Q&A 1", "Interview Q&A 2"]
}
`;

// -- CORE GENERATOR V3 --

export const generateEliteCurriculum = async (
  skillId: string, 
  skillTitle: string,
  onProgress: (status: string) => void
) => {
  if (!isAiConfigured()) throw new Error("AI Architecture not initialized. API Keys missing.");
  
  onProgress("Architecting roadmap via Elite AI Engine...");
  const rawText = await smartGenerate(CURRICULUM_PROMPT(skillTitle), onProgress);
  const data = safeJsonParse(rawText);
  if (!data) throw new Error("AI returned empty or invalid roadmap data.");

  onProgress("Structuring career path metadata...");
  
  const updates: any = {};
  
  // Save Path info
  updates[`curriculum_paths/${skillId}`] = {
    id: skillId,
    title: data.title || skillTitle,
    careerOverview: data.careerOverview || "Career path overview in development...",
    salaryRange: data.salaryRange || { entry: "N/A", mid: "N/A", senior: "N/A" },
    jobReadinessChecklist: data.jobReadinessChecklist || [],
    capstoneProject: data.capstoneProject || { title: "Capstone Project", description: "Details to follow", deliverables: [] },
    updatedAt: Date.now()
  };

  // Process Stages
  if (data.stages && Array.isArray(data.stages)) {
    data.stages.forEach((stage: any, sIdx: number) => {
    const stageId = `${skillId}-s${sIdx}`;
    
    // Explicit stage-to-difficulty mapping
    const stageDifficulty = 
      sIdx === 0 ? "Beginner" :
      sIdx === 1 ? "Intermediate" :
      sIdx === 2 ? "Advanced" : "Expert";

    updates[`curriculum_stages/${skillId}/${stageId}`] = {
      id: stageId,
      skillId,
      title: stage.title,
      difficulty: stageDifficulty,
      order: sIdx
    };

    stage.weeks.forEach((week: any, wIdx: number) => {
      const weekId = `${stageId}-w${week.weekNumber}`;
      updates[`curriculum_weeks/${stageId}/${weekId}`] = {
        id: weekId,
        stageId,
        title: week.topic,
        order: week.weekNumber
      };

      week.modules.forEach((mod: any, mIdx: number) => {
        const moduleId = `${weekId}-m${mIdx}`;
        updates[`curriculum_modules/${weekId}/${moduleId}`] = {
          id: moduleId,
          weekId,
          title: mod.title,
          description: mod.objective,
          duration: mod.duration,
          lessonTitles: mod.lessons,
          difficulty: stageDifficulty, // Pass down
          order: mIdx
        };
      });
    });
  });
}

  await update(ref(db), updates);
  return data;
};

export const generateEliteLesson = async (
  skillId: string,
  skillTitle: string,
  moduleTitle: string,
  lessonTitle: string,
  moduleId: string
) => {
  if (!isAiConfigured()) throw new Error("AI Architecture not initialized. API Keys missing.");
  
  // 1. Get accurate context (Path and Difficulty)
  const skillSnap = await get(ref(db, `skills/${skillId}`));
  const skillData = skillSnap.val() || {};
  const path = skillData.category || "Fullstack";

  // 2. Fetch module to get associated difficulty from stage
  // We need to traverse up: module -> week -> stage
  const modSnap = await get(ref(db, `curriculum_modules`));
  const modules = modSnap.val() || {};
  let targetModule: any = null;
  
  // Find the module in the deep structure (weeks -> modules)
  // But wait, the flat modules path is might be easier if it existed.
  // Actually, let's look at the moduleId prefixing logic.
  // moduleId = `${weekId}-m${mIdx}`; weekId = `${stageId}-w${week.weekNumber}`; stageId = `${skillId}-s${sIdx}`;
  
  let difficulty = "Beginner";
  let stage = "Foundations";
  if (moduleId && moduleId.includes('-s')) {
    const stageInfo = moduleId.split('-s')[1]?.split('-')[0];
    const sIdx = parseInt(stageInfo);
    difficulty = 
      sIdx === 0 ? "Beginner" :
      sIdx === 1 ? "Intermediate" :
      sIdx === 2 ? "Advanced" : "Expert";
    
    const MS_STAGES = ["Foundations", "Core Concepts", "Practical Skills", "Real Projects", "Advanced Systems", "Career Readiness"];
    stage = MS_STAGES[sIdx] || "Foundations";
  } else {
    // Fallback detection
    difficulty = 
      lessonTitle.toLowerCase().includes('expert') ? 'Expert' :
      lessonTitle.toLowerCase().includes('advanced') ? 'Advanced' : 
      lessonTitle.toLowerCase().includes('intermediate') ? 'Intermediate' : 'Beginner';
    stage = "Foundations";
  }

  console.log(`[EliteGenerator] Generating ${difficulty} lesson for: ${lessonTitle}`);

  const rawText = await smartGenerate(LESSON_PROMPT(skillTitle, path, difficulty, lessonTitle));
  const data = safeJsonParse(rawText);
  if (!data) throw new Error("AI failed to produce lesson content.");

  const lessonId = generateSlug(lessonTitle);
  const qualityScore = ModerationService.calculateQualityScore(data);
  const lessonData = {
    id: lessonId,
    lessonId,
    skillId,
    pathId: skillId,
    moduleId,
    title: data.title || lessonTitle,
    difficulty: difficulty, // Hardened
    path: path,
    stage: stage, // mapped
    status: "pending",
    isPublished: false,
    qualityScore,
    estimatedMinutes: data.estimatedMinutes || 20,
    createdAt: Date.now(),
    objective: data.objective || "Master this technical concept.",
    analogy: data.analogy || "Think of this conceptually.",
    technicalExplanation: data.technicalExplanation || "Advanced technical implementation details.",
    codeExample: data.codeExample || "// Implementation pending...",
    stepByStep: Array.isArray(data.stepByStep) ? data.stepByStep : [],
    commonMistakes: Array.isArray(data.commonMistakes) ? data.commonMistakes : [],
    careerUseCase: data.careerUseCase || "",
    industryInsight: data.industryInsight || "",
    
    knowledgeCheck: data.knowledgeCheck || { 
      question: "What is the primary benefit of this technical pattern?", 
      options: ["Performance", "Maintainability", "Scalability", "All of the above"],
      answer: "All of the above"
    },
    
    practicalProject: data.practicalProject || {
      title: "Mastery Lab",
      description: "Apply what you learned in a real-world scenario.",
      steps: ["Design", "Build", "Validate"]
    },
    
    interviewMastery: data.interviewMastery || ["Explain the core mechanism", "Discuss performance trade-offs"],
    
    // Legacy support fields for backward compatibility with older UI components
    todayYouAreLearning: data.objective || "A modern engineering standard.",
    explanation: data.technicalExplanation || "Advanced technical implementation details.",
    lineByLineArray: Array.isArray(data.stepByStep) ? data.stepByStep : [],
    codeImplementation: data.codeExample || "// Implementation pending...",
    lineByLine: Array.isArray(data.stepByStep) ? data.stepByStep.join("\n") : "",
    projectTitle: data.practicalProject?.title || "Practical Lab",
    implementationSteps: data.practicalProject?.steps || ["Define core logic", "Implement feature", "Validate output"],
    practice: data.practicalProject ? `Complete the project: ${data.practicalProject.title}` : "Analyze the code implementation above.",
    challenge: data.practicalProject?.steps ? data.practicalProject.steps[0] : "Modify the code to handle edge cases.",
    recap: "You have mastered " + (data.title || lessonTitle) + ".",
    
    quiz: [
      {
        question: data.knowledgeCheck?.question || "Question?",
        options: data.knowledgeCheck?.options || ["A", "B", "C", "D"],
        correctIndex: data.knowledgeCheck?.options && data.knowledgeCheck?.answer 
          ? data.knowledgeCheck.options.indexOf(data.knowledgeCheck.answer) 
          : 0,
        explanation: "This concept ensures industrial-grade code quality."
      }
    ]
  };

  await set(ref(db, `ai_generated_lessons/${skillId}/${lessonId}`), lessonData);
  return lessonData;
};

// Legacy compatibility stubs (to prevent breakage during migration)
export const cancelGeneration = () => {};
export const unifiedAcademyGenerator = async (...args: any[]) => {};
export const generateLessonsForModule = async (...args: any[]) => {};
export const approveLesson = async (skillId: string, lessonId: string) => {
  const stagingRef = ref(db, `ai_generated_lessons/${skillId}/${lessonId}`);
  const snap = await get(stagingRef);
  if (!snap.exists()) throw new Error("Lesson not found in staging pool.");
  
  const lessonData = snap.val();
  const liveRef = ref(db, `lessons/${skillId}/${lessonId}`);
  
  // Update lesson data for live deployment
  const liveData = {
    ...lessonData,
    status: 'published',
    visibility: 'public',
    publishedAt: Date.now()
  };

  await Promise.all([
    set(liveRef, liveData),
    update(stagingRef, { status: 'published', publishedAt: Date.now() })
  ]);
};

export const repairLesson = async (lesson: any, skillTitle: string) => {
  if (!lesson || !lesson.skillId || !lesson.moduleId) throw new Error("Invalid lesson data for repair.");
  return await generateEliteLesson(
    lesson.skillId, 
    skillTitle, 
    lesson.moduleTitle || "General Module", 
    lesson.title, 
    lesson.moduleId
  );
};

export const repairIncompleteLessons = async () => {
  console.log("INTEGRITY SYSTEM: Starting full lesson audit...");
  const lessonsRef = ref(db, 'ai_generated_lessons');
  const skillsRef = ref(db, 'skills');
  
  const [lessonsSnap, skillsSnap] = await Promise.all([get(lessonsRef), get(skillsRef)]);
  if (!lessonsSnap.exists()) return 0;
  
  const skills = skillsSnap.val() || {};
  const data = lessonsSnap.val();
  let repairedCount = 0;
  
  for (const skillId of Object.keys(data)) {
    const skillLessons = data[skillId];
    const skillTitle = skills[skillId]?.title || skillId;
    
    for (const lessonKey of Object.keys(skillLessons)) {
      const lesson = skillLessons[lessonKey];
      const isPlaceholder = 
        !lesson.technicalExplanation || 
        !lesson.projectTitle || 
        lesson.projectTitle === 'No Project Title' ||
        lesson.explanation?.includes("placeholder") ||
        (Array.isArray(lesson.implementationSteps) && lesson.implementationSteps.length === 0);
        
      if (isPlaceholder) {
        console.log(`INTEGRITY SYSTEM: Repairing incomplete lesson: ${lesson.title}`);
        try {
          await generateEliteLesson(
            skillId,
            skillTitle,
            lesson.moduleTitle || "Core Module",
            lesson.title,
            lesson.moduleId || "unassigned"
          );
          repairedCount++;
        } catch (err) {
          console.error(`Failed to repair ${lesson.title}:`, err);
        }
      }
    }
  }
  
  return repairedCount;
};
