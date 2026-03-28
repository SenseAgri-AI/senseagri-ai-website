import Button from "@/components/Button";

export default function CTASection({
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: {
  title: string;
  subtitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section-padding">
      {/* Glassmorphism: surface-container-lowest at 80% opacity, backdrop-blur 20px */}
      <div className="glass-panel px-10 py-12 sm:px-16">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-display-sm font-medium text-on-surface">{title}</h2>
            <p className="mt-3 font-sans text-title-sm text-on-surface-variant sm:text-base">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={primaryHref}>{primaryLabel}</Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
