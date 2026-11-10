# Technical SEO Audit Runbook & Pre-Deployment Checklist
## Libra Gems & Trading Co., Ltd. — Operational Runbook

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `OPS-AUDIT-07-06`
- **Location:** Bangkok, Thailand
- **Audience:** DevOps Engineers, Quality Assurance Specialists, Technical SEO Leads

---

## 1. Audit Schedule & Trigger Events

This runbook must be executed:
1. **Pre-Deployment:** Before releasing any major Next.js code change or content restructuring to production.
2. **Post-Deployment (Within 24 Hours):** Live verification on `https://libragems.net`.
3. **Monthly Maintenance:** Automated check of Google Search Console coverage and sitemap status.

---

## 2. Phase 1: Local Quality Gates (Pre-Commit / CI)

Execute in `apps/web`:

```bash
# 1. Automated SEO & Component Test Suite
npm test -- --run

# 2. Strict TypeScript Typecheck
npm run typecheck

# 3. Next.js ESLint Syntax & Semantic Rules
npm run lint

# 4. Production Static Generation Build
npm run build
```

**Pass Criteria:**
- All 20 test files pass (100% test pass rate).
- Zero TypeScript compiler errors (`tsc --noEmit`).
- Zero ESLint warnings or errors.
- Build successfully compiles static pages for all 11 public routes, `robots.txt`, and `sitemap.xml`.

---

## 3. Phase 2: Metadata & Canonical URL Audit

Inspect the rendered HTML of all 11 public pages:

### Checklist
- [ ] **Canonical URL:**
  - Matches `https://libragems.net` prefix.
  - Exactly one `<link rel="canonical" href="...">` tag per page.
  - Strips trailing slash on all subpages (e.g., `.../gemstones`, not `.../gemstones/`).
- [ ] **Title Tag:**
  - Length is between 40 and 60 characters.
  - Ends with `| LibraGems`.
  - Is 100% unique across all 11 pages.
- [ ] **Meta Description:**
  - Length is between 140 and 160 characters.
  - Includes B2B gemstone intent and Bangkok reference.
- [ ] **Open Graph & Twitter Cards:**
  - `<meta property="og:title" ...>` and `<meta property="og:description" ...>` present.
  - `<meta property="og:image" ...>` points to absolute HTTPS URL (1200x630).
  - `<meta name="twitter:card" content="summary_large_image" />` present.
- [ ] **Googlebot Directives:**
  - Indexable pages contain `"max-image-preview:large"`, `"max-snippet:-1"`, `"max-video-preview:-1"`.
  - Admin/API routes contain `noindex, nofollow`.

---

## 4. Phase 3: Structured Data (Schema.org) Audit

For each page type, copy the rendered HTML into the [Schema Markup Validator](https://validator.schema.org/):

| Page | Required Schema Types | Strict Negative Assertions |
| :--- | :--- | :--- |
| `/` | `Organization`, `WebSite`, `BreadcrumbList` | No fake street address, no phone, no SearchAction |
| `/gemstones` | `CollectionPage` (`ItemList`), `BreadcrumbList` | No missing lot URLs |
| `/gemstones/*` | `Product`, `BreadcrumbList` | **NO `price: "0"`**, no fake ratings, no consumer returns |
| `/insights` | `Article` (x3), `BreadcrumbList` | No missing author or publisher image |
| All other pages | `BreadcrumbList` | Sequential 1-based positions, valid URLs |

---

## 5. Phase 4: Sitemaps & Crawler Directives Audit

### 5.1 Robots.txt Check
Fetch `https://libragems.net/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api
Disallow: /api/*

User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api
Disallow: /api/*

Sitemap: https://libragems.net/sitemap.xml
```

### 5.2 Dynamic Sitemap Check
Fetch `https://libragems.net/sitemap.xml`:
- [ ] Returns HTTP `200 OK` with Content-Type `application/xml` or `text/xml`.
- [ ] Contains all 8 static pages and all dynamic published gemstone lot URLs.
- [ ] Contains zero `/admin/*` and zero `/api/*` URLs.
- [ ] Every `<lastmod>` tag contains a valid, stable ISO 8601 UTC timestamp.
- [ ] `<priority>` values are properly normalized between 0.3 and 1.0.

---

## 6. Phase 5: Performance & Core Web Vitals Audit

Run Google Lighthouse on `/`, `/gemstones`, and individual product pages:

| Metric | Target Threshold | Critical Failure Threshold |
| :--- | :--- | :--- |
| **SEO Score** | ≥ 95 | < 90 |
| **Accessibility Score** | ≥ 95 | < 90 |
| **Largest Contentful Paint (LCP)** | < 2.5s | > 4.0s |
| **Interaction to Next Paint (INP)** | < 200ms | > 500ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 | > 0.25 |
| **Time to First Byte (TTFB)** | < 200ms | > 600ms |

---

## 7. Emergency Incident Response

### Incident: Accidental De-Indexing (`noindex` leaked to production)
1. **Diagnosis:** GSC reports "Excluded by 'noindex' tag" on public routes.
2. **Fix:** Verify `src/lib/seo/metadata.ts` default options (`noIndex: false`). Confirm that `NEXT_PUBLIC_SITE_URL` does not inadvertently trigger staging `noIndex` flags.
3. **Recovery:** Deploy hotfix, verify live HTML `<meta name="robots">`, and submit priority URL re-crawl in Google Search Console URL Inspection Tool.

### Incident: Google Search Console Reports Schema Error
1. **Diagnosis:** Warning: "Missing field 'price' or 'offers' (in 'Product')".
2. **Analysis:** Review whether Google is treating the page as a consumer Merchant Center listing or a generic Schema.org Product.
3. **Action:** Confirm that no fake offer fields were accidentally injected. Schema.org allows `Product` without `Offer` for catalog items. Verify that physical properties (`additionalProperty`) are properly recognized.

