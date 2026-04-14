import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Badge } from '../../components/ui';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Trash2,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../../lib/firebase';
import { approveLesson } from '../../services/aiGeneratorService';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../../types';

export const ManageLessons: React.FC = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    onValue(skillsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSkills(Object.values(snapshot.val()));
      }
    });

    const aiLessonsRef = ref(db, 'ai_generated_lessons');
    const unsubscribe = onValue(aiLessonsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const allLessons: any[] = [];
        Object.keys(data).forEach(skillId => {
          Object.keys(data[skillId]).forEach(lessonKey => {
            allLessons.push({
              ...data[skillId][lessonKey],
              skillId,
              key: lessonKey
            });
          });
        });
        setLessons(allLessons.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
      } else {
        setLessons([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (lesson: any) => {
    try {
      await approveLesson(lesson.skillId, lesson.key);
      // Success notification could go here
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (lesson: any) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      const lessonRef = ref(db, `ai_generated_lessons/${lesson.skillId}/${lesson.key}`);
      await remove(lessonRef);
    }
  };

  const filteredLessons = lessons.filter(l => {
    const matchesFilter = filter === 'all' || l.status === filter;
    const matchesSkill = skillFilter === 'all' || l.skillId === skillFilter;
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.skillId.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSkill && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Manage Lessons</h1>
            <p className="text-white/40 font-medium">Review and approve AI-generated content.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search lessons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-12 pr-6 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all w-64"
              />
            </div>
            <select 
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="h-12 px-4 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all max-w-[200px]"
            >
              <option value="all">All Skills</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.title}</option>
              ))}
            </select>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-12 px-4 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest">Loading lessons...</div>
          ) : filteredLessons.length === 0 ? (
            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest">No lessons found</div>
          ) : (
            filteredLessons.map((lesson) => (
              <Card key={lesson.key} className="p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    lesson.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {lesson.status === 'approved' ? <CheckCircle2 size={24} /> : <Sparkles size={24} />}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold truncate">{lesson.title}</h3>
                      <Badge className="bg-white/5 text-white/40 text-[10px] px-2 py-0.5 rounded-md uppercase tracking-widest">
                        {lesson.skillId}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/40 truncate">{lesson.todayYouAreLearning}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Difficulty</p>
                      <p className="text-xs font-bold">{lesson.difficulty}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedLesson(lesson)}
                        className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all"
                        title="Preview"
                      >
                        <Eye size={20} />
                      </button>
                      {lesson.status === 'pending' && (
                        <button 
                          onClick={() => handleApprove(lesson)}
                          className="p-3 hover:bg-emerald-500/10 rounded-xl text-emerald-500 transition-all"
                          title="Approve"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(lesson)}
                        className="p-3 hover:bg-red-500/10 rounded-xl text-red-500 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] p-0 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{selectedLesson.title}</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Lesson Preview • {selectedLesson.skillId}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLesson(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 space-y-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Objective</h4>
                    <p className="text-lg font-bold">{selectedLesson.todayYouAreLearning}</p>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Analogy</h4>
                    <p className="text-sm text-white/60 italic">"{selectedLesson.analogy}"</p>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Difficulty</h4>
                    <Badge className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg uppercase tracking-widest text-[10px]">
                      {selectedLesson.difficulty}
                    </Badge>
                  </section>
                </div>

                <section className="space-y-4">
                  <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Technical Explanation</h4>
                  <div className="text-white/60 leading-relaxed text-sm whitespace-pre-wrap bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                    {selectedLesson.explanation}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Code Implementation</h4>
                  <div className="space-y-4">
                    <pre className="p-6 bg-black rounded-2xl border border-white/5 font-mono text-sm text-emerald-400 overflow-x-auto shadow-2xl">
                      {selectedLesson.codeExample}
                    </pre>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <p className="text-xs text-emerald-500/60 font-medium leading-relaxed">
                        <span className="font-black uppercase mr-2">Line by Line:</span>
                        {selectedLesson.lineByLine}
                      </p>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Knowledge Check</h4>
                    <div className="space-y-4">
                      {selectedLesson.quiz.map((q: any, i: number) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                          <p className="font-bold text-sm">{q.question}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {q.options.map((opt: string, optIdx: number) => (
                              <div key={optIdx} className={`p-3 rounded-lg text-xs font-medium border ${optIdx === q.correctIndex ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-transparent text-white/40'}`}>
                                {opt}
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-white/20 italic">{q.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Practical Project</h4>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                      <div className="space-y-1">
                        <p className="font-black text-lg">{selectedLesson.project?.title || selectedLesson.miniProject?.title}</p>
                        <p className="text-xs text-white/40 leading-relaxed">{selectedLesson.project?.description || selectedLesson.miniProject?.description}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Implementation Steps</p>
                        <ul className="space-y-2">
                          {(selectedLesson.project?.steps || selectedLesson.miniProject?.steps || []).map((step: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-xs text-white/60">
                              <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[10px] font-black">{idx + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Sparkles size={16} />
                      <h4 className="text-xs font-black uppercase tracking-widest">Interview Mastery</h4>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed bg-purple-500/5 p-6 rounded-2xl border border-purple-500/10">
                      {selectedLesson.interviewTips}
                    </p>
                  </section>
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <ChevronRight size={16} />
                      <h4 className="text-xs font-black uppercase tracking-widest">Career Readiness</h4>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed bg-blue-500/5 p-6 rounded-2xl border border-blue-500/10">
                      {selectedLesson.careerTips}
                    </p>
                  </section>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedLesson(null)} className="rounded-xl">Close</Button>
                {selectedLesson.status === 'pending' && (
                  <Button onClick={() => handleApprove(selectedLesson)} className="rounded-xl px-8">Approve & Publish</Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
