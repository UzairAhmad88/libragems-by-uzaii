"use client";

import * as React from "react";
import Link from "next/link";
import { X, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { InsightArticle } from "@/types/insight";
import { Badge } from "@/components/ui/badge";

export interface ArticleReaderModalProps {
  article: InsightArticle | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/80 p-4 backdrop-blur-sm"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Reader Dialog Window */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-border bg-ivory shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{article.categoryLabel}</Badge>
            <span className="flex items-center gap-1 text-xs text-stone">
              <Clock className="h-3 w-3" />
              {article.readingTimeMinutes} min read
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article reader"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-stone transition-colors hover:bg-beige hover:text-forest focus-visible:outline-champagne"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
          <h2 className="font-serif text-3xl font-medium leading-tight text-forest-deep md:text-4xl">
            {article.title}
          </h2>
          <p className="mt-3 text-base text-stone leading-relaxed italic">
            {article.subtitle}
          </p>

          {/* Key Takeaways Callout */}
          <div className="mt-8 rounded-xl border border-champagne/40 bg-beige p-6">
            <h3 className="font-serif text-lg font-medium text-forest-deep flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-champagne" />
              Executive Trade Takeaways
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink/90">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-forest mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Editorial Sections */}
          <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/90">
            {article.contentSections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="font-serif text-2xl font-medium text-forest-deep pt-2">
                  {sec.heading}
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-stone text-sm">
                    {p}
                  </p>
                ))}
                {sec.callout && (
                  <blockquote className="my-4 rounded-lg border-l-4 border-champagne bg-white p-4 text-xs font-medium italic text-forest-deep shadow-sm">
                    {sec.callout}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Related Materials Links */}
          {article.relatedGemstones.length > 0 && (
            <div className="mt-10 border-t border-border pt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
                Related Active Gemstone Lots
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.relatedGemstones.map((gem) => (
                  <Link
                    key={gem.slug}
                    href={`/gemstones/${gem.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-forest/5 px-4 py-1.5 text-xs font-medium text-forest hover:bg-forest hover:text-white transition-colors"
                  >
                    <span>{gem.name}</span>
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="border-t border-border bg-white px-6 py-4 flex items-center justify-between">
          <p className="text-[11px] text-stone">
            Editorial Knowledge Series • Libra Gems &amp; Trading Co., Ltd.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-forest-deep transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
