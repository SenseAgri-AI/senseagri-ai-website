import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, farmAgentsServiceGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "AI farm agents",
  description:
    "Agents read the egg-count dashboard and the records you connect. They catch issues, build reports, and follow the birds, the jobs, and the open issues.",
  alternates: { canonical: "/ai-farm-agents" },
  openGraph: {
    title: "AI farm agents · SenseAgri AI",
    description:
      "Agents read the egg-count dashboard and the records you connect. They catch issues, build reports, and follow the birds, the jobs, and the open issues.",
    url: "/ai-farm-agents"
  }
};

const jobs = [
  {
    title: "Catch issues",
    body: "If a count or a house reading leaves that house’s usual range, WhatsApp gets the reading and what to check."
  },
  {
    title: "Build reports",
    body: "Once a week, a short report of what changed in production, from the farm’s own numbers."
  },
  {
    title: "Track birds, workers, and open issues",
    body: "Bird counts and activity come from the cameras. Jobs and open issues come from the company records you connect. The cameras are not pointed at people."
  }
];

export default function AiFarmAgentsPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "AI farm agents", path: "/ai-farm-agents" }])} />
      <JsonLd data={farmAgentsServiceGraph()} />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div>
          <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary">
            Agents that read this dashboard.
          </h1>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-on-surface-variant">
            They use the camera counts, the house sensors, and the company records you choose to connect. They also read Big Dutchman, SKOV, Hytek and Vencomatic where those are already on the farm.
          </p>
          <figure className="mt-8">
            <Image
              src="/images/real/dashboard-overview.webp"
              alt="SenseAgri egg-count dashboard the agents read, with per-camera totals, a 24-hour chart, and live tiles."
              width={1600}
              height={1030}
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
              style={{ border: "0.5px solid #BEC8CA" }}
            />
            <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">
              The egg-count dashboard. Totals, the last 24 hours, and the two live cameras.
            </figcaption>
          </figure>
          <figure className="mt-6">
            <Image
              src="/images/real/dashboard-cameras.webp"
              alt="The two live A-frame camera tiles from the egg-count dashboard, each with its own egg count."
              width={1600}
              height={379}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
              style={{ border: "0.5px solid #BEC8CA" }}
            />
            <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">
              The live tiles, cropped from that same screen.
            </figcaption>
          </figure>
        </div>

        <aside className="lg:sticky lg:top-24">
          <h2 className="font-sans text-sm font-medium text-on-surface">What they do with it</h2>
          <ul className="mt-4" style={{ borderTop: "0.5px solid #BEC8CA" }}>
            {jobs.map((job) => (
              <li key={job.title} className="py-4" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
                <h3 className="font-display text-lg font-semibold text-primary">{job.title}</h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-on-surface-variant">{job.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface-variant">
            Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it.
          </p>
          <p className="mt-4 font-sans text-sm">
            <Link href="/security" className="font-medium text-primary underline underline-offset-4">
              Security and data ownership
            </Link>
          </p>
        </aside>
      </div>

      <p className="mx-auto max-w-6xl px-6 pb-12 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70 sm:px-10">
        Last updated: {formatDisplayDate(pageLastModified["/ai-farm-agents"])}
      </p>
    </div>
  );
}
