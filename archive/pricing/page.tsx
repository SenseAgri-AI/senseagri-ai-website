import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, pilotServiceGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Pricing — Solutions Tailored to Your Farm",
  description:
    "Contact SenseAgri AI to learn about offerings and pricing tailored to your farm. Hands-on collaboration and data science solutions built around your needs.",
  alternates: { canonical: "/pricing" }
};

const GOLD = "#13AAA5";
const PRIMARY = "#002E35";

const earlyPerks = [
  "Hands-on collaboration with our team",
  "Data science solutions built around your farm’s challenges",
  "An offering and pricing tailored to your needs",
  "Support connecting your farm data and existing systems",
  "Practical insights to support daily decisions",
  "A roadmap shaped together around your priorities",
];

export default function PricingPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Pricing", path: "/pricing" }])} />
      <JsonLd data={pilotServiceGraph()} />

      {/* Hero — petrol + gold */}
      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="Offering & Pricing"
        headline="Built with you —"
        accentLine="for your farm."
        sub="Contact us to learn more about our offering and pricing, tailored to your farm’s needs."
      />

      {/* Early adopter offer */}
      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

          {/* Left */}
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Hands-on collaboration
              </span>
            </span>
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-primary"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
            >
              Built with you, for you.<br />
              <span className="text-primary-light">Around your farm’s needs.</span>
            </h2>
            <p className="mt-5 font-sans text-sm leading-relaxed text-on-surface-variant">
              We are hands-on. We work with you to understand your farm’s challenges and
              build data science solutions around your needs. From connecting your data to
              finding useful insights, we help you turn information into practical decisions.
              Contact us to explore an offering and pricing that fit your operation.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Contact us
            </Link>
            <p className="mt-5 font-sans text-sm text-on-surface-variant">
              First time here? See how the{" "}
              <Link href="/capabilities" className="text-primary underline underline-offset-2 transition-colors duration-150 hover:text-primary-container">
                platform capabilities
              </Link>
              .
            </p>
          </div>

          {/* Right — perks list */}
          <div className="flex flex-col gap-px" style={{ background: "#E6E8E8" }}>
            {earlyPerks.map((perk) => (
              <div
                key={perk}
                className="flex items-start gap-4 bg-surface-container-lowest px-6 py-5"
              >
                <span
                  className="mt-0.5 shrink-0 font-display text-sm font-extrabold"
                  style={{ color: GOLD }}
                >
                  ✓
                </span>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">{perk}</p>
              </div>
            ))}
            <Link
              href="/contact"
              className="flex items-center justify-between bg-primary px-6 py-4 transition-colors duration-150 hover:bg-primary-container"
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">
                Tailored to your needs
              </span>
              <span className="font-display text-sm font-bold text-tertiary">Let’s talk ↗</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-container-low px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display font-semibold tracking-[-0.025em] text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: "1.05" }}
          >
            Let’s turn your farm data into decision gold.
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface-variant">
            Contact us to discuss your challenges and learn more about our offering and pricing, tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-10 py-4 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-primary-container"
            style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Contact us
          </Link>
        </div>
      </section>

    </div>
  );
}
