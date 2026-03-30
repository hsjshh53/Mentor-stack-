import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const lessonSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Lesson Title" },
    learningObjective: { type: Type.STRING, description: "Learning Objective" },
    simpleExplanation: { type: Type.STRING, description: "Simple Explanation (beginner-friendly)" },
    whyItMatters: { type: Type.STRING, description: "WHY this matters (real-world context)" },
    analogy: { type: Type.STRING, description: "Real-world analogy" },
    stepByStep: { type: Type.STRING, description: "Step-by-step explanation" },
    codeExample: { type: Type.STRING, description: "Code example (if applicable, use markdown code blocks)" },
    visualExplanation: { type: Type.STRING, description: "Visual explanation (describe UI/behavior)" },
    commonMistakes: { type: Type.STRING, description: "Common mistakes" },
    practiceTask: { type: Type.STRING, description: "Practice task" },
    miniChallenge: { type: Type.STRING, description: "Mini challenge" },
    reflectionQuestion: { type: Type.STRING, description: "Reflection question" },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["question", "options", "correctAnswer", "explanation"]
      }
    }
  },
  required: [
    "title", "learningObjective", "simpleExplanation", "whyItMatters", 
    "analogy", "stepByStep", "codeExample", "visualExplanation", 
    "commonMistakes", "practiceTask", "miniChallenge", "reflectionQuestion", "quiz"
  ]
};

export async function generateLesson(skill: string, level: string, lessonNumber: number) {
  const prompt = `
    You are the core lesson generation engine for MentorStack.
    Generate ONE FULL lesson for the following:
    Skill: ${skill}
    Level: ${level}
    Lesson Number: ${lessonNumber}

    STRICT RULES:
    - Do NOT generate shallow or fast content.
    - Do NOT summarize.
    - Each lesson must feel like a real class.
    - Teach from beginner to expert level based on the requested level.
    - Beginner: Assume zero knowledge, very slow, basic concepts.
    - Intermediate: Build on basics, combine concepts.
    - Advanced: Real-world problems, optimization.
    - Expert: Industry-level thinking, best practices, architecture.
    - Do NOT repeat previous lessons (assume this is part of a progressive path).
    - Each lesson must build on previous ones.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: lessonSchema,
      systemInstruction: "You are a world-class educator and software architect. Your lessons are deep, structured, and highly technical yet accessible."
    }
  });

  return JSON.parse(response.text);
}
