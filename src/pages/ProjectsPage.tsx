import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, Code2, Layout, Database, 
  Zap, X, ChevronRight, ArrowLeft,
  Search, Filter, Plus, Star,
  ExternalLink, Github, Clock
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { useUserData } from '../hooks/useUserData';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useUserData();

  if (loading) return <LoadingScreen />;

  const projects = [
    { 
      title: 'Personal Portfolio', 
      desc: 'Build a stunning portfolio to showcase your work and skills.',
      tag: 'FRONTEND',
      difficulty: 'Beginner',
      duration: '2-3 Days',
      skills: ['HTML', 'CSS', 'React'],
      image: 'https://picsum.photos/seed/portfolio/800/600'
    },
    { 
      title: 'Task Manager API', 
      desc: 'Create a robust REST API for managing tasks and user auth.',
      tag: 'BACKEND',
      difficulty: 'Intermediate',
      duration: '5-7 Days',
      skills: ['Node.js', 'Express', 'Firebase'],
      image: 'https://picsum.photos/seed/api/800/600'
    },
    { 
      title: 'E-commerce App', 
      desc: 'A full-stack shopping experience with cart and checkout.',
      tag: 'FULL-STACK',
      difficulty: 'Advanced',
      duration: '14-21 Days',
      skills: ['React', 'Node.js', 'Stripe'],
      image: 'https://picsum.photos/seed/ecommerce/800/600'
    }
  ];

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
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40">
            <Search size={20} />
          </button>
          <Button className="h-10 px-6 text-xs shadow-lg shadow-emerald-500/20">
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
            {['All Projects', 'Frontend', 'Backend', 'Full-Stack', 'Mobile'].map((filter, i) => (
              <button 
                key={i}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <Card key={i} className="p-0 overflow-hidden group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-black border-none px-3 py-1 rounded-lg font-black">{project.tag}</Badge>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{project.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-emerald-500" />
                      {project.difficulty}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-indigo-500" />
                      {project.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <Badge key={skill} className="bg-white/5 border-white/10 text-white/40">{skill}</Badge>
                    ))}
                  </div>

                  <Button variant="outline" fullWidth className="h-14 rounded-2xl border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all">
                    Start Project
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};
