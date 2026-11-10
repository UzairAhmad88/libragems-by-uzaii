# LibraGems – Premium International Gemstone Trading Platform

**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Repository:** [github.com/UzairAhmad88/libragems-by-uzaii](https://github.com/UzairAhmad88/libragems-by-uzaii)  
**Status:** Phase 04 Database, Authentication & Admin Dashboard Completed & Verified  
**Default Branch:** `main` | **Working Branch:** `phase-04/supabase-admin-foundation`

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

- **Framework:** Next.js 15.1.7 (App Router, Server Components, Edge Middleware, Static Route Generation)
- **Runtime:** React 19.0.0
- **Database & Auth:** PostgreSQL via Supabase with `@supabase/supabase-js@2.119.0` and `@supabase/ssr@0.12.7`
- **Security:** PostgreSQL Row Level Security (RLS) on all 6 tables, dual-clause UPDATE policies (`USING` + `WITH CHECK`), tamper-evident audit logging
- **RBAC:** Closed administrative registration with 4 permission tiers (`super_admin`, `administrator`, `product_manager`, `enquiry_manager`)
- **Type Safety:** TypeScript 5.7.3 (Strict Mode)
- **Styling:** Tailwind CSS 3.4.17 with PostCSS 8.4 and Autoprefixer 10.4
- **Component Primitives:** Headless accessible UI patterns with Lucide React icons
- **Data Validation:** Zod 3.24.2 for typed environment validation, API intake validation, and auth schemas
- **Testing:** Vitest 3.0.5, `@testing-library/react`, and JSDOM (10 test files, 29 tests passed)
- **Code Quality:** ESLint 9 Flat Config (`eslint-config-next`)

---

## Administration Portal (`/admin`)

The platform features an internal administrative console for the Bangkok trading desk:
- `/admin/login`: Accessible luxury login form with React Suspense boundary
- `/admin/dashboard`: Real-time KPIs, recent commercial enquiries, active inventory lots
- `/admin/gemstones`: Catalogue inventory table with CIBJO codes and publication status
- `/admin/gemstones/new` & `[id]`: Gemstone lot editor (`GemstoneForm`)
- `/admin/categories`: Gemstone taxonomy management
- `/admin/enquiries` & `[id]`: Commercial enquiries inbox, filtering, status advancement, and pre-filled email client reply
- `/admin/team`: Administrative personnel table and RBAC permissions matrix
- `/admin/activity`: Tamper-evident activity audit trail
- `/admin/settings`: System environmental health, Supabase connection status, and storage configuration

---

## Local Development & Setup

### Prerequisites
- Node.js `v20.x`, `v22.x`, or `v24.x` LTS
- npm `v10.x` or `v11.x`
- Docker Desktop (for optional local Supabase container stack)

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/UzairAhmad88/libragems-by-uzaii.git
cd libragems-by-uzaii

# 2. Check out working branch
git checkout phase-04/supabase-admin-foundation

# 3. Navigate to web application directory
cd apps/web

# 4. Install deterministic dependencies
npm ci

# 5. Create local environment configuration
cp .env.example .env.local

# 6. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

> [!NOTE]
> The application operates cleanly in offline / preview mode using local baseline data when cloud Supabase credentials are not connected.

---

## Quality & Verification Gates

```bash
# Run unit & integration tests (10 test files, 29 tests)
npm test --prefix apps/web

# Run TypeScript strict typecheck (0 errors)
npm run typecheck --prefix apps/web

# Run ESLint (0 warnings, 0 errors)
npm run lint --prefix apps/web

# Run production build (27 static and dynamic routes)
npm run build --prefix apps/web
```
