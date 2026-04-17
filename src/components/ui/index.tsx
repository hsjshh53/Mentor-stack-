import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, role, tabIndex }) => (
  <div 
    onClick={onClick}
    role={role}
    tabIndex={tabIndex}
    className={`glass-premium rounded-[2.5rem] p-8 transition-all duration-500 border border-white/[0.08] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ${className} ${onClick ? 'cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)]' : ''}`}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] active:shadow-inner',
    secondary: 'bg-white/[0.08] hover:bg-white/[0.12] text-white backdrop-blur-xl border border-white/[0.05] shadow-xl',
    outline: 'border border-white/[0.15] hover:bg-white/[0.05] text-white hover:border-white/[0.3] backdrop-blur-md',
    ghost: 'hover:bg-white/[0.05] text-white/60 hover:text-white',
    premium: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)] font-black uppercase tracking-wider'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] rounded-xl',
    md: 'px-8 py-4 rounded-2xl font-bold',
    lg: 'px-10 py-5 text-lg rounded-3xl'
  };

  return (
    <button 
      className={`transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-3 w-full">
    {label && <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">{label}</label>}
    <input 
      className={`w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-300 ${className}`}
      {...props}
    />
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] bg-white/[0.05] text-white/50 border border-white/[0.08] backdrop-blur-md ${className}`}>
    {children}
  </span>
);

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-2xl font-black tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
          {children}
        </div>
        {footer && (
          <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-end gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="space-y-3 w-full">
    {label && <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">{label}</label>}
    <textarea 
      className={`w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-300 min-h-[120px] ${className}`}
      {...props}
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { 
  label?: string;
  displayValue?: string;
  placeholder?: string;
}> = ({ label, className = '', children, displayValue, placeholder = "Choose an option...", ...props }) => (
  <div className="space-y-3 w-full">
    {label && <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">{label}</label>}
    <div className="relative group">
      <div className={`w-full h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 flex items-center justify-between transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-emerald-500/30 group-focus-within:border-emerald-500/50 ${className}`}>
        <span className={`font-bold truncate pr-4 ${displayValue ? "text-white" : "text-white/20"}`}>
          {displayValue || placeholder}
        </span>
        <svg 
          className="w-5 h-5 text-white/20 group-hover:text-emerald-500 transition-colors pointer-events-none flex-shrink-0" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
      <select 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
        {...props}
      >
        {children}
      </select>
    </div>
  </div>
);
