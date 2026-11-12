"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Gemstones", href: "/gemstones" },
  { label: "Quality & Sourcing", href: "/quality-sourcing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Close drawer on path change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Auto-focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#214B3B] bg-[#102C23] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-4.5">
        {/* Brand Logotype */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-champagne"
          aria-label="LibraGems Homepage"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-champagne md:text-3xl">
              LibraGems
            </span>
            <span className="h-2 w-2 rounded-full bg-champagne inline-block"></span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAF9F4]/80">
            Bangkok • Est. Thailand
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 text-sm font-medium lg:flex"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1 font-medium transition-colors hover:text-champagne focus-visible:outline-champagne",
                  isActive
                    ? "font-bold text-champagne after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-champagne"
                    : "text-[#FAF9F4]/85"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header Actions: WhatsApp Desk Pill + Enquire CTA */}
        <div className="hidden items-center gap-3.5 lg:flex">
          {/* Direct WhatsApp Desk Link */}
          <a
            href="https://wa.me/66846674833?text=Hello%20LibraGems%20Trading%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20your%20gemstone%20inventory."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-900/60 hover:text-white hover:border-emerald-400 focus-visible:outline-champagne"
            title="Chat directly with our Bangkok Trading Desk via WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366] shrink-0" />
            <span className="font-mono text-[11px] tracking-tight text-white">+66 84 667 4833</span>
          </a>

          {/* Enquire on Lots CTA */}
          <Link
            href="/contact"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-champagne px-5 py-2 text-xs font-bold uppercase tracking-wider text-forest-deep transition-all duration-200 hover:bg-champagne-light hover:shadow-md focus-visible:outline-champagne"
          >
            Enquire on Lots
          </Link>
        </div>

        {/* Mobile Header Actions (WhatsApp quick chat + Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="https://wa.me/66846674833?text=Hello%20LibraGems%20Trading%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20your%20gemstone%20inventory."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-2.5 text-xs font-semibold text-emerald-300 hover:text-white focus-visible:outline-champagne"
            aria-label="Chat on WhatsApp +66 84 667 4833"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            <span className="font-mono text-[10px] text-white sm:inline hidden">+66 84 667 4833</span>
            <span className="text-[10px] font-bold sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-forest-mid bg-forest/40 text-ivory transition-colors hover:bg-forest hover:text-champagne focus-visible:outline-champagne"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Overlay & Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 flex justify-end lg:hidden text-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#102C23]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            className="relative flex h-full w-[85%] max-w-[380px] flex-col justify-between border-l border-border bg-ivory p-6 shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-xl font-bold text-forest-deep">LibraGems</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne inline-block"></span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone">Trading Desk • Bangkok</p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-stone transition-colors hover:text-forest-deep hover:border-forest focus-visible:outline-champagne"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Stack */}
              <nav aria-label="Mobile navigation" className="mt-5 flex flex-col space-y-1">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex min-h-[46px] items-center justify-between rounded-lg px-3 py-2 font-heading text-base transition-colors focus-visible:outline-champagne",
                        isActive
                          ? "bg-forest/10 font-bold text-forest-deep"
                          : "text-ink hover:bg-beige"
                      )}
                    >
                      <span>{label}</span>
                      <ArrowRight className="h-4 w-4 text-stone/60" />
                    </Link>
                  );
                })}
              </nav>

              {/* Gemstone Quick Links */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-champagne">
                  Current Holdings
                </p>
                <div className="mt-2.5 space-y-1 text-sm text-stone">
                  <Link
                    href="/gemstones/hessonite-garnet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-forest transition-colors"
                  >
                    Ceylon Rough Hessonite
                  </Link>
                  <Link
                    href="/gemstones/turquoise"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-forest transition-colors"
                  >
                    Natural Matrix Turquoise
                  </Link>
                  <Link
                    href="/gemstones/afghanistan-rubellite"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-forest transition-colors"
                  >
                    Afghanistan Cut Rubellite
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions: WhatsApp Desk Card + Contact CTA */}
            <div className="border-t border-border pt-5 space-y-3">
              {/* WhatsApp Direct Desk Card */}
              <a
                href="https://wa.me/66846674833?text=Hello%20LibraGems%20Trading%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20your%20gemstone%20inventory."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-50/70 p-3 transition-all hover:bg-emerald-100/80"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366] shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-forest-deep">WhatsApp Direct Desk</span>
                    <span className="block font-mono text-[11px] font-semibold text-emerald-800">+66 84 667 4833</span>
                  </div>
                </div>
                <span className="rounded-full bg-[#25D366] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                  Chat
                </span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[46px] w-full items-center justify-center rounded-full bg-forest-deep px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-forest focus-visible:outline-champagne shadow-md"
              >
                Contact Trading Desk
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-stone">
                <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                <span>Bang Rak Trading District • Bangkok</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
