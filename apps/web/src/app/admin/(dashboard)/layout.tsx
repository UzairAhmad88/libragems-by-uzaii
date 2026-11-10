import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Gem,
  FolderTree,
  Inbox,
  Users,
  History,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { getCurrentAdmin, CurrentAdmin } from "@/lib/auth/session";
import { logoutAdminAction } from "@/lib/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminDashboardLayout({ children }: AdminLayoutProps) {
  const isConfigured = isSupabaseConfigured();
  const realAdmin = await getCurrentAdmin();

  const currentAdmin: CurrentAdmin = realAdmin || {
    id: "demo-admin-id",
    fullName: "Principal Administrator",
    email: "admin@libragems.internal",
    role: "super_admin",
    isActive: true,
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Gemstones", href: "/admin/gemstones", icon: Gem },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Team & Roles", href: "/admin/team", icon: Users },
    { label: "Activity Audit", href: "/admin/activity", icon: History },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const roleLabels: Record<string, string> = {
    super_admin: "Super Admin",
    administrator: "Administrator",
    product_manager: "Product Manager",
    enquiry_manager: "Enquiry Manager",
  };

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col md:flex-row selection:bg-champagne/30">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-forest-deep text-white shrink-0 flex flex-col justify-between border-r border-forest-deep/80">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-forest/40 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-forest flex items-center justify-center text-champagne shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-serif text-lg font-medium tracking-wide text-white">
                LibraGems
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-champagne font-semibold">
                Internal Trade Desk
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-warm-white/80 hover:text-white hover:bg-forest/60 transition-colors"
                >
                  <Icon className="h-4 w-4 text-champagne/80" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-forest/40 bg-black/10">
          <div className="flex items-center justify-between mb-3">
            <div className="truncate">
              <span className="block text-xs font-medium text-white truncate">
                {currentAdmin.fullName}
              </span>
              <span className="inline-block mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-champagne/20 text-champagne uppercase tracking-wider">
                {roleLabels[currentAdmin.role] || currentAdmin.role}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-forest/30">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[11px] text-warm-white/70 hover:text-white transition-colors"
              title="Open public website in new tab"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Public Site</span>
            </Link>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-[11px] text-red-300 hover:text-red-200 transition-colors"
              >
                <LogOut className="h-3 w-3" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Offline / Preview Mode Notice */}
        {!isConfigured && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
              <span>
                <strong>Local Preview Mode:</strong> Cloud Supabase credentials are not connected. Displaying local data and simulated administration state.
              </span>
            </div>
            <Link
              href="/admin/settings"
              className="font-medium underline hover:text-amber-950 shrink-0 ml-4"
            >
              Configure Keys &rarr;
            </Link>
          </div>
        )}

        {/* Dashboard Top bar */}
        <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-xl font-medium text-forest-deep">
              Administration Console
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-emerald-800">Bangkok Trading Desk Active</span>
            </div>
            <span className="text-border">|</span>
            <span className="font-mono text-[11px]">UTC+7</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
