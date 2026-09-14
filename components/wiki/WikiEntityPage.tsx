import Link from "next/link";
import CitedText from "@/components/wiki/CitedText";
import WikiCrumbs from "@/components/wiki/WikiCrumbs";
import { definitionLede, lastReviewed, wikiUrl } from "@/lib/wiki/load";
import { ENTITY_TYPE_META, type WikiEntity } from "@/lib/wiki/schema";

type WikiEntityPageProps = {
  entity: WikiEntity;
};

function citationHost(url: string): string {
  return new URL(url).host.replace(/^www\./, "");
}

export default function WikiEntityPage({ entity }: WikiEntityPageProps) {
  const reviewed = lastReviewed(entity);
  const typeLabel = ENTITY_TYPE_META[entity.entity_type].label;
  const lede = definitionLede(entity);

  return (
    <article>
      <WikiCrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Wiki", href: wikiUrl() },
          { label: typeLabel, href: wikiUrl() },
          { label: entity.canonical_name }
        ]}
      />

      <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-sensing">
        {typeLabel}
      </p>
      <h1
        className="mt-3 font-display font-semibold tracking-[-0.025em] text-primary"
        style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: 1.05 }}
      >
        {entity.canonical_name}
      </h1>
      {entity.aliases.length > 0 ? (
        <p className="mt-2 font-sans text-sm text-on-surface-variant">Also known as {entity.aliases.join(", ")}.</p>
      ) : null}

      <p className="mt-6 font-sans text-base leading-relaxed text-on-surface">{lede}</p>

      {entity.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-primary">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 font-sans text-base leading-relaxed text-on-surface-variant">
              <CitedText text={paragraph} />
            </p>
          ))}
        </section>
      ))}

      {entity.cross_links.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-primary">Related</h2>
          <ul className="mt-3 grid gap-2 list-none pl-0">
            {entity.cross_links.map((link) => (
              <li key={link.target_slug}>
                <Link
                  href={wikiUrl(link.target_slug)}
                  className="font-sans text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-container"
                >
                  {link.anchor}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-primary">Sources</h2>
        <ol className="mt-4 grid gap-3 pl-5 font-sans text-sm leading-relaxed text-on-surface-variant">
          {entity.citations.map((citation) => (
            <li key={citation.n} id={`cite-${citation.n}`}>
              <a href={citation.url} className="text-primary underline underline-offset-2 hover:text-primary-container">
                {citation.title}
              </a>
              <span className="text-on-surface-variant/80">
                {" "}
                ({citationHost(citation.url)}; accessed {citation.accessed})
              </span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-12 pt-6 font-sans text-sm text-on-surface-variant" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <p>
          Written by{" "}
          <a href={entity.author.url} className="text-primary underline underline-offset-2">
            {entity.author.name}
          </a>
          . Last reviewed {reviewed}.
        </p>
      </footer>
    </article>
  );
}
