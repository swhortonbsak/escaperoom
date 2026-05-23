import { useState } from 'react';
import {
  room6AdtOptions,
  room6ComplexityOptions,
  room6Pseudocode,
  room6SearchOptions,
  room6BonusQuestion,
} from '../data/puzzles/room6';
import { validateRoom6 } from '../puzzles/validators';
import { normalizeAnswer } from '../utils/score';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';

export function Room6AlgorithmVault() {
  const { registerAttempt, completeRoom, setBonusCompleted, state } = usePuzzleEngine();
  const meta = getRoomMeta('room6');
  const [values, setValues] = useState({
    search: '',
    adt: '',
    trace: '',
    complexity: '',
    fragment: '',
    bonus: '',
  });
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    registerAttempt('room6');
    if (validateRoom6(values)) {
      if (
        !state.bonusCompleted &&
        normalizeAnswer(values.bonus) === normalizeAnswer(room6BonusQuestion.answer)
      ) {
        setBonusCompleted();
      }
      setFeedback(null);
      completeRoom('room6', meta.keyFragment);
    } else {
      setFeedback({
        type: 'error',
        message:
          'Module audit failed. Unsorted data → linear search. Recursion uses a stack (LIFO). factorial(4)=24. Merge sort is O(n log n), not O(n²).',
      });
    }
  };

  return (
    <PuzzleShell roomId="room6" onSubmit={handleSubmit} feedback={feedback}>
      <pre className="overflow-x-auto rounded-lg border border-cyber-border bg-black/40 p-4 terminal-text text-xs leading-relaxed text-green-200/90">
        {room6Pseudocode}
      </pre>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">After breach, list is unsorted. Search type?</legend>
          {room6SearchOptions.map((opt) => (
            <label key={opt} className="mb-1 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="search"
                checked={values.search === opt}
                onChange={() => setValues({ ...values, search: opt })}
              />
              {opt} search
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold">ADT for recursive call frames?</legend>
          {room6AdtOptions.map((opt) => (
            <label key={opt.id} className="mb-1 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="adt"
                checked={values.adt === opt.id}
                onChange={() => setValues({ ...values, adt: opt.id })}
              />
              {opt.label}
            </label>
          ))}
        </fieldset>

        <label className="block text-sm">
          <span className="text-cyber-muted">Trace: factorial(4) = </span>
          <input
            className="mt-1 w-full rounded border border-cyber-border bg-black/30 px-3 py-2 terminal-text"
            value={values.trace}
            onChange={(e) => setValues({ ...values, trace: e.target.value })}
          />
        </label>

        <label className="block text-sm">
          <span className="text-cyber-muted">Merge sort complexity</span>
          <select
            className="mt-1 w-full rounded border border-cyber-border bg-black/40 px-3 py-2 text-sm"
            value={values.complexity}
            onChange={(e) => setValues({ ...values, complexity: e.target.value })}
          >
            <option value="">Select…</option>
            {room6ComplexityOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 rounded border border-purple-500/20 bg-purple-500/5 p-3 text-xs text-purple-200">
        <strong>Stack trace visualisation:</strong> factorial(4) → 4×factorial(3) → 3×factorial(2) → 2×factorial(1) → return 1, unwind: 2→6→24
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">Application layer fragment (hex for E)</span>
        <input
          className="mt-1 w-full max-w-xs rounded border border-cyber-cyan/40 bg-black/30 px-3 py-2 terminal-text text-lg text-cyber-cyan"
          value={values.fragment}
          onChange={(e) => setValues({ ...values, fragment: e.target.value })}
          maxLength={2}
        />
      </label>

      <label className="mt-3 block text-sm">
        <span className="text-cyber-muted">{room6BonusQuestion.prompt} (+75 bonus)</span>
        <input
          className="mt-1 w-full max-w-xs rounded border border-purple-500/30 bg-black/30 px-3 py-2 text-sm"
          value={values.bonus}
          onChange={(e) => setValues({ ...values, bonus: e.target.value })}
        />
      </label>
    </PuzzleShell>
  );
}
