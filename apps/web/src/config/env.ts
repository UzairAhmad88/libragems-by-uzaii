import { z } from "zod";

/**
 * Environment configuration schema for LibraGems.
 *
 * Designed with a strict security boundary:
 * 1. Public variables must be prefixed with NEXT_PUBLIC_.
 * 2. Server-only secrets are omitted from browser bundles.
 * 3. All production service keys (Supabase, Resend) are optional with fallbacks
 *    so the public website shell runs cleanly in development, testing, and CI
 *    without requiring production credentials.
 */
const envSchema = z.object({
  // Public URL configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),

  // Analytics (optional in local dev)
  NEXT_PUBLIC_GA_ID: z.string().optional().default(""),

  // Supabase (Optional in Foundation Phase; enforced in Phase 04)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),

  // Transactional Email (Optional in Foundation Phase; enforced in Phase 05)
  RESEND_API_KEY: z.string().optional().default(""),
  ENQUIRY_TO_EMAIL: z.string().email().optional().or(z.literal("")),
  ENQUIRY_FROM_EMAIL: z.string().optional().default(""),

  // WhatsApp Business Numbers (Unverified in Phase 02; sanitized in Phase 05)
  WHATSAPP_PRIMARY_NUMBER: z.string().optional().default(""),
  WHATSAPP_SECONDARY_NUMBER: z.string().optional().default(""),

  // Node Environment
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
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
