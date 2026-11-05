import type { MetadataRoute } from "next";
import { pageLastModified } from "./pageMeta";
import { siteConfig } from "./site";
import { lastReviewed, wikiEntities, wikiUrl } from "./wiki/load";
import type { WikiEntity } from "./wiki/schema";

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

export type SitemapRow = {
  url: string;
  lastModified?: string;
  changeFrequency?: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority?: number;
};

type LoadEntities = () => WikiEntity[];

type BuildOptions = {
  baseUrl?: string;
  now?: Date;
  lastModified?: Record<string, string>;
  loadEntities?: LoadEntities;
};

/** Absolute URL with no trailing slash, except the site root which keeps one. */
export function canonicalSitemapUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function absoluteSitemapUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  if (!path || path === "/") return `${base}/`;
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${base}${withLeadingSlash.replace(/\/+$/, "")}`;
}

export function safeLastModifiedIso(value: string | undefined, fallback: Date): string {
  if (value) {
    const iso = value.includes("T") ? value : `${value}T00:00:00.000Z`;
    const date = new Date(iso);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return fallback.toISOString();
}

export function normalizeSitemapRow(row: {
  url?: string;
  lastModified?: string | Date;
  changeFrequency?: SitemapRow["changeFrequency"];
  priority?: number;
}): SitemapRow | null {
  if (!row.url) return null;
  let lastModified: string | undefined;
  if (row.lastModified instanceof Date) {
    lastModified = Number.isNaN(row.lastModified.getTime()) ? undefined : row.lastModified.toISOString();
  } else if (row.lastModified) {
    const parsed = new Date(row.lastModified);
    lastModified = Number.isNaN(parsed.getTime()) ? undefined : row.lastModified;
  }
  return {
    url: canonicalSitemapUrl(row.url),
    ...(lastModified ? { lastModified } : {}),
    ...(row.changeFrequency ? { changeFrequency: row.changeFrequency } : {}),
    ...(row.priority !== undefined ? { priority: row.priority } : {})
  };
}

export function staticSitemapEntries(baseUrl: string, now = new Date(), dates: Record<string, string> = pageLastModified): SitemapRow[] {
  return STATIC_SITEMAP_PATHS.map((path) => ({
    url: absoluteSitemapUrl(baseUrl, path),
    lastModified: safeLastModifiedIso(dates[path], now)
  }));
}

function wikiRows(entities: WikiEntity[], baseUrl: string, now: Date): SitemapRow[] {
  const rows: SitemapRow[] = [];
  for (const entity of entities) {
    try {
      if (!entity?.slug) {
        console.error("[sitemap] Skipping wiki entity with no slug.");
        continue;
      }
      rows.push({
        url: absoluteSitemapUrl(baseUrl, wikiUrl(entity.slug)),
        lastModified: safeLastModifiedIso(lastReviewed(entity), now)
      });
    } catch (error) {
      console.error(`[sitemap] Skipping wiki entity ${entity?.slug ?? "?"}.`, error);
    }
  }
  return rows;
}

/**
 * Marketing routes always come back. Wiki URLs are included only when entity
 * files load; a missing directory or a validation error must not fail the sitemap.
 */
export function buildLocalSitemap(options: BuildOptions = {}): SitemapRow[] {
  const baseUrl = options.baseUrl ?? siteConfig.url;
  const now = options.now ?? new Date();
  const dates = options.lastModified ?? pageLastModified;
  const staticEntries = staticSitemapEntries(baseUrl, now, dates);
  const load = options.loadEntities ?? wikiEntities;

  try {
    const entities = load();
    if (!Array.isArray(entities)) {
      console.error("[sitemap] Wiki loader did not return a list; omitting wiki URLs.");
      return staticEntries;
    }
    const wiki = wikiRows(entities, baseUrl, now);
    const wikiIndexDate = wiki
      .map((row) => row.lastModified)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1);
    return [
      ...staticEntries,
      {
        url: absoluteSitemapUrl(baseUrl, wikiUrl()),
        lastModified: wikiIndexDate ?? now.toISOString()
      },
      ...wiki
    ];
  } catch (error) {
    console.error("[sitemap] Wiki unavailable; sitemap lists static routes only.", error);
    return staticEntries;
  }
}
