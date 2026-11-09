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
| **ADR-10** | 2026-11-10 | **Tabular Numeral Formatting** | **Accepted** | All numerical values in gemological tables ($ct$, $mm$, $g$) must declare `tabular-nums` for precise vertical decimal alignment. | Design Tokens, Specification Tables |
| **ADR-11** | 2026-11-10 | **Mobile Touch Target Standard ($\ge 48\text{px}$)** | **Accepted** | Enforce WCAG 2.2 touch target criterion of $48 \times 48\text{px}$ with minimum $8\text{px}$ separation across all interactive buttons, links, and accordion toggles. | Component Library, Mobile Navigation |
| **ADR-12** | 2026-11-10 | **Mobile Virtual Keyboard Protection** | **Accepted** | Enforce minimum $16\text{px}$ input font size on mobile viewports to prevent iOS Safari auto-zoom disorientation during form completion. | Forms, Inputs, Mobile Stylesheet |
| **ADR-13** | 2026-11-10 | **Zero Stock Photography Protocol** | **Accepted** | Ban all stock images from live product detail pages. Require studio photography under D65 5500K daylight with embedded sRGB color profiles for true color fidelity. | Image Guidelines, Product Catalogue |
| **ADR-14** | 2026-11-10 | **Mobile Sticky WhatsApp Action Bar** | **Accepted** | Implement persistent mobile bottom bar appearing after scrolling past the hero section, driving high-intent traders directly into prefilled WhatsApp conversations. | Mobile UX, Product Pages, Homepage |

---
*Maintained throughout the LibraGems project lifecycle.*
