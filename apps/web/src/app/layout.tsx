import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://libragems.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LibraGems | International Gemstone Trading",
    template: "%s | LibraGems",
  },
  description:
    "International colored gemstone trading and commercial supply based in Bangkok, Thailand. Sourcing rough stones, minerals, beads, and cut gemstones.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
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
