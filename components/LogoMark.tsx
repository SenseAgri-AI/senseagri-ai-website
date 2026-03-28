// Exact spec: viewBox 0 0 90 112, centre axis x=45
// Dot ∅14px · 14px gap · Top 42×20 r10 · 8px · Mid 70×20 r10 · 8px · Bot 90×20 r10
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 90 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Muted gold gradient — Intelligence layer */}
        <linearGradient id="lm-gold" x1="0" y1="0" x2="42" y2="0">
          <stop offset="0%" stopColor="#eae3bf" stopOpacity="1" />
          <stop offset="100%" stopColor="#5c5433" stopOpacity="0.75" />
        </linearGradient>
        {/* Petrol teal gradient — Telemetry layer */}
        <linearGradient id="lm-teal" x1="0" y1="0" x2="70" y2="0">
          <stop offset="0%" stopColor="#00464f" stopOpacity="1" />
          <stop offset="100%" stopColor="#005f6b" stopOpacity="0.85" />
        </linearGradient>
        {/* Dark-to-teal gradient — Sensing layer */}
        <linearGradient id="lm-dark" x1="0" y1="0" x2="90" y2="0">
          <stop offset="0%" stopColor="#191c1d" stopOpacity="1" />
          <stop offset="100%" stopColor="#00464f" stopOpacity="0.82" />
        </linearGradient>
      </defs>

      {/* Dot — primary teal, centred on x=45, cy=11 (4px top margin) */}
      <circle cx="45" cy="11" r="7" fill="#00464f" />

      {/* Top pill — Intelligence (42×20, rx=10, x=24, y=32) */}
      <rect x="24" y="32" width="42" height="20" rx="10" fill="url(#lm-gold)" />

      {/* Middle pill — Telemetry (70×20, rx=10, x=10, y=60) */}
      <rect x="10" y="60" width="70" height="20" rx="10" fill="url(#lm-teal)" />

      {/* Bottom pill — Sensing (90×20, rx=10, x=0, y=88) */}
      <rect x="0" y="88" width="90" height="20" rx="10" fill="url(#lm-dark)" />
    </svg>
  );
}
