import type { Metadata } from "next";
import Button from "@/components/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how SenseAgri AI works — sign up, install, and get full telemetry and AI from day one. Six months completely free."
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const steps = [
  {
    num: "01",
    title: "Sign up & onboard",
    body: "Register your farm online. We contact you within one business day to scope your setup and schedule installation.",
  },
  {
    num: "02",
    title: "We install your devices",
    body: "Our team deploys sensors and cameras on-site. Installation takes two days — no disruption to your operation.",
  },
  {
    num: "03",
    title: "Full telemetry & AI — immediately",
    body: "From day one you have live barn monitoring, personalised alerts, and our LayerSense AI working in the background.",
  },
  {
    num: "04",
    title: "Six months completely free",
    body: "Your entire pilot period costs nothing. No commitment, no credit card. We earn your trust before asking for anything.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
        style={{ background: PRIMARY }}
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
              How It Works
            </span>
          </span>
          <h1
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: "0.95", maxWidth: "16ch" }}
          >
            Simple to start.<br />
            <span style={{ color: GOLD }}>Powerful from day one.</span>
          </h1>
          <p className="mt-6 max-w-lg font-sans text-sm leading-relaxed text-white/60">
            Four steps. Six months free. No commitment until you are ready.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px md:grid-cols-2" style={{ background: "#E6E8E8" }}>
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col gap-4 bg-surface px-8 py-10">
                <span
                  className="font-sans text-[9px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  {s.num}
                </span>
                <h2 className="font-display text-lg font-bold tracking-tight text-on-surface">
                  {s.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="bg-surface-container-low px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Live Demo
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: "1.05" }}
            >
              See the dashboard in action.
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface-variant">
              Explore live telemetry, alerts, and reporting in our demo environment before you commit to anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="https://cluck-insights-dashboard.lovable.app/" external>
                Try the demo
              </Button>
              <Button href="/contact" variant="secondary">
                Book a walkthrough
              </Button>
            </div>
          </div>
          <div className="overflow-hidden" style={{ border: "0.5px solid #E6E8E8" }}>
            <img
              src="/demo-app.gif"
              alt="SenseAgri AI dashboard preview"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: "1.05" }}
          >
            Ready to get started?
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface-variant">
            Sign up today — six months completely free, no commitment required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Sign Up Now
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:bg-surface-container"
              style={{ border: "0.5px solid rgba(0,46,53,0.3)" }}
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
