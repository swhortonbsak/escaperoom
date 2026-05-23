import type { PuzzleMeta } from '../../types';

export const room1Meta: PuzzleMeta = {
  id: 'room1',
  title: 'The Corrupted Login Banner',
  subtitle: 'Data representation recovery',
  briefing:
    'The attacker scrambled the lab login banner with mixed binary, hexadecimal and invalid encodings. Decode the valid 8-bit values, spot the distractors, and recover key fragment E4.',
  expectedMinutes: 7,
  keyFragment: '45',
  keyFragmentLabel: 'Fragment E4 — hex pair (Data Link layer tag)',
  stackLayer: 2,
  stackLayerName: 'Data Link — encoding & framing',
  successExplanation:
    'Valid ASCII uses 8-bit bytes. 01010011 is S (83₁₀ = 53₁₆). Two\'s complement 11111111 is −1, not a banner character. The 9-bit value 100000000 is invalid (overflow). Denary 85 converts to hex 55 — the letter U — but this block was a checksum, not part of the fragment. The recovered fragment is 45₁₆ (69₁₀ = E).',
  syllabusLinks: [
    { specRef: '3.1', topic: 'Number systems: binary, denary, hexadecimal', paper: 'AS Paper 1' },
    { specRef: '3.1', topic: "Two's complement representation", paper: 'AS Paper 1' },
    { specRef: '3.2', topic: 'Character sets: ASCII and Unicode', paper: 'AS Paper 1' },
  ],
  hints: [
    { level: 1, text: 'Each valid character byte is exactly 8 bits. Group binary in eights before converting to denary.' },
    { level: 2, text: '01010011 → 83 denary. To get the fragment, convert denary 69 to hexadecimal.' },
    { level: 3, text: '69 ÷ 16 = 4 remainder 5, so the fragment is 45. Ignore 11111111 (−1) and the 9-bit overflow value.' },
  ],
  teacherAnswer: '45 (hex) — from denary 69; binary block 01000101 confirms E. Distractors: 11111111 = −1 two\'s complement; 100000000 = invalid 9-bit overflow.',
  commonMisconceptions: [
    'Treating 11111111 as denary 255 rather than −1 in 8-bit two\'s complement.',
    'Attempting to decode the 9-bit value instead of rejecting it as invalid.',
    'Confusing hex 45 with the ASCII character "45" rather than the byte value for E.',
  ],
  plenaryQuestions: [
    'Why must binary data be grouped into fixed-width bytes for ASCII?',
    'How does two\'s complement represent negative integers?',
    'When might overflow make a binary value unusable?',
  ],
};

export const room1BannerBlocks = [
  { id: 'a', label: 'BLOCK_A', value: '01010011', type: 'binary' as const, valid: true, note: '8-bit ASCII byte' },
  { id: 'b', label: 'BLOCK_B', value: '11111111', type: 'binary' as const, valid: false, note: "8-bit two's complement" },
  { id: 'c', label: 'BLOCK_C', value: '100000000', type: 'binary' as const, valid: false, note: '9-bit — overflow/invalid' },
  { id: 'd', label: 'BLOCK_D', value: '01000101', type: 'binary' as const, valid: true, note: '8-bit ASCII byte' },
  { id: 'e', label: 'CHECKSUM', value: '85', type: 'denary' as const, valid: false, note: 'Denary checksum — convert to hex 55 (U), not the fragment' },
];

export const room1Questions = {
  binaryToDenary: { prompt: 'BLOCK_A (01010011) as unsigned denary:', answer: '83' },
  denaryToHex: { prompt: 'Denary 69 as hexadecimal (2 digits):', answer: '45' },
  twosComplement: { prompt: 'BLOCK_B (11111111) in 8-bit two\'s complement:', answer: '-1' },
  invalidBlock: { prompt: 'Which block ID is invalid due to bit-length? (A/B/C/D/E)', answer: 'C' },
  fragment: { prompt: 'Enter key fragment (2-digit hex):', answer: '45' },
};
