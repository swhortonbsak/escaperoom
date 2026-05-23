import type { PuzzleMeta, PuzzleRoomId } from '../../types';
import { room1Meta } from './room1';
import { room2Meta } from './room2';
import { room3Meta } from './room3';
import { room4Meta } from './room4';
import { room5Meta } from './room5';
import { room6Meta } from './room6';
import { vaultMeta } from './finalVault';

export const puzzleMetaById: Record<PuzzleRoomId, PuzzleMeta> = {
  room1: room1Meta,
  room2: room2Meta,
  room3: room3Meta,
  room4: room4Meta,
  room5: room5Meta,
  room6: room6Meta,
  vault: vaultMeta,
};

export const allPuzzleMeta = Object.values(puzzleMetaById);

export { room1Meta, room2Meta, room3Meta, room4Meta, room5Meta, room6Meta, vaultMeta };
