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
    // Tonal separation — deeper surface, no border line
    <footer className="bg-surface-container-low">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-container-lowest shadow-ambient">
              <LogoMark className="h-7 w-7" />
            </span>
            <span className="font-display text-title-sm font-medium text-on-surface">
              SenseAgri AI
            </span>
          </div>
          <p className="mt-4 font-sans text-title-sm text-on-surface-variant">
            IoT + AI decision support built for South African poultry farms. Practical, resilient, and focused on measurable outcomes.
          </p>
        </div>

        <div>
          <p className="font-label text-label-md font-medium uppercase tracking-[0.2em] text-on-surface-variant">
            Explore
          </p>
          <div className="mt-4 grid gap-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-title-sm text-on-surface-variant transition-colors duration-150 hover:text-on-surface"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-label text-label-md font-medium uppercase tracking-[0.2em] text-on-surface-variant">
            Contact
          </p>
          <div className="mt-4 grid gap-2.5 font-sans text-title-sm text-on-surface-variant">
            <a href={`mailto:${siteConfig.links.email}`} className="transition-colors duration-150 hover:text-on-surface">
              {siteConfig.links.email}
            </a>
            <p>{siteConfig.links.phone}</p>
            <p>{siteConfig.links.address}</p>
          </div>
          <p className="mt-6 font-label text-label-sm text-outline-variant">
            Replace contact details with your own support information.
          </p>
        </div>
      </div>
    </footer>
  );
}
