import type { Metadata } from "next";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import HeroSlideshow from "@/components/HeroSlideshow";
import IntelligenceField from "@/components/IntelligenceField";
import WhatYouGet from "@/components/WhatYouGet";
import POCBadge from "@/components/POCBadge";
import AFrameVision from "@/components/AFrameVision";
import ConnectorField from "@/components/ConnectorField";

export const metadata: Metadata = {
  title: {
    absolute: "SenseAgri AI — Computer vision and AI agents for the poultry farm"
  },
  description:
    "Computer vision is the farm's data layer — egg-counting cameras on A-frame layer cages, bird activity in the broiler house. AI agents connect securely to the data you own and keep the operation running. Your data stays yours.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SenseAgri AI — Computer vision and AI agents for the poultry farm",
    description:
      "Computer vision is the farm's data layer. AI agents connect securely to the data you own. Your data stays yours.",
    url: "/"
  }
};

const pillars = [
  {
    href: "/computer-vision",
    eyebrow: "Computer vision",
    title: "The farm’s data layer.",
    body: "Cameras mounted on the A-frame layer cages count eggs as the belt moves. In the broiler house, cameras read bird activity. A frame becomes a count the rest of the farm can trust — inference stays on your edge compute.",
    link: "How vision becomes data"
  },
  {
    href: "/ai-farm-agents",
    eyebrow: "AI farm agents",
    title: "Agents that understand the farm.",
    body: "Run the operation with agents that connect securely to the farm’s data and the company’s data. They catch issues, build reports, follow the birds, the work and the open issues, and keep analysing around the clock.",
    link: "What the agents stay on"
  },
  {
    href: "/security",
    eyebrow: "Your data",
    title: "You own it. We connect.",
    body: "Safely, securely and reliably. SenseAgri connects to the data the work needs and does not take ownership of it. You choose what is connected. What stays on the farm is computed on the farm.",
    link: "Security and data ownership"
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden">
        <HeroSlideshow />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,46,53,0.97) 0%, rgba(0,46,53,0.9) 35%, rgba(0,46,53,0.55) 65%, rgba(0,46,53,0.25) 85%, transparent 100%)"
          }}
        />
        <div className="hero-intelligence-wash pointer-events-none absolute inset-0 z-[1]" />
        <div className="intelligence-mist intelligence-mist-dark pointer-events-none absolute -right-[8%] top-[10%] z-[1] h-[72%] w-[58%]" />
        <IntelligenceField dark className="pointer-events-none absolute inset-y-0 right-0 z-[1] h-full w-[68%] opacity-[0.28]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,124,131,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="relative z-10 w-full px-6 pb-28 pt-28 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="hero-reveal mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-light">
              Computer vision · AI farm agents
            </p>
            <div className="relative w-fit max-w-full pr-[90px] sm:pr-[130px] lg:pr-[180px]">
              <h1
                className="hero-reveal delay-1 font-display font-bold text-white"
                style={{ fontSize: "clamp(1.85rem, 4.4vw, 4.15rem)", lineHeight: "0.98", letterSpacing: "-0.028em", maxWidth: "18ch" }}
              >
                Run your farm seamlessly
                <br />
                <span className="intelligence-text-gradient">with agents that understand it.</span>
              </h1>
              <POCBadge />
            </div>
            <p
              className="hero-reveal delay-2 mt-6 font-sans text-white/70"
              style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "52ch" }}
            >
              Computer vision is the data layer — egg-counting cameras on the A-frame, bird activity in the house. Agents connect to that data securely. The data stays yours.
            </p>
            <div className="hero-reveal delay-3 mt-8 flex flex-wrap items-center gap-3">
              <a href="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-surface-container-low">Book a POC</a>
              <a href="/contact?intent=partner" className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white/10" style={{ border: "0.5px solid rgba(255,255,255,0.55)" }}>For partners</a>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-16" style={{ paddingTop: 32, paddingBottom: 28, background: "linear-gradient(105deg, #002E35 0%, #003F4A 58%, #087C83 145%)" }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="font-display font-bold tracking-tight text-white/90"
            style={{ fontSize: "1.05rem", lineHeight: 1.35, maxWidth: "62ch" }}
          >
            Computer vision and AI agents for the poultry farm, run safely on data you still own.
          </h2>
          <p className="mt-3 font-sans leading-relaxed text-white/70" style={{ fontSize: "0.9375rem", maxWidth: "72ch" }}>
            SenseAgri turns what happens in the house into a record, then puts agents on that record. Vision counts eggs on A-frame layer cages and reads broiler activity, on the farm’s own edge compute. Agents connect through the systems already there — Big Dutchman, SKOV, Hytek, Vencomatic, the CCTV you use — and through the company data you choose to open. They catch issues, write reports, follow the birds, the work and the open issues, and keep going around the clock. You own the data. We connect to it. We do not take it.
          </p>
        </div>
      </div>

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.href} className="flex flex-col bg-surface-container-lowest p-6" style={{ borderTop: "2px solid #13AAA5" }}>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-sensing">{pillar.eyebrow}</p>
              <h2 className="mt-3 font-display text-title-lg font-semibold text-primary">{pillar.title}</h2>
              <p className="mt-3 flex-1 font-sans text-title-sm leading-relaxed text-on-surface-variant">{pillar.body}</p>
              <Link href={pillar.href} className="mt-5 font-sans text-sm font-semibold text-primary underline underline-offset-4">
                {pillar.link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16" style={{ background: "#F2F4F4", borderBottom: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: "2px solid #13AAA5", background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Computer vision
              </span>
            </span>
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", lineHeight: "1.05" }}
            >
              Cameras on the A-frame. A count in the house record.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-on-surface-variant">
              Egg-counting cameras mount on the A-frame layer cages and count continuously, so the belt is not waiting on a manual round. Breeder houses use the same approach to count eggs. Broiler cameras track movement and activity as a welfare signal. The frame becomes data, and that data sits with temperature, humidity, CO₂, ammonia, feed and water.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
              Inference runs on the farm’s own edge compute. The environmental sensor suite is what is already running on farms; vision is proven on a farm’s own houses in the proof of concept.
            </p>
            <Link href="/computer-vision" className="mt-6 inline-flex font-sans text-sm font-semibold text-primary underline underline-offset-4">
              Computer vision, in full
            </Link>
          </div>
          <AFrameVision idPrefix="home-vision" />
        </div>
      </section>

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: "2px solid #13AAA5", background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                AI farm agents
              </span>
            </span>
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", lineHeight: "1.05" }}
            >
              Run your farm seamlessly with AI agents that understand your farm.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-on-surface-variant">
              The agents connect securely to the vision record, the house sensors, the controllers you already run, and the company data you choose to open. They catch issues, build reports, follow the birds, follow the work and the open issues, spot where effort and result have come apart, and keep analysing around the clock. Following the work means the jobs and issues already in your records — not cameras pointed at people.
            </p>
          </div>
          <ConnectorField />
          <Link href="/ai-farm-agents" className="mt-8 inline-flex font-sans text-sm font-semibold text-primary underline underline-offset-4">
            AI farm agents, in full
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16" style={{ background: "#002E35" }}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
              style={{ background: "rgba(19,170,165,0.10)" }}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tertiary">
                Security and data ownership
              </span>
            </span>
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", lineHeight: "1.05" }}
            >
              Safely, securely, reliably. The data remains yours.
            </h2>
          </div>
          <div className="space-y-4 font-sans text-base leading-relaxed text-white/75">
            <p>
              We connect to the farm and to the company. We do not take the data. Ownership stays with the customer, including the vision counts and the records the agents read.
            </p>
            <p>
              Vision inference and house sensing run on-site, including when the link is down, and sync when it returns. You decide which systems are connected. A proof of concept is scoped on your houses before anything wider.
            </p>
            <Link href="/security" className="inline-flex font-sans text-sm font-semibold text-primary-light underline underline-offset-4">
              How ownership works
            </Link>
          </div>
        </div>
      </section>

      <WhatYouGet />

      <section
        className="grain relative overflow-hidden px-6 py-20 md:py-28 sm:px-10 lg:px-16"
        style={{ background: "radial-gradient(ellipse 62% 105% at 82% 42%, rgba(19,170,165,0.23) 0%, rgba(8,124,131,0.12) 35%, transparent 72%), linear-gradient(120deg, #0F172A 0%, #002E35 52%, #003F4A 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,124,131,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.08) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <IntelligenceField dark className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]" />
        <div className="intelligence-mist intelligence-mist-dark pointer-events-none absolute -right-[6%] top-[6%] h-[88%] w-[54%]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center reveal">
          <LogoMark className="mx-auto mb-8 h-14 w-14" />
          <span
            className="mb-8 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
            style={{ background: "rgba(88,201,197,0.10)" }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tertiary">
              Partner Programme
            </span>
          </span>
          <h2
            className="font-display font-semibold tracking-[-0.025em] text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: "0.95" }}
          >
            Your farm. Your data.
            <br />
            <span className="intelligence-text-gradient">Agents that stay with it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/70">
            Farmers book a proof of concept on their houses. Feed, vet and integrator partners join the Partner Programme — sensors, vision, dashboard and install, scoped together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-surface-container-low">Book a POC</a>
            <a href="/contact?intent=partner" className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white/10" style={{ border: "0.5px solid rgba(255,255,255,0.55)" }}>For partners</a>
          </div>
          <p className="mt-10 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Every signal. Every decision.
          </p>
        </div>
      </section>
    </div>
  );
}
