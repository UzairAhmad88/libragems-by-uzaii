import { describe, it, expect } from "vitest";
import { getAllInsights, getInsightBySlug, getInsightsByCategory } from "./insights";

describe("Gemstone Insights Educational Knowledge Hub", () => {
  it("contains all five editorial guides", () => {
    const articles = getAllInsights();
    expect(articles).toHaveLength(5);
  });

  it("calculates realistic reading times from content", () => {
    const articles = getAllInsights();
    for (const article of articles) {
      expect(article.readingTimeMinutes).toBeGreaterThanOrEqual(3);
      expect(article.readingTimeMinutes).toBeLessThanOrEqual(10);
      expect(article.contentSections.length).toBeGreaterThanOrEqual(2);
      expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("retrieves articles by slug and category", () => {
    const article = getInsightBySlug("understanding-gemstone-treatments");
    expect(article).toBeDefined();
    expect(article?.category).toBe("treatments");

    const treatmentArticles = getInsightsByCategory("treatments");
    expect(treatmentArticles.length).toBeGreaterThanOrEqual(1);
  });
});
