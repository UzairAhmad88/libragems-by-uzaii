import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "untreated" | "stabilized" | "verified" | "pending" | "accent";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-beige text-stone border-border",
    untreated: "bg-forest/10 text-forest border-forest/20 font-medium",
    stabilized: "bg-amber-50 text-amber-900 border-amber-200 font-medium",
    verified: "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium",
    pending: "bg-sand/30 text-stone border-border font-normal",
    accent: "bg-champagne/15 text-forest-deep border-champagne/40 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
