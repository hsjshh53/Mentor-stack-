import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { FolderPlus, Search, Filter, Rocket, Star, Clock } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const projects = [
    { id: 'p1', title: 'Personal Portfolio', description: 'Build a modern portfolio using React and Tailwind CSS.', difficulty: 'Beginner', time: '4h', stars: 12 },
    { id: 'p2', title: 'Task Manager API', description: 'Create a robust REST API with Node.js and Express.', difficulty: 'Intermediate', time: '8h', stars: 24 },
    { id: 'p3', title: 'E-commerce App', description: 'Full-stack e-commerce platform with Stripe integration.', difficulty: 'Advanced', time: '24h', stars: 48 }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-12 space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">Real-World <span className="text-emerald-400">Projects</span></h1>
          <p className="text-white/40 text-lg font-medium">Apply your skills to build production-ready applications.</p>
        </div>
        <Button className="px-8 py-4 text-lg flex items-center gap-3 shadow-lg shadow-emerald-500/20">
          <FolderPlus size={20} />
          Create Project
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {projects.map(project => (
          <Card key={project.id} className="p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Rocket size={24} />
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                  <Star size={14} fill="currentColor" />
                  {project.stars}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter group-hover:text-emerald-400 transition-all">{project.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-8">
              <Badge className="bg-white/5 border-white/10 text-white/60">{project.difficulty}</Badge>
              <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                <Clock size={14} />
                {project.time}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
