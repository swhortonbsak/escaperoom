import type { GameState, LeaderboardEntry, PuzzleRoomId, RoomProgress } from '../types';
import { LEADERBOARD_KEY, PUZZLE_ROOM_IDS, STORAGE_KEY } from '../types';

const DEFAULT_ROOM_PROGRESS = (): RoomProgress => ({
  completed: false,
  hintsUsed: 0,
  attempts: 0,
});

export function createInitialState(): GameState {
  const rooms = PUZZLE_ROOM_IDS.reduce(
    (acc, id) => {
      acc[id] = DEFAULT_ROOM_PROGRESS();
      return acc;
    },
    {} as Record<PuzzleRoomId, RoomProgress>,
  );

  return {
    version: 1,
    startedAt: null,
    completedAt: null,
    currentRoom: 'intro',
    playerName: '',
    rooms,
    fragments: [],
    vaultUnlocked: false,
    introSeen: false,
    bonusCompleted: false,
    totalHintsUsed: 0,
    totalAttempts: 0,
    finalScore: null,
  };
}

export function loadGameState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as GameState;
    return { ...createInitialState(), ...parsed, rooms: { ...createInitialState().rooms, ...parsed.rooms } };
  } catch {
    return createInitialState();
  }
}

export function saveGameState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetGameState(): GameState {
  localStorage.removeItem(STORAGE_KEY);
  return createInitialState();
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function saveLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const board = loadLeaderboard();
  board.push(entry);
  board.sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds);
  const trimmed = board.slice(0, 20);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  return trimmed;
}

export function resetLeaderboard(): void {
  localStorage.removeItem(LEADERBOARD_KEY);
}
