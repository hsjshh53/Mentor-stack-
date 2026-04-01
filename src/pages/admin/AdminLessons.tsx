import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Globe, 
  Lock, 
  MoreVertical,
  BookOpen,
  ChevronRight,
  Save,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, update, remove } from 'firebase/database';
import { db } from '../../lib/firebase';
import { LESSON_CONTENT } from '../../constants/lessons';
import { LessonContent } from '../../types';
import Markdown from 'react-markdown';

export const AdminLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Record<string, LessonContent>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLesson, setEditingLesson] = useState<LessonContent | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Fetch from database
        const lessonsSnap = await get(ref(db, 'lessons'));
        const dbLessons = lessonsSnap.exists() ? lessonsSnap.val() : {};
        
        // Merge with static lessons (DB overrides static)
        setLessons({ ...LESSON_CONTENT, ...dbLessons });
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleSaveLesson = async (lesson: LessonContent) => {
    setSaving(true);
    try {
      await set(ref(db, `lessons/${lesson.id}`), lesson);
      setLessons(prev => ({ ...prev, [lesson.id]: lesson }));
      setEditingLesson(null);
      alert('Lesson saved successfully!');
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lesson? This will remove it from the database.')) return;
    
    try {
      await remove(ref(db, `lessons/${id}`));
      const newLessons = { ...lessons };
      delete newLessons[id];
      setLessons(newLessons);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const filteredLessons = Object.values(lessons).filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Lesson Management</h1>
          <p className="text-gray-400">Create, edit, and organize platform curriculum content.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button 
            onClick={() => setEditingLesson({
              id: '',
              title: '',
              todayYouAreLearning: '',
              whyItMatters: '',
              explanation: '',
              analogy: '',
              codeExample: '',
              lineByLine: '',
              commonMistakes: [],
              practice: '',
              challenge: '',
              quiz: [],
              recap: ''
            })}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            New Lesson
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            layout
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">{lesson.title}</h3>
                <p className="text-xs text-gray-500 font-mono">{lesson.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => {
                  setEditingLesson(lesson);
                  setIsPreviewOpen(true);
                }}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Preview"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setEditingLesson(lesson)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDeleteLesson(lesson.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {editingLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !saving && setEditingLesson(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">{editingLesson.id ? 'Edit Lesson' : 'Create New Lesson'}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isPreviewOpen ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    <Eye className="w-4 h-4" />
                    {isPreviewOpen ? 'Editing Mode' : 'Preview Mode'}
                  </button>
                  <button 
                    onClick={() => handleSaveLesson(editingLesson)}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all"
                  >
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Lesson
                  </button>
                  <button 
                    onClick={() => setEditingLesson(null)}
                    disabled={saving}
                    className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {isPreviewOpen ? (
                  <div className="max-w-3xl mx-auto space-y-12 pb-20">
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold text-white">{editingLesson.title || 'Untitled Lesson'}</h1>
                      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                        <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Today you are learning
                        </h3>
                        <p className="text-gray-300">{editingLesson.todayYouAreLearning}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white">Why it matters</h2>
                      <p className="text-lg text-gray-400 leading-relaxed">{editingLesson.whyItMatters}</p>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white">Explanation</h2>
                      <div className="prose prose-invert max-w-none">
                        <Markdown>{editingLesson.explanation}</Markdown>
                      </div>
                    </div>

                    {editingLesson.codeExample && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Code Example</h2>
                        <pre className="p-6 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm overflow-x-auto">
                          <code>{editingLesson.codeExample}</code>
                        </pre>
                        {editingLesson.lineByLine && (
                          <p className="text-sm text-gray-500 italic">{editingLesson.lineByLine}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lesson ID (slug)</label>
                        <input 
                          type="text" 
                          value={editingLesson.id}
                          onChange={(e) => setEditingLesson({ ...editingLesson, id: e.target.value })}
                          placeholder="e.g. intro-to-react"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                        <input 
                          type="text" 
                          value={editingLesson.title}
                          onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                          placeholder="Lesson Title"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Today You Are Learning</label>
                        <textarea 
                          rows={3}
                          value={editingLesson.todayYouAreLearning}
                          onChange={(e) => setEditingLesson({ ...editingLesson, todayYouAreLearning: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Why It Matters</label>
                        <textarea 
                          rows={3}
                          value={editingLesson.whyItMatters}
                          onChange={(e) => setEditingLesson({ ...editingLesson, whyItMatters: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Explanation (Markdown)</label>
                        <textarea 
                          rows={10}
                          value={editingLesson.explanation}
                          onChange={(e) => setEditingLesson({ ...editingLesson, explanation: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Code Example</label>
                        <textarea 
                          rows={5}
                          value={editingLesson.codeExample}
                          onChange={(e) => setEditingLesson({ ...editingLesson, codeExample: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
