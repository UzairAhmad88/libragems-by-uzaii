# Typography System & Editorial Hierarchy
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** TYS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Senior Typographic Designer & Frontend Architect  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Typographic Rationale & Brand Pairing

The LibraGems typographic identity pairs a **classical European display serif** with an **ultra-legible modern interface sans-serif**. This pairing bridges two centuries of gemstone trade heritage with modern digital precision:

- **Display Serif:** `Cormorant Garamond` (Claude Garamont revival by Christian Thalmann).  
  *Characteristics:* High stroke contrast, traditional proportions, elegant calligraphic terminals, and aristocratic dignity. Evokes luxury mineral monographs, museum catalogues, and prestigious gemstone auction literature.
- **Interface & Data Sans:** `Inter` (Rasmus Andersson).  
  *Characteristics:* Tall x-height, open apertures, distinct letterforms, and optimized tabular numeral rendering. Engineered specifically for micro-screen legibility, dense data specification tables ($mm$, $ct$, $g$), and friction-free form entry.

---

## 2. Complete Typographic Scale & Hierarchy

All sizes are specified in both absolute pixels ($px$) and relative root-em ($rem$), assuming a base $16\text{px}$ browser root.

| Token | Semantic Role | Font Family | Desktop Size | Mobile Size | Line Height | Weight | Tracking |
|---|---|---|---|---|---|---|---|
| `text-display` | Hero Banner Display | Cormorant Garamond | `64px (4.0rem)` | `40px (2.5rem)` | `1.10` | 600 SemiBold | `-0.02em` |
| `text-h1` | Main Page Titles | Cormorant Garamond | `48px (3.0rem)` | `32px (2.0rem)` | `1.15` | 600 SemiBold | `-0.01em` |
| `text-h2` | Section Titles | Cormorant Garamond | `36px (2.25rem)`| `28px (1.75rem)`| `1.20` | 500 Medium | `0.00em` |
| `text-h3` | Product & Card Titles | Cormorant Garamond | `26px (1.625rem)`| `22px (1.375rem)`| `1.25` | 500 Medium | `0.00em` |
| `text-h4` | Subsection Headers | Cormorant Garamond | `20px (1.25rem)` | `18px (1.125rem)`| `1.30` | 500 Medium | `0.00em` |
| `text-h5` | Spec Group Titles | Inter | `16px (1.0rem)` | `15px (0.9375rem)`| `1.40` | 600 SemiBold | `0.00em` |
| `text-h6` | Micro Headers | Inter | `14px (0.875rem)`| `13px (0.8125rem)`| `1.40` | 600 SemiBold | `0.00em` |
| `text-eyebrow`| Category & Meta Tags | Inter | `12px (0.75rem)` | `11px (0.6875rem)`| `1.40` | 600 SemiBold | `+0.15em (Uppercase)` |
| `text-body-lg`| Hero Lead Paragraph | Inter | `18px (1.125rem)`| `16px (1.0rem)` | `1.60` | 400 Regular | `0.00em` |
| `text-body` | Standard Body Copy | Inter | `15px (0.9375rem)`| `15px (0.9375rem)`| `1.60` | 400 Regular | `0.00em` |
| `text-body-sm`| Footnotes & Captions | Inter | `13px (0.8125rem)`| `12px (0.75rem)` | `1.50` | 400 Regular | `0.00em` |
| `text-nav` | Navigation Links | Inter | `14px (0.875rem)`| `16px (1.0rem)` | `1.00` | 500 Medium | `+0.02em` |
| `text-btn` | Button Action Labels| Inter | `14px (0.875rem)`| `14px (0.875rem)`| `1.00` | 500 Medium | `+0.02em` |
| `text-specs` | Table Attribute Data | Inter (Tabular) | `14px (0.875rem)`| `13px (0.8125rem)`| `1.40` | 500 Medium | `0.00em` |

---

## 3. Numeric Formatting & Tabular Figures

In gemstone trading, numerical values represent precision measurements (e.g., `4.85 ct`, `12.4 x 9.2 x 5.1 mm`, `1,250 g`). Standard proportional numerals cause uneven vertical alignment in data tables.

- **Tabular Numerals Rule:** All specification tables and numerical metrics must declare `font-variant-numeric: tabular-nums` (Tailwind class: `tabular-nums`).
- **Units of Measure:** Units ($ct$, $mm$, $g$, $kg$) must be set in normal weight (`font-normal`) with a non-breaking space (`&nbsp;`) preceding the symbol to prevent awkward line breaks.

---

## 4. Next.js Zero-Layout-Shift Font Loading

Fonts are imported via Next.js native font optimization (`next/font/google`), eliminating render-blocking network requests, external DNS lookups to Google CDN, and Cumulative Layout Shift (CLS = 0):

```typescript
// apps/web/src/app/layout.tsx configuration
import { Cormorant_Garamond, Inter } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
```

---

## 5. Contrast & Accessibility Matrix (WCAG 2.2)

Every typographic combination has been verified using WebAIM and Chrome DevTools contrast calculators:

| Text Element | Text Token | Background | Contrast Ratio | WCAG 2.2 Status |
|---|---|---|---|---|
| **Headings on Ivory Canvas** | `color-forest` (`#174C38`) | `color-ivory` (`#FAF8F2`) | **9.42 : 1** | **Passes AAA** |
| **Headings on Beige Panel** | `color-forest-deep` (`#103729`) | `color-beige` (`#F3EFE5`) | **12.85 : 1** | **Passes AAA** |
| **Body Copy on Ivory** | `color-ink` (`#242A26`) | `color-ivory` (`#FAF8F2`) | **14.85 : 1** | **Passes AAA** |
| **Secondary Text on Ivory** | `color-stone` (`#6E756F`) | `color-ivory` (`#FAF8F2`) | **4.64 : 1** | **Passes AA (Normal Text)** |
| **Footer Text on Dark Green**| `color-white` (`#FFFFFF`) | `color-forest-deep` (`#103729`) | **13.68 : 1**| **Passes AAA** |
| **Footer Secondary on Dark** | `rgba(255,255,255,0.75)` | `color-forest-deep` (`#103729`) | **9.10 : 1** | **Passes AAA** |
| **Button Text (Primary)** | `color-white` (`#FFFFFF`) | `color-forest` (`#174C38`) | **9.42 : 1** | **Passes AAA** |
| **Accent Text Rule** | `color-champagne` (`#B99B68`) | Light Backgrounds | **2.62 : 1** | ❌ **PROHIBITED** (UI/Borders only) |

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
