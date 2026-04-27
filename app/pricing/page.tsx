import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Partner with SenseAgri AI early — six months completely free. We are looking for early adopters to shape the platform before market launch."
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";
const NAVY = "#0F172A";

const earlyPerks = [
  "Full platform access — sensors, dashboard, and AI",
  "On-site installation and setup, fully managed",
  "Six months completely free — no credit card required",
  "Direct line to the founders",
  "Shape the roadmap as an early partner",
  "Locked-in founder pricing when we go to market",
];

export default function PricingPage() {
  return (
    <div>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
        style={{ background: NAVY }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <span
            className="mb-6 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(212,175,55,0.10)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
              Private Pilot Phase
            </span>
          </span>
          <h1
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: "0.95", maxWidth: "18ch" }}
          >
            We are not on the market yet.<br />
            <span style={{ color: GOLD }}>Partner with us early.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/60">
            SenseAgri AI is currently in private pilot phase. We are looking for early adopters — farms who want to shape the future of African poultry intelligence before we officially launch.
          </p>
        </div>
      </section>

      {/* Early adopter offer */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">

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
              Six months free.<br />
              <span className="text-primary-light">No strings attached.</span>
            </h2>
            <p className="mt-5 font-sans text-sm leading-relaxed text-on-surface-variant">
              Early adopter partners get full platform access at no cost. You give us feedback. We give you the tools to run a smarter farm. When we launch commercially, your pricing stays locked at a founder rate.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-7 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Pilot Call
            </Link>
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
            <div className="flex items-center justify-between bg-primary px-6 py-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">
                Limited slots available
              </span>
              <span className="font-display text-sm font-bold text-tertiary">Apply now ↗</span>
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-container-low px-6 py-20 sm:px-10 lg:px-16">
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
