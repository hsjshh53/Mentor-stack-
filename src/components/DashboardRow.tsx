import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card } from './ui';

interface DashboardRowProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  subtitle?: string;
}

export const DashboardRow: React.FC<DashboardRowProps> = ({ title, items, renderItem, subtitle }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-6 relative group/row">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tighter uppercase text-white/90">{title}</h3>
          {subtitle && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="snap-start shrink-0"
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
