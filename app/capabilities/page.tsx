import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Egg counting on A-frame cameras, house sensors, acoustic welfare signals, forecasts, and agents that read the records you connect.",
  alternates: { canonical: "/capabilities" },
  openGraph: {
    title: "Capabilities · SenseAgri AI",
    description:
      "Egg counting on A-frame cameras, house sensors, acoustic welfare signals, forecasts, and agents that read the records you connect.",
    url: "/capabilities"
  }
};

const capabilities = [
  {
    title: "Egg counting and bird activity",
    body: "Computer vision is the farm's data layer: eggs, birds, activity, and issues. Egg counting on the A-frame is the reading we can show."
  },
  {
    title: "Agents",
    body: "They connect to the vision record and the company records you approve. They catch issues, draft a report for you to check, and track open work. Your data stays yours. Access is limited to what you approve, read-only by default, and you can export or delete it."
  },
  {
    title: "House sensors",
    body: "Temperature, humidity, gas, CO₂, ammonia, feed and water, logged in each house. Alerts use that house’s own history, not one threshold for every farm."
  },
  {
    title: "Sound",
    body: "Microphones classify stress calls, wake-up, and general activity, and sit next to the environmental and camera readings."
  },
  {
    title: "Forecasts",
    body: "Weight, hen-day egg production, and feed conversion, checked against your own results during a proof of concept."
  },
  {
    title: "Disease signals",
    body: "Environmental, camera, and sound readings are read together against the house baseline, and a change is flagged for a person to check."
  },
  {
    title: "Why it changed",
    body: "Production changes are lined up with climate, feed, water, and the actions already written down, so the team knows what to check first."
  },
  {
    title: "Gut health",
    body: "The feed-to-water ratio is tracked against the flock’s own baseline and flagged when it moves."
  },
  {
    title: "Production numbers",
    body: "Hen-day production, mortality, feed conversion, and welfare can sit next to the camera record."
  }
];

export default function CapabilitiesPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Capabilities", path: "/capabilities" }])} />
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-primary">What the platform does</h1>
        <p className="mt-3 font-sans text-base leading-relaxed text-on-surface-variant">
          A short list. The camera work and the agents each have their own page.
        </p>
        <ul className="mt-8" style={{ borderTop: "0.5px solid #BEC8CA" }}>
          {capabilities.map((item) => (
            <li key={item.title} className="py-5" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
              <h2 className="font-display text-xl font-semibold text-primary">{item.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-sans text-sm text-on-surface-variant">
          <Link href="/computer-vision" className="font-medium text-primary underline underline-offset-4">Cameras</Link>
          {" · "}
          <Link href="/ai-farm-agents" className="font-medium text-primary underline underline-offset-4">Agents</Link>
          {" · "}
          <Link href="/offering" className="font-medium text-primary underline underline-offset-4">Proof of concept</Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/capabilities"])}
        </p>
      </div>
    </div>
  );
}
