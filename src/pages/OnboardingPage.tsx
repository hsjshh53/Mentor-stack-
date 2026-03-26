import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { CareerPath, CareerCategory } from '../types/index';
import { useUserData } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { CURRICULUM } from '../constants/curriculum';

const categories: CareerCategory[] = [
  'Core Software Development',
  'Data & AI',
  'Security',
  'Infrastructure & Systems',
  'Specialized Development',
  'Product & Design',
  'Emerging High-Income Skills'
];

const IconComponent = ({ name }: { name?: string }) => {
  const Icon = (Icons as any)[name || 'HelpCircle'] || Icons.HelpCircle;
  return <Icon size={24} />;
};

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

  const allPaths = Object.values(CURRICULUM);

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

      <div className="w-full max-w-7xl relative z-10 mb-32 space-y-24">
        {categories.map((category) => (
          <div key={category} className="space-y-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tight text-white/90">{category}</h2>
              <div className="h-px flex-grow bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allPaths.filter(p => p.category === category).map((path, i) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card 
                    onClick={() => path.status !== 'locked' && setSelected(path.title as CareerPath)}
                    className={`h-full flex flex-col p-10 relative group transition-all duration-500 ${
                      path.status === 'locked' ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'
                    } ${
                      selected === path.title 
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
                    {path.status === 'locked' && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-white/10 text-white/40 border-white/10 font-black">Coming Soon</Badge>
                      </div>
                    )}
                    {path.status === 'partial' && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-black">Partial Content</Badge>
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 ${
                      selected === path.title 
                        ? 'bg-emerald-500 text-black shadow-2xl shadow-emerald-500/40 scale-110' 
                        : 'bg-white/[0.05] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white/60'
                    }`}>
                      <IconComponent name={path.icon} />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-2xl font-bold transition-colors duration-500 ${selected === path.title ? 'text-emerald-400' : 'text-white'}`}>
                        {path.title}
                      </h3>
                    </div>
                    <p className="text-base text-white/30 leading-relaxed mb-10 flex-grow font-medium">
                      {path.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {path.skills?.map(skill => (
                        <Badge 
                          key={skill} 
                          className={`transition-colors duration-500 ${
                            selected === path.title 
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
          </div>
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
