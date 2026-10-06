"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const PortfolioCanvas = dynamic(() => import("./PortfolioCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function SceneStage() {
  return <SceneBoundary>
    <div className="relative h-[min(62vw,34rem)] min-h-72 w-full overflow-hidden rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_50%_35%,#20405a,#0c1927_70%)] sm:min-h-96" aria-hidden="true">
      <PortfolioCanvas />
    </div>
  </SceneBoundary>;
}
