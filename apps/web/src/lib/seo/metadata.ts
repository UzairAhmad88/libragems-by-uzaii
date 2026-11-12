import type { Metadata } from "next";
import { getCanonicalUrl } from "./site-url";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE = "/images/gemstones/hero-editorial-inventory.svg";

/**
 * Builds consistent, Google Search Central-compliant page metadata.
 */
export function buildPageMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : getCanonicalUrl(ogImage);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Libra Gems & Trading Co., Ltd.",
      locale: "en_US",
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | Libra Gems & Trading Co.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

