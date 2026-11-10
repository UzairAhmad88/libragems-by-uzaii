"useclient";
"use client";

import * as React from "react";
import { Mail, Send, Eye, Edit3, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

interface AdminResponseComposerProps {
  enquiryId: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  gemstoneInterest: string;
  onResponseSent?: () => void;
}

export function AdminResponseComposer({
  enquiryId,
  referenceNumber,
  customerName,
  customerEmail,
  gemstoneInterest,
  onResponseSent,
}: AdminResponseComposerProps) {
  const [activeTab, setActiveTab] = React.useState<"draft" | "preview">("draft");
  const [message, setMessage] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [resultStatus, setResultStatus] = React.useState<{
    success?: boolean;
    error?: string;
    isSimulated?: boolean;
    messageId?: string;
  } | null>(null);

  const subject = `Re: Your Libra Gems Enquiry – ${referenceNumber}`;

  // Quick B2B gemological response snippets
  const applySnippet = (type: "sieve" | "viewing" | "cert") => {
    switch (type) {
      case "sieve":
        setMessage(
          `Dear ${customerName},\n\n` +
            `Thank you for your enquiry regarding ${gemstoneInterest}.\n\n` +
            `Our Bangkok trading desk has verified current lot availability. The parcel features well-formed material conforming to commercial cut-and-polish grading standards with consistent color saturation.\n\n` +
            `We can accommodate your target parcel split specifications. Please confirm if you require detailed sieve distribution analysis and high-definition parcel macro photography prior to finalizing shipping documentation.\n\n` +
            `Sincerely,\n` +
            `Bangkok Trading Desk\n` +
            `Libra Gems & Trading Co., Ltd.`
        );
        break;
      case "viewing":
        setMessage(
          `Dear ${customerName},\n\n` +
            `We would be pleased to welcome your representative to our Silom trading office in Bangkok for an in-person gemological inspection of ${gemstoneInterest}.\n\n` +
            `Private viewings are scheduled under standard trade protocol Monday through Friday between 10:00 and 17:00 ICT. Please let us know your preferred date and time so our senior gemologist can prepare the viewing room and specimen dossiers.\n\n` +
            `Sincerely,\n` +
            `Bangkok Trading Desk\n` +
            `Libra Gems & Trading Co., Ltd.`
        );
        break;
      case "cert":
        setMessage(
          `Dear ${customerName},\n\n` +
            `Regarding your inquiry on laboratory certification for ${gemstoneInterest} (${referenceNumber}):\n\n` +
            `We partner with internationally accredited gemological laboratories in Bangkok (including Lotus Gemology, GRS, and GIT). Origin testing memos and full identification reports can be completed prior to dispatch.\n\n` +
            `Please advise on your exact certification requirements so we can quote testing turnaround times.\n\n` +
            `Sincerely,\n` +
            `Bangkok Trading Desk\n` +
            `Libra Gems & Trading Co., Ltd.`
        );
        break;
    }
    setResultStatus(null);
  };

  const handleSend = async () => {
    if (!message || message.trim().length < 10) {
      setResultStatus({
        success: false,
        error: "Response message must contain at least 10 characters.",
      });
      return;
    }

    setIsSubmitting(true);
    setResultStatus(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseMessage: message.trim(),
          customerName,
          customerEmail,
          gemstoneInterest,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setResultStatus({
          success: false,
          error: data.error || "Failed to dispatch official response.",
        });
      } else {
        setResultStatus({
          success: true,
          isSimulated: data.isSimulated,
          messageId: data.messageId,
        });
        if (onResponseSent) {
          onResponseSent();
        }
      }
    } catch (err: unknown) {
      setResultStatus({
        success: false,
        error: (err as Error)?.message || "Network exception during dispatch.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="bg-forest-deep p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-forest flex items-center justify-center text-champagne shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-white tracking-wide">
              Official Trading Response Composer
            </h3>
            <p className="text-[11px] text-warm-white/70">
              Dispatches authenticated corporate response to {customerName} &lt;{customerEmail}&gt;
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "draft"
                ? "bg-champagne text-forest-deep shadow-xs"
                : "text-warm-white/80 hover:text-white"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Draft</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "preview"
                ? "bg-champagne text-forest-deep shadow-xs"
                : "text-warm-white/80 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Confidentiality Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200/60 px-5 py-2.5 flex items-center gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
        <span className="text-[11px] leading-tight">
          <strong>Strict Confidentiality Directive:</strong> Internal gemological notes, supplier origins, and private margin metrics are permanently excluded from outgoing customer emails.
        </span>
      </div>

      {/* Body Content */}
      <div className="p-6">
        {activeTab === "draft" ? (
          <div className="space-y-4">
            {/* Quick Templates */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone mr-1">
                Trading Templates:
              </span>
              <button
                type="button"
                onClick={() => applySnippet("sieve")}
                className="rounded-full border border-border bg-ivory px-3 py-1 text-[11px] font-medium text-ink hover:border-champagne hover:bg-white transition-colors"
              >
                Parcel Sizing &amp; Availability
              </button>
              <button
                type="button"
                onClick={() => applySnippet("viewing")}
                className="rounded-full border border-border bg-ivory px-3 py-1 text-[11px] font-medium text-ink hover:border-champagne hover:bg-white transition-colors"
              >
                Bangkok Showroom Invitation
              </button>
              <button
                type="button"
                onClick={() => applySnippet("cert")}
                className="rounded-full border border-border bg-ivory px-3 py-1 text-[11px] font-medium text-ink hover:border-champagne hover:bg-white transition-colors"
              >
                Lab Testing &amp; Origin Memos
              </button>
            </div>

            {/* Email Meta Info */}
            <div className="rounded-lg border border-border bg-ivory/40 p-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone">Subject:</span>
                <span className="font-semibold text-ink font-mono">{subject}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone">Recipient:</span>
                <span className="font-medium text-ink">
                  {customerName} &lt;{customerEmail}&gt;
                </span>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-xs font-semibold text-stone uppercase tracking-wider mb-1.5">
                Official Commercial Response Text
              </label>
              <textarea
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Draft your gemological response to the client..."
                className="w-full rounded-lg border border-border bg-white p-4 text-xs text-ink placeholder:text-stone/60 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest leading-relaxed font-sans"
              />
              <div className="flex items-center justify-between mt-1 text-[11px] text-stone">
                <span>Markdown paragraphs are supported.</span>
                <span>{message.length} characters</span>
              </div>
            </div>
          </div>
        ) : (
          /* Live Preview Tab */
          <div className="rounded-lg border border-border bg-ivory/60 p-6 space-y-4 font-sans text-xs text-ink">
            <div className="border-b border-champagne/40 pb-4 text-center">
              <span className="font-serif text-xl font-bold tracking-wider text-forest-deep block">
                LIBRA GEMS &amp; TRADING
              </span>
              <span className="text-[9px] uppercase tracking-widest text-champagne font-semibold">
                Bangkok Gemological Trading Desk &bull; Official Dispatch
              </span>
            </div>

            <div className="bg-white border border-border rounded-lg p-4 space-y-2">
              <div className="bg-ivory border-l-2 border-forest p-2 text-[11px] text-stone">
                <strong>Regarding:</strong> {gemstoneInterest} &bull; <strong>Dossier:</strong>{" "}
                <span className="font-mono font-bold text-forest-deep">{referenceNumber}</span>
              </div>

              <div className="pt-2 text-ink leading-relaxed whitespace-pre-wrap">
                {message || (
                  <span className="text-stone italic">
                    [No draft text entered yet. Switch back to the Draft tab to compose your response.]
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-border/60 text-[11px] text-stone">
                <p className="font-bold text-forest-deep">Bangkok Trading Desk</p>
                <p>Libra Gems &amp; Trading Co., Ltd.</p>
                <p>Bangkok, Thailand &bull; https://libragems.net</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Alerts */}
        {resultStatus && (
          <div
            className={`mt-4 rounded-lg p-4 text-xs flex items-start gap-3 ${
              resultStatus.success
                ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                : "bg-rose-50 border border-rose-200 text-rose-900"
            }`}
          >
            {resultStatus.success ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {resultStatus.success
                  ? "Response Successfully Dispatched"
                  : "Dispatch Failed"}
              </p>
              <p className="text-[11px] mt-0.5">
                {resultStatus.success
                  ? resultStatus.isSimulated
                    ? "Recorded in local demo simulation mode (Resend unconfigured). Status updated to 'Replied'."
                    : `Dispatched via Resend provider. Message ID: ${resultStatus.messageId || "N/A"}. Status updated to 'Replied'.`
                  : resultStatus.error}
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] text-stone">
            All sent responses are automatically audited in delivery event logs.
          </span>

          <button
            type="button"
            disabled={isSubmitting || !message.trim()}
            onClick={handleSend}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Dispatching...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Send Official Response</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
