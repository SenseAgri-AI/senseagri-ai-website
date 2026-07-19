import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, pilotServiceGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Pilot Pricing — Poultry Monitoring",
  description:
    "Founder-rate pilot pricing for SenseAgri AI poultry monitoring — scoped per operation. Book a call to walk through the pilot programme for your farm.",
  alternates: { canonical: "/pricing" }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const earlyPerks = [
  "Full platform access — sensors, dashboard, and AI",
  "On-site installation and setup, fully managed",
  "Reduced founder-rate pricing for pilot partners",
  "Direct line to the founders",
  "Shape the roadmap as an early partner",
  "Locked-in founder pricing when we go to market",
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
        eyebrow="Pilot Pricing"
        headline="Call us for a quote."
        accentLine="Join our early-partner pilot."
        sub="Full platform access for the pilot period. Limited slots, no commitment. Call us and we'll walk you through everything."
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
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Early Adopter Programme
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
            >
              Founder-rate pilot.<br />
              <span className="text-primary-light">Scoped to your operation.</span>
            </h2>
            <p className="mt-5 font-sans text-sm leading-relaxed text-on-surface-variant">
              Early adopter partners get full platform access at reduced founder-rate pricing — scoped to your farm's size and integration needs. You give us feedback; we prove the platform on your operation. When we go to market, pilot partners keep their locked founder rate. Get in touch and we&apos;ll walk you through the specifics for your farm.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Pilot Call
            </Link>
            <p className="mt-5 font-sans text-sm text-on-surface-variant">
              First time here? See how the{" "}
              <Link href="/solution" className="text-primary underline underline-offset-2 transition-colors duration-150 hover:text-primary-container">
                platform works end-to-end
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
                Limited slots available
              </span>
              <span className="font-display text-sm font-bold text-tertiary">Apply now ↗</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-container-low px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: "1.05" }}
          >
            Ready to be an early partner?
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface-variant">
            Slots are limited. Get in touch and we will walk you through everything.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-10 py-4 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
            style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Book a Pilot Call
          </Link>
        </div>
      </section>

    </div>
  );
}
