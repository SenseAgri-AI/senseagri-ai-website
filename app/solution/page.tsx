import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "AI Poultry Monitoring — Vision, Acoustic & Environmental",
  description:
    "Environmental monitoring, computer vision, and acoustic welfare signals for commercial poultry houses. Production intelligence and early disease detection delivered via WhatsApp alerts.",
  alternates: { canonical: "/solution" }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const stages = [
  {
    n: "01",
    t: "Capture",
    d: "LoRaWAN sensors, edge cameras, and acoustic monitors read temperature, humidity, gas, CO₂, feed, water, egg count, bird activity, and welfare signals — on every house, around the clock. Nothing waits for someone to remember to check."
  },
  {
    n: "02",
    t: "Interpret",
    d: "On-farm AI runs computer vision on the cameras, classifies acoustic welfare signals, and learns each house's environmental baseline — separating normal variation from the early signs of a real problem, like an internal vet that never sleeps."
  },
  {
    n: "03",
    t: "Act",
    d: "The decision reaches the right person on the channel they already use — a dashboard reading, a WhatsApp alert, or a Monday report — with the specific action to take."
  }
];

const pillars = [
  {
    t: "Edge-first by design",
    d: "Sensing and inference run on-site, so the platform keeps working through patchy connectivity. Data syncs to the cloud the moment the link returns."
  },
  {
    t: "Low operational overhead",
    d: "No new app for your team to learn. Alerts arrive on WhatsApp, and the dashboard is built for quick reads — not training courses."
  },
  {
    t: "Causal, not just charts",
    d: "The AI surfaces cause and effect — what changed, why it matters, and what to do — instead of leaving you to interpret raw graphs."
  },
  {
    t: "Fits your existing stack",
    d: "Integrates with the major poultry platforms already on your farm — Big Dutchman, SKOV, Hytek, Vencomatic and more."
  }
];

function Eyebrow({ children }: { children: string }) {
  return (
    <span
      className="mb-6 inline-flex items-center gap-2 px-3 py-1"
      style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
    >
      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
        {children}
      </span>
    </span>
  );
}

export default function SolutionPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Solution", path: "/solution" }])} />
      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="Solution"
        headline="The system,"
        accentLine="end to end."
        sub="Environmental monitoring, computer vision, and acoustic welfare signals — production intelligence and early disease alerts, delivered on WhatsApp."
      />

      {/* System architecture diagram */}
      <section style={{ background: "#F8FAFA", padding: "64px 24px", borderTop: "0.5px solid #BEC8CA" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div className="flow-header" style={{ marginBottom: 36 }}>
            <div>
              <Eyebrow>Architecture</Eyebrow>
              <h2
                className="font-display font-extrabold tracking-tighter text-primary"
                style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)", lineHeight: 1.04 }}
              >
                How it all connects.
              </h2>
            </div>
            <p className="font-sans text-[0.9375rem] leading-relaxed text-on-surface-variant" style={{ maxWidth: 460 }}>
              SenseAgri AI is an end-to-end poultry monitoring and decision intelligence platform. Sensors capture every signal in the house, on-farm AI interprets it, and the cloud delivers decisions to your phone — one continuous loop, running on every house.
            </p>
          </div>

          {/* Diagram — scrolls horizontally on small screens to stay legible */}
          <div className="system-diagram-frame">
            <div className="system-diagram-scroll">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/system-diagram.svg"
                alt="SenseAgri AI system architecture — LoRa sensors and cameras on the house feed a LoRaWAN gateway and on-farm AI, which sync to the cloud and push alerts, live data, and reports to your phone."
                className="system-diagram-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The operating loop — 3 stages */}
      <section
        className="px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: "#F2F4F4", borderTop: "0.5px solid #BEC8CA" }}
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>The operating loop</Eyebrow>
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)", lineHeight: 1.04 }}
          >
            Capture. Interpret. Act.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-on-surface-variant">
            Every house runs the same loop, continuously — no manual rounds, no guesswork.
          </p>

          <div className="mt-8 grid gap-px md:grid-cols-3" style={{ background: "#E6E8E8" }}>
            {stages.map((s) => (
              <div key={s.n} className="flex flex-col bg-surface-container-lowest px-7 py-8">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-extrabold tracking-tight" style={{ color: GOLD }}>
                    {s.n}
                  </span>
                  <span style={{ width: 18, height: 1, background: GOLD }} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-on-surface">{s.t}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability pillars */}
      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Built for the field</Eyebrow>
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)", lineHeight: 1.04 }}
          >
            Engineered to run on real farms.
          </h2>

          <div className="mt-8 grid gap-px md:grid-cols-2" style={{ background: "#E6E8E8" }}>
            {pillars.map((p) => (
              <div key={p.t} className="flex flex-col gap-2 bg-surface-container-lowest px-7 py-7">
                <h3 className="font-display text-base font-bold tracking-tight text-on-surface">{p.t}</h3>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="grain relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: PRIMARY }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.08) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span
            className="mb-6 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
            style={{ background: "rgba(212,175,55,0.10)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
              Early Adopter Pilot
            </span>
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", lineHeight: 1.04 }}
          >
            See the loop run on your own houses.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white/70">
            We instrument a house, set the baseline, and show you the platform working — sensing, intelligence,
            and reports — before you commit to anything.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
            style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Book a Pilot Call
          </Link>
          <p className="mt-5 font-sans text-title-sm text-white/60">
            Or first, see what the pilot includes on the{" "}
            <Link href="/pricing" className="text-white/85 underline underline-offset-2 transition-colors duration-150 hover:text-white">
              pricing page
            </Link>
            .
          </p>
          <p className="mt-12 font-sans text-label-sm uppercase tracking-[0.06em] text-white/40">
            Last updated: {formatDisplayDate(pageLastModified["/solution"])}
          </p>
        </div>
      </section>
    </div>
  );
}
