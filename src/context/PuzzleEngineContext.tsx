import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { GameState, PuzzleRoomId, RoomId } from '../types';
import { PUZZLE_ROOM_IDS } from '../types';
import { calculateScore, elapsedSeconds } from '../utils/score';
import {
  createInitialState,
  loadGameState,
  resetGameState,
  saveGameState,
  saveLeaderboardEntry,
} from '../utils/storage';

type Action =
  | { type: 'HYDRATE'; state: GameState }
  | { type: 'SET_PLAYER'; name: string }
  | { type: 'START_GAME' }
  | { type: 'SET_ROOM'; room: RoomId }
  | { type: 'REGISTER_ATTEMPT'; room: PuzzleRoomId }
  | { type: 'USE_HINT'; room: PuzzleRoomId }
  | { type: 'COMPLETE_ROOM'; room: PuzzleRoomId; fragment?: string }
  | { type: 'SET_BONUS' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'RESET' };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'SET_PLAYER':
      return { ...state, playerName: action.name };
    case 'START_GAME':
      return {
        ...state,
        startedAt: state.startedAt ?? Date.now(),
        introSeen: true,
        currentRoom: 'room1',
      };
    case 'SET_ROOM':
      return { ...state, currentRoom: action.room };
    case 'REGISTER_ATTEMPT': {
      const room = state.rooms[action.room];
      return {
        ...state,
        totalAttempts: state.totalAttempts + 1,
        rooms: {
          ...state.rooms,
          [action.room]: { ...room, attempts: room.attempts + 1 },
        },
      };
    }
    case 'USE_HINT': {
      const room = state.rooms[action.room];
      const hintsUsed = Math.min(3, room.hintsUsed + 1);
      return {
        ...state,
        totalHintsUsed: state.totalHintsUsed + 1,
        rooms: {
          ...state.rooms,
          [action.room]: { ...room, hintsUsed },
        },
      };
    }
    case 'COMPLETE_ROOM': {
      const room = state.rooms[action.room];
      const fragments =
        action.fragment && !state.fragments.includes(action.fragment)
          ? [...state.fragments, action.fragment]
          : state.fragments;
      return {
        ...state,
        fragments,
        // Stay on the completed room so the student sees the success screen
        currentRoom: action.room,
        vaultUnlocked: action.room === 'vault' ? true : state.vaultUnlocked,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...room,
            completed: true,
            completedAt: Date.now(),
          },
        },
      };
    }
    case 'SET_BONUS':
      return { ...state, bonusCompleted: true };
    case 'COMPLETE_GAME': {
      const score = calculateScore(state).total;
      const completedAt = Date.now();
      const next = { ...state, completedAt, finalScore: score };
      if (state.playerName.trim()) {
        saveLeaderboardEntry({
          name: state.playerName.trim(),
          score,
          timeSeconds: elapsedSeconds({ ...next, completedAt }),
          hintsUsed: state.totalHintsUsed,
          attempts: state.totalAttempts,
          completedAt,
        });
      }
      return next;
    }
    case 'RESET':
      return createInitialState();
    default:
      return state;
  }
}

interface PuzzleEngineContextValue {
  state: GameState;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  goToRoom: (room: RoomId) => void;
  registerAttempt: (room: PuzzleRoomId) => void;
  revealHint: (room: PuzzleRoomId) => void;
  completeRoom: (room: PuzzleRoomId, fragment?: string) => void;
  setBonusCompleted: () => void;
  finishGame: () => void;
  resetProgress: () => void;
  getHintLevel: (room: PuzzleRoomId) => number;
  canAccessRoom: (room: PuzzleRoomId) => boolean;
  fragmentsCollected: number;
  scorePreview: number;
  elapsed: number;
}

const PuzzleEngineContext = createContext<PuzzleEngineContextValue | null>(null);

export { PuzzleEngineContext };

export function PuzzleEngineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    dispatch({ type: 'HYDRATE', state: loadGameState() });
  }, []);

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const setPlayerName = useCallback((name: string) => {
    dispatch({ type: 'SET_PLAYER', name });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const goToRoom = useCallback((room: RoomId) => {
    dispatch({ type: 'SET_ROOM', room });
  }, []);

  const registerAttempt = useCallback((room: PuzzleRoomId) => {
    dispatch({ type: 'REGISTER_ATTEMPT', room });
  }, []);

  const revealHint = useCallback((room: PuzzleRoomId) => {
    dispatch({ type: 'USE_HINT', room });
  }, []);

  const completeRoom = useCallback((room: PuzzleRoomId, fragment?: string) => {
    dispatch({ type: 'COMPLETE_ROOM', room, fragment });
    if (room === 'vault') {
      dispatch({ type: 'COMPLETE_GAME' });
    }
  }, []);

  const setBonusCompleted = useCallback(() => {
    dispatch({ type: 'SET_BONUS' });
  }, []);

  const finishGame = useCallback(() => {
    dispatch({ type: 'COMPLETE_GAME' });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = resetGameState();
    dispatch({ type: 'HYDRATE', state: fresh });
  }, []);

  const getHintLevel = useCallback(
    (room: PuzzleRoomId) => state.rooms[room].hintsUsed,
    [state.rooms],
  );

  const canAccessRoom = useCallback(
    (room: PuzzleRoomId) => {
      if (room === 'room1') return true;
      const idx = PUZZLE_ROOM_IDS.indexOf(room);
      const prev = PUZZLE_ROOM_IDS[idx - 1];
      return state.rooms[prev]?.completed ?? false;
    },
    [state.rooms],
  );

  const fragmentsCollected = useMemo(
    () => PUZZLE_ROOM_IDS.filter((id) => id !== 'vault' && state.rooms[id].completed).length,
    [state.rooms],
  );

  const scorePreview = useMemo(() => calculateScore(state).total, [state]);
  const elapsed = useMemo(() => elapsedSeconds(state), [state]);

  const value = useMemo(
    () => ({
      state,
      setPlayerName,
      startGame,
      goToRoom,
      registerAttempt,
      revealHint,
      completeRoom,
      setBonusCompleted,
      finishGame,
      resetProgress,
      getHintLevel,
      canAccessRoom,
      fragmentsCollected,
      scorePreview,
      elapsed,
    }),
    [
      state,
      setPlayerName,
      startGame,
      goToRoom,
      registerAttempt,
      revealHint,
      completeRoom,
      setBonusCompleted,
      finishGame,
      resetProgress,
      getHintLevel,
      canAccessRoom,
      fragmentsCollected,
      scorePreview,
      elapsed,
    ],
  );

  return (
    <PuzzleEngineContext.Provider value={value}>{children}</PuzzleEngineContext.Provider>
  );
}
