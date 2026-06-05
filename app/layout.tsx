import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"]
});

const DEFAULT_TITLE = "SenseAgri AI — Poultry Farm Intelligence for South Africa";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · SenseAgri AI"
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description
  },
  icons: { icon: "/favicon.svg" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "SenseAgri AI",
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.svg`,
      description:
        "AI decision-intelligence platform for commercial poultry farms. Unifies farm sensor data into welfare, production and ROI insights with edge AI alerts.",
      slogan: "Every signal. Every decision.",
      foundingDate: "2025",
      areaServed: { "@type": "Country", name: "South Africa" },
      address: {
        "@type": "PostalAddress",
        addressCountry: "ZA",
        addressRegion: "Western Cape"
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.links.email,
        telephone: "+27-68-948-1905",
        areaServed: "ZA",
        availableLanguage: ["en"]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: "SenseAgri AI",
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en"
    },
    {
      "@type": "SoftwareApplication",
      name: "SenseAgri AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web; WhatsApp alerts",
      description:
        "Continuous sensing, edge-AI anomaly detection and weekly ROI reports for poultry operations. Monitors temperature, humidity, air quality, feed, water and hen-day production; flags anomalies and recommends action.",
      areaServed: { "@type": "Country", name: "South Africa" },
      publisher: { "@id": `${siteConfig.url}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <div className="min-h-screen bg-surface">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <RevealController />
        </div>
      </body>
    </html>
  );
}
