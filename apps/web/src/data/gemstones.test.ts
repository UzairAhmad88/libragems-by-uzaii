import { describe, it, expect } from "vitest";
import { getAllGemstones, getGemstoneBySlug, getGemstonesByCategory } from "./gemstones";

describe("Gemstone Catalogue Dataset", () => {
  it("contains all verified gemstone products across single stones and wholesale lots", () => {
    const gemstones = getAllGemstones();
    expect(gemstones.length).toBeGreaterThanOrEqual(5);
    const slugs = gemstones.map((g) => g.slug);
    expect(slugs).toContain("hessonite-garnet");
    expect(slugs).toContain("turquoise");
    expect(slugs).toContain("afghanistan-rubellite");
    expect(slugs).toContain("faceted-hessonite-garnet");
    expect(slugs).toContain("wholesale-tourmaline-lot");
  });

  it("enforces strict CIBJO treatment codes", () => {
    const hessonite = getGemstoneBySlug("hessonite-garnet");
    const turquoise = getGemstoneBySlug("turquoise");
    const facetedHessonite = getGemstoneBySlug("faceted-hessonite-garnet");

    expect(hessonite?.treatment.cibjoCode).toBe("N");
    expect(hessonite?.treatment.status).toBe("natural_untreated");

    expect(turquoise?.treatment.cibjoCode).toBe("T");
    expect(turquoise?.treatment.status).toBe("stabilized");

    expect(facetedHessonite?.treatment.cibjoCode).toBe("N");
    expect(facetedHessonite?.treatment.status).toBe("natural_untreated");
  });

  it("filters correctly by category and catalog section", () => {
    const roughStones = getGemstonesByCategory("rough");
    expect(roughStones.length).toBeGreaterThanOrEqual(1);

    const minerals = getGemstonesByCategory("mineral");
    expect(minerals.length).toBeGreaterThanOrEqual(1);

    const cutStones = getGemstonesByCategory("cut");
    expect(cutStones.length).toBeGreaterThanOrEqual(2);

    const facetedSingle = getGemstonesByCategory("faceted-single-stones");
    expect(facetedSingle.length).toBeGreaterThanOrEqual(2);

    const gemstoneLots = getGemstonesByCategory("gemstone-lots");
    expect(gemstoneLots.length).toBeGreaterThanOrEqual(3);

    const allStones = getGemstonesByCategory("all");
    expect(allStones.length).toBe(getAllGemstones().length);
  });

  it("includes valid image arrays and non-empty FAQs for each gemstone", () => {
    const gemstones = getAllGemstones();
    for (const gem of gemstones) {
      expect(gem.images.length).toBeGreaterThanOrEqual(3);
      expect(gem.faqs.length).toBeGreaterThanOrEqual(3);
      expect(gem.lotReference).toBeDefined();
      expect(gem.chemicalFormula).toBeDefined();
    }
  });
});
