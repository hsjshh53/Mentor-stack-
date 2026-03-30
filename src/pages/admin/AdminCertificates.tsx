import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ExternalLink, 
  Eye, 
  Trash2,
  User,
  Calendar,
  MoreVertical,
  Download,
  FileText,
  Plus,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, remove, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface Certificate {
  id: string;
  userId: string;
  skillId: string;
  issuedAt: number;
  userName: string;
  skillTitle: string;
  status: 'active' | 'revoked';
  verificationId: string;
}

export const AdminCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ userId: '', skillId: '', userName: '', skillTitle: '' });
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    const certsRef = ref(db, 'certificates');
    const unsubscribe = onValue(certsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const certList: Certificate[] = [];
        for (const id in data) {
          certList.push({ ...data[id], id });
        }
        certList.sort((a, b) => b.issuedAt - a.issuedAt);
        setCertificates(certList);
      } else {
        setCertificates([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRevoke = async (id: string) => {
    if (!window.confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) return;
    try {
      await set(ref(db, `certificates/${id}/status`), 'revoked');
      alert('Certificate revoked successfully.');
    } catch (error) {
      console.error('Error revoking certificate:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this certificate record?')) return;
    try {
      await remove(ref(db, `certificates/${id}`));
      alert('Certificate record deleted.');
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  const handleIssueManual = async () => {
    if (!newCert.userId || !newCert.skillId || !newCert.userName || !newCert.skillTitle) {
      alert('Please fill all fields');
      return;
    }
    setIssuing(true);
    try {
      const verificationId = Math.random().toString(36).substring(2, 15).toUpperCase();
      const certId = `${newCert.userId}_${newCert.skillId}`;
      const certificateData: Certificate = {
        id: certId,
        userId: newCert.userId,
        skillId: newCert.skillId,
        userName: newCert.userName,
        skillTitle: newCert.skillTitle,
        issuedAt: Date.now(),
        status: 'active',
        verificationId
      };
      await set(ref(db, `certificates/${certId}`), certificateData);
      setIsIssueModalOpen(false);
      setNewCert({ userId: '', skillId: '', userName: '', skillTitle: '' });
      alert('Certificate issued successfully!');
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate.');
    } finally {
      setIssuing(false);
    }
  };

  const filteredCerts = certificates.filter(cert => 
    cert.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skillTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.verificationId.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-gray-400">Manage and verify platform-issued professional certifications.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button 
            onClick={() => setIsIssueModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Issue Manual
          </button>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Skill Path</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Verification ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Issued Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{cert.userName}</p>
                        <p className="text-xs text-gray-500">{cert.userId.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-white text-sm">{cert.skillTitle}</p>
                      <p className="text-xs text-gray-500">{cert.skillId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-blue-400 bg-blue-400/5 px-2 py-1 rounded border border-blue-400/10 tracking-wider">
                      {cert.verificationId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(cert.issuedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      cert.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {cert.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleRevoke(cert.id)}
                        disabled={cert.status === 'revoked'}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors disabled:opacity-20"
                        title="Revoke Certificate"
                      >
                        <ShieldCheck className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Issue Modal */}
      <AnimatePresence>
        {isIssueModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !issuing && setIsIssueModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Issue Certificate</h2>
                </div>
                <button 
                  onClick={() => setIsIssueModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student Name</label>
                  <input 
                    type="text" 
                    value={newCert.userName}
                    onChange={(e) => setNewCert({ ...newCert, userName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student UID</label>
                  <input 
                    type="text" 
                    value={newCert.userId}
                    onChange={(e) => setNewCert({ ...newCert, userId: e.target.value })}
                    placeholder="Firebase UID"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Skill Title</label>
                  <input 
                    type="text" 
                    value={newCert.skillTitle}
                    onChange={(e) => setNewCert({ ...newCert, skillTitle: e.target.value })}
                    placeholder="e.g. Full-Stack Development"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Skill ID</label>
                  <input 
                    type="text" 
                    value={newCert.skillId}
                    onChange={(e) => setNewCert({ ...newCert, skillId: e.target.value })}
                    placeholder="e.g. full-stack-dev"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-mono text-sm"
                  />
                </div>

                <button 
                  onClick={handleIssueManual}
                  disabled={issuing}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {issuing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Award className="w-5 h-5" />}
                  Issue Certificate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
