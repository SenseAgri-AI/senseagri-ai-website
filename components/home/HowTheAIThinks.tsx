"use client";

import { useEffect, useRef, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import HouseDiagram from "@/components/home/HouseDiagram";

// Brief 3.5 — replaces the old "01 · Sensing" slot, so the first numbered section
// is now the AI. A real four-step sequence, with the house diagram building up
// as the reader scrolls (desktop). Phones get the complete diagram, then the list.
// The example-farm dashboard is the output of step 04.

const STEPS = [
  {
    n: "01",
    title: "Connect",
    line: "We pull in the records your farm already keeps, from your controllers, meters and production sheets."
  },
  {
    n: "02",
    title: "Learn your farm",
    line: "The AI builds a working model of each house and flock, a digital twin, and learns what normal looks like for you."
  },
  {
    n: "03",
    title: "Compare",
    line: "It checks what it sees against patterns from other farms on the system, so it gets sharper with every flock."
  },
  {
    n: "04",
    title: "Explain",
    line: "When something starts to drift, it cross-checks the other readings to find the likely cause, decides if it's urgent or just noise, and tells you what to check."
  }
];

const TAGS = ["Trend tracking", "Health score", "AI recommendations", "Internal vet"];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sensing">{children}</p>;
}

export default function HowTheAIThinks() {
  // 4 = complete frame. On desktop the steps take over once mounted.
  const [step, setStep] = useState(4);
  const [linked, setLinked] = useState(false); // scroll-linked (desktop, after mount)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;
    setStep(1);
    setLinked(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setStep(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      // A thin band across the middle of the screen decides the active step
      { rootMargin: "-48% 0px -48% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-thinks" aria-labelledby="hit-title" className="scroll-mt-16 bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10 lg:px-16 lg:pt-28">
        <div className="max-w-2xl">
          <Label>01 · How the AI thinks</Label>
          <h2
            id="hit-title"
            className="mt-4 font-display font-bold text-primary"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            Your full operation, decoded.
          </h2>
          <p className="mt-4 font-sans text-on-surface-variant" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Every metric in one place, with AI that flags exactly what needs action.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-12 lg:gap-12">
          {/* Diagram — sticky beside the steps on desktop, complete above them on phones */}
          <div className="lg:order-2 lg:col-span-7">
            <div className="lg:sticky lg:top-[calc(50vh-190px)] lg:py-10">
              <HouseDiagram step={step} />
            </div>
          </div>

          <ol className="lg:order-1 lg:col-span-5 lg:py-[18vh]">
            {STEPS.map((s, i) => {
              const dim = linked && step !== i + 1;
              return (
                <li
                  key={s.n}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-step={i + 1}
                  className="hit-step hairline-t py-6 lg:flex lg:min-h-[48vh] lg:flex-col lg:justify-center lg:py-0"
                  style={{ opacity: dim ? 0.38 : 1 }}
                >
                  <p className="font-mono text-[11px] tracking-[0.12em] text-sensing">§ {s.n}</p>
                  <h3 className="mt-2 font-display text-[1.5rem] font-semibold tracking-[-0.015em] text-primary">{s.title}</h3>
                  <p className="mt-2 max-w-[42ch] font-sans text-[15px] leading-relaxed text-on-surface-variant">{s.line}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Output of step 04 — the example-farm dashboard */}
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-6 sm:px-10 lg:px-16 lg:pb-28 lg:pt-10">
        <div className="hairline-t pt-10">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Label>02 · Dashboard + AI</Label>
              <p className="mt-3 max-w-[52ch] font-sans text-[15px] leading-relaxed text-on-surface-variant">
                What step 04 looks like on screen: every house scored, trends tracked, and a short list of what to check.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:col-span-5 lg:justify-end">
              {TAGS.map((t) => (
                <li key={t} className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <DashboardCard />
          </div>
          <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-outline">
            Fig. 2 · Example farm dashboard · Illustrative data
          </p>
        </div>
      </div>
    </section>
  );
}
