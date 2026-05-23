import type { ReactNode } from 'react';
import { Header } from './Header';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="scanlines relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.08)_0%,_transparent_50%)]" />
      <Header />
      <main className="relative mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
