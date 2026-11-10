import * as React from "react";
import { Filter } from "lucide-react";
import { CommunicationsNav } from "@/components/admin/communications-nav";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { EmailEventItem } from "@/components/admin/enquiry-email-timeline";
import { EmailEventStatus, EmailType } from "@/types/database.types";

const DEMO_EMAIL_EVENTS: EmailEventItem[] = [
  {
    id: "evt-101",
    provider: "resend",
    provider_message_id: "res_ack_991823",
    email_type: "customer_acknowledgement",
    recipient: "j.vance@vancegems.co.uk",
    subject: "We Have Received Your Enquiry – Libra Gems",
    status: "delivered",
    sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    delivered_at: new Date(Date.now() - 3600000 * 2 + 12000).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "evt-102",
    provider: "resend",
    provider_message_id: "res_notif_991824",
    email_type: "admin_notification",
    recipient: "trading-desk@libragems.net",
    subject: "[New Trade Enquiry] ENQ-2026-10001 – Commercial Hessonite",
    status: "delivered",
    sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    delivered_at: new Date(Date.now() - 3600000 * 2 + 15000).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "evt-103",
    provider: "resend",
    provider_message_id: "res_ack_991801",
    email_type: "customer_acknowledgement",
    recipient: "elena@rostovagioielli.it",
    subject: "We Have Received Your Enquiry – Libra Gems",
    status: "delivered",
    sent_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    delivered_at: new Date(Date.now() - 3600000 * 6 + 18000).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "evt-104",
    provider: "resend",
    provider_message_id: "res_ack_991750",
    email_type: "customer_acknowledgement",
    recipient: "m.thorne@thorne-watches.ch",
    subject: "We Have Received Your Enquiry – Libra Gems",
    status: "delivered",
    sent_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    delivered_at: new Date(Date.now() - 3600000 * 18 + 10000).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "evt-105",
    provider: "resend",
    provider_message_id: "res_resp_991765",
    email_type: "admin_response",
    recipient: "m.thorne@thorne-watches.ch",
    subject: "Re: Your Libra Gems Enquiry – ENQ-2026-10003",
    status: "sent",
    sent_at: new Date(Date.now() - 3600000 * 16).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
  },
  {
    id: "evt-106",
    provider: "resend",
    email_type: "customer_acknowledgement",
    recipient: "invalid-user@typo-domain-xyz9912.invalid",
    subject: "We Have Received Your Enquiry – Libra Gems",
    status: "bounced",
    last_error: "Recipient MX mailbox not found (550 No Such User Here).",
    failed_at: new Date(Date.now() - 3600000 * 30).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
];

interface EmailEventsPageProps {
  searchParams: Promise<{
    status?: string;
    type?: string;
  }>;
}

export default async function EmailEventsPage({ searchParams }: EmailEventsPageProps) {
  const { status, type } = await searchParams;

  let events: EmailEventItem[] = DEMO_EMAIL_EVENTS;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      let query = supabase
        .from("email_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (status && status !== "all") {
        query = query.eq("status", status as EmailEventStatus);
      }
      if (type && type !== "all") {
        query = query.eq("email_type", type as EmailType);
      }

      const { data } = await query;
      if (data && data.length > 0) {
        events = data as EmailEventItem[];
      }
    }
  }

  // Filter in memory for fallback mode
  if (status && status !== "all") {
    events = events.filter((e) => e.status === status);
  }
  if (type && type !== "all") {
    events = events.filter((e) => e.email_type === type);
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-medium text-forest-deep">
          Email Delivery Events &amp; Audit Logs
        </h2>
        <p className="text-xs text-stone mt-1">
          Complete ledger of transactional emails dispatched by LibraGems, grounded in provider delivery confirmations.
        </p>
      </div>

      <CommunicationsNav />

      {/* Filter Bar */}
      <div className="rounded-xl border border-border bg-white p-4 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone">
          <Filter className="h-4 w-4 text-forest" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Showing {events.length} Events
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            defaultValue={status || "all"}
            className="rounded-lg border border-border bg-ivory/50 px-3 py-1.5 text-xs text-ink focus:border-forest focus:outline-none"
          >
            <option value="all">All Delivery Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="sent">Sent (MTA)</option>
            <option value="bounced">Bounced</option>
            <option value="failed">Failed</option>
            <option value="suppressed">Suppressed</option>
          </select>

          <select
            defaultValue={type || "all"}
            className="rounded-lg border border-border bg-ivory/50 px-3 py-1.5 text-xs text-ink focus:border-forest focus:outline-none"
          >
            <option value="all">All Communication Types</option>
            <option value="customer_acknowledgement">Customer Acknowledgements</option>
            <option value="admin_notification">Internal Admin Alerts</option>
            <option value="admin_response">Trading Desk Replies</option>
            <option value="status_update">Status Updates</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-xl border border-border bg-white shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory/60 border-b border-border text-[10px] uppercase font-semibold text-stone tracking-wider">
              <tr>
                <th className="p-3.5 pl-5">Communication Type</th>
                <th className="p-3.5">Recipient</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Provider ID</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5">Dispatched</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 pl-5 font-semibold text-forest-deep">
                    {ev.email_type.replace(/_/g, " ").toUpperCase()}
                  </td>
                  <td className="p-3.5 font-mono text-ink">{ev.recipient}</td>
                  <td className="p-3.5 text-ink max-w-xs truncate">{ev.subject}</td>
                  <td className="p-3.5 font-mono text-[10px] text-stone">
                    {ev.provider_message_id || "—"}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        ev.status === "delivered"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : ev.status === "sent"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : ev.status === "bounced"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-stone font-mono text-[11px]">
                    {new Date(ev.created_at).toLocaleString("en-GB", {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "Asia/Bangkok",
                    })}{" "}
                    ICT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
