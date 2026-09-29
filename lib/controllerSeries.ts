import { seeded } from "@/lib/signalSeries";

// Example data for "We get more out of your controller" (brief 3.3).
// Four readings from House 3 over 21 days. On its own each moves only slightly:
// water drifts down ~3% by day 4, feed stays flat, night temperature creeps up
// ~1.5°C and daily gain starts to slow. Read together they point to early
// respiratory stress at day 4. Water keeps sliding and only reaches the
// controller's alarm level around day 17. Illustrative, deterministic.

export const DAYS = 21;
export const FLAG_DAY = 4; // SenseAgri connects the readings
export const ALARM_DAY = 17; // controller alarm level reached (water)
export const ALARM = 0.195; // L/bird/day

export type Strip = {
  id: "water" | "feed" | "temp" | "gain";
  label: string;
  unit: string;
  points: number[];
  domain: [number, number];
  ticks: number[];
  decimals: number;
};

function series(seed: number, value: (d: number) => number, noise: number, decimals: number) {
  const rand = seeded(seed);
  return Array.from({ length: DAYS + 1 }, (_, d) => {
    const jitter = (rand() + rand() - 1) * noise;
    return Number((value(d) * (1 + jitter)).toFixed(decimals));
  });
}

export const STRIPS: Strip[] = [
  {
    id: "water",
    label: "Water intake",
    unit: "L/bird/day",
    points: series(3021, (d) => 0.232 * Math.pow(1 - 0.0104, d), 0.003, 4),
    domain: [0.18, 0.24],
    ticks: [0.18, 0.21, 0.24],
    decimals: 2
  },
  {
    id: "feed",
    label: "Feed intake",
    unit: "g/bird/day",
    points: series(3022, () => 112, 0.005, 1),
    domain: [104, 120],
    ticks: [105, 120],
    decimals: 0
  },
  {
    id: "temp",
    label: "Night house temp",
    unit: "°C",
    points: series(3023, (d) => 18.2 + Math.min(1.5, d * 0.38) + (d > 4 ? (d - 4) * 0.02 : 0), 0.006, 1),
    domain: [17.5, 20.5],
    ticks: [18, 20],
    decimals: 0
  },
  {
    id: "gain",
    label: "Daily weight gain",
    unit: "g/day",
    points: series(3024, (d) => 68 * Math.pow(1 - 0.011, d), 0.006, 1),
    domain: [52, 70],
    ticks: [55, 70],
    decimals: 0
  }
];
