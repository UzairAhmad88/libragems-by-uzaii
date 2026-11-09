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
    { id: "all", label: "All Materials" },
    { id: "rough", label: "Rough Gemstones" },
    { id: "mineral", label: "Minerals / Rough" },
    { id: "cut", label: "Cut Gemstones" },
  ];

  const filteredGemstones =
    selectedCategory === "all"
      ? initialGemstones
      : initialGemstones.filter((g) => g.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Gemstone category filter"
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
                "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-champagne min-h-[44px]",
                isSelected
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white border border-border text-stone hover:border-forest/40 hover:text-forest"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid count summary */}
      <div className="mt-6 flex items-center justify-between text-xs text-stone">
        <span>
          Showing {filteredGemstones.length} of {initialGemstones.length} catalogued materials
        </span>
        <span className="font-mono text-[11px] text-forest">
          Physical Bangkok Holdings • B2B Only
        </span>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGemstones.map((gem, idx) => (
          <ProductCard key={gem.slug} product={gem} priority={idx === 0} />
        ))}
      </div>
    </div>
  );
}
