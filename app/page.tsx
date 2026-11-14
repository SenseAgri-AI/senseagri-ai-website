import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "SenseAgri AI — Computer vision and agents for the farm"
  },
  description:
    "Cameras can be set up to track eggs, birds, activity, and issues, with processing on the farm. Agents can connect to your controllers and company records, send a WhatsApp alert, and draft a weekly production report.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SenseAgri AI — Computer vision and agents for the farm",
    description:
      "Cameras can be set up to track eggs, birds, activity, and issues, with processing on the farm. Agents can connect to your controllers and company records, send a WhatsApp alert, and draft a weekly production report.",
    url: "/"
  }
};

const points = [
  {
    title: "Computer vision",
    body: "Can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing runs on the farm, so frames stay on site. Egg counting on the A-frame is one reading already running.",
    href: "/computer-vision",
    label: "See the count"
  },
  {
    title: "Agents",
    body: "Can connect to Big Dutchman, SKOV, Hytek, Vencomatic, and the company records you approve. Can send a WhatsApp alert when a reading leaves its range, and draft a weekly production report.",
    href: "/ai-farm-agents",
    label: "How an agent works"
  },
  {
    title: "Your records",
    body: "Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it.",
    href: "/security",
    label: "Security"
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10 sm:px-10 sm:pt-14">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl">
          A data layer for the farm, and agents that understand it.
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
          Computer vision is the farm&apos;s data layer. Cameras can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing runs on the farm, so the frames stay on site.
        </p>
        <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
          Agents can connect to that record, to Big Dutchman, SKOV, Hytek and Vencomatic controllers, and to the company records you approve. They can send a WhatsApp alert when a reading leaves its range, draft a weekly production report, and track open work.
        </p>
        <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-on-surface-variant">
          Egg counting on the A-frame is one reading already on the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center bg-primary px-5 py-3 font-sans text-sm font-medium text-white hover:bg-primary-container">
            Book a proof of concept
          </Link>
          <Link
            href="/computer-vision"
            className="inline-flex items-center px-5 py-3 font-sans text-sm font-medium text-primary hover:bg-surface-container-low"
            style={{ border: "0.5px solid #6B7C80" }}
          >
            See the count
          </Link>
        </div>
      </section>

      <figure className="mx-auto max-w-6xl px-6 pb-4 sm:px-10">
        <Image
          src="/images/real/dashboard-overview.webp"
          alt="Dashboard of egg counts for two A-frame cameras and a 24-hour chart."
          width={1600}
          height={648}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full bg-white"
          style={{ border: "0.5px solid #BEC8CA" }}
        />
        <figcaption className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-on-surface-variant">
          Egg counts from two A-frame cameras, and the last 24 hours.
        </figcaption>
      </figure>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        {points.map((point) => (
          <div key={point.href}>
            <h2 className="font-display text-xl font-semibold text-primary">{point.title}</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">{point.body}</p>
            <Link href={point.href} className="mt-3 inline-flex font-sans text-sm font-medium text-primary underline underline-offset-4">
              {point.label}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
