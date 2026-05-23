import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PuzzleRoomId } from '../../types';
import { usePuzzleEngine } from '../../context/usePuzzleEngine'
import { getRoomMeta } from '../../context/puzzleMeta';
import { HintSystem } from '../ui/HintSystem';
import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';
import { SceneImage } from '../ui/SceneImage';
import { getPuzzleScene } from '../../data/sceneImages';

interface PuzzleShellProps {
  roomId: PuzzleRoomId;
  children: ReactNode;
  onSubmit?: () => void;
  feedback?: { type: 'error' | 'success'; message: string } | null;
  successContent?: ReactNode;
}

export function PuzzleShell({
  roomId,
  children,
  onSubmit,
  feedback,
  successContent,
}: PuzzleShellProps) {
  const { state, goToRoom } = usePuzzleEngine();
  const navigate = useNavigate();
  const meta = getRoomMeta(roomId);
  const scene = getPuzzleScene(roomId);
  const completed = state.rooms[roomId].completed;

  const go = (room: PuzzleRoomId | 'intro' | 'complete') => {
    goToRoom(room);
    if (room === 'intro') navigate('/');
    else if (room === 'complete') navigate('/complete');
    else navigate(`/play/${room}`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Panel title={meta.title} subtitle={meta.subtitle} glow="cyan">
        <SceneImage
          src={scene.src}
          alt={scene.alt}
          caption={scene.caption}
          completed={completed}
          fragmentLabel={completed ? meta.keyFragment : undefined}
          className="mb-5"
        />
        <p className="mb-4 text-sm leading-relaxed text-slate-300">{meta.briefing}</p>
        <p className="mb-4 text-xs text-cyber-muted">
          Est. {meta.expectedMinutes} min · Syllabus:{' '}
          {meta.syllabusLinks.map((l) => l.specRef).join(', ')}
        </p>

        {!completed ? (
          <>
            {children}
            {feedback && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 rounded border p-3 text-sm ${
                  feedback.type === 'error'
                    ? 'border-red-500/40 bg-red-500/10 text-red-200'
                    : 'border-green-500/40 bg-green-500/10 text-green-200'
                }`}
                role="alert"
              >
                {feedback.message}
              </motion.p>
            )}
            {onSubmit && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={onSubmit}>Submit analysis</Button>
              </div>
            )}
            <div className="mt-6">
              <HintSystem roomId={roomId} />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-cyber-green/40 bg-cyber-green/10 p-4">
              <p className="text-sm font-semibold text-cyber-green">Room secured</p>
              <p className="mt-2 text-sm text-slate-300">{meta.successExplanation}</p>
              <p className="mt-3 terminal-text text-lg font-bold text-cyber-cyan">
                {meta.keyFragmentLabel}: {meta.keyFragment}
              </p>
              <p className="mt-1 text-xs text-cyber-muted">
                Stack layer {meta.stackLayer}: {meta.stackLayerName}
              </p>
            </div>
            {successContent}
          </div>
        )}
      </Panel>

      <nav className="mt-4 flex flex-wrap gap-2">
        {roomId !== 'room1' && (
          <Button
            variant="ghost"
            onClick={() =>
              go(`room${Number(roomId.replace('room', '')) - 1}` as PuzzleRoomId)
            }
          >
            ← Previous room
          </Button>
        )}
        {completed && roomId !== 'vault' && (
          <Button
            onClick={() => {
              const n = Number(roomId.replace('room', '')) + 1;
              go(n <= 6 ? (`room${n}` as PuzzleRoomId) : 'vault');
            }}
          >
            Continue →
          </Button>
        )}
        {completed && roomId === 'vault' && (
          <Button onClick={() => go('complete')}>View debrief →</Button>
        )}
        <Button variant="ghost" onClick={() => go('intro')}>
          Mission hub
        </Button>
      </nav>
    </motion.div>
  );
}
