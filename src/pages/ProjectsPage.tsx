import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, Code2, Layout, Database, 
  Zap, X, ChevronRight, ArrowLeft,
  Search, Filter, Plus, Star,
  ExternalLink, Github, Clock, CheckCircle2,
  Trophy, Award, Sparkles, Play, Send, Globe,
  BookOpen, ListChecks, Rocket
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { useUserData } from '../hooks/useUserData';
import { DETAILED_PROJECTS } from '../constants/projects';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { UserProjectProgress, DetailedProject, ProjectStarterCode } from '../types';
import { useEffect } from 'react';
import { ProjectPlayground } from '../components/ProjectPlayground';
import { ProjectSubmissionModal } from '../components/ProjectSubmissionModal';
import { PaywallModal } from '../components/PaywallModal';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, loading, submitProject, saveProjectDraft } = useUserData();
  const [userProjects, setUserProjects] = useState<Record<string, UserProjectProgress>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState<DetailedProject | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = projectService.subscribeToProjects(user.uid, (projects) => {
      setUserProjects(projects);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading || !progress) return <LoadingScreen />;

  const filteredProjects = DETAILED_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All Projects' || project.category.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const handleStartProject = async (project: DetailedProject) => {
    if (!user) return;
    if (!progress.isPremium && project.isPremium) {
      setShowPaywall(true);
      return;
    }
    await projectService.startProject(user.uid, project.id, project.phases[0].id);
    setSelectedProject(project);
  };

  const handleSubmit = async (githubLink: string, liveLink: string) => {
    if (!selectedProject) return;
    await submitProject(selectedProject.id, { githubLink, liveLink });
    setShowSubmission(false);
  };

  const handlePlaygroundSubmit = async (code: ProjectStarterCode) => {
    if (!selectedProject) return;
    setShowSubmission(true);
  };

  const handleSaveDraft = async (code: ProjectStarterCode) => {
    if (!selectedProject) return;
    await saveProjectDraft(selectedProject.id, code);
  };

  if (selectedProject) {
    const projectProgress = userProjects[selectedProject.id];
    const isCompleted = projectProgress?.status === 'completed';
    const submission = progress.submissions[selectedProject.id];
    const draft = projectProgress?.draft;

    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        {/* Detail Header */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedProject(null)}
              className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="font-black text-xl tracking-tighter uppercase">{selectedProject.title}</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                  {selectedProject.difficulty}
                </Badge>
                {selectedProject.isPremium && (
                  <Badge className="bg-amber-500 text-black border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest flex items-center gap-1">
                    <Sparkles size={8} fill="currentColor" />
                    PRO
                  </Badge>
                )}
                {isCompleted ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                    Completed
                  </Badge>
                ) : submission ? (
                  <Badge className="bg-blue-500/10 text-blue-500 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                    Submitted
                  </Badge>
                ) : draft ? (
                  <Badge className="bg-yellow-500/10 text-yellow-500 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                    Draft Saved
                  </Badge>
                ) : (
                  <Badge className="bg-white/10 text-white/40 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                    Not Started
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowPlayground(true)}
              variant="outline"
              className="h-10 px-4 text-[10px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5"
            >
              <Code2 size={16} className="mr-2" />
              Playground
            </Button>
            {!isCompleted ? (
              <Button 
                onClick={() => setShowSubmission(true)}
                className="h-10 px-4 text-[10px] font-black uppercase tracking-widest bg-[#F27D26] hover:bg-[#F27D26]/90"
              >
                <Send size={16} className="mr-2" />
                Submit
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {submission?.githubLink && (
                  <a 
                    href={submission.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {submission?.liveLink && (
                  <a 
                    href={submission.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Globe size={20} />
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
            {/* Project Banner */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10">
              <img 
                src={`https://picsum.photos/seed/${selectedProject.id}/1200/600`} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-lg text-white/80 leading-relaxed font-medium">{selectedProject.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Column: Content */}
              <div className="md:col-span-2 space-y-12">
                {/* Instructions */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F27D26]/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#F27D26]" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wider">Instructions</h2>
                  </div>
                  <div className="space-y-4">
                    {selectedProject.instructions.map((step, i) => (
                      <div key={step} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                        <span className="text-xl font-black text-white/10 group-hover:text-[#F27D26]/20 transition-colors">0{i + 1}</span>
                        <p className="text-sm text-white/60 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Expected Outcome */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wider">Expected Outcome</h2>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-sm text-white/60 leading-relaxed italic">"{selectedProject.expectedOutcome}"</p>
                  </div>
                </section>
              </div>

              {/* Right Column: Sidebar */}
              <div className="space-y-8">
                {/* Skills Section */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Skills Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skillsUsed.map((skill) => (
                      <Badge key={skill} className="bg-white/5 text-white/60 border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* Rewards Section */}
                <section className="p-6 rounded-2xl bg-[#F27D26]/5 border border-[#F27D26]/10 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F27D26]">Completion Reward</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F27D26]/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-[#F27D26]" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{selectedProject.xpReward}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Experience Points</p>
                    </div>
                  </div>
                </section>

                {/* Time Estimate */}
                <section className="flex items-center gap-3 text-white/40">
                  <Clock size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Est. Time: {selectedProject.estimatedTime}</span>
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <AnimatePresence>
          {showPlayground && (
            <ProjectPlayground 
              projectId={selectedProject.id}
              projectTitle={selectedProject.title}
              initialCode={draft || selectedProject.starterCode}
              onClose={() => setShowPlayground(false)} 
              onSave={handleSaveDraft}
              onSubmit={handlePlaygroundSubmit}
              lastSavedAt={projectProgress?.updatedAt}
            />
          )}
          {showSubmission && (
            <ProjectSubmissionModal
              projectId={selectedProject.id}
              projectTitle={selectedProject.title}
              onClose={() => setShowSubmission(false)}
              onSubmit={handleSubmit}
            />
          )}
        </AnimatePresence>
        <PaywallModal 
          isOpen={showPaywall} 
          onClose={() => setShowPaywall(false)}
          title="Unlock Premium Projects"
          description="Build real-world applications and create a portfolio that gets you hired with MentorStack Pro."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-lg tracking-tight uppercase">Projects</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:border-[#F27D26]/50 transition-all w-64"
            />
          </div>
          <Button 
            onClick={() => navigate('/ai-tutor')}
            className="h-10 px-6 text-[10px] font-black uppercase tracking-widest bg-[#F27D26] hover:bg-[#F27D26]/90 shadow-lg shadow-[#F27D26]/20"
          >
            <Sparkles size={16} className="mr-2" />
            AI Coach
          </Button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Build Real<br/>Software.</h1>
            <p className="text-white/40 max-w-2xl text-lg leading-relaxed uppercase tracking-widest font-medium">Apply your knowledge and build a professional portfolio that gets you hired.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {['All Projects', 'Frontend', 'Backend', 'Full-Stack'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${activeFilter === filter ? 'bg-white text-black shadow-xl' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const projectProgress = userProjects[project.id];
              const isCompleted = projectProgress?.status === 'completed';
              const isInProgress = projectProgress?.status === 'in_progress';

              return (
                <Card 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="p-0 overflow-hidden group border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative rounded-3xl"
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4 z-10 bg-green-500 text-black p-2 rounded-full shadow-lg">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${project.id}/800/600`} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/10 text-white border-none px-3 py-1 rounded-lg font-black uppercase text-[10px] tracking-widest backdrop-blur-md">{project.category}</Badge>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-2">
                            {project.isPremium && (
                              <Badge className="bg-amber-500 text-black border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest flex items-center gap-1">
                                <Sparkles size={8} fill="currentColor" />
                                PRO
                              </Badge>
                            )}
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] px-2 py-0.5 uppercase font-black tracking-widest">
                              {project.difficulty}
                            </Badge>
                          </div>
                          {isCompleted ? (
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Completed</span>
                          ) : progress.submissions[project.id] ? (
                            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Submitted</span>
                          ) : projectProgress?.draft ? (
                            <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest">Draft Saved</span>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2 uppercase tracking-widest font-medium">{project.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-emerald-400" />
                        {project.xpReward} XP
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        {project.estimatedTime}
                      </div>
                    </div>

                    {project.isPremium && !progress.isPremium ? (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/profile');
                        }}
                        variant="premium" 
                        fullWidth 
                        className="h-14 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]"
                      >
                        Unlock with Pro
                        <Sparkles size={18} className="ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInProgress || isCompleted) {
                            setSelectedProject(project);
                          } else {
                            handleStartProject(project);
                          }
                        }}
                        variant={isCompleted ? "outline" : "primary"} 
                        fullWidth 
                        className={`h-14 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] ${isCompleted ? 'border-emerald-500/20 text-emerald-500' : 'bg-white text-black hover:bg-white/90'}`}
                      >
                        {isCompleted ? 'View Submission' : isInProgress ? 'Resume Project' : 'Start Project'}
                        <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
