import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Solution", href: "/solution" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    // Deep navy "Control Room" — film grain for material depth, no drop shadow
    <footer className="grain bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            {/* Sharp logo container in navy context */}
            <span className="flex h-14 w-14 items-center justify-center bg-secondary-container">
              <LogoMark className="h-10 w-10" />
            </span>
            <span className="font-display text-2xl font-extrabold uppercase tracking-[-0.02em] text-on-secondary">
              SenseAgri AI
            </span>
          </div>
          <p className="mt-4 font-sans text-title-sm text-on-secondary-variant">
            Practical, resilient, and focused on measurable systems built for African farms.
          </p>
        </div>

        <div>
          {/* ALL CAPS label — industrial serial number style */}
          <p className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-on-secondary">
            Explore
          </p>
          <div className="mt-4 grid gap-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-title-sm text-on-secondary-variant transition-colors duration-150 hover:text-primary-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-sm font-bold uppercase tracking-[0.08em] text-on-secondary">
            Contact
          </p>
          <div className="mt-4 grid gap-2.5 font-sans text-title-sm text-on-secondary-variant">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="transition-colors duration-150 hover:text-primary-light"
            >
              {siteConfig.links.email}
            </a>
            <a
              href={`tel:${siteConfig.links.phone}`}
              className="transition-colors duration-150 hover:text-primary-light"
            >
              {siteConfig.links.phone}
            </a>
            <a
              href="https://www.linkedin.com/company/senseagri-ai/"
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-primary-light"
              aria-label="SenseAgri AI on LinkedIn (opens in a new tab)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip — hairline + copyright */}
      <div className="hairline-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <p className="font-sans text-label-sm text-on-secondary-variant">
            © {new Date().getFullYear()} SenseAgri AI. All rights reserved.
          </p>
          {/* Brand tagline */}
          <p className="font-sans text-label-sm font-bold uppercase tracking-[0.15em] text-tertiary">
            Every signal. Every decision.
          </p>
        </div>
      </div>
    </footer>
  );
}
