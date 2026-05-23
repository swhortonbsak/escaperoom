import { Link } from 'react-router-dom';
import { ProgressTracker } from './ProgressTracker';
import { Timer } from './Timer';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';

export function Header() {
  const { scorePreview, state } = usePuzzleEngine();

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-cyber-cyan/40 bg-cyan-500/10 text-sm font-bold text-cyber-cyan">
              OB
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-100 group-hover:text-cyber-cyan">
                Operation Blackout
              </p>
              <p className="text-xs text-cyber-muted">Cambridge CS 9618 · Cyber Analyst Training</p>
            </div>
          </Link>
        </div>

        {state.introSeen && (
          <div className="hidden lg:block">
            <ProgressTracker />
          </div>
        )}

        {state.introSeen && (
          <div className="flex flex-wrap items-center gap-2">
            <Timer />
            <span className="rounded-md border border-cyber-border px-2 py-1 text-xs text-cyber-muted">
              Score ~{scorePreview}
            </span>
          </div>
        )}
      </div>

      {state.introSeen && (
        <div className="border-t border-cyber-border px-4 py-2 lg:hidden">
          <ProgressTracker />
        </div>
      )}
    </header>
  );
}
