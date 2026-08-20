import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";
import { siteConfig } from "@/lib/site";

const POST_PATH = "/blog/flock-night-rest-score";
const POST_URL = `${siteConfig.url}${POST_PATH}`;
const IMAGE_URL = `${siteConfig.url}/blog/flock-night-rest-score/dashboard.png`;
const PUBLISHED = "2026-08-20";
const MODIFIED = pageLastModified[POST_PATH];

export const metadata: Metadata = {
  title: "The Flock Night-Rest Score — Measuring Poultry Sleep with AI",
  description:
    "A nightly 0–100 sleep score for laying hens, measured from shed sound and IoT sensors. How SenseAgri AI turns flock rest into an early-warning signal for welfare, heat stress, and disturbance.",
  alternates: { canonical: POST_PATH },
  openGraph: {
    title: "The Flock Night-Rest Score — Measuring Poultry Sleep with AI",
    description:
      "A nightly 0–100 sleep score for laying hens, measured from shed sound and IoT sensors.",
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: IMAGE_URL, width: 3002, height: 1340 }]
  }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

const steps = [
  {
    title: "Listen",
    body:
      "A microphone in the shed captures the flock through the night: how much of the whole flock is stirring, not just one loud bang."
  },
  {
    title: "Sense",
    body:
      "IoT sensors log temperature, humidity and light every minute — the conditions that make or break a bird's rest."
  },
  {
    title: "Score",
    body:
      "Each night is scored 0–100 against research-backed thresholds, combining six factors into one clear number."
  },
  {
    title: "Tell",
    body:
      "The score, the trend, and the reason land on the farmer's phone, with a WhatsApp alert only when something needs attention."
  }
];

const factors = [
  {
    name: "Noise",
    meaning:
      "How much of the night the flock was raised and vocal — the main measure of disturbance across the whole flock."
  },
  {
    name: "Bouts",
    meaning:
      "How many separate times they were unsettled. Repeated waking is worse than one long event."
  },
  {
    name: "Loudness",
    meaning:
      "How intense the disturbance was, not just how long — a sudden fright reads differently from mild restlessness."
  },
  {
    name: "Pre-dawn",
    meaning:
      "Disruption in the hours before first light, weighted heavily — the window where deep, restorative REM sleep matters most."
  },
  {
    name: "Experienced heat",
    meaning:
      "Temperature and humidity combined into a “feels-like” °C — because a bird cools by panting and can't shed humid heat. Heat is the first thing to rob a hen of REM sleep."
  },
  {
    name: "Darkness",
    meaning:
      "Whether the flock got enough dark to rest — hens only sleep in the dark. Too little (long summer days, lights left on) costs them; plenty is free."
  }
];

const scoreBands = [
  { range: "85–100", label: "Restful", desc: "undisturbed rest" },
  { range: "60–85", label: "Some disruption", desc: "worth a look" },
  { range: "Below 60", label: "Disturbed", desc: "something needs attention" }
];

const farmerGets = [
  "Last night's score, clear and simple, with the trend across recent nights.",
  "A plain-language reason for it — noise, heat, or not enough darkness.",
  "A WhatsApp alert only when rest has been poor several nights running — with the likely cause.",
  "The actual audio clips of the disturbance, to listen to and judge for themselves."
];

const references = [
  {
    finding:
      "Hens sleep almost entirely in the dark — roughly 60% deep (slow-wave) sleep and 12% REM during lights-off; in daylight they barely sleep at all. This is why we score the night, and why darkness matters.",
    citation: "Putyora et al. (2023), Animals 13(19):3105"
  },
  {
    finding:
      "Heat is the biggest disruptor of sleep — it nearly eliminated REM sleep in EEG studies, and can rob a hen of rest even when she's quiet — so we measure it directly.",
    citation: "Putyora et al. (2023), Animals"
  },
  {
    finding:
      "A single rough night is recovered; repeated ones aren't — brief disturbances are compensated the same night, so we alert on sustained poor sleep, not one-offs.",
    citation: "Putyora et al. (2023), “Mild Disturbances,” Animals"
  },
  {
    finding:
      "Sustained heat erodes production — feed intake and egg output fall as heat rises, with egg quality degrading first. Sleep, heat and production sit on the same chain.",
    citation: "Animals (2024) 14(7):1076"
  },
  {
    finding:
      "Red mite nearly doubles night-time restlessness — under infestation, dark-period activity roughly doubled and stayed high all night. Because the score is built to detect restless, disturbed nights, an outbreak shows up as sustained poor sleep.",
    citation: "Willems et al. (2025), Animals 15(19):2928"
  }
];

const whyItMatters = [
  {
    title: "Welfare, made visible",
    body:
      "A continuous, non-invasive read on how well the flock is resting, night to night."
  },
  {
    title: "Points to the cause",
    body:
      "Heat, a broken dark period, or repeated disturbance — so the farmer knows where to look."
  },
  {
    title: "An early-warning system",
    body:
      "Persistent poor sleep can flag heat stress, disturbance, or a building red-mite problem before it shows up in production."
  }
];

const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": POST_URL,
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  headline: "The Flock Night-Rest Score: A sleep score for the flock",
  description:
    "A nightly 0–100 sleep score for laying hens, measured from shed sound and IoT sensors. Peer-reviewed thresholds; delivered to the farmer's phone every morning.",
  image: IMAGE_URL,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { "@id": `${siteConfig.url}/#organization` },
  publisher: { "@id": `${siteConfig.url}/#organization` },
  articleSection: "Poultry Welfare",
  keywords: [
    "poultry sleep",
    "laying hen welfare",
    "flock behaviour monitoring",
    "AI poultry monitoring",
    "heat stress in poultry",
    "red mite detection",
    "acoustic poultry monitoring"
  ],
  inLanguage: "en"
};

export default function FlockNightRestScorePost() {
  return (
    <div>
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd
        data={breadcrumbGraph([
          { name: "Blog", path: "/blog" },
          { name: "The Flock Night-Rest Score", path: POST_PATH }
        ])}
      />

      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="Blog · Poultry Welfare"
        headline="A sleep score"
        accentLine="for the flock."
        sub="A nightly rating (0–100) of how well laying hens actually rested — measured from the sound of the shed and the conditions inside it, and delivered to the farmer's phone by morning."
      />

      <article className="bg-surface px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-3xl">

          {/* Article meta */}
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
            <span>Published {formatDisplayDate(PUBLISHED)}</span>
            <span aria-hidden="true">·</span>
            <span>Poultry Welfare</span>
            <span aria-hidden="true">·</span>
            <span>5 min read</span>
          </div>

          {/* Article hero image — resting hen */}
          <figure className="mb-10 -mx-6 sm:-mx-10 lg:-mx-16" style={{ background: "#F2F4F4", borderTop: "0.5px solid #BEC8CA", borderBottom: "0.5px solid #BEC8CA" }}>
            <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 lg:px-16">
              <Image
                src="/blog/flock-night-rest-score/sleeping-hen.jpg"
                alt="A hen resting quietly on a white background — the kind of undisturbed rest a Night-Rest Score of 100 represents."
                width={612}
                height={408}
                className="mx-auto block h-auto w-full max-w-md"
                priority
              />
            </div>
          </figure>

          {/* Intro */}
          <p className="font-sans text-lg leading-relaxed text-on-surface-variant">
            Sleep drives health, welfare and laying, yet until now no one could see it. SenseAgri AI turns an existing shed microphone and a handful of IoT sensors into a simple, nightly window on the flock&rsquo;s night.
          </p>

          {/* Dashboard screenshot */}
          <figure className="mt-10">
            <div className="overflow-hidden" style={{ border: "0.5px solid #BEC8CA" }}>
              <Image
                src="/blog/flock-night-rest-score/dashboard.png"
                alt="The Flock Night-Rest Score on the SenseAgri dashboard — a nightly restfulness score of 89/100 with breakdown by noise, bouts, loudness, pre-dawn, heat, and darkness."
                width={3002}
                height={1340}
                className="block h-auto w-full"
                priority
              />
            </div>
            <figcaption className="mt-3 font-sans text-title-sm text-on-surface-variant/70">
              The Flock Night-Rest Score on the SenseAgri dashboard.
            </figcaption>
          </figure>

          {/* How it works */}
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-primary">
            How it works
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            No new cameras, no wearables, nothing that touches the birds.
          </p>
          <ol className="mt-6 flex flex-col gap-4 list-none pl-0">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="shrink-0 font-display text-lg font-extrabold" style={{ color: GOLD, minWidth: "1.5rem" }}>
                  {i + 1}.
                </span>
                <div className="font-sans text-base leading-relaxed">
                  <span className="font-display font-bold text-on-surface">{step.title}</span>
                  <span className="text-on-surface-variant"> — {step.body}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Factors table */}
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-primary">
            What the score measures
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            A perfect, undisturbed night is 100. Each problem takes points off.
          </p>
          <div className="mt-6 overflow-x-auto" style={{ border: "0.5px solid #BEC8CA" }}>
            <table className="w-full font-sans text-sm">
              <thead>
                <tr style={{ background: "#F2F4F4", borderBottom: "0.5px solid #BEC8CA" }}>
                  <th className="px-4 py-3 text-left font-display text-[13px] font-bold uppercase tracking-[0.06em] text-on-surface">Factor</th>
                  <th className="px-4 py-3 text-left font-display text-[13px] font-bold uppercase tracking-[0.06em] text-on-surface">What it means</th>
                </tr>
              </thead>
              <tbody>
                {factors.map(({ name, meaning }, i) => (
                  <tr
                    key={name}
                    style={{
                      borderBottom: i === factors.length - 1 ? undefined : "0.5px solid #BEC8CA",
                      background: i % 2 === 0 ? "#ffffff" : "#F8FAFA"
                    }}
                  >
                    <td className="px-4 py-3 align-top font-display font-bold text-on-surface" style={{ minWidth: "180px" }}>
                      {name}
                    </td>
                    <td className="px-4 py-3 align-top leading-relaxed text-on-surface-variant">
                      {meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Score bands callout */}
          <div className="mt-8 bg-surface-container-low px-6 py-6" style={{ borderLeft: `2px solid ${GOLD}` }}>
            <div className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Score bands
            </div>
            <ul className="flex flex-col gap-2 font-sans text-sm text-on-surface-variant">
              {scoreBands.map(({ range, label, desc }) => (
                <li key={label}>
                  <span className="font-display font-bold text-on-surface">{range} · {label}</span>
                  <span> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What the farmer gets */}
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-primary">
            What the farmer gets
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            &ldquo;The birds seem unsettled lately&rdquo; becomes something measured — and actionable.
          </p>
          <ul className="mt-6 flex flex-col gap-3 font-sans text-base text-on-surface-variant list-none pl-0">
            {farmerGets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 shrink-0 font-display text-sm font-extrabold" style={{ color: GOLD }}>
                  ✓
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* Science section */}
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-primary">
            The science behind it
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            The score isn&rsquo;t guesswork — its thresholds are grounded in peer-reviewed poultry research.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {references.map(({ finding, citation }) => (
              <div
                key={citation}
                className="flex flex-col gap-2 bg-surface-container-lowest px-6 py-5"
                style={{ border: "0.5px solid #BEC8CA" }}
              >
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
                  {finding}
                </p>
                <p className="font-sans text-label-sm italic text-on-surface-variant/80">
                  — {citation}
                </p>
              </div>
            ))}
          </div>

          {/* Why it matters */}
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-tight text-primary">
            Why it matters
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            Poor sleep is a leading indicator — it often moves before the egg count does.
          </p>
          <ul className="mt-6 flex flex-col gap-4 font-sans text-base text-on-surface-variant list-none pl-0">
            {whyItMatters.map(({ title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-1 shrink-0 font-display text-sm font-extrabold" style={{ color: GOLD }}>
                  →
                </span>
                <div className="leading-relaxed">
                  <span className="font-display font-bold text-on-surface">{title}</span>
                  <span> — {body}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-tertiary bg-surface-container-low px-6 py-5 font-sans text-sm italic leading-relaxed text-on-surface-variant">
            <span className="font-display not-italic font-bold text-on-surface">Where we are today:</span>{" "}
            the score is a validated welfare and early-warning signal, built from sound and environment — a practical, farm-ready measure. Linking it to production numbers is what we&rsquo;re validating next, on each farm&rsquo;s own data.
          </p>

          {/* Last updated */}
          <p className="mt-12 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
            Last updated: {formatDisplayDate(MODIFIED)}
          </p>

          {/* Back link */}
          <div className="mt-10 border-t border-outline-variant pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:text-primary-container"
            >
              ← All posts
            </Link>
          </div>

        </div>
      </article>

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
              Partner Programme
            </span>
          </span>
          <h2
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
          >
            See how the flock is really sleeping.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white/70">
            The Night-Rest Score runs on the same platform as everything else — environment sensing, vision, and WhatsApp alerts.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
            style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Book a Demo
          </Link>
          <p className="mt-5 font-sans text-title-sm text-white/60">
            Or see the full{" "}
            <Link href="/capabilities" className="text-white/85 underline underline-offset-2 transition-colors duration-150 hover:text-white">
              platform capabilities
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
