export type InsightCategory = "treatments" | "lapidary" | "origin" | "certification" | "market-standards";

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: InsightCategory;
  categoryLabel: string;
  readingTimeMinutes: number;
  publishedDate: string;
  excerpt: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    callout?: string;
  }[];
  relatedGemstones: {
    name: string;
    slug: string;
  }[];
}
