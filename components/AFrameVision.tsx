type AFrameVisionProps = {
  idPrefix?: string;
  className?: string;
};

/**
 * Schematic of egg-counting cameras on an A-frame layer cage.
 * A drawing of the data path — not a photograph or a product screenshot.
 */
export default function AFrameVision({ idPrefix = "aframe", className = "" }: AFrameVisionProps) {
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 720 440"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full"
      >
        <title id={titleId}>Schematic of egg-counting cameras on an A-frame layer cage</title>
        <desc id={descId}>
          Cameras mounted on the A-frame watch the egg belt. Each frame becomes a count, and that count joins the house record with temperature, air, feed and water. Inference stays on the farm.
        </desc>

        <g stroke="#BEC8CA" strokeWidth="0.5">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={36 + i * 36} y1="28" x2={36 + i * 36} y2="400" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="24" y1={40 + i * 48} x2="456" y2={40 + i * 48} />
          ))}
        </g>

        <line x1="48" y1="356" x2="432" y2="356" stroke="#002E35" strokeWidth="1" />

        <path d="M70 340 L240 96 L410 340" fill="none" stroke="#002E35" strokeWidth="1.5" />
        <path d="M112 340 L240 148 L368 340" fill="none" stroke="#002E35" strokeWidth="0.75" opacity="0.7" />

        <g stroke="#087C83" strokeWidth="6" strokeLinecap="square">
          <line x1="155" y1="220" x2="325" y2="220" />
          <line x1="114" y1="280" x2="366" y2="280" />
          <line x1="78" y1="332" x2="402" y2="332" />
        </g>

        <g fill="#E1F3F1" stroke="#087C83" strokeWidth="0.75">
          {[168, 196, 224, 252, 280, 308].map((x) => (
            <ellipse key={x} cx={x} cy="348" rx="7" ry="5" />
          ))}
        </g>

        <g fill="#002E35">
          <rect x="58" y="188" width="22" height="14" />
          <rect x="80" y="191" width="8" height="8" fill="#13AAA5" />
          <rect x="400" y="188" width="22" height="14" />
          <rect x="392" y="191" width="8" height="8" fill="#13AAA5" />
          <rect x="229" y="68" width="22" height="14" />
          <rect x="236" y="82" width="8" height="8" fill="#13AAA5" />
        </g>

        <g fill="none" stroke="#13AAA5" strokeWidth="0.75" strokeDasharray="2 3">
          <path d="M80 202 C120 250, 160 320, 190 348" />
          <path d="M400 202 C360 250, 320 320, 290 348" />
          <path d="M240 90 V150" />
        </g>

        <text x="48" y="28" fill="#002E35" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.4">
          A-FRAME · LAYER CAGE
        </text>
        <text x="48" y="386" fill="#3F4849" fontFamily="Inter, sans-serif" fontSize="11">
          Cameras on the frame
        </text>
        <text x="250" y="386" fill="#087C83" fontFamily="Inter, sans-serif" fontSize="11">
          Egg belt · continuous count
        </text>

        <path d="M422 200 H470" fill="none" stroke="#13AAA5" strokeWidth="1" />
        <path d="M464 196 L474 200 L464 204" fill="none" stroke="#13AAA5" strokeWidth="1" />

        <rect x="478" y="64" width="218" height="292" fill="#F8FAFA" stroke="#BEC8CA" strokeWidth="0.5" />
        <text x="494" y="92" fill="#002E35" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="1.6">
          HOUSE RECORD
        </text>
        {[
          ["01", "Frame"],
          ["02", "Egg count"],
          ["03", "Bird activity"],
          ["04", "Temperature"],
          ["05", "Humidity"],
          ["06", "CO₂ · ammonia"],
          ["07", "Feed · water"]
        ].map(([n, label], i) => (
          <g key={n}>
            <text x="494" y={124 + i * 28} fill="#13AAA5" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600">
              {n}
            </text>
            <text x="522" y={124 + i * 28} fill="#191C1D" fontFamily="Inter, sans-serif" fontSize="13">
              {label}
            </text>
          </g>
        ))}
        <text x="494" y="332" fill="#3F4849" fontFamily="Inter, sans-serif" fontSize="10">
          Inference stays on the farm
        </text>
      </svg>
      <figcaption className="mt-3 max-w-xl font-sans text-[11px] leading-relaxed text-on-surface-variant">
        Schematic of egg-counting cameras mounted on an A-frame layer cage. A drawing of the data path, not a photograph of a house.
      </figcaption>
    </figure>
  );
}
