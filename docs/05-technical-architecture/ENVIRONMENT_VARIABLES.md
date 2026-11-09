# Environment Variables Specification & Security Boundary
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** EVS-002  
**Version:** 2.0 (Updated in Phase 02)  
**Phase:** Phase 02 – Production-Grade Project Foundation & Next.js Architecture  
**Role:** Security Engineer & Software Architect  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Security Architecture & Boundary Rules

1. **Strict Client vs. Server Isolation:**
   - Variables prefixed with `NEXT_PUBLIC_` are inlined into client-side browser JavaScript bundles at build time. They must **never** contain private credentials, database service roles, or API secret keys.
   - Variables lacking the `NEXT_PUBLIC_` prefix are strictly confined to the Node.js server runtime and cannot be inspected by browser clients.
2. **Zero-Secret Public Runtime:**
   - In accordance with Phase 02 requirements, the public website shell, test runners, and build commands operate cleanly **without requiring Supabase or Resend credentials**. All service variables are optional with safe fallbacks in `src/config/env.ts`.
3. **Source Control Integrity:**
   - `.env.local`, `.env.production`, and credential files are strictly blocked in `.gitignore`. Only `.env.example` with empty template values is tracked in Git.

---

## 2. Environment Variables Register

| Variable Name | Purpose & Usage | Scope / Exposure | Default / Fallback in Dev |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site base URL used for sitemap, Open Graph, and metadata. | Public (Client & Server) | `http://localhost:3000` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (optional in local dev). | Public (Client & Server) | `""` (Empty string) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API gateway endpoint. Required in Phase 04. | Public (Client & Server) | `""` (Optional in Phase 02) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| Supabase public anonymous API key (enforced by RLS). | Public (Client & Server) | `""` (Optional in Phase 02) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase privileged server key for bypass queries and admin scripts. | **SECRET (Server Runtime Only)** | `""` (Never expose to client) |
| `RESEND_API_KEY` | Resend transactional email API authorization token. Required in Phase 05. | **SECRET (Server Runtime Only)** | `""` (Optional in Phase 02) |
| `ENQUIRY_TO_EMAIL` | Verified business recipient inbox for lead alerts. | **Server Only** | `info@libragems.net` |
| `ENQUIRY_FROM_EMAIL` | Verified sending domain address for transactional notifications. | **Server Only** | `notifications@libragems.net` |
| `WHATSAPP_PRIMARY_NUMBER` | Confirmed digits-only E.164 number for primary WhatsApp routing. | Server / Controlled Action | `""` (Sanitized on use) |
| `WHATSAPP_SECONDARY_NUMBER` | Confirmed digits-only E.164 number for secondary executive. | Server / Controlled Action | `""` (Sanitized on use) |
| `NODE_ENV` | Node.js execution environment (`development`, `test`, `production`). | Runtime | `development` |

---

## 3. Runtime Zod Schema Implementation

Environment variables are validated at runtime via `src/config/env.ts` using the Zod schema parser:

```typescript
// Excerpt from apps/web/src/config/env.ts
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_GA_ID: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  RESEND_API_KEY: z.string().optional().default(""),
  ENQUIRY_TO_EMAIL: z.string().email().optional().or(z.literal("")),
  ENQUIRY_FROM_EMAIL: z.string().optional().default(""),
  WHATSAPP_PRIMARY_NUMBER: z.string().optional().default(""),
  WHATSAPP_SECONDARY_NUMBER: z.string().optional().default(""),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});
```

---
*Document produced as part of LibraGems Phase 02 Deliverables.*
