import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageClose from "@/components/PageClose";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, securityPageGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Security and data ownership",
  description:
    "Your farm data stays yours. SenseAgri connects securely for computer vision and AI agents — on-farm inference, connectors you choose — and does not take ownership of the data.",
  alternates: { canonical: "/security" }
};

const principles = [
  {
    eyebrow: "Ownership",
    title: "The data remains yours.",
    body: "House signals, vision counts, company records, reports and open issues stay the customer’s data. SenseAgri connects so computer vision and the farm agents can do their work. Connection is not a transfer of ownership, and it is not a copy we then treat as ours. We connect to it. We do not take it."
  },
  {
    eyebrow: "On the farm",
    title: "The sensitive work runs where the house is.",
    body: "Vision inference runs on the farm’s own edge compute, with no cloud round-trip per frame. Environmental sensing and inference run on-site, so the platform keeps working through the patchy connectivity that is normal on a rural farm. When the link returns, the record syncs. The house is not waiting on a distant server to know its own count."
  },
  {
    eyebrow: "Connectors",
    title: "You choose what is connected.",
    body: "Agents reach farm and company systems through connectors. That includes the controllers and equipment already named on this site — Big Dutchman, SKOV, Hytek, Vencomatic, DOL-class sensors — and the CCTV the farm already uses, plus the company records you decide to open. What is not connected is not visible to the agent. Worker context means the work and the open issues already in those records, not a camera on people."
  },
  {
    eyebrow: "Reliability",
    title: "Safe to leave running, because it is built for the house.",
    body: "Safely, securely and reliably is an operating rule, not a badge. Alerts name an action and still go to a person. The platform learns a baseline per house instead of imposing a generic threshold. Hardware you already trust can stay in place. A proof of concept runs on your houses before a wider commitment, and vision is proven on those houses rather than imported from somewhere else."
  }
];

export default function SecurityPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Security and data ownership", path: "/security" }])} />
      <JsonLd data={securityPageGraph()} />

      <PageHero
        eyebrow="Security and data ownership"
        headline="Your data"
        accentLine="stays yours."
        sub="Safely, securely and reliably. We connect to the farm and company data the work needs. We do not take it."
      />

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <h2
            className="font-display font-semibold tracking-[-0.025em] text-primary"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
          >
            A connection you can explain to the people who own the farm.
          </h2>
          <div className="space-y-4 font-sans text-base leading-relaxed text-on-surface-variant">
            <p>
              Computer vision turns what happens on the cages and in the house into data. AI agents use that data, and the company data you open, to catch issues, write reports, and follow the birds, the work and the open issues. None of that requires the data to change hands.
            </p>
            <p>
              Your data remains yours. The connection is there so the vision layer and the agents can do the work. Inference that can run on the farm runs on the farm.
            </p>
          </div>
        </div>
      </section>

      {principles.map((item, i) => (
        <section
          key={item.title}
          className="px-6 py-16 sm:px-10 lg:px-16"
          style={{
            background: i % 2 === 0 ? "#F2F4F4" : "#F8FAFA",
            borderTop: "0.5px solid #BEC8CA"
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <span
                className="mb-6 inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: "2px solid #13AAA5", background: "rgba(0,46,53,0.06)" }}
              >
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {item.eyebrow}
                </span>
              </span>
              <h2
                className="font-display font-semibold tracking-[-0.025em] text-primary"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
              >
                {item.title}
              </h2>
            </div>
            <p className="font-sans text-base leading-relaxed text-on-surface-variant lg:pt-1">{item.body}</p>
          </div>
        </section>
      ))}

      <section className="bg-surface px-6 py-14 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-sans text-title-sm leading-relaxed text-on-surface-variant">
            The two places that connection is put to work: the vision data layer, and the agents that read it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/computer-vision" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              Computer vision
            </Link>
            <Link href="/ai-farm-agents" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              AI farm agents
            </Link>
          </div>
        </div>
      </section>

      <PageClose
        updatedPath="/security"
        title="Ask us what would be connected, and what would not."
        body="A proof of concept is scoped with you. Ownership of the data does not move as part of that conversation."
      />
    </div>
  );
}
