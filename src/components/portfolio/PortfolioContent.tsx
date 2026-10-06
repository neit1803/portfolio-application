import type { PortfolioData } from "@/src/lib/portfolio/portfolio.types";
import ContactSection from "./ContactSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

export default function PortfolioContent({ data }: { data: PortfolioData }) {
  return <>
    <HeroSection profile={data.profile} education={data.education} socialLinks={data.socialLinks} resume={data.resume} />
    <EducationSection education={data.education} />
    <ExperienceSection experiences={data.experiences} />
    <ProjectsSection projects={data.projects} />
    <SkillsSection skills={data.skills} />
    <ContactSection profile={data.profile} socialLinks={data.socialLinks} />
  </>;
}
