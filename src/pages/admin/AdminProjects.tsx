import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Star,
  Loader2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getProjectSubmissions, updateProjectStatus } from '../../services/adminService';

export const AdminProjects: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getProjectSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, projectId: string, status: string) => {
    try {
      await updateProjectStatus(userId, projectId, status);
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'All') return true;
    return s.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Submissions</h1>
            <p className="text-gray-400 mt-2">Review and manage student project submissions.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#121214] border border-white/5 rounded-xl p-1">
              {['All', 'Pending', 'Reviewed', 'Featured'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    filter === f ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p>Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Target className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400">No submissions found.</p>
            </div>
          ) : (
            filteredSubmissions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                      <Target size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{sub.title}</h3>
                      <p className="text-sm text-gray-400">
                        Submitted by <span className="text-white font-medium">{sub.userName}</span> • 
                        {new Date(sub.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      {sub.githubUrl && (
                        <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="GitHub">
                          <Github size={18} />
                        </a>
                      )}
                      {sub.liveUrl && (
                        <a href={sub.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="Live Demo">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>

                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      sub.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                      sub.status === 'reviewed' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                      'text-purple-400 bg-purple-400/10 border-purple-400/20'
                    }`}>
                      {sub.status}
                    </div>

                    <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <button 
                        onClick={() => handleStatusUpdate(sub.userId, sub.id, 'reviewed')}
                        className="p-2 hover:bg-green-500/10 rounded-lg transition-colors text-gray-400 hover:text-green-400" 
                        title="Approve"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(sub.userId, sub.id, 'featured')}
                        className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-purple-400" 
                        title="Feature"
                      >
                        <Star size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(sub.userId, sub.id, 'rejected')}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" 
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
