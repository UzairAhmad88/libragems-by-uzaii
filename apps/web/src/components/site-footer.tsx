import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-forest-light bg-forest-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        {/* Col 1: Corporate Profile */}
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-2xl font-semibold tracking-wide text-white">
            LibraGems
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-white/75">
            Libra Gems & Trading Co., Ltd.
            <br />
            1394 Charoen Krung Road, Bang Rak
            <br />
            Bangkok 10500, Thailand
          </p>
        </div>

        {/* Col 2: Gemstones */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Gemstones
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/gemstones/hessonite-garnet" className="hover:text-white transition-colors">
                Rough Hessonite Garnet
              </Link>
            </li>
            <li>
              <Link href="/gemstones/turquoise" className="hover:text-white transition-colors">
                Commercial Turquoise
              </Link>
            </li>
            <li>
              <Link href="/gemstones/afghanistan-rubellite" className="hover:text-white transition-colors">
                Afghanistan Cut Rubellite
              </Link>
            </li>
            <li>
              <Link href="/gemstones" className="hover:text-white transition-colors text-champagne">
                All Materials →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/quality-sourcing" className="hover:text-white transition-colors">
                Quality & Sourcing
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-white transition-colors">
                Gemstone Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Desk
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Trade Contact & Legal */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            Trade Enquiries
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/75">
            International B2B wholesale enquiries. Verified contacts will be published after client confirmation.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} Libra Gems & Trading Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
