import type { Skill } from "@/src/lib/portfolio/portfolio.types";
import SectionFrame from "./SectionFrame";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = new Map<string, Skill[]>();
  for (const skill of skills) {
    const category = skill.category || "Khác";
    categories.set(category, [...(categories.get(category) ?? []), skill]);
  }
  return <SectionFrame id="skills" title="Kỹ năng" compact={skills.length === 0}>
    {skills.length ? <div className="space-y-6">{[...categories].map(([category, items]) => <div key={category} className="space-y-3">
      <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{category}</h3>
      <ul className="flex flex-wrap gap-2">{items.map((item) => <li key={item.id} className="rounded-full border border-slate-600 bg-slate-900/50 px-3 py-1 text-sm text-slate-100">{item.name}</li>)}</ul>
    </div>)}</div> : <p className="text-slate-400">Chưa có kỹ năng để hiển thị.</p>}
  </SectionFrame>;
}
