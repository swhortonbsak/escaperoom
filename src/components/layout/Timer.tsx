import { formatTime } from '../../utils/score';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';

export function Timer() {
  const { elapsed, state } = usePuzzleEngine();

  if (!state.startedAt) return null;

  return (
    <div
      className="terminal-text rounded-md border border-cyber-border bg-black/30 px-3 py-1.5 text-sm text-cyber-cyan"
      aria-live="polite"
      aria-label={`Elapsed time ${formatTime(elapsed)}`}
    >
      <span className="text-cyber-muted">T+</span> {formatTime(elapsed)}
    </div>
  );
}
