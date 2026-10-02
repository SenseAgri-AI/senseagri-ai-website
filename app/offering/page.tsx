import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Offering — Farm Data Proof of Concept Program",
  description:
    "Join SenseAgri AI’s proof of concept program. Work with our team to explore data science solutions for your farm, with scope and pricing tailored to your needs.",
  alternates: { canonical: "/offering" }
};

const approach = [
  {
    title: "Start with your challenges.",
    body: "Tell us where you need better visibility, what takes time, and where losses or uncertainty affect your operation. Together, we choose a focused problem to explore."
  },
  {
    title: "Build with your data.",
    body: "We review the data and systems you already use, identify any gaps, and agree on the capabilities needed for your proof of concept. The scope follows your farm’s needs."
  },
  {
    title: "Turn understanding into decisions.",
    body: "We work with you to review the insights, assess their practical value, and decide what to refine or expand. We integrate our solutions into your farm, shaped around your existing systems and the way your team works."
  }
];

export default function OfferingPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Offering", path: "/offering" }])} />
      <PageHero
        dark
        eyebrow="Limited offer · Proof of concept"
        headline="Join our"
        accentLine="POC program."
        sub="Build with us, around your farm’s needs. Our proof of concept program gives us a focused starting point to explore how your data can support better production and management decisions."
      />

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="font-display text-display-sm font-semibold tracking-tight text-primary">
              A practical starting point for your farm.
            </h2>
            <div className="space-y-4 font-sans text-title-sm leading-relaxed text-on-surface-variant">
              <p>
                A proof of concept is a focused project to explore a solution to a specific
                challenge. We are hands-on: we work with you to understand your operation
                and build data science solutions with you, for you.
              </p>
              <p>
                The goal is to turn your farm data into understanding that helps improve
                production and management, prevent losses, reduce risks, and optimise
                your operation with less room for error, labour, and expense.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {approach.map(({ title, body }) => (
              <article key={title} className="border-t border-tertiary bg-surface-container-low p-6" style={{ borderTopWidth: "0.5px" }}>
                <h3 className="font-display text-title-lg font-semibold text-primary">{title}</h3>
                <p className="mt-4 font-sans text-title-sm leading-relaxed text-on-surface-variant">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 font-sans text-title-sm text-on-surface-variant">
            Explore our{" "}
            <Link href="/capabilities" className="text-primary underline underline-offset-4">capabilities</Link>
            {" "}to see what we can bring to your proof of concept.
          </p>
        </div>
      </section>

      <section className="bg-primary px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-sm font-semibold tracking-tight text-white">
            Let’s turn your farm data into decision gold.
          </h2>
          <p className="mt-5 font-sans text-title-sm leading-relaxed text-white/75">
            Contact us to discuss the POC program and an offering tailored to your needs.
            We’ll agree on the scope, timeline, and pricing together before getting started.
          </p>
          <Link href="/contact" className="mt-8 inline-flex items-center justify-center bg-white px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-surface-container-low">Contact us</Link>
        </div>
      </section>
    </div>
  );
}
