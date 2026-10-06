import assert from "node:assert/strict";
import test from "node:test";
import { assignSkillsToKeys, KEYBOARD_KEYS } from "./keyboard.ts";

const skill = (id, keyboardKey, order = 0) => ({ id, name: id, category: "test", keyboardKey, order });

test("keeps explicit keys and assigns duplicate or invalid keys to free positions", () => {
  const mapping = assignSkillsToKeys([
    skill("later-j", "j", 2),
    skill("first-j", "J", 1),
    skill("invalid", "NotAKey", 3),
    skill("explicit-1", "1", 4),
  ]);
  const bySkill = new Map(mapping.assignments.map(({ keyId, skill: item }) => [item.id, keyId]));
  assert.equal(bySkill.get("first-j"), "J");
  assert.equal(bySkill.get("explicit-1"), "1");
  assert.equal(bySkill.get("later-j"), "2");
  assert.equal(bySkill.get("invalid"), "3");
  assert.deepEqual(mapping.overflow, []);
});

test("exposes excess skills for the HTML list without reusing a key", () => {
  const skills = Array.from({ length: KEYBOARD_KEYS.length + 2 }, (_, index) => skill(`skill-${index}`, undefined, index));
  const mapping = assignSkillsToKeys(skills);
  assert.equal(mapping.assignments.length, KEYBOARD_KEYS.length);
  assert.deepEqual(mapping.overflow.map((item) => item.id), [`skill-${KEYBOARD_KEYS.length}`, `skill-${KEYBOARD_KEYS.length + 1}`]);
  assert.equal(new Set(mapping.assignments.map((item) => item.keyId)).size, KEYBOARD_KEYS.length);
});
