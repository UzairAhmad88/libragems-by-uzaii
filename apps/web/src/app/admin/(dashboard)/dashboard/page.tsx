import * as React from "react";
import Link from "next/link";
import {
  Gem,
  Inbox,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { GEMSTONE_PRODUCTS } from "@/data/gemstones";

interface DashboardEnquiry {
  id: string;
  reference_number: string;
  customer_name: string;
  company_name: string | null;
  gemstone_interest: string;
  status: string;
  priority: string;
  created_at: string;
}

// Sample enquiries fallback when offline
const FALLBACK_ENQUIRIES: DashboardEnquiry[] = [
  {
    id: "1",
    reference_number: "ENQ-2026-10001",
    customer_name: "Julian Vance",
    company_name: "Vance Lapidary Atelier",
    gemstone_interest: "Rough Hessonite Garnet (LG-HG-001)",
    status: "new",
    priority: "high",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "2",
    reference_number: "ENQ-2026-10002",
    customer_name: "Elena Rostova",
    company_name: "Rostova Gioielli S.r.l.",
    gemstone_interest: "Commercial Turquoise (LG-TQ-001)",
    status: "in_review",
    priority: "normal",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "3",
    reference_number: "ENQ-2026-10003",
    customer_name: "Marcus Thorne",
    company_name: "Thorne Haute Horlogerie",
    gemstone_interest: "Afghanistan Cut Rubellite (LG-RUB-AFGHAN)",
    status: "qualified",
    priority: "urgent",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export default async function AdminDashboardPage() {
  let enquiries = FALLBACK_ENQUIRIES;
  let gemstoneCount = GEMSTONE_PRODUCTS.length;
  let totalEnquiriesCount = FALLBACK_ENQUIRIES.length;
  let newEnquiriesCount = FALLBACK_ENQUIRIES.filter((e) => e.status === "new").length;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbEnquiries, count } = await supabase
        .from("enquiries")
        .select("id, reference_number, customer_name, company_name, gemstone_interest, status, priority, created_at", {
          count: "exact",
        })
        .order("created_at", { ascending: false })
        .limit(5);

      if (dbEnquiries && dbEnquiries.length > 0) {
        enquiries = dbEnquiries;
        totalEnquiriesCount = count || dbEnquiries.length;
        newEnquiriesCount = dbEnquiries.filter((e) => e.status === "new").length;
      }

      const { count: dbGemstoneCount } = await supabase
        .from("gemstones")
        .select("id", { count: "exact", head: true });

      if (dbGemstoneCount !== null && dbGemstoneCount !== undefined) {
        gemstoneCount = dbGemstoneCount;
      }
    }
  }

  const priorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-stone/10 text-stone border-border";
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "qualified":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "replied":
        return "bg-champagne/30 text-forest-deep border-champagne/40";
      default:
        return "bg-stone/10 text-stone border-border";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Trade Desk Overview
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Operational summary of colored gemstone inventory, international B2B inquiries, and Bangkok showroom transactions.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone">
              Active Gemstones
            </span>
            <div className="h-8 w-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
              <Gem className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-medium text-forest-deep">
            {gemstoneCount} Lots
          </p>
          <p className="mt-1 text-[11px] text-stone">
            All lots conform to CIBJO Code standards
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone">
              Pending Enquiries
            </span>
            <div className="h-8 w-8 rounded-lg bg-champagne/20 flex items-center justify-center text-champagne">
              <Inbox className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-medium text-forest-deep">
            {newEnquiriesCount} New
          </p>
          <p className="mt-1 text-[11px] text-stone">
            {totalEnquiriesCount} total commercial enquiries logged
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone">
              Inquiry Channels
            </span>
            <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-medium text-forest-deep">
            100% B2B
          </p>
          <p className="mt-1 text-[11px] text-stone">
            Web Portal • WhatsApp • Direct Email
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone">
              Security Posture
            </span>
            <div className="h-8 w-8 rounded-lg bg-forest-deep/10 flex items-center justify-center text-forest-deep">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-medium text-emerald-700">
            RLS Active
          </p>
          <p className="mt-1 text-[11px] text-stone">
            PostgreSQL Role-Based Access Control
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Enquiries & Active Lots */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Enquiries (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium text-forest-deep">
              Recent Commercial Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:text-forest-deep"
            >
              <span>View All Enquiries</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Buyer &amp; Company</th>
                    <th className="p-3.5">Gemstone Interest</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="p-3.5 font-mono font-medium text-forest-deep">
                        {enq.reference_number}
                      </td>
                      <td className="p-3.5">
                        <span className="block font-medium text-ink">{enq.customer_name}</span>
                        {enq.company_name && (
                          <span className="block text-[11px] text-stone truncate max-w-[160px]">
                            {enq.company_name}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-ink truncate max-w-[180px]">
                        {enq.gemstone_interest}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${priorityBadge(
                            enq.priority
                          )}`}
                        >
                          {enq.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${statusBadge(
                            enq.status
                          )}`}
                        >
                          {enq.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/admin/enquiries/${enq.id}`}
                          className="font-medium text-forest hover:text-forest-deep underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Active Inventory Lots (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium text-forest-deep">
              Catalogue Inventory
            </h3>
            <Link
              href="/admin/gemstones"
              className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:text-forest-deep"
            >
              <span>Manage</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {GEMSTONE_PRODUCTS.map((gem) => (
              <div
                key={gem.id}
                className="rounded-xl border border-border bg-white p-4 shadow-subtle hover:border-champagne/60 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-semibold text-stone uppercase tracking-wider">
                      {gem.lotReference}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-forest-deep mt-0.5">
                      {gem.name}
                    </h4>
                  </div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-stone">
                  <span>{gem.form}</span>
                  <span>CIBJO {gem.treatment.cibjoCode}</span>
                  <Link
                    href={`/catalogue/${gem.slug}`}
                    target="_blank"
                    className="text-forest font-medium hover:underline"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick System Action */}
          <div className="rounded-xl border border-champagne/40 bg-ivory p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-forest-deep">
              <CheckCircle2 className="h-4 w-4 text-forest" />
              <span>Bangkok Compliance Checklist</span>
            </div>
            <p className="text-stone leading-relaxed text-[11px]">
              Every lot meets CIBJO diamond and colored stone disclosure guidelines with mandatory geographic origin disclosure notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
