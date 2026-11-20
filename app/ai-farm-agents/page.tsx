import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, farmAgentsServiceGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "AI farm agents",
  description:
    "Agents can be set up to connect to Big Dutchman, SKOV, Hytek, Vencomatic, and company records. They can send a WhatsApp alert, draft a weekly production report, and keep an issue log.",
  alternates: { canonical: "/ai-farm-agents" },
  openGraph: {
    title: "AI farm agents · SenseAgri AI",
    description:
      "Agents can be set up to connect to Big Dutchman, SKOV, Hytek, Vencomatic, and company records. They can send a WhatsApp alert, draft a weekly production report, and keep an issue log.",
    url: "/ai-farm-agents"
  }
};

const flow = [
  {
    title: "Records you connect",
    body: "The vision record, Big Dutchman, SKOV, Hytek or Vencomatic if you approve them, and your company records."
  },
  {
    title: "Agent",
    body: "Reads those records and looks for a reading that has left its range."
  },
  {
    title: "For you to check",
    body: "A WhatsApp alert, a weekly production report, and the open issues."
  }
];

const rhythm = [
  ["Overnight", "Scan the houses after dark."],
  ["Morning", "A health check to start the day."],
  ["Water and feed", "Look for water and feed issues."],
  ["Climate", "Heat, cold, and ventilation."],
  ["Egg reading", "Check that the egg count is coming in."],
  ["Tasks", "Check that scheduled tasks were logged on time."],
  ["End of day", "A wrap-up of what still needs a person."],
  ["Weekly", "A digest of the week."]
];

const examples = [
  {
    title: "WhatsApp alert",
    rows: [
      ["What left its range", "Temperature"],
      ["House", "House 3"],
      ["When", "This morning"],
      ["Reading", "Above the range set for this house"],
      ["Suggested check", "Look at ventilation in House 3"]
    ]
  },
  {
    title: "Weekly production report",
    rows: [
      ["Production trend", "House 3 against its usual week"],
      ["Feed and water", "Intake for the week, for a person to read"],
      ["Mortality", "Recorded for the week"],
      ["Environment", "Readings that left their range"],
      ["Open issues", "Items still open on House 3"],
      ["Actions", "Checks suggested for a person"]
    ]
  },
  {
    title: "Issue log entry",
    rows: [
      ["Issue", "Temperature left its range"],
      ["House", "House 3"],
      ["Raised by", "Sensor"],
      ["Status", "Open"],
      ["Owner", "House lead"],
      ["Follow-up", "Check ventilation, then close the note"]
    ]
  }
];

export default function AiFarmAgentsPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "AI farm agents", path: "/ai-farm-agents" }])} />
      <JsonLd data={farmAgentsServiceGraph()} />

      <article className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary">
          Agents that understand the farm.
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
          An agent can be set up to connect to the vision record, to Big Dutchman, SKOV, Hytek and Vencomatic controllers, and to the company records you approve. It can send a WhatsApp message when a reading leaves its range, draft a weekly production report, and keep an issue log. House sensors can be set up to keep logging if the link drops.
        </p>
        <ol className="mt-10 flex flex-col gap-2 md:flex-row md:items-stretch" aria-label="How an agent uses the records you connect">
          {flow.map((step, index) => (
            <li key={step.title} className="flex flex-1 flex-col gap-2 md:flex-row md:items-stretch">
              <div className="flex-1 bg-surface-container-lowest p-4" style={{ border: "0.5px solid #BEC8CA" }}>
                <h2 className="font-display text-lg font-semibold text-primary">{step.title}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{step.body}</p>
              </div>
              {index < flow.length - 1 ? (
                <span className="flex items-center justify-center font-sans text-lg text-sensing md:px-2" aria-hidden="true">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <section className="mt-16 max-w-3xl" style={{ borderTop: "0.5px solid #BEC8CA" }}>
          <h2 className="pt-10 font-display text-3xl font-semibold leading-tight tracking-tight text-primary">
            AI Farm Manager: watching every house, around the clock.
          </h2>
          <div className="mt-4 space-y-3 font-sans text-base leading-relaxed text-on-surface-variant">
            <p>
              Sensors and data come in. The Farm Manager can be set up to watch every house, all day, and to notice when something is not right before it costs you.
            </p>
            <p>
              It can watch the cameras and the barn sensors for water, feed, bird health, heat, cold, and ventilation, and for schedules that are slipping. A task check looks at whether scheduled work was logged on time. It does not watch people.
            </p>
            <p>
              It can send a direct message when something needs a person. Hard thresholds can run around the clock.
            </p>
          </div>
          <h3 className="mt-8 font-display text-xl font-semibold text-primary">A day of checks</h3>
          <ol className="mt-3" style={{ borderTop: "0.5px solid #BEC8CA" }}>
            {rhythm.map(([when, what]) => (
              <li key={when} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
                <span className="font-sans text-sm font-medium text-primary">{when}</span>
                <span className="font-sans text-sm leading-relaxed text-on-surface-variant">{what}</span>
              </li>
            ))}
          </ol>
          <h3 className="mt-8 font-display text-xl font-semibold text-primary">OK, Watch, Act</h3>
          <div className="mt-3 space-y-3 font-sans text-base leading-relaxed text-on-surface-variant">
            <p>Each reading can be sorted OK, Watch, or Act.</p>
            <p>Act can go out on WhatsApp straight away. Watch can go in an email brief. All of it can sit on the dashboard.</p>
            <p>If an alert is not acknowledged, it can move up a contact list. One item stays open per issue until it is closed. Every alert can link to the evidence behind it.</p>
            <p>People make the decisions. The owner approves any change to a threshold.</p>
          </div>
        </section>

        <p className="mt-12 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
          The three notes below are examples of the shape of that work. They use a made-up house. They are not a farm&apos;s results.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.title} className="bg-surface-container-lowest" style={{ border: "0.5px solid #BEC8CA" }}>
              <header className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
                <h2 className="font-display text-lg font-semibold text-primary">{example.title}</h2>
                <span className="shrink-0 bg-signal-wash px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Example
                </span>
              </header>
              <dl>
                {example.rows.map(([label, value]) => (
                  <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-1" style={{ borderTop: "0.5px solid #BEC8CA" }}>
                    <dt className="font-sans text-xs font-medium text-primary">{label}</dt>
                    <dd className="font-sans text-sm leading-relaxed text-on-surface-variant">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-on-surface-variant">
          Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it.
        </p>
        <p className="mt-4 font-sans text-sm">
          <Link href="/security" className="font-medium text-primary underline underline-offset-4">
            Security and data ownership
          </Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/ai-farm-agents"])}
        </p>
      </article>
    </div>
  );
}
