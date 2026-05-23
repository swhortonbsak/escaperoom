import { motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PuzzleRoomId } from '../../types';
import { PUZZLE_ROOM_IDS } from '../../types';
import { usePuzzleEngine } from '../../context/usePuzzleEngine';
import { getRoomMeta } from '../../context/puzzleMeta';
import { HintSystem } from '../ui/HintSystem';
import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';
import { SceneImage } from '../ui/SceneImage';
import { RoomCompleteCelebration } from '../ui/RoomCompleteCelebration';
import { getPuzzleScene } from '../../data/sceneImages';

interface PuzzleShellProps {
  roomId: PuzzleRoomId;
  children: ReactNode;
  onSubmit?: () => void;
  feedback?: { type: 'error' | 'success'; message: string } | null;
  successContent?: ReactNode;
}

function getNextRoomId(roomId: PuzzleRoomId): PuzzleRoomId | 'complete' {
  const idx = PUZZLE_ROOM_IDS.indexOf(roomId);
  return PUZZLE_ROOM_IDS[idx + 1] ?? 'complete';
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

  useEffect(() => {
    if (completed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [completed]);

  const go = (room: PuzzleRoomId | 'intro' | 'complete') => {
    goToRoom(room);
    if (room === 'intro') navigate('/');
    else if (room === 'complete') navigate('/complete');
    else navigate(`/play/${room}`);
  };

  const continueToNext = () => {
    const next = getNextRoomId(roomId);
    go(next === 'complete' ? 'complete' : next);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Panel
        title={completed ? undefined : meta.title}
        subtitle={completed ? undefined : meta.subtitle}
        glow={completed ? 'purple' : 'cyan'}
      >
        {completed ? (
          <RoomCompleteCelebration
            roomId={roomId}
            onContinue={continueToNext}
            onHub={() => go('intro')}
          />
        ) : (
          <>
            <SceneImage
              src={scene.src}
              alt={scene.alt}
              caption={scene.caption}
              className="mb-5"
            />
            <p className="mb-4 text-sm leading-relaxed text-slate-300">{meta.briefing}</p>
            <p className="mb-4 text-xs text-cyber-muted">
              Est. {meta.expectedMinutes} min · Syllabus:{' '}
              {meta.syllabusLinks.map((l) => l.specRef).join(', ')}
            </p>
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
        )}

        {completed && successContent && <div className="mt-4">{successContent}</div>}
      </Panel>

      {completed && (
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
        </nav>
      )}
    </motion.div>
  );
}
