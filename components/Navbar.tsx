"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    // Tonal separation from page — no border line, just a slightly deeper surface
    <header className="sticky top-0 z-40 bg-surface-container-low/90 backdrop-blur-[20px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-container-lowest shadow-ambient">
            <LogoMark className="h-7 w-7" />
          </span>
          <span className="font-display text-title-sm font-medium text-on-surface">
            SenseAgri AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-title-sm font-medium text-on-surface-variant transition-colors duration-150 hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button href="/contact">Book a Pilot Call</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-surface-container-high px-3 py-1.5 font-sans text-label-md font-medium text-on-surface md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="bg-surface-container-low">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:px-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-title-sm font-medium text-on-surface-variant"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="w-full justify-center">
              Book a Pilot Call
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
