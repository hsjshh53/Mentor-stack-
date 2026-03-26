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
      },
      {
        question: 'What is a React Component?',
        options: [
          'A type of database',
          'A reusable piece of user interface',
          'A styling language',
          'A server-side script'
        ],
        correctIndex: 1,
        explanation: 'Components are the building blocks of a React application.'
      },
      {
        question: 'What is the purpose of Semantic HTML?',
        options: [
          'To make the code look pretty',
          'To provide meaning to the structure of the page for accessibility and SEO',
          'To speed up the website',
          'To replace CSS'
        ],
        correctIndex: 1,
        explanation: 'Semantic tags like <header>, <main>, and <footer> describe their content to browsers and screen readers.'
      },
      {
        question: 'Which CSS property is used for 2D layouts?',
        options: ['Flexbox', 'Grid', 'Float', 'Position'],
        correctIndex: 1,
        explanation: 'CSS Grid is designed for complex 2D layouts (rows and columns).'
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
      },
      {
        question: 'Which hook is used to manage state in a React functional component?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        correctIndex: 2,
        explanation: 'useState is the primary hook for adding state to functional components.'
      },
      {
        question: 'How do you prevent a form from refreshing the page on submit in JavaScript?',
        options: [
          'event.stop()',
          'event.preventDefault()',
          'form.noRefresh()',
          'return false'
        ],
        correctIndex: 1,
        explanation: 'preventDefault() stops the browser\'s default behavior, such as refreshing on form submission.'
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
      },
      {
        question: 'You see "ReferenceError: x is not defined" in the console. What does this mean?',
        options: [
          'The variable x was never declared',
          'The variable x is empty',
          'The variable x is a number',
          'The variable x is private'
        ],
        correctIndex: 0,
        explanation: 'A ReferenceError occurs when you try to use a variable that hasn\'t been declared in the current scope.'
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
  },
  {
    id: 'fullstack-final-exam',
    title: 'Full-Stack Developer Final Exam',
    path: 'Full-Stack Developer',
    description: 'The ultimate test of your full-stack development skills. Prove you can build end-to-end applications.',
    theoryQuestions: [
      {
        question: 'What is the "Full-Stack" development model?',
        options: [
          'Working only on the frontend',
          'Working only on the backend',
          'Working on both the frontend and backend layers',
          'Working only on mobile apps'
        ],
        correctIndex: 2,
        explanation: 'Full-stack development covers everything from the user interface to the database.'
      },
      {
        question: 'What is a "RESTful API"?',
        options: [
          'An API that only works on weekends',
          'An API that follows the REST architectural style',
          'An API that uses only SQL',
          'An API that is written in Python'
        ],
        correctIndex: 1,
        explanation: 'RESTful APIs use standard HTTP methods and follow specific design principles.'
      }
    ],
    practicalQuestions: [
      {
        question: 'How do you connect a React frontend to an Express backend?',
        options: [
          'Using CSS imports',
          'Using fetch() or axios to make HTTP requests',
          'Using HTML <link> tags',
          'Using SQL queries in the browser'
        ],
        correctIndex: 1,
        explanation: 'The frontend communicates with the backend via HTTP requests to API endpoints.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Your frontend is getting a "CORS" error when calling the backend. What is the most likely cause?',
        options: [
          'The backend server is down',
          'The browser is blocking the request for security reasons',
          'The internet connection is slow',
          'The database is full'
        ],
        correctIndex: 1,
        explanation: 'CORS (Cross-Origin Resource Sharing) is a security feature that prevents unauthorized requests between different origins.'
      }
    ],
    codingTask: {
      prompt: 'Create a simple React component that fetches data from "/api/message" and displays it in a <div>.',
      starterCode: 'import React, { useState, useEffect } from "react";\n\nfunction App() {\n  const [msg, setMsg] = useState("");\n\n  // Write your code here\n\n  return <div>{msg}</div>;\n}',
      solution: 'useEffect(() => {\n  fetch("/api/message")\n    .then(res => res.text())\n    .then(data => setMsg(data));\n}, []);'
    },
    xpReward: 1500
  },
  {
    id: 'data-final-exam',
    title: 'Data Analyst Final Exam',
    path: 'Data Analyst',
    description: 'The ultimate test of your data analysis skills. Prove you can extract insights from data.',
    theoryQuestions: [
      {
        question: 'What is the primary goal of data analysis?',
        options: [
          'To collect as much data as possible',
          'To find meaningful patterns and insights in data',
          'To write complex code',
          'To create pretty charts'
        ],
        correctIndex: 1,
        explanation: 'Data analysis is about turning raw data into actionable information.'
      },
      {
        question: 'What is "Data Cleaning"?',
        options: [
          'Washing the server hardware',
          'Removing or correcting inaccurate records from a dataset',
          'Deleting all the data',
          'Encrypting the data'
        ],
        correctIndex: 1,
        explanation: 'Data cleaning is a crucial step in preparing data for analysis.'
      }
    ],
    practicalQuestions: [
      {
        question: 'Which Python library is most commonly used for data manipulation?',
        options: ['Flask', 'Pandas', 'Django', 'Pygame'],
        correctIndex: 1,
        explanation: 'Pandas provides powerful tools for working with structured data.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Your SQL query is returning too many results. What is the first thing you should check?',
        options: [
          'The SELECT clause',
          'The WHERE clause',
          'The ORDER BY clause',
          'The table name'
        ],
        correctIndex: 1,
        explanation: 'The WHERE clause is used to filter data and limit the results to what you actually need.'
      }
    ],
    codingTask: {
      prompt: 'Write a SQL query to select all columns from a table named "sales" where the "amount" is greater than 1000.',
      starterCode: '-- Write your SQL here',
      solution: 'SELECT * FROM sales WHERE amount > 1000;'
    },
    xpReward: 1300
  },
  {
    id: 'ai-final-exam',
    title: 'AI Engineer Final Exam',
    path: 'AI Engineer',
    description: 'The ultimate test of your AI engineering skills. Prove you can build intelligent systems.',
    theoryQuestions: [
      {
        question: 'What is "Supervised Learning"?',
        options: [
          'Learning with a human supervisor',
          'Learning from labeled data',
          'Learning from unlabeled data',
          'Learning by trial and error'
        ],
        correctIndex: 1,
        explanation: 'Supervised learning involves training a model on a dataset where the correct answers (labels) are provided.'
      }
    ],
    practicalQuestions: [
      {
        question: 'Which activation function is commonly used in hidden layers of neural networks?',
        options: ['Sigmoid', 'ReLU', 'Softmax', 'Linear'],
        correctIndex: 1,
        explanation: 'ReLU (Rectified Linear Unit) is widely used due to its efficiency and ability to mitigate the vanishing gradient problem.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'Your model has high accuracy on training data but low accuracy on test data. What is this called?',
        options: ['Underfitting', 'Overfitting', 'Balanced fitting', 'Data leakage'],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model learns the training data too well, including its noise, and fails to generalize to new data.'
      }
    ],
    codingTask: {
      prompt: 'Write a Python function using NumPy to calculate the mean squared error (MSE) between two arrays.',
      starterCode: 'import numpy as np\n\ndef calculate_mse(y_true, y_pred):\n  # Write your code here\n  pass',
      solution: 'return np.mean((y_true - y_pred)**2)'
    },
    xpReward: 1500
  },
  {
    id: 'cyber-final-exam',
    title: 'Cybersecurity Final Exam',
    path: 'Cybersecurity',
    description: 'The ultimate test of your cybersecurity skills. Prove you can protect digital assets.',
    theoryQuestions: [
      {
        question: 'What is a "Phishing" attack?',
        options: [
          'A type of malware',
          'A social engineering attack used to steal sensitive information',
          'A way to speed up the internet',
          'A type of firewall'
        ],
        correctIndex: 1,
        explanation: 'Phishing involves tricking users into revealing sensitive data like passwords or credit card numbers.'
      }
    ],
    practicalQuestions: [
      {
        question: 'Which tool is used for network scanning and discovery?',
        options: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite'],
        correctIndex: 1,
        explanation: 'Nmap is a powerful tool for network discovery and security auditing.'
      }
    ],
    debuggingQuestions: [
      {
        question: 'You find a suspicious process running on a Linux server. What command can you use to see more details about it?',
        options: ['ls', 'ps aux', 'cd', 'mkdir'],
        correctIndex: 1,
        explanation: 'The "ps aux" command lists all running processes with detailed information.'
      }
    ],
    codingTask: {
      prompt: 'Write a simple Python script to check if a password meets the following criteria: at least 8 characters long and contains at least one digit.',
      starterCode: 'def is_secure_password(password):\n  # Write your code here\n  pass',
      solution: 'return len(password) >= 8 and any(char.isdigit() for char in password)'
    },
    xpReward: 1500
  },
  {
    id: 'devops-final-exam',
    title: 'DevOps Engineer Final Exam',
    path: 'DevOps Engineer',
    description: 'The ultimate test of your DevOps skills.',
    theoryQuestions: [
      {
        question: 'What is "Infrastructure as Code" (IaC)?',
        options: [
          'Writing code for websites',
          'Managing and provisioning infrastructure through machine-readable definition files',
          'A type of database',
          'A security protocol'
        ],
        correctIndex: 1,
        explanation: 'IaC allows for the automated management of infrastructure, making it more consistent and reproducible.'
      }
    ],
    practicalQuestions: [],
    debuggingQuestions: [],
    codingTask: {
      prompt: 'Write a simple Dockerfile for a Node.js application.',
      starterCode: '# Write your Dockerfile here',
      solution: 'FROM node:14\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]'
    },
    xpReward: 1200
  },
  {
    id: 'cloud-final-exam',
    title: 'Cloud Engineer Final Exam',
    path: 'Cloud Engineer',
    description: 'The ultimate test of your cloud engineering skills.',
    theoryQuestions: [
      {
        question: 'What is "Auto-scaling" in the cloud?',
        options: [
          'Automatically resizing images',
          'Automatically adjusting the number of active servers based on demand',
          'A type of cloud storage',
          'A security feature'
        ],
        correctIndex: 1,
        explanation: 'Auto-scaling ensures that you have enough resources to handle the load while minimizing costs.'
      }
    ],
    practicalQuestions: [],
    debuggingQuestions: [],
    codingTask: {
      prompt: 'Write a simple AWS IAM policy that allows read-only access to an S3 bucket.',
      starterCode: '// Write your JSON policy here',
      solution: '{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": ["s3:Get*", "s3:List*"],\n      "Resource": "*"\n    }\n  ]\n}'
    },
    xpReward: 1200
  },
  {
    id: 'game-final-exam',
    title: 'Game Developer Final Exam',
    path: 'Game Developer',
    description: 'The ultimate test of your game development skills.',
    theoryQuestions: [
      {
        question: 'What is a "Frame Rate" (FPS) in games?',
        options: [
          'The speed of the internet',
          'The number of images displayed per second',
          'The size of the game file',
          'The number of players'
        ],
        correctIndex: 1,
        explanation: 'Frame rate is crucial for smooth gameplay and visual quality.'
      }
    ],
    practicalQuestions: [],
    debuggingQuestions: [],
    codingTask: {
      prompt: 'Write a simple C# script for Unity that moves an object forward when the "W" key is pressed.',
      starterCode: 'using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour {\n  void Update() {\n    // Write your code here\n  }\n}',
      solution: 'if (Input.GetKey(KeyCode.W)) {\n  transform.Translate(Vector3.forward * Time.deltaTime * 5f);\n}'
    },
    xpReward: 1200
  }
];
