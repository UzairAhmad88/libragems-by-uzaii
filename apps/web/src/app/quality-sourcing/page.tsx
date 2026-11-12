import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Quality & Sourcing Standards | Gemological Discipline",
  description:
    "Discover LibraGems' gemological testing protocols, CIBJO ethical treatment disclosure standards, and Bangkok laboratory memo procedures.",
  path: "/quality-sourcing",
});

export default function QualitySourcingPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Quality & Sourcing" },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Editorial Hero (Deep Forest Green) */}
        <section className="border-b border-forest-mid bg-forest-deep py-12 sm:py-16 lg:py-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-ivory/70 [&_a]:text-ivory/80 [&_a:hover]:text-champagne [&_span]:text-champagne">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="mt-6 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">
                Gemological Governance &amp; Ethics
              </span>
              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Gemological discipline and transparent sourcing.
              </h1>
              <p className="text-sm leading-relaxed text-ivory/85 md:text-base lg:text-lg">
                At Libra Gems &amp; Trading Co., Ltd., we believe commercial confidence is built on
                verifiable physical data rather than romanticized sales narratives. Here is how we
                evaluate, categorize, and document every gemstone parcel we trade.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: The Bangkok Inspection Standard */}
        <section className="border-b border-border bg-ivory py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Testing Methodology
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-forest-deep sm:text-3xl md:text-4xl lg:text-5xl">
                The Multi-Point Evaluation Process
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-stone md:text-sm">
                Every incoming lot in our Bangkok trading office is subjected to standardized gemological
                procedures under calibrated D65 (5500K) daylight lighting conditions.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-champagne">
                  Phase 01
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-forest-deep">
                  Hydrostatic Weighing
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Accurate specific gravity (SG) determination distinguishes mineral species and
                  detects heavy-element doping, porosity variations, and polymer impregnations.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-champagne">
                  Phase 02
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-forest-deep">
                  Immersion Microscopy
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Gemological microscopes with darkfield, brightfield, and polarized immersion cells
                  reveal internal growth structures, dissolution tubes, and diagnostic inclusion suites.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-champagne">
                  Phase 03
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-forest-deep">
                  Refractometry &amp; ADR
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Critical angle refractometry verifies optical single vs double refraction,
                  birefringence indices, and diagnostic anomalous double refraction (ADR) in garnets.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-champagne">
                  Phase 04
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-forest-deep">
                  Daylight Standard (D65)
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  All color evaluations are conducted exclusively under standardized 5500K daylight
                  lamps to prevent incandescent color shifts or deceptive ultraviolet fluorescence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: CIBJO Treatment Disclosure Protocol */}
        <section className="border-b border-border bg-offwhite py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                International Standards
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-forest-deep sm:text-3xl md:text-4xl lg:text-5xl">
                CIBJO Ethical Disclosure Protocol
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-stone md:text-sm">
                We adhere strictly to the World Jewellery Confederation (CIBJO) Gemstone Book
                standards. Every invoice, parcel tag, and commercial memo explicitly states the
                enhancement status using standardized trade codes.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle space-y-4">
                <div className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                  CIBJO Code N
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                  Natural Untreated
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Gemstones that have received no enhancement, heat, irradiation, or chemical
                  modification whatsoever beyond cutting and polishing.
                </p>
                <div className="border-t border-border pt-4 text-xs font-medium text-forest">
                  Example: Rough Hessonite Garnet (LG-HG-001)
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle space-y-4">
                <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 border border-blue-200">
                  CIBJO Code E
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                  Traditional Enhancement
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Stones that have undergone traditional thermal processes widely accepted in the
                  gem trade (e.g. routine low-temperature heating in corundum or tourmaline).
                </p>
                <div className="border-t border-border pt-4 text-xs font-medium text-forest">
                  Example: Gentle trade heating in select tourmalines
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 shadow-subtle space-y-4">
                <div className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900 border border-amber-200">
                  CIBJO Code T
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                  Significant Treatment
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  Stones that have undergone material interventions such as polymer stabilization,
                  resins, or fracture fillings. Requires mandatory written disclosure on every document.
                </p>
                <div className="border-t border-border pt-4 text-xs font-medium text-forest">
                  Example: Stabilized Commercial Turquoise (LG-TQ-001)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Independent Bangkok Laboratories */}
        <section className="border-b border-border bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                  Third-Party Verification
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-forest-deep md:text-4xl">
                  Accredited Gemological Laboratory Affiliations
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-stone md:text-base">
                  Bangkok hosts premier independent gemological testing facilities equipped with
                  advanced Raman spectrometry, FTIR, and Laser Ablation ICP-MS trace-element
                  analysis.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-stone">
                  Prior to settlement and export dispatch, wholesale buyers may commission an
                  independent gemological memo from the Bangkok institution of their choice:
                </p>

                <ul className="space-y-3 text-xs text-stone">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest mt-0.5" />
                    <span>
                      <strong>GIT (The Gem and Jewelry Institute of Thailand):</strong> Thailand&apos;s
                      national gemological laboratory under the Ministry of Commerce.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest mt-0.5" />
                    <span>
                      <strong>Lotus Gemology:</strong> World-renowned specialists in colored stone
                      inclusion analysis and natural color identification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest mt-0.5" />
                    <span>
                      <strong>AIGS (Asian Institute of Gemological Sciences):</strong> Asia&apos;s
                      foundational gemological educational and testing body.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-6 sm:p-8 md:p-10 shadow-subtle space-y-6">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                  Commercial 48-Hour Inspection Policy
                </h3>
                <p className="text-xs leading-relaxed text-stone">
                  We recognize that wholesale lapidary buyers require verification in their own
                  facilities. For approved corporate accounts, LibraGems operates under a formal
                  commercial return policy:
                </p>
                <div className="space-y-3.5 border-t border-border pt-4 text-xs text-stone">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-champagne mt-0.5">01</span>
                    <span>
                      <strong>48-Hour Inspection Window:</strong> Trade buyers have 48 hours from
                      confirmed delivery to verify parcel weight, sieve size, and inclusion distribution.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-champagne mt-0.5">02</span>
                    <span>
                      <strong>Intact Seal Protection:</strong> Parcel seals must remain untampered if a
                      full return is requested.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-champagne mt-0.5">03</span>
                    <span>
                      <strong>Insured International Transit:</strong> All export consignments are
                      cleared through Thai Customs with comprehensive transit insurance.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Bottom CTA */}
        <section className="bg-forest-deep py-12 sm:py-16 text-white border-t border-forest-mid">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              Require Laboratory Memos for Your Order?
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-ivory/80 md:text-sm">
              Our trading desk coordinates directly with Bangkok gemological laboratories to arrange
              pre-export certification for parcels and faceted cut stones.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-forest-deep hover:bg-champagne-light transition-colors shadow-md"
              >
                Inquire on Certification Options
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
