import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, farmAgentsServiceGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "AI farm agents",
  description:
    "Agents that understand the farm connect to the vision record and the company records you approve. They flag an issue and draft a report for you to check.",
  alternates: { canonical: "/ai-farm-agents" },
  openGraph: {
    title: "AI farm agents · SenseAgri AI",
    description:
      "Agents that understand the farm connect to the vision record and the company records you approve. They flag an issue and draft a report for you to check.",
    url: "/ai-farm-agents"
  }
};

const flow = [
  {
    title: "Records you connect",
    body: "The vision record, and the company records you approve."
  },
  {
    title: "Agent",
    body: "Reads those records and looks for what needs a person."
  },
  {
    title: "For you to check",
    body: "Flags an issue. Drafts a report. Tracks open work."
  }
];

export default function AiFarmAgentsPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "AI farm agents", path: "/ai-farm-agents" }])} />
      <JsonLd data={farmAgentsServiceGraph()} />

      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary">
          Agents that understand the farm.
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
          They connect to the vision record and to the company records you approve. They catch issues, draft a report for you to check, and track open work.
        </p>

        <ol className="mt-10 flex flex-col gap-2 md:flex-row md:items-stretch" aria-label="How an agent uses the records you connect">
          {flow.map((step, index) => (
            <li key={step.title} className="flex flex-1 flex-col gap-2 md:flex-row md:items-stretch">
              <div className="flex-1 bg-surface-container-lowest p-4" style={{ border: "0.5px solid #BEC8CA" }}>
                <h2 className="font-display text-lg font-semibold text-primary">{step.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{step.body}</p>
              </div>
              {index < flow.length - 1 ? (
                <span className="flex items-center justify-center font-sans text-lg text-sensing md:px-2" aria-hidden="true">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-8 font-sans text-sm leading-relaxed text-on-surface-variant">
          Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it.
        </p>
        <p className="mt-4 font-sans text-sm">
          <Link href="/security" className="font-medium text-primary underline underline-offset-4">
            Security and data ownership
          </Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/ai-farm-agents"])}
        </p>
      </article>
    </div>
  );
}
