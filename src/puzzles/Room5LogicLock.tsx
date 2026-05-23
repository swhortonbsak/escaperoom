import { useState } from 'react';
import {
  room5ExpressionOptions,
  room5Rule,
  room5Variables,
  room5TruthRows,
} from '../data/puzzles/room5';
import { validateRoom5, validateRoom5Fragment } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';

export function Room5LogicLock() {
  const { registerAttempt, completeRoom } = usePuzzleEngine();
  const meta = getRoomMeta('room5');
  const [expression, setExpression] = useState('');
  const [truth, setTruth] = useState(room5TruthRows.map((r) => ({ ...r })));
  const [fragment, setFragment] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    registerAttempt('room5');
    if (!validateRoom5(expression, truth)) {
      setFeedback({
        type: 'error',
        message:
          'Lock remains closed. Lockdown (L) must force output 0. Emergency override is OR not XOR. Use brackets: A AND (B OR E) AND NOT L.',
      });
      return;
    }
    if (!validateRoom5Fragment(fragment)) {
      setFeedback({
        type: 'error',
        message: 'Logic correct. Physical layer fragment: ASCII S = hex 53.',
      });
      return;
    }
    setFeedback(null);
    completeRoom('room5', meta.keyFragment);
  };

  return (
    <PuzzleShell roomId="room5" onSubmit={handleSubmit} feedback={feedback}>
      <blockquote className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm italic text-slate-200">
        {room5Rule}
      </blockquote>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {room5Variables.map((v) => (
          <span key={v.id} className="rounded border border-cyber-border px-2 py-1">
            <strong className="text-cyber-cyan">{v.id}</strong> = {v.label}
          </span>
        ))}
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold">Boolean expression</legend>
        {room5ExpressionOptions.map((opt) => (
          <label key={opt} className="mb-2 flex cursor-pointer items-center gap-2 rounded border border-cyber-border p-3 text-sm">
            <input
              type="radio"
              name="expr"
              checked={expression === opt}
              onChange={() => setExpression(opt)}
            />
            <span className="terminal-text">{opt}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-cyber-border text-cyber-muted">
              <th className="p-2">A</th>
              <th className="p-2">B</th>
              <th className="p-2">E</th>
              <th className="p-2">L</th>
              <th className="p-2">Open?</th>
            </tr>
          </thead>
          <tbody>
            {truth.map((row, i) => (
              <tr key={i} className="border-b border-cyber-border/50">
                <td className="p-2 text-center">{row.A}</td>
                <td className="p-2 text-center">{row.B}</td>
                <td className="p-2 text-center">{row.E}</td>
                <td className="p-2 text-center">{row.L}</td>
                <td className="p-2">
                  <select
                    className="w-full rounded border border-cyber-border bg-black/40 px-2 py-1"
                    value={row.output}
                    onChange={(e) => {
                      const next = [...truth];
                      next[i] = { ...next[i], output: Number(e.target.value) };
                      setTruth(next);
                    }}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">Physical layer fragment (hex)</span>
        <input
          className="mt-1 w-full max-w-xs rounded border border-cyber-cyan/40 bg-black/30 px-3 py-2 terminal-text text-lg text-cyber-cyan"
          value={fragment}
          onChange={(e) => setFragment(e.target.value)}
          maxLength={2}
        />
      </label>
    </PuzzleShell>
  );
}
