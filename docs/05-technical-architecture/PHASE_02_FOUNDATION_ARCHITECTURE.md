# Phase 02 Foundation Architecture & Engineering Blueprint
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** PFA-002  
**Version:** 1.0  
**Phase:** Phase 02 – Production-Grade Project Foundation & Next.js Architecture  
**Role:** Principal Software Architect & Senior Next.js Lead  
**Date:** November 10, 2026  
**Status:** Architecture Implemented & Verified

---

## 1. Executive Summary & Foundation Scope

Phase 02 establishes the production-grade technical scaffold for the **LibraGems** platform. It translates the design architecture and tokens from Phase 01 into an executable, strictly typed, accessible, and secure Next.js 15+ App Router application.

### Key Architectural Milestones Achieved:
1. **Isolated Git Workstream:** Created and operating on branch `phase-02/project-foundation`, protecting `main` from unreviewed direct commits.
2. **Deterministic Pinned Dependencies:** Pinned mutually compatible LTS versions of Next.js 15, React 19, TypeScript 5.7, Tailwind CSS v4, PostCSS, ESLint 9, and Vitest, creating a reproducible `package-lock.json`.
3. **Tailwind CSS v4 & PostCSS Configuration:** Resolved the pre-existing mismatch where `globals.css` referenced Tailwind v4 `@import "tailwindcss";` without installed packages. Configured `@tailwindcss/postcss` and mapped all Phase 01 design tokens through `@theme`.
4. **Zero-Layout-Shift Font Architecture:** Integrated `Cormorant Garamond` (display serif) and `Inter` (interface sans) using Next.js native font optimization (`next/font/google`) with `display: swap`.
5. **Baseline Security Hardening:** Disabled `poweredByHeader`, enforced `nosniff`, `DENY` frame protection, `strict-origin-when-cross-origin` referrer policy, and cautious permissions policies.
6. **Zero-Secret Public Runtime:** Designed typed environment schema (`src/config/env.ts`) using Zod. Public website shell runs cleanly in development, testing, and CI without requiring Supabase or Resend credentials.
7. **Automated Testing & CI:** Integrated Vitest, `@testing-library/react`, jsdom, and configured GitHub Actions CI workflow (`.github/workflows/ci.yml`).

---

## 2. Directory Structure & Modular Separation

The application structure in `apps/web/` adheres to a clean, scalable separation of concerns:

```
apps/web/
├── public/
│   ├── icons/                  # SVG icons and favicon assets
│   └── images/
│       └── products/           # Verified gemstone lot images (Phase 03)
├── src/
│   ├── app/                    # Next.js App Router (RSC, layouts, routes)
│   │   ├── about/
│   │   ├── gemstones/
│   │   │   ├── hessonite-garnet/
│   │   │   ├── turquoise/
│   │   │   └── afghanistan-rubellite/
│   │   ├── quality-sourcing/
│   │   ├── insights/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── globals.css         # Tailwind v4 import, @theme, CSS variables
│   │   ├── layout.tsx          # Root shell, font injection, skip-link
│   │   ├── page.tsx            # Foundation homepage demonstration
│   │   ├── robots.ts           # Search engine crawl rules
│   │   └── sitemap.ts          # Comprehensive XML sitemap
│   ├── components/
│   │   ├── layout/             # Header, footer, navigation containers
│   │   └── ui/                 # Headless & bespoke UI primitives (Phase 03)
│   ├── config/
│   │   ├── env.ts              # Zod environment variable validation
│   │   └── env.test.ts         # Unit tests for environment configuration
│   ├── lib/
│   │   ├── utils.ts            # Class merge (cn) and E.164 phone sanitizers
│   │   └── utils.test.ts       # Vitest unit test suite
│   ├── styles/                 # Custom CSS utility modules
│   ├── test/
│   │   └── setup.ts            # Vitest DOM matchers setup
│   └── types/                  # Shared TypeScript interfaces
├── .editorconfig               # Universal coding formatting rules
├── eslint.config.mjs           # ESLint 9 Flat Config (Next Core Web Vitals)
├── next.config.ts              # Security headers, image remote patterns
├── package.json                # Pinned dependencies and run scripts
├── package-lock.json           # Deterministic dependency tree
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin configuration
├── tsconfig.json               # Strict TypeScript configuration
└── vitest.config.ts            # Vitest unit test runner configuration
```

---

## 3. Design Token Implementation

Design tokens established in Phase 01 are compiled directly into the Tailwind v4 engine using `@theme` and mirrored as CSS custom properties in `:root`:

```css
@import "tailwindcss";

@theme {
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

  --color-success: #2D6A4F;
  --color-warning: #A36A00;
  --color-error: #9E2A2B;

  --font-serif: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
  --font-sans: var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-subtle: 0 1px 3px rgba(16, 55, 41, 0.05);
  --shadow-card-hover: 0 8px 24px rgba(16, 55, 41, 0.08);
  --shadow-drawer: 0 20px 40px rgba(16, 55, 41, 0.15);
}
```

---

## 4. Environment & Security Boundaries

### 4.1 Strict Client vs. Server Separation
- **Public Variables:** Only variables required for client-side rendering are prefixed with `NEXT_PUBLIC_` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`).
- **Secret Protection:** Server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) are stripped from client bundles.
- **Fail-Safe Public Execution:** The Zod schema in `src/config/env.ts` assigns safe default empty strings to external provider keys, guaranteeing that the public website shell, test runners, and build commands execute flawlessly without requiring live database or email accounts.

### 4.2 HTTP Security Headers
Configured in `apps/web/next.config.ts`:
- `X-Content-Type-Options: nosniff` (Defeats MIME-type confusion attacks)
- `X-Frame-Options: DENY` (Mitigates clickjacking)
- `Referrer-Policy: strict-origin-when-cross-origin` (Protects visitor URL privacy)
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- `poweredByHeader: false` (Suppresses server identity fingerprinting)

---
*Document produced as part of LibraGems Phase 02 Deliverables.*
