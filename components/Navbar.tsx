"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";
import LogoMark from "@/components/LogoMark";

const navLinks = [
  { label: "Solution", href: "/solution" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-[20px] hairline-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-10">

        {/* Brand — mark + wordmark + tagline */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-secondary">
            <LogoMark className="h-6 w-6" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-extrabold tracking-[-0.02em] text-primary uppercase">
              SenseAgri AI
            </span>
            <span className="mt-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-tertiary">
              Every signal. Every decision.
            </span>
          </div>
        </Link>

        {/* Desktop nav — ALL CAPS labels, gold underline on active */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-display text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-150 py-1
                  ${active ? "text-tertiary" : "text-on-surface-variant hover:text-primary"}`}
              >
                {link.label}
                {/* Gold 0.5px bottom line on active */}
                {active && (
                  <span className="absolute -bottom-px left-0 w-full" style={{ height: "0.5px", background: "#D4AF37" }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <Button href="/contact">Book a Pilot Call</Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-on-surface md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="16" x2="19" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="bg-surface hairline-t">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:px-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-150
                    ${active ? "text-primary" : "text-on-surface-variant"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-1">
              <Button href="/contact" className="w-full justify-center">
                Book a Pilot Call
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
