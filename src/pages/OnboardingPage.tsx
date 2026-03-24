import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { CareerPath } from '../types/index';
import { useUserData } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { Code2, Database, Layout, Smartphone, Terminal, BarChart, Palette, Globe, ChevronRight, Shield, Cpu, Layers, Server, Activity, Lock } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';

const paths: { id: CareerPath; icon: React.ReactNode; desc: string; skills: string[]; recommended?: boolean }[] = [
  { id: 'Frontend Developer', icon: <Layout size={24} />, desc: 'Master the art of building beautiful, interactive user interfaces.', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { id: 'Full-Stack Developer', icon: <Globe size={24} />, desc: 'Become a versatile developer who can build complete applications.', skills: ['Frontend', 'Backend', 'DevOps'], recommended: true },
  { id: 'Backend Developer', icon: <Database size={24} />, desc: 'Build the logic and infrastructure that powers modern applications.', skills: ['Node.js', 'Express', 'Firebase', 'SQL'] },
  { id: 'Mobile App Developer', icon: <Smartphone size={24} />, desc: 'Build native mobile applications for iOS and Android.', skills: ['React Native', 'APIs', 'Mobile UI'] },
  { id: 'Software Engineer', icon: <Terminal size={24} />, desc: 'Master the core principles of software development and architecture.', skills: ['Algorithms', 'Data Structures', 'System Design'] },
  { id: 'Game Developer', icon: <Cpu size={24} />, desc: 'Create immersive 2D and 3D gaming experiences.', skills: ['Unity', 'C#', 'Physics', 'Graphics'] },
  { id: 'DevOps Engineer', icon: <Server size={24} />, desc: 'Automate and optimize the software development lifecycle.', skills: ['Docker', 'K8s', 'CI/CD', 'AWS'] },
  { id: 'Cloud Engineer', icon: <Layers size={24} />, desc: 'Design and manage scalable cloud infrastructure.', skills: ['AWS', 'Azure', 'GCP', 'Terraform'] },
  { id: 'Data Analyst', icon: <BarChart size={24} />, desc: 'Extract insights from data and help businesses make better decisions.', skills: ['Python', 'SQL', 'Excel', 'Pandas'] },
  { id: 'Data Scientist', icon: <Activity size={24} />, desc: 'Build predictive models and advanced data visualizations.', skills: ['ML', 'Statistics', 'R', 'Python'] },
  { id: 'AI Engineer', icon: <Cpu size={24} />, desc: 'Develop intelligent systems using neural networks and LLMs.', skills: ['PyTorch', 'NLP', 'Computer Vision'] },
  { id: 'Cybersecurity Engineer', icon: <Shield size={24} />, desc: 'Protect systems and networks from digital attacks.', skills: ['Ethical Hacking', 'Network Security'] },
  { id: 'Blockchain Developer', icon: <Globe size={24} />, desc: 'Build decentralized applications and smart contracts.', skills: ['Solidity', 'Ethereum', 'Web3'] },
  { id: 'UI/UX Designer', icon: <Palette size={24} />, desc: 'Design intuitive and engaging user experiences.', skills: ['Figma', 'Prototyping', 'User Research'] },
  { id: 'QA Engineer', icon: <Code2 size={24} />, desc: 'Ensure software quality through automated and manual testing.', skills: ['Selenium', 'Jest', 'Cypress'] },
  { id: 'API Developer', icon: <Code2 size={24} />, desc: 'Specialize in building robust and scalable APIs.', skills: ['REST', 'GraphQL', 'gRPC'] },
  { id: 'Systems Architect', icon: <Layers size={24} />, desc: 'Design high-level structures of complex software systems.', skills: ['Scalability', 'Microservices'] }
];

export const OnboardingPage: React.FC = () => {
  const [selected, setSelected] = useState<CareerPath | null>(null);
  const { updateProgress, loading } = useUserData();
  const navigate = useNavigate();

  const handleComplete = async () => {
    if (!selected) return;
    await updateProgress({ 
      selectedPath: selected,
      unlockedPaths: [selected]
    });
    navigate('/dashboard');
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#050506] text-white px-6 py-24 flex flex-col items-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative z-10"
      >
        <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2">Career Path</Badge>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-gradient leading-[1.1]">
          What do you <br /> want to become?
        </h1>
        <p className="text-white/40 max-w-xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
          Pick your primary path. We will guide your focus here first, <br className="hidden md:block" />
          but you can explore everything later.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl relative z-10 mb-32">
        {paths.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card 
              onClick={() => setSelected(path.id)}
              className={`h-full flex flex-col p-10 relative group transition-all duration-500 ${
                selected === path.id 
                  ? 'bg-emerald-500/[0.08] border-emerald-500/40 ring-1 ring-emerald-500/20' 
                  : path.recommended 
                    ? 'border-white/[0.12] bg-white/[0.04]' 
                    : 'border-white/[0.08]'
              }`}
            >
              {path.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-black border-none font-black shadow-lg shadow-emerald-500/20">Recommended</Badge>
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 ${
                selected === path.id 
                  ? 'bg-emerald-500 text-black shadow-2xl shadow-emerald-500/40 scale-110' 
                  : 'bg-white/[0.05] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white/60'
              }`}>
                {path.icon}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <h3 className={`text-2xl font-bold transition-colors duration-500 ${selected === path.id ? 'text-emerald-400' : 'text-white'}`}>
                  {path.id}
                </h3>
              </div>
              <p className="text-base text-white/30 leading-relaxed mb-10 flex-grow font-medium">
                {path.desc}
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {path.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    className={`transition-colors duration-500 ${
                      selected === path.id 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-white/[0.03] text-white/30'
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50"
          >
            <Button fullWidth onClick={handleComplete} className="group h-20 text-xl font-black tracking-tight shadow-2xl shadow-emerald-500/40 rounded-[2rem]">
              Confirm {selected}
              <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
