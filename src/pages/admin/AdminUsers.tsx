import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Eye,
  UserX,
  UserCheck
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAllUsers, updateUserStatus } from '../../services/adminService';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('AdminUsers: Starting to fetch users...');
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      console.log(`AdminUsers: Successfully fetched ${data.length} users.`);
      setUsers(data);
    } catch (err) {
      console.error('AdminUsers: Error fetching users:', err);
      setError('Failed to load users. Please check your connection or permissions.');
    } finally {
      setLoading(false);
      console.log('AdminUsers: Fetch users completed.');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const toggleSuspend = async (userId: string, currentStatus: string) => {
    const newStatus = (currentStatus || 'active') === 'suspended' ? 'active' : 'suspended';
    try {
      await updateUserStatus(userId, newStatus);
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          return { ...user, status: newStatus };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const stats = {
    total: users.length,
    activeToday: users.filter(u => u.lastActiveDate === new Date().toISOString().split('T')[0]).length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-gray-400 mt-2">View and manage all registered learners.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 border border-white/5">
              <Mail size={18} />
              Email All Users
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Total Registered</p>
            <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
            <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
              <TrendingUp size={14} />
              <span>Live Data</span>
            </div>
          </div>
          <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Active Today</p>
            <h3 className="text-2xl font-bold mt-1">{stats.activeToday}</h3>
            <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
              <Activity size={14} />
              <span>{stats.total > 0 ? Math.round((stats.activeToday / stats.total) * 100) : 0}% of total</span>
            </div>
          </div>
          <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Suspended Accounts</p>
            <h3 className="text-2xl font-bold mt-1">{stats.suspended}</h3>
            <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <ShieldAlert size={14} />
              <span>{stats.total > 0 ? ((stats.suspended / stats.total) * 100).toFixed(1) : 0}% of total</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Active', 'Suspended'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  filterStatus === status 
                    ? 'bg-green-500 text-black border-green-500' 
                    : 'bg-[#121214] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">User</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Learning Path</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Progress</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Stats</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Joined</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold text-black text-sm">
                            {(user.name || 'A')[0]}
                          </div>
                          <div>
                            <p className="font-bold">{user.name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-300">{user.selectedPath || 'Not selected'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full max-w-[100px]">
                          <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                            <span>{user.progress || 0}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${user.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1" title="Streak">
                            <Activity size={14} className="text-orange-400" />
                            {user.streak || 0}d
                          </div>
                          <div className="flex items-center gap-1" title="XP">
                            <TrendingUp size={14} className="text-blue-400" />
                            {user.xp || 0}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          user.status === 'active' || !user.status
                            ? 'text-green-400 bg-green-400/10 border-green-400/20' 
                            : 'text-red-400 bg-red-400/10 border-red-400/20'
                        }`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.joined || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="View Profile">
                            <Eye size={18} />
                          </button>
                          {user.status === 'active' || !user.status ? (
                            <button 
                              onClick={() => toggleSuspend(user.id, user.status)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400" 
                              title="Suspend User"
                            >
                              <UserX size={18} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => toggleSuspend(user.id, user.status)}
                              className="p-2 hover:bg-green-500/10 rounded-lg transition-colors text-gray-400 hover:text-green-400" 
                              title="Unsuspend User"
                            >
                              <UserCheck size={18} />
                            </button>
                          )}
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-red-500/5 border border-red-500/20 rounded-3xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-red-400">Error Loading Users</h3>
            <p className="text-gray-500 mt-1">{error}</p>
            <button 
              onClick={fetchUsers}
              className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {filteredUsers.length === 0 && !loading && !error && (
          <div className="text-center py-20 bg-[#121214] border border-white/5 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No users found yet</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery || filterStatus !== 'All' 
                ? 'Try adjusting your search or filters.' 
                : 'When users register, they will appear here.'}
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">Loading users...</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
