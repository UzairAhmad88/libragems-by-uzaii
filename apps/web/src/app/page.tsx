import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, Sparkles, MapPin, Compass, Gem } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductCard } from "@/components/gemstones/product-card";
import { getAllGemstones } from "@/data/gemstones";

export const metadata: Metadata = {
  title: "LibraGems | International Gemstone Trading & Sourcing | Bangkok",
  description:
    "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems.",
  alternates: {
    canonical: "https://libragems.net",
  },
  openGraph: {
    title: "LibraGems | International Gemstone Trading & Sourcing",
    description:
      "Commercial rough stones, mineral specimens, and fine cut colored gems sourced and traded directly from Bangkok's historic gemstone nexus.",
    url: "https://libragems.net",
    siteName: "LibraGems",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LibraGems | International Gemstone Trading",
    description:
      "B2B gemstone trading platform based in Bang Rak, Bangkok. Rough parcel lots, mineral specimens, and cut colored gems.",
  },
};

export default function HomePage() {
  const gemstones = getAllGemstones();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Libra Gems & Trading Co., Ltd.",
    alternateName: "LibraGems",
    url: "https://libragems.net",
    logo: "https://libragems.net/images/gemstones/hero-editorial-inventory.svg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1394 Charoen Krung Road",
      addressLocality: "Bang Rak",
      addressRegion: "Bangkok",
      postalCode: "10500",
      addressCountry: "TH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@libragems.net",
      contactType: "trading desk",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Thai"],
    },
    knowsAbout: [
      "Gemstone Trading",
      "Rough Gemstones",
      "Hessonite Garnet",
      "Turquoise",
      "Rubellite Tourmaline",
      "CIBJO Treatment Disclosure",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Section 1: Editorial Hero */}
        <section className="relative border-b border-border bg-beige py-20 lg:py-28 overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-ivory/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                <Compass className="h-3.5 w-3.5" />
                <span>International B2B Gemstone Trading • Bangkok</span>
              </div>

              <h1 className="font-serif text-4xl font-medium leading-[1.12] text-forest-deep sm:text-5xl md:text-6xl lg:text-7xl">
                A considered approach to natural gemstones.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-stone md:text-lg">
                Sourcing, evaluating, and supplying commercial-quality rough stones, mineral
                specimens, and precision-cut colored gems directly from Bangkok&apos;s historic
                gemological trading district. Built on gemological rigor, transparent treatment
                disclosure, and long-term wholesale relationships.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/gemstones"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-forest px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep focus-visible:outline-champagne transition-all duration-200"
                >
                  Explore Gemstones
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-forest/60 bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-forest hover:bg-forest hover:text-white focus-visible:outline-champagne transition-all duration-200"
                >
                  Contact LibraGems
                </Link>
              </div>

              {/* Trust Micro-Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/70 text-xs text-stone">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
                  <span>CIBJO Treatment Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-forest shrink-0" />
                  <span>Bangkok Lab Memos</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <MapPin className="h-4 w-4 text-forest shrink-0" />
                  <span>Bang Rak Trading Desk</span>
                </div>
              </div>
            </div>

            {/* Architectural Studio Photo / Inventory Visual */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-ivory shadow-card">
                <Image
                  src="/images/gemstones/hero-editorial-inventory.svg"
                  alt="Architectural overview of LibraGems gemstone inventory archive"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone px-1">
                <span>Bangkok Inventory Archive</span>
                <span className="text-forest font-medium">Stock Photography Prohibited (ADR-13)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Credibility & Trading Pillars */}
        <section className="border-b border-border bg-ivory py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                The Bangkok Trading Nexus
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-forest-deep sm:text-4xl md:text-5xl">
                Rooted in Bangkok. Connected Worldwide.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone md:text-base">
                For over a century, Bangkok has operated as the world&apos;s preeminent trading and
                treatment hub for colored gemstones. Operating from Charoen Krung Road in Bang Rak,
                Libra Gems &amp; Trading Co., Ltd. connects international lapidaries, jewelry
                manufacturers, and gemstone connoisseurs to genuine physical inventory held in Thailand.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-subtle transition-all duration-200 hover:-translate-y-1 hover:border-champagne">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Gem className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium text-forest-deep">
                  Commercial Rough Lots
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  Direct parcel acquisitions curated for cutting factories and lapidary ateliers.
                  Consistent sizing, honest cutting yields, and transparent internal character
                  disclosures.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-8 shadow-subtle transition-all duration-200 hover:-translate-y-1 hover:border-champagne">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium text-forest-deep">
                  Faceted Single Stones
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  Precision-cut single stones and matched suites proportioned for maximum brilliance
                  and optical scintillation, accompanied by accredited Bangkok gemological memos.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-8 shadow-subtle transition-all duration-200 hover:-translate-y-1 hover:border-champagne">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium text-forest-deep">
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

        {/* Section 3: Featured Launch Gemstones */}
        <section className="border-b border-border bg-beige/50 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                  Verified Physical Holdings
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium text-forest-deep sm:text-4xl md:text-5xl">
                  Featured Gemstone Materials
                </h2>
                <p className="mt-2 text-xs text-stone md:text-sm">
                  Initial curated offerings available for wholesale parcel acquisition and private inspection.
                </p>
              </div>
              <Link
                href="/gemstones"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-forest-deep transition-colors"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {gemstones.map((gem, index) => (
                <ProductCard key={gem.slug} product={gem} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Quality & Sourcing Spotlight */}
        <section className="border-b border-border bg-white py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Gemological Discipline
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight text-forest-deep sm:text-4xl md:text-5xl">
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
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-forest px-6 text-xs font-semibold uppercase tracking-wider text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  Read Our Sourcing Standards
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-ivory p-8 md:p-10 shadow-subtle space-y-6">
              <h3 className="font-serif text-2xl font-medium text-forest-deep">
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
        <section className="bg-forest-deep py-20 text-white lg:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              Initiate Commercial Contact
            </span>
            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
              Discuss Your Gemstone Requirements
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Whether you require parcel splits of commercial rough hessonite, stabilized turquoise
              slabs, or fine faceted rubellite tourmaline, our Bangkok trading desk provides prompt,
              documented quotations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-8 text-xs font-semibold uppercase tracking-wider text-forest-deep shadow-md hover:bg-white transition-all duration-200"
              >
                Contact Our Trading Desk
              </Link>
              <Link
                href="/gemstones"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 px-8 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
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
