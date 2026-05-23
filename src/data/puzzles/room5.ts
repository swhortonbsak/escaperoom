import type { PuzzleMeta } from '../../types';

export const room5Meta: PuzzleMeta = {
  id: 'room5',
  title: 'The Logic Lock',
  subtitle: 'Boolean access control',
  briefing:
    'The vault antechamber door uses three sensors. Translate the English rule into a Boolean expression, complete the critical truth-table rows, and recover fragment S1.',
  expectedMinutes: 6,
  keyFragment: '53',
  keyFragmentLabel: 'Fragment S1 — hex pair (Physical layer tag)',
  stackLayer: 1,
  stackLayerName: 'Physical — logic circuits',
  successExplanation:
    'Let A=admin card valid, B=biometric match, E=emergency override, L=lockdown active. Rule: open when A AND (B OR E) AND NOT L. This matches A ∧ (B ∨ E) ∧ ¬L. XOR is not required here — the override is an OR path, not exclusive. Fragment 53₁₆ = 83₁₀ = "S".',
  syllabusLinks: [
    { specRef: '3.2', topic: 'Logic gates and truth tables', paper: 'AS Paper 1' },
    { specRef: '15.2', topic: 'Boolean algebra', paper: 'A Level Paper 3' },
  ],
  hints: [
    { level: 1, text: 'Lockdown active (L=1) should force the door closed regardless of other sensors.' },
    { level: 2, text: 'Structure: admin AND (biometric OR emergency) AND NOT lockdown → A AND (B OR E) AND NOT L.' },
    { level: 3, text: 'Expression: A AND (B OR E) AND NOT L. Key rows: A1B0E0L0→1; A1B0E0L1→0; A0B1E1L0→0. Fragment: 53.' },
  ],
  teacherAnswer: 'Expression: A AND (B OR E) AND NOT L. Truth table: (1,0,0,0)→1; (1,0,0,1)→0; (0,1,1,0)→0. Optional simplified form same. Fragment: 53.',
  commonMisconceptions: [
    'Using XOR instead of OR for emergency override.',
    'Forgetting that lockdown must veto all other true inputs.',
    'Writing A AND B OR E without brackets — operator precedence error.',
  ],
  plenaryQuestions: [
    'Why are brackets essential in Boolean expressions?',
    'How would you build this rule from AND, OR and NOT gates?',
    'What is the difference between a truth table and a Karnaugh map?',
  ],
};

export const room5Rule =
  'Open only if the admin card is valid AND either the biometric match is true OR the emergency override is active — but never if lockdown is active.';

export const room5Variables = [
  { id: 'A', label: 'Admin card valid' },
  { id: 'B', label: 'Biometric match' },
  { id: 'E', label: 'Emergency override' },
  { id: 'L', label: 'Lockdown active' },
];

export const room5ExpressionOptions = [
  'A AND (B OR E) AND NOT L',
  'A OR B AND E AND NOT L',
  'A AND B XOR E AND NOT L',
  '(A AND B) OR (E AND NOT L)',
  'NOT L AND A AND B OR E',
];

export const room5CorrectExpression = 'A AND (B OR E) AND NOT L';

export const room5TruthRows = [
  { A: 1, B: 0, E: 0, L: 0, output: 1 },
  { A: 1, B: 0, E: 0, L: 1, output: 0 },
  { A: 0, B: 1, E: 1, L: 0, output: 0 },
];

export const room5Fragment = '53';
