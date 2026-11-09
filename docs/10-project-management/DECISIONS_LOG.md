# Architecture & Product Decisions Log (ADR)
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  

---

## Decision Register

| ID | Date | Decision Topic | Status | Decision Summary & Justification | Impacted Components |
|---|---|---|---|---|---|
| **ADR-01** | 2026-11-10 | **Business Model: Enquiry-Led vs E-Commerce** | **Accepted** | Operate strictly as a B2B wholesale enquiry platform with Price on Application (POA). Prohibit cart, checkout, or consumer payments due to high transaction values, variable lot pricing, and B2B negotiation requirements. | System Architecture, Public Site, Stripe/Cart excluded |
| **ADR-02** | 2026-11-10 | **Brand Aesthetic: 60/30/10 Palette** | **Accepted** | Anchor visual identity in Forest Green (`#174C38`), Warm Off-white Beige (`#F3EFE5`), and Muted Champagne (`#B99B68`). Typography: Serif headings (Cormorant Garamond) + Sans-serif body (Inter). Prohibit flashy jewellery styling or AI-template clutter. | Brand Guidelines, Tailwind Theme, Design System (Phase 01) |
| **ADR-03** | 2026-11-10 | **Technical Stack: Next.js App Router + Supabase** | **Accepted** | Next.js 15+ Server Components for SEO and speed; Supabase PostgreSQL for relational catalogue and enquiry data; Supabase Auth for internal admin; Supabase Storage for product photography. | `apps/web`, `supabase/schema.sql` |
| **ADR-04** | 2026-11-10 | **Origin Substantiation Policy** | **Accepted** | Prohibit claiming geographic origins (especially Afghanistan Rubellite) without verifiable lab certification (GIT, GIA, Lotus, AIGS) or documented trade provenance disclosure. Protects legal and commercial credibility. | Product Catalogue, SEO Metadata |
| **ADR-05** | 2026-11-10 | **WhatsApp Number Normalization** | **Accepted** | Sanitize all phone numbers to E.164 format (digits only, no spaces, hyphens, or leading zero; prefixed with country code 66). Construct dynamic, URI-encoded product enquiry strings. | Form Components, Product CTA, Utilities |
| **ADR-06** | 2026-11-10 | **Enquiry Storage & Transactional Email** | **Accepted** | Persist enquiries to Supabase database first before dispatching alert via Resend API. Prevents lost leads on email failure. Server-side only; anonymous client insert prohibited. | Server Actions, Resend Client, DB Schema |
| **ADR-07** | 2026-11-10 | **Tailwind CSS Dependency Fix (Phase 02)** | **Accepted** | Resolve CSS import discrepancy by installing `@tailwindcss/postcss` and `tailwindcss` during Phase 02 Foundation scaffold setup. | `apps/web/package.json`, PostCSS |
| **ADR-08** | 2026-11-10 | **Non-Transactional Product Schema.org** | **Accepted** | Implement Schema `Product` with `AggregateOffer` (Price on Application) and `ItemAvailability: InStock` to prevent Google Search Console rich-result validation errors on non-priced B2B items. | SEO Layout, Product Pages |
| **ADR-09** | 2026-11-10 | **Client Verification Gating** | **Accepted** | Enforce Phase Gate rule: No unverified business card information, unverified phone numbers, or stock photography will be published on production domain. | Phase 03 Public Site, Launch Checklist |

---
*Maintained throughout the LibraGems project lifecycle.*
