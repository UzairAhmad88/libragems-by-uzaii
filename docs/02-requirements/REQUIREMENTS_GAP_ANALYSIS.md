# Requirements Gap Analysis & Specification Audit
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd.  
**Document ID:** RGA-001  
**Version:** 1.0  
**Phase:** Phase 00 – Requirements Validation & Project Audit  
**Auditor:** Senior Software Architect & Lead Systems Analyst  
**Date:** November 10, 2026  
**Status:** Complete

---

## 1. Objective & Methodology

The objective of this Requirements Gap Analysis is to uncover omissions, ambiguities, conflicting instructions, and unaddressed technical/operational requirements in the LibraGems starter documentation and initial code scaffold.

The analysis evaluates the project across four dimensions:
1. **Business Reality vs. Documented Scope:** Ensuring the website serves real-world international gemstone trading.
2. **Documented Requirements vs. Code Scaffold:** Identifying discrepancies between written docs and `apps/web`.
3. **Cross-Document Consistency:** Resolving contradictory instructions across documentation files.
4. **Missing Production-Grade Specifications:** Defining edge cases, error states, security controls, and non-functional targets.

---

## 2. Cross-Document Contradiction & Inconsistency Log

| ID | Issue Description | Documents in Conflict | Impact | Resolution / Architectural Decision |
|---|---|---|---|---|
| **GAP-01** | **Sitemap Scope Mismatch** | `docs/03-ui-ux/SITEMAP_AND_PAGE_SPEC.md` lists `/quality-sourcing`, `/insights`, `/privacy`, `/terms`.<br>`apps/web/src/app/sitemap.ts` omits all four. | Search engines will not discover legal and educational pages via XML sitemap. | **Resolution:** Update `sitemap.ts` to include all public indexable routes (`/quality-sourcing`, `/insights`). Add `/privacy` and `/terms`. Exclude admin/API. |
| **GAP-02** | **Tailwind CSS v4 Import vs Missing Packages** | `apps/web/src/app/globals.css` declares `@import "tailwindcss";`.<br>`apps/web/package.json` has no `tailwindcss` or PostCSS dependencies. | Code fails to build under `npm run build` or `npm run dev`. | **Resolution:** Phase 02 Foundation will install `@tailwindcss/postcss` and `tailwindcss` (or pin Tailwind v3 with `postcss.config.js` and `tailwind.config.ts`) and configure scripts. |
| **GAP-03** | **Product Category Taxonomy Drift** | `BUSINESS_PROFILE.md`: *Rough stones, Minerals, Specimens, Stone beads*.<br>`TURQUOISE.md`: *Rough gemstone / mineral*.<br>`page.tsx`: *Gemstone / mineral*. | Inconsistent filtering, metadata tagging, and Schema.org categorization. | **Resolution:** Standardize database category enum to: `rough_gemstone`, `cut_gemstone`, `mineral_specimen`, `stone_beads`. |
| **GAP-04** | **Unspecified Row Level Security Policies** | `supabase/schema.sql` executes `alter table ... enable row level security;` but provides zero `CREATE POLICY` statements. | Supabase denies all access by default; API and client queries fail silently or require service-role bypass. | **Resolution:** Draft and implement granular policies in Phase 04: Public read on published products; Admin-only write; Server-only insert for enquiries. |
| **GAP-05** | **WhatsApp Phone Number Formatting** | Transcribed as local Thai numbers (`08-4667-4833`).<br>WhatsApp Web API requires digits-only E.164 (`66846674833`). | Malformed WhatsApp URLs fail to launch chat on desktop or mobile. | **Resolution:** Implement strict E.164 phone sanitization utility (`cleanWhatsAppNumber()`) stripping hyphens, spaces, and leading zeros. |
| **GAP-06** | **Footer Navigation Incompleteness** | `SITEMAP_AND_PAGE_SPEC.md` mandates footer navigation with legal links.<br>`apps/web/src/components/site-footer.tsx` has zero navigation links. | Weak internal link equity, missing legal accessibility, poor mobile UX. | **Resolution:** Refactor `site-footer.tsx` in Phase 01 to include 4-column layout: Navigation, Gemstones, Legal & Compliance, Contact Details. |

---

## 3. Missing Functional Specifications

The initial functional requirements document (`docs/02-requirements/FUNCTIONAL_REQUIREMENTS.md`) defines high-level P0/P1 capabilities. However, several mission-critical operational specifications were omitted and must be formally added:

### 3.1 Form Abuse & Anti-Spam Protection (P0)
- **The Gap:** `FR-07` specifies server-side validation, but does not define an anti-bot mechanism. Gemstone trading enquiry forms are prime targets for automated spam, phishing, and SEO injection bots.
- **Specification:**
  1. Implement a **Honeypot field** (`website_url_trap`, hidden via CSS and `aria-hidden="true"`, with `tabIndex={-1}`). If filled, discard silently or return false positive.
  2. Implement **Time-to-Submit validation** (submissions under 3.5 seconds from form load rejected as bot automation).
  3. Support pluggable **Cloudflare Turnstile** (non-interactive, privacy-friendly CAPTCHA) in Phase 05.

### 3.2 Server-Side Rate Limiting (P0)
- **The Gap:** Form endpoints are vulnerable to Denial of Service (DoS) and email-bombing attacks against the business inbox.
- **Specification:**
  - Enforce IP-based rate limiting on `/api/enquiry`: Maximum **5 submissions per IP address per hour**.
  - Return HTTP 429 (`Too Many Requests`) with a user-friendly message: *"You have recently submitted an enquiry. Please allow our team time to respond or contact us directly via WhatsApp."*

### 3.3 Transactional Email Resiliency & Retry Logic (P1)
- **The Gap:** If the transactional email provider (Resend) experiences an outage or rate limit, enquiry submissions might be lost.
- **Specification:**
  - Persist enquiry into Supabase database **first** before attempting email dispatch.
  - If email dispatch fails, log error in `enquiries.email_delivery_status = 'failed'` without failing the user's form submission.
  - Implement an admin dashboard alert showing failed email dispatches with a manual "Resend Alert" button.

### 3.4 Image Processing & Storage Pipeline (P1)
- **The Gap:** No specification for maximum upload size, allowable mime types, or automatic web optimization.
- **Specification:**
  - Maximum upload size: 10 MB per image.
  - Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
  - Next.js Image component optimization: Serve automatically converted WebP/AVIF with pre-calculated responsive `sizes` attributes.
  - Mandatory preservation of color fidelity (sRGB ICC color profiles preserved to maintain true gemstone hue).

### 3.5 Multi-Contact WhatsApp Routing Logic (P1)
- **The Gap:** Business card provides two contact numbers (Naeem Khan & Sana Khan). No logic existed to decide which number receives which inquiry.
- **Specification:**
  - Allow admin to configure a primary WhatsApp number in `.env` (`WHATSAPP_PRIMARY_NUMBER`).
  - Support product-level assignment in database (e.g., rough lots routed to Naeem Khan, cut stones/rubellite routed to Sana Khan).
  - Provide fallback to primary number if specific assignment is absent.

---

## 4. Missing Non-Functional Specifications

To transform the initial guidelines into measurable engineering targets, the following non-functional criteria are established:

### 4.1 Quantitative Performance Budgets (Core Web Vitals)
All public pages must achieve the following thresholds on standard mobile devices (throttled 4G / mid-tier CPU):
- **Largest Contentful Paint (LCP):** $\le 2.0\text{ seconds}$ (Target: 1.6s)
- **Interaction to Next Paint (INP):** $\le 150\text{ milliseconds}$
- **Cumulative Layout Shift (CLS):** $\le 0.05$ (Eliminate layout jumps on image load)
- **Time to First Byte (TTFB):** $\le 600\text{ milliseconds}$ on edge network.
- **Total Bundle Size:** Maximum initial JS bundle $\le 90\text{ KB}$ gzipped.

### 4.2 Accessibility Compliance (WCAG 2.1 Level AA)
- Minimum contrast ratio of **4.5:1** for standard body text against background (`#242A26` on `#FAF8F2` achieves 14.8:1; `#174C38` on `#FAF8F2` achieves 9.4:1).
- Interactive champagne accent (`#B99B68`) must only be used on dark backgrounds or as outline highlights, never as light-on-white text (fails contrast at 2.6:1).
- Full keyboard navigation across all interactive elements with visible focus rings (`:focus-visible`).
- Screen reader accessible form labels (`aria-describedby` for validation errors).

### 4.3 Security & HTTP Header Hardening
Production deployments on Vercel must enforce:
- `Content-Security-Policy` (CSP) restricting script execution.
- `Strict-Transport-Security` (`max-age=63072000; includeSubDomains; preload`).
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` (Prevent clickjacking).
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

---

## 5. Scope Boundary Matrix: What is IN, DEFERRED, and OUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SCOPE BOUNDARIES & ROADMAP MATRIX                     │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ IN INITIAL RELEASE      │ DEFERRED TO PHASE 09    │ EXCLUDED PERMANENTLY    │
│ (Phases 01 - 08)        │ (Post-Launch Roadmap)   │ (Out of Business Model) │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ • 6 Public Pages        │ • Multilingual (TH, CN) │ • Shopping cart / B2C   │
│ • 3 Gemstone Landers    │ • Multi-image 360 viewer│ • Stripe/PayPal checkout│
│ • WhatsApp deep-links   │ • Automated blog CMS    │ • Automated valuation   │
│ • Validated Enquiry form│ • Live chat widget      │ • Public pricing engine │
│ • Supabase Admin Auth   │ • Currency converter    │ • Multi-vendor market   │
│ • Product CRUD & Image  │ • Advanced search filter│ • Customer accounts/auth│
│ • Technical SEO & Schema│ • CRM Zapier integration│ • Public reviews/ratings│
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 6. Action Items for Implementation Phases

1. **Phase 01 (Brand & UX):**
   - Incorporate WCAG contrast corrections for champagne accents.
   - Design 4-column footer with legal and compliance links.
   - Create empty/loading/error states for gemstone catalogue and enquiry form.
2. **Phase 02 (Foundation):**
   - Update `package.json` with correct CSS tooling.
   - Configure strict security headers in `next.config.ts`.
   - Setup Vitest and Playwright test scaffold.
3. **Phase 04 (Data & Admin):**
   - Implement complete PostgreSQL Row Level Security policies.
   - Implement database triggers for `updated_at` timestamps.
4. **Phase 05 (Enquiry Integrations):**
   - Implement honeypot anti-spam and IP rate limiting.
   - Build E.164 phone number normalization utility.

---
*Document produced as part of LibraGems Phase 00 Deliverables.*

