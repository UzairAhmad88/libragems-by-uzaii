# Interaction & Micro-Interaction Specifications
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** IMS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Frontend Experience Architect & Motion Designer  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Motion Philosophy & Interaction Principles

The interaction design for LibraGems is **deliberate, restrained, and calm**. We reject gratuitous animations, bouncing buttons, and disruptive scroll-jacking in favor of purposeful feedback that reinforces quality and usability:

- **Decisive & Subtle:** Transitions acknowledge user action without delaying navigation or task completion.
- **Physical Naturalism:** Easing follows physical inertia—subtle acceleration and smooth deceleration.
- **Accessibility Safeguard:** Instant fallback for users with vestibular or motion sensitivity (`prefers-reduced-motion`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MOTION TOKENS & TIMING CURVES                         │
├───────────────┬───────────┬─────────────────────────┬───────────────────────┤
│ Token Name    │ Duration  │ Easing Curve (Bezier)   │ Primary Usage         │
├───────────────┼───────────┼─────────────────────────┼───────────────────────┤
│ transition-fast│ 150 ms    │ cubic-bezier(0.4,0,0.2,1)│ Tooltips, focus rings, │
│               │           │                         │ link color shifts     │
│ transition-norm│ 250 ms    │ cubic-bezier(0.4,0,0.2,1)│ Card hover, button    │
│               │           │                         │ states, accordions    │
│ transition-slow│ 400 ms    │ cubic-bezier(0.16,1,0.3,1│ Mobile drawer slide-in│
│               │           │ (Fluid Ease-Out)        │ Lightbox modal zoom   │
└───────────────┴───────────┴─────────────────────────┴───────────────────────┘
```

---

## 2. Micro-Interaction Catalog

### 2.1 Navigation & Header
- **Desktop Links:**
  - *Resting:* `text-ink font-medium` (`#242A26`).
  - *Hover:* Color transitions to `color-forest` (`#174C38`) over `150ms`. An understated 2px underline appears (`border-b-2 border-forest`).
  - *Active Route:* Maintained underline in `var(--color-champagne)` with `aria-current="page"`.
- **Mobile Menu Drawer:**
  - *Trigger:* Tapping hamburger morphs icon into an "X" via CSS rotation (`rotate(90deg)` over `200ms`).
  - *Drawer Entrance:* Slides from right (`translateX(100%) -> translateX(0)`) over `350ms` using `cubic-bezier(0.16, 1, 0.3, 1)`.
  - *Backdrop:* Fades from `opacity-0` to `opacity-100` over `300ms`.

### 2.2 Buttons & Call-to-Action Controls
- **Primary Forest Green Button (`<Button variant="primary">`):**
  - *Resting:* Solid Forest Green (`#174C38`), white text.
  - *Hover:* Background lightens to `#25664E`, subtle vertical lift `translateY(-1px)`, box shadow deepens to `0 4px 12px rgba(23,76,56,0.18)` over `200ms`.
  - *Active (Click/Tap):* Scale depresses slightly (`scale(0.98)`), background deepens to `#103729`.
  - *Focus-Visible:* High-contrast Champagne Gold outline (`3px solid #B99B68; outline-offset: 2px`).
- **Sticky Mobile WhatsApp Bar:**
  - *Scroll Trigger:* Appears after scrolling past the hero section ($> 300\text{px}$) with a smooth slide-up from bottom (`translateY(100%) -> translateY(0)`) over `250ms`.
  - *Tap:* Immediate feedback (opacity `0.85`), launches WhatsApp native client via sanitized deep link.

### 2.3 Gemstone Product Cards
- *Resting:* Card flat on canvas with border `1px solid var(--color-border)` (`#DDD8CC`).
- *Hover (Mouse Enter):*
  - Vertical lift: `transform: translateY(-3px)` over `250ms ease-out`.
  - Border: Soft transition to `var(--color-champagne)` (`#B99B68`).
  - Shadow: Expands to `0 12px 28px rgba(16, 55, 41, 0.08)`.
  - Card photo: Micro-scale zoom `scale(1.02)` within overflow-hidden container.
- *Mouse Leave:* Smoothly returns to neutral baseline over `250ms`.

### 2.4 Product Gallery & Media Lightbox
- **Thumbnail Interaction:**
  - Clicking/tapping a thumbnail immediately updates the main display frame with a cross-fade (`opacity: 0 -> 1` over `150ms`).
  - Active thumbnail is framed in `2px solid var(--color-champagne)` with subtle elevation.
- **Lightbox Zoom Modal:**
  - Clicking main photo expands image to full viewport with an organic scale-up animation (`scale(0.95) -> scale(1.00)` accompanied by `backdrop-blur-md`).
  - Touch: Supports pinch-to-zoom and two-finger pan for high-resolution inclusion inspection.
  - Close: Clicking outside, tapping `X`, or pressing `Escape` closes the lightbox.

### 2.5 Specification Table Accordion (Mobile View)
- On mobile screens, specification groups can be expanded or collapsed:
  - Header click toggles open/closed state.
  - Smooth expansion achieved using modern CSS Grid technique (`grid-template-rows: 0fr -> 1fr` over `250ms ease-out`), preventing choppy JavaScript height calculations.
  - Plus icon rotates 45 degrees into an "X" or chevron rotates 180 degrees.

### 2.6 Form Field Validation & Submission States
- **Input Focus State:**
  - Border transitions from `#DDD8CC` to `#174C38`.
  - Outline glows with subtle Champagne focus ring (`3px solid #B99B68; outline-offset: 1px`).
- **Live Validation (On Blur):**
  - If field is valid: Subtle green checkmark icon appears on right side.
  - If field is invalid: Border turns Carmine Red (`#9E2A2B`); inline error text fades in (`opacity: 0 -> 1; translateY(-2px) -> translateY(0)`).
- **Submit Button State:**
  - While transmitting: Text changes to `"Transmitting Enquiry..."`, button opacity drops to `0.8`, inline spinning loader renders. Button is disabled to prevent duplicate submissions.
  - On Success: Form card cross-fades into a confirmation banner with green checkmark and reference ID.

---

## 3. Reduced-Motion Implementation Protocol

LibraGems enforces strict accessibility compliance for users with motion sensitivity. The following universal rule is compiled into the global stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
    transform: none !important;
  }
}
```

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
