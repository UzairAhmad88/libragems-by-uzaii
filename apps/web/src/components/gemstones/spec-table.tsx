import { GemstoneProduct } from "@/types/gemstone";
import { Badge } from "@/components/ui/badge";

export interface SpecTableProps {
  product: GemstoneProduct;
}

export function SpecTable({ product }: SpecTableProps) {
  const originVariant =
    product.origin.status === "verified"
      ? "verified"
      : product.origin.status === "trade_consensus"
      ? "accent"
      : "pending";

  const treatmentVariant =
    product.treatment.cibjoCode === "N"
      ? "untreated"
      : product.treatment.cibjoCode === "T"
      ? "stabilized"
      : "default";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-subtle">
      <div className="border-b border-border bg-beige/60 px-6 py-4">
        <h3 className="font-serif text-xl font-medium text-forest-deep">
          Gemological &amp; Physical Specifications
        </h3>
        <p className="mt-0.5 text-xs text-stone">
          Verified gemological properties and commercial lot parameters.
        </p>
      </div>

      <div className="divide-y divide-border">
        {/* Variety & Species */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Species / Variety
          </dt>
          <dd className="text-sm font-medium text-forest-deep sm:col-span-2">
            {product.species} • {product.variety}
          </dd>
        </div>

        {/* Chemical Formula */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Chemical Formula
          </dt>
          <dd className="text-sm font-mono text-ink sm:col-span-2">
            {product.chemicalFormula}
          </dd>
        </div>

        {/* Crystal System */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Crystal System
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">{product.crystalSystem}</dd>
        </div>

        {/* Hardness (Mohs) */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Mohs Hardness
          </dt>
          <dd className="text-sm font-medium tabular-nums text-ink sm:col-span-2">
            {product.hardness}
          </dd>
        </div>

        {/* Specific Gravity (Density) */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Specific Gravity (SG)
          </dt>
          <dd className="text-sm font-medium tabular-nums text-ink sm:col-span-2">
            {product.specificGravity}
          </dd>
        </div>

        {/* Refractive Index (RI) */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Refractive Index (RI)
          </dt>
          <dd className="text-sm font-medium tabular-nums text-ink sm:col-span-2">
            {product.refractiveIndex}
          </dd>
        </div>

        {/* Lot Weight / Form */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Offering Weight &amp; MOQ
          </dt>
          <dd className="text-sm font-medium tabular-nums text-forest-deep sm:col-span-2">
            {product.lotWeight} (Minimum Order: {product.moq})
          </dd>
        </div>

        {/* Sieve / Sizing */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Dimensions / Sizing
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">{product.dimensionsOrSieve}</dd>
        </div>

        {/* Color Tone & Clarity */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Color &amp; Clarity
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">
            <span className="font-medium text-forest-deep">{product.colorTone}</span>
            <span className="block mt-0.5 text-xs text-stone">{product.clarityDescription}</span>
          </dd>
        </div>

        {/* Provenance / Origin */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Geographic Origin
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-forest-deep">{product.origin.country}</span>
              {product.origin.region && (
                <span className="text-xs text-stone">({product.origin.region})</span>
              )}
              <Badge variant={originVariant}>
                {product.origin.status === "verified"
                  ? "Verified Provenance"
                  : product.origin.status === "trade_consensus"
                  ? "Trade Consensus"
                  : "Origin Unverified"}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-stone leading-relaxed">
              {product.origin.disclosureNote}
            </p>
          </dd>
        </div>

        {/* Treatment Disclosure */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            CIBJO Treatment Status
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={treatmentVariant}>
                {product.treatment.name} (Code {product.treatment.cibjoCode})
              </Badge>
            </div>
            <p className="mt-1 text-xs text-stone leading-relaxed">
              {product.treatment.disclosure}
            </p>
          </dd>
        </div>

        {/* Certification Status */}
        <div className="grid grid-cols-1 gap-1 px-6 py-3.5 sm:grid-cols-3 sm:gap-4 bg-ivory/40">
          <dt className="text-xs font-semibold uppercase tracking-wider text-stone">
            Laboratory Memo
          </dt>
          <dd className="text-sm text-ink sm:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-forest-deep">
                {product.certification.status === "certified"
                  ? "Certified Report Attached"
                  : product.certification.status === "pending_verification"
                  ? "Independent Memo Arranged Upon Sale"
                  : "Independent Memo Available on Request"}
              </span>
            </div>
            <p className="mt-1 text-xs text-stone leading-relaxed">
              {product.certification.note} Available Bangkok testing labs:{" "}
              {product.certification.availableLabs.join(", ")}.
            </p>
          </dd>
        </div>
      </div>
    </div>
  );
}
