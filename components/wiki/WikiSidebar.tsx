import Link from "next/link";
import { ENTITY_TYPES, ENTITY_TYPE_META } from "@/lib/wiki/schema";
import { entitiesByType, wikiUrl } from "@/lib/wiki/load";

export default function WikiSidebar() {
  const grouped = entitiesByType();

  return (
    <nav aria-label="Wiki" className="lg:sticky lg:top-24">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
        Wiki
      </p>
      <div className="mt-4 grid gap-6">
        {ENTITY_TYPES.map((type) => {
          const list = grouped.get(type);
          if (!list || list.length === 0) return null;
          return (
            <div key={type}>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                {ENTITY_TYPE_META[type].label}
              </p>
              <ul className="mt-2 grid gap-1.5 list-none pl-0">
                {list.map((entity) => (
                  <li key={entity.slug}>
                    <Link
                      href={wikiUrl(entity.slug)}
                      className="font-sans text-sm text-on-surface-variant transition-colors duration-150 hover:text-primary"
                    >
                      {entity.canonical_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
