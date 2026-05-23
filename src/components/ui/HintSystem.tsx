import { AnimatePresence, motion } from 'framer-motion';
import type { PuzzleRoomId } from '../../types';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { getRoomMeta } from '../../context/puzzleMeta';
import { Button } from './Button';

interface HintSystemProps {
  roomId: PuzzleRoomId;
}

export function HintSystem({ roomId }: HintSystemProps) {
  const { state, revealHint, getHintLevel } = usePuzzleEngine();
  const meta = getRoomMeta(roomId);
  const level = getHintLevel(roomId);
  const hints = meta.hints.slice(0, level);

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-amber-300">Hint system</h3>
        <span className="text-xs text-cyber-muted">
          {level}/3 used · −35 pts each
        </span>
      </div>

      <AnimatePresence>
        {hints.map((hint) => (
          <motion.p
            key={hint.level}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 rounded border border-amber-500/20 bg-black/20 p-3 text-sm text-amber-100/90"
          >
            <span className="font-semibold text-amber-400">Level {hint.level}: </span>
            {hint.text}
          </motion.p>
        ))}
      </AnimatePresence>

      {level < 3 && (
        <Button
          variant="secondary"
          className="mt-2 w-full sm:w-auto"
          onClick={() => revealHint(roomId)}
          disabled={state.rooms[roomId].completed}
        >
          {level === 0 ? 'I need a nudge' : level === 1 ? 'Give me a clearer clue' : 'Show me the method'}
        </Button>
      )}

      {level >= 3 && (
        <p className="mt-2 text-xs text-cyber-muted">All hints revealed for this room.</p>
      )}
    </div>
  );
}
