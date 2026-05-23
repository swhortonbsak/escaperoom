import { motion } from 'framer-motion';
import type { PuzzleRoomId } from '../../types';
import { PUZZLE_ROOM_IDS } from '../../types';
import { getRoomMeta } from '../../context/puzzleMeta';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { Button } from './Button';

interface RoomCompleteCelebrationProps {
  roomId: PuzzleRoomId;
  onContinue: () => void;
  onHub: () => void;
}

function getNextRoomId(roomId: PuzzleRoomId): PuzzleRoomId | 'complete' {
  const idx = PUZZLE_ROOM_IDS.indexOf(roomId);
  const next = PUZZLE_ROOM_IDS[idx + 1];
  return next ?? 'complete';
}

export function RoomCompleteCelebration({
  roomId,
  onContinue,
  onHub,
}: RoomCompleteCelebrationProps) {
  const { fragmentsCollected, state } = usePuzzleEngine();
  const meta = getRoomMeta(roomId);
  const nextId = getNextRoomId(roomId);
  const nextMeta = nextId !== 'complete' ? getRoomMeta(nextId) : null;
  const fragmentCount = roomId === 'vault' ? 6 : fragmentsCollected;

  const continueLabel =
    roomId === 'vault'
      ? 'View mission debrief →'
      : nextMeta
        ? `Continue to ${nextMeta.title.replace('The ', '')} →`
        : 'Continue →';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-xl border border-cyber-green/50 bg-gradient-to-br from-cyber-green/15 via-cyan-500/5 to-purple-500/10 p-6 shadow-[0_0_40px_rgba(34,197,94,0.12)]"
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.08) 2px, rgba(34,197,94,0.08) 4px)',
        }}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-cyber-green bg-cyber-green/20 text-3xl"
          aria-hidden
        >
          ✓
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyber-green">
            {roomId === 'vault' ? 'Vault unlocked' : 'Room secured'}
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-100 sm:text-2xl">
            {roomId === 'vault'
              ? 'Exam Archive restored'
              : `${meta.title} — analysis complete`}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {meta.successExplanation}
          </p>

          {roomId !== 'vault' && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="rounded-lg border border-cyber-cyan/40 bg-black/30 px-4 py-3">
                <p className="text-xs text-cyber-muted">Key fragment recovered</p>
                <p className="terminal-text text-2xl font-bold text-cyber-cyan">{meta.keyFragment}</p>
                <p className="text-xs text-cyber-muted">{meta.keyFragmentLabel}</p>
              </div>
              <div className="rounded-lg border border-cyber-border bg-black/20 px-4 py-3">
                <p className="text-xs text-cyber-muted">Progress</p>
                <p className="text-lg font-semibold text-slate-100">
                  {fragmentCount} <span className="text-cyber-muted">/ 6 fragments</span>
                </p>
                <p className="text-xs text-cyber-muted">
                  Layer {meta.stackLayer}: {meta.stackLayerName}
                </p>
              </div>
            </div>
          )}

          {roomId === 'vault' && (
            <p className="mt-4 terminal-text text-lg font-bold tracking-widest text-cyber-cyan">
              SECURE
            </p>
          )}

          {nextMeta && roomId !== 'vault' && (
            <p className="mt-4 text-sm text-cyber-muted">
              Next location: <span className="text-cyber-cyan">{nextMeta.title}</span>
              {state.rooms[nextId as PuzzleRoomId]?.completed
                ? ' (already completed — you can revisit anytime)'
                : ''}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={onContinue}>{continueLabel}</Button>
            <Button variant="ghost" onClick={onHub}>
              Mission hub
            </Button>
          </div>

          <p className="mt-3 text-xs text-cyber-muted">
            Take a moment to review the debrief above before continuing.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
