import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, Badge, Button } from '../components/ui';
import { getLeaderboard, followUser, unfollowUser } from '../services/socialService';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { Trophy, Zap, Flame, UserPlus, UserMinus, Crown, Medal, ArrowLeft } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useUserData();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const handleFollow = async (targetId: string, isFollowing: boolean) => {
    if (!user) return;
    if (isFollowing) {
      await unfollowUser(user.uid, targetId);
    } else {
      await followUser(user.uid, targetId);
    }
  };

  if (loading) return <LoadingScreen />;

  const myRank = leaderboard.findIndex(u => u.uid === user?.uid) + 1;
  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-start">
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="ghost" 
            className="group text-white/40 hover:text-white hover:bg-white/5 rounded-2xl px-6 py-8"
          >
            <ArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black uppercase tracking-widest text-xs">Back to Dashboard</span>
          </Button>
        </div>

        <div className="space-y-4 text-center">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Competition</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Top <span className="text-gradient">Learners</span>
          </h1>
          <p className="text-white/40 font-medium text-lg">Compete with developers around the world.</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12">
          {topThree.map((u, i) => {
            const order = i === 0 ? 'order-1 md:order-2' : i === 1 ? 'order-2 md:order-1' : 'order-3';
            const height = i === 0 ? 'h-80' : i === 1 ? 'h-64' : 'h-56';
            const color = i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : 'text-orange-400';
            const icon = i === 0 ? <Crown size={32} /> : i === 1 ? <Medal size={32} /> : <Medal size={32} />;

            return (
              <motion.div
                key={u.uid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center gap-4 ${order}`}
              >
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full border-4 ${i === 0 ? 'border-yellow-400' : 'border-white/10'} p-1 overflow-hidden`}>
                    <img src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.displayName}`} alt={u.displayName} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 ${color}`}>
                    {icon}
                  </div>
                </div>
                <Card className={`w-full ${height} bg-white/[0.02] border-white/[0.05] flex flex-col items-center justify-center p-6 gap-2 relative overflow-hidden`}>
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                   <p className="font-black text-xl text-center">{u.displayName}</p>
                   <div className="flex items-center gap-2 text-emerald-400">
                     <Zap size={16} fill="currentColor" />
                     <span className="font-black">{u.xp} XP</span>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Rank {i + 1}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Your Rank Sticky */}
        {myRank > 0 && (
          <Card className="p-6 bg-emerald-500 text-black border-none flex items-center justify-between sticky top-24 z-30 shadow-2xl shadow-emerald-500/20">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center font-black text-xl">
                {myRank}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Your Current Rank</p>
                <p className="font-black text-xl">You're ahead of {Math.round((1 - myRank / leaderboard.length) * 100)}% of learners!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} fill="currentColor" />
              <span className="font-black text-xl">{progress?.xp} XP</span>
            </div>
          </Card>
        )}

        {/* List */}
        <div className="space-y-4">
          {others.map((u, i) => {
            const isFollowing = progress?.following?.includes(u.uid);
            return (
              <motion.div
                key={u.uid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 flex items-center justify-between bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03] transition-all group">
                  <div className="flex items-center gap-6">
                    <span className="w-8 font-black text-white/20 text-lg">{i + 4}</span>
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                      <img src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.displayName}`} alt={u.displayName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-black text-lg group-hover:text-emerald-400 transition-colors">{u.displayName}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-black">
                          <Zap size={12} fill="currentColor" />
                          {u.xp} XP
                        </div>
                        <div className="flex items-center gap-1 text-orange-400 text-xs font-black">
                          <Flame size={12} fill="currentColor" />
                          {u.streak}
                        </div>
                      </div>
                    </div>
                  </div>

                  {u.uid !== user?.uid && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFollow(u.uid, !!isFollowing)}
                      className={`rounded-xl border-white/10 hover:border-emerald-500/50 ${isFollowing ? 'bg-emerald-500/10 text-emerald-400' : ''}`}
                    >
                      {isFollowing ? <UserMinus size={16} className="mr-2" /> : <UserPlus size={16} className="mr-2" />}
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
