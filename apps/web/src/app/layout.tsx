import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { getSiteUrl, getCanonicalUrl } from "@/lib/seo/site-url";
import { JsonLd, createOrganizationSchema, createWebSiteSchema, createLocalBusinessSchema } from "@/lib/seo/json-ld";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button";

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
    default: "Libra Gems & Trading Co. | Natural & Wholesale Gemstones",
    template: "%s | Libra Gems & Trading Co.",
  },
  description:
    "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems directly from Thailand's gemological trading district.",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: "Libra Gems & Trading Co. | Natural & Wholesale Gemstones",
    description:
      "Bangkok-based international B2B gemstone trading company specializing in commercial rough stones, mineral specimens, and precision-cut colored gems directly from Thailand's gemological trading district.",
    url: siteUrl,
    siteName: "Libra Gems & Trading Co., Ltd.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Libra Gems & Trading Co. Bangkok Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Libra Gems & Trading Co. | Natural & Wholesale Gemstones",
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
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
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
        <JsonLd data={[createOrganizationSchema(), createWebSiteSchema(), createLocalBusinessSchema()]} />
      </head>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        {/* Accessible skip to main content landmark */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">{children}</div>
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
