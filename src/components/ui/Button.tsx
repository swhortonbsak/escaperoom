import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children: ReactNode;
}

const variants = {
  primary: 'bg-cyan-500/20 text-cyber-cyan border-cyber-cyan/50 hover:bg-cyan-500/30',
  secondary: 'bg-purple-500/15 text-purple-300 border-purple-500/40 hover:bg-purple-500/25',
  ghost: 'bg-transparent text-slate-300 border-cyber-border hover:border-slate-500',
  danger: 'bg-red-500/15 text-red-300 border-red-500/40 hover:bg-red-500/25',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
