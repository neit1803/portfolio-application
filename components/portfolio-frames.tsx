"use client";

import Link from "next/link";
import { FormEvent, useState, type CSSProperties } from "react";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconMail,
  IconSend,
} from "@tabler/icons-react";
import ProjectShowcase from "./project-showcase";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

type Experience = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  skillNames: string[];
};

const skills: Skill[] = [
  { name: "JavaScript", icon: "/assets/skills/js.svg", color: "#f0db4f" },
  { name: "TypeScript", icon: "/assets/skills/ts.svg", color: "#007acc" },
  { name: "HTML", icon: "/assets/skills/html.svg", color: "#e34c26" },
  { name: "CSS", icon: "/assets/skills/css.svg", color: "#38bdf8" },
  { name: "React", icon: "/assets/skills/react.svg", color: "#61dafb" },
  { name: "Vue", icon: "/assets/skills/vue.svg", color: "#41b883" },
  { name: "Next.js", icon: "/assets/skills/nextjs.svg", color: "#ffffff" },
  { name: "Tailwind", icon: "/assets/skills/tailwind.svg", color: "#38bdf8" },
  { name: "Node.js", icon: "/assets/skills/nodejs.svg", color: "#6cc24a" },
  { name: "Express", icon: "/assets/skills/express.svg", color: "#ffffff" },
  { name: "PostgreSQL", icon: "/assets/skills/postgres.svg", color: "#70a8db" },
  { name: "MongoDB", icon: "/assets/skills/mongodb.svg", color: "#4db33d" },
  { name: "Git", icon: "/assets/skills/git.svg", color: "#f1502f" },
  { name: "GitHub", icon: "/assets/skills/github.svg", color: "#f0f3f7" },
  { name: "Prettier", icon: "/assets/skills/prettier.svg", color: "#f7b93a" },
  { name: "NPM", icon: "/assets/skills/npm.svg", color: "#cb3837" },
  { name: "Firebase", icon: "/assets/skills/firebase.svg", color: "#ffca28" },
  { name: "WordPress", icon: "/assets/skills/wordpress.svg", color: "#21759b" },
  { name: "Linux", icon: "/assets/skills/linux.svg", color: "#f5c400" },
  { name: "Docker", icon: "/assets/skills/docker.svg", color: "#2496ed" },
  { name: "Nginx", icon: "/assets/skills/nginx.svg", color: "#009639" },
  { name: "AWS", icon: "/assets/skills/aws.svg", color: "#ff9900" },
  { name: "Google Cloud", icon: "/assets/skills/gcp.svg", color: "#4285f4" },
  { name: "Vim", icon: "/assets/skills/vim.svg", color: "#019733" },
];

const skillByName = new Map(skills.map((skill) => [skill.name, skill]));

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "OmniNexus Sdn Bhd",
    startDate: "Dec 2024",
    endDate: "Present",
    description: [
      "Built a custom image editor from scratch, cutting $4.8k/year in SaaS costs.",
      "Architected async job queues processing 1k+ AI tasks daily with bulletproof reliability.",
      "Optimized media delivery pipeline, slashing asset load times by 40%.",
      "Shipped high-impact features end-to-end from requirements to production.",
    ],
    skillNames: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Google Cloud"],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Self-employed",
    startDate: "Apr 2022",
    endDate: "Dec 2024",
    description: [
      "Transformed chaotic Excel sheets into polished internal tools for various clients.",
      "Shipped dashboards and custom CMS platforms tailored to each client's workflow.",
      "Automated repetitive processes, improving efficiency and reducing human error.",
      "Focused on clean, maintainable code and interfaces that users actually enjoy.",
    ],
    skillNames: ["React", "Vue", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind", "WordPress"],
  },
];

function SectionHeading({
  title,
  id,
  description,
}: {
  title: string;
  id: string;
  description?: string;
}) {
  return (
    <header className="frame-heading">
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

function SkillFrame() {
  return (
    <section id="tech-stack" className="frame-section skills-frame" aria-labelledby="skills-title">
      <SectionHeading title="Tech Stack" id="skills-title" description="Tools I build with" />
      <div className="frame-section-inner">
        <ul className="skills-grid" aria-label="Technology skills">
          {skills.map((skill) => (
            <li className="skill-tile" key={skill.name} style={{ "--skill-color": skill.color } as CSSProperties}>
              <span className="skill-glow" aria-hidden="true" />
              <span
                className="skill-icon"
                style={{ maskImage: `url(${skill.icon})`, WebkitMaskImage: `url(${skill.icon})` }}
                aria-hidden="true"
              />
              <span className="skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ExperienceFrame() {
  return (
    <section
      id="experiences"
      className="source-experience-section"
      aria-labelledby="experiences-title"
    >
      <div className="source-experience-wrapper">
        <header className="source-experience-heading">
          <h2 id="experiences-title">Experience</h2>
          <p>My professional journey.</p>
        </header>

        <div className="source-experience-list">
          {experiences.map((experience) => (
            <article className="source-experience-card" key={`${experience.company}-${experience.startDate}`}>
              <header className="source-experience-card-header">
                <div>
                  <h3>{experience.title}</h3>
                  <p>{experience.company}</p>
                </div>
                <span className="source-experience-date">
                  {experience.startDate} - {experience.endDate}
                </span>
              </header>

              <div className="source-experience-card-content">
                <ul>
                  {experience.description.map((point) => <li key={point}>{point}</li>)}
                </ul>

                <div className="source-experience-skills" aria-label={`Technologies used at ${experience.company}`}>
                  {experience.skillNames.map((skillName) => {
                    const skill = skillByName.get(skillName);
                    if (!skill) return null;

                    return (
                      <span key={skill.name} style={{ "--skill-color": skill.color } as CSSProperties}>
                        <i
                          className="source-experience-skill-icon"
                          style={{ maskImage: `url(${skill.icon})`, WebkitMaskImage: `url(${skill.icon})` }}
                          aria-hidden="true"
                        />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFrame() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setMessage("");
  };

  return (
    <section id="contact" className="frame-section contact-frame" aria-labelledby="contact-title">
      <SectionHeading
        title="Let's work \n together"
        id="contact-title"
      />
      <div className="frame-section-inner contact-grid">
        <div>
          <div className="contact-links">
            <a href="mailto:hello@minhtien.dev"><IconMail /> hello@minhtien.dev</a>
            <Link href="https://github.com/neit1803" target="_blank" rel="noreferrer"><IconBrandGithub /> GitHub <IconArrowUpRight /></Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noreferrer"><IconBrandLinkedin /> LinkedIn <IconArrowUpRight /></Link>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <label><span>Name</span><input name="name" type="text" placeholder="Your name" required /></label>
            <label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label>
          </div>
          <label><span>Message</span><textarea name="message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A few words about your project" required minLength={10} /></label>
          <button type="submit" className="send-button">{sent ? <><IconCheck /> Message ready</> : <><IconSend /> Send message</>}</button>
          <p className="form-note" aria-live="polite">{sent ? "Thanks. I will get back to you shortly." : "Usually replies within two working days."}</p>
        </form>
      </div>
      <footer className="frame-footer"><span>MINH TIEN / 2026</span><span>BUILT WITH CURIOSITY</span></footer>
    </section>
  );
}

export default function PortfolioFrames() {
  return <div className="portfolio-frames"><SkillFrame /><ExperienceFrame /><ProjectShowcase /><ContactFrame /></div>;
}
