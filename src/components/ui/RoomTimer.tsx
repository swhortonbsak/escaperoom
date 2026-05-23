import { useState } from 'react';
import type { PuzzleRoomId } from '../../types';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { useElapsedSeconds } from '../../hooks/useElapsedSeconds';
import { formatTime } from '../../utils/score';

interface RoomTimerProps {
  roomId: PuzzleRoomId;
}

function RoomTimerActive() {
  const [sessionStart] = useState(() => Date.now());
  const elapsed = useElapsedSeconds(sessionStart);

  return (
    <div
      className="terminal-text rounded-md border border-cyber-border bg-black/30 px-3 py-1.5 text-sm text-cyber-cyan"
      aria-live="polite"
      aria-label={`Time in this room ${formatTime(elapsed)}`}
      title="Time spent in this room this visit"
    >
      <span className="text-cyber-muted">Room</span>{' '}
      <span className="font-semibold tabular-nums">{formatTime(elapsed)}</span>
    </div>
  );
}

export function RoomTimer({ roomId }: RoomTimerProps) {
  const { state } = usePuzzleEngine();

  if (state.rooms[roomId].completed) return null;

  return <RoomTimerActive key={roomId} />;
}
