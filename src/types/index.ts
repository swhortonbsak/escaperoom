export type RoomId =
  | 'intro'
  | 'room1'
  | 'room2'
  | 'room3'
  | 'room4'
  | 'room5'
  | 'room6'
  | 'vault'
  | 'complete';

export type PuzzleRoomId = Exclude<RoomId, 'intro' | 'complete'>;

export interface Hint {
  level: 1 | 2 | 3;
  text: string;
}

export interface SyllabusLink {
  specRef: string;
  topic: string;
  paper: string;
}

export interface PuzzleMeta {
  id: PuzzleRoomId;
  title: string;
  subtitle: string;
  briefing: string;
  expectedMinutes: number;
  keyFragment: string;
  keyFragmentLabel: string;
  stackLayer: number;
  stackLayerName: string;
  successExplanation: string;
  syllabusLinks: SyllabusLink[];
  hints: Hint[];
  teacherAnswer: string;
  commonMisconceptions: string[];
  plenaryQuestions: string[];
}

export interface RoomProgress {
  completed: boolean;
  hintsUsed: number;
  attempts: number;
  completedAt?: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  timeSeconds: number;
  hintsUsed: number;
  attempts: number;
  completedAt: number;
}

export interface GameState {
  version: number;
  startedAt: number | null;
  completedAt: number | null;
  currentRoom: RoomId;
  playerName: string;
  rooms: Record<PuzzleRoomId, RoomProgress>;
  fragments: string[];
  vaultUnlocked: boolean;
  introSeen: boolean;
  bonusCompleted: boolean;
  totalHintsUsed: number;
  totalAttempts: number;
  finalScore: number | null;
}

export interface ScoreBreakdown {
  base: number;
  timeBonus: number;
  hintPenalty: number;
  attemptPenalty: number;
  bonusPoints: number;
  total: number;
}

export const PUZZLE_ROOM_IDS: PuzzleRoomId[] = [
  'room1',
  'room2',
  'room3',
  'room4',
  'room5',
  'room6',
  'vault',
];

export const STORAGE_KEY = 'operation-blackout-v1';
export const LEADERBOARD_KEY = 'operation-blackout-leaderboard-v1';
