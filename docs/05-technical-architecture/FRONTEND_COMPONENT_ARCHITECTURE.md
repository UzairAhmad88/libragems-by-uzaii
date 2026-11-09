# Frontend Component Architecture Specification
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** FCA-001  
**Version:** 1.0  
**Phase:** Phase 03 – Complete Public Website Frontend Development  
**Role:** Principal Frontend Architect & Senior UI Engineer  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Architectural Overview & Component Hierarchy

The LibraGems frontend architecture leverages Next.js 15.1 App Router, React 19 Server Components by default, TypeScript 5.7 strict typing, and Tailwind CSS 3.4.17. 

Client components (`"use client"`) are deployed strictly where user interaction, DOM event listeners, or client-side state transitions occur (navigation drawers, accordions, image lightboxes, modal readers, and interactive forms). All public pages render statically as prerendered static content (`○`) for maximum SEO discoverability and sub-millisecond initial server response times.

```
                              ROOT LAYOUT (`app/layout.tsx`)
                                            │
                ┌───────────────────────────┴───────────────────────────┐
                ▼                                                       ▼
      `<SiteHeader />` (Client)                                `<SiteFooter />` (Server)
    - Typographic Logotype                                  - 4-Column Corporate Grid
    - Desktop Nav (`next/link`)                             - CIBJO Ethical Disclosure Statement
    - Accessible Drawer Dialog                              - Verified Email & Bangkok Address
    - Active Route Highlighting                             - Draft Legal Links (`/privacy`, `/terms`)
                │
                ▼
       PAGE ROUTE (`app/...`)
                │
 ┌──────────────┼──────────────────────────┬────────────────────────────┐
 ▼              ▼                          ▼                            ▼
HOMEPAGE   CATALOGUE HUB            GEMSTONE DOSSIER                INSIGHTS HUB
 (`/`)     (`/gemstones`)      (`/gemstones/[slug]`)                (`/insights`)
   │              │                        │                            │
   ▼              ▼                        ▼                            ▼
`<ProductCard>` `<CatalogueGrid>`       `<ProductGallery>`            `<InsightsView>`
                - Filter Tabs (Client)  - Aspect 4:3 Main Frame       - Category Tabs
                - `<ProductCard>` Grid  - Lightbox Zoom Modal         - Article Cards
                                        `<SpecTable>`                 `<ArticleReaderModal>`
                                        - `tabular-nums` formatting   - Accessible Reader
                                        `<WhatsAppCta>`               - Modal Focus Trap
                                        - Verification-Pending Mode
                                        `<FaqAccordion>`
                                        - WAI-ARIA Disclosure
                                        `<EnquiryForm>`
                                        - Client-side Zod validation
                                        - Safe mailto fallback
                                        `<StickyMobileActionBar>`
                                        - Mobile Bottom Sticky Bar
```

---

## 2. Global Shell & Layout Architecture

### 2.1 Accessible Skip-to-Content Landmark
- Declared at the very root of `apps/web/src/app/layout.tsx`:
  ```html
  <a href="#main-content" className="skip-link">Skip to main content</a>
  ```
- Positioned off-screen (`top: -100px`) until keyboard focused, sliding into view at `top: 1rem` with visible focus outline.
- Direct target: `<main id="main-content" className="flex-1">` on every public route.

### 2.2 Global Site Header (`<SiteHeader />`)
- **Location:** `apps/web/src/components/layout/site-header.tsx`
- **Boundary:** Client Component (`"use client"`) due to `usePathname()`, scroll listeners, and mobile menu state.
- **Anatomy:**
  - Header Frame: `sticky top-0 z-40 border-b border-border bg-ivory/95 backdrop-blur-md`
  - Brand Mark: Typographic Cormorant Garamond logotype `"LibraGems"` + subtitle `"Bangkok • Est. Thailand"`
  - Navigation Strip: 5 primary links (`About`, `Gemstones`, `Quality & Sourcing`, `Insights`, `Contact`) with active link indicator (`after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forest`) and `aria-current="page"`.
  - Header CTA: `"Enquire on Lots"` linking to `/contact`.
  - Mobile Drawer:
    - 48px hamburger trigger (`aria-expanded`, `aria-controls="mobile-nav-drawer"`).
    - Backdrop overlay with blur.
    - Slide-out drawer panel with close button (`aria-label="Close navigation"`).
    - Focus trap and ESC key listener (`window.addEventListener("keydown")`).
    - Body scroll lock during active drawer state (`document.body.style.overflow = "hidden"`).

### 2.3 Global Site Footer (`<SiteFooter />`)
- **Location:** `apps/web/src/components/layout/site-footer.tsx`
- **Boundary:** Server Component.
- **Anatomy:**
  - Deep Forest Canvas: `bg-forest-deep text-white py-16 lg:py-20`
  - 4-Column Grid:
    - Col 1: Corporate identity, Bangkok DBD commercial statement, 1394 Charoen Krung Road address.
    - Col 2: Gemstone catalogue quick links with Lot references (`LG-HG-001`, `LG-TQ-001`, `LG-RUB-AFGHAN`).
    - Col 3: Standards and commercial policies (`About Us`, `CIBJO Protocol`, `Laboratory Memos`, `Insights`).
    - Col 4: Trading desk inquiries with direct email (`info@libragems.net`) and transparent phone status advisory.
  - Sub-Footer: Copyright, CIBJO ethical disclosure acknowledgement, and draft legal links (`/privacy`, `/terms`).

---

## 3. Gemstone Catalogue & Presentation Components

### 3.1 Gemstone Product Card (`<ProductCard />`)
- **Location:** `apps/web/src/components/gemstones/product-card.tsx`
- **Boundary:** Server Component.
- **Key Features:**
  - `aspect-[4/3]` visual container with hover zoom (`group-hover:scale-105 transition-transform duration-500`).
  - Overlay badges: Treatment status badge (`Natural Untreated (N)` vs `Stabilized (T)`) and lot reference code tag (`LG-HG-001`).
  - Spec summary: Form, Species, Origin, and Available Weight.
  - Accessible link: Stretched link pattern (`<span className="absolute inset-0 z-0" aria-hidden="true" />`) making the entire card clickable while allowing nested text selection.

### 3.2 Product Gallery (`<ProductGallery />`)
- **Location:** `apps/web/src/components/gemstones/product-gallery.tsx`
- **Boundary:** Client Component (`"use client"`).
- **Key Features:**
  - Primary high-resolution viewport (`aspect-[4/3]`) with view badge (`overview`, `macro`, `scale`, `table`, `pavilion`, `facet`).
  - Thumbnail selector rail supporting keyboard focus and visual active rings (`ring-2 ring-champagne/40`).
  - Fullscreen Lightbox Modal:
    - Triggered via floating expand button or image click.
    - Keyboard navigation: `Escape` to close, `ArrowRight` for next view, `ArrowLeft` for previous view.
    - Accessible dialog attributes (`role="dialog"`, `aria-modal="true"`, `aria-label`).

### 3.3 Gemological Specification Table (`<SpecTable />`)
- **Location:** `apps/web/src/components/gemstones/spec-table.tsx`
- **Boundary:** Server Component.
- **Key Features:**
  - Strict adherence to ADR-10: All numeric values ($ct$, $mm$, $g$, $kg$, refractive indices, specific gravities, hardness) declare `tabular-nums` for precise vertical decimal alignment.
  - Strict adherence to ADR-04 and ADR-09: Origin status is categorized as `Verified`, `Trade Consensus`, or `Unverified`.
  - CIBJO Treatment Code explicitly badged (`Code N`, `Code T`, `Code E`).
  - Laboratory memo availability explicitly noted (GIT, Lotus Gemology, AIGS).

### 3.4 Context-Aware WhatsApp CTA (`<WhatsAppCta />`)
- **Location:** `apps/web/src/components/gemstones/whatsapp-cta.tsx`
- **Boundary:** Client Component (`"use client"`).
- **Key Features:**
  - Strict adherence to ADR-09: Unverified placeholder phone numbers are deactivated.
  - Interactive advisory button: Expands an informative, dignified notice explaining that personal executive numbers are undergoing formal verification, directing trade buyers to the active Web Enquiry Form or direct corporate email.

### 3.5 Sticky Mobile Action Bar (`<StickyMobileActionBar />`)
- **Location:** `apps/web/src/components/gemstones/sticky-mobile-action-bar.tsx`
- **Boundary:** Client Component (`"use client"`).
- **Key Features:**
  - Hidden on desktop (`lg:hidden`).
  - Displays only after the user scrolls 350px past the product hero.
  - Padded for safe-area insets (`pb-[max(0.75rem,env(safe-area-inset-bottom))]`).
  - Minimum 48px touch target for "Inquire on Lot" CTA button.

---

## 4. Forms & Interactive Components

### 4.1 B2B Web Enquiry Form (`<EnquiryForm />`)
- **Location:** `apps/web/src/components/forms/enquiry-form.tsx`
- **Boundary:** Client Component (`"use client"`).
- **Fields:**
  - `fullName` (Required, min 2 chars)
  - `businessEmail` (Required, RFC-compliant format)
  - `companyName` (Optional commercial trade entity)
  - `country` (Country of operation)
  - `gemstoneInterest` (Required select, supports prefilled query params)
  - `quantitySpecs` (Target weight, parcel split, or sieve size)
  - `message` (Required, min 10 chars)
  - `privacyConsent` (Required checkbox linking to `/privacy` and `/terms`)
  - `websiteUrlTrap` (Hidden honeypot anti-spam input)
- **Validation & Transparency:**
  - Live client-side validation prevents empty or malformed submissions.
  - Non-deceptive feedback: Instead of faking a backend transmission, clearly explains that the client validation is complete and that live database/email persistence will connect in Phase 05.
  - Provides a one-click `mailto:` dispatch button pre-populated with all the buyer's exact inputs.

### 4.2 Editorial Article Reader Modal (`<ArticleReaderModal />`)
- **Location:** `apps/web/src/components/insights/article-reader-modal.tsx`
- **Boundary:** Client Component (`"use client"`).
- **Key Features:**
  - Enables reading complete 5-section gemological guides directly on `/insights` without 404s.
  - WAI-ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`).
  - Background scroll lock and keyboard ESC listener.
  - Includes executive takeaways, blockquotes, and deep links to related active inventory lots.

---

## 5. UI Atom & Primitive Components

| Component | Path | Responsibility | ARIA Pattern |
|---|---|---|---|
| `<Badge />` | `src/components/ui/badge.tsx` | Status tags (untreated, stabilized, verified, pending, accent) | Presentation span |
| `<Breadcrumbs />` | `src/components/ui/breadcrumbs.tsx` | Navigational trail + JSON-LD BreadcrumbList script | `nav[aria-label="Breadcrumb"]` |
| `<FaqAccordion />` | `src/components/ui/faq-accordion.tsx` | Buyer FAQ collapsible disclosure panels | WAI-ARIA Disclosure (`aria-expanded`, `aria-controls`) |

---

*Authored and certified as part of LibraGems Phase 03 Deliverables.*
