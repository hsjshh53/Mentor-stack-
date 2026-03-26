import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'landing-page-project',
    title: 'Modern Landing Page',
    path: 'Frontend Developer',
    description: 'Build a fully responsive landing page for a startup or product.',
    objective: 'Master HTML structure, CSS Flexbox/Grid, and responsive design principles.',
    steps: [
      'Design the layout using a mobile-first approach.',
      'Implement the navigation bar with a mobile menu.',
      'Create a hero section with a clear call to action.',
      'Build a features section using CSS Grid.',
      'Add a contact form and footer.',
      'Ensure the site is fully responsive across all devices.'
    ],
    output: 'A hosted landing page with clean, semantic HTML and modern CSS.',
    xpReward: 500
  },
  {
    id: 'portfolio-project',
    title: 'Personal Portfolio Site',
    path: 'Frontend Developer',
    description: 'Create a professional portfolio to showcase your skills and projects.',
    objective: 'Learn how to present yourself as a developer and use advanced CSS animations.',
    steps: [
      'Define your personal brand and color palette.',
      'Create an "About Me" section with your background.',
      'Build a "Projects" gallery with hover effects and links.',
      'Implement a "Skills" section using icons or progress bars.',
      'Add a functional contact form (using a service like Formspree).',
      'Optimize for performance and SEO.'
    ],
    output: 'A professional portfolio site that reflects your identity as a developer.',
    xpReward: 750
  },
  {
    id: 'ui-app-project',
    title: 'Functional UI Application',
    path: 'Frontend Developer',
    description: 'Build a complex UI application like a Task Manager or Weather App using React.',
    objective: 'Master React state management, hooks, and API integration.',
    steps: [
      'Set up a React project using Vite.',
      'Design the component architecture.',
      'Implement state management for the application data.',
      'Fetch data from a public API (e.g., OpenWeatherMap).',
      'Add features like filtering, searching, or sorting.',
      'Style the application using Tailwind CSS.'
    ],
    output: 'A fully functional React application with real-time data integration.',
    xpReward: 1000
  },
  {
    id: 'task-manager-api-project',
    title: 'Task Manager REST API',
    path: 'Backend Developer',
    description: 'Build a secure and scalable REST API for a task management system.',
    objective: 'Master Node.js, Express, and MongoDB integration.',
    steps: [
      'Set up an Express server with TypeScript.',
      'Define the Task and User models using Mongoose.',
      'Implement CRUD operations for tasks.',
      'Add user authentication using JWT.',
      'Implement middleware for error handling and validation.',
      'Document the API using Swagger or a README.'
    ],
    output: 'A production-ready REST API with authentication and database persistence.',
    xpReward: 1000
  },
  {
    id: 'auth-system-project',
    title: 'Secure Authentication System',
    path: 'Backend Developer',
    description: 'Build a standalone authentication service with OAuth and JWT.',
    objective: 'Master backend security, password hashing, and token management.',
    steps: [
      'Implement secure password hashing using bcrypt.',
      'Set up JWT generation and verification.',
      'Implement "Forgot Password" and "Email Verification" flows.',
      'Integrate Google or GitHub OAuth.',
      'Add rate limiting to prevent brute-force attacks.',
      'Secure the API with CORS and Helmet.'
    ],
    output: 'A highly secure authentication service that can be integrated into any app.',
    xpReward: 1250
  },
  {
    id: 'blog-app-project',
    title: 'Full-Stack Blog Application',
    path: 'Full-Stack Developer',
    description: 'Build a complete blog platform with a React frontend and Node.js backend.',
    objective: 'Master full-stack integration, state management, and deployment.',
    steps: [
      'Build the frontend UI with React and Tailwind.',
      'Develop the backend API with Express and MongoDB.',
      'Implement user authentication and authorization.',
      'Create features for creating, editing, and deleting posts.',
      'Add a commenting system and search functionality.',
      'Deploy the entire application to a cloud platform.'
    ],
    output: 'A fully functional, deployed full-stack blog application.',
    xpReward: 1500
  },
  {
    id: 'dashboard-project',
    title: 'Real-Time Admin Dashboard',
    path: 'Full-Stack Developer',
    description: 'Build a complex admin dashboard with real-time data updates.',
    objective: 'Master WebSockets, complex data visualization, and advanced state management.',
    steps: [
      'Design a complex dashboard layout with multiple widgets.',
      'Implement real-time data updates using Socket.io.',
      'Visualize data using D3.js or Recharts.',
      'Build advanced filtering and reporting features.',
      'Implement role-based access control (RBAC).',
      'Optimize the application for large datasets.'
    ],
    output: 'A professional-grade admin dashboard with real-time capabilities.',
    xpReward: 2000
  },
  {
    id: 'sales-analysis-project',
    title: 'Business Sales Analysis',
    path: 'Data Analyst',
    description: 'Analyze a large sales dataset to find trends and provide business insights.',
    objective: 'Master data cleaning, SQL querying, and storytelling with data.',
    steps: [
      'Clean and prepare the raw sales data in Excel or Python.',
      'Perform exploratory data analysis (EDA) to find patterns.',
      'Use SQL to extract specific metrics and KPIs.',
      'Create a series of visualizations to illustrate findings.',
      'Build a final report or presentation with actionable insights.',
      'Present the data story to a hypothetical stakeholder.'
    ],
    output: 'A comprehensive data analysis report with clear business recommendations.',
    xpReward: 1000
  },
  {
    id: 'data-analysis-project',
    title: 'End-to-End Data Project',
    path: 'Data Analyst',
    description: 'Choose a public dataset and perform a complete analysis from scratch.',
    objective: 'Master the entire data analysis lifecycle from collection to visualization.',
    steps: [
      'Select a dataset from Kaggle or a government portal.',
      'Define the research questions and objectives.',
      'Perform deep data cleaning and transformation.',
      'Conduct statistical analysis to test hypotheses.',
      'Build an interactive dashboard in Tableau or Power BI.',
      'Write a detailed case study of your process and results.'
    ],
    output: 'A professional case study and interactive dashboard showcasing your skills.',
    xpReward: 1500
  },
  {
    id: 'ai-ml-project',
    title: 'Predictive ML Model',
    path: 'AI Engineer',
    description: 'Build and deploy a machine learning model to predict house prices or customer churn.',
    objective: 'Master the full ML lifecycle from data cleaning to model deployment.',
    steps: [
      'Select a dataset from Kaggle.',
      'Perform exploratory data analysis (EDA).',
      'Clean and preprocess the data using Pandas.',
      'Select and train a regression or classification model.',
      'Evaluate the model using appropriate metrics.',
      'Deploy the model as a simple web API.'
    ],
    output: 'A trained and deployed ML model with a clear evaluation report.',
    xpReward: 1500
  },
  {
    id: 'ai-dl-project',
    title: 'Image Recognition System',
    path: 'AI Engineer',
    description: 'Build a deep learning model to classify images using a CNN.',
    objective: 'Master neural networks, computer vision, and deep learning frameworks.',
    steps: [
      'Collect and augment an image dataset.',
      'Design a CNN architecture using TensorFlow or PyTorch.',
      'Train the model on a GPU-enabled environment.',
      'Use transfer learning to improve accuracy.',
      'Visualize the model\'s predictions and filters.',
      'Document the training process and results.'
    ],
    output: 'A high-accuracy image classification model with visual performance metrics.',
    xpReward: 2000
  },
  {
    id: 'cyber-scanner-project',
    title: 'Vulnerability Scanner',
    path: 'Cybersecurity',
    description: 'Build a tool that scans a network or website for known vulnerabilities.',
    objective: 'Master network scanning, vulnerability assessment, and security automation.',
    steps: [
      'Research common network and web vulnerabilities.',
      'Use Python to build a basic port scanner.',
      'Integrate with vulnerability databases (like CVE).',
      'Implement checks for common misconfigurations.',
      'Generate a detailed security report with findings.',
      'Add a simple CLI or web interface for the tool.'
    ],
    output: 'A functional vulnerability scanner that provides actionable security insights.',
    xpReward: 1500
  },
  {
    id: 'cyber-secure-net-project',
    title: 'Secure Network Architecture',
    path: 'Cybersecurity',
    description: 'Design and implement a highly secure network for a hypothetical organization.',
    objective: 'Master network security, firewalls, IDS/IPS, and secure design principles.',
    steps: [
      'Define the security requirements for the organization.',
      'Design a network layout with DMZs and segmentation.',
      'Configure firewalls and access control lists (ACLs).',
      'Implement an Intrusion Detection System (IDS).',
      'Set up secure remote access using a VPN.',
      'Perform a final security audit of the architecture.'
    ],
    output: 'A detailed network diagram and configuration report for a secure environment.',
    xpReward: 2000
  },
  {
    id: 'devops-pipeline-project',
    title: 'Automated CI/CD Pipeline',
    path: 'DevOps Engineer',
    description: 'Build a complete automated pipeline for a web application.',
    objective: 'Master CI/CD tools, automation, and continuous delivery.',
    steps: [
      'Set up a version control system (GitHub).',
      'Configure a CI tool (GitHub Actions or Jenkins).',
      'Automate the build and test process.',
      'Implement containerization using Docker.',
      'Automate the deployment to a staging environment.',
      'Add monitoring and alerting for the pipeline.'
    ],
    output: 'A fully automated pipeline that ships code from commit to production.',
    xpReward: 1500
  },
  {
    id: 'cloud-multi-tier-project',
    title: 'Multi-Tier Cloud Application',
    path: 'Cloud Engineer',
    description: 'Deploy a scalable, multi-tier application on a major cloud provider.',
    objective: 'Master cloud architecture, scalability, and managed services.',
    steps: [
      'Design a three-tier architecture (Web, App, DB).',
      'Provision cloud resources using Infrastructure as Code (Terraform).',
      'Configure auto-scaling and load balancing.',
      'Set up a managed database service (RDS).',
      'Implement cloud security best practices (IAM, VPC).',
      'Optimize the architecture for cost and performance.'
    ],
    output: 'A highly available, scalable application running in the cloud.',
    xpReward: 1500
  },
  {
    id: 'game-dev-platformer-project',
    title: '2D Platformer Game',
    path: 'Game Developer',
    description: 'Build a complete 2D platformer game with levels, enemies, and power-ups.',
    objective: 'Master game physics, character controllers, and level design.',
    steps: [
      'Design the game mechanics and character controls.',
      'Create or source 2D assets (sprites, tilesets).',
      'Build multiple levels with increasing difficulty.',
      'Implement enemy AI and combat systems.',
      'Add sound effects and background music.',
      'Optimize the game for a smooth 60 FPS experience.'
    ],
    output: 'A fun, playable 2D platformer game with multiple levels.',
    xpReward: 1500
  }
];
