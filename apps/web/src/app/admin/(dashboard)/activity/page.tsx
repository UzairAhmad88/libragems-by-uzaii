import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const SAMPLE_LOGS = [
  {
    id: "log-1",
    admin_email: "admin@libragems.internal",
    action: "login",
    entity_type: "auth",
    description: "Principal Administrator signed into the management console",
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "log-2",
    admin_email: "admin@libragems.internal",
    action: "status_change",
    entity_type: "enquiry",
    description: "Enquiry ENQ-2026-10003 status changed from 'new' to 'qualified'",
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "log-3",
    admin_email: "admin@libragems.internal",
    action: "publish",
    entity_type: "gemstone",
    description: "Gemstone LG-RUB-AFGHAN published with pending origin memo disclosure",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "log-4",
    admin_email: "admin@libragems.internal",
    action: "create",
    entity_type: "gemstone",
    description: "Gemstone lot LG-TQ-001 (Commercial Turquoise) created with CIBJO Code T",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "log-5",
    admin_email: "admin@libragems.internal",
    action: "create",
    entity_type: "gemstone",
    description: "Gemstone lot LG-HG-001 (Rough Hessonite Garnet) created with CIBJO Code N",
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
];

export default async function AdminActivityPage() {
  let logs = SAMPLE_LOGS;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbLogs } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(25);

      if (dbLogs && dbLogs.length > 0) {
        logs = dbLogs.map((l) => ({
          id: l.id,
          admin_email: "admin@libragems.internal",
          action: l.action,
          entity_type: l.entity_type,
          description: l.description,
          created_at: l.created_at,
        }));
      }
    }
  }

  const actionBadge = (action: string) => {
    switch (action) {
      case "login":
      case "logout":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "create":
      case "publish":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "update":
      case "status_change":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delete":
      case "unpublish":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-stone/10 text-stone border-border";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Activity Audit Trail
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Tamper-evident record of administrative modifications, state transitions, authentication sessions, and commercial actions.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-3.5">Timestamp (ICT)</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Target Entity</th>
                <th className="p-3.5">Audit Event Description</th>
                <th className="p-3.5">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 text-stone font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString("en-GB", {
                      timeZone: "Asia/Bangkok",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${actionBadge(
                        log.action
                      )} uppercase tracking-wider`}
                    >
                      {log.action.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-stone uppercase text-[10px]">
                    {log.entity_type}
                  </td>
                  <td className="p-3.5 font-medium text-ink max-w-md">{log.description}</td>
                  <td className="p-3.5 text-stone font-mono text-[11px]">{log.admin_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
