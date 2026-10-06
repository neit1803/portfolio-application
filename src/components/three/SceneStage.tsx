"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, type RefObject } from "react";
import type { SceneId } from "@/src/config/scenes";

const PortfolioCanvas = dynamic(() => import("./PortfolioCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function SceneStage({ progress, activeScene, onUnavailable }: { progress: RefObject<number>; activeScene: SceneId; onUnavailable: () => void }) {
  return <SceneBoundary onUnavailable={onUnavailable}>
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_50%_35%,#20405a,#0c1927_70%)]" aria-hidden="true">
      <PortfolioCanvas progress={progress} activeScene={activeScene} />
    </div>
  </SceneBoundary>;
}
