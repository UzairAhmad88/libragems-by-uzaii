# Technical Architecture Review & Infrastructure Blueprint
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd.  
**Document ID:** TAR-001  
**Version:** 1.0  
**Phase:** Phase 00 – Technical Architecture Audit & Validation  
**Role:** Senior Software Architect & Full-Stack Engineering Lead  
**Date:** November 10, 2026  
**Status:** Architecture Evaluated & Approved with Technical Action Items

---

## 1. Executive Summary & Architecture Paradigm

The LibraGems technical architecture is designed to deliver an international B2B digital platform that combines:
1. **Sub-second global performance** for international wholesale buyers browsing on high-latency mobile networks.
2. **Server-Side Rendered (SSR) & Static HTML output** ensuring zero-friction indexing by search engines.
3. **Enterprise security and strict data isolation** protecting proprietary gemstone inventories and buyer enquiries.
4. **Zero-friction administration** enabling non-technical gemstone staff to maintain inventory without developer support.

```
                              SYSTEM ARCHITECTURE OVERVIEW

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                            EDGE & CDN LAYER (Vercel)                        │
  │   • HTTPS Termination  • Global Edge Cache  • DDoS Mitigation (WAF)         │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                     NEXT.JS APP ROUTER APPLICATION LAYER                     │
  │                                                                             │
  │  ┌─────────────────────────┐  ┌───────────────────────┐  ┌───────────────┐  │
  │  │ React Server Components │  │ Server Actions / API  │  │ Route Handler │  │
  │  │ (Public Pages, SEO Meta)│  │ (Enquiry Processing)  │  │ (Sitemap, Rob)│  │
  │  └───────────┬─────────────┘  └───────────┬───────────┘  └───────┬───────┘  │
  └──────────────┼────────────────────────────┼──────────────────────┼──────────┘
                 │                            │                      │
        ┌────────┴────────┐          ┌────────┴────────┐             │
        ▼                 ▼          ▼                 ▼             ▼
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐
  │ Supabase     │ │ Supabase     │ │ Transactional│ │ Cloudflare   │ │ GSC &   │
  │ PostgreSQL   │ │ Auth & RLS   │ │ Email: Resend│ │ Turnstile    │ │ GA4     │
  │ (Data Store) │ │ (Admin Only) │ │ (API Alerts) │ │ (Anti-Bot)   │ │ Telemet.│
  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘
```

---

## 2. Technology Stack Evaluation

| Technology Layer | Selected Component | Evaluation & Suitability | Architectural Recommendations |
|---|---|---|---|
| **Frontend Framework** | **Next.js 15+ (App Router)** | **Exceptional.** Server Components generate pure HTML for high SEO performance; Server Actions eliminate client-side API boilerplate. | Use Server Components for all public catalogue views. Restrict Client Components (`"use client"`) to interactive widgets (e.g., photo zoom, mobile menu, enquiry form). |
| **Language & Typing** | **TypeScript 5.x** | **Essential.** Enforces type safety across gemological specs, database schemas, and enquiry payloads. | Maintain `strict: true` in `tsconfig.json`. Define shared schemas with Zod for end-to-end type validation. |
| **Styling & CSS** | **Tailwind CSS v4 / v3** | **Optimal.** Zero-runtime CSS utility classes, rapid responsive layout development, consistent design tokens. | **Critical Fix Required:** The starter scaffold in `apps/web` references Tailwind in `globals.css` but lacks packages in `package.json`. Must install dependencies in Phase 02. |
| **UI Component Primitives** | **shadcn/ui & Radix UI** | **Superior.** Accessible (WCAG AA), unstyled headless primitives that can be tailored exactly to the Forest Green/Warm Beige palette. | Adopt for Dialogs, Dropdowns, Toast notifications, and Form inputs. Avoid bloated full-featured UI frameworks. |
| **Database & Persistence** | **PostgreSQL via Supabase** | **Industry Standard.** Relational data model, robust JSONB support for variable gem specs, automatic connection pooling. | Implement explicit Row Level Security (RLS) policies. Index foreign keys and search slugs. |
| **Authentication** | **Supabase Auth** | **Secure & Battle-Tested.** Provides session tokens, secure HttpOnly cookies, and native integration with Postgres RLS. | Restrict to internal admin users. No public registration or customer account endpoints permitted. |
| **Media Storage** | **Supabase Storage** | **High Reliability.** S3-compatible asset storage with global CDN caching. | Store original high-res product photos. Enforce public read on published assets; admin-only upload/delete policies. |
| **Transactional Email** | **Resend** | **Modern & Developer-Friendly.** High deliverability, React-based email templates, clear webhook telemetry. | Configure custom domain sending (`notifications@libragems.net`) with SPF, DKIM, and DMARC DNS records. |
| **Hosting & Edge Delivery** | **Vercel** | **Native Next.js Optimization.** Automatic CI/CD, Edge Middleware, On-Demand Incremental Static Regeneration (ISR). | Host production at `https://libragems.net` with 301 redirect from `www.libragems.net`. |
| **Search & Telemetry** | **GA4 & Google Search Console**| **Mandatory.** Organic search query tracking, indexing verification, privacy-compliant user traffic analysis. | Implement Consent Mode v2 for European/international compliance. Avoid intrusive cookie banners for essential analytics. |

---

## 3. Dependency Audit & Package Discrepancy Findings

An inspection of `apps/web/package.json` reveals a bare starter scaffold requiring dependency alignment:

```json
// Current apps/web/package.json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "typescript": "latest"
  }
}
```

### Action Items for Phase 02 Foundation:
1. **CSS Tooling:** Install `tailwindcss` and `@tailwindcss/postcss` (for Tailwind v4) along with `postcss`.
2. **Icons & UI Primitives:** Install `lucide-react`, `clsx`, `tailwind-merge` for standard component composition.
3. **Validation & State:** Install `zod` for form and database entity validation.
4. **Supabase Client:** Install `@supabase/supabase-js` and `@supabase/ssr` for cookie-based authentication.
5. **Transactional Email:** Install `resend`.
6. **Testing Harness:** Install `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` for unit and component testing.

---

## 4. Database Architecture & Row Level Security (RLS) Plan

The relational database architecture is defined in `supabase/schema.sql`. To resolve the security policy gap identified in the audit, the following RLS policies will be deployed:

```
                            SUPABASE RLS ACCESS MATRIX
  ┌──────────────────┬─────────────────┬─────────────────┬────────────────────┐
  │ Table            │ Anonymous (Web) │ Authenticated   │ Service Role (API) │
  ├──────────────────┼─────────────────┼─────────────────┼────────────────────┤
  │ products         │ SELECT (Pub.)   │ ALL (Admin)     │ ALL (Bypass)       │
  │ product_images   │ SELECT (Pub.)   │ ALL (Admin)     │ ALL (Bypass)       │
  │ enquiries        │ NO ACCESS       │ SELECT/UPDATE   │ INSERT (Server Act)│
  │ admin_profiles   │ NO ACCESS       │ SELECT (Self)   │ ALL                │
  └──────────────────┴─────────────────┴─────────────────┴────────────────────┘
```

### 4.1 SQL Security Policies:
```sql
-- 1. Public Read on Published Products
CREATE POLICY "Public users can view published products"
ON public.products FOR SELECT
USING (status = 'published');

-- 2. Public Read on Product Images of Published Products
CREATE POLICY "Public users can view images of published products"
ON public.product_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.products
    WHERE public.products.id = public.product_images.product_id
    AND public.products.status = 'published'
  )
);

-- 3. Restrict Enquiry Reading & Updating to Admin Only
CREATE POLICY "Admins can view and update enquiries"
ON public.enquiries FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE public.admin_profiles.id = auth.uid()
    AND public.admin_profiles.role IN ('admin', 'editor')
  )
);

-- 4. Server Actions Insert Enquiries Using Service Role
-- Enquiries cannot be read, inserted, or modified directly by anonymous browser clients.
```

---

## 5. Security & Threat Modeling

| Threat Vector | Attack Scenario | Mitigation in Architecture |
|---|---|---|
| **SQL Injection (SQLi)** | Malicious SQL strings injected via search or form inputs. | **Mitigated:** Next.js Server Actions and Supabase JS client use parameterized queries exclusively. Direct raw SQL execution in browser code is physically impossible. |
| **Cross-Site Scripting (XSS)** | Malicious JavaScript injected via gemstone description or enquiry fields. | **Mitigated:** React auto-escapes string content. Rich text rendering is sanitized via DOMPurify if HTML is permitted. Content-Security-Policy headers restrict script execution. |
| **API Credential Exposure** | Database service keys leaked to client-side JavaScript bundle. | **Mitigated:** Strict environment variable prefixing. Only `NEXT_PUBLIC_*` variables are exposed to browsers. `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are restricted to server-side runtime. |
| **Spam & Denial of Service** | Automated bot networks spamming enquiry form and exhausting Resend email quotas. | **Mitigated:** Invisible honeypot field, minimum form submission time check (3.5s), and IP-based rate limiting (5 requests/hour per IP). |
| **Unauthorized Admin Access** | Brute force or privilege escalation into `/admin` routes. | **Mitigated:** Next.js Edge Middleware checks Supabase Auth JWT and verifies user identity against `public.admin_profiles`. Unauthenticated users are redirected to login. |

---

## 6. Performance & Caching Strategy

To deliver an ultra-responsive experience worldwide:
1. **Incremental Static Regeneration (ISR):**
   - Product pages (`/gemstones/[slug]`) and informational pages (`/about`, `/quality-sourcing`) will be statically generated at build time.
   - When an administrator modifies a product in `/admin`, the application executes `revalidatePath('/gemstones/[slug]')` to update the edge cache instantly without a full rebuild.
2. **Next.js Image Optimization:**
   - Gemstone photographs served via `next/image` with WebP/AVIF transcoding, responsive width breakpoints, and explicit aspect ratios to eliminate Cumulative Layout Shift (CLS).
3. **Font Optimization:**
   - Display serif (`Cormorant Garamond`) and body sans-serif (`Inter`) loaded via `next/font/google` with `display: swap` and zero external Google CDN requests, preventing render-blocking layout shifts.

---
*Document produced as part of LibraGems Phase 00 Deliverables.*

