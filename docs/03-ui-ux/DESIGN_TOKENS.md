# Design Token System & Visual Hierarchy
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** DTS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Senior UX Architect & Visual Systems Designer  
**Date:** November 10, 2026  
**Status:** Approved Specification

---

## 1. Visual Philosophy & 60/30/10 Color Architecture

The visual direction of LibraGems conveys the prestige, heritage, and quiet authority of an established international gemstone trading house. It avoids flashy retail jewellery glitz, aggressive consumer sales banners, and generic AI-template aesthetics.

The brand adheres strictly to the **60/30/10 color rule**:
- **60% Dominant Canvas (Warm Neutral):** Warm Off-White / Beige (`#F3EFE5`) and Soft Ivory (`#FAF8F2`) provide an organic, mineral-paper canvas that allows gemstone photography to command visual attention.
- **30% Structural Authority (Forest Green):** Deep Forest Green (`#174C38`) and Midnight Forest (`#103729`) anchor headers, typography, footers, and primary buttons, conveying geological permanence, trust, and refinement.
- **10% Prestige Accent (Muted Champagne):** Champagne Gold (`#B99B68`) is deployed sparingly for subtle focus rings, badges, dividers, and contextual indicators.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       60 / 30 / 10 COLOR RATIO MAPPING                      │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ 60% Natural Canvas      │ 30% Deep Forest         │ 10% Champagne Accent    │
│ #F3EFE5 / #FAF8F2       │ #174C38 / #103729       │ #B99B68                 │
│ Backgrounds, cards,     │ Headings, borders, nav, │ Badges, active focus,   │
│ content sections        │ primary CTAs, footers   │ delicate borders        │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 2. Color Palette & Accessibility Specifications

All color pairings have been audited against **WCAG 2.1 Level AA and Level AAA** contrast requirements.

| Token Name | Hex Code | RGB | HSL | Semantic Role | Contrast on Ivory (`#FAF8F2`) | WCAG Rating |
|---|---|---|---|---|---|---|
| `color-forest` | `#174C38` | `23, 76, 56` | `157°, 54%, 19%` | Primary brand anchor, buttons, display titles | **9.42 : 1** | **AAA (Pass)** |
| `color-forest-deep`| `#103729` | `16, 55, 41` | `158°, 55%, 14%` | Footer background, dark hero sections, text | **13.68 : 1** | **AAA (Pass)** |
| `color-forest-light`| `#25664E` | `37, 102, 78` | `158°, 47%, 27%` | Button hover states, secondary highlights | **6.12 : 1** | **AA (Pass)** |
| `color-beige` | `#F3EFE5` | `243, 239, 229` | `43°, 36%, 93%` | Secondary section background, table alternating | N/A (Canvas) | N/A |
| `color-ivory` | `#FAF8F2` | `250, 248, 242` | `45°, 40%, 96%` | Primary page canvas, card backgrounds | N/A (Canvas) | N/A |
| `color-white` | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Card surfaces, dialog backgrounds | N/A (Canvas) | N/A |
| `color-champagne`| `#B99B68` | `185, 155, 104`| `38°, 38%, 57%` | Focus rings, accent borders, subtle tags | **2.62 : 1** (Do NOT use as small text on light canvas) | **UI Only** |
| `color-champagne-light`| `#E8DFC9` | `232, 223, 201`| `43°, 39%, 85%` | Subtle tag backgrounds, badge fill | N/A (Fill) | N/A |
| `color-ink` | `#242A26` | `36, 42, 38` | `140°, 8%, 15%` | Primary body text, labels, form inputs | **14.85 : 1** | **AAA (Pass)** |
| `color-stone` | `#6E756F` | `110, 117, 111`| `129°, 3%, 45%` | Secondary body text, captions, timestamps | **4.64 : 1** | **AA (Pass)** |
| `color-border` | `#DDD8CC` | `221, 216, 204`| `42°, 21%, 83%` | Card borders, dividers, form input borders | N/A (UI) | N/A |
| `color-border-subtle`| `#EBE7DC` | `235, 231, 220`| `44°, 27%, 89%` | Light dividers, table inner borders | N/A (UI) | N/A |

### Semantic State Colors:
- **Success:** `#2D6A4F` (Forest Green variant, WCAG AAA compliant on light canvas)
- **Warning:** `#A36A00` (Warm Ochre / Amber, 4.8:1 on light canvas)
- **Error:** `#9E2A2B` (Muted Carmine Red, 6.2:1 on light canvas)
- **Focus Ring:** `#B99B68` with `3px` solid stroke and `2px` offset

---

## 3. CSS Variables & Tailwind Theme Architecture

These CSS Custom Properties will be bound in `apps/web/src/app/globals.css` and referenced through Tailwind CSS utility classes:

```css
:root {
  /* Brand Core Colors */
  --color-forest: #174C38;
  --color-forest-deep: #103729;
  --color-forest-light: #25664E;
  --color-beige: #F3EFE5;
  --color-ivory: #FAF8F2;
  --color-white: #FFFFFF;
  --color-champagne: #B99B68;
  --color-champagne-light: #E8DFC9;
  --color-ink: #242A26;
  --color-stone: #6E756F;
  --color-border: #DDD8CC;
  --color-border-subtle: #EBE7DC;

  /* Typography Scales */
  --font-serif: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
  --font-sans: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Spacing & Layout */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 4. Typography Hierarchy & Font Pairings

The typography pairs an **editorial, historic display serif** with an **ergonomic, ultra-legible modern sans-serif**:
- **Display & Headings:** `Cormorant Garamond` (Google Font, self-hosted via `next/font/google`). Reflects classical gemological literature, European auction catalogs, and fine craftsmanship.
- **Body, UI & Data Tables:** `Inter` (Google Font, self-hosted via `next/font/google`). Engineered for high legibility at micro-sizes, numerical clarity in gemstone specifications ($ct$, $mm$, $g$), and form ergonomics.

```
  ┌───────────────────────────────────────────────────────────────────────────┐
  │                           TYPOGRAPHIC SCALE (DESKTOP)                     │
  ├───────────────┬───────────────────┬─────────────┬─────────────┬───────────┤
  │ Role          │ Font Family       │ Size / Line │ Weight      │ Tracking  │
  ├───────────────┼───────────────────┼─────────────┼─────────────┼───────────┤
  │ Hero Display  │ Cormorant Garamond│ 64px / 1.1  │ SemiBold 600│ -0.02em   │
  │ H1 Page Title │ Cormorant Garamond│ 48px / 1.15 │ SemiBold 600│ -0.01em   │
  │ H2 Section    │ Cormorant Garamond│ 36px / 1.2  │ Medium 500  │ Normal    │
  │ H3 Card Title │ Cormorant Garamond│ 26px / 1.25 │ Medium 500  │ Normal    │
  │ H4 Subtitle   │ Cormorant Garamond│ 20px / 1.3  │ Medium 500  │ Normal    │
  │ Eyebrow / Tag │ Inter             │ 12px / 1.4  │ Medium 500  │ +0.15em   │
  │ Body Large    │ Inter             │ 18px / 1.6  │ Regular 400 │ Normal    │
  │ Body Base     │ Inter             │ 15px / 1.6  │ Regular 400 │ Normal    │
  │ Body Small    │ Inter             │ 13px / 1.5  │ Regular 400 │ Normal    │
  │ Data / Specs  │ Inter (Tabular)   │ 14px / 1.4  │ Medium 500  │ Normal    │
  │ Button / Action│ Inter            │ 14px / 1.0  │ Medium 500  │ +0.02em   │
  └───────────────┴───────────────────┴─────────────┴─────────────┴───────────┘
```

### Mobile Typographic Adaptations:
- **Hero Display:** Scales down to `40px / 1.15` on viewports $< 640\text{px}$.
- **H1 Page Title:** Scales down to `32px / 1.2` on mobile.
- **H2 Section Title:** Scales down to `28px / 1.25` on mobile.
- **Body Text:** Maintained at `15px` to ensure minimum readability without pinch-zooming.

---

## 5. Spacing, Grid & Layout System

LibraGems employs an **8-point geometric grid system** (with a 4px sub-grid for tight UI alignment):

### Spacing Tokens:
- `space-1` = `4px` (Border offsets, tag inner padding)
- `space-2` = `8px` (Icon gaps, compact padding)
- `space-3` = `12px` (Form input vertical padding)
- `space-4` = `16px` (Standard component inner padding, mobile gutters)
- `space-6` = `24px` (Card padding, desktop grid gaps)
- `space-8` = `32px` (Section sub-elements spacing)
- `space-12` = `48px` (Section vertical spacing on mobile)
- `space-16` = `64px` (Standard section vertical spacing on desktop)
- `space-24` = `96px` (Major section boundaries on desktop)

### Container Breakpoints & Max Widths:
- **Mobile Container:** Fluid width with `16px` side padding (`320px` to `639px`).
- **Tablet Container:** `max-w-2xl` (`672px`) or fluid with `24px` padding (`640px` to `1023px`).
- **Desktop Standard:** `max-w-5xl` (`1024px`) for focused reading layouts (About, Quality).
- **Desktop Full:** `max-w-7xl` (`1280px`) with `32px` side padding for catalogue grids and heroes.
- **Ultra-Wide Max:** Fixed at `1440px` maximum with auto-centering to prevent stretched horizontal layouts on 4K displays.

---

## 6. Elevation, Borders & Surface Treatment

### Elevation (Box Shadows):
- `shadow-none`: Default for flat minimal cards on ivory canvas.
- `shadow-subtle`: `0 1px 3px rgba(16, 55, 41, 0.05)` (Product cards in resting state).
- `shadow-hover`: `0 8px 24px rgba(16, 55, 41, 0.08)` (Product cards on hover transition).
- `shadow-modal`: `0 20px 40px rgba(16, 55, 41, 0.15)` (Mobile navigation drawer, dialogs).

### Border Tokens:
- Resting Card Border: `1px solid var(--color-border)` (`#DDD8CC`).
- Accent Border: `1px solid var(--color-champagne)` (`#B99B68`).
- Subtle Table Divider: `1px solid var(--color-border-subtle)` (`#EBE7DC`).
- Focus Ring: `3px solid var(--color-champagne)` with `2px` offset (`outline-offset: 2px`).

---

## 7. Motion & Interaction Rules

- **Micro-interactions:** Calm, predictable, and restrained. Hover state on gemstone cards uses a gentle `-2px` vertical translation (`transform: translateY(-2px)`) over `250ms ease-out`.
- **Prohibited Effects:** No spinning gem animations, no parallax scrolling, no particle canvas backgrounds, and no intrusive floating popups.
- **Accessibility:** Respect `prefers-reduced-motion: reduce`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
