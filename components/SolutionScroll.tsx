"use client";

import { useEffect, useRef, useState } from "react";
import { AlertIcon, ChartIcon, SignalIcon } from "@/components/Icons";

const modules = [
  {
    id: "MOD-01",
    number: "01",
    title: "Fine Telemetry",
    description:
      "LoRaWAN gateways, environmental sensors, and camera feeds capture continuous barn conditions and welfare indicators across every house.",
    footer: "Continuous · Barn-Level",
    Icon: SignalIcon,
    bg: "#0F172A",
    accent: "#2A8E9A",
    fromLeft: true,
    align: "mr-auto",
  },
  {
    id: "MOD-02",
    number: "02",
    title: "Edge AI & Alerts",
    description:
      "Jetson-based on-device processing delivers fast anomaly detection and resilient alerts — even when connectivity drops.",
    footer: "Edge-Resilient · Always On",
    Icon: AlertIcon,
    bg: "#002E35",
    accent: "#D4AF37",
    fromLeft: false,
    align: "ml-auto",
  },
  {
    id: "MOD-03",
    number: "03",
    title: "AI Operating System",
    description:
      "Dashboards, benchmarking, and what-if simulations translate raw signals into the next best action for your team.",
    footer: "Decisions · ROI-Verified",
    Icon: ChartIcon,
    bg: "#0F172A",
    accent: "#2A8E9A",
    fromLeft: true,
    align: "mr-auto",
  },
];

function useCardState() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1: number, raf2: number;
    let fadeObserver: IntersectionObserver;

    // Fly-in: fires once after two paint frames to ensure opacity:0 is rendered first
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        fadeObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              fadeObserver.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        fadeObserver.observe(el);
      });
    });

    // Active zone: fires continuously, card must be in centre 50% of viewport
    const activeObserver = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-22% 0px -22% 0px" }
    );
    activeObserver.observe(el);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      fadeObserver?.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return { ref, visible, active };
}

function ModuleCard({ mod, index }: { mod: (typeof modules)[0]; index: number }) {
  const { ref, visible, active } = useCardState();

  const flyIn = visible
    ? `translateX(0) scale(${active ? "1.025" : "1"})`
    : mod.fromLeft
    ? "translateX(-80px) scale(0.97)"
    : "translateX(80px) scale(0.97)";

  return (
    <div className={`w-full max-w-2xl ${mod.align}`}>
      <div
        ref={ref}
        style={{
          opacity: visible ? (active ? 1 : 0.6) : 0,
          transform: flyIn,
          transition: `opacity 0.65s ease-out ${index * 60}ms, transform 0.65s ease-out ${index * 60}ms`,
          boxShadow: active
            ? `0 20px 60px rgba(0,0,0,0.35), inset 0 0 0 0.5px ${mod.accent}40`
            : "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="grain flex flex-col gap-6 p-8"
          style={{
            background: mod.bg,
            borderLeft: `0.5px solid ${mod.accent}`,
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div style={{ color: mod.accent }}>
              <mod.Icon className="h-6 w-6" />
            </div>
            <span
              className="font-sans text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ color: mod.accent }}
            >
              {mod.id}
            </span>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-display text-title-lg font-bold tracking-tight text-white">
              {mod.title}
            </h3>
            <p className="mt-3 font-sans text-title-sm leading-relaxed text-white/55">
              {mod.description}
            </p>
          </div>

          {/* Footer */}
          <div
            className="border-t pt-4"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="font-sans text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ color: mod.accent }}
            >
              {mod.footer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionScroll() {
  return (
    <section style={{ borderTop: "0.5px solid #BEC8CA" }}>
      {/* Header */}
      <div className="bg-surface-container-low px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Solution Architecture
            </span>
            <h2
              className="mt-3 font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.05" }}
            >
              From sensing to<br />decision support.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-title-sm leading-relaxed text-on-surface-variant">
            A resilient stack that captures the right signals, processes them on-site, and turns them into actions you can verify.
          </p>
        </div>
      </div>

      {/* Card stack */}
      <div className="bg-surface-container-low px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
