import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Terminal, Layout, Palette, Zap, 
  ChevronRight, Search, Filter, ArrowLeft,
  Compass, Star, Clock, Award, BookOpen
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { Skill } from '../types';
import { DEFAULT_SKILLS } from '../constants/skills';
import { LoadingScreen } from '../components/LoadingScreen';

export const CodingLanguagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserData();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [allPaths, setAllPaths] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsRef = ref(db, 'skills');
        const pathsRef = ref(db, 'curriculum_paths');
        
        const [skillsSnapshot, pathsSnapshot] = await Promise.all([
          get(skillsRef),
          get(pathsRef)
        ]);

        let allSkills = DEFAULT_SKILLS;
        
        if (skillsSnapshot.exists()) {
          allSkills = Object.values(skillsSnapshot.val()) as Skill[];
        }
        
        if (pathsSnapshot.exists()) {
          setAllPaths(pathsSnapshot.val());
        }
        
        const languageSkills = allSkills.filter(s => s.category === 'coding-languages' && s.status === 'active');
        setSkills(languageSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const title = skill?.title || '';
      const description = skill?.description || '';
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          description.toLowerCase().includes(searchQuery.toLowerCase());
      const difficulty = skill?.difficultyRange || 'Intermediate';
      const matchesDifficulty = selectedDifficulty === 'All' || difficulty.includes(selectedDifficulty);
      return matchesSearch && matchesDifficulty;
    });
  }, [skills, searchQuery, selectedDifficulty]);

  const handleStartProgram = async (skill: Skill) => {
    await updateProgress({
      selectedPath: skill.title as any,
      activeProgramId: skill.id
    });
    navigate('/dashboard');
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-3 -ml-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={24} className="text-white/60" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Code size={20} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">Programming Languages</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow p-8 md:p-16 max-w-7xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Academy Programs</Badge>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Master the <span className="text-gradient">Languages</span> <br />
            of the Modern Web
          </h2>
          <p className="text-white/40 text-xl max-w-2xl font-medium leading-relaxed">
            Deep-dive into individual coding languages. From web foundations like HTML & CSS to powerful systems languages like Rust and Go.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/[0.02] border border-white/[0.05] p-6 rounded-[2rem]">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedDifficulty === diff 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill) => {
            const isActive = progress?.activeProgramId === skill.id;
            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={`p-8 space-y-8 group transition-all duration-500 border-white/[0.05] hover:border-emerald-500/30 relative overflow-hidden flex flex-col justify-between h-full ${
                  isActive ? 'bg-emerald-500/[0.03] border-emerald-500/20' : 'bg-white/[0.01]'
                }`}>
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'bg-emerald-500 text-black' : 'bg-white/[0.03] text-white/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-500'
                      }`}>
                        <Code size={32} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-white/5 text-white/40 border-white/10">{skill.difficultyRange}</Badge>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-white/20 uppercase tracking-widest">
                          <Clock size={12} />
                          {skill.estimatedCompletionTime}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-emerald-400 transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-3">
                        {skill.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skill.toolsCovered.slice(0, 3).map(tool => (
                        <span key={tool} className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-3 py-1 rounded-lg">
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Curriculum Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Duration</p>
                        <div className="flex items-center gap-1.5 text-emerald-500/60">
                          <Clock size={12} />
                          <span className="text-xs font-bold">{skill.estimatedWeeks} Weeks</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Curriculum</p>
                        <div className="flex items-center gap-1.5 text-emerald-500/60">
                          <BookOpen size={12} />
                          <span className="text-xs font-bold">
                            {allPaths[skill.id]?.totalModules || 0} Modules • {allPaths[skill.id]?.totalLessons || 0} Lessons
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 relative z-10">
                    <Button 
                      onClick={() => handleStartProgram(skill)}
                      variant={isActive ? 'outline' : 'primary'}
                      className={`w-full h-14 rounded-2xl font-black tracking-tight ${
                        isActive ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : ''
                      }`}
                    >
                      {isActive ? 'Currently Learning' : 'Start Program'}
                      <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none transform rotate-12 scale-150">
                    <Code size={120} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-white/10">
              <Search size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">No languages found</h3>
              <p className="text-white/40 font-medium">Try adjusting your search or filters.</p>
            </div>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedDifficulty('All'); }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
