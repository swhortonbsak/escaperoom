import { useState } from 'react';
import {
  room2Events,
  room2ShuffledIds,
  room2SecurityOptions,
} from '../data/puzzles/room2';
import { validateRoom2 } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';
import { Button } from '../components/ui/Button';

export function Room2NetworkTrace() {
  const { registerAttempt, completeRoom } = usePuzzleEngine();
  const meta = getRoomMeta('room2');
  const [order, setOrder] = useState<string[]>(room2ShuffledIds);
  const [security, setSecurity] = useState('');
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

  const handleSubmit = () => {
    registerAttempt('room2');
    if (validateRoom2(order, security)) {
      setFeedback(null);
      completeRoom('room2', meta.keyFragment);
    } else {
      setFeedback({
        type: 'error',
        message:
          'Trace inconsistent. DNS must precede TCP. Routing occurs before HTTP payload. Consider which log entry exposes internal addressing.',
      });
    }
  };

  return (
    <PuzzleShell roomId="room2" onSubmit={handleSubmit} feedback={feedback}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-200">Network map</h3>
          <div className="rounded-lg border border-cyber-border bg-black/30 p-4 text-xs text-cyber-muted">
            <p>[Client 192.168.12.8] —LAN— [Gateway/NAT 198.51.100.7] —WAN— [Router] — [Server 203.0.113.44:443]</p>
            <p className="mt-2">URL: https://archive.bsak.edu/vault</p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-200">Order packet events (earliest first)</h3>
          <ul className="space-y-2">
            {order.map((id, index) => {
              const ev = room2Events.find((e) => e.id === id)!;
              return (
                <li
                  key={id}
                  className="flex items-start gap-2 rounded border border-cyber-border bg-black/20 p-3"
                >
                  <span className="terminal-text text-cyber-cyan">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ev.label}</p>
                    <p className="text-xs text-cyber-muted">{ev.detail}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" className="px-2 py-0.5 text-xs" onClick={() => move(index, -1)} aria-label="Move up">↑</Button>
                    <Button variant="ghost" className="px-2 py-0.5 text-xs" onClick={() => move(index, 1)} aria-label="Move down">↓</Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold text-slate-200">Security implication in this trace</legend>
        <div className="space-y-2">
          {room2SecurityOptions.map((opt) => (
            <label key={opt.id} className="flex cursor-pointer items-start gap-2 rounded border border-cyber-border p-3 hover:border-cyan-500/30">
              <input
                type="radio"
                name="security"
                value={opt.id}
                checked={security === opt.id}
                onChange={() => setSecurity(opt.id)}
                className="mt-1"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </PuzzleShell>
  );
}
