import assert from "node:assert/strict";
import test from "node:test";
import {
  STATIC_SITEMAP_PATHS,
  absolutePageUrl,
  localSitemapEntries,
  safeLastModified,
  staticSitemapEntries,
  wikiSitemapEntries
} from "./sitemapData.ts";
import type { WikiEntity } from "./wiki/schema.ts";

const ORIGIN = "https://www.senseagriai.com";

function withSilencedErrors(run: () => void): string[] {
  const lines: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    run();
  } finally {
    console.error = original;
  }
  return lines;
}

test("static sitemap URLs are the final www URLs, with no trailing slash", () => {
  const entries = staticSitemapEntries(ORIGIN);
  assert.equal(entries.length, STATIC_SITEMAP_PATHS.length);
  assert.equal(entries[0]?.url, `${ORIGIN}/`);
  assert.equal(
    entries.find((entry) => entry.url.includes("automate-your-poultry-operation"))?.url,
    `${ORIGIN}/automate-your-poultry-operation`
  );
  for (const entry of entries) {
    const path = new URL(entry.url).pathname;
    assert.equal(path.length > 1 && path.endsWith("/"), false);
    assert.ok(entry.url.startsWith(`${ORIGIN}`));
    assert.ok(entry.lastModified);
  }
});

test("missing or invalid lastmod values do not throw", () => {
  assert.equal(safeLastModified(undefined), undefined);
  assert.equal(safeLastModified("not-a-date"), undefined);
  const entries = staticSitemapEntries(ORIGIN, {
    "/about": "not-a-date",
    "/automate-your-poultry-operation/": "2026-07-30"
  });
  const about = entries.find((entry) => entry.url.endsWith("/about"));
  const poultry = entries.find((entry) => entry.url.endsWith("/automate-your-poultry-operation"));
  assert.equal(about?.lastModified, undefined);
  assert.equal(poultry?.url, `${ORIGIN}/automate-your-poultry-operation`);
  assert.equal(poultry?.lastModified, "2026-07-30T00:00:00.000Z");
});

test("a broken or missing wiki falls back to static routes", () => {
  let entries: ReturnType<typeof staticSitemapEntries> = [];
  const logs = withSilencedErrors(() => {
    const wiki = wikiSitemapEntries(ORIGIN, () => {
      throw new Error("Missing content/wiki directory");
    });
    assert.deepEqual(wiki, []);
    entries = [
      ...staticSitemapEntries(ORIGIN),
      ...wikiSitemapEntries(ORIGIN, () => {
        throw new Error("Invalid entity file");
      })
    ];
  });
  assert.match(logs.join("\n"), /static routes only/);
  assert.equal(entries.length, STATIC_SITEMAP_PATHS.length);
  assert.equal(
    entries.some((entry) => entry.url.includes("/wiki")),
    false
  );
});

test("a wiki entity with no review date is still listed", () => {
  const broken = { slug: "broken-entity", changelog: [] } as unknown as WikiEntity;
  let entries: ReturnType<typeof wikiSitemapEntries> = [];
  withSilencedErrors(() => {
    entries = wikiSitemapEntries(ORIGIN, () => [broken]);
  });
  assert.equal(entries[0]?.url, `${ORIGIN}/wiki`);
  assert.equal(entries[1]?.url, `${ORIGIN}/wiki/broken-entity`);
  assert.equal(entries[1]?.lastModified, undefined);
});

test("valid wiki content is included and page URLs stay canonical", () => {
  const entries = localSitemapEntries(ORIGIN);
  assert.ok(entries.some((entry) => entry.url === `${ORIGIN}/wiki/senseagri-ai`));
  assert.ok(entries.some((entry) => entry.url === `${ORIGIN}/wiki`));
  assert.ok(entries.some((entry) => entry.url === absolutePageUrl(ORIGIN, "/automate-your-poultry-operation/")));
  assert.equal(
    entries.some((entry) => entry.url.endsWith("/automate-your-poultry-operation/")),
    false
  );
});
