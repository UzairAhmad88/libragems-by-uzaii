import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { EnquiryStatus } from "@/types/database.types";

interface AdminEnquiryListItem {
  id: string;
  reference_number: string;
  customer_name: string;
  company_name: string | null;
  email: string;
  country: string | null;
  gemstone_interest: string;
  quantity_specs: string | null;
  status: string;
  priority: string;
  created_at: string;
}

const SEED_ENQUIRIES: AdminEnquiryListItem[] = [
  {
    id: "10001",
    reference_number: "ENQ-2026-10001",
    customer_name: "Julian Vance",
    company_name: "Vance Lapidary Atelier & Fine Gems",
    email: "j.vance@vancegems.co.uk",
    country: "United Kingdom",
    gemstone_interest: "Commercial-Quality Rough Hessonite Garnet (LG-HG-001)",
    quantity_specs: "1,000 g split inquiry",
    status: "new",
    priority: "high",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "10002",
    reference_number: "ENQ-2026-10002",
    customer_name: "Elena Rostova",
    company_name: "Rostova Gioielli S.r.l.",
    email: "elena@rostovagioielli.it",
    country: "Italy",
    gemstone_interest: "Commercial-Quality Turquoise (LG-TQ-001)",
    quantity_specs: "2.5 kg selection slabs",
    status: "in_review",
    priority: "normal",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "10003",
    reference_number: "ENQ-2026-10003",
    customer_name: "Marcus Thorne",
    company_name: "Thorne Haute Horlogerie",
    email: "m.thorne@thorne-watches.ch",
    country: "Switzerland",
    gemstone_interest: "Afghanistan Cut-Stone Rubellite (LG-RUB-AFGHAN)",
    quantity_specs: "Single stone memo request",
    status: "qualified",
    priority: "urgent",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "10004",
    reference_number: "ENQ-2026-10004",
    customer_name: "Siddharth Patel",
    company_name: "Devam Gems Private Ltd.",
    email: "spatel@devamgems.in",
    country: "India",
    gemstone_interest: "Custom Rough Tourmaline Sourcing",
    quantity_specs: "500 ct rough crystals",
    status: "replied",
    priority: "normal",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

interface EnquiriesPageProps {
  searchParams: Promise<{
    status?: string;
    priority?: string;
  }>;
}

export default async function AdminEnquiriesPage({ searchParams }: EnquiriesPageProps) {
  const { status: statusFilter } = await searchParams;

  let enquiries = SEED_ENQUIRIES;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      let query = supabase
        .from("enquiries")
        .select("id, reference_number, customer_name, company_name, email, country, gemstone_interest, quantity_specs, status, priority, created_at")
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter as EnquiryStatus);
      }

      const { data: dbEnquiries } = await query;
      if (dbEnquiries && dbEnquiries.length > 0) {
        enquiries = dbEnquiries;
      }
    }
  }

  if (statusFilter && statusFilter !== "all" && !isSupabaseConfigured()) {
    enquiries = enquiries.filter((e) => e.status === statusFilter);
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

  const statusTabs = [
    { label: "All Enquiries", value: "all" },
    { label: "New", value: "new" },
    { label: "In Review", value: "in_review" },
    { label: "Qualified", value: "qualified" },
    { label: "Replied", value: "replied" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Commercial Enquiries Inbox
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Manage international trade enquiries, parcel split inquiries, and Bangkok showroom inspection appointments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {statusTabs.map((tab) => {
          const isActive = (statusFilter || "all") === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/admin/enquiries${tab.value === "all" ? "" : `?status=${tab.value}`}`}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-forest text-white"
                  : "bg-white text-stone border border-border hover:bg-beige"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Enquiries Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Buyer &amp; Company</th>
                <th className="p-3.5">Country</th>
                <th className="p-3.5">Gemstone Interest</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-forest-deep">
                    {enq.reference_number}
                  </td>
                  <td className="p-3.5 text-stone text-[11px]">
                    {new Date(enq.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3.5">
                    <span className="block font-medium text-ink">{enq.customer_name}</span>
                    {enq.company_name && (
                      <span className="block text-[11px] text-stone truncate max-w-[170px]">
                        {enq.company_name}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-stone">{enq.country || "—"}</td>
                  <td className="p-3.5">
                    <span className="block text-ink font-medium truncate max-w-[200px]">
                      {enq.gemstone_interest}
                    </span>
                    {enq.quantity_specs && (
                      <span className="block text-[11px] text-stone truncate max-w-[200px]">
                        Specs: {enq.quantity_specs}
                      </span>
                    )}
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
                      className="inline-flex items-center gap-1 font-medium text-forest hover:text-forest-deep underline"
                    >
                      <span>Review</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
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
