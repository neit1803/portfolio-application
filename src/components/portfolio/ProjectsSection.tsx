import type { Project } from "@/src/lib/portfolio/portfolio.types";
import SectionFrame from "./SectionFrame";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return <SectionFrame id="projects" title="Dự án" compact={projects.length === 0}>
    {projects.length ? <ul className="grid gap-5">{projects.map((item) => <li key={item.id}>
      <article className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        {item.description && <p className="whitespace-pre-line leading-7">{item.description}</p>}
        {item.technologies.length > 0 && <p className="text-sm text-emerald-200">{item.technologies.join(" · ")}</p>}
        {(item.githubUrl || item.demoUrl) && <div className="flex flex-wrap gap-5 text-sm">
          {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4">GitHub</a>}
          {item.demoUrl && <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4">Demo</a>}
        </div>}
      </article>
    </li>)}</ul> : <p className="text-slate-400">Chưa có dự án để hiển thị.</p>}
  </SectionFrame>;
}
