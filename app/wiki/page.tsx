import type { Metadata } from "next";
import Link from "next/link";
import WikiCrumbs from "@/components/wiki/WikiCrumbs";
import { ENTITY_TYPES, ENTITY_TYPE_META } from "@/lib/wiki/schema";
import { definitionLede, entitiesByType, wikiUrl } from "@/lib/wiki/load";

export const metadata: Metadata = {
  title: "Wiki",
  alternates: { canonical: "/wiki" }
};

export default function WikiIndexPage() {
  const grouped = entitiesByType();

  return (
    <div>
      <WikiCrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Wiki" }]} />
      <h1 className="mt-6 font-display font-semibold tracking-[-0.025em] text-primary" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: 1.05 }}>
        Wiki
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
        Short reference pages for SenseAgri AI, the platform, the team, and the Flock Night-Rest Score.
      </p>

      {ENTITY_TYPES.map((type) => {
        const list = grouped.get(type);
        if (!list || list.length === 0) return null;
        return (
          <section key={type} className="mt-12">
            <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-sensing">
              {ENTITY_TYPE_META[type].label}
            </h2>
            <ul className="mt-4 grid gap-4 list-none pl-0">
              {list.map((entity) => (
                <li key={entity.slug} style={{ border: "0.5px solid #BEC8CA" }} className="bg-surface-container-lowest px-5 py-4">
                  <Link
                    href={wikiUrl(entity.slug)}
                    className="font-display text-lg font-semibold tracking-[-0.02em] text-primary hover:text-primary-container"
                  >
                    {entity.canonical_name}
                  </Link>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{definitionLede(entity)}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
