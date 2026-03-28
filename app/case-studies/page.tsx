import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Pilot case studies for SenseAgri AI with placeholders for farm type, deployment, and measurable outcomes."
};

const caseStudies = [
  {
    location: "Western Cape",
    farmType: "Broiler farm",
    problem: "Heat stress and inconsistent ventilation across houses.",
    deployment: "LoRaWAN sensors + edge AI alerts across 4 houses.",
    outcome: "3.1% mortality reduction and improved ventilation response time."
  },
  {
    location: "KwaZulu-Natal",
    farmType: "Layer operation",
    problem: "Feed conversion drift and delayed anomaly response.",
    deployment: "Water + feed monitoring with weekly ROI reports.",
    outcome: "2.4% FCR improvement and fewer daily interventions."
  },
  {
    location: "Gauteng",
    farmType: "Integrated poultry group",
    problem: "Limited visibility across multiple sites.",
    deployment: "Dashboard rollout with benchmarking and alert tuning.",
    outcome: "Standardized response playbooks across 6 houses."
  }
];

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Case studies"
            title="Pilot outcomes from South African farms."
            subtitle="These examples show the types of challenges we solve and the metrics we track. Replace with real data as pilots complete."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {caseStudies.map((item) => (
            <div key={item.location} className="card flex h-full flex-col px-8 py-8">
              <p className="data-callout">{item.location}</p>
              <h3 className="mt-3 font-display text-title-md font-medium text-on-surface">{item.farmType}</h3>
              <div className="mt-5 space-y-4 font-sans text-title-sm text-on-surface-variant">
                <p>
                  <span className="font-medium text-on-surface">Problem:</span>{" "}
                  {item.problem}
                </p>
                <p>
                  <span className="font-medium text-on-surface">Deployment:</span>{" "}
                  {item.deployment}
                </p>
                <p>
                  <span className="font-medium text-on-surface">Outcome:</span>{" "}
                  {item.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <div className="card px-10 py-10 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h3 className="font-display text-display-sm font-medium text-on-surface">
                Interested in becoming a pilot site?
              </h3>
              <p className="mt-3 font-sans text-title-sm text-on-surface-variant">
                We onboard a small number of farms each quarter to keep pilots high-touch and measurable.
              </p>
            </div>
            <div className="mt-6 shrink-0 md:mt-0">
              <Button href="/contact">Register pilot interest</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
