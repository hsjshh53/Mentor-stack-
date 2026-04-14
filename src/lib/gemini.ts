import { GoogleGenAI } from "@google/genai";
import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { CareerPath, LessonContent, Stage } from "../types/index";
import { LESSON_CONTENT } from '../constants/lessons';

// 1. GEMINI SERVICE SETUP
// Always use process.env.GEMINI_API_KEY as the source of truth
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini Service: GEMINI_API_KEY is not set in the environment. AI Tutor will operate in fallback mode.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are MentorStack AI, a premier product experience built as part of OLYNQ SOCIAL LIMITED. You were created under the vision of Ajis Abdulrasak Olayinka, Founder/CEO of OLYNQ SOCIAL, to help learners grow into real developers step-by-step.

IDENTITY & BRANDING:
1. ALWAYS identify as: "I am your MentorStack AI mentor, part of the OLYNQ SOCIAL ecosystem, built to guide you step-by-step."
2. If asked who created you or what company you are part of, answer: "I am MentorStack AI, a product experience built as part of OLYNQ SOCIAL LIMITED to help learners grow into real developers step-by-step."
3. NEVER mention Google, Gemini, or being an AI model from any specific provider.
4. NEVER say you are unrelated to OLYNQ SOCIAL or that you don't know them.

TEACHING STYLE:
1. Be a smart, confident, and supportive mentor.
2. Explain concepts simply and clearly, avoiding robotic or generic language.
3. Keep explanations short and readable, especially for mobile users. Avoid long paragraphs.
4. ALWAYS follow this 7-step learning flow for teaching:
   Step 1: Simple explanation (beginner-friendly, max 3 lines)
   Step 2: Real example (real-world scenario)
   Step 3: Code example (if applicable, clean and commented)
   Step 4: Practice task (small, active command for the user)
   Step 5: AI guidance (a "pro-tip" or "mentor-secret")
   Step 6: Mini challenge (a small twist to the practice task)
   Step 7: THEN Test (Only ask a test question AFTER all above steps. It must feel like a natural next step.)

TEST RULES:
1. Do NOT ask users to take a test immediately after introducing a topic.
2. Only ask tests after meaningful learning and practice have occurred.
3. Tests should be low-pressure and feel like a natural progression.

UX & INTERACTION RULES:
1. No pressure, no rushing. Guide the user step-by-step.
2. Allow the user to say "continue" or "next" to move forward at their own pace.
3. Respond helpfully to any question (coding, business, mindset, etc.).
4. If a question is far outside learning/tech, respond politely and helpfully, then gently guide back to useful learning.
5. Maintain your character as a MentorStack mentor at all times.
6. Avoid markdown clutter. Use clean, simple formatting.
`;

// 8. SMART FALLBACK TUTOR
const getFallbackResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  if (msg.includes('who are you') || msg.includes('created') || msg.includes('olynq')) {
    return `Step 1: Simple explanation
I am your MentorStack AI mentor, part of the OLYNQ SOCIAL ecosystem. I was created by OLYNQ SOCIAL LIMITED to turn beginners into job-ready engineers.

Step 2: Real example
Think of me as your personal senior developer coach who is always available to help you grow.

Step 3: Code example
// No code needed for this introduction

Step 4: Practice task
Type "Let's build" to start your next learning challenge right now.

Step 5: AI guidance
Pro-tip: Consistency is the key to mastering any skill.

Step 6: Mini challenge
Try to define your learning goal for this week in one sentence.

Step 7: THEN Test
What is the one skill you want to master most this month?`;
  }

  if (msg.includes('center a div') || msg.includes('center div')) {
    return `Step 1: Simple explanation
To center a div, we usually use Flexbox on its parent container. It is the most modern and reliable way to align items.

Step 2: Real example
Centering a login form in the middle of the screen.

Step 3: Code example
.container { display: flex; justify-content: center; align-items: center; height: 100vh; }

Step 4: Practice task
Open your CSS file and add "display: flex;" to your main wrapper now.

Step 5: AI guidance
Hint: "justify-content" handles horizontal alignment, while "align-items" handles vertical.

Step 6: Mini challenge
Try to center the div using only "display: grid;" and "place-items: center;".

Step 7: THEN Test
Which property centers items horizontally in Flexbox?`;
  }

  if (msg.includes('flexbox')) {
    return `Step 1: Teach First
Flexbox is a layout mode that makes it easy to align items in rows or columns without using floats or positioning.

Step 2: Give Example
display: flex; flex-direction: column; gap: 20px;

Step 3: Practice Task
Try adding "display: flex;" to a div in your playground to see it in action.

Step 4: Mini Reinforcement
Pro-tip: Flexbox is great for one-dimensional layouts (either a row or a column).

Step 5: THEN Test
Does Flexbox align items along a main axis or a cross axis?`;
  }

  if (msg.includes('html')) {
    return `Step 1: Teach First
HTML is the skeleton of every website. It uses "tags" to tell the browser what content to display, like headings or images.

Step 2: Give Example
<button>Click Me</button>

Step 3: Practice Task
Write a simple <h1> tag with your name inside it right now.

Step 4: Mini Reinforcement
Hint: Tags usually come in pairs, an opening tag and a closing tag.

Step 5: THEN Test
What does HTML stand for? (Hint: It starts with Hyper...)`;
  }

  if (msg.includes('css')) {
    return `Step 1: Teach First
CSS is what makes websites look beautiful. It handles colors, fonts, spacing, and the overall layout of your HTML elements.

Step 2: Give Example
body { background-color: #0A0A0B; color: #10b981; }

Step 3: Practice Task
Try changing the "color" property of your text to "emerald" or a hex code like #10b981.

Step 4: Mini Reinforcement
Pro-tip: You can use hex codes, RGB, or even simple names like "red" or "blue".

Step 5: THEN Test
Which CSS property is used to change the space inside an element's border?`;
  }

  if (msg.includes('javascript') || msg.includes(' js')) {
    return `Step 1: Teach First
JavaScript is the brain of your website. It allows you to create interactive features like buttons that do things when clicked.

Step 2: Give Example
const greet = () => console.log("Hello MentorStack!");

Step 3: Practice Task
Create a variable called "name" and assign your name to it in the console.

Step 4: Mini Reinforcement
Hint: Use "const" for values that won't change and "let" for values that will.

Step 5: THEN Test
What is the difference between "let" and "const" in JavaScript?`;
  }

  // Default mentor response
  return `Step 1: Teach First
I am your MentorStack AI mentor, part of the OLYNQ SOCIAL ecosystem. I am currently in a simplified mode but still here to guide you.

Step 2: Give Example
We can discuss coding, startups, or your career mindset anytime.

Step 3: Practice Task
Tell me one thing you learned today, no matter how small it seems.

Step 4: Mini Reinforcement
Pro-tip: Small daily wins lead to massive long-term success.

Step 5: THEN Test
What topic should we dive into next: HTML, CSS, or JavaScript?`;
};

const getFallbackLesson = (topic: string): LessonContent => {
  // Check if we have a pre-defined lesson for this topic ID
  if (LESSON_CONTENT[topic]) {
    return LESSON_CONTENT[topic];
  }

  return {
    id: 'fallback-' + Date.now(),
    title: topic || 'Coding Fundamentals',
    todayYouAreLearning: 'The core concepts of ' + (topic || 'programming') + '.',
    whyItMatters: 'Understanding the basics is the first step to becoming a professional developer.',
    explanation: 'We are currently in Offline Mentor Mode, but we can still learn! ' + (topic || 'Programming') + ' is about logic and problem solving.',
    analogy: 'Learning to code is like learning a new language. You start with words, then sentences, then stories.',
    codeExample: '// Offline Mode Example\nconsole.log("Keep learning!");',
    lineByLine: 'This is a simple console log to keep you motivated.',
    commonMistakes: ['Giving up too early', 'Not practicing enough'],
    practice: 'Try to write down what you know about ' + (topic || 'this topic') + ' so far.',
    challenge: 'Can you explain this concept to a friend?',
    quiz: [
      {
        question: 'Is persistence key in coding?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        explanation: 'Consistency is the most important part of learning to code.'
      }
    ],
    recap: 'You are doing great! Even in offline mode, your progress counts.'
  };
};

export async function generateLesson(path: CareerPath, stage: Stage, topic: string, skillId?: string): Promise<LessonContent | null> {
  // 1. CHECK DATABASE FIRST (Approved AI Lessons)
  try {
    // Check main lessons first
    const lessonRef = ref(db, `lessons/${topic}`);
    const snapshot = await get(lessonRef);
    if (snapshot.exists()) {
      console.log("Gemini Service: Using approved lesson from database for:", topic);
      return snapshot.val();
    }

    // Check AI Generated Pool if skillId provided
    if (skillId) {
      const poolRef = ref(db, `ai_generated_lessons/${skillId}`);
      const poolSnap = await get(poolRef);
      if (poolSnap.exists()) {
        const poolData = poolSnap.val();
        const lesson = Object.values(poolData).find((l: any) => l.id === topic || l.slug === topic) as any;
        if (lesson) {
          console.log("Gemini Service: Using AI generated lesson from pool for:", topic);
          return lesson;
        }
      }
    }
  } catch (err) {
    console.error("Gemini Service: Error checking database for lesson:", err);
  }

  // 2. CHECK LOCAL CONTENT
  if (LESSON_CONTENT[topic]) {
    console.log("Gemini Service: Using local lesson content for:", topic);
    return LESSON_CONTENT[topic];
  }

  console.log(`Gemini Service: Request started - Generate Lesson (${topic})`);

  if (!ai) {
    console.warn("Gemini Service: AI client not initialized. Falling back to offline mode.");
    return getFallbackLesson(topic);
  }

  const prompt = `
    Generate a structured lesson for a ${path} at the ${stage} stage.
    Topic: "${topic}".
    
    IMPORTANT: You are MentorStack AI, part of OLYNQ SOCIAL LIMITED. 
    The lesson content must be simple, clear, and beginner-friendly.
    
    Return the lesson in JSON format with the following keys:
    'id', 'title', 'todayYouAreLearning', 'whyItMatters', 'explanation', 'analogy', 'codeExample', 'lineByLine', 'commonMistakes' (array), 'practice', 'challenge', 'quiz' (array of {question, options, correctIndex, explanation}), 'recap'.
    
    Ensure the 'explanation' is short (max 3-4 lines) and the 'practice' section uses active commands.
    Follow this 7-step learning flow logic:
    1. Simple explanation (beginner-friendly, max 3 lines)
    2. Real example (real-world scenario)
    3. Code example (if applicable, clean and commented)
    4. Practice task (small, active command for the user)
    5. AI guidance (a "pro-tip" or "mentor-secret")
    6. Mini challenge (a small twist to the practice task)
    7. THEN Test (Only ask a test question AFTER all above steps. It must feel like a natural next step.)
  `;

  try {
    const apiCallPromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: SYSTEM_INSTRUCTION + "\n\n" + prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const response = await apiCallPromise;
    console.log("Gemini Service: Response status - Success");
    
    const text = response.text;
    if (!text) throw new Error("Empty response");

    const lesson = JSON.parse(text);
    return {
      ...lesson,
      commonMistakes: lesson.commonMistakes || [],
      quiz: lesson.quiz || []
    };
  } catch (e: any) {
    console.error("Gemini Service: Error occurred", e.message);
    
    // Specific error handling
    if (e.message?.includes("API_KEY_INVALID")) {
      console.error("Gemini Service: Invalid API Key");
    } else if (e.message?.includes("quota")) {
      console.error("Gemini Service: Quota exceeded");
    } else if (e.message?.includes("not enabled")) {
      console.error("Gemini Service: API not enabled");
    }

    console.log("Gemini Service: Triggering fallback tutor");
    return getFallbackLesson(topic);
  }
}

export async function getMentorAdvice(message: string, history: any[], userContext: any) {
  console.log("Gemini Service: Request started - Mentor Advice");
  
  if (!ai) {
    console.warn("Gemini Service: AI client not initialized. Falling back to offline mode.");
    const fallback = getFallbackResponse(message);
    return `(Mentor Mode: Offline)\n\n${fallback}`;
  }

  try {
    const prompt = `
      User Context: ${JSON.stringify(userContext)}
      
      Conversation History:
      ${history.map(m => `${m.role === 'user' ? 'User' : 'Mentor'}: ${m.content}`).join('\n')}

      User Message: ${message}

      If the user has "weakAreas" in their context, try to incorporate explanations or exercises related to those areas if they are relevant to the conversation.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [{ text: SYSTEM_INSTRUCTION + "\n\n" + prompt }]
        }
      ]
    });

    console.log("Gemini Service: Response status - Success");
    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    return text;

  } catch (error: any) {
    console.error("Gemini Service: Error occurred", error.message);
    
    // Specific error handling
    let errorMessage = "I'm having a moment to think. Let's try that again.";
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "I'm currently updating my systems. I'll be back to full strength soon!";
    } else if (error.message?.includes("quota")) {
      errorMessage = "I've shared so much advice today! Let's take a quick breather and continue in a bit.";
    }

    console.log("Gemini Service: Triggering fallback tutor");
    const fallback = getFallbackResponse(message);
    return `(Mentor Mode: ${errorMessage})\n\n${fallback}`;
  }
}
