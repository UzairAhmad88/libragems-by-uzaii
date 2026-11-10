import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InsightsView } from "@/components/insights/insights-view";
import { getAllInsights } from "@/data/insights";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createBreadcrumbSchema, createArticleSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Gemstone Insights | Educational Knowledge & Market Observations",
  description:
    "Authoritative educational guides on CIBJO treatment disclosure, lapidary cutting yields, geographic origin analysis, and Bangkok laboratory testing protocols.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getAllInsights();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Insights" },
  ];

  const schemas: Array<Record<string, unknown>> = [
    createBreadcrumbSchema(breadcrumbs),
    ...articles.map((article) => createArticleSchema(article)),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Editorial Hero */}
        <section className="border-b border-border bg-beige py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-4 max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Knowledge &amp; Market Intelligence
              </span>
              <h1 className="font-serif text-4xl font-medium leading-tight text-forest-deep sm:text-5xl md:text-6xl">
                Gemstone knowledge and market observations.
              </h1>
              <p className="text-base leading-relaxed text-stone md:text-lg">
                Practical, science-grounded education for lapidaries, wholesale buyers, and gemstone
                connoisseurs. Documenting treatment identification, alluvial cutting yields, and
                Bangkok laboratory standards.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="border-b border-border bg-ivory py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <InsightsView initialArticles={articles} />
          </div>
        </section>

        {/* Editorial Submissions CTA */}
        <section className="bg-forest-deep py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-5">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">
              Have Specific Technical Questions About a Lot?
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-white/80 md:text-sm">
              Our trading desk consults directly with international lapidaries and cutters on parcel
              characteristics, sieve sorting, and testing protocols.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-champagne px-8 text-xs font-semibold uppercase tracking-wider text-forest-deep hover:bg-white transition-colors"
              >
                Consult Our Trading Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
