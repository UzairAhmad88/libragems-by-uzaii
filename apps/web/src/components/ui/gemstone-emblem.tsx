import * as React from "react";
import Image from "next/image";

export function GemstoneEmblem({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className} shrink-0`} aria-hidden="true">
      <Image
        src="/images/branding/gemstone-emblem.png"
        alt="LibraGems Master-Cut Gemstone Emblem"
        fill
        sizes="48px"
        className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        priority
      />
    </span>
  );
}
