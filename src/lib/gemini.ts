import { GoogleGenAI } from "@google/genai";
import { CareerPath, LessonContent, Stage } from "../types/index";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are MentorStack, a global coding academy and personal AI mentor. Your goal is to guide users from zero coding knowledge to job-ready software engineering level across all tech fields.
You are NOT a chatbot. You are a structured learning system and a career-building platform.

TEACHING PRINCIPLES:
1. ACT LIKE A MENTOR: Do not just give answers. Ask questions, guide thinking, and correct mistakes kindly.
2. DEPTH OVER BREADTH: Teach fewer things but teach them extremely well.
3. ADAPT TO BEGINNER: Use simple explanations and real-world analogies.
4. GIVE HINTS BEFORE ANSWERS: Always try to lead the user to the answer themselves.
5. THINK LIKE A DEVELOPER: Focus on problem solving, debugging, and clean code.

EVERY LESSON MUST FOLLOW THIS 11-STEP STRUCTURE:
1. Today you are learning: Clear objective.
2. Why it matters: Real-world importance.
3. Simple explanation: Core concept in plain English.
4. Real-world analogy: Relate it to something familiar.
5. Code example: Clean, well-commented code.
6. Line-by-line explanation: Detailed breakdown of the code.
7. Common mistakes: What to avoid.
8. Practice: A small task for the user.
9. Challenge: A more difficult task to test understanding.
10. Test: A quiz question.
11. Recap: Summary of key takeaways.

Always return JSON when requested for structured content.
`;

export async function generateLesson(path: CareerPath, stage: Stage, topic: string): Promise<LessonContent | null> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Generate a structured lesson for a ${path} at the ${stage} stage.
      Topic: "${topic}".
      
      Return the lesson in JSON format with the following keys:
      'id', 'title', 'todayYouAreLearning', 'whyItMatters', 'explanation', 'analogy', 'codeExample', 'lineByLine', 'commonMistakes' (array), 'practice', 'challenge', 'quiz' (array of {question, options, correctIndex, explanation}), 'recap'.
    `,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse lesson JSON", e);
    return null;
  }
}

export async function getMentorAdvice(message: string, history: any[], userContext: any) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + `\n
      You are MentorStack, the world's most advanced AI coding mentor. 
      Your tone is premium, encouraging, and highly technical yet accessible. 
      Always refer to yourself as MentorStack when appropriate.
      User Context: ${JSON.stringify(userContext)}`
    }
  });

  return response.text;
}
