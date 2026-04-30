import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Badge, Button } from '../../components/ui';
import { 
  Users, 
  Search, 
  Shield, 
  User, 
  Mail, 
  Calendar,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { ref } from 'firebase/database';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { firebaseSafeOnValue, firebaseSafeUpdate } from '../../lib/FirebaseService';

export const ManageUsers: React.FC = () => {
  const { profile, user: currentUserAuth, isAdmin, adminReady } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!adminReady || !isAdmin) return;

    const unsubscribe = firebaseSafeOnValue(ref(db, 'users'), (data) => {
      if (data) {
        const list = Object.keys(data).map(uid => ({
          uid,
          ...data[uid],
          role: data[uid].progress?.role || 'user',
          progress: data[uid].progress || {}
        }));
        setUsers(list);
      } else {
        setUsers([]);
      }
      setLoading(false);
    }, "ManageUsers");

    return () => unsubscribe();
  }, [isAdmin, adminReady]);

  const logDiagnostic = async (buttonName: string, recordId: string, status: 'action_started' | 'action_success' | 'failed', error?: string) => {
    console.log(`[Admin Diagnostics] User Admin Action: ${buttonName} | Target ID: ${recordId} | State: ${status} | Admin: ${currentUserAuth?.email}${error ? ` | Error: ${error}` : ''}`);
    
    // Audit logging
    await firebaseSafeUpdate(`admin_audit_logs/${Date.now()}`, {
      button_name: buttonName,
      clicked: true,
      record_id: recordId,
      admin_uid: currentUserAuth?.uid,
      admin_email: currentUserAuth?.email,
      timestamp: Date.now(),
      status,
      error: error || null
    }, "AuditLog");
  };

  const toggleAdmin = async (uid: string, currentRole: string) => {
    if (!isAdmin) {
      alert("Unauthorized: Your admin role is not synced. Please re-login.");
      return;
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

    await logDiagnostic('Toggle Admin Role', uid, 'action_started');

    try {
      const success = await firebaseSafeUpdate(`users/${uid}/progress`, { role: newRole }, "ToggleAdmin");
      if (success) {
        await logDiagnostic('Toggle Admin Role', uid, 'action_success');
        alert(`User role updated to ${newRole}.`);
      } else {
        throw new Error("Update failed in Firebase");
      }
    } catch (err: any) {
      await logDiagnostic('Toggle Admin Role', uid, 'failed', err.message);
      alert(`Role update failed: ${err.message}`);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.displayName || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Manage Users</h1>
            <p className="text-white/40 font-medium">View user progress and manage permissions.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 pr-6 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest">No users found</div>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.uid} className="p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-white/20" />
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold truncate">{user.displayName || 'Anonymous User'}</h3>
                      <Badge className={`${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-white/40'} px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest`}>
                        {user.role || 'user'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <div className="flex items-center gap-1">
                        <Mail size={12} />
                        <span className="truncate">{user.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right hidden lg:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Progress</p>
                      <p className="text-xs font-bold text-emerald-400">Level {user.progress?.level || 1} • {user.progress?.xp || 0} XP</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleAdmin(user.uid, user.role || 'user')}
                        className={`p-3 rounded-xl transition-all ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' 
                            : 'bg-white/5 text-white/20 hover:text-white hover:bg-white/10'
                        }`}
                        title={user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                      >
                        {user.role === 'admin' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                      </button>
                      <button className="p-3 hover:bg-white/5 rounded-xl text-white/20 hover:text-white transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
