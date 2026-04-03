type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left"
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="badge mb-6">{eyebrow}</p>
      ) : null}
      {/* Manrope display font, font-medium — size creates hierarchy, not weight */}
      <h2 className="font-display text-display-sm font-medium text-on-surface sm:text-display-md">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 font-sans text-title-sm text-on-surface-variant sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
