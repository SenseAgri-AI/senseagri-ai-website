import type { ReactNode } from "react";
import { IconWrapper } from "@/components/Icons";

export default function FeatureCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    // Asymmetric padding: 2rem top/bottom, 2.75rem sides — bespoke editorial feel
    <div className="feature-card group flex h-full flex-col gap-5 px-8 py-8">
      <IconWrapper className="icon-animate">{icon}</IconWrapper>
      <div>
        <h3 className="font-display text-title-md font-medium text-on-surface">{title}</h3>
        <p className="mt-2 font-sans text-title-sm text-on-surface-variant">{description}</p>
      </div>
    </div>
  );
}
