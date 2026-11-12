import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
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
  title: "Curated Wholesale Faceted Tourmaline & Garnet Suite Lot | Libra Gems",
  description:
    "Curated wholesale suite parcel comprising 12 precision-faceted colored gemstones (rubellite tourmaline and grossular garnet) calibrated for luxury jewelry manufacturing.",
  path: "/gemstones/wholesale-tourmaline-lot",
});

export default function WholesaleTourmalineLotPage() {
  const product = getGemstoneBySlug("wholesale-tourmaline-lot");
  if (!product) notFound();

  const otherProducts = getAllGemstones().filter((g) => g.slug !== product.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue", href: "/gemstones" },
    { label: "Gemstone Lots", href: "/gemstones/gemstone-lots" },
    { label: product.name },
  ];

  return (
    <>
      <JsonLd data={[createGemstoneProductSchema(product), createBreadcrumbSchema(breadcrumbs)]} />
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-16">
        {/* Breadcrumb Strip */}
        <div className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Product Hero Dossier */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-16">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Image Gallery (7 cols) */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Commercial Lot Summary Pane (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Badge + Reference Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold tracking-wider text-forest">
                  Lot Ref: {product.lotReference}
                </span>
                <Badge variant="untreated" className="text-xs font-semibold py-1 px-3">
                  CIBJO Code {product.treatment.cibjoCode} • {product.treatment.name}
                </Badge>
              </div>

              {/* Title Block */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                  {product.species} • {product.form}
                </span>
                <h1 className="mt-1 font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest-deep leading-tight">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {product.subtitle}
                </p>
              </div>

              {/* Quick Specification Strip */}
              <div className="rounded-xl border border-border bg-ivory p-4 shadow-subtle">
                <dl className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-stone/80">Origin</dt>
                    <dd className="font-bold text-forest-deep mt-0.5">{product.origin.country}</dd>
                    <dd className="text-[11px] text-stone mt-0.5">{product.origin.region}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-stone/80">Acquisition Terms</dt>
                    <dd className="font-bold text-forest-deep mt-0.5">{product.moq}</dd>
                    <dd className="text-[11px] text-stone mt-0.5">{product.lotWeight}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-stone/80">Dimensions / Sieve</dt>
                    <dd className="font-bold text-forest-deep mt-0.5">{product.dimensionsOrSieve}</dd>
                    <dd className="text-[11px] text-stone mt-0.5">{product.cutStyle}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-stone/80">Laboratory Testing</dt>
                    <dd className="font-bold text-forest-deep mt-0.5">Available on Request</dd>
                    <dd className="text-[11px] text-stone mt-0.5">GIT / AIGS Bangkok</dd>
                  </div>
                </dl>
              </div>

              {/* Direct Actions: WhatsApp + Jump to Enquiry */}
              <div className="space-y-3 pt-2">
                <WhatsAppCta
                  productTitle={product.name}
                  lotReference={product.lotReference}
                  className="w-full justify-center shadow-md min-h-[48px]"
                />
                <a
                  href="#enquire-form"
                  className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-forest-deep bg-ivory px-6 text-xs font-bold uppercase tracking-wider text-forest-deep hover:bg-forest-deep hover:text-white transition-all shadow-subtle"
                >
                  Request Lot Dossier &amp; Terms
                </a>
              </div>

              {/* Ethics and Handling Guarantee */}
              <div className="flex items-start gap-3 rounded-lg border border-border/80 bg-offwhite p-3.5 text-xs text-stone">
                <Scale className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-forest-deep font-semibold">Wholesale Lot Verification:</strong> 12 calibrated precision-faceted gemstones hand-sorted in Bangkok. Complete stone-by-stone breakdown provided with commercial invoice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Specifications & Geological Overview */}
        <section className="border-t border-b border-border bg-ivory py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Left Column: Comprehensive Gemological Spec Table (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                    Verified Parameters
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-deep mt-1">
                    Gemological Dossier
                  </h2>
                </div>
                <SpecTable product={product} />
              </div>

              {/* Right Column: Geological & Lapidary Context (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-forest-deep border-b border-border pb-3">
                    Overview &amp; Lot Composition
                  </h3>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone">
                    {product.fullOverview}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-forest-deep border-b border-border pb-3">
                    Regional Provenance &amp; Sorting
                  </h3>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone">
                    {product.geologicalContext}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-forest-deep border-b border-border pb-3">
                    Commercial Applications
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-stone">
                    {product.commercialApplications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section id="enquire-form" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                Direct Trading Desk Inquiry
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-deep">
                Inquire on Lot {product.lotReference}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-stone">
                Our Bangkok trading desk responds to qualified trade inquiries within one business day.
                Provide your targeted terms, laboratory memo requirements, or shipping preference.
              </p>
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm initialGemstone={`${product.name} (${product.lotReference})`} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-offwhite py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                Trading Desk Clarifications
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-deep mt-1">
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion items={product.faqs} />
          </div>
        </section>

        {/* Related Offerings */}
        {otherProducts.length > 0 && (
          <section className="border-t border-border bg-ivory py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                    Complementary Inventory
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-forest-deep mt-1">
                    Related Gemstone Holdings
                  </h2>
                </div>
                <Link
                  href="/gemstones"
                  className="text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-deep"
                >
                  View Full Catalogue &rarr;
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherProducts.slice(0, 3).map((gem) => (
                  <ProductCard key={gem.slug} product={gem} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sticky Mobile Action Bar */}
        <StickyMobileActionBar
          productTitle={product.name}
          lotReference={product.lotReference}
        />
      </main>

      <SiteFooter />
    </>
  );
}
