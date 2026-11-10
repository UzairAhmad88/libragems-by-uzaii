import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { CommunicationsNav } from "@/components/admin/communications-nav";
import { OutboxActions } from "@/components/admin/outbox-actions";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface OutboxItem {
  id: string;
  event_type: string;
  entity_type: string;
  entity_id: string;
  payload: Record<string, unknown>;
  status: string;
  attempt_count: number;
  max_attempts: number;
  next_attempt_at: string;
  processed_at?: string | null;
  last_error?: string | null;
  created_at: string;
}

const DEMO_OUTBOX_ITEMS: OutboxItem[] = [
  {
    id: "out-001",
    event_type: "enquiry_created",
    entity_type: "enquiry",
    entity_id: "ENQ-2026-10001",
    payload: {
      type: "customer_acknowledgement",
      referenceNumber: "ENQ-2026-10001",
      customerName: "Julian Vance",
      email: "j.vance@vancegems.co.uk",
      gemstoneInterest: "Commercial-Quality Rough Hessonite Garnet",
    },
    status: "completed",
    attempt_count: 1,
    max_attempts: 5,
    next_attempt_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    processed_at: new Date(Date.now() - 3600000 * 2 + 1000).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "out-002",
    event_type: "enquiry_created",
    entity_type: "enquiry",
    entity_id: "ENQ-2026-10001",
    payload: {
      type: "admin_notification",
      referenceNumber: "ENQ-2026-10001",
      customerName: "Julian Vance",
      email: "j.vance@vancegems.co.uk",
      gemstoneInterest: "Commercial-Quality Rough Hessonite Garnet",
    },
    status: "completed",
    attempt_count: 1,
    max_attempts: 5,
    next_attempt_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    processed_at: new Date(Date.now() - 3600000 * 2 + 1200).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "out-003",
    event_type: "enquiry_created",
    entity_type: "enquiry",
    entity_id: "ENQ-2026-10002",
    payload: {
      type: "customer_acknowledgement",
      referenceNumber: "ENQ-2026-10002",
      customerName: "Elena Rostova",
      email: "elena@rostovagioielli.it",
      gemstoneInterest: "Commercial-Quality Turquoise",
    },
    status: "completed",
    attempt_count: 1,
    max_attempts: 5,
    next_attempt_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    processed_at: new Date(Date.now() - 3600000 * 6 + 900).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

export default async function OutboxManagementPage() {
  let items: OutboxItem[] = DEMO_OUTBOX_ITEMS;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from("notification_outbox")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (data && data.length > 0) {
        items = data as OutboxItem[];
      }
    }
  }

  const pendingCount = items.filter((i) => i.status === "pending" || i.status === "processing").length;
  const completedCount = items.filter((i) => i.status === "completed").length;
  const failedCount = items.filter((i) => i.status === "failed").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-medium text-forest-deep">
            Transactional Notification Outbox
          </h2>
          <p className="text-xs text-stone mt-1">
            Asynchronous queue engine guaranteeing zero customer enquiry loss, exponential backoff, and delivery retries.
          </p>
        </div>

        <OutboxActions />
      </div>

      <CommunicationsNav />

      {/* Outbox Resilience Guarantee Card */}
      <div className="rounded-xl border border-champagne/50 bg-ivory p-4 text-xs text-stone flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-forest shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-forest-deep block">
            Zero-Loss Outbox Architecture
          </span>
          <p className="text-[11px] leading-relaxed">
            Public enquiries are committed to PostgreSQL before email delivery attempts occur. If Resend experiences temporary degradation or rate-limiting, outbox jobs automatically reschedule using exponential backoff (2, 4, 8, 16 minutes) up to 5 attempts.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4 shadow-subtle">
          <span className="text-[11px] uppercase tracking-wider text-stone font-semibold">Active Queue</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium text-forest-deep">{pendingCount}</span>
            <span className="text-[11px] text-stone">pending / processing</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-subtle">
          <span className="text-[11px] uppercase tracking-wider text-stone font-semibold">Successfully Executed</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium text-emerald-700">{completedCount}</span>
            <span className="text-[11px] text-stone">jobs completed</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-subtle">
          <span className="text-[11px] uppercase tracking-wider text-stone font-semibold">Exhausted Retries</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium text-rose-700">{failedCount}</span>
            <span className="text-[11px] text-stone">manual review</span>
          </div>
        </div>
      </div>

      {/* Outbox Items Table */}
      <div className="rounded-xl border border-border bg-white shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-serif text-base font-medium text-forest-deep">
            Queued Notification Tasks ({items.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory/60 border-b border-border text-[10px] uppercase font-semibold text-stone tracking-wider">
              <tr>
                <th className="p-3.5 pl-5">Event Type</th>
                <th className="p-3.5">Notification Payload</th>
                <th className="p-3.5">Attempts</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Next Execution</th>
                <th className="p-3.5 pr-5">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 pl-5 font-medium text-forest-deep">
                    <span className="font-mono text-xs">{item.event_type}</span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-ink">
                    <span className="font-semibold">{String(item.payload?.type || "unknown")}</span> &bull; Ref: {String(item.payload?.referenceNumber || item.entity_id)}
                  </td>
                  <td className="p-3.5 text-stone font-mono">
                    {item.attempt_count} / {item.max_attempts}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        item.status === "completed"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : item.status === "processing"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : item.status === "failed"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone font-mono text-[11px]">
                    {item.processed_at
                      ? "Executed"
                      : new Date(item.next_attempt_at).toLocaleTimeString("en-GB", {
                          timeZone: "Asia/Bangkok",
                          hour: "2-digit",
                          minute: "2-digit",
                        }) + " ICT"}
                  </td>
                  <td className="p-3.5 pr-5 text-stone font-mono text-[11px]">
                    {new Date(item.created_at).toLocaleString("en-GB", {
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
