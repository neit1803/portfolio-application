"use client";

import { useMemo } from "react";
import { assignSkillsToKeys } from "@/src/config/keyboard";
import type { Skill } from "@/src/lib/portfolio/portfolio.types";
import SectionFrame from "./SectionFrame";
import { useSkillSelection } from "./SkillSelectionContext";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const { selectedSkillId, setSelectedSkillId } = useSkillSelection();
  const assignments = useMemo(() => assignSkillsToKeys(skills).assignments, [skills]);
  const keyBySkill = new Map(assignments.map(({ skill, keyId }) => [skill.id, keyId]));
  const selectedSkill = skills.find((skill) => skill.id === selectedSkillId);
  const categories = new Map<string, Skill[]>();
  for (const skill of skills) {
    const category = skill.category || "Khác";
    categories.set(category, [...(categories.get(category) ?? []), skill]);
  }
  return <SectionFrame id="skills" title="Kỹ năng" compact={skills.length === 0}>
    {skills.length ? <div className="space-y-6">{[...categories].map(([category, items]) => <div key={category} className="space-y-3">
      <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{category}</h3>
      <ul className="flex flex-wrap gap-2">{items.map((item) => <li key={item.id}><button type="button" aria-pressed={selectedSkillId === item.id} onClick={() => setSelectedSkillId(selectedSkillId === item.id ? null : item.id)} className="rounded-full border border-slate-600 bg-slate-900/50 px-3 py-1 text-sm text-slate-100 transition-colors hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 aria-pressed:border-emerald-300 aria-pressed:bg-emerald-900/60 aria-pressed:text-emerald-100">{item.name}</button></li>)}</ul>
    </div>)}{selectedSkill && <div role="status" aria-live="polite" className="rounded-xl border border-emerald-400/40 bg-slate-900/70 p-4">
      <h3 className="font-semibold text-emerald-200">{selectedSkill.name}</h3>
      <p className="mt-1 text-sm text-slate-300">{selectedSkill.category || "Khác"}{selectedSkill.level ? ` · ${selectedSkill.level}` : ""}{keyBySkill.get(selectedSkill.id) ? ` · Phím ${keyBySkill.get(selectedSkill.id)}` : ""}</p>
    </div>}</div> : <p className="text-slate-400">Chưa có kỹ năng để hiển thị.</p>}
  </SectionFrame>;
}
