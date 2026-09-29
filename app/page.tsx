import type { Metadata } from "next";
import LogoMark from "@/components/LogoMark";
import HeroSlideshow from "@/components/HeroSlideshow";
import SignalToDecision from "@/components/SignalToDecision";
import IntelligenceField from "@/components/IntelligenceField";
import WhatYouGet from "@/components/WhatYouGet";
import ImpactSlider, { type ImpactStory } from "@/components/ImpactSlider";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

// ─── Brand colours (used as inline styles where Tailwind purges) ─────────────
const GOLD = "#58C9C5";

// ─── Stats strip ───────────────────────────────────────────────────────────
const statsStrip = [
  { v: "−20%", l: "Loss events" },
  { v: "Peak", l: "HPED maintained" },
  { v: "Early", l: "Disease detection" },
  { v: "Smarter", l: "Daily management" }
];

// ─── POC impact stories ────────────────────────────────────────────────────
const impactStories: ImpactStory[] = [
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
    body: "Your controller handles the alarms. SenseAgri tells you how every house is trending, so you know what's coming before you're back on the farm."
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

            {/* Eyebrow */}
            <div className="hero-reveal mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(88,201,197,0.10)" }}
              >
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tertiary">
                  South Africa&apos;s Poultry Intelligence Platform
                </span>
              </span>
            </div>

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

      {/* Answer-first lede — keyword-bearing H2 + plain-language definition, dark band flows into stats strip */}
      <div className="px-6 sm:px-10 lg:px-16" style={{ paddingTop: 32, paddingBottom: 28, background: "linear-gradient(105deg, #002E35 0%, #003F4A 58%, #087C83 145%)" }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="font-display font-bold tracking-tight text-white/90"
            style={{ fontSize: "1.05rem", lineHeight: 1.35, maxWidth: "60ch" }}
          >
            AI poultry intelligence for your farm.
          </h2>
          <p className="mt-3 font-sans text-white/70 leading-relaxed" style={{ fontSize: "0.9375rem", maxWidth: "68ch" }}>
            SenseAgri AI is a poultry intelligence platform for your farm. Your farm data becomes intelligence that keeps getting better — understanding what makes your farm productive, preventing losses, recording your actions, updating records, managing tasks on the farm, and tuning set points on your existing control systems. Less labour. Less expense. More time to grow your business.
          </p>
        </div>
      </div>

      {/* Stats strip — petrol band, gold values */}
      <div className="px-6 sm:px-10 lg:px-16" style={{ paddingTop: 18, paddingBottom: 18, borderBottom: "0.5px solid rgba(88,201,197,0.22)", background: "linear-gradient(105deg, #002E35 0%, #003F4A 68%, rgba(8,124,131,0.96) 145%)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
          {statsStrip.map(({ v, l }) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="font-display font-extrabold tracking-tight" style={{ fontSize: "1.2rem", color: GOLD }}>{v}</span>
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INSIDE THE PLATFORM — sensing → dashboard → whatsapp → reports
      ═══════════════════════════════════════════════════════════════════ */}
      <WhatYouGet />

      {/* ═══════════════════════════════════════════════════════════════════
          POC STORIES + IMPACT SLIDER
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
        style={{
          background: "radial-gradient(ellipse 65% 75% at 88% 18%, rgba(88,201,197,0.18) 0%, rgba(166,226,223,0.08) 34%, transparent 68%), linear-gradient(135deg, #F8FAFA 0%, #F2F7F7 52%, #EAF5F4 100%)",
          padding: "clamp(64px, 6vw, 104px) 24px",
          borderTop: "0.5px solid #BEC8CA"
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,46,53,0.04) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,46,53,0.04) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <IntelligenceField className="pointer-events-none absolute -right-24 top-0 h-[70%] w-[62%] opacity-[0.14]" />
        <div className="intelligence-mist pointer-events-none absolute -right-[10%] top-[2%] h-[58%] w-[52%]" />
        <div className="relative mx-auto max-w-6xl reveal">

          {/* Header (left-aligned) */}
          <div className="mb-7 flex flex-col gap-3">
            <span
              className="inline-flex items-center gap-2 self-start px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                POC stories
              </span>
            </span>
            <h2
              className="font-display font-semibold text-primary"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.08", letterSpacing: "-0.022em", maxWidth: "20ch" }}
            >
              What POC partners are seeing.
            </h2>
          </div>

          {/* Centered quote */}
          <div
            className="text-center"
            style={{ maxWidth: "56rem", margin: "0 auto 36px", padding: "26px 24px", borderTop: `0.5px solid ${GOLD}`, borderBottom: `0.5px solid ${GOLD}` }}
          >
            <p
              className="font-display font-semibold tracking-tight"
              style={{ color: "#191C1D", fontSize: "clamp(1.1rem, 2vw, 1.45rem)", lineHeight: "1.4", marginBottom: 14 }}
            >
              &ldquo;We finally have one source of truth for barn conditions and response actions.
              The alerts helped us respond to ventilation drops before bird stress escalated.&rdquo;
            </p>
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#6B7C80" }}>
              POC Manager · Operations · Large Poultry Group
            </div>
          </div>

          {/* Impact slider */}
          <ImpactSlider stories={impactStories} />
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

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.10em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
              style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Demo
            </a>
            <a
              href="/solution"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.10em] text-white transition-colors duration-150 hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
            >
              See the System
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
