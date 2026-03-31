import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Flag, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  MoreVertical,
  UserX,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getReports, updateReportStatus, deleteReport } from '../../services/adminService';

export const AdminModeration: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReports();
      setReports(data);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      setError(err.message || 'Failed to load moderation reports.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateReportStatus(id, status);
      fetchReports();
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    try {
      await deleteReport(id);
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const filteredReports = reports.filter(r => {
    if (filter === 'All') return true;
    return r.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Moderation</h1>
            <p className="text-gray-400 mt-2">Review and manage reported content.</p>
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
                <Flag size={16} />
                {error}
                <button onClick={() => fetchReports()} className="ml-auto underline">Retry</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#121214] border border-white/5 rounded-xl p-1">
              {['All', 'Pending', 'Reviewed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    filter === f ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p>Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <AlertTriangle className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400">No reports found.</p>
            </div>
          ) : (
            filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                      <Flag size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{report.reason}</h3>
                      <p className="text-sm text-gray-400">
                        Reported by <span className="text-white font-medium">{report.user}</span> • 
                        {report.type} • {new Date(report.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      report.status === 'pending' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                      'text-green-400 bg-green-400/10 border-green-400/20'
                    }`}>
                      {report.status}
                    </div>

                    <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(report.id, 'reviewed')}
                        className="p-2 hover:bg-green-500/10 rounded-lg transition-colors text-gray-400 hover:text-green-400" 
                        title="Dismiss"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(report.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" 
                        title="Delete Content"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" title="Suspend User">
                        <UserX size={18} />
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
