import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-premium rounded-[2.5rem] p-8 transition-all duration-500 ${className} ${onClick ? 'cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1 active:scale-[0.98]' : ''}`}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.4)]',
    secondary: 'bg-white/[0.08] hover:bg-white/[0.12] text-white backdrop-blur-md border border-white/[0.05]',
    outline: 'border border-white/[0.15] hover:bg-white/[0.05] text-white hover:border-white/[0.3]',
    ghost: 'hover:bg-white/[0.05] text-white/60 hover:text-white'
  };

  return (
    <button 
      className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${className}`}
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
