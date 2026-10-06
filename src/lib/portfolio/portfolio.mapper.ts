import type { PortfolioData } from "./portfolio.types";

type Row = Record<string, unknown>;

export interface PortfolioRows {
  profile: Row;
  educations: Row[];
  experiences: Row[];
  responsibilities: Row[];
  projects: Row[];
  images: Row[];
  skills: Row[];
  socialLinks: Row[];
  resume: Row | null;
}

const string = (value: unknown): string => typeof value === "string" ? value.trim() : "";
const optional = (value: unknown): string | undefined => string(value) || undefined;
const strings = (value: unknown): string[] => Array.isArray(value) ? value.map(string).filter(Boolean) : [];
const number = (value: unknown): number => typeof value === "number" && Number.isFinite(value) ? value : 0;
const ordered = (rows: Row[]): Row[] => [...rows].sort((a, b) => number(a.sort_order) - number(b.sort_order));
const date = (value: unknown): string | undefined => optional(value)?.slice(0, 10);
const httpsUrl = (value: unknown): string | undefined => {
  const raw = optional(value);
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

export function mapPortfolio(
  rows: PortfolioRows,
  storageUrl: (bucket: "project-images" | "resumes", path: string) => string | undefined,
): PortfolioData {
  const responsibilities = new Map<string, string[]>();
  for (const row of ordered(rows.responsibilities)) {
    const key = string(row.experience_id);
    const content = string(row.content);
    if (key && content) responsibilities.set(key, [...(responsibilities.get(key) ?? []), content]);
  }
  const images = new Map<string, string[]>();
  for (const row of ordered(rows.images)) {
    const key = string(row.project_id);
    const path = string(row.storage_path);
    const url = path && storageUrl("project-images", path);
    if (key && url) images.set(key, [...(images.get(key) ?? []), url]);
  }
  const resumePath = string(rows.resume?.storage_path);
  return {
    profile: {
      fullName: string(rows.profile.full_name),
      title: string(rows.profile.title),
      summary: string(rows.profile.summary),
      avatar: httpsUrl(rows.profile.avatar_url),
      email: optional(rows.profile.email),
      location: optional(rows.profile.location),
    },
    education: ordered(rows.educations).map((row) => ({
      school: string(row.school), degree: optional(row.degree), major: optional(row.major),
      startDate: date(row.start_date), endDate: date(row.end_date), description: optional(row.description),
    })),
    experiences: ordered(rows.experiences).map((row) => ({
      company: string(row.company), role: string(row.role), startDate: date(row.start_date),
      endDate: date(row.end_date), description: optional(row.description),
      responsibilities: responsibilities.get(string(row.id)) ?? [], technologies: strings(row.technologies),
    })),
    projects: ordered(rows.projects).map((row) => ({
      id: string(row.id), name: string(row.name), description: string(row.description),
      technologies: strings(row.technologies), githubUrl: httpsUrl(row.github_url),
      demoUrl: httpsUrl(row.demo_url), images: images.get(string(row.id)) ?? [],
    })),
    skills: ordered(rows.skills).map((row) => ({
      id: string(row.id), name: string(row.name), category: string(row.category),
      icon: httpsUrl(row.icon_url), level: typeof row.level === "number" && row.level >= 1 && row.level <= 5 ? row.level : undefined,
      keyboardKey: optional(row.keyboard_key), order: number(row.sort_order),
    })),
    socialLinks: ordered(rows.socialLinks).flatMap((row) => {
      const url = httpsUrl(row.url);
      return url ? [{ platform: string(row.platform), url, icon: httpsUrl(row.icon_url) }] : [];
    }),
    resume: { pdfUrl: resumePath ? storageUrl("resumes", resumePath) : undefined, updatedAt: optional(rows.resume?.updated_at) },
  };
}
