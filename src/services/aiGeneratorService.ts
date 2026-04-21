import { GoogleGenAI, Type } from "@google/genai";
import { ref, set, push, get, update, remove } from "firebase/database";
import { db } from "../lib/firebase";
import { sleep, callGeminiWithRetry, safeJsonParse, getQueueStatus } from "../lib/gemini-utils";
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

// Global abort controller for generation tasks
let currentGenerationId: string | null = null;
export const cancelGeneration = () => {
  currentGenerationId = null;
};

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
 * Local helper removed in favor of shared utility from gemini-utils.
 */

export const generateRoadmap = async (
  skill: Skill,
  onProgress: (progress: number, status: string) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");
  const generationId = Math.random().toString(36).substring(7);
  currentGenerationId = generationId;
  let currentProgress = 0;

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
    You are a world-class senior curriculum architect for MentorStack Academy.
    Design a comprehensive, professional "Zero-to-Senior-Engineer" career roadmap for: "${skill.title}".
    This program is for high-end international talent. It must be deep, practical, and rigorous.
    
    The program must cover 5 distinct mastery stages:
    1. Foundations & Mental Models: Core building blocks, syntax, environment setup, and computer science foundations relevant to ${skill.title}.
    2. Deep Dive & Patterns: Practical application, structural patterns, building real features, and idiomatic best practices.
    3. Advanced Systems & Internals: Complex architecture, optimization, underlying mechanics, and scalability.
    4. Enterprise & Professional Excellence: Industry standards (Clean Code, TDD), security, Cloud/CI-CD, and advanced integration.
    5. Career Mastery & Leadership: Strategic interview mastery, professional networking, technical leadership, and building a high-impact capstone portfolio project.

    The curriculum must be extremely thorough.
    
    IMPORTANT: 
    - Every module title must be unique, professional, and descriptive.
    - The total duration is ${skill.estimatedWeeks} weeks.
    - Each week MUST have 2-4 deep modules.
    - Do NOT generate shallow modules. Every module must representative a significant learning milestone.
    - Ensure a logical flow from absolute basics to advanced job-ready skills.

    Return a JSON object with this structure:
    {
      "path": {
        "title": "Professional ${skill.title} Mastery Program",
        "description": "A world-class journey from digital literacy to a career as a senior ${skill.title} professional.",
        "summary": "Master ${skill.title} through a rigorous ${skill.estimatedWeeks}-week career transformation program.",
        "durationWeeks": ${skill.estimatedWeeks},
        "targetOutcome": "${skill.careerOutcome}",
        "estimatedDuration": "${skill.estimatedCompletionTime}",
        "projectsCount": 12,
        "jobOutcome": "${skill.careerOutcome}"
      },
      "stages": [
        {
          "title": "Stage Title (e.g., Foundations of ${skill.title})",
          "levelName": "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Career Prep",
          "order": number,
          "weeks": [
            {
              "weekNumber": number,
              "title": "Week Title (e.g., Reactive Programming & State)",
              "description": "Deep dive into ...",
              "learningGoals": ["Master X", "Understand Z"],
              "modules": [
                {
                  "title": "Module Title",
                  "description": "Deep technical coverage of ...",
                  "order": number,
                  "estimatedDuration": "6-8 hours"
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
    // Add a small jittered startup delay (0-5s) to avoid immediate quota burst
    await sleep(Math.random() * 5000);

    const result = await callGeminiWithRetry(() => (ai as any).models.generateContent({
      model: "gemini-3.1-pro-preview",
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
    }), { id: skillId, name: `Roadmap: ${skill.title}`, priority: 10 });

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
  } catch (error: any) {
    if (currentGenerationId !== generationId) {
      onProgress(0, "Generation cancelled by user.");
      return null;
    }
    console.error("Error generating roadmap:", error);
    let errorMsg = "";
    if (typeof error.message === 'string') errorMsg = error.message;
    else if (error.error?.message) errorMsg = error.error.message;
    else {
      try { errorMsg = JSON.stringify(error); } catch { errorMsg = String(error); }
    }
    
    const errorStr = errorMsg.toLowerCase();
    const isRateLimit = 
      errorStr.includes("429") || 
      errorStr.includes("resource_exhausted") || 
      errorStr.includes("quota") ||
      errorStr.includes("rate limit") ||
      (error.status === 429) ||
      (error.code === 429) ||
      (error.error?.code === 429) ||
      (error.error?.status === "RESOURCE_EXHAUSTED");

    const isTransient = errorStr.includes("500") || errorStr.includes("xhr error") || errorStr.includes("rpc failed") || errorStr.includes("overloaded");

    if (isRateLimit) {
      throw new Error("Academy AI quota reached or busy. Please wait a few minutes before trying again.");
    }
    if (isTransient) {
      throw new Error("Academy Logic Engine is experiencing common network issues. Please try again in a few moments.");
    }
    throw error;
  }
};

export const generateFullCurriculum = async (
  skill: Skill,
  onProgress: (progress: number, status: string, stats?: any) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");
  const generationId = Math.random().toString(36).substring(7);
  currentGenerationId = generationId;

  const stats = {
    modulesTotal: 0,
    modulesDone: 0,
    lessonsCreated: 0,
    lessonsUpdated: 0,
    lessonsSkipped: 0,
    startTime: Date.now()
  };

  try {
    // 1. Generate Roadmap
    onProgress(5, "Designing full career roadmap...", stats);
    const skillId = await generateRoadmap(skill, (p, s) => onProgress(5 + (p * 0.1), s, stats), mode);
    if (!skillId || currentGenerationId !== generationId) return null;

    // 2. Fetch all modules
    onProgress(15, "Fetching generated modules...", stats);
    const stagesRef = ref(db, `curriculum_stages/${skillId}`);
    const [pathSnap, stagesSnap] = await Promise.all([
      get(ref(db, `curriculum_paths/${skillId}`)),
      get(stagesRef)
    ]);
    
    if (!stagesSnap.exists()) throw new Error("Failed to fetch stages");
    const existingPath = pathSnap.val() as CurriculumPath | null;
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

    stats.modulesTotal = allModules.length;
    onProgress(20, `Starting architecture-aware lesson generation for ${stats.modulesTotal} modules...`, stats);

    // Group modules by week for batch processing
    const modulesByWeek: Record<string, typeof allModules> = {};
    allModules.forEach(m => {
      if (!modulesByWeek[m.weekId]) modulesByWeek[m.weekId] = [];
      modulesByWeek[m.weekId].push(m);
    });

    const weekIds = Object.keys(modulesByWeek);
    
    for (const weekId of weekIds) {
      if (currentGenerationId !== generationId) break;
      
      // Stability System Pacing: strictly respect 2 RPM limit
      if (weekId !== weekIds[0]) {
        const cooldown = 45000 + Math.random() * 5000;
        onProgress(
          20 + (stats.modulesDone / stats.modulesTotal) * 75,
          `We're preparing your lessons. AI capacity is temporarily busy. (${Math.round(cooldown/1000)}s)`,
          stats
        );
        await sleep(cooldown);
      }

      const weekModules = modulesByWeek[weekId];
      const weekNumber = weekModules[0].module.weekId; // This is actually the weekId, we need label

      onProgress(
        20 + (stats.modulesDone / stats.modulesTotal) * 75, 
        `Generating lessons ${stats.modulesDone + 1} of ${stats.modulesTotal}...`, 
        stats
      );

      // Implement SMART CACHING / RESUME
      // Check if lessons already exist for these modules if mode is 'missing'
      let modulesToGenerate = weekModules;
      if (mode === 'missing') {
        const existingLessonsSnap = await get(ref(db, `ai_generated_lessons/${skillId}`));
        const existingLessons = existingLessonsSnap.exists() ? Object.values(existingLessonsSnap.val()) as GeneratedLesson[] : [];
        
        modulesToGenerate = weekModules.filter(wm => {
          const hasLessons = existingLessons.some(l => l.moduleId === wm.module.id);
          if (hasLessons) {
            stats.modulesDone++;
            stats.lessonsSkipped += existingLessons.filter(l => l.moduleId === wm.module.id).length;
          }
          return !hasLessons;
        });
      }

      if (modulesToGenerate.length === 0) continue;

      // Use the new Week Batch Generator for high efficiency
      try {
        const result = await generateWeekLessons(
          skillId,
          modulesToGenerate.map(wm => ({ id: wm.module.id, title: wm.module.title, stageId: wm.module.stageId })),
          skill.title,
          weekId,
          () => {},
          mode
        );
        
        if (result) {
          stats.lessonsCreated += result.created;
          stats.lessonsUpdated += result.updated;
          stats.lessonsSkipped += result.skipped;
        }
        stats.modulesDone += modulesToGenerate.length;

        // Incremental save of path progress
        const pathRef = ref(db, `curriculum_paths/${skillId}`);
        await update(pathRef, { 
          totalLessons: (existingPath?.totalLessons || 0) + stats.lessonsCreated,
          updatedAt: Date.now()
        });
      } catch (err) {
        console.error(`Failed to process week batch ${weekId}:`, err);
        // Fallback to individual module generation if week-batch fails (e.g. context too long)
        onProgress(stats.modulesDone / stats.modulesTotal * 100, `Retrying week ${weekId} with individual module processing...`, stats);
        
        for (const { module } of modulesToGenerate) {
          const result = await generateLessonsForModule(
            skillId,
            module.id,
            module.title,
            skill.title,
            4,
            module.stageId,
            weekId,
            () => {},
            mode
          ) as { created: number, updated: number, skipped: number };
          if (result) stats.lessonsCreated += result.created;
          stats.modulesDone++;
        }
      }
    }

    if (currentGenerationId !== generationId) {
      onProgress(0, "Generation cancelled.", stats);
      return null;
    }

    onProgress(100, "Full curriculum and lessons generated successfully!", stats);
    return skillId;
  } catch (error: any) {
    console.error("Error generating full curriculum:", error);
    const errorStr = (error.message || JSON.stringify(error) || "").toLowerCase();
    const isRateLimit = errorStr.includes("429") || errorStr.includes("resource_exhausted") || errorStr.includes("quota");
    const isTransient = errorStr.includes("500") || errorStr.includes("xhr error") || errorStr.includes("rpc failed") || errorStr.includes("overloaded");

    if (isRateLimit) {
      throw new Error("We're preparing your lessons. AI capacity is temporarily busy. Generation will resume automatically later.");
    }
    if (isTransient) {
      throw new Error("Academy AI is currently unstable. We've attempted retries but the connection is failing. Please try again soon.");
    }
    throw error;
  }
};

/**
 * Bachelor generation for an entire week of modules in one request.
 */
export const generateWeekLessons = async (
  skillId: string,
  modules: { id: string, title: string, stageId: string }[],
  skillTitle: string,
  weekId: string,
  onProgress: (progress: number, status: string) => void,
  mode: GenerationMode = 'missing'
) => {
  if (!ai) throw new Error("Gemini API Key not found");

  const moduleTitles = modules.map(m => `"${m.title}"`).join(", ");
  const prompt = `
    Generate 5 deep technical lessons for "${skillTitle}".
    MODULES: ${modules.map(m => m.title).join(", ")}.
    
    Structure:
    - title
    - slug
    - summary
    - objectives (list)
    - explanation
    - codeExample
    - quiz (3 questions)
  `;

  try {
    const queue = getQueueStatus();
    
    // Fallback Mode if Quota is Reached
    if (queue.isPaused) {
      console.warn("AI Engine is paused. Generating fallback template lessons.");
      const data: any = { modules: {} };
      for (const mod of modules) {
        data.modules[mod.id] = Array.from({ length: 1 }).map((_, i) => ({
          title: `${mod.title} Masterclass`,
          slug: generateSlug(`${mod.title} draft`),
          summary: "Learning architecture and mental models.",
          objectives: ["Master core fundamentals", "Implement professional patterns"],
          explanation: "Draft lesson placeholder. Full AI generation will resume when capacity is available.",
          codeExample: "// Code logic here...",
          quiz: [{ question: "Is this a draft?", options: ["Yes", "No"], correctIndex: 0, explanation: "Draft mode." }],
          status: 'draft_generated'
        }));
      }
      
      const poolRef = ref(db, `ai_generated_lessons/${skillId}`);
      const bulkUpdates: any = {};
      let createdTotal = 0;

      for (const mod of modules) {
        const lessons = data.modules[mod.id] || [];
        lessons.forEach((lesson: any, i: number) => {
          const lessonSlug = lesson.slug || generateSlug(lesson.title);
          bulkUpdates[lessonSlug] = {
            ...lesson,
            id: lessonSlug,
            slug: lessonSlug,
            moduleId: mod.id,
            weekId,
            skillId,
            curriculumPathId: skillId,
            stageId: mod.stageId,
            order: i + 1,
            status: 'draft_generated',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            body: lesson.explanation,
            tags: [skillTitle.toLowerCase()]
          };
          createdTotal++;
        });
      }
      if (Object.keys(bulkUpdates).length > 0) await update(poolRef, bulkUpdates);
      return { created: createdTotal, updated: 0, skipped: 0 };
    }

    // Low-Quota Mode Adjustments
    const lessonCountPerModule = queue.lowQuotaMode ? 1 : 2;
    const finalPrompt = queue.lowQuotaMode 
      ? `Generate 1 short, compact technical lesson for each module: ${modules.map(m => m.title).join(", ")}. Focus on efficiency.`
      : prompt;

    const result = await callGeminiWithRetry(() => (ai as any).models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            modules: {
              type: Type.OBJECT,
              additionalProperties: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    slug: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                    explanation: { type: Type.STRING },
                    codeExample: { type: Type.STRING },
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
                    }
                  },
                  required: ["title", "slug", "summary", "objectives", "explanation", "codeExample", "quiz"]
                }
              }
            }
          },
          required: ["modules"]
        }
      }
    }), { id: skillId, name: `Week Batch: ${skillTitle}`, priority: 5 });

    const data = safeJsonParse(result.text);
    if (!data || !data.modules) throw new Error("Invalid batch response from AI Engine");

    const poolRef = ref(db, `ai_generated_lessons/${skillId}`);
    const bulkUpdates: any = {};
    let createdTotal = 0;

    for (const mod of modules) {
      const lessons = data.modules[mod.id] || [];
      lessons.forEach((lesson: any, i: number) => {
        const lessonSlug = lesson.slug || generateSlug(lesson.title);
        bulkUpdates[lessonSlug] = {
          ...lesson,
          id: lessonSlug,
          slug: lessonSlug,
          moduleId: mod.id,
          weekId,
          skillId,
          curriculumPathId: skillId,
          stageId: mod.stageId,
          order: i + 1,
          status: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          body: lesson.explanation,
          tags: [skillTitle.toLowerCase()]
        };
        createdTotal++;
      });
    }

    if (Object.keys(bulkUpdates).length > 0) {
      await update(poolRef, bulkUpdates);
    }

    return { created: createdTotal, updated: 0, skipped: 0 };
  } catch (error: any) {
    console.error("Error in week batch generation:", error);
    
    let errorMsg = "";
    if (typeof error.message === 'string') errorMsg = error.message;
    else if (error.error?.message) errorMsg = error.error.message;
    else {
      try { errorMsg = JSON.stringify(error); } catch { errorMsg = String(error); }
    }
    
    const errorStr = errorMsg.toLowerCase();
    const isRateLimit = 
      errorStr.includes("429") || 
      errorStr.includes("resource_exhausted") || 
      errorStr.includes("quota") ||
      errorStr.includes("rate limit") ||
      (error.status === 429) ||
      (error.code === 429) ||
      (error.error?.code === 429) ||
      (error.error?.status === "RESOURCE_EXHAUSTED");

    if (isRateLimit) {
      throw new Error("We're preparing your lessons. AI capacity is temporarily busy. Generation will continue automatically.");
    }
    
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
): Promise<{ created: number, updated: number, skipped: number }> => {
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
    Generate ${lessonCount} high-quality technical lessons for "${moduleTitle}" in "${skillTitle}".
    
    STRUCTURE:
    - title
    - slug
    - objectives (list)
    - explanation (deep dive)
    - codeExample (production grade)
    - quiz (3 questions)
    
    Return a JSON array of objects with these keys. No generic content.
  `;

  try {
    const queue = getQueueStatus();
    if (queue.isPaused) {
      console.warn("AI Engine is paused. Generating fallback template lessons.");
      const drafts = Array.from({ length: lessonCount }).map((_, i) => {
        const title = `${moduleTitle} Module Pt ${i+1}`;
        const slug = generateSlug(title);
        return {
          id: slug,
          title,
          slug,
          moduleId,
          weekId,
          skillId,
          curriculumPathId: skillId,
          stageId,
          order: i + 1,
          status: 'draft_generated',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          summary: "Learning architecture and mental models.",
          objectives: "Master core fundamentals, Implement professional patterns",
          explanation: "Draft lesson placeholder. AI generation will resume when capacity is available.",
          body: "Draft lesson placeholder. AI generation will resume when capacity is available.",
          codeExample: "// Code logic here...",
          quiz: [{ question: "Is this a draft?", options: ["Yes", "No"], correctIndex: 0, explanation: "Draft mode." }],
          tags: [skillTitle.toLowerCase()],
          difficulty: "Beginner",
          estimatedDuration: "45 mins",
          prerequisites: [],
          todayYouAreLearning: "Fundamentals",
          whyItMatters: "Standard mastery",
          analogy: "Building blocks",
          lineByLine: "N/A",
          commonMistakes: [],
          practice: "Review fundamentals",
          challenge: "Connect concepts",
          proTip: "Stay consistent",
          recap: "Draft complete"
        } as GeneratedLesson;
      });

      const poolRef = ref(db, `ai_generated_lessons/${skillId}`);
      const bulk: any = {};
      drafts.forEach(d => bulk[d.slug] = d);
      await update(poolRef, bulk);

      return { created: drafts.length, updated: 0, skipped: 0 };
    }

    const result = await callGeminiWithRetry(() => (ai as any).models.generateContent({
      model: "gemini-3.1-pro-preview",
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
              explanation: { type: Type.STRING },
              codeExample: { type: Type.STRING },
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
              }
            },
            required: ["title", "slug", "summary", "objectives", "explanation", "codeExample", "quiz"]
          }
        }
      }
    }), { id: moduleId, name: `Lessons: ${moduleTitle}`, priority: 1 });

    const lessonsData = safeJsonParse(result.text) as any[];
    const poolRef = ref(db, `ai_generated_lessons/${skillId}`);

    let created = 0;
    let skipped = 0;
    let updatedCount = 0;

    const addedInBatch = new Set<string>();
    const bulkUpdates: any = {};

    for (let i = 0; i < lessonsData.length; i++) {
      const lesson = lessonsData[i];
      const normalizedLessonTitle = normalizeTitle(lesson.title);
      const lessonSlug = lesson.slug || generateSlug(lesson.title);
      
      // Batch duplicate protection
      if (addedInBatch.has(normalizedLessonTitle) || addedInBatch.has(lessonSlug)) {
        skipped++;
        continue;
      }

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
        updatedAt: Date.now(),
        body: lesson.explanation,
        prerequisites: [],
        tags: [skillTitle.toLowerCase()]
      };

      if (mode !== 'regenerate' && (existingLessonsMap.has(normalizedLessonTitle) || existingLessonsMap.has(lessonSlug))) {
        if (mode === 'missing') {
          skipped++;
          continue;
        } else if (mode === 'update') {
          const existingLesson = existingLessonsMap.get(normalizedLessonTitle) || existingLessonsMap.get(lessonSlug)!;
          bulkUpdates[existingLesson.slug || existingLesson.id] = lessonWithMeta;
          updatedCount++;
        }
      } else {
        bulkUpdates[lessonSlug] = lessonWithMeta;
        created++;
      }
      
      addedInBatch.add(normalizedLessonTitle);
      addedInBatch.add(lessonSlug);
    }

    if (Object.keys(bulkUpdates).length > 0) {
      await update(poolRef, bulkUpdates);
    }

    // Update counts
    if (created > 0) {
      const pathRef = ref(db, `curriculum_paths/${skillId}`);
      const skillRef = ref(db, `skills/${skillId}`);
      const [pathSnap, skillSnap] = await Promise.all([get(pathRef), get(skillRef)]);
      
      const pathUpdates: any = {};
      const skillUpdates: any = {};
      
      if (pathSnap.exists()) pathUpdates.totalLessons = (pathSnap.val().totalLessons || 0) + created;
      if (skillSnap.exists()) skillUpdates.totalLessons = (skillSnap.val().totalLessons || 0) + created;
      
      await Promise.all([
        Object.keys(pathUpdates).length > 0 ? update(pathRef, pathUpdates) : Promise.resolve(),
        Object.keys(skillUpdates).length > 0 ? update(skillRef, skillUpdates) : Promise.resolve()
      ]);
    }

    return { created, updated: updatedCount, skipped };
  } catch (error: any) {
    console.error("Error generating lessons:", error);
    
    let errorMsg = "";
    if (typeof error.message === 'string') errorMsg = error.message;
    else if (error.error?.message) errorMsg = error.error.message;
    else {
      try { errorMsg = JSON.stringify(error); } catch { errorMsg = String(error); }
    }
    
    const errorStr = errorMsg.toLowerCase();
    const isRateLimit = 
      errorStr.includes("429") || 
      errorStr.includes("resource_exhausted") || 
      errorStr.includes("quota") ||
      errorStr.includes("rate limit") ||
      (error.status === 429) ||
      (error.code === 429) ||
      (error.error?.code === 429) ||
      (error.error?.status === "RESOURCE_EXHAUSTED");
    
    const isTransient = errorStr.includes("500") || errorStr.includes("xhr error") || errorStr.includes("rpc failed") || errorStr.includes("overloaded");
    
    if (isRateLimit) {
      throw new Error("Academy Lesson Architect is reaching capacity. Please wait a few minutes and try again.");
    }
    if (isTransient) {
      throw new Error("Academy Lesson Architect is experiencing transient errors. Please try again in a minute.");
    }
    throw error;
  }
};

/**
 * Generates only missing lessons for existing path.
 */
export const generateMissingLessons = async (
  skillId: string,
  onProgress: (p: number, s: string, stats?: any) => void
) => {
  const [skillSnap, stagesSnap] = await Promise.all([
    get(ref(db, `skills/${skillId}`)),
    get(ref(db, `curriculum_stages/${skillId}`))
  ]);

  if (!skillSnap.exists()) throw new Error("Program (Skill) not found in database.");
  if (!stagesSnap.exists()) throw new Error("No curriculum roadmap found for this program. Please generate the Roadmap first.");
  const skill = skillSnap.val() as Skill;
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

  const generationId = Math.random().toString(36).substring(7);
  currentGenerationId = generationId;

  const stats = {
    modulesTotal: allModules.length,
    modulesDone: 0,
    lessonsCreated: 0,
    lessonsUpdated: 0,
    lessonsSkipped: 0,
    startTime: Date.now()
  };

  if (allModules.length === 0) {
    onProgress(100, "Curriculum roadmap is empty. Please add modules or regenerate the roadmap first.", stats);
    return;
  }

  // Group modules by week for batching
  const modulesByWeek: Record<string, typeof allModules> = {};
  allModules.forEach(m => {
    if (!modulesByWeek[m.weekId]) modulesByWeek[m.weekId] = [];
    modulesByWeek[m.weekId].push(m);
  });

  const weekIds = Object.keys(modulesByWeek);
  
  for (const weekId of weekIds) {
    if (currentGenerationId !== generationId) break;
    const weekModules = modulesByWeek[weekId];
    
    onProgress(
      (stats.modulesDone / stats.modulesTotal) * 100, 
      `Auditing lessons for Week ${weekId}...`,
      stats
    );

    // Filter for truly missing modules
    const existingLessonsSnap = await get(ref(db, `ai_generated_lessons/${skillId}`));
    const existingLessons = existingLessonsSnap.exists() ? Object.values(existingLessonsSnap.val()) as GeneratedLesson[] : [];
    
    const modulesToGen = weekModules.filter(wm => {
      const hasLessons = existingLessons.some(l => l.moduleId === wm.module.id);
      if (hasLessons) {
        stats.modulesDone++;
        stats.lessonsSkipped += existingLessons.filter(l => l.moduleId === wm.module.id).length;
      }
      return !hasLessons;
    });

    if (modulesToGen.length === 0) continue;

    // Use Week Batcher
    try {
      const result = await generateWeekLessons(
        skillId,
        modulesToGen.map(wm => ({ id: wm.module.id, title: wm.module.title, stageId: wm.module.stageId })),
        skill.title,
        weekId,
        () => {}
      );

      if (result) {
        stats.lessonsCreated += result.created;
      }
      stats.modulesDone += modulesToGen.length;
    } catch (err) {
      console.warn(`Parallel week batch failed, falling back to module level:`, err);
      for (const { module } of modulesToGen) {
        const result = await generateLessonsForModule(
          skillId,
          module.id,
          module.title,
          skill.title,
          3,
          module.stageId,
          weekId,
          () => {},
          'missing'
        ) as { created: number, updated: number, skipped: number };
        if (result) stats.lessonsCreated += result.created;
        stats.modulesDone++;
      }
    }
  }

  onProgress(100, "Missing lessons generation complete.", stats);
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
