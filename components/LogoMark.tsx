// Navy container is applied by the parent — mark itself uses lighter teal pills + gold dot
// viewBox 0 0 90 112, centre axis x=45
export default function LogoMark({ className, dotColor }: { className?: string; dotColor?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 90 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dot — gold precision accent */}
      <circle cx="45" cy="11" r="7" fill={dotColor ?? "#D4AF37"} />

      {/* Top pill — lighter petrol teal, 60% opacity for depth */}
      <rect x="24" y="32" width="42" height="20" rx="10" fill="#2A8E9A" opacity="0.55" />

      {/* Middle pill — lighter petrol teal, 75% opacity */}
      <rect x="10" y="60" width="70" height="20" rx="10" fill="#2A8E9A" opacity="0.75" />

      {/* Bottom pill — lighter petrol teal, full */}
      <rect x="0" y="88" width="90" height="20" rx="10" fill="#2A8E9A" />
    </svg>
  );
}
