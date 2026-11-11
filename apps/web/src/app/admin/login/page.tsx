"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, Info, Loader2 } from "lucide-react";
import { loginAdminAction, AuthState } from "@/lib/auth/actions";

function LoginFormContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const urlError = searchParams.get("error");
  const next = searchParams.get("next") || "/admin/dashboard";

  const [state, setState] = React.useState<AuthState | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAdminAction(state, formData);
      if (result) {
        setState(result);
      }
    });
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 shadow-subtle rounded-2xl border border-border">
      {/* Status Notifications */}
      {mode === "unconfigured" && (
        <div className="mb-6 rounded-xl border border-champagne/60 bg-ivory p-4 text-xs text-ink space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-forest-deep">
            <Info className="h-4 w-4 text-champagne" />
            <span>Supabase Credentials Notice</span>
          </div>
          <p className="text-stone leading-relaxed">
            Supabase database credentials (<code className="text-xs bg-beige/60 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code>) are not configured in this environment.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-xs font-semibold text-forest underline hover:text-forest-deep"
            >
              Enter Dashboard in Local Preview Mode &rarr;
            </Link>
          </div>
        </div>
      )}

      {urlError === "unauthorized" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/50 p-4 text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <span>Your account does not possess active administrative privileges.</span>
        </div>
      )}

      {state?.error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/50 p-4 text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="next" value={next} />

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-stone"
          >
            Administrative Email
          </label>
          <div className="mt-1.5 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@libragems.internal"
              className="block w-full rounded-lg border border-border bg-ivory/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-stone/50 focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-700">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-wider text-stone"
          >
            Password
          </label>
          <div className="mt-1.5 relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className="block w-full rounded-lg border border-border bg-ivory/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-stone/50 focus:border-forest focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
          {state?.fieldErrors?.password && (
            <p className="mt-1 text-xs text-red-700">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-forest px-6 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne disabled:opacity-50 transition-colors"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Console</span>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-stone">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-forest hover:text-forest-deep transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Public Website</span>
        </Link>
        <span className="text-[11px] text-stone/70">Role-Based Access Control</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-champagne/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Crest */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-forest-deep flex items-center justify-center text-champagne shadow-md">
            <Shield className="h-7 w-7 stroke-[1.5]" />
          </div>
        </div>

        <h2 className="mt-4 text-center font-heading text-3xl font-bold tracking-tight text-forest-deep">
          LibraGems Internal Portal
        </h2>
        <p className="mt-1 text-center text-xs tracking-wider uppercase text-stone font-medium">
          Libra Gems &amp; Trading Co., Ltd. • Bangkok, Thailand
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <React.Suspense
          fallback={
            <div className="bg-white py-12 px-6 sm:px-10 shadow-subtle rounded-2xl border border-border flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin text-forest" />
            </div>
          }
        >
          <LoginFormContent />
        </React.Suspense>

        {/* Security Notice */}
        <p className="mt-6 text-center text-[11px] text-stone/80 leading-relaxed max-w-sm mx-auto">
          Authorized personnel only. All access events, authentication attempts, and database modifications are cryptographically audited and permanently logged.
        </p>
      </div>
    </div>
  );
}
