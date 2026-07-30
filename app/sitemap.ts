import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { pageLastModified } from "@/lib/pageMeta";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes: Array<{ path: string; url: string }> = [
    { path: "/", url: `${baseUrl}/` },
    { path: "/solution", url: `${baseUrl}/solution` },
    { path: "/capabilities", url: `${baseUrl}/capabilities` },
    { path: "/pricing", url: `${baseUrl}/pricing` },
    { path: "/faq", url: `${baseUrl}/faq` },
    { path: "/about", url: `${baseUrl}/about` },
    { path: "/contact", url: `${baseUrl}/contact` },
    { path: "/flier/", url: `${baseUrl}/flier/` }
  ];

  return routes.map(({ path, url }) => ({
    url,
    lastModified: new Date(pageLastModified[path])
  }));
}
