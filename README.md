# LibraGems – Premium International Gemstone Trading Platform

**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Repository:** [github.com/UzairAhmad88/libragems-by-uzaii](https://github.com/UzairAhmad88/libragems-by-uzaii)  
**Status:** Phase 03 Public Frontend Completed & Verified  
**Default Branch:** `main` | **Working Branch:** `phase-03/public-website-frontend`

---

## Purpose & Commercial Model

This platform establishes the international digital portfolio and B2B wholesale enquiry engine for **Libra Gems & Trading Co., Ltd.**, situated in the historic Bang Rak gemstone trading district of Bangkok, Thailand.

The website operates an **enquiry-driven wholesale business model** with direct commercial negotiations conducted through **WhatsApp, secure web forms, telephone, and email**. In accordance with wholesale colored gemstone trade practices, it **strictly excludes consumer shopping carts, online checkouts, and credit card processing**.

### Initial Gemstone Inventory Focus:
1. **Commercial-Quality Rough Hessonite Garnet** (Grossular garnet alluvial rough pebbles)
2. **Commercial-Quality Turquoise** (Cryptocrystalline rough and mineral material with matrix)
3. **Afghanistan Cut-Stone Rubellite** (Precision-faceted purplish-red tourmaline cut gem)

---

## Brand & Visual System (60/30/10 Rule)

- **60% Natural Canvas:** Warm Off-White / Beige (`#F3EFE5`) and Soft Ivory (`#FAF8F2`).
- **30% Structural Authority:** Deep Forest Green (`#174C38`) and Midnight Shade (`#103729`).
- **10% Prestige Accent:** Muted Champagne Gold (`#B99B68`).
- **Typography:** Display Serif (`Cormorant Garamond`) paired with Interface Sans (`Inter`), utilizing tabular numerals for all gemological measurements.

---

## Technology Stack & Architecture

- **Framework:** Next.js 15.1.7 (App Router, Server Components, Static Route Generation)
- **Runtime:** React 19.0.0
- **Type Safety:** TypeScript 5.7.3 (Strict Mode)
- **Styling:** Tailwind CSS 3.4.17 with PostCSS 8.4 and Autoprefixer 10.4
- **Component Primitives:** Headless accessible UI patterns with `clsx` and `tailwind-merge`
- **Data Validation:** Zod 3.24.2 for typed environment validation and runtime schemas
- **Testing:** Vitest 3.0.5, `@testing-library/react`, and JSDOM
- **Code Quality:** ESLint 9 Flat Config (`eslint-config-next`)
- **Planned Integrations (Subsequent Phases):** PostgreSQL via Supabase (Phase 04), Resend Transactional Email (Phase 05), Vercel Hosting (Phase 08).

---

## Local Development & Setup

### Prerequisites
- Node.js `v20.x`, `v22.x`, or `v24.x` LTS
- npm `v10.x` or `v11.x`

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/UzairAhmad88/libragems-by-uzaii.git
cd libragems-by-uzaii

# 2. Check out working branch
git checkout phase-02/project-foundation

# 3. Navigate to web application directory
cd apps/web

# 4. Install deterministic dependencies
npm ci

# 5. Create local environment configuration
cp .env.example .env.local

# 6. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> The foundation shell runs completely offline without external database or email credentials.

---

## Verification & Build Commands

All development commands run from `apps/web/`:

```bash
npm run dev        # Starts Next.js development server at port 3000
npm run build      # Compiles production build and pre-renders static routes
npm run start      # Runs production server locally at port 3000
npm run lint       # Runs ESLint 9 checking for Core Web Vitals compliance
npm run typecheck  # Executes TypeScript strict typecheck (tsc --noEmit)
npm run test       # Executes Vitest unit tests in JSDOM environment
```

All suites have been verified with **Exit Code 0** across typecheck, lint, test, and build.

---

## Documentation Map

- `docs/01-project-overview/`: Project Vision, Scope, Audit, BRD, and Readiness Report.
- `docs/02-requirements/`: Gap Analysis and Client Confirmation Checklist.
- `docs/03-ui-ux/`: Complete Design System, Tokens, Typography, Wireframes, and Page Specs.
- `docs/04-product-catalogue/`: Gemstone Requirements, Data Collection Template.
- `docs/05-technical-architecture/`: Foundation Architecture, Dependency Register, Local Dev Guide, Environment Specs.
- `docs/06-seo/`: SEO Master Plan, Seed Keyword Clusters, Structured Data Guide.
- `docs/07-development/`: Phased Development Plan, Phase 02 Implementation Report.
- `docs/08-testing/`: Testing Strategy, Phase 02 Validation Report.
- `docs/10-project-management/`: Progress Tracker, Risk Register, Architecture Decisions Log (ADR).
- `.github/workflows/`: Automated CI pipeline (`ci.yml`).

---
*Libra Gems & Trading Co., Ltd. — Professional Production Scaffold.*
