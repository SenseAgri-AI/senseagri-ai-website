import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Solution", href: "/solution" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    // Deep navy "Control Room" — film grain for material depth, no drop shadow
    <footer className="grain bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            {/* Sharp logo container in navy context */}
            <span className="flex h-9 w-9 items-center justify-center bg-secondary-container">
              <LogoMark className="h-7 w-7" />
            </span>
            <span className="font-display text-title-sm font-extrabold uppercase tracking-[-0.02em] text-on-secondary">
              SenseAgri AI
            </span>
          </div>
          <p className="mt-4 font-sans text-title-sm text-on-secondary-variant">
            IoT + AI decision support built for South African poultry farms. Practical, resilient, and focused on measurable outcomes.
          </p>
        </div>

        <div>
          {/* ALL CAPS label — industrial serial number style */}
          <p className="font-sans text-label-sm font-medium uppercase tracking-[0.05em] text-on-secondary-variant">
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
          <p className="font-sans text-label-sm font-medium uppercase tracking-[0.05em] text-on-secondary-variant">
            Contact
          </p>
          <div className="mt-4 grid gap-2.5 font-sans text-title-sm text-on-secondary-variant">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="transition-colors duration-150 hover:text-primary-light"
            >
              {siteConfig.links.email}
            </a>
            <p>{siteConfig.links.phone}</p>
            <p>{siteConfig.links.address}</p>
          </div>
        </div>
      </div>

      {/* Bottom strip — hairline + copyright */}
      <div className="hairline-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <p className="font-sans text-label-sm text-on-secondary-variant">
            © {new Date().getFullYear()} SenseAgri AI. All rights reserved.
          </p>
          {/* Gold accent — "Pathfinder" mark, < 5% usage */}
          <p className="font-sans text-label-sm text-tertiary">
            Decision Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
