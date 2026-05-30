"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode, ReactElement } from "react";
import LogoMark from "@/components/LogoMark";

// "Inside the platform" — Sensing (wheel) → Dashboard+AI → WhatsApp Alerts (dark) → Weekly Reports → Integrations
// NOTE: the dashboard / phone / report mockups are illustrative representations of the
// live SenseAgri client app — swap with real screenshots when available.

const P = "#002E35";
const G = "#D4AF37";
const N = "#0F172A";
const TEAL = "#2A8E9A";

// ── Eyebrow ──────────────────────────────────────────────────────────────────
function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px",
        borderLeft: `2px solid ${G}`,
        background: dark ? "rgba(212,175,55,0.10)" : "rgba(0,46,53,0.06)",
        marginBottom: 14
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: dark ? G : P
        }}
      >
        {children}
      </span>
    </span>
  );
}

// ── Sensor icons (10 channels) ────────────────────────────────────────────────
function SI({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="19"
      height="19"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SENSORS: { Icon: () => ReactElement; label: string }[] = [
  { Icon: () => (<SI><path d="M14 14V4a2 2 0 0 0-4 0v10a4 4 0 1 0 4 0z" /><path d="M12 7v8" /></SI>), label: "Temperature" },
  { Icon: () => (<SI><path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z" /></SI>), label: "Humidity" },
  { Icon: () => (<SI><circle cx="12" cy="12" r="3.5" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" /></SI>), label: "Lighting" },
  { Icon: () => (<SI><path d="M12 3l9 17H3z" /><path d="M12 10v5M12 18h.01" /></SI>), label: "Harmful gases" },
  { Icon: () => (<SI><path d="M7 16a4 4 0 0 1 0-8 5 5 0 0 1 10 0 4 4 0 0 1 0 8z" /><path d="M8 13l2-2M14 13l2-2" /></SI>), label: "CO₂ levels" },
  { Icon: () => (<SI><path d="M3 11h18l-2 9a2 2 0 0 1-2 1.5H7a2 2 0 0 1-2-1.5z" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></SI>), label: "Feed intake" },
  { Icon: () => (<SI><path d="M12 3c2 4 5 6 5 10a5 5 0 0 1-10 0c0-4 3-6 5-10z" /><path d="M10 14a3 3 0 0 0 3 3" /></SI>), label: "Water intake" },
  { Icon: () => (<SI><path d="M12 3c-4 0-7 5-7 11a7 7 0 1 0 14 0c0-6-3-11-7-11z" /></SI>), label: "Egg counting" },
  { Icon: () => (<SI><path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 12h2" /></SI>), label: "Sound AI" },
  { Icon: () => (<SI><rect x="3" y="6" width="14" height="12" /><circle cx="10" cy="12" r="3" /><path d="M17 9l4-2v10l-4-2z" /></SI>), label: "Vision AI" }
];

// ── Mock 1: Sensor wheel ───────────────────────────────────────────────────────
// Hub-and-spoke wheel — geometry computed (10 evenly-spaced spokes from top).
// Per Claude Design's handover: 460-unit viewBox; ring radius 175; cards orbit
// at 41% of the frame (slightly outside the ring so the gold ticks read as
// where each card "plugs in"). Default render size 348 px (handover spec).
function SensorWheel({ size = 348 }: { size?: number }) {
  const ringR = 175;
  const cardFrac = 0.41;
  const cx = 230;
  const cy = 230;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto", maxWidth: "100%" }}>
      <svg
        viewBox="0 0 460 460"
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", maxWidth: "100%", height: "auto" }}
      >
        {/* Dashed outer ring — slowly rotates so the dashes appear to drift around the wheel */}
        <circle className="sensor-wheel-ring" cx={cx} cy={cy} r={ringR} fill="none" stroke="#BEC8CA" strokeWidth="0.5" strokeDasharray="2 4" />
        {/* Spokes from r=60 (just outside the hub) to r=(ringR-22) (just inside the ring) */}
        {SENSORS.map((_, i) => {
          const a = ((i * 36 - 90) * Math.PI) / 180;
          const cosA = Math.cos(a);
          const sinA = Math.sin(a);
          return (
            <line
              key={i}
              x1={cx + cosA * 60}
              y1={cy + sinA * 60}
              x2={cx + cosA * (ringR - 22)}
              y2={cy + sinA * (ringR - 22)}
              stroke="#BEC8CA"
              strokeWidth="0.5"
            />
          );
        })}
        {/* Gold tick dots where spokes meet the ring */}
        {SENSORS.map((_, i) => {
          const a = ((i * 36 - 90) * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={cx + Math.cos(a) * ringR}
              cy={cy + Math.sin(a) * ringR}
              r="2"
              fill={G}
            />
          );
        })}
        {/* Center hub — white outline + petrol disc */}
        <circle cx={cx} cy={cy} r="54" fill="#fff" stroke={P} strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r="47" fill={P} />
      </svg>

      {/* Hub content (logo + FARM label) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pointerEvents: "none"
        }}
      >
        <LogoMark className="h-[18px] w-[22px]" />
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 8.5,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: G,
            textAlign: "center"
          }}
        >
          Farm
        </div>
      </div>

      {/* Sensor cards — orbit at 41% of frame, sized as % so they scale with the wheel */}
      {SENSORS.map(({ Icon, label }, i) => {
        const a = ((i * 36 - 90) * Math.PI) / 180;
        const left = 50 + cardFrac * 100 * Math.cos(a);
        const top = 50 + cardFrac * 100 * Math.sin(a);
        return (
          <div
            key={i}
            className="sensor-card"
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
              width: "16.5%",
              padding: "6px 4px",
              background: "#fff",
              border: "0.5px solid #BEC8CA",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,46,53,0.08)",
              // Stagger the gold radar-sweep glow — handover spec is 0.9s per card
              animationDelay: `${i * 0.9}s`
            }}
          >
            <span style={{ color: P }}>
              <Icon />
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 9,
                fontWeight: 600,
                color: "#191C1D",
                lineHeight: 1.12
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Sensing panel ─────────────────────────────────────────────────────────────
// Right-column composition for Block 01 (per Claude Design's handover):
//   - Real install photo (engineer mounting a Milesight LoRaWAN gateway) bleeds
//     in from the top-right and dissolves into the surface via a radial mask.
//   - Light teal veil over the photo using the same mask so it feathers out.
//   - Gold "Milesight gateway" callout with a slow-blinking ring pinned to the
//     gateway in the photo, label flipped left so it stays inside the frame.
//   - SensorWheel sits lower-left over a white radial halo, so the right-hand
//     sensor cards read on white even where they overlap the photo edge.
function SensingPanel() {
  return (
    <div className="sensing-panel">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sensing-photo"
        src="/install.jpeg"
        alt="Engineer installing a Milesight LoRaWAN gateway in a poultry house"
      />
      <div className="sensing-veil" aria-hidden="true" />

      {/* Gateway callout — ring sits on the device, label sits to its left */}
      <div className="sensing-gw" aria-hidden="true">
        <span className="sensing-gw-ring" />
        <span className="sensing-gw-tick" />
        <span className="sensing-gw-label">
          <span className="sensing-gw-dot" />
          Milesight gateway
        </span>
      </div>

      {/* Wheel + white halo, anchored lower-left */}
      <div className="sensing-wheel-offset">
        <div className="sensing-wheel-halo" aria-hidden="true" />
        <SensorWheel size={348} />
      </div>
    </div>
  );
}

// ── Mock 2: Live operations dashboard (mirrors the SenseAgri client app) ───────
function DashboardMock() {
  // Semicircle health-score gauge geometry (frac 0 → left, 1 → right)
  const polar = (r: number, f: number): [number, number] => {
    const ang = Math.PI * (1 - f);
    return [110 + r * Math.cos(ang), 110 - r * Math.sin(ang)];
  };
  const arc = (r: number, f0: number, f1: number) => {
    const [x0, y0] = polar(r, f0);
    const [x1, y1] = polar(r, f1);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const [mx, my] = polar(82, 0.7);

  const kpis = [
    { v: "95.3%", l: "Hen-day" },
    { v: "57.4 g", l: "Avg egg mass" },
    { v: "1.65%", l: "Mortality" },
    { v: "R 7.9k", l: "Revenue today" }
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #BEC8CA",
        fontFamily: "var(--font-inter), sans-serif",
        boxShadow: "0 14px 44px rgba(0,46,53,0.12)",
        maxWidth: 512,
        width: "100%",
        margin: "0 auto"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 14px",
          background: P
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoMark className="h-4 w-3" />
          <span style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff" }}>
            Farm · House 1
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, background: "#3FB950", borderRadius: "50%" }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: G }}>LIVE · 08:55</span>
        </div>
      </div>

      {/* Gauge + KPI tiles */}
      <div className="dash-grid" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
        <div
          className="dash-gauge"
          style={{
            padding: "14px 12px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <svg viewBox="0 0 220 122" width="100%" style={{ maxWidth: 154 }}>
            <path d={arc(82, 0, 0.45)} fill="none" stroke="#B91C1C" strokeWidth="13" strokeLinecap="butt" />
            <path d={arc(82, 0.45, 0.78)} fill="none" stroke={G} strokeWidth="13" strokeLinecap="butt" />
            <path d={arc(82, 0.78, 1)} fill="none" stroke={TEAL} strokeWidth="13" strokeLinecap="butt" />
            <circle cx={mx} cy={my} r="7.5" fill="#fff" stroke={P} strokeWidth="2.5" />
            <text
              x="110"
              y="98"
              textAnchor="middle"
              style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "42px" }}
              fill={P}
            >
              70
            </text>
          </svg>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6B7C80", marginTop: -2 }}>
            Health Score
          </div>
          <div
            style={{
              marginTop: 7,
              fontSize: 8.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: P,
              padding: "3px 9px",
              background: "rgba(0,46,53,0.07)"
            }}
          >
            Normal
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", gap: 1, background: "#E6E8E8" }}>
          {kpis.map((k, i) => (
            <div
              key={i}
              style={{ background: "#fff", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 800,
                  fontSize: 19,
                  color: P,
                  letterSpacing: "-0.01em"
                }}
              >
                {k.v}
              </div>
              <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7C80", marginTop: 3 }}>
                {k.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry chart */}
      <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #BEC8CA" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3F4849" }}>
            Temperature · 24h
          </span>
          <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 13, color: TEAL }}>
            11.7°C
          </span>
        </div>
        <svg viewBox="0 0 480 66" width="100%" height="60" preserveAspectRatio="none">
          <line x1="0" y1="24" x2="480" y2="24" stroke="#BEC8CA" strokeWidth="0.6" strokeDasharray="3 4" />
          <path
            d="M0 30 L60 27 L120 22 L180 32 L240 43 L300 50 L360 47 L420 43 L480 38"
            stroke={TEAL}
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M0 30 L60 27 L120 22 L180 32 L240 43 L300 50 L360 47 L420 43 L480 38 L480 66 L0 66 Z"
            fill={TEAL}
            fillOpacity="0.1"
          />
          <circle cx="480" cy="38" r="3" fill={TEAL} />
        </svg>
      </div>

      {/* AI alert */}
      <div style={{ padding: "11px 16px", display: "flex", gap: 11, background: "#F8FAFA", borderLeft: `2px solid ${G}` }}>
        <span
          style={{
            fontSize: 8.5,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: P,
            marginTop: 2,
            whiteSpace: "nowrap"
          }}
        >
          AI · Vet
        </span>
        <div style={{ fontSize: 11, color: "#3F4849", lineHeight: 1.45 }}>
          <b style={{ color: "#191C1D" }}>Sustained cold — 11.7°C for 3+ hrs.</b> Birds are burning energy on
          thermoregulation; expect higher feed intake today.
        </div>
      </div>
    </div>
  );
}

// ── Mock 3: WhatsApp on phone ──────────────────────────────────────────────────
// State-driven reveal — React owns the `started` flag, so re-renders preserve
// visibility (no more "cascade resets every 10s" bug from the global .reveal class).
// Each bubble also scrolls itself into view once its delay elapses, so the chat
// auto-advances inside a normal-sized phone (instead of needing a giant screen).
function Bubble({
  kind,
  time,
  children,
  delay = 0,
  started = false
}: {
  kind?: "sent" | "recv";
  time: string;
  children: ReactNode;
  delay?: number;
  started?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const recv = { background: "#fff", alignSelf: "flex-start" as const, borderRadius: "0 8px 8px 8px" };
  const sent = { background: "#D9FDD3", alignSelf: "flex-end" as const, borderRadius: "8px 0 8px 8px" };

  useEffect(() => {
    if (!started) return;
    // Wait until after the bubble has started appearing, then scroll the chat
    // container — NOT the page — so the new message lands at the bottom of
    // the phone screen. Using container.scrollTo() instead of
    // element.scrollIntoView() because the latter walks up every scrollable
    // ancestor (including the window) and yanks the page down to Block 03.
    const t = setTimeout(() => {
      const container = ref.current?.closest(".chat-scroll") as HTMLElement | null;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    }, delay + 250);
    return () => clearTimeout(t);
  }, [started, delay]);

  return (
    <div
      ref={ref}
      style={{
        ...(kind === "sent" ? sent : recv),
        padding: "6px 8px 5px",
        maxWidth: "85%",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: 11,
        lineHeight: 1.4,
        color: "#111B21",
        boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ease-out ${delay}ms, transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`
      }}
    >
      {children}
      <span style={{ display: "block", fontSize: 8.5, color: "rgba(0,0,0,0.42)", marginTop: 2, textAlign: "right", fontWeight: 500 }}>
        {time}
      </span>
    </div>
  );
}

function WhatsAppPhone() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Trigger the cascade once when the phone enters the viewport.
  useEffect(() => {
    const node = phoneRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={phoneRef}
      style={{
        width: 262,
        maxWidth: "100%",
        margin: "0 auto",
        // Small nudge right so the phone sits slightly off-centre in its column
        transform: "translateX(24px)",
        background: "#0a0a0a",
        borderRadius: 34,
        padding: "7px 6px 9px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)"
      }}
    >
      <div style={{ background: "#0a0a0a", borderRadius: 28, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 78,
            height: 18,
            background: "#0a0a0a",
            borderRadius: 11,
            zIndex: 5
          }}
        />
        <div style={{ background: "#ECE5DD", height: 540, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 20px 5px 20px",
              background: "#075E54",
              color: "#fff",
              fontSize: 9.5,
              fontWeight: 600
            }}
          >
            <span>06:34</span>
            <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 8.5, opacity: 0.85 }}>
              <span>●●●●○</span>
              <span>87%</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 12px 9px", background: "#075E54", color: "#fff" }}>
            <div
              style={{
                width: 31,
                height: 31,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden"
              }}
            >
              <LogoMark className="h-4 w-3" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 11.5, fontWeight: 600 }}>SenseAgri Farm AI</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.78)" }}>online</div>
            </div>
          </div>
          <div
            className="chat-scroll"
            style={{
              flex: 1,
              padding: "9px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              overflowY: "auto"
            }}
          >
            <div
              style={{
                alignSelf: "center",
                background: "rgba(225, 245, 254, 0.9)",
                padding: "3px 9px",
                fontSize: 9,
                color: "#3F4849",
                borderRadius: 6,
                fontWeight: 600,
                marginBottom: 1,
                opacity: started ? 1 : 0,
                transition: "opacity 300ms ease-out"
              }}
            >
              Today
            </div>
            {/* Scenario 1 — morning air-quality drift. Bubble delays paced ~800ms
                apart so each message has time to land + read before the next arrives. */}
            <Bubble started={started} kind="recv" time="06:32" delay={500}>
              <div style={{ fontWeight: 700, color: "#B91C1C", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                Alert · House 3
              </div>
              Air quality drifting. NH₃ up <b>38%</b> over the last 14 days. Traced to manure belt at <b>50%</b> of normal cycle.
            </Bubble>
            <Bubble started={started} kind="recv" time="06:33" delay={1500}>
              Without action: projected FCR drift <b>+0.04</b> across the cycle → ~<b>3% margin loss</b>.
            </Bubble>
            <Bubble started={started} kind="recv" time="06:33" delay={2500}>
              <div style={{ fontWeight: 700, color: P, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                Recommendation
              </div>
              Step ventilation up <b>1 stage</b> + restore manure belt to normal cycle. Confidence <b>91%</b>.
            </Bubble>
            <Bubble started={started} kind="sent" time="06:34" delay={3500}>
              On it.
            </Bubble>

            {/* Time-gap divider — subtle hint that hours have passed */}
            <div
              style={{
                alignSelf: "center",
                background: "rgba(225, 245, 254, 0.9)",
                padding: "3px 9px",
                fontSize: 9,
                color: "#3F4849",
                borderRadius: 6,
                fontWeight: 600,
                margin: "2px 0",
                opacity: started ? 1 : 0,
                transition: "opacity 300ms ease-out 4400ms"
              }}
            >
              Later · 11:42
            </div>

            {/* Scenario 2 — midday heat stress with mortality forecast */}
            <Bubble started={started} kind="recv" time="11:42" delay={5200}>
              <div style={{ fontWeight: 700, color: "#B91C1C", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                Alert · House 7
              </div>
              Heat stress imminent. Inlet <b>33.1°C</b> and climbing <b>0.4°C/min</b> — cooling not keeping pace.
            </Bubble>
            <Bubble started={started} kind="recv" time="11:42" delay={6100}>
              If unchanged in next <b>20 min</b>: heat-stress threshold crossed → expected mortality <b>+0.8%</b> in House 7.
            </Bubble>
            <Bubble started={started} kind="recv" time="11:43" delay={7000}>
              <div style={{ fontWeight: 700, color: P, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                Recommendation
              </div>
              Open evaporative pads + <b>Fans 1 &amp; 4</b> to max now. Confidence <b>93%</b>.
            </Bubble>
            <Bubble started={started} kind="sent" time="11:43" delay={7900}>
              On it.
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mock 4: Weekly report ──────────────────────────────────────────────────────
function ReportMock() {
  const kpis = [
    { v: "93%", l: "HPED", d: "+1.2", up: true },
    { v: "1.81", l: "FCR", d: "−0.04", up: true },
    { v: "0.4%", l: "Mortality", d: "−0.2", up: true },
    { v: "R 4.21", l: "Feed/kg", d: "flat", up: false }
  ];
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #BEC8CA",
        padding: 24,
        fontFamily: "var(--font-inter), sans-serif",
        boxShadow: "0 14px 44px rgba(0,46,53,0.12)",
        maxWidth: 452,
        width: "100%",
        margin: "0 auto"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
          paddingBottom: 14,
          borderBottom: `1.5px solid ${P}`
        }}
      >
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: G, marginBottom: 5 }}>
            Weekly Performance Report
          </div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 17, fontWeight: 800, color: P, letterSpacing: "-0.01em" }}>
            Week 47 · Mokete Farm
          </div>
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7C80", textAlign: "right" }}>
          18 Nov 2024
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#E6E8E8", marginBottom: 18, border: "0.5px solid #BEC8CA" }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: "#fff", padding: "11px 9px" }}>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 15, color: P, letterSpacing: "-0.01em" }}>
              {k.v}
            </div>
            <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7C80", marginTop: 3 }}>
              {k.l}
            </div>
            <div style={{ fontSize: 9, color: k.up ? TEAL : "#6B7C80", marginTop: 3, fontWeight: 600 }}>{k.d}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3F4849", marginBottom: 8 }}>
          Production · last 7 days
        </div>
        <svg viewBox="0 0 320 52" width="100%" height="52" preserveAspectRatio="none">
          {[34, 28, 30, 22, 24, 18, 14].map((y, i) => (
            <rect key={i} x={i * 45 + 6} y={y} width={32} height={52 - y} fill={P} opacity={i === 6 ? 1 : 0.85} />
          ))}
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: P, marginBottom: 9, borderLeft: `2px solid ${G}`, paddingLeft: 10 }}>
          Key insights
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 11, color: "#3F4849", lineHeight: 1.5, display: "flex", flexDirection: "column", gap: 5 }}>
          <li>HPED up <b>1.2 pts</b> after House 2 ventilation adjustments.</li>
          <li>Feed consumption stabilised — overfeed events down 60%.</li>
          <li>Recommend bringing forward House 4 audit by one week.</li>
        </ul>
      </div>
    </div>
  );
}

// ── Block layout ───────────────────────────────────────────────────────────────
function Block({
  idx,
  label,
  title,
  body,
  chips,
  mock,
  reverse,
  dark
}: {
  idx: string;
  label: string;
  title: string;
  body: string;
  chips: string[];
  mock: ReactNode;
  reverse?: boolean;
  dark?: boolean;
}) {
  const blockBg = dark ? N : "#F8FAFA";
  const textColor = dark ? "#fff" : P;
  const bodyColor = dark ? "rgba(255,255,255,0.72)" : "#3F4849";
  const chipBg = dark ? "rgba(212,175,55,0.08)" : "rgba(0,46,53,0.07)";
  const chipBorder = dark ? "0.5px solid rgba(212,175,55,0.25)" : "0.5px solid rgba(0,46,53,0.15)";
  const chipColor = dark ? "rgba(255,255,255,0.92)" : P;

  return (
    <div
      className="wyg-block"
      style={{
        background: blockBg,
        padding: "48px 24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {dark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(79,184,197,0.06) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(79,184,197,0.06) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none"
          }}
        />
      )}

      {/* Big ghost numeral — shown on every block. On the dark block the PEF
          callout sits in a separate spot (upper-mid), so the two don't conflict. */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 28,
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 800,
          fontSize: 150,
          color: dark ? "rgba(212,175,55,0.07)" : "rgba(0,46,53,0.045)",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
          pointerEvents: "none",
          userSelect: "none"
        }}
      >
        {idx}
      </div>

      <div className="wyg-block-grid reveal" style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          <Eyebrow dark={dark}>
            {idx} · {label}
          </Eyebrow>
          <h3
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.45rem, 2.5vw, 2.05rem)",
              color: textColor,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 14
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: bodyColor,
              marginBottom: 20,
              maxWidth: "42ch"
            }}
          >
            {body}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {chips.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "4px 9px",
                  background: chipBg,
                  color: chipColor,
                  border: chipBorder
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ order: reverse ? 1 : 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="wyg-mock">{mock}</div>
        </div>
      </div>
    </div>
  );
}

// ── Integrations strip ─────────────────────────────────────────────────────────
// Placeholder wordmarks — swap with real logos when available.
const INTEGRATIONS = ["Big Dutchman", "SKOV", "Hytek", "Vencomatic", "Munters"];

function IntegrationStrip() {
  return (
    <div
      className="wyg-integration"
      style={{
        background: N,
        padding: "38px 24px",
        position: "relative",
        overflow: "hidden",
        borderTop: "0.5px solid rgba(212,175,55,0.2)"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(79,184,197,0.05) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(79,184,197,0.05) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none"
        }}
      />
      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, background: G, borderRadius: "50%" }} />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: G, textAlign: "center" }}>
            Seamlessly integrates with every major poultry platform
          </span>
          <span style={{ width: 6, height: 6, background: G, borderRadius: "50%" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px 0" }}>
          {INTEGRATIONS.map((name, i) => (
            <Fragment key={name}>
              <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "-0.005em", padding: "0 26px" }}>
                {name}
              </span>
              {i < INTEGRATIONS.length - 1 && <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.15)" }} />}
            </Fragment>
          ))}
          <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", padding: "0 26px" }}>
            + more
          </span>
        </div>
      </div>
    </div>
  );
}

// ── The section ──────────────────────────────────────────────────────────────
export default function WhatYouGet() {
  return (
    <section>
      <Block
        idx="01"
        label="Sensing"
        title="Every signal from every house."
        body="Sensors and edge cameras on every house, capturing every signal around the clock."
        chips={["LoRaWAN backbone", "Edge-first", "24/7 capture"]}
        mock={<SensingPanel />}
      />
      <Block
        idx="02"
        label="Dashboard + AI"
        title="Your full operation, decoded."
        body="Every metric in one place, with AI that flags exactly what needs action."
        chips={["Live telemetry", "Health score", "AI recommendations", "Internal vet"]}
        mock={<DashboardMock />}
        reverse
      />
      <Block
        idx="03"
        label="WhatsApp Alerts"
        title="AI on WhatsApp. No app to learn."
        body="Serious events and key insights, pushed straight to WhatsApp."
        chips={["Serious events", "Schedule changes", "Key insights"]}
        mock={<WhatsAppPhone />}
        dark
      />
      <Block
        idx="04"
        label="Weekly Reports"
        title="Executive summaries — automatic."
        body="Output, performance and ROI — delivered as an automatic report every Monday."
        chips={["Output", "Performance", "Cost & ROI", "Shareable"]}
        mock={<ReportMock />}
        reverse
      />

      <IntegrationStrip />
    </section>
  );
}
