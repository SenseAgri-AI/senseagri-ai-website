import { pageLastModified } from "./pageMeta";
import { siteConfig } from "./site";
import { lastReviewed, wikiEntities, wikiUrl } from "./wiki/load";
import type { WikiEntity } from "./wiki/schema";

// Final public paths. Next serves these without a trailing slash
// (`trailingSlash` is off), so the sitemap must use the same URLs.
export const STATIC_SITEMAP_PATHS = [
  "/",
  "/offering",
  "/capabilities",
  "/faq",
  "/about",
  "/contact",
  "/blog",
  "/blog/flock-night-rest-score",
  "/automate-your-poultry-operation"
] as const;

export type SitemapEntry = {
  url: string;
  lastModified?: string;
};

export type WikiSitemapSource = () => WikiEntity[];

export function sitemapBaseUrl(): string {
  return process.env.NODE_ENV === "production" ? siteConfig.url : "http://localhost:3000";
}

export function absolutePageUrl(baseUrl: string, path: string): string {
  const origin = baseUrl.replace(/\/+$/, "");
  if (path === "/" || path === "") return `${origin}/`;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${withSlash.replace(/\/+$/, "")}`;
}

export function safeLastModified(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function modifiedFor(path: string, dates: Record<string, string>): string | undefined {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  const raw = dates[normalized] ?? dates[path] ?? (normalized === "/" ? undefined : dates[`${normalized}/`]);
  return safeLastModified(raw);
}

export function staticSitemapEntries(
  baseUrl: string,
  dates: Record<string, string> = pageLastModified
): SitemapEntry[] {
  return STATIC_SITEMAP_PATHS.map((path) => {
    const lastModified = modifiedFor(path, dates);
    return lastModified
      ? { url: absolutePageUrl(baseUrl, path), lastModified }
      : { url: absolutePageUrl(baseUrl, path) };
  });
}

export function wikiSitemapEntries(
  baseUrl: string,
  load: WikiSitemapSource = wikiEntities
): SitemapEntry[] {
  let entities: WikiEntity[];
  try {
    entities = load();
    if (!Array.isArray(entities)) {
      throw new Error("Wiki sitemap loader did not return a list.");
    }
  } catch (error) {
    console.error("Sitemap wiki entries unavailable; publishing static routes only.", error);
    return [];
  }

  const rows: SitemapEntry[] = [];
  for (const entity of entities) {
    const slug = typeof entity?.slug === "string" ? entity.slug : "";
    if (!slug) continue;
    let lastModified: string | undefined;
    try {
      lastModified = safeLastModified(`${lastReviewed(entity)}T00:00:00.000Z`);
    } catch (error) {
      console.error(`Sitemap skipped lastmod for wiki/${slug}.`, error);
    }
    rows.push(
      lastModified
        ? { url: absolutePageUrl(baseUrl, wikiUrl(slug)), lastModified }
        : { url: absolutePageUrl(baseUrl, wikiUrl(slug)) }
    );
  }

  const newest = rows
    .map((row) => row.lastModified)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1);
  const indexUrl = absolutePageUrl(baseUrl, wikiUrl());
  return [newest ? { url: indexUrl, lastModified: newest } : { url: indexUrl }, ...rows];
}

export function localSitemapEntries(baseUrl = sitemapBaseUrl()): SitemapEntry[] {
  return [...staticSitemapEntries(baseUrl), ...wikiSitemapEntries(baseUrl)];
}
