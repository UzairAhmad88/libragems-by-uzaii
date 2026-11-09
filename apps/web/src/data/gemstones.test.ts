import { describe, it, expect } from "vitest";
import { getAllGemstones, getGemstoneBySlug, getGemstonesByCategory } from "./gemstones";

describe("Gemstone Catalogue Dataset", () => {
  it("contains exactly the three initial launch gemstones", () => {
    const gemstones = getAllGemstones();
    expect(gemstones).toHaveLength(3);
    const slugs = gemstones.map((g) => g.slug);
    expect(slugs).toContain("hessonite-garnet");
    expect(slugs).toContain("turquoise");
    expect(slugs).toContain("afghanistan-rubellite");
  });

  it("enforces strict CIBJO treatment codes", () => {
    const hessonite = getGemstoneBySlug("hessonite-garnet");
    const turquoise = getGemstoneBySlug("turquoise");

    expect(hessonite?.treatment.cibjoCode).toBe("N");
    expect(hessonite?.treatment.status).toBe("natural_untreated");

    expect(turquoise?.treatment.cibjoCode).toBe("T");
    expect(turquoise?.treatment.status).toBe("stabilized");
  });

  it("filters correctly by category", () => {
    const roughStones = getGemstonesByCategory("rough");
    expect(roughStones).toHaveLength(1);
    expect(roughStones[0].slug).toBe("hessonite-garnet");

    const minerals = getGemstonesByCategory("mineral");
    expect(minerals).toHaveLength(1);
    expect(minerals[0].slug).toBe("turquoise");

    const cutStones = getGemstonesByCategory("cut");
    expect(cutStones).toHaveLength(1);
    expect(cutStones[0].slug).toBe("afghanistan-rubellite");

    const allStones = getGemstonesByCategory("all");
    expect(allStones).toHaveLength(3);
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
