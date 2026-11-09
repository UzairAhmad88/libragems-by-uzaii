"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, ShieldAlert, Mail, ArrowRight } from "lucide-react";
import { cn, buildWhatsAppLink } from "@/lib/utils";

export interface WhatsAppCtaProps {
  productTitle: string;
  lotReference: string;
  className?: string;
}

export function WhatsAppCta({ productTitle, lotReference, className }: WhatsAppCtaProps) {
  const [advisoryOpen, setAdvisoryOpen] = React.useState(false);

  // In accordance with ADR-09 and Phase 02/03 gating rules:
  // Telephone and WhatsApp numbers remain UNVERIFIED pending client confirmation.
  // We do NOT activate placeholder numbers.
  const isNumberVerified = false; // Set to true only when executive management provides verified credentials.

  const whatsappMessage = `Hello LibraGems Trading Desk, I am interested in inquiring about ${productTitle} (Ref: ${lotReference}). Please provide commercial lot terms and viewing availability.`;

  return (
    <div className={cn("space-y-3", className)}>
      {isNumberVerified ? (
        <a
          href={buildWhatsAppLink("+66846674833", whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#20BA5A] focus-visible:outline-champagne"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Inquire via WhatsApp Desk</span>
        </a>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setAdvisoryOpen(!advisoryOpen)}
            aria-expanded={advisoryOpen}
            className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-border bg-beige/80 px-4 py-3 text-left transition-colors hover:border-champagne focus-visible:outline-champagne"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone/10 text-stone">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-forest-deep">
                  WhatsApp Direct Desk • Status: Pending Verification
                </p>
                <p className="text-[11px] text-stone">
                  Click to view trade enquiry advisory
                </p>
              </div>
            </div>
            <span className="rounded bg-sand/50 px-2 py-0.5 text-[10px] font-medium text-stone uppercase">
              Advisory
            </span>
          </button>

          {advisoryOpen && (
            <div className="mt-2 rounded-xl border border-champagne/40 bg-white p-4 shadow-sm text-xs text-stone space-y-2 animate-in fade-in duration-200">
              <div className="flex items-start gap-2 text-forest-deep font-medium">
                <ShieldAlert className="h-4 w-4 shrink-0 text-champagne mt-0.5" />
                <span>Executive Contact Verification Protocol (ADR-09)</span>
              </div>
              <p className="leading-relaxed">
                Direct WhatsApp trading extensions for Naeem Khan and Sana Khan are currently
                undergoing formal company re-verification. In compliance with our non-fabrication
                standard, placeholder numbers are deactivated.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest px-3.5 py-2 text-xs font-medium text-white hover:bg-forest-deep transition-colors"
                >
                  <span>Submit Web Trade Enquiry</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={`mailto:info@libragems.net?subject=${encodeURIComponent(
                    `Enquiry: ${productTitle} (${lotReference})`
                  )}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-forest-deep hover:bg-beige transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-forest" />
                  <span>Email: info@libragems.net</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
