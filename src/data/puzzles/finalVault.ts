import type { PuzzleMeta } from '../../types';
import { tcpIpStackReference } from './room2';

export const vaultMeta: PuzzleMeta = {
  id: 'vault',
  title: 'The Exam Archive Vault',
  subtitle: 'Final assembly challenge',
  briefing:
    'Combine all six key fragments. Order them by TCP/IP stack layer (lowest first) using the layer tags recovered during the investigation, convert the ordered hex bytes to ASCII, and unlock the vault.',
  expectedMinutes: 5,
  keyFragment: 'SECURE',
  keyFragmentLabel: 'Vault unlock phrase',
  stackLayer: 0,
  stackLayerName: 'Full stack assembly',
  successExplanation:
    'Ordering fragments by stack layer (Physical→Application): Room5(53=S) → Room1(45=E) → Room2(43=C) → Room4(55=U) → Room3(52=R) → Room6(45=E). Hex sequence 534543555245 → ASCII "SECURE". The Exam Archive is restored.',
  syllabusLinks: [
    { specRef: '4.1', topic: 'TCP/IP stack integration', paper: 'AS Paper 1' },
    { specRef: '3.1', topic: 'Hexadecimal to ASCII conversion', paper: 'AS Paper 1' },
    { specRef: '6.1', topic: 'Holistic security review', paper: 'AS Paper 1' },
  ],
  hints: [
    { level: 1, text: 'Each fragment card shows its stack layer from earlier rooms. Sort from layer 1 upward.' },
    { level: 2, text: 'Order: S1(53) → E4(45) → C3(43) → U7(55) → R5(52) → E9(45). Pair hex digits into bytes.' },
    { level: 3, text: 'Concatenated hex 534543555245 converts to ASCII unlock phrase: SECURE.' },
  ],
  teacherAnswer: 'Layer order (rooms): room5→room1→room2→room4→room3→room6. Hex: 534543555245. Phrase: SECURE.',
  commonMisconceptions: [
    'Ordering fragments by room number instead of stack layer.',
    'Treating hex pairs as decimal digits rather than byte values.',
    'Concatenating without converting hex to ASCII characters.',
  ],
  plenaryQuestions: [
    'How did each puzzle map to a layer of the TCP/IP model?',
    'Which single countermeasure would NOT have stopped this fictional breach alone?',
    'What forensic steps would you take after restoring the archive?',
  ],
};

export { tcpIpStackReference };

export const vaultFragmentSources = [
  { room: 'room5', fragment: '53', label: 'S1', layer: 1 },
  { room: 'room1', fragment: '45', label: 'E4', layer: 2 },
  { room: 'room2', fragment: '43', label: 'C3', layer: 3 },
  { room: 'room4', fragment: '55', label: 'U7', layer: 4 },
  { room: 'room3', fragment: '52', label: 'R5', layer: 5 },
  { room: 'room6', fragment: '45', label: 'E9', layer: 7 },
];

export const vaultCorrectRoomOrder = ['room5', 'room1', 'room2', 'room4', 'room3', 'room6'];
export const vaultCorrectOrder = ['53', '45', '43', '55', '52', '45'];
export const vaultUnlockPhrase = 'SECURE';

export function roomOrderToHex(roomOrder: string[]): string[] {
  return roomOrder.map(
    (room) => vaultFragmentSources.find((f) => f.room === room)?.fragment ?? '',
  );
}

export function hexPairsToAscii(hexPairs: string[]): string {
  return hexPairs
    .map((h) => String.fromCharCode(parseInt(h, 16)))
    .join('');
}
