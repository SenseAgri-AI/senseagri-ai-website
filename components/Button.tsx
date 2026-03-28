import type { ReactNode } from "react";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-sans text-title-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const variants = {
  // 135° gradient: primary → primary-container. No border.
  primary: "bg-btn-primary text-on-primary hover:opacity-90",
  // Tonal fill. No border.
  secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
  // Text-only. 2px underline visible on hover only.
  ghost:
    "relative text-primary after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
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
