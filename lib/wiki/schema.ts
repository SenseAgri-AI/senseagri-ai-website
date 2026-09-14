import { z } from "zod";

export const ENTITY_TYPES = [
  "company",
  "product",
  "person",
  "concept",
  "location",
  "offering"
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

export const ENTITY_TYPE_META: Record<
  EntityType,
  { label: string; plural: string; jsonLdType: string }
> = {
  company: { label: "Company", plural: "Company", jsonLdType: "Organization" },
  product: { label: "Product", plural: "Products", jsonLdType: "Product" },
  person: { label: "People", plural: "People", jsonLdType: "Person" },
  concept: { label: "Concepts", plural: "Concepts", jsonLdType: "Thing" },
  location: { label: "Places", plural: "Places", jsonLdType: "Place" },
  offering: { label: "Offerings", plural: "Offerings", jsonLdType: "Service" }
};

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const httpUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("http://") || value.startsWith("https://"), {
    message: "url must be http(s)"
  });

export const wikiEntitySchema = z
  .object({
    entity_type: z.enum(ENTITY_TYPES),
    canonical_name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    aliases: z.array(z.string()),
    definition: z.object({
      category: z.string().min(1),
      founded: z.string().min(1),
      function: z.string().min(1),
      differentiator: z.string().min(1)
    }),
    sections: z
      .array(
        z.object({
          heading: z.string().min(1),
          paragraphs: z.array(z.string().min(1)).min(1),
          stats: z
            .array(
              z.object({
                text: z.string().min(1),
                citation: z.number().int().positive()
              })
            )
            .default([])
        })
      )
      .min(1),
    cross_links: z.array(
      z.object({
        target_slug: z.string().min(1),
        anchor: z.string().min(1)
      })
    ),
    citations: z
      .array(
        z.object({
          n: z.number().int().positive(),
          url: httpUrl,
          title: z.string().min(1),
          accessed: isoDate
        })
      )
      .min(1),
    author: z.object({
      name: z.string().min(1),
      url: httpUrl
    }),
    changelog: z
      .array(
        z.object({
          date: isoDate,
          note: z.string().min(1)
        })
      )
      .min(1),
    same_as: z.array(httpUrl)
  })
  .superRefine((entity, ctx) => {
    const citationNs = entity.citations.map((c) => c.n);
    const uniqueNs = new Set(citationNs);
    if (uniqueNs.size !== citationNs.length) {
      ctx.addIssue({ code: "custom", message: "Duplicate citation indices" });
    }

    for (const section of entity.sections) {
      const prose = section.paragraphs.join(" ");
      for (const stat of section.stats) {
        if (!uniqueNs.has(stat.citation)) {
          ctx.addIssue({
            code: "custom",
            message: `Citation ${stat.citation} on "${section.heading}" has no matching source`
          });
        }
        if (!prose.includes(`[${stat.citation}]`)) {
          ctx.addIssue({
            code: "custom",
            message: `Citation [${stat.citation}] is missing from "${section.heading}"`
          });
        }
      }
    }
  });

export type WikiEntity = z.infer<typeof wikiEntitySchema>;
