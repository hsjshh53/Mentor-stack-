import { CareerPath, PathCurriculum, Project, PathLevel } from '../types';
import { TECH_TOOLS } from './techStack';

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
    id: 'fe-intermediate-project',
    title: 'E-commerce Dashboard',
    path: 'Frontend Developer',
    description: 'Build a complex dashboard for managing products and orders.',
    objective: 'Create a data-driven dashboard with charts and tables.',
    steps: [
      'Implement a sidebar for navigation',
      'Create a dashboard overview with Recharts',
      'Build a product table with search and filters',
      'Add a modal for adding/editing products',
      'Implement dark/light mode toggle'
    ],
    output: 'A functional e-commerce dashboard.',
    xpReward: 800
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
    id: 'be-intermediate-project',
    title: 'Real-time Chat Server',
    path: 'Backend Developer',
    description: 'Build a WebSocket server for real-time communication.',
    objective: 'Implement a chat server with rooms and presence.',
    steps: [
      'Set up a Socket.io server',
      'Implement room joining and leaving logic',
      'Broadcast messages to specific rooms',
      'Track active users in each room',
      'Store chat history in Redis or MongoDB'
    ],
    output: 'A real-time chat backend.',
    xpReward: 900
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
  },
  {
    id: 'fs-intermediate-project',
    title: 'SaaS Platform',
    path: 'Full-Stack Developer',
    description: 'Build a subscription-based platform with user roles.',
    objective: 'Create a multi-tenant SaaS application.',
    steps: [
      'Implement multi-tenancy at the database level',
      'Build a subscription management system with Stripe',
      'Create a role-based access control (RBAC) system',
      'Implement a feature-rich user dashboard',
      'Add automated email notifications'
    ],
    output: 'A complete SaaS platform.',
    xpReward: 1200
  },
  {
    id: 'mobile-projects-module',
    title: 'Social Media App',
    path: 'Mobile App Developer',
    description: 'Build a cross-platform social media app with React Native.',
    objective: 'Create a mobile app with feed, profiles, and real-time chat.',
    steps: [
      'Set up React Native with Expo or CLI',
      'Implement navigation with React Navigation',
      'Build a dynamic feed with image uploads',
      'Integrate Firebase for auth and real-time database',
      'Add push notifications for user engagement'
    ],
    output: 'A functional mobile app on iOS and Android.',
    xpReward: 1000
  },
  {
    id: 'da-projects-module',
    title: 'Sales Insights Report',
    path: 'Data Analyst',
    description: 'Analyze a large sales dataset to find trends and insights.',
    objective: 'Create a comprehensive data analysis report with visualizations.',
    steps: [
      'Clean and prepare the sales dataset using Pandas',
      'Perform exploratory data analysis (EDA)',
      'Create interactive dashboards in Tableau or Power BI',
      'Identify key sales drivers and seasonal trends',
      'Present findings in a clear, actionable report'
    ],
    output: 'A data analysis report and interactive dashboard.',
    xpReward: 800
  },
  {
    id: 'ai-projects-module',
    title: 'Image Recognition System',
    path: 'AI Engineer',
    description: 'Build a deep learning model to classify images.',
    objective: 'Create a CNN model with high accuracy on a custom dataset.',
    steps: [
      'Collect and label a dataset of images',
      'Preprocess images for training',
      'Build a CNN architecture using PyTorch or TensorFlow',
      'Train and evaluate the model',
      'Deploy the model as a web API'
    ],
    output: 'A trained AI model and API endpoint.',
    xpReward: 1200
  },
  {
    id: 'js-logic-project',
    title: 'Interactive Web Game',
    path: 'JavaScript Programming',
    description: 'Build a complex browser-based game using pure JavaScript.',
    objective: 'Master DOM manipulation, event handling, and game logic.',
    steps: [
      'Design the game mechanics and state management',
      'Implement the game loop and rendering',
      'Add collision detection and scoring',
      'Create a responsive UI for game controls',
      'Implement local storage for high scores'
    ],
    output: 'A playable web game.',
    xpReward: 700
  },
  {
    id: 'python-automation-project',
    title: 'Data Scraping & Analysis Tool',
    path: 'Python Programming',
    description: 'Build a tool that scrapes data from the web and performs analysis.',
    objective: 'Master Python libraries like BeautifulSoup and Pandas.',
    steps: [
      'Identify a target website for data extraction',
      'Implement a web scraper using BeautifulSoup or Scrapy',
      'Clean and structure the extracted data',
      'Perform statistical analysis using Pandas',
      'Generate a visual report using Matplotlib'
    ],
    output: 'A functional Python script and data report.',
    xpReward: 750
  }
];

export const CURRICULUM: Record<CareerPath, PathCurriculum> = {
  'Frontend Developer': {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Master the art of building beautiful, interactive user interfaces.',
    category: 'career-path',
    status: 'active',
    icon: 'Layout',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Beginner foundations',
        description: 'Learn the core building blocks of the web.',
        modules: [
          {
            id: 'fe-foundations',
            title: 'Foundations',
            description: 'The absolute basics of programming and the web.',
            lessons: ['how-computers-work', 'how-software-works', 'what-is-coding', 'what-is-the-internet', 'what-is-frontend-development'],
            testId: 'foundations-test'
          },
          {
            id: 'fe-html',
            title: 'HTML Mastery',
            description: 'The skeleton of every website.',
            lessons: ['introduction-to-html', 'basic-html-tags', 'building-your-first-webpage', 'accessibility-fundamentals-wcag-a11y', 'links-and-images', 'html-forms-basics'],
            testId: 'html-test'
          },
          {
            id: 'fe-css',
            title: 'CSS Styling',
            description: 'Making the web beautiful.',
            lessons: ['css-basics', 'colors-typography', 'box-model', 'flexbox', 'css-grid', 'responsive-design'],
            testId: 'css-test'
          }
        ],
        projects: [PROJECTS[0]]
      },
      intermediate: {
        id: 'intermediate',
        title: 'Intermediate Development',
        description: 'Master JavaScript and modern frameworks.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Systems',
        description: 'Build complex, production-ready applications.',
        modules: [
          {
            id: 'fe-projects',
            title: 'Projects',
            description: 'Build real-world applications.',
            lessons: [],
            projectId: 'fe-projects-module'
          }
        ],
        projects: []
      }
    },
    tools: ['html', 'css', 'javascript', 'typescript', 'react', 'nextjs', 'tailwind', 'sass', 'figma'],
    finalExamId: 'frontend-final-exam'
  },
  'Backend Developer': {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Build powerful servers, APIs, and database systems.',
    category: 'career-path',
    status: 'active',
    icon: 'Database',
    skills: ['Node.js', 'Express', 'Firebase', 'SQL'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Backend Foundations',
        description: 'Learn how servers and databases work.',
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
          }
        ],
        projects: [PROJECTS[1]]
      },
      intermediate: {
        id: 'intermediate',
        title: 'API Development',
        description: 'Build and secure RESTful APIs.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Backend',
        description: 'Scale and deploy complex systems.',
        modules: [
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
        projects: []
      }
    },
    tools: ['nodejs', 'express', 'postgresql', 'mongodb', 'mysql', 'redis', 'firebase-auth', 'jwt', 'docker', 'git', 'github'],
    finalExamId: 'backend-final-exam'
  },
  'Full-Stack Developer': {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'Master both frontend and backend to build complete applications.',
    category: 'career-path',
    status: 'active',
    icon: 'Globe',
    skills: ['Frontend', 'Backend', 'DevOps'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Fullstack Foundations',
        description: 'Understand the big picture of web development.',
        modules: [
          {
            id: 'fs-overview',
            title: 'Fullstack Overview',
            description: 'The complete picture of modern web development.',
            lessons: ['fullstack-intro', 'architecture-patterns', 'tech-stack-selection'],
            testId: 'fs-overview-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Stack Integration',
        description: 'Connect frontend and backend seamlessly.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Production Systems',
        description: 'Build and deploy real-time, scalable applications.',
        modules: [
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
        projects: [PROJECTS[2]]
      }
    },
    tools: ['react', 'nodejs', 'express', 'postgresql', 'mongodb', 'docker', 'github-actions', 'aws', 'graphql', 'websockets', 'stripe'],
    finalExamId: 'fullstack-final-exam'
  },
  'Mobile App Developer': {
    id: 'mobile',
    title: 'Mobile App Developer',
    description: 'Build native and cross-platform mobile applications.',
    category: 'career-path',
    status: 'active',
    icon: 'Smartphone',
    skills: ['React Native', 'Swift', 'Kotlin'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Mobile Foundations',
        description: 'Introduction to mobile development ecosystems.',
        modules: [
          {
            id: 'mobile-intro',
            title: 'Mobile Basics',
            description: 'Introduction to mobile development ecosystems.',
            lessons: ['mobile-ecosystem', 'ios-vs-android', 'cross-platform-intro'],
            testId: 'mobile-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Cross-Platform Mastery',
        description: 'Building apps with React Native.',
        modules: [
          {
            id: 'mobile-react-native',
            title: 'React Native',
            description: 'Building apps with React Native.',
            lessons: ['rn-basics', 'rn-components', 'rn-navigation', 'rn-state'],
            testId: 'rn-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Native & Hardware',
        description: 'Accessing device hardware and features.',
        modules: [
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
        projects: []
      }
    },
    tools: ['react-native', 'swift', 'kotlin', 'flutter', 'git', 'github', 'firebase-auth'],
    finalExamId: 'mobile-final-exam'
  },
  'Data Analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Turn raw data into meaningful insights and stories.',
    category: 'career-path',
    status: 'active',
    icon: 'BarChart',
    skills: ['Python', 'SQL', 'Excel', 'Pandas'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Data Foundations',
        description: 'The fundamentals of data analysis.',
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
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'SQL & Python Mastery',
        description: 'Querying and cleaning data with code.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Visualization & Storytelling',
        description: 'Communicating insights visually.',
        modules: [
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
        projects: []
      }
    },
    tools: ['python', 'sql', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'tableau', 'excel'],
    finalExamId: 'data-final-exam'
  },
  'AI Engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Build intelligent systems using machine learning and neural networks.',
    category: 'career-path',
    status: 'active',
    icon: 'Cpu',
    skills: ['PyTorch', 'NLP', 'Computer Vision'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'AI Foundations',
        description: 'Mastering Python and Math for AI.',
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
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Machine Learning Mastery',
        description: 'Core machine learning algorithms and techniques.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Deep Learning & Neural Networks',
        description: 'Advanced AI models and applications.',
        modules: [
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
        projects: []
      }
    },
    tools: ['python', 'tensorflow', 'pytorch', 'opencv', 'numpy', 'pandas', 'scikit-learn'],
    finalExamId: 'ai-final-exam'
  },
  'Machine Learning': {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Build and deploy predictive models.',
    category: 'career-path',
    status: 'active',
    icon: 'Activity',
    skills: ['Scikit-Learn', 'TensorFlow', 'Math'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'ML Foundations',
        description: 'Basics of machine learning.',
        modules: [
          {
            id: 'ml-intro',
            title: 'ML Intro',
            description: 'Basics of machine learning.',
            lessons: ['ml-basics', 'supervised-learning'],
            testId: 'ml-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Algorithm Mastery',
        description: 'Deep dive into ML algorithms.',
        modules: [
          {
            id: 'ml-algorithms',
            title: 'ML Algorithms',
            description: 'Deep dive into ML algorithms.',
            lessons: ['linear-regression', 'logistic-regression', 'decision-trees'],
            testId: 'ml-algo-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced ML',
        description: 'Neural networks and deployment.',
        modules: [
          {
            id: 'ml-advanced',
            title: 'Advanced Topics',
            description: 'Neural networks and deployment.',
            lessons: ['neural-networks-intro', 'model-deployment-ml'],
            testId: 'ml-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['python', 'scikit-learn', 'numpy', 'pandas', 'tensorflow'],
    finalExamId: 'ml-final-exam'
  },
  'Data Scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Solve complex problems with data science.',
    category: 'career-path',
    status: 'active',
    icon: 'Database',
    skills: ['R', 'Statistics', 'Big Data'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'DS Foundations',
        description: 'Introduction to data science.',
        modules: [
          {
            id: 'ds-intro',
            title: 'Data Science Intro',
            description: 'The data science lifecycle.',
            lessons: ['ds-basics', 'statistical-modeling'],
            testId: 'ds-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Advanced DS',
        description: 'Complex data science techniques.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'DS Mastery',
        description: 'Mastering data science.',
        modules: [],
        projects: []
      }
    },
    tools: ['r', 'python', 'sql'],
    finalExamId: 'ds-final-exam'
  },
  'Data Engineer': {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Build data pipelines and infrastructure.',
    category: 'career-path',
    status: 'active',
    icon: 'Layers',
    skills: ['Spark', 'Hadoop', 'ETL'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'DE Foundations',
        description: 'Introduction to data engineering.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Data Pipelines',
        description: 'Building data pipelines.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'DE Mastery',
        description: 'Mastering data engineering.',
        modules: [],
        projects: []
      }
    },
    tools: ['spark', 'hadoop', 'airflow'],
    finalExamId: 'de-final-exam'
  },
  'Cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect systems and networks from digital attacks.',
    category: 'career-path',
    status: 'active',
    icon: 'Shield',
    skills: ['Ethical Hacking', 'Network Security'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Security Foundations',
        description: 'The core principles of information security.',
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
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'System & Web Security',
        description: 'Securing OS and web applications.',
        modules: [
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
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Ethical Hacking Mastery',
        description: 'Offensive security and incident response.',
        modules: [
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
        projects: []
      }
    },
    tools: ['linux', 'wireshark', 'metasploit', 'nmap'],
    finalExamId: 'cyber-final-exam'
  },
  'Ethical Hacking': {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    description: 'Offensive security techniques.',
    category: 'career-path',
    status: 'active',
    icon: 'Terminal',
    skills: ['PenTesting', 'Linux', 'Metasploit'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'EH Foundations',
        description: 'Introduction to ethical hacking.',
        modules: [
          {
            id: 'eh-intro',
            title: 'Ethical Hacking Intro',
            description: 'The mindset of an ethical hacker.',
            lessons: ['eh-basics', 'reconnaissance'],
            testId: 'eh-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Penetration Testing',
        description: 'Advanced offensive techniques.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'EH Mastery',
        description: 'Mastering ethical hacking.',
        modules: [],
        projects: []
      }
    },
    tools: ['kali-linux', 'metasploit', 'nmap'],
    finalExamId: 'eh-final-exam'
  },
  'Network Security': {
    id: 'network-security',
    title: 'Network Security',
    description: 'Securing network infrastructure.',
    category: 'career-path',
    status: 'active',
    icon: 'Globe',
    skills: ['Firewalls', 'VPNs', 'Protocols'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'NS Foundations',
        description: 'Introduction to network security.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Network Defense',
        description: 'Defending networks.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'NS Mastery',
        description: 'Mastering network security.',
        modules: [],
        projects: []
      }
    },
    tools: ['wireshark', 'palo-alto', 'snort'],
    finalExamId: 'ns-final-exam'
  },
  'Application Security': {
    id: 'app-security',
    title: 'Application Security',
    description: 'Securing software applications.',
    category: 'career-path',
    status: 'active',
    icon: 'Lock',
    skills: ['OWASP', 'Code Audit'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'AS Foundations',
        description: 'Introduction to application security.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Secure Coding',
        description: 'Building secure software.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'AS Mastery',
        description: 'Mastering application security.',
        modules: [],
        projects: []
      }
    },
    tools: ['burp-suite', 'owasp-zap', 'snyk'],
    finalExamId: 'as-final-exam'
  },
  'DevOps Engineer': {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Bridge the gap between development and operations.',
    category: 'career-path',
    status: 'active',
    icon: 'Server',
    skills: ['Docker', 'K8s', 'CI/CD', 'AWS'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'DevOps Foundations',
        description: 'Introduction to DevOps culture and Linux.',
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
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Containerization & CI/CD',
        description: 'Mastering Docker and automation.',
        modules: [
          {
            id: 'devops-docker',
            title: 'Docker',
            description: 'Mastering containerization.',
            lessons: ['docker-basics', 'docker-compose', 'docker-images'],
            testId: 'devops-docker-test'
          },
          {
            id: 'devops-cicd',
            title: 'CI/CD',
            description: 'Automating software delivery.',
            lessons: ['github-actions-basics', 'jenkins-intro'],
            testId: 'devops-cicd-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Orchestration & Infrastructure',
        description: 'Kubernetes and Infrastructure as Code.',
        modules: [
          {
            id: 'devops-k8s',
            title: 'Kubernetes',
            description: 'Mastering container orchestration.',
            lessons: ['k8s-basics', 'k8s-pods-services', 'k8s-deployments'],
            testId: 'devops-k8s-test'
          }
        ],
        projects: []
      }
    },
    tools: ['docker', 'kubernetes', 'git', 'github-actions', 'linux', 'terraform'],
    finalExamId: 'devops-final-exam'
  },
  'Cloud Engineer': {
    id: 'cloud',
    title: 'Cloud Engineer',
    description: 'Design and manage scalable cloud infrastructure.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Layers',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Cloud Foundations',
        description: 'Introduction to cloud computing.',
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
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Platform Mastery',
        description: 'Deep dive into AWS and Azure.',
        modules: [
          {
            id: 'cloud-services',
            title: 'Cloud Services',
            description: 'Deep dive into AWS and Azure.',
            lessons: ['aws-ec2-s3-deep', 'azure-vm-storage'],
            testId: 'cloud-services-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Cloud Architecture',
        description: 'Designing scalable and secure systems.',
        modules: [
          {
            id: 'cloud-arch',
            title: 'Cloud Architecture',
            description: 'Designing scalable and secure systems.',
            lessons: ['serverless-arch-design', 'cloud-security-best-practices'],
            testId: 'cloud-arch-test'
          }
        ],
        projects: []
      }
    },
    tools: ['aws', 'azure', 'gcp', 'terraform', 'firebase-hosting'],
    finalExamId: 'cloud-final-exam'
  },
  'SRE': {
    id: 'sre',
    title: 'SRE',
    description: 'Site Reliability Engineering.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Activity',
    skills: ['Availability', 'Latency', 'Efficiency'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'SRE Foundations',
        description: 'Introduction to reliability engineering.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Monitoring & Alerting',
        description: 'Building reliable systems.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'SRE Mastery',
        description: 'Mastering site reliability.',
        modules: [],
        projects: []
      }
    },
    tools: ['prometheus', 'grafana', 'datadog'],
    finalExamId: 'sre-final-exam'
  },
  'System Admin': {
    id: 'sysadmin',
    title: 'System Admin',
    description: 'Manage systems and networks.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Terminal',
    skills: ['Linux', 'Windows Server'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'SysAdmin Foundations',
        description: 'Introduction to system administration.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Server Management',
        description: 'Managing servers and services.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Enterprise Admin',
        description: 'Mastering enterprise systems.',
        modules: [],
        projects: []
      }
    },
    tools: ['linux', 'bash', 'powershell'],
    finalExamId: 'sa-final-exam'
  },
  'Game Developer': {
    id: 'game-dev',
    title: 'Game Developer',
    description: 'Create immersive gaming experiences.',
    category: 'Specialized Development',
    status: 'active',
    icon: 'Cpu',
    skills: ['Unity', 'C#', 'Physics', 'Graphics'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Game Foundations',
        description: 'Introduction to game engines and C#.',
        modules: [
          {
            id: 'game-intro',
            title: 'Game Basics',
            description: 'Introduction to game engines and C#.',
            lessons: ['game-engines-overview', 'csharp-for-games'],
            testId: 'game-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Unity Mastery',
        description: 'Building 2D and 3D games with Unity.',
        modules: [
          {
            id: 'unity-basics',
            title: 'Unity Fundamentals',
            description: 'Building 2D and 3D games with Unity.',
            lessons: ['unity-interface', 'unity-physics', 'unity-scripting'],
            testId: 'unity-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Game Systems',
        description: 'AI, graphics, and multiplayer.',
        modules: [
          {
            id: 'game-advanced',
            title: 'Advanced Topics',
            description: 'AI, graphics, and multiplayer.',
            lessons: ['game-ai', 'shaders-graphics', 'multiplayer-basics'],
            testId: 'game-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['unity', 'csharp', 'unreal', 'figma'],
    finalExamId: 'game-final-exam'
  },
  'AR/VR': {
    id: 'ar-vr',
    title: 'AR/VR',
    description: 'Build immersive experiences.',
    category: 'Specialized Development',
    status: 'active',
    icon: 'Glasses',
    skills: ['Unity', 'C#', '3D Modeling'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Immersive Foundations',
        description: 'Introduction to AR/VR.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: '3D Interaction',
        description: 'Building interactive experiences.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Immersive',
        description: 'Mastering AR/VR development.',
        modules: [],
        projects: []
      }
    },
    tools: ['unity', 'unreal-engine', 'blender'],
    finalExamId: 'ar-vr-final-exam'
  },
  'IoT': {
    id: 'iot',
    title: 'IoT',
    description: 'Connect the physical world to the internet.',
    category: 'Specialized Development',
    status: 'active',
    icon: 'Cpu',
    skills: ['Arduino', 'Raspberry Pi', 'MQTT'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'IoT Foundations',
        description: 'Introduction to the Internet of Things.',
        modules: [],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Connected Devices',
        description: 'Building IoT networks.',
        modules: [],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'IoT Mastery',
        description: 'Mastering IoT systems.',
        modules: [],
        projects: []
      }
    },
    tools: ['arduino', 'raspberry-pi', 'mqtt'],
    finalExamId: 'iot-final-exam'
  },
  'Blockchain': {
    id: 'blockchain',
    title: 'Blockchain',
    description: 'Build decentralized apps.',
    category: 'Specialized Development',
    status: 'active',
    icon: 'Lock',
    skills: ['Solidity', 'Web3.js'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Blockchain Foundations',
        description: 'Introduction to decentralized technology.',
        modules: [
          {
            id: 'bc-intro',
            title: 'Blockchain Basics',
            description: 'Introduction to decentralized technology.',
            lessons: ['blockchain-intro-lesson', 'cryptography-basics', 'how-bitcoin-works'],
            testId: 'bc-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Ethereum & Solidity',
        description: 'Writing smart contracts.',
        modules: [
          {
            id: 'bc-solidity',
            title: 'Solidity Mastery',
            description: 'Writing smart contracts.',
            lessons: ['solidity-basics', 'smart-contract-patterns', 'security-best-practices'],
            testId: 'bc-solidity-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'DApp Development',
        description: 'Building full decentralized applications.',
        modules: [
          {
            id: 'bc-dapps',
            title: 'DApp Mastery',
            description: 'Building full decentralized applications.',
            lessons: ['web3js-ethersjs', 'ipfs-intro', 'defi-overview'],
            testId: 'bc-dapps-test'
          }
        ],
        projects: []
      }
    },
    tools: ['solidity', 'javascript', 'react', 'hardhat'],
    finalExamId: 'bc-final-exam'
  },
  'UI/UX': {
    id: 'ui-ux',
    title: 'UI/UX',
    description: 'Design user experiences.',
    category: 'Product & Design',
    status: 'active',
    icon: 'Palette',
    skills: ['Figma', 'Prototyping'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Design Foundations',
        description: 'Introduction to design principles.',
        modules: [
          {
            id: 'uiux-intro',
            title: 'UI/UX Intro',
            description: 'Principles of design.',
            lessons: ['uiux-basics', 'user-research'],
            testId: 'uiux-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'UX Research & Prototyping',
        description: 'Understanding users and building prototypes.',
        modules: [
          {
            id: 'ux-research-module',
            title: 'UX Research',
            description: 'Understanding users and building prototypes.',
            lessons: ['user-research-methods', 'personas-user-journeys'],
            testId: 'ux-research-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Design Systems',
        description: 'Building scalable design systems.',
        modules: [
          {
            id: 'design-systems-module',
            title: 'Design Systems',
            description: 'Building scalable design systems.',
            lessons: ['design-system-basics', 'component-libraries-design'],
            testId: 'ds-test'
          }
        ],
        projects: []
      }
    },
    tools: ['figma', 'adobe-xd', 'framer'],
    finalExamId: 'uiux-final-exam'
  },
  'Product Design': {
    id: 'product-design',
    title: 'Product Design',
    description: 'Shape digital products.',
    category: 'Product & Design',
    status: 'active',
    icon: 'Layout',
    skills: ['Strategy', 'Research'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Product Foundations',
        description: 'Introduction to product design.',
        modules: [
          {
            id: 'pd-intro',
            title: 'Product Design Intro',
            description: 'Product thinking.',
            lessons: ['pd-basics', 'prototyping'],
            testId: 'pd-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Product Strategy',
        description: 'Designing for business goals.',
        modules: [
          {
            id: 'pd-strategy',
            title: 'Product Strategy',
            description: 'Designing for business goals.',
            lessons: ['product-market-fit', 'user-retention-design'],
            testId: 'pd-strategy-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Product Design',
        description: 'Scaling products and design teams.',
        modules: [
          {
            id: 'pd-advanced',
            title: 'Advanced Topics',
            description: 'Scaling products and design teams.',
            lessons: ['design-ops', 'product-analytics-for-designers'],
            testId: 'pd-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['figma', 'notion', 'jira'],
    finalExamId: 'pd-final-exam'
  },
  'AI Automation': {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Automate with AI.',
    category: 'Emerging High-Income Skills',
    status: 'active',
    icon: 'Sparkles',
    skills: ['Zapier', 'Make.com', 'Agents'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Automation Foundations',
        description: 'Introduction to no-code automation.',
        modules: [
          {
            id: 'aia-intro',
            title: 'AI Automation Intro',
            description: 'Introduction to no-code automation.',
            lessons: ['automation-basics', 'ai-tools-overview'],
            testId: 'aia-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Workflow Mastery',
        description: 'Building complex automated workflows.',
        modules: [
          {
            id: 'aia-workflows',
            title: 'Workflow Automation',
            description: 'Building complex automated workflows.',
            lessons: ['zapier-advanced', 'make-com-basics'],
            testId: 'aia-wf-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'AI Agents & Systems',
        description: 'Building intelligent automated systems.',
        modules: [
          {
            id: 'aia-agents',
            title: 'AI Agents',
            description: 'Building intelligent automated systems.',
            lessons: ['agentic-workflows', 'custom-gpt-automation'],
            testId: 'aia-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['zapier', 'make', 'openai', 'python'],
    finalExamId: 'aia-final-exam'
  },
  'Prompt Engineering': {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Master AI communication.',
    category: 'Emerging High-Income Skills',
    status: 'active',
    icon: 'Terminal',
    skills: ['LLMs', 'Context', 'Few-Shot'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Prompt Foundations',
        description: 'Introduction to large language models.',
        modules: [
          {
            id: 'pe-intro',
            title: 'Prompting Basics',
            description: 'Introduction to large language models.',
            lessons: ['llm-basics', 'zero-shot-prompting', 'few-shot-prompting'],
            testId: 'pe-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Advanced Prompting',
        description: 'Complex prompting techniques.',
        modules: [
          {
            id: 'pe-advanced',
            title: 'Advanced Techniques',
            description: 'Complex prompting techniques.',
            lessons: ['chain-of-thought', 'iterative-prompting', 'prompt-chaining'],
            testId: 'pe-adv-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Prompt Optimization',
        description: 'Optimizing prompts for specific tasks.',
        modules: [
          {
            id: 'pe-optimization',
            title: 'Optimization',
            description: 'Optimizing prompts for specific tasks.',
            lessons: ['prompt-tuning', 'evaluation-metrics-for-prompts'],
            testId: 'pe-opt-test'
          }
        ],
        projects: []
      }
    },
    tools: ['openai', 'anthropic', 'google-gemini'],
    finalExamId: 'pe-final-exam'
  },
  'Web3': {
    id: 'web3',
    title: 'Web3',
    description: 'The decentralized web.',
    category: 'Emerging High-Income Skills',
    status: 'active',
    icon: 'Globe',
    skills: ['DeFi', 'NFTs', 'DAOs'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Web3 Foundations',
        description: 'Introduction to the decentralized web.',
        modules: [
          {
            id: 'web3-intro',
            title: 'Web3 Basics',
            description: 'Introduction to the decentralized web.',
            lessons: ['web3-vs-web2', 'wallets-basics', 'crypto-ecosystem'],
            testId: 'web3-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'DeFi & NFTs',
        description: 'Exploring decentralized finance and tokens.',
        modules: [
          {
            id: 'web3-defi',
            title: 'DeFi Mastery',
            description: 'Exploring decentralized finance and tokens.',
            lessons: ['defi-protocols', 'liquidity-pools', 'yield-farming'],
            testId: 'web3-defi-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'DAOs & Governance',
        description: 'Building decentralized organizations.',
        modules: [
          {
            id: 'web3-daos',
            title: 'DAO Mastery',
            description: 'Building decentralized organizations.',
            lessons: ['dao-structures', 'governance-tokens', 'voting-mechanisms'],
            testId: 'web3-daos-test'
          }
        ],
        projects: []
      }
    },
    tools: ['metamask', 'solidity', 'ethersjs'],
    finalExamId: 'web3-final-exam'
  },
  'Robotics': {
    id: 'robotics',
    title: 'Robotics',
    description: 'Program machines.',
    category: 'Emerging High-Income Skills',
    status: 'active',
    icon: 'Cpu',
    skills: ['ROS', 'Control', 'AI'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Robotics Foundations',
        description: 'Introduction to robotics and hardware.',
        modules: [
          {
            id: 'robotics-intro',
            title: 'Robotics Basics',
            description: 'Introduction to robotics and hardware.',
            lessons: ['robotics-overview', 'sensors-actuators-basics'],
            testId: 'robotics-intro-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'ROS & Control',
        description: 'Programming robots with ROS.',
        modules: [
          {
            id: 'robotics-ros',
            title: 'ROS Mastery',
            description: 'Programming robots with ROS.',
            lessons: ['ros-basics', 'ros-nodes-topics', 'ros-simulation'],
            testId: 'robotics-ros-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'AI in Robotics',
        description: 'Building intelligent robots.',
        modules: [
          {
            id: 'robotics-ai',
            title: 'Robotics AI',
            description: 'Building intelligent robots.',
            lessons: ['computer-vision-robotics', 'path-planning-algorithms'],
            testId: 'robotics-ai-test'
          }
        ],
        projects: []
      }
    },
    tools: ['ros', 'python', 'cpp', 'arduino'],
    finalExamId: 'robotics-final-exam'
  },
  'Software Engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Master the principles of software engineering.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Code',
    skills: ['Design Patterns', 'Algorithms', 'System Design'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Engineering Foundations',
        description: 'Introduction to software engineering principles.',
        modules: [
          {
            id: 'se-basics',
            title: 'SE Basics',
            description: 'Introduction to software engineering principles.',
            lessons: ['sdlc-overview', 'clean-code-principles'],
            testId: 'se-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Design & Architecture',
        description: 'Building robust and maintainable software.',
        modules: [
          {
            id: 'se-design',
            title: 'Design Patterns',
            description: 'Building robust and maintainable software.',
            lessons: ['solid-principles', 'common-design-patterns'],
            testId: 'se-design-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'System Design Mastery',
        description: 'Designing large-scale distributed systems.',
        modules: [
          {
            id: 'se-system-design',
            title: 'System Design',
            description: 'Designing large-scale distributed systems.',
            lessons: ['scalability-basics', 'microservices-arch'],
            testId: 'se-sd-test'
          }
        ],
        projects: []
      }
    },
    tools: ['git', 'docker', 'jira'],
    finalExamId: 'se-final-exam'
  },
  'Systems Architect': {
    id: 'systems-architect',
    title: 'Systems Architect',
    description: 'Design complex, high-performance systems.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'Layers',
    skills: ['Architecture', 'Scalability', 'Distributed Systems'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Architecture Foundations',
        description: 'Introduction to system architecture.',
        modules: [
          {
            id: 'sa-basics',
            title: 'Architecture Basics',
            description: 'Introduction to system architecture.',
            lessons: ['arch-patterns-overview', 'monolith-vs-microservices'],
            testId: 'sa-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Distributed Systems',
        description: 'Building systems that scale.',
        modules: [
          {
            id: 'sa-distributed',
            title: 'Distributed Systems',
            description: 'Building systems that scale.',
            lessons: ['cap-theorem', 'load-balancing', 'caching-strategies'],
            testId: 'sa-dist-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Enterprise Architecture',
        description: 'Designing for large organizations.',
        modules: [
          {
            id: 'sa-enterprise',
            title: 'Enterprise Design',
            description: 'Designing for large organizations.',
            lessons: ['enterprise-integration-patterns', 'cloud-native-arch'],
            testId: 'sa-ent-test'
          }
        ],
        projects: []
      }
    },
    tools: ['aws', 'kubernetes', 'terraform'],
    finalExamId: 'sa-final-exam'
  },
  'QA Engineer': {
    id: 'qa-engineer',
    title: 'QA Engineer',
    description: 'Ensure software quality through testing.',
    category: 'Core Software Development',
    status: 'active',
    icon: 'CheckCircle',
    skills: ['Manual Testing', 'Automation', 'Performance Testing'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Testing Foundations',
        description: 'Introduction to software testing.',
        modules: [
          {
            id: 'qa-basics',
            title: 'QA Basics',
            description: 'Introduction to software testing.',
            lessons: ['testing-types', 'test-case-design'],
            testId: 'qa-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Test Automation',
        description: 'Automating tests for efficiency.',
        modules: [
          {
            id: 'qa-automation',
            title: 'Automation Mastery',
            description: 'Automating tests for efficiency.',
            lessons: ['selenium-basics', 'cypress-intro', 'api-testing-automation'],
            testId: 'qa-auto-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Performance & Security Testing',
        description: 'Advanced testing techniques.',
        modules: [
          {
            id: 'qa-advanced',
            title: 'Advanced Testing',
            description: 'Advanced testing techniques.',
            lessons: ['load-testing-jmeter', 'security-testing-basics'],
            testId: 'qa-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['selenium', 'cypress', 'jmeter'],
    finalExamId: 'qa-final-exam'
  },
  'Database Administrator': {
    id: 'database-administrator',
    title: 'Database Administrator',
    description: 'Manage and optimize database systems.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Database',
    skills: ['SQL', 'NoSQL', 'Performance Tuning'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Database Foundations',
        description: 'Introduction to database management.',
        modules: [
          {
            id: 'dba-basics',
            title: 'DBA Basics',
            description: 'Introduction to database management.',
            lessons: ['sql-fundamentals', 'database-design-basics'],
            testId: 'dba-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Database Optimization',
        description: 'Optimizing database performance.',
        modules: [
          {
            id: 'dba-optimization',
            title: 'Optimization Mastery',
            description: 'Optimizing database performance.',
            lessons: ['indexing-strategies', 'query-optimization', 'backup-recovery'],
            testId: 'dba-opt-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced DB Management',
        description: 'High availability and security.',
        modules: [
          {
            id: 'dba-advanced',
            title: 'Advanced DBA',
            description: 'High availability and security.',
            lessons: ['replication-sharding', 'database-security-hardening'],
            testId: 'dba-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['postgresql', 'mongodb', 'mysql'],
    finalExamId: 'dba-final-exam'
  },
  'Network Engineer': {
    id: 'network-engineer',
    title: 'Network Engineer',
    description: 'Design and manage network infrastructure.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Network',
    skills: ['TCP/IP', 'Routing', 'Switching'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Networking Foundations',
        description: 'Introduction to computer networks.',
        modules: [
          {
            id: 'ne-basics',
            title: 'Networking Basics',
            description: 'Introduction to computer networks.',
            lessons: ['osi-model', 'tcp-ip-fundamentals'],
            testId: 'ne-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Routing & Switching',
        description: 'Configuring network devices.',
        modules: [
          {
            id: 'ne-routing',
            title: 'Routing Mastery',
            description: 'Configuring network devices.',
            lessons: ['vlan-configuration', 'routing-protocols-ospf-bgp'],
            testId: 'ne-routing-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Network Security & SDN',
        description: 'Advanced networking concepts.',
        modules: [
          {
            id: 'ne-advanced',
            title: 'Advanced Networking',
            description: 'Advanced networking concepts.',
            lessons: ['firewall-configuration', 'sdn-basics'],
            testId: 'ne-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['cisco', 'wireshark', 'palo-alto'],
    finalExamId: 'ne-final-exam'
  },
  'Embedded Systems': {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    description: 'Program hardware directly.',
    category: 'Infrastructure & Systems',
    status: 'active',
    icon: 'Cpu',
    skills: ['C/C++', 'Microcontrollers', 'RTOS'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Embedded Foundations',
        description: 'Introduction to embedded systems.',
        modules: [
          {
            id: 'es-basics',
            title: 'Embedded Basics',
            description: 'Introduction to embedded systems.',
            lessons: ['microcontroller-basics', 'c-for-embedded'],
            testId: 'es-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Peripherals & Interfaces',
        description: 'Interacting with hardware.',
        modules: [
          {
            id: 'es-peripherals',
            title: 'Peripheral Mastery',
            description: 'Interacting with hardware.',
            lessons: ['gpio-uart-i2c-spi', 'adc-dac-basics'],
            testId: 'es-peri-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'RTOS & Advanced Topics',
        description: 'Real-time operating systems.',
        modules: [
          {
            id: 'es-rtos',
            title: 'RTOS Mastery',
            description: 'Real-time operating systems.',
            lessons: ['freertos-basics', 'embedded-linux-intro'],
            testId: 'es-rtos-test'
          }
        ],
        projects: []
      }
    },
    tools: ['arduino', 'stm32', 'raspberry-pi'],
    finalExamId: 'es-final-exam'
  },
  'UX Designer': {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Focus on user experience and accessibility.',
    category: 'Product & Design',
    status: 'active',
    icon: 'Users',
    skills: ['User Research', 'Information Architecture', 'Accessibility'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'UX Foundations',
        description: 'Introduction to user experience design.',
        modules: [
          {
            id: 'ux-basics',
            title: 'UX Basics',
            description: 'Introduction to user experience design.',
            lessons: ['ux-principles', 'user-research-basics'],
            testId: 'ux-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'IA & Wireframing',
        description: 'Structuring information and layouts.',
        modules: [
          {
            id: 'ux-wireframing',
            title: 'Wireframing Mastery',
            description: 'Structuring information and layouts.',
            lessons: ['info-arch-basics', 'wireframing-tools-techniques'],
            testId: 'ux-wire-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Usability & Accessibility',
        description: 'Advanced UX topics.',
        modules: [
          {
            id: 'ux-advanced',
            title: 'Advanced UX',
            description: 'Advanced UX topics.',
            lessons: ['usability-testing-methods', 'wcag-accessibility-standards'],
            testId: 'ux-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['figma', 'adobe-xd', 'miro'],
    finalExamId: 'ux-final-exam'
  },
  'Product Manager': {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead product development from vision to launch.',
    category: 'Product & Design',
    status: 'active',
    icon: 'Briefcase',
    skills: ['Product Strategy', 'Roadmapping', 'Agile'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Product Foundations',
        description: 'Introduction to product management.',
        modules: [
          {
            id: 'pm-basics',
            title: 'PM Basics',
            description: 'Introduction to product management.',
            lessons: ['pm-role-overview', 'product-lifecycle-basics'],
            testId: 'pm-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Strategy & Roadmapping',
        description: 'Defining product direction.',
        modules: [
          {
            id: 'pm-strategy',
            title: 'Strategy Mastery',
            description: 'Defining product direction.',
            lessons: ['market-research-basics', 'creating-product-roadmaps'],
            testId: 'pm-strat-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Agile & Launch',
        description: 'Executing product launches.',
        modules: [
          {
            id: 'pm-agile',
            title: 'Agile Mastery',
            description: 'Executing product launches.',
            lessons: ['agile-scrum-kanban', 'go-to-market-strategy'],
            testId: 'pm-agile-test'
          }
        ],
        projects: []
      }
    },
    tools: ['jira', 'confluence', 'trello'],
    finalExamId: 'pm-final-exam'
  },
  'Project Manager': {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Manage project timelines and resources.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Calendar',
    skills: ['Project Planning', 'Risk Management', 'Stakeholder Management'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Project Foundations',
        description: 'Introduction to project management.',
        modules: [
          {
            id: 'pjm-basics',
            title: 'Project Basics',
            description: 'Introduction to project management.',
            lessons: ['pjm-fundamentals', 'project-charter-basics'],
            testId: 'pjm-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Planning & Execution',
        description: 'Managing project workflows.',
        modules: [
          {
            id: 'pjm-planning',
            title: 'Planning Mastery',
            description: 'Managing project workflows.',
            lessons: ['wbs-creation', 'resource-allocation-basics'],
            testId: 'pjm-plan-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Project Management',
        description: 'Complex project scenarios.',
        modules: [
          {
            id: 'pjm-advanced',
            title: 'Advanced PJM',
            description: 'Complex project scenarios.',
            lessons: ['risk-mitigation-strategies', 'advanced-stakeholder-mgmt'],
            testId: 'pjm-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['asana', 'monday', 'microsoft-project'],
    finalExamId: 'pjm-final-exam'
  },
  'Business Analyst': {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Bridge the gap between business and IT.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'TrendingUp',
    skills: ['Requirements Gathering', 'Process Modeling', 'Data Visualization'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Analysis Foundations',
        description: 'Introduction to business analysis.',
        modules: [
          {
            id: 'ba-basics',
            title: 'BA Basics',
            description: 'Introduction to business analysis.',
            lessons: ['ba-role-overview', 'requirements-elicitation-basics'],
            testId: 'ba-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Process & Modeling',
        description: 'Visualizing business processes.',
        modules: [
          {
            id: 'ba-modeling',
            title: 'Modeling Mastery',
            description: 'Visualizing business processes.',
            lessons: ['bpmn-basics', 'use-case-modeling'],
            testId: 'ba-model-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Analysis',
        description: 'Data-driven business decisions.',
        modules: [
          {
            id: 'ba-advanced',
            title: 'Advanced BA',
            description: 'Data-driven business decisions.',
            lessons: ['data-analysis-for-ba', 'business-case-development'],
            testId: 'ba-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['visio', 'lucidchart', 'excel'],
    finalExamId: 'ba-final-exam'
  },
  'Technical Writer': {
    id: 'technical-writer',
    title: 'Technical Writer',
    description: 'Create clear and concise technical documentation.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'FileText',
    skills: ['Technical Documentation', 'API Documentation', 'Editing'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Writing Foundations',
        description: 'Introduction to technical writing.',
        modules: [
          {
            id: 'tw-basics',
            title: 'TW Basics',
            description: 'Introduction to technical writing.',
            lessons: ['tw-principles', 'audience-analysis-basics'],
            testId: 'tw-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'API & Developer Docs',
        description: 'Documenting software and APIs.',
        modules: [
          {
            id: 'tw-api',
            title: 'API Documentation',
            description: 'Documenting software and APIs.',
            lessons: ['swagger-openapi-basics', 'writing-for-developers'],
            testId: 'tw-api-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Documentation Strategy',
        description: 'Managing large documentation projects.',
        modules: [
          {
            id: 'tw-advanced',
            title: 'Advanced TW',
            description: 'Managing large documentation projects.',
            lessons: ['docs-as-code-workflow', 'content-strategy-basics'],
            testId: 'tw-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['markdown', 'swagger', 'gitbook'],
    finalExamId: 'tw-final-exam'
  },
  'SEO Specialist': {
    id: 'seo-specialist',
    title: 'SEO Specialist',
    description: 'Optimize websites for search engines.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Search',
    skills: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'SEO Foundations',
        description: 'Introduction to search engine optimization.',
        modules: [
          {
            id: 'seo-basics',
            title: 'SEO Basics',
            description: 'Introduction to search engine optimization.',
            lessons: ['how-search-engines-work', 'keyword-research-basics'],
            testId: 'seo-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'On-Page & Technical SEO',
        description: 'Optimizing website content and structure.',
        modules: [
          {
            id: 'seo-technical',
            title: 'Technical SEO Mastery',
            description: 'Optimizing website content and structure.',
            lessons: ['meta-tags-optimization', 'site-speed-basics', 'mobile-seo'],
            testId: 'seo-tech-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced SEO Strategy',
        description: 'Complex SEO campaigns.',
        modules: [
          {
            id: 'seo-advanced',
            title: 'Advanced SEO',
            description: 'Complex SEO campaigns.',
            lessons: ['link-building-strategies', 'seo-analytics-reporting'],
            testId: 'seo-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['google-analytics', 'semrush', 'ahrefs'],
    finalExamId: 'seo-final-exam'
  },
  'Digital Marketer': {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    description: 'Drive growth through digital channels.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Target',
    skills: ['Social Media Marketing', 'Email Marketing', 'PPC'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Marketing Foundations',
        description: 'Introduction to digital marketing.',
        modules: [
          {
            id: 'dm-basics',
            title: 'DM Basics',
            description: 'Introduction to digital marketing.',
            lessons: ['marketing-funnel-basics', 'content-marketing-intro'],
            testId: 'dm-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Paid Media & Email',
        description: 'Managing marketing campaigns.',
        modules: [
          {
            id: 'dm-campaigns',
            title: 'Campaign Mastery',
            description: 'Managing marketing campaigns.',
            lessons: ['facebook-ads-basics', 'google-ads-intro', 'email-automation'],
            testId: 'dm-camp-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Marketing Analytics & Strategy',
        description: 'Data-driven marketing growth.',
        modules: [
          {
            id: 'dm-advanced',
            title: 'Advanced DM',
            description: 'Data-driven marketing growth.',
            lessons: ['conversion-rate-optimization', 'marketing-attribution-models'],
            testId: 'dm-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['hubspot', 'mailchimp', 'facebook-ads-manager'],
    finalExamId: 'dm-final-exam'
  },
  'Content Creator': {
    id: 'content-creator',
    title: 'Content Creator',
    description: 'Produce engaging digital content.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Video',
    skills: ['Video Editing', 'Graphic Design', 'Copywriting'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Content Foundations',
        description: 'Introduction to content creation.',
        modules: [
          {
            id: 'cc-basics',
            title: 'CC Basics',
            description: 'Introduction to content creation.',
            lessons: ['storytelling-basics', 'visual-composition-intro'],
            testId: 'cc-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Production Skills',
        description: 'Creating high-quality assets.',
        modules: [
          {
            id: 'cc-production',
            title: 'Production Mastery',
            description: 'Creating high-quality assets.',
            lessons: ['video-editing-basics', 'graphic-design-fundamentals'],
            testId: 'cc-prod-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Content Strategy & Growth',
        description: 'Building an audience.',
        modules: [
          {
            id: 'cc-advanced',
            title: 'Advanced CC',
            description: 'Building an audience.',
            lessons: ['audience-engagement-strategies', 'monetization-basics'],
            testId: 'cc-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['premiere-pro', 'canva', 'capcut'],
    finalExamId: 'cc-final-exam'
  },
  'HR Specialist': {
    id: 'hr-specialist',
    title: 'HR Specialist',
    description: 'Manage human resources and talent.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'UserPlus',
    skills: ['Recruitment', 'Employee Relations', 'HR Compliance'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'HR Foundations',
        description: 'Introduction to human resources.',
        modules: [
          {
            id: 'hr-basics',
            title: 'HR Basics',
            description: 'Introduction to human resources.',
            lessons: ['hr-role-overview', 'employment-law-basics'],
            testId: 'hr-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Recruitment & Onboarding',
        description: 'Finding and integrating talent.',
        modules: [
          {
            id: 'hr-recruitment',
            title: 'Recruitment Mastery',
            description: 'Finding and integrating talent.',
            lessons: ['sourcing-candidates', 'interviewing-techniques'],
            testId: 'hr-rec-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'HR Strategy & Culture',
        description: 'Building a great workplace.',
        modules: [
          {
            id: 'hr-advanced',
            title: 'Advanced HR',
            description: 'Building a great workplace.',
            lessons: ['performance-management-systems', 'organizational-culture-basics'],
            testId: 'hr-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['bamboo-hr', 'linkedin-recruiter', 'workday'],
    finalExamId: 'hr-final-exam'
  },
  'Sales Specialist': {
    id: 'sales-specialist',
    title: 'Sales Specialist',
    description: 'Drive revenue through effective sales.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'DollarSign',
    skills: ['Prospecting', 'Closing', 'CRM Management'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Sales Foundations',
        description: 'Introduction to professional sales.',
        modules: [
          {
            id: 'sales-basics',
            title: 'Sales Basics',
            description: 'Introduction to professional sales.',
            lessons: ['sales-process-overview', 'communication-skills-for-sales'],
            testId: 'sales-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Prospecting & Negotiation',
        description: 'Finding and winning deals.',
        modules: [
          {
            id: 'sales-prospecting',
            title: 'Prospecting Mastery',
            description: 'Finding and winning deals.',
            lessons: ['cold-outreach-techniques', 'negotiation-basics'],
            testId: 'sales-pros-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Sales Leadership & Strategy',
        description: 'Scaling sales performance.',
        modules: [
          {
            id: 'sales-advanced',
            title: 'Advanced Sales',
            description: 'Scaling sales performance.',
            lessons: ['sales-forecasting-basics', 'key-account-management'],
            testId: 'sales-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['salesforce', 'hubspot-crm', 'outreach'],
    finalExamId: 'sales-final-exam'
  },
  'Customer Support': {
    id: 'customer-support',
    title: 'Customer Support',
    description: 'Provide excellent service to users.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Headphones',
    skills: ['Communication', 'Problem Solving', 'Empathy'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Support Foundations',
        description: 'Introduction to customer support.',
        modules: [
          {
            id: 'cs-basics',
            title: 'Support Basics',
            description: 'Introduction to customer support.',
            lessons: ['support-principles', 'active-listening-basics'],
            testId: 'cs-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Technical Support & Tools',
        description: 'Solving complex user issues.',
        modules: [
          {
            id: 'cs-technical',
            title: 'Technical Support',
            description: 'Solving complex user issues.',
            lessons: ['troubleshooting-methodology', 'using-ticketing-systems'],
            testId: 'cs-tech-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Support Leadership & Metrics',
        description: 'Managing support teams.',
        modules: [
          {
            id: 'cs-advanced',
            title: 'Advanced CS',
            description: 'Managing support teams.',
            lessons: ['customer-satisfaction-metrics', 'conflict-resolution-advanced'],
            testId: 'cs-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['zendesk', 'intercom', 'freshdesk'],
    finalExamId: 'cs-final-exam'
  },
  'Virtual Assistant': {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    description: 'Provide administrative support remotely.',
    category: 'Business & Operations',
    status: 'active',
    icon: 'Monitor',
    skills: ['Administrative Support', 'Scheduling', 'Data Entry'],
    levels: {
      beginner: {
        id: 'beginner',
        title: 'VA Foundations',
        description: 'Introduction to virtual assistance.',
        modules: [
          {
            id: 'va-basics',
            title: 'VA Basics',
            description: 'Introduction to virtual assistance.',
            lessons: ['va-role-overview', 'time-management-basics'],
            testId: 'va-basics-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Admin & Communication',
        description: 'Managing tasks and clients.',
        modules: [
          {
            id: 'va-admin',
            title: 'Admin Mastery',
            description: 'Managing tasks and clients.',
            lessons: ['email-management-basics', 'calendar-scheduling-tools'],
            testId: 'va-admin-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Specialized VA Services',
        description: 'Advanced VA skills.',
        modules: [
          {
            id: 'va-advanced',
            title: 'Advanced VA',
            description: 'Advanced VA skills.',
            lessons: ['basic-bookkeeping-for-va', 'social-media-management-basics'],
            testId: 'va-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['google-workspace', 'slack', 'calendly'],
    finalExamId: 'va-final-exam'
  },
  'JavaScript Programming': {
    id: 'js-programming',
    title: 'JavaScript Programming',
    description: 'Master the language of the web from zero to professional.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Code',
    skills: ['ES6+', 'DOM', 'Async JS', 'Web APIs'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'JS Foundations',
        description: 'Learn the core syntax and logic of JavaScript.',
        modules: [
          {
            id: 'js-syntax',
            title: 'Syntax & Types',
            description: 'Variables, data types, and basic operators.',
            lessons: ['js-variables', 'js-data-types', 'js-operators', 'js-control-flow'],
            testId: 'js-syntax-test'
          },
          {
            id: 'js-functions',
            title: 'Functions & Scope',
            description: 'Writing reusable code and understanding scope.',
            lessons: ['js-function-basics', 'js-arrow-functions', 'js-scope-closures'],
            testId: 'js-functions-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'DOM & Events',
        description: 'Make websites interactive with JavaScript.',
        modules: [
          {
            id: 'js-dom',
            title: 'DOM Manipulation',
            description: 'Selecting and modifying HTML elements.',
            lessons: ['js-dom-selectors', 'js-modifying-elements', 'js-event-listeners'],
            testId: 'js-dom-test'
          },
          {
            id: 'js-async',
            title: 'Asynchronous JS',
            description: 'Promises, Async/Await, and Fetch API.',
            lessons: ['js-promises', 'js-async-await', 'js-fetch-api'],
            testId: 'js-async-test'
          }
        ],
        projects: [PROJECTS[PROJECTS.length - 2]]
      },
      advanced: {
        id: 'advanced',
        title: 'Modern JS & Tooling',
        description: 'Master ES6+ features and professional development tools.',
        modules: [
          {
            id: 'js-es6',
            title: 'ES6+ Features',
            description: 'Destructuring, spread/rest, and classes.',
            lessons: ['js-destructuring', 'js-classes-oop', 'js-modules'],
            testId: 'js-es6-test'
          }
        ],
        projects: []
      }
    },
    tools: ['javascript', 'npm', 'webpack', 'babel'],
    finalExamId: 'js-final-exam'
  },
  'Python Programming': {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Master Python for automation, data science, and web development.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Terminal',
    skills: ['Python Syntax', 'OOP', 'Data Structures', 'Automation'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Python Basics',
        description: 'Learn the fundamentals of Python programming.',
        modules: [
          {
            id: 'py-syntax',
            title: 'Python Syntax',
            description: 'Variables, loops, and conditionals.',
            lessons: ['py-intro', 'py-variables', 'py-loops', 'py-conditionals'],
            testId: 'py-syntax-test'
          },
          {
            id: 'py-data-structures',
            title: 'Data Structures',
            description: 'Lists, dictionaries, tuples, and sets.',
            lessons: ['py-lists', 'py-dicts', 'py-tuples-sets'],
            testId: 'py-ds-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'OOP & Modules',
        description: 'Organize your code with classes and modules.',
        modules: [
          {
            id: 'py-oop',
            title: 'Object-Oriented Python',
            description: 'Classes, inheritance, and polymorphism.',
            lessons: ['py-classes', 'py-inheritance', 'py-dunder-methods'],
            testId: 'py-oop-test'
          },
          {
            id: 'py-libs',
            title: 'Standard Libraries',
            description: 'Working with OS, Sys, and Datetime.',
            lessons: ['py-os-module', 'py-datetime', 'py-json-csv'],
            testId: 'py-libs-test'
          }
        ],
        projects: [PROJECTS[PROJECTS.length - 1]]
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Python',
        description: 'Decorators, generators, and concurrency.',
        modules: [
          {
            id: 'py-advanced',
            title: 'Advanced Topics',
            description: 'Mastering Python\'s advanced features.',
            lessons: ['py-decorators', 'py-generators', 'py-concurrency'],
            testId: 'py-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['python', 'pip', 'venv', 'pytest'],
    finalExamId: 'python-final-exam'
  },
  'Java Programming': {
    id: 'java-programming',
    title: 'Java Programming',
    description: 'Master Java for enterprise and Android development.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Coffee',
    skills: ['Java Syntax', 'OOP', 'Collections', 'Multithreading'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Java Foundations',
        description: 'Learn the core syntax and OOP principles of Java.',
        modules: [
          {
            id: 'java-syntax',
            title: 'Java Syntax',
            description: 'Variables, types, and control flow.',
            lessons: ['java-intro', 'java-variables', 'java-operators', 'java-conditionals'],
            testId: 'java-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Advanced OOP',
        description: 'Interfaces, abstract classes, and exceptions.',
        modules: [
          {
            id: 'java-oop',
            title: 'OOP Mastery',
            description: 'Deep dive into Java OOP.',
            lessons: ['java-interfaces', 'java-abstract-classes', 'java-exceptions'],
            testId: 'java-oop-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Collections & Concurrency',
        description: 'Master Java collections and multithreading.',
        modules: [
          {
            id: 'java-advanced',
            title: 'Advanced Java',
            description: 'Collections and Threads.',
            lessons: ['java-collections', 'java-generics', 'java-multithreading'],
            testId: 'java-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['java', 'maven', 'gradle', 'intellij'],
    finalExamId: 'java-final-exam'
  },
  'C++ Programming': {
    id: 'cpp-programming',
    title: 'C++ Programming',
    description: 'Master C++ for high-performance systems and game development.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Terminal',
    skills: ['C++ Syntax', 'Memory Management', 'STL', 'Templates'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'C++ Foundations',
        description: 'Learn the core syntax and memory basics of C++.',
        modules: [
          {
            id: 'cpp-syntax',
            title: 'C++ Syntax',
            description: 'Variables, loops, and pointers.',
            lessons: ['cpp-intro', 'cpp-variables', 'cpp-pointers', 'cpp-references'],
            testId: 'cpp-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'OOP & Memory',
        description: 'Classes and dynamic memory management.',
        modules: [
          {
            id: 'cpp-memory',
            title: 'Memory Management',
            description: 'Stack vs Heap and Smart Pointers.',
            lessons: ['cpp-dynamic-memory', 'cpp-smart-pointers', 'cpp-classes'],
            testId: 'cpp-memory-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'STL & Templates',
        description: 'Master the Standard Template Library.',
        modules: [
          {
            id: 'cpp-advanced',
            title: 'Advanced C++',
            description: 'Templates and STL.',
            lessons: ['cpp-templates', 'cpp-stl-containers', 'cpp-stl-algorithms'],
            testId: 'cpp-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['cpp', 'cmake', 'gdb', 'visual-studio'],
    finalExamId: 'cpp-final-exam'
  },
  'C# Programming': {
    id: 'csharp-programming',
    title: 'C# Programming',
    description: 'Master C# for .NET and Unity development.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Code',
    skills: ['C# Syntax', '.NET Core', 'LINQ', 'Unity Basics'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'C# Foundations',
        description: 'Learn the core syntax of C#.',
        modules: [
          {
            id: 'cs-syntax',
            title: 'C# Syntax',
            description: 'Variables, types, and basic logic.',
            lessons: ['cs-intro', 'cs-variables', 'cs-control-flow'],
            testId: 'cs-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: '.NET & OOP',
        description: 'Building applications with .NET.',
        modules: [
          {
            id: 'cs-dotnet',
            title: '.NET Fundamentals',
            description: 'Working with the .NET ecosystem.',
            lessons: ['cs-dotnet-core', 'cs-linq', 'cs-async-await'],
            testId: 'cs-dotnet-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced C#',
        description: 'Delegates, events, and performance.',
        modules: [
          {
            id: 'cs-advanced',
            title: 'Advanced Topics',
            description: 'Mastering C# features.',
            lessons: ['cs-delegates-events', 'cs-reflection', 'cs-performance'],
            testId: 'cs-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['csharp', 'dotnet', 'visual-studio', 'unity'],
    finalExamId: 'csharp-final-exam'
  },
  'Go Programming': {
    id: 'go-programming',
    title: 'Go Programming',
    description: 'Master Go for cloud-native and concurrent systems.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Zap',
    skills: ['Go Syntax', 'Goroutines', 'Channels', 'Interfaces'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Go Foundations',
        description: 'Learn the core syntax of Go.',
        modules: [
          {
            id: 'go-syntax',
            title: 'Go Syntax',
            description: 'Variables, types, and loops.',
            lessons: ['go-intro', 'go-variables', 'go-types', 'go-control-flow'],
            testId: 'go-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Concurrency & Interfaces',
        description: 'Master Go\'s unique features.',
        modules: [
          {
            id: 'go-concurrency',
            title: 'Concurrency',
            description: 'Goroutines and Channels.',
            lessons: ['go-goroutines', 'go-channels', 'go-select'],
            testId: 'go-concurrency-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Go',
        description: 'Microservices and performance.',
        modules: [
          {
            id: 'go-advanced',
            title: 'Advanced Topics',
            description: 'Testing and performance.',
            lessons: ['go-testing', 'go-benchmarking', 'go-microservices'],
            testId: 'go-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['go', 'docker', 'kubernetes'],
    finalExamId: 'go-final-exam'
  },
  'Rust Programming': {
    id: 'rust-programming',
    title: 'Rust Programming',
    description: 'Master Rust for safe and fast systems programming.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Shield',
    skills: ['Ownership', 'Borrowing', 'Traits', 'Concurrency'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Rust Foundations',
        description: 'Learn the core syntax and ownership basics.',
        modules: [
          {
            id: 'rust-syntax',
            title: 'Rust Syntax',
            description: 'Variables, types, and functions.',
            lessons: ['rust-intro', 'rust-variables', 'rust-types'],
            testId: 'rust-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'Ownership & Borrowing',
        description: 'Master Rust\'s memory safety model.',
        modules: [
          {
            id: 'rust-memory',
            title: 'Memory Safety',
            description: 'Ownership, Borrowing, and Lifetimes.',
            lessons: ['rust-ownership', 'rust-borrowing', 'rust-lifetimes'],
            testId: 'rust-memory-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Traits & Generics',
        description: 'Advanced Rust features.',
        modules: [
          {
            id: 'rust-advanced',
            title: 'Advanced Rust',
            description: 'Traits and Generics.',
            lessons: ['rust-traits', 'rust-generics', 'rust-macros'],
            testId: 'rust-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['rust', 'cargo', 'wasm'],
    finalExamId: 'rust-final-exam'
  },
  'Swift Programming': {
    id: 'swift-programming',
    title: 'Swift Programming',
    description: 'Master Swift for iOS and Apple ecosystem.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Smartphone',
    skills: ['Swift Syntax', 'SwiftUI', 'Combine', 'Core Data'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'Swift Foundations',
        description: 'Learn the core syntax of Swift.',
        modules: [
          {
            id: 'swift-syntax',
            title: 'Swift Syntax',
            description: 'Variables, types, and optionals.',
            lessons: ['swift-intro', 'swift-variables', 'swift-optionals'],
            testId: 'swift-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'SwiftUI & Layout',
        description: 'Building UIs with SwiftUI.',
        modules: [
          {
            id: 'swift-ui',
            title: 'SwiftUI Basics',
            description: 'Views and Modifiers.',
            lessons: ['swiftui-intro', 'swiftui-state', 'swiftui-layout'],
            testId: 'swiftui-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced Swift',
        description: 'Combine and Core Data.',
        modules: [
          {
            id: 'swift-advanced',
            title: 'Advanced Topics',
            description: 'Data and Reactive programming.',
            lessons: ['swift-combine', 'swift-core-data', 'swift-networking'],
            testId: 'swift-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['swift', 'xcode', 'swiftui'],
    finalExamId: 'swift-final-exam'
  },
  'PHP Programming': {
    id: 'php-programming',
    title: 'PHP Programming',
    description: 'Master PHP for modern web development.',
    category: 'coding-languages',
    status: 'active',
    icon: 'Globe',
    skills: ['PHP Syntax', 'OOP', 'MySQL', 'Composer'],
    recommended: true,
    levels: {
      beginner: {
        id: 'beginner',
        title: 'PHP Foundations',
        description: 'Learn the core syntax of PHP.',
        modules: [
          {
            id: 'php-syntax',
            title: 'PHP Syntax',
            description: 'Variables, loops, and arrays.',
            lessons: ['php-intro', 'php-variables', 'php-arrays', 'php-loops'],
            testId: 'php-syntax-test'
          }
        ],
        projects: []
      },
      intermediate: {
        id: 'intermediate',
        title: 'OOP & Databases',
        description: 'Building dynamic sites with PHP.',
        modules: [
          {
            id: 'php-oop',
            title: 'PHP OOP',
            description: 'Classes and Objects.',
            lessons: ['php-classes', 'php-inheritance', 'php-namespaces'],
            testId: 'php-oop-test'
          }
        ],
        projects: []
      },
      advanced: {
        id: 'advanced',
        title: 'Advanced PHP',
        description: 'Security and Frameworks.',
        modules: [
          {
            id: 'php-advanced',
            title: 'Advanced Topics',
            description: 'Security and Composer.',
            lessons: ['php-security', 'php-composer', 'php-laravel-intro'],
            testId: 'php-adv-test'
          }
        ],
        projects: []
      }
    },
    tools: ['php', 'mysql', 'composer', 'apache'],
    finalExamId: 'php-final-exam'
  }
};
