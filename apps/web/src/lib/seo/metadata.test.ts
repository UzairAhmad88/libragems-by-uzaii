import { describe, it, expect } from "vitest";
import { buildPageMetadata } from "./metadata";

describe("SEO Metadata Factory", () => {
  it("builds canonical URL, title, and description correctly", () => {
    const meta = buildPageMetadata({
      title: "Commercial Rough Hessonite Garnet",
      description: "Direct B2B supply of wholesale unheated grossular hessonite garnet lots from Bangkok.",
      path: "/gemstones/hessonite-garnet",
    });

    expect(meta.title).toBe("Commercial Rough Hessonite Garnet");
    expect(meta.description).toBe(
      "Direct B2B supply of wholesale unheated grossular hessonite garnet lots from Bangkok."
    );
    expect(meta.alternates?.canonical).toBe(
      "https://libragems1.com/gemstones/hessonite-garnet"
    );
  });

  it("configures standard OpenGraph and Twitter card tags with 1200x630 imagery", () => {
    const meta = buildPageMetadata({
      title: "Wholesale Gemstone Catalogue",
      description: "Browse verified inventory of rough, mineral, and cut gemstones in Bangkok.",
      path: "/gemstones",
      ogImage: "/images/gemstones/hero-editorial-inventory.svg",
    });

    expect(meta.openGraph).toBeDefined();
    expect(meta.openGraph?.title).toBe("Wholesale Gemstone Catalogue");
    expect(meta.openGraph?.url).toBe("https://libragems1.com/gemstones");
    expect(meta.openGraph?.siteName).toBe("Libra Gems & Trading Co., Ltd.");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect((meta.openGraph as Record<string, unknown>)?.type).toBe("website");

    const ogImages = meta.openGraph?.images as Array<{
      url: string;
      width: number;
      height: number;
      alt?: string;
    }>;
    expect(ogImages).toBeDefined();
    expect(ogImages[0].url).toBe(
      "https://libragems1.com/images/gemstones/hero-editorial-inventory.svg"
    );
    expect(ogImages[0].width).toBe(1200);
    expect(ogImages[0].height).toBe(630);

    expect(meta.twitter).toBeDefined();
    expect((meta.twitter as Record<string, unknown>)?.card).toBe("summary_large_image");
    expect(meta.twitter?.title).toBe("Wholesale Gemstone Catalogue");
  });

  it("supports article ogType for educational insight articles", () => {
    const meta = buildPageMetadata({
      title: "CIBJO Standards in Gemstone Trade",
      description: "Comprehensive guide to treatment disclosures.",
      path: "/insights",
      ogType: "article",
    });

    expect((meta.openGraph as Record<string, unknown>)?.type).toBe("article");
  });

  it("applies Googlebot directives for indexable pages", () => {
    const meta = buildPageMetadata({
      title: "Quality & Sourcing",
      description: "Ethical procurement standards.",
      path: "/quality-sourcing",
    });

    expect(meta.robots).toEqual({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    });
  });

  it("disables indexing and following when noIndex is true", () => {
    const meta = buildPageMetadata({
      title: "Internal Portal",
      description: "Restricted administrative area.",
      path: "/admin",
      noIndex: true,
    });

    expect(meta.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});

