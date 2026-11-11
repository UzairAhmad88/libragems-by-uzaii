import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductGallery } from "@/components/gemstones/product-gallery";
import { SpecTable } from "@/components/gemstones/spec-table";
import { WhatsAppCta } from "@/components/gemstones/whatsapp-cta";
import { StickyMobileActionBar } from "@/components/gemstones/sticky-mobile-action-bar";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ProductCard } from "@/components/gemstones/product-card";
import { Badge } from "@/components/ui/badge";
import { getGemstoneBySlug, getAllGemstones } from "@/data/gemstones";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createGemstoneProductSchema, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial-Quality Turquoise | Rough Nodules & Slabs LG-TQ-001",
  description:
    "Commercial-quality stabilized turquoise rough nodules and slabs (12.5 kg lot). Spiderweb limonite matrix material conforming strictly to CIBJO Code T disclosure.",
  path: "/gemstones/turquoise",
});

export default function TurquoisePage() {
  const product = getGemstoneBySlug("turquoise");
  if (!product) notFound();

  const otherProducts = getAllGemstones().filter((g) => g.slug !== product.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue", href: "/gemstones" },
    { label: "Commercial-Quality Turquoise" },
  ];

  return (
    <>
      <JsonLd data={[createGemstoneProductSchema(product), createBreadcrumbSchema(breadcrumbs)]} />
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-16">
        {/* Breadcrumb Strip */}
        <div className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Product Hero Dossier */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Image Gallery (7 cols) */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Commercial Lot Summary Pane (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="stabilized">
                  {product.treatment.name} (Code {product.treatment.cibjoCode})
                </Badge>
                <Badge variant="accent">Lot Ref: {product.lotReference}</Badge>
                <Badge variant="default">{product.form}</Badge>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-forest-deep sm:text-4xl md:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-forest">
                  {product.tradeTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {product.subtitle}
                </p>
              </div>

              {/* Commercial Key Highlights */}
              <div className="rounded-xl border border-border bg-ivory p-5 shadow-subtle space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs">
                  <span className="text-stone">Parcel Availability</span>
                  <span className="font-medium text-forest-deep tabular-nums">
                    {product.lotWeight}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs">
                  <span className="text-stone">Piece Sizing</span>
                  <span className="font-medium text-forest-deep">
                    {product.dimensionsOrSieve}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs">
                  <span className="text-stone">Minimum Order (MOQ)</span>
                  <span className="font-medium text-forest-deep tabular-nums">{product.moq}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone">Matrix Character</span>
                  <span className="font-medium text-forest-deep">Spiderweb Limonite</span>
                </div>
              </div>

              {/* WhatsApp Action & Direct Inquiries */}
              <div className="space-y-3 pt-2">
                <WhatsAppCta
                  productTitle={product.name}
                  lotReference={product.lotReference}
                />
                <Link
                  href={`/contact?gemstone=${encodeURIComponent(product.lotReference)}`}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-forest bg-forest/5 px-6 text-xs font-bold uppercase tracking-wider text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  <span>Submit Written Lot Inquiry</span>
                </Link>
              </div>

              {/* Mandatory Treatment Disclosure Banner */}
              <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-950 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" />
                  <span>Mandatory CIBJO Code T Treatment Disclosure</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-900/80">
                  This commercial turquoise rough is polymer-stabilized. Stabilization fills
                  micro-capillaries to prevent perspiration staining and structural cracking during
                  diamond saw lapidary cutting. Full written disclosure is included on all export
                  invoices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gemological Specs & Editorial Analysis */}
        <section className="border-t border-border bg-offwhite py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            {/* Gemological Specs Table */}
            <div className="max-w-4xl mx-auto">
              <SpecTable product={product} />
            </div>

            {/* Treatment Disclosure Deep-Dive Callout */}
            <div className="max-w-4xl mx-auto rounded-2xl border border-champagne/50 bg-ivory p-8 md:p-10 shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                The Science of Stabilization
              </span>
              <h3 className="font-heading text-2xl font-bold text-forest-deep sm:text-3xl">
                Why Commercial Turquoise Is Stabilized (CIBJO Code T)
              </h3>
              <p className="text-sm leading-relaxed text-stone">
                Natural turquoise is a hydrated basic copper aluminum phosphate mineral that forms
                in cryptocrystalline aggregations. In its raw geological state, commercial-grade
                turquoise is inherently porous. Without stabilization, cutting oils, skin
                perspiration, and environmental moisture will penetrate the porous matrix over time,
                oxidizing copper ions and turning the vibrant sky-blue color into an uneven chalky green.
              </p>
              <p className="text-sm leading-relaxed text-stone">
                Under vacuum stabilization, colorless acrylic or epoxy resins are drawn into the
                micro-pores. This increases Mohs hardness from ~4.5 to 6.0, locks the limonite matrix
                firmly to the turquoise body, and ensures that calibrated cabochons can be cut and
                polished to a high vitreous sheen without fracturing.
              </p>
            </div>

            {/* Editorial Geological & Lapidary Context */}
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-ivory p-8 shadow-subtle space-y-3">
                <h3 className="font-heading text-xl font-bold text-forest-deep">
                  Geological Formation
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  {product.geologicalContext}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-8 shadow-subtle space-y-3">
                <h3 className="font-heading text-xl font-bold text-forest-deep">
                  Lapidary Working Yield
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  {product.lapidaryCharacteristics}
                </p>
              </div>
            </div>

            {/* Commercial Applications Checklist */}
            <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-ivory p-8 shadow-subtle">
              <h3 className="font-heading text-xl font-bold text-forest-deep">
                Recommended Commercial Applications
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-stone">
                {product.commercialApplications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buyer FAQs */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-forest-deep sm:text-3xl">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-stone">
                  Commercial inquiries regarding stabilization, matrix veining, and parcel inspection.
                </p>
              </div>
              <FaqAccordion items={product.faqs} />
            </div>

            {/* Inline Trade Enquiry Form */}
            <div className="max-w-3xl mx-auto pt-6">
              <EnquiryForm
                initialGemstone={`${product.name} (${product.lotReference})`}
              />
            </div>

            {/* Related Gemstones Strip */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-border">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest">
                    Explore Other Holdings
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-forest-deep">
                    Related Gemstone Materials
                  </h3>
                </div>
                <Link
                  href="/gemstones"
                  className="text-xs font-bold uppercase tracking-wider text-forest hover:text-champagne transition-colors"
                >
                  View All Materials →
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {otherProducts.map((gem) => (
                  <ProductCard key={gem.slug} product={gem} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Mobile Action Bar */}
      <StickyMobileActionBar
        productTitle={product.name}
        lotReference={product.lotReference}
      />

      <SiteFooter />
    </>
  );
}
