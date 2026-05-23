import { normalizeAnswer, arraysEqual } from '../utils/score';
import { room1Questions } from '../data/puzzles/room1';
import { room2Answers } from '../data/puzzles/room2';
import { room3CorrectMatches, room3Fragment } from '../data/puzzles/room3';
import {
  room4CorrectAssignments,
  room4Fragment,
  room4RejectId,
} from '../data/puzzles/room4';
import {
  room5CorrectExpression,
  room5Fragment,
  room5TruthRows,
} from '../data/puzzles/room5';
import { room6Answers } from '../data/puzzles/room6';
import {
  vaultCorrectRoomOrder,
  vaultUnlockPhrase,
  hexPairsToAscii,
  roomOrderToHex,
} from '../data/puzzles/finalVault';

export function validateRoom1(values: Record<string, string>): boolean {
  return (
    normalizeAnswer(values.binaryToDenary) === normalizeAnswer(room1Questions.binaryToDenary.answer) &&
    normalizeAnswer(values.denaryToHex) === normalizeAnswer(room1Questions.denaryToHex.answer) &&
    normalizeAnswer(values.twosComplement) === normalizeAnswer(room1Questions.twosComplement.answer) &&
    normalizeAnswer(values.invalidBlock) === normalizeAnswer(room1Questions.invalidBlock.answer) &&
    normalizeAnswer(values.fragment) === normalizeAnswer(room1Questions.fragment.answer)
  );
}

export function validateRoom2(order: string[], security: string): boolean {
  return (
    arraysEqual(order, room2Answers.order) &&
    normalizeAnswer(security) === normalizeAnswer(room2Answers.security)
  );
}

export function validateRoom3(matches: Record<string, string>): boolean {
  const ok = Object.entries(room3CorrectMatches).every(
    ([incident, counter]) => normalizeAnswer(matches[incident] ?? '') === normalizeAnswer(counter),
  );
  return ok;
}

export function validateRoom3Fragment(fragment: string): boolean {
  return normalizeAnswer(fragment) === normalizeAnswer(room3Fragment);
}

export function validateRoom4(
  assignments: Record<string, string>,
  rejectedCert: string,
): boolean {
  const assignOk = Object.entries(room4CorrectAssignments).every(
    ([step, key]) => normalizeAnswer(assignments[step] ?? '') === normalizeAnswer(key),
  );
  return assignOk && normalizeAnswer(rejectedCert) === normalizeAnswer(room4RejectId);
}

export function validateRoom4Fragment(fragment: string): boolean {
  return normalizeAnswer(fragment) === normalizeAnswer(room4Fragment);
}

export function validateRoom5(expression: string, truthRows: { output: number }[]): boolean {
  const exprOk = normalizeAnswer(expression.replace(/\s/g, '')) ===
    normalizeAnswer(room5CorrectExpression.replace(/\s/g, ''));
  const truthOk = truthRows.every((row, i) => row.output === room5TruthRows[i].output);
  return exprOk && truthOk;
}

export function validateRoom5Fragment(fragment: string): boolean {
  return normalizeAnswer(fragment) === normalizeAnswer(room5Fragment);
}

export function validateRoom6(values: Record<string, string>): boolean {
  return (
    normalizeAnswer(values.search) === normalizeAnswer(room6Answers.search) &&
    normalizeAnswer(values.adt) === normalizeAnswer(room6Answers.adt) &&
    normalizeAnswer(values.trace) === normalizeAnswer(room6Answers.trace) &&
    normalizeAnswer(values.complexity.replace(/\s/g, '')) ===
      normalizeAnswer(room6Answers.complexity.replace(/\s/g, '')) &&
    normalizeAnswer(values.fragment) === normalizeAnswer(room6Answers.fragment)
  );
}

export function validateVault(roomOrder: string[], phrase: string): boolean {
  const orderOk = arraysEqual(roomOrder, vaultCorrectRoomOrder);
  const hexOrder = roomOrderToHex(roomOrder);
  const derived = hexPairsToAscii(hexOrder);
  const phraseOk = normalizeAnswer(phrase) === normalizeAnswer(vaultUnlockPhrase);
  return orderOk && phraseOk && normalizeAnswer(phrase) === normalizeAnswer(derived);
}
