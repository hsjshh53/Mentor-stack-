import { CareerPath } from '../types';

export interface CurriculumStep {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const CURRICULUM: Record<CareerPath, CurriculumStep[]> = {
  'Frontend Developer': [
    { id: 'html-basics', title: 'HTML Structure', category: 'Web Languages', description: 'The skeleton of every website.' },
    { id: 'css-styling', title: 'CSS Styling', category: 'Web Languages', description: 'Making the web beautiful.' },
    { id: 'js-basics', title: 'JavaScript Basics', category: 'Web Languages', description: 'Adding interactivity to your pages.' },
    { id: 'react-intro', title: 'React Intro', category: 'Tools', description: 'Building modern UI components.' },
    { id: 'git-basics', title: 'Git / GitHub', category: 'Tools', description: 'Version control and collaboration.' },
  ],
  'Backend Developer': [
    { id: 'node-intro', title: 'Node.js Intro', category: 'Web Languages', description: 'JavaScript on the server.' },
    { id: 'apis-rest', title: 'APIs & REST', category: 'Tools', description: 'How systems talk to each other.' },
    { id: 'db-fundamentals', title: 'Database Fundamentals', category: 'Tools', description: 'Storing and managing data.' },
    { id: 'sql-basics', title: 'SQL Basics', category: 'Data', description: 'Querying relational databases.' },
    { id: 'firebase-auth', title: 'Firebase Auth', category: 'Tools', description: 'Securing your applications.' },
  ],
  'Full-Stack Developer': [
    { id: 'html-basics', title: 'HTML Structure', category: 'Web Languages', description: 'The skeleton of every website.' },
    { id: 'js-basics', title: 'JavaScript Basics', category: 'Web Languages', description: 'Adding interactivity to your pages.' },
    { id: 'node-intro', title: 'Node.js Intro', category: 'Web Languages', description: 'JavaScript on the server.' },
    { id: 'react-intro', title: 'React Intro', category: 'Tools', description: 'Building modern UI components.' },
    { id: 'db-fundamentals', title: 'Database Fundamentals', category: 'Tools', description: 'Storing and managing data.' },
  ],
  'Mobile App Developer': [
    { id: 'dart-basics', title: 'Dart Basics', category: 'Mobile', description: 'The language for Flutter.' },
    { id: 'flutter-ui', title: 'Flutter UI', category: 'Mobile', description: 'Building cross-platform interfaces.' },
    { id: 'mobile-apis', title: 'Mobile APIs', category: 'Tools', description: 'Connecting apps to the cloud.' },
    { id: 'swift-intro', title: 'Swift Intro', category: 'Mobile', description: 'Native iOS development.' },
  ],
  'Software Engineer': [
    { id: 'problem-solving', title: 'Problem Solving', category: 'Core Skills', description: 'Thinking like an engineer.' },
    { id: 'algorithms-101', title: 'Algorithms 101', category: 'Core Skills', description: 'Efficient code patterns.' },
    { id: 'data-structures', title: 'Data Structures', category: 'Core Skills', description: 'Organizing data effectively.' },
    { id: 'clean-code', title: 'Clean Code', category: 'Core Skills', description: 'Writing maintainable software.' },
  ],
  'AI Engineer': [
    { id: 'python-basics', title: 'Python Basics', category: 'General', description: 'The language of AI.' },
    { id: 'math-for-ai', title: 'Math for AI', category: 'Specialized', description: 'Linear algebra and calculus.' },
    { id: 'ml-intro', title: 'ML Intro', category: 'Specialized', description: 'Machine learning fundamentals.' },
    { id: 'nlp-basics', title: 'NLP Basics', category: 'Specialized', description: 'Natural Language Processing.' },
  ],
  'Data Analyst': [
    { id: 'excel-advanced', title: 'Excel Advanced', category: 'Data', description: 'Data manipulation in spreadsheets.' },
    { id: 'sql-basics', title: 'SQL Basics', category: 'Data', description: 'Querying relational databases.' },
    { id: 'python-data', title: 'Python for Data', category: 'Data', description: 'Pandas and NumPy.' },
    { id: 'viz-basics', title: 'Visualization Basics', category: 'Data', description: 'Telling stories with data.' },
  ],
  'Cybersecurity Engineer': [
    { id: 'networking-basics', title: 'Networking Basics', category: 'Specialized', description: 'How the internet works.' },
    { id: 'linux-fundamentals', title: 'Linux Fundamentals', category: 'Specialized', description: 'The OS of security.' },
    { id: 'ethical-hacking', title: 'Ethical Hacking', category: 'Specialized', description: 'Finding vulnerabilities.' },
    { id: 'cryptography', title: 'Cryptography', category: 'Specialized', description: 'Securing information.' },
  ],
  'DevOps Engineer': [
    { id: 'linux-fundamentals', title: 'Linux Fundamentals', category: 'Specialized', description: 'The OS of the cloud.' },
    { id: 'docker-basics', title: 'Docker Basics', category: 'Tools', description: 'Containerization.' },
    { id: 'cicd-pipelines', title: 'CI/CD Pipelines', category: 'Tools', description: 'Automating deployments.' },
    { id: 'cloud-infra', title: 'Cloud Infrastructure', category: 'Specialized', description: 'AWS and Terraform.' },
  ],
  'Cloud Engineer': [
    { id: 'cloud-concepts', title: 'Cloud Concepts', category: 'Specialized', description: 'IaaS, PaaS, and SaaS.' },
    { id: 'aws-basics', title: 'AWS Basics', category: 'Specialized', description: 'Amazon Web Services.' },
    { id: 'serverless', title: 'Serverless', category: 'Specialized', description: 'Lambda and Cloud Functions.' },
  ],
  'Game Developer': [
    { id: 'csharp-basics', title: 'C# Basics', category: 'General', description: 'The language of Unity.' },
    { id: 'unity-intro', title: 'Unity Intro', category: 'Specialized', description: 'Building your first game.' },
    { id: 'game-physics', title: 'Game Physics', category: 'Specialized', description: 'Making things move.' },
  ],
  'Data Scientist': [
    { id: 'python-data', title: 'Python for Data', category: 'Data', description: 'Pandas and NumPy.' },
    { id: 'statistics', title: 'Statistics', category: 'Data', description: 'Probability and inference.' },
    { id: 'ml-advanced', title: 'ML Advanced', category: 'Specialized', description: 'Deep learning and neural nets.' },
  ],
  'Blockchain Developer': [
    { id: 'blockchain-basics', title: 'Blockchain Basics', category: 'Specialized', description: 'Distributed ledgers.' },
    { id: 'solidity-intro', title: 'Solidity Intro', category: 'Specialized', description: 'Smart contracts.' },
    { id: 'web3-js', title: 'Web3.js', category: 'Specialized', description: 'Connecting to the blockchain.' },
  ],
  'UI/UX Designer': [
    { id: 'design-principles', title: 'Design Principles', category: 'Specialized', description: 'Color, typography, and layout.' },
    { id: 'figma-basics', title: 'Figma Basics', category: 'Tools', description: 'Prototyping interfaces.' },
    { id: 'user-research', title: 'User Research', category: 'Specialized', description: 'Understanding your users.' },
  ],
  'QA Engineer': [
    { id: 'testing-basics', title: 'Testing Basics', category: 'Specialized', description: 'Manual vs Automated.' },
    { id: 'selenium-intro', title: 'Selenium Intro', category: 'Tools', description: 'Web automation.' },
    { id: 'jest-basics', title: 'Jest Basics', category: 'Tools', description: 'Unit testing.' },
  ],
  'API Developer': [
    { id: 'rest-architecture', title: 'REST Architecture', category: 'Specialized', description: 'Designing clean APIs.' },
    { id: 'graphql-basics', title: 'GraphQL Basics', category: 'Tools', description: 'Modern data fetching.' },
    { id: 'api-security', title: 'API Security', category: 'Specialized', description: 'OAuth and JWT.' },
  ],
  'Systems Architect': [
    { id: 'microservices', title: 'Microservices', category: 'Advanced', description: 'Decoupled systems.' },
    { id: 'scalability-patterns', title: 'Scalability Patterns', category: 'Advanced', description: 'Handling millions of users.' },
    { id: 'distributed-systems', title: 'Distributed Systems', category: 'Advanced', description: 'CAP theorem and more.' },
  ],
};
