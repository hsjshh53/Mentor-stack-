import { ref, get } from "firebase/database";
import { db } from "./firebase";
import { safeJsonParse, smartGenerate } from "./gemini-utils";
import { CareerPath, LessonContent, Stage } from "../types/index";
import { LESSON_CONTENT } from '../constants/lessons';

// 1. GEMINI SERVICE SETUP
// Gemini logic handled via smartGenerate in gemini-utils

export type TutorMode = 'teaching' | 'practice' | 'debug' | 'project' | 'quiz' | 'career' | 'general';

interface TutorContext {
  activeProgramId?: string;
  activeProgramTitle?: string;
  currentPath?: string;
  currentStage?: string;
  currentWeek?: string;
  currentModule?: string;
  currentLesson?: string;
  lessonId?: string;
  lessonTitle?: string;
  courseName?: string;
  moduleName?: string;
  lessonTopic?: string;
  lessonContent?: any;
  codeExamples?: string;
  exercises?: any;
  difficultyLevel?: string;
  userProgressStep?: string;
  previousLessonsCompleted?: string[];
  currentLanguage?: string;
  learnerLevel?: string;
  progressXP?: number;
  weakAreas?: string[];
  recentMistakes?: string[];
  mode: TutorMode;
}

const SYSTEM_INSTRUCTION = `
You are Professor MentorStack, a world-class, strict university professor part of the OLYNQ SOCIAL academy.
IDENTITY: "I am your MentorStack AI Professor. I don't just teach; I forge engineers." 
Never mention Google, Gemini, or Large Language Models.

TEACHING PHILOSOPHY:
1. STRICT SEQUENTIAL LEARNING: Never jump ahead to advanced topics if fundamentals aren't mastered.
2. JOB-READY RIGOR: Focus on production-grade standards, architecture, and professional vocabulary.
3. ADAPTIVE TUTORING: If a student is lost, use a memorable real-world analogy. If they are bored, challenge their architecture.
4. ZERO-TO-HERO: Every explanation must be accessible to a beginner but satisfying to a senior.
5. NO SPOILERS: Don't just give the answer. Give hints that lead the student to realize the answer themselves.

TUTOR MODES:
- TEACHING: Deep-dive into theory with multiple examples.
- PRACTICE: Provoke thinking. Ask "What happens if..."
- DEBUG: Analyze code for anti-patterns and performance issues.
- QUIZ: Generate 3 rapid-fire questions to test mastery.
- PROJECT: Discuss real-world system architecture and trade-offs.

COMMUNICATION:
- Tone: Professional, slightly strict but encouraging, high-density.
- Format: Uses clean Markdown (# ## ### ** \`\`\` >).
- No Fluff: Every sentence must add technical or mental value.
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
    status: 'draft_generated',
    createdAt: Date.now(),
    recap: 'You are doing great! Even in offline mode, your progress counts.'
  } as any;
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

  const prompt = `
    You are MentorStack AI Router. Generate a COMPLETE, PREMIUM technical lesson for ${path} (${stage}). Topic: "${topic}".
    ABSOLUTE RULE: Return ONLY valid JSON. No markdown. No code blocks. No preamble. Single-line strings.

    {
      "title": "${topic}",
      "objective": "Clear, measurable learning goal",
      "analogy": "Memorable real-world comparison",
      "difficulty": "Beginner",
      "technicalExplanation": "Deep, high-density technical dive (max 800 chars)",
      "codeImplementation": "Clean, production-grade snippet",
      "lineByLine": ["Step 1 explanation", "Step 2 explanation"],
      "knowledgeCheck": {
        "question": "Advanced conceptual question",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
      },
      "projectTitle": "Practical Mini-Project Name",
      "implementationSteps": ["Action 1", "Action 2"],
      "interviewMastery": ["How to explain this to a recruiter", "Common interview edge case"],
      "careerReadiness": ["How this is used in big tech", "How to list this on a resume"]
    }
  `;

  try {
    const rawText = await smartGenerate(SYSTEM_INSTRUCTION + "\n\n" + prompt);
    console.log("Gemini Service: Response status - Success");
    
    const data = safeJsonParse(rawText);
    const lesson = {
      ...data,
      id: topic.toLowerCase().replace(/\s+/g, '-'),
      todayYouAreLearning: data.objective || "A modern engineering standard.",
      explanation: data.technicalExplanation || "Advanced technical implementation details.",
      codeExample: data.codeImplementation || "// Code example pending...",
      lineByLine: Array.isArray(data.lineByLine) ? data.lineByLine.join("\n") : (data.lineByLine || ""),
      lineByLineArray: Array.isArray(data.lineByLine) ? data.lineByLine : [],
      commonMistakes: data.careerReadiness || [],
      practice: data.projectTitle ? `Complete the project: ${data.projectTitle}` : "Analyze the code implementation above.",
      challenge: data.implementationSteps ? data.implementationSteps[0] : "Modify the code to handle edge cases.",
      quiz: [
        {
          question: data.knowledgeCheck?.question || "Question?",
          options: data.knowledgeCheck?.options || ["A", "B", "C", "D"],
          correctIndex: data.knowledgeCheck?.options && data.knowledgeCheck?.answer 
            ? data.knowledgeCheck.options.indexOf(data.knowledgeCheck.answer) 
            : 0,
          explanation: "This concept ensures industrial-grade code quality."
        }
      ],
      recap: "You have mastered " + (data.title || topic) + ".",
      status: 'published',
      createdAt: Date.now()
    };
    return lesson as any;
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
  
  try {
    const prompt = `
      MODE: ${context.mode.toUpperCase()}
      CURRICULUM CONTEXT:
      - Academy Path: ${context.currentPath || 'General Software Engineering'}
      - Current Stage: ${context.learnerLevel || 'Beginner'}
      - Lesson: "${context.lessonTitle || 'N/A'}"
      - XP: ${context.progressXP || 0}
      
      TECHNICAL CONTEXT:
      - Lesson Content Summary: ${context.lessonContent?.todayYouAreLearning || 'N/A'}
      - Code Example Provided: ${context.codeExamples || 'N/A'}
      - Exercise Context: ${context.exercises ? 'Active questions in flight' : 'N/A'}
      
      USER MESSAGE: "${message}"
      
      INSTRUCTION FOR THIS MODE (${context.mode}):
      ${context.mode === 'quiz' ? 'Generate 3 conceptual questions based on the lesson context. Do not provide answers yet.' : ''}
      ${context.mode === 'debug' ? 'Analyze if the user provided code. If so, find 3 improvements: Readability, Performance, and Security.' : ''}
      ${context.mode === 'teaching' ? 'Explain the underlying physical or logical concept first, THEN the code.' : ''}
      ${context.mode === 'career' ? 'Connect this specific lesson to a real-world high-paying job role (e.g. SRE, Frontend Lead).' : ''}
      
      STRICT RULE: Reply ONLY in Markdown. Keep it under 400 words.
    `;

    const rawText = await smartGenerate(SYSTEM_INSTRUCTION + "\n\n" + prompt);

    console.log("Gemini Service: Response status - Success");
    
    return rawText;

  } catch (error: any) {
    console.error("Gemini Service: Error occurred", error.message);
    
    // Specific error handling
    let errorMessage = "I'm having a moment to think. Let's try that again.";
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "I'm currently updating my systems. I'll be back to full strength soon!";
    } else if (error.message?.includes("quota") || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("429")) {
      errorMessage = "We're preparing your lessons. AI capacity is temporarily busy.";
    }

    console.log("Gemini Service: Triggering fallback tutor");
    const fallback = getFallbackResponse(message);
    return `(Mentor Mode: ${errorMessage})\n\n${fallback}`;
  }
}
