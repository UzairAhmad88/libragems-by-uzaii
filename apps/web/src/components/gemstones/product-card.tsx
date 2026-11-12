import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GemstoneProduct } from "@/types/gemstone";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  product: GemstoneProduct;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images[0] || {
    src: "/images/gemstones/hero-editorial-inventory.svg",
    alt: product.name,
  };

  const treatmentBadgeVariant =
    product.treatment.cibjoCode === "N"
      ? "untreated"
      : product.treatment.cibjoCode === "T"
      ? "stabilized"
      : "default";

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-ivory p-5 sm:p-6 transition-all duration-300 hover:border-champagne hover:shadow-subtle">
      {/* Product-First Visual Frame: Pristine, Unobstructed Gemstone Photography */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-offwhite border border-border/50">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Block */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Top Identification Row: Lot Reference + CIBJO Status Badge */}
        <div className="flex items-center justify-between text-xs pb-1">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-stone/80">
            {product.lotReference}
          </span>
          <Badge variant={treatmentBadgeVariant} className="text-[10px] font-semibold py-0.5 px-2">
            Code {product.treatment.cibjoCode} • {product.treatment.name}
          </Badge>
        </div>

        {/* Gemstone Name */}
        <h3 className="mt-2 font-heading text-lg sm:text-xl font-bold leading-snug text-forest-deep transition-colors group-hover:text-forest">
          <Link href={`/gemstones/${product.slug}`} className="focus-visible:outline-champagne">
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>

        {/* Mineral Species & Form */}
        <p className="mt-1 text-xs font-medium text-stone">
          {product.species} • <span className="text-forest-deep">{product.form}</span>
        </p>

        {/* Short Description */}
        <p className="mt-2.5 text-xs leading-relaxed text-stone/90 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Key Trade Specifications */}
        <div className="mt-4 border-t border-border/70 pt-3">
          <dl className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-stone/70">Origin</dt>
              <dd className="font-semibold text-forest-deep mt-0.5">{product.origin.country}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-stone/70">Lot Weight</dt>
              <dd className="font-semibold text-forest-deep mt-0.5 tabular-nums">{product.lotWeight}</dd>
            </div>
          </dl>
        </div>

        {/* Clean Action Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3.5 text-xs font-bold uppercase tracking-wider text-forest transition-colors group-hover:text-forest-deep">
          <span>Inspect Lot Dossier</span>
          <ArrowRight className="h-4 w-4 text-champagne transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
