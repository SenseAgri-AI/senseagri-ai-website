import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import { AlertIcon, CameraIcon, ChartIcon, CloudIcon, LeafIcon, SignalIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Solution",
  description:
    "Explore the SenseAgri AI platform: sensing, edge analytics, dashboards, alerts, and ROI-focused reporting for poultry farms."
};

export default function SolutionPage() {
  return (
    <div>
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Solution"
            title="Decision intelligence built for poultry operations."
            subtitle="A modular platform that captures the right signals, turns them into insights, and delivers practical recommendations for farm teams."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Core modules"
            title="Everything you need to monitor, alert, and act."
            subtitle="Choose the modules that fit your operation and expand when the value is proven."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Environmental Monitoring"
              description="Temperature, humidity, and optional NH3/CO2 sensors with barn-level trends."
              icon={<LeafIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Water & Feed Signals"
              description="Flow monitoring, consumption anomalies, and early warnings for equipment issues."
              icon={<SignalIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Computer Vision"
              description="Camera-based counting, activity patterns, and welfare indicators."
              icon={<CameraIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Alerting & Incidents"
              description="Threshold-based alerts with an incident timeline for accountability."
              icon={<AlertIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Dashboards & Benchmarking"
              description="Compare houses, flocks, and cycles in one clear interface."
              icon={<ChartIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Weekly ROI Reporting"
              description="Impact summaries with cost, energy, and compliance metrics."
              icon={<CloudIcon className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Data pipeline"
            title="From barn signals to verified outcomes."
            subtitle="A simple flow that keeps data moving even in low-connectivity regions."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Edge Sensing",
                desc: "Sensors and cameras capture conditions and behaviors inside each house."
              },
              {
                title: "Edge AI Processing",
                desc: "Jetson hardware runs models locally and triggers alerts without cloud dependency."
              },
              {
                title: "Cloud + Dashboard",
                desc: "Buffered data syncs to analytics dashboards and weekly reports."
              }
            ].map((item, index) => (
              <div key={item.title} className="card px-8 py-8">
                <p className="data-callout">Stage {index + 1}</p>
                <h3 className="mt-3 font-display text-title-md font-medium text-on-surface">{item.title}</h3>
                <p className="mt-2 font-sans text-title-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="badge">Offline buffering</span>
            <span className="badge">Encrypted transport</span>
            <span className="badge">Role-based access</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Hardware kit"
            title="What you get in the box."
            subtitle="Each pilot kit is sized for your house layout and connectivity requirements."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card px-8 py-8">
              <h3 className="font-display text-title-md font-medium text-on-surface">Included hardware</h3>
              <ul className="mt-5 space-y-3 font-sans text-title-sm text-on-surface-variant">
                <li>LoRaWAN gateway (placeholder brand)</li>
                <li>Environmental sensors (temp, humidity, optional NH3/CO2)</li>
                <li>PoE cameras for activity tracking</li>
                <li>Edge AI box (Jetson-based)</li>
                <li>Mounting kits, cabling, and setup</li>
              </ul>
            </div>
            <div className="card px-8 py-8">
              <h3 className="font-display text-title-md font-medium text-on-surface">Operations deliverables</h3>
              <ul className="mt-5 space-y-3 font-sans text-title-sm text-on-surface-variant">
                <li>Daily alert coverage and response timeline</li>
                <li>Weekly performance report and recommendations</li>
                <li>Benchmarking against historical cycles</li>
                <li>Dedicated pilot support and calibration</li>
                <li>ROI review at the end of week 4</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
