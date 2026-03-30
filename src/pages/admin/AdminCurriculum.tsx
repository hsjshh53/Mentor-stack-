import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Star, 
  ArrowUp, 
  ArrowDown,
  Search,
  Filter,
  Save,
  Layout
} from 'lucide-react';
import { motion } from 'motion/react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import { CURRICULUM } from '../../constants/curriculum';

interface SkillMetadata {
  id: string;
  status: 'active' | 'in_progress' | 'coming_soon';
  isFeatured: boolean;
  order: number;
}

export const AdminCurriculum: React.FC = () => {
  const [skillsMetadata, setSkillsMetadata] = useState<Record<string, SkillMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metaSnap = await get(ref(db, 'admin/curriculum'));
        if (metaSnap.exists()) {
          setSkillsMetadata(metaSnap.val());
        } else {
          // Initialize with default values from CURRICULUM constant
          const initialMeta: Record<string, SkillMetadata> = {};
          Object.keys(CURRICULUM).forEach((key, index) => {
            const skill = CURRICULUM[key as any];
            initialMeta[skill.id] = {
              id: skill.id,
              status: skill.status as any || 'coming_soon',
              isFeatured: skill.recommended || false,
              order: index
            };
          });
          setSkillsMetadata(initialMeta);
        }
      } catch (error) {
        console.error('Error fetching curriculum metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  const handleStatusChange = (id: string, status: SkillMetadata['status']) => {
    setSkillsMetadata(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  const handleToggleFeatured = (id: string) => {
    setSkillsMetadata(prev => ({
      ...prev,
      [id]: { ...prev[id], isFeatured: !prev[id].isFeatured }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await update(ref(db, 'admin/curriculum'), skillsMetadata);
      alert('Curriculum settings saved successfully!');
    } catch (error) {
      console.error('Error saving curriculum settings:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const filteredSkills = Object.keys(CURRICULUM).filter(key => {
    const skill = CURRICULUM[key as any];
    return skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           skill.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          <h1 className="text-3xl font-bold tracking-tight">Curriculum Management</h1>
          <p className="text-gray-400">Manage development skills, set availability, and feature paths.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredSkills.map((key) => {
          const skill = CURRICULUM[key as any];
          const meta = skillsMetadata[skill.id] || { id: skill.id, status: 'coming_soon', isFeatured: false, order: 0 };
          
          return (
            <motion.div
              key={skill.id}
              layout
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10 shrink-0">
                <Layout className="w-8 h-8 text-blue-400" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                    <p className="text-sm text-gray-500">{skill.category}</p>
                  </div>
                  <button 
                    onClick={() => handleToggleFeatured(skill.id)}
                    className={`p-2 rounded-lg transition-all ${meta.isFeatured ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/5 text-gray-500 hover:text-gray-400'}`}
                  >
                    <Star className={`w-5 h-5 ${meta.isFeatured ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => handleStatusChange(skill.id, 'active')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${meta.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-500 border-transparent hover:bg-white/10'}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active
                  </button>
                  <button 
                    onClick={() => handleStatusChange(skill.id, 'in_progress')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${meta.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-gray-500 border-transparent hover:bg-white/10'}`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    In Progress
                  </button>
                  <button 
                    onClick={() => handleStatusChange(skill.id, 'coming_soon')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${meta.status === 'coming_soon' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-white/5 text-gray-500 border-transparent hover:bg-white/10'}`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Coming Soon
                  </button>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">
                      Modules: {(() => {
                        const levels = (skill as any).levels || {};
                        return Object.values(levels as any).reduce((acc: number, level: any) => acc + (level.modules?.length || 0), 0) as any;
                      })()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="text-xs text-gray-500 font-medium">Skills: {(skill as any).skills?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
