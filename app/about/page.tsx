import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "SenseAgri AI is on a mission to close the intelligence gap in African agriculture — empowering every farmer to make data-driven decisions, regardless of scale."
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
    desc: "Built for rural connectivity and the operational realities of farms across the continent."
  },
  {
    title: "Farmer-first design",
    desc: "Practical dashboards, concise alerts, and minimal operational overhead — designed with farmers, not just for them."
  }
];

const founders = [
  {
    name: "Dylan Geldenhuys",
    role: "Co-Founder & CEO",
    photo: "/dylan.png",
    bio: "Dylan is a data scientist with over 6 years of industry experience in biotech and data."
  },
  {
    name: "Dr Ryan Nel",
    role: "Co-Founder & COO",
    photo: "/ryan.png",
    bio: "Ryan is a veterinarian with extensive knowledge and experience in poultry epidemiology and animal health."
  }
];

export default function AboutPage() {
  return (
    <div>

      {/* Hero — dark navy + light teal accent */}
      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="About"
        headline="Building intelligence for"
        accentLine="African agriculture."
      />

      {/* Mission */}
      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
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
          <p className="font-sans text-base leading-relaxed text-on-surface-variant lg:pt-1">
            Generating insights and automation with real ROI, understanding cause and effect, empowering every farmer to make data-driven decisions — regardless of scale.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="px-6 py-16 sm:px-10 lg:px-16" style={{ background: "#F2F4F4", borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">
          <span
            className="mb-6 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Founders
            </span>
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
          >
            Meet the team behind the platform.
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr]">
            {/* Portrait photo — shown in full, no crop */}
            <div className="overflow-hidden max-w-[380px]" style={{ border: "0.5px solid #BEC8CA" }}>
              <Image
                src="/founders.jpeg"
                alt="Dylan Geldenhuys and Dr Ryan Nel — co-founders of SenseAgri AI"
                width={600}
                height={800}
                className="block h-auto w-full"
              />
            </div>

            {/* Founder cards — fill the photo height on desktop */}
            <div className="grid gap-px lg:grid-rows-2" style={{ background: "#E6E8E8" }}>
              {founders.map(({ name, role, photo, bio }) => (
                <div key={name} className="flex items-center gap-5 bg-surface-container-lowest px-7 py-7">
                  <div
                    className="shrink-0 overflow-hidden"
                    style={{ width: 72, height: 72, border: "0.5px solid #E6E8E8" }}
                  >
                    <Image src={photo} alt={name} width={72} height={72} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold tracking-tight text-on-surface">{name}</p>
                    <p className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
                      {role}
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface-variant">{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section
        className="grain relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: PRIMARY }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.07) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span
              className="mb-6 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
              style={{ background: "rgba(212,175,55,0.10)" }}
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                Our story
              </span>
            </span>
            <h2
              className="font-display font-extrabold tracking-tighter text-white"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
            >
              How SenseAgri AI began.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-sans text-[0.9375rem] leading-relaxed text-white/75">
            <p>
              SenseAgri AI started with a conversation in early 2025. Dylan and Ryan came from different
              fields — one from data science and biotech, the other from veterinary medicine and animal
              health — but found they shared a single conviction: that the right data, read the right way,
              could fundamentally change how farms are run.
            </p>
            <p>
              They got to work straight away. Dylan brought years of turning complex, messy data into clear
              technical systems and decisions. Ryan brought deep, hands-on expertise in poultry health and
              animal science. Those two perspectives became the foundation of the platform — technology
              that understands not just what is happening inside a house, but why.
            </p>
            <p>
              Their goal is both simple and ambitious: to give every farmer the kind of insight once
              reserved for the largest operations. Not another dashboard to check, but a genuine
              understanding of cause and effect — so decisions are made early, with evidence, and with
              confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">
          <span
            className="mb-6 inline-flex items-center gap-2 px-3 py-1"
            style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Values
            </span>
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter text-primary"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
          >
            What we stand for.
          </h2>
          <div className="mt-8 grid gap-px md:grid-cols-2" style={{ background: "#E6E8E8" }}>
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
      <section className="px-6 py-16 sm:px-10 lg:px-16 text-center" style={{ background: "#F2F4F4", borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-xl">
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
            className="mt-6 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
            style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
