import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Badge, Button, Modal, Textarea, Input } from '../../components/ui';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  BookOpen,
  AlertCircle,
  Loader2,
  Save,
  Trash2,
  Edit2
} from 'lucide-react';
import { ref, onValue, update, remove, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { approveLesson } from '../../services/aiGeneratorService';
import { motion, AnimatePresence } from 'motion/react';

export const ReviewLessonsPage: React.FC = () => {
  const { skillId, moduleId } = useParams<{ skillId: string; moduleId: string }>();
  const navigate = useNavigate();
  
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [skill, setSkill] = useState<any>(null);
  const [module, setModule] = useState<any>(null);

  useEffect(() => {
    if (!skillId || !moduleId) return;

    // Fetch Skill and Module info
    const skillRef = ref(db, `skills/${skillId}`);
    get(skillRef).then(snap => setSkill(snap.val()));

    // Fetch Pending Lessons
    const lessonsRef = ref(db, `ai_generated_lessons/${skillId}`);
    const unsubscribe = onValue(lessonsRef, (snapshot) => {
      if (snapshot.exists()) {
        const allLessons = Object.values(snapshot.val()) as any[];
        const moduleLessons = allLessons
          .filter(l => l.moduleId === moduleId)
          .sort((a, b) => a.order - b.order);
        setLessons(moduleLessons);
      } else {
        setLessons([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [skillId, moduleId]);

  const currentLesson = lessons[currentIndex];

  const handleApprove = async () => {
    if (!currentLesson || !skillId || !moduleId) return;
    setApproving(true);
    try {
      await approveLesson(skillId, currentLesson.id);
      // Move to next lesson if available
      if (currentIndex < lessons.length - 1) {
        // The list will update via onValue, but we might need to adjust index
      } else if (lessons.length === 1) {
        navigate('/admin/curriculum');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to approve lesson');
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async () => {
    if (!currentLesson || !skillId) return;
    if (!window.confirm('Are you sure you want to delete this AI-generated lesson?')) return;
    
    try {
      await remove(ref(db, `ai_generated_lessons/${skillId}/${currentLesson.id}`));
      if (lessons.length === 1) {
        navigate('/admin/curriculum');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete lesson');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingLesson || !skillId) return;
    try {
      await update(ref(db, `ai_generated_lessons/${skillId}/${editingLesson.id}`), editingLesson);
      setEditingLesson(null);
    } catch (error) {
      console.error(error);
      alert('Failed to save changes');
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 size={40} className="animate-spin text-emerald-500" />
        <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Lessons for Review...</p>
      </div>
    </AdminLayout>
  );

  if (lessons.length === 0) return (
    <AdminLayout>
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">All Lessons Reviewed</h2>
          <p className="text-white/40 max-w-xs mx-auto">There are no more pending lessons to review in this module.</p>
        </div>
        <Button onClick={() => navigate('/admin/curriculum')} className="h-14 px-8 rounded-2xl">
          <ArrowLeft size={20} className="mr-2" />
          Back to Curriculum
        </Button>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/admin/curriculum')}
              className="p-3 -ml-3 hover:bg-white/5 rounded-2xl transition-all"
            >
              <ArrowLeft size={24} className="text-white/40" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Review Mode</Badge>
                <h1 className="text-2xl font-black tracking-tight">Review AI Lessons</h1>
              </div>
              <p className="text-white/40 font-medium text-sm">
                {skill?.title} • Module: {currentLesson?.moduleTitle || 'Loading...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Progress</p>
              <p className="text-sm font-black">{currentIndex + 1} / {lessons.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="h-12 w-12 p-0 rounded-xl"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button 
                variant="ghost" 
                disabled={currentIndex === lessons.length - 1}
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="h-12 w-12 p-0 rounded-xl"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson Review Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-10 space-y-8 border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[8px] font-black uppercase tracking-widest">AI Generated Content</Badge>
                  <h2 className="text-3xl font-black tracking-tight">{currentLesson.title}</h2>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingLesson({ ...currentLesson })}
                  className="h-10 px-4 rounded-xl text-white/40 hover:text-white"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit Content
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Summary</h4>
                  <p className="text-white/60 leading-relaxed">{currentLesson.summary}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Explanation</h4>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 leading-relaxed whitespace-pre-wrap">
                    {currentLesson.explanation}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Analogy</h4>
                    <p className="text-sm text-white/40 italic">"{currentLesson.analogy}"</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Pro Tip</h4>
                    <p className="text-sm text-purple-400 font-medium">{currentLesson.proTip}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Code Example</h4>
                  <pre className="p-6 rounded-2xl bg-black/50 border border-white/5 text-emerald-400/80 font-mono text-sm overflow-x-auto">
                    {currentLesson.codeExample}
                  </pre>
                </div>
              </div>
            </Card>

            {/* Quiz Section */}
            <Card className="p-10 space-y-8 border-white/5 bg-white/[0.01]">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <AlertCircle size={20} className="text-emerald-500" />
                Knowledge Check
              </h3>
              <div className="space-y-8">
                {currentLesson.quiz?.map((q: any, i: number) => (
                  <div key={i} className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="font-bold text-white/80">{q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt: string, optIdx: number) => (
                        <div 
                          key={optIdx} 
                          className={`p-4 rounded-xl border text-sm font-medium ${
                            optIdx === q.correctIndex 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                              : 'bg-white/5 border-white/5 text-white/40'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/20 italic mt-2">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <Card className="p-8 space-y-6 border-white/5 bg-white/[0.03] sticky top-32">
              <div className="space-y-2">
                <h3 className="font-black text-xl tracking-tight">Quality Control</h3>
                <p className="text-xs text-white/40 font-medium">Review the AI content for accuracy, depth, and MentorStack standards before publishing.</p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleApprove}
                  disabled={approving}
                  className="w-full h-16 rounded-2xl bg-emerald-500 text-black font-black shadow-xl shadow-emerald-500/20"
                >
                  {approving ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} className="mr-2" />}
                  Approve & Publish
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReject}
                  className="w-full h-16 rounded-2xl border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={20} className="mr-2" />
                  Reject & Delete
                </Button>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Difficulty</span>
                  <span className="text-white">{currentLesson.difficulty}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Duration</span>
                  <span className="text-white">{currentLesson.estimatedDuration}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Quiz Questions</span>
                  <span className="text-white">{currentLesson.quiz?.length || 0}</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-white/5 bg-emerald-500/5 space-y-4">
              <div className="flex items-center gap-3 text-emerald-500">
                <Sparkles size={20} />
                <h4 className="font-black text-sm uppercase tracking-widest">Module Project</h4>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-sm">{currentLesson.project?.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{currentLesson.project?.description}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingLesson}
        onClose={() => setEditingLesson(null)}
        title="Edit Lesson Content"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingLesson(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </>
        }
      >
        {editingLesson && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            <Input 
              label="Lesson Title" 
              value={editingLesson.title} 
              onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
            />
            <Textarea 
              label="Summary" 
              value={editingLesson.summary} 
              onChange={(e) => setEditingLesson({ ...editingLesson, summary: e.target.value })}
            />
            <Textarea 
              label="Explanation" 
              rows={15}
              value={editingLesson.explanation} 
              onChange={(e) => setEditingLesson({ ...editingLesson, explanation: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Difficulty" 
                value={editingLesson.difficulty} 
                onChange={(e) => setEditingLesson({ ...editingLesson, difficulty: e.target.value })}
              />
              <Input 
                label="Duration" 
                value={editingLesson.estimatedDuration} 
                onChange={(e) => setEditingLesson({ ...editingLesson, estimatedDuration: e.target.value })}
              />
            </div>
            <Textarea 
              label="Code Example" 
              rows={10}
              className="font-mono"
              value={editingLesson.codeExample} 
              onChange={(e) => setEditingLesson({ ...editingLesson, codeExample: e.target.value })}
            />
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};
