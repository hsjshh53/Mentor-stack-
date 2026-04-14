import { TechTool } from '../types';

export const TECH_TOOLS: TechTool[] = [
  // 1. Programming Languages
  { id: 'html', name: 'HTML', category: 'Programming Languages', description: 'HyperText Markup Language for structuring web content.' },
  { id: 'css', name: 'CSS', category: 'Programming Languages', description: 'Cascading Style Sheets for styling web pages.' },
  { id: 'javascript', name: 'JavaScript', category: 'Programming Languages', description: 'The language of the web for interactivity.' },
  { id: 'typescript', name: 'TypeScript', category: 'Programming Languages', description: 'Typed superset of JavaScript for better development.' },
  { id: 'python', name: 'Python', category: 'Programming Languages', description: 'Versatile language for AI, data, and backend.' },
  { id: 'java', name: 'Java', category: 'Programming Languages', description: 'Robust language for enterprise and Android.' },
  { id: 'cpp', name: 'C++', category: 'Programming Languages', description: 'High-performance language for systems and games.' },
  { id: 'csharp', name: 'C#', category: 'Programming Languages', description: 'Microsoft language for .NET and Unity.' },
  { id: 'ruby', name: 'Ruby', category: 'Programming Languages', description: 'Elegant language known for web development.' },
  { id: 'php', name: 'PHP', category: 'Programming Languages', description: 'Server-side language for web development.' },
  { id: 'swift', name: 'Swift', category: 'Programming Languages', description: 'Apple language for iOS and macOS.' },
  { id: 'kotlin', name: 'Kotlin', category: 'Programming Languages', description: 'Modern language for Android development.' },
  { id: 'go', name: 'Go', category: 'Programming Languages', description: 'Google language for scalable backend systems.' },
  { id: 'rust', name: 'Rust', category: 'Programming Languages', description: 'Systems language focused on safety and performance.' },
  { id: 'sql', name: 'SQL', category: 'Programming Languages', description: 'Standard language for relational databases.' },

  // 2. Frontend Tools & Frameworks
  { id: 'react', name: 'React', category: 'Frontend Tools & Frameworks', description: 'UI library for building component-based interfaces.' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend Tools & Frameworks', description: 'React framework for production with SSR.' },
  { id: 'vue', name: 'Vue', category: 'Frontend Tools & Frameworks', description: 'Progressive framework for building UIs.' },
  { id: 'angular', name: 'Angular', category: 'Frontend Tools & Frameworks', description: 'Platform for building mobile and web apps.' },
  { id: 'svelte', name: 'Svelte', category: 'Frontend Tools & Frameworks', description: 'Cybernetically enhanced web apps.' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend Tools & Frameworks', description: 'Utility-first CSS framework.' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend Tools & Frameworks', description: 'Popular CSS framework for responsive design.' },
  { id: 'sass', name: 'Sass', category: 'Frontend Tools & Frameworks', description: 'CSS extension language.' },
  { id: 'redux', name: 'Redux', category: 'Frontend Tools & Frameworks', description: 'State management for JavaScript apps.' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'Frontend Tools & Frameworks', description: 'Animation library for React.' },

  // 3. Backend Frameworks
  { id: 'nodejs', name: 'Node.js', category: 'Backend Frameworks', description: 'JavaScript runtime for server-side development.' },
  { id: 'express', name: 'Express', category: 'Backend Frameworks', description: 'Minimalist web framework for Node.js.' },
  { id: 'django', name: 'Django', category: 'Backend Frameworks', description: 'High-level Python web framework.' },
  { id: 'flask', name: 'Flask', category: 'Backend Frameworks', description: 'Micro web framework for Python.' },
  { id: 'springboot', name: 'Spring Boot', category: 'Backend Frameworks', description: 'Java-based framework for microservices.' },
  { id: 'laravel', name: 'Laravel', category: 'Backend Frameworks', description: 'PHP framework for web artisans.' },
  { id: 'dotnet', name: '.NET Core', category: 'Backend Frameworks', description: 'Cross-platform framework for building apps.' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend Frameworks', description: 'Modern Python framework for building APIs.' },

  // 4. Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', description: 'Advanced open-source relational database.' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', description: 'NoSQL document database.' },
  { id: 'mysql', name: 'MySQL', category: 'Databases', description: 'Popular open-source relational database.' },
  { id: 'redis', name: 'Redis', category: 'Databases', description: 'In-memory data structure store.' },
  { id: 'firestore', name: 'Firebase Firestore', category: 'Databases', description: 'Scalable NoSQL cloud database.' },
  { id: 'sqlite', name: 'SQLite', category: 'Databases', description: 'Self-contained SQL database engine.' },
  { id: 'cassandra', name: 'Cassandra', category: 'Databases', description: 'Distributed NoSQL database.' },

  // 5. Cloud & Hosting
  { id: 'aws', name: 'AWS', category: 'Cloud & Hosting', description: 'Amazon Web Services cloud platform.' },
  { id: 'azure', name: 'Azure', category: 'Cloud & Hosting', description: 'Microsoft cloud computing service.' },
  { id: 'gcp', name: 'Google Cloud', category: 'Cloud & Hosting', description: 'Google cloud computing services.' },
  { id: 'vercel', name: 'Vercel', category: 'Cloud & Hosting', description: 'Platform for frontend developers.' },
  { id: 'netlify', name: 'Netlify', category: 'Cloud & Hosting', description: 'Platform for modern web projects.' },
  { id: 'heroku', name: 'Heroku', category: 'Cloud & Hosting', description: 'Cloud platform as a service.' },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'Cloud & Hosting', description: 'Cloud infrastructure for developers.' },

  // 6. Authentication & Payments
  { id: 'firebase-auth', name: 'Firebase Auth', category: 'Authentication & Payments', description: 'Identity platform for apps.' },
  { id: 'auth0', name: 'Auth0', category: 'Authentication & Payments', description: 'Identity management platform.' },
  { id: 'jwt', name: 'JWT', category: 'Authentication & Payments', description: 'JSON Web Tokens for secure info exchange.' },
  { id: 'stripe', name: 'Stripe', category: 'Authentication & Payments', description: 'Payment processing for the internet.' },
  { id: 'paypal', name: 'PayPal', category: 'Authentication & Payments', description: 'Online payment system.' },

  // 7. Testing Tools
  { id: 'jest', name: 'Jest', category: 'Testing Tools', description: 'JavaScript testing framework.' },
  { id: 'cypress', name: 'Cypress', category: 'Testing Tools', description: 'End-to-end testing framework.' },
  { id: 'playwright', name: 'Playwright', category: 'Testing Tools', description: 'Browser automation and testing.' },
  { id: 'selenium', name: 'Selenium', category: 'Testing Tools', description: 'Web browser automation.' },
  { id: 'vitest', name: 'Vitest', category: 'Testing Tools', description: 'Vite-native unit test framework.' },

  // 8. Version Control
  { id: 'git', name: 'Git', category: 'Version Control', description: 'Distributed version control system.' },
  { id: 'github', name: 'GitHub', category: 'Version Control', description: 'Platform for hosting and collaborating on code.' },
  { id: 'gitlab', name: 'GitLab', category: 'Version Control', description: 'DevOps platform with Git repo management.' },
  { id: 'bitbucket', name: 'Bitbucket', category: 'Version Control', description: 'Git repository management solution.' },

  // 9. Development Tools
  { id: 'vscode', name: 'VS Code', category: 'Development Tools', description: 'Powerful code editor by Microsoft.' },
  { id: 'postman', name: 'Postman', category: 'Development Tools', description: 'API development platform.' },
  { id: 'docker-desktop', name: 'Docker Desktop', category: 'Development Tools', description: 'GUI for managing Docker containers.' },
  { id: 'terminal', name: 'Terminal', category: 'Development Tools', description: 'Command line interface.' },

  // 10. Package Managers
  { id: 'npm', name: 'npm', category: 'Package Managers', description: 'Package manager for Node.js.' },
  { id: 'yarn', name: 'yarn', category: 'Package Managers', description: 'Fast, reliable package manager.' },
  { id: 'pnpm', name: 'pnpm', category: 'Package Managers', description: 'Fast, disk space efficient package manager.' },
  { id: 'pip', name: 'pip', category: 'Package Managers', description: 'Package installer for Python.' },

  // 11. DevOps & Deployment
  { id: 'docker', name: 'Docker', category: 'DevOps & Deployment', description: 'Platform for containerizing applications.' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps & Deployment', description: 'Container orchestration system.' },
  { id: 'jenkins', name: 'Jenkins', category: 'DevOps & Deployment', description: 'Open source automation server.' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'DevOps & Deployment', description: 'CI/CD automation for GitHub.' },
  { id: 'terraform', name: 'Terraform', category: 'DevOps & Deployment', description: 'Infrastructure as code tool.' },
  { id: 'ansible', name: 'Ansible', category: 'DevOps & Deployment', description: 'IT automation platform.' },

  // 12. APIs & Real-Time
  { id: 'rest', name: 'REST', category: 'APIs & Real-Time', description: 'Representational State Transfer API style.' },
  { id: 'graphql', name: 'GraphQL', category: 'APIs & Real-Time', description: 'Query language for APIs.' },
  { id: 'websockets', name: 'WebSockets', category: 'APIs & Real-Time', description: 'Full-duplex communication protocol.' },
  { id: 'socketio', name: 'Socket.io', category: 'APIs & Real-Time', description: 'Real-time bidirectional event-based communication.' },
  { id: 'grpc', name: 'gRPC', category: 'APIs & Real-Time', description: 'High-performance RPC framework.' },

  // 13. UI/UX & Design Tools
  { id: 'figma', name: 'Figma', category: 'UI/UX & Design Tools', description: 'Collaborative interface design tool.' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'UI/UX & Design Tools', description: 'UI/UX design and prototyping tool.' },
  { id: 'sketch', name: 'Sketch', category: 'UI/UX & Design Tools', description: 'Digital design platform.' },

  // 14. Specialized Tech
  { id: 'tensorflow', name: 'TensorFlow', category: 'Specialized Tech', description: 'End-to-end machine learning platform.' },
  { id: 'pytorch', name: 'PyTorch', category: 'Specialized Tech', description: 'Open source machine learning framework.' },
  { id: 'opencv', name: 'OpenCV', category: 'Specialized Tech', description: 'Computer vision and ML library.' },
  { id: 'metasploit', name: 'Metasploit', category: 'Specialized Tech', description: 'Penetration testing framework.' },
  { id: 'wireshark', name: 'Wireshark', category: 'Specialized Tech', description: 'Network protocol analyzer.' },
  { id: 'unity', name: 'Unity', category: 'Specialized Tech', description: 'Cross-platform game engine.' },
  { id: 'unreal', name: 'Unreal Engine', category: 'Specialized Tech', description: 'Advanced real-time 3D creation tool.' },
  { id: 'solidity', name: 'Solidity', category: 'Specialized Tech', description: 'Smart contract programming language.' },
  { id: 'web3js', name: 'Web3.js', category: 'Specialized Tech', description: 'Ethereum JavaScript API.' },
  { id: 'ros', name: 'ROS', category: 'Specialized Tech', description: 'Robot Operating System.' },
];
