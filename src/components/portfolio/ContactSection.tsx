import type { Profile, SocialLink } from "@/src/lib/portfolio/portfolio.types";
import SectionFrame from "./SectionFrame";

export default function ContactSection({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  const primaryLink = profile.email ? `mailto:${encodeURIComponent(profile.email)}` : socialLinks[0]?.url;
  return <SectionFrame id="contact" title="Liên hệ" compact={!primaryLink}>
    {primaryLink && <a href={primaryLink} target={profile.email ? undefined : "_blank"} rel={profile.email ? undefined : "noopener noreferrer"}
      className="inline-flex rounded-full bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300">
      {profile.email ? "Liên hệ qua email" : `Kết nối qua ${socialLinks[0].platform || "mạng xã hội"}`}
    </a>}
    {socialLinks.length > 0 && <ul className="flex flex-wrap gap-5 text-sm">{socialLinks.map((link) => <li key={link.url}>
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4">{link.platform || "Liên kết"}</a>
    </li>)}</ul>}
    {!primaryLink && <p className="text-slate-400">Chưa có thông tin liên hệ.</p>}
  </SectionFrame>;
}
