import { FinalExam } from '../types';

export const FINAL_EXAMS: FinalExam[] = [
  {
    id: 'frontend-final',
    title: 'Frontend Developer Final Exam',
    path: 'Frontend Developer',
    description: 'The ultimate test of your frontend engineering skills.',
    theoryQuestions: [
      {
        question: 'What is the "DOM" in web development?',
        options: ['Data Object Model', 'Document Object Model', 'Digital Object Mode', 'Document Oriented Map'],
        correctIndex: 1,
        explanation: 'The Document Object Model is the browser\'s internal representation of a web page.'
      }
    ],
    practicalQuestions: [
      {
        question: 'How do you center a div horizontally using Flexbox?',
        options: ['align-items: center', 'justify-content: center', 'text-align: center', 'margin: auto'],
        correctIndex: 1,
        explanation: 'justify-content: center centers items along the main axis (horizontally by default).'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Why is my React component not re-rendering when I change a variable?',
        options: ['You didn\'t use a semicolon', 'You used "let" instead of "var"', 'You didn\'t use "useState"', 'The browser is too old'],
        correctIndex: 2,
        explanation: 'React only re-renders when state or props change. You must use useState to trigger a re-render.'
      }
    ],
    codingTask: {
      prompt: 'Create a simple React counter component that increments and decrements a number.',
      starterCode: 'import React, { useState } from "react";\n\nexport default function Counter() {\n  // Your code here\n}',
      solution: 'import React, { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n    </div>\n  );\n}'
    },
    xpReward: 1000
  }
];
