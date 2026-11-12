import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "About Libra Gems | Gemstone Trading & Sourcing Bangkok",
  description:
    "Learn about Libra Gems & Trading Co., Ltd., based in Bangkok's historic Bang Rak gem trading district. Built on gemological rigor, CIBJO treatment disclosure, and verified physical inventory.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbItems)} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Page Hero (Deep Forest Green) */}
        <section className="border-b border-forest-mid bg-forest-deep py-12 sm:py-16 lg:py-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-ivory/70 [&_a]:text-ivory/80 [&_a:hover]:text-champagne [&_span]:text-champagne">
              <Breadcrumbs items={breadcrumbItems} />
            </div>

            <div className="mt-6 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">
                Corporate Profile &amp; Trading Philosophy
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Gemstone trading with integrity and geological precision.
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-ivory/85 md:text-lg">
                Operating from Bangkok&apos;s historic gemological quarter, Libra Gems &amp; Trading
                Co., Ltd. conducts international B2B commerce in rough gemstone parcels, aesthetic
                mineral specimens, calibrated stone beads, and precision-cut colored gems.
              </p>
            </div>
          </div>
        </section>

        {/* The Bangkok Trading Hub */}
        <section className="border-b border-border bg-ivory py-14 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Geographic Presence
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-forest-deep">
                The Charoen Krung Trading Nexus
              </h2>
              <p className="text-sm leading-relaxed text-stone md:text-base">
                Bangkok is not simply a transit point; it is the global nerve center of the colored
                gemstone industry. For over a century, the Bang Rak district along Charoen Krung
                Road has hosted the brokers, heat-treatment masters, and lapidary houses that refine
                the world&apos;s gemstone yield.
              </p>
              <p className="text-sm leading-relaxed text-stone">
                From our registered premises at <strong>1394 Charoen Krung Road</strong>, LibraGems
                acts as a primary interface for international dealers, independent jewelers, and
                cutting facilities seeking direct access to authentic physical lots without
                intermediary markup.
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-forest">
                <MapPin className="h-4 w-4 shrink-0 text-champagne" />
                <span>1394 Charoen Krung Road, Bang Rak, Bangkok 10500, Thailand</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-subtle space-y-4">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                The Principle of Non-Fabrication
              </h3>
              <p className="text-xs leading-relaxed text-stone">
                The gemstone industry has frequently suffered from romanticized marketing, unprovable
                mine-direct narratives, and disguised heat treatments. LibraGems operates under a
                foundational governance charter:
              </p>
              <ul className="space-y-3.5 text-xs text-ink/80 pt-2">
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-champagne mt-0.5">01</span>
                  <span>
                    <strong>Zero Mine-Direct Fiction:</strong> We never fabricate personal relationships
                    with remote artisanal miners unless verified by unbroken customs documentation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-champagne mt-0.5">02</span>
                  <span>
                    <strong>CIBJO Treatment Codes:</strong> All enhancements, stabilizations, and heat
                    treatments are explicitly disclosed on every proforma invoice.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-champagne mt-0.5">03</span>
                  <span>
                    <strong>No Speculative Guarantees:</strong> We sell natural geological materials on
                    their authentic physical merits, never promising investment appreciation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Trading Activities */}
        <section className="border-b border-border bg-offwhite py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Commercial Scope
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-forest-deep">
                Four Pillars of Supply
              </h2>
              <p className="mt-3 text-xs text-stone md:text-sm">
                Our inventory is divided into four distinct commercial divisions tailored to specific trade buyer requirements.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-ivory p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-champagne">
                  Division 01
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-forest-deep">
                  Rough Gemstones
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Alluvial and crystalline rough lots supplied to high-yield cutting factories in
                  Jaipur, Idar-Oberstein, and Chanthaburi. Cleanly graded by size, shape, and clarity.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-champagne">
                  Division 02
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-forest-deep">
                  Faceted Cut Stones
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Fine single gems and calibrated suites faceted in Bangkok lapidaries with strict
                  optical symmetry, certified by GIT, Lotus, or AIGS laboratory memos.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-champagne">
                  Division 03
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-forest-deep">
                  Mineral Specimens
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Natural crystal formations, nodular matrix rough, and geological specimens curated
                  for collectors, museums, and educational institutions worldwide.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-ivory p-5 sm:p-6 shadow-subtle hover:border-champagne transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-champagne">
                  Division 04
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-forest-deep">
                  Stone Beads &amp; Calibrated
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Volume calibrated shapes, cabochons, and polished beads manufactured for luxury
                  fashion houses and wholesale jewelry manufacturers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Management Contacts */}
        <section className="border-b border-border bg-ivory py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Leadership &amp; Trading Desk
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-forest-deep">
                Trading Desk Management
              </h2>
              <p className="mt-3 text-xs text-stone md:text-sm">
                Corporate management points of contact. Per our ADR-09 verification protocol, direct
                personal telephone extensions are pending formal client re-verification.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-deep text-champagne font-heading font-bold text-sm tracking-wider shrink-0 border border-champagne/30">
                    NK
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-forest-deep">Naeem Khan</h3>
                    <p className="text-xs text-stone">Executive Director &amp; Senior Trader</p>
                  </div>
                </div>
                <div className="border-t border-border pt-3 text-xs text-stone space-y-1">
                  <p>
                    <strong>Desk:</strong> Bang Rak Office, Bangkok
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@libragems.net" className="text-forest hover:underline">
                      info@libragems.net
                    </a>
                  </p>
                  <p className="text-[11px] text-stone/75">
                    Direct phone extension pending verification.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-subtle space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-deep text-champagne font-heading font-bold text-sm tracking-wider shrink-0 border border-champagne/30">
                    SK
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-forest-deep">Sana Khan</h3>
                    <p className="text-xs text-stone">Trading Operations &amp; Client Services</p>
                  </div>
                </div>
                <div className="border-t border-border pt-3 text-xs text-stone space-y-1">
                  <p>
                    <strong>Desk:</strong> Bang Rak Office, Bangkok
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@libragems.net" className="text-forest hover:underline">
                      info@libragems.net
                    </a>
                  </p>
                  <p className="text-[11px] text-stone/75">
                    Direct phone extension pending verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-forest-deep py-12 sm:py-16 text-white border-t border-forest-mid">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
              Schedule a Showroom Viewing in Bangkok
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-ivory/80 md:text-sm">
              International dealers visiting Thailand are invited to arrange an in-person viewing of
              active rough parcels and faceted stones at our Charoen Krung trading showroom.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-7 sm:px-8 text-xs font-bold uppercase tracking-wider text-forest-deep shadow-md hover:bg-champagne-light transition-colors"
              >
                Request Private Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
