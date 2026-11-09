# Human-Computer Interaction & Accessibility Guidelines (WCAG 2.2 AA)
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** HAG-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** HCI Specialist & Accessibility Compliance Auditor  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. HCI Heuristics Mapped to International Gemstone Trading

Human-Computer Interaction (HCI) principles ensure that the digital platform minimizes cognitive friction for international buyers who may be browsing under diverse lighting conditions, on mobile networks, and with varying degrees of English fluency.

The 10 usability heuristics (Nielsen Norman Group) are directly embedded into the LibraGems user experience:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     HCI HEURISTICS IN LIBRAGEMS TRADING                     │
├───────────────────────────────────┬─────────────────────────────────────────┤
│ Heuristic                         │ Practical Implementation on LibraGems   │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 1. Visibility of System Status    │ Form submission button displays spinner │
│                                   │ and text "Transmitting Enquiry...".     │
│                                   │ Active nav items marked with underline. │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 2. Match with the Real World      │ Uses standard gemological terminology   │
│                                   │ (CIBJO codes, carats, millimeter sizing)│
│                                   │ familiar to professional lapidaries.    │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 3. User Control & Freedom         │ Mobile drawer and image zoom modals     │
│                                   │ close via Escape key, close button, or  │
│                                   │ tapping the backdrop overlay.           │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 4. Consistency & Standards        │ Uniform 60/30/10 palette, predictable   │
│                                   │ button styles, and standardized spec    │
│                                   │ tables across all three gemstones.      │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 5. Error Prevention               │ Pre-filled product contexts; RFC email  │
│                                   │ format validation; double-submission    │
│                                   │ disabling on form submit buttons.       │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 6. Recognition Rather than Recall │ Gemstone name, lot reference, and photo │
│                                   │ persist in the enquiry form and WhatsApp│
│                                   │ message so buyers never retype data.    │
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 7. Flexibility & Efficiency       │ Rapid 1-click WhatsApp CTA for fast     │
│                                   │ mobile traders; structured web form for │
│                                   │ corporate buyers requiring formal memos.│
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 8. Aesthetic & Minimalist Design  │ Clean typography, generous whitespace;  │
│                                   │ elimination of flashing retail banners, │
│                                   │ fake scarcity clocks, and popup clutter.│
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 9. Error Recognition & Recovery   │ Specific inline error text ("Please     │
│                                   │ enter a valid corporate email address") │
│                                   │ with auto-focus shifting to invalid box.│
├───────────────────────────────────┼─────────────────────────────────────────┤
│ 10. Help & Documentation          │ Practical FAQs explaining parcel view,  │
│                                   │ video inspection, and insured delivery. │
└───────────────────────────────────┴─────────────────────────────────────────┘
```

---

## 2. WCAG 2.2 Level AA Compliance Specifications

The platform is engineered to meet all **WCAG 2.2 Level AA** success criteria, with select criteria meeting **Level AAA**:

### 2.1 Keyboard Navigation & Focus Management (SC 2.1.1, 2.1.2, 2.4.7)
- **Skip to Content Link:** First interactive element on every page is an accessible `"Skip to main content"` link, hidden off-screen until focused (`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-forest text-white px-4 py-2 rounded-md z-50`).
- **Focus Order:** Logical DOM traversal order matching visual layout (Header $\rightarrow$ Main $\rightarrow$ Footer).
- **Visible Focus Indicator:** High-contrast Champagne Gold ring (`outline: 3px solid #B99B68; outline-offset: 2px`) rendered on all focused interactive elements via `:focus-visible`. Default browser outlines are never suppressed without replacement.
- **Focus Trapping:**
  - When the Mobile Navigation Drawer opens, keyboard focus is trapped inside the drawer container.
  - When Image Lightbox zoom opens, focus is trapped on zoom controls and close button.
  - Pressing `Escape` closes the active modal/drawer and returns focus to the initiating element.

### 2.2 Color Contrast Ratios (SC 1.4.3, 1.4.11)
- **Normal Body Text:** Minimum contrast of **$4.5:1$** against background. LibraGems Charcoal (`#242A26`) on Ivory (`#FAF8F2`) achieves **$14.85:1$** (Exceeds AAA).
- **Large Display Headings:** Minimum contrast of **$3.0:1$**. LibraGems Forest Green (`#174C38`) on Ivory (`#FAF8F2`) achieves **$9.42:1$** (Exceeds AAA).
- **UI Components & Borders:** Form input borders (`#DDD8CC`) achieve distinct contrast against ivory and white backgrounds.
- **Prohibited Combination:** Muted Champagne (`#B99B68`) achieves only $2.62:1$ on light backgrounds and is **strictly prohibited for body text or small labels**. It is restricted to focus rings, icons, and filled badge surfaces.

### 2.3 Semantic HTML & Screen Reader Landmarks (SC 1.3.1, 4.1.2)
- Proper landmark tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Exactly one `<h1>` per page reflecting the unique core topic.
- Sequential heading order: No skipping levels (e.g., `<h2>` never follows `<h4>`).
- Form labels: Every `<input>` and `<textarea>` is explicitly paired with a `<label htmlFor="...">`.
- Validation errors announce dynamically to assistive tech using `role="alert"` and `aria-live="polite"`.

### 2.4 Accessible Mobile Touch Targets (SC 2.5.8)
- Every interactive control (navigation links, buttons, accordion toggles, inputs) provides an active target area of at least **$48\text{px} \times 48\text{px}$**.
- Adjacent touch targets maintain a minimum spacing of **$8\text{px}$** to prevent accidental mis-taps.

---

## 3. Cognitive Load & Reduced Motion Preferences

### 3.1 Cognitive Load Minimization
- **Chunked Specifications:** Gemstone specifications are grouped into logical visual clusters (Gemological Identity, Physical Measurements, Commercial Terms) rather than a monolithic wall of text.
- **No Automatic Media Playback:** Gemstone inspection videos never auto-play with audio. Videos are muted by default and require explicit user play action.

### 3.2 Respect for `prefers-reduced-motion` (SC 2.3.3)
- When a user's operating system requests reduced motion, all CSS transitions and animations collapse to instantaneous property changes (`animation-duration: 0.01ms !important; transition-duration: 0.01ms !important`).
- Smooth scrolling (`scroll-behavior: smooth`) is disabled in favor of instant jumping.

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
