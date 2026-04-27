import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "SenseAgri AI is on a mission to close the intelligence gap in African agriculture — connecting farm data to AI that empowers every farmer to make decisions grounded in evidence."
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const values = [
  {
    title: "Measurable ROI",
    desc: "We tie insights to quantifiable outcomes and track them from day one of your pilot."
  },
  {
    title: "Trust first",
    desc: "Six months free. Full access. No commitment. We earn your trust before asking for anything."
  },
  {
    title: "African resilience",
    desc: "Built for load shedding, rural connectivity, and the operational realities of farms across the continent."
  },
  {
    title: "Farmer-first design",
    desc: "Practical dashboards, concise alerts, and minimal operational overhead — designed with farmers, not just for them."
  }
];

export default function AboutPage() {
  return (
    <div>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
        style={{ background: PRIMARY }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <span
            className="mb-6 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(212,175,55,0.10)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
              About
            </span>
          </span>
          <h1
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: "0.95", maxWidth: "18ch" }}
          >
            Building intelligence for<br />
            <span style={{ color: GOLD }}>African agriculture.</span>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 px-3 py-1"
              style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Mission
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-primary"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
            >
              Closing the intelligence gap in African agriculture.
            </h2>
          </div>
          <p className="font-sans text-base leading-relaxed text-on-surface-variant lg:pt-16">
            SenseAgri AI is on a mission to close the intelligence gap in African agriculture — connecting farm data to causal AI that empowers every farmer, regardless of scale, to make decisions grounded in evidence rather than guesswork.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-surface-container-low px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <span
            className="mb-10 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Founders
            </span>
          </span>

          {/* Founders photo */}
          <div
            className="mb-12 overflow-hidden"
            style={{ border: "0.5px solid #E6E8E8" }}
          >
            <Image
              src="/founders.jpeg"
              alt="Dylan Geldenhuys and Ryan — co-founders of SenseAgri AI"
              width={1200}
              height={1600}
              className="w-full h-auto"
            />
          </div>

          {/* Founder cards */}
          <div className="grid gap-px md:grid-cols-2" style={{ background: "#E6E8E8" }}>
            {[
              { name: "Dylan Geldenhuys", role: "Co-Founder & CEO", photo: "/dylan.png" },
              { name: "Ryan",             role: "Co-Founder & COO", photo: "/ryan.png" },
            ].map(({ name, role, photo }) => (
              <div key={name} className="flex flex-col gap-4 bg-surface px-8 py-8">
                <div className="overflow-hidden" style={{ width: 80, height: 80 }}>
                  <Image
                    src={photo}
                    alt={name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-bold tracking-tight text-on-surface">{name}</p>
                  <p
                    className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: GOLD }}
                  >
                    {role}
                  </p>
                </div>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
                  Bio coming soon.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <span
            className="mb-10 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Values
            </span>
          </span>
          <div className="grid gap-px md:grid-cols-2" style={{ background: "#E6E8E8" }}>
            {values.map((value) => (
              <div key={value.title} className="flex flex-col gap-3 bg-surface px-8 py-8">
                <h3 className="font-display text-lg font-bold tracking-tight text-on-surface">{value.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: "1.05" }}
          >
            Want to partner with us?
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
            We are actively looking for early adopter farms across Africa.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center px-8 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
            style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
