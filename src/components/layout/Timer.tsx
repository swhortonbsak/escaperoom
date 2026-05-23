import { formatTime } from '../../utils/score';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { useElapsedSeconds } from '../../hooks/useElapsedSeconds';

export function Timer() {
  const { state } = usePuzzleEngine();
  const elapsed = useElapsedSeconds(state.startedAt, state.completedAt);

  if (!state.startedAt) return null;

  return (
    <div
      className="terminal-text rounded-md border border-cyber-border bg-black/30 px-3 py-1.5 text-sm text-cyber-cyan"
      aria-live="polite"
      aria-label={`Mission elapsed time ${formatTime(elapsed)}`}
      title="Total time since you accepted the mission"
    >
      <span className="text-cyber-muted">Mission</span>{' '}
      <span className="font-semibold tabular-nums">{formatTime(elapsed)}</span>
    </div>
  );
}
