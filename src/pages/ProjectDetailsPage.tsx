import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Zap, Clock, Target, 
  CheckCircle2, ChevronRight, Info, 
  Lightbulb, AlertTriangle, Play,
  Trophy, Sparkles, Award, Code2,
  Layout, Database, Terminal
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { DETAILED_PROJECTS } from '../constants/projects';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { LoadingScreen } from '../components/LoadingScreen';
import { DetailedProject, UserProjectProgress, ProjectPhase } from '../types';

export const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addXP } = useUserData();
  
  const [project, setProject] = useState<DetailedProject | null>(null);
  const [progress, setProgress] = useState<UserProjectProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState<ProjectPhase | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!projectId || !user) return;
      
      const foundProject = DETAILED_PROJECTS.find(p => p.id === projectId);
      if (!foundProject) {
        setLoading(false);
        return;
      }
      
      setProject(foundProject);
      
      const userProgress = await projectService.getProjectProgress(user.uid, projectId);
      setProgress(userProgress);
      
      if (userProgress && userProgress.status === 'in_progress') {
        const phase = foundProject.phases.find(p => p.id === userProgress.currentPhaseId);
        setActivePhase(phase || foundProject.phases[0]);
      }
      
      setLoading(false);
    };

    loadData();
  }, [projectId, user]);

  const handleStartProject = async () => {
    if (!user || !project) return;
    
    const initialPhase = project.phases[0];
    const newProgress = await projectService.startProject(user.uid, project.id, initialPhase.id);
    setProgress(newProgress);
    setActivePhase(initialPhase);
    
    // Navigate to playground
    navigate(`/playground/${project.id}`);
  };

  const handleCompletePhase = async (phaseId: string) => {
    if (!user || !project || !progress) return;
    
    await projectService.updatePhaseProgress(user.uid, project.id, phaseId, true);
    
    const currentIndex = project.phases.findIndex(p => p.id === phaseId);
    const nextPhase = project.phases[currentIndex + 1];
    
    if (nextPhase) {
      await projectService.updateCurrentPhase(user.uid, project.id, nextPhase.id);
      setActivePhase(nextPhase);
      setProgress(prev => prev ? {
        ...prev,
        currentPhaseId: nextPhase.id,
        completedPhases: [...prev.completedPhases, phaseId]
      } : null);
    } else {
      // All phases complete
      await projectService.completeProject(user.uid, project.id);
      await addXP(project.xpReward);
      setProgress(prev => prev ? {
        ...prev,
        status: 'completed',
        completedPhases: [...prev.completedPhases, phaseId],
        completedAt: Date.now()
      } : null);
    }
  };

  const handleToggleCheckpoint = async (checkpointId: string) => {
    if (!user || !project || !progress) return;
    
    const isCompleted = progress.completedCheckpoints.includes(checkpointId);
    await projectService.updateCheckpointProgress(user.uid, project.id, checkpointId, !isCompleted);
    
    setProgress(prev => {
      if (!prev) return null;
      const newCheckpoints = isCompleted 
        ? prev.completedCheckpoints.filter(id => id !== checkpointId)
        : [...prev.completedCheckpoints, checkpointId];
      
      return { ...prev, completedCheckpoints: newCheckpoints };
    });

    if (!isCompleted) {
      const checkpoint = project.checkpoints.find(cp => cp.id === checkpointId);
      if (checkpoint) await addXP(checkpoint.xpReward);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!project) return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
      <p className="text-white/40 mb-8">The project you are looking for does not exist or has been moved.</p>
      <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
    </div>
  );

  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/projects')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg tracking-tight">{project.title}</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{project.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            {project.difficulty}
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
          
          {/* Overview Section (Visible if not started or completed) */}
          {(!isInProgress || isCompleted) && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">Project Overview</h2>
                    <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="p-6 bg-white/[0.02] border-white/5">
                      <Zap size={20} className="text-emerald-500 mb-3" />
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Reward</div>
                      <div className="text-xl font-bold">{project.xpReward} XP</div>
                    </Card>
                    <Card className="p-6 bg-white/[0.02] border-white/5">
                      <Clock size={20} className="text-indigo-500 mb-3" />
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Est. Time</div>
                      <div className="text-xl font-bold">{project.estimatedTime}</div>
                    </Card>
                    <Card className="p-6 bg-white/[0.02] border-white/5">
                      <Target size={20} className="text-rose-500 mb-3" />
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Type</div>
                      <div className="text-xl font-bold">{project.isCapstone ? 'Capstone' : 'Standard'}</div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">What you'll build</h3>
                    <p className="text-white/40 leading-relaxed">{project.expectedOutcome}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Skills you'll use</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} className="bg-white/5 text-white/60 border-white/10">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 sticky top-24">
                    <h3 className="text-xl font-bold mb-6">Ready to start?</h3>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Prerequisites</div>
                        <ul className="space-y-2">
                          {project.prerequisites.map((p) => (
                            <li key={p} className="flex gap-2 text-sm text-white/60">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {isCompleted ? (
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-center font-bold">
                            Project Completed!
                          </div>
                          <Button fullWidth variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                        </div>
                      ) : isInProgress ? (
                        <div className="space-y-4">
                          <Button 
                            fullWidth 
                            onClick={() => navigate(`/playground/${project.id}`)} 
                            className="h-16 text-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold"
                          >
                            Open in Playground
                            <Code2 size={20} className="ml-2" />
                          </Button>
                          <Button fullWidth variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                        </div>
                      ) : (
                        <Button fullWidth onClick={handleStartProject} className="h-16 text-lg">
                          Start Project
                          <Play size={20} className="ml-2" />
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-black tracking-tight">Project Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.phases.map((phase, i) => (
                    <Card key={phase.id} className="p-8 bg-white/[0.02] border-white/5 relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-white/[0.03] font-black text-8xl italic select-none">
                        {i + 1}
                      </div>
                      <h4 className="text-lg font-bold mb-2 relative z-10">{phase.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed relative z-10">{phase.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Workflow Section (Visible if in progress) */}
          {isInProgress && !isCompleted && activePhase && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3 space-y-4">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 ml-2">Phases</div>
                {project.phases.map((phase, i) => {
                  const isPhaseCompleted = progress.completedPhases.includes(phase.id);
                  const isPhaseActive = activePhase.id === phase.id;
                  
                  return (
                    <button 
                      key={phase.id}
                      onClick={() => setActivePhase(phase)}
                      className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                        isPhaseActive 
                          ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                          : isPhaseCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                          isPhaseActive ? 'bg-black text-white' : 'bg-white/10'
                        }`}>
                          {i + 1}
                        </div>
                        <span className="text-xs font-bold">{phase.title}</span>
                      </div>
                      {isPhaseCompleted && <CheckCircle2 size={16} />}
                    </button>
                  );
                })}

                <div className="pt-8">
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 ml-2">Checkpoints</div>
                  <div className="space-y-3">
                    {project.checkpoints.map(cp => {
                      const isCpCompleted = progress.completedCheckpoints.includes(cp.id);
                      return (
                        <button 
                          key={cp.id}
                          onClick={() => handleToggleCheckpoint(cp.id)}
                          className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
                            isCpCompleted 
                              ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                              : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Trophy size={16} className={isCpCompleted ? 'text-indigo-400' : 'text-white/20'} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{cp.title}</span>
                          </div>
                          {isCpCompleted ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-white/10" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-emerald-500 text-black border-none">Active Phase</Badge>
                    <h2 className="text-4xl font-black tracking-tight">{activePhase.title}</h2>
                  </div>
                  <p className="text-xl text-white/60 leading-relaxed">{activePhase.description}</p>
                </div>

                <Card className="p-8 bg-white/[0.02] border-white/5 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Info size={20} />
                      <h3 className="font-bold uppercase tracking-widest text-xs">The Mentor's Guide</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed">{activePhase.explanation}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">What to do</h4>
                      <ul className="space-y-3">
                        {activePhase.tasks.map((task) => (
                          <li key={task} className="flex gap-3 text-sm text-white/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Checklist</h4>
                      <div className="space-y-3">
                        {activePhase.checklist.map((item) => (
                          <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/40">
                            <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center">
                              <CheckCircle2 size={12} className="opacity-0" />
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-8 bg-indigo-500/5 border-indigo-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Lightbulb size={20} />
                      <h3 className="font-bold uppercase tracking-widest text-xs">Mentor Tips</h3>
                    </div>
                    <ul className="space-y-3">
                      {activePhase.hints.map((hint) => (
                        <li key={hint} className="text-sm text-white/60 italic">"{hint}"</li>
                      ))}
                    </ul>
                  </Card>
                  <Card className="p-8 bg-rose-500/5 border-rose-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertTriangle size={20} />
                      <h3 className="font-bold uppercase tracking-widest text-xs">Common Pitfalls</h3>
                    </div>
                    <ul className="space-y-3">
                      {activePhase.commonMistakes.map((mistake) => (
                        <li key={mistake} className="text-sm text-white/60">• {mistake}</li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Phase Challenge</h3>
                      <p className="text-sm text-white/40">{activePhase.miniChallenge}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <Trophy size={24} />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="text-sm text-white/40">
                      <span className="text-emerald-500 font-bold">Next:</span> {activePhase.nextStep}
                    </div>
                    <Button 
                      onClick={() => handleCompletePhase(activePhase.id)}
                      className="px-8"
                    >
                      Complete Phase
                      <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Completion Modal */}
      <AnimatePresence>
        {isCompleted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
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
                  <Award size={64} />
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <h2 className="text-5xl font-black tracking-tighter">Project Mastered!</h2>
                <p className="text-white/60 text-xl font-medium">
                  You've successfully built the <span className="text-emerald-400 font-bold">{project.title}</span>. Your skills are growing!
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-500 font-black text-2xl">
                  <Zap size={24} />
                  +{project.xpReward} XP
                </div>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <Button 
                  onClick={() => navigate('/projects')}
                  className="h-20 rounded-[2rem] text-xl font-black tracking-tight shadow-2xl shadow-emerald-500/40"
                >
                  Back to Projects
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
