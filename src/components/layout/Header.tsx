import { Link, useLocation } from 'react-router-dom';
import { ProgressTracker } from './ProgressTracker';
import { Timer } from './Timer';
import { RoomTimer } from '../ui/RoomTimer';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { PUZZLE_ROOM_IDS, type PuzzleRoomId } from '../../types';

function activeRoomFromPath(pathname: string): PuzzleRoomId | null {
  const match = pathname.match(/^\/play\/([^/]+)/);
  const id = match?.[1];
  return id && PUZZLE_ROOM_IDS.includes(id as PuzzleRoomId) ? (id as PuzzleRoomId) : null;
}

export function Header() {
  const { scorePreview, state } = usePuzzleEngine();
  const location = useLocation();
  const activeRoom = activeRoomFromPath(location.pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <Link to="/" className="group flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-cyber-cyan/40 bg-cyan-500/10 text-sm font-bold text-cyber-cyan">
              OB
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-slate-100 group-hover:text-cyber-cyan">
                Operation Blackout
              </p>
              <p className="truncate text-xs text-cyber-muted">
                Cambridge CS 9618 · Cyber Analyst Training
              </p>
            </div>
          </Link>

          {state.introSeen && (
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="flex flex-wrap items-center justify-end gap-2">
                {activeRoom && <RoomTimer roomId={activeRoom} />}
                <Timer />
              </div>
              {state.startedAt && (
                <span className="rounded-md border border-cyber-border px-2 py-1 text-xs text-cyber-muted">
                  Score ~{scorePreview}
                </span>
              )}
            </div>
          )}
        </div>

        {state.introSeen && (
          <div className="mt-3 border-t border-cyber-border pt-3">
            <ProgressTracker />
          </div>
        )}
      </div>
    </header>
  );
}
