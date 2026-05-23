import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { ReactElement } from 'react';
import type { PuzzleRoomId, RoomId } from '../types';
import { PUZZLE_ROOM_IDS } from '../types';
import { usePuzzleEngine } from '../context/usePuzzleEngine';
import { Room1CorruptedLogin } from '../puzzles/Room1CorruptedLogin';
import { Room2NetworkTrace } from '../puzzles/Room2NetworkTrace';
import { Room3ThreatConsole } from '../puzzles/Room3ThreatConsole';
import { Room4CertificateChain } from '../puzzles/Room4CertificateChain';
import { Room5LogicLock } from '../puzzles/Room5LogicLock';
import { Room6AlgorithmVault } from '../puzzles/Room6AlgorithmVault';
import { FinalVault } from '../puzzles/FinalVault';
import { Panel } from '../components/ui/Panel';
import { RoomThumbnail } from '../components/ui/RoomThumbnail';
import { getRoomMeta } from '../context/puzzleMeta';

const roomComponents: Record<PuzzleRoomId, () => ReactElement> = {
  room1: Room1CorruptedLogin,
  room2: Room2NetworkTrace,
  room3: Room3ThreatConsole,
  room4: Room4CertificateChain,
  room5: Room5LogicLock,
  room6: Room6AlgorithmVault,
  vault: FinalVault,
};

export function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { state, canAccessRoom } = usePuzzleEngine();

  if (!state.introSeen) {
    return <Navigate to="/" replace />;
  }

  if (state.currentRoom === 'complete') {
    return <Navigate to="/complete" replace />;
  }

  const id = (roomId ?? 'room1') as PuzzleRoomId;
  if (!PUZZLE_ROOM_IDS.includes(id)) {
    return <Navigate to="/play/room1" replace />;
  }

  if (!canAccessRoom(id)) {
    const firstLocked = PUZZLE_ROOM_IDS.find((r) => !canAccessRoom(r)) ?? 'room1';
    return <Navigate to={`/play/${firstLocked}`} replace />;
  }

  const Component = roomComponents[id];
  const roomComplete = state.rooms[id].completed;

  return (
    <div className="space-y-4">
      <Component />
      {!roomComplete && <MissionHub compact />}
    </div>
  );
}

function MissionHub({ compact }: { compact?: boolean }) {
  const { state, goToRoom } = usePuzzleEngine();
  const navigate = useNavigate();

  return (
    <Panel title={compact ? 'Mission hub' : undefined} className={compact ? 'opacity-90' : ''}>
      <p className="mb-3 text-xs text-cyber-muted">Jump to any unlocked location in the investigation.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PUZZLE_ROOM_IDS.map((id) => {
          const meta = getRoomMeta(id);
          const done = state.rooms[id].completed;
          const prev = PUZZLE_ROOM_IDS[PUZZLE_ROOM_IDS.indexOf(id) - 1];
          const locked =
            id !== 'room1' &&
            !state.rooms[id].completed &&
            prev &&
            !state.rooms[prev]?.completed;
          const vaultLocked = id === 'vault' && state.fragments.length < 6;

          return (
            <div key={id} className="space-y-1">
              <RoomThumbnail
                roomId={id}
                done={done}
                locked={!!locked || vaultLocked}
                onClick={() => {
                  if (locked || vaultLocked) return;
                  goToRoom(id as RoomId);
                  navigate(`/play/${id}`);
                }}
              />
              <p className="truncate px-1 text-xs text-cyber-muted" title={meta.title}>
                {meta.title.replace('The ', '')}
              </p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

export function MissionHubPage() {
  return <MissionHub />;
}
