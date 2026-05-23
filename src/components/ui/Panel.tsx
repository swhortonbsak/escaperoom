import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'none';
}

export function Panel({ title, subtitle, children, className = '', glow = 'none' }: PanelProps) {
  const glowClass =
    glow === 'cyan' ? 'glow-cyan' : glow === 'purple' ? 'glow-purple' : '';

  return (
    <section
      className={`rounded-lg border border-cyber-border bg-cyber-panel/90 p-5 backdrop-blur-sm ${glowClass} ${className}`}
    >
      {title && (
        <header className="mb-4 border-b border-cyber-border pb-3">
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-cyber-muted">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
