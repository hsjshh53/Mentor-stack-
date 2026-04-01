import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { ArrowLeft, Rocket, Star, Clock, CheckCircle2, Github, Globe, Code2 } from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-12 space-y-12">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-black text-sm uppercase tracking-widest">
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      <div className="flex items-start justify-between">
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Rocket size={32} />
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">Personal <span className="text-emerald-400">Portfolio</span></h1>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400">Beginner</Badge>
                <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                  <Clock size={14} />
                  4h Estimated
                </div>
              </div>
            </div>
          </div>
          <p className="text-white/60 text-xl leading-relaxed">
            Build a stunning personal portfolio website to showcase your work and skills. You'll learn how to use React for component-based UI, Tailwind CSS for modern styling, and Framer Motion for smooth animations.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="px-12 py-6 text-xl flex items-center gap-3 shadow-lg shadow-emerald-500/20">
            <Rocket size={24} />
            Start Project
          </Button>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-4 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
              <Github size={18} />
              View Source
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-4 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
              <Globe size={18} />
              Live Demo
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter">Project <span className="text-emerald-400">Requirements</span></h2>
            <div className="grid grid-cols-2 gap-4">
              {['Responsive Design', 'Dark Mode Support', 'Project Showcase Grid', 'Contact Form', 'Smooth Transitions', 'SEO Optimized'].map((req, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-medium text-white/80">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter">Tech <span className="text-emerald-400">Stack</span></h2>
            <div className="flex flex-wrap gap-3">
              {['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Lucide React', 'GitHub Pages'].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest text-white/60">
                  <Code2 size={14} />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-8 space-y-6 bg-emerald-500/5 border-emerald-500/10">
            <h3 className="text-xl font-black tracking-tighter">Learning <span className="text-emerald-400">Outcomes</span></h3>
            <ul className="space-y-4">
              {[
                'Master React component architecture',
                'Advanced Tailwind CSS utility patterns',
                'Implementing motion and animations',
                'Responsive design best practices',
                'Deployment and hosting fundamentals'
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
