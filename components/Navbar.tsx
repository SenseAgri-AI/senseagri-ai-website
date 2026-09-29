"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";
import LogoMark from "@/components/LogoMark";

const navLinks = [
  { label: "Solution", href: "/solution" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-[20px] hairline-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-10">

        {/* Brand prototype — existing mark, lighter precision wordmark */}
        <Link href="/" className="flex items-center gap-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary sm:h-10 sm:w-10">
            <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          <div className="flex flex-col items-start text-left leading-none">
            <span className="flex items-baseline whitespace-nowrap font-display text-[14px] font-medium uppercase tracking-[0.18em] text-primary sm:text-[15px]">
              <span>SENSE</span>
              <span className="text-sensing">AGRI</span>
              <span className="ml-[0.32em] text-[0.64em] tracking-[0.14em] text-primary/65">AI</span>
            </span>
            <span className="mt-1.5 whitespace-nowrap font-sans text-[7px] font-medium uppercase tracking-[0.17em] text-tertiary sm:text-[8px]">
              Every signal. Every decision.
            </span>
          </div>
        </Link>

        {/* Desktop nav — quiet, precise labels */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-[10px] font-medium uppercase tracking-[0.06em] transition-colors duration-150 py-1
                  ${active ? "text-tertiary" : "text-on-surface-variant hover:text-primary"}`}
              >
                {link.label}
                {/* Gold 0.5px bottom line on active */}
                {active && (
                  <span className="absolute -bottom-px left-0 w-full" style={{ height: "0.5px", background: "#13AAA5" }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Button href="/contact">Book a Demo</Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-on-surface lg:hidden"
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
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 sm:px-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-l-2 py-2.5 pl-3 font-sans text-[12px] font-medium uppercase tracking-[0.06em] transition-colors duration-150
                    ${active ? "border-tertiary text-primary" : "border-transparent text-on-surface-variant"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Button href="/contact" className="w-full justify-center">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
