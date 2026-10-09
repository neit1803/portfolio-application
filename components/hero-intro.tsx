import HeroActions, { type HeroActionsProps } from "./hero-actions";

type HeroIntroProps = {
  firstName: string;
  lastName: string;
  role: string;
  links: HeroActionsProps;
};

export default function HeroIntro({ firstName, lastName, role, links }: HeroIntroProps) {
  return (
    <div className="hero-intro">
      <p className="hero-kicker text-xl">XIN CHÀO, TÔI LÀ</p>
      <h1 className="hero-name" id="hero-title"><span>{firstName}</span><span>{lastName}</span></h1>
      <p className="hero-kicker text-xl">{role}</p>
      <HeroActions {...links} />
    </div>
  );
}
