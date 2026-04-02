import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`bg-[#121214] border border-white/5 rounded-2xl ${className}`} {...props}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-emerald-500 text-black hover:bg-emerald-400',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    outline: 'bg-transparent border border-white/10 text-white hover:bg-white/5',
    ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    premium: 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-orange-500/20'
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-3 px-6 text-base'
  };

  return (
    <button 
      className={`
        inline-flex items-center justify-center font-bold rounded-xl transition-all disabled:opacity-50 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = '', ...props }) => (
  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${className}`} {...props}>
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input 
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 text-white placeholder-white/20 ${className}`}
    {...props}
  />
);
