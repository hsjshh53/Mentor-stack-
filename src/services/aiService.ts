import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI service lazily to avoid crashing if key is missing
let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing. AI features are disabled.');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const aiService = {
  async generateRoadmap(skill: string, tool: string) {
    const ai = getAI();
    
    const prompt = `Generate a comprehensive curriculum roadmap for learning ${skill} using ${tool}.
    The roadmap must be structured into 6 key sections:
    1. Foundations (Beginner)
    2. Core Concepts (Beginner/Intermediate)
    3. Practical Skills (Intermediate)
    4. Advanced Topics (Advanced)
    5. Real Projects (Advanced)
    6. Job Readiness (Advanced)

    For each section, provide 2-3 modules. Each module needs:
    - name: module name
    - description: short description
    - level: beginner, intermediate, or advanced
    - lessonRange: e.g. "1-10"
    - targetCount: number of lessons (total should be 80-150 across all modules)

    Return the roadmap as a JSON object.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  level: { type: Type.STRING, enum: ["beginner", "intermediate", "advanced"] },
                  lessonRange: { type: Type.STRING },
                  targetCount: { type: Type.NUMBER }
                },
                required: ["id", "name", "description", "level", "lessonRange", "targetCount"]
              }
            }
          },
          required: ["modules"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error('No response from AI');
    return JSON.parse(text);
  },

  async generateLesson(params: {
    skill: string;
    tool: string;
    level: string;
    module: string;
    lessonNumber: number;
    totalLessonsInModule: number;
    context?: string;
  }) {
    const ai = getAI();
    
    const prompt = `Generate a high-quality, deep-dive lesson for ${params.skill} using ${params.tool}.
    Level: ${params.level}
    Module: ${params.module}
    Lesson Number: ${params.lessonNumber} of ${params.totalLessonsInModule} in this module.
    ${params.context ? `Previous Context: ${params.context}` : ''}

    QUALITY RULES:
    - Do NOT generate shallow lessons.
    - Do NOT summarize too fast.
    - Each lesson must feel like a real class.
    - Lessons must build progressively.
    - Do NOT repeat previous lessons.
    - Beginner lessons must be slow and beginner-friendly.
    - Advanced lessons must be deeper and more practical.
    - The tone must match the subject (e.g., HTML lessons feel like HTML, Cybersecurity feels like security).

    Include:
    1. Lesson Title
    2. Learning Objective
    3. Simple Explanation
    4. Why It Matters
    5. Real-world Analogy
    6. Step-by-step Explanation
    7. Code Example (if applicable)
    8. Visual Explanation (described in text)
    9. Common Mistakes
    10. Practice Task
    11. Mini Challenge
    12. Reflection Question (add to recap)
    13. Quiz (3 questions)

    The lesson must be engaging, clear, and follow the MentorStack style.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
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
            recap: { type: Type.STRING }
          },
          required: [
            "title", "todayYouAreLearning", "whyItMatters", "explanation", 
            "analogy", "codeExample", "lineByLine", "commonMistakes", 
            "practice", "challenge", "quiz", "recap"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error('No response from AI');
    
    return JSON.parse(text);
  }
};
