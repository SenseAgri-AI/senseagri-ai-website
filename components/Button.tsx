import type { ReactNode } from "react";
import Link from "next/link";

// 0px radius across all variants — "The Industrial Architect"
// Linear 150ms fades only — no bounce animations
const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-title-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const variants = {
  // Solid primary + 0.5px gold bottom line — "Gold Precision" signature
  primary: "btn-primary",
  // Ghost, 0.5px outline hairline
  secondary: "btn-secondary",
  // Text-only with 0.5px hairline underline on hover
  ghost:
    "relative text-primary after:absolute after:-bottom-px after:left-0 after:bg-primary after:origin-left after:scale-x-0 after:transition-transform after:duration-150 hover:after:scale-x-100",
  ghostWhite:
    "relative text-on-secondary after:absolute after:-bottom-px after:left-0 after:bg-on-secondary after:origin-left after:scale-x-0 after:transition-transform after:duration-150 hover:after:scale-x-100"
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

export default function Button({
  href,
  variant = "primary",
  className,
  children,
  external
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
