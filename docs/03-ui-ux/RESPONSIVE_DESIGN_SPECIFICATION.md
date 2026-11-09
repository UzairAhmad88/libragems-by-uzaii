# Responsive Design & Multi-Device Specification
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** RDS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Frontend Experience Architect & HCI Specialist  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Responsive Philosophy & Device Stratification

International gemstone trading takes place across diverse physical contexts: dealers inspecting parcels on mobile devices at gem bourses (in Bangkok, Hong Kong, Tucson, or Geneva), lapidary managers working on tablets on cutting floors, and corporate luxury procurement teams reviewing documentation on high-resolution desktop monitors.

The responsive architecture enforces a **Mobile-Optimized, Desktop-Enriched** methodology. Every layout is deliberately structured for touch interaction on small screens without sacrificing the spacious, editorial elegance of large desktop displays.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       RESPONSIVE DEVICE BREAKPOINT MATRIX                   │
├───────────────┬─────────────────┬───────────┬──────────────┬────────────────┤
│ Device Tier   │ Viewport Range  │ Columns   │ Max Width    │ Primary Input  │
├───────────────┼─────────────────┼───────────┼──────────────┼────────────────┤
│ Mobile Small  │ 320px – 389px   │ 1 col     │ Fluid 100%   │ Touch (Thumb)  │
│ Mobile Std    │ 390px – 767px   │ 1 col     │ Fluid 100%   │ Touch (Thumb)  │
│ Tablet        │ 768px – 1023px  │ 2 – 4 col │ 720px        │ Touch / Mouse  │
│ Laptop        │ 1024px – 1439px │ 12 col    │ 1140px       │ Mouse / Track  │
│ Desktop / 4K  │ 1440px and up   │ 12 col    │ 1280px / 1440│ Precision Mouse│
└───────────────┴─────────────────┴───────────┴──────────────┴────────────────┘
```

---

## 2. Layout Stacking & Structural Reorganization Rules

When transitioning between desktop and mobile viewports, components rearrange according to strict ergonomic rules:

### 2.1 Hero Section
- **Desktop (1024px+):** 2-column asymmetric grid (`1.1fr` content / `0.9fr` gemstone photograph). Headline, narrative copy, and CTA group align left. Large gemstone photograph commands right pane.
- **Mobile (<768px):** Single-column stacked order:
  1. Eyebrow Tag (`text-eyebrow`)
  2. Hero Headline (`text-display` scaled to 40px)
  3. Lead Copy (`text-body-lg` scaled to 16px)
  4. Full-width Hero Gemstone Image (Aspect ratio `16:9` or `4:3`, rounded-xl)
  5. Primary CTA Stack: Full-width `"Explore Gemstones"` button, followed by secondary `"Contact LibraGems"` button.

### 2.2 Gemstone Catalogue Grid
- **Desktop (1024px+):** 3-column grid (`grid-cols-3 gap-8`).
- **Tablet (768px–1023px):** 2-column grid (`grid-cols-2 gap-6`).
- **Mobile (<768px):** 1-column vertical card feed (`grid-cols-1 gap-6`). Each product card spans full width with a prominent `4:3` photo preview.

### 2.3 Product Landing Page (The Two-Column Transformation)
- **Desktop (1024px+):** Asymmetrical 2-column split (`1fr` sticky gallery / `1.1fr` scrollable product dossier). Left column features the main macro photo and thumbnail strip; right column features title, specs table, treatment disclosure, and enquiry module.
- **Mobile (<768px):** Linear sequence:
  1. Breadcrumbs
  2. Product Title & Category Eyebrow
  3. Swipeable / Tap-to-switch Image Carousel
  4. Quick Facts Summary (Carat, Form, Origin)
  5. Gemological Specifications Table
  6. Quality, Treatment & Sourcing Notes
  7. Sticky Bottom WhatsApp Bar (Locks to viewport bottom)

---

## 3. Touch Ergonomics & Form Accessibility

To ensure effortless operation on mobile touchscreens:

### 3.1 Minimum Touch Targets ($\ge 48 \times 48\text{px}$)
- All interactive controls (buttons, links, navigation items, accordion headers, form inputs) must provide an active tap area of at least **$48\text{px} \times 48\text{px}$**, with at least $8\text{px}$ of separation between adjacent targets.

### 3.2 Mobile Navigation Drawer (Off-Canvas Pattern)
- **Trigger:** Accessible hamburger button on right side of header (`48x48px` tap target, `aria-label="Toggle navigation menu"`, `aria-expanded="false"`).
- **Drawer Behavior:** Slides in from the right edge (`transform: translateX(0)`), covering 85% of mobile viewport width (max 380px).
- **Backdrop:** Semi-transparent dark overlay (`rgba(16, 55, 41, 0.6)`) with blur (`backdrop-blur-sm`). Tapping backdrop or pressing `Escape` closes the drawer.
- **Focus Management:** Focus is trapped inside the drawer while open. On close, focus returns automatically to the hamburger trigger button.

### 3.3 Virtual Keyboard & Form Ergonomics on Mobile
- **iOS Font Zoom Prevention:** All text inputs (`<input>`, `<textarea>`, `<select>`) must specify a font-size of **$16\text{px}$** on mobile viewports. Browsers (especially iOS Safari) automatically zoom the viewport when focusing inputs below 16px, causing severe layout disorientation.
- **Input Type Optimization:**
  - Phone field uses `type="tel"` to trigger the numerical keypad.
  - Email field uses `type="email"` with `autoCapitalize="none"` and `autoCorrect="off"`.

---

## 4. Responsive Specification Tables

Dense gemological data tables ($ct$, $mm$, $g$, refractive index) risk severe horizontal overflow on small screens:

### Table Strategy for LibraGems:
- **Card-List Transformation:** On mobile screens ($< 640\text{px}$), the table ceases to behave as a rigid HTML `<table>` and transforms into a stacked definition list (`<dl>`):
  ```
  ┌──────────────────────────────────────────────────────────┐
  │ WEIGHT (CARATS)                                          │
  │ 4.85 ct                                                  │
  ├──────────────────────────────────────────────────────────┤
  │ DIMENSIONS (MM)                                          │
  │ 12.4 x 9.2 x 5.1 mm                                      │
  ├──────────────────────────────────────────────────────────┤
  │ TREATMENT STATUS                                         │
  │ Natural Untreated (Verified)                             │
  └──────────────────────────────────────────────────────────┘
  ```
- **Overflow Protection:** For multi-column comparative tables, wrap in a container with `overflow-x: auto`, smooth touch inertia (`-webkit-overflow-scrolling: touch`), and a subtle right-side gradient shadow indicating more scrollable content.

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
