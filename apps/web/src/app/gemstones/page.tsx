import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Video } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CatalogueGrid } from "@/components/gemstones/catalogue-grid";
import { getAllGemstones } from "@/data/gemstones";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createCollectionPageSchema, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Gemstone Catalogue | Commercial Rough, Minerals & Cut Stones",
  description:
    "Explore LibraGems' verified physical inventory: commercial-quality rough Hessonite garnet, stabilized turquoise, and precision-cut Afghanistan rubellite tourmaline.",
  path: "/gemstones",
});

export default function GemstonesCataloguePage() {
  const gemstones = getAllGemstones();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue" },
  ];

  return (
    <>
      <JsonLd data={[createCollectionPageSchema(gemstones), createBreadcrumbSchema(breadcrumbs)]} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Header Hero (Deep Forest Green) */}
        <section className="border-b border-forest-mid bg-forest-deep py-12 sm:py-16 lg:py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-ivory/70 [&_a]:text-ivory/80 [&_a:hover]:text-champagne [&_span]:text-champagne">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="mt-6 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">
                Current Physical Inventory
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Selected Gemstone Offerings
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-ivory/85 md:text-lg">
                Carefully evaluated commercial parcels and cut gems held at our Bang Rak facility in
                Bangkok. Every offering is documented with gemological parameters, CIBJO treatment
                codes, and verified cutting yields.
              </p>
            </div>
          </div>
        </section>

        {/* Catalogue Content Area (Off-White Background) */}
        <section className="border-b border-border bg-offwhite py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CatalogueGrid initialGemstones={gemstones} />

            {/* Trade Inquiries Notice Box */}
            <div className="mt-12 sm:mt-16 grid gap-6 rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:grid-cols-2 shadow-subtle">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-forest-deep font-heading text-base sm:text-lg font-bold">
                  <ShieldCheck className="h-5 w-5 text-forest shrink-0" />
                  <span>Parcel Splits &amp; Custom Sieve Selections</span>
                </div>
                <p className="text-xs leading-relaxed text-stone">
                  We accommodate wholesale buyers requiring specific sieve size sorting or minimum
                  order quantities (MOQ). Parcel splits are weighed and sealed in our Bangkok
                  office under standardized optical daylight inspection.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-forest-deep font-heading text-base sm:text-lg font-bold">
                  <Video className="h-5 w-5 text-forest shrink-0" />
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
            <div className="mt-10 sm:mt-12 rounded-2xl bg-forest-deep p-6 sm:p-8 md:p-12 text-white border border-champagne/30 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                    Custom Wholesale Inquiries
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold">
                    Seeking specific rough materials or calibrated sizes?
                  </h3>
                  <p className="text-xs leading-relaxed text-ivory/80 sm:text-sm">
                    Our Bangkok acquisition network can source specific mineral species, alluvial
                    lots, or high-volume calibrated stone beads through established trade channels.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-champagne px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-forest-deep hover:bg-champagne-light transition-colors shadow-md"
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
