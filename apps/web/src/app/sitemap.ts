import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://libragems.net";
  const paths = [
    "",
    "/about",
    "/gemstones",
    "/gemstones/hessonite-garnet",
    "/gemstones/turquoise",
    "/gemstones/afghanistan-rubellite",
    "/quality-sourcing",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path.startsWith("/gemstones") ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path.startsWith("/gemstones/") ? 0.9 : 0.7,
  }));
}
