import HeroSection from "@/components/hero-section";
import PortfolioFrames from "@/components/portfolio-frames";
import SiteHeader from "@/components/site-header";
import StarfieldBackground from "@/components/starfield-background";

const profile = {
  firstName: "Minh",
  lastName: "Tien",
  role: "A Full Stack Web Developer",
  links: {
    githubUrl: "https://github.com/neit1803",
  },
};

export default function Home() {
  return (
    <main className="portfolio-page" id="home">
      <StarfieldBackground />
      <SiteHeader name={`${profile.firstName} ${profile.lastName}`} />
      <HeroSection {...profile} />
      <PortfolioFrames />
    </main>
  );
}
