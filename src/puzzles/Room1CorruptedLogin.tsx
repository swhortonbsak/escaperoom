import { useState } from 'react';
import { room1BannerBlocks, room1Questions } from '../data/puzzles/room1';
import { validateRoom1 } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';

export function Room1CorruptedLogin() {
  const { registerAttempt, completeRoom } = usePuzzleEngine();
  const meta = getRoomMeta('room1');
  const [values, setValues] = useState({
    binaryToDenary: '',
    denaryToHex: '',
    twosComplement: '',
    invalidBlock: '',
    fragment: '',
  });
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    registerAttempt('room1');
    if (validateRoom1(values)) {
      setFeedback(null);
      completeRoom('room1', meta.keyFragment);
    } else {
      setFeedback({
        type: 'error',
        message:
          'Analysis rejected. Check 8-bit grouping, two\'s complement sign, invalid bit-length, and hex conversion. Remember: 11111111 is −1, not a printable character.',
      });
    }
  };

  return (
    <PuzzleShell roomId="room1" onSubmit={handleSubmit} feedback={feedback}>
      <div className="terminal-text space-y-4 rounded-lg border border-cyber-border bg-black/40 p-4 font-mono text-sm">
        <p className="text-cyber-red">⚠ CORRUPTED LOGIN BANNER — RECOVER FRAGMENT</p>
        {room1BannerBlocks.map((block) => (
          <div key={block.id} className="border-l-2 border-cyan-500/30 pl-3">
            <span className="text-cyber-cyan">{block.label}</span>: {block.value}
            <span className="ml-2 text-xs text-cyber-muted">({block.type})</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-cyber-muted">{room1Questions.binaryToDenary.prompt}</span>
          <input
            className="mt-1 w-full rounded border border-cyber-border bg-black/30 px-3 py-2 terminal-text text-slate-100"
            value={values.binaryToDenary}
            onChange={(e) => setValues({ ...values, binaryToDenary: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-cyber-muted">{room1Questions.denaryToHex.prompt}</span>
          <input
            className="mt-1 w-full rounded border border-cyber-border bg-black/30 px-3 py-2 terminal-text text-slate-100"
            value={values.denaryToHex}
            onChange={(e) => setValues({ ...values, denaryToHex: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-cyber-muted">{room1Questions.twosComplement.prompt}</span>
          <input
            className="mt-1 w-full rounded border border-cyber-border bg-black/30 px-3 py-2 terminal-text text-slate-100"
            value={values.twosComplement}
            onChange={(e) => setValues({ ...values, twosComplement: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-cyber-muted">{room1Questions.invalidBlock.prompt}</span>
          <input
            className="mt-1 w-full rounded border border-cyber-border bg-black/30 px-3 py-2 terminal-text text-slate-100"
            value={values.invalidBlock}
            onChange={(e) => setValues({ ...values, invalidBlock: e.target.value })}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">{room1Questions.fragment.prompt}</span>
        <input
          className="mt-1 w-full max-w-xs rounded border border-cyber-cyan/40 bg-black/30 px-3 py-2 terminal-text text-lg text-cyber-cyan"
          value={values.fragment}
          onChange={(e) => setValues({ ...values, fragment: e.target.value })}
          maxLength={2}
        />
      </label>
    </PuzzleShell>
  );
}
