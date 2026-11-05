import assert from "node:assert/strict";
import test from "node:test";
import { WikiValidationError, wikiEntities } from "./wiki/load";
import {
  absoluteSitemapUrl,
  buildLocalSitemap,
  canonicalSitemapUrl,
  normalizeSitemapRow,
  STATIC_SITEMAP_PATHS
} from "./sitemapData";

const BASE = "https://www.senseagriai.com";
const NOW = new Date("2026-01-15T00:00:00.000Z");

function urlsOf(entries: { url: string }[]) {
  return entries.map((entry) => entry.url);
}

function withSilentSitemapLogs<T>(fn: () => T): T {
  const original = console.error;
  console.error = () => {};
  try {
    return fn();
  } finally {
    console.error = original;
  }
}

test("static URLs are absolute, on www, and do not redirect via a trailing slash", () => {
  const entries = withSilentSitemapLogs(() =>
    buildLocalSitemap({
      baseUrl: BASE,
      now: NOW,
      loadEntities: () => {
        throw new WikiValidationError("Missing content/wiki directory");
      }
    })
  );

  assert.deepEqual(
    urlsOf(entries),
    STATIC_SITEMAP_PATHS.map((path) => absoluteSitemapUrl(BASE, path))
  );
  assert.equal(
    entries.find((entry) => entry.url.endsWith("/automate-your-poultry-operation"))?.url,
    `${BASE}/automate-your-poultry-operation`
  );
  assert.ok(!urlsOf(entries).some((url) => url.includes("/wiki")));
  for (const entry of entries) {
    assert.equal(new URL(entry.url).hostname, "www.senseagriai.com");
    const path = new URL(entry.url).pathname;
    if (path !== "/") assert.equal(path.endsWith("/"), false);
    assert.equal(Number.isNaN(new Date(entry.lastModified ?? "").getTime()), false);
  }
});

test("a missing or invalid last-modified date still emits the route", () => {
  const entries = withSilentSitemapLogs(() =>
    buildLocalSitemap({
      baseUrl: BASE,
      now: NOW,
      lastModified: { "/": "not-a-date" },
      loadEntities: () => {
        throw new Error("wiki json missing");
      }
    })
  );
  const home = entries.find((entry) => entry.url === `${BASE}/`);
  const poultry = entries.find((entry) => entry.url === `${BASE}/automate-your-poultry-operation`);
  assert.equal(home?.lastModified, NOW.toISOString());
  assert.equal(poultry?.lastModified, NOW.toISOString());
});

test("one bad wiki entity is skipped and the rest of the sitemap stands", () => {
  const entries = withSilentSitemapLogs(() =>
    buildLocalSitemap({
      baseUrl: BASE,
      now: NOW,
      loadEntities: () =>
        [
          { slug: "good", changelog: [{ date: "2026-05-01", note: "reviewed" }] },
          { slug: "bad", changelog: [] },
          { changelog: [{ date: "2026-05-01", note: "no slug" }] }
        ] as unknown as ReturnType<typeof wikiEntities>
    })
  );
  const urls = urlsOf(entries);
  assert.ok(urls.includes(`${BASE}/wiki/good`));
  assert.ok(urls.includes(`${BASE}/wiki`));
  assert.ok(urls.includes(`${BASE}/contact`));
  assert.equal(urls.includes(`${BASE}/wiki/bad`), false);
  assert.equal(
    entries.find((entry) => entry.url === `${BASE}/wiki`)?.lastModified,
    "2026-05-01T00:00:00.000Z"
  );
});

test("published wiki entities are listed when content loads", () => {
  const entries = buildLocalSitemap({ baseUrl: BASE, now: NOW });
  const urls = urlsOf(entries);
  for (const entity of wikiEntities()) {
    assert.ok(urls.includes(`${BASE}/wiki/${entity.slug}`), entity.slug);
  }
  assert.ok(urls.includes(`${BASE}/wiki`));
});

test("canonical sitemap URLs drop a trailing slash on non-root paths", () => {
  assert.equal(
    canonicalSitemapUrl(`${BASE}/automate-your-poultry-operation/`),
    `${BASE}/automate-your-poultry-operation`
  );
  assert.equal(canonicalSitemapUrl(`${BASE}/`), `${BASE}/`);
  assert.equal(
    normalizeSitemapRow({
      url: `${BASE}/automate-your-poultry-operation/`,
      lastModified: new Date("invalid")
    })?.url,
    `${BASE}/automate-your-poultry-operation`
  );
  assert.equal(
    normalizeSitemapRow({
      url: `${BASE}/automate-your-poultry-operation/`,
      lastModified: new Date("invalid")
    })?.lastModified,
    undefined
  );
});
