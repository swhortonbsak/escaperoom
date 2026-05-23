import { useContext } from 'react';
import { PuzzleEngineContext } from './PuzzleEngineContext';

export function usePuzzleEngine() {
  const ctx = useContext(PuzzleEngineContext);
  if (!ctx) throw new Error('usePuzzleEngine must be used within PuzzleEngineProvider');
  return ctx;
}
