import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Trash2,
  User,
  MessageSquare,
  Flag,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, remove, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface Report {
  id: string;
  reporterId: string;
  reportedId: string; // ID of the content or user being reported
  type: 'user' | 'project' | 'comment' | 'lesson_feedback';
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: number;
  resolvedAt?: number;
  resolvedBy?: string;
  resolutionNotes?: string;
}

export const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    const reportsRef = ref(db, 'reports');
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const reportList: Report[] = [];
        for (const id in data) {
          reportList.push({ ...data[id], id });
        }
        reportList.sort((a, b) => b.createdAt - a.createdAt);
        setReports(reportList);
      } else {
        setReports([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleResolve = async (status: 'resolved' | 'dismissed') => {
    if (!selectedReport) return;
    setResolving(true);
    try {
      await set(ref(db, `reports/${selectedReport.id}`), {
        ...selectedReport,
        status,
        resolutionNotes,
        resolvedAt: Date.now(),
        resolvedBy: 'admin'
      });
      setSelectedReport(null);
      setResolutionNotes('');
      alert(`Report ${status} successfully.`);
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to resolve report.');
    } finally {
      setResolving(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reporterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
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
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-400" />
            Moderation & Reports
          </h1>
          <p className="text-gray-400">Review and resolve user reports and content flags.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {(['all', 'pending', 'resolved', 'dismissed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Reason</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Reporter</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        report.type === 'user' ? 'bg-purple-500/10 text-purple-400' :
                        report.type === 'project' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {report.type === 'user' ? <User className="w-4 h-4" /> :
                         report.type === 'project' ? <Flag className="w-4 h-4" /> :
                         <MessageSquare className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{report.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm truncate max-w-[200px]">{report.reason}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-500 font-mono">{report.reporterId.substring(0, 8)}...</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      report.status === 'resolved' ? 'bg-green-500/10 text-green-400' :
                      report.status === 'dismissed' ? 'bg-gray-500/10 text-gray-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {report.status === 'resolved' ? <CheckCircle2 className="w-3 h-3" /> :
                       report.status === 'dismissed' ? <XCircle className="w-3 h-3" /> :
                       <AlertTriangle className="w-3 h-3" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReport(report)}
                      className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !resolving && setSelectedReport(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Report Details</h2>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Reported ID</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-mono text-sm">{selectedReport.reportedId}</p>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Reporter ID</p>
                    <p className="text-white font-mono text-sm">{selectedReport.reporterId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Reason & Details</h3>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <p className="font-bold text-white text-lg">{selectedReport.reason}</p>
                    <p className="text-gray-400 leading-relaxed">{selectedReport.details}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Resolution Notes</h3>
                  <textarea 
                    rows={4}
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Enter resolution steps taken..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none text-sm"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-[#161616] flex items-center gap-4">
                <button 
                  onClick={() => handleResolve('dismissed')}
                  disabled={resolving}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Dismiss Report
                </button>
                <button 
                  onClick={() => handleResolve('resolved')}
                  disabled={resolving}
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Mark as Resolved
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
