import type { MetadataRoute } from "next";
import igniteSitemap, { mergeSitemap } from "@ignite-agent/agent/sitemap";
import { siteConfig } from "@/lib/site";
import { buildLocalSitemap, normalizeSitemapRow, staticSitemapEntries, type SitemapRow } from "@/lib/sitemapData";

function localSitemap(baseUrl: string): SitemapRow[] {
  try {
    return buildLocalSitemap({ baseUrl });
  } catch (error) {
    console.error("[sitemap] Local sitemap failed; serving static routes.", error);
    return staticSitemapEntries(baseUrl);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NODE_ENV === "production" ? siteConfig.url : "http://localhost:3000";
  const local = localSitemap(baseUrl);

  if (process.env.NODE_ENV !== "production") {
    return local;
  }

  try {
    const ignite = await igniteSitemap();
    const extra = ignite.flatMap((row) => {
      const normalized = normalizeSitemapRow(row);
      return normalized ? [normalized] : [];
    });
    return mergeSitemap(local, extra);
  } catch (error) {
    console.error("[sitemap] Ignite merge failed; serving local routes.", error);
    return local;
  }
}
