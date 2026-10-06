import type { Skill } from "@/src/lib/portfolio/portfolio.types";

export const KEYBOARD_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
] as const;

export const KEYBOARD_KEYS = KEYBOARD_ROWS.flatMap((labels, row) => labels.map((label, column) => ({
  id: label,
  label,
  row,
  column,
  x: (column - (labels.length - 1) / 2) * 0.125,
  z: (row - 1.5) * 0.14,
})));

export interface SkillKeyAssignment {
  keyId: string;
  skill: Skill;
}

export interface KeyboardMapping {
  assignments: SkillKeyAssignment[];
  overflow: Skill[];
}

const validKeys = new Set<string>(KEYBOARD_KEYS.map((key) => key.id));

export function assignSkillsToKeys(skills: readonly Skill[]): KeyboardMapping {
  const ordered = [...skills].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  const assigned = new Map<string, Skill>();
  const pending: Skill[] = [];
  for (const skill of ordered) {
    const preferred = skill.keyboardKey?.trim().toUpperCase();
    if (preferred && validKeys.has(preferred) && !assigned.has(preferred)) {
      assigned.set(preferred, skill);
    } else {
      pending.push(skill);
    }
  }
  const freeKeys = KEYBOARD_KEYS.filter((key) => !assigned.has(key.id));
  const overflow: Skill[] = [];
  for (const skill of pending) {
    const next = freeKeys.shift();
    if (next) assigned.set(next.id, skill);
    else overflow.push(skill);
  }
  return {
    assignments: KEYBOARD_KEYS.flatMap((key) => {
      const skill = assigned.get(key.id);
      return skill ? [{ keyId: key.id, skill }] : [];
    }),
    overflow,
  };
}
