import type { MetadataRoute } from "next";
import igniteSitemap, { mergeSitemap } from "@ignite-agent/agent/sitemap";
import {
  buildSitemapEntries,
  normalizeSitemapEntries,
  sitemapBaseUrl,
  staticSitemapEntries,
  type SitemapEntry
} from "@/lib/sitemapEntries";

function withIgnite(local: SitemapEntry[], ignite: MetadataRoute.Sitemap): SitemapEntry[] {
  const extra = normalizeSitemapEntries(
    ignite.map(({ url, lastModified, changeFrequency, priority }) => ({
      url,
      lastModified,
      changeFrequency,
      priority
    }))
  );
  return normalizeSitemapEntries(mergeSitemap(local, extra));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = sitemapBaseUrl();
  try {
    const local = buildSitemapEntries({ baseUrl });
    if (process.env.NODE_ENV !== "production") return local;

    try {
      return withIgnite(local, await igniteSitemap());
    } catch (error) {
      console.error("[sitemap] ignite merge skipped:", error);
      return local;
    }
  } catch (error) {
    console.error("[sitemap] generation failed; serving static routes:", error);
    try {
      return staticSitemapEntries(baseUrl);
    } catch (fallbackError) {
      console.error("[sitemap] static fallback failed:", fallbackError);
      return emergencyStaticEntries(baseUrl);
    }
  }
}

function emergencyStaticEntries(baseUrl: string): MetadataRoute.Sitemap {
  const base = baseUrl.replace(/\/+$/, "");
  return [
    { url: `${base}/` },
    { url: `${base}/offering` },
    { url: `${base}/capabilities` },
    { url: `${base}/faq` },
    { url: `${base}/about` },
    { url: `${base}/contact` },
    { url: `${base}/blog` },
    { url: `${base}/blog/flock-night-rest-score` },
    { url: `${base}/automate-your-poultry-operation` }
  ];
}
