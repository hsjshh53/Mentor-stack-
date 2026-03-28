import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Badge } from '../components/ui';
import { getActivities } from '../services/socialService';
import { Activity } from '../types';
import { BookOpen, Zap, Code, Award, Flame, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const unsubscribe = getActivities(setActivities);
    return () => unsubscribe();
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'lesson_complete': return <BookOpen size={16} className="text-blue-400" />;
      case 'level_up': return <Zap size={16} className="text-emerald-400" />;
      case 'project_complete': return <Code size={16} className="text-purple-400" />;
      case 'badge_earned': return <Award size={16} className="text-yellow-400" />;
      case 'streak_milestone': return <Flame size={16} className="text-orange-400" />;
      default: return <Clock size={16} className="text-white/40" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-emerald-400">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Clock size={22} />
          </div>
          <h3 className="font-black uppercase text-sm tracking-[0.2em]">Community Activity</h3>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Live Feed</Badge>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4 flex items-center gap-4 bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03] transition-all group">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img src={activity.userPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userName}`} alt={activity.userName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-white/80 leading-tight">
                    <span className="font-black text-white group-hover:text-emerald-400 transition-colors">{activity.userName}</span>{' '}
                    <span className="text-white/40">{activity.content}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getIcon(activity.type)}
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                      {formatDistanceToNow(activity.timestamp)} ago
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
