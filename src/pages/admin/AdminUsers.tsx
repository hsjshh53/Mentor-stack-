import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Shield, 
  ShieldAlert, 
  Ban, 
  CheckCircle, 
  RotateCcw,
  ExternalLink,
  Mail,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, update, remove } from 'firebase/database';
import { db } from '../../lib/firebase';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  selectedPath?: string;
  xp?: number;
  streak?: number;
  completedLessons?: Record<string, boolean>;
  lastActive?: number;
  createdAt?: number;
  isSuspended?: boolean;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnap = await get(ref(db, 'users'));
        if (usersSnap.exists()) {
          const usersData = usersSnap.val();
          const usersList = Object.entries(usersData).map(([uid, data]: [string, any]) => ({
            uid,
            ...data
          }));
          setUsers(usersList);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSuspendUser = async (uid: string, isSuspended: boolean) => {
    try {
      await update(ref(db, `users/${uid}`), { isSuspended: !isSuspended });
      setUsers(users.map(u => u.uid === uid ? { ...u, isSuspended: !isSuspended } : u));
      if (selectedUser?.uid === uid) {
        setSelectedUser({ ...selectedUser, isSuspended: !isSuspended });
      }
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleResetProgress = async (uid: string) => {
    if (!window.confirm('Are you sure you want to reset all progress for this user? This cannot be undone.')) return;
    
    try {
      await update(ref(db, `users/${uid}`), {
        completedLessons: {},
        xp: 0,
        streak: 0,
        projects: {},
        submissions: {}
      });
      setUsers(users.map(u => u.uid === uid ? { ...u, completedLessons: {}, xp: 0, streak: 0 } : u));
      alert('User progress reset successfully.');
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.uid.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-400">Manage platform users, monitor progress, and handle moderation.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, email or UID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-80 text-sm"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Path</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">XP / Streak</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold border border-white/10">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.displayName?.charAt(0) || user.email?.charAt(0)
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{user.displayName || 'Anonymous'}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isSuspended ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium">
                        <Ban className="w-3 h-3" />
                        Suspended
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300 font-medium">{user.selectedPath || 'Not Selected'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">{user.xp || 0} XP</span>
                      <span className="text-xs text-gray-500">{user.streak || 0} day streak</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">
                      {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                >
                  <Ban className="w-5 h-5 rotate-45" />
                </button>
              </div>
              
              <div className="px-8 pb-8">
                <div className="relative -mt-12 mb-6 flex items-end justify-between">
                  <div className="w-24 h-24 rounded-3xl bg-[#111111] p-1 border-4 border-[#111111]">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-3xl font-bold border border-white/10">
                      {selectedUser.photoURL ? (
                        <img src={selectedUser.photoURL} alt="" className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        selectedUser.displayName?.charAt(0) || selectedUser.email?.charAt(0)
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleSuspendUser(selectedUser.uid, !!selectedUser.isSuspended)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedUser.isSuspended ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'}`}
                    >
                      {selectedUser.isSuspended ? 'Unsuspend User' : 'Suspend User'}
                    </button>
                    <button 
                      onClick={() => handleResetProgress(selectedUser.uid)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all"
                    >
                      Reset Progress
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.displayName || 'Anonymous User'}</h2>
                    <p className="text-gray-400 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {selectedUser.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">UID: {selectedUser.uid}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-blue-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Total XP</span>
                      </div>
                      <span className="text-xl font-bold">{selectedUser.xp || 0}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-orange-400 mb-1">
                        <Activity className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
                      </div>
                      <span className="text-xl font-bold">{selectedUser.streak || 0} Days</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-green-400 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Lessons</span>
                      </div>
                      <span className="text-xl font-bold">{Object.keys(selectedUser.completedLessons || {}).length}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-purple-400 mb-1">
                        <Award className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Badges</span>
                      </div>
                      <span className="text-xl font-bold">0</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Joined Date</p>
                          <p className="text-sm font-medium">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'Unknown'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Current Path</p>
                          <p className="text-sm font-medium">{selectedUser.selectedPath || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
