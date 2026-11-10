"use client";

import * as React from "react";
import { RotateCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function OutboxActions() {
  const router = useRouter();
  const [isRunning, setIsRunning] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState<{ text: string; isError?: boolean } | null>(null);

  const handleProcessNow = async () => {
    setIsRunning(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/cron/process-outbox?limit=50", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatusMsg({ text: data.error || "Failed to process outbox queue.", isError: true });
      } else {
        setStatusMsg({
          text: `Processed ${data.processed} items (${data.successful} sent, ${data.failed} failed).`,
        });
        router.refresh();
      }
    } catch (err: unknown) {
      setStatusMsg({ text: (err as Error)?.message || "Execution exception.", isError: true });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {statusMsg && (
        <span
          className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 ${
            statusMsg.isError
              ? "bg-rose-50 text-rose-800 border border-rose-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {statusMsg.isError ? (
            <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          )}
          <span>{statusMsg.text}</span>
        </span>
      )}

      <button
        type="button"
        disabled={isRunning}
        onClick={handleProcessNow}
        className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep transition-colors disabled:opacity-50"
      >
        <RotateCw className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} />
        <span>{isRunning ? "Running Queue..." : "Process Queue Now"}</span>
      </button>
    </div>
  );
}
