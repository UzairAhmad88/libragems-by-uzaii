import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { getSiteUrl, getCanonicalUrl } from "@/lib/seo/site-url";
import { JsonLd, createOrganizationSchema, createWebSiteSchema } from "@/lib/seo/json-ld";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getSiteUrl();
const ogImageUrl = getCanonicalUrl("/images/gemstones/hero-editorial-inventory.jpg");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LibraGems | International Gemstone Trading & Sourcing",
    template: "%s | LibraGems",
  },
  description:
    "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "LibraGems | International Gemstone Trading & Sourcing",
    description:
      "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems.",
    url: siteUrl,
    siteName: "Libra Gems & Trading Co., Ltd.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "LibraGems International Gemstone Trading | Bangkok Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LibraGems | International Gemstone Trading & Sourcing",
    description:
      "B2B gemstone trading platform based in Bangkok, Thailand. Commercial rough parcels, mineral specimens, and cut colored gems.",
    images: [ogImageUrl],
  },
  robots: {
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={[createOrganizationSchema(), createWebSiteSchema()]} />
      </head>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        {/* Accessible skip to main content landmark */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
