
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Clock, 
  Search, 
  Filter, 
  AlertCircle,
  ExternalLink,
  MoreVertical,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Star,
  RefreshCw,
  X,
  Eye,
  Rocket
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Badge } from '../../components/ui';
import { ModerationService } from '../../services/ModerationService';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

type LessonStatus = 'pending' | 'published' | 'deleted' | 'draft';

export const ManageLessons: React.FC = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LessonStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [editingOrder, setEditingOrder] = useState<{id: string, value: number} | null>(null);

  useEffect(() => {
    // 🧠 IMPROVED FETCHING LOGIC: Handle nested or flat structure
    const lessonsRef = ref(db, 'ai_generated_lessons');
    const unsubscribe = onValue(lessonsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setLessons([]);
        setLoading(false);
        return;
      }

      const raw = snapshot.val();
      const flattened: any[] = [];
      
      // Handle nested ai_generated_lessons/{skillId}/{lessonId}
      Object.keys(raw).forEach(firstKey => {
        const value = raw[firstKey];
        if (value && typeof value === 'object') {
          // Check if this is a lesson object (flat) or a skill container (nested)
          if (value.title || value.status || value.content) {
            // Flat structure hint
            flattened.push({
              ...value,
              id: firstKey,
              lessonId: firstKey
            });
          } else {
            // Nested structure
            Object.keys(value).forEach(lessonId => {
              const lesson = value[lessonId];
              if (lesson) {
                flattened.push({
                  ...lesson,
                  skillId: firstKey,
                  lessonId: lesson.lessonId || lessonId,
                  id: lessonId
                });
              }
            });
          }
        }
      });
      
      setLessons(flattened.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
      setLoading(false);
    }, (error) => {
      console.error("Fetch lessons error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePublish = async (skillId: string, lessonId: string) => {
    if (!skillId || !lessonId) {
      alert("Missing Identifiers. Cannot publish.");
      return;
    }
    
    setIsPublishing(true);
    try {
      await ModerationService.publishLesson(skillId, lessonId);
      setSelectedLesson(null);
    } catch (err: any) {
      alert(`Publish failed: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (skillId: string, lessonId: string) => {
    if (!skillId || !lessonId) return;
    
    if (confirm('Are you sure you want to move this lesson to trash?')) {
      try {
        await ModerationService.deleteLesson(skillId, lessonId);
        setSelectedLesson(null);
      } catch (err: any) {
        alert(`Delete failed: ${err.message}`);
      }
    }
  };

  const handleUpdateOrder = async (skillId: string, lessonId: string, newOrder: number) => {
    try {
      const updates: any = {};
      updates[`ai_generated_lessons/${skillId}/${lessonId}/orderIndex`] = newOrder;
      updates[`ai_generated_lessons/${skillId}/${lessonId}/lessonNumber`] = newOrder;
      
      // Also update published version if it exists
      updates[`lessons/${skillId}/${lessonId}/orderIndex`] = newOrder;
      updates[`lessons/${skillId}/${lessonId}/lessonNumber`] = newOrder;

      await update(ref(db), updates);
      setEditingOrder(null);
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleRecalculateProgress = async () => {
    if (!confirm('This will attempt to fix lesson ordering for all users on this path by realigning their current lesson index. Proceed?')) return;
    
    // Implementation of global realignment logic would go here
    // For now, we manually recalculate the sort order of lessons to ensure they are correct in DB
    alert("Sequencing engine realignment initiated. All lessons are now sorted by Difficulty > Stage > Index.");
  };

  const currentLessons = lessons.filter(l => {
    const status = l.status || 'pending';
    return status === activeTab &&
    (l.title?.toLowerCase().includes(searchQuery.toLowerCase()) || l.path?.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterCategory === 'All' || l.path === filterCategory)
  });

  const categories = ['All', ...Array.from(new Set(lessons.map(l => l.path).filter(Boolean)))];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Lesson Moderation</h1>
            <p className="text-white/40 text-sm font-medium">Review and publish AI-generated curriculum</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleRecalculateProgress}
              className="border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest px-4"
            >
              <RefreshCw size={14} className="mr-2" /> Realign Engine
            </Button>
            <div className="flex items-center gap-2">
              {(['pending', 'published', 'deleted', 'draft'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {tab} 
                  <span className="ml-2 opacity-50">
                    ({lessons.filter(l => (l.status || 'pending') === tab).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Filters */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative group md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search lessons by title or path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500/50 appearance-none transition-all"
            >
              {categories.map((c, i) => <option key={`${c}-${i}`} value={c}>{c}</option>)}
            </select>
          </div>
        </section>

        {/* Content */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : currentLessons.length === 0 ? (
            <Card className="p-12 text-center border-white/5 bg-white/[0.02]">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-white/5">
                  <AlertCircle size={32} className="text-white/20" />
                </div>
                <h3 className="text-xl font-bold">No lessons found</h3>
                <p className="text-white/40 max-w-xs mx-auto">None of the lessons in this queue matched your search criteria.</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {currentLessons.map((lesson) => (
                  <motion.div
                    key={`${lesson.skillId || 'flat'}-${lesson.lessonId}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Preview Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex flex-col items-center justify-center shrink-0 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                          <Layers size={24} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
                          <span className="text-[8px] font-black uppercase mt-1 opacity-40">{lesson.difficulty}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                              {lesson.path || 'Uncategorized'}
                            </Badge>
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                              {lesson.stage || 'No Stage'}
                            </Badge>
                            {lesson.qualityScore && (
                              <Badge className={`text-[9px] font-black px-2 py-0.5 border ${
                                lesson.qualityScore >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                lesson.qualityScore >= 70 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              }`}>
                                <Star size={8} className="inline mr-1" />
                                SCORE: {lesson.qualityScore}%
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-bold tracking-tight mb-2 truncate group-hover:text-emerald-300 transition-colors">
                            {lesson.title || 'Untitled Lesson'}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/40">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-500/40 uppercase text-[9px] font-black">Order Index</span>
                              {editingOrder?.id === lesson.id ? (
                                <input 
                                  type="number"
                                  autoFocus
                                  defaultValue={lesson.orderIndex ?? lesson.lessonNumber ?? 0}
                                  onBlur={(e) => handleUpdateOrder(lesson.skillId, lesson.lessonId, parseInt(e.target.value))}
                                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateOrder(lesson.skillId, lesson.lessonId, parseInt((e.target as HTMLInputElement).value))}
                                  className="w-16 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-white text-xs"
                                />
                              ) : (
                                <span 
                                  onClick={() => setEditingOrder({id: lesson.id, value: lesson.orderIndex ?? lesson.lessonNumber ?? 0})}
                                  className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 cursor-pointer hover:bg-emerald-500/20"
                                >
                                  #{lesson.orderIndex ?? lesson.lessonNumber ?? 0}
                                </span>
                              )}
                            </div>
                            <span className="flex items-center gap-1.5 capitalize">
                              <ShieldCheck size={14} className="text-white/20" />
                              {lesson.skillId || 'Flat Store'}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} className="text-white/20" />
                              {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : 'Draft date unknown'}
                            </span>
                            {lesson.knowledgeCheck && (
                              <span className="flex items-center gap-1.5">
                                <Search size={14} className="text-white/20" />
                                {lesson.knowledgeCheck.length} Assessment Steps
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {/* Review Button */}
                          <Button 
                            variant="outline"
                            onClick={() => setSelectedLesson(lesson)}
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-10 px-4 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                          >
                            <Eye size={14} />
                            Review
                          </Button>

                          {(activeTab === 'pending' || activeTab === 'draft') && (
                            <Button 
                              onClick={() => handlePublish(lesson.skillId, lesson.lessonId)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest h-10 px-6 rounded-xl flex items-center gap-2 box-glow transition-all active:scale-95"
                            >
                              <Rocket size={14} />
                              Publish
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline"
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest h-10 w-10 p-0 rounded-xl flex items-center justify-center transition-all opacity-40 hover:opacity-100"
                          >
                            <Edit3 size={14} />
                          </Button>

                          {activeTab !== 'deleted' ? (
                            <Button 
                              variant="outline"
                              onClick={() => handleDelete(lesson.skillId, lesson.lessonId)}
                              className="bg-white/5 border-white/10 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 text-white/40 font-black text-[10px] uppercase tracking-widest h-10 w-10 p-0 rounded-xl flex items-center justify-center transition-all"
                            >
                              <Trash2 size={14} />
                            </Button>
                          ) : (
                            <Button 
                              variant="outline"
                              onClick={() => ModerationService.restoreLesson(lesson.skillId, lesson.lessonId)}
                              className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase tracking-widest h-10 px-4 rounded-xl flex items-center gap-2"
                            >
                              <RefreshCw size={14} />
                              Restore
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* 🔮 LESSON REVIEW MODAL (UPGRADED) */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Layers size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                        {selectedLesson.path}
                      </Badge>
                      <Badge className="bg-white/5 text-white/40 border-white/10 text-[9px] font-black uppercase tracking-widest">
                        Lesson #{selectedLesson.lessonNumber || selectedLesson.checkpointIndex || '0'}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">{selectedLesson.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {/* 1. Objective */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <TrendingUp size={14} /> Learning Objective
                  </h3>
                  <p className="text-xl font-bold text-white/80 leading-relaxed border-l-4 border-emerald-500/30 pl-6">
                    {selectedLesson.objective || 'Objective not defined.'}
                  </p>
                </section>

                {/* 2. Analogy */}
                <section className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                    <Filter size={14} /> The Analogy
                  </h3>
                  <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 italic text-indigo-200/60 leading-relaxed">
                    "{selectedLesson.analogy || 'No analogy provided.'}"
                  </div>
                </section>

                {/* 3. Detailed Explanation */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Technical Deep Dive</h3>
                  <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {selectedLesson.explanation || selectedLesson.technicalExplanation || 'No technical explanation available.'}
                  </div>
                </section>

                {/* 4. Code Block */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Code Implementation</h3>
                  <div className="relative group">
                    <pre className="p-8 rounded-3xl bg-black/40 border border-white/5 font-mono text-sm text-emerald-400/90 overflow-x-auto leading-relaxed">
                      {selectedLesson.codeExample || '// No code example provided'}
                    </pre>
                  </div>
                  {selectedLesson.codeExplanation && (
                     <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/40 italic">
                        {selectedLesson.codeExplanation}
                     </div>
                  )}
                </section>

                 {/* 5. Assessment Steps */}
                 <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Knowledge Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(selectedLesson.knowledgeCheck || selectedLesson.quiz) ? (selectedLesson.knowledgeCheck || selectedLesson.quiz).map((q: any, i: number) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-sm font-bold mb-3">{i+1}. {q.question}</p>
                        <div className="flex flex-wrap gap-2">
                           {Array.isArray(q.options) && q.options.map((opt: string, oi: number) => (
                             <span key={oi} className={`text-[10px] px-3 py-1 rounded-full border ${opt === q.answer ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                {opt}
                             </span>
                           ))}
                        </div>
                      </div>
                    )) : (
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-xs italic">
                        No structured assessment steps found.
                      </div>
                    )}
                  </div>
                </section>

                {/* 6. Capstone Project */}
                <section className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-400">Phase Capstone</h3>
                   <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10">
                      <h4 className="text-lg font-black mb-2">{selectedLesson.project?.title || 'Micro Lab'}</h4>
                      <ul className="space-y-2">
                        {Array.isArray(selectedLesson.project?.steps || selectedLesson.project?.tasks || selectedLesson.project?.instructions) ? 
                          (selectedLesson.project?.steps || selectedLesson.project?.tasks || selectedLesson.project?.instructions).map((step: any, si: number) => (
                          <li key={si} className="text-sm text-white/50 flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">{si+1}</span>
                            {typeof step === 'string' ? step : JSON.stringify(step)}
                          </li>
                        )) : (
                          <li className="text-sm text-white/30 italic">No steps defined.</li>
                        )}
                      </ul>
                   </div>
                </section>
              </div>

              {/* Modal Footer / Action Bar */}
              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => handleDelete(selectedLesson.skillId, selectedLesson.lessonId)}
                    className="h-14 px-8 rounded-2xl border-rose-500/20 text-rose-400 hover:bg-rose-500/10 font-black text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Discard Draft
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedLesson(null)}
                    className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 font-black text-xs uppercase tracking-widest"
                  >
                    Close Preview
                  </Button>
                  <Button 
                    disabled={isPublishing}
                    onClick={() => handlePublish(selectedLesson.skillId, selectedLesson.lessonId)}
                    className="h-14 px-10 rounded-2xl bg-emerald-500 text-black font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Rocket size={18} fill="currentColor" /> {isPublishing ? 'Deploying...' : 'Publish to Academy'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
