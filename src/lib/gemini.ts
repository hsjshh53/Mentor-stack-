import { GoogleGenAI } from "@google/genai";
import { CareerPath, LessonContent, Stage } from "../types/index";
import { LESSON_CONTENT } from '../constants/lessons';

// 1. GEMINI SERVICE SETUP
// The API key is automatically provided by the platform via process.env.GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. MentorStack will run in Offline Mode.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "dummy-key" });

const SYSTEM_INSTRUCTION = `
You are MentorStack, a global coding academy and personal AI mentor. Your goal is to guide users from zero coding knowledge to job-ready software engineering level across all tech fields.
You are NOT a chatbot. You are a structured learning system and a career-building platform.

TEACHING PRINCIPLES:
1. ACT LIKE A MENTOR: Do not just give answers. Ask questions, guide thinking, and correct mistakes kindly.
2. DEPTH OVER BREADTH: Teach fewer things but teach them extremely well.
3. ADAPT TO BEGINNER: Use simple explanations and real-world analogies.
4. GIVE HINTS BEFORE ANSWERS: Always try to lead the user to the answer themselves.
5. THINK LIKE A DEVELOPER: Focus on problem solving, debugging, and clean code.
6. PERSONALIZED GUIDANCE: Use the provided User Context (progress, completed lessons, weak areas) to tailor your advice. If a user has weak areas, focus on reinforcing those concepts.

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

// 8. SMART FALLBACK TUTOR
const getFallbackResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  if (msg.includes('who are you') || msg.includes('mentorstack')) {
    return `Explanation:
I am MentorStack, your personal AI coding mentor. I'm here to guide you from zero to job-ready in your tech career.

Mentor Tip:
Think of me as your senior developer friend who's always available to help you debug, learn new concepts, and build your portfolio.

Exercise:
Tell me what career path you're most excited about, and let's start building something!`;
  }

  if (msg.includes('center a div') || msg.includes('center div')) {
    return `Explanation:
A simple way to center a div is to use Flexbox on the parent container. This is the modern standard for alignment.

Code:
.parent {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center;     /* Centers vertically */
  height: 100vh;           /* Give parent height to see vertical centering */
}

Exercise:
Create a parent div and place a child box inside it. Then center the child horizontally and vertically using the code above.`;
  }

  if (msg.includes('flexbox')) {
    return `Explanation:
Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It makes it easy to align items and distribute space.

Code:
.container {
  display: flex;
  flex-direction: row; /* or column */
  gap: 20px;           /* space between items */
}

Exercise:
Try creating a navigation bar using display: flex and justify-content: space-between.`;
  }

  if (msg.includes('html')) {
    return `Explanation:
HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of a web page.

Code:
<!DOCTYPE html>
<html>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>

Exercise:
Create a simple HTML file with a heading, a paragraph, and an image tag.`;
  }

  if (msg.includes('css')) {
    return `Explanation:
CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content.

Code:
h1 {
  color: #10b981; /* MentorStack Emerald */
  font-family: sans-serif;
  text-align: center;
}

Exercise:
Change the background color of your body element to a dark gray (#1a1a1a) and make your text white.`;
  }

  if (msg.includes('javascript') || msg.includes(' js')) {
    return `Explanation:
JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and much more.

Code:
const greeting = "Hello, MentorStack!";
console.log(greeting);

function sayHello(name) {
  return "Welcome, " + name;
}

Exercise:
Write a function that takes two numbers and returns their sum.`;
  }

  if (msg.includes('react')) {
    return `Explanation:
React is a JavaScript library for building user interfaces, specifically single-page applications. It's used for handling the view layer for web and mobile apps.

Code:
function Welcome() {
  return <h1 className="text-emerald-500">Hello, Developer!</h1>;
}

Exercise:
Create a simple functional component that displays a "Click Me" button.`;
  }

  if (msg.includes('python')) {
    return `Explanation:
Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability.

Code:
def greet(name):
    print(f"Hello, {name}!")

greet("Future Engineer")

Exercise:
Create a list of your favorite programming languages and print each one using a for loop.`;
  }

  if (msg.includes('variable')) {
    return `Explanation:
Variables are containers for storing data values. In JavaScript, we use 'let', 'const', or 'var'.

Code:
const name = "MentorStack"; // Cannot be reassigned
let score = 0;             // Can be reassigned
score = 10;

Exercise:
Declare a constant for your birth year and a variable for your current age.`;
  }

  if (msg.includes('function')) {
    return `Explanation:
A function is a block of code designed to perform a particular task. It is executed when "something" invokes it (calls it).

Code:
function calculateArea(width, height) {
  return width * height;
}

const area = calculateArea(10, 5);

Exercise:
Write a function called 'isEven' that returns true if a number is even and false if it's odd.`;
  }

  if (msg.includes('loop')) {
    return `Explanation:
Loops are used to repeat a block of code a certain number of times or while a condition is true.

Code:
for (let i = 0; i < 5; i++) {
  console.log("Iteration: " + i);
}

Exercise:
Write a while loop that counts down from 10 to 1.`;
  }

  if (msg.includes('array')) {
    return `Explanation:
An array is a special variable, which can hold more than one value at a time.

Code:
const tools = ["Git", "VS Code", "Terminal"];
console.log(tools[0]); // "Git"
tools.push("Docker");

Exercise:
Create an array of 5 fruits and use a loop to print each one to the console.`;
  }

  if (msg.includes('object')) {
    return `Explanation:
Objects are variables too, but they can contain many values. These values are written as name:value pairs.

Code:
const student = {
  name: "Alex",
  path: "Frontend",
  level: 5
};

Exercise:
Create an object representing a 'Car' with properties like brand, model, and year.`;
  }

  if (msg.includes('backend')) {
    return `Explanation:
Backend development refers to the server-side of an application and everything that communicates between the database and the browser.

Code:
// Node.js Express example
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

Exercise:
Research the difference between SQL and NoSQL databases and list one example of each.`;
  }

  if (msg.includes('api')) {
    return `Explanation:
API stands for Application Programming Interface. It is a set of rules that allow different software entities to communicate with each other.

Code:
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));

Exercise:
Try to explain to a non-technical friend what an API is using a restaurant waiter analogy.`;
  }

  if (msg.includes('database')) {
    return `Explanation:
A database is an organized collection of structured information, or data, typically stored electronically in a computer system.

Code:
-- SQL Example
SELECT * FROM users WHERE level > 10;

Exercise:
If you were building a social media app, what kind of data would you need to store in your database?`;
  }

  if (msg.includes('error') || msg.includes('bug') || msg.includes('debug')) {
    return `Explanation:
Debugging is the process of finding and fixing errors in your code. Errors can be syntax errors, logic errors, or runtime errors.

Mentor Tip:
Always read the error message carefully! It usually tells you exactly what went wrong and where. Use console.log() to inspect your variables.

Exercise:
Intentionally break a small piece of code and try to use the browser console to identify the error.`;
  }

  if (msg.includes('project help') || msg.includes('help with project')) {
    return `Explanation:
When building a project, start by breaking it down into the smallest possible tasks. Don't try to build everything at once.

Mentor Tip:
1. Plan the UI (Wireframe)
2. Define the Data Structure
3. Build the core functionality
4. Add styling and polish

Exercise:
List the first three steps you would take to build a simple To-Do List application.`;
  }

  // Default mentor response
  const fallbacks = [
    "That's a great question! As your mentor, I recommend breaking this down into smaller steps. What part are you finding most challenging?",
    "I'm currently in 'Offline Mentor Mode', but I can still help with core concepts! Try asking me about HTML, CSS, JavaScript, or specific coding patterns.",
    "Programming is all about problem-solving. Even when the connection is spotty, we can still focus on the logic. What are you working on right now?",
    "Remember: every expert was once a beginner. Keep pushing! If you have a specific question about a language or tool, I'm here to guide you."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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

export async function generateLesson(path: CareerPath, stage: Stage, topic: string): Promise<LessonContent | null> {
  // 1. CHECK LOCAL CONTENT FIRST
  if (LESSON_CONTENT[topic]) {
    console.log("Using local lesson content for:", topic);
    return LESSON_CONTENT[topic];
  }

  const prompt = `
    Generate a structured lesson for a ${path} at the ${stage} stage.
    Topic: "${topic}".
    
    Return the lesson in JSON format with the following keys:
    'id', 'title', 'todayYouAreLearning', 'whyItMatters', 'explanation', 'analogy', 'codeExample', 'lineByLine', 'commonMistakes' (array), 'practice', 'challenge', 'quiz' (array of {question, options, correctIndex, explanation}), 'recap'.
  `;

  try {
    // Add a timeout to the API call
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Gemini API request timed out")), 15000)
    );

    const apiCallPromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: SYSTEM_INSTRUCTION + "\n\n" + prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const response = (await Promise.race([apiCallPromise, timeoutPromise])) as any;
    const text = response.text;
    if (!text) throw new Error("Empty response");

    const lesson = JSON.parse(text);
    return {
      ...lesson,
      commonMistakes: lesson.commonMistakes || [],
      quiz: lesson.quiz || []
    };
  } catch (e) {
    console.error("Failed to generate lesson", e);
    return getFallbackLesson(topic);
  }
}

export async function getMentorAdvice(message: string, history: any[], userContext: any) {
  try {
    const prompt = `
      User Context: ${JSON.stringify(userContext)}
      
      User Message: ${message}

      If the user has "weakAreas" in their context, try to incorporate explanations or exercises related to those areas if they are relevant to the conversation.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        {
          parts: [{ text: SYSTEM_INSTRUCTION + "\n\n" + prompt }]
        }
      ]
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    return text;

  } catch (error: any) {
    console.error("Exact error message:", error.message);
    
    const fallback = getFallbackResponse(message);
    const errorPrefix = `⚠️ MentorStack is in Offline Mode (${error.message})\n\n`;
    return errorPrefix + fallback;
  }
}
