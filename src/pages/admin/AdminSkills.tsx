import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Layout, 
  Database, 
  Smartphone, 
  BarChart, 
  Cpu, 
  Shield, 
  Layers, 
  Activity, 
  Terminal, 
  Server, 
  Cloud, 
  Settings, 
  PenTool, 
  Box, 
  Zap, 
  Bot, 
  Brain, 
  Gamepad2, 
  Glasses, 
  Microchip, 
  Link2,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getSkills, updateSkill } from '../../services/adminService';
import { TECH_TOOLS } from '../../constants/techStack';

const SKILL_CATEGORIES = [
  'Core Software Development',
  'Data & AI',
  'Security',
  'Infrastructure & Systems',
  'Specialized Development',
  'Product & Design',
  'Emerging / High-Income Skills',
  'Programming Languages',
  'Frontend Tools & Frameworks',
  'Backend Frameworks',
  'Databases',
  'Cloud & Hosting',
  'Authentication & Payments',
  'Testing Tools',
  'Version Control',
  'Development Tools',
  'Package Managers',
  'DevOps & Deployment',
  'APIs & Real-Time',
  'UI/UX & Design Tools',
  'Specialized Tech'
];

export const AdminSkills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      console.log('AdminSkills: Starting to fetch skills...');
      setLoading(true);
      setError(null);
      try {
        const data = await getSkills();
        console.log(`AdminSkills: Fetched ${data.length} skills from Firebase.`);
        
        if (data.length === 0) {
          console.log('AdminSkills: No skills in Firebase, using local fallback seed.');
          setSkills(TECH_TOOLS.map(tool => ({
            ...tool,
            status: 'active',
            isFallback: true
          })));
        } else {
          setSkills(data);
        }
      } catch (err) {
        console.error('AdminSkills: Error fetching skills:', err);
        setError('Failed to load skills from database. Using local fallback.');
        setSkills(TECH_TOOLS.map(tool => ({
          ...tool,
          status: 'active',
          isFallback: true
        })));
      } finally {
        setLoading(false);
        console.log('AdminSkills: Fetch skills completed.');
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = (skill.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (skill.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const deleteSkill = (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill? This cannot be undone.')) {
      // In a real app, this would call a service to delete the skill from Firebase
      setSkills(prev => prev.filter(s => s.id !== skillId));
    }
  };

  const toggleStatus = async (skillId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateSkill(skillId, { status: newStatus });
      setSkills(prev => prev.map(s => s.id === skillId ? { ...s, status: newStatus } : s));
    } catch (error) {
      console.error('Error updating skill status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills & Tools</h1>
            <p className="text-gray-400 mt-2">Manage the technical skills and tools available on the platform.</p>
            {error && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {error}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center gap-2">
              <Plus size={18} />
              Add New Skill
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search skills, tools, descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', ...SKILL_CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-green-500 text-black border-green-500' 
                    : 'bg-[#121214] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 transition-all group relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">{skill.name}</h3>
              <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                {skill.description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <button 
                  onClick={() => toggleStatus(skill.id, skill.status || 'active')}
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    (skill.status || 'active') === 'active' ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {(skill.status || 'active') === 'active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {skill.status || 'active'}
                </button>
                <button className="text-xs text-green-400 hover:underline flex items-center gap-1">
                  Details <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSkills.length === 0 && !loading && (
          <div className="text-center py-20 bg-[#121214] border border-white/5 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No skills found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">Loading skills...</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
