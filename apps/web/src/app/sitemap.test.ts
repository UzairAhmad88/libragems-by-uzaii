import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getAllGemstones } from "@/data/gemstones";

describe("Dynamic XML Sitemap Generator", () => {
  it("generates complete sitemap entries covering all public static and dynamic lot routes", () => {
    const entries = sitemap();
    const publishedGemstones = getAllGemstones();

    // Verify static routes
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://libragems.net");
    expect(urls).toContain("https://libragems.net/gemstones");
    expect(urls).toContain("https://libragems.net/quality-sourcing");
    expect(urls).toContain("https://libragems.net/insights");
    expect(urls).toContain("https://libragems.net/about");
    expect(urls).toContain("https://libragems.net/contact");
    expect(urls).toContain("https://libragems.net/privacy");
    expect(urls).toContain("https://libragems.net/terms");

    // Verify each gemstone slug is indexed
    publishedGemstones.forEach((gem) => {
      expect(urls).toContain(`https://libragems.net/gemstones/${gem.slug}`);
    });

    // Total should equal 8 static pages + dynamic gemstone count
    expect(entries.length).toBe(8 + publishedGemstones.length);
  });

  it("assigns stable, non-volatile modification dates", () => {
    const entries = sitemap();

    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(isNaN((entry.lastModified as Date).getTime())).toBe(false);
    });

    // Home page should have the stable core release date
    const homeEntry = entries.find((e) => e.url === "https://libragems.net");
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

