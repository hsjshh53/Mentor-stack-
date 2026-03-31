import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  MoreVertical,
  Loader2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from '../../services/adminService';

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAnn, setNewAnn] = useState({ title: '', target: 'All Users', status: 'published' });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (err: any) {
      console.error('Error fetching announcements:', err);
      setError(err.message || 'Failed to load announcements.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAnnouncement(newAnn);
      setNewAnn({ title: '', target: 'All Users', status: 'published' });
      setIsAdding(false);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
            <p className="text-gray-400 mt-2">Send and manage platform-wide announcements.</p>
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
                <Megaphone size={16} />
                {error}
                <button onClick={() => fetchAnnouncements()} className="ml-auto underline">Retry</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all"
            >
              <Plus size={18} />
              New Announcement
            </button>
          </div>
        </div>

        {/* Add Form */}
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121214] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold">Create New Announcement</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  type="text"
                  required
                  value={newAnn.title}
                  onChange={e => setNewAnn({...newAnn, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500/50"
                  placeholder="Enter announcement title..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Target Audience</label>
                  <select 
                    value={newAnn.target}
                    onChange={e => setNewAnn({...newAnn, target: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500/50"
                  >
                    <option value="All Users">All Users</option>
                    <option value="React Students">React Students</option>
                    <option value="Python Students">Python Students</option>
                    <option value="Premium Members">Premium Members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <select 
                    value={newAnn.status}
                    onChange={e => setNewAnn({...newAnn, status: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500/50"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all"
                >
                  Create Announcement
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p>Loading announcements...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Megaphone className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400">No announcements found.</p>
            </div>
          ) : (
            announcements.map((ann, index) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                      <Megaphone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{ann.title}</h3>
                      <p className="text-sm text-gray-400">
                        Target: <span className="text-white font-medium">{ann.target}</span> • 
                        {new Date(ann.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      ann.status === 'published' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                      ann.status === 'scheduled' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                      'text-gray-400 bg-gray-400/10 border-gray-400/20'
                    }`}>
                      {ann.status}
                    </div>

                    <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Preview">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ann.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" 
                        title="Delete"
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
