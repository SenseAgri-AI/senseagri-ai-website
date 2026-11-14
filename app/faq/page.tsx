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
      "The platform monitors house conditions: temperature, humidity, gas, CO₂, feed, water, and egg count. It learns each house's baseline and separates normal variation from a real change. When something meaningful shifts, it is flagged for a person to check."
  },
  {
    question: "What sensors and hardware does the platform use?",
    answer:
      "Sensors and cameras in the house. They can read temperature, humidity, gas, CO₂, feed, water, and egg count. Sensor logging can be set up to keep recording if the link drops."
  },
  {
    question: "Does it use the equipment we already have?",
    answer:
      "Agents can be set up to connect to Big Dutchman, SKOV, Hytek, and Vencomatic controllers, and to the company records you approve. A proof of concept agrees that scope before anything is switched on."
  },
  {
    question: "What does the Partner Programme cost?",
    answer:
      "The Partner Programme runs at founder pricing, scoped per operation — cost depends on farm size, house count, and integration scope. It includes full platform access (sensors, dashboard and AI), on-site installation and setup fully managed, hands-on onboarding, direct access to the SenseAgri AI team, and a roadmap shaped in part by what you tell us your farm needs. Book a demo and we'll walk you through the specifics."
  },
  {
    question: "Do I need to buy or install any hardware myself?",
    answer:
      "No. Sensors and installation are handled by us as part of the pilot. Nothing to buy up-front, and nothing to install yourself."
  },
  {
    question: "Does SenseAgri use computer vision for poultry monitoring?",
    answer:
      "Yes. Cameras can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing can run on the farm so frames stay on site. Egg counting on the A-frame is the reading shown on the site. We check the count on your houses in a proof of concept."
  },
  {
    question: "What do the AI farm agents do?",
    answer:
      "They can be set up to connect to the vision record, to Big Dutchman, SKOV, Hytek and Vencomatic controllers, and to the company records you approve. They can send a WhatsApp alert when a reading leaves its range, draft a weekly production report, and track open work. The cameras are for eggs, birds, activity, and issues, not for watching people."
  },
  {
    question: "Who owns the data SenseAgri connects to?",
    answer:
      "Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it."
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
      "Environmental conditions (temperature, humidity, CO₂, ammonia), bird activity, sound, feed and water, egg count, hen-day production, mortality, and feed conversion."
  },
  {
    question: "What kind of AI does SenseAgri use?",
    answer:
      "Computer vision for eggs, birds, activity, and issues, plus sound classification and models on the house readings."
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
