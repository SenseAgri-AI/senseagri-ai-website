import type { Metadata } from "next";
import LogoMark from "@/components/LogoMark";
import HeroSlideshow from "@/components/HeroSlideshow";
import WhatYouGet from "@/components/WhatYouGet";
import ImpactSlider, { type ImpactStory } from "@/components/ImpactSlider";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SenseAgri AI delivers IoT and AI decision support for poultry farms. Monitor welfare, prevent losses, and act on ROI-focused insights."
};

// ─── Brand colours (used as inline styles where Tailwind purges) ─────────────
const PRIMARY = "#002E35";
const GOLD = "#D4AF37";

// ─── Stats strip ───────────────────────────────────────────────────────────
const statsStrip = [
  { v: "−20%", l: "Loss events" },
  { v: "Peak", l: "HPED maintained" },
  { v: "Early", l: "Disease detection" },
  { v: "Smarter", l: "Daily management" }
];

// ─── Pilot impact stories ────────────────────────────────────────────────────
const impactStories: ImpactStory[] = [
  {
    tag: "Feed Efficiency",
    title: "Caught a 20% production dip before it happened.",
    body: "Our AI predicted a major feed-efficiency reduction event caused by a feed change — flagged early enough to act, avoiding an estimated 20% production dip over two months."
  },
  {
    tag: "HPED Stability",
    title: "Held HPED above standard for prolonged periods.",
    body: "AI-guided ventilation and feeding adjustments held production above industry standard across pilot houses — not just briefly, but sustained."
  },
  {
    tag: "Remote Oversight",
    title: "Peace of mind when off the farm.",
    body: "Continuous remote tracking gives farmers complete visibility — every house, every signal, wherever they are. The farm is never out of sight."
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
        <div className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">

            {/* Eyebrow */}
            <div className="hero-reveal mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(212,175,55,0.10)" }}
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  South Africa&apos;s Poultry Intelligence Platform
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-reveal delay-1 font-display font-extrabold tracking-tighter text-white"
              style={{ fontSize: "clamp(2.35rem, 5.5vw, 5.2rem)", lineHeight: "0.97", maxWidth: "14ch" }}
            >
              Know Your Flock.<br />
              <span style={{ color: GOLD }}>Know Your Farm.</span>
            </h1>

            {/* Sub */}
            <p
              className="hero-reveal delay-2 mt-6 font-sans text-white/70"
              style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "46ch" }}
            >
              Continuous sensing, causal AI, and weekly ROI reports — so you
              understand why, not just what.
            </p>

            {/* CTAs */}
            <div className="hero-reveal delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary bg-white transition-colors duration-150 hover:bg-surface-container-low sm:w-auto"
                style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
              >
                Sign Up For Our Free Pilot
              </a>
              <a
                href="/solution"
                className="inline-flex w-full items-center justify-center px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white/10 sm:w-auto"
                style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
              >
                See the Platform →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Stats strip — petrol band, gold values */}
      <div className="bg-primary px-6 sm:px-10 lg:px-16" style={{ paddingTop: 18, paddingBottom: 18, borderBottom: "0.5px solid rgba(212,175,55,0.18)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
          {statsStrip.map(({ v, l }) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="font-display font-extrabold tracking-tight" style={{ fontSize: "1.2rem", color: GOLD }}>{v}</span>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-white/65">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INSIDE THE PLATFORM — sensing → dashboard → whatsapp → reports
      ═══════════════════════════════════════════════════════════════════ */}
      <WhatYouGet />

      {/* ═══════════════════════════════════════════════════════════════════
          PILOT STORIES + IMPACT SLIDER
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
        style={{ background: "#F2F4F4", padding: "clamp(64px, 6vw, 104px) 24px", borderTop: "0.5px solid #BEC8CA" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,46,53,0.04) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,46,53,0.04) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="relative mx-auto max-w-6xl reveal">

          {/* Header (left-aligned) */}
          <div className="mb-7 flex flex-col gap-3">
            <span
              className="inline-flex items-center gap-2 self-start px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Pilot stories
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05", maxWidth: "20ch" }}
            >
              What pilot partners are seeing.
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
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#6B7C80" }}>
              Pilot Manager · Operations · Large Poultry Group
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

        <div className="relative z-10 mx-auto max-w-4xl text-center reveal">
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
            Stop guessing.<br />
            <span style={{ color: GOLD }}>Start measuring.</span>
          </h2>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
              style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Book a Pilot Call
            </a>
            <a
              href="/solution"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:bg-white/10"
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
