import type { MetadataRoute } from "next";
import igniteSitemap, { mergeSitemap } from "@ignite-agent/agent/sitemap";
import { siteConfig } from "@/lib/site";
import { pageLastModified } from "@/lib/pageMeta";
import { lastReviewed, wikiEntities, wikiUrl } from "@/lib/wiki/load";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NODE_ENV === "production" ? siteConfig.url : "http://localhost:3000";

  const routes: Array<{ path: string; url: string }> = [
    { path: "/", url: `${baseUrl}/` },
    { path: "/solution", url: `${baseUrl}/solution` },
    { path: "/capabilities", url: `${baseUrl}/capabilities` },
    { path: "/pricing", url: `${baseUrl}/pricing` },
    { path: "/faq", url: `${baseUrl}/faq` },
    { path: "/about", url: `${baseUrl}/about` },
    { path: "/contact", url: `${baseUrl}/contact` },
    { path: "/blog", url: `${baseUrl}/blog` },
    { path: "/blog/flock-night-rest-score", url: `${baseUrl}/blog/flock-night-rest-score` },
    { path: "/automate-your-poultry-operation/", url: `${baseUrl}/automate-your-poultry-operation/` }
  ];

  const wiki = wikiEntities().map((entity) => ({
    url: `${baseUrl}${wikiUrl(entity.slug)}`,
    lastModified: `${lastReviewed(entity)}T00:00:00.000Z`
  }));
  const wikiIndexDate = wiki
    .map((row) => row.lastModified)
    .sort()
    .at(-1);

  const local = [
    ...routes.map(({ path, url }) => ({
      url,
      lastModified: new Date(pageLastModified[path]).toISOString()
    })),
    { url: `${baseUrl}${wikiUrl()}`, lastModified: wikiIndexDate ?? new Date().toISOString() },
    ...wiki
  ];

  if (process.env.NODE_ENV !== "production") {
    return local;
  }

  const ignite = (await igniteSitemap()).map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified: lastModified instanceof Date ? lastModified.toISOString() : lastModified,
    changeFrequency,
    priority
  }));

  return mergeSitemap(local, ignite);
}
