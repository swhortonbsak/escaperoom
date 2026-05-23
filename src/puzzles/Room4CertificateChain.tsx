import { useState } from 'react';
import {
  room4Certificates,
  room4KeyOptions,
  room4Steps,
} from '../data/puzzles/room4';
import { validateRoom4, validateRoom4Fragment } from '../puzzles/validators';
import { usePuzzleEngine } from '../context/usePuzzleEngine'
import { getRoomMeta } from '../context/puzzleMeta';
import { PuzzleShell } from '../components/puzzles/PuzzleShell';

export function Room4CertificateChain() {
  const { registerAttempt, completeRoom } = usePuzzleEngine();
  const meta = getRoomMeta('room4');
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [rejectedCert, setRejectedCert] = useState('');
  const [fragment, setFragment] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null,
  );

  const handleSubmit = () => {
    registerAttempt('room4');
    if (!validateRoom4(assignments, rejectedCert)) {
      setFeedback({
        type: 'error',
        message:
          'Chain invalid. Bulk encryption uses symmetric keys. Asymmetric keys handle exchange and signatures. Reject certificates from untrusted CAs.',
      });
      return;
    }
    if (!validateRoom4Fragment(fragment)) {
      setFeedback({
        type: 'error',
        message: 'Cryptography correct. Transport layer fragment: ASCII U = hex 55.',
      });
      return;
    }
    setFeedback(null);
    completeRoom('room4', meta.keyFragment);
  };

  return (
    <PuzzleShell roomId="room4" onSubmit={handleSubmit} feedback={feedback}>
      <div className="space-y-3">
        {room4Steps.map((step) => (
          <div key={step.id} className="grid gap-2 rounded border border-cyber-border p-3 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">{step.label}</p>
              <p className="text-xs text-cyber-muted">{step.description}</p>
            </div>
            <select
              className="rounded border border-cyber-border bg-black/40 px-3 py-2 text-sm"
              value={assignments[step.id] ?? ''}
              onChange={(e) => setAssignments({ ...assignments, [step.id]: e.target.value })}
            >
              <option value="">Assign key/action…</option>
              {room4KeyOptions.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold">Reject untrusted certificate</legend>
        {room4Certificates.map((cert) => (
          <label
            key={cert.id}
            className="mb-2 flex cursor-pointer items-start gap-2 rounded border border-cyber-border p-3"
          >
            <input
              type="radio"
              name="reject"
              value={cert.id}
              checked={rejectedCert === cert.id}
              onChange={() => setRejectedCert(cert.id)}
            />
            <span className="text-sm">
              <span className="text-cyber-cyan">{cert.subject}</span> — Issuer: {cert.issuer}
            </span>
          </label>
        ))}
      </fieldset>

      <label className="mt-4 block text-sm">
        <span className="text-cyber-muted">Transport layer fragment (hex for U)</span>
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
