import type { Metadata } from "next";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import HeroSlideshow from "@/components/HeroSlideshow";
import { SignalIcon, BoltIcon, ChartIcon, ShieldIcon, LeafIcon, HeartIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SenseAgri AI delivers IoT and AI decision support for poultry farms. Monitor welfare, prevent losses, and act on ROI-focused insights."
};

// ─── Brand colours (used as inline styles where Tailwind purges) ─────────────
const PRIMARY = "#002E35";
const GOLD = "#D4AF37";
const NAVY = "#0F172A";

// ─── Pillar data ─────────────────────────────────────────────────────────────
const pillars = [
  {
    id: "01",
    label: "Sense",
    headline: "Full-spectrum barn visibility.",
    body: "LoRaWAN sensors and cameras stream temperature, humidity, flock sound, and welfare indicators — from every house, 24 hours a day.",
    Icon: SignalIcon,
    chips: ["Environmental sensors", "Vision tracking", "Sound monitoring"],
  },
  {
    id: "02",
    label: "Alert",
    headline: "AI that never sleeps.",
    body: "Edge AI detects anomalies instantly and pushes actionable alerts to your team — even during load shedding, with zero cloud dependency.",
    Icon: BoltIcon,
    chips: ["Edge-resilient", "Instant alerts", "Offline-capable"],
  },
  {
    id: "03",
    label: "Decide",
    headline: "Decisions backed by data.",
    body: "Dashboards, benchmarking, and weekly ROI reports translate every signal into your next best action — verified against your own farm baseline.",
    Icon: ChartIcon,
    chips: ["ROI reporting", "Benchmarking", "What-if simulations"],
  },
];

// ─── Proof stats ──────────────────────────────────────────────────────────────
const stats = [
  { value: "+41%", label: "Poultry Efficiency Factor lift", sub: "30-day pilot result" },
  { value: "3.1%", label: "Mortality reduction", sub: "Western Cape broiler farm" },
  { value: "14d",  label: "To first measurable impact", sub: "After sensor deployment" },
  { value: "2d",   label: "Install and go-live", sub: "Pilot kit, per house" },
];

// ─── What's included ─────────────────────────────────────────────────────────
const included = [
  { Icon: LeafIcon,   text: "Environmental sensors — temp, humidity, optional NH₃/CO₂" },
  { Icon: ShieldIcon, text: "Edge AI compute (Jetson-based) — local, load-shedding resilient" },
  { Icon: HeartIcon,  text: "PoE cameras — welfare and activity tracking" },
  { Icon: ChartIcon,  text: "Dashboard, alerts, and weekly ROI report" },
];

export default function HomePage() {
  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — dark, clean, one message
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">

        {/* Slideshow background */}
        <HeroSlideshow />

        {/* Strong dark overlay — text always wins */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,46,53,0.97) 0%, rgba(0,46,53,0.9) 35%, rgba(0,46,53,0.55) 65%, rgba(0,46,53,0.25) 85%, transparent 100%)"
          }}
        />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.06) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.06) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Content — sits at the bottom for cinematic weight */}
        <div className="relative z-10 w-full px-6 pb-16 pt-32 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">

            {/* Eyebrow */}
            <div className="hero-reveal mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(212,175,55,0.10)" }}
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  South Africa's Poultry Intelligence Platform
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-reveal delay-1 font-display font-extrabold tracking-tighter text-white"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)", lineHeight: "0.95", maxWidth: "14ch" }}
            >
              Know every barn.<br />
              <span style={{ color: GOLD }}>Reduce every loss.</span>
            </h1>

            {/* Sub */}
            <p
              className="hero-reveal delay-2 mt-6 font-sans text-white/70"
              style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "46ch" }}
            >
              Continuous sensing, edge AI alerts, and weekly ROI reports —
              engineered for South African poultry operations and resilient through load shedding.
            </p>

            {/* CTAs */}
            <div className="hero-reveal delay-3 mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary bg-white transition-colors duration-150 hover:bg-surface-container-low"
                style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
              >
                Start a 30-Day Pilot
              </a>
              <a
                href="/solution"
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white/8"
                style={{ border: "0.5px solid rgba(255,255,255,0.35)" }}
              >
                See the Platform →
              </a>
            </div>

            {/* Stats strip */}
            <div
              className="hero-reveal delay-4 mt-12 flex flex-wrap gap-x-10 gap-y-3 pt-8"
              style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)" }}
            >
              {[
                { v: "2-Day",   l: "Install" },
                { v: "14 Days", l: "To First Impact" },
                { v: "100%",    l: "Edge-Resilient" },
                { v: "30-Day",  l: "Pilot Programme" },
              ].map(({ v, l }) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-extrabold tracking-tight" style={{ color: GOLD }}>{v}</span>
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">{l}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PILLARS — Sense · Alert · Decide
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className="mb-5 inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  Platform
                </span>
              </span>
              <h2
                className="font-display font-extrabold tracking-tighter text-primary"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
              >
                From sensing to decisions.<br />Three steps.
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-on-surface-variant">
              A resilient stack designed for South African farms — capturing the right signals,
              processing them on-site, and delivering actions you can verify.
            </p>
          </div>

          {/* 3-column pillar grid */}
          <div className="grid gap-px md:grid-cols-3" style={{ background: "#E6E8E8" }}>
            {pillars.map((p) => (
              <div
                key={p.id}
                className="pillar-card group flex flex-col gap-6 px-8 py-10"
              >
                {/* Icon + ID row */}
                <div className="flex items-start justify-between">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center"
                    style={{ background: "rgba(0,46,53,0.06)", border: `0.5px solid rgba(0,46,53,0.14)` }}
                  >
                    <p.Icon className="h-7 w-7 text-primary" />
                  </span>
                  <span
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: GOLD }}
                  >
                    {p.id} · {p.label}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-on-surface">
                    {p.headline}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
                    {p.body}
                  </p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {p.chips.map((chip) => (
                    <span
                      key={chip}
                      className="font-sans text-[9px] font-bold uppercase tracking-[0.08em] px-2 py-1"
                      style={{
                        background: "rgba(0,46,53,0.07)",
                        color: PRIMARY,
                        border: "0.5px solid rgba(0,46,53,0.15)"
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROOF — key metrics on dark panel
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="grain relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16"
        style={{ background: NAVY }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.06) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.06) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">

          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className="mb-5 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
                style={{ background: "rgba(212,175,55,0.10)" }}
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  Pilot results
                </span>
              </span>
              <h2
                className="font-display font-extrabold tracking-tighter text-white"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
              >
                Numbers from the field.
              </h2>
            </div>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-white/50">
              Metrics from live pilot deployments across South African broiler and layer operations.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(255,255,255,0.06)" }}>
            {stats.map(({ value, label, sub }) => (
              <div
                key={label}
                className="flex flex-col gap-3 px-8 py-10"
                style={{ background: NAVY }}
              >
                <span
                  className="font-display font-extrabold tracking-tighter"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: GOLD, lineHeight: 1 }}
                >
                  {value}
                </span>
                <div>
                  <p className="font-sans text-sm font-medium text-white/80">{label}</p>
                  <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-white/35">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Link to case studies */}
          <div className="mt-8">
            <Link
              href="/case-studies"
              className="font-sans text-sm font-medium text-primary-light transition-colors duration-150 hover:text-white"
            >
              Read the pilot case studies →
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — pilot kit at a glance
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-surface-container-low px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">

          {/* Left — text */}
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                30-Day Pilot
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
            >
              Everything you need.<br />
              <span className="text-primary-light">Nothing you don't.</span>
            </h2>
            <p className="mt-5 font-sans text-sm leading-relaxed text-on-surface-variant">
              We install, configure, and run the pilot with shared KPIs. You get full visibility into
              the data and a clear ROI review at day 30 — so you decide on the next phase with confidence.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Register Pilot Interest
            </a>
          </div>

          {/* Right — included list */}
          <div className="flex flex-col gap-px" style={{ background: "#E6E8E8" }}>
            {included.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 bg-surface-container-lowest px-6 py-5 transition-colors duration-150 hover:bg-white"
              >
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center"
                  style={{ background: "rgba(0,46,53,0.07)", border: `0.5px solid rgba(0,46,53,0.14)` }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">{text}</p>
              </div>
            ))}
            {/* Footer row */}
            <div className="flex items-center justify-between bg-primary px-6 py-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">
                Weekly performance review included
              </span>
              <span className="font-display text-sm font-bold text-tertiary">30 days ↗</span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIAL — single strong quote
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">

            {/* Left — label */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <span
                  className="mb-6 inline-flex items-center gap-2 px-3 py-1"
                  style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
                >
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                    Pilot stories
                  </span>
                </span>
                <h2
                  className="font-display font-extrabold tracking-tighter text-primary"
                  style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
                >
                  Early partners are proving impact before scaling.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="font-sans text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-light"
              >
                View pilot case studies →
              </Link>
            </div>

            {/* Right — featured testimonial */}
            <div
              className="flex flex-col justify-between gap-8 px-8 py-8"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.03)" }}
            >
              <p
                className="font-display font-semibold tracking-tight text-on-surface"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: "1.35" }}
              >
                "We finally have one source of truth for barn conditions and response actions.
                The alerts helped us respond to ventilation drops before bird stress escalated."
              </p>
              <div style={{ borderTop: "0.5px solid #BEC8CA", paddingTop: "1rem" }}>
                <p className="font-display text-sm font-semibold text-on-surface">Pilot Manager</p>
                <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  Operations · Large Poultry Group
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — dark, focused
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="grain relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
        style={{ background: PRIMARY }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.08) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)"
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <LogoMark className="h-14 w-14 mx-auto mb-8" />

          <span
            className="mb-8 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
            style={{ background: "rgba(212,175,55,0.10)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
              30-Day Pilot Programme
            </span>
          </span>

          <h2
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: "0.95" }}
          >
            Start measuring.<br />
            <span style={{ color: GOLD }}>Stop guessing.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/60">
            A focused 30-day deployment with shared KPIs and a clear ROI review.
            Decide on the next phase with full confidence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
              style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Pilot Call
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:bg-white/5"
              style={{ border: "0.5px solid rgba(255,255,255,0.3)" }}
            >
              See How It Works
            </a>
          </div>

          {/* Tagline */}
          <p className="mt-12 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
            Every signal. Every decision.
          </p>
        </div>
      </section>

    </div>
  );
}
