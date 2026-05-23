import { useState } from 'react';
import {
  room3Countermeasures,
  room3Incidents,
  room3Fragment,
} from '../data/puzzles/room3';
import { validateRoom3, validateRoom3Fragment } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';

export function Room3ThreatConsole() {
  const { registerAttempt, completeRoom } = usePuzzleEngine();
  const meta = getRoomMeta('room3');
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [fragment, setFragment] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    registerAttempt('room3');
    if (!validateRoom3(matches)) {
      setFeedback({
        type: 'error',
        message:
          'Triage incomplete. Phishing needs human-layer defences — passwords alone fail. Distinguish integrity (altered records) from confidentiality.',
      });
      return;
    }
    if (!validateRoom3Fragment(fragment)) {
      setFeedback({
        type: 'error',
        message: 'Countermeasures mapped correctly. Convert the integrity incident ID index: incident #5 → ASCII R → hex 52.',
      });
      return;
    }
    setFeedback(null);
    completeRoom('room3', meta.keyFragment);
  };

  return (
    <PuzzleShell roomId="room3" onSubmit={handleSubmit} feedback={feedback}>
      <div className="space-y-4">
        {room3Incidents.map((inc) => (
          <div key={inc.id} className="rounded-lg border border-cyber-border bg-black/20 p-4">
            <p className="text-sm font-semibold text-cyber-amber">{inc.title}</p>
            <p className="mt-1 text-sm text-slate-300">{inc.description}</p>
            <select
              className="mt-3 w-full rounded border border-cyber-border bg-black/40 px-3 py-2 text-sm"
              value={matches[inc.id] ?? ''}
              onChange={(e) => setMatches({ ...matches, [inc.id]: e.target.value })}
            >
              <option value="">Select countermeasure…</option>
              {room3Countermeasures.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">
          Key fragment (hex): integrity incident → letter R → hex pair
        </span>
        <input
          className="mt-1 w-full max-w-xs rounded border border-cyber-cyan/40 bg-black/30 px-3 py-2 terminal-text text-lg text-cyber-cyan"
          value={fragment}
          onChange={(e) => setFragment(e.target.value)}
          placeholder={room3Fragment.replace(/./g, '?')}
          maxLength={2}
        />
      </label>
    </PuzzleShell>
  );
}
