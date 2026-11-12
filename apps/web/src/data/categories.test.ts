import { describe, it, expect } from "vitest";
import { CATALOG_CATEGORIES, getCategoryBySlug, getAllCategories } from "./categories";
import { getFacetedSingleStones, getGemstoneLots } from "./gemstones";

describe("Catalog Categories Dataset", () => {
  it("contains both flagship categories: Faceted Single Stones and Gemstone Lots", () => {
    expect(CATALOG_CATEGORIES).toHaveLength(2);
    const categories = getAllCategories();
    expect(categories).toHaveLength(2);

    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain("faceted-single-stones");
    expect(slugs).toContain("gemstone-lots");
  });

  it("retrieves category definition by slug correctly", () => {
    const single = getCategoryBySlug("faceted-single-stones");
    expect(single).toBeDefined();
    expect(single?.name).toBe("Faceted Single Stones");
    expect(single?.badge).toBe("Individual Viewing & Memo");

    const lots = getCategoryBySlug("gemstone-lots");
    expect(lots).toBeDefined();
    expect(lots?.name).toBe("Gemstone Lots");
    expect(lots?.badge).toBe("Wholesale Parcels & Suites");
  });

  it("ensures each category has catalogued active products associated", () => {
    const singleStones = getFacetedSingleStones();
    expect(singleStones.length).toBeGreaterThanOrEqual(2);
    expect(singleStones.every((s) => s.catalogCategory === "faceted-single-stones")).toBe(true);

    const gemstoneLots = getGemstoneLots();
    expect(gemstoneLots.length).toBeGreaterThanOrEqual(3);
    expect(gemstoneLots.every((l) => l.catalogCategory === "gemstone-lots")).toBe(true);
  });
});
