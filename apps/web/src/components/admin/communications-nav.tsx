"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Inbox, Settings } from "lucide-react";

export function CommunicationsNav() {
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: "/admin/communications", icon: LayoutDashboard, exact: true },
    { label: "Delivery Events", href: "/admin/communications/email-events", icon: Mail, exact: false },
    { label: "Notification Outbox", href: "/admin/communications/outbox", icon: Inbox, exact: false },
    { label: "Provider & Settings", href: "/admin/communications/settings", icon: Settings, exact: false },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname?.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors ${
              isActive
                ? "bg-forest text-white shadow-xs"
                : "bg-white text-stone hover:text-ink hover:bg-ivory border border-border"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${isActive ? "text-champagne" : "text-stone"}`} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
