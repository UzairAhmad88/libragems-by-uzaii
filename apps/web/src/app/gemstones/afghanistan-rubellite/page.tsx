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
  title: "Afghanistan Cut Rubellite Tourmaline | Precision Faceted Gems | Libra Gems",
  description:
    "Fine precision-cut Afghanistan rubellite tourmaline featuring vivid purplish-red saturation and custom oval mixed faceting. Independent Bangkok laboratory memo available.",
  path: "/gemstones/afghanistan-rubellite",
});

export default function AfghanistanRubellitePage() {
  const product = getGemstoneBySlug("afghanistan-rubellite");
  if (!product) notFound();

  const otherProducts = getAllGemstones().filter((g) => g.slug !== product.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Catalogue", href: "/gemstones" },
    { label: "Afghanistan Cut Rubellite" },
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
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">
                  Trade Provenance: {product.origin.country}
                </Badge>
                <Badge variant="default">Ref: {product.lotReference}</Badge>
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
                  <span className="text-stone">Cut Style</span>
                  <span className="font-medium text-forest-deep">{product.cutStyle}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs">
                  <span className="text-stone">Color Saturation</span>
                  <span className="font-medium text-forest-deep">{product.colorTone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs">
                  <span className="text-stone">Optical Scintillation</span>
                  <span className="font-medium text-forest-deep">Strong Dichroic Red Flash</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone">Origin Protocol</span>
                  <span className="font-medium text-forest-deep">
                    Kunar/Nuristan Pegmatites (Lab Memo Pending)
                  </span>
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
                  <span>Submit Written Inquiry on This Stone</span>
                </Link>
              </div>

              {/* Origin Substantiation Protocol Notice (ADR-04) */}
              <div className="rounded-xl border border-border/70 bg-ivory p-4 text-xs text-stone space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-forest-deep">
                  <Scale className="h-4 w-4 shrink-0 text-champagne" />
                  <span>Origin Substantiation Protocol (ADR-04)</span>
                </div>
                <p className="leading-relaxed text-[11px] text-stone">
                  In compliance with our strict non-fabrication standard, definitive geographic
                  origin claims require independent laboratory spectroscopy. Prior to final sale,
                  this stone can be delivered with a full identification memo from GIT, Lotus
                  Gemology, or AIGS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gemological Specs & Editorial Analysis */}
        <section className="border-t border-border bg-offwhite py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Gemological Specs Table */}
            <div className="max-w-4xl mx-auto">
              <SpecTable product={product} />
            </div>

            {/* Editorial Geological & Lapidary Context */}
            <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle space-y-3">
                <h3 className="font-heading text-xl font-bold text-forest-deep">
                  Pegmatite Geological Source
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  {product.geologicalContext}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle space-y-3">
                <h3 className="font-heading text-xl font-bold text-forest-deep">
                  Lapidary Faceting &amp; Pleochroism
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  {product.lapidaryCharacteristics}
                </p>
              </div>
            </div>

            {/* Commercial Applications Checklist */}
            <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle">
              <h3 className="font-heading text-xl font-bold text-forest-deep">
                Recommended Commercial Applications
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-stone">
                {product.commercialApplications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne shrink-0 mt-1.5 inline-block" />
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
                  Commercial inquiries regarding laboratory certification, clarity grade, and Afghan provenance.
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
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

              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
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
