"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Single IntersectionObserver that watches every `.reveal` element in the DOM.
// When one enters view, it gets `.reveal-in` added → CSS animates it.
//
// IMPORTANT: this lives in the root layout, which mounts once. Routes underneath
// re-mount fresh on every navigation, so we re-run this effect on every pathname
// change to pick up the new route's `.reveal` elements. Without that, navigating
// away from / and back leaves the homepage's freshly-mounted .reveal elements
// stuck at opacity 0 (the observer from the first mount was already detached
// from elements that no longer exist).
//
// Respects prefers-reduced-motion (just immediately marks everything visible).

export default function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)");

    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-80px 0px", threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
