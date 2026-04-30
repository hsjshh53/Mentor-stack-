import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Badge } from '../../components/ui';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Layers,
  CheckCircle2,
  X,
  BookOpen
} from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';
import { Skill, ProgramCategory } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { skillService } from '../../services/skillService';

const programCategories: ProgramCategory[] = [
  'career-path',
  'coding-languages',
  'development-skill',
  'tool-foundation',
  'career-prep'
];

const categoryLabels: Record<string, string> = {
  'career-path': 'Career Path',
  'coding-languages': 'Programming Language',
  'development-skill': 'Development Skill',
  'tool-foundation': 'Tools & Foundations',
  'career-prep': 'Career Prep'
};

export const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'career-path' as ProgramCategory,
    description: '',
    icon: 'Code',
    difficultyRange: 'Beginner to Expert',
    estimatedCompletionTime: '6 months',
    estimatedWeeks: 24,
    estimatedMonths: 6,
    careerOutcome: '',
    certificateEligible: true,
    published: true,
    toolsCovered: [] as string[],
    careerOutcomes: [] as string[],
    status: 'active' as 'active' | 'draft'
  });

  useEffect(() => {
    // Initialize skills if empty
    skillService.initializeSkills();

    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      console.log("[ManageSkills] SKILLS SNAPSHOT:", snapshot.val());
      try {
        if (snapshot.exists()) {
          const data = snapshot.val() || {};
          const list = Object.keys(data).map(id => ({ ...data[id], id }));
          setSkills(list);
        } else {
          setSkills([]);
        }
      } catch (err) {
        console.error("[ManageSkills] Data mapping error:", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("[ManageSkills] Skills fetch error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillData = {
      ...formData,
      slug: (formData.title || '').toLowerCase().replace(/\s+/g, '-'),
      lessonCount: editingSkill?.lessonCount || 0,
      totalStages: editingSkill?.totalStages || 0,
      totalModules: editingSkill?.totalModules || 0,
      totalLessons: editingSkill?.totalLessons || 0,
      totalProjects: editingSkill?.totalProjects || 0
    };

    if (editingSkill) {
      await skillService.updateSkill(editingSkill.id, skillData);
    } else {
      await skillService.addSkill(skillData);
    }
    
    setIsModalOpen(false);
    setEditingSkill(null);
    setFormData({ 
      title: '', 
      slug: '', 
      category: 'career-path', 
      description: '', 
      icon: 'Code', 
      difficultyRange: 'Beginner to Expert',
      estimatedCompletionTime: '6 months',
      estimatedWeeks: 24,
      estimatedMonths: 6,
      careerOutcome: '',
      certificateEligible: true,
      published: true,
      toolsCovered: [],
      careerOutcomes: [],
      status: 'active' 
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await skillService.deleteSkill(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Academy Programs</h1>
            <p className="text-white/40 font-medium">Manage the structured technology programs ({skills.length} total).</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="h-14 px-8 rounded-2xl">
            <Plus size={20} className="mr-2" />
            Add New Program
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && skills.length === 0 ? (
            <div className="col-span-full py-20 text-center text-white/20 font-black uppercase tracking-widest">Loading programs...</div>
          ) : skills.length === 0 ? (
            <div className="col-span-full py-20 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-white/20">
                <Layers size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black">No Programs Found</h3>
                <p className="text-white/40 max-w-xs mx-auto">Click the button above to add your first academy program.</p>
              </div>
            </div>
          ) : (
            skills.map((skill, index) => (
              <Card key={`${skill.id}-${index}`} className="p-8 border-white/5 bg-white/[0.02] space-y-6 group">
                <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Layers size={28} />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingSkill(skill);
                      setFormData({
                        title: skill.title,
                        slug: skill.slug,
                        category: skill.category as ProgramCategory,
                        description: skill.description,
                        icon: skill.icon,
                        difficultyRange: skill.difficultyRange || 'Beginner to Expert',
                        estimatedCompletionTime: skill.estimatedCompletionTime || '6 months',
                        estimatedWeeks: skill.estimatedWeeks || 24,
                        estimatedMonths: skill.estimatedMonths || 6,
                        careerOutcome: skill.careerOutcome || '',
                        certificateEligible: skill.certificateEligible ?? true,
                        published: skill.published ?? true,
                        toolsCovered: skill.toolsCovered || [],
                        careerOutcomes: skill.careerOutcomes || [],
                        status: skill.status
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-white/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black">{skill.title}</h3>
                  <Badge className={`${skill.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-white/20'} px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest`}>
                    {skill.status}
                  </Badge>
                </div>
                <p className="text-sm text-white/40 line-clamp-2">{skill.description}</p>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Duration</p>
                    <p className="text-xs font-bold">{skill.estimatedWeeks} Weeks</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Outcome</p>
                    <p className="text-xs font-bold truncate">{skill.careerOutcome || 'Professional'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Stages</p>
                    <p className="text-sm font-black">{skill.totalStages || 0}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Modules</p>
                    <p className="text-sm font-black">{skill.totalModules || 0}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Lessons</p>
                    <p className="text-sm font-black">{skill.totalLessons || 0}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/20">
                  <CheckCircle2 size={14} className={skill.certificateEligible ? 'text-emerald-500' : ''} />
                  <span className="text-xs font-bold">{skill.certificateEligible ? 'Certificate' : 'No Cert'}</span>
                </div>
                <Badge className="bg-white/5 text-white/40 text-[10px] px-2 py-1 rounded-lg uppercase tracking-widest">
                  {skill.category}
                </Badge>
              </div>
            </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">{editingSkill ? 'Edit Program' : 'Add New Program'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Program Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. Frontend Developer Academy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Estimated Weeks</label>
                    <input 
                      type="number" 
                      value={formData.estimatedWeeks}
                      onChange={(e) => setFormData({ ...formData, estimatedWeeks: parseInt(e.target.value) })}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Estimated Months</label>
                    <input 
                      type="number" 
                      value={formData.estimatedMonths}
                      onChange={(e) => setFormData({ ...formData, estimatedMonths: parseInt(e.target.value) })}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Career Outcome</label>
                  <input 
                    type="text" 
                    value={formData.careerOutcome}
                    onChange={(e) => setFormData({ ...formData, careerOutcome: e.target.value })}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Difficulty Range</label>
                    <input 
                      type="text" 
                      value={formData.difficultyRange}
                      onChange={(e) => setFormData({ ...formData, difficultyRange: e.target.value })}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Certificate Eligible</label>
                    <select 
                      value={formData.certificateEligible ? 'yes' : 'no'}
                      onChange={(e) => setFormData({ ...formData, certificateEligible: e.target.value === 'yes' })}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Published</label>
                    <select 
                      value={formData.published ? 'yes' : 'no'}
                      onChange={(e) => setFormData({ ...formData, published: e.target.value === 'yes' })}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                    >
                      <option value="yes">Yes (Visible)</option>
                      <option value="no">No (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Tools Covered (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.toolsCovered.join(', ')}
                    onChange={(e) => setFormData({ ...formData, toolsCovered: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. React, Next.js, TypeScript"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProgramCategory })}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                  >
                    {programCategories.map(cat => (
                      <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 font-bold focus:border-emerald-500 outline-none transition-all resize-none"
                    placeholder="Briefly describe what this program covers..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    fullWidth 
                    onClick={() => setIsModalOpen(false)}
                    className="h-14 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    fullWidth 
                    className="h-14 rounded-2xl"
                  >
                    {editingSkill ? 'Save Changes' : 'Create Program'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
