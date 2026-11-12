import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageClose from "@/components/PageClose";
import ConnectorField from "@/components/ConnectorField";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, farmAgentsServiceGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "AI farm agents",
  description:
    "Run your farm seamlessly with AI agents that understand your farm. They connect securely to the data you own, catch issues, build reports, and keep the operation running around the clock.",
  alternates: { canonical: "/ai-farm-agents" }
};

const duties = [
  {
    title: "Catch issues.",
    body: "Agents watch the house record — environment, vision, feed, water, production — against that house’s own baseline. When something meaningful shifts, the alert that reaches a person on WhatsApp names the action, not only a mark on a chart."
  },
  {
    title: "Build reports.",
    body: "Weekly reports summarise what changed, why it reads that way, and what to look at next: production, performance and the return on the decisions already taken. The report is assembled from the farm’s data. It is not a slide rebuilt by hand every Monday."
  },
  {
    title: "Follow the birds.",
    body: "Counts from the layer cages, activity in the broiler house, hen-day production, mortality trend, feed conversion, and the weight and HPED forecasts checked against the farm’s own results during a proof of concept. The birds stay in the picture because the data does."
  },
  {
    title: "Follow the work, and the open issues.",
    body: "Agents also follow the work the operation already records: who is on a job, and which issues are still open. That comes from the company data you connect. It is not a camera pointed at people. Computer vision on this platform counts eggs and reads bird activity."
  },
  {
    title: "Spot inefficiencies.",
    body: "Root-cause reading ties a change in production or welfare to conditions, feed and water, and the management actions already written down. The point is to separate a symptom from the thing worth adjusting — climate, feed, or a job that never got closed."
  },
  {
    title: "Stay with it, around the clock.",
    body: "The house does not pause overnight, and neither does the reading. Agents keep analysing so the operation can keep running with the precision of its own signals. A person still gets the WhatsApp when a decision is needed. Patchy connectivity does not wipe the record: inference runs on the farm, and the data syncs when the link returns."
  }
];

export default function AiFarmAgentsPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "AI farm agents", path: "/ai-farm-agents" }])} />
      <JsonLd data={farmAgentsServiceGraph()} />

      <PageHero
        eyebrow="AI farm agents"
        headline="Run your farm seamlessly"
        accentLine="with agents that understand it."
        sub="Agents connect securely to the farm’s data and the company’s data. They catch issues, build reports, and keep the operation moving. The data remains yours."
      />

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-primary"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
            >
              They understand the farm because they are connected to its data.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-on-surface-variant">
              An agent is only as useful as the record it can see. Connectors are the secure path into the systems you already run — house controllers such as Big Dutchman, SKOV, Hytek and Vencomatic, the vision count, the environmental sensors, and the company records you decide to open. You keep those systems. SenseAgri does not become the owner of the data inside them.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
              This is done safely, securely and reliably: on-farm inference where the house already computes, a connection you can scope, and a proof of concept on your own houses before anything wider.
            </p>
          </div>
          <ConnectorField />
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16" style={{ background: "#F2F4F4", borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {duties.map((duty) => (
            <article key={duty.title} className="bg-surface-container-lowest p-6" style={{ borderTop: "2px solid #13AAA5" }}>
              <h3 className="font-display text-title-lg font-semibold text-primary">{duty.title}</h3>
              <p className="mt-3 font-sans text-title-sm leading-relaxed text-on-surface-variant">{duty.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 py-14 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-sans text-title-sm leading-relaxed text-on-surface-variant">
            The clearest input the agents have is the vision record — what the cages and the birds actually did — joined to the sensors already in the house.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/computer-vision" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              Computer vision
            </Link>
            <Link href="/security" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              Security and data ownership
            </Link>
          </div>
        </div>
      </section>

      <PageClose
        updatedPath="/ai-farm-agents"
        title="Put agents on your farm’s own data."
        body="A proof of concept connects the record you already have, shows the agents at work, and leaves ownership where it started — with you."
      />
    </div>
  );
}
