import { CareerPath, CareerCategory } from '../types';

export interface PathInfo {
  title: CareerPath;
  category: CareerCategory;
  description: string;
  icon: string;
  skills: string[];
  recommended?: boolean;
  status?: 'active' | 'partial' | 'locked';
}

export const ALL_CAREER_PATHS: PathInfo[] = [
  // Core Software Development
  {
    title: 'Frontend Developer',
    category: 'Core Software Development',
    description: 'Master the art of building beautiful, interactive user interfaces.',
    icon: 'Layout',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    recommended: true,
    status: 'active'
  },
  {
    title: 'Backend Developer',
    category: 'Core Software Development',
    description: 'Build powerful servers, APIs, and database systems.',
    icon: 'Database',
    skills: ['Node.js', 'Express', 'Firebase', 'SQL'],
    recommended: true,
    status: 'active'
  },
  {
    title: 'Full-Stack Developer',
    category: 'Core Software Development',
    description: 'Master both frontend and backend to build complete applications.',
    icon: 'Globe',
    skills: ['Frontend', 'Backend', 'DevOps'],
    recommended: true,
    status: 'active'
  },
  {
    title: 'Software Engineer',
    category: 'Core Software Development',
    description: 'Learn the principles of building scalable and maintainable software.',
    icon: 'Code',
    skills: ['Algorithms', 'System Design', 'Testing'],
    status: 'active'
  },
  {
    title: 'Mobile App Developer',
    category: 'Core Software Development',
    description: 'Build native and cross-platform mobile applications.',
    icon: 'Smartphone',
    skills: ['React Native', 'Swift', 'Kotlin'],
    status: 'active'
  },
  {
    title: 'HTML',
    category: 'Core Software Development',
    description: 'Master the language of the web from zero to professional.',
    icon: 'Code',
    skills: ['HTML', 'Semantic Web', 'Accessibility'],
    status: 'active'
  },
  {
    title: 'QA Engineer',
    category: 'Core Software Development',
    description: 'Ensure software quality through automated and manual testing.',
    icon: 'CheckCircle',
    skills: ['Selenium', 'Jest', 'Cypress'],
    status: 'active'
  },

  // Data & AI
  {
    title: 'Data Analyst',
    category: 'Data & AI',
    description: 'Turn raw data into meaningful insights and stories.',
    icon: 'BarChart',
    skills: ['Python', 'SQL', 'Excel', 'Pandas'],
    recommended: true,
    status: 'active'
  },
  {
    title: 'AI Engineer',
    category: 'Data & AI',
    description: 'Build intelligent systems using machine learning and neural networks.',
    icon: 'Cpu',
    skills: ['PyTorch', 'NLP', 'Computer Vision'],
    recommended: true,
    status: 'active'
  },
  {
    title: 'Machine Learning',
    category: 'Data & AI',
    description: 'Master the algorithms that power modern AI systems.',
    icon: 'Brain',
    skills: ['Scikit-Learn', 'TensorFlow', 'Math'],
    status: 'active'
  },
  {
    title: 'Data Scientist',
    category: 'Data & AI',
    description: 'Use scientific methods to extract knowledge from data.',
    icon: 'FlaskConical',
    skills: ['Statistics', 'R', 'Python'],
    status: 'active'
  },
  {
    title: 'Data Engineer',
    category: 'Data & AI',
    description: 'Build the infrastructure for large-scale data processing.',
    icon: 'Layers',
    skills: ['Spark', 'Hadoop', 'ETL'],
    status: 'active'
  },

  // Security
  {
    title: 'Cybersecurity',
    category: 'Security',
    description: 'Protect systems and networks from digital attacks.',
    icon: 'Shield',
    skills: ['Network Security', 'Cryptography', 'Compliance'],
    status: 'active'
  },
  {
    title: 'Ethical Hacking',
    category: 'Security',
    description: 'Learn to think like a hacker to find and fix vulnerabilities.',
    icon: 'Terminal',
    skills: ['Penetration Testing', 'Kali Linux', 'Metasploit'],
    status: 'active'
  },

  // Infrastructure & Systems
  {
    title: 'DevOps Engineer',
    category: 'Infrastructure & Systems',
    description: 'Bridge the gap between development and operations.',
    icon: 'Infinity',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    status: 'active'
  },
  {
    title: 'Cloud Engineer',
    category: 'Infrastructure & Systems',
    description: 'Design and manage systems in the cloud.',
    icon: 'Cloud',
    skills: ['AWS', 'Azure', 'GCP'],
    status: 'active'
  },
  {
    title: 'System Admin',
    category: 'Infrastructure & Systems',
    description: 'Manage and maintain computer systems and servers.',
    icon: 'Server',
    skills: ['Linux', 'Windows Server', 'Networking'],
    status: 'active'
  },

  // Specialized Development
  {
    title: 'Game Developer',
    category: 'Specialized Development',
    description: 'Create immersive games for various platforms.',
    icon: 'Gamepad2',
    skills: ['Unity', 'Unreal Engine', 'C#'],
    status: 'active'
  },
  {
    title: 'Blockchain',
    category: 'Specialized Development',
    description: 'Build decentralized applications and smart contracts.',
    icon: 'Link',
    skills: ['Solidity', 'Ethereum', 'Web3.js'],
    status: 'active'
  },
  {
    title: 'IoT',
    category: 'Specialized Development',
    description: 'Connect physical devices to the internet.',
    icon: 'Wifi',
    skills: ['Arduino', 'Raspberry Pi', 'C++'],
    status: 'active'
  },

  // Product & Design
  {
    title: 'UI/UX',
    category: 'Product & Design',
    description: 'Design beautiful and functional user experiences.',
    icon: 'Palette',
    skills: ['Figma', 'User Research', 'Prototyping'],
    status: 'active'
  },
  {
    title: 'Product Manager',
    category: 'Product & Design',
    description: 'Lead the development and strategy of digital products.',
    icon: 'Briefcase',
    skills: ['Agile', 'Roadmapping', 'Strategy'],
    status: 'active'
  },

  // Emerging High-Income Skills
  {
    title: 'Prompt Engineering',
    category: 'Emerging High-Income Skills',
    description: 'Master the art of communicating with AI models.',
    icon: 'MessageSquare',
    skills: ['LLMs', 'NLP', 'AI Strategy'],
    status: 'active'
  },
  {
    title: 'AI Automation',
    category: 'Emerging High-Income Skills',
    description: 'Automate business processes using AI tools.',
    icon: 'Zap',
    skills: ['Zapier', 'Make.com', 'AI Agents'],
    status: 'active'
  }
];
