import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LessonInput {
  skill: string;
  tool: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  module: string;
  lessonNumber: number;
  previousContext?: string;
}

export const generateLesson = async (input: LessonInput) => {
  const prompt = `Generate a high-quality, professional development lesson for the following:
  Skill: ${input.skill}
  Tool: ${input.tool}
  Level: ${input.level}
  Module: ${input.module}
  Lesson Number: ${input.lessonNumber}
  Previous Lesson Context: ${input.previousContext || 'None'}

  The lesson MUST follow this exact 13-part structure:
  1. Lesson Title
  2. Learning Objective
  3. Simple Explanation
  4. Why It Matters
  5. Real-world Analogy
  6. Step-by-step Explanation
  7. Code Example (if applicable, use markdown code blocks)
  8. Visual Explanation (Describe what a diagram or image would show)
  9. Common Mistakes
  10. Practice Task
  11. Mini Challenge
  12. Reflection Question
  13. Quiz (3-5 multiple choice questions with options and correct answer)

  Quality Rules:
  - Do NOT generate shallow lessons.
  - Do NOT summarize.
  - Each lesson must feel like a real class.
  - Lessons must build progressively.
  - Match the selected skill/tool exactly.
  - Use professional, encouraging tone.
  - Return the response in a structured JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            objective: { type: Type.STRING },
            simpleExplanation: { type: Type.STRING },
            whyItMatters: { type: Type.STRING },
            analogy: { type: Type.STRING },
            stepByStep: { type: Type.STRING },
            codeExample: { type: Type.STRING },
            visualExplanation: { type: Type.STRING },
            commonMistakes: { type: Type.STRING },
            practiceTask: { type: Type.STRING },
            miniChallenge: { type: Type.STRING },
            reflectionQuestion: { type: Type.STRING },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER, description: "Index of the correct option" }
                }
              }
            }
          },
          required: ["title", "objective", "simpleExplanation", "whyItMatters", "analogy", "stepByStep", "quiz"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating lesson:", error);
    throw error;
  }
};

export const generateCurriculumRoadmap = async (skill: string) => {
  const prompt = `Generate a comprehensive curriculum roadmap for the skill: ${skill}.
  The roadmap should cover:
  - Foundations
  - Core Concepts
  - Practical Skills
  - Advanced Topics
  - Real Projects
  - Job Readiness

  Target 80-150 lessons total.
  Return a structured JSON with modules and suggested lesson titles for each module.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skill: { type: Type.STRING },
            targetLessons: { type: Type.NUMBER },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  lessons: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating curriculum:", error);
    throw error;
  }
};
