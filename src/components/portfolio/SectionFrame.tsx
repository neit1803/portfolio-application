import type { ReactNode } from "react";
import type { SceneId } from "@/src/config/scenes";

export default function SectionFrame({ id, title, children, scene, compact = false }: {
  id: SceneId | "education";
  title: string;
  children: ReactNode;
  scene?: SceneId;
  compact?: boolean;
}) {
  return <section id={id} aria-labelledby={`${id}-heading`} data-scene={scene ?? (id === "education" ? "hero" : id)}
    className={`portfolio-section scroll-mt-[40vh] space-y-5 border-t border-slate-700 px-4 py-12 sm:px-6 lg:scroll-mt-10 ${compact ? "min-h-[28vh] lg:min-h-[40vh]" : "min-h-[62vh] lg:min-h-[80vh]"}`}>
    <h2 id={`${id}-heading`} className="text-2xl font-semibold text-white">{title}</h2>
    {children}
  </section>;
}
