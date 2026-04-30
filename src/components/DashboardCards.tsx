import React from 'react';
import { motion } from 'motion/react';
import { Card, Badge, Button } from './ui';
import { Play, Clock, Sparkles, Star, Target, BookOpen, ChevronRight, Zap, Trophy, Code, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LessonCard = ({ lesson, locked }: { lesson: any, locked?: boolean }) => {
  const navigate = useNavigate();
  return (
    <Card 
      onClick={() => !locked && navigate(`/lesson/${lesson.id || lesson.lessonId}`)}
      className={`w-72 h-[380px] p-6 glass-premium border-white/5 active:scale-95 transition-all group overflow-hidden flex flex-col justify-between ${locked ? 'bg-white/[0.01] opacity-50 cursor-not-allowed grayscale' : 'bg-white/[0.02] cursor-pointer hover:border-emerald-500/30'}`}
    >
      <div className="space-y-4">
        <div className={`w-full h-32 rounded-2xl border border-white/10 flex items-center justify-center transition-all ${locked ? 'bg-white/5 text-white/5' : 'bg-white/5 text-white/10 group-hover:bg-emerald-500/10 group-hover:text-emerald-500'}`}>
          {locked ? <Lock size={48} /> : <BookOpen size={48} />}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] font-black uppercase tracking-widest">{lesson.difficulty || 'Beginner'}</Badge>
            {locked && (
              <Badge className="bg-white/5 text-white/20 border-white/10 text-[8px] font-black uppercase tracking-widest">
                <Lock size={8} className="mr-1" /> Locked
              </Badge>
            )}
            {!locked && lesson.qualityScore && (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[8px] font-black uppercase tracking-widest">
                <Star size={8} className="mr-1" /> High ROI
              </Badge>
            )}
          </div>
          <h4 className="font-black text-lg tracking-tighter leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase">
            {lesson.title}
          </h4>
          <p className="text-white/30 text-xs font-medium line-clamp-3 leading-relaxed">
            {locked ? "Complete previous lessons to unlock this component." : (lesson.objective || lesson.summary || "Master professional engineering concepts with hands-on practice.")}
          </p>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/20">
          <Clock size={12} />
          <span className="text-[10px] font-black uppercase tracking-widest">{lesson.estimatedDuration || lesson.estimatedMinutes ? `${lesson.estimatedMinutes} mins` : '15 mins'}</span>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${locked ? 'bg-white/5 text-white/10' : 'bg-white/5 text-white/40 group-hover:bg-emerald-500 group-hover:text-black'}`}>
          {locked ? <Lock size={14} /> : <Play size={14} fill="currentColor" />}
        </div>
      </div>
    </Card>
  );
};

export const PathCard = ({ path }: { path: any }) => {
  const navigate = useNavigate();
  return (
    <Card 
      onClick={() => navigate(`/academy/${path.title}`)}
      className="w-80 h-[420px] p-8 glass-premium bg-gradient-to-br from-indigo-500/5 to-transparent border-white/5 active:scale-95 transition-all group cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
          <Target size={40} />
        </div>
        <div className="space-y-3">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[8px] font-black uppercase tracking-[0.2em]">{path.category || 'Career Path'}</Badge>
          <h4 className="font-black text-2xl tracking-tighter leading-[0.9] uppercase group-hover:text-indigo-300 transition-colors">
            {path.title}
          </h4>
          <p className="text-white/30 text-sm font-medium line-clamp-3 leading-relaxed">
            {path.description || "A complete professional transformation program."}
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Duration</span>
          <span className="text-xs font-black text-white/40">{path.estimatedWeeks || 12} Weeks</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Status</span>
          <span className="text-xs font-black text-emerald-500">Live Track</span>
        </div>
      </div>
    </Card>
  );
};

export const ProjectCard = ({ project }: { project: any }) => {
  const navigate = useNavigate();
  return (
    <Card 
      onClick={() => navigate(`/projects/${project.id}`)}
      className="w-80 h-[300px] p-8 glass-premium bg-white/[0.01] border-white/5 active:scale-95 transition-all group cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-amber-400 transition-all">
            <Code size={24} />
          </div>
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[8px] font-black uppercase tracking-widest">{project.difficulty || 'Intermediate'}</Badge>
        </div>
        <div className="space-y-2">
          <h4 className="font-black text-xl tracking-tighter uppercase group-hover:text-amber-300 transition-colors">{project.title}</h4>
          <p className="text-white/30 text-xs font-medium line-clamp-2 leading-relaxed">{project.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
        <span className="flex items-center gap-2"><Zap size={12} className="text-amber-500" /> +{project.xpReward || 500} XP</span>
        <span className="group-hover:text-white transition-colors flex items-center gap-1">Build Now <ChevronRight size={12} /></span>
      </div>
    </Card>
  );
};

export const QuizCard = ({ quiz }: { quiz: any }) => {
  const navigate = useNavigate();
  return (
    <Card 
      onClick={() => navigate(`/lesson/${quiz.lessonId}`)}
      className="w-64 h-[200px] p-6 glass-premium bg-rose-500/[0.02] border-white/5 active:scale-95 transition-all group cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
            <Sparkles size={16} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Knowledge Check</span>
        </div>
        <h4 className="font-black text-sm tracking-tight leading-tight group-hover:text-rose-400 transition-colors line-clamp-3 uppercase">
          {quiz.lessonId.replace(/-/g, ' ')}
        </h4>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{quiz.questions?.length || 5} Qs</span>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-rose-500 group-hover:text-white transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </Card>
  );
};
