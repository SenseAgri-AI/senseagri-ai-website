import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Proof of concept",
  description:
    "A proof of concept on your houses. We agree the problem, the cameras or sensors, and what gets connected before we start.",
  alternates: { canonical: "/offering" },
  openGraph: {
    title: "Proof of concept · SenseAgri AI",
    description:
      "A proof of concept on your houses. We agree the problem, the cameras or sensors, and what gets connected before we start.",
    url: "/offering"
  }
};

const steps = [
  {
    title: "Name the problem",
    body: "Tell us what you cannot see, and where time or eggs are being lost. We pick one problem to start with."
  },
  {
    title: "Use the records you have",
    body: "We look at the cameras, sensors, and systems already on the farm, and agree what a proof of concept needs."
  },
  {
    title: "Decide what stays",
    body: "You see the count and the report on your own houses, then choose what to keep or change."
  }
];

export default function OfferingPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Offering", path: "/offering" }])} />
      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-primary">
          A proof of concept on your houses.
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
          We work on one problem first. That can be the vision record, egg counting on the A-frame, or agents on records you already keep. Scope, time, and price are agreed before we start.
        </p>
        <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
          Your data stays yours. We only connect what you approve, access is read-only by default, and you can export or delete it.
        </p>
        <ol className="mt-8" style={{ borderTop: "0.5px solid #BEC8CA" }}>
          {steps.map((step) => (
            <li key={step.title} className="py-5" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
              <h2 className="font-display text-xl font-semibold text-primary">{step.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-sans text-sm text-on-surface-variant">
          <Link href="/computer-vision" className="font-medium text-primary underline underline-offset-4">Cameras</Link>
          {" · "}
          <Link href="/ai-farm-agents" className="font-medium text-primary underline underline-offset-4">Agents</Link>
          {" · "}
          <Link href="/capabilities" className="font-medium text-primary underline underline-offset-4">Capabilities</Link>
        </p>
        <p className="mt-8">
          <Link href="/contact" className="inline-flex items-center bg-primary px-5 py-3 font-sans text-sm font-medium text-white hover:bg-primary-container">
            Contact us
          </Link>
        </p>
      </article>
    </div>
  );
}
