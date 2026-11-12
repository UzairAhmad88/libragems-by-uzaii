import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { CATALOG_CATEGORIES } from "@/data/categories";
import { getFacetedSingleStones, getGemstoneLots } from "@/data/gemstones";

export function CategoryCards() {
  const singleStonesCount = getFacetedSingleStones().length;
  const lotsCount = getGemstoneLots().length;

  return (
    <section aria-labelledby="catalog-categories-heading" className="mb-12 sm:mb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-champagne">
            Commercial Collections
          </span>
          <h2 id="catalog-categories-heading" className="font-heading text-2xl sm:text-3xl font-bold text-forest-deep mt-1">
            Browse by Trading Category
          </h2>
        </div>
        <p className="text-xs text-stone max-w-md">
          Structured for international B2B acquisition: select between verified single master-faceted gems or comprehensive commercial lots.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CATALOG_CATEGORIES.map((cat) => {
          const isSingle = cat.slug === "faceted-single-stones";
          const count = isSingle ? singleStonesCount : lotsCount;
          const Icon = isSingle ? Sparkles : Layers;

          return (
            <article
              key={cat.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ivory shadow-subtle transition-all duration-300 hover:border-champagne hover:shadow-lg"
            >
              {/* Category Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-forest-deep">
                <Image
                  src={cat.heroImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-forest-deep/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-champagne backdrop-blur-md border border-champagne/30">
                  <Icon className="h-3.5 w-3.5 text-champagne" />
                  <span>{cat.badge}</span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ivory/70">
                    {cat.tradeScope}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mt-0.5">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <p className="text-xs sm:text-sm leading-relaxed text-stone">
                  {cat.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                  <span className="text-xs font-mono font-semibold text-forest-deep">
                    {count} {count === 1 ? "Listed Offering" : "Listed Offerings"}
                  </span>
                  <Link
                    href={`/gemstones/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest transition-colors group-hover:text-forest-deep focus-visible:outline-champagne"
                  >
                    <span>Explore Category</span>
                    <ArrowRight className="h-4 w-4 text-champagne transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

