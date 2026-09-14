import Link from "next/link";

export type WikiCrumb = {
  label: string;
  href?: string;
};

type WikiCrumbsProps = {
  crumbs: WikiCrumb[];
};

export default function WikiCrumbs({ crumbs }: WikiCrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-label-sm text-on-surface-variant">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none pl-0">
        {crumbs.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-primary">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-on-surface">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
