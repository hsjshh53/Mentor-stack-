import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronRight, Edit3, Trash2, 
  Plus, Search, Filter, Layout, Database, 
  Smartphone, BarChart, Cpu, Shield, Globe,
  CheckCircle2, Clock, AlertCircle, MoreVertical,
  Target, Zap, Layers
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
import { CURRICULUM } from '../../constants/curriculum';
import { ref, get, update } from 'firebase/database';
import { db } from '../../lib/firebase';

export const AdminCurriculum: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [curriculumStats, setCurriculumStats] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchCurriculumStats = async () => {
      try {
        const roadmapsSnap = await get(ref(db, 'roadmaps'));
        const lessonsSnap = await get(ref(db, 'lessons'));
        
        const stats: Record<string, any> = {};
        
        if (roadmapsSnap.exists()) {
          Object.entries(roadmapsSnap.val()).forEach(([id, roadmap]: [string, any]) => {
            stats[roadmap.skill] = {
              modules: roadmap.modules?.length || 0,
              lessons: 0,
              published: 0,
              drafts: 0,
              target: 120 // Default target
            };
          });
        }
        
        if (lessonsSnap.exists()) {
          Object.values(lessonsSnap.val()).forEach((lesson: any) => {
            if (!stats[lesson.skill]) {
              stats[lesson.skill] = { modules: 0, lessons: 0, published: 0, drafts: 0, target: 120 };
            }
            stats[lesson.skill].lessons++;
            if (lesson.published) {
              stats[lesson.skill].published++;
            } else {
              stats[lesson.skill].drafts++;
            }
          });
        }
        
        setCurriculumStats(stats);
      } catch (error) {
        console.error('Error fetching curriculum stats:', error);
      }
    };

    fetchCurriculumStats();
  }, []);

  const categories = Array.from(new Set(Object.values(CURRICULUM).map(p => p.category)));

  const filteredPaths = Object.entries(CURRICULUM).filter(([name, data]: [string, any]) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         data.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || data.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search curriculum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 md:h-14 bg-white/[0.02] border border-white/[0.05] rounded-2xl pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <Button 
            variant={selectedCategory === null ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className="h-10 md:h-12 px-4 md:px-6 rounded-xl text-[10px] md:text-xs font-black tracking-widest uppercase whitespace-nowrap"
          >
            All
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className="h-10 md:h-12 px-4 md:px-6 rounded-xl text-[10px] md:text-xs font-black tracking-widest uppercase whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredPaths.map(([name, data]) => {
          const stats = curriculumStats[name] || {
            modules: Object.values(data.levels).reduce((acc, l) => acc + l.modules.length, 0),
            lessons: Object.values(data.levels).reduce((acc, l) => acc + l.modules.reduce((mAcc, m) => mAcc + (m.lessons?.length || 0), 0), 0),
            published: 0,
            drafts: 0,
            target: 120
          };
          
          return (
            <Card key={name} className="p-5 md:p-6 bg-white/[0.02] border-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between h-full">
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`text-[9px] md:text-[10px] px-2 py-0.5 ${
                      data.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      data.status === 'partial' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      'bg-white/5 text-white/20 border-white/10'
                    }`}>
                      {data.status?.toUpperCase()}
                    </Badge>
                    <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/20">{data.category}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-black text-lg md:text-xl tracking-tight group-hover:text-emerald-400 transition-colors truncate">{name}</h4>
                  <p className="text-xs text-white/30 font-medium leading-relaxed line-clamp-2 h-8">{data.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex flex-col justify-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Modules</p>
                    <p className="text-sm font-black">{stats.modules}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex flex-col justify-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Lessons</p>
                    <p className="text-sm font-black">{stats.lessons}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
                    <span>Progress to Target</span>
                    <span className="text-emerald-500">{Math.round((stats.lessons / stats.target) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (stats.lessons / stats.target) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/10">
                    <span>{stats.published} Published</span>
                    <span>Target: {stats.target}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6 relative z-10">
                <Button 
                  onClick={() => navigate(`/admin/curriculum/${data.id || name.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="flex-grow h-10 rounded-xl font-black tracking-tight text-[10px] gap-2"
                >
                  <Edit3 size={12} />
                  Edit Curriculum
                </Button>
                <button className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Background Icon */}
              <div className="absolute -right-6 -bottom-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none transform rotate-12 scale-125">
                 <BookOpen size={100} />
              </div>
            </Card>
          );
        })}

        {/* Add New Skill Card */}
        <button className="p-6 rounded-[1.5rem] border-2 border-dashed border-white/[0.05] hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-500 group flex flex-col items-center justify-center gap-4 text-center min-h-[280px]">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-500">
            <Plus size={28} />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-xl tracking-tight text-white/40 group-hover:text-white transition-colors">Add Skill</h4>
            <p className="text-xs text-white/20 font-medium">Create new path</p>
          </div>
        </button>
      </div>
    </div>
  );
};

