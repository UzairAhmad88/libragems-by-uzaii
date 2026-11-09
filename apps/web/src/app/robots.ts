import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://libragems.net";
  return {
    rules: {
      userAgent: "*",
      allow: process.env.NODE_ENV === "production" ? "/" : undefined,
      disallow: process.env.NODE_ENV === "production" ? ["/admin/", "/api/"] : "/"
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
