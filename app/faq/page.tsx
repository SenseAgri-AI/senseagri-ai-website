import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "How the cameras, agents, sensors, and data ownership work, and what a proof of concept includes.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently asked questions · SenseAgri AI",
    description:
      "How the cameras, agents, sensors, and data ownership work, and what a proof of concept includes.",
    url: "/faq"
  }
};

const GOLD = "#13AAA5";
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
    question: "What does the Partner Programme cost?",
    answer:
      "The Partner Programme runs at founder pricing, scoped per operation — cost depends on farm size, house count, and integration scope. It includes full platform access (sensors, dashboard and AI), on-site installation and setup fully managed, hands-on onboarding, direct access to the SenseAgri AI team, and a roadmap shaped in part by what you tell us your farm needs. Book a demo and we'll walk you through the specifics."
  },
  {
    question: "Do I need to buy or install any hardware myself?",
    answer:
      "No. Sensors, edge compute and installation are all handled by us as part of the pilot — nothing to buy up-front, nothing to install yourself."
  },
  {
    question: "Does SenseAgri use computer vision for poultry monitoring?",
    answer:
      "Yes. Cameras on the A-frame layer cages count eggs. Breeder houses use the same count. Broiler cameras follow bird movement. Counting runs on the farm’s computer, and the cameras can use the CCTV you already have. We check the count on your houses in a proof of concept. Environmental sensors are what already run on farms."
  },
  {
    question: "What do the AI farm agents do?",
    answer:
      "They read the camera counts and the records you connect. They catch issues, build reports, and follow the birds, the jobs, and the open issues. Jobs come from your records. The cameras are not pointed at people. WhatsApp is used when a person needs to act."
  },
  {
    question: "Who owns the data SenseAgri connects to?",
    answer:
      "Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it. Egg counting runs on the farm’s computer. House sensors keep logging if the link drops, and sync when it returns."
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

      <header className="mx-auto max-w-3xl px-6 pt-12 sm:px-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-primary">Questions</h1>
        <p className="mt-3 font-sans text-base text-on-surface-variant">
          Cameras, agents, sensors, and who owns the data.
        </p>
      </header>

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
              className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-primary-container"
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
