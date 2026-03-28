"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { ChartIcon, SignalIcon, LeafIcon } from "@/components/Icons";

type StyleWithVar = CSSProperties & {
  "--shift"?: string;
  "--lift"?: string;
};

export default function HeroPyramid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      container.style.setProperty("--pyramid-progress", "1");
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const windowHeight = Math.max(window.innerHeight, 1);
      const maxDistance = windowHeight * 0.45;
      const progress = Math.min(Math.max(1 - window.scrollY / maxDistance, 0), 1);
      container.style.setProperty("--pyramid-progress", progress.toFixed(3));
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    container.style.setProperty("--pyramid-progress", "1");
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="pyramid-stack" aria-hidden="true">

      {/* Dot — slides in from the right */}
      <div
        className="pyramid-dot"
        style={{ "--shift": "160px", "--lift": "0px" } as StyleWithVar}
      />

      {/* Top pill — Intelligence (muted gold) */}
      <div
        className="pyramid-block pyramid-top"
        style={{ "--shift": "-150px", "--lift": "-8px" } as StyleWithVar}
      >
        <span className="pyramid-block-content">
          <ChartIcon className="h-3.5 w-3.5" />
          Intelligence
        </span>
      </div>

      {/* Middle pill — Telemetry (petrol teal) */}
      <div
        className="pyramid-block pyramid-middle"
        style={{ "--shift": "50px", "--lift": "8px" } as StyleWithVar}
      >
        <span className="pyramid-block-content">
          <SignalIcon className="h-3.5 w-3.5" />
          Telemetry
        </span>
      </div>

      {/* Bottom pill — Sensing (dark-to-teal) */}
      <div
        className="pyramid-block pyramid-bottom"
        style={{ "--shift": "180px", "--lift": "14px" } as StyleWithVar}
      >
        <span className="pyramid-block-content">
          <LeafIcon className="h-3.5 w-3.5" />
          Sensing
        </span>
      </div>

    </div>
  );
}
