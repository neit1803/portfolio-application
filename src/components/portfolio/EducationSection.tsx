import type { Education } from "@/src/lib/portfolio/portfolio.types";
import DateRange from "./DateRange";
import SectionFrame from "./SectionFrame";

export default function EducationSection({ education }: { education: Education[] }) {
  return <SectionFrame id="education" title="Học vấn" scene="hero" compact={education.length === 0}>
    {education.length ? <ul className="space-y-7">{education.map((item, index) => <li key={`${item.school}-${index}`} className="space-y-2">
      <h3 className="font-semibold text-white">{item.school}</h3>
      {(item.degree || item.major) && <p>{[item.degree, item.major].filter(Boolean).join(" · ")}</p>}
      <DateRange start={item.startDate} end={item.endDate} />
      {item.description && <p className="whitespace-pre-line leading-7">{item.description}</p>}
    </li>)}</ul> : <p className="text-slate-400">Chưa có thông tin học vấn.</p>}
  </SectionFrame>;
}
