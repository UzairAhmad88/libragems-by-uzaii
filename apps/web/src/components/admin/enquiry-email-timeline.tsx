"use client";

import * as React from "react";
import { Mail, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { EmailEventStatus, EmailType } from "@/types/database.types";

export interface EmailEventItem {
  id: string;
  provider: string;
  provider_message_id?: string | null;
  email_type: EmailType;
  recipient: string;
  subject: string;
  status: EmailEventStatus;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  last_error?: string | null;
  created_at: string;
}

interface EnquiryEmailTimelineProps {
  events: EmailEventItem[];
}

export function EnquiryEmailTimeline({ events }: EnquiryEmailTimelineProps) {
  const getStatusBadge = (status: EmailEventStatus) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle className="h-3 w-3 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
            <Mail className="h-3 w-3 text-blue-600" />
            <span>Sent (MTA Accepted)</span>
          </span>
        );
      case "queued":
      case "pending":
      case "sending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200">
            <Clock className="h-3 w-3 text-amber-600" />
            <span>{status.toUpperCase()}</span>
          </span>
        );
      case "bounced":
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200">
            <XCircle className="h-3 w-3 text-rose-600" />
            <span>{status.toUpperCase()}</span>
          </span>
        );
      case "suppressed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-700 border border-zinc-200">
            <AlertTriangle className="h-3 w-3 text-zinc-500" />
            <span>Suppressed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold text-gray-700">
            {status}
          </span>
        );
    }
  };

  const getTypeName = (type: EmailType) => {
    switch (type) {
      case "customer_acknowledgement":
        return "Customer Acknowledgement Receipt";
      case "admin_notification":
        return "Internal Trading Desk Alert";
      case "admin_response":
        return "Official Trading Response";
      case "status_update":
        return "Trade Dossier Status Update";
      default:
        return type;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="font-serif text-lg font-medium text-forest-deep flex items-center gap-2">
          <Mail className="h-4 w-4 text-forest" />
          <span>Email Delivery Timeline &amp; Audit Trail</span>
        </h3>
        <span className="text-[11px] font-semibold text-stone uppercase tracking-wider">
          {events.length} {events.length === 1 ? "Event" : "Events"} Logged
        </span>
      </div>

      {events.length === 0 ? (
        <div className="rounded-lg border border-border/80 bg-ivory/50 p-6 text-center text-xs text-stone">
          No email transactions logged for this enquiry yet.
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="rounded-lg border border-border bg-ivory/30 p-4 space-y-2 text-xs hover:border-champagne/60 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-forest-deep">{getTypeName(ev.email_type)}</span>
                  {getStatusBadge(ev.status)}
                </div>
                <span className="text-[11px] text-stone">
                  {new Date(ev.created_at).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Bangkok",
                  })}{" "}
                  ICT
                </span>
              </div>

              <div className="grid gap-1.5 sm:grid-cols-2 text-[11px] text-stone">
                <div>
                  <span className="font-semibold text-ink">To: </span>
                  <span className="font-mono text-ink">{ev.recipient}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Subject: </span>
                  <span className="text-ink">{ev.subject}</span>
                </div>
              </div>

              {ev.provider_message_id && (
                <div className="text-[10px] text-stone font-mono">
                  Provider ID: {ev.provider_message_id} ({ev.provider})
                </div>
              )}

              {ev.last_error && (
                <div className="rounded bg-rose-50 border border-rose-200 p-2 text-[11px] text-rose-800">
                  <strong>Delivery Notice:</strong> {ev.last_error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
