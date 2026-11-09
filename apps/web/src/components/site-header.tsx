import Link from "next/link";

const links = [
  { label: "About", href: "/about" },
  { label: "Gemstones", href: "/gemstones" },
  { label: "Quality & Sourcing", href: "/quality-sourcing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-wide text-forest hover:text-forest-light transition-colors"
        >
          LibraGems
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-6 text-sm font-medium">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-ink transition-colors hover:text-forest focus-visible:outline-champagne"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
