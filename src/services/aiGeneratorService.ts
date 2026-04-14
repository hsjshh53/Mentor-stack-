import { GoogleGenAI, Type } from "@google/genai";
import { ref, set, push, get, update, remove } from "firebase/database";
import { db } from "../lib/firebase";
import { 
  Skill, 
  CurriculumPath, 
  CurriculumStage, 
  CurriculumWeek,
  CurriculumModule, 
  CurriculumLesson,
  GeneratedLesson 
} from "../types";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export type GenerationMode = 'missing' | 'update' | 'regenerate';

/**
 * Normalizes a title for consistent comparison.
 */
export const normalizeTitle = (title: string): string => {
  return title.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
};

/**
 * Generates a consistent slug from a title.
 */
export const generateSlug = (title: string): string => {
  return title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

/**
 * Robustly parses JSON from AI response, handling potential markdown wrappers 
 * and unescaped control characters.
 */
const safeJsonParse = (text: string) => {
  if (!text) return null;
  
  let cleaned = text.trim();
  
  // Remove markdown code blocks
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("Standard JSON.parse failed, attempting to fix control characters...", e);
    
    // Fix common AI JSON errors: literal newlines/tabs inside strings
    // We only want to escape control characters that are actually inside string literals.
    // A common brute-force fix that works for most AI outputs:
    const fixed = cleaned.replace(/[\u0000-\u001F]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code === 10) return '\\n'; // newline
      if (code === 13) return '\\r'; // carriage return
      if (code === 9) return '\\t';  // tab
      return ''; // remove other control characters
    });
    
    try {
      return JSON.parse(fixed);
    } catch (e2) {
      console.error("Failed to parse JSON even after cleaning:", e2);
      console.log("Original text:", text);
      throw new Error(`Failed to parse AI response: ${e2 instanceof Error ? e2.message : String(e2)}`);
    }
  }
};

export const generateRoadmap = async (
  skill: Skill,
  onProgress: (progress: number, status: string) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");

  const skillId = skill.id;

  // 0. Handle Regenerate Mode
  if (mode === 'regenerate') {
    onProgress(5, "Wiping existing curriculum for regeneration...");
    const stagesSnap = await get(ref(db, `curriculum_stages/${skillId}`));
    if (stagesSnap.exists()) {
      const stagesData = stagesSnap.val();
      for (const sId in stagesData) {
        const weeksSnap = await get(ref(db, `curriculum_weeks/${sId}`));
        if (weeksSnap.exists()) {
          const weeksData = weeksSnap.val();
          for (const wId in weeksData) {
            await remove(ref(db, `curriculum_modules/${wId}`));
          }
        }
        await remove(ref(db, `curriculum_weeks/${sId}`));
      }
    }
    await Promise.all([
      remove(ref(db, `curriculum_paths/${skillId}`)),
      remove(ref(db, `curriculum_stages/${skillId}`)),
      remove(ref(db, `ai_generated_lessons/${skillId}`))
    ]);
  }

  // 1. Fetch Existing Data for Duplicate Checks
  onProgress(10, "Checking existing curriculum structure...");
  const [existingPathSnap, existingStagesSnap] = await Promise.all([
    get(ref(db, `curriculum_paths/${skillId}`)),
    get(ref(db, `curriculum_stages/${skillId}`))
  ]);

  const existingPath = existingPathSnap.val() as CurriculumPath | null;
  const existingStages = existingStagesSnap.exists() ? Object.values(existingStagesSnap.val()) as CurriculumStage[] : [];
  
  const existingStagesMap = new Map<string, CurriculumStage>();
  existingStages.forEach(s => existingStagesMap.set(normalizeTitle(s.title), s));

  // If path exists and we are in 'missing' mode, we might still want to generate missing stages/weeks/modules
  // But if the path is already deep, we should be careful.

  onProgress(15, `Designing ${skill.category} roadmap...`);

  const isLanguage = skill.category === 'coding-languages';
  const isCareerPrep = skill.category === 'career-prep';
  
  let prompt = '';
  
  if (isLanguage) {
    prompt = `
    You are a senior curriculum architect for MentorStack Academy.
    Design a comprehensive, professional "Zero-to-Pro" learning program for the coding language: "${skill.title}".
    This program must cover the language/technology in extreme depth, from basic syntax to advanced internals and professional usage.
    
    The program must cover 5 distinct stages:
    1. Foundations: Syntax, core concepts, basic structure, and environment setup.
    2. Intermediate Concepts: Control flow, data structures, styling (if CSS), or core logic.
    3. Advanced Patterns: Complex structures, optimization, best practices, and advanced features.
    4. Professional Internals: Performance, security, architecture, and advanced integration.
    5. Ecosystem & Projects: Build systems, testing, professional tools, and building a major capstone project in ${skill.title}.

    IMPORTANT: 
    - If this is HTML, focus ONLY on HTML (Semantic HTML, Accessibility, SEO, Forms, etc.).
    - If this is CSS, focus ONLY on CSS (Selectors, Box Model, Flexbox, Grid, Animations, etc.).
    - If this is a programming language (JS, Python, Java, etc.), focus on its specific syntax and paradigms.
    - Focus ONLY on the ${skill.title} and its immediate ecosystem.
    - Every module title must be unique and descriptive.
    - The total duration is ${skill.estimatedWeeks} weeks.
    - Distribute these weeks across the stages logically.
    - Each week must have 2-3 deep modules.

    Return a JSON object with this structure:
    {
      "path": {
        "title": "Mastering ${skill.title}: The Complete Professional Guide",
        "description": "A comprehensive journey from absolute beginner to expert ${skill.title} programmer.",
        "summary": "Master ${skill.title} through a structured ${skill.estimatedWeeks}-week program.",
        "durationWeeks": ${skill.estimatedWeeks},
        "targetOutcome": "${skill.careerOutcome}",
        "estimatedDuration": "${skill.estimatedCompletionTime}",
        "projectsCount": number,
        "jobOutcome": "${skill.careerOutcome}"
      },
      "stages": [
        {
          "title": "Stage Title",
          "levelName": "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Career Prep",
          "order": number,
          "weeks": [
            {
              "weekNumber": number,
              "title": "Week Title",
              "description": "What this week covers in depth",
              "learningGoals": ["Goal 1", "Goal 2", "Goal 3"],
              "modules": [
                {
                  "title": "Module Title",
                  "description": "What this module covers",
                  "order": number,
                  "estimatedDuration": "4-6 hours"
                }
              ]
            }
          ]
        }
      ]
    }
  `;
  } else if (isCareerPrep) {
    prompt = `
    You are a senior career coach and talent acquisition expert for MentorStack Academy.
    Design a comprehensive "Job-Ready" career preparation program for: "${skill.title}".
    This program must focus on non-technical skills, personal branding, and job search strategies.
    
    The program must cover 5 distinct stages:
    1. Personal Branding: Resume, LinkedIn, and portfolio strategy.
    2. Networking & Outreach: Cold emailing, informational interviews, and community building.
    3. Interview Mastery: Behavioral questions, STAR method, and mock interviews.
    4. Technical Interview Strategy: How to approach coding challenges and system design (from a process perspective).
    5. Job Search & Negotiation: Offer evaluation, salary negotiation, and long-term career growth.

    The total duration is ${skill.estimatedWeeks} weeks.
    Distribute these weeks across the stages logically.
    Each week must have 2-3 deep modules.
    
    IMPORTANT: 
    - Every module title must be unique and descriptive.

    Return a JSON object with this structure:
    {
      "path": {
        "title": "${skill.title}: Professional Career Prep",
        "description": "A comprehensive journey from job seeker to hired professional.",
        "summary": "Master the art of the job search through a structured ${skill.estimatedWeeks}-week program.",
        "durationWeeks": ${skill.estimatedWeeks},
        "targetOutcome": "${skill.careerOutcome}",
        "estimatedDuration": "${skill.estimatedCompletionTime}",
        "projectsCount": number,
        "jobOutcome": "${skill.careerOutcome}"
      },
      "stages": [
        {
          "title": "Stage Title",
          "levelName": "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Career Prep",
          "order": number,
          "weeks": [
            {
              "weekNumber": number,
              "title": "Week Title",
              "description": "What this week covers in depth",
              "learningGoals": ["Goal 1", "Goal 2", "Goal 3"],
              "modules": [
                {
                  "title": "Module Title",
                  "description": "What this module covers",
                  "order": number,
                  "estimatedDuration": "4-6 hours"
                }
              ]
            }
          ]
        }
      ]
    }
  `;
  } else {
    prompt = `
    You are a senior curriculum architect for MentorStack Academy, a world-class technology school.
    Design a comprehensive, professional "Zero-to-Pro" academy program for the ${skill.category}: "${skill.title}".
    This is for a high-end career platform. The program must be deep, practical, and job-ready.
    
    The program must cover 5 distinct stages:
    1. Beginner: Digital foundations, core concepts, mental models, and environment setup.
    2. Intermediate: Practical application, common patterns, building functional features, and best practices.
    3. Advanced: Complex systems, optimization, architecture, performance, and scalability.
    4. Expert: Industry standards, security, testing, advanced integration, and leadership.
    5. Career Prep: Interview mastery, portfolio building, job-readiness, and professional networking.

    The total duration is ${skill.estimatedWeeks} weeks.
    Distribute these weeks across the stages logically.
    Each week must have 2-3 deep modules.
    
    IMPORTANT: 
    - Do not mix content from other programs. If this is ${skill.title}, focus ONLY on ${skill.title}.
    - Ensure "Digital Foundations" are included in the Beginner stage if appropriate for the skill.
    - Every module title must be unique and descriptive.

    Return a JSON object with this structure:
    {
      "path": {
        "title": "Professional ${skill.title} Academy Program",
        "description": "A comprehensive journey from absolute beginner to job-ready ${skill.title} professional.",
        "summary": "Master ${skill.title} through a structured ${skill.estimatedWeeks}-week program.",
        "durationWeeks": ${skill.estimatedWeeks},
        "targetOutcome": "${skill.careerOutcome}",
        "estimatedDuration": "${skill.estimatedCompletionTime}",
        "projectsCount": number,
        "jobOutcome": "${skill.careerOutcome}"
      },
      "stages": [
        {
          "title": "Stage Title",
          "levelName": "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Career Prep",
          "order": number,
          "weeks": [
            {
              "weekNumber": number,
              "title": "Week Title",
              "description": "What this week covers in depth",
              "learningGoals": ["Goal 1", "Goal 2", "Goal 3"],
              "modules": [
                {
                  "title": "Module Title",
                  "description": "What this module covers",
                  "order": number,
                  "estimatedDuration": "4-6 hours"
                }
              ]
            }
          ]
        }
      ]
    }
  `;
  }

  try {
    const result = await (ai as any).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            path: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                summary: { type: Type.STRING },
                durationWeeks: { type: Type.NUMBER },
                targetOutcome: { type: Type.STRING },
                estimatedDuration: { type: Type.STRING },
                projectsCount: { type: Type.NUMBER },
                jobOutcome: { type: Type.STRING }
              },
              required: ["title", "description", "summary", "durationWeeks", "targetOutcome", "estimatedDuration", "projectsCount", "jobOutcome"]
            },
            stages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  levelName: { type: Type.STRING },
                  order: { type: Type.NUMBER },
                  weeks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        weekNumber: { type: Type.NUMBER },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        learningGoals: { type: Type.ARRAY, items: { type: Type.STRING } },
                        modules: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              title: { type: Type.STRING },
                              description: { type: Type.STRING },
                              order: { type: Type.NUMBER },
                              estimatedDuration: { type: Type.STRING }
                            },
                            required: ["title", "description", "order", "estimatedDuration"]
                          }
                        }
                      },
                      required: ["weekNumber", "title", "description", "learningGoals", "modules"]
                    }
                  }
                },
                required: ["title", "levelName", "order", "weeks"]
              }
            }
          },
          required: ["path", "stages"]
        }
      }
    });

    const data = safeJsonParse(result.text);

    // 1. Save/Update Path
    const pathRef = ref(db, `curriculum_paths/${skillId}`);
    const pathData: CurriculumPath = {
      id: skillId,
      skillId: skillId,
      title: data.path.title,
      description: data.path.description,
      summary: data.path.summary,
      durationWeeks: data.path.durationWeeks,
      targetOutcome: data.path.targetOutcome,
      status: 'draft',
      totalModules: data.stages.reduce((acc: number, s: any) => acc + s.weeks.reduce((wAcc: number, w: any) => wAcc + w.modules.length, 0), 0),
      totalLessons: existingPath?.totalLessons || 0,
      estimatedDuration: data.path.estimatedDuration,
      projectsCount: data.path.projectsCount || 10,
      jobOutcome: data.path.jobOutcome || skill.careerOutcome
    };

    if (mode === 'missing' && existingPath) {
      onProgress(20, "Path already exists, skipping path creation...");
    } else {
      await set(pathRef, pathData);
    }

    let stagesCreated = 0;
    let stagesSkipped = 0;
    let weeksCreated = 0;
    let weeksSkipped = 0;
    let modulesCreated = 0;
    let modulesSkipped = 0;

    // 2. Save Stages, Weeks & Modules
    for (const stageData of data.stages) {
      const normalizedStageTitle = normalizeTitle(stageData.title);
      let stageId: string;
      let stageRef;

      if (mode !== 'regenerate' && existingStagesMap.has(normalizedStageTitle)) {
        const existingStage = existingStagesMap.get(normalizedStageTitle)!;
        stageId = existingStage.id;
        stageRef = ref(db, `curriculum_stages/${skillId}/${stageId}`);
        stagesSkipped++;
        if (mode === 'update') {
          await update(stageRef, {
            title: stageData.title,
            levelName: stageData.levelName,
            order: stageData.order
          });
        }
      } else {
        stageRef = push(ref(db, `curriculum_stages/${skillId}`));
        stageId = stageRef.key!;
        const stage: CurriculumStage = {
          id: stageId,
          curriculumPathId: skillId,
          skillId: skillId,
          title: stageData.title,
          levelName: stageData.levelName,
          order: stageData.order
        };
        await set(stageRef, stage);
        stagesCreated++;
      }

      // Fetch existing weeks for this stage
      const existingWeeksSnap = await get(ref(db, `curriculum_weeks/${stageId}`));
      const existingWeeks = existingWeeksSnap.exists() ? Object.values(existingWeeksSnap.val()) as CurriculumWeek[] : [];
      const existingWeeksMap = new Map<string, CurriculumWeek>();
      existingWeeks.forEach(w => {
        existingWeeksMap.set(`${w.weekNumber}-${normalizeTitle(w.title)}`, w);
      });

      for (const weekData of stageData.weeks) {
        const weekKey = `${weekData.weekNumber}-${normalizeTitle(weekData.title)}`;
        let weekId: string;
        let weekRef;

        if (mode !== 'regenerate' && existingWeeksMap.has(weekKey)) {
          const existingWeek = existingWeeksMap.get(weekKey)!;
          weekId = existingWeek.id;
          weekRef = ref(db, `curriculum_weeks/${stageId}/${weekId}`);
          weeksSkipped++;
          if (mode === 'update') {
            await update(weekRef, {
              title: weekData.title,
              description: weekData.description,
              learningGoals: weekData.learningGoals
            });
          }
        } else {
          weekRef = push(ref(db, `curriculum_weeks/${stageId}`));
          weekId = weekRef.key!;
          const week: CurriculumWeek = {
            id: weekId,
            skillId,
            curriculumPathId: skillId,
            stageId,
            weekNumber: weekData.weekNumber,
            title: weekData.title,
            description: weekData.description,
            learningGoals: weekData.learningGoals
          };
          await set(weekRef, week);
          weeksCreated++;
        }

        // Fetch existing modules for this week
        const existingModulesSnap = await get(ref(db, `curriculum_modules/${weekId}`));
        const existingModules = existingModulesSnap.exists() ? Object.values(existingModulesSnap.val()) as CurriculumModule[] : [];
        const existingModulesMap = new Map<string, CurriculumModule>();
        existingModules.forEach(m => existingModulesMap.set(normalizeTitle(m.title), m));

        for (const moduleData of weekData.modules) {
          const normalizedModuleTitle = normalizeTitle(moduleData.title);
          let moduleRef;

          if (mode !== 'regenerate' && existingModulesMap.has(normalizedModuleTitle)) {
            const existingModule = existingModulesMap.get(normalizedModuleTitle)!;
            moduleRef = ref(db, `curriculum_modules/${weekId}/${existingModule.id}`);
            modulesSkipped++;
            if (mode === 'update') {
              await update(moduleRef, {
                title: moduleData.title,
                description: moduleData.description,
                order: moduleData.order,
                estimatedDuration: moduleData.estimatedDuration
              });
            }
          } else {
            moduleRef = push(ref(db, `curriculum_modules/${weekId}`));
            const module: CurriculumModule = {
              id: moduleRef.key!,
              skillId,
              curriculumPathId: skillId,
              stageId,
              weekId,
              title: moduleData.title,
              description: moduleData.description,
              order: moduleData.order,
              estimatedDuration: moduleData.estimatedDuration
            };
            await set(moduleRef, module);
            modulesCreated++;
          }
        }
      }
    }

    // Update skill with counts
    const skillRef = ref(db, `skills/${skillId}`);
    await update(skillRef, {
      totalStages: data.stages.length,
      totalModules: pathData.totalModules,
      totalProjects: pathData.projectsCount
    });

    const summary = `Roadmap complete! Created: ${stagesCreated} stages, ${weeksCreated} weeks, ${modulesCreated} modules. Skipped: ${stagesSkipped} stages, ${weeksSkipped} weeks, ${modulesSkipped} modules.`;
    onProgress(100, summary);
    return skillId;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};

export const generateFullCurriculum = async (
  skill: Skill,
  onProgress: (progress: number, status: string) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");

  try {
    // 1. Generate Roadmap
    onProgress(5, "Designing full career roadmap...");
    const skillId = await generateRoadmap(skill, (p, s) => onProgress(5 + (p * 0.1), s), mode);

    // 2. Fetch all modules
    onProgress(15, "Fetching generated modules...");
    const stagesRef = ref(db, `curriculum_stages/${skillId}`);
    const stagesSnap = await get(stagesRef);
    
    if (!stagesSnap.exists()) throw new Error("Failed to fetch stages");
    const stages = Object.values(stagesSnap.val()) as CurriculumStage[];
    
    const allModules: { module: CurriculumModule, weekId: string }[] = [];
    for (const stage of stages) {
      const weeksRef = ref(db, `curriculum_weeks/${stage.id}`);
      const weeksSnap = await get(weeksRef);
      if (weeksSnap.exists()) {
        const weeks = Object.values(weeksSnap.val()) as CurriculumWeek[];
        for (const week of weeks) {
          const modsRef = ref(db, `curriculum_modules/${week.id}`);
          const modsSnap = await get(modsRef);
          if (modsSnap.exists()) {
            const modules = Object.values(modsSnap.val()) as CurriculumModule[];
            modules.forEach(m => allModules.push({ module: m, weekId: week.id }));
          }
        }
      }
    }

    // 3. Generate lessons for each module
    const totalModules = allModules.length;
    onProgress(20, `Starting lesson generation for ${totalModules} modules...`);

    for (let i = 0; i < allModules.length; i++) {
      const { module, weekId } = allModules[i];
      const moduleProgress = 20 + ((i / totalModules) * 75);
      
      onProgress(moduleProgress, `Generating lessons for: ${module.title}...`);
      
      // Generate 4-5 lessons per module to reach ~100-150 lessons total
      await generateLessonsForModule(
        skillId,
        module.id,
        module.title,
        skill.title,
        4, // 4 lessons per module
        module.stageId,
        weekId,
        (p, s) => {}, // Internal progress
        mode
      );
    }

    onProgress(100, "Full curriculum and lessons generated successfully!");
    return skillId;
  } catch (error) {
    console.error("Error generating full curriculum:", error);
    throw error;
  }
};

export const generateLessonsForModule = async (
  skillId: string,
  moduleId: string,
  moduleTitle: string,
  skillTitle: string,
  lessonCount: number = 5,
  stageId: string,
  weekId: string,
  onProgress: (progress: number, status: string) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");

  // Fetch existing lessons for duplicate check
  const existingLessonsSnap = await get(ref(db, `ai_generated_lessons/${skillId}`));
  const existingLessons = existingLessonsSnap.exists() ? Object.values(existingLessonsSnap.val()) as GeneratedLesson[] : [];
  const existingLessonsMap = new Map<string, GeneratedLesson>();
  existingLessons.forEach(l => {
    if (l.moduleId === moduleId) {
      existingLessonsMap.set(normalizeTitle(l.title), l);
      existingLessonsMap.set(l.slug, l);
    }
  });

  const prompt = `
    You are a senior technical instructor and subject matter expert for MentorStack Academy.
    Generate ${lessonCount} deep, high-quality, professional lessons for the module "${moduleTitle}" within the "${skillTitle}" academy program.
    
    MentorStack is a world-class coding school. These lessons must be effective, practical, and comprehensive.
    
    If this is a programming language program, focus on language-specific details, syntax, memory models, and idiomatic patterns.
    If this is a career path program, focus on the tools, frameworks, and workflows relevant to that career.
    If this is a development skill program, focus on the core principles, patterns, and architectural decisions of that domain.
    If this is a tool or foundation program, focus on the internal mechanics, configuration, and professional usage of that tool.
    If this is a career prep program, focus on the psychological, strategic, and communication aspects of the job search.
    
    Each lesson must be a JSON object with the following structure:
    {
      "title": "Lesson Title",
      "slug": "unique-slug",
      "summary": "Deep overview of what this lesson covers and why it is essential for a professional.",
      "objectives": "3-5 clear, measurable learning objectives",
      "todayYouAreLearning": "One powerful sentence describing the core takeaway",
      "whyItMatters": "Real-world context, industry relevance, and how this skill is used in top tech companies",
      "explanation": "Extremely detailed teaching content (20-30 lines). Break down complex concepts into digestible but deep professional explanations. Use clear headings and bullet points where appropriate.",
      "analogy": "A brilliant, helpful analogy that makes complex concepts click for real learners",
      "codeExample": "Practical, production-grade, well-commented code snippet that demonstrates the concept in a real-world scenario",
      "lineByLine": "A meticulous, line-by-line breakdown of the code example, explaining the 'why' behind every choice",
      "commonMistakes": ["Mistake 1 with explanation", "Mistake 2 with explanation", "Mistake 3 with explanation"],
      "practice": "A hands-on exercise that mimics a real-world task a developer would do at work",
      "challenge": "A mini-challenge to test deeper understanding and push the learner's boundaries",
      "proTip": "An expert industry secret, performance optimization, or workflow hack related to this topic",
      "recap": "A concise summary of the most critical points to remember",
      "difficulty": "Beginner" | "Intermediate" | "Advanced" | "Expert",
      "estimatedDuration": "30-60 mins",
      "quiz": [
        {
          "question": "A challenging, conceptual question (not just syntax)",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": number,
          "explanation": "Detailed explanation of why the correct answer is right and others are wrong"
        }
      ],
      "project": {
        "title": "Module Project Task: ...",
        "description": "A real-world project task that builds job-ready skills and contributes to a professional portfolio",
        "steps": ["Step 1: ...", "Step 2: ...", "Step 3: ...", "Step 4: ..."]
      },
      "interviewTips": "Specific interview questions and how to answer them professionally for this topic",
      "careerTips": "How to leverage this specific knowledge to advance your career or perform better in a team"
    }

    Return ONLY a JSON array of these objects.
    CRITICAL RULES:
    - Content must be 100% specific to ${skillTitle}. Do NOT include generic coding advice.
    - Focus on job-readiness, industry standards, and professional best practices.
    - The explanation must be deep and high-quality. No shallow content.
    - Ensure no duplicate titles or slugs within this module.
  `;

  try {
    const result = await (ai as any).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              slug: { type: Type.STRING },
              summary: { type: Type.STRING },
              objectives: { type: Type.STRING },
              todayYouAreLearning: { type: Type.STRING },
              whyItMatters: { type: Type.STRING },
              explanation: { type: Type.STRING },
              analogy: { type: Type.STRING },
              codeExample: { type: Type.STRING },
              lineByLine: { type: Type.STRING },
              commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
              practice: { type: Type.STRING },
              challenge: { type: Type.STRING },
              proTip: { type: Type.STRING },
              recap: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              estimatedDuration: { type: Type.STRING },
              quiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.NUMBER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctIndex", "explanation"]
                }
              },
              project: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "description", "steps"]
              },
              interviewTips: { type: Type.STRING },
              careerTips: { type: Type.STRING }
            },
            required: [
              "title", "slug", "summary", "objectives", "todayYouAreLearning", 
              "whyItMatters", "explanation", "analogy", "codeExample", "lineByLine", 
              "commonMistakes", "practice", "challenge", "proTip", "recap", 
              "difficulty", "estimatedDuration", "quiz", "project", "interviewTips", "careerTips"
            ]
          }
        }
      }
    });

    const lessonsData = safeJsonParse(result.text);
    const poolRef = ref(db, `ai_generated_lessons/${skillId}`);

    let lessonsCreated = 0;
    let lessonsSkipped = 0;
    let lessonsUpdated = 0;

    for (let i = 0; i < lessonsData.length; i++) {
      const lesson = lessonsData[i];
      const normalizedLessonTitle = normalizeTitle(lesson.title);
      const lessonSlug = lesson.slug || generateSlug(lesson.title);
      
      const lessonWithMeta: GeneratedLesson = {
        ...lesson,
        id: lessonSlug,
        slug: lessonSlug,
        moduleId,
        weekId,
        skillId,
        curriculumPathId: skillId,
        stageId,
        order: i + 1,
        status: 'pending',
        createdAt: Date.now(),
        body: lesson.explanation,
        prerequisites: [],
        tags: [skillTitle.toLowerCase()]
      };

      if (mode !== 'regenerate' && (existingLessonsMap.has(normalizedLessonTitle) || existingLessonsMap.has(lessonSlug))) {
        if (mode === 'missing') {
          lessonsSkipped++;
          continue;
        } else if (mode === 'update') {
          const existingLesson = existingLessonsMap.get(normalizedLessonTitle) || existingLessonsMap.get(lessonSlug)!;
          // Find the key in the pool
          const poolSnap = await get(poolRef);
          if (poolSnap.exists()) {
            const poolData = poolSnap.val();
            const key = Object.keys(poolData).find(k => poolData[k].id === existingLesson.id);
            if (key) {
              await update(ref(db, `ai_generated_lessons/${skillId}/${key}`), lessonWithMeta);
              lessonsUpdated++;
            }
          }
        }
      } else {
        await set(push(poolRef), lessonWithMeta);
        lessonsCreated++;
      }
    }

    // Update total lesson count in path
    const pathRef = ref(db, `curriculum_paths/${skillId}`);
    const snapshot = await get(pathRef);
    if (snapshot.exists()) {
      const currentCount = snapshot.val().totalLessons || 0;
      await update(pathRef, { totalLessons: currentCount + lessonsCreated });
    }

    // Update skill lesson count
    const skillRef = ref(db, `skills/${skillId}`);
    const skillSnap = await get(skillRef);
    if (skillSnap.exists()) {
      const currentCount = skillSnap.val().totalLessons || 0;
      await update(skillRef, { totalLessons: currentCount + lessonsCreated });
    }

    onProgress(100, `Lessons for ${moduleTitle}: Created ${lessonsCreated}, Updated ${lessonsUpdated}, Skipped ${lessonsSkipped}.`);
    return true;
  } catch (error) {
    console.error("Error generating lessons:", error);
    throw error;
  }
};

export const generateAILessons = async (
  skill: string, 
  count: number, 
  onProgress: (progress: number, status: string) => void
) => {
  // Legacy support or simple generation
};

export const approveLesson = async (skillId: string, lessonKey: string) => {
  const poolRef = ref(db, `ai_generated_lessons/${skillId}/${lessonKey}`);
  const snapshot = await get(poolRef);
  
  if (snapshot.exists()) {
    const lessonData = snapshot.val();
    const mainLessonsRef = ref(db, `lessons/${lessonData.id}`);
    
    await set(mainLessonsRef, {
      ...lessonData,
      status: 'approved',
      approvedAt: Date.now()
    });

    await update(poolRef, { status: 'approved' });
  }
};
