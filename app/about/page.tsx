import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SenseAgri AI, our mission, and the team focused on measurable animal welfare and farm profitability."
};

const values = [
  {
    title: "Measurable ROI",
    desc: "We tie insights to quantifiable outcomes and track them through the pilot."
  },
  {
    title: "Transparency",
    desc: "Clear data ownership, shared KPIs, and open reporting with farm teams."
  },
  {
    title: "Reliability",
    desc: "Built for low-connectivity environments with edge resilience and offline buffering."
  },
  {
    title: "Farmer-first UX",
    desc: "Practical dashboards, concise alerts, and minimal operational overhead."
  }
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="About"
            title="Building decision intelligence for poultry farms."
            subtitle="SenseAgri AI is a South African agri-tech company focused on measurable animal welfare and profitability outcomes."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="card px-8 py-8">
            <h3 className="font-display text-title-lg font-medium text-on-surface">Mission</h3>
            <p className="mt-4 font-sans text-title-sm text-on-surface-variant">
              Deliver IoT + AI decision support that helps poultry farms improve welfare, reduce losses, and protect margins.
            </p>
          </div>
          <div className="card px-8 py-8">
            <h3 className="font-display text-title-lg font-medium text-on-surface">South African focus</h3>
            <p className="mt-4 font-sans text-title-sm text-on-surface-variant">
              We design for load shedding, rural connectivity, and the operational realities of local farms and integrators.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Team"
            title="A multidisciplinary team with hands-on farm experience."
            subtitle="Replace these placeholders with your team profiles."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "Founder / CEO",
              "Head of Data & AI",
              "Field Operations Lead"
            ].map((role) => (
              <div key={role} className="card px-8 py-8">
                <div className="h-16 w-16 bg-surface-container" />
                <h3 className="mt-5 font-display text-title-md font-medium text-on-surface">{role}</h3>
                <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                  Short bio placeholder and relevant experience.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Values"
            title="What guides the product and partnership."
            subtitle="We prioritize practical outcomes and long-term trust with farm teams."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="card px-8 py-7">
                <h3 className="font-display text-title-md font-medium text-on-surface">{value.title}</h3>
                <p className="mt-2 font-sans text-title-sm text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
