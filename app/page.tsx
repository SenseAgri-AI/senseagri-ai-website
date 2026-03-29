import type { Metadata } from "next";
import Link from "next/link";
import SolutionScroll from "@/components/SolutionScroll";
import OutcomesSection from "@/components/OutcomesSection";
import FAQAccordion from "@/components/FAQAccordion";
import SectionHeader from "@/components/SectionHeader";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SenseAgri AI delivers IoT and AI decision support for poultry farms. Monitor welfare, prevent losses, and act on ROI-focused insights."
};

const faqs = [
  {
    question: "What hardware is installed on site?",
    answer:
      "A LoRaWAN gateway, environmental sensors, optional PoE cameras, and an edge AI box for local processing. Exact kits are tailored per house."
  },
  {
    question: "Does it work with limited connectivity?",
    answer:
      "Yes. Edge processing keeps core alerts running, and data buffers offline until connectivity is restored."
  },
  {
    question: "Who owns the data?",
    answer:
      "Your farm retains ownership of all operational data. We only process it to provide the service."
  },
  {
    question: "How long does installation take?",
    answer:
      "Most pilot installs are completed in 1-2 days, including baseline calibration."
  },
  {
    question: "How is pricing structured?",
    answer:
      "Hardware plus a monthly platform subscription. We start with a 30-day pilot to prove value."
  },
  {
    question: "How do you handle power outages?",
    answer:
      "Critical components include UPS options and edge buffering to protect continuity during outages."
  },
  {
    question: "What about privacy and farm security?",
    answer:
      "Role-based access, encrypted transport, and configurable camera zones protect sensitive areas."
  },
  {
    question: "What support is included?",
    answer:
      "Remote monitoring, alert tuning, and weekly performance reviews during the pilot."
  }
];

export default function HomePage() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-surface px-6 py-16 sm:px-10 lg:px-16">
        {/* Full-bleed hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "60% center" }}
          src="/Gemini_Generated_Image_e0s5hge0s5hge0s5 (1).png"
          alt=""
          aria-hidden="true"
        />

        {/* Left-to-right gradient veil — keeps text legible, reveals image on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(248,250,250,0.92) 0%, rgba(248,250,250,0.75) 35%, rgba(248,250,250,0.3) 60%, transparent 100%)"
          }}
        />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,46,53,0.05) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,46,53,0.05) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-xl space-y-7">

            <h1 className="hero-reveal delay-1 font-display font-extrabold leading-[0.92] tracking-tighter text-primary"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
              Farm intelligence.<br />
              <span className="text-primary-light">Measurable</span> outcomes.
            </h1>

            <p className="hero-reveal delay-2 max-w-sm font-sans text-title-sm text-on-surface-variant">
              Real-time telemetry, welfare monitoring, and decision support built for South African poultry operations.
            </p>

            <div className="hero-reveal delay-3 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary font-sans text-title-sm font-medium text-white transition-colors duration-150 hover:bg-primary-container"
                style={{ boxShadow: "inset 0 -0.5px 0 0 #D4AF37" }}
              >
                Book a Pilot Call
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center px-5 py-2.5 font-sans text-title-sm font-medium text-primary transition-colors duration-150 hover:bg-primary/5"
                style={{ border: "0.5px solid rgba(0,46,53,0.4)" }}
              >
                See How It Works
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Statement ─── */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left — text + chicken */}
            <div>
              <span className="inline-flex items-center gap-2 border-l-2 border-tertiary bg-surface-container px-3 py-1 mb-8">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  AI Operating System · Poultry Intelligence
                </span>
              </span>

              <h2
                className="font-display font-extrabold tracking-tighter text-primary"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: "1.0" }}
              >
                Stop guessing.<br />
                <span className="text-primary-light">Control your farm.</span>
              </h2>

              <p className="mt-6 font-sans text-title-sm leading-relaxed text-on-surface-variant">
                A state-of-the-art husbandry AI operating system built for South African poultry — giving you complete visibility to perform consistently, scale confidently, and compound gains across every house.
              </p>

            </div>

            {/* Right — chicken */}
            <div className="flex items-center justify-center">
              <video
                src="/Animated_Chicken_Pecking_Ground.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                className="w-full max-w-lg object-contain mix-blend-multiply"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ─── Cinematic video break ─── */}
      {/* Full-viewport section — video plays in background as user scrolls through */}
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/Create_a_high-definition_anima_Kling_O3_08830.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Subtle top + bottom fade so the section blends into neighbours */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248,250,250,1) 0%, transparent 18%, transparent 82%, rgba(248,250,250,1) 100%)"
          }}
        />
        {/* Dim veil + blueprint grid */}
        <div className="absolute inset-0 pointer-events-none bg-secondary/25" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </section>

      {/* ─── Solution pillars — sticky scroll ─── */}
      <SolutionScroll />

      {/* ─── Outcomes ─── */}
      <OutcomesSection />

      {/* ─── Testimonials ─── */}
      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Pilot stories"
            title="Early partners are using SenseAgri AI to validate impact."
            subtitle="Join the pilot program to measure improvements before scaling across the farm group."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="We finally have one source of truth for barn conditions and response actions."
              name="Pilot Manager"
              role="Operations"
              company="Large Poultry Group"
            />
            <TestimonialCard
              quote="The alerts helped our team respond to ventilation drops before bird stress escalated."
              name="Farm Owner"
              role="Director"
              company="Broiler Farm"
            />
            <TestimonialCard
              quote="Weekly ROI reports helped us quantify energy and mortality improvements within a month."
              name="Production Lead"
              role="Layer Division"
              company="Regional Agribusiness"
            />
          </div>
          <div className="mt-8 font-sans text-title-sm text-on-surface-variant">
            Pilot program available now.{" "}
            <Link className="link-underline" href="/contact">Book a call</Link>
            {" "}to reserve a slot.
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers for farm owners and integrators."
            subtitle="Short, direct responses to the questions we hear most often."
          />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ─── Dark CTA breakout ─── */}
      <section className="grain relative overflow-hidden bg-secondary py-24 px-6 sm:px-10 lg:px-16">
        {/* Blueprint grid at low opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Subtle teal radial glow top-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 10% 50%, rgba(0,46,53,0.6) 0%, transparent 60%)"
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 border-l-2 border-tertiary bg-primary px-3 py-1 mb-8">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              30-Day Pilot Programme
            </span>
          </span>

          <h2
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: "0.95" }}
          >
            Start measuring.<br />
            <span className="text-tertiary">Stop guessing.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-sans text-title-sm leading-relaxed text-white/60">
            A focused deployment with shared KPIs and a clear ROI review — so you can decide on the next phase with full confidence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary — white + gold bottom border */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors duration-150 hover:bg-surface-container-low"
              style={{ boxShadow: "inset 0 -2px 0 0 #D4AF37" }}
            >
              Start a Pilot
            </a>
            {/* Ghost — white hairline outline */}
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:bg-white/5"
              style={{ border: "0.5px solid rgba(255,255,255,0.35)" }}
            >
              See How It Works
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {[
              { value: "2-Day",  label: "Install" },
              { value: "30-Day", label: "Pilot" },
              { value: "100%",   label: "Edge-Resilient" },
              { value: "99.9%",  label: "Uptime" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold tracking-tighter text-white">{value}</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
