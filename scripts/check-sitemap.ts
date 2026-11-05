import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pageLastModified } from "../lib/pageMeta";
import {
  STATIC_SITEMAP_PATHS,
  buildSitemapEntries,
  canonicalLoc,
  isoDateOrUndefined,
  type SitemapEntry
} from "../lib/sitemapEntries";
import { loadWikiEntities } from "../lib/wiki/load";
import type { WikiEntity } from "../lib/wiki/schema";

const baseUrl = "https://www.senseagriai.com";

function fail(message: string): never {
  console.error(`sitemap check failed: ${message}`);
  process.exit(1);
}

function assert(condition: boolean, message: string) {
  if (!condition) fail(message);
}

function pathOf(url: string): string {
  return new URL(url).pathname;
}

function withoutErrorLog<T>(fn: () => T): T {
  const original = console.error;
  console.error = () => {};
  try {
    return fn();
  } finally {
    console.error = original;
  }
}

function assertStaticShape(entries: SitemapEntry[], label: string) {
  assert(entries.length >= STATIC_SITEMAP_PATHS.length, `${label}: missing static routes`);
  const urls = entries.map((entry) => entry.url);
  assert(new Set(urls).size === urls.length, `${label}: duplicate urls`);
  for (const entry of entries) {
    assert(entry.url.startsWith(`${baseUrl}/`) || entry.url === `${baseUrl}/`, `${label}: bad origin ${entry.url}`);
    const pathname = pathOf(entry.url);
    assert(pathname === "/" || !pathname.endsWith("/"), `${label}: trailing slash ${entry.url}`);
    if (entry.lastModified) {
      assert(Boolean(isoDateOrUndefined(entry.lastModified)), `${label}: invalid lastModified ${entry.lastModified}`);
    }
  }
  for (const route of STATIC_SITEMAP_PATHS) {
    const expected = route === "/" ? `${baseUrl}/` : `${baseUrl}${route}`;
    assert(urls.includes(expected), `${label}: missing ${expected}`);
  }
  assert(
    !urls.includes(`${baseUrl}/automate-your-poultry-operation/`),
    `${label}: redirecting trailing-slash url is still listed`
  );
}

const flier = canonicalLoc(`${baseUrl}/automate-your-poultry-operation/`);
assert(flier === `${baseUrl}/automate-your-poultry-operation`, `canonicalLoc kept a trailing slash: ${flier}`);
assert(canonicalLoc(`${baseUrl}/`) === `${baseUrl}/`, "canonicalLoc stripped the root slash");

for (const route of STATIC_SITEMAP_PATHS) {
  if (!isoDateOrUndefined(pageLastModified[route])) fail(`pageLastModified missing or invalid for ${route}`);
}

const healthy = buildSitemapEntries({ baseUrl });
assertStaticShape(healthy, "healthy");
assert(
  healthy.some((entry) => pathOf(entry.url).startsWith("/wiki/")),
  "healthy sitemap dropped wiki entities"
);
for (const route of STATIC_SITEMAP_PATHS) {
  const expectedUrl = route === "/" ? `${baseUrl}/` : `${baseUrl}${route}`;
  const entry = healthy.find((row) => row.url === expectedUrl);
  const expectedDate = isoDateOrUndefined(pageLastModified[route]);
  assert(
    entry?.lastModified === expectedDate,
    `${route} lastModified did not follow pageLastModified`
  );
}

const missingWiki = withoutErrorLog(() =>
  buildSitemapEntries({
    baseUrl,
    loadWiki: () => loadWikiEntities(path.join(os.tmpdir(), `senseagri-wiki-missing-${process.pid}`))
  })
);
assertStaticShape(missingWiki, "missing wiki");
assert(
  !missingWiki.some((entry) => pathOf(entry.url).startsWith("/wiki")),
  "missing wiki still emitted wiki urls"
);

const badDate = withoutErrorLog(() =>
  buildSitemapEntries({
    baseUrl,
    pageDates: { ...pageLastModified, "/faq": "not-a-date" },
    loadWiki: () => {
      throw new Error("wiki offline");
    }
  })
);
assertStaticShape(badDate, "bad page date");
const faq = badDate.find((entry) => entry.url === `${baseUrl}/faq`);
assert(faq?.lastModified === undefined, "invalid page date was emitted");

const brokenEntity = withoutErrorLog(() =>
  buildSitemapEntries({
    baseUrl,
    loadWiki: () => [{ slug: "broken-entity", changelog: [] } as unknown as WikiEntity]
  })
);
assertStaticShape(brokenEntity, "broken entity");
assert(
  brokenEntity.some((entry) => entry.url === `${baseUrl}/wiki/broken-entity`),
  "one bad wiki date dropped the entity url"
);
assert(
  brokenEntity.some((entry) => entry.url === `${baseUrl}/wiki`),
  "wiki index missing when an entity date fails"
);

const brokenDir = fs.mkdtempSync(path.join(os.tmpdir(), "senseagri-wiki-broken-"));
try {
  fs.writeFileSync(path.join(brokenDir, "broken.json"), "{not-json");
  const brokenFile = withoutErrorLog(() =>
    buildSitemapEntries({
      baseUrl,
      loadWiki: () => loadWikiEntities(brokenDir)
    })
  );
  assertStaticShape(brokenFile, "broken wiki file");
  assert(
    !brokenFile.some((entry) => pathOf(entry.url).startsWith("/wiki")),
    "invalid wiki file still emitted wiki urls"
  );
} finally {
  fs.rmSync(brokenDir, { recursive: true, force: true });
}

console.log(`ok    sitemap (${healthy.length} urls, static fallback ${missingWiki.length})`);
