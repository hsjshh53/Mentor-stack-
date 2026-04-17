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

export type TutorMode = 'teaching' | 'practice' | 'debug' | 'project' | 'quiz' | 'career' | 'general';

interface TutorContext {
  activeProgramId?: string;
  activeProgramTitle?: string;
  currentPath?: string;
  currentStage?: string;
  currentWeek?: string;
  currentModule?: string;
  currentLesson?: string;
  lessonContent?: any;
  learnerLevel?: string;
  progressXP?: number;
  weakAreas?: string[];
  recentMistakes?: string[];
  mode: TutorMode;
}

const SYSTEM_INSTRUCTION = `
You are MentorStack AI, the elite coding mentor and chief architect at MentorStack Academy. You represent OLYNQ SOCIAL LIMITED, founded by Ajia Abdulrasak Olayinka.

CORE IDENTITY:
1. Identify as: "I am your MentorStack AI mentor, part of the OLYNQ SOCIAL ecosystem. I'm here to ensure you master coding and become job-ready."
2. Never mention Google, Gemini, or being an LLM.

FORMATTING RULES:
- Use Markdown for EVERYTHING.
- Use # for major headers, ## for sub-headers, and ### for steps.
- Use bold (**text**) for emphasis.
- Use code blocks (\`\`\`language) for any code snippets.
- Use blockquotes (>) for pro-tips and mentor alerts.

TUTORING PHILOSOPHY:
- Be a "Guide on the Side", not a "Sage on the Stage".
- Adapt exactly to the learner's context (lesson, stage, level).
- For beginners: Use simple analogies, avoid jargon, break into steps.
- For advanced: Focus on architecture, performance, and real-world trade-offs.

TUTOR MODES & BEHAVIOR:

1. [Teaching Mode]: Explain concepts deeply but simply. Align exactly with the current lesson if provided. Use the structured 7-step flow:
   ### Step 1: Simple Concept
   ### Step 2: Real-World Analogy
   ### Step 3: Clean Implementation
   ### Step 4: Active Practice Task
   ### Step 5: Mentor Pro-Tip
   ### Step 6: Mini Challenge
   ### Step 7: Concept Check

2. [Practice Mode]: Generate relevant exercises and challenges based on the current lesson or weak areas. Check student work rigorously.

3. [Debug Mode]: HELP THE STUDENT DEBUG. Don't just fix it. 
   - Ask clarifying questions about expected vs actual.
   - Point out logical errors first.
   - Explain the "Why" behind the fix.
   - Teach professional debugging habits.

4. [Project Mentor Mode]: Guide projects.
   - Break goals into manageable milestones.
   - Suggest best-practice implementation steps.
   - Review architectural ideas.

5. [Quiz Mode]: Adaptive testing.
   - Start at the student's level.
   - Increase difficulty on success.
   - Always explain the reasoning behind the correct answer.

6. [Career Coach Mode]: Connect lessons to the job market.
   - Portfolio value of this specific skill.
   - Interview prep related to the current topic.
   - Real-world industry case studies.

ADAPTIVE RESPONSE RULES:
- If a lesson context exists, STAY ON TOPIC. Don't be generic.
- Use the learner's 'weakAreas' to personalize guidance.
- If the user is confused, offer a simpler explanation or an analogy.
- Keep output clean, structured, and extremely readable.
`;

// 8. SMART FALLBACK TUTOR
const getFallbackResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  if (msg.includes('who are you') || msg.includes('created') || msg.includes('olynq')) {
    return `### Step 1: Simple Concept
I am your **MentorStack AI mentor**, part of the OLYNQ SOCIAL ecosystem. I was created by **OLYNQ SOCIAL LIMITED** to turn beginners into job-ready engineers.

### Step 2: Real-World Analogy
Think of me as your personal senior developer coach who is always available to help you grow, just like having a mentor at a top tech firm.

### Step 3: Clean Implementation
\`\`\`javascript
// Our mission is alignment
const academy = {
  founder: "Ajia Abdulrasak Olayinka",
  objective: "Job Readiness"
};
\`\`\`

### Step 4: Active Practice Task
Type "Let's build" to start your next learning challenge right now.

### Step 5: Mentor Pro-Tip
> Consistency is the ultimate power in engineering. Small daily wins lead to massive mastery.

### Step 6: Mini Challenge
Try to define your primary learning goal for this week in one concise sentence.

### Step 7: Concept Check
What is the one skill you want to master most this month?`;
  }

  if (msg.includes('center a div') || msg.includes('center div')) {
    return `### Step 1: Simple Concept
To center a div, we usually use **Flexbox** on its parent container. It is the most modern and reliable way to align items.

### Step 2: Real-World Analogy
Imagine a picture frame (the parent) and you want to put the photo (the div) exactly in the center. Flexbox is the tools that measures it for you perfectly.

### Step 3: Clean Implementation
\`\`\`css
.parent {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  height: 100vh;           /* Viewport height */
}
\`\`\`

### Step 4: Active Practice Task
Open your CSS file and add \`display: flex;\` to your main wrapper now.

### Step 5: Mentor Pro-Tip
> Always ensure your parent container has a defined height, otherwise "align-items: center" won't have any space to work with!

### Step 6: Mini Challenge
Try to center the div using only \`display: grid;\` and \`place-items: center;\`. Can you see the difference?

### Step 7: Concept Check
Which property centers items horizontally in a Flexbox row?`;
  }

  if (msg.includes('flexbox')) {
    return `### Step 1: Simple Concept
**Flexbox** is a layout mode that makes it easy to align items in rows or columns without using floats or positioning.

### Step 2: Clean Implementation
\`\`\`css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
\`\`\`

### Step 5: Mentor Pro-Tip
> Flexbox is best for one-dimensional layouts. If you need 2D control (rows and columns simultaneously), consider CSS Grid!

### Step 7: Concept Check
Does Flexbox align items along a main axis or a cross axis?`;
  }

  if (msg.includes('html')) {
    return `### Step 1: Simple Concept
**HTML** is the skeleton of every website. It uses "tags" to tell the browser what content to display.

### Step 2: Clean Implementation
\`\`\`html
<h1>Welcome to MentorStack</h1>
<p>Your journey starts here.</p>
\`\`\`

### Step 5: Mentor Pro-Tip
> Semantic HTML (using <main>, <article>, <nav>) is crucial for accessibility and SEO.

### Step 7: Concept Check
What is the difference between an opening tag and a closing tag?`;
  }

  if (msg.includes('css')) {
    return `### Step 1: Simple Concept
**CSS** is what makes websites look beautiful. It handles color, typography, spacing, and layout.

### Step 2: Clean Implementation
\`\`\`css
body {
  background-color: #0A0A0B;
  color: #10B981;
  font-family: 'Inter', sans-serif;
}
\`\`\`

### Step 5: Mentor Pro-Tip
> Use variables (Custom Properties) for colors to make your design system easy to update.

### Step 7: Concept Check
Which property is used to change the font size of an element?`;
  }

  if (msg.includes('javascript') || msg.includes(' js')) {
    return `### Step 1: Simple Concept
**JavaScript** is the brain of your website. It adds interactivity and logic.

### Step 2: Clean Implementation
\`\`\`javascript
const academy = "MentorStack";
console.log(\`Welcome to \${academy}!\`);
\`\`\`

### Step 5: Mentor Pro-Tip
> Master the fundamentals of Arrays and Objects before jumping into complex frameworks!

### Step 7: Concept Check
What is the difference between \`let\` and \`const\`?`;
  }

  // Default mentor response
  return `### Step 1: Simple Concept
I am your **MentorStack AI mentor**. I am currently in a simplified mode, but I'm still here to guide your academy journey.

### Step 3: Actionable Advice
We can discuss **coding**, **mindset**, or **career trajectory** anytime.

### Step 4: Active Practice Task
Tell me one specific concept you want to master this week.

### Step 5: Mentor Pro-Tip
> The best way to learn is to build. Stop watching, start coding!

### Step 7: Concept Check
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

export async function getMentorAdvice(message: string, history: any[], context: TutorContext) {
  console.log("Gemini Service: Request started - Advanced Mentor Advice", { mode: context.mode });
  
  if (!ai) {
    console.warn("Gemini Service: AI client not initialized. Falling back to offline mode.");
    const fallback = getFallbackResponse(message);
    return `(Mentor Mode: Offline)\n\n${fallback}`;
  }

  try {
    const prompt = `
      CURRENT TUTOR MODE: [${context.mode.toUpperCase()}]
      
      ACADEMY CONTEXT:
      - Active Program: ${context.activeProgramTitle || 'Unknown'} (ID: ${context.activeProgramId || 'N/A'})
      - Current Path: ${context.currentPath || 'N/A'}
      - Stage/Week/Module: ${context.currentStage || 'N/A'} / ${context.currentWeek || 'N/A'} / ${context.currentModule || 'N/A'}
      - Current Lesson: ${context.currentLesson || 'N/A'}
      ${context.lessonContent ? `- Lesson Content Snippet: ${JSON.stringify(context.lessonContent).substring(0, 1000)}` : ''}
      
      LEARNER PROFILE:
      - Level: ${context.learnerLevel || 'Beginner'}
      - XP: ${context.progressXP || 0}
      - Weak Areas: ${context.weakAreas?.join(', ') || 'None identified yet'}
      - Recent Mistakes: ${context.recentMistakes?.join(', ') || 'None'}

      CONVERSATION HISTORY:
      ${history.map(m => `${m.role === 'user' ? 'User' : 'Mentor'}: ${m.content}`).join('\n')}

      USER MESSAGE: ${message}

      INSTRUCTION FOR THIS MODE ([${context.mode.toUpperCase()}]):
      Directly address the user's message using the specific rules for the selected Tutor Mode.
      If a lesson is active, ensure your answer aligns with its objectives.
      If the user shares code, focus on identifying logic before syntax.
      Stay supportive and focus on job-readiness.
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
