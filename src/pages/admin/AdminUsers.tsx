import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Search, Filter, MoreVertical, 
  ShieldAlert, ShieldCheck, Trash2, User,
  TrendingUp, Zap, Flame, Award, BookOpen
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
import { ref, get, update, remove } from 'firebase/database';
import { db } from '../../lib/firebase';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnap = await get(ref(db, 'users'));
        if (usersSnap.exists()) {
          const usersData = Object.entries(usersSnap.val()).map(([id, data]: [string, any]) => ({ id, ...data }));
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSuspend = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
      await update(ref(db, `users/${userId}`), { status: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 bg-white/[0.02] border border-white/[0.05] rounded-2xl pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-6 gap-2 border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]">
            <Filter size={18} />
            Filters
          </Button>
          <Button className="h-14 px-8 font-black tracking-tight rounded-2xl shadow-lg shadow-emerald-500/20">
            Export Users
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden border-white/[0.05] bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">User</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Learning Path</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Progress</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                        ) : (
                          <User size={20} className="text-white/20" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-black tracking-tight group-hover:text-emerald-400 transition-colors">{user.displayName || 'Anonymous'}</p>
                        <p className="text-xs text-white/30 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 text-[10px] font-black tracking-widest">
                      {user.selectedPath || 'NOT SET'}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Zap size={14} fill="currentColor" />
                        <span className="text-sm font-black">{user.xp || 0}</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-400">
                        <Flame size={14} fill="currentColor" />
                        <span className="text-sm font-black">{user.streak || 0}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-400">
                        <BookOpen size={14} />
                        <span className="text-sm font-black">{user.completedLessons?.length || 0}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={user.status === 'suspended' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}>
                      {user.status?.toUpperCase() || 'ACTIVE'}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleToggleSuspend(user.id, user.status)}
                        className={`p-3 rounded-xl transition-all ${user.status === 'suspended' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
                        title={user.status === 'suspended' ? 'Unsuspend User' : 'Suspend User'}
                      >
                        {user.status === 'suspended' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                      </button>
                      <button className="p-3 bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.1] rounded-xl transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
