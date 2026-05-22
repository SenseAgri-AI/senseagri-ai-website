import type { ReactNode } from "react";

// Shared inner-page hero — petrol/navy background, blueprint grid, eyebrow + headline.
// `accent` drives the headline <span>, the eyebrow border, eyebrow text, and eyebrow tint.
// Default accent is gold (#D4AF37); pass light teal (#4FB8C5) for Solution / About.

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";
const NAVY = "#0F172A";

type PageHeroProps = {
  eyebrow: string;
  headline: ReactNode;
  accentLine: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  accent?: string;
};

export default function PageHero({
  eyebrow,
  headline,
  accentLine,
  sub,
  dark = false,
  accent = GOLD
}: PageHeroProps) {
  const bg = dark ? NAVY : PRIMARY;
  const tint =
    accent === GOLD ? "rgba(212,175,55,0.10)" : "rgba(79,184,197,0.12)";

  return (
    <section
      className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
      style={{ background: bg }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <span
          className="mb-5 inline-flex items-center gap-2 px-3 py-1"
          style={{ borderLeft: `2px solid ${accent}`, background: tint }}
        >
          <span
            className="font-sans text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </span>
        </span>

        <h1
          className="font-display font-extrabold text-white"
          style={{
            fontSize: "clamp(2.1rem, 5vw, 4rem)",
            lineHeight: "1.0",
            letterSpacing: "-0.02em",
            maxWidth: "18ch"
          }}
        >
          {headline}
          <br />
          <span style={{ color: accent }}>{accentLine}</span>
        </h1>

        {sub ? (
          <p
            className="mt-5 font-sans text-white/70"
            style={{ fontSize: "0.9375rem", lineHeight: "1.6", maxWidth: 520 }}
          >
            {sub}
          </p>
        ) : null}
      </div>
    </section>
  );
}
