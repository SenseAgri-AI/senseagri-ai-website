"use client";

import { useEffect, useRef } from "react";

// SenseAgri product dashboard — ported from Claude Design's
// design_handoff_dashboard_section bundle ("Version A — dashboard in a card").
// The dashboard is authored at a fixed 1680px design width and scaled down
// with CSS transform: scale() to fit whatever column width Block 02 gives it
// (matches the prototype's scale-to-fit approach — see README "how the
// dashboard is sized"). Charts are hand-rolled SVG with no external library;
// the engine is ported from dashboard-charts.js. To swap real data later,
// edit the `charts` config object below.

// ── Chart engine ──────────────────────────────────────────────────────────
const NS = "http://www.w3.org/2000/svg";
const C = {
  ink: "#16211F",
  ink2: "#5C6B6C",
  axis: "#9AA7A8",
  grid: "#EDF1F1",
  teal: "#2C8896",
  tealDeep: "#16606E",
  gold: "#B0881C",
  green: "#3C8B5B",
  red: "#CB4434",
  bandGreen: "#DBEAE0",
  bandRed: "#F7E3DF",
  barTeal: "#5C9DA8",
  gray: "#9AA6A6"
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function sx(i: number, n: number, x0: number, x1: number) {
  return n <= 1 ? x0 : lerp(x0, x1, i / (n - 1));
}
function sy(v: number, min: number, max: number, y0: number, y1: number) {
  return lerp(y0, y1, 1 - (v - min) / (max - min));
}
function smooth(pts: number[][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
function el<T extends SVGElement = SVGElement>(
  tag: string,
  attrs: Record<string, string | number>,
  parent?: Element
): T {
  const e = document.createElementNS(NS, tag) as unknown as T;
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(e);
  return e;
}
function txt(parent: Element, x: number, y: number, s: string, attrs?: Record<string, string | number>) {
  const t = el("text", {
    x,
    y,
    fill: C.axis,
    "font-size": 11,
    "font-family": "Inter, sans-serif",
    ...(attrs || {})
  }, parent);
  t.textContent = s;
  return t;
}

// ── line / area chart ────────────────────────────────────────────────────
type Tick = { v: number; l: string };
type Band = { from: number; to: number; fill: string };
type Threshold = { v: number; color: string; label?: string };
type Marker = { v: number; l: string; color?: string };

type LineCfg = {
  W: number; H: number; padL: number; padR: number; padT: number; padB: number;
  yMin: number; yMax: number; lineColor: string;
  yTicks?: Tick[]; xLabels?: string[];
  bands?: Band[]; thresholds?: Threshold[]; markers?: Marker[];
  data: number[];
  fill?: boolean; fillOpacity?: number; lineWidth?: number; dashed?: boolean;
};

function lineChart(svg: SVGElement, cfg: LineCfg) {
  const { W, H, padL, padR, padT, padB } = cfg;
  const x0 = padL, x1 = W - padR, y0 = padT, y1 = H - padB;
  const uid = "g" + Math.random().toString(36).slice(2, 8);
  const defs = el("defs", {}, svg);
  const grad = el("linearGradient", { id: uid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el("stop", { offset: 0, "stop-color": cfg.lineColor, "stop-opacity": cfg.fillOpacity ?? 0.18 }, grad);
  el("stop", { offset: 1, "stop-color": cfg.lineColor, "stop-opacity": 0.01 }, grad);

  (cfg.bands || []).forEach(b => {
    const yt = sy(b.to, cfg.yMin, cfg.yMax, y0, y1);
    const yb = sy(b.from, cfg.yMin, cfg.yMax, y0, y1);
    el("rect", { x: x0, y: yt, width: x1 - x0, height: yb - yt, fill: b.fill }, svg);
  });
  (cfg.yTicks || []).forEach(t => {
    const y = sy(t.v, cfg.yMin, cfg.yMax, y0, y1);
    el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.grid, "stroke-width": 1 }, svg);
    txt(svg, x0 - 8, y + 3.5, t.l, { "text-anchor": "end" });
  });
  (cfg.xLabels || []).forEach((l, i, arr) => {
    const x = sx(i, arr.length, x0, x1);
    txt(svg, x, H - 6, l, { "text-anchor": i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle" });
  });
  const pts: number[][] = cfg.data.map((v, i) => [sx(i, cfg.data.length, x0, x1), sy(v, cfg.yMin, cfg.yMax, y0, y1)]);
  const d = smooth(pts);
  if (cfg.fill !== false) {
    el("path", { d: `${d} L${x1.toFixed(1)},${y1} L${x0.toFixed(1)},${y1} Z`, fill: `url(#${uid})`, stroke: "none" }, svg);
  }
  el("path", {
    d, fill: "none", stroke: cfg.lineColor,
    "stroke-width": cfg.lineWidth || 2,
    "stroke-linejoin": "round", "stroke-linecap": "round",
    ...(cfg.dashed ? { "stroke-dasharray": "5 5" } : {})
  }, svg);
  (cfg.thresholds || []).forEach(t => {
    const y = sy(t.v, cfg.yMin, cfg.yMax, y0, y1);
    el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: t.color, "stroke-width": 1, "stroke-dasharray": "3 3", opacity: 0.9 }, svg);
    if (t.label) txt(svg, x1 - 2, y - 4, t.label, { "text-anchor": "end", fill: t.color, "font-size": 10, "font-weight": 600 });
  });
  (cfg.markers || []).forEach(mk => {
    const y = sy(mk.v, cfg.yMin, cfg.yMax, y0, y1);
    txt(svg, x1 + 2, y + 3.5, mk.l, { "text-anchor": "start", fill: mk.color || C.axis, "font-size": 10 });
  });
}

// ── bars + cumulative line ──────────────────────────────────────────────
type BarCfg = {
  W: number; H: number; padL: number; padR: number; padT: number; padB: number;
  yMax: number; yTicks?: Tick[]; xLabels?: string[];
  bars: number[]; cumulative: number[]; cumMax: number; cumLabel: string;
  barColor?: string; lineColor?: string;
};

function barChart(svg: SVGElement, cfg: BarCfg) {
  const { W, H, padL, padR, padT, padB } = cfg;
  const x0 = padL, x1 = W - padR, y0 = padT, y1 = H - padB;
  (cfg.yTicks || []).forEach(t => {
    const y = sy(t.v, 0, cfg.yMax, y0, y1);
    el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.grid, "stroke-width": 1, "stroke-dasharray": "3 4" }, svg);
    txt(svg, x0 - 8, y + 3.5, t.l, { "text-anchor": "end" });
  });
  (cfg.xLabels || []).forEach((l, i, arr) => {
    const x = sx(i, arr.length, x0, x1);
    txt(svg, x, H - 6, l, { "text-anchor": i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle" });
  });
  const n = cfg.bars.length, slot = (x1 - x0) / n, bw = Math.min(slot * 0.5, 16);
  const barCol = cfg.barColor || C.barTeal, lineCol = cfg.lineColor || C.gold;
  cfg.bars.forEach((v, i) => {
    if (v <= 0) return;
    const cx = x0 + slot * (i + 0.5);
    const y = sy(v, 0, cfg.yMax, y0, y1);
    el("rect", { x: cx - bw / 2, y, width: bw, height: y1 - y, fill: barCol, rx: 1 }, svg);
  });
  const pts: number[][] = cfg.cumulative.map((v, i) => [x0 + slot * (i + 0.5), sy(v, 0, cfg.cumMax, y0, y1)]);
  el("path", { d: smooth(pts), fill: "none", stroke: lineCol, "stroke-width": 2.4, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
  txt(svg, x1 + 2, sy(cfg.cumulative[cfg.cumulative.length - 1], 0, cfg.cumMax, y0, y1) + 3.5, cfg.cumLabel, {
    "text-anchor": "start", fill: lineCol, "font-size": 11, "font-weight": 700
  });
}

// ── trend with ±σ band + standard reference ─────────────────────────────
type TrendCfg = {
  W: number; H: number; padL: number; padR: number; padT: number; padB: number;
  yMin: number; yMax: number;
  yTicks?: Tick[]; xLabels?: string[];
  avg: number[]; std: number[] | number;
  standard?: number[]; standardColor?: string;
  avgColor?: string; bandFill?: string;
};

function trendBand(svg: SVGElement, cfg: TrendCfg) {
  const { W, H } = cfg;
  const x0 = cfg.padL, x1 = W - cfg.padR, y0 = cfg.padT, y1 = H - cfg.padB;
  const n = cfg.avg.length;
  const X = (i: number) => sx(i, n, x0, x1);
  const Y = (v: number) => sy(v, cfg.yMin, cfg.yMax, y0, y1);
  const sd = (i: number) => Array.isArray(cfg.std) ? cfg.std[i] : cfg.std;
  (cfg.yTicks || []).forEach(t => {
    const y = Y(t.v);
    el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.grid, "stroke-width": 1 }, svg);
    txt(svg, x0 - 8, y + 3.5, t.l, { "text-anchor": "end" });
  });
  (cfg.xLabels || []).forEach((l, i, arr) => {
    const x = lerp(x0, x1, i / (arr.length - 1));
    txt(svg, x, H - 6, l, { "text-anchor": i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle" });
  });
  const up = cfg.avg.map((v, i) => [X(i), Y(v + sd(i))]);
  const lo = cfg.avg.map((v, i) => [X(i), Y(v - sd(i))]);
  let band = "M" + up.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
  band += " L" + lo.reverse().map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L") + " Z";
  el("path", { d: band, fill: cfg.bandFill || "rgba(44,136,150,0.13)", stroke: "none" }, svg);
  if (cfg.standard) {
    const pts: number[][] = cfg.standard.map((v, i) => [X(i), Y(v)]);
    el("path", { d: smooth(pts), fill: "none", stroke: cfg.standardColor || C.gold, "stroke-width": 2, "stroke-dasharray": "6 5", "stroke-linecap": "round" }, svg);
  }
  const apts: number[][] = cfg.avg.map((v, i) => [X(i), Y(v)]);
  el("path", { d: smooth(apts), fill: "none", stroke: cfg.avgColor || C.teal, "stroke-width": 2.8, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
  const last = apts[apts.length - 1];
  el("circle", { cx: last[0], cy: last[1], r: 4, fill: "#fff", stroke: cfg.avgColor || C.teal, "stroke-width": 2.4 }, svg);
}

// ── gauge ────────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = (deg - 180) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
}
function gauge(svg: SVGElement, value: number) {
  const cx = 130, cy = 134, r = 96, sw = 18;
  const segs: Array<[number, number, string]> = [[0, 33, "#CB4434"], [33, 62, "#D9B233"], [62, 100, "#2C8896"]];
  segs.forEach(([a, b, col]) => {
    el("path", { d: arc(cx, cy, r, a * 1.8, b * 1.8), fill: "none", stroke: col, "stroke-width": sw, "stroke-linecap": "butt" }, svg);
  });
  const ang = value * 1.8;
  const [nx, ny] = polar(cx, cy, r, ang);
  el("line", { x1: cx, y1: cy, x2: nx, y2: ny, stroke: C.tealDeep, "stroke-width": 3, "stroke-linecap": "round" }, svg);
  el("circle", { cx: nx, cy: ny, r: 7, fill: "#fff", stroke: C.tealDeep, "stroke-width": 3 }, svg);
  el("circle", { cx, cy, r: 3.5, fill: C.tealDeep }, svg);
  const num = el("text", { x: cx, y: cy - 20, "text-anchor": "middle", "font-size": 46, "font-weight": 800, fill: C.ink, "font-family": "Inter, sans-serif", "letter-spacing": "-0.02em" }, svg);
  num.textContent = String(value);
  const lab = el("text", { x: cx, y: cy - 1, "text-anchor": "middle", "font-size": 11.5, "font-weight": 700, fill: C.ink2, "letter-spacing": "0.12em", "font-family": "Inter, sans-serif" }, svg);
  lab.textContent = "HEALTH SCORE";
}

// ── chart data — placeholder values from the prototype. Swap in real data
//    when the telemetry feed is wired up.
const X5 = ["22:30", "03:30", "08:30", "13:30", "18:30"];
type ChartEntry =
  | { fn: typeof lineChart; cfg: LineCfg }
  | { fn: typeof barChart; cfg: BarCfg }
  | { fn: typeof trendBand; cfg: TrendCfg };

const charts: Record<string, ChartEntry> = {
  temp: { fn: lineChart, cfg: {
    W: 460, H: 118, padL: 34, padR: 30, padT: 12, padB: 24, yMin: 4, yMax: 32, lineColor: C.teal,
    yTicks: [{ v: 10, l: "10" }, { v: 15, l: "15" }, { v: 20, l: "20" }, { v: 25, l: "25" }, { v: 30, l: "30" }],
    xLabels: X5, bands: [{ from: 18, to: 26, fill: C.bandGreen }],
    thresholds: [{ v: 26, color: "#94A8A0" }, { v: 18, color: "#94A8A0" }],
    markers: [{ v: 26, l: "26" }, { v: 18, l: "18" }],
    data: [6, 5, 4.5, 5.5, 8, 13, 18.5, 22, 24, 23.5, 21, 16, 11.5, 9.5, 8, 7, 6.4]
  } },
  humid: { fn: lineChart, cfg: {
    W: 460, H: 118, padL: 34, padR: 30, padT: 12, padB: 24, yMin: 28, yMax: 96, lineColor: C.teal,
    yTicks: [{ v: 30, l: "30" }, { v: 50, l: "50" }, { v: 70, l: "70" }, { v: 90, l: "90" }],
    xLabels: X5, bands: [{ from: 50, to: 70, fill: C.bandGreen }],
    markers: [{ v: 70, l: "70" }, { v: 50, l: "50" }],
    data: [82, 84, 86, 89, 91, 92, 89, 71, 50, 38, 33, 41, 62, 79, 83, 82, 81]
  } },
  vent: { fn: lineChart, cfg: {
    W: 460, H: 118, padL: 38, padR: 30, padT: 12, padB: 24, yMin: 300, yMax: 2200, lineColor: C.teal,
    yTicks: [{ v: 500, l: "500" }, { v: 1000, l: "1.0k" }, { v: 1500, l: "1.5k" }, { v: 2000, l: "2.0k" }],
    xLabels: X5, bands: [{ from: 1400, to: 2200, fill: C.bandRed }],
    thresholds: [{ v: 1400, color: C.red, label: "1,400" }],
    data: [520, 545, 560, 610, 565, 540, 560, 700, 600, 525, 545, 560, 545, 560, 540, 535, 527]
  } },
  air: { fn: lineChart, cfg: {
    W: 460, H: 118, padL: 30, padR: 32, padT: 12, padB: 24, yMin: 0, yMax: 4.6, lineColor: C.teal,
    yTicks: [{ v: 0, l: "0" }, { v: 1, l: "1" }, { v: 2, l: "2" }, { v: 3, l: "3" }, { v: 4, l: "4" }],
    xLabels: X5, bands: [{ from: 0.9, to: 1.7, fill: "#E4EDED" }],
    markers: [{ v: 1.7, l: "1.7" }, { v: 0.9, l: "0.9" }],
    data: [1.2, 1.25, 1.2, 1.3, 1.5, 1.32, 1.2, 1.28, 1.22, 1.3, 1.45, 1.95, 2.0, 1.5, 1.32, 1.3, 1.28]
  } },
  feed: { fn: lineChart, cfg: {
    W: 480, H: 120, padL: 40, padR: 22, padT: 16, padB: 26, yMin: 0.8, yMax: 1.6, lineColor: C.gray,
    dashed: true, fill: true, fillOpacity: 0.12, lineWidth: 2,
    yTicks: [{ v: 0.8, l: "0.8" }, { v: 1.0, l: "1.0" }, { v: 1.2, l: "1.2" }, { v: 1.4, l: "1.4" }, { v: 1.6, l: "1.6" }],
    xLabels: ["−7d", "−3d", "now"],
    data: [0.72, 0.95, 1.25, 1.43, 1.44, 1.3, 1.05, 0.85, 0.82, 0.92, 1.08, 1.18, 1.19, 1.12, 0.98, 0.86]
  } },
  water: { fn: barChart, cfg: {
    W: 480, H: 120, padL: 34, padR: 40, padT: 16, padB: 26, yMax: 42,
    yTicks: [{ v: 0, l: "0" }, { v: 20, l: "20" }, { v: 40, l: "40" }],
    xLabels: ["23:00", "04:00", "09:00", "14:00", "19:00"],
    bars: [0,0,0,0,0,0,0,0,0,0,20,30,20,10,0,10,30,10,0,0,40,20,20,0,0,0,0],
    cumulative: [0,0,0,0,0,0,0,0,0,0,20,50,70,80,80,90,120,130,130,130,170,190,210,220,220,220,220],
    cumMax: 240, cumLabel: "220L"
  } },
  feedc: { fn: barChart, cfg: {
    W: 480, H: 120, padL: 38, padR: 44, padT: 16, padB: 26, yMax: 64,
    yTicks: [{ v: 0, l: "0" }, { v: 30, l: "30" }, { v: 60, l: "60" }],
    xLabels: ["23:00", "04:00", "09:00", "14:00", "19:00"],
    bars: [0,0,0,0,0,0,0,0,30,48,38,18,0,52,56,30,0,0,42,50,34,20,0,0,0,0,0],
    cumulative: [0,0,0,0,0,0,0,0,30,78,116,134,134,186,242,272,272,272,314,364,398,418,418,418,418,418,418],
    cumMax: 460, cumLabel: "515 kg", barColor: "#C7A24A", lineColor: "#5C9DA8"
  } },
  hepd: { fn: trendBand, cfg: {
    W: 980, H: 120, padL: 38, padR: 30, padT: 18, padB: 26, yMin: 80, yMax: 100,
    yTicks: [{ v: 80, l: "80" }, { v: 85, l: "85" }, { v: 90, l: "90" }, { v: 95, l: "95" }, { v: 100, l: "100%" }],
    xLabels: ["1 May", "8 May", "15 May", "22 May", "29 May"],
    avg: [87.4,88.0,88.4,88.1,89.0,89.5,89.2,90.0,90.4,90.1,90.8,91.0,90.6,91.3,91.6,91.2,91.8,92.0,91.6,92.1,92.3,91.9,92.2,92.4,92.0,92.3,92.5,92.1,92.0,92.0],
    std: [2.6,2.5,2.5,2.7,2.4,2.3,2.5,2.3,2.2,2.4,2.2,2.1,2.4,2.1,2.0,2.2,2.0,2.0,2.2,2.0,1.9,2.1,1.9,1.9,2.1,1.9,1.8,2.0,2.0,2.0],
    standard: [90.0,90.3,90.6,90.9,91.2,91.5,91.7,91.9,92.1,92.3,92.5,92.6,92.8,92.9,93.0,93.1,93.2,93.3,93.4,93.4,93.5,93.5,93.6,93.6,93.7,93.7,93.7,93.8,93.8,93.8]
  } },
  pef: { fn: lineChart, cfg: {
    W: 560, H: 120, padL: 36, padR: 40, padT: 18, padB: 26, yMin: 240, yMax: 360, lineColor: C.teal,
    yTicks: [{ v: 240, l: "240" }, { v: 280, l: "280" }, { v: 320, l: "320" }, { v: 360, l: "360" }],
    xLabels: ["1 May", "15 May", "29 May"], fill: true, fillOpacity: 0.16, lineWidth: 2.6,
    thresholds: [{ v: 320, color: C.gold, label: "TARGET 320" }],
    data: [296,300,298,305,309,307,312,310,316,318,315,320,322,319,324,326,323,328,330,327,329,331,328,330,333,331,329,332,330,331]
  } }
};

// ── Component ────────────────────────────────────────────────────────────
export default function DashboardCard() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const drawnRef = useRef(false);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    // Draw all charts once (guard so React 18 StrictMode double-effect doesn't double-render).
    if (!drawnRef.current) {
      body.querySelectorAll(".sa-js-gauge").forEach((g) => gauge(g as SVGElement, 70));
      body.querySelectorAll("[data-chart]").forEach((svg) => {
        const key = svg.getAttribute("data-chart");
        if (!key) return;
        const c = charts[key];
        if (c) (c.fn as (s: SVGElement, cfg: unknown) => void)(svg as SVGElement, c.cfg);
      });
      drawnRef.current = true;
    }

    // Scale-to-fit: the dashboard is authored at 1680px; scale down to whatever
    // width the card column gives us. Runs on first paint and on every resize.
    const fit = () => {
      const dash = body.querySelector(".sa-dash") as HTMLElement | null;
      const stage = body.querySelector(".sa-stage") as HTMLElement | null;
      if (!dash || !stage) return;
      const s = Math.max(0.05, body.clientWidth / 1680);
      dash.style.transformOrigin = "top left";
      dash.style.transform = `scale(${s})`;
      const h = dash.offsetHeight * s;
      stage.style.height = `${h}px`;
      body.style.height = `${h}px`;
    };
    fit();
    requestAnimationFrame(() => {
      fit();
      requestAnimationFrame(fit);
    });
    const ro = new ResizeObserver(fit);
    ro.observe(body);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div className="sa-card-shell">
      <div ref={bodyRef} className="sa-card-body">
        <div className="sa-stage">
          <div className="sa-dash">
            {/* Top bar */}
            <header className="sa-topbar">
              <span className="sa-brand">
                <svg className="sa-mark" viewBox="0 32 90 76" fill="none" aria-hidden="true">
                  <rect x="24" y="32" width="42" height="20" rx="10" fill="#2A8E9A" opacity=".55" />
                  <rect x="10" y="60" width="70" height="20" rx="10" fill="#2A8E9A" opacity=".75" />
                  <rect x="0" y="88" width="90" height="20" rx="10" fill="#2A8E9A" />
                </svg>
                SenseAgri AI
              </span>
              <span className="sa-sep" />
              <span className="sa-farm">Farm · House 1</span>
              <span className="sa-sep" />
              <span className="sa-meta">
                <span><b>4,479</b> birds</span>
                <span><b>20 wks</b> flock age</span>
                <span><b>Apr 2025</b> placed</span>
              </span>
              <span className="sa-right">
                <span className="sa-live"><span className="sa-live-dot" />LIVE</span>
                <span>Sat 30 May, 22:42</span>
              </span>
            </header>

            <div className="sa-grid">
              {/* ROW 1 — hero (gauge + metrics) + AI alerts */}
              <section className="sa-row1">
                <div className="sa-card sa-hero">
                  <div className="sa-gauge-cell">
                    <svg className="sa-js-gauge" viewBox="0 0 260 168" aria-label="Health score 70" />
                    <div className="sa-gauge-status"><span className="sa-sq" />Normal</div>
                  </div>
                  <div className="sa-metrics">
                    <div className="sa-mhead sa-prod">PRODUCTION</div>
                    <div className="sa-mhead sa-welf">WELFARE</div>
                    <div className="sa-mhead sa-fin">FINANCIAL</div>

                    <div className="sa-cell">
                      <div className="sa-k">Hen-day %</div>
                      <div className="sa-v">92.0%</div>
                      <div className="sa-sub">4,479 hens · 14 May</div>
                      <div className="sa-tag"><span className="sa-sq" />Normal production rate</div>
                    </div>
                    <div className="sa-cell">
                      <div className="sa-k">Avg egg mass</div>
                      <div className="sa-v">57.9 g</div>
                      <div className="sa-sub">Estimated from grade<br />midpoints · 14 May</div>
                    </div>
                    <div className="sa-cell">
                      <div className="sa-k">Mortality rate</div>
                      <div className="sa-v">1.75%</div>
                      <div className="sa-sub">0 today · 80 total · 14 May</div>
                      <div className="sa-tag"><span className="sa-sq" />Within normal range</div>
                    </div>
                    <div className="sa-cell sa-edge">
                      <div className="sa-k">Revenue today</div>
                      <div className="sa-v sa-gold">R 7 561,30</div>
                      <div className="sa-sub">Based on 14 May production</div>
                    </div>

                    <div className="sa-cell sa-nobottom">
                      <div className="sa-k">Eggs today</div>
                      <div className="sa-v">4,049</div>
                      <div className="sa-sub">J 66 · XL 1535 · L 2247 · M 201<br />S 0 · Broken 34 · 14 May</div>
                    </div>
                    <div className="sa-cell sa-nobottom">
                      <div className="sa-k">Feed per egg</div>
                      <div className="sa-v">0.15 pulses</div>
                      <div className="sa-sub">Calibration needed for kg/egg<br />· 14 May</div>
                    </div>
                    <div className="sa-cell sa-nobottom">
                      <div className="sa-k">Water consumed today</div>
                      <div className="sa-v sa-small">220 L</div>
                      <div className="sa-sub">Since 00:00 SAST</div>
                    </div>
                    <div className="sa-cell sa-edge sa-nobottom">
                      <div className="sa-k">Weekly revenue</div>
                      <div className="sa-v sa-gold sa-small">R 53 903,40</div>
                      <div className="sa-sub">Last 7 days</div>
                    </div>
                  </div>
                </div>

                <div className="sa-alerts">
                  <div className="sa-alert sa-warn">
                    <div className="sa-at">TEMPERATURE</div>
                    <div className="sa-am">Cold night. 6.4°C — below 10°C threshold. Birds diverting energy to thermoregulation. Expect increased feed intake.</div>
                  </div>
                  <div className="sa-alert sa-ok">
                    <div className="sa-at">VENTILATION</div>
                    <div className="sa-am">Good. CO₂ 527 ppm — ventilation sufficient.</div>
                  </div>
                  <div className="sa-alert sa-cau">
                    <div className="sa-at">HUMIDITY</div>
                    <div className="sa-am">High. 80.5% RH — outside optimal 50–70% band.</div>
                  </div>
                  <div className="sa-alert sa-neu">
                    <div className="sa-at">HEN-DAY %</div>
                    <div className="sa-am">Production data not yet integrated — connect egg count feed.</div>
                  </div>
                </div>
              </section>

              {/* ROW 2 — environment charts */}
              <section className="sa-row2">
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head"><h3>Temperature</h3><span className="sa-read"><b className="sa-r-red">6.4°C</b> norm 18–26°C</span></div>
                  <svg className="sa-chart-svg" data-chart="temp" viewBox="0 0 460 118" />
                  <div className="sa-chart-foot">Normal range 18–26°C · configurable</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head"><h3>Humidity</h3><span className="sa-read"><b className="sa-r-gold">81%</b> RH · norm 50–70%</span></div>
                  <svg className="sa-chart-svg" data-chart="humid" viewBox="0 0 460 118" />
                  <div className="sa-chart-foot">Normal range 50–70% RH · configurable</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head"><h3>Ventilation</h3><span className="sa-read"><b className="sa-r-teal">527</b> ppm CO₂ · max 1,400</span></div>
                  <svg className="sa-chart-svg" data-chart="vent" viewBox="0 0 460 118" />
                  <div className="sa-chart-foot">CO₂ proxy · threshold 1,400 ppm configurable</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head"><h3>Air quality</h3><span className="sa-read"><b className="sa-r-teal">1.28</b> TVOC index</span></div>
                  <svg className="sa-chart-svg" data-chart="air" viewBox="0 0 460 118" />
                  <div className="sa-chart-foot">±2σ adaptive baseline · farm normal</div>
                </div>
              </section>

              {/* ROW 3 — resources */}
              <section className="sa-row3">
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head">
                    <div>
                      <h3>Feed conversion</h3>
                      <div className="sa-subhead">7-DAY · PULSES/EGG</div>
                    </div>
                    <span className="sa-read"><b className="sa-r-gold">1.20</b></span>
                  </div>
                  <svg className="sa-chart-svg" data-chart="feed" viewBox="0 0 480 120" />
                  <div className="sa-chart-foot">Pulses per egg · 7-day average</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head">
                    <div>
                      <h3>Water consumption</h3>
                      <div className="sa-subhead">TODAY · LITRES</div>
                    </div>
                    <span className="sa-read"><b className="sa-r-teal">220</b> L</span>
                  </div>
                  <svg className="sa-chart-svg" data-chart="water" viewBox="0 0 480 120" />
                  <div className="sa-chart-foot">Meter reads in 10 L increments</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head">
                    <div>
                      <h3>Feed consumption</h3>
                      <div className="sa-subhead">TODAY · KG</div>
                    </div>
                    <span className="sa-read"><b className="sa-r-gold">515</b> kg</span>
                  </div>
                  <svg className="sa-chart-svg" data-chart="feedc" viewBox="0 0 480 120" />
                  <div className="sa-chart-foot">Auger pulses × calibration · 14 May</div>
                </div>
              </section>

              {/* ROW 4 — production analytics */}
              <section className="sa-row4">
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head">
                    <div>
                      <h3>Hen-day production</h3>
                      <div className="sa-subhead">30-DAY · MOVING AVERAGE ± σ</div>
                    </div>
                    <span className="sa-legend">
                      <span className="sa-lg"><i className="sa-sw sa-sw-band" />±1σ spread</span>
                      <span className="sa-lg"><i className="sa-sw" />Flock average</span>
                      <span className="sa-lg"><i className="sa-sw sa-sw-gold" />Breed standard</span>
                    </span>
                  </div>
                  <svg className="sa-chart-svg" data-chart="hepd" viewBox="0 0 980 120" />
                  <div className="sa-chart-foot">Flock 92.0% vs breed standard 93.8% · tracking 1.8 pts below curve</div>
                </div>
                <div className="sa-card sa-chart-card">
                  <div className="sa-chart-head">
                    <div>
                      <h3>Poultry efficiency factor</h3>
                      <div className="sa-subhead">30-DAY · PEF INDEX</div>
                    </div>
                    <span className="sa-read"><b className="sa-r-teal">331</b> today</span>
                  </div>
                  <svg className="sa-chart-svg" data-chart="pef" viewBox="0 0 560 120" />
                  <div className="sa-chart-foot">Survival × hen-day ÷ feed conversion · target 320</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
