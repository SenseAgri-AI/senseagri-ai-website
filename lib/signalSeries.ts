// Deterministic example data for the homepage "Signal to decision" section.
// Everything is generated from a fixed seed so the server render, the client
// render and every screenshot show the same 30 days. Illustrative only.

export const DAYS = 30;

// mulberry32 — tiny seeded PRNG, returns floats in [0, 1)
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type StreamId = "water" | "feed" | "temp" | "eggs";

export type Stream = {
  id: StreamId;
  label: string;
  decimals: number;
  opacity: number;
  points: number[];
};

type Spec = {
  id: StreamId;
  label: string;
  base: number;
  noise: number; // fraction of base
  decimals: number;
  opacity: number;
  shape?: (day: number) => number; // multiplier on base
};

const SPECS: Spec[] = [
  {
    id: "water",
    label: "Water · L/day",
    base: 4180,
    noise: 0.007,
    decimals: 0,
    opacity: 0.9,
    // Last three days slide 6% while feed holds (insight 1)
    shape: (d) => (d >= 27 ? 1 - [0.022, 0.043, 0.06][d - 27] : 1)
  },
  { id: "feed", label: "Feed · kg/day", base: 2210, noise: 0.006, decimals: 0, opacity: 0.7 },
  {
    id: "temp",
    label: "House temp · °C",
    base: 24.2,
    noise: 0.012,
    decimals: 1,
    opacity: 0.55,
    // Night-time lows pull the daily mean down over four days (insight 2)
    shape: (d) => (d >= 26 ? 1 - [0.018, 0.034, 0.05, 0.062][d - 26] : 1)
  },
  {
    id: "eggs",
    label: "Eggs · /day",
    base: 18420,
    noise: 0.004,
    decimals: 0,
    opacity: 0.75,
    // Slow drift since the feed change on the 12th (insight 3)
    shape: (d) => (d >= 11 ? 1 - (d - 11) * 0.0011 : 1)
  }
];

export const STREAMS: Stream[] = SPECS.map((spec, i) => {
  const rand = seeded(20260929 + i * 97);
  const points = Array.from({ length: DAYS }, (_, d) => {
    const jitter = (rand() + rand() - 1) * spec.noise; // soft triangular noise
    const v = spec.base * (spec.shape ? spec.shape(d) : 1) * (1 + jitter);
    return spec.decimals === 0 ? Math.round(v) : Number(v.toFixed(spec.decimals));
  });
  return {
    id: spec.id,
    label: spec.label,
    decimals: spec.decimals,
    opacity: spec.opacity,
    points
  };
});

export type Insight = {
  tab: string;
  header: string;
  lines: [string, string];
  check: string;
  stream: StreamId;
  from: number; // first day index of the highlighted stretch
};

// Copy is fixed by the rebuild brief (section 3.2) — do not edit.
export const INSIGHTS: Insight[] = [
  {
    tab: "Layers · water",
    header: "House 3 · Layers · 42 wks · 3-day trend",
    lines: [
      "Water intake down 6% over three days while feed held steady.",
      "This pattern often comes before a respiratory problem."
    ],
    check: "walk the back third of the house today, listen for rattles.",
    stream: "water",
    from: 26
  },
  {
    tab: "Broilers · growth",
    header: "House 1 · Broilers · Day 24 · 4-day trend",
    lines: [
      "Daily gain has slipped below this flock's own curve for four days.",
      "At this rate the flock finishes about 90 g light at day 35."
    ],
    check: "feed line pressure and night-time house temperature.",
    stream: "temp",
    from: 25
  },
  {
    tab: "Layers · egg weight",
    header: "House 2 · Layers · Since feed change on the 12th",
    lines: [
      "Egg weight drifting down 0.4 g a week.",
      "Small today. Roughly R 2,100 a month by December if it holds."
    ],
    check: "the new ration's calcium and energy spec with your nutritionist.",
    stream: "eggs",
    from: 11
  }
];
