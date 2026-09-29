"use client";

import { useEffect, useRef, useState } from "react";
import { DAYS, INSIGHTS, STREAMS, type Stream } from "@/lib/signalSeries";

// "Signal to decision" — the section directly below the homepage hero.
// Four farm data streams converge through three tiers (the logo's pills) into
// one gold node, and one plain-language insight comes out.
//
// The server render is the complete still frame: lines drawn, card 1 showing.
// With motion allowed, the lines are revealed once as the section scrolls into view
// and then stay still. Visitors switch insights with the tabs; nothing cycles.

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

// Desktop: card sits to the right of the node
const WIDE: Layout = {
  height: 388,
  laneTop: 52,
  laneGap: 64,
  amp: 13,
  dataEnd: 300,
  tiers: [352, 400, 438],
  node: { x: 468, y: 148 }
};

// Phones and tablets: card sits below the node
const NARROW: Layout = {
  height: 212,
  laneTop: 34,
  laneGap: 46,
  amp: 10,
  dataEnd: 560,
  tiers: [652, 732, 800],
  node: { x: 872, y: 104 }
};

type Geometry = {
  stream: Stream;
  laneY: number;
  xs: number[];
  ys: number[];
  path: string;
  tierYs: number[];
};

function buildGeometry(L: Layout): Geometry[] {
  return STREAMS.map((stream, i) => {
    const laneY = L.laneTop + i * L.laneGap;
    const min = Math.min(...stream.points);
    const span = Math.max(...stream.points) - min || 1;
    const xs = stream.points.map((_, d) => (d / (DAYS - 1)) * L.dataEnd);
    const ys = stream.points.map((v) => laneY + L.amp - ((v - min) / span) * 2 * L.amp);

    // Convergence: Catmull-Rom through each tier into the node, leaving and
    // arriving horizontally.
    const startY = ys[DAYS - 1];
    const tierYs = TIER_PULL.map((f) => L.node.y + (startY - L.node.y) * f);
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

    return { stream, laneY, xs, ys, path: data + curve, tierYs };
  });
}

const WIDE_GEO = buildGeometry(WIDE);
const NARROW_GEO = buildGeometry(NARROW);

function stretch(g: Geometry, from: number) {
  return g.xs
    .slice(from)
    .map((x, k) => `${k === 0 ? "M" : "L"} ${x.toFixed(1)} ${g.ys[from + k].toFixed(1)}`)
    .join(" ");
}

function Diagram({
  layout: L,
  geo,
  active,
  className,
  children
}: {
  layout: Layout;
  geo: Geometry[];
  active: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const insight = INSIGHTS[active];
  const pct = (x: number) => `${x / 10}%`;

  return (
    <div className={`relative ${className ?? ""}`} style={{ height: L.height }}>
      {/* Faint base lines — always present */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 1000 ${L.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {geo.map((g) => (
          <path
            key={g.stream.id}
            d={g.path}
            fill="none"
            stroke="#2A8E9A"
            strokeWidth={0.75}
            vectorEffect="non-scaling-stroke"
            opacity={g.stream.opacity * 0.35}
          />
        ))}
      </svg>

      {/* Full-strength lines — revealed left to right once, when the section enters view */}
      <svg
        className="sd-draw absolute inset-0 h-full w-full"
        viewBox={`0 0 1000 ${L.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {geo.map((g) => (
          <g key={g.stream.id}>
            <path
              d={g.path}
              fill="none"
              stroke="#2A8E9A"
              strokeWidth={0.75}
              vectorEffect="non-scaling-stroke"
              opacity={g.stream.opacity}
            />
            {/* The stretch that misbehaves turns gold with its card */}
            {INSIGHTS.map((ins, k) =>
              ins.stream === g.stream.id ? (
                <path
                  key={k}
                  d={stretch(g, ins.from)}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: active === k ? 1 : 0, transition: "opacity 400ms cubic-bezier(.2,.7,.1,1)" }}
                />
              ) : null
            )}
          </g>
        ))}
      </svg>

      {/* Tiers — the logo's three pills, stood on end */}
      {L.tiers.map((x, t) => {
        const ys = geo.map((g) => g.tierYs[t]);
        const top = Math.min(...ys) - 9;
        return (
          <span
            key={x}
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              left: pct(x),
              top,
              height: Math.max(...ys) + 9 - top,
              width: 9,
              transform: "translateX(-50%)",
              background: "rgba(42,142,154,0.16)",
              border: "0.5px solid rgba(42,142,154,0.7)",
              opacity: TIER_OPACITY[t]
            }}
          />
        );
      })}

      {/* Stream labels */}
      {geo.map((g) => (
        <span
          key={g.stream.id}
          className={`absolute left-0 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 ${
            insight.stream === g.stream.id ? "text-gold" : "text-on-secondary-variant"
          }`}
          style={{ top: g.laneY - L.amp - 18 }}
        >
          {g.stream.label}
        </span>
      ))}

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

function InsightCard({ id, active, animate }: { id: string; active: number; animate: boolean }) {
  const insight = INSIGHTS[active];
  return (
    <div
      id={id}
      role="tabpanel"
      aria-label={insight.tab}
      className="bg-secondary-container px-5 py-4 sm:px-6 sm:py-5"
      style={{ borderTop: "0.5px solid #D4AF37", minHeight: 214 }}
    >
      <div key={active} className={animate ? "sd-card-in" : undefined}>
        <p className="sd-line font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary-light">{insight.header}</p>
        {insight.lines.map((line, i) => (
          <p
            key={line}
            className="sd-line mt-2.5 font-sans text-white/90 first:mt-3"
            style={{ fontSize: 15, lineHeight: 1.5, animationDelay: `${0.08 + i * 0.1}s` }}
          >
            {line}
          </p>
        ))}
        <p className="sd-line mt-3 font-sans text-white/70" style={{ fontSize: 14, lineHeight: 1.5, animationDelay: "0.28s" }}>
          <span className="mr-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary-light">Check:</span>
          {insight.check}
        </p>
      </div>
    </div>
  );
}

function Tabs({ panel, active, onSelect }: { panel: string; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="mt-3">
      <div role="tablist" aria-label="Example insights" className="flex flex-wrap gap-x-4 gap-y-1">
        {INSIGHTS.map((ins, i) => (
          <button
            key={ins.tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={panel}
            onClick={() => onSelect(i)}
            className={`sd-focus py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] transition-colors duration-200 ${
              i === active ? "text-white" : "text-on-secondary-variant hover:text-white"
            }`}
            style={{ borderBottom: `0.5px solid ${i === active ? "#D4AF37" : "transparent"}` }}
          >
            {ins.tab}
          </button>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.06em] text-on-secondary-variant">
        Example insight · illustrative data
      </p>
    </div>
  );
}

export default function SignalToDecision() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);
  // "static" = complete still frame (server render, reduced motion, already in view)
  // "armed"  = off-screen and waiting; "drawing" = the one-time draw-in
  const [draw, setDraw] = useState<"static" | "armed" | "drawing">("static");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    const fig = section?.querySelector("figure");
    if (!section || !fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only arm while the diagram is essentially still below the fold, so nobody
    // sees finished lines disappear before drawing in.
    const r = fig.getBoundingClientRect();
    if (window.innerHeight - r.top > r.height * 0.2) return;
    setDraw("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDraw("drawing");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(fig);
    return () => observer.disconnect();
  }, []);

  const select = (i: number) => {
    setAnimate(true);
    setActive(i);
  };

  return (
    <section
      id="signal"
      ref={ref}
      aria-labelledby="signal-title"
      data-draw={draw}
      className="sd-section grain relative scroll-mt-16 overflow-hidden bg-secondary px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary-light">What the AI does</p>
          <h2
            id="signal-title"
            className="mt-4 font-display font-bold text-white"
            style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            Your data in. One clear answer out.
          </h2>
          <p className="mt-5 max-w-[38ch] font-sans text-white/70" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            It reads the records your farm already keeps, spots what&apos;s starting to drift, and tells you what to check.
          </p>
        </div>

        {/* Visual */}
        <figure className="lg:col-span-8" aria-label="Example: four streams of farm data converge into one insight">
          {/* Desktop */}
          <Diagram layout={WIDE} geo={WIDE_GEO} active={active} className="hidden lg:block">
            <span
              aria-hidden="true"
              className="absolute"
              style={{ left: `calc(${WIDE.node.x / 10}% + 11px)`, top: WIDE.node.y, width: 22, height: 0.5, background: "rgba(212,175,55,0.7)" }}
            />
            <div
              className="absolute right-0"
              style={{ left: `calc(${WIDE.node.x / 10}% + 33px)`, top: WIDE.node.y - 60 }}
            >
              <InsightCard id="signal-insight-wide" active={active} animate={animate} />
              <Tabs panel="signal-insight-wide" active={active} onSelect={select} />
            </div>
          </Diagram>

          {/* Phones and tablets */}
          <div className="lg:hidden">
            <Diagram layout={NARROW} geo={NARROW_GEO} active={active}>
              <span
                aria-hidden="true"
                className="absolute"
                style={{ left: `${NARROW.node.x / 10}%`, top: NARROW.node.y + 11, bottom: 0, width: 0.5, background: "rgba(212,175,55,0.7)" }}
              />
            </Diagram>
            <InsightCard id="signal-insight-narrow" active={active} animate={animate} />
            <Tabs panel="signal-insight-narrow" active={active} onSelect={select} />
          </div>
        </figure>
      </div>
    </section>
  );
}
