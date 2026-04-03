export default function TestimonialCard({
  quote,
  name,
  role,
  company
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <div
      className="flex h-full flex-col justify-between gap-8 bg-surface-container-lowest px-8 py-8 transition-colors duration-150 hover:bg-white"
      style={{ borderLeft: "2px solid #D4AF37" }}
    >
      {/* Large decorative quote mark — gold, ultra-low opacity */}
      <div className="relative">
        <span
          className="pointer-events-none absolute -top-2 -left-1 font-display font-extrabold leading-none text-tertiary select-none"
          style={{ fontSize: "4rem", lineHeight: 1, opacity: 0.12 }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="relative font-sans text-title-sm leading-relaxed text-on-surface-variant">
          {quote}
        </p>
      </div>

      {/* Attribution */}
      <div style={{ borderTop: "0.5px solid #BEC8CA", paddingTop: "1rem" }}>
        <p className="font-display text-title-sm font-semibold text-on-surface">{name}</p>
        <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
          {role} · {company}
        </p>
      </div>
    </div>
  );
}
