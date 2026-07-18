import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";

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
      "The early-adopter pilot is free. That includes full platform access — sensors, dashboard and AI — on-site installation and setup fully managed, and a direct line to the founders. No credit card required. When we launch commercially, pilot partners keep locked founder pricing."
  },
  {
    question: "Do I need to buy or install any hardware myself?",
    answer:
      "No. Sensors, edge compute and installation are all handled by us as part of the pilot — nothing to buy up-front, nothing to install yourself."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        headline="Answers to the"
        accentLine="most-asked questions."
        sub="How the platform works, what's in the pilot, and how it fits with the equipment you already have."
      />

      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-4xl">
          <FAQAccordion items={faqs} />

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
