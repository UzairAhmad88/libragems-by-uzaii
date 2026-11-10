import * as React from "react";
import { GemstoneForm } from "@/components/admin/gemstone-form";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { GEMSTONE_PRODUCTS } from "@/data/gemstones";

interface GemstoneEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GemstoneEditPage({ params }: GemstoneEditPageProps) {
  const { id } = await params;

  let gemstone: Record<string, unknown> | undefined = GEMSTONE_PRODUCTS.find(
    (g) => g.id === id || g.slug === id || g.lotReference === id
  ) as unknown as Record<string, unknown>;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbGem } = await supabase
        .from("gemstones")
        .select("*")
        .or(`id.eq.${id},slug.eq.${id},reference_code.eq.${id}`)
        .single();

      if (dbGem) {
        gemstone = dbGem as unknown as Record<string, unknown>;
      }
    }
  }

  if (!gemstone) {
    // If not found, fallback to first product
    gemstone = GEMSTONE_PRODUCTS[0] as unknown as Record<string, unknown>;
  }

  const titleName = (gemstone.name || gemstone.reference_code || "Lot") as string;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Edit Gemstone Lot: {titleName}
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Update physical characteristics, origin attribution, CIBJO disclosure parameters, or publication status.
        </p>
      </div>

      <GemstoneForm initialData={gemstone} isEditing={true} />
    </div>
  );
}
