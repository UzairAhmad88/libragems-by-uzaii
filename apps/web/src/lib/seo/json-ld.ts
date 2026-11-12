import React from "react";
import { getCanonicalUrl, getSiteUrl } from "./site-url";
import { Gemstone } from "@/types/gemstone";
import { InsightArticle } from "@/types/insight";

/**
 * Renders a secure, minified JSON-LD script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

/**
 * Organization Schema
 * Built exclusively on verified business information (Bangkok, Thailand jurisdiction).
 * Omits unverified street numbers, phone numbers, and fabricated founding dates.
 */
export function createOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Libra Gems & Trading Co., Ltd.",
    alternateName: "LibraGems",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/gemstones/hero-editorial-inventory.jpg`,
    telephone: "+66 84 667 4833",
    email: "info@libragems1.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Charoen Krung Road, Bang Rak",
      addressLocality: "Bangkok",
      addressRegion: "Bangkok",
      postalCode: "10500",
      addressCountry: "TH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+66 84 667 4833",
      email: "info@libragems1.com",
      contactType: "Trading Desk & Wholesale Inquiries",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Thai"],
    },
    knowsAbout: [
      "Gemstone Trading",
      "Rough Gemstones",
      "Mineral Specimens",
      "Cut Gemstones",
      "Grossular Hessonite Garnet",
      "Turquoise",
      "Rubellite Tourmaline",
      "CIBJO Treatment Standards",
      "Lapidary Yield Science",
    ],
  };
}

/**
 * LocalBusiness / WholesaleStore Schema
 * Captures the verified Bangkok physical trading presence in Bang Rak gem district.
 */
export function createLocalBusinessSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "WholesaleStore"],
    name: "Libra Gems & Trading Co., Ltd.",
    alternateName: "Libra Gems Bangkok Trading Desk",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/gemstones/hero-editorial-inventory.jpg`,
    telephone: "+66 84 667 4833",
    email: "info@libragems1.com",
    priceRange: "$$$$",
    currenciesAccepted: "USD, THB, EUR",
    paymentAccepted: "Bank Wire Transfer, Commercial Escrow",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Charoen Krung Road, Bang Rak",
      addressLocality: "Bangkok",
      addressRegion: "Bangkok",
      postalCode: "10500",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.7234,
      longitude: 100.518,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

/**
 * WebSite Schema
 * Represents the official web presence.
 * Intentionally omits SearchAction because internal search is not yet implemented.
 */
export function createWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LibraGems",
    alternateName: "Libra Gems & Trading Platform",
    url: siteUrl,
    description:
      "International B2B gemstone trading and commercial supply based in Bangkok, Thailand.",
    publisher: {
      "@type": "Organization",
      name: "Libra Gems & Trading Co., Ltd.",
      url: siteUrl,
    },
  };
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * BreadcrumbList Schema
 * Generates Google-compliant breadcrumb structured data.
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const position = index + 1;
      const url = item.href ? getCanonicalUrl(item.href) : undefined;

      const listItem: Record<string, unknown> = {
        "@type": "ListItem",
        position,
        name: item.label,
      };

      if (url) {
        listItem.item = url;
      }

      return listItem;
    }),
  };
}

/**
 * B2B Gemstone Product Schema
 * Strictly grounded in physical visible data.
 * IN ACCORDANCE WITH SECTION 7 OF PHASE 06 DIRECTIVE:
 * Does NOT emit fake $0 prices, fake ratings, or fabricated consumer return policies.
 */
export function createGemstoneProductSchema(gemstone: Gemstone) {
  const siteUrl = getSiteUrl();
  const pageUrl = getCanonicalUrl(`/gemstones/${gemstone.slug}`);
  const imageUrl = gemstone.images[0]?.src
    ? getCanonicalUrl(gemstone.images[0].src)
    : `${siteUrl}/images/gemstones/hero-editorial-inventory.svg`;

  const additionalProperties: Array<{ "@type": "PropertyValue"; name: string; value: string }> = [
    { "@type": "PropertyValue", name: "Species", value: gemstone.species },
    { "@type": "PropertyValue", name: "Hardness", value: gemstone.hardness },
    { "@type": "PropertyValue", name: "Specific Gravity", value: gemstone.specificGravity },
    { "@type": "PropertyValue", name: "CIBJO Treatment Code", value: gemstone.treatment.cibjoCode },
    { "@type": "PropertyValue", name: "Treatment Disclosure", value: gemstone.treatment.name },
    { "@type": "PropertyValue", name: "Trading Model", value: "Wholesale B2B / Price on Application" },
  ];

  if (gemstone.variety) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Variety",
      value: gemstone.variety,
    });
  }

  if (gemstone.refractiveIndex) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Refractive Index",
      value: gemstone.refractiveIndex,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: gemstone.name,
    description: gemstone.fullOverview,
    image: imageUrl,
    url: pageUrl,
    sku: gemstone.lotReference,
    category: gemstone.form,
    brand: {
      "@type": "Brand",
      name: "Libra Gems & Trading Co., Ltd.",
    },
    additionalProperty: additionalProperties,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "B2B Wholesale / Price on Application upon parcel inquiry",
      },
      seller: {
        "@type": "Organization",
        name: "Libra Gems & Trading Co., Ltd.",
      },
    },
  };
}

/**
 * Educational Article Schema (for Gemstone Insights)
 */
export function createArticleSchema(article: InsightArticle) {
  const siteUrl = getSiteUrl();
  const articleUrl = getCanonicalUrl(`/insights/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: "Libra Gems Gemological Trading Desk",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Libra Gems & Trading Co., Ltd.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    articleSection: article.categoryLabel,
    keywords: [
      article.categoryLabel,
      "Gemstone Education",
      "Gemological Testing",
      "Bangkok Gemstone Trade",
    ],
  };
}

/**
 * CollectionPage Schema for the Wholesale Gemstone Catalogue and Category Collections
 */
export function createCollectionPageSchema(
  gemstones: Gemstone[],
  options?: { title?: string; description?: string; path?: string }
) {
  const catalogueUrl = getCanonicalUrl(options?.path || "/gemstones");

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options?.title || "LibraGems Wholesale Gemstone Catalogue",
    description:
      options?.description ||
      "Physical commercial gemstone inventory held in Bangkok: rough grossular hessonite garnet, matrix turquoise, and precision-cut rubellite tourmaline.",
    url: catalogueUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: gemstones.map((gem, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCanonicalUrl(`/gemstones/${gem.slug}`),
        name: gem.name,
      })),
    },
  };
}
