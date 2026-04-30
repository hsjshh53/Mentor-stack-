import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  id?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  className = '',
  id
}) => {
  const baseStyles = "relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-emerald-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]",
    secondary: "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20",
    outline: "bg-transparent text-emerald-400 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10"
  };

  return (
    <motion.button
      id={id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {Icon && <Icon size={16} className="relative z-10" />}
      <span className="relative z-10">{children}</span>
      
      {variant === 'primary' && (
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] rounded-full pointer-events-none" />
      )}
    </motion.button>
  );
};
