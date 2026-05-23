import type { PuzzleMeta } from '../../types';

export const room6Meta: PuzzleMeta = {
  id: 'room6',
  title: 'The Algorithm Vault',
  subtitle: 'Pseudocode forensics',
  briefing:
    'The archive indexer module was tampered with. Analyse the pseudocode, trace the recursive routine, choose the correct ADT and Big O classification, then recover fragment E9.',
  expectedMinutes: 7,
  keyFragment: '45',
  keyFragmentLabel: 'Fragment E9 — hex pair (Application layer tag)',
  stackLayer: 7,
  stackLayerName: 'Application — algorithms & ADTs',
  successExplanation:
    'Binary search requires sorted data — the tampered list was unsorted, so linear search applies (O(n)). The access log replay uses a stack (LIFO) as frames are pushed on call and popped on return. Recursive trace factorial(4): 4×3×2×1 = 24. Merge sort on n items is O(n log n). Fragment 45₁₆ = 69₁₀ = "E".',
  syllabusLinks: [
    { specRef: '9.2', topic: 'Searching and sorting algorithms', paper: 'AS Paper 2' },
    { specRef: '19.1', topic: 'Recursion and stack frames', paper: 'A Level Paper 3' },
    { specRef: '19.1', topic: 'Big O notation', paper: 'A Level Paper 3' },
    { specRef: '19.1', topic: 'Abstract Data Types: stack, queue', paper: 'A Level Paper 3' },
  ],
  hints: [
    { level: 1, text: 'Binary search needs sorted data. Recursion uses a call stack — last in, first out.' },
    { level: 2, text: 'Unsorted → linear search O(n). Recursion trace: stack ADT. factorial(4)=24. Merge sort → O(n log n).' },
    { level: 3, text: 'Answers: search=linear, adt=stack, trace=24, complexity=n_log_n. Fragment: 45.' },
  ],
  teacherAnswer: 'search=linear, adt=stack, recursive_output=24, merge_sort=O(n log n). Fragment: 45.',
  commonMisconceptions: [
    'Applying binary search to unsorted data.',
    'Confusing queue FIFO with stack LIFO for recursive calls.',
    'Stating merge sort is O(n²) like bubble sort.',
  ],
  plenaryQuestions: [
    'When is recursion preferable to iteration?',
    'Why is Big O used instead of exact runtime?',
    'How does a stack support recursive subroutine calls?',
  ],
};

export const room6Pseudocode = `PROCEDURE SearchIndex(list, target)
  // WARNING: list may be unsorted after breach
  IF list IS SORTED THEN
    left ← 0
    right ← LENGTH(list) - 1
    WHILE left <= right
      mid ← (left + right) DIV 2
      IF list[mid] = target THEN RETURN mid
      ELSE IF list[mid] < target THEN left ← mid + 1
      ELSE right ← mid - 1
    ENDIF
    ENDWHILE
  ELSE
    FOR i ← 0 TO LENGTH(list) - 1
      IF list[i] = target THEN RETURN i
    ENDFOR
  ENDIF
  RETURN -1
ENDPROCEDURE

FUNCTION factorial(n)
  IF n <= 1 THEN RETURN 1
  ELSE RETURN n * factorial(n - 1)
  ENDIF
ENDFUNCTION`;

export const room6SearchOptions = ['binary', 'linear'];
export const room6AdtOptions = [
  { id: 'stack', label: 'Stack (LIFO)' },
  { id: 'queue', label: 'Queue (FIFO)' },
  { id: 'linked_list', label: 'Linked list' },
  { id: 'hash_table', label: 'Hash table' },
];

export const room6ComplexityOptions = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'];

export const room6Answers = {
  search: 'linear',
  adt: 'stack',
  trace: '24',
  complexity: 'O(n log n)',
  fragment: '45',
};

export const room6BonusQuestion = {
  prompt: 'Optional: What paradigm mixes procedures with objects? (one word)',
  answer: 'OOP',
};
