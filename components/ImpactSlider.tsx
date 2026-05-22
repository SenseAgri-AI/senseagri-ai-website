"use client";

import { useState, useEffect } from "react";

const P = "#002E35";
const G = "#D4AF37";

export type ImpactStory = {
  tag: string;
  title: string;
  body: string;
};

export default function ImpactSlider({
  stories,
  interval = 3800
}: {
  stories: ImpactStory[];
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = stories.length;
  const go = (i: number) => setIdx((i + max) % max);

  // Auto-advance — pauses on hover/focus and respects reduced-motion.
  // `idx` in deps means manual navigation resets the countdown.
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % max), interval);
    return () => clearInterval(t);
  }, [paused, max, interval, idx]);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="impact-viewport"
        style={{ overflow: "hidden", border: "0.5px solid #BEC8CA", background: "#fff" }}
        aria-live="off"
      >
        <div
          className="impact-track"
          style={{
            display: "flex",
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(-${idx * 100}%)`
          }}
        >
          {stories.map((s, i) => (
            <div
              key={i}
              className="impact-slide"
              style={{ flex: "0 0 100%", display: "grid", alignItems: "start" }}
            >
              <div
                className="impact-numeral"
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 800,
                  fontSize: 88,
                  color: G,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em"
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: P,
                    marginBottom: 14,
                    borderLeft: `2px solid ${G}`,
                    paddingLeft: 10
                  }}
                >
                  {s.tag}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.4rem, 2.4vw, 1.95rem)",
                    color: P,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: 16
                  }}
                >
                  {s.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "#3F4849",
                    maxWidth: "56ch"
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to story ${i + 1}`}
              style={{
                width: i === idx ? 32 : 8,
                height: 3,
                background: i === idx ? G : "rgba(0,46,53,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 220ms ease, background 220ms ease"
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#6B7C80",
              marginLeft: 16
            }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(max).padStart(2, "0")}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => go(idx - 1)}
            aria-label="Previous story"
            style={{
              width: 44,
              height: 44,
              background: "#fff",
              border: "0.5px solid #BEC8CA",
              color: P,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-inter), sans-serif"
            }}
          >
            ←
          </button>
          <button
            onClick={() => go(idx + 1)}
            aria-label="Next story"
            style={{
              width: 44,
              height: 44,
              background: P,
              color: "#fff",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `inset 0 -2px 0 0 ${G}`,
              fontFamily: "var(--font-inter), sans-serif"
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
