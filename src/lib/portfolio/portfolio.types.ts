export interface Profile {
  fullName: string;
  title: string;
  summary: string;
  avatar?: string;
  email?: string;
  location?: string;
}

export interface Education {
  school: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  images: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level?: number;
  keyboardKey?: string;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Resume {
  pdfUrl?: string;
  updatedAt?: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  socialLinks: SocialLink[];
  resume: Resume;
}

export type PortfolioResult =
  | { status: "ready"; data: PortfolioData }
  | { status: "empty" | "unavailable" };
