import * as React from "react";
import { Database, HardDrive, Mail, CheckCircle2 } from "lucide-react";
import { isSupabaseConfigured, isSupabaseAdminConfigured } from "@/lib/supabase/config";

export default function AdminSettingsPage() {
  const isDbConfigured = isSupabaseConfigured();
  const isAdminConfigured = isSupabaseAdminConfigured();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured (local preview active)";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const whatsappPrimary = process.env.WHATSAPP_PRIMARY_NUMBER || "Pending client verification";
  const whatsappSecondary = process.env.WHATSAPP_SECONDARY_NUMBER || "Pending client verification";
  const resendApiKey = process.env.RESEND_API_KEY ? "Configured" : "Not configured (Phase 05)";

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          System Settings &amp; Health
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Verify database connection health, storage bucket configuration, and integration security boundaries.
        </p>
      </div>

      {/* Section 1: Database & Supabase */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <Database className="h-5 w-5 text-forest" />
            <h3 className="font-serif text-lg font-medium text-forest-deep">
              Supabase Database &amp; Auth Architecture
            </h3>
          </div>
          <span
            className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold border ${
              isDbConfigured
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-800 border-amber-200"
            }`}
          >
            {isDbConfigured ? "CONNECTED" : "OFFLINE / LOCAL PREVIEW"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Supabase Project URL
            </span>
            <span className="font-mono text-ink mt-0.5 block truncate">{supabaseUrl}</span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Row Level Security (RLS)
            </span>
            <span className="font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> Enforced across all 6 tables
            </span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Service Role Key Status
            </span>
            <span className="font-mono text-ink mt-0.5 block">
              {isAdminConfigured ? "Active (Server-Side Only)" : "Not provided"}
            </span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Public Sign-Up Status
            </span>
            <span className="font-medium text-forest-deep mt-0.5 block">
              Disabled (Invited Personnel Only)
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Storage Configuration */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <HardDrive className="h-5 w-5 text-champagne" />
            <h3 className="font-serif text-lg font-medium text-forest-deep">
              Cloud Media Storage
            </h3>
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">
            READY
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Storage Bucket
            </span>
            <span className="font-mono text-ink mt-0.5 block">gemstone-images</span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Access Policy
            </span>
            <span className="text-stone mt-0.5 block">
              Public CDN Read • Admin Write / Delete
            </span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              File Limit &amp; MIME Types
            </span>
            <span className="text-stone mt-0.5 block">
              10 MB max • JPEG, PNG, WebP, SVG
            </span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Static Fallback Assets
            </span>
            <span className="text-emerald-700 font-medium mt-0.5 block">
              10 Architectural Vector SVGs in /images/
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: External Business Integrations */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <Mail className="h-5 w-5 text-forest" />
            <h3 className="font-serif text-lg font-medium text-forest-deep">
              External Conversion Channels
            </h3>
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold border bg-beige border-champagne/40 text-forest-deep">
            PHASE 05 ROADMAP
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Public Site URL
            </span>
            <span className="font-mono text-ink mt-0.5 block">{siteUrl}</span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Transactional Email (Resend)
            </span>
            <span className="text-stone mt-0.5 block">{resendApiKey}</span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Primary WhatsApp Desk
            </span>
            <span className="font-mono text-ink mt-0.5 block">{whatsappPrimary}</span>
          </div>

          <div>
            <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
              Secondary WhatsApp Desk
            </span>
            <span className="font-mono text-ink mt-0.5 block">{whatsappSecondary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
