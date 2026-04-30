
import { CareerPath } from "../types";

export interface PathConfig {
  id: string;
  title: string;
  category: string;
  skillId: string;
}

export const ACADEMY_CATALOG: PathConfig[] = [
  // FRONTEND
  { id: "frontend-dev", title: "Frontend Developer", category: "Frontend", skillId: "frontend-dev" },
  { id: "react-mastery", title: "React Specialist", category: "Frontend", skillId: "react-mastery" },
  { id: "nextjs-dev", title: "Next.js Architect", category: "Frontend", skillId: "nextjs-dev" },
  { id: "vue-expert", title: "Vue.js Developer", category: "Frontend", skillId: "vue-expert" },
  { id: "angular-pro", title: "Angular Engineer", category: "Frontend", skillId: "angular-pro" },
  
  // BACKEND
  { id: "backend-node", title: "Node.js Backend Developer", category: "Backend", skillId: "backend-node" },
  { id: "python-backend", title: "Python Backend Engineer", category: "Backend", skillId: "python-backend" },
  { id: "java-spring", title: "Java Spring Boot Developer", category: "Backend", skillId: "java-spring" },
  { id: "php-laravel", title: "PHP Laravel Developer", category: "Backend", skillId: "php-laravel" },
  { id: "go-distributed", title: "Go Distributed Systems", category: "Backend", skillId: "go-distributed" },
  { id: "ruby-rails", title: "Ruby on Rails Developer", category: "Backend", skillId: "ruby-rails" },
  
  // FULLSTACK
  { id: "fullstack-mern", title: "Fullstack MERN Engineer", category: "Fullstack", skillId: "fullstack-mern" },
  { id: "fullstack-next", title: "Next.js Fullstack specialist", category: "Fullstack", skillId: "fullstack-next" },
  { id: "fullstack-python", title: "Django/React Fullstack", category: "Fullstack", skillId: "fullstack-python" },
  
  // MOBILE
  { id: "mobile-flutter", title: "Flutter Developer", category: "Mobile", skillId: "mobile-flutter" },
  { id: "mobile-react-native", title: "React Native Developer", category: "Mobile", skillId: "mobile-react-native" },
  { id: "mobile-ios", title: "iOS Swift Developer", category: "Mobile", skillId: "mobile-ios" },
  { id: "mobile-android", title: "Android Kotlin Developer", category: "Mobile", skillId: "mobile-android" },
  
  // DATA / AI
  { id: "ai-engineer", title: "AI/Machine Learning Engineer", category: "Data / AI", skillId: "ai-engineer" },
  { id: "data-scientist", title: "Data Scientist", category: "Data / AI", skillId: "data-scientist" },
  { id: "prompt-engineer", title: "Prompt Engineer", category: "Data / AI", skillId: "prompt-engineer" },
  { id: "deep-learning", title: "Deep Learning Specialist", category: "Data / AI", skillId: "deep-learning" },
  
  // DEVOPS / CLOUD
  { id: "devops-engineer", title: "DevOps Cloud Engineer", category: "DevOps / Cloud", skillId: "devops-engineer" },
  { id: "aws-architect", title: "AWS Solutions Architect", category: "DevOps / Cloud", skillId: "aws-architect" },
  { id: "kubernetes-expert", title: "Kubernetes Specialist", category: "DevOps / Cloud", skillId: "kubernetes-expert" },
  { id: "azure-admin", title: "Azure Administrator", category: "DevOps / Cloud", skillId: "azure-admin" },
  
  // CYBERSECURITY
  { id: "cyber-analyst", title: "Cybersecurity Analyst", category: "Cybersecurity", skillId: "cyber-analyst" },
  { id: "ethical-hacker", title: "Ethical Hacker", category: "Cybersecurity", skillId: "ethical-hacker" },
  { id: "network-security", title: "Network Security Engineer", category: "Cybersecurity", skillId: "network-security" },
  
  // UI/UX
  { id: "ui-ux-designer", title: "UI/UX Product Designer", category: "UI/UX", skillId: "ui-ux-designer" },
  { id: "product-manager", title: "AI Product Manager", category: "UI/UX", skillId: "product-manager" },
  
  // BLOCKCHAIN
  { id: "blockchain-dev", title: "Blockchain Solidity Developer", category: "Blockchain", skillId: "blockchain-dev" },
  { id: "web3-engineer", title: "Web3/DApp Engineer", category: "Blockchain", skillId: "web3-engineer" },
  
  // LANGUAGES
  { id: "lang-rust", title: "Rust Programming Expert", category: "Languages", skillId: "lang-rust" },
  { id: "lang-cpp", title: "C++ Systems Engineer", category: "Languages", skillId: "lang-cpp" },
  { id: "lang-java", title: "Java Enterprise Master", category: "Languages", skillId: "lang-java" },
  { id: "lang-go", title: "Go Programming", category: "Languages", skillId: "lang-go" },
  { id: "lang-csharp", title: "C# .NET Master", category: "Languages", skillId: "lang-csharp" },
  
  // GAME DEV
  { id: "game-unity", title: "Unity Game Developer", category: "Game Development", skillId: "game-unity" },
  { id: "game-unreal", title: "Unreal Engine Master", category: "Game Development", skillId: "game-unreal" },
  
  // LOW-CODE
  { id: "lowcode-flutterflow", title: "FlutterFlow Master", category: "Low-Code / No-Code", skillId: "lowcode-flutterflow" },
  { id: "lowcode-bubble", title: "Bubble Developer", category: "Low-Code / No-Code", skillId: "lowcode-bubble" },

  // ADDITIONAL ROLES
  { id: "software-tester", title: "QA Automation Engineer", category: "Software Engineering", skillId: "software-tester" },
  { id: "sre-engineer", title: "Site Reliability Engineer", category: "Software Engineering", skillId: "sre-engineer" },
  { id: "embedded-systems", title: "Embedded Systems Engineer", category: "Software Engineering", skillId: "embedded-systems" },
  { id: "ar-vr-dev", title: "AR/VR Developer", category: "Game Development", skillId: "ar-vr-dev" },
  { id: "data-analyst", title: "Data Analyst", category: "Data / AI", skillId: "data-analyst" },
  { id: "database-admin", title: "Database Administrator (SQL/NoSQL)", category: "Backend", skillId: "database-admin" },
  { id: "bi-developer", title: "Business Intelligence Developer", category: "Data / AI", skillId: "bi-developer" },
  { id: "mlops-engineer", title: "MLOps Engineer", category: "DevOps / Cloud", skillId: "mlops-engineer" },
  { id: "cloud-security", title: "Cloud Security Specialist", category: "Cybersecurity", skillId: "cloud-security" }
];
