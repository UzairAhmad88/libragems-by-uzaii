import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getAllGemstones } from "@/data/gemstones";

/**
 * Dynamic XML Sitemap Generation for LibraGems
 * Conforms to Google Search Central sitemap protocol.
 * Dynamically queries published gemstone catalogue entries and educational insights.
 * Uses stable, non-volatile modification timestamps rather than current execution time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const publishedGemstones = getAllGemstones();

  // Baseline stable dates for static sections
  const coreReleaseDate = new Date("2026-11-10T00:00:00.000Z");
  const institutionalDate = new Date("2026-11-07T00:00:00.000Z");
  const legalDate = new Date("2026-10-15T00:00:00.000Z");
  const catalogueLotDate = new Date("2026-11-08T00:00:00.000Z");

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl("/"),
      lastModified: coreReleaseDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: getCanonicalUrl("/gemstones"),
      lastModified: coreReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/quality-sourcing"),
      lastModified: institutionalDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/insights"),
      lastModified: coreReleaseDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/about"),
      lastModified: institutionalDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getCanonicalUrl("/contact"),
      lastModified: institutionalDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getCanonicalUrl("/privacy"),
      lastModified: legalDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: getCanonicalUrl("/terms"),
      lastModified: legalDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic published gemstone lot entries
  const gemstoneEntries: MetadataRoute.Sitemap = publishedGemstones.map((gem) => ({
    url: getCanonicalUrl(`/gemstones/${gem.slug}`),
    lastModified: catalogueLotDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...gemstoneEntries];
}
