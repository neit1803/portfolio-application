"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandLinkedin, IconFile } from "@tabler/icons-react";

export type HeroActionsProps = {
  resumeUrl?: string;
  contactUrl?: string;
  githubUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
};

function GithubIcon() {
  return (
    <IconBrandGithub />
  );
}

function LinkedinIcon() {
  return (
    <IconBrandLinkedin />
  );
}

export default function HeroActions({
  resumeUrl,
  contactUrl,
  githubUrl,
  xUrl,
  linkedinUrl,
}: HeroActionsProps) {
  return (
    <div className="hero-actions" aria-label="Liên kết cá nhân">
      {resumeUrl ? (
        <Button asChild className="resume-button"><a href={resumeUrl} target="_blank" rel="noopener noreferrer"><IconFile /> Resume</a></Button>
      ) : (
        <Button className="resume-button" disabled title="Resume chưa được cập nhật"><IconFile /> Resume</Button>
      )}
      <div className="social-actions">
        {contactUrl ? (
          <Button asChild variant="outline" className="hire-button"><a href={contactUrl}>Hire Me</a></Button>
        ) : (
          <Button variant="outline" className="hire-button" disabled title="Thông tin liên hệ chưa được cập nhật">Hire Me</Button>
        )}
        {githubUrl ? (
          <Button asChild variant="outline" size="icon"><a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a></Button>
        ) : (
          <Button variant="outline" size="icon" disabled aria-label="GitHub chưa được cập nhật" title="GitHub chưa được cập nhật"><GithubIcon /></Button>
        )}
        {linkedinUrl ? (
          <Button asChild variant="outline" size="icon"><a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a></Button>
        ) : (
          <Button variant="outline" size="icon" disabled aria-label="LinkedIn chưa được cập nhật" title="LinkedIn chưa được cập nhật"><LinkedinIcon /></Button>
        )}
      </div>
    </div>
  );
}
