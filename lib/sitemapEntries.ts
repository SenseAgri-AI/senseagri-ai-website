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

export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency?: SitemapChangeFrequency;
  priority?: number;
};

type DatedEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: SitemapChangeFrequency;
  priority?: number;
};

export function sitemapBaseUrl(): string {
  return process.env.NODE_ENV === "production" ? siteConfig.url : "http://localhost:3000";
}

export function absolutePathUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized.replace(/\/+$/, "")}`;
}

/** Final loc: www origin in production, no trailing slash except the site root. */
export function canonicalLoc(url: string): string {
  const parsed = new URL(url);
  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  }
  return parsed.toString();
}

export function isoDateOrUndefined(value: string | Date | undefined | null): string | undefined {
  if (value == null || value === "") return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00.000Z` : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

export function staticSitemapEntries(
  baseUrl: string,
  pageDates: Record<string, string> = pageLastModified
): SitemapEntry[] {
  return STATIC_SITEMAP_PATHS.map((path) => {
    const lastModified = isoDateOrUndefined(pageDates[path]);
    return {
      url: absolutePathUrl(baseUrl, path),
      ...(lastModified ? { lastModified } : {})
    };
  });
}

export function normalizeSitemapEntries(entries: DatedEntry[]): SitemapEntry[] {
  const map = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    if (!entry?.url || typeof entry.url !== "string") continue;
    let url: string;
    try {
      url = canonicalLoc(entry.url);
    } catch {
      continue;
    }
    const lastModified = isoDateOrUndefined(entry.lastModified);
    const next: SitemapEntry = {
      url,
      ...(lastModified ? { lastModified } : {}),
      ...(entry.changeFrequency ? { changeFrequency: entry.changeFrequency } : {}),
      ...(typeof entry.priority === "number" && Number.isFinite(entry.priority)
        ? { priority: entry.priority }
        : {})
    };
    const prev = map.get(url);
    if (!prev) {
      map.set(url, next);
      continue;
    }
    map.set(url, {
      url,
      ...(prev.lastModified || next.lastModified
        ? { lastModified: prev.lastModified ?? next.lastModified }
        : {}),
      ...(prev.changeFrequency || next.changeFrequency
        ? { changeFrequency: prev.changeFrequency ?? next.changeFrequency }
        : {}),
      ...(prev.priority !== undefined || next.priority !== undefined
        ? { priority: prev.priority ?? next.priority }
        : {})
    });
  }
  return [...map.values()];
}

function wikiSitemapEntries(baseUrl: string, entities: WikiEntity[]): SitemapEntry[] {
  const rows: SitemapEntry[] = [];
  const dates: string[] = [];

  for (const entity of entities) {
    if (!entity || typeof entity.slug !== "string" || entity.slug.length === 0) continue;
    let lastModified: string | undefined;
    try {
      lastModified = isoDateOrUndefined(lastReviewed(entity));
    } catch (error) {
      console.error(`[sitemap] lastReviewed failed for wiki/${entity.slug}:`, error);
    }
    if (lastModified) dates.push(lastModified);
    rows.push({
      url: absolutePathUrl(baseUrl, wikiUrl(entity.slug)),
      ...(lastModified ? { lastModified } : {})
    });
  }

  const indexDate = [...dates].sort().at(-1);
  return [
    {
      url: absolutePathUrl(baseUrl, wikiUrl()),
      ...(indexDate ? { lastModified: indexDate } : {})
    },
    ...rows
  ];
}

export function buildSitemapEntries(options?: {
  baseUrl?: string;
  pageDates?: Record<string, string>;
  loadWiki?: () => WikiEntity[];
}): SitemapEntry[] {
  const baseUrl = options?.baseUrl ?? sitemapBaseUrl();
  const pageDates = options?.pageDates ?? pageLastModified;
  const loadWiki = options?.loadWiki ?? wikiEntities;

  const entries = staticSitemapEntries(baseUrl, pageDates);
  try {
    entries.push(...wikiSitemapEntries(baseUrl, loadWiki()));
  } catch (error) {
    console.error("[sitemap] wiki unavailable; serving static routes only:", error);
  }
  return normalizeSitemapEntries(entries);
}
