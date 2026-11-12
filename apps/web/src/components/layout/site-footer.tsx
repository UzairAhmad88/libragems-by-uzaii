import Link from "next/link";
import { Mail, MapPin, ShieldCheck, Scale, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-forest-mid bg-forest-deep text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Corporate Profile */}
          <div className="space-y-4">
            <Link href="/" className="inline-block focus-visible:outline-champagne">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                  LibraGems
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-champagne inline-block"></span>
              </div>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                Trading &amp; Supply Co., Ltd.
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-white/75">
              Wholesale trading and export of commercial-quality rough stones, mineral specimens,
              and fine cut gemstones. Based in Bangkok&apos;s historic gemological trading nexus.
            </p>
            <div className="flex items-start gap-2 pt-2 text-xs text-white/70">
              <MapPin className="h-4 w-4 shrink-0 text-champagne" />
              <span>
                Bang Rak Gemstone Trading District
                <br />
                Bangkok 10500, Thailand
                <br />
                <span className="text-[11px] text-white/50">(Showroom viewing by scheduled trade appointment)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Gemstone Catalogue */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Active Materials
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-white/80">
              <li>
                <Link
                  href="/gemstones/hessonite-garnet"
                  className="hover:text-white transition-colors"
                >
                  Rough Hessonite Garnet (Lot LG-HG-001)
                </Link>
              </li>
              <li>
                <Link
                  href="/gemstones/turquoise"
                  className="hover:text-white transition-colors"
                >
                  Commercial Turquoise (Lot LG-TQ-001)
                </Link>
              </li>
              <li>
                <Link
                  href="/gemstones/afghanistan-rubellite"
                  className="hover:text-white transition-colors"
                >
                  Afghanistan Cut Rubellite (LG-RUB-AFGHAN)
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/gemstones"
                  className="inline-flex items-center gap-1 font-medium text-champagne hover:text-white transition-colors"
                >
                  Complete Catalogue Archive
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Standards */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Standards &amp; Operations
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-white/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  The Bangkok Trading House
                </Link>
              </li>
              <li>
                <Link href="/quality-sourcing" className="hover:text-white transition-colors">
                  CIBJO Treatment Disclosure Protocol
                </Link>
              </li>
              <li>
                <Link href="/quality-sourcing" className="hover:text-white transition-colors">
                  Bangkok Laboratory Memos (GIT / Lotus / AIGS)
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Gemstone Knowledge &amp; Market Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Schedule Showroom Viewing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trade Desk & Inquiries */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-champagne">
              Trading Desk Contact
            </h3>
            <div className="mt-4 space-y-3 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-champagne" />
                <a
                  href="mailto:info@libragems.net"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  info@libragems.net
                </a>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="font-medium text-white/90">Trade Desk Direct Access</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                  Direct telephone and executive WhatsApp channels are provided to verified trade accounts.
                  Inquire online or contact our Bangkok desk via corporate email.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-champagne/40 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-champagne hover:bg-champagne hover:text-forest-deep transition-all duration-200"
                >
                  Submit Trade Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 sm:mt-16 flex flex-col items-start sm:items-center justify-between gap-4 sm:gap-6 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Libra Gems &amp; Trading Co., Ltd. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <Scale className="h-3.5 w-3.5 text-champagne" />
              CIBJO Ethical Treatment Disclosure Adherent
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy (Draft)
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Trade (Draft)
            </Link>
            <span className="flex items-center gap-1 text-white/40">
              <ShieldCheck className="h-3 w-3" />
              B2B Wholesale Only
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
