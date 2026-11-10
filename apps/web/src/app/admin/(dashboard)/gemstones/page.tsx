import * as React from "react";
import Link from "next/link";
import { Plus, ExternalLink, Edit3, ShieldAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { GEMSTONE_PRODUCTS } from "@/data/gemstones";

interface AdminGemstoneListItem {
  id: string;
  reference_code: string;
  name: string;
  slug: string;
  variety: string;
  species: string;
  form: string;
  weight_display: string;
  origin_country: string;
  cibjo_code: string;
  is_published: boolean;
  availability_status: string;
}

export default async function AdminGemstonesPage() {
  let gemstones: AdminGemstoneListItem[] = GEMSTONE_PRODUCTS.map((g) => ({
    id: g.id,
    reference_code: g.lotReference,
    name: g.name,
    slug: g.slug,
    variety: g.variety,
    species: g.species,
    form: g.form,
    weight_display: g.lotWeight,
    origin_country: g.origin.country,
    cibjo_code: g.treatment.cibjoCode,
    is_published: true,
    availability_status: "in_stock",
  }));

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbGemstones } = await supabase
        .from("gemstones")
        .select("id, reference_code, name, slug, variety, species, form, weight_display, origin_country, cibjo_code, is_published, availability_status")
        .order("display_order", { ascending: true });

      if (dbGemstones && dbGemstones.length > 0) {
        gemstones = dbGemstones;
      }
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-medium text-forest-deep">
            Gemstone Catalogue
          </h2>
          <p className="mt-1 text-xs text-stone leading-relaxed">
            Manage commercial lots, rough parcels, and fine cut stones conforming strictly to CIBJO gemstone ethics.
          </p>
        </div>

        <Link
          href="/admin/gemstones/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-forest-deep shadow-sm transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Gemstone Lot</span>
        </Link>
      </div>

      {/* Gemstones Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Gemstone &amp; Species</th>
                <th className="p-3.5">Form / Weight</th>
                <th className="p-3.5">Origin</th>
                <th className="p-3.5">CIBJO Code</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {gemstones.map((gem) => (
                <tr key={gem.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-forest-deep">
                    {gem.reference_code}
                  </td>
                  <td className="p-3.5">
                    <span className="block font-medium text-ink">{gem.name}</span>
                    <span className="block text-[11px] text-stone">
                      {gem.species} ({gem.variety})
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="block text-ink">{gem.form}</span>
                    <span className="block text-[11px] text-stone">{gem.weight_display}</span>
                  </td>
                  <td className="p-3.5 text-ink">{gem.origin_country}</td>
                  <td className="p-3.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-beige border border-champagne/40 text-forest-deep">
                      Code {gem.cibjo_code}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        gem.is_published
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-stone/10 text-stone border-border"
                      }`}
                    >
                      {gem.is_published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/gemstones/${gem.id}`}
                        className="inline-flex items-center gap-1 font-medium text-forest hover:text-forest-deep"
                        title="Edit Gemstone"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Link>
                      <Link
                        href={`/catalogue/${gem.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 font-medium text-stone hover:text-ink"
                        title="View Public Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance reminder */}
      <div className="rounded-xl border border-champagne/50 bg-ivory p-4 text-xs text-ink flex items-start gap-3">
        <ShieldAlert className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-forest-deep">
            Non-Fabrication Policy Enforced
          </h4>
          <p className="text-stone text-[11px] leading-relaxed">
            All prices are strictly Price on Application (POA). Consumer cart, checkout, or unverified treatment claims are strictly disallowed by system constraints and database triggers.
          </p>
        </div>
      </div>
    </div>
  );
}
