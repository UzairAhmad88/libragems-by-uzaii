import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getAllGemstones } from "@/data/gemstones";
import { getAllInsights } from "@/data/insights";

describe("Dynamic XML Sitemap Generator", () => {
  it("generates complete sitemap entries covering all public static, lot, and insight routes", () => {
    const entries = sitemap();
    const publishedGemstones = getAllGemstones();
    const publishedInsights = getAllInsights();

    // Verify static routes
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://libragems1.com");
    expect(urls).toContain("https://libragems1.com/gemstones");
    expect(urls).toContain("https://libragems1.com/quality-sourcing");
    expect(urls).toContain("https://libragems1.com/insights");
    expect(urls).toContain("https://libragems1.com/about");
    expect(urls).toContain("https://libragems1.com/contact");
    expect(urls).toContain("https://libragems1.com/privacy");
    expect(urls).toContain("https://libragems1.com/terms");

    // Verify each gemstone slug is indexed
    publishedGemstones.forEach((gem) => {
      expect(urls).toContain(`https://libragems1.com/gemstones/${gem.slug}`);
    });

    // Verify each educational insight article is indexed
    publishedInsights.forEach((article) => {
      expect(urls).toContain(`https://libragems1.com/insights/${article.slug}`);
    });

    // Total should equal 8 static pages + dynamic gemstone count + dynamic insights count
    expect(entries.length).toBe(8 + publishedGemstones.length + publishedInsights.length);
  });

  it("assigns stable, non-volatile modification dates", () => {
    const entries = sitemap();

    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(isNaN((entry.lastModified as Date).getTime())).toBe(false);
    });

    // Home page should have the stable core release date
    const homeEntry = entries.find((e) => e.url === "https://libragems1.com");
    expect(homeEntry?.lastModified).toEqual(new Date("2026-11-10T00:00:00.000Z"));
  });

  it("never includes private admin or api endpoints in public sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    const hasPrivateRoutes = urls.some(
      (url) => url.includes("/admin") || url.includes("/api")
    );
    expect(hasPrivateRoutes).toBe(false);
  });

  it("configures valid change frequencies and normalized priorities", () => {
    const entries = sitemap();

    entries.forEach((entry) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0.1);
      expect(entry.priority).toBeLessThanOrEqual(1.0);
      expect(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]).toContain(
        entry.changeFrequency
      );
    });
  });
});

