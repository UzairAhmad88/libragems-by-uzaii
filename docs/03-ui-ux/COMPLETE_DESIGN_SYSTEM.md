# Complete Website Design System Manual
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** CDS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Design Systems Architect & Lead UI Engineer  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Design System Architecture & Implementation Principles

The LibraGems Design System is engineered to bridge world-class luxury brand aesthetics with modular, high-performance web engineering. Built on an atomic hierarchy (Tokens $\rightarrow$ Primitives $\rightarrow$ Components $\rightarrow$ Templates $\rightarrow$ Pages), it provides an unshakeable foundation for Next.js App Router and Tailwind CSS implementation.

### Architectural Core Pillars:
1. **Design Token Single Source of Truth:** All visual attributes (color, typography, spacing, radius, elevation) originate from declarative tokens in CSS custom properties and are mapped to Tailwind utility classes.
2. **Accessibility-First Composition:** Every primitive conforms to **WCAG 2.2 Level AA**, with verified color contrast ratios, visible focus indicators, and ARIA semantic landmarks.
3. **Ergonomic Component Encapsulation:** Headless UI primitives (via Radix UI / shadcn/ui) wrapped in bespoke LibraGems styling to ensure bulletproof keyboard navigation and screen-reader compatibility.
4. **Resilient Responsive Grids:** Fluid, content-driven layouts that transition smoothly from small mobile viewports ($320\text{px}$) to ultra-wide desktop monitors ($1440\text{px}+$ ).

---

## 2. Global Token Specifications

### 2.1 Color Tokens
```
┌──────────────────┬───────────┬──────────────────────────────────────────────┐
│ Token            │ Value     │ Semantic Usage Role                          │
├──────────────────┼───────────┼──────────────────────────────────────────────┤
│ primary          │ #174C38   │ Main brand anchor, display headers, hero CTAs│
│ primary-hover    │ #25664E   │ Hover state on primary interactive elements  │
│ primary-dark     │ #103729   │ Footers, high-contrast dark sections, ink    │
│ secondary        │ #F3EFE5   │ Secondary section canvas, alternating bands  │
│ background       │ #FAF8F2   │ Primary page canvas (Soft Ivory)             │
│ surface          │ #FFFFFF   │ Card surfaces, dialog backgrounds, dropdowns │
│ accent           │ #B99B68   │ Focus rings, badges, dividers, subtle tags   │
│ accent-light     │ #E8DFC9   │ Badge fill, tag backgrounds                  │
│ text-primary     │ #242A26   │ High-contrast body text, form input text     │
│ text-secondary   │ #6E756F   │ Subtitles, timestamps, captions, table keys  │
│ border           │ #DDD8CC   │ Standard card borders, structural dividers   │
│ border-subtle    │ #EBE7DC   │ Table inner lines, light decorative borders  │
│ state-success    │ #2D6A4F   │ Form submission success, in-stock badges     │
│ state-warning    │ #A36A00   │ Limited parcel notices, pending verification │
│ state-error      │ #9E2A2B   │ Form field validation errors, system alerts  │
└──────────────────┴───────────┴──────────────────────────────────────────────┘
```

### 2.2 Typography Scale
- **Display Serif:** `Cormorant Garamond` (Weights: 500 Medium, 600 SemiBold, 700 Bold).
- **Interface Sans-Serif:** `Inter` (Weights: 400 Regular, 500 Medium, 600 SemiBold).

```
┌───────────────┬───────────────────┬─────────────┬─────────────┬─────────────┐
│ Token         │ Family            │ Size / Line │ Weight      │ Tracking    │
├───────────────┼───────────────────┼─────────────┼─────────────┼─────────────┤
│ text-hero     │ Cormorant Garamond│ 64px / 1.10 │ SemiBold 600│ -0.02em     │
│ text-h1       │ Cormorant Garamond│ 48px / 1.15 │ SemiBold 600│ -0.01em     │
│ text-h2       │ Cormorant Garamond│ 36px / 1.20 │ Medium 500  │ Normal      │
│ text-h3       │ Cormorant Garamond│ 26px / 1.25 │ Medium 500  │ Normal      │
│ text-h4       │ Cormorant Garamond│ 20px / 1.30 │ Medium 500  │ Normal      │
│ text-eyebrow  │ Inter             │ 12px / 1.40 │ Medium 500  │ +0.15em     │
│ text-body-lg  │ Inter             │ 18px / 1.60 │ Regular 400 │ Normal      │
│ text-body-base│ Inter             │ 15px / 1.60 │ Regular 400 │ Normal      │
│ text-body-sm  │ Inter             │ 13px / 1.50 │ Regular 400 │ Normal      │
│ text-specs    │ Inter (Tabular)   │ 14px / 1.40 │ Medium 500  │ Normal      │
│ text-btn      │ Inter             │ 14px / 1.00 │ Medium 500  │ +0.02em     │
└───────────────┴───────────────────┴─────────────┴─────────────┴─────────────┘
```

### 2.3 Spacing Scale (8-Point Grid)
```
┌───────────────┬───────────┬─────────────────────────────────────────────────┐
│ Token         │ Size (px) │ Usage                                           │
├───────────────┼───────────┼─────────────────────────────────────────────────┤
│ space-1       │ 4px       │ Micro offsets, tag inner padding                │
│ space-2       │ 8px       │ Icon/text gaps, compact element spacing         │
│ space-3       │ 12px      │ Form input vertical padding, badge spacing      │
│ space-4       │ 16px      │ Mobile page margins, card inner padding         │
│ space-6       │ 24px      │ Desktop card padding, grid gutter               │
│ space-8       │ 32px      │ Subsection vertical gaps                        │
│ space-12      │ 48px      │ Mobile section vertical spacing                 │
│ space-16      │ 64px      │ Tablet section vertical spacing                 │
│ space-24      │ 96px      │ Desktop section vertical spacing                │
│ space-32      │ 128px     │ Major page transition bands                     │
└───────────────┴───────────┴─────────────────────────────────────────────────┘
```

### 2.4 Radius & Elevation Tokens
- **Borders:**
  - `radius-sm`: `4px` (Form inputs, tags, badges)
  - `radius-md`: `8px` (Buttons, notification banners)
  - `radius-lg`: `16px` (Product cards, image containers, modal surfaces)
  - `radius-xl`: `24px` (Hero content cards, highlighted editorial blocks)
  - `radius-full`: `9999px` (Pill buttons, circular avatars)
- **Shadows (Restrained & Architectural):**
  - `shadow-subtle`: `0 1px 3px rgba(16, 55, 41, 0.05)`
  - `shadow-card-hover`: `0 8px 24px rgba(16, 55, 41, 0.08)`
  - `shadow-drawer`: `0 20px 40px rgba(16, 55, 41, 0.15)`

---

## 3. Reusable Component Specifications

Every component is defined with clear structure, variants, and complete interaction states.

### 3.1 Primary Button (`<Button variant="primary">`)
- **Structure:** Pill shape (`rounded-full`), `px-7 py-3.5`, `text-sm font-medium`.
- **Default State:** Background `var(--color-forest)` (`#174C38`), text `white`.
- **Hover State:** Background `var(--color-forest-light)` (`#25664E`), subtle scale `1.01`, transition `200ms ease`.
- **Active State:** Background `var(--color-forest-deep)` (`#103729`), scale `0.99`.
- **Focus-Visible:** Outline `3px solid var(--color-champagne)`, offset `2px`.
- **Disabled State:** Opacity `0.4`, cursor `not-allowed`.

### 3.2 Secondary Button (`<Button variant="secondary">`)
- **Structure:** Pill shape (`rounded-full`), `px-7 py-3.5`, `border 1px solid var(--color-forest)`, text `var(--color-forest)`.
- **Hover State:** Background `var(--color-forest)`, text `white`, transition `200ms ease`.
- **Focus-Visible:** Outline `3px solid var(--color-champagne)`, offset `2px`.

### 3.3 Product Card (`<ProductCard>`)
- **Structure:** Container with `rounded-2xl`, border `1px solid var(--color-border)`, background `white`, padding `space-6`.
- **Image Area:** Aspect ratio `4:3` (rough parcels) or `1:1` (cut stones), `rounded-xl`, overflow hidden.
- **Content Area:** 
  - Eyebrow tag: `text-eyebrow text-stone uppercase tracking-widest`.
  - Title: `text-h3 font-serif text-forest mt-2`.
  - Specs snapshot: 2-column key-value micro-grid (e.g., Weight, Origin).
  - Footer CTA: Contextual link `"View Gemstone Details →"`.
- **Hover State:** `translateY(-2px)`, shadow `shadow-card-hover`, border color `var(--color-champagne)`.

### 3.4 Gemological Specification Table (`<SpecTable>`)
- **Structure:** Border `1px solid var(--color-border)`, `rounded-xl`, background `white`.
- **Rows:** Alternating subtle ivory (`var(--color-ivory)`) and white.
- **Columns:**
  - Label Column (35% width): `text-sm font-medium text-stone`.
  - Value Column (65% width): `text-sm font-semibold text-ink`.
- **Divider:** `1px solid var(--color-border-subtle)`.

### 3.5 Sticky WhatsApp Enquiry Bar (`<StickyWhatsAppBar>`)
- **Mobile Only:** Fixed to bottom of viewport (`bottom-0 left-0 right-0 z-50`).
- **Structure:** Glassmorphic background (`rgba(250, 248, 242, 0.95)`, backdrop blur `12px`), border-top `1px solid var(--color-border)`.
- **Action:** Full-width green button (`#25D366` or brand forest with WhatsApp icon) triggering pre-filled E.164 deep link.

---

## 4. Page Layout Patterns & Viewport Grids

The layout utilizes a 12-column responsive CSS Grid:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             LAYOUT GRID DEFINITION                          │
├─────────────────┬───────────┬──────────────┬────────────┬───────────────────┤
│ Viewport        │ Columns   │ Max Width    │ Gutters    │ Side Margins      │
├─────────────────┼───────────┼──────────────┼────────────┼───────────────────┤
│ Mobile (<640px) │ 1 col     │ Fluid        │ 16px       │ 16px              │
│ Tablet (640-1023│ 2-4 cols  │ 720px        │ 24px       │ 24px              │
│ Desktop (1024-14│ 12 cols   │ 1280px (7xl) │ 32px       │ 32px              │
│ Ultra-wide (1440│ 12 cols   │ 1440px max   │ 32px       │ Auto (Centered)   │
└─────────────────┴───────────┴──────────────┴────────────┴───────────────────┘
```

---
*Document produced as part of LibraGems Phase 01 Deliverables.*

