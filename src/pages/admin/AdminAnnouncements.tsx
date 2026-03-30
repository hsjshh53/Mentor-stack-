import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Pin, 
  Eye, 
  Globe, 
  Lock, 
  MoreVertical,
  X,
  Save,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, update, remove, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'update' | 'event' | 'alert';
  status: 'published' | 'draft';
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
  authorId: string;
}

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const announcementsRef = ref(db, 'announcements');
    const unsubscribe = onValue(announcementsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list: Announcement[] = [];
        for (const id in data) {
          list.push({ ...data[id], id });
        }
        // Sort: Pinned first, then by date desc
        list.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return b.createdAt - a.createdAt;
        });
        setAnnouncements(list);
      } else {
        setAnnouncements([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (announcement: Announcement) => {
    setSaving(true);
    try {
      const id = announcement.id || `announcement_${Date.now()}`;
      const data = {
        ...announcement,
        id,
        updatedAt: Date.now(),
        createdAt: announcement.createdAt || Date.now()
      };
      await set(ref(db, `announcements/${id}`), data);
      setEditingAnnouncement(null);
      alert('Announcement saved successfully!');
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Failed to save announcement.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await remove(ref(db, `announcements/${id}`));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const togglePin = async (announcement: Announcement) => {
    try {
      await update(ref(db, `announcements/${announcement.id}`), {
        isPinned: !announcement.isPinned
      });
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const toggleStatus = async (announcement: Announcement) => {
    try {
      await update(ref(db, `announcements/${announcement.id}`), {
        status: announcement.status === 'published' ? 'draft' : 'published'
      });
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const filteredAnnouncements = announcements.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-blue-400" />
            Announcements
          </h1>
          <p className="text-gray-400">Broadcast updates, events, and important alerts to all users.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button 
            onClick={() => setEditingAnnouncement({
              id: '',
              title: '',
              content: '',
              type: 'info',
              status: 'draft',
              isPinned: false,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              authorId: 'admin'
            })}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAnnouncements.map((announcement) => (
          <motion.div
            key={announcement.id}
            layout
            className={`p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group ${announcement.isPinned ? 'border-blue-500/30 bg-blue-500/5' : ''}`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                announcement.type === 'alert' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                announcement.type === 'update' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                announcement.type === 'event' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                <Megaphone className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-white text-lg">{announcement.title}</h3>
                  {announcement.isPinned && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    announcement.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {announcement.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-1 max-w-xl">{announcement.content}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(announcement.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => togglePin(announcement)}
                className={`p-2 rounded-lg transition-colors ${announcement.isPinned ? 'text-blue-400 bg-blue-400/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                title={announcement.isPinned ? 'Unpin' : 'Pin'}
              >
                <Pin className={`w-5 h-5 ${announcement.isPinned ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => toggleStatus(announcement)}
                className={`p-2 rounded-lg transition-colors ${announcement.status === 'published' ? 'text-green-400 bg-green-400/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                title={announcement.status === 'published' ? 'Unpublish' : 'Publish'}
              >
                {announcement.status === 'published' ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setEditingAnnouncement(announcement)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(announcement.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAnnouncement && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !saving && setEditingAnnouncement(null)}
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
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">{editingAnnouncement.id ? 'Edit Announcement' : 'New Announcement'}</h2>
                </div>
                <button 
                  onClick={() => setEditingAnnouncement(null)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                  <input 
                    type="text" 
                    value={editingAnnouncement.title}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                    placeholder="Announcement Title"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Type</label>
                    <select 
                      value={editingAnnouncement.type}
                      onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, type: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-white"
                    >
                      <option value="info" className="bg-[#111111]">Information</option>
                      <option value="update" className="bg-[#111111]">Platform Update</option>
                      <option value="event" className="bg-[#111111]">New Event</option>
                      <option value="alert" className="bg-[#111111]">Critical Alert</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</label>
                    <select 
                      value={editingAnnouncement.status}
                      onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, status: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-white"
                    >
                      <option value="draft" className="bg-[#111111]">Draft</option>
                      <option value="published" className="bg-[#111111]">Published</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Content</label>
                  <textarea 
                    rows={6}
                    value={editingAnnouncement.content}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                    placeholder="Write your announcement message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <input 
                    type="checkbox" 
                    id="isPinned"
                    checked={editingAnnouncement.isPinned}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, isPinned: e.target.checked })}
                    className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPinned" className="text-sm font-bold text-gray-300 cursor-pointer">Pin this announcement to the top</label>
                </div>

                <button 
                  onClick={() => handleSave(editingAnnouncement)}
                  disabled={saving}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                  Save Announcement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
