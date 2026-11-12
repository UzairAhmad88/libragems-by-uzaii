"use client";

import * as React from "react";
import { GemstoneProduct } from "@/types/gemstone";
import { ProductCard } from "@/components/gemstones/product-card";
import { cn } from "@/lib/utils";

export interface CatalogueGridProps {
  initialGemstones: GemstoneProduct[];
}

export function CatalogueGrid({ initialGemstones }: CatalogueGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All Gemstones" },
    { id: "faceted-single-stones", label: "Faceted Single Stones" },
    { id: "gemstone-lots", label: "Gemstone Lots" },
    { id: "rough", label: "Rough Gemstones" },
    { id: "mineral", label: "Minerals & Rough" },
  ];

  const filteredGemstones = React.useMemo(() => {
    if (selectedCategory === "all") return initialGemstones;
    if (selectedCategory === "faceted-single-stones") {
      return initialGemstones.filter((g) => g.catalogCategory === "faceted-single-stones");
    }
    if (selectedCategory === "gemstone-lots") {
      return initialGemstones.filter((g) => g.catalogCategory === "gemstone-lots");
    }
    return initialGemstones.filter(
      (g) => g.category === selectedCategory || g.catalogCategory === selectedCategory
    );
  }, [initialGemstones, selectedCategory]);

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Gemstone category filter"
        className="flex flex-wrap items-center gap-2 border-b border-border pb-5 sm:pb-6"
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

      {/* Grid count summary */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-stone">
        <span>
          Showing {filteredGemstones.length} of {initialGemstones.length} catalogued materials
        </span>
        <span className="font-mono text-[11px] text-forest">
          Physical Bangkok Holdings • B2B Only
        </span>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGemstones.map((gem, idx) => (
          <ProductCard key={gem.slug} product={gem} priority={idx === 0} />
        ))}
      </div>
    </div>
  );
}
