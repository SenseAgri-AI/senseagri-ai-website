import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SenseAgri AI | Poultry Farm Decision Intelligence",
    template: "%s | SenseAgri AI"
  },
  description: siteConfig.description,
  openGraph: {
    title: "SenseAgri AI | Poultry Farm Decision Intelligence",
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }]
  },
  twitter: {
    card: "summary_large_image",
    title: "SenseAgri AI | Poultry Farm Decision Intelligence",
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Analytics />
        <div className="min-h-screen bg-surface">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
