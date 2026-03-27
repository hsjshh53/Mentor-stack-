import { DetailedProject } from '../types';

export const DETAILED_PROJECTS: DetailedProject[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Frontend Developer',
    description: 'Build a high-performance, responsive personal portfolio website to showcase your skills and projects to potential employers.',
    difficulty: 'Beginner',
    xpReward: 500,
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    isCapstone: false,
    estimatedTime: '4-6 hours',
    objectives: [
      'Create a semantic HTML structure',
      'Implement a modern, responsive CSS layout',
      'Add interactive elements with JavaScript',
      'Optimize for performance and SEO'
    ],
    prerequisites: [
      'Basic HTML tags',
      'CSS Box Model',
      'Responsive design principles'
    ],
    phases: [
      {
        id: 'p1-planning',
        title: 'Phase 1: Planning & Design',
        description: 'Define your brand and structure your content.',
        explanation: 'Before coding, you need to know what you are building. Planning ensures you don\'t miss critical sections like your bio, projects, and contact info.',
        tasks: [
          'Choose a color palette and typography',
          'Sketch a rough layout for mobile and desktop',
          'Write your "About Me" bio'
        ],
        checklist: [
          'Wireframe complete',
          'Content written',
          'Assets (images/icons) collected'
        ],
        miniChallenge: 'Try to define your personal brand in just 3 words.',
        nextStep: 'Setting up the HTML structure.',
        hints: ['Keep it clean and readable.', 'Use high-quality images.'],
        commonMistakes: ['Overcomplicating the design.', 'Ignoring mobile users.']
      },
      {
        id: 'p1-setup',
        title: 'Phase 2: HTML Structure',
        description: 'Build the skeleton of your portfolio.',
        explanation: 'Semantic HTML is crucial for accessibility and SEO. Use tags like <header>, <main>, <section>, and <footer>.',
        tasks: [
          'Create index.html',
          'Add a navigation bar',
          'Create a Hero section with your name and title',
          'Add a Projects section with placeholders'
        ],
        checklist: [
          'Valid HTML5 structure',
          'Semantic tags used',
          'All sections present'
        ],
        miniChallenge: 'Add an <img> tag with a proper alt attribute.',
        nextStep: 'Styling with CSS.',
        hints: ['Use <nav> for navigation.', 'Use <article> for project cards.'],
        commonMistakes: ['Using <div> for everything.', 'Missing alt text on images.']
      },
      {
        id: 'p1-build',
        title: 'Phase 3: CSS Styling',
        description: 'Make it look professional.',
        explanation: 'Use Flexbox or Grid for layout. Focus on spacing, typography, and responsiveness.',
        tasks: [
          'Implement the grid layout',
          'Style the navigation bar',
          'Make the Hero section stand out',
          'Add media queries for mobile responsiveness'
        ],
        checklist: [
          'Responsive layout',
          'Consistent spacing',
          'Readable typography'
        ],
        miniChallenge: 'Create a hover effect for your project cards.',
        nextStep: 'Adding interactivity.',
        hints: ['Use CSS variables for colors.', 'Mobile-first approach is better.'],
        commonMistakes: ['Fixed widths that break on small screens.', 'Poor color contrast.']
      }
    ],
    checkpoints: [
      { id: 'cp1-structure', title: 'HTML Structure Complete', description: 'Verified semantic HTML structure.', xpReward: 100 },
      { id: 'cp1-responsive', title: 'Responsive Design Verified', description: 'Verified layout on mobile and desktop.', xpReward: 200 }
    ],
    expectedOutcome: 'A fully functional, responsive portfolio website hosted online.',
    starterTasks: [
      'Initialize a git repository',
      'Create index.html and style.css'
    ],
    starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <h1>Welcome to my site</h1>\n</body>\n</html>'
  },
  {
    id: 'task-manager-api',
    title: 'Task Manager API',
    category: 'Backend Developer',
    description: 'Develop a robust RESTful API for a task management application, including user authentication and database integration.',
    difficulty: 'Intermediate',
    xpReward: 800,
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    isCapstone: false,
    estimatedTime: '8-10 hours',
    objectives: [
      'Design a RESTful API structure',
      'Implement JWT-based authentication',
      'Connect to a MongoDB database',
      'Handle CRUD operations for tasks'
    ],
    prerequisites: [
      'JavaScript ES6+',
      'Basic understanding of HTTP methods',
      'Node.js basics'
    ],
    phases: [
      {
        id: 'p2-setup',
        title: 'Phase 1: Server Setup',
        description: 'Initialize the Node.js environment.',
        explanation: 'Setting up a solid foundation with Express and essential middlewares is the first step in backend development.',
        tasks: [
          'Initialize npm project',
          'Install express, mongoose, and dotenv',
          'Create a basic server.js'
        ],
        checklist: [
          'Server runs without errors',
          'Environment variables configured',
          'Gitignore added'
        ],
        miniChallenge: 'Create a simple GET /health route.',
        nextStep: 'Database connection.',
        hints: ['Use nodemon for development.', 'Keep your secrets in .env.'],
        commonMistakes: ['Hardcoding database URIs.', 'Forgetting to handle server errors.']
      }
    ],
    checkpoints: [
      { id: 'cp2-auth', title: 'Authentication System Working', description: 'Verified JWT authentication flow.', xpReward: 300 },
      { id: 'cp2-crud', title: 'Full CRUD Operations Complete', description: 'Verified task CRUD endpoints.', xpReward: 300 }
    ],
    expectedOutcome: 'A secure, documented REST API ready for frontend consumption.',
    starterTasks: [
      'npm init -y',
      'Create a .env file'
    ]
  },
  {
    id: 'fullstack-ecommerce',
    title: 'E-commerce Store',
    category: 'Full-Stack Developer',
    description: 'Build a complete e-commerce platform with product listings, a shopping cart, and a checkout system.',
    difficulty: 'Advanced',
    xpReward: 1500,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    isCapstone: true,
    estimatedTime: '20-30 hours',
    objectives: [
      'Build a dynamic frontend with React',
      'Develop a scalable backend with Node.js',
      'Manage complex state with Redux or Context API',
      'Integrate Stripe for payments'
    ],
    prerequisites: [
      'React Hooks',
      'Express.js',
      'SQL basics',
      'API integration'
    ],
    phases: [
      {
        id: 'p3-planning',
        title: 'Phase 1: Architecture',
        description: 'Plan the full-stack flow.',
        explanation: 'Full-stack projects require careful planning of how the frontend and backend interact.',
        tasks: [
          'Design the database schema',
          'Map out the API endpoints',
          'Choose a state management strategy'
        ],
        checklist: [
          'Schema diagram complete',
          'API documentation started',
          'Tech stack finalized'
        ],
        miniChallenge: 'Draw your database relationships.',
        nextStep: 'Backend development.',
        hints: ['Start with the data model.', 'Keep the UI simple at first.'],
        commonMistakes: ['Starting with the UI before the data.', 'Ignoring security.']
      }
    ],
    checkpoints: [
      { id: 'cp3-frontend', title: 'Frontend Product Grid Complete', description: 'Verified product grid layout.', xpReward: 400 },
      { id: 'cp3-backend', title: 'Backend Order Processing Working', description: 'Verified order processing logic.', xpReward: 400 },
      { id: 'cp3-payment', title: 'Stripe Integration Successful', description: 'Verified Stripe payment flow.', xpReward: 500 }
    ],
    expectedOutcome: 'A production-ready e-commerce application with real payment processing.',
    starterTasks: [
      'Setup a monorepo structure',
      'Initialize React and Express apps'
    ]
  }
];
