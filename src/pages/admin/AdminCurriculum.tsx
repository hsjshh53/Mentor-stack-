import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Layout,
  Database,
  Globe,
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
  Link2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getSkills } from '../../services/adminService';

const categoryIcons: Record<string, any> = {
  'Core Software Development': Layout,
  'Data & AI': Database,
  'Security': Shield,
  'Infrastructure & Systems': Server,
  'Specialized Development': Box,
  'Product & Design': PenTool,
  'Emerging / High-Income Skills': Zap,
};

const statusColors: Record<string, string> = {
  'active': 'text-green-400 bg-green-400/10 border-green-400/20',
  'in progress': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'coming soon': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'completed': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

export const AdminCurriculum: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [curriculumList, setCurriculumList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurriculum = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSkills();
        setCurriculumList(data);
      } catch (err: any) {
        console.error('Error fetching curriculum:', err);
        setError(err.message || 'Failed to load curriculum data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, []);

  const categories = ['All', ...Array.from(new Set(curriculumList.map(c => c.category).filter(Boolean)))];

  const filteredCurriculum = curriculumList.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Curriculum Management</h1>
            <p className="text-gray-400 mt-2">Manage all 26+ development skills and learning paths.</p>
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
                <button onClick={() => window.location.reload()} className="ml-auto underline">Retry</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center gap-2">
              <BookOpen size={18} />
              Bulk Generate
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search skills, descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  filterCategory === cat 
                    ? 'bg-green-500 text-black border-green-500' 
                    : 'bg-[#121214] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Curriculum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCurriculum.map((item, index) => {
            const Icon = categoryIcons[item.category] || BookOpen;
            const status = item.status || 'coming soon';
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 text-green-400 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[status] || statusColors['coming soon']}`}>
                    {status}
                  </div>
                </div>

                <div className="mt-6 space-y-2 relative z-10">
                  <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">{item.name || item.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{item.lessonCount || 0} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Layout size={14} />
                      <span>{item.moduleCount || 0} Modules</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 relative z-10">
                  {(item.tools || []).slice(0, 4).map((tool: string) => (
                    <span key={tool} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500 font-mono">
                      {tool}
                    </span>
                  ))}
                  {(item.tools || []).length > 4 && (
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500 font-mono">
                      +{(item.tools || []).length - 4}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => navigate(`/admin/curriculum/${item.id}`)}
                  className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  Manage Curriculum
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {filteredCurriculum.length === 0 && !loading && (
          <div className="text-center py-20 bg-[#121214] border border-white/5 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No results found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">Loading curriculum...</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
