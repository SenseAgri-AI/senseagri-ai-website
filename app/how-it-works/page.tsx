import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { CloudIcon, ShieldIcon, SignalIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See the SenseAgri AI architecture, pilot timeline, and reliability model for poultry farm decision support."
};

export default function HowItWorksPage() {
  return (
    <div>
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="How it works"
            title="Architecture built for resilient farm operations."
            subtitle="Edge-first design ensures data capture and alerts continue even when connectivity drops."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Architecture"
            title="Edge to cloud, always-on visibility."
            subtitle="A simple three-layer model that keeps farmers in control of response time."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="card px-8 py-8">
              <SignalIcon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-title-md font-medium text-on-surface">Edge</h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Sensors and cameras capture local telemetry, with Jetson-based AI processing for immediate alerts.
              </p>
            </div>
            <div className="card px-8 py-8">
              <CloudIcon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-title-md font-medium text-on-surface">Cloud</h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Data syncs when connectivity is available, enabling benchmarking and longer-term analytics.
              </p>
            </div>
            <div className="card px-8 py-8">
              <ShieldIcon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-title-md font-medium text-on-surface">Dashboard</h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Farm teams get alerts, insights, and weekly ROI summaries in one secure view.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Demo app"
              title="Explore the SenseAgri AI dashboard."
              subtitle="Walk through live telemetry, alerts, and weekly insights in the demo environment."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="https://cluck-insights-dashboard.lovable.app/" external>
                Try the demo app
              </Button>
              <Button href="/contact" variant="secondary">
                Book a walkthrough
              </Button>
            </div>
          </div>
          <div className="card p-4">
            <div className="overflow-hidden bg-surface-container">
              <img
                src="/demo-app.gif"
                alt="SenseAgri AI demo dashboard preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-3 font-label text-label-md text-outline-variant">
              Live telemetry, alerts, and reporting views in the demo environment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Pilot timeline"
            title="A four-week pilot plan with clear checkpoints."
            subtitle="Each week builds toward an ROI review and go-forward decision."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                week: "Week 1",
                title: "Install + baseline",
                desc: "Deploy sensors and cameras, confirm connectivity, and capture baseline conditions."
              },
              {
                week: "Week 2",
                title: "Calibration + thresholds",
                desc: "Tune alert thresholds and align with farm operating procedures."
              },
              {
                week: "Week 3",
                title: "Insights + reporting",
                desc: "Deliver weekly report with insights, actions, and measurable impacts."
              },
              {
                week: "Week 4",
                title: "ROI review + next steps",
                desc: "Quantify impact, review outcomes, and propose scaling options."
              }
            ].map((item) => (
              <div key={item.week} className="card px-8 py-8">
                <p className="data-callout">{item.week}</p>
                <h3 className="mt-3 font-display text-title-md font-medium text-on-surface">{item.title}</h3>
                <p className="mt-2 font-sans text-title-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Security + reliability"
            title="Built for tough environments."
            subtitle="We protect uptime and data integrity with layered safeguards."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              "Offline buffering with local storage",
              "Role-based access for farm teams",
              "Encrypted transport and audit trails",
              "UPS options for critical hardware",
              "Incident escalation workflows",
              "Structured data retention"
            ].map((item) => (
              <div key={item} className="bg-surface-container px-6 py-4 font-sans text-title-sm text-on-surface-variant">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
