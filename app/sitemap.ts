import type { MetadataRoute } from "next";
import igniteSitemap, { mergeSitemap } from "@ignite-agent/agent/sitemap";
import {
  localSitemapEntries,
  sitemapBaseUrl,
  staticSitemapEntries,
  type SitemapEntry
} from "@/lib/sitemapData";

function toMetadata(entries: SitemapEntry[]): MetadataRoute.Sitemap {
  return entries.map((entry) =>
    entry.lastModified ? { url: entry.url, lastModified: entry.lastModified } : { url: entry.url }
  );
}

// Never throw. A bad wiki file or an Ignite outage must not turn /sitemap.xml into a 500.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = sitemapBaseUrl();

  try {
    const local = localSitemapEntries(baseUrl);

    if (process.env.NODE_ENV !== "production") {
      return toMetadata(local);
    }

    try {
      const ignite = (await igniteSitemap()).map(({ url, lastModified, changeFrequency, priority }) => ({
        url,
        ...(lastModified
          ? {
              lastModified: lastModified instanceof Date ? lastModified.toISOString() : String(lastModified)
            }
          : {}),
        ...(changeFrequency ? { changeFrequency } : {}),
        ...(priority !== undefined ? { priority } : {})
      }));
      return mergeSitemap(local, ignite);
    } catch (error) {
      console.error("Ignite sitemap merge failed; publishing local URLs only.", error);
      return toMetadata(local);
    }
  } catch (error) {
    console.error("Sitemap generation failed; publishing static routes only.", error);
    try {
      return toMetadata(staticSitemapEntries(baseUrl));
    } catch (fallbackError) {
      console.error("Static sitemap fallback failed; publishing the homepage only.", fallbackError);
      return [{ url: `${baseUrl.replace(/\/+$/, "")}/` }];
    }
  }
}
