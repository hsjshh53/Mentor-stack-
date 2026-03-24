import { CareerPath } from '../types';

export interface CurriculumStep {
  id: string;
  title: string;
  category: string;
  description: string;
  stage: string;
}

export const CURRICULUM: Record<CareerPath, CurriculumStep[]> = {
  'Frontend Developer': [
    { id: 'what-is-coding', title: 'What is Coding?', category: 'Foundations', description: 'The absolute basics of programming.', stage: 'Beginner' },
    { id: 'how-computers-work', title: 'How Computers Follow Instructions', category: 'Foundations', description: 'Understanding logic and execution.', stage: 'Beginner' },
    { id: 'what-are-websites', title: 'What are Websites?', category: 'Foundations', description: 'How the web actually works.', stage: 'Beginner' },
    { id: 'html-basics', title: 'HTML Structure', category: 'Web Languages', description: 'The skeleton of every website.', stage: 'Beginner' },
    { id: 'html-tags', title: 'HTML Tags', category: 'Web Languages', description: 'The building blocks of content.', stage: 'Beginner' },
    { id: 'css-styling', title: 'CSS Styling', category: 'Web Languages', description: 'Making the web beautiful.', stage: 'Beginner' },
    { id: 'js-basics', title: 'JavaScript Basics', category: 'Web Languages', description: 'Adding interactivity to your pages.', stage: 'Beginner' },
    { id: 'react-intro', title: 'React Intro', category: 'Tools', description: 'Building modern UI components.', stage: 'Intermediate' },
    { id: 'git-basics', title: 'Git / GitHub', category: 'Tools', description: 'Version control and collaboration.', stage: 'Intermediate' },
  ],
  'Backend Developer': [
    { id: 'what-is-coding', title: 'What is Coding?', category: 'Foundations', description: 'The absolute basics of programming.', stage: 'Beginner' },
    { id: 'how-computers-work', title: 'How Computers Follow Instructions', category: 'Foundations', description: 'Understanding logic and execution.', stage: 'Beginner' },
    { id: 'node-intro', title: 'Node.js Intro', category: 'Web Languages', description: 'JavaScript on the server.', stage: 'Beginner' },
    { id: 'apis-rest', title: 'APIs & REST', category: 'Tools', description: 'How systems talk to each other.', stage: 'Intermediate' },
    { id: 'db-fundamentals', title: 'Database Fundamentals', category: 'Tools', description: 'Storing and managing data.', stage: 'Intermediate' },
    { id: 'sql-basics', title: 'SQL Basics', category: 'Data', description: 'Querying relational databases.', stage: 'Intermediate' },
    { id: 'firebase-auth', title: 'Firebase Auth', category: 'Tools', description: 'Securing your applications.', stage: 'Advanced' },
  ],
  'Full-Stack Developer': [
    { id: 'what-is-coding', title: 'What is Coding?', category: 'Foundations', description: 'The absolute basics of programming.', stage: 'Beginner' },
    { id: 'how-computers-work', title: 'How Computers Follow Instructions', category: 'Foundations', description: 'Understanding logic and execution.', stage: 'Beginner' },
    { id: 'what-are-websites', title: 'What are Websites?', category: 'Foundations', description: 'How the web actually works.', stage: 'Beginner' },
    { id: 'html-basics', title: 'HTML Structure', category: 'Web Languages', description: 'The skeleton of every website.', stage: 'Beginner' },
    { id: 'js-basics', title: 'JavaScript Basics', category: 'Web Languages', description: 'Adding interactivity to your pages.', stage: 'Beginner' },
    { id: 'node-intro', title: 'Node.js Intro', category: 'Web Languages', description: 'JavaScript on the server.', stage: 'Intermediate' },
    { id: 'react-intro', title: 'React Intro', category: 'Tools', description: 'Building modern UI components.', stage: 'Intermediate' },
    { id: 'db-fundamentals', title: 'Database Fundamentals', category: 'Tools', description: 'Storing and managing data.', stage: 'Advanced' },
  ],
  'Mobile App Developer': [
    { id: 'dart-basics', title: 'Dart Basics', category: 'Mobile', description: 'The language for Flutter.', stage: 'Beginner' },
    { id: 'flutter-ui', title: 'Flutter UI', category: 'Mobile', description: 'Building cross-platform interfaces.', stage: 'Beginner' },
    { id: 'mobile-apis', title: 'Mobile APIs', category: 'Tools', description: 'Connecting apps to the cloud.', stage: 'Intermediate' },
    { id: 'swift-intro', title: 'Swift Intro', category: 'Mobile', description: 'Native iOS development.', stage: 'Advanced' },
  ],
  'Software Engineer': [
    { id: 'problem-solving', title: 'Problem Solving', category: 'Core Skills', description: 'Thinking like an engineer.', stage: 'Beginner' },
    { id: 'algorithms-101', title: 'Algorithms 101', category: 'Core Skills', description: 'Efficient code patterns.', stage: 'Intermediate' },
    { id: 'data-structures', title: 'Data Structures', category: 'Core Skills', description: 'Organizing data effectively.', stage: 'Intermediate' },
    { id: 'clean-code', title: 'Clean Code', category: 'Core Skills', description: 'Writing maintainable software.', stage: 'Advanced' },
  ],
  'AI Engineer': [
    { id: 'python-basics', title: 'Python Basics', category: 'General', description: 'The language of AI.', stage: 'Beginner' },
    { id: 'math-for-ai', title: 'Math for AI', category: 'Specialized', description: 'Linear algebra and calculus.', stage: 'Intermediate' },
    { id: 'ml-intro', title: 'ML Intro', category: 'Specialized', description: 'Machine learning fundamentals.', stage: 'Intermediate' },
    { id: 'nlp-basics', title: 'NLP Basics', category: 'Specialized', description: 'Natural Language Processing.', stage: 'Advanced' },
  ],
  'Data Analyst': [
    { id: 'excel-advanced', title: 'Excel Advanced', category: 'Data', description: 'Data manipulation in spreadsheets.', stage: 'Beginner' },
    { id: 'sql-basics', title: 'SQL Basics', category: 'Data', description: 'Querying relational databases.', stage: 'Beginner' },
    { id: 'python-data', title: 'Python for Data', category: 'Data', description: 'Pandas and NumPy.', stage: 'Intermediate' },
    { id: 'viz-basics', title: 'Visualization Basics', category: 'Data', description: 'Telling stories with data.', stage: 'Intermediate' },
  ],
  'Cybersecurity Engineer': [
    { id: 'networking-basics', title: 'Networking Basics', category: 'Specialized', description: 'How the internet works.', stage: 'Beginner' },
    { id: 'linux-fundamentals', title: 'Linux Fundamentals', category: 'Specialized', description: 'The OS of security.', stage: 'Beginner' },
    { id: 'ethical-hacking', title: 'Ethical Hacking', category: 'Specialized', description: 'Finding vulnerabilities.', stage: 'Intermediate' },
    { id: 'cryptography', title: 'Cryptography', category: 'Specialized', description: 'Securing information.', stage: 'Advanced' },
  ],
  'DevOps Engineer': [
    { id: 'linux-fundamentals', title: 'Linux Fundamentals', category: 'Specialized', description: 'The OS of the cloud.', stage: 'Beginner' },
    { id: 'docker-basics', title: 'Docker Basics', category: 'Tools', description: 'Containerization.', stage: 'Intermediate' },
    { id: 'cicd-pipelines', title: 'CI/CD Pipelines', category: 'Tools', description: 'Automating deployments.', stage: 'Intermediate' },
    { id: 'cloud-infra', title: 'Cloud Infrastructure', category: 'Specialized', description: 'AWS and Terraform.', stage: 'Advanced' },
  ],
  'Cloud Engineer': [
    { id: 'cloud-concepts', title: 'Cloud Concepts', category: 'Specialized', description: 'IaaS, PaaS, and SaaS.', stage: 'Beginner' },
    { id: 'aws-basics', title: 'AWS Basics', category: 'Specialized', description: 'Amazon Web Services.', stage: 'Intermediate' },
    { id: 'serverless', title: 'Serverless', category: 'Specialized', description: 'Lambda and Cloud Functions.', stage: 'Advanced' },
  ],
  'Game Developer': [
    { id: 'csharp-basics', title: 'C# Basics', category: 'General', description: 'The language of Unity.', stage: 'Beginner' },
    { id: 'unity-intro', title: 'Unity Intro', category: 'Specialized', description: 'Building your first game.', stage: 'Beginner' },
    { id: 'game-physics', title: 'Game Physics', category: 'Specialized', description: 'Making things move.', stage: 'Intermediate' },
  ],
  'Data Scientist': [
    { id: 'python-data', title: 'Python for Data', category: 'Data', description: 'Pandas and NumPy.', stage: 'Beginner' },
    { id: 'statistics', title: 'Statistics', category: 'Data', description: 'Probability and inference.', stage: 'Intermediate' },
    { id: 'ml-advanced', title: 'ML Advanced', category: 'Specialized', description: 'Deep learning and neural nets.', stage: 'Advanced' },
  ],
  'Blockchain Developer': [
    { id: 'blockchain-basics', title: 'Blockchain Basics', category: 'Specialized', description: 'Distributed ledgers.', stage: 'Beginner' },
    { id: 'solidity-intro', title: 'Solidity Intro', category: 'Specialized', description: 'Smart contracts.', stage: 'Intermediate' },
    { id: 'web3-js', title: 'Web3.js', category: 'Specialized', description: 'Connecting to the blockchain.', stage: 'Advanced' },
  ],
  'UI/UX Designer': [
    { id: 'design-principles', title: 'Design Principles', category: 'Specialized', description: 'Color, typography, and layout.', stage: 'Beginner' },
    { id: 'figma-basics', title: 'Figma Basics', category: 'Tools', description: 'Prototyping interfaces.', stage: 'Beginner' },
    { id: 'user-research', title: 'User Research', category: 'Specialized', description: 'Understanding your users.', stage: 'Intermediate' },
  ],
  'QA Engineer': [
    { id: 'testing-basics', title: 'Testing Basics', category: 'Specialized', description: 'Manual vs Automated.', stage: 'Beginner' },
    { id: 'selenium-intro', title: 'Selenium Intro', category: 'Tools', description: 'Web automation.', stage: 'Intermediate' },
    { id: 'jest-basics', title: 'Jest Basics', category: 'Tools', description: 'Unit testing.', stage: 'Intermediate' },
  ],
  'API Developer': [
    { id: 'rest-architecture', title: 'REST Architecture', category: 'Specialized', description: 'Designing clean APIs.', stage: 'Beginner' },
    { id: 'graphql-basics', title: 'GraphQL Basics', category: 'Tools', description: 'Modern data fetching.', stage: 'Intermediate' },
    { id: 'api-security', title: 'API Security', category: 'Specialized', description: 'OAuth and JWT.', stage: 'Advanced' },
  ],
  'Systems Architect': [
    { id: 'microservices', title: 'Microservices', category: 'Advanced', description: 'Decoupled systems.', stage: 'Advanced' },
    { id: 'scalability-patterns', title: 'Scalability Patterns', category: 'Advanced', description: 'Handling millions of users.', stage: 'Advanced' },
    { id: 'distributed-systems', title: 'Distributed Systems', category: 'Advanced', description: 'CAP theorem and more.', stage: 'Advanced' },
  ],
};
