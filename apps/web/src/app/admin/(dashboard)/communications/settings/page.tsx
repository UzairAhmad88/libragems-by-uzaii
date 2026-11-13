import * as React from "react";
import { Shield, CheckCircle2, AlertCircle, Server } from "lucide-react";
import { CommunicationsNav } from "@/components/admin/communications-nav";
import {
  getDefaultFromEmail,
  getDefaultReplyToEmail,
  getAdminNotificationRecipients,
  getWebhookSecret,
  getEmailProviderType,
  getSmtpConfig,
  isSmtpConfigured,
} from "@/lib/email/email-config";

export default function CommunicationSettingsPage() {
  const fromEmail = getDefaultFromEmail();
  const replyTo = getDefaultReplyToEmail();
  const adminRecipients = getAdminNotificationRecipients();
  const hasWebhookSecret = Boolean(getWebhookSecret());
  const providerType = getEmailProviderType();
  const smtpConfig = getSmtpConfig();
  const smtpReady = isSmtpConfigured();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://libragems1.com";
  const webhookUrl = `${siteUrl}/api/webhooks/resend`;
  const cronUrl = `${siteUrl}/api/cron/process-outbox`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <h2 className="font-serif text-2xl font-medium text-forest-deep">
          Provider Configuration &amp; Communication Security
        </h2>
        <p className="text-xs text-stone mt-1">
          Review transactional delivery endpoints, sender reputation parameters, and inbound webhook verification.
        </p>
      </div>

      <CommunicationsNav />

      {/* Security Architecture Principle */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="h-9 w-9 rounded-full bg-forest flex items-center justify-center text-champagne shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-forest-deep">
              Credential Secrecy &amp; Zero Client-Leakage
            </h3>
            <p className="text-xs text-stone">
              Under strict production architectural standards, private API keys are kept server-side only.
            </p>
          </div>
        </div>

        <p className="text-xs text-ink leading-relaxed">
          The Hostinger SMTP credentials (<code>SMTP_USER</code>, <code>SMTP_PASSWORD</code>) and transactional keys are strictly accessible inside server runtimes. They are never exposed to the client bundle or reflected in admin UI forms.
        </p>
      </div>

      {/* Hostinger SMTP Configuration Card */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-forest" />
            <h3 className="font-serif text-lg font-medium text-forest-deep">
              Hostinger SMTP Infrastructure (Primary)
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
              smtpReady
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}
          >
            {smtpReady ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Active ({providerType.toUpperCase()})</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 text-amber-600" />
                <span>Password Pending (Simulated Mode)</span>
              </>
            )}
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 text-xs">
          <div>
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              SMTP Host
            </label>
            <input
              type="text"
              readOnly
              value={smtpConfig.host}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Default: <code>smtp.hostinger.com</code>
            </span>
          </div>

          <div>
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              SMTP Port &amp; Protocol
            </label>
            <input
              type="text"
              readOnly
              value={`${smtpConfig.port} (${smtpConfig.secure ? "SSL/TLS Direct" : "STARTTLS"})`}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Port 465 SSL/TLS verified
            </span>
          </div>

          <div>
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              SMTP Account / Username
            </label>
            <input
              type="text"
              readOnly
              value={smtpConfig.user}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Configured via <code>SMTP_USER</code>
            </span>
          </div>
        </div>
      </div>

      {/* Configuration Status Card */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-6">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          Transactional Parameters
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          <div>
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              Authorized Sender Header (From)
            </label>
            <input
              type="text"
              readOnly
              value={fromEmail}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Configured via <code>EMAIL_FROM</code> environment variable.
            </span>
          </div>

          <div>
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              Commercial Reply-To Destination
            </label>
            <input
              type="text"
              readOnly
              value={replyTo}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Configured via <code>EMAIL_REPLY_TO</code> environment variable.
            </span>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone font-semibold uppercase tracking-wider text-[10px] mb-1">
              Internal Trading Desk Notification Inboxes
            </label>
            <input
              type="text"
              readOnly
              value={
                adminRecipients.length > 0
                  ? adminRecipients.join(", ")
                  : "None configured (ENQUIRY_NOTIFICATION_EMAILS unset)"
              }
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Receives instant internal dossiers whenever a public gemstone inquiry is submitted.
            </span>
          </div>
        </div>
      </div>

      {/* Endpoints & Integration Details */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-subtle space-y-6">
        <h3 className="font-serif text-lg font-medium text-forest-deep border-b border-border pb-3">
          Automation &amp; Webhook Endpoints
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <span className="font-semibold text-ink block mb-1">
              Resend Delivery Event Webhook Endpoint
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
              />
              <span
                className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  hasWebhookSecret
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {hasWebhookSecret ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Secret Configured</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 text-amber-600" />
                    <span>Dev Fallback Mode</span>
                  </>
                )}
              </span>
            </div>
            <span className="text-[11px] text-stone mt-1 block">
              Configure this URL in your Resend Dashboard &gt; Webhooks with events: <code>email.sent</code>, <code>email.delivered</code>, <code>email.bounced</code>, <code>email.complained</code>.
            </span>
          </div>

          <div>
            <span className="font-semibold text-ink block mb-1">
              Scheduled Outbox Queue Worker (Cron Endpoint)
            </span>
            <input
              type="text"
              readOnly
              value={cronUrl}
              className="w-full rounded-lg border border-border bg-ivory/50 px-3 py-2 font-mono text-ink text-xs focus:outline-none"
            />
            <span className="text-[11px] text-stone mt-1 block">
              Can be scheduled via Vercel Cron or GitHub Actions every 5 minutes with <code>Authorization: Bearer &lt;CRON_SECRET&gt;</code>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
