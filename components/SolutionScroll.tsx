"use client";

import { useEffect, useRef, useState } from "react";
import { AlertIcon, ChartIcon, SignalIcon } from "@/components/Icons";

const modules = [
  {
    id: "MOD-01",
    title: "Fine Telemetry",
    description:
      "LoRaWAN gateways, environmental sensors, and camera feeds capture continuous barn conditions and welfare indicators across every house.",
    footer: "Continuous · Barn-Level",
    Icon: SignalIcon,
    bg: "#0F172A",
    accent: "#2A8E9A",
    fromLeft: true,
    image: "/telem.png",
    imageAlt: "Farm telemetry monitoring",
  },
  {
    id: "MOD-02",
    title: "Edge AI & Alerts",
    description:
      "Jetson-based on-device processing delivers fast anomaly detection and resilient alerts — even when connectivity drops.",
    footer: "Edge-Resilient · Always On",
    Icon: AlertIcon,
    bg: "#002E35",
    accent: "#D4AF37",
    fromLeft: false,
    image: "/images.jpeg",
    imageAlt: "Edge AI compute board",
  },
  {
    id: "MOD-03",
    title: "AI Operating System",
    description:
      "Dashboards, benchmarking, and what-if simulations translate raw signals into the next best action for your team.",
    footer: "Decisions · ROI-Verified",
    Icon: ChartIcon,
    bg: "#0F172A",
    accent: "#2A8E9A",
    fromLeft: true,
    image: "/on_this_picture_please_keep_th_Grok_Imagine_47814.jpg",
    imageAlt: "SenseAgri AIOS chip",
  },
];

type Phase = "before" | "visible" | "past";

function useCardPhase() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("before");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1: number, raf2: number;

    // Phase observer — entry/exit with direction detection
    let phaseObserver: IntersectionObserver;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        phaseObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setPhase("visible");
            } else {
              // Above viewport = scrolled past; below = not yet arrived
              setPhase(entry.boundingClientRect.top < 0 ? "past" : "before");
            }
          },
          { threshold: 0.12 }
        );
        phaseObserver.observe(el);
      });
    });

    // Active-zone observer — highlights the card in the centre viewport band
    const activeObserver = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-22% 0px -22% 0px" }
    );
    activeObserver.observe(el);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      phaseObserver?.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return { ref, phase, active };
}

function ModuleCard({ mod, index }: { mod: (typeof modules)[0]; index: number }) {
  const { ref, phase, active } = useCardPhase();

  const transform =
    phase === "visible"
      ? `translateX(0) translateY(0) scale(${active ? "1.012" : "1"})`
      : phase === "past"
      ? "translateX(0) translateY(-40px)"
      : mod.fromLeft
      ? "translateX(-80px) translateY(0) scale(0.97)"
      : "translateX(80px) translateY(0) scale(0.97)";

  const opacity = phase === "visible" ? (active ? 1 : 0.7) : 0;

  // Image sits opposite the fly-in side
  const imageRight = mod.fromLeft;

  return (
    <div
      ref={ref}
      style={{
        opacity,
        transform,
        transition: `opacity 0.6s ease-out ${index * 60}ms, transform 0.6s ease-out ${index * 60}ms`,
        boxShadow: active
          ? `0 24px 64px rgba(0,0,0,0.4), inset 0 0 0 0.5px ${mod.accent}40`
          : "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="grain grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        style={{
          background: mod.bg,
          borderLeft: `0.5px solid ${mod.accent}`,
        }}
      >
        {/* Text block — order swaps based on fromLeft */}
        <div
          className={`flex flex-col justify-between gap-6 p-8 lg:p-10 ${imageRight ? "md:order-1" : "md:order-2"}`}
        >
          {/* Header */}
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

          {/* Body */}
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

        {/* Image block */}
        <div
          className={`relative min-h-[220px] md:min-h-0 overflow-hidden ${imageRight ? "md:order-2" : "md:order-1"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mod.image}
            alt={mod.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.85 }}
          />
          {/* Subtle inner gradient so image blends into the card bg on the text side */}
          <div
            className="absolute inset-0"
            style={{
              background: imageRight
                ? `linear-gradient(to right, ${mod.bg} 0%, transparent 35%)`
                : `linear-gradient(to left, ${mod.bg} 0%, transparent 35%)`,
            }}
          />
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
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
