import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <div className="group relative flex flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover">
      {/* Visual Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-beige">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Treatment Badge Overlay */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          <Badge variant={treatmentBadgeVariant}>
            {product.treatment.name} (Code {product.treatment.cibjoCode})
          </Badge>
        </div>
        {/* Lot Reference Tag */}
        <div className="absolute bottom-3 right-3 z-10 rounded bg-forest-deep/80 px-2 py-0.5 text-[10px] font-mono tracking-wider text-white backdrop-blur-sm">
          {product.lotReference}
        </div>
      </div>

      {/* Content Block */}
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between text-xs text-stone">
          <span className="font-semibold uppercase tracking-wider text-forest">
            {product.form}
          </span>
          <span>{product.species}</span>
        </div>

        <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-forest-deep group-hover:text-forest transition-colors">
          <Link href={`/gemstones/${product.slug}`} className="focus-visible:outline-champagne">
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>

        <p className="mt-2.5 text-xs leading-relaxed text-stone line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Spec Pill Strip */}
        <div className="mt-4 border-t border-border pt-4">
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-stone/75">Origin</dt>
              <dd className="font-medium text-forest-deep">{product.origin.country}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-stone/75">Available Weight</dt>
              <dd className="font-medium text-forest-deep tabular-nums">{product.lotWeight}</dd>
            </div>
          </dl>
        </div>

        {/* Action Link Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-xs font-semibold uppercase tracking-wider text-forest">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-champagne" />
            Inspect Lot Dossier
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
