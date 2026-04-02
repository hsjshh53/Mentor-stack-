import { GoogleGenAI, Type } from "@google/genai";
import { db } from "../lib/firebase";
import { ref, set, update, get, push, serverTimestamp } from "firebase/database";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface GenerationProgress {
  totalLessons: number;
  generated: number;
  published: number;
  failed: number;
  targetLessons: number;
  currentModule: string;
  currentLesson: string;
  status: string;
}

export const logActivity = async (message: string, type: 'info' | 'success' | 'error' = 'info') => {
  try {
    const logsRef = ref(db, 'admin/generation_status/logs');
    const newLogRef = push(logsRef);
    await set(newLogRef, {
      message,
      type,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

export const updateGenerationProgress = async (progress: Partial<GenerationProgress>) => {
  try {
    const progressRef = ref(db, 'admin/generation_status/progress');
    await update(progressRef, progress);
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

export const generateFullCurriculum = async (skill: string, batchSize: number = 3, targetCount: number = 120) => {
  const statusRef = ref(db, 'admin/generation_status');
  
  try {
    await logActivity(`[START] Starting full curriculum generation for ${skill} (Batch Size: ${batchSize}, Target: ${targetCount})`, 'info');
    await updateGenerationProgress({ status: 'Running', generated: 0, published: 0, failed: 0, targetLessons: targetCount });
    
    // 1. Generate Roadmap
    await logActivity(`Generating roadmap for ${skill}...`, 'info');
    const roadmap = await generateRoadmap(skill);
    const roadmapRef = ref(db, `roadmaps/${skill.toLowerCase().replace(/\s+/g, '-')}`);
    await set(roadmapRef, {
      ...roadmap,
      updatedAt: Date.now()
    });
    await logActivity(`Roadmap generated successfully for ${skill}`, 'success');

    const totalLessons = roadmap.modules.reduce((acc: number, m: any) => acc + m.lessonTitles.length, 0);
    await updateGenerationProgress({ totalLessons });

    // 2. Flatten all lessons into a queue for batch processing
    const lessonQueue: { moduleTitle: string; lessonTitle: string; lessonIndex: number }[] = [];
    roadmap.modules.forEach((module: any) => {
      module.lessonTitles.forEach((title: string, index: number) => {
        lessonQueue.push({ moduleTitle: module.title, lessonTitle: title, lessonIndex: index + 1 });
      });
    });

    let generatedCount = 0;
    let publishedCount = 0;
    let failedCount = 0;

    // Process in batches
    for (let i = 0; i < lessonQueue.length; i += batchSize) {
      // Check if we should continue, pause, or stop
      let statusSnap = await get(statusRef);
      let statusData = statusSnap.val();

      while (statusData?.isPaused && statusData?.isGenerating) {
        await updateGenerationProgress({ status: 'Paused' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        statusSnap = await get(statusRef);
        statusData = statusSnap.val();
      }

      if (!statusData?.isGenerating) {
        await logActivity(`Generation stopped by admin.`, 'info');
        return;
      }

      const batch = lessonQueue.slice(i, i + batchSize);
      await logActivity(`[BATCH] Starting batch of ${batch.length} lessons (${i + 1}-${Math.min(i + batchSize, lessonQueue.length)})`, 'info');
      
      // Process batch in parallel
      const batchPromises = batch.map(async (item) => {
        try {
          await updateGenerationProgress({ 
            currentLesson: item.lessonTitle,
            currentModule: item.moduleTitle,
            status: 'Generating Batch...'
          });
          
          // Heartbeat
          await update(statusRef, { lastHeartbeat: Date.now() });

          const lesson = await generateLesson(skill, roadmap.tool, 'Beginner', item.moduleTitle, item.lessonIndex, '');
          const lessonId = `${skill.toLowerCase().replace(/\s+/g, '-')}-${item.lessonTitle.toLowerCase().replace(/\s+/g, '-')}`;
          
          const lessonRef = ref(db, `lessons/${lessonId}`);
          await set(lessonRef, {
            ...lesson,
            skill,
            module: item.moduleTitle,
            published: true,
            createdAt: Date.now()
          });
          
          generatedCount++;
          publishedCount++;
          
          await updateGenerationProgress({ 
            generated: generatedCount,
            published: publishedCount,
            status: 'Running'
          });
          
          await logActivity(`[SUCCESS] Lesson completed: ${item.lessonTitle}`, 'success');
        } catch (error) {
          console.error(`Error generating lesson ${item.lessonTitle}:`, error);
          await logActivity(`[ERROR] Failed lesson: ${item.lessonTitle}. Error: ${error instanceof Error ? error.message : 'Unknown'}`, 'error');
          failedCount++;
          await updateGenerationProgress({ failed: failedCount });
          generatedCount++; // Count as processed
        }
      });

      await Promise.all(batchPromises);
      
      // Small delay between batches to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await logActivity(`[COMPLETE] Full curriculum generation finished for ${skill}`, 'success');
    await updateGenerationProgress({ status: 'Completed', currentLesson: 'All Done!', currentModule: 'Finished' });
    await update(statusRef, { isGenerating: false });

  } catch (error) {
    console.error('Error in full curriculum generation:', error);
    await logActivity(`[CRITICAL] Generation failed: ${error instanceof Error ? error.message : String(error)}`, 'error');
    await updateGenerationProgress({ status: 'Failed' });
    await update(statusRef, { isGenerating: false });
  }
};

export const generateRoadmap = async (skill: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive learning roadmap for the skill: ${skill}.
    The roadmap should include:
    1. A primary tool or technology associated with this skill.
    2. A list of modules (Foundations, Core Concepts, Practical Skills, Advanced Topics, Real Projects, Job Readiness).
    3. For each module, a list of 15-25 specific lesson titles that build progressively.
    
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          tool: { type: Type.STRING },
          description: { type: Type.STRING },
          modules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                lessonTitles: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateLesson = async (
  skill: string, 
  tool: string, 
  level: string, 
  module: string, 
  lessonNumber: number, 
  previousContext: string
) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed, high-quality lesson for:
    Skill: ${skill}
    Tool: ${tool}
    Level: ${level}
    Module: ${module}
    Lesson Number: ${lessonNumber}
    
    The lesson MUST follow this exact structure:
    1. Lesson Title
    2. Learning Objective
    3. Simple Explanation
    4. Why It Matters
    5. Real-world Analogy
    6. Step-by-step Explanation
    7. Code Example (if applicable, use markdown)
    8. Visual Explanation (describe what a visual would show)
    9. Common Mistakes
    10. Practice Task
    11. Mini Challenge
    12. Reflection Question
    13. Quiz (3-5 multiple choice questions)
    
    Rules:
    - Do NOT be shallow.
    - Feel like a real class.
    - Build progressively.
    - Match the skill and tool exactly.
    
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          explanation: { type: Type.STRING },
          whyItMatters: { type: Type.STRING },
          analogy: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          codeExample: { type: Type.STRING },
          visualExplanation: { type: Type.STRING },
          commonMistakes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          practiceTask: { type: Type.STRING },
          miniChallenge: { type: Type.STRING },
          reflectionQuestion: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
