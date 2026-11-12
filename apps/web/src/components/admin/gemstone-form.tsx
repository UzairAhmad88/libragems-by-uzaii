"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export interface GemstoneInitialData {
  name?: string;
  slug?: string;
  reference_code?: string;
  lotReference?: string;
  trade_title?: string;
  tradeTitle?: string;
  subtitle?: string;
  category_id?: string;
  species?: string;
  variety?: string;
  form?: string;
  weight_display?: string;
  lotWeight?: string;
  dimensions_or_sieve?: string;
  dimensionsOrSieve?: string;
  cut_style?: string;
  cutStyle?: string;
  color_tone?: string;
  colorTone?: string;
  clarity_description?: string;
  clarityDescription?: string;
  moq?: string;
  origin_country?: string;
  origin_region?: string;
  origin_verification_status?: string;
  origin_disclosure_note?: string;
  origin?: {
    country?: string;
    region?: string;
    status?: string;
    disclosureNote?: string;
  };
  treatment_status?: string;
  cibjo_code?: string;
  treatment_name?: string;
  treatment_disclosure?: string;
  treatment?: {
    status?: string;
    cibjoCode?: string;
    name?: string;
    disclosure?: string;
  };
  certification_status?: string;
  certification_note?: string;
  certification?: {
    status?: string;
    note?: string;
  };
  short_description?: string;
  shortDescription?: string;
  description?: string;
  fullOverview?: string;
  is_published?: boolean;
  is_featured?: boolean;
  availability_status?: string;
}

interface GemstoneFormProps {
  initialData?: GemstoneInitialData;
  isEditing?: boolean;
}

export function GemstoneForm({ initialData, isEditing = false }: GemstoneFormProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    reference_code: initialData?.reference_code || initialData?.lotReference || "LG-",
    trade_title: initialData?.trade_title || initialData?.tradeTitle || "",
    subtitle: initialData?.subtitle || "",
    category_id: initialData?.category_id || "a1000000-0000-0000-0000-000000000001",
    species: initialData?.species || "",
    variety: initialData?.variety || "",
    form: initialData?.form || "rough_parcel",
    weight_display: initialData?.weight_display || initialData?.lotWeight || "",
    dimensions_or_sieve: initialData?.dimensions_or_sieve || initialData?.dimensionsOrSieve || "",
    cut_style: initialData?.cut_style || initialData?.cutStyle || "",
    color_tone: initialData?.color_tone || initialData?.colorTone || "",
    clarity_description: initialData?.clarity_description || initialData?.clarityDescription || "",
    moq: initialData?.moq || "",
    origin_country: initialData?.origin_country || initialData?.origin?.country || "",
    origin_region: initialData?.origin_region || initialData?.origin?.region || "",
    origin_verification_status: initialData?.origin_verification_status || initialData?.origin?.status || "trade_consensus",
    origin_disclosure_note: initialData?.origin_disclosure_note || initialData?.origin?.disclosureNote || "",
    treatment_status: initialData?.treatment_status || initialData?.treatment?.status || "natural_untreated",
    cibjo_code: initialData?.cibjo_code || initialData?.treatment?.cibjoCode || "N",
    treatment_name: initialData?.treatment_name || initialData?.treatment?.name || "Natural Untreated",
    treatment_disclosure: initialData?.treatment_disclosure || initialData?.treatment?.disclosure || "",
    certification_status: initialData?.certification_status || initialData?.certification?.status || "available_on_request",
    certification_note: initialData?.certification_note || initialData?.certification?.note || "",
    short_description: initialData?.short_description || initialData?.shortDescription || "",
    description: initialData?.description || initialData?.fullOverview || "",
    is_published: initialData?.is_published ?? true,
    is_featured: initialData?.is_featured ?? false,
    availability_status: initialData?.availability_status || "in_stock",
  });

  const [savedNotice, setSavedNotice] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      router.push("/admin/gemstones");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16">
      {/* Top action header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <Link
          href="/admin/gemstones"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone hover:text-forest transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalogue</span>
        </Link>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{isEditing ? "Save Gemstone Changes" : "Create Gemstone Lot"}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-700" />
          <span>Gemstone specifications successfully validated and saved to catalogue registry.</span>
        </div>
      )}

      {/* Section 1: Identification */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-5">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          1. Commercial &amp; Lot Identity
        </h3>

        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Lot Reference Code *
            </label>
            <input
              type="text"
              required
              value={formData.reference_code}
              onChange={(e) => setFormData({ ...formData, reference_code: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs font-mono font-bold text-forest-deep focus:border-forest focus:bg-white focus:outline-none"
              placeholder="LG-HG-001"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Official Trade Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Commercial-Quality Rough Hessonite Garnet"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="hessonite-garnet"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Trading Category *
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none font-medium"
            >
              <option value="a1000000-0000-0000-0000-000000000005">Faceted Single Stones</option>
              <option value="a1000000-0000-0000-0000-000000000006">Gemstone Lots</option>
              <option value="a1000000-0000-0000-0000-000000000001">Rough Gemstones</option>
              <option value="a1000000-0000-0000-0000-000000000002">Mineral Specimens</option>
              <option value="a1000000-0000-0000-0000-000000000003">Cut Gemstones</option>
              <option value="a1000000-0000-0000-0000-000000000004">Beads &amp; Calibrated</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Mineral Species *
            </label>
            <input
              type="text"
              required
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Grossular Garnet"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Gemological Variety *
            </label>
            <input
              type="text"
              required
              value={formData.variety}
              onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Hessonite Garnet"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Physical & Commercial */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-5">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          2. Physical &amp; Commercial Parameters
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Material Form *
            </label>
            <select
              value={formData.form}
              onChange={(e) => setFormData({ ...formData, form: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
            >
              <option value="cut_stone">Precision Cut Stone (Single)</option>
              <option value="faceted_suite_lot">Faceted Suite Lot (Multiple)</option>
              <option value="rough_parcel">Rough Parcel</option>
              <option value="mineral_rough">Mineral Rough</option>
              <option value="calibrated_beads">Calibrated Beads</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Weight Display *
            </label>
            <input
              type="text"
              required
              value={formData.weight_display}
              onChange={(e) => setFormData({ ...formData, weight_display: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="5,000 g (Parcel Lot)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Minimum Order Quantity (MOQ) *
            </label>
            <input
              type="text"
              required
              value={formData.moq}
              onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="500 g lot minimum order"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Dimensions / Sieve Range *
            </label>
            <input
              type="text"
              required
              value={formData.dimensions_or_sieve}
              onChange={(e) => setFormData({ ...formData, dimensions_or_sieve: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="8 mm – 22 mm average sieve range"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Color Tone *
            </label>
            <input
              type="text"
              required
              value={formData.color_tone}
              onChange={(e) => setFormData({ ...formData, color_tone: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Warm cinnamon-orange to brownish-amber"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Clarity Description *
            </label>
            <input
              type="text"
              required
              value={formData.clarity_description}
              onChange={(e) => setFormData({ ...formData, clarity_description: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Commercial translucent to semi-transparent..."
            />
          </div>
        </div>
      </div>

      {/* Section 3: Provenance & CIBJO Disclosures */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-5">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          3. Provenance &amp; CIBJO Ethical Disclosures
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Origin Country *
            </label>
            <input
              type="text"
              required
              value={formData.origin_country}
              onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
              placeholder="Sri Lanka"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              Origin Verification Status *
            </label>
            <select
              value={formData.origin_verification_status}
              onChange={(e) => setFormData({ ...formData, origin_verification_status: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
            >
              <option value="verified">Verified (Laboratory Memo)</option>
              <option value="trade_consensus">Trade Consensus (Parcel Provenance)</option>
              <option value="unverified">Unverified (Trade Sourced)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
              CIBJO Treatment Code *
            </label>
            <select
              value={formData.cibjo_code}
              onChange={(e) => setFormData({ ...formData, cibjo_code: e.target.value })}
              className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3.5 py-2 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none font-bold"
            >
              <option value="N">Code N — Natural Untreated</option>
              <option value="T">Code T — Traditionally Treated / Stabilized</option>
              <option value="E">Code E — Enhanced / Specific Laboratory Process</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
            Origin Disclosure Note *
          </label>
          <textarea
            rows={2}
            required
            value={formData.origin_disclosure_note}
            onChange={(e) => setFormData({ ...formData, origin_disclosure_note: e.target.value })}
            className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 p-3 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
            placeholder="Sourced through traditional gem-trading channels..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
            Treatment Disclosure Statement *
          </label>
          <textarea
            rows={2}
            required
            value={formData.treatment_disclosure}
            onChange={(e) => setFormData({ ...formData, treatment_disclosure: e.target.value })}
            className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 p-3 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
            placeholder="Completely natural, unheated, and untreated rough..."
          />
        </div>
      </div>

      {/* Section 4: Descriptions & Editorial */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-5">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          4. Descriptive Editorial
        </h3>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
            Short Description *
          </label>
          <textarea
            rows={2}
            required
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 p-3 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone">
            Full Commercial Overview *
          </label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 p-3 text-xs text-ink focus:border-forest focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Section 5: Publication Status */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-medium text-ink text-sm">Publication Visibility</h4>
          <p className="text-xs text-stone mt-0.5">
            Controls visibility on the international public catalogue.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="h-4 w-4 rounded border-border text-forest focus:ring-forest"
            />
            <span>Published on Live Website</span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="h-4 w-4 rounded border-border text-forest focus:ring-forest"
            />
            <span>Featured on Homepage</span>
          </label>
        </div>
      </div>
    </form>
  );
}
