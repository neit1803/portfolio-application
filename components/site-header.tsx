type SiteHeaderProps = {
  name: string;
};

export default function SiteHeader({ name }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="site-brand" href="#home" aria-label={`${name} — về đầu trang`}>
        <span>{name}</span>
      </a>
      <div className="site-header-right">
        <span className="header-availability"><span className="availability-dot" /> PORTFOLIO / 2026</span>
        <span className="header-divider" aria-hidden="true" />
        <span className="header-index">01 — INTRO</span>
      </div>
    </header>
  );
}
