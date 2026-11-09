import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Video } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CatalogueGrid } from "@/components/gemstones/catalogue-grid";
import { getAllGemstones } from "@/data/gemstones";

export const metadata: Metadata = {
  title: "Gemstone Catalogue | Commercial Rough, Minerals & Cut Stones",
  description:
    "Explore LibraGems' verified physical inventory: commercial-quality rough Hessonite garnet, stabilized turquoise, and precision-cut Afghanistan rubellite tourmaline.",
  alternates: {
    canonical: "https://libragems.net/gemstones",
  },
  openGraph: {
    title: "Gemstone Catalogue | LibraGems Bangkok",
    description:
      "Physical gemstone parcels and cut stones held in Bang Rak, Bangkok. CIBJO treatment disclosures and laboratory memo options.",
    url: "https://libragems.net/gemstones",
    siteName: "LibraGems",
    type: "website",
  },
};

export default function GemstonesCataloguePage() {
  const gemstones = getAllGemstones();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue" },
  ];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "LibraGems Commercial Gemstone Catalogue",
    description: "Curated wholesale gemstone offerings from Bangkok trading desk.",
    url: "https://libragems.net/gemstones",
    hasPart: gemstones.map((g) => ({
      "@type": "Product",
      name: g.name,
      url: `https://libragems.net/gemstones/${g.slug}`,
      category: g.form,
      description: g.shortDescription,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Header Hero */}
        <section className="border-b border-border bg-beige py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-4 max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Current Physical Inventory
              </span>
              <h1 className="font-serif text-4xl font-medium leading-tight text-forest-deep sm:text-5xl md:text-6xl">
                Selected Gemstone Offerings
              </h1>
              <p className="text-base leading-relaxed text-stone md:text-lg">
                Carefully evaluated commercial parcels and cut gems held at our Bang Rak facility in
                Bangkok. Every offering is documented with gemological parameters, CIBJO treatment
                codes, and verified cutting yields.
              </p>
            </div>
          </div>
        </section>

        {/* Catalogue Content Area */}
        <section className="border-b border-border bg-ivory py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <CatalogueGrid initialGemstones={gemstones} />

            {/* Trade Inquiries Notice Box */}
            <div className="mt-16 grid gap-6 rounded-2xl border border-border bg-white p-8 md:grid-cols-2 shadow-subtle">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-forest-deep font-serif text-xl font-medium">
                  <ShieldCheck className="h-5 w-5 text-forest" />
                  <span>Parcel Splits &amp; Custom Sieve Selections</span>
                </div>
                <p className="text-xs leading-relaxed text-stone">
                  We accommodate wholesale buyers requiring specific sieve size sorting or minimum
                  order quantities (MOQ). Parcel splits are weighed and sealed in our Bangkok
                  office under standardized optical daylight inspection.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-forest-deep font-serif text-xl font-medium">
                  <Video className="h-5 w-5 text-forest" />
                  <span>Private Remote Video Walkthroughs</span>
                </div>
                <p className="text-xs leading-relaxed text-stone">
                  Overseas dealers can arrange a scheduled video inspection session with our trading
                  desk to examine parcel color distribution, internal clarity, and surface texture in
                  real time before booking courier dispatch.
                </p>
              </div>
            </div>

            {/* Custom Sourcing Callout Banner */}
            <div className="mt-12 rounded-2xl bg-forest-deep p-8 text-white md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-xl space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-champagne">
                    Custom Wholesale Inquiries
                  </span>
                  <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                    Seeking specific rough materials or calibrated sizes?
                  </h3>
                  <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                    Our Bangkok acquisition network can source specific mineral species, alluvial
                    lots, or high-volume calibrated stone beads through established trade channels.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-champagne px-8 text-xs font-semibold uppercase tracking-wider text-forest-deep hover:bg-white transition-colors"
                >
                  Submit Sourcing Brief
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
