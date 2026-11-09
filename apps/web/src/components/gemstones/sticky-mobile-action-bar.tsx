"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export interface StickyMobileActionBarProps {
  productTitle: string;
  lotReference: string;
}

export function StickyMobileActionBar({ productTitle, lotReference }: StickyMobileActionBarProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user has scrolled 350px past hero
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ivory/95 px-4 py-3 backdrop-blur-md shadow-lg transition-transform duration-300 lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-forest-deep">{productTitle}</p>
          <p className="text-[10px] text-stone">Ref: {lotReference} • Bang Rak, Bangkok</p>
        </div>
        <Link
          href={`/contact?gemstone=${encodeURIComponent(lotReference)}`}
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-forest px-5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Inquire on Lot</span>
        </Link>
      </div>
    </div>
  );
}
