import { useMemo, useState } from 'react';
import { vaultFragmentSources, hexPairsToAscii } from '../data/puzzles/finalVault';
import { validateVault } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';
import { Button } from '../components/ui/Button';

export function FinalVault() {
  const { registerAttempt, completeRoom, state } = usePuzzleEngine();
  const meta = getRoomMeta('vault');
  const shuffled = useMemo(
    () => [...vaultFragmentSources].sort((a, b) => a.label.localeCompare(b.label)),
    [],
  );
  const [order, setOrder] = useState<string[]>(shuffled.map((f) => f.room));
  const [phrase, setPhrase] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const move = (index: number, direction: -1 | 1) => {
    const next = [...order];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  const preview = hexPairsToAscii(
    order.map((room) => vaultFragmentSources.find((f) => f.room === room)!.fragment),
  );

  const handleSubmit = () => {
    registerAttempt('vault');
    if (validateVault(order, phrase)) {
      setFeedback(null);
      completeRoom('vault', meta.keyFragment);
    } else {
      setFeedback({
        type: 'error',
        message:
          'Vault locked. Order fragments by TCP/IP stack layer (lowest first): Physical→Data Link→Network→Transport→Session→Application. Then convert hex pairs to ASCII.',
      });
    }
  };

  const allRoomsDone = ['room1', 'room2', 'room3', 'room4', 'room5', 'room6'].every(
    (id) => state.rooms[id as keyof typeof state.rooms].completed,
  );

  if (!allRoomsDone) {
    return (
      <PuzzleShell roomId="vault">
        <p className="text-sm text-amber-300">
          Collect all six key fragments before attempting the final vault. Progress:{' '}
          {state.fragments.length}/6
        </p>
      </PuzzleShell>
    );
  }

  return (
    <PuzzleShell roomId="vault" onSubmit={handleSubmit} feedback={feedback}>
      <p className="mb-4 text-sm text-slate-300">
        Reorder the hex fragments by stack layer (1 → 7). Each card shows its layer tag from your
        investigation.
      </p>

      <ul className="space-y-2">
        {order.map((room, index) => {
          const src = vaultFragmentSources.find((f) => f.room === room)!;
          return (
            <li
              key={room}
              className="flex items-center gap-3 rounded border border-cyber-cyan/30 bg-cyan-500/5 p-3"
            >
              <span className="terminal-text w-8 text-cyber-cyan">{index + 1}</span>
              <div className="flex-1">
                <span className="terminal-text text-lg font-bold text-cyber-cyan">{src.fragment}</span>
                <span className="ml-2 text-xs text-cyber-muted">
                  {src.label} · Layer {src.layer}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" className="px-2 py-0.5 text-xs" onClick={() => move(index, -1)}>↑</Button>
                <Button variant="ghost" className="px-2 py-0.5 text-xs" onClick={() => move(index, 1)}>↓</Button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 terminal-text text-sm text-cyber-muted">
        Preview decode: {preview}
      </p>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">Vault unlock phrase (ASCII)</span>
        <input
          className="mt-1 w-full max-w-sm rounded border border-cyber-cyan/50 bg-black/30 px-3 py-3 terminal-text text-xl tracking-widest text-cyber-cyan uppercase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value.toUpperCase())}
          maxLength={12}
        />
      </label>
    </PuzzleShell>
  );
}
