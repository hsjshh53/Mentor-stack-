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
  }
};
