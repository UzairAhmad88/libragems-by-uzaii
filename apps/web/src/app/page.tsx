import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, Sparkles, MapPin, Compass, Gem } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductCard } from "@/components/gemstones/product-card";
import { getAllGemstones } from "@/data/gemstones";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "LibraGems | International Gemstone Trading & Sourcing | Bangkok",
  description:
    "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems.",
  path: "/",
});

export default function HomePage() {
  const gemstones = getAllGemstones();

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Section 1: Luxury Editorial Hero (Deep Forest Green) */}
        <section className="relative border-b border-forest-mid/60 bg-forest-deep py-14 sm:py-20 lg:py-28 overflow-hidden text-white">
          {/* Subtle Ambient Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest/30 via-transparent to-transparent pointer-events-none" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-forest/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-champagne backdrop-blur-sm">
                <Compass className="h-3.5 w-3.5 shrink-0" />
                <span>International B2B Gemstone Trading • Bangkok</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white">
                Nature&apos;s Rarest Gems. Trusted Through Expertise.
              </h1>

              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-ivory/85 md:text-lg">
                Sourcing, evaluating, and supplying commercial-quality rough stones, mineral
                specimens, and precision-cut colored gems directly from Bangkok&apos;s historic
                gemological trading district. Built on gemological rigor, transparent treatment
                disclosure, and long-term wholesale relationships.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/gemstones"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-forest-deep shadow-md hover:bg-champagne-light hover:shadow-lg focus-visible:outline-champagne transition-all duration-200"
                >
                  Explore Gemstones
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-champagne/50 bg-forest/30 px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-champagne hover:text-forest-deep focus-visible:outline-champagne transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>

              {/* Trust Micro-Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-forest-mid/60 text-xs text-ivory/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-champagne shrink-0" />
                  <span>CIBJO Treatment Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-champagne shrink-0" />
                  <span>Bangkok Lab Memos</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-champagne shrink-0" />
                  <span>Bang Rak Trading Desk</span>
                </div>
              </div>
            </div>

            {/* Architectural Studio Photo / Inventory Visual */}
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-champagne/30 bg-forest-mid shadow-2xl">
                <Image
                  src="/images/gemstones/hero-editorial-inventory.jpg"
                  alt="High-resolution editorial photograph of LibraGems gemstone inventory archive in Bangkok"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-ivory/60 px-1">
                <span>Bangkok Trading Floor &amp; Laboratory Desk</span>
                <span className="text-champagne font-medium">Standardized 5500K Inspection</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Credibility & Trading Pillars (Warm Ivory) */}
        <section className="border-b border-border bg-ivory py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                The Bangkok Trading Nexus
              </p>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest-deep">
                Rooted in Bangkok. Connected Worldwide.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone md:text-base">
                For over a century, Bangkok has operated as the world&apos;s preeminent trading and
                treatment hub for colored gemstones. Operating from Charoen Krung Road in Bang Rak,
                Libra Gems &amp; Trading Co., Ltd. connects international lapidaries, jewelry
                manufacturers, and gemstone connoisseurs to genuine physical inventory held in Thailand.
              </p>
            </div>

            <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Gem className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-forest-deep">
                  Commercial Rough Lots
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  Direct parcel acquisitions curated for cutting factories and lapidary ateliers.
                  Consistent sizing, honest cutting yields, and transparent internal character
                  disclosures.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Sparkles className="h-6 w-6 text-champagne" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-forest-deep">
                  Faceted Single Stones
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  Precision-cut single stones and matched suites proportioned for maximum brilliance
                  and optical scintillation, accompanied by accredited Bangkok gemological memos.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover md:col-span-2 lg:col-span-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-forest-deep">
                  Absolute Disclosure
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  Zero artificial ambiguity. Every stone and lot carries full CIBJO treatment
                  designations (Codes N, E, or T). Provenance is documented through gemological
                  science rather than unsupported marketing lore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Featured Launch Gemstones (Premium Off-White) */}
        <section className="border-b border-border bg-offwhite py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                  Verified Physical Holdings
                </p>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest-deep">
                  Featured Gemstone Materials
                </h2>
                <p className="mt-2 text-xs text-stone md:text-sm">
                  Initial curated offerings available for wholesale parcel acquisition and private inspection.
                </p>
              </div>
              <Link
                href="/gemstones"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-deep transition-colors"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="h-4 w-4 text-champagne" />
              </Link>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {gemstones.map((gem, index) => (
                <ProductCard key={gem.slug} product={gem} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Quality & Sourcing Spotlight */}
        <section className="border-b border-border bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Gemological Discipline
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-forest-deep">
                Rigorous inspection under standardized 5500K daylight.
              </h2>
              <p className="text-sm leading-relaxed text-stone md:text-base">
                Gemstones cannot be judged under casual lighting. At our Bangkok facility, all rough
                lots and cut stones undergo multi-point gemological examination: hydrostatic
                density testing, refractive index verification, polariscope analysis, and immersion
                microscopy.
              </p>
              <p className="text-sm leading-relaxed text-stone">
                When independent verification is required, we facilitate direct testing through
                Bangkok&apos;s internationally recognized laboratories: The Gem and Jewelry
                Institute of Thailand (GIT), Lotus Gemology, and AIGS.
              </p>

              <div className="pt-2">
                <Link
                  href="/quality-sourcing"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-forest px-6 text-xs font-bold uppercase tracking-wider text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  Read Our Sourcing Standards
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:p-10 shadow-subtle space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                Commercial Standards Checklist
              </h3>
              <ul className="space-y-4 text-xs text-stone">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>
                    <strong>CIBJO Treatment Codes:</strong> Clear distinction between Natural Untreated (N),
                    Traditional Enhancement (E), and Significant Treatment (T).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>
                    <strong>Non-Fabrication Policy:</strong> We never invent mines, certification numbers,
                    or historical claims without documented proof.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>
                    <strong>48-Hour Trade Inspection:</strong> Verified wholesale buyers receive a
                    formal 48-hour inspection period upon parcel receipt.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>
                    <strong>Live Video Evaluation:</strong> Private video walkthroughs via WhatsApp
                    desk allow remote buyers to inspect lot parcel distributions.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: International Trade Call-to-Action */}
        <section className="bg-forest-deep py-16 sm:py-20 lg:py-24 text-white border-t border-forest-mid">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">
              Initiate Commercial Contact
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Discuss Your Gemstone Requirements
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-ivory/80 md:text-base">
              Whether you require parcel splits of commercial rough hessonite, stabilized turquoise
              slabs, or fine faceted rubellite tourmaline, our Bangkok trading desk provides prompt,
              documented quotations.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-forest-deep shadow-md hover:bg-champagne-light transition-all duration-200"
              >
                Contact Our Trading Desk
              </Link>
              <Link
                href="/gemstones"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-champagne/40 px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                Review Active Lots
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
