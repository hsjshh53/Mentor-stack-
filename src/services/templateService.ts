import { GeneratedLesson } from "../types";

/**
 * Static templates for common topics to guarantee content availability
 * when all AI providers are exhausted.
 */
const topicTemplates: Record<string, Partial<GeneratedLesson>> = {
  "html": {
    title: "Mastering Semantic HTML",
    todayYouAreLearning: "How to use HTML tags that convey meaning and improve accessibility.",
    whyItMatters: "Search engines and screen readers rely on semantic structure to understand your content.",
    explanation: "Semantic HTML is the use of HTML markup to reinforce the semantics, or meaning, of the information in webpages and web applications rather than merely to define its presentation or look. For example, using <header> instead of <div id='header'>. This allows browsers and other programs to interpret the content correctly. Elements like <article>, <section>, <nav>, and <aside> provide a structure that is logical and accessible. By using semantic HTML, you are creating a clean, organized, and understandable document that serves as a better foundation for CSS styling and JavaScript interaction. It is not just about aesthetics; it's about building a robust web architecture that is future-proof and user-friendly for everyone, including those using assistive technologies.",
    analogy: "Think of a professional book. A book has a clear title, distinct chapters, and a detailed table of contents. If you just had a random pile of pages with text on them, it would be much harder to navigate and understand. Semantic HTML is the architecture that turns a raw stream of 'text' into a structured 'document' that anyone can understand.",
    codeExample: `<!-- Semantic Structure -->\n<header>\n  <h1>My Website</h1>\n  <nav>\n    <ul>\n      <li><a href="/">Home</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>The Importance of SEO</h2>\n    <p>Details about SEO...</p>\n  </article>\n</main>`,
    lineByLine: "<header> defines the top section. <nav> contains navigation links. <main> is the primary content area. <article> is an independent piece of content.",
    practice: "Refactor a page that uses only <div> tags to use semantic elements like <header>, <nav>, and <main>.",
    challenge: "Build a multi-level navigation menu using semantic HTML and ensure it meets basic accessibility standards.",
    quiz: [
      {
        question: "Which tag is used for the main navigation section?",
        options: ["<nav>", "<section>", "<ul>", "<main>"],
        correctIndex: 0,
        explanation: "The <nav> tag specifies a section of navigation links."
      },
      {
        question: "Which element is most appropriate for a blog post on a page?",
        options: ["<section>", "<article>", "<div>", "<footer>"],
        correctIndex: 1,
        explanation: "<article> is designed for independent, self-contained content."
      },
      {
        question: "Does semantic HTML improve SEO?",
        options: ["Yes", "No", "Only if using meta tags", "Only on mobile"],
        correctIndex: 0,
        explanation: "Yes, search engines use semantic tags to weigh the importance of different content areas."
      }
    ],
    recap: "Semantic HTML adds meaning to your structure, improving both accessibility and SEO."
  },
  "javascript": {
    title: "Understanding JavaScript Variables and Scope",
    todayYouAreLearning: "How variables work in JavaScript and the difference between var, let, and const.",
    whyItMatters: "Modern JavaScript development requires precise data management to avoid bugs and ensure performance.",
    explanation: "JavaScript variables are containers for storing data values. 'let' and 'const' were introduced in ES6 to replace the older 'var' keyword, providing much better control over where variables are accessible. 'let' allows you to declare variables that are limited to the scope of a block, statement, or expression, which prevents many common bugs related to variable leakage. 'const' is even stricter, used for variables that will never be reassigned after their initial definition, ensuring data integrity throughout your application. In modern professional development, 'const' is the default choice, 'let' is used only when reassignment is strictly necessary, and 'var' is rarely seen in new codebases due to its less predictable behavior.",
    analogy: "Imagine organized storage boxes in a high-tech warehouse. 'var' is like a generic box that anyone can grab, move, and relabel at any time, leading to chaos. 'let' is a box assigned to a specific shelf and room; you can change what is inside, but it stays where it belongs. 'const' is a heavy-duty safe that is bolted to the floor; once you put something inside, it is locked and secure for the duration of the project.",
    codeExample: `let score = 10;\nconst playerName = "Alice";\n\nif (score > 5) {\n  let level = 2; // only exists inside this if-block\n  console.log(level);\n}\n\n// console.log(level); // This would cause an error`,
    lineByLine: "let score = 10 declares a mutable variable. const playerName = 'Alice' declares a constant. if (score > 5) opens a block scope. console.log(level) works inside the scope but fails outside.",
    practice: "Create three variables using let, const, and var and try to reassign them to see which ones throw errors.",
    challenge: "Write a function that uses a loop with 'let' and try to access the loop variable outside of the loop.",
    quiz: [
      {
        question: "Which keyword is used for a variable that cannot be reassigned?",
        options: ["let", "var", "const", "assign"],
        correctIndex: 2,
        explanation: "const creates a read-only reference to a value."
      },
      {
        question: "Where does 'let' have scope?",
        options: ["Block scope", "Global scope only", "Function scope only", "No scope"],
        correctIndex: 0,
        explanation: "let is block-scoped, meaning it exists only within the {} where it was defined."
      },
      {
        question: "Is 'var' recommended for modern JavaScript?",
        options: ["Yes", "No", "Only for numbers", "Only in loops"],
        correctIndex: 1,
        explanation: "No, let and const are preferred for better scope control and predictability."
      }
    ],
    recap: "Use 'const' by default and 'let' only when you know you will reassign the variable."
  },
  "react": {
    title: "Understanding React Components and Props",
    todayYouAreLearning: "How building blocks of React (Components) work and how to pass data between them using Props.",
    whyItMatters: "Components are the core of React architecture, and Props are the primary way to manage data flow.",
    explanation: "React components are the building blocks of a user interface. They are independent and reusable pieces that can be nested, managed, and handled comfortably. There are two types of components: functional and class-based, with functional components being the modern standard using Hooks. Props (short for properties) are used to pass data from a parent component to its child component. They are read-only and help make your components dynamic and flexible by allowing them to render different data based on what they receive. This pattern of 'uni-directional data flow' makes your application predictable and easier to debug as it scales.",
    analogy: "Think of React components as LEGO bricks. Each brick has a specific shape and color, and you can combine them to build complex structures. Props are like the color and size of the brick—you pass these properties when you grab the brick to use it. Just like a red 2x4 LEGO brick doesn't change its color or size after it's made, props are immutable within the component that receives them.",
    codeExample: `// Parent Component\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// Usage\nfunction App() {\n  return <Welcome name="Sara" />;\n}`,
    lineByLine: "function Welcome(props) defines a functional component. props.name accesses the passed data. <Welcome name='Sara' /> renders the component with specific data.",
    practice: "Create a 'UserProfile' component that takes 'username' and 'bio' as props and displays them.",
    challenge: "Build a 'Card' component that can wrap other elements using props.children and accepts a 'title' prop.",
    quiz: [
      {
        question: "What are React components?",
        options: ["Styles only", "Building blocks of UI", "Database tables", "Network protocols"],
        correctIndex: 1,
        explanation: "Components are the fundamental units used to build UIs in React."
      },
      {
        question: "Are Props mutable (changeable) inside the receiving component?",
        options: ["Yes", "No", "Only if strings", "Only if arrays"],
        correctIndex: 1,
        explanation: "Props are read-only (immutable) from the perspective of the component receiving them."
      },
      {
        question: "Which type of component is the modern standard?",
        options: ["Functional", "Class-based", "Global", "Stateless only"],
        correctIndex: 0,
        explanation: "Functional components with Hooks are the current best practice for React development."
      }
    ],
    recap: "Components organize your UI into reusable pieces, and props let them communicate by passing data down."
  }
};

/**
 * Generates a dynamic lesson from a template.
 */
export const generateFromTemplate = (topic: string, subTopic: string): Partial<GeneratedLesson> => {
  const normalizedTopic = (topic || "General").toLowerCase();
  const displayTopic = subTopic || topic || "Professional Development";
  
  // Try exact match first
  let template = topicTemplates[normalizedTopic];
  
  // Try fuzzy matching if no exact match
  if (!template) {
    const key = Object.keys(topicTemplates).find(k => normalizedTopic.includes(k) || k.includes(normalizedTopic));
    if (key) template = topicTemplates[key];
  }

  // Final fallback - High quality dynamic template
  if (!template) {
    return {
      title: `[OFFLINE MODE] Mastering ${displayTopic}`,
      todayYouAreLearning: `(Offline Mode Response) The core architectural principles and professional applications of ${displayTopic}.`,
      whyItMatters: `${displayTopic} is a critical component of modern professional workflows, enabling more efficient and scalable solutions.`,
      explanation: `${displayTopic} is a comprehensive area of study that involves understanding both theoretical models and practical implementations. Mastering ${displayTopic} requires a deep dive into the underlying mechanics, followed by consistent application in real-world scenarios. It focuses on optimization, maintainability, and adhering to industry-standard patterns. By understanding how ${displayTopic} fits into the larger ecosystem, developers can build more robust and future-proof systems that meet complex business requirements.`,
      analogy: `Think of ${displayTopic} as learning to navigate a complex city. Initially, you might only know a few main roads, but as you gain experience, you understand the side streets, the shortcuts, and how the entire transportation network integrates to move people efficiently.`,
      codeExample: `// Implementation pattern for ${displayTopic}\nclass ${displayTopic.replace(/[^a-zA-Z]/g, '')}Engine {\n  constructor(options = {}) {\n    this.options = options;\n  }\n\n  execute() {\n    console.log("Processing ${displayTopic} logic...");\n    // Main implementation logic goes here\n    return true;\n  }\n}`,
      lineByLine: `class ${displayTopic.replace(/[^a-zA-Z]/g, '')}Engine defines the core logical container. execute() is the primary method that handles the implementation. console.log provides real-time feedback.`,
      practice: `Create a simple project that incorporates ${displayTopic} and document the challenges you face during implementation.`,
      challenge: `Develop a comprehensive integration that demonstrates an advanced use-case of ${displayTopic} within a modular architecture.`,
      quiz: [
        {
          question: `What is a primary benefit of mastering ${displayTopic}?`,
          options: ["Increased complexity", "Reduced scalability", "Improved efficiency", "Higher costs"],
          correctIndex: 2,
          explanation: `Mastering ${displayTopic} leads to more efficient and reliable systems.`
        },
        {
          question: `Is ${displayTopic} considered an essential professional skill?`,
          options: ["Always", "Never", "Only for beginners", "Only in legacy systems"],
          correctIndex: 0,
          explanation: "In the modern tech landscape, these core skills are essential for high-level engineering."
        },
        {
          question: `What is the best way to internalize ${displayTopic}?`,
          options: ["Reading only", "Watching videos only", "Consistent practice", "Ignoring it"],
          correctIndex: 2,
          explanation: "Hands-on application is the only way to achieve deep mastery of technical concepts."
        }
      ],
      recap: `You have finalized your foundational training in ${displayTopic} and are ready to apply these skills in professional projects.`
    };
  }

  return template;
};
