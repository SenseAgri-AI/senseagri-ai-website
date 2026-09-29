"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ALARM, ALARM_DAY, DAYS, FLAG_DAY, STRIPS, type Strip } from "@/lib/controllerSeries";

// Brief 3.3 — "We get more out of your controller." SenseAgri works on top of
// the controller and connects everything the farm records. Four readings, each
// moving only slightly; read together at day 4 they point to a problem that
// only reaches the controller's alarm level around day 17.
// Never positions us against the controller.
//
// The chart is complete at rest (server render, reduced motion). With motion
// allowed, the lines draw in once when the chart scrolls into view, then the
// gold markers fade in.

const TEAL = "#087C83";
const GOLD = "#D4AF37";
const GREY = "#6B7C80";
const INK = "#002E35";

type Frame = {
  w: number;
  h: number;
  x0: number;
  x1: number;
  strips: { top: number; h: number }[];
  bracketY: number;
  axisY: number;
  xTicks: number[];
  font: number;
  compact: boolean;
};

const WIDE: Frame = {
  w: 1000,
  h: 622,
  x0: 200,
  x1: 972,
  strips: [
    { top: 110, h: 120 },
    { top: 264, h: 76 },
    { top: 372, h: 76 },
    { top: 480, h: 76 }
  ],
  bracketY: 92,
  axisY: 570,
  xTicks: [0, 3, 6, 9, 12, 15, 18, 21],
  font: 11,
  compact: false
};

const NARROW: Frame = {
  w: 360,
  h: 476,
  x0: 36,
  x1: 352,
  strips: [
    { top: 48, h: 90 },
    { top: 176, h: 56 },
    { top: 270, h: 56 },
    { top: 364, h: 56 }
  ],
  bracketY: 22,
  axisY: 430,
  xTicks: [0, 7, 14, 21],
  font: 8.5,
  compact: true
};

// Where the water line meets the alarm level, interpolated between two days
const WATER = STRIPS[0].points;
const CROSS = (() => {
  const d = WATER.findIndex((v) => v < ALARM);
  return d - 1 + (WATER[d - 1] - ALARM) / (WATER[d - 1] - WATER[d]);
})();

function Chart({ f, className }: { f: Frame; className?: string }) {
  const x = (d: number) => f.x0 + (d / DAYS) * (f.x1 - f.x0);
  const yOf = (s: Strip, box: { top: number; h: number }) => (v: number) =>
    box.top + box.h - ((v - s.domain[0]) / (s.domain[1] - s.domain[0])) * box.h;
  const gx = x(FLAG_DAY);
  const bottom = f.strips[3].top + f.strips[3].h;
  const label = { fontSize: f.font, letterSpacing: "0.08em" };

  return (
    <svg
      viewBox={`0 0 ${f.w} ${f.h}`}
      className={`block h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label={`Chart: four readings from House 3 over ${DAYS} days: water intake, feed intake, night house temperature and daily weight gain. Each changes only slightly. At day ${FLAG_DAY} SenseAgri reads them together as an early sign of respiratory stress. Water only reaches the controller's alarm level around day ${ALARM_DAY}: ${ALARM_DAY - FLAG_DAY} days to act.`}
    >
      {/* The window to act: shaded between the gold line and day 17, across all strips */}
      <g className="wc-late">
        <rect x={gx} y={f.strips[0].top} width={x(ALARM_DAY) - gx} height={bottom - f.strips[0].top} fill={TEAL} opacity={0.06} />
        {/* Day 4 — one gold line through all four strips (drawn under the labels) */}
        <line x1={gx} x2={gx} y1={f.compact ? f.strips[0].top - 2 : 64} y2={bottom} stroke={GOLD} strokeWidth={1} />
        <path d={`M ${gx} ${f.bracketY - 6} V ${f.bracketY} H ${x(ALARM_DAY)} V ${f.bracketY - 6}`} fill="none" stroke={TEAL} strokeWidth={0.5} />
        <text x={(gx + x(ALARM_DAY)) / 2} y={f.bracketY - 10} textAnchor="middle" className="font-mono" fill={TEAL} style={label}>
          {ALARM_DAY - FLAG_DAY} DAYS TO ACT
        </text>
      </g>

      {STRIPS.map((s, i) => {
        const box = f.strips[i];
        const y = yOf(s, box);
        const line = s.points.map((v, d) => `${d === 0 ? "M" : "L"} ${x(d).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
        const change = s.points
          .slice(1, FLAG_DAY + 1)
          .map((v, k) => `${k === 0 ? "M" : "L"} ${x(k + 1).toFixed(1)} ${y(v).toFixed(1)}`)
          .join(" ");
        return (
          <g key={s.id}>
            {/* Label and unit: left column on desktop, above the strip on phones */}
            {f.compact ? (
              <text x={0} y={box.top - 9} className="font-mono" style={label} stroke="#fff" strokeWidth={4} paintOrder="stroke">
                <tspan fill={INK}>{s.label.toUpperCase()}</tspan>
                <tspan fill={GREY}> · {s.unit.toUpperCase()}</tspan>
              </text>
            ) : (
              <g className="font-mono" style={label}>
                <text x={0} y={box.top + 14} fill={INK}>
                  {s.label.toUpperCase()}
                </text>
                <text x={0} y={box.top + 31} fill={GREY}>
                  {s.unit.toUpperCase()}
                </text>
              </g>
            )}

            {/* Scale: gridlines and ticks for this strip */}
            <g stroke="#BEC8CA" strokeWidth={0.5}>
              {s.ticks.map((v) => (
                <line key={v} x1={f.x0} x2={f.x1} y1={y(v)} y2={y(v)} opacity={0.7} />
              ))}
            </g>
            <g className="font-mono" fill={GREY} style={label}>
              {s.ticks.map((v) => (
                <text key={v} x={f.x0 - 6} y={y(v) + f.font * 0.35} textAnchor="end">
                  {v.toFixed(s.decimals)}
                </text>
              ))}
            </g>

            {/* Water only: the controller's alarm level */}
            {s.id === "water" && (
              <g>
                <line x1={f.x0} x2={f.x1} y1={y(ALARM)} y2={y(ALARM)} stroke={GREY} strokeWidth={0.75} strokeDasharray="5 4" />
                <text x={gx + 8} y={y(ALARM) + f.font + 5} className="font-mono" fill={GREY} style={label}>
                  CONTROLLER ALARM LEVEL
                </text>
              </g>
            )}

            <path className="wc-line" d={line} fill="none" stroke={TEAL} strokeWidth={0.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {/* The small change the gold line crosses */}
            <path className="wc-late" d={change} fill="none" stroke={GOLD} strokeWidth={f.compact ? 1.5 : 2} strokeLinecap="round" strokeLinejoin="round" />

            {s.id === "water" && (
              <g className="wc-late">
                <circle cx={x(CROSS)} cy={y(ALARM)} r={f.compact ? 3.5 : 4.5} fill="#fff" stroke={GREY} strokeWidth={1} />
                {!f.compact && (
                  <text x={f.x1} y={y(ALARM) - 12} textAnchor="end" className="font-mono" fill={GREY} style={label}>
                    DAY {ALARM_DAY} · ALARM LEVEL REACHED
                  </text>
                )}
              </g>
            )}
          </g>
        );
      })}

      {/* Shared x-axis */}
      <g stroke={GREY} strokeWidth={0.5}>
        <line x1={f.x0} x2={f.x1} y1={f.axisY} y2={f.axisY} />
        {f.xTicks.map((d) => (
          <line key={d} x1={x(d)} x2={x(d)} y1={f.axisY} y2={f.axisY + 5} />
        ))}
      </g>
      <g className="font-mono" fill={GREY} style={label}>
        {f.xTicks.map((d) => (
          <text key={d} x={x(d)} y={f.axisY + 8 + f.font * 1.2} textAnchor="middle">
            {d}
          </text>
        ))}
        <text x={f.x1} y={f.axisY + 12 + f.font * 2.5} textAnchor="end">
          DAY
        </text>
      </g>

      {/* Day 4 — the SenseAgri note (desktop; phones show it under the chart) */}
      <g className="wc-late">
        {!f.compact && (
          <g transform={`translate(${gx} 0)`}>
            <rect width={600} height={64} fill="#fff" stroke="#BEC8CA" strokeWidth={0.5} />
            <line x1={0} x2={600} y1={0.5} y2={0.5} stroke={GOLD} strokeWidth={1} />
            <text x={14} y={19} className="font-mono" fill={TEAL} style={label}>
              DAY {FLAG_DAY} · SENSEAGRI
            </text>
            <text x={14} y={37} className="font-sans" fill={INK} fontSize={13.5}>
              Water down 3%, feed flat, nights 1.5°C warmer, growth slowing.
            </text>
            <text x={14} y={54} className="font-sans" fill={INK} fontSize={13.5}>
              Together, an early sign of respiratory stress. Check the birds.
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}

const POINTS = [
  "Connects every data point your farm records, not one reading at a time.",
  "Nothing to change on your controller. We use the data it already records.",
  "Learns what normal looks like for each of your houses.",
  "Tells you what's changing, why, and what to check."
];

export default function WorksWithController() {
  // "static" = complete chart; "armed" = below the fold, waiting; "drawing" = one-time draw-in
  const [draw, setDraw] = useState<"static" | "armed" | "drawing">("static");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (window.innerHeight - r.top > r.height * 0.2) return; // already on screen: leave it complete
    setDraw("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDraw("drawing");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="wc-title" className="bg-surface px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sensing">Works with your controller</p>
        <h2
          id="wc-title"
          className="mt-4 font-display font-bold text-primary"
          style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)", lineHeight: 1.06, letterSpacing: "-0.02em", textWrap: "balance" }}
        >
          We get more out of your controller.
        </h2>
        <p className="mt-4 max-w-[72ch] font-sans text-on-surface-variant" style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}>
          Your controller does an important job. It reacts the moment something goes wrong, like a fan failing or a house
          overheating. SenseAgri works on top of it, reading the same data over days and weeks to pick up the small, slow
          changes that never trip an alarm, until they become a big problem. And it doesn&apos;t read one number at a time. It
          connects everything your farm records, from climate and water to feed, weights, egg counts and mortality, so a small
          change in one is read alongside all the others.
        </p>

        {/* The chart — four readings, one shared day axis */}
        <figure ref={ref} data-draw={draw} className="wc-figure mt-10 lg:mt-12">
          <div className="bg-surface-container-lowest px-3 pb-3 pt-4 sm:px-6 sm:pt-6" style={{ border: "0.5px solid #BEC8CA" }}>
            <Chart f={WIDE} className="hidden md:block" />
            <Chart f={NARROW} className="md:hidden" />
          </div>
          {/* Phones: the gold label and the alarm marker sit under the chart */}
          <ul className="wc-late mt-3 grid gap-2.5 md:hidden">
            <li className="font-sans text-[14px] leading-snug text-primary" style={{ borderTop: `0.5px solid ${GOLD}`, paddingTop: 10 }}>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-sensing">Day {FLAG_DAY} · SenseAgri: </span>
              water down 3%, feed flat, nights 1.5°C warmer, growth slowing. Together, an early sign of respiratory stress. Check
              the birds.
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border border-outline bg-white" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-outline">
                Day {ALARM_DAY} · Alarm level reached
              </span>
            </li>
          </ul>
          <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-outline">
            Fig. · Four readings, House 3, {DAYS} days · illustrative
          </figcaption>
        </figure>

        {/* Four short points, one row, hairline-separated */}
        <ul className="mt-12 grid lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <li
              key={p}
              className={`hairline-t py-5 font-sans text-[15px] leading-relaxed text-primary lg:border-t-0 lg:py-1 ${
                i > 0 ? "wc-divider lg:pl-6" : ""
              } ${i < POINTS.length - 1 ? "lg:pr-6" : ""}`}
            >
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[80ch] font-sans text-[14px] leading-relaxed text-on-surface-variant">
          Your controller keeps watching around the clock. SenseAgri adds the intelligence on top. Want us watching 24/7 too?
          Add our sensors.{" "}
          <Link href="/sensors" className="link-underline font-medium text-primary">
            See sensors →
          </Link>
        </p>
      </div>
    </section>
  );
}
