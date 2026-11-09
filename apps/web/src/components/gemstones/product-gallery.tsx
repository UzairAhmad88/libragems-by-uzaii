"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GemstoneImage } from "@/types/gemstone";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  images: GemstoneImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  const activeImage = images[selectedIndex] || {
    src: "/images/gemstones/hero-editorial-inventory.svg",
    alt: productName,
    caption: "Gemstone parcel overview",
    view: "overview",
  };

  const handleNext = React.useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = React.useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Display Frame */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-beige shadow-subtle">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* View Badge */}
        <div className="absolute left-4 top-4 z-10 rounded-full bg-forest-deep/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          {activeImage.view} view
        </div>

        {/* Lightbox Trigger Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open magnified view of ${activeImage.alt}`}
          className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition-all hover:bg-forest hover:text-white focus-visible:outline-champagne"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Image Caption Bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <p className="text-xs font-medium leading-relaxed drop-shadow-sm">
            {activeImage.caption}
          </p>
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      {images.length > 1 && (
        <div
          role="region"
          aria-label="Image views thumbnail strip"
          className="grid grid-cols-3 gap-3"
        >
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.src + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Select ${img.view} view (${idx + 1} of ${images.length})`}
                aria-pressed={isSelected}
                className={cn(
                  "group relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-beige transition-all duration-200 focus-visible:outline-champagne",
                  isSelected
                    ? "border-champagne ring-2 ring-champagne/40"
                    : "border-border hover:border-stone opacity-75 hover:opacity-100"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                  {img.view}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Accessible Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Magnified viewer: ${productName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-champagne"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous image */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous view"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-champagne"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Main Modal Image */}
          <div className="relative max-h-[85vh] max-w-[85vw] w-full aspect-[4/3]">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next image */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next view"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-champagne"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Modal Bottom Caption */}
          <div className="absolute bottom-6 inset-x-0 text-center text-white/90">
            <p className="text-sm font-medium">{activeImage.caption}</p>
            <p className="mt-1 text-xs text-white/60">
              View {selectedIndex + 1} of {images.length} • Press ESC to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
