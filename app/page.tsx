import type { Metadata } from "next";
import LogoMark from "@/components/LogoMark";
import HeroSlideshow from "@/components/HeroSlideshow";
import SignalToDecision from "@/components/SignalToDecision";
import Link from "next/link";
import IntelligenceField from "@/components/IntelligenceField";
import WhatYouGet from "@/components/WhatYouGet";
import WorksWithController from "@/components/home/WorksWithController";
import HowTheAIThinks from "@/components/home/HowTheAIThinks";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

// ─── Brand colours (used as inline styles where Tailwind purges) ─────────────
const GOLD = "#58C9C5";

// ─── Outcome pillars (brief 3.4) ──────────────────────────────────────────────
// The old metrics row ("−20% Loss events" etc.) is held until Ryan confirms it
// is backed by POC data (brief section 9, item 1). Until then, plain pillars.
const pillars = [
  "More output from the same feed",
  "Fewer losses, caught earlier",
  "Less spent on energy, feed and water"
];

// ─── POC impact stories ────────────────────────────────────────────────────
const impactStories: { tag: string; title: string; body: string }[] = [
  {
    tag: "Feed Efficiency",
    title: "Caught a 20% production dip before it happened.",
    body: "Our AI predicted a major feed-efficiency reduction event caused by a feed change — flagged early enough to act, avoiding an estimated 20% production dip over two months."
  },
  {
    tag: "HPED Stability",
    title: "Held HPED above standard for prolonged periods.",
    body: "AI-guided ventilation and feeding adjustments held production above industry standard across POC houses — not just briefly, but sustained."
  },
  {
    tag: "Remote Oversight",
    title: "Peace of mind when off the farm.",
    body: "Your controller keeps every house running. SenseAgri adds how each one is trending, so you know what's coming before you're back on the farm."
  },
  {
    tag: "Executive View",
    title: "Quick, automated feedback for executives.",
    body: "Weekly automated executive reports give leadership the operational truth — production, performance, and ROI — without weekly status meetings."
  },
  {
    tag: "Temperature ROI",
    title: "Caught accumulated losses from temperature drift.",
    body: "Our AI tracked profit loss from gradual temperature changes — the small, recurring losses that compound silently month over month and never show up in spot checks."
  },
  {
    tag: "Efficiency Audit",
    title: "Exposed hidden infrastructure flaws.",
    body: "Is your internal environment really insulated from external swings? How much energy is going into managing your flock? Our AI calculates a full poultry efficiency factor."
  }
];

export default function HomePage() {
  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — dark, clean, one message
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">

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

        {/* Layered teal light connects the physical photography to the intelligence field. */}
        <div className="hero-intelligence-wash pointer-events-none absolute inset-0 z-[1]" />
        <div className="intelligence-mist intelligence-mist-dark pointer-events-none absolute -right-[8%] top-[10%] z-[1] h-[72%] w-[58%]" />

        <IntelligenceField dark className="pointer-events-none absolute inset-y-0 right-0 z-[1] h-full w-[68%] opacity-[0.28]" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,124,131,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Content — sits at the bottom for cinematic weight */}
        <div className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">

            {/* Headline */}
            <h1
              className="hero-reveal delay-1 font-display font-bold text-white"
              style={{ fontSize: "clamp(2.35rem, 5.5vw, 5.2rem)", lineHeight: "0.98", letterSpacing: "-0.028em", maxWidth: "14ch" }}
            >
              Intelligence<br />
              <span className="intelligence-text-gradient">for your farm.</span>
            </h1>

            {/* Sub */}
            <p
              className="hero-reveal delay-2 mt-6 font-sans text-white/70"
              style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "46ch" }}
            >
              Insight to see the problem before it costs you, and the
              confidence to act — through precision AI farming.
            </p>

            <p
              className="hero-reveal delay-2 mt-3 font-sans text-white/55"
              style={{ fontSize: "0.875rem", lineHeight: "1.5", maxWidth: "46ch" }}
            >
              Built on the data your farm already collects. No new hardware to start.
            </p>

            {/* CTAs */}
            <div className="hero-reveal delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary bg-white transition-colors duration-150 hover:bg-surface-container-low sm:w-auto"
                style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
              >
                Book a Demo
              </a>
              <a
                href="#signal"
                className="inline-flex w-full items-center justify-center px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-white/10 sm:w-auto"
                style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
              >
                See how the AI thinks →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SIGNAL — your data in, one clear answer out
      ═══════════════════════════════════════════════════════════════════ */}
      <SignalToDecision />

      {/* 3.3 — Works with your controller: we get more out of its data */}
      <WorksWithController />

      {/* 3.4 — Intro: answer-first definition, pillars inline (no stat banner) */}
      <section aria-labelledby="intro-title" className="bg-surface px-6 pb-20 pt-14 sm:px-10 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12 lg:gap-10">
          <h2
            id="intro-title"
            className="font-display font-semibold text-primary lg:col-span-4"
            style={{ fontSize: "clamp(1.35rem, 2vw, 1.65rem)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
          >
            AI poultry intelligence for your farm.
          </h2>
          <div className="lg:col-span-8">
            <p className="max-w-[68ch] font-sans text-on-surface-variant" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              SenseAgri AI is a poultry intelligence platform for your farm. Your farm data becomes intelligence that keeps getting better — understanding what makes your farm productive, preventing losses, recording your actions, updating records, managing tasks on the farm, and tuning set points on your existing control systems. Less labour. Less expense. More time to grow your business.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {pillars.map((p) => (
                <li key={p} className="flex items-center gap-2 font-sans text-[15px] font-medium text-primary">
                  <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-sensing" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3.5 — How the AI thinks (01) with the dashboard as step 04's output (02) */}
      <HowTheAIThinks />

      {/* 3.6 WhatsApp (03) and 3.7 Weekly reports (04) */}
      <WhatYouGet />

      {/* 3.8 — POC stories: editorial list with numbered hairline dividers */}
      <section aria-labelledby="poc-title" className="bg-surface px-6 py-20 sm:px-10 lg:px-16 lg:py-28" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sensing">POC stories</p>
              <h2
                id="poc-title"
                className="mt-4 font-display font-bold text-primary"
                style={{ fontSize: "clamp(1.9rem, 3vw, 2.5rem)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
              >
                What POC partners are seeing.
              </h2>
            </div>
            <figure className="lg:col-span-8">
              <blockquote
                className="font-display font-semibold text-on-surface"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)", lineHeight: 1.4, letterSpacing: "-0.01em", hangingPunctuation: "first" }}
              >
                <span className="-ml-[0.45em]">&ldquo;</span>We finally have one source of truth for barn conditions and response actions.
                The alerts helped us respond to ventilation drops before bird stress escalated.&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-outline">
                POC Manager · Operations · Large Poultry Group
              </figcaption>
            </figure>
          </div>

          <ol className="mt-14 grid gap-x-12 md:grid-cols-2">
            {impactStories.map((s, i) => (
              <li key={s.title} className="hairline-t py-7">
                <p className="flex gap-3 font-mono text-[10.5px] uppercase tracking-[0.1em]">
                  <span className="text-outline">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sensing">{s.tag}</span>
                </p>
                <h3 className="mt-3 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-primary">{s.title}</h3>
                <p className="mt-2 max-w-[52ch] font-sans text-[15px] leading-relaxed text-on-surface-variant">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3.9 — Add more senses: compact sensors teaser, deliberately low and small */}
      <section aria-labelledby="senses-title" className="bg-surface-container-low px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sensing">Optional add-on</p>
            <h2
              id="senses-title"
              className="mt-3 font-display font-semibold text-primary"
              style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
            >
              Want the AI to hear and see your birds too?
            </h2>
            <p className="mt-3 max-w-[64ch] font-sans text-[15px] leading-relaxed text-on-surface-variant">
              Controllers record climate and production. Our microphones and cameras add what they don&apos;t measure: coughing,
              distress calls, changes in how birds move and bunch. These signs often show days before they reach the numbers.
              With our sensors in your houses, we monitor 24/7 as well, with the AI on top. We&apos;re hardware-agnostic. Use
              sensors from any vendor, or we supply them at the lowest cost possible.
            </p>
            <Link href="/sensors" className="link-underline mt-5 inline-flex font-sans text-[15px] font-medium text-primary">
              Explore sensors →
            </Link>
          </div>
          <figure className="md:col-span-5 lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/install.jpeg"
              alt="Engineer mounting a sensor gateway on the wall inside a poultry house"
              className="aspect-[4/3] w-full object-cover"
              style={{ filter: "saturate(0.85) contrast(1.02)" }}
              loading="lazy"
            />
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-outline">
              Gateway install, poultry house
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 3.10 — Your data stays yours */}
      <section aria-labelledby="trust-title" className="bg-surface px-6 py-16 sm:px-10 lg:px-16 lg:py-20" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sensing">Your data</p>
          <p id="trust-title" className="mt-4 font-display font-semibold text-primary" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Your data stays yours.
          </p>
          <p className="mt-4 max-w-[62ch] font-sans text-[1.0625rem] leading-relaxed text-on-surface-variant">
            We only use anonymised, combined data, never sold and never handed to anyone else, to keep the AI getting smarter
            for every farm on the system.
          </p>
          <Link href="/faq" className="link-underline mt-6 inline-flex font-sans text-[15px] font-medium text-primary">
            Read the FAQ →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — dark, focused
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="grain relative overflow-hidden px-6 py-20 md:py-28 sm:px-10 lg:px-16"
        style={{ background: "radial-gradient(ellipse 62% 105% at 82% 42%, rgba(19,170,165,0.23) 0%, rgba(8,124,131,0.12) 35%, transparent 72%), linear-gradient(120deg, #0F172A 0%, #002E35 52%, #003F4A 100%)" }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,124,131,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.08) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <IntelligenceField dark className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]" />
        <div className="intelligence-mist intelligence-mist-dark pointer-events-none absolute -right-[6%] top-[6%] h-[88%] w-[54%]" />

        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(88,201,197,0.09) 0%, transparent 70%)"
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center reveal">
          <LogoMark className="h-14 w-14 mx-auto mb-8" />

          <span
            className="mb-8 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
            style={{ background: "rgba(88,201,197,0.10)" }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tertiary">
              POC Programme
            </span>
          </span>

          <h2
            className="font-display font-semibold tracking-[-0.025em] text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: "0.95" }}
          >
            Stop guessing.<br />
            <span className="intelligence-text-gradient">Start measuring.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[52ch] font-sans text-white/75" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            We&apos;re taking on a small number of POC farms. Free while we build it on your farm&apos;s data, then a discounted
            rate once it&apos;s proven on your farm.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.10em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
              style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Demo
            </a>
            <a
              href="/contact?topic=poc"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.10em] text-white transition-colors duration-150 hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
            >
              Become a POC farm
            </a>
          </div>

          {/* Tagline */}
          <p className="mt-10 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Every signal. Every decision.
          </p>
        </div>
      </section>

    </div>
  );
}
