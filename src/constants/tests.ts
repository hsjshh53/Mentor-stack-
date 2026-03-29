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
    id: 'uiux-intro-test',
    title: 'Introduction to UI/UX Test',
    stage: 'Beginner',
    path: 'UI/UX',
    description: 'Test your understanding of UI vs UX and why design matters.',
    minScoreToPass: 70,
    xpReward: 200,
    questions: [
      {
        question: 'What does UI stand for?',
        options: ['User Interaction', 'User Interface', 'User Insight', 'User Integration'],
        correctIndex: 1,
        explanation: 'UI stands for User Interface, focusing on the visual elements of a product.'
      },
      {
        question: 'What is the primary focus of UX design?',
        options: ['Visual aesthetics', 'The overall experience and usability', 'Writing code', 'Marketing the product'],
        correctIndex: 1,
        explanation: 'UX focuses on how a user feels and interacts with a product, ensuring it is useful and easy to use.'
      }
    ]
  },
  {
    id: 'design-principles-test',
    title: 'Design Principles Test',
    stage: 'Beginner',
    path: 'UI/UX',
    description: 'Verify your knowledge of color, typography, and layout.',
    minScoreToPass: 75,
    xpReward: 250,
    questions: [
      {
        question: 'What is "Negative Space" in design?',
        options: ['Space that looks bad', 'The empty space between design elements', 'A dark color palette', 'Space used for error messages'],
        correctIndex: 1,
        explanation: 'Negative space (or white space) helps create balance and focus in a layout.'
      },
      {
        question: 'Which color scheme uses colors that are opposite each other on the color wheel?',
        options: ['Analogous', 'Monochromatic', 'Complementary', 'Triadic'],
        correctIndex: 2,
        explanation: 'Complementary colors provide high contrast and are located opposite each other.'
      }
    ]
  },
  {
    id: 'ux-basics-test',
    title: 'UX Basics Test',
    stage: 'Beginner',
    path: 'UI/UX',
    description: 'Test your knowledge of user journeys and pain points.',
    minScoreToPass: 75,
    xpReward: 250,
    questions: [
      {
        question: 'What is a "User Journey"?',
        options: ['A trip the user takes', 'A visual representation of the steps a user takes to achieve a goal', 'The user\'s browser history', 'A list of user complaints'],
        correctIndex: 1,
        explanation: 'A user journey maps out the entire experience a user has with a product.'
      }
    ]
  },
  {
    id: 'wireframing-test',
    title: 'Wireframing Test',
    stage: 'Beginner',
    path: 'UI/UX',
    description: 'Verify your understanding of low-fidelity layouts.',
    minScoreToPass: 70,
    xpReward: 200,
    questions: [
      {
        question: 'What is the main purpose of a wireframe?',
        options: ['To show final colors and images', 'To define the structure and layout of a screen', 'To write the final code', 'To test the server speed'],
        correctIndex: 1,
        explanation: 'Wireframes focus on functionality and layout rather than visual details.'
      }
    ]
  },
  {
    id: 'tools-test',
    title: 'Design Tools Test',
    stage: 'Beginner',
    path: 'UI/UX',
    description: 'Test your basic knowledge of Figma and Canva.',
    minScoreToPass: 70,
    xpReward: 200,
    questions: [
      {
        question: 'Which tool is primarily used for professional UI/UX prototyping?',
        options: ['Canva', 'Figma', 'Microsoft Word', 'Excel'],
        correctIndex: 1,
        explanation: 'Figma is the industry standard for UI/UX design and prototyping.'
      }
    ]
  },
  {
    id: 'design-systems-test',
    title: 'Design Systems Test',
    stage: 'Intermediate',
    path: 'UI/UX',
    description: 'Verify your knowledge of components and consistency.',
    minScoreToPass: 80,
    xpReward: 350,
    questions: [
      {
        question: 'What is a "Design System"?',
        options: ['A single Figma file', 'A collection of reusable components and standards', 'A type of computer monitor', 'A marketing strategy'],
        correctIndex: 1,
        explanation: 'Design systems ensure consistency across large products by providing reusable building blocks.'
      }
    ]
  },
  {
    id: 'ux-research-test',
    title: 'UX Research Test',
    stage: 'Intermediate',
    path: 'UI/UX',
    description: 'Test your knowledge of user personas and feedback.',
    minScoreToPass: 80,
    xpReward: 350,
    questions: [
      {
        question: 'What is a "User Persona"?',
        options: ['A real person using the app', 'A fictional character representing a user group', 'A list of user IDs', 'The CEO of the company'],
        correctIndex: 1,
        explanation: 'Personas help designers empathize with and design for specific target audiences.'
      }
    ]
  },
  {
    id: 'prototyping-test',
    title: 'Prototyping Test',
    stage: 'Intermediate',
    path: 'UI/UX',
    description: 'Verify your understanding of interactive prototypes.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'What is "Smart Animate" in Figma?',
        options: ['A way to generate code', 'A feature that automatically creates transitions between matching layers', 'An AI that designs for you', 'A tool for drawing icons'],
        correctIndex: 1,
        explanation: 'Smart Animate creates smooth, realistic transitions by interpolating changes between screens.'
      }
    ]
  },
  {
    id: 'mobile-design-test',
    title: 'Mobile Design Test',
    stage: 'Intermediate',
    path: 'UI/UX',
    description: 'Test your knowledge of mobile-first design.',
    minScoreToPass: 80,
    xpReward: 350,
    questions: [
      {
        question: 'What does "Mobile-First" design mean?',
        options: ['Designing for desktop first, then mobile', 'Starting the design process with the smallest screen size', 'Only designing for mobile phones', 'Using a mobile phone to design'],
        correctIndex: 1,
        explanation: 'Mobile-first ensures the core experience works on small screens before expanding to larger ones.'
      }
    ]
  },
  {
    id: 'web-design-test',
    title: 'Web Design Test',
    stage: 'Intermediate',
    path: 'UI/UX',
    description: 'Verify your knowledge of landing pages and dashboards.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'What is the primary goal of a Landing Page?',
        options: ['To show all company information', 'To drive a specific user action (conversion)', 'To host a blog', 'To store user data'],
        correctIndex: 1,
        explanation: 'Landing pages are focused on a single call to action, like signing up or buying a product.'
      }
    ]
  },
  {
    id: 'real-product-test',
    title: 'Real Product Design Test',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'Test your knowledge of the case study approach.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'Why is a "Case Study" important for a designer?',
        options: ['To show they can use Figma', 'To demonstrate their problem-solving process and thinking', 'To list their hobbies', 'To show final pretty pictures only'],
        correctIndex: 1,
        explanation: 'Employers look for the "why" behind the design, which a case study explains in detail.'
      }
    ]
  },
  {
    id: 'portfolio-test',
    title: 'Portfolio Test',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'Verify your knowledge of presenting designs.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'Which platform is most popular for showcasing UI/UX portfolios?',
        options: ['GitHub', 'Behance', 'LinkedIn', 'Stack Overflow'],
        correctIndex: 1,
        explanation: 'Behance and Dribbble are the primary platforms for visual and product designers.'
      }
    ]
  },
  {
    id: 'dev-handoff-test',
    title: 'Developer Handoff Test',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'Test your knowledge of the handoff process.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What should be included in a "Developer Handoff"?',
        options: ['Just a PDF of the design', 'Assets, specs, and a walkthrough of interactions', 'The designer\'s phone number', 'A link to a YouTube video'],
        correctIndex: 1,
        explanation: 'Handoff requires clear documentation so developers can accurately build the design.'
      }
    ]
  },
  {
    id: 'freelancing-test',
    title: 'Freelancing & Jobs Test',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'Verify your knowledge of the design industry.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is a common way to price freelance design work?',
        options: ['By the number of pixels', 'Hourly rate or fixed project fee', 'By the number of colors used', 'By the size of the Figma file'],
        correctIndex: 1,
        explanation: 'Hourly and fixed-price are the standard models for freelance services.'
      }
    ]
  },
  {
    id: 'advanced-ux-test',
    title: 'Advanced UX Test',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'Test your knowledge of usability and A/B testing.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is "Usability Testing"?',
        options: ['Testing if the app crashes', 'Observing real users as they try to complete tasks with your product', 'Checking if the colors are pretty', 'Testing the internet speed'],
        correctIndex: 1,
        explanation: 'Usability testing identifies friction points and areas for improvement in the user experience.'
      }
    ]
  },
  {
    id: 'uiux-final-exam',
    title: 'UI/UX Professional Final Exam',
    stage: 'Advanced',
    path: 'UI/UX',
    description: 'The final comprehensive exam for the UI/UX Designer career path.',
    minScoreToPass: 90,
    xpReward: 1000,
    questions: [
      {
        question: 'Which of the following best describes the "Double Diamond" design process?',
        options: [
          'A way to cut diamonds',
          'Discover, Define, Develop, Deliver',
          'Design, Debug, Deploy, Done',
          'A type of color palette'
        ],
        correctIndex: 1,
        explanation: 'The Double Diamond is a popular framework for innovation and design thinking.'
      },
      {
        question: 'What is "Accessibility" in UI design?',
        options: [
          'Making the app free to download',
          'Ensuring the product can be used by everyone, including people with disabilities',
          'Having a fast loading time',
          'Using a lot of icons'
        ],
        correctIndex: 1,
        explanation: 'Accessibility (a11y) is a core responsibility of design to ensure inclusivity.'
      }
    ]
  },
  {
    id: 'html-test',
    title: 'HTML Mastery Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your knowledge of HTML structure, semantics, and forms.',
    minScoreToPass: 80,
    xpReward: 250,
    questions: [
      {
        question: 'Which HTML element is used to define the main content of a document?',
        options: ['<section>', '<main>', '<div>', '<article>'],
        correctIndex: 1,
        explanation: 'The <main> element represents the dominant content of the <body> of a document.'
      },
      {
        question: 'What is the purpose of the <label> element in a form?',
        options: ['To style the input', 'To provide a caption for an input element', 'To group inputs together', 'To submit the form'],
        correctIndex: 1,
        explanation: 'The <label> element provides a caption for an item in a user interface, improving accessibility.'
      }
    ]
  },
  {
    id: 'css-test',
    title: 'CSS Mastery Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your knowledge of CSS selectors, layout, and variables.',
    minScoreToPass: 80,
    xpReward: 250,
    questions: [
      {
        question: 'What is the "Box Model" in CSS?',
        options: ['A way to draw boxes', 'A model representing content, padding, border, and margin', 'A type of grid layout', 'A JavaScript function'],
        correctIndex: 1,
        explanation: 'The CSS box model is the foundation of layout on the web.'
      },
      {
        question: 'Which property is used to create a Flexbox container?',
        options: ['display: grid', 'display: flex', 'layout: flex', 'flex: true'],
        correctIndex: 1,
        explanation: 'Setting display to flex turns an element into a flex container.'
      }
    ]
  },
  {
    id: 'git-test',
    title: 'Git & GitHub Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your knowledge of version control and collaboration.',
    minScoreToPass: 80,
    xpReward: 250,
    questions: [
      {
        question: 'Which command is used to save changes to the local repository?',
        options: ['git push', 'git commit', 'git add', 'git save'],
        correctIndex: 1,
        explanation: 'git commit records changes to the repository.'
      },
      {
        question: 'What is a "Branch" in Git?',
        options: ['A copy of the repository', 'A separate line of development', 'A way to delete code', 'A type of folder'],
        correctIndex: 1,
        explanation: 'Branches allow you to work on different features or fixes independently.'
      }
    ]
  },
  {
    id: 'dom-test',
    title: 'DOM & Events Test',
    stage: 'Intermediate',
    path: 'Frontend Developer',
    description: 'Test your knowledge of DOM manipulation and event handling.',
    minScoreToPass: 80,
    xpReward: 350,
    questions: [
      {
        question: 'How do you add a click event listener to an element?',
        options: ['element.onclick()', 'element.addEventListener("click", callback)', 'element.click(callback)', 'element.on("click", callback)'],
        correctIndex: 1,
        explanation: 'addEventListener is the standard way to attach event handlers in modern JavaScript.'
      },
      {
        question: 'What is the "DOM"?',
        options: ['Data Object Model', 'Document Object Model', 'Digital Object Model', 'Document Oriented Model'],
        correctIndex: 1,
        explanation: 'The DOM is a programming interface for web documents, representing the page as a tree of objects.'
      }
    ]
  },
  {
    id: 'js-advanced-test',
    title: 'Advanced JavaScript Test',
    stage: 'Intermediate',
    path: 'Frontend Developer',
    description: 'Test your knowledge of async JS, ES6+, and modules.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'What does a Promise represent in JavaScript?',
        options: ['A guaranteed value', 'The eventual completion or failure of an asynchronous operation', 'A type of function', 'A syntax error'],
        correctIndex: 1,
        explanation: 'Promises are used to handle asynchronous operations more cleanly than callbacks.'
      },
      {
        question: 'Which keyword is used to export a function from a module?',
        options: ['send', 'share', 'export', 'public'],
        correctIndex: 2,
        explanation: 'The export statement is used to make functions, objects, or values available to other modules.'
      }
    ]
  },
  {
    id: 'modern-ui-test',
    title: 'Modern UI & Responsive Design Test',
    stage: 'Intermediate',
    path: 'Frontend Developer',
    description: 'Test your knowledge of responsive design and modern UI trends.',
    minScoreToPass: 80,
    xpReward: 400,
    questions: [
      {
        question: 'What is "Mobile-First" design?',
        options: ['Designing for mobile only', 'Designing for the smallest screen first and adding complexity for larger screens', 'Making the site look like an app', 'Using only mobile fonts'],
        correctIndex: 1,
        explanation: 'Mobile-first is a strategy that prioritizes the mobile experience and scales up.'
      },
      {
        question: 'Which CSS property is essential for Glassmorphism?',
        options: ['opacity', 'blur', 'backdrop-filter', 'filter'],
        correctIndex: 2,
        explanation: 'backdrop-filter allows you to apply effects like blur to the area behind an element.'
      }
    ]
  },
  {
    id: 'react-basics-test',
    title: 'React Basics Test',
    stage: 'Advanced',
    path: 'Frontend Developer',
    description: 'Test your knowledge of React components, props, and state.',
    minScoreToPass: 85,
    xpReward: 450,
    questions: [
      {
        question: 'What is the purpose of "State" in React?',
        options: ['To store global data', 'To manage data that changes over time within a component', 'To pass data to children', 'To style components'],
        correctIndex: 1,
        explanation: 'State allows components to keep track of information and re-render when it changes.'
      },
      {
        question: 'What are "Props" in React?',
        options: ['Private state', 'Properties passed from a parent to a child component', 'A type of hook', 'A CSS framework'],
        correctIndex: 1,
        explanation: 'Props are used to pass data and configuration down the component tree.'
      }
    ]
  },
  {
    id: 'performance-test',
    title: 'Performance Optimization Test',
    stage: 'Advanced',
    path: 'Frontend Developer',
    description: 'Test your knowledge of web performance and optimization.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is "Code Splitting"?',
        options: ['Dividing code into multiple files', 'Loading only the code needed for the current page', 'Minifying JavaScript', 'Removing unused CSS'],
        correctIndex: 1,
        explanation: 'Code splitting improves initial load time by sending smaller bundles to the browser.'
      },
      {
        question: 'What does "Lighthouse" measure?',
        options: ['Server uptime', 'Performance, Accessibility, SEO, and Best Practices', 'Database speed', 'Code quality'],
        correctIndex: 1,
        explanation: 'Lighthouse is an automated tool for improving the quality of web pages.'
      }
    ]
  },
  {
    id: 'deployment-test',
    title: 'Deployment & CI/CD Test',
    stage: 'Advanced',
    path: 'Frontend Developer',
    description: 'Test your knowledge of deployment and continuous integration.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is "Continuous Deployment"?',
        options: ['Deploying code manually every day', 'Automatically deploying code to production after passing tests', 'Writing code that never stops', 'A type of cloud hosting'],
        correctIndex: 1,
        explanation: 'CD automates the release process, ensuring that new code is delivered to users quickly and safely.'
      },
      {
        question: 'What is the purpose of a CNAME record?',
        options: ['To set the site title', 'To map a custom domain to another domain name', 'To encrypt the connection', 'To store user data'],
        correctIndex: 1,
        explanation: 'CNAME records are used to alias one domain name to another, common for custom domains on hosting platforms.'
      }
    ]
  },
  {
    id: 'career-test',
    title: 'Career & Professional Prep Test',
    stage: 'Advanced',
    path: 'Frontend Developer',
    description: 'Test your knowledge of job searching, resumes, and interviews.',
    minScoreToPass: 85,
    xpReward: 500,
    questions: [
      {
        question: 'What is the "STAR" method used for in interviews?',
        options: ['Solving coding challenges', 'Answering behavioral questions', 'Designing UI layouts', 'Writing clean code'],
        correctIndex: 1,
        explanation: 'STAR (Situation, Task, Action, Result) is a framework for providing structured answers to behavioral questions.'
      },
      {
        question: 'What should be the focus of a developer portfolio?',
        options: ['Quantity of projects', 'Quality of projects and clear explanations of your process', 'Personal hobbies', 'A list of every tool you\'ve ever used'],
        correctIndex: 1,
        explanation: 'A portfolio should showcase your best work and demonstrate your problem-solving abilities.'
      }
    ]
  }
];

