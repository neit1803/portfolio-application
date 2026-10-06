import type { Experience } from "@/src/lib/portfolio/portfolio.types";
import DateRange from "./DateRange";
import SectionFrame from "./SectionFrame";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return <SectionFrame id="experience" title="Kinh nghiệm" compact={experiences.length === 0}>
    {experiences.length ? <ol className="space-y-9">{experiences.map((item, index) => <li key={`${item.company}-${item.role}-${index}`} className="space-y-3">
      <h3 className="text-lg font-semibold text-white">{item.role} · {item.company}</h3>
      <DateRange start={item.startDate} end={item.endDate} />
      {item.description && <p className="whitespace-pre-line leading-7">{item.description}</p>}
      {item.responsibilities.length > 0 && <ul className="list-disc space-y-2 pl-5 leading-7">{item.responsibilities.map((text, i) => <li key={i}>{text}</li>)}</ul>}
      {item.technologies.length > 0 && <p className="text-sm text-emerald-200">{item.technologies.join(" · ")}</p>}
    </li>)}</ol> : <p className="text-slate-400">Chưa có thông tin kinh nghiệm.</p>}
  </SectionFrame>;
}
