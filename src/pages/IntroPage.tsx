import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';
import { SceneImage } from '../components/ui/SceneImage';
import { getScene } from '../data/sceneImages';
import { PUZZLE_ROOM_IDS } from '../types';
import { getRoomMeta } from '../context/puzzleMeta';
import { usePuzzleEngine } from '../context/usePuzzleEngine';

export function IntroPage() {
  const { state, setPlayerName, startGame, goToRoom, resetProgress } = usePuzzleEngine();
  const [name, setName] = useState(state.playerName);
  const navigate = useNavigate();
  const introScene = getScene('intro');

  const handleBegin = () => {
    setPlayerName(name.trim() || 'Analyst');
    startGame();
    goToRoom('room1');
    navigate('/play/room1');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Panel glow="purple">
        <SceneImage
          src={introScene.src}
          alt={introScene.alt}
          caption={introScene.caption}
          className="mb-6"
        />
        <div className="mb-6 border-l-4 border-cyber-red pl-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyber-red">
            Classified briefing · CS9618
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl">
            Operation Blackout
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            A suspicious breach has locked the Exam Archive Vault at Uni-Lab Research. As junior cyber
            analysts, you must trace the attack, recover six encrypted key fragments, and restore
            defensive control — using only forensic analysis, not offensive tooling.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Duration', value: '~45 min' },
            { label: 'Rooms', value: '6 + vault' },
            { label: 'Mode', value: 'Defensive cyber' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-cyber-border bg-black/20 p-4 text-center">
              <p className="text-xs text-cyber-muted">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-cyber-cyan">{item.value}</p>
            </div>
          ))}
        </div>

        <label className="mt-6 block max-w-md">
          <span className="text-sm text-cyber-muted">Analyst callsign (optional, for leaderboard)</span>
          <input
            className="mt-2 w-full rounded border border-cyber-border bg-black/30 px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chen.A"
            maxLength={32}
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleBegin}>Accept mission</Button>
          {state.introSeen && (
            <Button variant="secondary" onClick={() => navigate('/play/room1')}>
              Resume investigation
            </Button>
          )}
          {state.introSeen && (
            <Button
              variant="ghost"
              onClick={() => {
                if (confirm('Reset all saved progress?')) resetProgress();
              }}
            >
              Reset progress
            </Button>
          )}
        </div>
      </Panel>

      <Panel title="Mission objectives">
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {PUZZLE_ROOM_IDS.map((id) => (
            <div key={id} className="overflow-hidden rounded-lg border border-cyber-border">
              <img
                src={getScene(id).src}
                alt=""
                aria-hidden
                className="aspect-video w-full object-cover"
              />
              <p className="truncate px-2 py-1.5 text-[10px] text-cyber-muted sm:text-xs">
                {getRoomMeta(id).title.replace('The ', '')}
              </p>
            </div>
          ))}
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>Decode corrupted data and network traces from the breach.</li>
          <li>Match threats to countermeasures and validate certificate chains.</li>
          <li>Unlock logic-controlled systems and audit tampered algorithms.</li>
          <li>Combine six key fragments to open the Exam Archive Vault.</li>
        </ol>
        <p className="mt-4 text-xs text-cyber-muted">
          Stuck? Each room offers three hints (score penalty). You can revisit completed rooms from the mission hub.
        </p>
      </Panel>
    </motion.div>
  );
}
