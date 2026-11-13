import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, securityPageGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Security and data ownership",
  description:
    "You own the farm data. Connector access is limited to what you approve, read-only by default, and you can export or delete it.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security and data ownership · SenseAgri AI",
    description:
      "You own the farm data. Connector access is limited to what you approve, read-only by default, and you can export or delete it.",
    url: "/security"
  }
};

const facts = [
  {
    term: "Ownership",
    detail: "You own the farm and company data. You can export it or delete it."
  },
  {
    term: "Connectors",
    detail: "An agent only reaches the systems you approve. Access is read-only by default."
  },
  {
    term: "People",
    detail: "Cameras are for eggs, birds, and activity. Jobs and open issues come from records you already keep."
  },
  {
    term: "Before a wider install",
    detail: "A proof of concept runs on your houses. We agree what is connected before it is switched on."
  }
];

export default function SecurityPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Security and data ownership", path: "/security" }])} />
      <JsonLd data={securityPageGraph()} />

      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-primary">
          Your data stays yours.
        </h1>
        <p className="mt-3 font-sans text-base text-on-surface-variant">
          The practical rules, in one list.
        </p>
        <dl className="mt-8" style={{ borderTop: "0.5px solid #BEC8CA" }}>
          {facts.map((fact) => (
            <div key={fact.term} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
              <dt className="font-sans text-sm font-medium text-primary">{fact.term}</dt>
              <dd className="font-sans text-sm leading-relaxed text-on-surface-variant">{fact.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 font-sans text-sm">
          <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
            Ask what would be connected on your farm
          </Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/security"])}
        </p>
      </article>
    </div>
  );
}
