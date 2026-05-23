import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { calculateScore, formatTime, elapsedSeconds } from '../utils/score';
import { loadLeaderboard } from '../utils/storage';
import { usePuzzleEngine } from '../context/usePuzzleEngine';
import { Button } from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';
import { SceneImage } from '../components/ui/SceneImage';
import { getScene } from '../data/sceneImages';

export function CompletionPage() {
  const { state, resetProgress } = usePuzzleEngine();
  const breakdown = calculateScore(state);
  const time = elapsedSeconds(state);
  const board = loadLeaderboard().slice(0, 5);
  const completeScene = getScene('complete');

  if (!state.vaultUnlocked) {
    return (
      <Panel>
        <p className="text-sm text-slate-300">Complete the vault to view your debrief.</p>
        <Link to="/play/vault" className="mt-4 inline-block">
          <Button>Return to vault</Button>
        </Link>
      </Panel>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
      <Panel glow="cyan">
        <SceneImage
          src={completeScene.src}
          alt={completeScene.alt}
          caption={completeScene.caption}
          className="mb-5"
        />
        <p className="text-xs uppercase tracking-widest text-cyber-green">Mission complete</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-100">Exam Archive Restored</h1>
        <p className="mt-3 text-slate-300">
          The vault phrase <span className="terminal-text font-bold text-cyber-cyan">SECURE</span> was
          assembled from hex fragments ordered by TCP/IP stack layer. The breach is contained in this
          simulated environment.
        </p>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Time', value: formatTime(time) },
          { label: 'Score', value: breakdown.total.toString() },
          { label: 'Hints used', value: state.totalHintsUsed.toString() },
          { label: 'Incorrect attempts', value: state.totalAttempts.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-cyber-border bg-black/20 p-4 text-center">
            <p className="text-xs text-cyber-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-cyber-cyan">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Score breakdown">
        <ul className="space-y-1 text-sm text-slate-300">
          <li>Base: {breakdown.base}</li>
          <li>Time bonus: +{breakdown.timeBonus}</li>
          <li>Hint penalty: −{breakdown.hintPenalty}</li>
          <li>Attempt penalty: −{breakdown.attemptPenalty}</li>
          {breakdown.bonusPoints > 0 && <li>Bonus challenge: +{breakdown.bonusPoints}</li>}
          <li className="pt-2 font-semibold text-cyber-cyan">Total: {breakdown.total}</li>
        </ul>
      </Panel>

      {board.length > 0 && (
        <Panel title="Local leaderboard (top 5)">
          <ol className="space-y-2 text-sm">
            {board.map((entry, i) => (
              <li key={`${entry.name}-${entry.completedAt}`} className="flex justify-between border-b border-cyber-border/50 pb-2">
                <span>
                  {i + 1}. {entry.name}
                </span>
                <span className="text-cyber-muted">
                  {entry.score} pts · {formatTime(entry.timeSeconds)}
                </span>
              </li>
            ))}
          </ol>
        </Panel>
      )}

      <Panel title="Debrief">
        <p className="text-sm text-slate-300">
          You applied Cambridge 9618 concepts across data representation, networking, security,
          cryptography, logic design, and algorithms. In a real SOC, these skills support defensive
          monitoring — not unauthorised access.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/">
            <Button variant="ghost">Mission hub</Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm('Start a new investigation? Progress will be reset.')) {
                resetProgress();
                window.location.href = '/';
              }
            }}
          >
            New investigation
          </Button>
        </div>
      </Panel>
    </motion.div>
  );
}
