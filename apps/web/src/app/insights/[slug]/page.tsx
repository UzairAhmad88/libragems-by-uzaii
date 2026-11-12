import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight, ShieldCheck, Gem } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { getAllInsights, getInsightBySlug } from "@/data/insights";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createArticleSchema, createBreadcrumbSchema } from "@/lib/seo/json-ld";

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllInsights();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Libra Gems & Trading Co.",
    };
  }

  return buildPageMetadata({
    title: `${article.title} | Libra Gems & Trading Co.`,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    ogType: "article",
  });
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllInsights();
  const otherArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gemstone Insights", href: "/insights" },
    { label: article.title },
  ];

  return (
    <>
      <JsonLd data={[createArticleSchema(article), createBreadcrumbSchema(breadcrumbs)]} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Editorial Article Hero (Deep Forest Green) */}
        <section className="border-b border-forest-mid bg-forest-deep py-12 sm:py-16 lg:py-24 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-ivory/70 [&_a]:text-ivory/80 [&_a:hover]:text-champagne [&_span]:text-champagne">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent">{article.categoryLabel}</Badge>
                <span className="flex items-center gap-1.5 text-xs text-ivory/80">
                  <Clock className="h-3.5 w-3.5 text-champagne" />
                  {article.readingTimeMinutes} min read
                </span>
                <span className="text-xs text-ivory/60">• Published {article.publishedDate}</span>
              </div>

              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {article.title}
              </h1>

              <p className="text-base font-medium leading-relaxed text-champagne md:text-lg">
                {article.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Key Takeaways Box */}
          <div className="mb-12 rounded-2xl border border-champagne/40 bg-champagne/10 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-forest" />
              <h2 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-forest-deep">
                Executive Key Takeaways for Trade Buyers
              </h2>
            </div>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-10 text-stone-dark">
            {article.contentSections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-deep">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-stone-dark">
                    {para}
                  </p>
                ))}
                {section.callout && (
                  <blockquote className="my-6 rounded-xl border-l-4 border-champagne bg-ivory p-5 text-sm sm:text-base italic leading-relaxed text-forest-deep">
                    {section.callout}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Related Physical Gemstone Inventory */}
          {article.relatedGemstones.length > 0 && (
            <div className="mt-16 rounded-2xl border border-border bg-ivory p-6 sm:p-8">
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-forest-deep mb-2">
                Related Physical Gemstone Inventory
              </h3>
              <p className="text-xs text-stone mb-6">
                Active commercial parcels corresponding to the gemological standards discussed in this report:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.relatedGemstones.map((gem) => (
                  <Link
                    key={gem.slug}
                    href={`/gemstones/${gem.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 transition-all duration-200 hover:border-champagne hover:shadow-subtle"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-champagne/15 text-forest">
                        <Gem className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-forest-deep group-hover:text-forest">
                          {gem.name}
                        </div>
                        <div className="text-xs text-stone">Inspect Specifications &amp; Yield</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone transition-transform group-hover:translate-x-1 group-hover:text-forest" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation & Back to Insights */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
            <Link
              href="/insights"
              className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-deep"
            >
              <ArrowLeft className="h-4 w-4" />
              All Gemstone Insights
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-forest-deep px-6 text-xs font-bold uppercase tracking-wider text-champagne hover:bg-forest transition-colors"
            >
              Consult Bangkok Trading Desk
            </Link>
          </div>
        </article>

        {/* Read Next Section */}
        {otherArticles.length > 0 && (
          <section className="border-t border-border bg-beige/30 py-12 lg:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-forest-deep mb-6">
                Recommended Gemological Intelligence
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/insights/${other.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:shadow-subtle"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone mb-3">
                        <Badge variant="accent">{other.categoryLabel}</Badge>
                        <span>{other.readingTimeMinutes} min</span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-forest-deep group-hover:text-forest">
                        {other.title}
                      </h3>
                      <p className="mt-2 text-xs text-stone line-clamp-2">{other.excerpt}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-champagne-dark group-hover:text-forest">
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

