import fs from "node:fs";
import path from "node:path";
import { wikiEntitySchema, type WikiEntity } from "./schema";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");

export class WikiValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WikiValidationError";
  }
}

export function lastReviewed(entity: WikiEntity): string {
  const dates = entity.changelog.map((entry) => entry.date).sort();
  const newest = dates.at(-1);
  if (!newest) {
    throw new WikiValidationError(`No changelog date for ${entity.slug}`);
  }
  return newest;
}

function parseEntityFile(filePath: string): WikiEntity {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
  const parsed = wikiEntitySchema.safeParse(raw);
  if (!parsed.success) {
    const detail = parsed.error.issues.map((issue) => issue.message).join("\n");
    throw new WikiValidationError(
      `Invalid entity file ${path.basename(filePath)}\n${detail}`
    );
  }
  const entity = parsed.data;
  const fileSlug = path.basename(filePath, ".json");
  if (entity.slug !== fileSlug) {
    throw new WikiValidationError(
      `Slug "${entity.slug}" does not match file name "${fileSlug}.json"`
    );
  }
  return entity;
}

export function loadWikiEntities(): WikiEntity[] {
  if (!fs.existsSync(WIKI_DIR)) {
    throw new WikiValidationError("Missing content/wiki directory");
  }

  const files = fs
    .readdirSync(WIKI_DIR)
    .filter((name) => name.endsWith(".json") && !name.startsWith("_"))
    .sort();

  const entities = files.map((name) => parseEntityFile(path.join(WIKI_DIR, name)));

  const slugs = entities.map((entity) => entity.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new WikiValidationError("Duplicate slugs");
  }

  const bySlug = new Map(entities.map((entity) => [entity.slug, entity]));
  for (const entity of entities) {
    for (const link of entity.cross_links) {
      const target = bySlug.get(link.target_slug);
      if (!target) {
        throw new WikiValidationError(
          `Unknown wiki link "${link.target_slug}" on ${entity.slug}`
        );
      }
      if (link.anchor !== target.canonical_name) {
        throw new WikiValidationError(
          `Cross-link anchor must be the target canonical name (got "${link.anchor}", expected "${target.canonical_name}")`
        );
      }
    }
  }

  return entities;
}

let cached: WikiEntity[] | undefined;

export function wikiEntities(): WikiEntity[] {
  if (!cached) cached = loadWikiEntities();
  return cached;
}

export function wikiEntity(slug: string): WikiEntity | undefined {
  return wikiEntities().find((entity) => entity.slug === slug);
}

export function wikiUrl(slug?: string): string {
  return slug ? `/wiki/${slug}` : "/wiki";
}

export function entitiesByType(): Map<WikiEntity["entity_type"], WikiEntity[]> {
  const grouped = new Map<WikiEntity["entity_type"], WikiEntity[]>();
  for (const entity of wikiEntities()) {
    const list = grouped.get(entity.entity_type) ?? [];
    list.push(entity);
    grouped.set(entity.entity_type, list);
  }
  return grouped;
}

export function definitionLede(entity: WikiEntity): string {
  const { category, founded, function: fn, differentiator } = entity.definition;
  return `${entity.canonical_name} is a ${category}, founded in ${founded}. ${fn} ${differentiator}`;
}
