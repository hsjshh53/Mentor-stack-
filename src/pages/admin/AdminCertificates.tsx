import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Download, 
  Trash2, 
  Eye, 
  MoreVertical,
  Plus,
  Loader2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getCertificates, revokeCertificate } from '../../services/adminService';

export const AdminCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async (userId: string, certId: string) => {
    if (!confirm('Are you sure you want to revoke this certificate?')) return;
    try {
      await revokeCertificate(userId, certId);
      fetchCertificates();
    } catch (error) {
      console.error('Error revoking certificate:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
            <p className="text-gray-400 mt-2">Manage and issue student certificates.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all">
              <Plus size={18} />
              Issue New
            </button>
          </div>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p>Loading certificates...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Award className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400">No certificates found.</p>
            </div>
          ) : (
            certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cert.skillName}</h3>
                      <p className="text-sm text-gray-400">
                        Issued to <span className="text-white font-medium">{cert.userName}</span> • 
                        {new Date(cert.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border text-green-400 bg-green-400/10 border-green-400/20">
                      Issued
                    </div>

                    <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Download">
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => handleRevoke(cert.userId, cert.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" 
                        title="Revoke"
                      >
                        <Trash2 size={18} />
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
