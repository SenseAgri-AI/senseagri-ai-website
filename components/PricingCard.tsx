import { CheckIcon } from "@/components/Icons";

export default function PricingCard({
  title,
  price,
  description,
  features,
  highlight
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    // Highlighted card: subtle primary teal tint on the card top edge, no ring border
    <div className={`card flex h-full flex-col px-8 py-8 ${highlight ? "border-t-2 border-primary" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-title-md font-medium text-on-surface">{title}</h3>
        {highlight ? <span className="badge">Most chosen</span> : null}
      </div>
      <p className="mt-4 font-display text-display-sm font-medium text-on-surface">{price}</p>
      <p className="mt-2 font-sans text-title-sm text-on-surface-variant">{description}</p>
      <ul className="mt-6 space-y-3 font-sans text-title-sm text-on-surface-variant">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
