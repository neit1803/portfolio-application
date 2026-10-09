import HeroIntro from "./hero-intro";
import type { HeroActionsProps } from "./hero-actions";
import RoomScene from "./room-scene";
import ScrollCue from "./scroll-cue";

type HeroSectionProps = {
  firstName: string;
  lastName: string;
  role: string;
  links: HeroActionsProps;
};

export default function HeroSection({ firstName, lastName, role, links }: HeroSectionProps) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <HeroIntro firstName={firstName} lastName={lastName} role={role} links={links} />
      <div className="hero-art">
        <RoomScene />
      </div>
      <ScrollCue />
    </section>
  );
}
