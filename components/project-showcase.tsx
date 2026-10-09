"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
} from "@tabler/icons-react";

import ProjectPreview from "./project-preview";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Technology = {
  name: string;
  icon: string;
};

type ProjectHighlight = {
  title: string;
  body: string;
  images?: string[];
};

type Project = {
  id: string;
  title: string;
  category: string;
  preview: string;
  background: string;
  summary: string;
  description: string;
  frontend: Technology[];
  backend: Technology[];
  highlights: ProjectHighlight[];
  live?: string;
  github?: string;
};

const logo = (name: string, file: string): Technology => ({
  name,
  icon: `/assets/logos/${file}`,
});

const technologies = {
  typescript: logo("TypeScript", "typescript-mono.svg"),
  next: logo("Next.js", "nextdotjs-mono.svg"),
  react: logo("React", "react-mono.svg"),
  vue: logo("Vue", "vuedotjs-mono.svg"),
  tailwind: logo("Tailwind CSS", "tailwind-css-mono.svg"),
  node: logo("Node.js", "nodedotjs-mono.svg"),
  express: logo("Express", "express-mono.svg"),
  postgres: logo("PostgreSQL", "postgresql-mono.svg"),
  mongo: logo("MongoDB", "mongodb-mono.svg"),
  firebase: logo("Firebase", "firebase-mono.svg"),
  supabase: logo("Supabase", "supabase-mono.svg"),
  drizzle: logo("Drizzle", "drizzle-mono.svg"),
  trpc: logo("tRPC", "trpc-mono.svg"),
  redis: logo("Redis", "redis-mono.svg"),
  docker: logo("Docker", "docker-mono.svg"),
  motion: logo("Motion", "motion.svg"),
  gsap: logo("GSAP", "gsap-mono.svg"),
  socket: logo("Socket.io", "socketdotio-mono.svg"),
};

const projects: Project[] = [
  {
    id: "storekit",
    title: "StoreKit",
    category: "Commerce platform",
    preview: "/assets/projects-screenshots/storekit/landing.png",
    background: "/assets/backgrounds/storekit.jpg",
    summary: "A production-grade, multi-tenant commerce platform — Shopify-class, built solo.",
    description: "A type-safe commerce foundation spanning merchant operations, storefronts, payments and mobile POS workflows.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind],
    backend: [technologies.trpc, technologies.drizzle, technologies.postgres, technologies.redis, technologies.docker],
    highlights: [
      {
        title: "Payments & reliability",
        body: "Idempotent payment workflows, encrypted credentials and an async Redis queue keep checkout reliable through retries, refreshes and duplicate webhooks.",
        images: ["/assets/projects-screenshots/storekit/orders.png", "/assets/projects-screenshots/storekit/login.png"],
      },
      {
        title: "Storefront generation",
        body: "A visual theme system and configurable storefront pipeline let each merchant launch a distinct shopping experience from one platform.",
        images: ["/assets/projects-screenshots/storekit/storefront.png", "/assets/projects-screenshots/storekit/themes.png"],
      },
    ],
    live: "https://storekit.app/",
  },
  {
    id: "codingducks",
    title: "Coding Ducks",
    category: "Real-time coding platform",
    preview: "/assets/projects-screenshots/codingducks/landing.png",
    background: "/assets/backgrounds/codingducks.jpg",
    summary: "A collaborative coding environment with real-time rooms, challenges and a system-design playground.",
    description: "Built as a strict TypeScript monorepo with a collaborative editor, code execution flows and multiplayer presence.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind],
    backend: [technologies.node, technologies.trpc, technologies.drizzle, technologies.postgres, technologies.socket, technologies.docker],
    highlights: [
      {
        title: "Collaborative editor",
        body: "Rooms combine live presence, synchronized code, role-aware collaboration and durable snapshots.",
        images: ["/assets/projects-screenshots/codingducks/ducklets-editor.png", "/assets/projects-screenshots/codingducks/ducklets.png"],
      },
      {
        title: "Practice & simulation",
        body: "Coding contests, machine-coding exercises and interactive system-design scenarios turn practice into a shared experience.",
        images: ["/assets/projects-screenshots/codingducks/contests.png", "/assets/projects-screenshots/codingducks/sysdesign.png"],
      },
    ],
    live: "https://www.codingducks.xyz/",
    github: "https://github.com/Naresh-Khatri/Coding-Ducks",
  },
  {
    id: "gumbalup",
    title: "Gumbalup",
    category: "Real-time quiz platform",
    preview: "/assets/projects-screenshots/gumbalup/landing.png",
    background: "/assets/backgrounds/gumbalup.jpg",
    summary: "A live quiz platform where everyone in the room can play, react and see results together.",
    description: "Hosts compose quizzes in a focused editor while participants join lightweight real-time sessions from any device.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind],
    backend: [technologies.node, technologies.postgres, technologies.redis, technologies.socket],
    highlights: [
      {
        title: "Live room experience",
        body: "Low-latency answers, synchronized timers and instant leaderboards keep every participant on the same beat.",
        images: ["/assets/projects-screenshots/gumbalup/dashboard.png", "/assets/projects-screenshots/gumbalup/library.png"],
      },
      {
        title: "Quiz authoring",
        body: "A visual editor makes reusable questions, media and session settings fast to assemble.",
        images: ["/assets/projects-screenshots/gumbalup/editor.png"],
      },
    ],
    live: "https://gumbalup.com/",
  },
  {
    id: "waku",
    title: "Waku",
    category: "Image rendering platform",
    preview: "/assets/projects-screenshots/waku/landing.png",
    background: "/assets/backgrounds/waku.jpg",
    summary: "A programmable image-rendering workspace for turning reusable templates into production assets.",
    description: "The editor blends structured data, live preview and server-side rendering into a practical creative workflow.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind],
    backend: [technologies.node, technologies.redis, technologies.docker],
    highlights: [
      {
        title: "Template editor",
        body: "Compose repeatable visuals with a live editing surface and data-driven controls.",
        images: ["/assets/projects-screenshots/waku/editor.png", "/assets/projects-screenshots/waku/preview.png"],
      },
      {
        title: "AI-assisted workflow",
        body: "Assisted generation helps teams move from a rough idea to a reusable visual template faster.",
        images: ["/assets/projects-screenshots/waku/ai.png"],
      },
    ],
    live: "https://waku.nareshkhatri.dev",
    github: "https://github.com/Naresh-Khatri/waku",
  },
  {
    id: "peakposts",
    title: "PeakPosts",
    category: "AI social SaaS",
    preview: "/assets/projects-screenshots/peakposts/landing.png",
    background: "/assets/backgrounds/peakposts.jpg",
    summary: "An AI-assisted social publishing workspace for planning, writing and shipping content.",
    description: "A calm dashboard turns a multi-step content workflow into a compact system for teams and creators.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind],
    backend: [technologies.node, technologies.postgres, technologies.redis],
    highlights: [
      {
        title: "Content pipeline",
        body: "Draft, review and schedule content from a single workspace with clear publishing state.",
        images: ["/assets/projects-screenshots/peakposts/dashboard.png", "/assets/projects-screenshots/peakposts/posts.png"],
      },
    ],
    live: "https://peakposts.ai/",
  },
  {
    id: "kanbi",
    title: "Kanbi",
    category: "Realtime project tracker",
    preview: "/assets/projects-screenshots/kanbi/landing.png",
    background: "/assets/backgrounds/kanbi.jpg",
    summary: "A realtime workspace for teams to plan, focus and ship without losing the shape of the work.",
    description: "Boards, profiles and AI-assisted drafting come together in a lightweight project workflow.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind, technologies.motion],
    backend: [technologies.supabase, technologies.postgres],
    highlights: [
      {
        title: "Realtime planning",
        body: "Shared boards keep task state, ownership and team visibility synchronized.",
        images: ["/assets/projects-screenshots/kanbi/board.png", "/assets/projects-screenshots/kanbi/dashboard.png"],
      },
      {
        title: "AI drafting",
        body: "Structured assistance helps turn rough notes into actionable work while keeping the team in control.",
        images: ["/assets/projects-screenshots/kanbi/ai-draft.png", "/assets/projects-screenshots/kanbi/profile.png"],
      },
    ],
    live: "https://kanbi.nareshkhatri.dev",
    github: "https://github.com/naresh-Khatri/kanbi",
  },
  {
    id: "portfolio",
    title: "My Portfolio",
    category: "Interactive portfolio",
    preview: "/assets/projects-screenshots/portfolio/landing.png",
    background: "/assets/backgrounds/portfolio.jpg",
    summary: "A playful portfolio that combines a stylized 3D room with practical, readable project stories.",
    description: "The experience balances immersive WebGL interactions with accessible content and responsive UI.",
    frontend: [technologies.typescript, technologies.next, technologies.react, technologies.tailwind, technologies.gsap],
    backend: [technologies.node],
    highlights: [
      {
        title: "Interactive storytelling",
        body: "The landing experience uses motion and 3D cues to make navigation feel like exploring a personal space.",
        images: ["/assets/projects-screenshots/portfolio/skills.png", "/assets/projects-screenshots/portfolio/projects.png"],
      },
      {
        title: "Responsive details",
        body: "Project and navigation surfaces remain clear on smaller screens without flattening the visual personality.",
        images: ["/assets/projects-screenshots/portfolio/project.png", "/assets/projects-screenshots/portfolio/navbar.png"],
      },
    ],
    live: "#home",
  },
];

function TechnologyDock({ label, items }: { label: string; items: Technology[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-2 md:items-start">
      <span className="text-[10px] font-medium uppercase tracking-[.22em] text-slate-500">{label}</span>
      <div
        className="flex h-16 items-end gap-2 rounded-2xl bg-black/35 px-3 pb-3"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {items.map((item, index) => {
          const distance = activeIndex === null ? Infinity : Math.abs(activeIndex - index);
          const scale = distance === 0 ? 1.55 : distance === 1 ? 1.2 : 1;

          return (
            <span
              className="group/tech relative grid size-10 place-items-center rounded-full bg-slate-800/70 text-slate-100 transition-transform duration-200"
              key={item.name}
              onMouseEnter={() => setActiveIndex(index)}
              style={{ transform: `translateY(${distance === 0 ? -7 : distance === 1 ? -3 : 0}px) scale(${scale})` }}
            >
              <i
                className="block size-5 bg-current"
                style={{
                  maskImage: `url(${item.icon})`,
                  WebkitMaskImage: `url(${item.icon})`,
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                } as CSSProperties}
                aria-hidden="true"
              />
              <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] whitespace-nowrap opacity-0 shadow-xl transition-opacity group-hover/tech:opacity-100">
                {item.name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ScreenshotCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const multiple = images.length > 1;

  useEffect(() => {
    if (!multiple || expanded) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % images.length), 4500);
    return () => window.clearInterval(interval);
  }, [expanded, images.length, multiple]);

  const step = (amount: number) => setIndex((current) => (current + amount + images.length) % images.length);

  return (
    <>
      <div className="group/slideshow relative my-4 overflow-hidden rounded-xl border border-slate-800 bg-black">
        <button type="button" className="relative block aspect-[16/9] w-full cursor-zoom-in" onClick={() => setExpanded(true)}>
          {images.map((image, imageIndex) => (
            <Image
              key={image}
              src={image}
              alt={`${title} screenshot ${imageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              className={`object-contain transition duration-500 ${imageIndex === index ? "scale-100 opacity-100" : "pointer-events-none scale-[.985] opacity-0"}`}
            />
          ))}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white/90 opacity-0 backdrop-blur-md transition group-hover/slideshow:opacity-100">
            <IconMaximize className="size-3.5" /> Expand
          </span>
        </button>

        {multiple && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="absolute left-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white transition hover:scale-105">
              <IconChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white transition hover:scale-105">
              <IconChevronRight className="size-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((image, dotIndex) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show screenshot ${dotIndex + 1}`}
                  className={`h-1.5 rounded-full bg-white transition-all ${dotIndex === index ? "w-5" : "w-1.5 opacity-45"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="max-w-[94vw] border-0 bg-transparent p-0 shadow-none" aria-describedby={undefined}>
          <DialogTitle className="sr-only">{title} screenshot</DialogTitle>
          <div className="relative flex min-h-[40vh] items-center justify-center">
            <Image src={images[index]} alt={`${title} expanded screenshot`} width={1920} height={1200} className="h-auto max-h-[88vh] w-auto max-w-full rounded-xl object-contain ring-1 ring-white/10" />
            {multiple && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="absolute left-2 grid size-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md sm:left-4">
                  <IconChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="absolute right-2 grid size-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md sm:right-4">
                  <IconChevronRight className="size-5" />
                </button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs text-white backdrop-blur-md">
                  {index + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b13]">
          <Card className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg border-white/5 bg-slate-950/50 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_22px_60px_-30px_rgba(91,116,255,.65)]">
            <ProjectPreview src={project.preview} background={project.background} title={project.title} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#080b13] via-[#080b13]/85 to-transparent">
              <div className="flex h-full flex-col items-start justify-end p-4">
                <span className="text-lg font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,.65)]">{project.title}</span>
                <Badge className="px-2 py-0 text-[10px] font-medium normal-case">{project.category}</Badge>
              </div>
            </div>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-[85vh] max-w-4xl flex-col gap-0 overflow-hidden p-0">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-800 bg-[#020817]/90 px-6 py-4 pr-14 backdrop-blur-md md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <DialogTitle className="truncate font-[family-name:var(--font-unbounded)] text-xl md:text-2xl">{project.title}</DialogTitle>
            <Badge variant="outline" className="hidden shrink-0 text-[10px] uppercase tracking-widest sm:inline-flex">{project.category}</Badge>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <Button asChild variant="ghost" size="sm">
                <Link href={project.github} target="_blank" rel="noreferrer"><IconBrandGithub /> Source</Link>
              </Button>
            )}
            {project.live && project.live !== "#home" && (
              <Button asChild size="sm" className="rounded-full">
                <Link href={project.live} target="_blank" rel="noreferrer">Visit <IconArrowUpRight /></Link>
              </Button>
            )}
          </div>
        </div>

        <DialogDescription className="sr-only">Details and screenshots for {project.title}</DialogDescription>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 md:px-8 md:py-8">
          <div className="mb-9 flex flex-col gap-6 md:flex-row md:gap-10">
            <TechnologyDock label="Frontend" items={project.frontend} />
            <TechnologyDock label="Backend" items={project.backend} />
          </div>

          <div className="mb-9 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <p className="mx-auto max-w-3xl text-center font-[family-name:var(--font-space-grotesk)] text-xl font-medium leading-relaxed text-slate-100 md:text-2xl">{project.summary}</p>
          <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">{project.description}</p>

          {project.live && project.live !== "#home" && (
            <Button asChild size="sm" className="mt-4">
              <Link href={project.live} target="_blank" rel="noreferrer">Visit website <IconArrowUpRight /></Link>
            </Button>
          )}

          <div className="mt-8 space-y-10">
            {project.highlights.map((highlight) => (
              <section key={highlight.title}>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-100 md:text-2xl">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{highlight.body}</p>
                {highlight.images && <ScreenshotCarousel images={highlight.images} title={`${project.title}: ${highlight.title}`} />}
              </section>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="projects" className="relative mx-auto min-h-[130svh] w-[min(calc(100%_-_9vw),1280px)] px-4 pb-28 pt-6" aria-labelledby="projects-title">
      <header className="mb-14 text-center">
        <h2 id="projects-title" className="font-[family-name:var(--font-unbounded)] text-5xl font-bold tracking-[-.07em] text-slate-50 md:text-7xl">Projects</h2>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
