import { LessonContent } from '../types';

export const LESSON_CONTENT: Record<string, LessonContent> = {
  'what-is-coding': {
    id: 'what-is-coding',
    title: 'What is Coding?',
    todayYouAreLearning: 'The absolute basics of what coding is and why it matters in our world.',
    whyItMatters: 'Coding is the language of the future. Everything from your phone to your microwave runs on code.',
    explanation: 'Coding is simply giving a set of instructions to a computer to perform a specific task. Think of it like writing a recipe for a cake. You tell the computer exactly what to do, step by step, and it follows those instructions perfectly.',
    analogy: 'Imagine you are teaching a robot how to make a peanut butter sandwich. You can\'t just say "make a sandwich." You have to say: 1. Pick up the bread. 2. Open the jar. 3. Spread the peanut butter. That is coding!',
    codeExample: '// This is a simple instruction in JavaScript\nconsole.log("Hello, World!");',
    lineByLine: 'The "console.log" part tells the computer to "print" or "show" something. The text inside the quotes is what we want it to show.',
    commonMistakes: [
      'Thinking you need to be a math genius.',
      'Trying to learn everything at once.',
      'Forgetting that computers are actually quite "dumb" and need perfect instructions.'
    ],
    practice: 'Try to think of a daily task (like brushing your teeth) and break it down into 5 tiny steps.',
    challenge: 'Can you write a set of instructions for a robot to walk across a room?',
    quiz: [
      {
        question: 'What is the best definition of coding?',
        options: [
          'Talking to robots in English',
          'Giving a set of instructions to a computer',
          'Fixing broken hardware',
          'Playing video games'
        ],
        correctIndex: 1,
        explanation: 'Coding is the process of creating instructions that a computer can follow to perform tasks.'
      },
      {
        question: 'Does a computer understand vague instructions like "make it look cool"?',
        options: [
          'Yes, computers are smart',
          'No, they need specific, logical steps',
          'Only if you use a Mac',
          'Sometimes'
        ],
        correctIndex: 1,
        explanation: 'Computers require precise, logical instructions. They cannot interpret vague human desires without them being broken down into code.'
      }
    ],
    recap: 'Coding is just instructions. It\'s logical, step-by-step, and anyone can learn it with practice!'
  },
  'how-computers-work': {
    id: 'how-computers-work',
    title: 'How Computers Follow Instructions',
    todayYouAreLearning: 'How a computer processes the code you write and turns it into action.',
    whyItMatters: 'Understanding the "brain" of the computer helps you write better, more efficient code.',
    explanation: 'Computers use a processor (CPU) to execute instructions. These instructions are processed one by one, very quickly. At the lowest level, computers only understand 1s and 0s (Binary), but we use "High-Level" languages like JavaScript to write code that is easier for humans to read.',
    analogy: 'Think of the CPU as a very fast chef in a kitchen. The code is the recipe. The chef follows the recipe exactly as written, even if the recipe has a mistake!',
    codeExample: 'let steps = 0;\nsteps = steps + 1;\nconsole.log(steps);',
    lineByLine: 'First, we create a "variable" called steps and set it to 0. Then we add 1 to it. Finally, we show the result.',
    commonMistakes: [
      'Assuming the computer will "know what I meant".',
      'Skipping steps in logic.',
      'Not realizing that code runs from top to bottom.'
    ],
    practice: 'Write down the steps to calculate 5 + 10 + 20 as if you were a computer.',
    challenge: 'If a computer runs 1 billion instructions per second, how many can it run in a minute?',
    quiz: [
      {
        question: 'In what order does a computer usually read your code?',
        options: [
          'Bottom to top',
          'Randomly',
          'Top to bottom',
          'It reads the whole file at once'
        ],
        correctIndex: 2,
        explanation: 'Code is generally executed sequentially, from the first line to the last.'
      }
    ],
    recap: 'Computers are fast but literal. They follow your recipe exactly as you wrote it.'
  },
  'what-are-websites': {
    id: 'what-are-websites',
    title: 'What are Websites?',
    todayYouAreLearning: 'The three pillars of the web: HTML, CSS, and JavaScript.',
    whyItMatters: 'To build for the web, you need to know how the pieces fit together.',
    explanation: 'A website is just a collection of files stored on a computer (server) that your browser (client) downloads and displays. HTML provides the structure, CSS provides the style, and JavaScript provides the interactivity.',
    analogy: 'Think of a house. HTML is the wooden frame and walls. CSS is the paint and furniture. JavaScript is the electricity and plumbing that makes things work.',
    codeExample: '<!-- HTML -->\n<h1>Hello</h1>\n\n/* CSS */\nh1 { color: blue; }\n\n// JS\ndocument.querySelector("h1").innerText = "Hi!";',
    lineByLine: 'The HTML creates a heading. The CSS makes it blue. The JS changes the text from "Hello" to "Hi!".',
    commonMistakes: [
      'Mixing up HTML and CSS.',
      'Thinking a website is a single magic file.',
      'Forgetting that the browser is what actually "renders" the site.'
    ],
    practice: 'Right-click on any website and select "Inspect" to see the HTML code behind it.',
    challenge: 'Can you find the <title> tag of this page using the inspector?',
    quiz: [
      {
        question: 'Which technology is responsible for the "skeleton" or structure of a website?',
        options: ['JavaScript', 'CSS', 'HTML', 'PHP'],
        correctIndex: 2,
        explanation: 'HTML (HyperText Markup Language) defines the structure and content of a web page.'
      }
    ],
    recap: 'Websites are built with HTML (Structure), CSS (Style), and JS (Action).'
  },
  'html-basics': {
    id: 'html-basics',
    title: 'HTML Structure',
    todayYouAreLearning: 'How to organize a web page using the standard HTML boilerplate.',
    whyItMatters: 'Every single website on the internet starts with this exact structure.',
    explanation: 'HTML uses "tags" to wrap content. Most tags have an opening tag <html> and a closing tag </html>. A standard page has a <head> for info about the page and a <body> for the content you see.',
    analogy: 'Think of an HTML document like a physical letter. The envelope has the address and stamps (the <head>), and the paper inside has the actual message (the <body>).',
    codeExample: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Welcome!</h1>\n  </body>\n</html>',
    lineByLine: 'The DOCTYPE tells the browser this is an HTML5 document. The <html> tag wraps everything. The <head> contains meta info. The <body> contains the visible content.',
    commonMistakes: [
      'Forgetting to close a tag.',
      'Putting visible content in the <head>.',
      'Not nesting tags correctly.'
    ],
    practice: 'Try to write the basic HTML structure from memory on a piece of paper.',
    challenge: 'Add a <p> tag inside the <body> of the example code.',
    quiz: [
      {
        question: 'Where does the content that users actually see go?',
        options: ['Inside the <head>', 'Inside the <body>', 'Inside the <title>', 'Outside the <html>'],
        correctIndex: 1,
        explanation: 'The <body> tag contains all the visible content of a web page, like text, images, and buttons.'
      }
    ],
    recap: 'HTML is a hierarchy of tags. Keep them nested and closed!'
  },
  'html-tags': {
    id: 'html-tags',
    title: 'HTML Tags',
    todayYouAreLearning: 'The most common tags used to create headings, paragraphs, links, and images.',
    whyItMatters: 'Tags are the vocabulary of the web. The more you know, the more you can build.',
    explanation: 'We use <h1> through <h6> for headings, <p> for paragraphs, <a> for links, and <img> for images. Some tags, like <img>, are "self-closing" and don\'t need a separate closing tag.',
    analogy: 'Tags are like labels in a grocery store. One label says "Fruit", another says "Price", and another says "Weight". They tell the browser what each piece of content is.',
    codeExample: '<h1>My Title</h1>\n<p>This is a paragraph.</p>\n<a href="https://google.com">Click me</a>\n<img src="logo.png" alt="My Logo">',
    lineByLine: 'h1 is a big heading. p is normal text. a creates a link using "href". img shows an image using "src".',
    commonMistakes: [
      'Using <h1> for everything.',
      'Forgetting the "alt" attribute on images.',
      'Not putting quotes around attribute values.'
    ],
    practice: 'Create a list of 5 tags you learned today and what they do.',
    challenge: 'Can you create a link that opens in a new tab? (Hint: search for target="_blank")',
    quiz: [
      {
        question: 'Which tag is used for the most important heading on a page?',
        options: ['<head>', '<h6>', '<h1>', '<p>'],
        correctIndex: 2,
        explanation: '<h1> is the top-level heading. You should usually only have one per page.'
      }
    ],
    recap: 'Tags give meaning to your content. Use the right tag for the right job.'
  },
  'css-styling': {
    id: 'css-styling',
    title: 'CSS Styling',
    todayYouAreLearning: 'How to use CSS to change colors, fonts, and sizes on your web page.',
    whyItMatters: 'Without CSS, the web would be a boring list of black text on white backgrounds.',
    explanation: 'CSS works by "selecting" an HTML element and then applying "properties" to it. For example, you can select all <p> tags and make their text color red.',
    analogy: 'If HTML is the plain white t-shirt, CSS is the dye, the logo, and the custom fit that makes it look cool.',
    codeExample: 'p {\n  color: blue;\n  font-size: 20px;\n  font-family: Arial;\n}',
    lineByLine: 'The "p" is the selector. The curly braces {} hold the styles. "color" is the property, and "blue" is the value.',
    commonMistakes: [
      'Forgetting the semicolon ; at the end of a line.',
      'Using the wrong selector.',
      'Not linking the CSS file to the HTML file.'
    ],
    practice: 'Try to write a CSS rule that makes an <h1> tag green and centered.',
    challenge: 'How would you change the background color of the entire page?',
    quiz: [
      {
        question: 'What does CSS stand for?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Symbols', 'Colorful Style Sheets'],
        correctIndex: 1,
        explanation: 'CSS stands for Cascading Style Sheets, referring to how styles "cascade" down from parents to children.'
      }
    ],
    recap: 'Select an element, then give it properties. Don\'t forget your semicolons!'
  },
  'js-basics': {
    id: 'js-basics',
    title: 'JavaScript Basics',
    todayYouAreLearning: 'How to add logic and interactivity to your websites using JavaScript.',
    whyItMatters: 'JavaScript is what makes websites "smart". It handles clicks, forms, and animations.',
    explanation: 'JavaScript is a programming language that runs in the browser. You can use it to store data in "variables", perform math, and change the HTML/CSS on the fly.',
    analogy: 'If HTML is the body and CSS is the clothes, JavaScript is the brain that tells the body to move when someone says "Hello".',
    codeExample: 'let name = "Alex";\nfunction sayHi() {\n  alert("Hello " + name);\n}\nsayHi();',
    lineByLine: 'We create a variable "name". We define a "function" called sayHi. Then we "call" the function to make it run.',
    commonMistakes: [
      'Confusing Java and JavaScript (they are totally different!).',
      'Forgetting that JS is case-sensitive (Name vs name).',
      'Not using console.log() to debug your code.'
    ],
    practice: 'Create a variable for your age and add 5 to it in JavaScript.',
    challenge: 'Can you write a function that takes two numbers and adds them together?',
    quiz: [
      {
        question: 'Which keyword is commonly used to declare a variable in modern JavaScript?',
        options: ['var', 'let', 'make', 'create'],
        correctIndex: 1,
        explanation: 'While "var" was used in the past, "let" and "const" are the modern standards for declaring variables.'
      }
    ],
    recap: 'JavaScript adds the "action". It uses variables, functions, and events to make things happen.'
  },
  'react-intro': {
    id: 'react-intro',
    title: 'React Intro',
    todayYouAreLearning: 'The basics of React, a powerful library for building user interfaces.',
    whyItMatters: 'React is used by millions of developers to build fast, modern, and scalable web applications like Facebook, Instagram, and Netflix.',
    explanation: 'React is a JavaScript library that helps you build "Components"—reusable pieces of UI. Instead of writing one giant HTML file, you build small pieces (like a Button, a Navbar, or a Card) and put them together.',
    analogy: 'React is like building with LEGO bricks. Each brick is a component. You can use the same brick in different places, and if you change the brick, it updates everywhere.',
    codeExample: 'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\n// Usage\n<Welcome />',
    lineByLine: 'Line 1: We define a function called Welcome. This is a "Functional Component".\nLine 2: The component "returns" some HTML-like code called JSX.\nLine 5: We use the component like a custom HTML tag.',
    commonMistakes: [
      'Forgetting that component names must start with a Capital Letter.',
      'Thinking React is a full framework (it\'s a library).',
      'Not using "className" instead of "class".'
    ],
    practice: 'Create a simple component called "User" that shows a name.',
    challenge: 'Can you pass a name to the component using "props"?',
    quiz: [
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
      }
    ],
    recap: 'React is about components. Build small, reusable pieces and combine them to make complex apps.'
  },
  'git-basics': {
    id: 'git-basics',
    title: 'Git / GitHub',
    todayYouAreLearning: 'How to track changes in your code and collaborate with others using Git.',
    whyItMatters: 'Git is the industry standard for version control. It allows you to "go back in time" if you make a mistake and work with teams without overwriting each other\'s work.',
    explanation: 'Git is a tool that tracks every change you make to your files. GitHub is a website where you can store those tracked files (repositories) and share them with the world.',
    analogy: 'Git is like the "Save" button in a video game, but better. You can create "Save Points" (commits) and even "Alternate Timelines" (branches).',
    codeExample: 'git init\ngit add .\ngit commit -m "My first commit"\ngit push origin main',
    lineByLine: 'Line 1: Start tracking this folder with Git.\nLine 2: Prepare all files to be saved.\nLine 3: Create a "Save Point" with a message describing the changes.\nLine 4: Send your save point to GitHub.',
    commonMistakes: [
      'Forgetting to commit before pushing.',
      'Writing vague commit messages like "fixed stuff".',
      'Committing sensitive info like passwords.'
    ],
    practice: 'Initialize a git repository in a test folder.',
    challenge: 'Can you create a new branch and switch to it?',
    quiz: [
      {
        question: 'What is a "commit" in Git?',
        options: [
          'A way to delete code',
          'A snapshot of your code at a specific point in time',
          'A type of programming language',
          'A connection to the internet'
        ],
        correctIndex: 1,
        explanation: 'A commit saves the current state of your project with a descriptive message.'
      }
    ],
    recap: 'Git tracks changes. GitHub stores them. Together, they make collaboration possible.'
  },
  'node-intro': {
    id: 'node-intro',
    title: 'Node.js Intro',
    todayYouAreLearning: 'How to run JavaScript on your computer (server-side) instead of just in the browser.',
    whyItMatters: 'Node.js allows you to build full-stack applications using only one language: JavaScript.',
    explanation: 'Node.js is a "runtime" that lets JavaScript run outside the browser. It\'s used to build servers, tools, and even desktop apps.',
    analogy: 'If JavaScript is a fish, the Browser is the ocean. Node.js is like a high-tech aquarium that lets the fish live and thrive on land.',
    codeExample: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.end("Hello from the Server!");\n});\n\nserver.listen(3000);',
    lineByLine: 'Line 1: We import the "http" module to handle web requests.\nLine 3-5: We create a server that says "Hello" to anyone who visits.\nLine 7: We tell the server to start listening on port 3000.',
    commonMistakes: [
      'Thinking Node.js is a new language (it\'s just JS).',
      'Trying to use browser-only things like "window" or "document" in Node.',
      'Forgetting to install packages with npm.'
    ],
    practice: 'Install Node.js and run a simple "Hello World" script.',
    challenge: 'Can you read a file from your computer using the "fs" module?',
    quiz: [
      {
        question: 'What is Node.js?',
        options: [
          'A JavaScript framework',
          'A JavaScript runtime environment',
          'A type of database',
          'A styling library'
        ],
        correctIndex: 1,
        explanation: 'Node.js is a runtime that allows JavaScript to be executed outside of a web browser.'
      }
    ],
    recap: 'Node.js brings JavaScript to the server. It\'s fast, scalable, and uses the language you already know.'
  },
  'apis-rest': {
    id: 'apis-rest',
    title: 'APIs & REST',
    todayYouAreLearning: 'How different software systems talk to each other using APIs.',
    whyItMatters: 'APIs are the glue of the internet. They allow your app to get weather data, process payments, or log in with Google.',
    explanation: 'API stands for Application Programming Interface. REST is a set of rules for how these interfaces should work. Usually, you send a "Request" to a URL and get a "Response" (usually in JSON format).',
    analogy: 'An API is like a waiter in a restaurant. You (the client) give an order (the request) to the waiter (the API), who takes it to the kitchen (the server) and brings back your food (the response).',
    codeExample: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
    lineByLine: 'Line 1: We "fetch" data from a URL.\nLine 2: We convert the raw response into a JSON object.\nLine 3: We show the data in the console.',
    commonMistakes: [
      'Forgetting that APIs can fail (always use .catch!).',
      'Not understanding the difference between GET and POST.',
      'Using an API without an API key when one is required.'
    ],
    practice: 'Find a free public API (like the Pokemon API) and fetch some data.',
    challenge: 'Can you send data to an API using a POST request?',
    quiz: [
      {
        question: 'What does API stand for?',
        options: [
          'Application Programming Interface',
          'Advanced Program Integration',
          'Automated Protocol Interaction',
          'Access Point Information'
        ],
        correctIndex: 0,
        explanation: 'APIs allow different applications to communicate with each other.'
      }
    ],
    recap: 'APIs are for communication. REST is the standard way we do it on the web.'
  },
  'db-fundamentals': {
    id: 'db-fundamentals',
    title: 'Database Fundamentals',
    todayYouAreLearning: 'How to store and manage data permanently in a database.',
    whyItMatters: 'Without a database, all your app\'s data (users, posts, settings) would disappear every time you refreshed the page.',
    explanation: 'A database is a system for storing and organizing data. There are two main types: SQL (Relational, like a spreadsheet) and NoSQL (Document-based, like a collection of JSON files).',
    analogy: 'A database is like a giant digital filing cabinet. You can add new files, find existing ones, update them, or throw them away.',
    codeExample: '// NoSQL (Firebase/MongoDB) Style\nconst user = {\n  id: "123",\n  name: "Alex",\n  email: "alex@example.com"\n};\n\n// SQL Style\n// SELECT * FROM users WHERE id = "123";',
    lineByLine: 'The NoSQL example shows data stored as an object. The SQL example shows a "Query" used to find that data in a table.',
    commonMistakes: [
      'Not planning your data structure before building.',
      'Storing sensitive info like passwords in plain text.',
      'Forgetting to add "indexes" for fast searching.'
    ],
    practice: 'Draw a diagram of how you would store "Posts" and "Comments" in a database.',
    challenge: 'What is the difference between a Primary Key and a Foreign Key?',
    quiz: [
      {
        question: 'Why do we use databases?',
        options: [
          'To make the website faster',
          'To store data permanently',
          'To style the UI',
          'To connect to the internet'
        ],
        correctIndex: 1,
        explanation: 'Databases provide persistent storage for application data.'
      }
    ],
    recap: 'Databases are for storage. Choose the right type for your data and keep it organized.'
  },
  'sql-basics': {
    id: 'sql-basics',
    title: 'SQL Basics',
    todayYouAreLearning: 'The language used to talk to relational databases.',
    whyItMatters: 'SQL is one of the most valuable skills in tech. It\'s used by developers, data analysts, and even managers to get insights from data.',
    explanation: 'SQL stands for Structured Query Language. It uses commands like SELECT, INSERT, UPDATE, and DELETE to manage data in tables.',
    analogy: 'SQL is like asking a librarian for a specific book. "Please SELECT the book WHERE the title IS \'Coding 101\' FROM the \'Technology\' section."',
    codeExample: 'SELECT name, email \nFROM users \nWHERE level > 10 \nORDER BY name ASC;',
    lineByLine: 'Line 1: We want the "name" and "email" columns.\nLine 2: We are looking in the "users" table.\nLine 3: Only show users with a level higher than 10.\nLine 4: Sort the results by name alphabetically.',
    commonMistakes: [
      'Forgetting the semicolon at the end of a query.',
      'Confusing the order of clauses (SELECT must come first).',
      'Using "*" (select all) when you only need a few columns.'
    ],
    practice: 'Write a query to find all products that cost less than $50.',
    challenge: 'Can you join two tables together using a JOIN clause?',
    quiz: [
      {
        question: 'What does the SELECT command do in SQL?',
        options: [
          'Deletes data',
          'Updates data',
          'Retrieves data from a table',
          'Creates a new table'
        ],
        correctIndex: 2,
        explanation: 'SELECT is the most common SQL command, used to fetch data.'
      }
    ],
    recap: 'SQL is the language of data. Master the basic commands and you can talk to almost any database.'
  },
  'firebase-auth': {
    id: 'firebase-auth',
    title: 'Firebase Authentication',
    todayYouAreLearning: 'How to securely manage users in your application using Firebase.',
    whyItMatters: 'Security is paramount. You need a reliable way to know who your users are without building a complex security system from scratch.',
    explanation: 'Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.',
    analogy: 'Imagine a high-security building. Instead of building your own locks, cameras, and hiring guards, you hire a professional security firm (Firebase) to handle the entrance. They check IDs and let the right people in.',
    codeExample: `import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Logged in as:", result.user.displayName);
    });
};`,
    lineByLine: 'We import the necessary functions from the Firebase library. We initialize the auth service and a Google provider. The signInWithPopup function opens a window for the user to log in with Google. When successful, we get access to the user object.',
    commonMistakes: ['Storing API keys in public repositories', 'Not handling login errors', 'Forgetting to set up authorized domains in the Firebase console'],
    practice: 'Set up a Firebase project and enable Google Authentication in the console.',
    challenge: 'Try to implement a "Sign Out" button using the signOut(auth) function.',
    quiz: [
      {
        question: 'What is the main benefit of using Firebase Auth?',
        options: ['It makes the app faster', 'It provides secure, ready-to-use authentication', 'It stores images'],
        correctIndex: 1,
        explanation: 'Firebase Auth handles the complex security logic so you don\'t have to.'
      }
    ],
    recap: 'Firebase Auth is a powerful tool for managing users securely with minimal effort.'
  },
  'problem-solving': {
    id: 'problem-solving',
    title: 'Problem Solving for Engineers',
    todayYouAreLearning: 'The systematic approach to breaking down complex problems into solvable steps.',
    whyItMatters: 'Coding is 10% typing and 90% thinking. Being a great developer means being a great problem solver.',
    explanation: 'Problem solving in engineering involves understanding the requirements, breaking the problem into smaller sub-problems (decomposition), identifying patterns, and creating a step-by-step plan (algorithm) before writing any code.',
    analogy: 'Imagine you need to cook a 5-course meal. You don\'t just start throwing ingredients in a pan. You read the recipes, prep the ingredients, and decide the order of cooking. You break a big task into small, manageable steps.',
    codeExample: `// Problem: Find the largest number in a list
function findMax(numbers) {
  let max = numbers[0]; // Start with the first number
  for (let num of numbers) {
    if (num > max) {
      max = num; // Update max if we find a bigger one
    }
  }
  return max;
}`,
    lineByLine: 'We define a function that takes an array. we assume the first number is the biggest. We look at every number in the list. If a number is bigger than our current max, we update it. Finally, we return the result.',
    commonMistakes: ['Starting to code before understanding the problem', 'Trying to solve everything at once', 'Ignoring edge cases (like an empty list)'],
    practice: 'Write down the steps to make a cup of tea as if you were explaining it to a robot.',
    challenge: 'Write a plan to find the average of a list of numbers.',
    quiz: [
      {
        question: 'What is the first step in solving a coding problem?',
        options: ['Open the code editor', 'Understand the problem requirements', 'Ask a friend'],
        correctIndex: 1,
        explanation: 'You cannot solve a problem you don\'t fully understand.'
      }
    ],
    recap: 'Break it down, plan it out, then code it up.'
  },
  'algorithms-101': {
    id: 'algorithms-101',
    title: 'Algorithms 101',
    todayYouAreLearning: 'What algorithms are and why efficiency matters in software.',
    whyItMatters: 'As your data grows, slow code becomes a major problem. Algorithms help you solve problems in the most efficient way possible.',
    explanation: 'An algorithm is simply a set of instructions to complete a task. In computer science, we care about how fast an algorithm runs (Time Complexity) and how much memory it uses (Space Complexity).',
    analogy: 'Imagine looking for a name in a phonebook. You could start at page 1 and look at every name (Linear Search), or you could open it in the middle and keep halving the search area (Binary Search). One is much faster than the other!',
    codeExample: `// Linear Search Algorithm
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Found it!
  }
  return -1; // Not found
}`,
    lineByLine: 'The function takes an array and a target value. It loops through every item. If it finds the target, it returns the position. If the loop finishes without finding it, it returns -1.',
    commonMistakes: ['Using a slow algorithm for a large dataset', 'Not considering the "worst-case" scenario', 'Over-complicating a simple problem'],
    practice: 'Research "Big O Notation" and find out what O(n) means.',
    challenge: 'Can you write a plan for a "Binary Search" algorithm?',
    quiz: [
      {
        question: 'What is an algorithm?',
        options: ['A type of computer', 'A set of instructions to solve a problem', 'A programming language'],
        correctIndex: 1,
        explanation: 'Algorithms are the recipes of the computing world.'
      }
    ],
    recap: 'Algorithms are the heart of efficient software. Choose the right tool for the job.'
  },
  'data-structures': {
    id: 'data-structures',
    title: 'Data Structures',
    todayYouAreLearning: 'How to organize and store data so it can be accessed and modified efficiently.',
    whyItMatters: 'The way you store data determines how fast you can work with it. Choosing the right structure is half the battle in software engineering.',
    explanation: 'Data structures are specialized formats for organizing, processing, retrieving, and storing data. Common structures include Arrays, Linked Lists, Stacks, Queues, Hash Tables, and Trees.',
    analogy: 'Think of data structures like different types of storage in your house. You use a bookshelf for books (easy to browse), a drawer for socks (easy to throw in), and a filing cabinet for documents (easy to find by label). Each has a specific purpose.',
    codeExample: `// Stack Data Structure (LIFO - Last In, First Out)
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}`,
    lineByLine: 'We create a Stack class. It uses an array internally. push adds an item to the top. pop removes the top item. peek lets us look at the top item without removing it.',
    commonMistakes: ['Using an array when a hash map would be faster', 'Not understanding the trade-offs of different structures', 'Forgetting to handle empty structures'],
    practice: 'Implement a simple Queue (FIFO - First In, First Out) in JavaScript.',
    challenge: 'Research "Binary Search Trees" and explain how they work.',
    quiz: [
      {
        question: 'Which data structure follows the LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctIndex: 1,
        explanation: 'Stack stands for Last-In-First-Out, like a stack of plates.'
      }
    ],
    recap: 'Data structures are the containers for your information. Pick the one that fits your needs.'
  },
  'clean-code': {
    id: 'clean-code',
    title: 'Clean Code Principles',
    todayYouAreLearning: 'How to write code that is easy to read, understand, and maintain.',
    whyItMatters: 'Code is read much more often than it is written. Clean code saves time, reduces bugs, and makes you a better teammate.',
    explanation: 'Clean code is code that is focused, readable, and maintainable. It follows principles like meaningful naming, small functions, the Single Responsibility Principle, and avoiding "magic numbers".',
    analogy: 'Imagine reading a book with no punctuation, random capitalization, and characters with names like "x" and "y". It would be a nightmare! Clean code is like a well-written novel with clear chapters and descriptive names.',
    codeExample: `// Bad Code
function c(a, b) {
  return a * b;
}

// Clean Code
function calculateRectangleArea(width, height) {
  return width * height;
}`,
    lineByLine: 'In the bad example, the names "c", "a", and "b" tell us nothing. In the clean example, the names clearly describe what the function and its parameters represent.',
    commonMistakes: ['Using vague names like "data" or "info"', 'Writing massive functions that do 10 different things', 'Not writing comments for complex logic'],
    practice: 'Take a piece of code you wrote recently and rename the variables to be more descriptive.',
    challenge: 'Research the "DRY" (Don\'t Repeat Yourself) principle and find an example of it.',
    quiz: [
      {
        question: 'What is the primary goal of Clean Code?',
        options: ['To make code run faster', 'To make code readable and maintainable', 'To use fewer lines of code'],
        correctIndex: 1,
        explanation: 'Clean code is about human readability, not just machine execution.'
      }
    ],
    recap: 'Write code for humans first, machines second. Clean code is a professional standard.'
  }
};

