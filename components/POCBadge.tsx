export default function POCBadge() {
  const edge = Array.from({ length: 64 }, (_, i) => {
    const angle = (i * Math.PI) / 32 - Math.PI / 2;
    const radius = i % 2 === 0 ? 132 : 121;
    return `${160 + Math.cos(angle) * radius},${160 + Math.sin(angle) * radius}`;
  }).join(" ");

  return (
    <a
      href="/offering"
      aria-label="Limited offer: join our proof of concept program"
      className="hero-reveal delay-2 absolute -top-6 right-0 block w-[85px] text-primary transition-transform hover:rotate-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light sm:-top-8 sm:w-[120px] lg:-top-10 lg:w-[165px]"
    >
      <svg viewBox="0 0 320 320" className="h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="poc-seal" x1="0" y1="0" x2="1" y2="1">
            <stop className="text-tertiary-container" stopColor="currentColor" />
            <stop offset="1" className="text-primary-light" stopColor="currentColor" />
          </linearGradient>
          <path id="poc-top-arc" d="M 66,155 A 94,94 0 0,1 254,155" />
        </defs>
        <polygon points={edge} fill="url(#poc-seal)" />
        <circle cx="160" cy="160" r="112" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="160" cy="160" r="104" fill="none" stroke="currentColor" strokeOpacity=".2" />
        <text className="font-display font-extrabold" fill="currentColor" fontSize="23" letterSpacing="2">
          <textPath href="#poc-top-arc" startOffset="50%" textAnchor="middle">LIMITED OFFER</textPath>
        </text>
        <text x="160" y="116" textAnchor="middle" fill="currentColor" fontSize="20" letterSpacing="9">★ ★ ★</text>
        <g transform="rotate(-7 160 160)">
          <path d="M 7,144 H 61 V 212 H 7 L 22,178 Z M 259,144 H 313 L 298,178 L 313,212 H 259 Z" className="text-sensing" fill="currentColor" />
          <path d="M 35,194 L 61,212 V 194 Z M 285,194 L 259,212 V 194 Z" fill="currentColor" />
          <path d="M 35,131 H 285 V 194 H 35 Z" fill="currentColor" />
          <text x="160" y="158" textAnchor="middle" className="font-display font-bold text-white" fill="currentColor" fontSize="19" letterSpacing="1">JOIN OUR</text>
          <text x="160" y="181" textAnchor="middle" className="font-display font-extrabold text-white" fill="currentColor" fontSize="23" letterSpacing="1">POC PROGRAM</text>
        </g>
        <text x="160" y="233" textAnchor="middle" className="font-sans font-semibold" fill="currentColor" fontSize="12" letterSpacing="1.3">PROOF OF CONCEPT</text>
        <text x="160" y="253" textAnchor="middle" fill="currentColor" fontSize="14" letterSpacing="6">★ ★ ★</text>
      </svg>
    </a>
  );
}
