import * as React from "react";
import Link from "next/link";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getFacetedSingleStones, getGemstoneLots } from "@/data/gemstones";

interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  lot_count: number;
}

const DEFAULT_CATEGORIES: AdminCategory[] = [
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "Faceted Single Stones",
    slug: "faceted-single-stones",
    description: "Individually selected precision-cut faceted gemstones presented with individual optical specs and laboratory memo verification.",
    display_order: 1,
    is_active: true,
    lot_count: getFacetedSingleStones().length,
  },
  {
    id: "a1000000-0000-0000-0000-000000000006",
    name: "Gemstone Lots",
    slug: "gemstone-lots",
    description: "Curated wholesale gemstone lots, commercial parcels, and suites for jewelers, dealers, and lapidaries.",
    display_order: 2,
    is_active: true,
    lot_count: getGemstoneLots().length,
  },
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Rough Gemstones",
    slug: "rough",
    description: "Natural unworked crystals, alluvial pebbles, and rough gemstone parcels suitable for lapidary cutting.",
    display_order: 3,
    is_active: true,
    lot_count: 1,
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Mineral Specimens",
    slug: "mineral",
    description: "Natural mineral specimens and crystalline formations for collectors and lapidaries.",
    display_order: 4,
    is_active: true,
    lot_count: 1,
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Cut Gemstones",
    slug: "cut",
    description: "Precision-cut, faceted colored stones and suites ready for high-jewelry fabrication.",
    display_order: 5,
    is_active: true,
    lot_count: 2,
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "Stone Beads & Calibrated Material",
    slug: "beads",
    description: "Calibrated gemstone beads, rondelles, and tumbled stone lots for manufacturing.",
    display_order: 6,
    is_active: true,
    lot_count: 0,
  },
];

export default async function AdminCategoriesPage() {
  let categories = DEFAULT_CATEGORIES;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbCategories } = await supabase
        .from("gemstone_categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (dbCategories && dbCategories.length > 0) {
        categories = dbCategories.map((c) => ({
          ...c,
          lot_count: c.slug === "rough" ? 1 : c.slug === "mineral" ? 1 : c.slug === "cut" ? 1 : 0,
        }));
      }
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Gemstone Categories
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Taxonomic classifications organizing LibraGems international gemstone catalogue for search indexing and customer navigation.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-3.5">Order</th>
                <th className="p-3.5">Category Name</th>
                <th className="p-3.5">Slug</th>
                <th className="p-3.5">Scope &amp; Description</th>
                <th className="p-3.5">Active Lots</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Public View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 font-mono text-stone">{cat.display_order}</td>
                  <td className="p-3.5 font-medium text-forest-deep text-sm">{cat.name}</td>
                  <td className="p-3.5 font-mono text-stone">{cat.slug}</td>
                  <td className="p-3.5 text-stone max-w-md">{cat.description}</td>
                  <td className="p-3.5 font-medium text-ink">{cat.lot_count} Lots</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        cat.is_active
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-stone/10 text-stone border-border"
                      }`}
                    >
                      {cat.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/catalogue?category=${cat.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-medium text-forest hover:text-forest-deep"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Catalogue</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-champagne/40 bg-ivory p-4 text-xs text-ink flex items-start gap-3">
        <CheckCircle2 className="h-4 w-4 text-forest shrink-0 mt-0.5" />
        <p className="text-stone leading-relaxed text-[11px]">
          Categories determine the primary navigation facets on the public catalogue and ground our schema.org structured data for international gemstone classification.
        </p>
      </div>
    </div>
  );
}
