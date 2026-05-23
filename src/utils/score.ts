import type { GameState, ScoreBreakdown } from '../types';

const TARGET_SECONDS = 45 * 60;

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function elapsedSeconds(state: GameState): number {
  if (!state.startedAt) return 0;
  const end = state.completedAt ?? Date.now();
  return Math.floor((end - state.startedAt) / 1000);
}

export function calculateScore(state: GameState): ScoreBreakdown {
  const base = 1000;
  const timeSeconds = elapsedSeconds(state);
  const timeBonus = Math.max(0, Math.round((TARGET_SECONDS - timeSeconds) / 6));
  const hintPenalty = state.totalHintsUsed * 35;
  const attemptPenalty = Math.max(0, state.totalAttempts - 6) * 12;
  const bonusPoints = state.bonusCompleted ? 75 : 0;
  const total = Math.max(
    100,
    base + timeBonus - hintPenalty - attemptPenalty + bonusPoints,
  );

  return { base, timeBonus, hintPenalty, attemptPenalty, bonusPoints, total };
}

export function normalizeAnswer(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
