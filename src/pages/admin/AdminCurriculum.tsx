import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { 
  BookOpen, Search, Plus, ChevronRight, 
  Edit2, Trash2, Layout, Layers,
  CheckCircle2, Clock, Play, AlertCircle,
  X, GripVertical, Lock, Save
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../../components/ui';
import { curriculumService } from '../../services/curriculumService';
import { PathCurriculum, LessonContent, Module, PathStatus } from '../../types';
import { LoadingScreen } from '../../components/LoadingScreen';

export const AdminCurriculum: React.FC = () => {
  const [paths, setPaths] = useState<PathCurriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<PathCurriculum | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Partial<LessonContent> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await curriculumService.initializeData();
        const unsubscribe = curriculumService.subscribeToPaths((data) => {
          setPaths(data);
          setLoading(false);
        });
        return unsubscribe;
      } catch (err) {
        console.error(err);
        setError('Failed to load curriculum data');
        setLoading(false);
      }
    };

    const unsubPromise = init();
    return () => {
      unsubPromise.then(unsub => unsub?.());
    };
  }, []);

  const filteredPaths = paths.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = async (pathId: string, status: PathStatus) => {
    try {
      await curriculumService.updatePathStatus(pathId, status);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleSaveLesson = async () => {
    if (!selectedPath || !selectedLevel || !selectedModule || !editingLesson) return;
    setIsSaving(true);
    try {
      const lessonId = editingLesson.id || `lesson-${Date.now()}`;
      const lessonData: LessonContent = {
        id: lessonId,
        title: editingLesson.title || 'New Lesson',
        todayYouAreLearning: editingLesson.todayYouAreLearning || '',
        whyItMatters: editingLesson.whyItMatters || '',
        explanation: editingLesson.explanation || '',
        analogy: editingLesson.analogy || '',
        codeExample: editingLesson.codeExample || '',
        lineByLine: editingLesson.lineByLine || '',
        commonMistakes: editingLesson.commonMistakes || [],
        practice: editingLesson.practice || '',
        challenge: editingLesson.challenge || '',
        quiz: editingLesson.quiz || [],
        recap: editingLesson.recap || ''
      };

      await curriculumService.saveLesson(lessonData);

      if (!editingLesson.id) {
        const updatedPath = { ...selectedPath };
        const level = updatedPath.levels[selectedLevel as keyof typeof updatedPath.levels];
        const module = level.modules.find(m => m.id === selectedModule.id);
        if (module) {
          module.lessons = [...(module.lessons || []), lessonId];
          await curriculumService.updatePath(selectedPath.title, updatedPath);
        }
      }

      setEditingLesson(null);
    } catch (err) {
      setError('Failed to save lesson');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!selectedPath || !selectedLevel || !selectedModule) return;
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      await curriculumService.deleteLesson(lessonId, selectedPath.title, selectedLevel, selectedModule.id);
    } catch (err) {
      setError('Failed to delete lesson');
    }
  };

  const handleReorderLessons = async (newOrder: string[]) => {
    if (!selectedPath || !selectedLevel || !selectedModule) return;
    
    try {
      const updatedPath = { ...selectedPath };
      const level = updatedPath.levels[selectedLevel as keyof typeof updatedPath.levels];
      const module = level.modules.find(m => m.id === selectedModule.id);
      if (module) {
        module.lessons = newOrder;
        await curriculumService.updatePath(selectedPath.title, updatedPath);
      }
    } catch (err) {
      setError('Failed to reorder lessons');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Curriculum Manager</h1>
          <p className="text-white/40 font-medium">Manage learning paths, modules, and lessons.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <Input 
              placeholder="Search paths..." 
              className="pl-12 bg-white/5 border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Main View */}
      {!selectedPath ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.length > 0 ? (
            filteredPaths.map((path) => (
              <Card 
                key={path.id}
                className="p-8 space-y-6 bg-white/[0.02] border-white/[0.05] hover:border-emerald-500/30 transition-all group cursor-pointer"
                onClick={() => setSelectedPath(path)}
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <Badge className={`
                    ${path.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 
                      path.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' :
                      path.status === 'coming_soon' ? 'bg-amber-500/10 text-amber-400' :
                      path.status === 'completed' ? 'bg-emerald-500 text-black' :
                      'bg-white/10 text-white/40'} 
                    border-none font-black uppercase tracking-widest text-[10px]
                  `}>
                    {path.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-2">{path.title}</h3>
                  <p className="text-sm text-white/40 font-medium line-clamp-2">{path.description}</p>
                </div>
                <div className="pt-4 border-t border-white/[0.05] flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/20">
                    <Layers size={14} />
                    <span className="text-xs font-bold">{Object.keys(path.levels).length} Levels</span>
                  </div>
                  <ChevronRight size={18} className="text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-20 flex flex-col items-center justify-center text-center space-y-6 bg-white/[0.01] border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                <Search size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">No paths found</h3>
                <p className="text-white/40 font-medium">Try adjusting your search or add a new path.</p>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Path Detail View */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedPath(null);
                setSelectedLevel(null);
                setSelectedModule(null);
              }}
              className="p-2 hover:bg-white/5"
            >
              <X size={24} />
            </Button>
            <div>
              <h2 className="text-3xl font-black tracking-tight">{selectedPath.title}</h2>
              <div className="flex items-center gap-4 mt-2">
                <select 
                  value={selectedPath.status}
                  onChange={(e) => handleUpdateStatus(selectedPath.title, e.target.value as any)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold text-white/60 focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="active">Active</option>
                  <option value="in_progress">In Progress</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="text-white/20 text-xs font-bold uppercase tracking-widest">• {selectedPath.category}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Levels & Modules Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 bg-white/[0.02] border-white/[0.05] space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-white/20 px-2">Structure</h3>
                <div className="space-y-4">
                  {Object.entries(selectedPath.levels).map(([levelId, level]) => (
                    <div key={levelId} className="space-y-2">
                      <button 
                        onClick={() => {
                          setSelectedLevel(levelId === selectedLevel ? null : levelId);
                          setSelectedModule(null);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                          selectedLevel === levelId ? 'bg-emerald-500 text-black font-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Layers size={18} />
                          <span className="text-sm capitalize">{level.title}</span>
                        </div>
                        <ChevronRight size={16} className={`transition-transform ${selectedLevel === levelId ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {selectedLevel === levelId && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 space-y-1"
                          >
                            {level.modules.map((module) => (
                              <button 
                                key={module.id}
                                onClick={() => setSelectedModule(module)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-xs font-bold transition-all ${
                                  selectedModule?.id === module.id ? 'text-emerald-400 bg-emerald-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <Layout size={14} />
                                <span>{module.title}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              {selectedModule ? (
                <Card className="p-8 bg-white/[0.02] border-white/[0.05] space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">{selectedModule.title}</h3>
                      <p className="text-sm text-white/40 font-medium mt-1">{selectedModule.description}</p>
                    </div>
                    <Button 
                      onClick={() => setEditingLesson({ title: '', todayYouAreLearning: '' })}
                      className="bg-emerald-500 text-black hover:bg-emerald-400 h-10 px-4 rounded-xl text-xs font-black"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Lesson
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20">Lessons ({selectedModule.lessons?.length || 0})</h4>
                    
                    <Reorder.Group 
                      axis="y" 
                      values={selectedModule.lessons || []} 
                      onReorder={handleReorderLessons}
                      className="space-y-3"
                    >
                      {selectedModule.lessons?.map((lessonId) => (
                        <Reorder.Item 
                          key={lessonId} 
                          value={lessonId}
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-white/20 group-hover:text-emerald-400 transition-colors">
                              <GripVertical size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white/80">{lessonId}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Lesson ID</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-white/10 text-white/40 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                curriculumService.getLessons([lessonId]).then(lessons => {
                                  if (lessons[0]) setEditingLesson(lessons[0]);
                                });
                              }}
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-red-500/10 text-white/40 hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLesson(lessonId);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>

                    {(!selectedModule.lessons || selectedModule.lessons.length === 0) && (
                      <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                          <BookOpen size={32} />
                        </div>
                        <p className="text-white/40 font-medium">No lessons in this module yet.</p>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="h-full p-20 flex flex-col items-center justify-center text-center space-y-6 bg-white/[0.01] border-dashed border-white/10">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    <Layout size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">Select a module</h3>
                    <p className="text-white/40 font-medium">Choose a level and module from the sidebar to manage lessons.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      <AnimatePresence>
        {editingLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingLesson(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    {editingLesson.id ? 'Edit Lesson' : 'New Lesson'}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest text-white/20 mt-1">
                    {selectedPath?.title} • {selectedModule?.title}
                  </p>
                </div>
                <button 
                  onClick={() => setEditingLesson(null)}
                  className="p-3 hover:bg-white/5 rounded-2xl transition-all"
                >
                  <X size={24} className="text-white/40" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Lesson Title</label>
                    <Input 
                      value={editingLesson.title}
                      onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                      placeholder="e.g., Introduction to React"
                      className="bg-white/5 border-white/10 h-14 text-lg font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Lesson ID</label>
                    <Input 
                      value={editingLesson.id}
                      onChange={(e) => setEditingLesson({ ...editingLesson, id: e.target.value })}
                      placeholder="e.g., react-intro"
                      disabled={!!editingLesson.id}
                      className="bg-white/5 border-white/10 h-14 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Today You Are Learning</label>
                  <textarea 
                    value={editingLesson.todayYouAreLearning}
                    onChange={(e) => setEditingLesson({ ...editingLesson, todayYouAreLearning: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[100px] text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="Brief summary of the lesson goal..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Explanation</label>
                  <textarea 
                    value={editingLesson.explanation}
                    onChange={(e) => setEditingLesson({ ...editingLesson, explanation: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px] text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="Detailed lesson content..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Analogy</label>
                    <textarea 
                      value={editingLesson.analogy}
                      onChange={(e) => setEditingLesson({ ...editingLesson, analogy: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[120px] text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="A helpful analogy..."
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Code Example</label>
                    <textarea 
                      value={editingLesson.codeExample}
                      onChange={(e) => setEditingLesson({ ...editingLesson, codeExample: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[120px] font-mono text-xs focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="// Your code here..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex justify-end gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingLesson(null)}
                  className="px-8 h-14 rounded-2xl font-black text-white/40 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveLesson}
                  disabled={isSaving || !editingLesson.title}
                  className="px-12 h-14 rounded-2xl font-black bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Lesson'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
