import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, Code2, Layout, Database, 
  Zap, X, ChevronRight, ArrowLeft,
  Search, Filter, Plus, Star,
  ExternalLink, Github, Clock, CheckCircle2,
  Trophy, Award, Sparkles
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { useUserData } from '../hooks/useUserData';
import { PROJECTS } from '../constants/curriculum';
import { checkCertificateEligibility, generateCertificate } from '../services/certificateService';
import { useAuth } from '../context/AuthContext';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, loading, updateProgress, addXP } = useUserData();
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [earnedCertificate, setEarnedCertificate] = useState<any>(null);

  if (loading || !progress) return <LoadingScreen />;

  const handleCompleteProject = async (projectId: string) => {
    if (!progress.completedProjects?.includes(projectId)) {
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) return;

      const newCompletedProjects = [...(progress.completedProjects || []), projectId];
      await updateProgress({ completedProjects: newCompletedProjects });
      await addXP(project.xpReward);

      // Check for certificate eligibility
      if (progress.selectedPath) {
        const isEligible = checkCertificateEligibility({
          ...progress,
          completedProjects: newCompletedProjects
        }, progress.selectedPath);

        if (isEligible) {
          const cert = await generateCertificate(
            user!.uid,
            user!.displayName || 'Learner',
            progress.selectedPath,
            95, // Mock score for now
            project.title
          );
          setEarnedCertificate(cert);
          setIsSuccessModalOpen(true);
        }
      }
      
      setSelectedProject(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-lg tracking-tight">Projects</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 active:scale-90"
          >
            <Search size={20} />
          </button>
          <Button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
            className="h-10 px-6 text-xs shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus size={16} className="mr-2" />
            New Project
          </Button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight">Build Real Projects</h1>
            <p className="text-white/40 max-w-2xl text-lg leading-relaxed">Apply your knowledge and build a professional portfolio that gets you hired. Every project is designed to challenge you and teach you real-world skills.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {['All Projects', 'Frontend', 'Backend', 'Full-Stack'].map((filter, i) => (
              <button 
                key={i}
                onClick={() => {}} // Placeholder for actual filtering logic
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${i === 0 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => {
              const isCompleted = progress.completedProjects?.includes(project.id);
              return (
                <Card key={i} className="p-0 overflow-hidden group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative">
                  {isCompleted && (
                    <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-black p-2 rounded-full shadow-lg">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${project.id}/800/600`} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-500 text-black border-none px-3 py-1 rounded-lg font-black uppercase text-[10px] tracking-widest">{project.path}</Badge>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-emerald-500" />
                        {project.xpReward} XP
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-indigo-500" />
                        Capstone
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedProject(project)}
                      variant={isCompleted ? "outline" : "primary"} 
                      fullWidth 
                      className={`h-14 rounded-2xl transition-all ${isCompleted ? 'border-emerald-500/20 text-emerald-500' : ''}`}
                    >
                      {isCompleted ? 'View Details' : 'Start Project'}
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0A0A0B] border border-white/[0.08] rounded-[3rem] p-12 overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{selectedProject.path}</Badge>
                  <h2 className="text-4xl font-black tracking-tighter">{selectedProject.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-3 hover:bg-white/5 rounded-2xl transition-all"
                >
                  <X size={24} className="text-white/40" />
                </button>
              </div>

              <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Objective</h4>
                  <p className="text-white/60 leading-relaxed">{selectedProject.objective}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Implementation Steps</h4>
                  <div className="space-y-3">
                    {selectedProject.steps.map((step, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xs shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm text-white/60">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Expected Output</h4>
                  <p className="text-sm text-white/40 italic">{selectedProject.output}</p>
                </div>
              </div>

              <div className="mt-12">
                {progress.completedProjects?.includes(selectedProject.id) ? (
                  <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-black uppercase tracking-widest text-sm">
                    <CheckCircle2 size={20} />
                    Project Completed
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleCompleteProject(selectedProject.id)}
                    fullWidth 
                    className="h-16 rounded-2xl text-lg font-black tracking-tight"
                  >
                    Submit Project & Complete
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && earnedCertificate && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-xl text-center space-y-10"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center opacity-20"
                >
                  <Sparkles size={300} className="text-emerald-500" />
                </motion.div>
                <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-black mx-auto relative z-10 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                  <Trophy size={64} />
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <h2 className="text-5xl font-black tracking-tighter">Congratulations!</h2>
                <p className="text-white/60 text-xl font-medium">
                  You've just unlocked your <span className="text-emerald-400 font-bold">{earnedCertificate.pathName}</span> Professional Certificate.
                </p>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <Button 
                  onClick={() => navigate(`/certificate/${earnedCertificate.id}`)}
                  className="h-20 rounded-[2rem] text-xl font-black tracking-tight shadow-2xl shadow-emerald-500/40"
                >
                  View Certificate
                  <Award size={24} className="ml-3" />
                </Button>
                <button 
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="text-white/40 font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-colors"
                >
                  Close and Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
