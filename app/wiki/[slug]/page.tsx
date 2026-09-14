import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiEntityPage from "@/components/wiki/WikiEntityPage";
import { wikiEntities, wikiEntity } from "@/lib/wiki/load";

export const dynamicParams = false;

export function generateStaticParams() {
  return wikiEntities().map((entity) => ({ slug: entity.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entity = wikiEntity(slug);
  if (!entity) return {};
  return {
    title: entity.canonical_name,
    alternates: { canonical: `/wiki/${entity.slug}` }
  };
}

export default async function WikiSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = wikiEntity(slug);
  if (!entity) notFound();
  return <WikiEntityPage entity={entity} />;
}
