import type { PuzzleRoomId } from '../../types';
import { getPuzzleScene } from '../../data/sceneImages';

interface RoomThumbnailProps {
  roomId: PuzzleRoomId;
  done?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

export function RoomThumbnail({ roomId, done, locked, onClick }: RoomThumbnailProps) {
  const scene = getPuzzleScene(roomId);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={`group relative overflow-hidden rounded-lg border text-left transition-all ${
        locked
          ? 'cursor-not-allowed border-cyber-border opacity-50'
          : 'border-cyber-border hover:border-cyber-cyan/40 hover:glow-cyan'
      } ${done ? 'border-cyber-green/40' : ''}`}
    >
      <div className="relative aspect-video w-full">
        <img
          src={scene.src}
          alt=""
          aria-hidden
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <span className="absolute bottom-2 left-2 text-xs font-medium text-slate-200">
          {done ? '✓ ' : locked ? '🔒 ' : ''}
          {roomId === 'vault' ? 'Vault' : `Room ${roomId.replace('room', '')}`}
        </span>
      </div>
    </button>
  );
}
