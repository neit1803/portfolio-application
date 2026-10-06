"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SCENES, sceneAt, type SceneId } from "@/src/config/scenes";
import SceneStage from "@/src/components/three/SceneStage";

export default function ScrollExperience({ children, hasContent }: { children: ReactNode; hasContent: boolean }) {
  const progress = useRef(0);
  const [activeScene, setActiveScene] = useState<SceneId>("hero");
  const [sceneAvailable, setSceneAvailable] = useState(true);

  useEffect(() => {
    if (!hasContent) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const positions = SCENES.map((scene) => {
        const element = document.getElementById(scene.id);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
      });
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const anchor = window.scrollY + window.innerHeight * (desktop ? 0.12 : 0.45);
      let value = 0;
      for (let index = 0; index < positions.length - 1; index++) {
        const start = positions[index];
        const end = positions[index + 1];
        if (anchor < end) {
          value = index + Math.max(0, Math.min(1, (anchor - start) / Math.max(1, end - start)));
          break;
        }
        value = index + 1;
      }
      progress.current = value / (SCENES.length - 1);
      setActiveScene(sceneAt(progress.current).id);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hasContent]);

  return <>
    <nav aria-label="Điều hướng nội dung" className="flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-700 py-5 text-sm">
      {(hasContent ? SCENES : SCENES.slice(0, 1)).map((scene) => <span key={scene.id} className="contents">
        <a href={`#${scene.id}`}
          aria-current={activeScene === scene.id ? "location" : undefined}
          className={activeScene === scene.id ? "text-emerald-300" : "text-slate-300 hover:text-white"}>
          {scene.label}
        </a>
        {hasContent && scene.id === "hero" && <a href="#education" className="text-slate-300 hover:text-white">Học vấn</a>}
      </span>)}
    </nav>
    <div data-active-scene={activeScene} className={sceneAvailable ? "lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-10" : "mx-auto max-w-3xl"}>
      {sceneAvailable && <aside className="pointer-events-none sticky top-0 z-20 h-[38vh] min-h-72 self-start pt-4 lg:top-6 lg:h-[min(82vh,42rem)] lg:pt-0">
        <SceneStage progress={progress} activeScene={activeScene} onUnavailable={() => setSceneAvailable(false)} />
      </aside>}
      <div className="relative z-10 min-w-0">{children}</div>
    </div>
  </>;
}
