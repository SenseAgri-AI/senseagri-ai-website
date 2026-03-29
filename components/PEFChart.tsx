// PEF trend chart — chicken video left, simplified animated graph right

export default function PEFChart() {
  const linePath =
    "M 20,30 C 50,28 85,30 115,34 C 145,38 160,44 185,58 C 210,72 238,100 265,122 C 292,138 328,148 370,153";
  const areaPath = linePath + " L 370,165 L 20,165 Z";

  return (
    <div className="w-full">

      {/* Chart */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
            Poultry Efficiency Factor
          </span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-red-500">Alert</span>
          </div>
        </div>

        <svg viewBox="0 0 390 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <linearGradient id="pef-stroke-grad" x1="20" y1="0" x2="370" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#2A8E9A" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="pef-area-grad" x1="0" y1="20" x2="0" y2="165" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#2A8E9A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[50, 85, 120].map((y) => (
            <line key={y} x1="20" y1={y} x2="370" y2={y}
              stroke="#BEC8CA" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 6" />
          ))}

          {/* Ground */}
          <line x1="20" y1="165" x2="370" y2="165" stroke="#BEC8CA" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* Y labels */}
          <text x="15" y="33"  textAnchor="end" fontSize="7" fill="#6B7C80" fontFamily="Inter, sans-serif">95</text>
          <text x="15" y="156" textAnchor="end" fontSize="7" fill="#6B7C80" fontFamily="Inter, sans-serif">63</text>

          {/* "No intervention" annotation */}
          <line x1="185" y1="58" x2="185" y2="20" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.6" />
          <text x="187" y="17" fontSize="7" fill="#D4AF37" fontFamily="Inter, sans-serif" opacity="0.75">No intervention</text>

          {/* Area fill */}
          <path d={areaPath} fill="url(#pef-area-grad)" className="pef-area-fade" />

          {/* Line */}
          <path d={linePath} stroke="url(#pef-stroke-grad)" strokeWidth="2"
            strokeLinecap="round" className="pef-line-draw" />

          {/* Start dot */}
          <circle cx="20" cy="30" r="3" fill="#2A8E9A" className="pef-area-fade" />
          <text x="26" y="26" fontSize="8" fill="#2A8E9A" fontWeight="bold" fontFamily="Inter, sans-serif" className="pef-area-fade">PEF 94</text>

          {/* End dot — radiating alert */}
          <g className="pef-area-fade">
            <circle cx="370" cy="153" r="4" fill="none" stroke="#EF4444" strokeWidth="1">
              <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="370" cy="153" r="4" fill="none" stroke="#EF4444" strokeWidth="0.7">
              <animate attributeName="r" values="4;14;4" dur="2s" begin="0.65s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2s" begin="0.65s" repeatCount="indefinite" />
            </circle>
            <circle cx="370" cy="153" r="3" fill="#EF4444" />
            <text x="362" y="145" fontSize="8" fill="#EF4444" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="end">PEF 63</text>
          </g>

          {/* X labels */}
          <text x="20"  y="176" fontSize="7" fill="#6B7C80" textAnchor="middle" fontFamily="Inter, sans-serif">Day 1</text>
          <text x="185" y="176" fontSize="7" fill="#6B7C80" textAnchor="middle" fontFamily="Inter, sans-serif">Day 14</text>
          <text x="370" y="176" fontSize="7" fill="#6B7C80" textAnchor="middle" fontFamily="Inter, sans-serif">Day 28</text>
        </svg>
      </div>

  </div>
  );
}
