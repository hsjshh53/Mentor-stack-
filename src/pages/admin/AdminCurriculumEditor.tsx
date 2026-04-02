import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Save, Plus, Trash2, Edit3, 
  GripVertical, CheckCircle2, Clock, AlertCircle,
  Layout, BookOpen, Target, Zap, Settings,
  ChevronDown, ChevronUp, MoreVertical, X
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
import { CURRICULUM } from '../../constants/curriculum';
import { getCurriculum, saveCurriculum } from '../../services/curriculumService';
import { PathCurriculum, Module } from '../../types';

export const AdminCurriculumEditor: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [curriculum, setCurriculum] = useState<PathCurriculum | null>(null);
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<{moduleId: string, lessonId: string} | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      if (!skillId) return;
      
      try {
        // Find the skill in static curriculum
        const staticSkill = Object.values(CURRICULUM).find(p => p.id === skillId || p.title.toLowerCase().replace(/\s+/g, '-') === skillId);
        
        if (!staticSkill) {
          navigate('/admin/curriculum');
          return;
        }

        // Check for overrides in Firebase
        const firebaseData = await getCurriculum(skillId);
        
        if (firebaseData) {
          setCurriculum(firebaseData);
        } else {
          setCurriculum(staticSkill as PathCurriculum);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching curriculum:', error);
        setLoading(false);
      }
    };

    fetchCurriculumData();
  }, [skillId, navigate]);

  const handleSave = async () => {
    if (!curriculum || !skillId) return;
    setSaving(true);
    try {
      await saveCurriculum(skillId, curriculum);
      setSaving(false);
    } catch (error) {
      console.error('Error saving curriculum:', error);
      setSaving(false);
    }
  };

  const addModule = () => {
    if (!curriculum) return;
    const newModule: Module = {
      id: `mod-${Date.now()}`,
      title: 'New Module',
      description: 'Module description goes here',
      lessons: []
    };
    
    const updatedCurriculum = { ...curriculum };
    updatedCurriculum.levels[activeLevel].modules.push(newModule);
    setCurriculum(updatedCurriculum);
    setEditingModule(newModule.id);
  };

  const deleteModule = (moduleId: string) => {
    if (!curriculum) return;
    const updatedCurriculum = { ...curriculum };
    updatedCurriculum.levels[activeLevel].modules = updatedCurriculum.levels[activeLevel].modules.filter(m => m.id !== moduleId);
    setCurriculum(updatedCurriculum);
  };

  const addLesson = (moduleId: string) => {
    if (!curriculum) return;
    const updatedCurriculum = { ...curriculum };
    const module = updatedCurriculum.levels[activeLevel].modules.find(m => m.id === moduleId);
    if (module) {
      const newLessonId = `lesson-${Date.now()}`;
      module.lessons.push(newLessonId);
      setCurriculum(updatedCurriculum);
      setEditingLesson({ moduleId, lessonId: newLessonId });
    }
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    if (!curriculum) return;
    const updatedCurriculum = { ...curriculum };
    const module = updatedCurriculum.levels[activeLevel].modules.find(m => m.id === moduleId);
    if (module) {
      module.lessons = module.lessons.filter(id => id !== lessonId);
      setCurriculum(updatedCurriculum);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin text-emerald-500">
          <Zap size={40} />
        </div>
      </div>
    );
  }

  if (!curriculum) return null;

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/curriculum')}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-black tracking-tight">{curriculum.title}</h2>
            <p className="text-sm text-white/30 font-medium">Curriculum Editor & Structure Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-12 px-6 rounded-xl font-black tracking-tight text-xs gap-2 border-white/10"
            onClick={() => navigate('/admin/generator')}
          >
            <Zap size={14} />
            Auto-Generate
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="h-12 px-8 rounded-xl font-black tracking-tight text-xs gap-2 shadow-xl shadow-emerald-500/20"
          >
            {saving ? <Clock className="animate-spin" size={14} /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-2xl w-fit">
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeLevel === level 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Level Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white/[0.02] border-white/[0.05] space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Modules</p>
          <p className="text-2xl font-black">{curriculum.levels[activeLevel].modules.length}</p>
        </Card>
        <Card className="p-6 bg-white/[0.02] border-white/[0.05] space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Total Lessons</p>
          <p className="text-2xl font-black">
            {curriculum.levels[activeLevel].modules.reduce((acc, m) => acc + m.lessons.length, 0)}
          </p>
        </Card>
        <Card className="p-6 bg-white/[0.02] border-white/[0.05] space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Target Progress</p>
          <p className="text-2xl font-black text-emerald-500">
            {Math.round((curriculum.levels[activeLevel].modules.reduce((acc, m) => acc + m.lessons.length, 0) / 40) * 100)}%
          </p>
        </Card>
        <Card className="p-6 bg-white/[0.02] border-white/[0.05] space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Status</p>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            {curriculum.status.toUpperCase()}
          </Badge>
        </Card>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
            <Layout className="text-emerald-500" size={24} />
            Modules & Lessons
          </h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest gap-2 border-white/10"
            onClick={addModule}
          >
            <Plus size={14} />
            Add Module
          </Button>
        </div>

        <div className="space-y-4">
          {curriculum.levels[activeLevel].modules.map((module, index) => (
            <Card key={module.id} className="overflow-hidden bg-white/[0.02] border-white/[0.05]">
              <div className="p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4 flex-grow">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 cursor-grab active:cursor-grabbing">
                    <GripVertical size={16} />
                  </div>
                  {editingModule === module.id ? (
                    <div className="flex items-center gap-3 flex-grow max-w-md">
                      <input 
                        autoFocus
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-bold w-full focus:outline-none focus:border-emerald-500/50"
                        value={module.title}
                        onChange={(e) => {
                          const updated = { ...curriculum };
                          updated.levels[activeLevel].modules[index].title = e.target.value;
                          setCurriculum(updated);
                        }}
                        onBlur={() => setEditingModule(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingModule(null)}
                      />
                      <button onClick={() => setEditingModule(null)} className="text-emerald-500"><CheckCircle2 size={18} /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg">{module.title}</h4>
                      <button 
                        onClick={() => setEditingModule(module.id)}
                        className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-emerald-500 transition-all"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                  <Badge className="bg-white/5 text-white/40 border-white/10">
                    {module.lessons.length} Lessons
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 px-3 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 border-white/10"
                    onClick={() => addLesson(module.id)}
                  >
                    <Plus size={12} />
                    Add Lesson
                  </Button>
                  <button 
                    onClick={() => deleteModule(module.id)}
                    className="w-9 h-9 rounded-lg bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Lessons List */}
              <div className="px-6 pb-6 space-y-2">
                {module.lessons.map((lessonId, lIndex) => (
                  <div key={lessonId} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] group/lesson">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-white/10 w-4">{lIndex + 1}</span>
                      <div className="flex items-center gap-3">
                        {editingLesson?.lessonId === lessonId ? (
                          <div className="flex items-center gap-3 flex-grow max-w-sm">
                            <input 
                              autoFocus
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold w-full focus:outline-none focus:border-emerald-500/50"
                              value={lessonId}
                              onChange={(e) => {
                                const updated = { ...curriculum };
                                const mod = updated.levels[activeLevel].modules.find(m => m.id === module.id);
                                if (mod) mod.lessons[lIndex] = e.target.value;
                                setCurriculum(updated);
                              }}
                              onBlur={() => setEditingLesson(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingLesson(null)}
                            />
                            <button onClick={() => setEditingLesson(null)} className="text-emerald-500"><CheckCircle2 size={14} /></button>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm font-medium text-white/60">{lessonId}</span>
                            <button 
                              onClick={() => setEditingLesson({ moduleId: module.id, lessonId })}
                              className="opacity-0 group-hover/lesson:opacity-100 text-white/20 hover:text-emerald-500 transition-all"
                            >
                              <Edit3 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-emerald-500/5 text-emerald-500/40 text-[9px] border-emerald-500/10">PUBLISHED</Badge>
                      <button 
                        onClick={() => deleteLesson(module.id, lessonId)}
                        className="opacity-0 group-hover/lesson:opacity-100 text-red-500/40 hover:text-red-500 transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {module.lessons.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-white/[0.02] rounded-xl">
                    <p className="text-xs font-medium text-white/10 italic">No lessons in this module yet.</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
