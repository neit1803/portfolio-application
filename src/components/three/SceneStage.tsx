"use client";

import dynamic from "next/dynamic";
import { Component, useMemo, useState, type ReactNode, type RefObject } from "react";
import type { SceneId } from "@/src/config/scenes";
import { assignSkillsToKeys } from "@/src/config/keyboard";
import type { Skill } from "@/src/lib/portfolio/portfolio.types";
import { useSkillSelection } from "@/src/components/portfolio/SkillSelectionContext";

const PortfolioCanvas = dynamic(() => import("./PortfolioCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function SceneStage({ progress, activeScene, skills, onUnavailable }: { progress: RefObject<number>; activeScene: SceneId; skills: Skill[]; onUnavailable: () => void }) {
  const assignments = useMemo(() => assignSkillsToKeys(skills).assignments, [skills]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const { selectedSkillId, setSelectedSkillId } = useSkillSelection();
  const selectedSkill = skills.find((skill) => skill.id === selectedSkillId);
  const shownSkill = hoveredSkill ?? selectedSkill;
  return <SceneBoundary onUnavailable={onUnavailable}>
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_50%_35%,#20405a,#0c1927_70%)]">
      <PortfolioCanvas progress={progress} activeScene={activeScene} assignments={assignments} selectedSkillId={selectedSkillId} interactive={activeScene === "skills"} onHoverSkill={setHoveredSkill} onSelectSkill={setSelectedSkillId} />
      {activeScene === "skills" && shownSkill && <div role="status" aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 max-w-[80%] rounded-xl border border-emerald-300/40 bg-slate-950/90 px-4 py-3 text-sm shadow-xl">
        <strong className="block text-emerald-200">{shownSkill.name}</strong>
        <span className="text-slate-300">{shownSkill.category || "Khác"}{shownSkill.level ? ` · ${shownSkill.level}` : ""}</span>
      </div>}
    </div>
  </SceneBoundary>;
}
