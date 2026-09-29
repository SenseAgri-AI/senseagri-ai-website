// Fig. 1 — broiler house cross-section, tunnel-ventilated, looking down the house.
// Single stroke weight, two colours (petrol structure, teal data). Layers build up
// with the four steps in "How the AI thinks":
//   1 Connect  — data points appear on the equipment
//   2 Learn    — a teal "twin" outline duplicates the house
//   3 Compare  — faint neighbouring houses appear behind
//   4 Explain  — one point turns gold and a callout explains it
// `step` is cumulative; 4 is the complete frame (server render, phones, no JS).

const INK = "#002E35";
const TEAL = "#2A8E9A";
const GOLD = "#D4AF37";
const SW = 1; // the one stroke weight

type Point = { id: string; x: number; y: number; label: string; lx: number; ly: number; anchor?: "start" | "end" | "middle" };

const POINTS: Point[] = [
  { id: "ctrl", x: 168, y: 262, label: "House temp", lx: 104, ly: 250, anchor: "end" },
  { id: "inlet", x: 160, y: 226, label: "Inlet", lx: 104, ly: 214, anchor: "end" },
  { id: "fan", x: 382, y: 262, label: "Fan run-time", lx: 404, ly: 238 },
  { id: "feed", x: 222, y: 322, label: "Feed", lx: 196, ly: 380, anchor: "end" },
  { id: "water", x: 290, y: 314, label: "Water", lx: 262, ly: 400, anchor: "end" },
  { id: "scale", x: 336, y: 351, label: "Bird weight", lx: 352, ly: 400 },
  { id: "silo", x: 556, y: 166, label: "Silo level", lx: 556, ly: 122, anchor: "middle" }
];

const FLAGGED = "water";

function House({ stroke, dash, opacity = 1 }: { stroke: string; dash?: string; opacity?: number }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={SW} strokeDasharray={dash} opacity={opacity}>
      {/* Roof, eaves, walls, ground */}
      <path d="M132 208 L320 124 L508 208" />
      <path d="M150 200 V360 M490 200 V360" />
      <path d="M150 212 H490" />
      <path d="M96 360 H600" />
    </g>
  );
}

function Fan({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={26} />
      <circle cx={cx} cy={cy} r={4} />
      {[0, 120, 240].map((a) => {
        const r = (a * Math.PI) / 180;
        const x1 = cx + Math.cos(r) * 6;
        const y1 = cy + Math.sin(r) * 6;
        const x2 = cx + Math.cos(r + 0.9) * 22;
        const y2 = cy + Math.sin(r + 0.9) * 22;
        return <path key={a} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} Q${(cx + Math.cos(r + 0.2) * 19).toFixed(1)} ${(cy + Math.sin(r + 0.2) * 19).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
      })}
    </g>
  );
}

// A feed line seen end-on: suspension cable, pipe, drop tube and pan
function FeedLine({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 212 V318`} strokeDasharray="2 3" />
      <circle cx={x} cy={322} r={4} />
      <path d={`M${x} 326 V338`} />
      <path d={`M${x - 14} 350 L${x - 8} 338 H${x + 8} L${x + 14} 350 Z`} />
    </g>
  );
}

// A nipple drinker line seen end-on
function WaterLine({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 212 V310`} strokeDasharray="2 3" />
      <circle cx={x} cy={314} r={3.5} />
      <path d={`M${x} 318 V326`} />
    </g>
  );
}

function SmallHouse({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={INK} strokeWidth={SW / s}>
      <path d="M-10 84 L180 0 L370 84 M8 76 V236 M352 76 V236 M-40 236 H400" />
    </g>
  );
}

export default function HouseDiagram({ step }: { step: number }) {
  const show = (n: number) => ({
    opacity: step >= n ? 1 : 0,
    transition: "opacity 450ms cubic-bezier(.2,.7,.1,1)"
  });

  return (
    <figure className="hd-figure relative">
      <div className="relative bg-surface-container-lowest" style={{ border: "0.5px solid #BEC8CA" }}>
        {/* Registration marks at the corners */}
        {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
          <span key={pos} aria-hidden="true" className={`absolute ${pos} h-3 w-3`}>
            <span className="absolute left-1/2 top-0 h-full" style={{ width: 0.5, background: "#6B7C80" }} />
            <span className="absolute left-0 top-1/2 w-full" style={{ height: 0.5, background: "#6B7C80" }} />
          </span>
        ))}

        <svg
          viewBox="0 -64 660 494"
          className="block h-auto w-full"
          role="img"
          aria-label="Line drawing of a broiler house cross-section showing fans, inlets, feed lines, water lines, a bird scale and a silo, with the data points SenseAgri reads."
        >
          {/* 3 · Compare — neighbouring houses on the system */}
          <g style={show(3)}>
            <g opacity={0.28}>
              <SmallHouse x={18} y={40} s={0.26} />
              <SmallHouse x={120} y={24} s={0.2} />
              <SmallHouse x={470} y={30} s={0.22} />
            </g>
            <g fill={TEAL} opacity={0.5}>
              <circle cx={65} cy={78} r={2.5} />
              <circle cx={156} cy={52} r={2.5} />
              <circle cx={509} cy={64} r={2.5} />
            </g>
            <text x={24} y={12} className="hd-label font-mono" fontSize={9} letterSpacing="1" fill="#6B7C80">
              OTHER FARMS ON THE SYSTEM
            </text>
          </g>

          {/* 2 · Learn — the digital twin */}
          <g style={show(2)}>
            <g transform="translate(14 -14)">
              <path d="M132 208 L320 124 L508 208 L508 346 L150 346 Z" fill={TEAL} opacity={0.05} />
              <House stroke={TEAL} dash="4 4" opacity={0.7} />
            </g>
            <text x={420} y={140} className="hd-label font-mono" fontSize={9} letterSpacing="1" fill={TEAL}>
              DIGITAL TWIN
            </text>
          </g>

          {/* The house itself */}
          <House stroke={INK} />
          <g fill="none" stroke={INK} strokeWidth={SW} opacity={0.85}>
            {/* Tunnel fans on the far end wall */}
            <Fan cx={262} cy={262} />
            <Fan cx={382} cy={262} />
            {/* Side-wall inlets, flaps open inward */}
            <path d="M150 222 L166 232 M490 222 L474 232" />
            {/* Controller on the wall */}
            <rect x={156} y={252} width={16} height={22} />
            {/* Feed and water lines */}
            <FeedLine x={222} />
            <FeedLine x={420} />
            <WaterLine x={290} />
            <WaterLine x={352} />
            {/* Hanging bird scale */}
            <path d="M336 212 V346 M324 346 H348 V352 H324 Z" />
            {/* Litter */}
            <path d="M150 356 H490" strokeDasharray="1 4" />
            {/* Silo and feed auger */}
            <path d="M536 150 H576 V272 L562 300 H550 L536 272 Z M536 150 L556 134 L576 150" />
            <path d="M556 300 V318 H490" />
          </g>

          {/* 1 · Connect — data points on the equipment */}
          <g style={show(1)}>
            {POINTS.map((p) => (
              <g key={p.id}>
                <line x1={p.x} y1={p.y} x2={p.lx + (p.anchor === "end" ? 4 : p.anchor === "middle" ? 0 : -4)} y2={p.ly - 3} stroke={TEAL} strokeWidth={0.5} />
                <text
                  x={p.lx}
                  y={p.ly}
                  textAnchor={p.anchor ?? "start"}
                  className="hd-label font-mono"
                  fontSize={9.5}
                  letterSpacing="0.8"
                  fill={TEAL}
                  stroke="#fff"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {p.label.toUpperCase()}
                </text>
                <circle cx={p.x} cy={p.y} r={4} fill="#fff" stroke={TEAL} strokeWidth={SW} />
                <circle cx={p.x} cy={p.y} r={1.8} fill={TEAL} />
              </g>
            ))}
          </g>

          {/* 4 · Explain — one point turns gold, with a callout */}
          <g style={show(4)}>
            {POINTS.filter((p) => p.id === FLAGGED).map((p) => (
              <g key={p.id}>
                <circle cx={p.x} cy={p.y} r={9} fill="none" stroke={GOLD} strokeWidth={0.75} />
                <circle cx={p.x} cy={p.y} r={4.5} fill={GOLD} />
                <path className="hd-callout-svg" d={`M${p.x} ${p.y - 9} V26`} fill="none" stroke={GOLD} strokeWidth={0.75} />
              </g>
            ))}
            <g className="hd-callout-svg" transform="translate(222 -52)">
              <rect width={212} height={78} fill="#fff" stroke="#BEC8CA" strokeWidth={0.5} />
              <path d="M0 0.25 H212" stroke={GOLD} strokeWidth={0.75} />
              <text x={10} y={17} className="font-mono" fontSize={8.5} letterSpacing="0.8" fill={TEAL}>
                WATER · DAY 24 · 3-DAY TREND
              </text>
              <text x={10} y={36} className="font-sans" fontSize={11} fill={INK}>
                Intake 5% under this flock&apos;s curve
              </text>
              <text x={10} y={51} className="font-sans" fontSize={11} fill={INK}>
                while feed held. Likely cause: nipples.
              </text>
              <text x={10} y={67} className="font-sans" fontSize={11} fill="#3F4849">
                Check: water pressure on line 1.
              </text>
            </g>
          </g>
        </svg>
      </div>
      <div className="hd-callout-html mt-3 bg-surface-container-lowest px-4 py-3" style={{ border: "0.5px solid #BEC8CA", borderTop: `0.5px solid ${GOLD}`, ...show(4) }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-pill">Water · Day 24 · 3-day trend</p>
        <p className="mt-1.5 font-sans text-[14px] leading-snug text-primary">
          Intake 5% under this flock&apos;s curve while feed held. Likely cause: nipples.
        </p>
        <p className="mt-1 font-sans text-[14px] leading-snug text-on-surface-variant">Check: water pressure on line 1.</p>
      </div>
      <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-outline">
        Fig. 1 · House cross-section, broiler, tunnel-ventilated · Example
      </figcaption>
    </figure>
  );
}
