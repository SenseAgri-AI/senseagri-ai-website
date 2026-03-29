// Gold "AIOS" outcomes section — sense → understand → control convergence infographic
// + PEF going UP chart on dark navy panel

import { CameraIcon, HeartIcon, LeafIcon, ShieldIcon, SoundIcon } from "@/components/Icons";
import LogoMark from "@/components/LogoMark";

const inputs = [
  { label: "Disease\nPressure", Icon: ShieldIcon },
  { label: "Vision\nTracking", Icon: CameraIcon },
  { label: "Environment\nControl", Icon: LeafIcon },
  { label: "Flock\nSound", Icon: SoundIcon },
  { label: "Welfare\nIndex", Icon: HeartIcon },
];

const pefLine =
  "M 20,148 C 50,152 80,156 110,158 C 135,160 150,161 170,158 C 190,152 210,128 238,100 C 262,75 290,48 320,32 C 345,19 365,15 385,14";
const pefArea = pefLine + " L 385,168 L 20,168 Z";

export default function OutcomesSection() {
  return (
    <section
      className="grain relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 70% at 10% 30%, rgba(245,220,80,0.95) 0%, transparent 55%),
          radial-gradient(ellipse 70% 80% at 90% 80%, rgba(160,120,10,0.85) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 60% 5%, rgba(255,235,120,0.7) 0%, transparent 50%),
          #D4AF37
        `,
        borderTop: "0.5px solid #C49B20"
      }}
    >
      {/* Subtle blueprint grid on gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,46,53,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,46,53,0.07) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />


      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">

          {/* ── Left: text + convergence ── */}
          <div>

            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: "1.0" }}
            >
              Your farm<br />operating system.
            </h2>

            <p className="mt-5 font-sans text-title-sm leading-relaxed text-primary/70">
              Speak to your farm through data. Sense every signal — disease pressure, temperature,
              vision, sound, and welfare — and gain unified understanding through a single intelligent view.
            </p>

            {/* ── Convergence infographic ── */}
            <div className="mt-12">
              {/* Layer label */}
              <p className="mb-3 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-primary/50">
                Sense
              </p>

              {/* 5 input nodes */}
              <div className="grid grid-cols-5 gap-2">
                {inputs.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-sm p-3"
                    style={{ background: "rgba(0,46,53,0.12)", border: "0.5px solid rgba(0,46,53,0.2)" }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-center font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.06em] text-primary/70 whitespace-pre-line">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Connecting lines — converge to the gold dot at top of logo */}
              <svg viewBox="0 0 500 60" fill="none" className="w-full" style={{ height: "60px" }}>
                {[50, 150, 250, 350, 450].map((x) => (
                  <line
                    key={x}
                    x1={x} y1={0}
                    x2={250} y2={60}
                    stroke="#002E35"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                    strokeDasharray="4 5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-54;0"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </line>
                ))}
                {/* Small convergence dot — marks the top of the logo */}
                <circle cx="250" cy="60" r="3" fill="#002E35" fillOpacity="0.4" />
              </svg>

              {/* Logo only — no box, lines lead to the gold dot */}
              <div className="flex flex-col items-center gap-3">
                <LogoMark className="h-16 w-16" dotColor="rgba(255,255,255,0.95)" />
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
                  AIOS
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: PEF going UP on dark panel ── */}
          <div
            className="grain p-8"
            style={{ background: "#0F172A", border: "0.5px solid rgba(212,175,55,0.3)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-white/50">
                Poultry Efficiency Factor
              </span>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary" />
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-tertiary">
                  With AIOS
                </span>
              </div>
            </div>

            <svg viewBox="0 0 400 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <defs>
                <linearGradient id="pef-up-stroke" x1="20" y1="0" x2="385" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="pef-up-area" x1="0" y1="14" x2="0" y2="168" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[40, 75, 110, 145].map((y) => (
                <line key={y} x1="20" y1={y} x2="385" y2={y}
                  stroke="#BEC8CA" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 6" />
              ))}

              {/* Ground */}
              <line x1="20" y1="168" x2="385" y2="168" stroke="#BEC8CA" strokeWidth="0.5" strokeOpacity="0.25" />

              {/* Y labels */}
              <text x="15" y="17"  textAnchor="end" fontSize="7" fill="#D4AF37" fontFamily="Inter, sans-serif">92</text>
              <text x="15" y="162" textAnchor="end" fontSize="7" fill="#6B7C80" fontFamily="Inter, sans-serif">65</text>

              {/* AIOS deployed marker */}
              <line x1="170" y1="158" x2="170" y2="24" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.6" />
              <text x="172" y="21" fontSize="7" fill="#D4AF37" fontFamily="Inter, sans-serif" opacity="0.8">AIOS deployed</text>

              {/* Area */}
              <path d={pefArea} fill="url(#pef-up-area)" className="pef-area-fade" />

              {/* Line */}
              <path d={pefLine} stroke="url(#pef-up-stroke)" strokeWidth="2"
                strokeLinecap="round" className="pef-line-draw" />

              {/* Start dot */}
              <circle cx="20" cy="148" r="3" fill="#6B7C80" className="pef-area-fade" />
              <text x="26" y="145" fontSize="8" fill="#6B7C80" fontFamily="Inter, sans-serif" className="pef-area-fade">PEF 65</text>

              {/* End dot — gold */}
              <circle cx="385" cy="14" r="4" fill="#D4AF37" className="pef-area-fade" />
              <circle cx="385" cy="14" r="8" fill="#D4AF37" fillOpacity="0.15" className="pef-area-fade" />
              <text x="377" y="7" fontSize="8" fill="#D4AF37" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="end" className="pef-area-fade">PEF 92</text>

              {/* X labels */}
              <text x="20"  y="180" fontSize="7" fill="#6B7C80" textAnchor="middle" fontFamily="Inter, sans-serif">Day 1</text>
              <text x="170" y="180" fontSize="7" fill="#D4AF37" textAnchor="middle" fontFamily="Inter, sans-serif">Day 14</text>
              <text x="385" y="180" fontSize="7" fill="#6B7C80" textAnchor="middle" fontFamily="Inter, sans-serif">Day 42</text>
            </svg>

            {/* Stat strip */}
            <div
              className="mt-6 flex justify-around border-t pt-5"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {[
                { value: "+41%", label: "PEF Lift" },
                { value: "14d",  label: "To Impact" },
                { value: "−18%", label: "Mortality" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="font-display text-xl font-extrabold tracking-tight text-tertiary">{value}</span>
                  <span className="font-sans text-[8px] font-bold uppercase tracking-[0.1em] text-white/35">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
