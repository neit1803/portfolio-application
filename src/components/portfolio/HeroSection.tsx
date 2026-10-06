import type { Education, Profile, Resume, SocialLink } from "@/src/lib/portfolio/portfolio.types";

export default function HeroSection({ profile, education, socialLinks, resume }: {
  profile: Profile;
  education: Education[];
  socialLinks: SocialLink[];
  resume: Resume;
}) {
  const latestEducation = education[0];
  return <header id="hero" data-scene="hero" className="portfolio-hero scroll-mt-[40vh] flex min-h-[70vh] flex-col justify-center gap-5 px-4 py-20 sm:px-6 lg:min-h-[82vh] lg:scroll-mt-10">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Developer portfolio</p>
    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">{profile.fullName || "Developer portfolio"}</h1>
    {profile.title && <p className="text-2xl text-emerald-200">{profile.title}</p>}
    {profile.summary && <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-slate-200">{profile.summary}</p>}
    {profile.location && <p className="text-sm text-slate-400">{profile.location}</p>}
    {latestEducation?.school && <p className="text-sm text-slate-300">
      Học vấn: {[latestEducation.degree, latestEducation.major, latestEducation.school].filter(Boolean).join(" · ")}
      {education.length > 1 && <a href="#education" className="ml-2 text-emerald-300 underline underline-offset-4">Xem thêm</a>}
    </p>}
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
      {profile.email && <a href={`mailto:${encodeURIComponent(profile.email)}`} className="text-emerald-300 underline underline-offset-4">Email</a>}
      {socialLinks.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4">{link.platform || "Liên kết"}</a>)}
      {resume.pdfUrl && <a href={resume.pdfUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-400 px-4 py-2 font-medium text-emerald-200 hover:bg-emerald-400/10">Tải CV (PDF)</a>}
    </div>
  </header>;
}
