"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { InsightArticle } from "@/types/insight";
import { Badge } from "@/components/ui/badge";
import { ArticleReaderModal } from "@/components/insights/article-reader-modal";
import { cn } from "@/lib/utils";

export interface InsightsViewProps {
  initialArticles: InsightArticle[];
}

export function InsightsView({ initialArticles }: InsightsViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [activeArticle, setActiveArticle] = React.useState<InsightArticle | null>(null);

  const categories = [
    { id: "all", label: "All Insights" },
    { id: "treatments", label: "Treatment Disclosure" },
    { id: "lapidary", label: "Lapidary Science" },
    { id: "origin", label: "Origin Analysis" },
    { id: "certification", label: "Laboratory Protocols" },
    { id: "market-standards", label: "Market Standards" },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? initialArticles
      : initialArticles.filter((a) => a.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Insights category filter"
        className="flex flex-wrap items-center gap-2 border-b border-border pb-6"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "rounded-full px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-champagne min-h-[44px]",
                isSelected
                  ? "bg-forest-deep text-champagne border border-forest-deep shadow-sm"
                  : "bg-ivory border border-border text-stone hover:border-forest/50 hover:text-forest-deep"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-ivory p-5 sm:p-7 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone">
                <Badge variant="accent">{article.categoryLabel}</Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readingTimeMinutes} min read
                </span>
              </div>

              <Link href={`/insights/${article.slug}`}>
                <h3 className="mt-4 font-heading text-lg sm:text-xl font-bold leading-snug text-forest-deep group-hover:text-forest transition-colors">
                  {article.title}
                </h3>
              </Link>

              <p className="mt-3 text-xs leading-relaxed text-stone line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <Link
                href={`/insights/${article.slug}`}
                aria-label={`Read complete guide: ${article.title}`}
                className="inline-flex min-h-[44px] w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-forest group-hover:text-forest-deep focus-visible:outline-champagne"
              >
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-champagne" />
                  Read Full Editorial Guide
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Active Modal Reader */}
      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}
