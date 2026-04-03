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
  },
  {
    id: 'html-css-test',
    title: 'HTML & CSS Mastery Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your knowledge of web structure and styling.',
    minScoreToPass: 80,
    xpReward: 300,
    questions: [
      {
        question: 'Which HTML tag is used for the main heading of a page?',
        options: ['<head>', '<h6>', '<h1>', '<header>'],
        correctIndex: 2,
        explanation: '<h1> is the top-level heading and should be used for the main title of a page.'
      },
      {
        question: 'What does CSS stand for?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        correctIndex: 1,
        explanation: 'CSS stands for Cascading Style Sheets, which describes how HTML elements are to be displayed on screen.'
      },
      {
        question: 'Which CSS property is used to change the text color of an element?',
        options: ['font-color', 'text-style', 'color', 'background-color'],
        correctIndex: 2,
        explanation: 'The color property is used to set the color of the text.'
      },
      {
        question: 'What is the "Box Model" in CSS?',
        options: [
          'A way to draw boxes on the screen',
          'A layout model that consists of margins, borders, padding, and content',
          'A type of JavaScript function',
          'A way to store data in a database'
        ],
        correctIndex: 1,
        explanation: 'The CSS box model is essentially a box that wraps around every HTML element.'
      },
      {
        question: 'Which CSS layout module is best for one-dimensional layouts (rows or columns)?',
        options: ['Grid', 'Flexbox', 'Tables', 'Floats'],
        correctIndex: 1,
        explanation: 'Flexbox is designed for one-dimensional layouts, while Grid is for two-dimensional layouts.'
      }
    ]
  },
  {
    id: 'javascript-basics-test',
    title: 'JavaScript Basics Test',
    stage: 'Intermediate',
    path: 'Frontend Developer',
    description: 'Test your understanding of JavaScript variables, functions, and the DOM.',
    minScoreToPass: 80,
    xpReward: 350,
    questions: [
      {
        question: 'Which keyword is used to declare a variable that can be reassigned?',
        options: ['const', 'let', 'fixed', 'var (deprecated)'],
        correctIndex: 1,
        explanation: 'let allows for reassignment, while const is for values that stay the same.'
      },
      {
        question: 'What is the correct way to write a function in JavaScript?',
        options: [
          'function:myFunction() {}',
          'function myFunction() {}',
          'myFunction = function() {}',
          'Both B and C'
        ],
        correctIndex: 3,
        explanation: 'JavaScript supports both function declarations and function expressions.'
      },
      {
        question: 'How do you select an element with the class "btn" using querySelector?',
        options: [
          'document.querySelector("btn")',
          'document.querySelector(".btn")',
          'document.querySelector("#btn")',
          'document.querySelector("<btn>")'
        ],
        correctIndex: 1,
        explanation: 'querySelector uses CSS selector syntax, so classes are prefixed with a dot (.).'
      },
      {
        question: 'What does "async/await" help with in JavaScript?',
        options: [
          'Making the code run faster',
          'Handling asynchronous operations like API calls',
          'Styling the page',
          'Creating new HTML elements'
        ],
        correctIndex: 1,
        explanation: 'Async/await provides a cleaner way to work with Promises and asynchronous code.'
      },
      {
        question: 'What is an array in JavaScript?',
        options: [
          'A single value',
          'An ordered list of values',
          'A type of function',
          'A styling rule'
        ],
        correctIndex: 1,
        explanation: 'Arrays are used to store multiple values in a single variable.'
      }
    ]
  },
  {
    id: 'react-advanced-test',
    title: 'Advanced Frontend (React) Test',
    stage: 'Advanced',
    path: 'Frontend Developer',
    description: 'Verify your knowledge of React components, props, state, and hooks.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is a React Hook?',
        options: [
          'A way to style components',
          'A special function that lets you "hook into" React features',
          'A type of HTML tag',
          'A database connection'
        ],
        correctIndex: 1,
        explanation: 'Hooks like useState and useEffect allow functional components to use state and other React features.'
      },
      {
        question: 'How do you pass data from a parent component to a child component?',
        options: ['Using state', 'Using props', 'Using the DOM', 'Using CSS'],
        correctIndex: 1,
        explanation: 'Props are the standard way to pass data down the component tree.'
      },
      {
        question: 'What is the purpose of the "key" prop in a list of elements?',
        options: [
          'To style the elements',
          'To help React identify which items have changed, been added, or removed',
          'To set the ID of the element',
          'To make the list searchable'
        ],
        correctIndex: 1,
        explanation: 'Keys help React optimize rendering by tracking individual elements in a list.'
      },
      {
        question: 'What does the useEffect hook do?',
        options: [
          'It manages component state',
          'It handles side effects like data fetching or manual DOM updates',
          'It creates new components',
          'It routes the user to a new page'
        ],
        correctIndex: 1,
        explanation: 'useEffect is used for operations that happen outside the normal render flow.'
      },
      {
        question: 'What is JSX?',
        options: [
          'A new type of JavaScript engine',
          'A syntax extension for JavaScript that looks like HTML',
          'A CSS preprocessor',
          'A database query language'
        ],
        correctIndex: 1,
        explanation: 'JSX allows you to write HTML-like structures directly in your JavaScript code.'
      }
    ]
  },
  {
    id: 'backend-intermediate-test',
    title: 'Backend Intermediate Test',
    stage: 'Intermediate',
    path: 'Backend Developer',
    description: 'Test your knowledge of Express.js, REST APIs, and SQL databases.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'Which HTTP method is used to update an existing resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctIndex: 2,
        explanation: 'PUT (or PATCH) is used to update resources, while POST is for creating them.'
      },
      {
        question: 'What is a "Primary Key" in a database?',
        options: [
          'A key that opens the server room',
          'A unique identifier for each record in a table',
          'The most important field in a table',
          'A type of encryption key'
        ],
        correctIndex: 1,
        explanation: 'A Primary Key uniquely identifies each row in a relational database table.'
      },
      {
        question: 'What is the purpose of "Middleware" in Express?',
        options: [
          'To style the page',
          'To handle logic before it reaches the final route',
          'To connect to the database',
          'To compress images'
        ],
        correctIndex: 1,
        explanation: 'Middleware functions process requests before they reach the route handler.'
      }
    ]
  },
  {
    id: 'fullstack-intermediate-test',
    title: 'Full-Stack Intermediate Test',
    stage: 'Intermediate',
    path: 'Full-Stack Developer',
    description: 'Verify your understanding of React and Node.js integration.',
    minScoreToPass: 80,
    xpReward: 450,
    questions: [
      {
        question: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          'To style elements',
          'To handle side effects like data fetching',
          'To create new components',
          'To manage global state'
        ],
        correctIndex: 1,
        explanation: 'useEffect is used for operations that happen outside the normal render flow.'
      },
      {
        question: 'How do you send data from a React frontend to an Express backend?',
        options: [
          'Using CSS',
          'Using fetch() or axios',
          'Using HTML tags',
          'Using SQL'
        ],
        correctIndex: 1,
        explanation: 'fetch() and axios are common tools for making HTTP requests from the browser.'
      }
    ]
  },
  {
    id: 'data-analyst-intermediate-test',
    title: 'Data Analyst Intermediate Test',
    stage: 'Intermediate',
    path: 'Data Analyst',
    description: 'Test your knowledge of SQL for data and Python basics.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'Which SQL clause is used to filter results?',
        options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
        correctIndex: 2,
        explanation: 'The WHERE clause filters records based on specific conditions.'
      },
      {
        question: 'What is "Pandas" in Python used for?',
        options: [
          'Creating 3D games',
          'Data manipulation and analysis',
          'Building web servers',
          'Managing computer hardware'
        ],
        correctIndex: 1,
        explanation: 'Pandas is the most popular Python library for data manipulation.'
      }
    ]
  },
  {
    id: 'data-analyst-beginner-test',
    title: 'Data Analyst Beginner Test',
    stage: 'Beginner',
    path: 'Data Analyst',
    description: 'Test your understanding of the core concepts of data analysis and Excel.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
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
      },
      {
        question: 'Which Excel function is used to add together a range of cells?',
        options: ['AVERAGE', 'COUNT', 'SUM', 'MAX'],
        correctIndex: 2,
        explanation: 'The SUM function adds all the numbers in a range of cells.'
      }
    ]
  },
  {
    id: 'backend-advanced-test',
    title: 'Backend Advanced Test',
    stage: 'Advanced',
    path: 'Backend Developer',
    description: 'Test your knowledge of backend security, authentication, and advanced server concepts.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is a "JWT" (JSON Web Token)?',
        options: [
          'A type of database',
          'A secure way to transmit information between parties as a JSON object',
          'A new JavaScript framework',
          'A styling language'
        ],
        correctIndex: 1,
        explanation: 'JWTs are commonly used for authentication and information exchange in web applications.'
      },
      {
        question: 'What is the purpose of "Hashing" a password?',
        options: [
          'To make it easier to remember',
          'To store it in a way that is unreadable even if the database is compromised',
          'To speed up the login process',
          'To share it with other users'
        ],
        correctIndex: 1,
        explanation: 'Hashing is a one-way process that transforms a password into a unique string of characters for security.'
      },
      {
        question: 'What does "CORS" stand for?',
        options: [
          'Cross-Origin Resource Sharing',
          'Computer-Oriented Resource System',
          'Centralized Online Resource Server',
          'Client-Only Resource Security'
        ],
        correctIndex: 0,
        explanation: 'CORS is a security feature that controls which origins can access resources on a server.'
      }
    ]
  },
  {
    id: 'fullstack-advanced-test',
    title: 'Full-Stack Advanced Test',
    stage: 'Advanced',
    path: 'Full-Stack Developer',
    description: 'Verify your knowledge of advanced full-stack concepts, including API design and deployment.',
    minScoreToPass: 85,
    xpReward: 550,
    questions: [
      {
        question: 'What is "Deployment" in web development?',
        options: [
          'Writing the code',
          'The process of making your application accessible on the internet',
          'Designing the UI',
          'Testing the code'
        ],
        correctIndex: 1,
        explanation: 'Deployment involves moving your code from a local environment to a live server.'
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
    ]
  },
  {
    id: 'data-analyst-advanced-test',
    title: 'Data Analyst Advanced Test',
    stage: 'Advanced',
    path: 'Data Analyst',
    description: 'Test your knowledge of statistics and advanced data analysis concepts.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is "Probability" in statistics?',
        options: [
          'The study of numbers',
          'The likelihood of an event occurring',
          'A type of chart',
          'A way to clean data'
        ],
        correctIndex: 1,
        explanation: 'Probability is a measure of how likely it is that an event will happen.'
      },
      {
        question: 'What is the "Mean" of a dataset?',
        options: [
          'The middle value',
          'The most frequent value',
          'The average value',
          'The difference between the max and min'
        ],
        correctIndex: 2,
        explanation: 'The mean is calculated by adding all values and dividing by the number of values.'
      }
    ]
  },
  {
    id: 'ai-python-test',
    title: 'AI Python Basics Test',
    stage: 'Beginner',
    path: 'AI Engineer',
    description: 'Test your Python skills for AI development.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
      {
        question: 'Which Python library is essential for numerical computing in AI?',
        options: ['Pandas', 'NumPy', 'Matplotlib', 'Requests'],
        correctIndex: 1,
        explanation: 'NumPy provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions.'
      },
      {
        question: 'What is a list comprehension in Python?',
        options: ['A way to compress files', 'A concise way to create lists', 'A type of database', 'A debugging tool'],
        correctIndex: 1,
        explanation: 'List comprehensions provide a concise way to create lists based on existing lists or other iterables.'
      }
    ]
  },
  {
    id: 'ai-math-test',
    title: 'Math for AI Test',
    stage: 'Beginner',
    path: 'AI Engineer',
    description: 'Test your understanding of the mathematical foundations of AI.',
    minScoreToPass: 70,
    xpReward: 350,
    questions: [
      {
        question: 'What is a "Scalar" in linear algebra?',
        options: ['A vector with multiple values', 'A single number', 'A matrix of numbers', 'A type of function'],
        correctIndex: 1,
        explanation: 'A scalar is a single numerical value, as opposed to a vector or matrix.'
      }
    ]
  },
  {
    id: 'cyber-fundamentals-test',
    title: 'Cybersecurity Fundamentals Test',
    stage: 'Beginner',
    path: 'Cybersecurity',
    description: 'Test your knowledge of core security principles.',
    minScoreToPass: 80,
    xpReward: 300,
    questions: [
      {
        question: 'What does the "CIA Triad" stand for?',
        options: [
          'Central Intelligence Agency',
          'Confidentiality, Integrity, Availability',
          'Computer Internet Access',
          'Control, Information, Authentication'
        ],
        correctIndex: 1,
        explanation: 'The CIA triad is a model designed to guide policies for information security within an organization.'
      }
    ]
  },
  {
    id: 'devops-basics-test',
    title: 'DevOps Basics Test',
    stage: 'Beginner',
    path: 'DevOps Engineer',
    description: 'Test your understanding of DevOps culture and practices.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
      {
        question: 'What is the primary goal of DevOps?',
        options: [
          'To replace developers with operations staff',
          'To shorten the systems development life cycle and provide continuous delivery',
          'To write more code',
          'To increase the number of servers'
        ],
        correctIndex: 1,
        explanation: 'DevOps aims to improve collaboration between development and operations teams to deliver software faster and more reliably.'
      }
    ]
  },
  {
    id: 'cloud-basics-test',
    title: 'Cloud Basics Test',
    stage: 'Beginner',
    path: 'Cloud Engineer',
    description: 'Test your knowledge of cloud computing fundamentals.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
      {
        question: 'What is "SaaS" in cloud computing?',
        options: [
          'Storage as a Service',
          'Software as a Service',
          'Security as a Service',
          'System as a Service'
        ],
        correctIndex: 1,
        explanation: 'SaaS allows users to connect to and use cloud-based apps over the Internet.'
      }
    ]
  },
  {
    id: 'game-basics-test',
    title: 'Game Development Basics Test',
    stage: 'Beginner',
    path: 'Game Developer',
    description: 'Test your understanding of game development fundamentals.',
    minScoreToPass: 75,
    xpReward: 300,
    questions: [
      {
        question: 'What is a "Game Engine"?',
        options: [
          'The physical hardware that runs the game',
          'A software framework designed for the creation and development of video games',
          'The story of the game',
          'The marketing team for the game'
        ],
        correctIndex: 1,
        explanation: 'Game engines provide the core functionality needed to build games, such as rendering, physics, and sound.'
      }
    ]
  },
  {
    id: 'html-intro-test',
    title: 'HTML Introduction Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your knowledge of HTML basics and how the web works.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'What does HTML stand for?',
        options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Multi Language', 'Hidden Text Markup Language'],
        correctIndex: 0,
        explanation: 'HTML stands for HyperText Markup Language.'
      },
      {
        question: 'Who invented HTML?',
        options: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Mark Zuckerberg'],
        correctIndex: 2,
        explanation: 'Tim Berners-Lee invented HTML in 1991.'
      },
      {
        question: 'What is the current standard version of HTML?',
        options: ['HTML 4', 'HTML 6', 'HTML5', 'HTML X'],
        correctIndex: 2,
        explanation: 'HTML5 is the current standard.'
      },
      {
        question: 'Which tool is used to VIEW an HTML page?',
        options: ['Code Editor', 'Web Browser', 'Terminal', 'Database'],
        correctIndex: 1,
        explanation: 'Web browsers render and display HTML files.'
      },
      {
        question: 'What is the correct way to write a comment in HTML?',
        options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'],
        correctIndex: 2,
        explanation: 'HTML comments use <!-- -->.'
      }
    ]
  },
  {
    id: 'html-struct-test',
    title: 'HTML Structure Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your understanding of the basic HTML document structure.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'Which tag is the "root" element of an HTML page?',
        options: ['<body>', '<head>', '<html>', '<doctype>'],
        correctIndex: 2,
        explanation: 'The <html> tag wraps the entire document.'
      },
      {
        question: 'Where should the <!DOCTYPE html> declaration be placed?',
        options: ['At the end', 'In the <head>', 'As the first line', 'In the <body>'],
        correctIndex: 2,
        explanation: 'DOCTYPE must be the very first line.'
      },
      {
        question: 'Which section contains metadata and the page title?',
        options: ['<body>', '<head>', '<footer>', '<main>'],
        correctIndex: 1,
        explanation: 'The <head> section is for metadata and settings.'
      },
      {
        question: 'Which tag contains all the visible content of a page?',
        options: ['<html>', '<head>', '<body>', '<section>'],
        correctIndex: 2,
        explanation: 'The <body> tag holds everything users see.'
      },
      {
        question: 'What attribute is used to specify the language of the page?',
        options: ['language', 'lang', 'type', 'speech'],
        correctIndex: 1,
        explanation: 'The "lang" attribute (e.g., lang="en") is used.'
      }
    ]
  },
  {
    id: 'html-text-test',
    title: 'Text & Formatting Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your knowledge of headings, paragraphs, and text formatting.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<head>', '<h1>', '<header>'],
        correctIndex: 2,
        explanation: '<h1> is the largest and most important heading.'
      },
      {
        question: 'Which tag is used to define a paragraph?',
        options: ['<para>', '<p>', '<text>', '<div>'],
        correctIndex: 1,
        explanation: 'The <p> tag is used for paragraphs.'
      },
      {
        question: 'Which tag is used to make text bold and indicate importance?',
        options: ['<b>', '<i>', '<strong>', '<em>'],
        correctIndex: 2,
        explanation: '<strong> makes text bold and adds semantic importance.'
      },
      {
        question: 'How do you create a line break in HTML?',
        options: ['<break>', '<lb>', '<br>', '<hr>'],
        correctIndex: 2,
        explanation: 'The <br> tag creates a single line break.'
      },
      {
        question: 'Which tag creates a horizontal thematic break (a line)?',
        options: ['<line>', '<hr>', '<br>', '<divider>'],
        correctIndex: 1,
        explanation: '<hr> stands for Horizontal Rule.'
      }
    ]
  },
  {
    id: 'html-links-test',
    title: 'Links & Images Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your knowledge of hyperlinks and image integration.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctIndex: 1,
        explanation: 'The <a> (anchor) tag creates links.'
      },
      {
        question: 'What attribute specifies the destination of a link?',
        options: ['src', 'link', 'href', 'url'],
        correctIndex: 2,
        explanation: 'The "href" attribute holds the link destination.'
      },
      {
        question: 'Which attribute is used to add an image source?',
        options: ['href', 'src', 'url', 'img'],
        correctIndex: 1,
        explanation: 'The "src" attribute defines the image path.'
      },
      {
        question: 'What is the purpose of the "alt" attribute on an image?',
        options: ['To style the image', 'To provide a text description for accessibility', 'To make it a link', 'To change the size'],
        correctIndex: 1,
        explanation: 'The "alt" attribute provides alternative text for screen readers.'
      },
      {
        question: 'How do you open a link in a new tab?',
        options: ['target="_new"', 'target="_blank"', 'open="new"', 'mode="tab"'],
        correctIndex: 1,
        explanation: 'target="_blank" opens the link in a new tab.'
      }
    ]
  },
  {
    id: 'html-lists-test',
    title: 'Lists & Tables Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your knowledge of lists and tables.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'Which tag is used for an unordered (bulleted) list?',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        correctIndex: 1,
        explanation: '<ul> stands for Unordered List.'
      },
      {
        question: 'Which tag is used for an ordered (numbered) list?',
        options: ['<ol>', '<ul>', '<li>', '<num>'],
        correctIndex: 0,
        explanation: '<ol> stands for Ordered List.'
      },
      {
        question: 'Which tag defines an individual list item?',
        options: ['<item>', '<list>', '<li>', '<bullet>'],
        correctIndex: 2,
        explanation: '<li> stands for List Item.'
      },
      {
        question: 'Which tag defines a table row?',
        options: ['<td>', '<th>', '<tr>', '<table>'],
        correctIndex: 2,
        explanation: '<tr> stands for Table Row.'
      },
      {
        question: 'Which tag is used for a table header cell?',
        options: ['<td>', '<th>', '<head>', '<header>'],
        correctIndex: 1,
        explanation: '<th> stands for Table Header.'
      }
    ]
  },
  {
    id: 'html-forms-test',
    title: 'Forms Basics Quiz',
    stage: 'Beginner',
    path: 'HTML',
    description: 'Test your knowledge of basic form elements.',
    minScoreToPass: 80,
    xpReward: 150,
    questions: [
      {
        question: 'Which tag wraps all form elements?',
        options: ['<input>', '<form>', '<action>', '<submit>'],
        correctIndex: 1,
        explanation: 'The <form> tag is the container for all form inputs.'
      },
      {
        question: 'Which input type is used for a single line of text?',
        options: ['type="text"', 'type="string"', 'type="line"', 'type="input"'],
        correctIndex: 0,
        explanation: 'type="text" is the default for text input.'
      },
      {
        question: 'Which tag is used to label an input field?',
        options: ['<text>', '<span>', '<label>', '<desc>'],
        correctIndex: 2,
        explanation: 'The <label> tag provides a text label for an input.'
      },
      {
        question: 'Which attribute connects a label to an input\'s ID?',
        options: ['for', 'id', 'connect', 'to'],
        correctIndex: 0,
        explanation: 'The "for" attribute on a label should match the "id" of the input.'
      },
      {
        question: 'Which input type allows selecting multiple options?',
        options: ['radio', 'checkbox', 'select', 'multiple'],
        correctIndex: 1,
        explanation: 'Checkboxes allow multiple selections, while radio buttons are for single choice.'
      }
    ]
  },
  {
    id: 'html-final-exam',
    title: 'HTML Specialist Final Exam',
    stage: 'Advanced',
    path: 'HTML',
    description: 'The final challenge to prove your mastery of HTML.',
    minScoreToPass: 85,
    xpReward: 1000,
    questions: [
      {
        question: 'What is the purpose of Semantic HTML?',
        options: ['To make the code shorter', 'To give meaning to the structure for browsers and screen readers', 'To add colors to the page', 'To make the page load faster'],
        correctIndex: 1,
        explanation: 'Semantic HTML uses tags that describe their content (like <article> or <nav>).'
      },
      {
        question: 'Which tag is used for navigation links?',
        options: ['<links>', '<nav>', '<menu>', '<header>'],
        correctIndex: 1,
        explanation: 'The <nav> tag is specifically for navigation sections.'
      },
      {
        question: 'What does SEO stand for?',
        options: ['Search Engine Optimization', 'Site Entry Operation', 'Secure Electronic Object', 'Standard Entry Order'],
        correctIndex: 0,
        explanation: 'SEO stands for Search Engine Optimization.'
      },
      {
        question: 'Which attribute is used to lazy load an image?',
        options: ['lazy="true"', 'loading="lazy"', 'speed="slow"', 'defer="true"'],
        correctIndex: 1,
        explanation: 'loading="lazy" tells the browser to wait until the image is near the viewport.'
      },
      {
        question: 'What is the purpose of the <main> tag?',
        options: ['To hold the navigation', 'To hold the unique content of the page', 'To hold the footer', 'To hold the sidebar'],
        correctIndex: 1,
        explanation: 'The <main> tag should contain the primary content of the document.'
      }
    ]
  }
];
