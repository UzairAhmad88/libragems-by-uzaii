# Technical SEO Architecture & Crawlability Framework
## Libra Gems & Trading Co., Ltd. — Phase 06 Technical Specification

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `ARCH-SEO-06-01`
- **Location:** Bangkok, Thailand
- **Production Host:** `https://libragems.net`
- **Framework:** Next.js 15.1 (App Router), React 19, TypeScript 5.7

---

## 1. Executive Summary & SEO Philosophy

Libra Gems & Trading Co., Ltd. operates as an international wholesale gemstone trading desk based in Bangkok, Thailand. The digital platform is an enquiry-led corporate portal designed for gemologists, jewelry manufacturers, retail jewelers, lapidaries, and institutional collectors. It is **not** a retail e-commerce storefront.

### The B2B SEO Imperative
Traditional consumer e-commerce SEO focuses on transactional keywords, product rating rich snippets, instant checkout schemas, and dynamic faceted navigation. Applying these patterns to an international B2B gemstone platform produces commercial misrepresentation and search-engine compliance violations:
1. **No Retail Checkout:** Gemstone parcels are traded on specific gemological attributes, lot weights, and commercial negotiations. Listing fake "$0" prices or artificial checkout buttons to trigger Google Merchant rich results violates Google Search Essentials and misleads trade buyers.
2. **Crawl Budget Protection:** Wholesale buyers require deep gemological data, CIBJO treatment disclosures, and high-resolution optical documentation. The site architecture prioritizes pristine crawl efficiency, rapid Time to First Byte (TTFB), and full server-side static rendering.
3. **Quiet Luxury Positioning:** Search snippets, meta descriptions, and social preview cards maintain an authoritative, editorial voice consistent with international gemological standards (GIA, AIGS, GIT, CIBJO).

---

## 2. Next.js 15 App Router SEO Architecture

Next.js 15 App Router provides native metadata management and streaming server-side static generation. The SEO architecture leverages these capabilities to generate deterministic, crawlable HTML at build time.

### Architectural Diagram

```
                 Incoming Search Crawler (Googlebot / Bingbot)
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │    robots.txt (/robots.ts)   │
                      │  - Allow: /                 │
                      │  - Disallow: /admin, /api   │
                      │  - Sitemap: /sitemap.xml    │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │   sitemap.xml (/sitemap.ts) │
                      │  - 8 Static Core Pages      │
                      │  - Dynamic Gemstone Lots    │
                      │  - Non-volatile Timestamps  │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │        Root Layout (/app/layout.tsx)    │
                │  - metadataBase: getSiteUrl()           │
                │  - Title Template: %s | LibraGems       │
                │  - Global Organization & WebSite JSON-LD│
                └────────────────────┬────────────────────┘
                                     │
        ┌────────────────────────────┼────────────────────────────┐
        ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Home /      │             │  Catalogue   │             │ Gemstone Lot │
│  Institutional│            │  /gemstones  │             │ /gemstones/* │
│  Pages       │             │              │             │              │
│ - Breadcrumbs│             │ - Collection │             │ - Product    │
│ - Metadata   │             │   Page Schema│             │   Schema     │
└──────────────┘             └──────────────┘             └──────────────┘
```

---

## 3. Centralized Canonical Domain Architecture (`site-url.ts`)

To eliminate duplicate content penalties caused by protocol variations (`http` vs `https`), subdomain fragmentation (`www` vs apex), or staging preview deployments, all URLs are generated through a centralized utility: `src/lib/seo/site-url.ts`.

### Canonical Resolution Flow

```typescript
// Production canonical default
const DEFAULT_PRODUCTION_URL = "https://libragems.net";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envUrl) return DEFAULT_PRODUCTION_URL;

  let cleaned = envUrl.replace(/\/+$/, "");
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }
  return cleaned;
}
```

### Trailing-Slash Normalization Protocol
Google treats `https://libragems.net/gemstones` and `https://libragems.net/gemstones/` as distinct URLs. Without consistent canonicalization, link equity divides across both variations.

**LibraGems Trailing-Slash Policy:**
- Root path retains clean domain: `https://libragems.net`
- All sub-paths strip trailing slashes: `https://libragems.net/gemstones/hessonite-garnet`
- Query strings and URL fragments are excluded from canonical targets.

```typescript
export function getCanonicalUrl(path = ""): string {
  const baseUrl = getSiteUrl();
  if (!path || path === "/" || path.trim() === "") return baseUrl;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath.length > 1 ? normalizedPath.replace(/\/+$/, "") : normalizedPath;
  return `${baseUrl}${cleanPath}`;
}
```

---

## 4. Standardized Page Metadata Engine (`metadata.ts`)

Every public page utilizes `buildPageMetadata()` to guarantee uniform Open Graph cards, Twitter metadata, search engine crawl directives, and canonical tags.

### Metadata Directives

```typescript
export function buildPageMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : getCanonicalUrl(ogImage);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Libra Gems & Trading Co., Ltd.",
      locale: "en_US",
      type: ogType,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} | LibraGems Bangkok` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
```

### Search Engine Crawl Parameters
- `"max-image-preview": "large"`: Authorizes Google to display high-resolution visual cards in Google Discover and visual search results.
- `"max-snippet": -1`: Permits Google to extract dynamic snippet lengths optimal for user queries without truncation.
- `"max-video-preview": -1`: Authorizes full animated gemstone previews in search indices.

---

## 5. Social Share & Open Graph Media Architecture

To preserve quiet luxury brand positioning across LinkedIn, WhatsApp, WeChat, and Twitter previews:
- **Default Asset:** `/images/og-default.svg` (1200 x 630 px).
- **Design System:** Deep Forest (`#103729`) background, Warm Off-White (`#FBF9F5`) typography, and Champagne Gold (`#B99B68`) gemological facet linework.
- **Micro-copy:** "B2B Gemstone Trading Desk • Bangkok, Thailand".
- **Dynamic Product Overrides:** Individual gemstone product pages reference their high-resolution studio SVG/photography asset, resolving to fully-qualified absolute HTTPS URLs.

---

## 6. Page Inventory & Indexing Matrix

| Route | Primary Keyword Focus | Canonical URL | Indexing Directive | Schema Types |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Bangkok B2B Gemstone Trading Desk | `https://libragems.net` | `index, follow` | `Organization`, `WebSite`, `BreadcrumbList` |
| `/about` | Bangkok Gemstone Exporter & Heritage | `https://libragems.net/about` | `index, follow` | `BreadcrumbList` |
| `/gemstones` | Wholesale Gemstone Lots Bangkok | `https://libragems.net/gemstones` | `index, follow` | `CollectionPage`, `BreadcrumbList` |
| `/gemstones/hessonite-garnet` | Rough Hessonite Garnet Sri Lanka Lot | `https://libragems.net/gemstones/hessonite-garnet` | `index, follow` | `Product`, `BreadcrumbList` |
| `/gemstones/turquoise` | Commercial Matrix Turquoise Rough Parcel | `https://libragems.net/gemstones/turquoise` | `index, follow` | `Product`, `BreadcrumbList` |
| `/gemstones/afghanistan-rubellite` | Afghanistan Cut Rubellite Tourmaline Parcel | `https://libragems.net/gemstones/afghanistan-rubellite` | `index, follow` | `Product`, `BreadcrumbList` |
| `/quality-sourcing` | CIBJO Ethical Sourcing Gemstone Certification | `https://libragems.net/quality-sourcing` | `index, follow` | `BreadcrumbList` |
| `/insights` | Gemological Trade Articles & Disclosures | `https://libragems.net/insights` | `index, follow` | `Article` (x3), `BreadcrumbList` |
| `/contact` | Gemstone Trading Desk Bangkok Inquiries | `https://libragems.net/contact` | `index, follow` | `BreadcrumbList` |
| `/privacy` | Corporate Data Protection Policy | `https://libragems.net/privacy` | `index, follow` | `BreadcrumbList` |
| `/terms` | B2B Gemstone Trading Terms & Conditions | `https://libragems.net/terms` | `index, follow` | `BreadcrumbList` |
| `/admin/*` | Administrative Management Console | N/A | `noindex, nofollow` | None |
| `/api/*` | Serverless Application Endpoints | N/A | `noindex, nofollow` | None |

---

## 7. Crawl Budget & Rendering Optimization

1. **Pre-rendered Static Generation (SSG):** All 11 public routes are compiled to static HTML at build time (`○ (Static)`). Search engine bots receive 100% complete HTML and inline JSON-LD scripts on initial socket connection without waiting for client-side JavaScript execution.
2. **Minimal HTML Weight:** Clean semantic markup ensures public HTML payloads average under 4.5 kB per page, yielding sub-100ms Time to First Byte (TTFB).
3. **Internal Linking Graph:** Every product page links back to `/gemstones` and contextual educational articles in `/insights`, establishing a logical topical cluster without orphaned pages.

