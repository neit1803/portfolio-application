import { connection } from "next/server";
import { getPortfolio } from "@/src/lib/portfolio/portfolio.service";
import type { PortfolioData } from "@/src/lib/portfolio/portfolio.types";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="space-y-5 border-t border-slate-700 py-12">
    <h2 className="text-2xl font-semibold text-white">{title}</h2>{children}
  </section>;
}

function Portfolio({ data }: { data: PortfolioData }) {
  const { profile, education, experiences, projects, skills, socialLinks, resume } = data;
  return <>
    <header id="hero" className="space-y-5 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Developer portfolio</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">{profile.fullName}</h1>
      <p className="text-2xl text-emerald-200">{profile.title}</p>
      {profile.summary && <p className="max-w-2xl text-lg leading-8">{profile.summary}</p>}
      {profile.location && <p>{profile.location}</p>}
      <div className="flex flex-wrap gap-4">
        {profile.email && <a className="text-emerald-300 underline underline-offset-4" href={`mailto:${encodeURIComponent(profile.email)}`}>Email</a>}
        {resume.pdfUrl && <a className="text-emerald-300 underline underline-offset-4" href={resume.pdfUrl} target="_blank" rel="noopener noreferrer">Tải CV (PDF)</a>}
      </div>
    </header>
    <Section id="education" title="Học vấn">
      {education.length ? <ul className="space-y-5">{education.map((item, index) => <li key={`${item.school}-${index}`}>
        <h3 className="font-semibold text-white">{item.school}</h3>
        {(item.degree || item.major) && <p>{[item.degree, item.major].filter(Boolean).join(" · ")}</p>}
        {(item.startDate || item.endDate) && <p className="text-sm">{item.startDate ?? ""} – {item.endDate ?? "Hiện tại"}</p>}
        {item.description && <p>{item.description}</p>}
      </li>)}</ul> : <p>Chưa có thông tin học vấn.</p>}
    </Section>
    <Section id="experience" title="Kinh nghiệm">
      {experiences.length ? <ul className="space-y-8">{experiences.map((item, index) => <li key={`${item.company}-${index}`} className="space-y-2">
        <h3 className="font-semibold text-white">{item.role} · {item.company}</h3>
        {(item.startDate || item.endDate) && <p className="text-sm">{item.startDate ?? ""} – {item.endDate ?? "Hiện tại"}</p>}
        {item.description && <p>{item.description}</p>}
        {item.responsibilities.length > 0 && <ul className="list-disc space-y-1 pl-5">{item.responsibilities.map((text, i) => <li key={i}>{text}</li>)}</ul>}
        {item.technologies.length > 0 && <p className="text-emerald-200">{item.technologies.join(" · ")}</p>}
      </li>)}</ul> : <p>Chưa có thông tin kinh nghiệm.</p>}
    </Section>
    <Section id="projects" title="Dự án">
      {projects.length ? <ul className="grid gap-6 sm:grid-cols-2">{projects.map((item) => <li key={item.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-5">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3><p>{item.description}</p>
        {item.technologies.length > 0 && <p className="text-sm text-emerald-200">{item.technologies.join(" · ")}</p>}
        <div className="flex gap-4">{item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GitHub</a>}{item.demoUrl && <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Demo</a>}</div>
      </li>)}</ul> : <p>Chưa có dự án để hiển thị.</p>}
    </Section>
    <Section id="skills" title="Kỹ năng">
      {skills.length ? <ul className="flex flex-wrap gap-2">{skills.map((item) => <li key={item.id} className="rounded-full border border-slate-600 px-3 py-1 text-sm">{item.name}</li>)}</ul> : <p>Chưa có kỹ năng để hiển thị.</p>}
    </Section>
    <Section id="contact" title="Liên hệ">
      <div className="flex flex-wrap gap-5">{profile.email && <a href={`mailto:${encodeURIComponent(profile.email)}`} className="underline underline-offset-4">Email</a>}{socialLinks.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{item.platform}</a>)}</div>
      {!profile.email && socialLinks.length === 0 && <p>Chưa có thông tin liên hệ.</p>}
    </Section>
  </>;
}

export default async function Home() {
  await connection();
  const result = await getPortfolio();
  return <main className="mx-auto max-w-5xl px-6 pb-16 text-slate-300 sm:px-10">
    <nav aria-label="Điều hướng nội dung" className="flex flex-wrap gap-4 border-b border-slate-700 py-5 text-sm">
      <a href="#hero">Giới thiệu</a><a href="#education">Học vấn</a><a href="#experience">Kinh nghiệm</a><a href="#projects">Dự án</a><a href="#skills">Kỹ năng</a><a href="#contact">Liên hệ</a>
    </nav>
    {result.status === "ready" ? <Portfolio data={result.data} /> : <section id="hero" className="py-24">
      <h1 className="text-4xl font-semibold text-white">Developer portfolio</h1>
      <p className="mt-5 max-w-xl text-lg">{result.status === "empty" ? "Nội dung portfolio chưa được xuất bản." : "Nội dung portfolio tạm thời chưa khả dụng. Vui lòng quay lại sau."}</p>
    </section>}
  </main>;
}
