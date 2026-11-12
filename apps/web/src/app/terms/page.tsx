import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Trade | LibraGems Bangkok",
  description:
    "Commercial Terms of Trade governing wholesale gemstone inquiries, quotations, treatment disclosures, and export procedures for Libra Gems & Trading Co., Ltd.",
  path: "/terms",
});

export default function TermsOfTradePage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms of Trade" },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <div className="border-b border-border bg-beige/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* Draft Notice Banner */}
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">
                Draft Document Notice — Subject to Formal Legal Review
              </p>
              <p className="mt-1 leading-relaxed text-amber-900/80">
                This document represents an operational draft outlining wholesale trading terms for
                LibraGems. Formal contractual agreements are executed via proforma invoices and trade
                contracts tailored to specific parcel shipments.
              </p>
            </div>
          </div>

          <header className="border-b border-border pb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
              Wholesale Commercial Conditions
            </span>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-forest-deep sm:text-4xl md:text-5xl">
              Terms of Trade (B2B)
            </h1>
            <p className="mt-2 text-xs text-stone">
              Entity: Libra Gems &amp; Trading Co., Ltd. • Last revised: November 2026
            </p>
          </header>

          <div className="prose prose-stone mt-8 max-w-none text-xs leading-relaxed text-ink/90 space-y-6">
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                1. Scope of Commercial Operations
              </h2>
              <p className="text-stone">
                These Terms of Trade govern commercial inquiries, product evaluations, and parcel
                acquisitions initiated with <strong>Libra Gems &amp; Trading Co., Ltd.</strong> (Bangkok,
                Thailand). All offerings presented on libragems.net are targeted strictly at commercial
                dealers, jewelry manufacturers, lapidary workshops, and accredited collectors. We do not
                conduct consumer retail sales or provide retail credit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                2. Price on Application (POA) and Commercial Quotations
              </h2>
              <p className="text-stone">
                Due to market fluctuations in wholesale colored gemstone parcels, variable sieve yields,
                and currency dynamics, prices are not listed publicly. Quotations are provided upon
                direct inquiry and remain valid for seven (7) business days from transmission, unless
                explicitly stated otherwise in writing on the formal Proforma Invoice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                3. Gemstone Treatment Disclosures (CIBJO Adherence)
              </h2>
              <p className="text-stone">
                LibraGems adheres strictly to the World Jewellery Confederation (CIBJO) disclosure
                standards. Every quotation, invoice, and bill of sale documents the applicable CIBJO
                enhancement code:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone">
                <li>
                  <strong>Code N (Natural Untreated):</strong> Wholly natural, unaltered minerals.
                </li>
                <li>
                  <strong>Code E (Traditional Enhancement):</strong> Accepted industry heating or oiling.
                </li>
                <li>
                  <strong>Code T (Significant Treatment):</strong> Material interventions including
                  polymer stabilization in porous turquoise.
                </li>
              </ul>
              <p className="text-stone">
                Buyers acknowledge that stabilized rough represents reinforced natural mineral material,
                fully disclosed prior to quotation acceptance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                4. Geographic Origin &amp; Laboratory Reports
              </h2>
              <p className="text-stone">
                Where geographic provenance is cited based on trade consensus (e.g. Afghan rubellite or
                Sri Lankan hessonite), formal certification of origin is contingent on independent
                laboratory testing. Buyers may request that parcels or faceted single gems be submitted
                to GIT, Lotus Gemology, or AIGS in Bangkok prior to export dispatch. Laboratory fees are
                stipulated on the proforma invoice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                5. Inspection Window and Commercial Returns
              </h2>
              <p className="text-stone">
                Verified trade buyers are granted a forty-eight (48) hour inspection period commencing
                upon signed courier delivery of the parcel. During this period:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone">
                <li>The parcel security tamper seal must remain intact if a return is requested.</li>
                <li>No rough specimens may be sliced, cut, polished, chemically tested, or altered.</li>
                <li>
                  Return shipping and full insurance must be pre-authorized and covered by the buyer.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                6. Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-stone">
                All commercial agreements and transactions are governed by the laws of the Kingdom of
                Thailand. Any dispute arising from wholesale contracts that cannot be resolved amicably
                shall be subject to the exclusive jurisdiction of the competent courts of Bangkok,
                Thailand.
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
