import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight, ShieldCheck, Scale, Boxes } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/gemstones/product-card";
import { getGemstoneLots } from "@/data/gemstones";
import { getCategoryBySlug } from "@/data/categories";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createCollectionPageSchema, createBreadcrumbSchema } from "@/lib/seo/json-ld";

const categoryDef = getCategoryBySlug("gemstone-lots")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Gemstone Lots | Wholesale Parcels & Commercial Collections | Libra Gems",
  description:
    "Discover curated gemstone lots held in Bangkok: wholesale rough hessonite garnet parcels, stabilized natural matrix turquoise slabs, and matched faceted tourmaline suites.",
  path: "/gemstones/gemstone-lots",
});

export default function GemstoneLotsPage() {
  const products = getGemstoneLots();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue", href: "/gemstones" },
    { label: "Gemstone Lots" },
  ];

  return (
    <>
      <JsonLd
        data={[
          createCollectionPageSchema(products, {
            title: "LibraGems Wholesale Gemstone Lots & Parcels",
            description: "Curated wholesale gemstone parcels, lots, and suites held in Bangkok.",
            path: "/gemstones/gemstone-lots",
          }),
          createBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Category Hero Section (Forest Deep) */}
        <section className="relative border-b border-forest-mid bg-forest-deep py-12 sm:py-16 lg:py-20 text-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-ivory/70 [&_a]:text-ivory/80 [&_a:hover]:text-champagne [&_span]:text-champagne">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-mid/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-champagne border border-champagne/30">
                  <Layers className="h-3.5 w-3.5 text-champagne" />
                  <span>Wholesale Commercial Parcels &amp; Suites</span>
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                  Gemstone Lots
                </h1>
                <p className="text-sm sm:text-base leading-relaxed text-ivory/85 md:text-lg">
                  {categoryDef.fullDescription}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-ivory/80">
                  <span className="flex items-center gap-1.5">
                    <Boxes className="h-4 w-4 text-champagne" />
                    <span>Calibrated Sieve &amp; Weight Tiers</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-champagne" />
                    <span>Custom Parcel Split Options</span>
                  </span>
                </div>
              </div>

              {/* Hero Image Frame */}
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-champagne/30 shadow-2xl bg-forest">
                <Image
                  src={categoryDef.heroImage}
                  alt="Wholesale gemstone parcel arranged on gemologist parcel paper under standardized inspection lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Area */}
        <section className="border-b border-border bg-offwhite py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-forest-deep">
                  Active Wholesale Lots &amp; Parcels
                </h2>
                <p className="text-xs text-stone mt-1">
                  Showing {products.length} commercial parcels and suites held at our Bangkok trading floor.
                </p>
              </div>

              <Link
                href="/gemstones/faceted-single-stones"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep transition-colors"
              >
                <span>Switch to Faceted Single Stones</span>
                <ArrowRight className="h-3.5 w-3.5 text-champagne" />
              </Link>
            </div>

            {/* Product Cards Grid */}
            <div className="mt-8 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((gem, idx) => (
                <ProductCard key={gem.slug} product={gem} priority={idx === 0} />
              ))}
            </div>

            {/* Inquiries Box */}
            <div className="mt-12 rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:grid-cols-2 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 text-forest-deep font-heading text-base sm:text-lg font-bold">
                  <ShieldCheck className="h-5 w-5 text-forest shrink-0" />
                  <span>Parcel Splits &amp; Volume Wholesale Contracts</span>
                </div>
                <p className="text-xs leading-relaxed text-stone">
                  Need a custom sieve selection or specific parcel split? Inquire with our trading
                  desk to discuss minimum order quantities, courier transit, and export documentation.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-champagne px-6 text-xs font-bold uppercase tracking-wider text-forest-deep hover:bg-champagne-light shadow-md transition-colors shrink-0"
              >
                Request Lot Quotation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
