import { motion } from 'framer-motion';
import { PUZZLE_ROOM_IDS } from '../../types';
import { usePuzzleEngine } from '../../context/usePuzzleEngine'
import { getRoomMeta } from '../../context/puzzleMeta';

export function ProgressTracker() {
  const { state, fragmentsCollected } = usePuzzleEngine();
  const puzzleRooms = PUZZLE_ROOM_IDS.filter((id) => id !== 'vault');

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Key fragment progress">
      {puzzleRooms.map((id, index) => {
        const meta = getRoomMeta(id);
        const done = state.rooms[id].completed;
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1, scale: done ? 1.05 : 1 }}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
              done
                ? 'border-cyber-green/50 bg-cyber-green/10 text-cyber-green'
                : 'border-cyber-border bg-black/20 text-cyber-muted'
            }`}
            title={meta.title}
          >
            <span
              className={`h-2 w-2 rounded-full ${done ? 'bg-cyber-green animate-pulse' : 'bg-slate-600'}`}
            />
            {index + 1}
            {done && (
              <span className="terminal-text font-bold">{meta.keyFragment}</span>
            )}
          </motion.div>
        );
      })}
      <div
        className={`rounded-full border px-3 py-1 text-xs ${
          state.rooms.vault.completed
            ? 'border-cyber-cyan/50 bg-cyan-500/10 text-cyber-cyan'
            : fragmentsCollected >= 6
              ? 'border-cyber-cyan/30 text-cyber-cyan'
              : 'border-cyber-border text-cyber-muted'
        }`}
      >
        Vault {state.rooms.vault.completed ? '✓' : fragmentsCollected >= 6 ? 'READY' : 'LOCKED'}
      </div>
    </div>
  );
}
