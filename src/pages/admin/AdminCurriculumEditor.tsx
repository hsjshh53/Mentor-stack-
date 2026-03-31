import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, Reorder } from 'motion/react';
import { 
  ChevronLeft, 
  Plus, 
  GripVertical, 
  Trash2, 
  Edit2, 
  Save, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  BookOpen,
  FileText,
  Video,
  Code,
  Layout
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getSkillCurriculum, updateSkillCurriculum, getSkills } from '../../services/adminService';

export const AdminCurriculumEditor: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [skill, setSkill] = useState<any>(null);
  const [curriculum, setCurriculum] = useState<any>({ modules: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string, lessonId: string } | null>(null);

  useEffect(() => {
    if (skillId) {
      fetchData();
    }
  }, [skillId]);

  const fetchData = async () => {
    try {
      const [skillsData, curriculumData] = await Promise.all([
        getSkills(),
        getSkillCurriculum(skillId!)
      ]);
      const currentSkill = skillsData.find((s: any) => s.id === skillId);
      setSkill(currentSkill);
      setCurriculum(curriculumData || { modules: [] });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSkillCurriculum(skillId!, curriculum);
      alert('Curriculum saved successfully!');
    } catch (error) {
      console.error('Error saving curriculum:', error);
    } finally {
      setSaving(false);
    }
  };

  const addModule = () => {
    const newModule = {
      id: `module_${Date.now()}`,
      title: 'New Module',
      description: 'Enter module description...',
      lessons: []
    };
    setCurriculum({ ...curriculum, modules: [...curriculum.modules, newModule] });
    setEditingModule(newModule.id);
  };

  const addLesson = (moduleId: string) => {
    const newLesson = {
      id: `lesson_${Date.now()}`,
      title: 'New Lesson',
      duration: '15 mins',
      type: 'text',
      status: 'draft'
    };
    const updatedModules = curriculum.modules.map((m: any) => {
      if (m.id === moduleId) {
        return { ...m, lessons: [...(m.lessons || []), newLesson] };
      }
      return m;
    });
    setCurriculum({ ...curriculum, modules: updatedModules });
    setEditingLesson({ moduleId, lessonId: newLesson.id });
  };

  const deleteModuleLocal = (moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module and all its lessons?')) {
      setCurriculum({
        ...curriculum,
        modules: curriculum.modules.filter((m: any) => m.id !== moduleId)
      });
    }
  };

  const deleteLessonLocal = (moduleId: string, lessonId: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      const updatedModules = curriculum.modules.map((m: any) => {
        if (m.id === moduleId) {
          return { ...m, lessons: m.lessons.filter((l: any) => l.id !== lessonId) };
        }
        return m;
      });
      setCurriculum({ ...curriculum, modules: updatedModules });
    }
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    const updatedModules = curriculum.modules.map((m: any) => {
      if (m.id === moduleId) return { ...m, title };
      return m;
    });
    setCurriculum({ ...curriculum, modules: updatedModules });
  };

  const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
    const updatedModules = curriculum.modules.map((m: any) => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map((l: any) => l.id === lessonId ? { ...l, title } : l)
        };
      }
      return m;
    });
    setCurriculum({ ...curriculum, modules: updatedModules });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p>Loading curriculum editor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin/curriculum')}
              className="p-2 hover:bg-white/5 rounded-xl transition-all text-gray-400 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Curriculum: {skill?.name}</h1>
              <p className="text-gray-400 mt-2">Structure modules and lessons for this learning path.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Curriculum'}
            </button>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          <Reorder.Group axis="y" values={curriculum.modules} onReorder={(newOrder) => setCurriculum({ ...curriculum, modules: newOrder })} className="space-y-6">
            {curriculum.modules.map((module: any) => (
              <Reorder.Item 
                key={module.id} 
                value={module}
                className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden"
              >
                {/* Module Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
                  <div className="flex items-center gap-4 flex-1">
                    <GripVertical className="text-gray-600 cursor-grab active:cursor-grabbing" size={20} />
                    {editingModule === module.id ? (
                      <input 
                        autoFocus
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                        onBlur={() => setEditingModule(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingModule(null)}
                        className="bg-white/5 border border-green-500/50 rounded-lg px-3 py-1 outline-none text-xl font-bold w-full max-w-md"
                      />
                    ) : (
                      <h3 
                        onClick={() => setEditingModule(module.id)}
                        className="text-xl font-bold cursor-pointer hover:text-green-400 transition-colors"
                      >
                        {module.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => addLesson(module.id)}
                      className="p-2 hover:bg-green-500/10 text-green-400 rounded-lg transition-colors"
                      title="Add Lesson"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={() => deleteModuleLocal(module.id)}
                      className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                      title="Delete Module"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="p-4 space-y-2">
                  <Reorder.Group 
                    axis="y" 
                    values={module.lessons || []} 
                    onReorder={(newLessons) => {
                      const updatedModules = curriculum.modules.map((m: any) => 
                        m.id === module.id ? { ...m, lessons: newLessons } : m
                      );
                      setCurriculum({ ...curriculum, modules: updatedModules });
                    }}
                    className="space-y-2"
                  >
                    {(module.lessons || []).map((lesson: any) => (
                      <Reorder.Item 
                        key={lesson.id} 
                        value={lesson}
                        className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl hover:border-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <GripVertical className="text-gray-700 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                          <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                            {lesson.type === 'video' ? <Video size={16} /> : lesson.type === 'code' ? <Code size={16} /> : <FileText size={16} />}
                          </div>
                          {editingLesson?.lessonId === lesson.id ? (
                            <input 
                              autoFocus
                              type="text"
                              value={lesson.title}
                              onChange={(e) => updateLessonTitle(module.id, lesson.id, e.target.value)}
                              onBlur={() => setEditingLesson(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingLesson(null)}
                              className="bg-white/5 border border-green-500/50 rounded-lg px-3 py-1 outline-none text-sm font-medium w-full max-w-sm"
                            />
                          ) : (
                            <span 
                              onClick={() => setEditingLesson({ moduleId: module.id, lessonId: lesson.id })}
                              className="text-sm font-medium cursor-pointer hover:text-green-400 transition-colors"
                            >
                              {lesson.title}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold px-2 py-0.5 bg-white/5 rounded">
                            {lesson.duration}
                          </span>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => navigate(`/admin/lesson-generator?skill=${skillId}&module=${module.id}&lesson=${lesson.id}`)}
                              className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-white rounded-lg transition-colors"
                              title="Edit Content"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={() => deleteLessonLocal(module.id, lesson.id)}
                              className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                              title="Delete Lesson"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>

                  {(module.lessons || []).length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/5 rounded-xl text-gray-500 text-sm">
                      No lessons in this module yet.
                    </div>
                  )}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <button 
            onClick={addModule}
            className="w-full py-6 border-2 border-dashed border-white/5 hover:border-green-500/30 hover:bg-green-500/5 rounded-2xl text-gray-500 hover:text-green-400 transition-all flex flex-col items-center gap-2"
          >
            <Plus size={32} />
            <span className="font-bold">Add New Module</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
