const links = [
  ["About", "/about"],
  ["Gemstones", "/gemstones"],
  ["Quality & Sourcing", "/quality-sourcing"],
  ["Insights", "/insights"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--ivory)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <a href="/" className="text-2xl font-semibold tracking-wide text-[var(--forest)]">
          LibraGems
        </a>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-[var(--forest)]">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
