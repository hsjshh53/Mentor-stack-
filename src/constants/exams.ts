import { FinalExam } from '../types';

export const FINAL_EXAMS: FinalExam[] = [
  {
    id: 'frontend-final-exam',
    title: 'Frontend Developer Final Exam',
    path: 'Frontend Developer',
    description: 'The ultimate test of your frontend development skills. Prove you are ready for a junior developer role.',
    theoryQuestions: [
      {
        question: 'What is the "DOM" in web development?',
        options: [
          'Document Object Model',
          'Data Output Management',
          'Digital Object Memory',
          'Direct Online Media'
        ],
        correctIndex: 0,
        explanation: 'The DOM is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.'
      },
      {
        question: 'What is the difference between "let" and "const" in JavaScript?',
        options: [
          'There is no difference',
          '"let" is for numbers, "const" is for text',
          '"let" can be reassigned, "const" cannot',
          '"const" is faster than "let"'
        ],
        correctIndex: 2,
        explanation: 'Variables declared with "let" can have their values changed later. "const" variables are constant and cannot be reassigned.'
      }
    ],
    practicalQuestions: [
      {
        question: 'How would you make a website responsive for mobile devices?',
        options: [
          'Create a separate website for mobile',
          'Use CSS Media Queries',
          'Only use small images',
          'JavaScript is the only way'
        ],
        correctIndex: 1,
        explanation: 'Media queries allow you to apply different styles based on the device\'s characteristics, such as screen width.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Your button click isn\'t doing anything. What is the first thing you should check?',
        options: [
          'The color of the button',
          'If the JavaScript file is correctly linked in the HTML',
          'The internet connection',
          'Restart the computer'
        ],
        correctIndex: 1,
        explanation: 'A common mistake is forgetting to include the <script> tag or having a typo in the file path.'
      }
    ],
    codingTask: {
      prompt: 'Create a simple "Counter" component. It should have a heading showing the current count (starting at 0) and two buttons: "Increase" and "Decrease".',
      starterCode: '<!-- HTML -->\n<h1 id="count">0</h1>\n<button id="inc">Increase</button>\n<button id="dec">Decrease</button>\n\n<script>\n  // Write your code here\n</script>',
      solution: 'const countEl = document.getElementById("count");\nconst incBtn = document.getElementById("inc");\nconst decBtn = document.getElementById("dec");\nlet count = 0;\n\nincBtn.onclick = () => {\n  count++;\n  countEl.innerText = count;\n};\n\ndecBtn.onclick = () => {\n  count--;\n  countEl.innerText = count;\n};'
    },
    xpReward: 1000
  },
  {
    id: 'backend-final-exam',
    title: 'Backend Developer Final Exam',
    path: 'Backend Developer',
    description: 'The ultimate test of your backend development skills. Prove you are ready for a junior developer role.',
    theoryQuestions: [
      {
        question: 'What is the purpose of a "Middleware" in an Express application?',
        options: [
          'To style the UI',
          'To handle requests before they reach the final route',
          'To store data in the database',
          'To encrypt the source code'
        ],
        correctIndex: 1,
        explanation: 'Middleware functions have access to the request and response objects and can perform tasks like logging, authentication, and parsing data.'
      },
      {
        question: 'What is the difference between SQL and NoSQL databases?',
        options: [
          'SQL is for web, NoSQL is for mobile',
          'SQL uses tables, NoSQL uses flexible documents',
          'NoSQL is always faster',
          'SQL is only for small apps'
        ],
        correctIndex: 1,
        explanation: 'SQL databases are relational and use structured tables. NoSQL databases are non-relational and use various data models like documents (e.g., MongoDB).'
      }
    ],
    practicalQuestions: [
      {
        question: 'How do you handle an error in a Node.js asynchronous function?',
        options: [
          'Ignore it',
          'Use try...catch blocks',
          'Restart the server',
          'The computer handles it automatically'
        ],
        correctIndex: 1,
        explanation: 'try...catch blocks are used to catch and handle errors that occur during the execution of asynchronous code.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Your API is returning a 404 error. What does this mean?',
        options: [
          'The server is down',
          'The requested resource was not found',
          'The user is not authenticated',
          'The database is full'
        ],
        correctIndex: 1,
        explanation: 'A 404 Not Found error means the server could not find the specific URL or resource requested by the client.'
      }
    ],
    codingTask: {
      prompt: 'Create a simple Express route that returns a "Hello, MentorStack!" message when a GET request is made to the "/" path.',
      starterCode: 'const express = require("express");\nconst app = express();\n\n// Write your code here\n\napp.listen(3000);',
      solution: 'app.get("/", (req, res) => {\n  res.send("Hello, MentorStack!");\n});'
    },
    xpReward: 1200
  }
];
