# Component Library & Design Pattern Inventory
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** CLI-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Design Systems Architect & Lead UI Engineer  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Component Architecture & Design Principles

The LibraGems Component Library provides a modular, accessible, and high-performance collection of UI components. Each component is defined with:
- **Component Anatomy & Structural Hierarchy**
- **TypeScript Props Interface**
- **State Matrix (Default, Hover, Active, Focus, Disabled, Loading, Error)**
- **WAI-ARIA Accessibility Annotations**

---

## 2. Navigation Components

### 2.1 Global Site Header (`<SiteHeader />`)
- **Purpose:** Anchors corporate brand identity, provides persistent access to primary pages, and provides touch menu triggers on mobile.
- **Anatomy:**
  - Header Container: `border-b border-border bg-ivory/95 backdrop-blur-md sticky top-0 z-40`.
  - Brand Logo / Logotype: Typographic logotype `"LibraGems"` in Cormorant Garamond / Forest Green linking to `/`.
  - Desktop Nav Menu: Horizontal link strip with `gap-6 text-sm font-medium text-ink`.
  - Mobile Menu Trigger: Button with 3-bar hamburger icon (`48x48px` tap target).
- **Accessibility:**
  - Semantic `<header>` landmark.
  - `<nav aria-label="Main navigation">`.
  - Active link marked with `aria-current="page"`.

### 2.2 Mobile Navigation Drawer (`<MobileNavDrawer />`)
- **Purpose:** Accessible off-canvas navigation container for small viewports.
- **Anatomy:**
  - Backdrop Overlay: `fixed inset-0 bg-forest-deep/60 backdrop-blur-sm z-50`.
  - Sliding Drawer Panel: `fixed right-0 top-0 bottom-0 w-[85%] max-w-[380px] bg-ivory p-6 shadow-drawer z-50`.
  - Drawer Header: Brand name + Close Button (`aria-label="Close navigation"`).
  - Navigation Link Stack: Large vertical list (`text-xl font-serif text-forest-deep py-3 border-b border-border-subtle`).
  - Contact Shortcut: Direct WhatsApp and phone call buttons pinned to drawer bottom.
- **Accessibility:**
  - Focus trapped within drawer while open (`tabIndex` cycling).
  - Pressing `Escape` key closes drawer.
  - Automatically restores focus to hamburger trigger upon closure.

### 2.3 Global Site Footer (`<SiteFooter />`)
- **Purpose:** Reinforces corporate credibility, displays physical Bangkok address, and provides secondary navigation and legal links.
- **Anatomy:**
  - Footer Container: `bg-forest-deep text-white py-16 px-6`.
  - 4-Column Grid:
    - **Col 1 (Corporate Identity):** `LibraGems` logotype, DBD entity statement, Bang Rak address.
    - **Col 2 (Gemstone Catalogue):** Links to Hessonite Garnet, Turquoise, Afghanistan Rubellite, and All Gemstones.
    - **Col 3 (Company & Standards):** Links to About Us, Quality & Sourcing, Gemstone Insights.
    - **Col 4 (Enquiry & Legal):** Direct WhatsApp link, `info@libragems.net`, Privacy Policy, Terms of Trade.
  - Bottom Bar: Copyright notice, CIBJO ethical disclosure acknowledgement.

---

## 3. Product Presentation Components

### 3.1 Gemstone Product Card (`<ProductCard />`)
- **Purpose:** Primary catalogue discovery card used on Homepage and `/gemstones`.
- **Anatomy:**
  - Outer Card: `rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover`.
  - Image Container: `aspect-[4/3] rounded-xl overflow-hidden bg-beige relative`.
  - Status / Treatment Badge: Top-left pill tag (`Natural Untreated` / `Stabilized` / `Commercial Lot`).
  - Content Block:
    - Category Eyebrow: `text-xs uppercase tracking-wider text-stone mt-4`.
    - Title: `text-2xl font-serif text-forest mt-1`.
    - Short Spec Summary: e.g., *"Available lot: 5 kg | Origin: Sri Lanka"*.
    - Link Action: `text-sm font-medium text-forest flex items-center gap-1 mt-4`.
- **Hover State:** Border transitions to `border-champagne`, subtle vertical lift (`-2px`).

### 3.2 Product Gallery (`<ProductGallery />`)
- **Purpose:** High-resolution inspection of physical gemstone lots.
- **Anatomy:**
  - Main Display Frame: `aspect-[4/3]` or `aspect-[1/1]`, rounded-2xl, high-res photograph with click-to-zoom.
  - Thumbnail Rail: Horizontal thumbnail strip (4–6 views: macro, table, pavilion, scale reference).
  - Active Thumbnail: Highlighted with `2px solid var(--color-champagne)`.
  - Fullscreen Lightbox / Modal: High-resolution zoom viewer supporting pinch-to-zoom on touchscreens.

### 3.3 Gemological Specification Table (`<SpecTable />`)
- **Purpose:** Structured presentation of verified physical and gemological attributes.
- **Anatomy:**
  - Table Container: `rounded-xl border border-border overflow-hidden bg-white`.
  - Row Pairings:
    - Gemstone Variety / Mineral Species
    - Verified Geographic Origin
    - Total Weight ($ct$ / $g$ / $kg$)
    - Calibrated Dimensions ($mm$)
    - Treatment / Enhancement Status (CIBJO Code)
    - Cut Shape & Style (if faceted)
    - Color Tone & Saturation
    - Clarity Grade (Type III classification)
    - Available Lot Quantity
    - Laboratory Certification & Report Number
- **Typography:** Attribute values render in `tabular-nums` for precise alignment.

---

## 4. Enquiry & Action Components

### 4.1 Context-Aware WhatsApp CTA (`<WhatsAppButton />`)
- **Purpose:** Drives primary commercial conversion into WhatsApp chat with prefilled product context.
- **Variants:**
  - `variant="sticky-mobile"`: Fixed to bottom of screen on mobile viewports.
  - `variant="card"`: Embedded within product overview pane.
- **Props:**
  - `productTitle: string`
  - `productRef: string`
  - `targetNumber?: string` (Defaults to configured primary number)
- **Sanitization:** Cleans phone number through E.164 sanitizer and encodes message:  
  `https://wa.me/66846674833?text=Hello%20LibraGems...`

### 4.2 Web Enquiry Form (`<EnquiryForm />`)
- **Purpose:** Capture formal B2B wholesale enquiries for buyers requiring formal quotes or documentation.
- **Fields:**
  1. `full_name`: Text input (Required)
  2. `business_email`: Email input with RFC format validation (Required)
  3. `company_name`: Text input (Optional)
  4. `country`: Text input or select dropdown (Optional)
  5. `gemstone_interest`: Select prefilled with active gemstone context (Required)
  6. `quantity_specs`: Text input (e.g., "5 kg rough" or "single stone > 4ct")
  7. `message`: Textarea (Required, min 10 characters)
  8. `privacy_consent`: Checkbox linking to `/privacy`
  9. `website_url_trap`: Hidden honeypot anti-spam field (`aria-hidden="true"`, `tabIndex={-1}`)
- **States:**
  - `idle`: Form ready for entry.
  - `submitting`: Submit button shows spinner and text `"Transmitting Enquiry..."`. Inputs disabled.
  - `success`: Form collapses; displays green success banner with confirmation code.
  - `error`: Inline field error text in Carmine Red (`#9E2A2B`); focus shifts to first invalid field.

---

## 5. Educational & Content Components

### 5.1 FAQ Accordion (`<FAQAccordion />`)
- **Purpose:** Answers real buyer questions regarding lot inspection, shipping, and lab reports.
- **Anatomy:**
  - Header Button: `flex items-center justify-between w-full py-4 text-left font-serif text-lg text-forest border-b border-border`.
  - Icon: Plus / Minus chevron rotating 180 degrees.
  - Panel Body: `py-4 text-stone text-sm leading-relaxed`.
- **Accessibility:**
  - Implements WAI-ARIA Disclosure pattern: `aria-expanded="false"`, `aria-controls="faq-panel-id"`.

### 5.2 Article Card (`<ArticleCard />`)
- **Purpose:** Used on `/insights` to present gemological guides and industry education.
- **Anatomy:**
  - Image Frame (`16:9` aspect ratio).
  - Category Badge: e.g., `"Gemology"`, `"Sourcing"`.
  - Title: `text-xl font-serif text-forest-deep`.
  - Reading Time: e.g., `"5 min read"`.

---

## 6. Feedback & Edge State Components

### 6.1 Loading Skeletons (`<SkeletonCard />`, `<SkeletonTable />`)
- Pulse animation with warm neutral tone (`bg-border/40 animate-pulse rounded-lg`).
- Preserves exact aspect ratio of product images to prevent Cumulative Layout Shift (CLS).

### 6.2 Error Boundary Fallback (`<ErrorFallback />`)
- Displayed if a component crashes during rendering.
- Calm, dignified message: *"Unable to display gemstone details at this moment. Please contact our Bangkok office directly via WhatsApp."*

---
*Document produced as part of LibraGems Phase 01 Deliverables.*

