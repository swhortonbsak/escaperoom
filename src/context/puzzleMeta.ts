import { puzzleMetaById } from '../data/puzzles';
import type { PuzzleRoomId } from '../types';

export function getRoomMeta(room: PuzzleRoomId) {
  return puzzleMetaById[room];
}
