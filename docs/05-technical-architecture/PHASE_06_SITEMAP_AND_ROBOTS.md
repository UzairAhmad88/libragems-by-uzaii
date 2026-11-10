# Dynamic XML Sitemap & Robots.txt Architecture
## Libra Gems & Trading Co., Ltd. — Phase 06 Technical Specification

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `ARCH-CRAWL-06-03`
- **Location:** Bangkok, Thailand
- **Sitemap Route:** `https://libragems.net/sitemap.xml`
- **Robots Route:** `https://libragems.net/robots.txt`

---

## 1. Crawl Architecture & Discovery Overview

Googlebot and other compliant search engines use `robots.txt` as the first point of contact to determine crawling boundaries, followed by `sitemap.xml` to discover the complete inventory of indexable canonical URLs.

In high-value B2B platforms, maintaining an accurate sitemap and strict crawling boundaries prevents two common failure modes:
1. **Index Bloat:** Internal administrative dashboards, authentication portals, and JSON API routes entering the public Google index.
2. **Crawl Budget Exhaustion:** Falsified or volatile `lastModified` timestamps causing Googlebot to repeatedly re-crawl unchanged pages while deprioritizing newly published inventory.

---

## 2. Dynamic XML Sitemap Engine (`src/app/sitemap.ts`)

Next.js App Router provides native metadata route generation via `sitemap.ts`. The implementation dynamically merges core static platform routes with published gemstone lots from the verified inventory data store.

### Code Implementation Architecture

```typescript
import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getAllGemstones } from "@/data/gemstones";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedGemstones = getAllGemstones();

  // Baseline stable dates for static sections (ISO 8601 UTC)
  const coreReleaseDate = new Date("2026-11-10T00:00:00.000Z");
  const institutionalDate = new Date("2026-11-07T00:00:00.000Z");
  const legalDate = new Date("2026-10-15T00:00:00.000Z");
  const catalogueLotDate = new Date("2026-11-08T00:00:00.000Z");

  const staticEntries: MetadataRoute.Sitemap = [
    { url: getCanonicalUrl("/"), lastModified: coreReleaseDate, changeFrequency: "weekly", priority: 1.0 },
    { url: getCanonicalUrl("/gemstones"), lastModified: coreReleaseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: getCanonicalUrl("/quality-sourcing"), lastModified: institutionalDate, changeFrequency: "monthly", priority: 0.8 },
    { url: getCanonicalUrl("/insights"), lastModified: coreReleaseDate, changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl("/about"), lastModified: institutionalDate, changeFrequency: "monthly", priority: 0.7 },
    { url: getCanonicalUrl("/contact"), lastModified: institutionalDate, changeFrequency: "monthly", priority: 0.7 },
    { url: getCanonicalUrl("/privacy"), lastModified: legalDate, changeFrequency: "yearly", priority: 0.3 },
    { url: getCanonicalUrl("/terms"), lastModified: legalDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  const gemstoneEntries: MetadataRoute.Sitemap = publishedGemstones.map((gem) => ({
    url: getCanonicalUrl(`/gemstones/${gem.slug}`),
    lastModified: catalogueLotDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...gemstoneEntries];
}
```

---

## 3. The `lastModified` Protocol & Google Search Central Compliance

### The Danger of Volatile Timestamps (`new Date()`)
A common anti-pattern in dynamic Next.js sitemaps is executing `lastModified: new Date()` on every request or static build. 

According to Google Search Central's official sitemap documentation:
> *"Do not update the lastmod time to the current time if the page has not actually changed. Search engines quickly identify and disregard deceptive or automated lastmod tags, which can cause Googlebot to ignore your sitemap timestamps altogether."*

### LibraGems Timestamp Strategy
- **Stable Versioned Dates:** Each content category possesses a deterministic UTC timestamp reflecting its true editorial update date.
- **Dynamic Lot Timestamps:** In production, as new gemstone lots are published or modified via Supabase, their `updated_at` column is queried directly to populate `lastModified`.
- **Preserved Crawl Equity:** Search engine crawlers can rely on HTTP `304 Not Modified` and accurate XML sitemap dates to schedule recrawls only when inventory changes.

---

## 4. Robots.txt Crawler Control (`src/app/robots.ts`)

The robots configuration governs search bot crawling permissions across the entire domain.

### Implementation

```typescript
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### Crawl Directives Analysis
1. `userAgent: "*"` and `userAgent: "Googlebot"`: Explicit rules provided for all conforming search engines and Googlebot specifically.
2. `allow: "/"`: Permits recursive crawling of all public marketing, catalogue, and editorial routes.
3. `disallow: ["/admin", "/admin/*", "/api", "/api/*"]`:
   - Shields the administration dashboard, internal communications log, outbox manager, and authentication views.
   - Prevents bots from triggering serverless API endpoints (`/api/enquiries`, `/api/webhooks/*`, `/api/cron/*`).
4. `sitemap: "https://libragems.net/sitemap.xml"`: Provides crawlers an absolute canonical link to the sitemap index.

---

## 5. Security & Isolation Verification

| URL Pattern | Expected Status | Robots Directive | Sitemap Inclusion |
| :--- | :--- | :--- | :--- |
| `https://libragems.net/` | 200 OK | Allowed | Included (`priority: 1.0`) |
| `https://libragems.net/gemstones` | 200 OK | Allowed | Included (`priority: 0.9`) |
| `https://libragems.net/gemstones/hessonite-garnet` | 200 OK | Allowed | Included (`priority: 0.9`) |
| `https://libragems.net/insights` | 200 OK | Allowed | Included (`priority: 0.8`) |
| `https://libragems.net/admin` | 307 / 401 | Disallowed | Strictly Excluded |
| `https://libragems.net/admin/enquiries` | 307 / 401 | Disallowed | Strictly Excluded |
| `https://libragems.net/api/enquiries` | 405 Method Not Allowed | Disallowed | Strictly Excluded |
| `https://libragems.net/api/cron/process-outbox` | 401 Unauthorized | Disallowed | Strictly Excluded |

---

## 6. Automated Unit & Integration Testing

The robots and sitemap generators are covered by automated unit test suites (`src/app/sitemap.test.ts` and `src/app/robots.test.ts`):
- Verifies that all 8 static pages and dynamic gemstone lots are present in the sitemap.
- Verifies that every sitemap URL resolves with HTTPS and the canonical domain.
- Guarantees zero `/admin` or `/api` routes are emitted in sitemaps.
- Validates that `lastModified` is a valid `Date` object and non-volatile across invocations.
- Asserts that `robots.txt` disallows all administrative and API routes while pointing to the canonical XML sitemap.

