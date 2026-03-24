import { StageTest } from '../types';

export const STAGE_TESTS: StageTest[] = [
  {
    id: 'foundations-test',
    title: 'Foundations Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your understanding of the core concepts of coding, computers, and the web.',
    minScoreToPass: 70,
    xpReward: 200,
    questions: [
      {
        question: 'What is the primary role of a programmer?',
        options: [
          'To fix broken computers',
          'To give precise instructions to a computer',
          'To type as fast as possible',
          'To memorize every coding language'
        ],
        correctIndex: 1,
        explanation: 'Programming is about problem-solving and providing logical instructions for a computer to execute.'
      },
      {
        question: 'Which of these is a "High-Level" language?',
        options: [
          'Binary (1s and 0s)',
          'Assembly',
          'JavaScript',
          'Machine Code'
        ],
        correctIndex: 2,
        explanation: 'High-level languages like JavaScript are designed to be readable by humans, while low-level languages are closer to what the hardware understands.'
      },
      {
        question: 'What happens if you make a small typo in your code?',
        options: [
          'The computer will guess what you meant',
          'The computer will automatically fix it',
          'The code will likely fail or produce an error',
          'Nothing, typos don\'t matter in coding'
        ],
        correctIndex: 2,
        explanation: 'Computers are extremely literal. Even a missing semicolon or a misspelled word can stop the entire program.'
      },
      {
        question: 'What is a "Server" in the context of the web?',
        options: [
          'A person who brings you food',
          'A computer that stores website files and sends them to users',
          'The browser you use to surf the web',
          'A type of internet cable'
        ],
        correctIndex: 1,
        explanation: 'Servers are powerful computers that "serve" content to "clients" (like your browser) over the internet.'
      },
      {
        question: 'Which technology is used to define the "look and feel" of a website?',
        options: [
          'HTML',
          'JavaScript',
          'CSS',
          'SQL'
        ],
        correctIndex: 2,
        explanation: 'CSS (Cascading Style Sheets) handles the colors, fonts, and layout of a web page.'
      }
    ]
  },
  {
    id: 'html-css-basics-test',
    title: 'HTML & CSS Basics Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Verify your knowledge of building and styling basic web pages.',
    minScoreToPass: 80,
    xpReward: 250,
    questions: [
      {
        question: 'Which tag is used to create a hyperlink?',
        options: [
          '<link>',
          '<a>',
          '<href>',
          '<url>'
        ],
        correctIndex: 1,
        explanation: 'The <a> (anchor) tag is used to create links. The "href" attribute specifies the destination.'
      },
      {
        question: 'How do you select an element with the id "header" in CSS?',
        options: [
          '.header',
          'header',
          '#header',
          '*header'
        ],
        correctIndex: 2,
        explanation: 'In CSS, the hash symbol (#) is used to select elements by their ID.'
      },
      {
        question: 'What is the purpose of the "alt" attribute on an <img> tag?',
        options: [
          'To make the image load faster',
          'To provide a text description for accessibility',
          'To change the image size',
          'To add a border around the image'
        ],
        correctIndex: 1,
        explanation: 'The "alt" attribute is crucial for screen readers and displays if the image fails to load.'
      },
      {
        question: 'Which CSS property is used to change the text color?',
        options: [
          'text-color',
          'font-color',
          'color',
          'background-color'
        ],
        correctIndex: 2,
        explanation: 'The "color" property specifically targets the text color of an element.'
      },
      {
        question: 'What does the <head> section of an HTML document contain?',
        options: [
          'The main title shown on the page',
          'Information about the page (metadata)',
          'The footer of the website',
          'All the images on the page'
        ],
        correctIndex: 1,
        explanation: 'The <head> contains info like the page title, links to CSS, and character encoding, which aren\'t visible on the page itself.'
      }
    ]
  },
  {
    id: 'backend-foundations-test',
    title: 'Backend Foundations Test',
    stage: 'Beginner',
    path: 'Backend Developer',
    description: 'Test your understanding of server-side programming, Node.js, and databases.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
      {
        question: 'What is the primary role of Node.js?',
        options: [
          'To style web pages',
          'To run JavaScript on the server',
          'To create mobile apps',
          'To manage browser cookies'
        ],
        correctIndex: 1,
        explanation: 'Node.js is a runtime environment that allows JavaScript to be used for server-side development.'
      },
      {
        question: 'What does "REST" stand for in the context of APIs?',
        options: [
          'Representational State Transfer',
          'Relational State Transfer',
          'Remote Entry Service Tool',
          'Real-time Entry System'
        ],
        correctIndex: 0,
        explanation: 'REST is an architectural style for designing networked applications.'
      },
      {
        question: 'Which SQL command is used to fetch data from a table?',
        options: [
          'GET',
          'FETCH',
          'SELECT',
          'READ'
        ],
        correctIndex: 2,
        explanation: 'SELECT is the standard SQL command for retrieving data.'
      },
      {
        question: 'What is the purpose of a "Database Schema"?',
        options: [
          'To make the database faster',
          'To define the structure and organization of data',
          'To encrypt the data',
          'To backup the database'
        ],
        correctIndex: 1,
        explanation: 'A schema is a blueprint that defines how data is organized in a database.'
      },
      {
        question: 'What is an "Environment Variable" used for?',
        options: [
          'To change the color of the code editor',
          'To store sensitive configuration like API keys',
          'To speed up the computer',
          'To track the weather'
        ],
        correctIndex: 1,
        explanation: 'Environment variables are used to store configuration settings that should not be hardcoded in the source code.'
      }
    ]
  },
  {
    id: 'fullstack-foundations-test',
    title: 'Full-Stack Foundations Test',
    stage: 'Beginner',
    path: 'Full-Stack Developer',
    description: 'Verify your knowledge of both frontend and backend fundamentals.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'What is the "Client" in a web application?',
        options: [
          'The database server',
          'The user\'s browser',
          'The cloud provider',
          'The developer\'s computer'
        ],
        correctIndex: 1,
        explanation: 'The client is the part of the application that the user interacts with directly, typically a web browser.'
      },
      {
        question: 'Which technology connects the frontend to the backend?',
        options: [
          'CSS',
          'HTML',
          'APIs',
          'SQL'
        ],
        correctIndex: 2,
        explanation: 'APIs (Application Programming Interfaces) act as the bridge between the client-side and server-side of an application.'
      },
      {
        question: 'What is the main advantage of a "Single Page Application" (SPA)?',
        options: [
          'It uses less memory',
          'It provides a smoother, faster user experience',
          'It is easier to build',
          'It doesn\'t require JavaScript'
        ],
        correctIndex: 1,
        explanation: 'SPAs load a single HTML page and dynamically update content, making them feel more like a desktop application.'
      },
      {
        question: 'What does "Full-Stack" mean?',
        options: [
          'A developer who only works on databases',
          'A developer who works on both the frontend and backend',
          'A developer who only works on CSS',
          'A developer who only works on mobile apps'
        ],
        correctIndex: 1,
        explanation: 'Full-stack development involves working on all layers of an application, from the user interface to the database.'
      }
    ]
  }
];
