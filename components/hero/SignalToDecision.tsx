"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DAYS,
  INSIGHTS,
  STREAMS,
  formatValue,
  tickValue,
  type Stream
} from "@/lib/heroSeries";

// Homepage hero, concept A — "Signal to decision".
// Farm data streams enter from the left, converge through three tiers (the logo's
// pills) into one gold node, and one plain-language insight comes out.
// Self-contained so it can be swapped for concept B or C.
//
// The server render is the complete final frame (lines drawn, card 1 showing), so
// screenshots, no-JS and prefers-reduced-motion all get a full picture. Motion is
// layered on top: a bright draw-in pass over the faint base lines, particles
// flowing into the node, quiet value ticks, and the insight cycle.

const CYCLE_MS = 9000;
const TICK_MS = 3200;
const TYPE_MS = 25;
const TIER_PULL = [0.66, 0.34, 0.12]; // share of each line's offset left at each tier
const TIER_OPACITY = [0.55, 0.75, 1]; // the logo's three pills

type Layout = {
  height: number; // px; SVG x runs 0–1000 across the full width
  laneTop: number;
  laneGap: number;
  amp: number;
  dataEnd: number;
  tiers: [number, number, number];
  node: { x: number; y: number };
};

const WIDE: Layout = {
  height: 404,
  laneTop: 34,
  laneGap: 50,
  amp: 12,
  dataEnd: 370,
  tiers: [428, 484, 528],
  node: { x: 560, y: 130 }
};

const NARROW: Layout = {
  height: 196,
  laneTop: 34,
  laneGap: 44,
  amp: 10,
  dataEnd: 560,
  tiers: [652, 732, 800],
  node: { x: 872, y: 100 }
};

type Geometry = {
  stream: Stream;
  laneY: number;
  ys: number[];
  xs: number[];
  full: string;
  flow: string;
  tierYs: number[];
};

function buildGeometry(streams: Stream[], L: Layout): Geometry[] {
  return streams.map((stream, i) => {
    const laneY = L.laneTop + i * L.laneGap;
    const min = Math.min(...stream.points);
    const max = Math.max(...stream.points);
    const span = max - min || 1;
    const xs = stream.points.map((_, d) => (d / (DAYS - 1)) * L.dataEnd);
    const ys = stream.points.map((v) => laneY + L.amp - ((v - min) / span) * 2 * L.amp);

    // Convergence: Catmull-Rom through each tier into the node, leaving and
    // arriving horizontally.
    const startY = ys[DAYS - 1];
    const offset = startY - L.node.y;
    const tierYs = TIER_PULL.map((f) => L.node.y + offset * f);
    const pts: [number, number][] = [
      [L.dataEnd - 40, startY],
      [L.dataEnd, startY],
      ...L.tiers.map((x, t): [number, number] => [x, tierYs[t]]),
      [L.node.x, L.node.y],
      [L.node.x + 40, L.node.y]
    ];
    let curve = "";
    for (let k = 1; k < pts.length - 2; k++) {
      const [p0, p1, p2, p3] = [pts[k - 1], pts[k], pts[k + 1], pts[k + 2]];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      curve += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    const data = xs.map((x, d) => `${d === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[d].toFixed(1)}`).join(" ");

    return {
      stream,
      laneY,
      ys,
      xs,
      full: data + curve,
      flow: `M ${L.dataEnd} ${startY.toFixed(1)}` + curve,
      tierYs
    };
  });
}

const WIDE_GEO = buildGeometry(STREAMS, WIDE);
const NARROW_GEO = buildGeometry(
  STREAMS.filter((s) => s.narrow),
  NARROW
);

function highlightPath(g: Geometry, from: number) {
  return g.xs
    .slice(from)
    .map((x, k) => `${k === 0 ? "M" : "L"} ${x.toFixed(1)} ${g.ys[from + k].toFixed(1)}`)
    .join(" ");
}

type DiagramProps = {
  layout: Layout;
  geo: Geometry[];
  active: number;
  tick: number;
  hoverLane: string | null;
  setHoverLane: (id: string | null) => void;
  className?: string;
  children?: React.ReactNode;
};

function Diagram({ layout: L, geo, active, tick, hoverLane, setHoverLane, className, children }: DiagramProps) {
  const insight = INSIGHTS[active];
  const pct = (x: number) => `${x / 10}%`;

  return (
    <div className={`relative ${className ?? ""}`} style={{ height: L.height }}>
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 1000 ${L.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {geo.map((g, i) => {
          const lit = hoverLane === g.stream.id;
          const flagged = insight.stream === g.stream.id;
          return (
            <g key={g.stream.id}>
              {/* Faint base: present from the first frame */}
              <path
                d={g.full}
                fill="none"
                stroke="#2A8E9A"
                strokeWidth={0.75}
                vectorEffect="non-scaling-stroke"
                opacity={g.stream.opacity * 0.45}
              />
              {/* Draw-in pass */}
              <path
                className="sd-draw"
                d={g.full}
                pathLength={1}
                fill="none"
                stroke="#2A8E9A"
                strokeWidth={0.75}
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: lit ? 1 : g.stream.opacity,
                  animationDelay: `${i * 70}ms`,
                  transition: "opacity 300ms cubic-bezier(.2,.7,.1,1)"
                }}
              />
              {/* Signal flowing into the node */}
              <path
                className="sd-flow"
                d={g.flow}
                pathLength={1}
                fill="none"
                stroke="#58C9C5"
                strokeWidth={1.25}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${1.6 + i * 1.3}s` }}
              />
              {/* The stretch that misbehaves turns gold with the card */}
              {INSIGHTS.map((ins, k) =>
                ins.stream === g.stream.id ? (
                  <path
                    key={k}
                    d={highlightPath(g, ins.from)}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      opacity: flagged && active === k ? 1 : 0,
                      transition: "opacity 400ms cubic-bezier(.2,.7,.1,1)"
                    }}
                  />
                ) : null
              )}
            </g>
          );
        })}
      </svg>

      {/* Tiers — the logo's three pills, stood on end */}
      {L.tiers.map((x, t) => {
        const ys = geo.map((g) => g.tierYs[t]);
        const top = Math.min(...ys) - 9;
        const bottom = Math.max(...ys) + 9;
        return (
          <span
            key={x}
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              left: pct(x),
              top,
              height: bottom - top,
              width: 9,
              transform: "translateX(-50%)",
              background: "rgba(42,142,154,0.16)",
              border: "0.5px solid rgba(42,142,154,0.7)",
              opacity: TIER_OPACITY[t]
            }}
          />
        );
      })}

      {/* Stream labels and current values */}
      {geo.map((g) => {
        const lit = hoverLane === g.stream.id;
        const flagged = insight.stream === g.stream.id;
        const tone = flagged ? "text-gold" : lit ? "text-white" : "text-on-secondary-variant";
        return (
          <div
            key={g.stream.id}
            className="absolute left-0 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ top: g.laneY - L.amp - 17, width: pct(L.dataEnd), height: L.amp * 2 + 20 }}
            onMouseEnter={() => setHoverLane(g.stream.id)}
            onMouseLeave={() => setHoverLane(null)}
          >
            <span className={`transition-colors duration-300 ${tone}`}>{g.stream.label}</span>
            <span className={`tabular-nums transition-colors duration-300 ${lit || flagged ? tone : "text-white/80"}`}>
              {formatValue(tickValue(g.stream, tick), g.stream.decimals)}
            </span>
          </div>
        );
      })}

      {/* The node */}
      <span
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: pct(L.node.x),
          top: L.node.y,
          width: 22,
          height: 22,
          transform: "translate(-50%, -50%)",
          border: "0.5px solid rgba(212,175,55,0.55)"
        }}
      />
      <span
        aria-hidden="true"
        className="absolute rounded-full bg-gold"
        style={{ left: pct(L.node.x), top: L.node.y, width: 14, height: 14, transform: "translate(-50%, -50%)" }}
      />

      {children}
    </div>
  );
}

function InsightCard({
  active,
  typed,
  animate,
  onSelect
}: {
  active: number;
  typed: number;
  animate: boolean;
  onSelect: (i: number) => void;
}) {
  const insight = INSIGHTS[active];
  return (
    <div>
      <div
        className="bg-secondary-container px-5 py-4 sm:px-6 sm:py-5"
        style={{ borderTop: "0.5px solid #D4AF37", minHeight: 212 }}
      >
        <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary-light">
          <span>{insight.header.slice(0, typed)}</span>
          <span className="invisible">{insight.header.slice(typed)}</span>
        </p>
        <div key={active} className={animate ? "sd-card-in" : undefined}>
          {insight.lines.map((line, i) => (
            <p
              key={line}
              className="sd-line mt-2.5 font-sans text-white/90 first:mt-3"
              style={{ fontSize: 15, lineHeight: 1.5, animationDelay: `${0.35 + i * 0.18}s` }}
            >
              {line}
            </p>
          ))}
          <p
            className="sd-line mt-3 font-sans text-white/70"
            style={{ fontSize: 14, lineHeight: 1.5, animationDelay: "0.75s" }}
          >
            <span className="mr-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary-light">Check:</span>
            {insight.check}
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-4">
        <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-on-secondary-variant">
          Example insight · illustrative data
        </p>
        <div className="flex gap-1" role="group" aria-label="Choose example insight">
          {INSIGHTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={i === active}
              aria-label={`Example insight ${i + 1}`}
              className={`sd-select px-1.5 py-0.5 font-mono text-[10px] tabular-nums tracking-[0.08em] transition-colors duration-200 ${
                i === active ? "text-white" : "text-on-secondary-variant hover:text-white"
              }`}
              style={{ borderBottom: `0.5px solid ${i === active ? "#D4AF37" : "transparent"}` }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SignalToDecision() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(INSIGHTS[0].header.length);
  const [animate, setAnimate] = useState(false);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoverLane, setHoverLane] = useState<string | null>(null);
  const [motion, setMotion] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps when a reader picks an insight, restarting the timer

  // Motion only after mount, and never under prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Insight cycle
  useEffect(() => {
    if (!motion || paused) return;
    const id = window.setTimeout(() => {
      setAnimate(true);
      setTyped(0);
      setActive((a) => (a + 1) % INSIGHTS.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [motion, paused, active, cycle]);

  // Header types in
  useEffect(() => {
    const full = INSIGHTS[active].header.length;
    if (typed >= full) return;
    if (!motion) {
      setTyped(full);
      return;
    }
    const id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => window.clearTimeout(id);
  }, [typed, active, motion]);

  // Quiet value ticks
  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [motion]);

  const select = (i: number) => {
    if (i === active) return;
    setAnimate(motion);
    setTyped(motion ? 0 : INSIGHTS[i].header.length);
    setActive(i);
    setCycle((n) => n + 1);
  };

  const cardProps = { active, typed, animate, onSelect: select };
  const diagramProps = { active, tick, hoverLane, setHoverLane };

  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-secondary px-6 pb-14 pt-24 sm:px-10 lg:px-16 lg:pb-20 lg:pt-36"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Copy — top-aligned with the visual, not centred */}
        <div className="lg:col-span-5 lg:pr-4">
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary-light">
            <span aria-hidden="true" className="inline-block w-6" style={{ height: 0.5, background: "#58C9C5" }} />
            South Africa&apos;s Poultry Intelligence Platform
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display font-bold text-white"
            style={{ fontSize: "clamp(2.5rem, 4.3vw, 3.95rem)", lineHeight: 1.02, letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            Intelligence <span className="text-primary-light">for your farm.</span>
          </h1>
          <p className="mt-6 max-w-[40ch] font-sans text-white/75" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Insight to see the problem before it costs you, and the confidence to act — through precision AI farming.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="sd-focus inline-flex items-center justify-center bg-white px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors duration-150 hover:bg-surface-container-low"
            >
              Book a Demo
            </Link>
            <a
              href="#how-it-thinks"
              className="sd-focus group inline-flex items-center gap-2 py-1 font-sans text-sm font-medium text-white"
              style={{ borderBottom: "0.5px solid rgba(255,255,255,0.45)" }}
            >
              See how the AI thinks <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        {/* Visual — bleeds off the right edge on desktop */}
        <figure
          className="sd-bleed relative lg:col-span-7"
          aria-label="Example: six streams of farm data converge into one insight"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setHoverLane(null);
          }}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
          }}
        >
          {/* Desktop */}
          <Diagram layout={WIDE} geo={WIDE_GEO} {...diagramProps} className="hidden lg:block">
            <span
              aria-hidden="true"
              className="absolute"
              style={{ left: `${WIDE.node.x / 10}%`, top: WIDE.node.y + 11, height: 19, width: 0.5, background: "rgba(212,175,55,0.7)" }}
            />
            <div
              className="absolute"
              style={{ left: `calc(${WIDE.node.x / 10}% - 7px)`, top: WIDE.node.y + 30, right: 24, maxWidth: 400 }}
            >
              <InsightCard {...cardProps} />
            </div>
          </Diagram>

          {/* Phones and tablets: four streams, card below the node */}
          <div className="lg:hidden">
            <Diagram layout={NARROW} geo={NARROW_GEO} {...diagramProps}>
              <span
                aria-hidden="true"
                className="absolute"
                style={{ left: `${NARROW.node.x / 10}%`, top: NARROW.node.y + 11, bottom: 0, width: 0.5, background: "rgba(212,175,55,0.7)" }}
              />
            </Diagram>
            <InsightCard {...cardProps} />
          </div>
        </figure>
      </div>
    </section>
  );
}
