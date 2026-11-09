# Design System & UI/UX Approval Checklist
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** DAC-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Auditor:** Creative Director, Lead UX Architect & Project Lead  
**Date:** November 10, 2026  
**Status:** Multi-Domain Design Sign-Off Matrix

---

## 1. Instructions & Approval Scope

This checklist serves as the formal gateway audit for **Phase 01 (Brand Identity, UI/UX Architecture & Complete Website Design System)**. Before transitioning to **Phase 02 (Project Foundation & Technical Implementation)**, each design criterion must be verified against professional standards.

---

## 2. Multi-Domain Design Review Matrix

### Section 1: Brand Identity & Emotional Positioning
- [x] **Quiet Luxury & Restraint:** The visual identity projects the calm, established authority of an international trading desk, avoiding retail consumer glitz.
- [x] **Anti-Template Safeguard:** Avoids generic AI-generated tropes (floating neon spheres, oversized wave dividers, particle canvases).
- [x] **No E-Commerce Artifacts:** Zero shopping carts, checkout buttons, or retail discount badges.
- [x] **Geological Authenticity:** Layouts and typography respect the mineralogical reality of gemstones.

### Section 2: Color System & 60/30/10 Ratio
- [x] **60% Natural Canvas:** Warm Off-White / Beige (`#F3EFE5`) and Soft Ivory (`#FAF8F2`) provide an organic mineral background.
- [x] **30% Structural Authority:** Deep Forest Green (`#174C38`) and Midnight Shade (`#103729`) anchor navigation, headers, and footers.
- [x] **10% Prestige Accent:** Muted Champagne (`#B99B68`) deployed strictly for focus rings, dividers, and selected badges.
- [x] **WCAG Contrast Verification:** All normal text pairs exceed $4.5:1$ (Charcoal on Ivory achieves $14.85:1$; Forest Green on Ivory achieves $9.42:1$). Champagne Gold is strictly prohibited for body text.

### Section 3: Typography System
- [x] **Display Font:** Cormorant Garamond (or equivalent refined serif) specified for display heroes and page titles.
- [x] **Interface Font:** Inter specified for body copy, specs tables, and navigation.
- [x] **Tabular Numerals:** All gemological weights ($ct$, $g$) and dimensions ($mm$) declare `tabular-nums` for vertical alignment.
- [x] **Zero Layout Shift Loading:** Next.js font loading strategy configured via `next/font/google` with `display: swap`.

### Section 4: Component Inventory & State Completeness
- [x] **Header & Navigation:** Desktop navigation and mobile drawer with focus trap defined.
- [x] **Footer:** 4-column structure with corporate address, catalogue links, and legal terms.
- [x] **Gemstone Product Card:** Standardized with status badge, category eyebrow, title, spec snapshot, and hover lift.
- [x] **Specification Table:** Tabular attribute-value grid with mobile card transformation.
- [x] **State Completeness:** Every interactive component defines Default, Hover, Active, Focus-Visible, Disabled, and Loading states.

### Section 5: Responsive Architecture & Touch Usability
- [x] **Four Breakpoint Tiers:** Mobile ($320\text{px}–767\text{px}$), Tablet ($768\text{px}–1023\text{px}$), Laptop ($1024\text{px}–1439\text{px}$), Desktop ($1440\text{px}+$ ).
- [x] **Touch Ergonomics:** All touch targets maintain at least $48 \times 48\text{px}$ with $8\text{px}$ spacing.
- [x] **Virtual Keyboard Protection:** Form inputs specify $16\text{px}$ font size on mobile to prevent automatic iOS viewport zooming.
- [x] **Horizontal Overflow Zero Tolerance:** Grids and data tables transform cleanly without horizontal clipping.

### Section 6: Human-Computer Interaction & Accessibility (WCAG 2.2 AA)
- [x] **Visible Focus Indicators:** High-contrast Champagne Gold outline (`3px solid #B99B68; outline-offset: 2px`) on all interactive controls.
- [x] **Keyboard Navigability:** Full keyboard tab traversal, Escape-to-close on drawers/modals, and skip-to-content link.
- [x] **Assistive Technology Support:** WAI-ARIA landmarks, live validation announcements, and semantic heading hierarchy.
- [x] **Motion Sensitivity:** Universal `prefers-reduced-motion` CSS override specified.

### Section 7: Product Photography & Media Standards
- [x] **Absolute Authenticity Mandate:** Zero stock photos; live inventory photography strictly required.
- [x] **Lighting & Color Standards:** Calibrated D65 5500K daylight-balanced shooting with embedded sRGB color profiles.
- [x] **Standardized Aspect Ratios:** $4:3$ for rough lots, $1:1$ for faceted stones, $16:9$ for heroes.
- [x] **Descriptive Image Alt-Text:** Formulaic, keyword-rich, and factual alt-text pattern established.

### Section 8: Conversion Architecture
- [x] **Multi-Channel Pathways:** Primary WhatsApp deep linking, secondary email contact, and structured web enquiry forms.
- [x] **Context-Aware Pre-fills:** WhatsApp messages automatically pre-fill gemstone lot reference and product name.
- [x] **Sticky WhatsApp Action:** Persistent mobile bottom bar appearing after scrolling past hero.
- [x] **Price on Application:** Respects wholesale trade conventions without publishing static retail pricing.

### Section 9: Page-by-Page Completeness
- [x] Page 01: Homepage (`/`)
- [x] Page 02: About Us (`/about`)
- [x] Page 03: Gemstone Catalogue (`/gemstones`)
- [x] Page 04: Commercial-Quality Rough Hessonite Garnet (`/gemstones/hessonite-garnet`)
- [x] Page 05: Commercial-Quality Turquoise (`/gemstones/turquoise`)
- [x] Page 06: Afghanistan Cut-Stone Rubellite (`/gemstones/afghanistan-rubellite`)
- [x] Page 07: Quality & Sourcing (`/quality-sourcing`)
- [x] Page 08: Gemstone Insights / Articles (`/insights`)
- [x] Page 09: Contact Us (`/contact`)
- [x] Page 10: Legal Pages (`/privacy`, `/terms`)

---

## 3. Formal Gateway Sign-Off

All 14 design deliverables for Phase 01 have been produced, cross-referenced, and verified against professional standards.

| Reviewer Role | Name / Title | Determination | Date |
|---|---|---|---|
| **Creative Director** | Senior Design Team Lead | ✅ **APPROVED** | November 10, 2026 |
| **Lead UX Architect** | Senior Systems Architect | ✅ **APPROVED** | November 10, 2026 |
| **Accessibility Auditor** | WCAG Compliance Lead | ✅ **APPROVED** | November 10, 2026 |
| **Technical Engineering Lead** | Full-Stack Architect | ✅ **READY FOR PHASE 02**| November 10, 2026 |

---
*Document produced as part of LibraGems Phase 01 Deliverables.*

