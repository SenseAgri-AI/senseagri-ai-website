"use client";

import { useEffect, useState } from "react";

// Auto-advancing image carousel for the WhatsApp screenshots on the About page.
// Pauses on hover/focus and respects prefers-reduced-motion.

const G = "#D4AF37";

export type WhatsAppShot = {
  src: string;
  alt: string;
};

export default function WhatsAppCarousel({
  images,
  interval = 2800,
  dark = false
}: {
  images: WhatsAppShot[];
  interval?: number;
  dark?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = images.length;
  const go = (i: number) => setIdx((i + max) % max);

  useEffect(() => {
    if (paused || max <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % max), interval);
    return () => clearInterval(t);
  }, [paused, max, interval, idx]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Slot takes the remaining space above the controls — caller's wrapper controls overall height. */}
      <div
        style={{
          position: "relative",
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden"
        }}
      >
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              // contain = no cropping. Letterbox area is transparent so the dark Our story
              // background shows through it — no visible "white space" frame.
              objectFit: "contain",
              // Teal-tint + slight fade so the screenshots feel like part of the dark
              // section atmosphere instead of raw bright WhatsApp screenshots floating on top.
              filter: "saturate(0.45) sepia(0.45) hue-rotate(150deg) brightness(0.78) contrast(1.05)",
              opacity: i === idx ? 0.92 : 0,
              // Active image rests at translateX(0); idle/exiting images sit ~48px to the left,
              // so the entering shot glides rightward into place while the previous one drifts off left.
              transform: i === idx ? "translateX(0)" : "translateX(-48px)",
              transition: "opacity 600ms ease-out, transform 760ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              zIndex: i === idx ? 1 : 0,
              willChange: "transform, opacity"
            }}
          />
        ))}
      </div>

      {/* Controls — dot pills + counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
          gap: 8
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Show screenshot ${i + 1}`}
            style={{
              width: i === idx ? 32 : 8,
              height: 3,
              background: i === idx ? G : dark ? "rgba(255,255,255,0.28)" : "rgba(0,46,53,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 220ms ease, background 220ms ease"
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 16,
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: dark ? "rgba(255,255,255,0.5)" : "#6B7C80"
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(max).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
