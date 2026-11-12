import { describe, it, expect } from "vitest";
import {
  createOrganizationSchema,
  createWebSiteSchema,
  createBreadcrumbSchema,
  createGemstoneProductSchema,
  createArticleSchema,
  createCollectionPageSchema,
} from "./json-ld";
import { getGemstoneBySlug, getAllGemstones } from "@/data/gemstones";
import { INSIGHT_ARTICLES } from "@/data/insights";

describe("Schema.org / JSON-LD Structured Data Generators", () => {
  describe("createOrganizationSchema()", () => {
    it("generates verified B2B Organization schema without unverified claims", () => {
      const schema = createOrganizationSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("Libra Gems & Trading Co., Ltd.");
      expect(schema.alternateName).toBe("LibraGems");
      expect(schema.url).toBe("https://libragems1.com");
      expect(schema.address).toEqual({
        "@type": "PostalAddress",
        streetAddress: "Charoen Krung Road, Bang Rak",
        addressLocality: "Bangkok",
        addressRegion: "Bangkok",
        postalCode: "10500",
        addressCountry: "TH",
      });
      expect(schema.contactPoint).toEqual({
        "@type": "ContactPoint",
        telephone: "+66 84 667 4833",
        email: "info@libragems1.com",
        contactType: "Trading Desk & Wholesale Inquiries",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Thai"],
      });

      expect(schema.telephone).toBe("+66 84 667 4833");
      expect((schema as Record<string, unknown>).taxID).toBeUndefined();
    });
  });

  describe("createWebSiteSchema()", () => {
    it("generates clean WebSite schema without non-functional SearchAction", () => {
      const schema = createWebSiteSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.name).toBe("LibraGems");
      expect(schema.url).toBe("https://libragems1.com");
      // SearchAction must NOT be emitted until a working search endpoint exists
      expect((schema as Record<string, unknown>).potentialAction).toBeUndefined();
    });
  });

  describe("createBreadcrumbSchema()", () => {
    it("generates sequential 1-based BreadcrumbList structured data", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Gemstone Catalogue", href: "/gemstones" },
        { label: "Rough Hessonite Garnet" },
      ];

      const schema = createBreadcrumbSchema(items);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);

      expect(schema.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://libragems1.com",
      });

      expect(schema.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Gemstone Catalogue",
        item: "https://libragems1.com/gemstones",
      });

      expect(schema.itemListElement[2]).toEqual({
        "@type": "ListItem",
        position: 3,
        name: "Rough Hessonite Garnet",
      });
    });
  });

  describe("createGemstoneProductSchema()", () => {
    it("generates valid B2B Product schema with gemological properties and NO fake offers", () => {
      const garnet = getGemstoneBySlug("hessonite-garnet");
      expect(garnet).toBeDefined();

      if (!garnet) return;

      const schema = createGemstoneProductSchema(garnet);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Product");
      expect(schema.name).toBe(garnet.name);
      expect(schema.sku).toBe(garnet.lotReference);
      expect(schema.category).toBe(garnet.form);
      expect(schema.url).toBe("https://libragems1.com/gemstones/hessonite-garnet");
      expect(schema.brand).toEqual({
        "@type": "Brand",
        name: "Libra Gems & Trading Co., Ltd.",
      });

      // Verify physical gemological properties in additionalProperty
      const properties = schema.additionalProperty;
      expect(properties).toEqual(
        expect.arrayContaining([
          { "@type": "PropertyValue", name: "Species", value: garnet.species },
          { "@type": "PropertyValue", name: "Hardness", value: garnet.hardness },
          { "@type": "PropertyValue", name: "CIBJO Treatment Code", value: garnet.treatment.cibjoCode },
          { "@type": "PropertyValue", name: "Trading Model", value: "Wholesale B2B / Price on Application" },
        ])
      );

      // Verify legitimate B2B Wholesale quotation offer
      expect(schema.offers).toBeDefined();
      expect(schema.offers?.availability).toBe("https://schema.org/InStock");
      expect((schema as Record<string, unknown>).aggregateRating).toBeUndefined();
    });

    it("includes refractiveIndex when present in gemstone specifications", () => {
      const rubellite = getGemstoneBySlug("afghanistan-rubellite");
      expect(rubellite).toBeDefined();
      if (!rubellite) return;

      const schema = createGemstoneProductSchema(rubellite);
      const riProperty = schema.additionalProperty.find(
        (p) => p.name === "Refractive Index"
      );
      expect(riProperty).toBeDefined();
      expect(riProperty?.value).toBe(rubellite.refractiveIndex);
    });
  });

  describe("createArticleSchema()", () => {
    it("generates valid Article schema for insight educational articles", () => {
      const article = INSIGHT_ARTICLES[0];
      expect(article).toBeDefined();

      const schema = createArticleSchema(article);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Article");
      expect(schema.headline).toBe(article.title);
      expect(schema.description).toBe(article.excerpt);
      expect(schema.url).toBe(`https://libragems1.com/insights/${article.slug}`);
      expect(schema.author).toEqual({
        "@type": "Organization",
        name: "Libra Gems Gemological Trading Desk",
        url: "https://libragems1.com",
      });
      expect(schema.publisher).toEqual({
        "@type": "Organization",
        name: "Libra Gems & Trading Co., Ltd.",
        url: "https://libragems1.com",
        logo: {
          "@type": "ImageObject",
          url: "https://libragems1.com/icon.svg",
        },
      });
    });
  });

  describe("createCollectionPageSchema()", () => {
    it("generates CollectionPage schema with all active catalogue lots", () => {
      const gems = getAllGemstones();
      const schema = createCollectionPageSchema(gems);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("CollectionPage");
      expect(schema.url).toBe("https://libragems1.com/gemstones");
      expect(schema.mainEntity["@type"]).toBe("ItemList");
      expect(schema.mainEntity.itemListElement).toHaveLength(gems.length);
      expect(schema.mainEntity.itemListElement[0].url).toBe(
        `https://libragems1.com/gemstones/${gems[0].slug}`
      );
    });
  });
});

