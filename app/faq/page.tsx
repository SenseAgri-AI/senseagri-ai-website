import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "How SenseAgri AI's poultry monitoring platform works — sensors, causal AI, integrations, pilot programme and hardware. Answers for commercial farms in South Africa.",
  alternates: { canonical: "/faq" }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const faqs = [
  {
    question: "How does SenseAgri AI detect poultry disease early?",
    answer:
      "The platform continuously monitors house conditions — temperature, humidity, gas, CO₂, feed, water, egg count and more — around the clock. On-farm AI learns each house's baseline and runs causal models against it, separating normal variation from the early signs of a real problem. When something meaningful shifts, an alert goes to your phone via WhatsApp with the specific action to take."
  },
  {
    question: "What sensors and hardware does the platform use?",
    answer:
      "LoRaWAN sensors and edge cameras deployed inside each house. They read temperature, humidity, gas, CO₂, feed, water and egg count around the clock. Sensing and inference run on-site, so the platform keeps working through patchy connectivity — data syncs to the cloud the moment the link returns."
  },
  {
    question: "Does it integrate with our existing farm equipment?",
    answer:
      "Yes. SenseAgri AI integrates with the major poultry platforms already on your farm — Big Dutchman, SKOV, Hytek, Vencomatic and more. You keep the controllers and equipment you have; SenseAgri adds the layer of continuous monitoring and causal analysis on top."
  },
  {
    question: "What does the pilot cost?",
    answer:
      "The early-adopter pilot runs at reduced founder-rate pricing, scoped per operation — cost depends on farm size, house count, and integration scope. It includes full platform access (sensors, dashboard and AI), on-site installation and setup fully managed, and a direct line to the founders. Book a pilot call and we'll walk you through the specifics for your farm."
  },
  {
    question: "Do I need to buy or install any hardware myself?",
    answer:
      "No. Sensors, edge compute and installation are all handled by us as part of the pilot — nothing to buy up-front, nothing to install yourself."
  },
  {
    question: "Does SenseAgri use computer vision for poultry monitoring?",
    answer:
      "Yes, and the vision layer is split by farm type. For layer and breeder houses, vision-based systems count eggs continuously. For broiler operations, cameras track bird movement and activity across the house as a welfare and behaviour signal. Cameras integrate with the CCTV your farm already uses, and vision inference runs on the farm's own edge compute — no cloud round-trip per frame."
  },
  {
    question: "How does acoustic monitoring work in a poultry house?",
    answer:
      "Microphones in each house pick up distinct sounds — stress vocalisations, wake-up patterns, and general activity levels — and classify them in real time. Sound is a leading indicator of welfare shifts, so combined with environmental and vision data, acoustic signals help catch issues earlier than any single sensor alone."
  },
  {
    question: "Can SenseAgri detect gut problems in poultry?",
    answer:
      "Yes. The platform tracks the feed-to-water consumption ratio continuously — a well-documented early indicator of gut health issues in poultry. When the ratio deviates from the flock's own baseline, the system flags it, typically days before the issue shows up in production numbers or mortality."
  },
  {
    question: "What welfare and production metrics does the platform track?",
    answer:
      "Environmental conditions (temperature, humidity, CO₂, ammonia), vision-based bird activity and movement, acoustic welfare signals including stress vocalisations, feed/water consumption patterns, egg count, hen-day production, mortality trends, and feed conversion — all in a single dashboard with weekly ROI reports summarising what changed and why."
  },
  {
    question: "What kind of AI does SenseAgri use?",
    answer:
      "The platform combines computer vision (bird tracking, egg counting), acoustic classification (welfare and stress-signal detection), and causal AI on environmental time-series. Inference runs on the farm itself, so the platform keeps working through patchy connectivity — data syncs to the cloud when the link returns."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
};

export default function FAQPage() {
  return (
    <div>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbGraph([{ name: "FAQ", path: "/faq" }])} />

      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="FAQ"
        headline="Answers to the"
        accentLine="most-asked questions."
        sub="How the platform works, what's in the pilot, and how it fits with the equipment you already have."
      />

      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-4xl">
          <FAQAccordion items={faqs} />

          <p className="mt-8 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
            Last updated: {formatDisplayDate(pageLastModified["/faq"])}
          </p>

          <div className="mt-12 flex flex-col items-start gap-4">
            <p className="font-sans text-title-sm text-on-surface-variant">
              Still have a question we haven&apos;t answered?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-primary-container"
              style={{ background: PRIMARY, boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
