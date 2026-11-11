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
    <header className="sticky top-0 z-40 border-b border-forest-mid/50 bg-forest-deep/95 backdrop-blur-md transition-shadow text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
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
            <span className="h-1.5 w-1.5 rounded-full bg-champagne inline-block"></span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-ivory/60">
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
                    ? "font-semibold text-champagne after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-champagne"
                    : "text-ivory/80"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-champagne px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-deep transition-all duration-200 hover:bg-champagne-light hover:shadow-md focus-visible:outline-champagne"
          >
            Enquire on Lots
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-forest-mid bg-forest/40 text-ivory transition-colors hover:bg-forest hover:text-champagne focus-visible:outline-champagne lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
            className="fixed inset-0 bg-forest-deep/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            className="relative flex h-full w-[85%] max-w-[380px] flex-col justify-between border-l border-border bg-ivory p-6 shadow-2xl"
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
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-stone transition-colors hover:text-forest-deep hover:border-forest focus-visible:outline-champagne"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Stack */}
              <nav aria-label="Mobile navigation" className="mt-6 flex flex-col space-y-1">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex min-h-[48px] items-center justify-between rounded-lg px-3 py-2 font-heading text-base transition-colors focus-visible:outline-champagne",
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
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-champagne">
                  Current Holdings
                </p>
                <div className="mt-3 space-y-2 text-sm text-stone">
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

            {/* Drawer Bottom Actions */}
            <div className="border-t border-border pt-6">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-forest-deep px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-forest focus-visible:outline-champagne shadow-md"
              >
                Contact Trading Desk
              </Link>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-stone">
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
