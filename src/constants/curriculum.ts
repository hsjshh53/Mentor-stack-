import { CareerPath, PathCurriculum, Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'fe-projects-module',
    title: 'Personal Portfolio',
    path: 'Frontend Developer',
    description: 'Build a stunning portfolio to showcase your work and skills.',
    objective: 'Create a responsive React portfolio with multiple sections.',
    steps: [
      'Set up a new React project with Tailwind CSS',
      'Create a Hero section with a professional introduction',
      'Implement a Projects section with cards for your work',
      'Add a Skills section with visual progress bars',
      'Create a Contact form with validation',
      'Deploy your portfolio to Vercel or Netlify'
    ],
    output: 'A live URL to your personal portfolio website.',
    xpReward: 500
  },
  {
    id: 'be-projects-module',
    title: 'Task Manager API',
    path: 'Backend Developer',
    description: 'Create a robust REST API for managing tasks and user auth.',
    objective: 'Build a Node.js/Express API with Firebase integration.',
    steps: [
      'Initialize a Node.js project with Express',
      'Set up Firebase Admin SDK for database and auth',
      'Implement JWT-based authentication middleware',
      'Create CRUD endpoints for tasks',
      'Add data validation using Joi or Zod',
      'Document your API using Swagger or a README'
    ],
    output: 'A GitHub repository with a fully functional REST API.',
    xpReward: 600
  },
  {
    id: 'fs-projects-module',
    title: 'E-commerce App',
    path: 'Full-Stack Developer',
    description: 'A full-stack shopping experience with cart and checkout.',
    objective: 'Build a complete e-commerce platform with React and Node.js.',
    steps: [
      'Design the database schema for products and orders',
      'Build the frontend product catalog and cart',
      'Implement user authentication and profile management',
      'Create the backend order processing logic',
      'Integrate Stripe for secure payments',
      'Implement an admin dashboard for product management'
    ],
    output: 'A full-stack web application with payment integration.',
    xpReward: 1000
  }
];

export const CURRICULUM: Record<CareerPath, PathCurriculum> = {
  'Frontend Developer': {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Master the art of building beautiful, interactive user interfaces.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Layout',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    recommended: true,
    modules: [
      {
        id: 'fe-foundations',
        title: 'Foundations',
        description: 'The absolute basics of programming and the web.',
        lessons: ['what-is-coding', 'how-computers-work', 'how-websites-work', 'internet-basics', 'what-are-websites'],
        testId: 'foundations-test'
      },
      {
        id: 'fe-html',
        title: 'HTML',
        description: 'The skeleton of every website.',
        lessons: ['html-structure', 'tags-elements', 'links-images', 'html-forms', 'semantic-html'],
        testId: 'html-test'
      },
      {
        id: 'fe-css',
        title: 'CSS',
        description: 'Making the web beautiful.',
        lessons: ['css-basics', 'colors-typography', 'box-model', 'flexbox', 'css-grid', 'responsive-design'],
        testId: 'css-test'
      },
      {
        id: 'fe-js',
        title: 'JavaScript',
        description: 'The engine of the web.',
        lessons: ['js-intro', 'variables-data-types', 'functions-scope', 'arrays-objects', 'dom-manipulation', 'async-js'],
        testId: 'js-test'
      },
      {
        id: 'fe-react',
        title: 'React',
        description: 'Modern UI library basics.',
        lessons: ['react-basics', 'components-props', 'state-hooks', 'react-router', 'api-integration'],
        testId: 'react-test'
      },
      {
        id: 'fe-projects',
        title: 'Projects',
        description: 'Build real-world applications.',
        lessons: [],
        projectId: 'fe-projects-module'
      }
    ],
    finalExamId: 'frontend-final-exam'
  },
  'Backend Developer': {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Build powerful servers, APIs, and database systems.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Database',
    skills: ['Node.js', 'Express', 'Firebase', 'SQL'],
    recommended: true,
    modules: [
      {
        id: 'be-fundamentals',
        title: 'Backend Fundamentals',
        description: 'How servers work and the role of a backend developer.',
        lessons: ['what-is-backend', 'node-intro', 'npm-basics', 'fs-module', 'event-loop'],
        testId: 'be-fundamentals-test'
      },
      {
        id: 'be-nodejs',
        title: 'Node.js',
        description: 'JavaScript on the server.',
        lessons: ['node-deep-dive', 'streams-buffers', 'child-processes', 'error-handling-node'],
        testId: 'node-test'
      },
      {
        id: 'be-express',
        title: 'Express',
        description: 'Building web servers with Express.',
        lessons: ['express-intro', 'routing-middleware', 'controllers-logic', 'express-security'],
        testId: 'express-test'
      },
      {
        id: 'be-apis',
        title: 'APIs',
        description: 'Designing and building RESTful APIs.',
        lessons: ['rest-apis', 'api-design', 'testing-apis', 'api-documentation', 'rate-limiting'],
        testId: 'api-test'
      },
      {
        id: 'be-auth',
        title: 'Authentication',
        description: 'Securing your applications.',
        lessons: ['backend-security', 'jwt-auth', 'hashing-passwords', 'oauth-basics', 'session-management'],
        testId: 'auth-test'
      },
      {
        id: 'be-databases',
        title: 'Databases',
        description: 'Storing and managing data.',
        lessons: ['sql-basics', 'postgresql-intro', 'nosql-mongodb', 'mongoose-basics', 'database-design'],
        testId: 'database-test'
      },
      {
        id: 'be-deployment',
        title: 'Deployment',
        description: 'Going live with your server.',
        lessons: ['deployment-basics', 'cloud-hosting-be', 'ci-cd-be', 'monitoring-logs'],
        testId: 'deployment-test'
      },
      {
        id: 'be-projects',
        title: 'Projects',
        description: 'Build real-world backend systems.',
        lessons: [],
        projectId: 'be-projects-module'
      }
    ],
    finalExamId: 'backend-final-exam'
  },
  'Full-Stack Developer': {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'Master both frontend and backend to build complete applications.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Globe',
    skills: ['Frontend', 'Backend', 'DevOps'],
    recommended: true,
    modules: [
      {
        id: 'fs-overview',
        title: 'Fullstack Overview',
        description: 'The complete picture of modern web development.',
        lessons: ['fullstack-intro', 'architecture-patterns', 'tech-stack-selection'],
        testId: 'fs-overview-test'
      },
      {
        id: 'fs-integration',
        title: 'Frontend + Backend Integration',
        description: 'Connecting the two halves of your application.',
        lessons: ['api-integration-fs', 'data-fetching-strategies', 'handling-loading-states'],
        testId: 'fs-integration-test'
      },
      {
        id: 'fs-api',
        title: 'API Integration',
        description: 'Building and consuming APIs in a fullstack context.',
        lessons: ['rest-apis-fs', 'graphql-basics', 'api-versioning'],
        testId: 'fs-api-test'
      },
      {
        id: 'fs-auth',
        title: 'Authentication System',
        description: 'End-to-end security for your app.',
        lessons: ['fullstack-auth', 'role-based-access', 'secure-cookies-sessions'],
        testId: 'fs-auth-test'
      },
      {
        id: 'fs-db',
        title: 'Database Integration',
        description: 'Managing data across the stack.',
        lessons: ['db-modeling-fs', 'migrations-seeds', 'orm-odm-usage'],
        testId: 'fs-db-test'
      },
      {
        id: 'fs-realtime',
        title: 'Real-time Systems',
        description: 'Building live, interactive features.',
        lessons: ['websockets-intro', 'socketio-basics', 'realtime-notifications'],
        testId: 'fs-realtime-test'
      },
      {
        id: 'fs-deployment',
        title: 'Deployment',
        description: 'Deploying complex fullstack apps.',
        lessons: ['deployment-basics-fs', 'cloud-hosting-fs', 'ci-cd-fs'],
        testId: 'fs-deployment-test'
      },
      {
        id: 'fs-projects',
        title: 'Projects',
        description: 'Build complete fullstack applications.',
        lessons: [],
        projectId: 'fs-projects-module'
      }
    ],
    finalExamId: 'fullstack-final-exam'
  },
  'Mobile App Developer': {
    id: 'mobile',
    title: 'Mobile App Developer',
    description: 'Build native and cross-platform mobile applications.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Smartphone',
    skills: ['React Native', 'Swift', 'Kotlin'],
    recommended: true,
    modules: [
      {
        id: 'mobile-intro',
        title: 'Mobile Basics',
        description: 'Introduction to mobile development ecosystems.',
        lessons: ['mobile-ecosystem', 'ios-vs-android', 'cross-platform-intro'],
        testId: 'mobile-intro-test'
      },
      {
        id: 'mobile-react-native',
        title: 'React Native',
        description: 'Building apps with React Native.',
        lessons: ['rn-basics', 'rn-components', 'rn-navigation', 'rn-state'],
        testId: 'rn-test'
      },
      {
        id: 'mobile-native',
        title: 'Native Features',
        description: 'Accessing device hardware and features.',
        lessons: ['camera-location', 'push-notifications', 'local-storage-mobile'],
        testId: 'native-test'
      },
      {
        id: 'mobile-projects',
        title: 'Projects',
        description: 'Build real mobile apps.',
        lessons: [],
        projectId: 'mobile-projects-module'
      }
    ],
    finalExamId: 'mobile-final-exam'
  },
  'Data Analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Turn raw data into meaningful insights and stories.',
    category: 'Data & AI',
    status: 'active',
    icon: 'BarChart',
    skills: ['Python', 'SQL', 'Excel', 'Pandas'],
    recommended: true,
    modules: [
      {
        id: 'da-basics',
        title: 'Data Basics',
        description: 'The fundamentals of data analysis.',
        lessons: ['data-analyst-intro', 'data-types-structures', 'analytical-thinking'],
        testId: 'da-basics-test'
      },
      {
        id: 'da-excel',
        title: 'Excel',
        description: 'Mastering the analyst\'s primary tool.',
        lessons: ['excel-for-data', 'excel-formulas', 'pivot-tables', 'excel-vlookup-index'],
        testId: 'da-excel-test'
      },
      {
        id: 'da-cleaning',
        title: 'Data Cleaning',
        description: 'Preparing data for analysis.',
        lessons: ['data-cleaning-excel', 'data-quality-checks', 'handling-missing-data'],
        testId: 'da-cleaning-test'
      },
      {
        id: 'da-sql',
        title: 'SQL',
        description: 'Querying data from databases.',
        lessons: ['sql-for-data', 'select-where', 'joins-unions', 'aggregates', 'subqueries'],
        testId: 'da-sql-test'
      },
      {
        id: 'da-python',
        title: 'Python (Pandas)',
        description: 'Automating analysis with code.',
        lessons: ['python-for-data', 'pandas-basics', 'numpy-intro', 'data-cleaning-python'],
        testId: 'da-python-test'
      },
      {
        id: 'da-viz',
        title: 'Data Visualization',
        description: 'Communicating insights visually.',
        lessons: ['data-viz-intro', 'matplotlib-seaborn', 'tableau-basics', 'storytelling-data'],
        testId: 'da-viz-test'
      },
      {
        id: 'da-projects',
        title: 'Projects',
        description: 'Analyze real-world datasets.',
        lessons: [],
        projectId: 'da-projects-module'
      }
    ],
    finalExamId: 'data-final-exam'
  },
  'AI Engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Build intelligent systems using machine learning and neural networks.',
    category: 'Data & AI',
    status: 'active',
    icon: 'Cpu',
    skills: ['PyTorch', 'NLP', 'Computer Vision'],
    recommended: true,
    modules: [
      {
        id: 'ai-python',
        title: 'Python Basics',
        description: 'Mastering Python for AI development.',
        lessons: ['ai-python-intro', 'ai-python-data-structures', 'ai-python-libraries'],
        testId: 'ai-python-test'
      },
      {
        id: 'ai-math',
        title: 'Math for AI',
        description: 'The mathematical foundations of artificial intelligence.',
        lessons: ['ai-math-linear-algebra', 'ai-math-calculus', 'ai-math-statistics'],
        testId: 'ai-math-test'
      },
      {
        id: 'ai-data',
        title: 'Data Handling',
        description: 'Preparing and processing data for AI models.',
        lessons: ['ai-data-cleaning', 'ai-data-visualization', 'ai-feature-engineering'],
        testId: 'ai-data-test'
      },
      {
        id: 'ai-ml',
        title: 'Machine Learning',
        description: 'Core machine learning algorithms and techniques.',
        lessons: ['ai-ml-supervised', 'ai-ml-unsupervised', 'ai-ml-evaluation'],
        testId: 'ai-ml-test'
      },
      {
        id: 'ai-dl',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning architectures.',
        lessons: ['ai-dl-neural-networks', 'ai-dl-cnn', 'ai-dl-rnn'],
        testId: 'ai-dl-test'
      },
      {
        id: 'ai-models',
        title: 'AI Models',
        description: 'Advanced AI models and applications.',
        lessons: ['ai-models-nlp', 'ai-models-cv', 'ai-models-llms'],
        testId: 'ai-models-test'
      },
      {
        id: 'ai-projects',
        title: 'Projects',
        description: 'Build real-world AI applications.',
        lessons: [],
        projectId: 'ai-projects-module'
      }
    ],
    finalExamId: 'ai-final-exam'
  },
  'Machine Learning': {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Build and deploy predictive models.',
    category: 'Data & AI',
    status: 'partial',
    icon: 'Activity',
    skills: ['Scikit-Learn', 'TensorFlow', 'Math'],
    modules: [
      {
        id: 'ml-intro',
        title: 'ML Intro',
        description: 'Basics of machine learning.',
        lessons: ['ml-basics', 'supervised-learning'],
        testId: 'ml-intro-test'
      }
    ],
    finalExamId: 'ml-final-exam'
  },
  'Data Scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Solve complex problems with data science.',
    category: 'Data & AI',
    status: 'partial',
    icon: 'Database',
    skills: ['R', 'Statistics', 'Big Data'],
    modules: [
      {
        id: 'ds-intro',
        title: 'Data Science Intro',
        description: 'The data science lifecycle.',
        lessons: ['ds-basics', 'statistical-modeling'],
        testId: 'ds-intro-test'
      }
    ],
    finalExamId: 'ds-final-exam'
  },
  'Data Engineer': {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Build data pipelines and infrastructure.',
    category: 'Data & AI',
    status: 'locked',
    icon: 'Layers',
    skills: ['Spark', 'Hadoop', 'ETL'],
    modules: [],
    finalExamId: 'de-final-exam'
  },
  'Cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect systems and networks from digital attacks.',
    category: 'Security',
    status: 'active',
    icon: 'Shield',
    skills: ['Ethical Hacking', 'Network Security'],
    recommended: true,
    modules: [
      {
        id: 'cyber-fundamentals',
        title: 'Security Fundamentals',
        description: 'The core principles of information security.',
        lessons: ['cyber-intro', 'cyber-threats'],
        testId: 'cyber-fundamentals-test'
      },
      {
        id: 'cyber-networking',
        title: 'Networking',
        description: 'Understanding how data moves across networks.',
        lessons: ['cyber-networking-basics'],
        testId: 'cyber-networking-test'
      },
      {
        id: 'cyber-linux',
        title: 'Linux',
        description: 'Mastering the Linux operating system for security.',
        lessons: ['cyber-linux-fundamentals'],
        testId: 'cyber-linux-test'
      },
      {
        id: 'cyber-threats-module',
        title: 'Advanced Threats',
        description: 'Identifying common digital threats and attacks.',
        lessons: ['cyber-cryptography-basics', 'cyber-web-security'],
        testId: 'cyber-threats-test'
      },
      {
        id: 'cyber-hacking',
        title: 'Ethical Hacking',
        description: 'Learning the techniques used by ethical hackers.',
        lessons: ['cyber-ethical-hacking'],
        testId: 'cyber-hacking-test'
      },
      {
        id: 'cyber-tools',
        title: 'Tools',
        description: 'Essential tools for cybersecurity professionals.',
        lessons: ['cyber-identity-access', 'cyber-incident-response'],
        testId: 'cyber-tools-test'
      }
    ],
    finalExamId: 'cyber-final-exam'
  },
  'Ethical Hacking': {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    description: 'Offensive security techniques.',
    category: 'Security',
    status: 'partial',
    icon: 'Terminal',
    skills: ['PenTesting', 'Linux', 'Metasploit'],
    modules: [
      {
        id: 'eh-intro',
        title: 'Ethical Hacking Intro',
        description: 'The mindset of an ethical hacker.',
        lessons: ['eh-basics', 'reconnaissance'],
        testId: 'eh-intro-test'
      }
    ],
    finalExamId: 'eh-final-exam'
  },
  'Network Security': {
    id: 'network-security',
    title: 'Network Security',
    description: 'Securing network infrastructure.',
    category: 'Security',
    status: 'locked',
    icon: 'Globe',
    skills: ['Firewalls', 'VPNs', 'Protocols'],
    modules: [],
    finalExamId: 'ns-final-exam'
  },
  'Application Security': {
    id: 'app-security',
    title: 'Application Security',
    description: 'Securing software applications.',
    category: 'Security',
    status: 'locked',
    icon: 'Lock',
    skills: ['OWASP', 'Code Audit'],
    modules: [],
    finalExamId: 'as-final-exam'
  },
  'DevOps Engineer': {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Bridge the gap between development and operations.',
    category: 'Infrastructure & Systems',
    status: 'partial',
    icon: 'Server',
    skills: ['Docker', 'K8s', 'CI/CD', 'AWS'],
    modules: [
      {
        id: 'devops-basics',
        title: 'DevOps Basics',
        description: 'Introduction to DevOps culture and practices.',
        lessons: ['devops-intro'],
        testId: 'devops-basics-test'
      },
      {
        id: 'devops-linux',
        title: 'Linux',
        description: 'Linux for DevOps professionals.',
        lessons: ['devops-linux-basics'],
        testId: 'devops-linux-test'
      }
    ],
    finalExamId: 'devops-final-exam'
  },
  'Cloud Engineer': {
    id: 'cloud',
    title: 'Cloud Engineer',
    description: 'Design and manage scalable cloud infrastructure.',
    category: 'Infrastructure & Systems',
    status: 'partial',
    icon: 'Layers',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform'],
    modules: [
      {
        id: 'cloud-basics',
        title: 'Cloud Basics',
        description: 'Introduction to cloud computing.',
        lessons: ['cloud-intro'],
        testId: 'cloud-basics-test'
      },
      {
        id: 'cloud-aws-gcp',
        title: 'AWS/GCP',
        description: 'Major cloud providers overview.',
        lessons: ['cloud-aws-basics'],
        testId: 'cloud-aws-gcp-test'
      }
    ],
    finalExamId: 'cloud-final-exam'
  },
  'SRE': {
    id: 'sre',
    title: 'SRE',
    description: 'Site Reliability Engineering.',
    category: 'Infrastructure & Systems',
    status: 'locked',
    icon: 'Activity',
    skills: ['Reliability', 'Monitoring'],
    modules: [],
    finalExamId: 'sre-final-exam'
  },
  'System Admin': {
    id: 'sysadmin',
    title: 'System Admin',
    description: 'Manage systems and networks.',
    category: 'Infrastructure & Systems',
    status: 'locked',
    icon: 'Terminal',
    skills: ['Linux', 'Windows Server'],
    modules: [],
    finalExamId: 'sa-final-exam'
  },
  'Game Developer': {
    id: 'game-dev',
    title: 'Game Developer',
    description: 'Create immersive gaming experiences.',
    category: 'Specialized Development',
    status: 'locked',
    icon: 'Cpu',
    skills: ['Unity', 'C#', 'Physics', 'Graphics'],
    modules: [],
    finalExamId: 'game-final-exam'
  },
  'AR/VR': {
    id: 'ar-vr',
    title: 'AR/VR',
    description: 'Build spatial computing apps.',
    category: 'Specialized Development',
    status: 'locked',
    icon: 'Globe',
    skills: ['Unity', 'Unreal', '3D'],
    modules: [],
    finalExamId: 'arvr-final-exam'
  },
  'IoT': {
    id: 'iot',
    title: 'IoT',
    description: 'Connect devices to the internet.',
    category: 'Specialized Development',
    status: 'locked',
    icon: 'Cpu',
    skills: ['Arduino', 'C++', 'Sensors'],
    modules: [],
    finalExamId: 'iot-final-exam'
  },
  'Blockchain': {
    id: 'blockchain',
    title: 'Blockchain',
    description: 'Build decentralized apps.',
    category: 'Specialized Development',
    status: 'locked',
    icon: 'Lock',
    skills: ['Solidity', 'Web3.js'],
    modules: [],
    finalExamId: 'bc-final-exam'
  },
  'UI/UX': {
    id: 'ui-ux',
    title: 'UI/UX',
    description: 'Design user experiences.',
    category: 'Product & Design',
    status: 'partial',
    icon: 'Palette',
    skills: ['Figma', 'Prototyping'],
    modules: [
      {
        id: 'uiux-intro',
        title: 'UI/UX Intro',
        description: 'Principles of design.',
        lessons: ['uiux-basics', 'user-research'],
        testId: 'uiux-intro-test'
      }
    ],
    finalExamId: 'uiux-final-exam'
  },
  'Product Design': {
    id: 'product-design',
    title: 'Product Design',
    description: 'Shape digital products.',
    category: 'Product & Design',
    status: 'partial',
    icon: 'Layout',
    skills: ['Strategy', 'Research'],
    modules: [
      {
        id: 'pd-intro',
        title: 'Product Design Intro',
        description: 'Product thinking.',
        lessons: ['pd-basics', 'prototyping'],
        testId: 'pd-intro-test'
      }
    ],
    finalExamId: 'pd-final-exam'
  },
  'AI Automation': {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Automate with AI.',
    category: 'Emerging High-Income Skills',
    status: 'locked',
    icon: 'Sparkles',
    skills: ['Zapier', 'Make.com', 'Agents'],
    modules: [],
    finalExamId: 'aia-final-exam'
  },
  'Prompt Engineering': {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Master AI communication.',
    category: 'Emerging High-Income Skills',
    status: 'locked',
    icon: 'Terminal',
    skills: ['LLMs', 'Context', 'Few-Shot'],
    modules: [],
    finalExamId: 'pe-final-exam'
  },
  'Web3': {
    id: 'web3',
    title: 'Web3',
    description: 'The decentralized web.',
    category: 'Emerging High-Income Skills',
    status: 'locked',
    icon: 'Globe',
    skills: ['DeFi', 'NFTs', 'DAOs'],
    modules: [],
    finalExamId: 'web3-final-exam'
  },
  'Robotics': {
    id: 'robotics',
    title: 'Robotics',
    description: 'Program machines.',
    category: 'Emerging High-Income Skills',
    status: 'locked',
    icon: 'Cpu',
    skills: ['ROS', 'Control', 'AI'],
    modules: [],
    finalExamId: 'robotics-final-exam'
  }
};
