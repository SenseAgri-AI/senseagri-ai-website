import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import FeatureCard from "@/components/FeatureCard";
import FAQAccordion from "@/components/FAQAccordion";
import HeroPyramid from "@/components/HeroPyramid";
import SectionHeader from "@/components/SectionHeader";
import TestimonialCard from "@/components/TestimonialCard";
import {
  AlertIcon,
  BoltIcon,
  CameraIcon,
  ChartIcon,
  CloudIcon,
  LeafIcon,
  SignalIcon
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SenseAgri AI delivers IoT and AI decision support for poultry farms. Monitor welfare, prevent losses, and act on ROI-focused insights."
};

const faqs = [
  {
    question: "What hardware is installed on site?",
    answer:
      "A LoRaWAN gateway, environmental sensors, optional PoE cameras, and an edge AI box for local processing. Exact kits are tailored per house."
  },
  {
    question: "Does it work with limited connectivity?",
    answer:
      "Yes. Edge processing keeps core alerts running, and data buffers offline until connectivity is restored."
  },
  {
    question: "Who owns the data?",
    answer:
      "Your farm retains ownership of all operational data. We only process it to provide the service."
  },
  {
    question: "How long does installation take?",
    answer:
      "Most pilot installs are completed in 1-2 days, including baseline calibration."
  },
  {
    question: "How is pricing structured?",
    answer:
      "Hardware plus a monthly platform subscription. We start with a 30-day pilot to prove value."
  },
  {
    question: "How do you handle power outages?",
    answer:
      "Critical components include UPS options and edge buffering to protect continuity during outages."
  },
  {
    question: "What about privacy and farm security?",
    answer:
      "Role-based access, encrypted transport, and configurable camera zones protect sensitive areas."
  },
  {
    question: "What support is included?",
    answer:
      "Remote monitoring, alert tuning, and weekly performance reviews during the pilot."
  }
];

export default function HomePage() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="section-padding bg-hero-glow relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="ambient-contours h-full w-full"
            viewBox="0 0 1200 640"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="contour-grad" x1="0" y1="0" x2="1200" y2="0">
                <stop offset="0%" stopColor="#00464f" stopOpacity="0.04" />
                <stop offset="50%" stopColor="#005f6b" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#a7eefc" stopOpacity="0.10" />
              </linearGradient>
            </defs>
            <path
              className="contour-line"
              d="M-50 160C180 100 360 220 600 160C840 100 980 210 1250 130"
              stroke="url(#contour-grad)"
              strokeWidth="1.2"
            />
            <path
              className="contour-line delay-1"
              d="M-40 300C220 240 420 340 680 300C940 260 1020 320 1250 280"
              stroke="url(#contour-grad)"
              strokeWidth="1.4"
            />
            <path
              className="contour-line delay-2"
              d="M-30 450C200 390 420 500 700 440C960 385 1080 470 1250 420"
              stroke="url(#contour-grad)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="space-y-8">
            <h1 className="hero-reveal font-display text-display-sm font-medium text-on-surface sm:text-display-md">
              AI + IoT for measurable poultry farm performance.
            </h1>
            <p className="hero-reveal delay-1 max-w-2xl font-sans text-base text-on-surface-variant sm:text-lg">
              Real-time telemetry, welfare monitoring, and decision support built for South African poultry operations.
            </p>
            <div className="hero-reveal delay-2 flex flex-wrap gap-3">
              <Button href="/contact">Book a Pilot Call</Button>
              <Button href="/how-it-works" variant="secondary">
                See How It Works
              </Button>
            </div>
            <div className="hero-reveal delay-3 flex justify-center sm:justify-start">
              <HeroPyramid />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <p className="font-label text-label-md font-medium uppercase tracking-[0.3em] text-outline-variant">
            Built for South African farms
          </p>
          <div className="grid gap-3 font-sans text-title-sm text-on-surface-variant sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-surface-container p-4">Agripak (placeholder)</div>
            <div className="rounded-xl bg-surface-container p-4">LNX (placeholder)</div>
            <div className="rounded-xl bg-surface-container p-4">PoultryCo (placeholder)</div>
            <div className="rounded-xl bg-surface-container p-4">VitaFeed (placeholder)</div>
          </div>
        </div>
      </section>

      {/* ─── Problem ─── */}
      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="The operational reality"
            title="The cost of small issues adds up fast."
            subtitle="Feed price volatility, temperature swings, power outages, and labor pressure all stack up. Without continuous visibility, farms absorb the losses."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Feed cost inefficiency",
              "Mortality spikes",
              "Welfare compliance pressure",
              "Power outages and load shedding",
              "Temperature and humidity swings",
              "Biosecurity blind spots",
              "Labor constraints",
              "Delayed response to anomalies"
            ].map((item) => (
              <div key={item} className="rounded-xl bg-surface-container-low px-5 py-4 font-sans text-title-sm text-on-surface-variant">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution pillars ─── */}
      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Solution pillars"
            title="From sensing to decision support in one platform."
            subtitle="A resilient stack that captures the right signals, processes them on-site, and turns them into actions you can verify."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Sensing & Monitoring"
              description="LoRaWAN gateways, environmental sensors, and camera feeds capture continuous barn conditions and welfare indicators."
              icon={<SignalIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Edge AI & Alerts"
              description="Jetson-based processing delivers fast anomaly detection and resilient alerts even during connectivity gaps."
              icon={<AlertIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Decision Support"
              description="Dashboards, benchmarking, and what-if simulations guide farm teams to the next best action."
              icon={<ChartIcon className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* ─── Outcomes ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Measured outcomes"
            title="Operational gains you can quantify."
            subtitle="Our pilots focus on tangible KPIs within 30 days so you can validate ROI before scaling."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Reduce mortality",
              "Improve FCR",
              "Early disease signals",
              "Lower energy waste",
              "Compliance-ready reporting"
            ].map((item) => (
              <div key={item} className="card px-5 py-6 text-center font-sans text-title-sm font-medium text-on-surface">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Closed-loop workflow"
            title="Install, calibrate, and verify improvements."
            subtitle="We keep pilots focused and transparent, with shared milestones and farm team involvement."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Install",
              "Calibrate",
              "Monitor",
              "Recommend",
              "Verify"
            ].map((step, index) => (
              <div key={step} className="card px-6 py-6">
                <p className="data-callout">Step {index + 1}</p>
                <p className="mt-2 font-display text-title-sm font-medium text-on-surface">{step}</p>
                <p className="mt-2 font-sans text-label-md text-on-surface-variant">
                  {index === 0 && "Hardware setup and baseline capture."}
                  {index === 1 && "Threshold tuning with your team."}
                  {index === 2 && "Live telemetry and anomaly tracking."}
                  {index === 3 && "Actionable insights and next steps."}
                  {index === 4 && "ROI review and scale plan."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Modules ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Modules"
            title="Focused product modules for poultry teams."
            subtitle="Each module can stand alone or combine for full decision intelligence."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Environmental Monitoring"
              description="Temperature, humidity, and optional NH3/CO2 sensors with barn-level trends."
              icon={<LeafIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Water & Feed Signals"
              description="Detect flow deviations and consumption drops before they become losses."
              icon={<CloudIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Computer Vision"
              description="Camera-based counting, activity scoring, and welfare anomaly detection."
              icon={<CameraIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Alerts & Incident Timeline"
              description="Structured incident tracking keeps teams aligned on response and outcomes."
              icon={<AlertIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Farm Dashboard"
              description="Multi-house overview with benchmarking and weekly summaries."
              icon={<ChartIcon className="h-6 w-6" />}
            />
            <FeatureCard
              title="Weekly ROI Report"
              description="Action list plus financial impact estimates and compliance-ready exports."
              icon={<BoltIcon className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section-padding bg-surface-container-low">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Pilot stories"
            title="Early partners are using SenseAgri AI to validate impact."
            subtitle="Join the pilot program to measure improvements before scaling across the farm group."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="We finally have one source of truth for barn conditions and response actions."
              name="Pilot Manager"
              role="Operations"
              company="Large Poultry Group"
            />
            <TestimonialCard
              quote="The alerts helped our team respond to ventilation drops before bird stress escalated."
              name="Farm Owner"
              role="Director"
              company="Broiler Farm"
            />
            <TestimonialCard
              quote="Weekly ROI reports helped us quantify energy and mortality improvements within a month."
              name="Production Lead"
              role="Layer Division"
              company="Regional Agribusiness"
            />
          </div>
          <div className="mt-8 font-sans text-title-sm text-on-surface-variant">
            Pilot program available now.{" "}
            <Link className="link-underline" href="/contact">Book a call</Link>
            {" "}to reserve a slot.
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers for farm owners and integrators."
            subtitle="Short, direct responses to the questions we hear most often."
          />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a 30-day pilot."
        subtitle="Get a focused deployment, shared KPIs, and a clear ROI review so you can decide on the next phase with confidence."
        primaryHref="/contact"
        primaryLabel="Start a Pilot"
        secondaryHref="/how-it-works"
        secondaryLabel="See the process"
      />
    </div>
  );
}
