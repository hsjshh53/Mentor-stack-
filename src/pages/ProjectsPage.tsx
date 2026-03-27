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
import { DETAILED_PROJECTS } from '../constants/projects';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { UserProjectProgress } from '../types';
import { useEffect } from 'react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, loading } = useUserData();
  const [userProjects, setUserProjects] = useState<Record<string, UserProjectProgress>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Projects');

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
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-all w-64"
            />
          </div>
          <Button 
            onClick={() => navigate('/ai-tutor')}
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
            {['All Projects', 'Frontend', 'Backend', 'Full-Stack'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${activeFilter === filter ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
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
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="p-0 overflow-hidden group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative"
                >
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
                      <Badge className="bg-emerald-500 text-black border-none px-3 py-1 rounded-lg font-black uppercase text-[10px] tracking-widest">{project.category}</Badge>
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
                        <Star size={12} className={project.isCapstone ? "text-yellow-500" : "text-white/20"} />
                        {project.isCapstone ? 'Capstone' : 'Standard'}
                      </div>
                    </div>

                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                      variant={isCompleted ? "outline" : "primary"} 
                      fullWidth 
                      className={`h-14 rounded-2xl transition-all ${isCompleted ? 'border-emerald-500/20 text-emerald-500' : ''}`}
                    >
                      {isCompleted ? 'View Completed Project' : isInProgress ? 'Resume Project' : 'Start Project'}
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
