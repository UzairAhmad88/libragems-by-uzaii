import * as React from "react";
import { Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DEFAULT_TEAM = [
  {
    id: "admin-1",
    full_name: "Principal Administrator",
    email: "admin@libragems.internal",
    role: "super_admin",
    is_active: true,
    created_at: "2026-11-10T00:00:00Z",
  },
  {
    id: "admin-2",
    full_name: "Senior Gemologist & Trading Lead",
    email: "trading@libragems.internal",
    role: "administrator",
    is_active: true,
    created_at: "2026-11-10T00:00:00Z",
  },
  {
    id: "admin-3",
    full_name: "Inventory & Lapidary Manager",
    email: "inventory@libragems.internal",
    role: "product_manager",
    is_active: true,
    created_at: "2026-11-10T00:00:00Z",
  },
  {
    id: "admin-4",
    full_name: "International Client Relations Desk",
    email: "desk@libragems.internal",
    role: "enquiry_manager",
    is_active: true,
    created_at: "2026-11-10T00:00:00Z",
  },
];

export default async function AdminTeamPage() {
  let team = DEFAULT_TEAM;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const { data: dbTeam } = await supabase
        .from("admin_profiles")
        .select("*")
        .order("created_at", { ascending: true });

      if (dbTeam && dbTeam.length > 0) {
        team = dbTeam;
      }
    }
  }

  const roleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-900 border-purple-200";
      case "administrator":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "product_manager":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "enquiry_manager":
        return "bg-amber-100 text-amber-900 border-amber-200";
      default:
        return "bg-stone/10 text-stone border-border";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Team &amp; Administrative RBAC
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Manage authorized personnel, role assignments, and cryptographic security boundaries. Public registration is strictly disabled.
        </p>
      </div>

      {/* Security Banner */}
      <div className="rounded-xl border border-champagne/50 bg-ivory p-4 text-xs flex items-start gap-3">
        <Lock className="h-5 w-5 text-champagne shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-forest-deep">
            Closed Authentication Architecture
          </h4>
          <p className="text-stone leading-relaxed text-[11px]">
            In strict compliance with LibraGems security directives, public sign-ups are disabled at the Supabase Auth layer. Administrative accounts are created exclusively through administrative invitation and must have a corresponding active record in the <code className="bg-beige/60 px-1 py-0.5 rounded text-ink">public.admin_profiles</code> table.
          </p>
        </div>
      </div>

      {/* Team Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-stone uppercase tracking-wider font-semibold text-[10px]">
                <th className="p-3.5">Personnel Name</th>
                <th className="p-3.5">Administrative Email</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="p-3.5 font-medium text-ink text-sm">
                    {member.full_name}
                  </td>
                  <td className="p-3.5 font-mono text-stone">{member.email}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold border ${roleBadge(
                        member.role
                      )} uppercase tracking-wider`}
                    >
                      {member.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        member.is_active
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {member.is_active ? "ACTIVE" : "SUSPENDED"}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone text-[11px]">
                    {new Date(member.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Definitions Grid */}
      <div>
        <h3 className="font-serif text-xl font-medium text-forest-deep mb-4">
          Role-Based Access Matrix
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-5 shadow-subtle space-y-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-purple-100 text-purple-900 border border-purple-200 uppercase tracking-wider">
              Super Admin
            </span>
            <h4 className="font-serif text-base font-medium text-forest-deep">Full Governance</h4>
            <p className="text-xs text-stone leading-relaxed">
              Complete authority across database schema, team provisioning, category hierarchy, gemstone publication, and enquiry destruction.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-subtle space-y-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider">
              Administrator
            </span>
            <h4 className="font-serif text-base font-medium text-forest-deep">Trading Lead</h4>
            <p className="text-xs text-stone leading-relaxed">
              Full authority across gemstones, categories, commercial enquiries, and audit inspection. Cannot alter super admin credentials.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-subtle space-y-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
              Product Manager
            </span>
            <h4 className="font-serif text-base font-medium text-forest-deep">Inventory &amp; Lapidary</h4>
            <p className="text-xs text-stone leading-relaxed">
              Manages gemstone lots, physical specifications, photography uploads, and CIBJO disclosures. Read-only enquiry access.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-subtle space-y-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-900 border-amber-200 uppercase tracking-wider">
              Enquiry Manager
            </span>
            <h4 className="font-serif text-base font-medium text-forest-deep">Client Relations</h4>
            <p className="text-xs text-stone leading-relaxed">
              Reviews incoming buyer inquiries, advances handling statuses, updates internal notes, and coordinates Bangkok showroom visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
