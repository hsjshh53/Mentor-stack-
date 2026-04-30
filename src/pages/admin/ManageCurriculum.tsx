import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Badge, Button, Modal, Input, Textarea, Select } from '../../components/ui';
import { 
  Map, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Edit2,
  Plus,
  Trash2,
  Calendar
} from 'lucide-react';
import { ref, onValue, get, update, push, remove, set } from 'firebase/database';
import { db } from '../../lib/firebase';
import { generateLessonsForModule } from '../../services/aiGeneratorService';
import { skillService } from '../../services/skillService';
import { motion, AnimatePresence } from 'motion/react';
import { CurriculumPath, CurriculumStage, CurriculumWeek, CurriculumModule, Skill } from '../../types';

export const ManageCurriculum: React.FC = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [path, setPath] = useState<CurriculumPath | null>(null);
  const [stages, setStages] = useState<CurriculumStage[]>([]);
  const [weeks, setWeeks] = useState<Record<string, CurriculumWeek[]>>({});
  const [modules, setModules] = useState<Record<string, CurriculumModule[]>>({});
  const [loading, setLoading] = useState(true);
  const [generatingModuleId, setGeneratingModuleId] = useState<string | null>(null);
  const [expandedStages, setExpandedStages] = useState<string[]>([]);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [lessonCounts, setLessonCounts] = useState<Record<string, number>>({});
  const [allLessons, setAllLessons] = useState<any[]>([]);

  // Modal States
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const savedSkillId = localStorage.getItem('lastSelectedSkillId');
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      console.log("[ManageCurriculum] SKILLS SNAPSHOT:", snapshot.val());
      try {
        if (snapshot.exists()) {
          const data = snapshot.val() || {};
          const skillsData = Object.values(data) as Skill[];
          setSkills(skillsData);
          if (savedSkillId) {
            const skill = skillsData.find(s => s.id === savedSkillId);
            if (skill) setSelectedSkill(skill);
          }
        }
      } catch (err) {
        console.error("[ManageCurriculum] Skills processing error:", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("[ManageCurriculum] Skills fetch error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedSkill) {
      setPath(null);
      setStages([]);
      setWeeks({});
      setModules({});
      return;
    }

    localStorage.setItem('lastSelectedSkillId', selectedSkill.id);

    const pathRef = ref(db, `curriculum_paths/${selectedSkill.id}`);
    const stagesRef = ref(db, `curriculum_stages/${selectedSkill.id}`);
    const lessonsRef = ref(db, `ai_generated_lessons/${selectedSkill.id}`);

    onValue(pathRef, (snapshot) => {
      console.log("[ManageCurriculum] PATH SNAPSHOT:", snapshot.val());
      setPath(snapshot.val() || null);
    }, (error) => {
      console.error("[ManageCurriculum] Path fetch error:", error);
    });

    onValue(lessonsRef, (snapshot) => {
      console.log("[ManageCurriculum] LESSONS SNAPSHOT:", snapshot.val());
      if (snapshot.exists()) {
        const data = snapshot.val() || {};
        const lessons = Object.values(data) as any[];
        setAllLessons(lessons);
        const counts: Record<string, number> = {};
        lessons.forEach(l => {
          counts[l.moduleId] = (counts[l.moduleId] || 0) + 1;
        });
        setLessonCounts(counts);
      } else {
        setAllLessons([]);
        setLessonCounts({});
      }
    }, (error) => {
      console.error("[ManageCurriculum] Lessons fetch error:", error);
    });

    onValue(stagesRef, (snapshot) => {
      console.log("[ManageCurriculum] STAGES SNAPSHOT:", snapshot.val());
      if (snapshot.exists()) {
        const data = snapshot.val() || {};
        const stagesData: CurriculumStage[] = Object.values(data);
        setStages(stagesData.sort((a, b) => a.order - b.order));
        
        // Fetch weeks for each stage
        stagesData.forEach(stage => {
          const weeksRef = ref(db, `curriculum_weeks/${stage.id}`);
          onValue(weeksRef, (weekSnapshot) => {
            if (weekSnapshot.exists()) {
              const weekDataRaw = weekSnapshot.val() || {};
              const weeksData = Object.values(weekDataRaw) as CurriculumWeek[];
              setWeeks(prev => ({
                ...prev,
                [stage.id]: weeksData.sort((a, b) => a.weekNumber - b.weekNumber)
              }));

              // Fetch modules for each week
              weeksData.forEach(week => {
                const modulesRef = ref(db, `curriculum_modules/${week.id}`);
                onValue(modulesRef, (modSnapshot) => {
                  if (modSnapshot.exists()) {
                    const modDataRaw = modSnapshot.val() || {};
                    const mods = Object.values(modDataRaw) as CurriculumModule[];
                    setModules(prev => ({
                      ...prev,
                      [week.id]: mods.sort((a, b) => a.order - b.order)
                    }));
                  } else {
                    setModules(prev => ({ ...prev, [week.id]: [] }));
                  }
                }, (modError) => {
                  console.error(`[ManageCurriculum] Modules fetch error for week ${week.id}:`, modError);
                });
              });
            } else {
              setWeeks(prev => ({ ...prev, [stage.id]: [] }));
            }
          }, (weekError) => {
            console.error(`[ManageCurriculum] Weeks fetch error for stage ${stage.id}:`, weekError);
          });
        });
      } else {
        setStages([]);
        setWeeks({});
        setModules({});
      }
    }, (error) => {
      console.error("[ManageCurriculum] Stages fetch error:", error);
    });
  }, [selectedSkill]);

  const handleTogglePublish = async () => {
    if (!selectedSkill || !path) return;
    const newStatus = path.status === 'active' ? 'draft' : 'active';
    try {
      await update(ref(db, `curriculum_paths/${selectedSkill.id}`), { status: newStatus });
      await update(ref(db, `skills/${selectedSkill.id}`), { status: newStatus });
      alert(`Program is now ${newStatus === 'active' ? 'Published' : 'in Draft'}`);
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => 
      prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]
    );
  };

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks(prev => 
      prev.includes(weekId) ? prev.filter(id => id !== weekId) : [...prev, weekId]
    );
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  // CRUD Handlers
  const handleSaveSkill = async () => {
    try {
      const skillRef = editingItem 
        ? ref(db, `skills/${editingItem.id}`)
        : push(ref(db, 'skills'));
      
      const skillId = editingItem?.id || skillRef.key;
      const skillData = {
        id: skillId,
        ...formData,
        status: editingItem?.status || 'draft'
      };
      
      await set(skillRef, skillData);
      
      // If new skill, also create initial path
      if (!editingItem) {
        const pathData = {
          id: skillId,
          skillId: skillId,
          title: `Professional ${skillData.title} Academy Program`,
          description: skillData.description,
          summary: `Master ${skillData.title} through a structured program.`,
          durationWeeks: 12,
          targetOutcome: 'Job Ready',
          status: 'draft',
          totalModules: 0,
          totalLessons: 0,
          projectsCount: 0
        };
        await set(ref(db, `curriculum_paths/${skillId}`), pathData);
      }
      
      setIsSkillModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save program');
    }
  };

  const handleSavePath = async () => {
    if (!selectedSkill) return;
    try {
      const pathData = {
        ...path,
        ...formData,
        updatedAt: new Date().toISOString()
      };
      await set(ref(db, `curriculum_paths/${selectedSkill.id}`), pathData);
      setIsPathModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save path');
    }
  };

  const handleSaveStage = async () => {
    if (!selectedSkill) return;
    try {
      const stageRef = editingItem 
        ? ref(db, `curriculum_stages/${selectedSkill.id}/${editingItem.id}`)
        : push(ref(db, `curriculum_stages/${selectedSkill.id}`));
      
      const stageData = {
        id: editingItem?.id || stageRef.key,
        skillId: selectedSkill.id,
        ...formData,
        order: formData.order ? parseInt(formData.order) : (stages.length + 1)
      };
      await set(stageRef, stageData);
      setIsStageModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save stage');
    }
  };

  const handleSaveWeek = async () => {
    if (!parentId) return;
    try {
      const weekRef = editingItem 
        ? ref(db, `curriculum_weeks/${parentId}/${editingItem.id}`)
        : push(ref(db, `curriculum_weeks/${parentId}`));
      
      const weekData = {
        id: editingItem?.id || weekRef.key,
        stageId: parentId,
        ...formData,
        weekNumber: formData.weekNumber ? parseInt(formData.weekNumber) : 1
      };
      await set(weekRef, weekData);
      setIsWeekModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save week');
    }
  };

  const handleSaveModule = async () => {
    if (!parentId) return;
    try {
      const moduleRef = editingItem 
        ? ref(db, `curriculum_modules/${parentId}/${editingItem.id}`)
        : push(ref(db, `curriculum_modules/${parentId}`));
      
      const moduleData = {
        id: editingItem?.id || moduleRef.key,
        weekId: parentId,
        ...formData,
        order: formData.order ? parseInt(formData.order) : 1,
        stageId: stages.find(s => weeks[s.id]?.some(w => w.id === parentId))?.id || ''
      };
      await set(moduleRef, moduleData);
      setIsModuleModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save module');
    }
  };

  const handleDeleteItem = async (type: 'stage' | 'week' | 'module', id: string, pId?: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) return;
    
    try {
      let path = '';
      if (type === 'stage') path = `curriculum_stages/${selectedSkill?.id}/${id}`;
      if (type === 'week') path = `curriculum_weeks/${pId}/${id}`;
      if (type === 'module') path = `curriculum_modules/${pId}/${id}`;
      
      await remove(ref(db, path));
    } catch (error) {
      console.error(error);
      alert('Failed to delete item');
    }
  };

  const handleGenerateLessons = async (module: CurriculumModule) => {
    if (!selectedSkill) return;
    setGeneratingModuleId(module.id);
    try {
      await generateLessonsForModule(
        selectedSkill.id,
        module.id,
        module.title,
        selectedSkill.title,
        5,
        module.stageId,
        module.weekId,
        (p, s) => console.log(s),
        'missing' // Default to missing only to prevent duplicates
      );
      alert(`Successfully processed lessons for ${module.title}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate lessons');
    } finally {
      setGeneratingModuleId(null);
    }
  };

  const handleSeedSkills = async () => {
    setIsSeeding(true);
    try {
      const seeded = await skillService.seedMissingSkills();
      if (seeded) {
        alert('Successfully seeded missing programs from default list.');
      } else {
        alert('All default programs are already in the database.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to seed skills');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Academy Builder</h1>
            <p className="text-white/40 font-medium">Architect deep academy programs and generate structured curriculum.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={handleSeedSkills}
              disabled={isSeeding}
              className="h-14 px-6 rounded-2xl border-white/10 hover:bg-white/5"
            >
              {isSeeding ? <Loader2 size={20} className="animate-spin mr-2" /> : <Layers size={20} className="mr-2" />}
              Seed Missing Programs
            </Button>
            <Select 
              className="h-14"
              placeholder="Choose a program..."
              displayValue={skills.length > 0 ? (selectedSkill?.title) : (localStorage.getItem('lastSelectedSkillId') ? 'Loading...' : undefined)}
              value={selectedSkill?.id || ''}
              onChange={(e) => {
                const skill = skills.find(s => s.id === e.target.value);
                setSelectedSkill(skill || null);
              }}
            >
              <option value="">Choose a program...</option>
              <optgroup label="Career Paths">
                {(skills || []).filter(s => s.category === 'career-path').map(s => (
                  <option key={`path-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Programming Languages">
                {(skills || []).filter(s => s.category === 'coding-languages').map(s => (
                  <option key={`lang-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Development Skills">
                {(skills || []).filter(s => s.category === 'development-skill').map(s => (
                  <option key={`dev-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Tools & Foundations">
                {(skills || []).filter(s => s.category === 'tool-foundation').map(s => (
                  <option key={`tool-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Career Prep">
                {(skills || []).filter(s => s.category === 'career-prep').map(s => (
                  <option key={`prep-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Other">
                {(skills || []).filter(s => !['career-path', 'coding-languages', 'tool-foundation', 'development-skill', 'career-prep'].includes(s.category as string)).map(s => (
                  <option key={`other-${s.id}`} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
            </Select>
            <Button 
              onClick={() => {
                setEditingItem(null);
                setFormData({ title: '', description: '', category: 'Core Software Development', icon: 'Code' });
                setIsSkillModalOpen(true);
              }}
              className="h-14 px-6 rounded-2xl"
            >
              <Plus size={20} className="mr-2" />
              New Program
            </Button>
          </div>
        </div>

        {!selectedSkill ? (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-white/20">
              <Map size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black">No Program Selected</h3>
              <p className="text-white/40 max-w-xs mx-auto">Choose an academy program from the dropdown above to start designing its curriculum.</p>
            </div>
          </div>
        ) : !path ? (
          <div className="py-20 text-center space-y-8">
            <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500 shadow-2xl shadow-emerald-500/10">
              <Sparkles size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black tracking-tight">No curriculum created yet for this program</h3>
              <p className="text-white/40 max-w-sm mx-auto font-medium">MentorStack Academy needs a deep structured roadmap to guide students. Generate one now using AI.</p>
              <div className="pt-6">
                <Button 
                  size="lg"
                  onClick={() => window.location.href = `/admin/generator?skill=${selectedSkill.id}`} 
                  className="h-16 px-10 rounded-2xl shadow-xl shadow-emerald-500/20"
                >
                  <Sparkles size={20} className="mr-3" />
                  Generate Full Academy Curriculum
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Path Header */}
            <Card className="p-8 border-white/5 bg-white/[0.02] space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Map size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{path.title}</h2>
                    <p className="text-white/40 font-medium">{path.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingItem(path);
                      setFormData({
                        title: path.title,
                        description: path.description,
                        durationWeeks: path.durationWeeks,
                        totalModules: path.totalModules,
                        totalLessons: path.totalLessons,
                        targetOutcome: path.targetOutcome
                      });
                      setIsPathModalOpen(true);
                    }}
                    className="h-8 w-8 p-0 rounded-lg text-white/40 hover:text-white"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Badge className={`px-3 py-1 rounded-lg uppercase tracking-widest text-[10px] ${
                    path.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  }`}>
                    {path.status === 'active' ? 'Published' : 'Draft'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleTogglePublish}
                    className="h-8 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest"
                  >
                    {path.status === 'active' ? 'Unpublish' : 'Publish to Academy'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Total Weeks</p>
                  <p className="text-lg font-black">{path.durationWeeks}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Modules</p>
                  <p className="text-lg font-black">{path.totalModules}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Live Lessons</p>
                  <p className="text-lg font-black">{path.totalLessons}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Projects</p>
                  <p className="text-lg font-black">{path.projectsCount || 0}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Target Outcome</p>
                  <p className="text-lg font-black text-emerald-400">{path.targetOutcome || 'N/A'}</p>
                </div>
              </div>
            </Card>

            {/* Roadmap Stages */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-tight">Curriculum Structure</h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({ title: '', levelName: 'Beginner', order: stages.length + 1 });
                    setIsStageModalOpen(true);
                  }}
                  className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  <Plus size={16} className="mr-2" />
                  Add Stage
                </Button>
              </div>

              {(stages || []).map((stage) => (
                <div key={stage.id} className="space-y-4">
                  <div 
                    onClick={() => toggleStage(stage.id)}
                    className="w-full flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Layers size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-lg">{stage.title}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{stage.levelName} Stage • {(weeks[stage.id] || []).length || 0} Weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(stage);
                          setFormData({ title: stage.title, levelName: stage.levelName, order: stage.order });
                          setIsStageModalOpen(true);
                        }}
                        className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-white"
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem('stage', stage.id);
                        }}
                        className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </Button>
                      <div className="ml-2">
                        {expandedStages.includes(stage.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedStages.includes(stage.id) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-4 space-y-4"
                      >
                        <div className="flex items-center justify-between py-2">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20">Weeks in this stage</h5>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setParentId(stage.id);
                              setEditingItem(null);
                              setFormData({ title: '', description: '', weekNumber: ((weeks[stage.id] || []).length || 0) + 1 });
                              setIsWeekModalOpen(true);
                            }}
                            className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10"
                          >
                            <Plus size={12} className="mr-1" />
                            Add Week
                          </Button>
                        </div>
                        {(weeks[stage.id] || []).map((week) => (
                          <div key={week.id} className="space-y-2">
                            <div 
                              onClick={() => toggleWeek(week.id)}
                              className="w-full flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 font-black text-xs">
                                  W{week.weekNumber}
                                </div>
                                <div className="text-left">
                                  <h5 className="font-bold text-sm">{week.title}</h5>
                                  <p className="text-[10px] text-white/40">{week.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setParentId(stage.id);
                                    setEditingItem(week);
                                    setFormData({ title: week.title, description: week.description, weekNumber: week.weekNumber });
                                    setIsWeekModalOpen(true);
                                  }}
                                  className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-white"
                                >
                                  <Edit2 size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteItem('week', week.id, stage.id);
                                  }}
                                  className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-red-500"
                                >
                                  <Trash2 size={12} />
                                </Button>
                                <div className="ml-2">
                                  {expandedWeeks.includes(week.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedWeeks.includes(week.id) && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden pl-12 space-y-2"
                                >
                                  <div className="flex items-center justify-between py-2">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20">Modules in this week</h5>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => {
                                        setParentId(week.id);
                                        setEditingItem(null);
                                        setFormData({ title: '', estimatedDuration: '45 mins', order: ((modules[week.id] || []).length || 0) + 1 });
                                        setIsModuleModalOpen(true);
                                      }}
                                      className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10"
                                    >
                                      <Plus size={12} className="mr-1" />
                                      Add Module
                                    </Button>
                                  </div>
                                  {(modules[week.id] || []).map((module) => (
                                    <div key={module.id} className="space-y-2">
                                      <div 
                                        onClick={() => toggleModule(module.id)}
                                        className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-xl group hover:border-emerald-500/30 transition-all cursor-pointer"
                                      >
                                        <div className="flex items-center gap-4">
                                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover:text-emerald-500 transition-colors">
                                            <BookOpen size={16} />
                                          </div>
                                          <div>
                                            <h5 className="font-bold text-xs">{module.title}</h5>
                                            <div className="flex items-center gap-2 mt-1">
                                              <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] px-1.5 py-0 rounded-md">
                                                {lessonCounts[module.id] || 0} Lessons
                                              </Badge>
                                              <span className="text-[8px] text-white/20 font-black uppercase tracking-widest">{module.estimatedDuration}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setParentId(week.id);
                                              setEditingItem(module);
                                              setFormData({ title: module.title, estimatedDuration: module.estimatedDuration, order: module.order });
                                              setIsModuleModalOpen(true);
                                            }}
                                            className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-white"
                                          >
                                            <Edit2 size={12} />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteItem('module', module.id, week.id);
                                            }}
                                            className="h-8 w-8 p-0 rounded-lg text-white/20 hover:text-red-500"
                                          >
                                            <Trash2 size={12} />
                                          </Button>
                                          <div className="w-px h-4 bg-white/10 mx-1" />
                                          <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-black transition-all"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleGenerateLessons(module);
                                            }}
                                            disabled={generatingModuleId === module.id}
                                          >
                                            {generatingModuleId === module.id ? (
                                              <Loader2 size={12} className="animate-spin" />
                                            ) : (
                                              <>
                                                <Sparkles size={12} className="mr-2" />
                                                Generate
                                              </>
                                            )}
                                          </Button>
                                          {lessonCounts[module.id] > 0 && (
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/admin/review-lessons/${selectedSkill.id}/${module.id}`);
                                              }}
                                              className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10"
                                            >
                                              Review Lessons
                                            </Button>
                                          )}
                                          <div className="text-white/20">
                                            {expandedModules.includes(module.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                          </div>
                                        </div>
                                      </div>

                                      <AnimatePresence>
                                        {expandedModules.includes(module.id) && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden ml-8 border-l border-white/5 pl-4 space-y-2"
                                          >
                                            {(allLessons || []).filter(l => l.moduleId === module.id).length === 0 ? (
                                              <p className="text-[10px] text-white/20 italic py-2">No lessons generated yet.</p>
                                            ) : (
                                              (allLessons || []).filter(l => l.moduleId === module.id).sort((a, b) => a.order - b.order).map((lesson) => (
                                                 <div key={lesson.id} className="flex items-center justify-between p-3 bg-white/[0.01] rounded-lg border border-transparent hover:border-white/5 transition-all">
                                                   <div className="flex items-center gap-3">
                                                     <div className={`w-1.5 h-1.5 rounded-full ${
                                                       lesson.status === 'approved' ? 'bg-emerald-500' : 
                                                       lesson.status === 'needs_repair' ? 'bg-orange-500' : 'bg-purple-500'
                                                     }`} />
                                                     <div className="flex flex-col">
                                                       <span className="text-[10px] font-medium text-white/60">{lesson.title}</span>
                                                       <span className="text-[8px] text-white/20 font-black uppercase tracking-widest">Score: {lesson.score || 'N/A'}/100</span>
                                                     </div>
                                                   </div>
                                                   <div className="flex items-center gap-2">
                                                     <Badge className={`text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded ${
                                                       lesson.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                                       lesson.status === 'needs_repair' ? 'bg-orange-500/10 text-orange-500' :
                                                       'bg-purple-500/10 text-purple-500'
                                                     }`}>
                                                       {lesson.status?.replace('_', ' ') || 'pending'}
                                                     </Badge>
                                                     <Button
                                                       size="sm"
                                                       variant="ghost"
                                                       onClick={(e) => {
                                                         e.stopPropagation();
                                                         navigate(`/admin/review-lessons/${selectedSkill.id}/${module.id}`);
                                                       }}
                                                       className="h-6 w-6 p-0 rounded-md text-white/20 hover:text-white"
                                                     >
                                                       <ChevronRight size={12} />
                                                     </Button>
                                                   </div>
                                                 </div>
                                              ))
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Path Modal */}
      <Modal
        isOpen={isPathModalOpen}
        onClose={() => setIsPathModalOpen(false)}
        title="Edit Program Path"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsPathModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePath}>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input 
            label="Path Title" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea 
            label="Description" 
            value={formData.description || ''} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Duration (Weeks)" 
              type="number"
              value={formData.durationWeeks || ''} 
              onChange={(e) => setFormData({ ...formData, durationWeeks: parseInt(e.target.value) })}
            />
            <Input 
              label="Target Outcome" 
              value={formData.targetOutcome || ''} 
              onChange={(e) => setFormData({ ...formData, targetOutcome: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Stage Modal */}
      <Modal
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        title={editingItem ? 'Edit Stage' : 'Add New Stage'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsStageModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStage}>{editingItem ? 'Save Changes' : 'Add Stage'}</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input 
            label="Stage Title" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Fundamentals, Advanced Concepts"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Level" 
              value={formData.levelName || ''} 
              onChange={(e) => setFormData({ ...formData, levelName: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </Select>
            <Input 
              label="Order" 
              type="number"
              value={formData.order || ''} 
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Week Modal */}
      <Modal
        isOpen={isWeekModalOpen}
        onClose={() => setIsWeekModalOpen(false)}
        title={editingItem ? 'Edit Week' : 'Add New Week'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsWeekModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveWeek}>{editingItem ? 'Save Changes' : 'Add Week'}</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input 
            label="Week Title" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Introduction to React"
          />
          <Textarea 
            label="Description" 
            value={formData.description || ''} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input 
            label="Week Number" 
            type="number"
            value={formData.weekNumber || ''} 
            onChange={(e) => setFormData({ ...formData, weekNumber: e.target.value })}
          />
        </div>
      </Modal>

      {/* Module Modal */}
      <Modal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        title={editingItem ? 'Edit Module' : 'Add New Module'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModuleModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveModule}>{editingItem ? 'Save Changes' : 'Add Module'}</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input 
            label="Module Title" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. React Hooks Deep Dive"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Estimated Duration" 
              value={formData.estimatedDuration || ''} 
              onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
              placeholder="e.g. 45 mins"
            />
            <Input 
              label="Order" 
              type="number"
              value={formData.order || ''} 
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Skill Modal */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        title={editingItem ? 'Edit Program' : 'Create New Program'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsSkillModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSkill}>{editingItem ? 'Save Changes' : 'Create Program'}</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input 
            label="Program Title" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Fullstack Web Development"
          />
          <Textarea 
            label="Description" 
            value={formData.description || ''} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What will students learn in this program?"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Category" 
              value={formData.category || ''} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="career-path">Career Path</option>
              <option value="coding-languages">Programming Language</option>
              <option value="tool">Tool / Foundation</option>
              <option value="career-prep">Career Prep</option>
            </Select>
            <Input 
              label="Icon Name (Lucide)" 
              value={formData.icon || ''} 
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g. Code, Database, Shield"
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
