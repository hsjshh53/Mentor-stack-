import { ref, get, set, update, push } from 'firebase/database';
import { db, sanitizeFirebaseKey } from '../lib/firebase';
import { GoogleGenAI } from '@google/genai';
import { CURRICULUM } from '../constants/curriculum';
import { CareerPath, LessonContent, Module, PathCurriculum } from '../types';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are MentorStack AI Curriculum Generator. 
Your goal is to generate high-quality, structured curriculum and lessons for developers.
MentorStack is a product of OLYNQ SOCIAL LIMITED.
Always ensure content is professional, step-by-step, and includes practical examples.`;

export interface GenerationProgress {
  currentPath: string;
  status: string;
  count: number;
  total: number;
}

class AIGeneratorService {
  private isGenerating = false;

  async startBackgroundGeneration(onProgress?: (progress: GenerationProgress) => void) {
    if (this.isGenerating) return;
    this.isGenerating = true;

    try {
      // Full list of career paths to ensure all 26+ skills are covered
      const allPaths: CareerPath[] = [
        'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'HTML', 
        'Mobile App Developer', 'Software Engineer', 'Systems Architect', 'QA Engineer', 
        'Data Analyst', 'AI Engineer', 'Machine Learning', 'Data Scientist', 
        'Data Engineer', 'Cybersecurity', 'Ethical Hacking', 'Network Security', 
        'Application Security', 'DevOps Engineer', 'Cloud Engineer', 'SRE', 
        'System Admin', 'Network Engineer', 'Database Administrator', 'Embedded Systems', 
        'Game Developer', 'AR/VR', 'IoT', 'Blockchain', 'Web3', 'Robotics', 
        'UI/UX', 'Product Design', 'UX Designer', 'Product Manager', 'Project Manager', 
        'Business Analyst', 'AI Automation', 'Prompt Engineering', 'Technical Writer', 
        'SEO Specialist', 'Digital Marketer', 'Content Creator', 'HR Specialist', 
        'Sales Specialist', 'Customer Support', 'Virtual Assistant'
      ];
      
      for (const pathKey of allPaths) {
        const pathId = sanitizeFirebaseKey(pathKey);
        const pathData = CURRICULUM[pathKey];

        // 1. Check if curriculum exists in DB
        const pathRef = ref(db, `curriculum/${pathId}`);
        const snapshot = await get(pathRef);
        let dbPath = snapshot.val() as PathCurriculum | null;

        if (!dbPath) {
          // Initialize DB with static curriculum if available, otherwise empty
          await set(pathRef, {
            id: pathId,
            title: pathKey,
            description: pathData?.description || `Master ${pathKey} from zero to hero.`,
            category: pathData?.category || 'General',
            status: 'active',
            icon: pathData?.icon || 'Book',
            skills: pathData?.skills || [pathKey],
            curriculumGenerated: false,
            lessonsGeneratedCount: 0,
            targetLessons: 150,
            generationStatus: 'idle',
            levels: {
              beginner: { id: 'beginner', title: 'Beginner', description: 'Basics', modules: [] },
              intermediate: { id: 'intermediate', title: 'Intermediate', description: 'Intermediate', modules: [] },
              advanced: { id: 'advanced', title: 'Advanced', description: 'Advanced', modules: [] }
            }
          });
          dbPath = (await get(pathRef)).val();
        }

        if (!dbPath) continue;
        if (dbPath.generationStatus === 'completed') continue;

        // 2. Generate Curriculum Structure if not already done
        if (!dbPath.curriculumGenerated) {
          onProgress?.({ currentPath: pathKey, status: 'Generating Curriculum', count: 0, total: 150 });
          await this.generateCurriculumStructure(pathKey, dbPath);
          await update(pathRef, { curriculumGenerated: true });
          dbPath = (await get(pathRef)).val(); // Refresh dbPath
        }

        if (!dbPath) continue;

        // 3. Generate Lessons in batches
        const target = dbPath.targetLessons || 150;
        let currentCount = dbPath.lessonsGeneratedCount || 0;

        while (currentCount < target) {
          onProgress?.({ 
            currentPath: pathKey, 
            status: `Generating Lessons (${currentCount}/${target})`, 
            count: currentCount, 
            total: target 
          });

          const batchSize = 5;
          const successCount = await this.generateLessonBatch(pathKey, dbPath, batchSize);
          
          if (successCount === 0) {
            console.log(`No more lessons to generate for ${pathKey} or batch failed.`);
            break; 
          }

          currentCount += successCount;
          await update(pathRef, { lessonsGeneratedCount: currentCount });
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        await update(pathRef, { generationStatus: 'completed' });
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  private async callGeminiWithRetry(fn: () => Promise<any>, maxRetries = 3): Promise<any> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED');
        if (isRateLimit) {
          const delay = Math.pow(2, i) * 5000; // 5s, 10s, 20s...
          console.warn(`Gemini Rate Limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  private async generateCurriculumStructure(path: CareerPath, dbPath: PathCurriculum) {
    if (!genAI) return;

    const structure = await this.callGeminiWithRetry(async () => {
      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
          parts: [{
            text: `${SYSTEM_PROMPT}
            Generate a detailed curriculum structure for the career path: "${path}".
            The curriculum should have 3 levels: beginner, intermediate, and advanced.
            Each level should have 5-8 modules.
            Each module should have a title, description, and a list of 5-10 lesson topics.
            
            Return as JSON:
            {
              "beginner": [ { "title": "...", "description": "...", "topics": ["topic1", "topic2", ...] }, ... ],
              "intermediate": [ ... ],
              "advanced": [ ... ]
            }`
          }]
        }],
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(result.text);
    });

    const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
    
    for (const level of levels) {
      const modulesData = structure[level];
      const modules: Module[] = modulesData.map((m: any, index: number) => ({
        id: `${dbPath.id}-${level}-mod-${index}`,
        title: m.title,
        description: m.description,
        lessons: m.topics.map((topic: string) => 
          sanitizeFirebaseKey(`${dbPath.id}-${level}-${topic}`)
        ),
        skillId: dbPath.id,
        level: level,
        order: index
      }));

      await update(ref(db, `curriculum/${dbPath.id}/levels/${level}`), { modules });
    }
  }

  private async generateLessonBatch(path: CareerPath, dbPath: PathCurriculum, batchSize: number): Promise<number> {
    if (!genAI) return 0;

    // Find modules that need lessons
    const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
    let lessonsToGenerate: { topic: string; id: string; moduleId: string; difficulty: string; order: number }[] = [];

    for (const level of levels) {
      const levelData = dbPath.levels[level];
      if (!levelData.modules) continue;

      for (const mod of levelData.modules) {
        for (let i = 0; i < mod.lessons.length; i++) {
          const rawLessonId = mod.lessons[i];
          // Sanitize lessonId again just in case it was stored with invalid characters
          const lessonId = sanitizeFirebaseKey(rawLessonId);
          const lessonRef = ref(db, `lessons/${lessonId}`);
          const lessonSnap = await get(lessonRef);
          
          if (!lessonSnap.exists()) {
            lessonsToGenerate.push({
              topic: lessonId.split('-').slice(2).join(' '),
              id: lessonId,
              moduleId: mod.id,
              difficulty: level.charAt(0).toUpperCase() + level.slice(1),
              order: i
            });
          }

          if (lessonsToGenerate.length >= batchSize) break;
        }
        if (lessonsToGenerate.length >= batchSize) break;
      }
      if (lessonsToGenerate.length >= batchSize) break;
    }

    if (lessonsToGenerate.length === 0) return 0;

    let successCount = 0;
    for (const item of lessonsToGenerate) {
      try {
        const lesson = await this.generateSingleLesson(path, item.difficulty, item.topic);
        if (lesson) {
          // Ensure lineByLine is a string to avoid Firebase key errors
          const lineByLineStr = typeof lesson.lineByLine === 'object' 
            ? Object.entries(lesson.lineByLine).map(([k, v]) => `${k}: ${v}`).join('\n')
            : String(lesson.lineByLine || '');

          const finalLesson: LessonContent = {
            ...lesson,
            lineByLine: lineByLineStr,
            id: item.id,
            moduleId: item.moduleId,
            difficulty: item.difficulty as any,
            order: item.order,
            generatedByAI: true,
            published: true,
            createdAt: Date.now()
          };
          await set(ref(db, `lessons/${item.id}`), finalLesson);
          successCount++;
        }
      } catch (error) {
        console.error(`Error generating lesson ${item.id}:`, error);
      }
    }

    return successCount;
  }

  private async generateSingleLesson(path: string, difficulty: string, topic: string): Promise<any> {
    if (!genAI) return null;

    return await this.callGeminiWithRetry(async () => {
      const prompt = `
        Generate a structured lesson for a ${path} at the ${difficulty} level.
        Topic: "${topic}".
        
        IMPORTANT: You are MentorStack AI, part of OLYNQ SOCIAL LIMITED. 
        The lesson content must be simple, clear, and beginner-friendly.
        
        Return the lesson in JSON format with the following keys:
        'title', 'todayYouAreLearning', 'whyItMatters', 'explanation', 'analogy', 'codeExample', 'lineByLine' (MUST be a string, not an object), 'commonMistakes' (array), 'practice', 'challenge', 'quiz' (array of {question, options, correctIndex, explanation}), 'recap'.
        
        Ensure the 'explanation' is short (max 3-4 lines) and the 'practice' section uses active commands.
      `;

      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      return JSON.parse(result.text);
    });
  }
}

export const aiGeneratorService = new AIGeneratorService();
