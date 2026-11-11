import { z } from "zod";

/**
 * Normalizes and validates URLs safely.
 * If empty or missing, returns the fallback URL.
 * Automatically prepends https:// if protocol is omitted.
 */
function cleanUrl(val: string | undefined, defaultUrl: string): string {
  if (!val || typeof val !== "string" || val.trim() === "") {
    return defaultUrl;
  }
  let trimmed = val.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return defaultUrl;
  }
}

/**
 * Normalizes an optional URL safely.
 * If empty, returns an empty string without failing validation.
 */
function cleanOptionalUrl(val: string | undefined): string {
  if (!val || typeof val !== "string" || val.trim() === "") {
    return "";
  }
  let trimmed = val.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return "";
  }
}

/**
 * Environment configuration schema for LibraGems.
 *
 * Designed with a strict security boundary:
 * 1. Public variables must be prefixed with NEXT_PUBLIC_.
 * 2. Server-only secrets are omitted from browser bundles.
 * 3. All production service keys (Supabase, Resend) are optional with fallbacks
 *    so the public website shell runs cleanly in development, testing, CI,
 *    and initial Vercel previews without requiring production credentials.
 * 4. Empty strings and whitespace are gracefully normalized so Vercel deployments
 *    never fail due to blank placeholder values.
 */
const envSchema = z.object({
  // Public URL configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .optional()
    .default("https://libragems.net")
    .transform((val) => cleanUrl(val, "https://libragems.net")),

  // Analytics (optional in local dev)
  NEXT_PUBLIC_GA_ID: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),

  // Supabase (Optional in Foundation Phase; enforced in Phase 04)
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .optional()
    .default("")
    .transform(cleanOptionalUrl),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),

  // Transactional Email (Phase 05 Architecture)
  RESEND_API_KEY: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  EMAIL_FROM: z
    .string()
    .optional()
    .default("Libra Gems Trading Desk <enquiries@libragems.net>")
    .transform((v) =>
      v && v.trim() !== "" ? v.trim() : "Libra Gems Trading Desk <enquiries@libragems.net>"
    ),
  EMAIL_REPLY_TO: z
    .string()
    .optional()
    .default("info@libragems.net")
    .transform((v) => (v && v.trim() !== "" ? v.trim() : "info@libragems.net")),
  ENQUIRY_NOTIFICATION_EMAILS: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  RESEND_WEBHOOK_SECRET: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  CRON_SECRET: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  ENQUIRY_TO_EMAIL: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  ENQUIRY_FROM_EMAIL: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),

  // WhatsApp Business Numbers (Unverified in Phase 02; sanitized in Phase 05)
  WHATSAPP_PRIMARY_NUMBER: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),
  WHATSAPP_SECONDARY_NUMBER: z
    .string()
    .optional()
    .default("")
    .transform((v) => (v ? v.trim() : "")),

  // Node Environment
  NODE_ENV: z
    .string()
    .optional()
    .default("development")
    .transform((v) => {
      if (v === "production" || v === "test") return v;
      return "development";
    }),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and extracts environment variables safely.
 */
export function getEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
    ENQUIRY_NOTIFICATION_EMAILS: process.env.ENQUIRY_NOTIFICATION_EMAILS,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
    ENQUIRY_TO_EMAIL: process.env.ENQUIRY_TO_EMAIL,
    ENQUIRY_FROM_EMAIL: process.env.ENQUIRY_FROM_EMAIL,
    WHATSAPP_PRIMARY_NUMBER: process.env.WHATSAPP_PRIMARY_NUMBER,
    WHATSAPP_SECONDARY_NUMBER: process.env.WHATSAPP_SECONDARY_NUMBER,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment configuration. Check your .env file.");
  }

  return result.data;
}

export const env = getEnv();
