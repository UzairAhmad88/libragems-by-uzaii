import * as React from "react";
import Image from "next/image";

export function GemstoneEmblem({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className} shrink-0`} aria-hidden="true">
      <Image
        src="/images/branding/real-gem-icon.png"
        alt="LibraGems Real Precious Gemstone"
        fill
        sizes="48px"
        className="object-contain"
        priority
      />
    </span>
  );
}
