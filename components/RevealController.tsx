"use client";

import { useEffect } from "react";

// Single IntersectionObserver that watches every `.reveal` element in the DOM.
// When one enters view, it gets `.reveal-in` added → CSS animates it.
// Respects prefers-reduced-motion (just immediately marks everything visible).

export default function RevealController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

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
  }, []);

  return null;
}
