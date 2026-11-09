import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Rough Hessonite Garnet | Commercial Lot",
  description:
    "Commercial-quality rough Hessonite Garnet. Grossular garnet rough pebbles selected for commercial cabochon and bead cutting.",
};

export default function HessonitePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-5xl px-6 py-20">
        <nav aria-label="Breadcrumb" className="text-xs text-stone">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/gemstones" className="hover:text-forest">Gemstones</Link>
          <span className="mx-2">/</span>
          <span className="text-ink font-medium">Rough Hessonite Garnet</span>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-forest">
          Rough Gemstone • Lot Reference: LG-HG-001
        </p>
        <h1 className="mt-3 font-serif text-4xl text-forest-deep md:text-5xl">
          Commercial-Quality Rough Hessonite Garnet
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          Explore commercial-quality rough Hessonite Garnet parcels held in Bangkok. Translucent to
          semi-transparent grossular garnet rough pebbles selected for commercial lapidary cutting.
        </p>

        {/* Architectural Photo Placeholder */}
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-beige p-12 text-center shadow-subtle">
          <p className="text-xs font-semibold uppercase tracking-wider text-champagne">
            Studio Photography Placeholder
          </p>
          <p className="mt-2 text-xs text-stone">
            Authentic daylight photography of this physical lot will be published after client approval.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-forest px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-forest-light focus-visible:outline-champagne"
          >
            Inquire About This Gemstone
          </Link>
          <Link
            href="/gemstones"
            className="inline-flex rounded-full border border-border bg-white px-8 py-3.5 text-sm font-medium text-ink transition-all duration-200 hover:border-forest hover:text-forest focus-visible:outline-champagne"
          >
            ← Back to Catalogue
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
