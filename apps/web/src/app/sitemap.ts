import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = [
    "",
    "/about",
    "/gemstones",
    "/gemstones/hessonite-garnet",
    "/gemstones/turquoise",
    "/gemstones/afghanistan-rubellite",
    "/contact"
  ];
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}
