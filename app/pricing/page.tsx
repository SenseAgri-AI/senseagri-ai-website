import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import PricingCard from "@/components/PricingCard";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Tiered pricing for SenseAgri AI. Start with a 30-day pilot and scale based on verified ROI."
};

export default function PricingPage() {
  return (
    <div>
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Pricing"
            title="POC-first pricing with clear upgrade paths."
            subtitle="Hardware plus a monthly platform subscription. Final pricing depends on barn count, connectivity, and module mix."
          />
          <p className="mt-5 font-label text-label-md text-outline-variant">
            Replace pricing ranges with your actual ranges. Keep the "from" structure for transparency.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-3">
          <PricingCard
            title="Starter Monitoring"
            price="From ZAR XXk–XXk / month"
            description="Sensors + dashboard for continuous visibility."
            features={[
              "Environmental sensors",
              "Farm dashboard",
              "Baseline alerts",
              "Weekly summary report"
            ]}
          />
          <PricingCard
            title="Smart Alerts"
            price="From ZAR XXk–XXk / month"
            description="Edge AI with incident tracking and response workflows."
            features={[
              "Edge AI processing",
              "Incident timeline",
              "Priority alerting",
              "Pilot support"
            ]}
            highlight
          />
          <PricingCard
            title="Full Decision Support"
            price="From ZAR XXk–XXk / month"
            description="AI, benchmarking, and what-if simulations for ROI leadership."
            features={[
              "Benchmarking and forecasting",
              "What-if simulations",
              "ROI tracking",
              "Executive reporting"
            ]}
          />
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="card grid gap-8 px-10 py-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h3 className="font-display text-title-lg font-medium text-on-surface">Pilot / POC offer</h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Start with a 30-day pilot to validate KPIs and ROI before committing to a longer rollout.
              </p>
              <ul className="mt-5 space-y-2 font-sans text-title-sm text-on-surface-variant">
                <li>Hardware + monthly platform</li>
                <li>On-site installation and calibration</li>
                <li>Weekly report and review</li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-between gap-4">
              <span className="badge">Limited pilot slots</span>
              <Button href="/contact">Book a Pilot Call</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Comparison"
            title="Compare tiers at a glance."
            subtitle="Choose the level of intelligence and automation your team needs today."
          />
          {/* No border-based table. Tonal rows replace dividers. */}
          <div className="mt-10 overflow-x-auto rounded-xl bg-surface-container-lowest shadow-ambient">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-surface-container">
                  <th className="px-6 py-4 text-left font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Feature</th>
                  <th className="px-6 py-4 text-left font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Starter</th>
                  <th className="px-6 py-4 text-left font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Smart Alerts</th>
                  <th className="px-6 py-4 text-left font-label text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Full Decision</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Environmental sensors", "Yes", "Yes", "Yes"],
                  ["Edge AI alerts", "—", "Yes", "Yes"],
                  ["Computer vision", "Optional", "Optional", "Yes"],
                  ["Benchmarking", "—", "Optional", "Yes"],
                  ["What-if simulations", "—", "—", "Yes"],
                  ["Weekly ROI report", "Yes", "Yes", "Yes"]
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low"}>
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className={`px-6 py-4 font-sans text-title-sm ${
                          index === 0 ? "font-medium text-on-surface" : "text-on-surface-variant"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
