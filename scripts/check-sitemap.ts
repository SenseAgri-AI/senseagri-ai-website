import { spawnSync } from "node:child_process";
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

function assertStaticShape(entries: SitemapEntry[], label: string) {
  assert(entries.length >= STATIC_SITEMAP_PATHS.length, `${label}: missing static routes`);
  const urls = entries.map((entry) => entry.url);
  assert(new Set(urls).size === urls.length, `${label}: duplicate urls`);
  for (const entry of entries) {
    assert(entry.url.startsWith(`${baseUrl}/`) || entry.url === `${baseUrl}/`, `${label}: bad origin ${entry.url}`);
    const path = pathOf(entry.url);
    assert(path === "/" || !path.endsWith("/"), `${label}: trailing slash ${entry.url}`);
    if (entry.lastModified) {
      assert(Boolean(isoDateOrUndefined(entry.lastModified)), `${label}: invalid lastModified ${entry.lastModified}`);
    }
  }
  for (const path of STATIC_SITEMAP_PATHS) {
    const expected = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
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

for (const path of STATIC_SITEMAP_PATHS) {
  const date = pageLastModified[path];
  if (!isoDateOrUndefined(date)) fail(`pageLastModified missing or invalid for ${path}`);
}

const healthy = buildSitemapEntries({ baseUrl });
assertStaticShape(healthy, "healthy");
assert(
  healthy.some((entry) => entry.url === `${baseUrl}/wiki/senseagri-ai`),
  "healthy sitemap dropped wiki entities"
);
const offering = healthy.find((entry) => entry.url === `${baseUrl}/offering`);
assert(offering?.lastModified === "2026-10-02T00:00:00.000Z", "offering lastModified drifted");

function withoutErrorLog<T>(fn: () => T): T {
  const original = console.error;
  console.error = () => {};
  try {
    return fn();
  } finally {
    console.error = original;
  }
}

const missingWiki = withoutErrorLog(() =>
  buildSitemapEntries({
    baseUrl,
    loadWiki: () => {
      throw new Error("Missing content/wiki directory");
    }
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

function runIsolated(expectWiki: boolean) {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "--input-type=module",
      "-e",
      `
      import { buildSitemapEntries } from "./lib/sitemapEntries.ts";
      const entries = buildSitemapEntries({ baseUrl: ${JSON.stringify(baseUrl)} });
      const wiki = entries.filter((entry) => new URL(entry.url).pathname.startsWith("/wiki"));
      const flier = entries.find((entry) => entry.url.endsWith("/automate-your-poultry-operation"));
      if (!flier || flier.url.endsWith("/")) {
        console.error("static flier url missing");
        process.exit(1);
      }
      if (${expectWiki ? "true" : "false"} ? wiki.length === 0 : wiki.length !== 0) {
        console.error("wiki url mismatch", wiki.map((entry) => entry.url));
        process.exit(1);
      }
      console.log("isolated-ok");
      `
    ],
    { cwd: process.cwd(), encoding: "utf8" }
  );
  if (result.status !== 0) {
    if (result.stdout) console.error(result.stdout);
    if (result.stderr) console.error(result.stderr);
    fail(`isolated sitemap process failed (expectWiki=${expectWiki})`);
  }
}

const wikiDir = path.join(process.cwd(), "content/wiki");
const stash = path.join(os.tmpdir(), `senseagri-wiki-check-${process.pid}`);

fs.renameSync(wikiDir, stash);
try {
  runIsolated(false);
} finally {
  fs.renameSync(stash, wikiDir);
}

const brokenFile = path.join(wikiDir, "senseagri-ai.json");
const original = fs.readFileSync(brokenFile, "utf8");
fs.writeFileSync(brokenFile, "{not-json");
try {
  runIsolated(false);
} finally {
  fs.writeFileSync(brokenFile, original);
}

runIsolated(true);

console.log(`ok    sitemap (${healthy.length} urls, static fallback ${missingWiki.length})`);
