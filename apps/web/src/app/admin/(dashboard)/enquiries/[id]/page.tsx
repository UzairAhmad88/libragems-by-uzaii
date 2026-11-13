import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminResponseComposer } from "@/components/admin/admin-response-composer";
import { EnquiryEmailTimeline, EmailEventItem } from "@/components/admin/enquiry-email-timeline";

interface AdminEnquiryDetail {
  id: string;
  reference_number: string;
  customer_name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  gemstone_interest: string;
  quantity_specs: string | null;
  subject: string;
  message: string;
  enquiry_type: string;
  status: string;
  priority: string;
  internal_notes: string | null;
  source_page: string | null;
  created_at: string;
}

const FALLBACK_ENQUIRIES_MAP: Record<string, AdminEnquiryDetail> = {
  "10001": {
    id: "10001",
    reference_number: "ENQ-2026-10001",
    customer_name: "Julian Vance",
    company_name: "Vance Lapidary Atelier & Fine Gems",
    email: "j.vance@vancegems.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    gemstone_interest: "Commercial-Quality Rough Hessonite Garnet (LG-HG-001)",
    quantity_specs: "1,000 g split inquiry",
    subject: "Inquiry regarding 1,000g parcel split from Ceylon Hessonite",
    message:
      "Good morning. We are interested in securing 1,000g from the 5,000g Ceylon Hessonite parcel (LG-HG-001) for a collection of calibrated cabochons. Could you confirm sieve size distribution between 12-18mm and discuss delivery timelines to London?",
    enquiry_type: "parcel_split",
    status: "new",
    priority: "high",
    internal_notes: "High-intent buyer. Verified UK business registry. Ready to evaluate parcel sieve breakdown.",
    source_page: "/catalogue/hessonite-garnet",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  "10002": {
    id: "10002",
    reference_number: "ENQ-2026-10002",
    customer_name: "Elena Rostova",
    company_name: "Rostova Gioielli S.r.l.",
    email: "elena@rostovagioielli.it",
    phone: "+39 02 8876 5432",
    country: "Italy",
    gemstone_interest: "Commercial-Quality Turquoise (LG-TQ-001)",
    quantity_specs: "2.5 kg selection slabs",
    subject: "Wholesale Turquoise Slab Inquiry for Spring 2027 Line",
    message:
      "Salve. We manufacture sterling silver jewelry in Valenza. We would like to arrange a private video inspection of the spiderweb matrix slabs from LG-TQ-001 to select 2.5 kg for calibrated inlay cutting.",
    enquiry_type: "gemstone_lot",
    status: "in_review",
    priority: "normal",
    internal_notes: "Video consultation requested via WhatsApp. Forwarded to Bangkok desk.",
    source_page: "/catalogue/turquoise",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  "10003": {
    id: "10003",
    reference_number: "ENQ-2026-10003",
    customer_name: "Marcus Thorne",
    company_name: "Thorne Haute Horlogerie",
    email: "m.thorne@thorne-watches.ch",
    phone: "+41 22 555 0198",
    country: "Switzerland",
    gemstone_interest: "Afghanistan Cut-Stone Rubellite (LG-RUB-AFGHAN)",
    quantity_specs: "Single stone memo request",
    subject: "Origin Testing Memo & Viewing Request in Bangkok",
    message:
      "Dear LibraGems Team, we are reviewing candidate centerpiece stones for a bespoke timepiece bezel. Is the Afghan Rubellite available for private viewing at your Silom showroom, and can a Lotus Gemology origin memo be finalized prior to memo release?",
    enquiry_type: "showroom_appointment",
    status: "qualified",
    priority: "urgent",
    internal_notes: "VIP watchmaker client. Showroom appointment tentatively scheduled for next Thursday.",
    source_page: "/catalogue/afghanistan-rubellite",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
};

interface EnquiryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEnquiryDetailPage({ params }: EnquiryDetailPageProps) {
  const { id } = await params;

  let enquiry = FALLBACK_ENQUIRIES_MAP[id] || FALLBACK_ENQUIRIES_MAP["10001"];
  let emailEvents: EmailEventItem[] = [];

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbEnq } = await supabase
        .from("enquiries")
        .select("*")
        .or(`id.eq.${id},reference_number.eq.${id}`)
        .single();

      if (dbEnq) {
        enquiry = dbEnq;

        // Fetch related email delivery events
        const { data: events } = await supabase
          .from("email_events")
          .select("*")
          .eq("enquiry_id", dbEnq.id)
          .order("created_at", { ascending: false });

        if (events && events.length > 0) {
          emailEvents = events as EmailEventItem[];
        }
      }
    }
  }

  // Fallback demo events for unconfigured local showcase
  if (emailEvents.length === 0) {
    emailEvents = [
      {
        id: "evt-001",
        provider: "resend",
        provider_message_id: "msg_20261110_ak982",
        email_type: "customer_acknowledgement",
        recipient: enquiry.email,
        subject: "We Have Received Your Enquiry – Libra Gems",
        status: "delivered",
        sent_at: enquiry.created_at,
        delivered_at: new Date(new Date(enquiry.created_at).getTime() + 14000).toISOString(),
        created_at: enquiry.created_at,
      },
      {
        id: "evt-002",
        provider: "resend",
        provider_message_id: "msg_20261110_in771",
        email_type: "admin_notification",
        recipient: "info@libragems1.com",
        subject: `[New Trade Enquiry] ${enquiry.reference_number} – ${enquiry.gemstone_interest}`,
        status: "delivered",
        sent_at: enquiry.created_at,
        delivered_at: new Date(new Date(enquiry.created_at).getTime() + 18000).toISOString(),
        created_at: enquiry.created_at,
      },
    ];
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone hover:text-forest transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Enquiries Inbox</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold text-stone uppercase tracking-wider">
            Commercial Intake Dossier
          </span>
          <h2 className="font-serif text-2xl font-medium text-forest-deep mt-0.5">
            {enquiry.reference_number}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            {enquiry.status.replace("_", " ")}
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
            {enquiry.priority} Priority
          </span>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Buyer & Requirements (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Buyer Profile */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
              Commercial Buyer Profile
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Contact Name
                </span>
                <span className="font-medium text-ink text-sm">{enquiry.customer_name}</span>
              </div>

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Company / Entity
                </span>
                <span className="font-medium text-ink text-sm">
                  {enquiry.company_name || "Private Lapidary / Collector"}
                </span>
              </div>

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Email Address
                </span>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="font-medium text-forest hover:underline"
                >
                  {enquiry.email}
                </a>
              </div>

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Telephone / WhatsApp
                </span>
                <span className="font-medium text-ink">{enquiry.phone || "Not specified"}</span>
              </div>

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Country of Operation
                </span>
                <span className="font-medium text-ink">{enquiry.country || "Not specified"}</span>
              </div>

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Intake Timestamp
                </span>
                <span className="text-stone">
                  {new Date(enquiry.created_at).toLocaleString("en-GB", {
                    timeZone: "Asia/Bangkok",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  (Bangkok ICT)
                </span>
              </div>
            </div>
          </div>

          {/* Trade Requirement & Message */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
              Trade Requirement Specifications
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Material / Lot of Interest
                </span>
                <span className="font-medium text-ink text-sm">{enquiry.gemstone_interest}</span>
              </div>

              {enquiry.quantity_specs && (
                <div>
                  <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                    Target Quantity / Sieve Sizing
                  </span>
                  <span className="font-mono text-ink bg-ivory px-2 py-1 rounded inline-block mt-0.5">
                    {enquiry.quantity_specs}
                  </span>
                </div>
              )}

              <div>
                <span className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                  Transmitted Requirements
                </span>
                <div className="mt-1.5 rounded-lg border border-border bg-ivory/60 p-4 font-sans text-xs text-ink leading-relaxed whitespace-pre-wrap">
                  {enquiry.message}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 05: Official Response Composer */}
          <AdminResponseComposer
            enquiryId={enquiry.id}
            referenceNumber={enquiry.reference_number}
            customerName={enquiry.customer_name}
            customerEmail={enquiry.email}
            gemstoneInterest={enquiry.gemstone_interest}
          />

          {/* Phase 05: Email Events Timeline */}
          <EnquiryEmailTimeline events={emailEvents} />
        </div>

        {/* Right Column: Internal Management & Notes (1 col) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4 text-xs">
            <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
              Internal Handling
            </h3>

            <div>
              <label className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                Enquiry Status
              </label>
              <select
                defaultValue={enquiry.status}
                className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 text-xs text-ink focus:border-forest focus:outline-none"
              >
                <option value="new">New Inquiry</option>
                <option value="in_review">In Review (Trading Desk)</option>
                <option value="replied">Formal Proposal Sent</option>
                <option value="qualified">Qualified Buyer</option>
                <option value="converted">Transaction Completed</option>
                <option value="closed">Closed / Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                Priority Tier
              </label>
              <select
                defaultValue={enquiry.priority}
                className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 text-xs text-ink focus:border-forest focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Commercial</option>
                <option value="high">High Commercial Priority</option>
                <option value="urgent">Urgent VIP / Showroom</option>
              </select>
            </div>

            <div>
              <label className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                Assigned Gemologist
              </label>
              <input
                type="text"
                readOnly
                value="Bangkok Desk (Assigned)"
                className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 text-xs text-stone"
              />
            </div>

            <div>
              <label className="block text-stone font-semibold uppercase tracking-wider text-[10px]">
                Internal Gemological Notes
              </label>
              <textarea
                rows={4}
                defaultValue={enquiry.internal_notes || ""}
                placeholder="Record client creditworthiness, parcel inspection feedback, or laboratory memo numbers..."
                className="mt-1.5 block w-full rounded-lg border border-border bg-ivory/50 p-3 text-xs text-ink focus:border-forest focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-forest-deep px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-forest transition-colors shadow-sm"
            >
              Update Handling Status
            </button>
          </div>

          <div className="rounded-xl border border-champagne/40 bg-ivory p-4 text-xs text-stone space-y-1.5">
            <span className="font-semibold text-forest-deep block">Security Audit Notice</span>
            <p className="text-[11px] leading-relaxed">
              Enquiry modifications and internal notes are audited under Row Level Security. Only authorized staff may view client contact details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
