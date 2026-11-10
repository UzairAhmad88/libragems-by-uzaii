# Structured Data & Schema.org Implementation Reference
## Libra Gems & Trading Co., Ltd. — Phase 06 Technical Specification

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `REF-SCHEMA-06-02`
- **Location:** Bangkok, Thailand
- **Schema Format:** JSON-LD (`application/ld+json`)
- **Specification Authority:** Schema.org Core Vocabulary & Google Search Central Documentation

---

## 1. Structured Data Philosophy for High-Value B2B Commerce

Search engines utilize Schema.org structured data to disambiguate corporate entities, understand product catalogs, parse editorial knowledge, and generate enriched search presentations. 

However, standard consumer e-commerce patterns assume an immediate "Add to Cart" workflow with fixed consumer pricing, automated parcel shipping, and return policies. In wholesale colored gemstone trading, lots are evaluated based on mineralogical purity, cutting yield, parcel uniformity, and bespoke international wire/escrow terms.

### The B2B Compliance Policy
To preserve search engine trust and adhere strictly to Google's Search Essentials and Merchant guidelines:
1. **Zero Fabricated Prices:** We never emit `price: "0"` or `price: "0.00"`. Emitting free or zero pricing for high-value mineral specimens triggers Google Merchant misrepresentation flags and misleads trade buyers.
2. **Zero Fabricated Reviews:** We never generate synthetic `AggregateRating` or `Review` objects. In B2B gemstone trading, reviews are bilateral commercial references, not consumer star ratings.
3. **Zero Fabricated Shipping / Returns:** We do not attach consumer `shippingDetails` or retail `hasMerchantReturnPolicy` schemas to wholesale parcels traded under international Incoterms (e.g., FOB Bangkok, CIF Geneva).
4. **Rich Physical & Mineralogical Grounding:** Gemstone lots are semantically enriched through Schema.org `additionalProperty` objects (`PropertyValue`), recording exact gemological properties verified by laboratory testing.

---

## 2. Schema Architecture & Module Overview

All structured data is generated deterministically via `src/lib/seo/json-ld.ts` and rendered into the DOM via the `<JsonLd />` component:

```typescript
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}
```

---

## 3. Schema Type Implementations

### 3.1 Organization Schema (`createOrganizationSchema`)
- **Target Page:** Root Layout (`/`) — rendered globally in `<head>`
- **Purpose:** Identifies the corporate trading entity, registered office jurisdiction, and verified communication channels.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Libra Gems & Trading Co., Ltd.",
  "alternateName": "LibraGems",
  "url": "https://libragems.net",
  "logo": "https://libragems.net/images/gemstones/hero-editorial-inventory.svg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangkok",
    "addressRegion": "Bangkok",
    "addressCountry": "TH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@libragems.net",
    "contactType": "Trading Desk & Wholesale Inquiries",
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "Thai"]
  },
  "knowsAbout": [
    "Gemstone Trading",
    "Rough Gemstones",
    "Mineral Specimens",
    "Cut Gemstones",
    "Grossular Hessonite Garnet",
    "Turquoise",
    "Rubellite Tourmaline",
    "CIBJO Treatment Standards",
    "Lapidary Yield Science"
  ]
}
```
*Verification Note:* Omitted unverified street numbers, unconfirmed phone lines, and fabricated incorporation dates. Address is strictly grounded in the Bangkok corporate jurisdiction.

---

### 3.2 WebSite Schema (`createWebSiteSchema`)
- **Target Page:** Root Layout (`/`) — rendered globally in `<head>`
- **Purpose:** Declares the canonical web property and editorial publisher.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LibraGems",
  "alternateName": "Libra Gems & Trading Platform",
  "url": "https://libragems.net",
  "description": "International B2B gemstone trading and commercial supply based in Bangkok, Thailand.",
  "publisher": {
    "@type": "Organization",
    "name": "Libra Gems & Trading Co., Ltd.",
    "url": "https://libragems.net"
  }
}
```
*Architectural Decision:* `potentialAction` (`SearchAction`) is intentionally omitted. Declaring a search action when an application lacks an indexed query endpoint (e.g. `?q={search_term_string}`) generates Google Search Console warnings.

---

### 3.3 BreadcrumbList Schema (`createBreadcrumbSchema`)
- **Target Pages:** All 11 public pages.
- **Purpose:** Informs Google's crawling engine of site hierarchy and generates breadcrumb trails in search snippets.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://libragems.net"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Gemstone Catalogue",
      "item": "https://libragems.net/gemstones"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Commercial-Quality Rough Stone Hessonite Garnet"
    }
  ]
}
```
*Compliance Note:* Positions are strictly 1-indexed. The terminal node (the current page) includes `name` while omitting `item` or referencing its own canonical URL, adhering to Google Search Central guidelines.

---

### 3.4 B2B Gemstone Product Schema (`createGemstoneProductSchema`)
- **Target Pages:** `/gemstones/hessonite-garnet`, `/gemstones/turquoise`, `/gemstones/afghanistan-rubellite`
- **Purpose:** Models individual wholesale gemstone parcels with mineralogical data.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Commercial-Quality Rough Hessonite Garnet",
  "description": "Commercial parcel of rough grossular hessonite garnet suited for calibrated cabochon cutting, bead manufacturing, and lapidary yield...",
  "image": "https://libragems.net/images/gemstones/hero-editorial-inventory.svg",
  "url": "https://libragems.net/gemstones/hessonite-garnet",
  "sku": "LG-HG-001",
  "category": "Rough Parcel",
  "brand": {
    "@type": "Brand",
    "name": "Libra Gems & Trading Co., Ltd."
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Species",
      "value": "Grossular Garnet"
    },
    {
      "@type": "PropertyValue",
      "name": "Hardness",
      "value": "7.0 – 7.5 Mohs"
    },
    {
      "@type": "PropertyValue",
      "name": "Specific Gravity",
      "value": "3.59 – 3.63"
    },
    {
      "@type": "PropertyValue",
      "name": "CIBJO Treatment Code",
      "value": "N"
    },
    {
      "@type": "PropertyValue",
      "name": "Treatment Disclosure",
      "value": "Natural Untreated"
    },
    {
      "@type": "PropertyValue",
      "name": "Trading Model",
      "value": "Wholesale B2B / Price on Application"
    },
    {
      "@type": "PropertyValue",
      "name": "Variety",
      "value": "Hessonite Garnet"
    },
    {
      "@type": "PropertyValue",
      "name": "Refractive Index",
      "value": "1.734 – 1.748 (Singly Refractive)"
    }
  ]
}
```
*B2B Gemological Properties:*
- `Species`: Primary mineral species (e.g., Grossular Garnet, Tourmaline, Phosphate Mineral).
- `Variety`: Commercial mineralogical variety (e.g., Hessonite, Rubellite).
- `Hardness`: Mohs scale mineral hardness range.
- `Specific Gravity`: Hydrostatic density measurement.
- `Refractive Index`: Optical refraction range.
- `CIBJO Treatment Code`: Standardized international disclosure code (Code N, Code E, Code T).
- `Trading Model`: Explicitly declared as `Wholesale B2B / Price on Application`.

---

### 3.5 Educational Article Schema (`createArticleSchema`)
- **Target Page:** `/insights`
- **Purpose:** Positions LibraGems as an authoritative gemological knowledge source and provides semantic grounding for industry articles.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding Gemstone Treatments: The CIBJO Disclosure Framework",
  "description": "A commercial guide to differentiating natural untreated stones, routine enhancements, and significant treatments.",
  "url": "https://libragems.net/insights",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://libragems.net/insights"
  },
  "author": {
    "@type": "Organization",
    "name": "Libra Gems Gemological Trading Desk",
    "url": "https://libragems.net"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Libra Gems & Trading Co., Ltd.",
    "url": "https://libragems.net",
    "logo": {
      "@type": "ImageObject",
      "url": "https://libragems.net/images/gemstones/hero-editorial-inventory.svg"
    }
  },
  "articleSection": "Treatment Disclosure",
  "keywords": [
    "Treatment Disclosure",
    "Gemstone Education",
    "Gemological Testing",
    "Bangkok Gemstone Trade"
  ]
}
```

---

### 3.6 CollectionPage Schema (`createCollectionPageSchema`)
- **Target Page:** `/gemstones`
- **Purpose:** Encapsulates the entire wholesale gemstone catalogue into an `ItemList` with canonical deep links.

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "LibraGems Wholesale Gemstone Catalogue",
  "description": "Physical commercial gemstone inventory held in Bangkok: rough grossular hessonite garnet, matrix turquoise, and precision-cut rubellite tourmaline.",
  "url": "https://libragems.net/gemstones",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://libragems.net/gemstones/hessonite-garnet",
        "name": "Commercial-Quality Rough Hessonite Garnet"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://libragems.net/gemstones/turquoise",
        "name": "Commercial-Quality Turquoise"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://libragems.net/gemstones/afghanistan-rubellite",
        "name": "Afghanistan Cut-Stone Rubellite"
      }
    ]
  }
}
```

---

## 4. Testing & Validation Protocol

Before any production deployment or Search Console submission, validate structured data across two independent testing utilities:

1. **Schema Markup Validator (Schema.org):**
   - URL: `https://validator.schema.org/`
   - Paste the rendered HTML from Next.js build or test via staging URL.
   - Verify: 0 Errors, 0 Warnings across `Organization`, `WebSite`, `Product`, `BreadcrumbList`, and `Article`.
2. **Google Rich Results Test:**
   - URL: `https://search.google.com/test/rich-results`
   - Test `/`, `/gemstones`, `/gemstones/*`, and `/insights`.
   - Confirm valid detection of Breadcrumbs and Articles. Note that Google's Product Rich Snippet badge requires merchant pricing which is intentionally omitted for B2B compliance.

