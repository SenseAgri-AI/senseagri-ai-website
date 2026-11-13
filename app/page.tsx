import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "SenseAgri AI — Egg counts from A-frame cameras"
  },
  description:
    "Cameras on the A-frame count eggs. The dashboard shows each camera and the day's total. Agents read that count and the records you connect.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SenseAgri AI — Egg counts from A-frame cameras",
    description:
      "Cameras on the A-frame count eggs. The dashboard shows each camera and the day's total. Agents read that count and the records you connect.",
    url: "/"
  }
};

const points = [
  {
    title: "The cameras",
    body: "They sit on the A-frame and count eggs on the belt. The same view, with the boxes drawn on, is on the vision page.",
    href: "/computer-vision",
    label: "See the cameras"
  },
  {
    title: "The agents",
    body: "They catch issues, write the report, and follow the birds, the jobs, and the open issues in the records you connect.",
    href: "/ai-farm-agents",
    label: "What the agents do"
  },
  {
    title: "The records",
    body: "Your data stays yours. Connector access is limited to what you approve, read-only by default. You own the data and can export or delete it.",
    href: "/security",
    label: "Security"
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10 sm:px-10 sm:pt-14">
        <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl">
          Egg counts from the cameras on your A-frames.
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-on-surface-variant">
          Each camera has its own count. The dashboard adds them up and keeps the last 24 hours. Agents read that count, and the house and company records you connect.
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
            See the cameras
          </Link>
        </div>
      </section>

      <figure className="mx-auto max-w-6xl px-6 pb-4 sm:px-10">
        <Image
          src="/images/real/dashboard-overview.webp"
          alt="SenseAgri egg-count dashboard with a total for two A-frame cameras, a 24-hour chart, and the live camera tiles."
          width={1600}
          height={1030}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full bg-surface-container-low"
          style={{ border: "0.5px solid #BEC8CA" }}
        />
        <figcaption className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-on-surface-variant">
          Two A-frame cameras, the total for the day, and the count over 24 hours.
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
