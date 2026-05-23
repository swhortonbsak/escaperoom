import type { RoomId } from '../types';

import sceneIntro from '../assets/scenes/scene-intro.png';
import sceneRoom1 from '../assets/scenes/scene-room1-banner.png';
import sceneRoom2 from '../assets/scenes/scene-room2-network.png';
import sceneRoom3 from '../assets/scenes/scene-room3-threats.png';
import sceneRoom4 from '../assets/scenes/scene-room4-certificates.png';
import sceneRoom5 from '../assets/scenes/scene-room5-logic.png';
import sceneRoom6 from '../assets/scenes/scene-room6-algorithms.png';
import sceneVault from '../assets/scenes/scene-vault.png';
import sceneCompletion from '../assets/scenes/scene-completion.png';

export interface SceneConfig {
  src: string;
  alt: string;
  caption: string;
}

export const sceneImages: Record<RoomId, SceneConfig> = {
  intro: {
    src: sceneIntro,
    alt: 'Cyber operations briefing room with locked Exam Archive vault on screen',
    caption: 'Uni-Lab Research — Incident response activated',
  },
  room1: {
    src: sceneRoom1,
    alt: 'Corrupted login banner with glitching binary data streams',
    caption: 'Evidence recovered from the compromised authentication terminal',
  },
  room2: {
    src: sceneRoom2,
    alt: 'Network map showing client, router, and server connected by data packets',
    caption: 'Reconstruct the packet journey from client to archive server',
  },
  room3: {
    src: sceneRoom3,
    alt: 'Security operations console flooded with incident alert cards',
    caption: 'Triage each incident — match threats to the right defence',
  },
  room4: {
    src: sceneRoom4,
    alt: 'Digital certificate chain and encrypted tunnel between client and server',
    caption: 'Rebuild the TLS handshake — trust only verified certificates',
  },
  room5: {
    src: sceneRoom5,
    alt: 'Vault antechamber door controlled by card, biometric, and override sensors',
    caption: 'The logic lock guards the corridor — decode the access rule',
  },
  room6: {
    src: sceneRoom6,
    alt: 'Holographic pseudocode panels floating above a tampered archive indexer',
    caption: 'Audit the tampered indexer — trace, structure, and complexity',
  },
  vault: {
    src: sceneVault,
    alt: 'Exam Archive Vault with six glowing fragment slots around a circular door',
    caption: 'Six fragments collected — assemble them to unlock the archive',
  },
  complete: {
    src: sceneCompletion,
    alt: 'Vault door open with green light — Exam Archive restored',
    caption: 'Mission complete — the archive is secure once more',
  },
};

export function getScene(room: RoomId): SceneConfig {
  return sceneImages[room];
}

export function getPuzzleScene(room: Exclude<RoomId, 'intro' | 'complete'>): SceneConfig {
  return sceneImages[room];
}
