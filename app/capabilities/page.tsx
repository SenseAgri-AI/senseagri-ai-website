import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Poultry Monitoring Capabilities — Welfare, Vision & Disease Alerts",
  description:
    "Intelligent poultry farm monitoring — environmental sensors, computer vision, acoustic welfare signals, gut-health tracking, production intelligence, and early disease alerts for commercial poultry operations.",
  alternates: { canonical: "/capabilities" }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

type Capability = {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
};

const capabilities: Capability[] = [
  {
    eyebrow: "Poultry environmental monitoring",
    title: "Every reading in the house, around the clock.",
    body: "LoRaWAN sensors track temperature, humidity, gas, CO₂, ammonia, feed and water in each poultry house. Baselines are learned per house, so the platform flags anomalies against the room's own history — not a generic threshold that ignores your climate, breed, or age of flock.",
    tags: ["Temperature & humidity", "CO₂ & ammonia", "Feed & water consumption", "Per-house baselines"]
  },
  {
    eyebrow: "Computer vision for poultry",
    title: "Egg counting for layers, bird tracking for broilers.",
    body: "For layer and breeder houses, vision-based systems count eggs continuously — no manual rounds, no spreadsheet reconciliation. For broiler operations, cameras track bird movement and activity across the house as a welfare and behaviour signal. Cameras integrate with the CCTV your farm already uses, and vision inference runs on the farm's own edge compute — no cloud round-trip per frame.",
    tags: ["Egg counting — layer & breeder", "Bird tracking — broiler activity", "Edge inference", "CCTV partner integration"]
  },
  {
    eyebrow: "Acoustic poultry welfare monitoring",
    title: "What the flock is telling you.",
    body: "Microphones in each house pick up distinct sounds — stress vocalisations, wake-up patterns, general activity levels — and classify them in real time. Sound is a leading indicator of welfare shifts, and combining acoustic signals with environmental and vision data catches issues no single sensor would.",
    tags: ["Stress vocalisation detection", "Bird activity classification", "Wake-up pattern tracking", "Feeding-time optimisation"]
  },
  {
    eyebrow: "Poultry gut-health intelligence",
    title: "Feed-to-water ratios reveal gut issues early.",
    body: "The feed-to-water consumption ratio is a well-documented early indicator of gut health issues in poultry. SenseAgri tracks the ratio continuously and flags when it deviates from the flock's own baseline — days before the problem shows up in production numbers or mortality.",
    tags: ["Feed:water ratio tracking", "Baseline deviation alerts", "Consumption pattern analysis"]
  },
  {
    eyebrow: "Poultry production intelligence",
    title: "Welfare and production, in one place.",
    body: "Hen-day production, mortality trends, feed conversion and welfare metrics run side by side in a single dashboard. Weekly ROI reports summarise what changed in the last seven days, why, and what to do next — no manual spreadsheet stitching.",
    tags: ["Hen-day production", "Mortality trends", "Feed conversion (FCR)", "Weekly ROI reports"]
  },
  {
    eyebrow: "Early poultry disease detection",
    title: "Anomalies across every signal, all at once.",
    body: "The platform correlates environmental, vision, and acoustic anomalies against each house's baseline — surfacing early signs of disease that no single sensor would catch alone. Alerts arrive on WhatsApp with the specific action to take, not just a red dot on a chart.",
    tags: ["Multi-modal signal fusion", "Behaviour anomaly detection", "Real-time WhatsApp alerts", "Baseline-relative flagging"]
  }
];

export default function CapabilitiesPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Capabilities", path: "/capabilities" }])} />

      <PageHero
        eyebrow="Capabilities"
        headline="Poultry welfare & production"
        accentLine="intelligence, on one platform."
        sub="AI poultry monitoring for commercial farms — environmental sensors, computer vision, acoustic welfare signals, gut-health intelligence, production reporting, and early disease alerts running continuously in every house."
      />

      {/* Honesty strip — how we validate before something ships to production */}
      <div className="bg-surface px-6 py-10 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-title-sm leading-relaxed text-on-surface-variant">
            The sensor suite — environmental monitoring, air quality, and climate alerts — is live and running on farms today. The other capabilities run in the same platform, and pilots are how we validate each one on your operation, so nothing counts as production-ready until it&apos;s proven on your own houses.
          </p>
        </div>
      </div>

      {/* Capability sections — alternating surfaces for rhythm */}
      {capabilities.map((c, i) => (
        <section
          key={c.eyebrow}
          className="px-6 py-16 sm:px-10 lg:px-16"
          style={{
            background: i % 2 === 0 ? "#F8FAFA" : "#F2F4F4",
            borderTop: "0.5px solid #BEC8CA"
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <span
                className="mb-6 inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: `2px solid ${GOLD}`, background: "rgba(0,46,53,0.06)" }}
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  {c.eyebrow}
                </span>
              </span>
              <h2
                className="font-display font-extrabold tracking-tighter text-primary"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
              >
                {c.title}
              </h2>
            </div>
            <div className="flex flex-col gap-6 lg:pt-1">
              <p className="font-sans text-base leading-relaxed text-on-surface-variant">
                {c.body}
              </p>
              <ul className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-on-surface-variant"
                    style={{ border: "0.5px solid #BEC8CA", padding: "6px 10px" }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Closing CTA */}
      <section
        className="grain relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: PRIMARY, borderTop: "0.5px solid #BEC8CA" }}
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
            See these capabilities in your own houses.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white/70">
            We instrument a house, set the baseline, and show you the platform working — sensing, vision, acoustic, and reports — before you commit to anything.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
            style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Book a Pilot Call
          </Link>
          <p className="mt-5 font-sans text-title-sm text-white/60">
            Or first, see the{" "}
            <Link href="/solution" className="text-white/85 underline underline-offset-2 transition-colors duration-150 hover:text-white">
              full end-to-end platform
            </Link>
            .
          </p>
          <p className="mt-12 font-sans text-label-sm uppercase tracking-[0.06em] text-white/40">
            Last updated: {formatDisplayDate(pageLastModified["/capabilities"])}
          </p>
        </div>
      </section>
    </div>
  );
}
