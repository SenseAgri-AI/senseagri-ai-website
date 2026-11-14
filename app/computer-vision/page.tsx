import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, computerVisionServiceGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Computer vision",
  description:
    "Cameras can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing can run on the farm, so frames can stay on site. Egg counting on the A-frame is the reading shown.",
  alternates: { canonical: "/computer-vision" },
  openGraph: {
    title: "Computer vision · SenseAgri AI",
    description:
      "Cameras can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing can run on the farm, so frames can stay on site. Egg counting on the A-frame is the reading shown.",
    url: "/computer-vision"
  }
};

const steps = [
  "A camera on the A-frame watches the egg belt.",
  "The model marks each egg, draws the zone, and writes the running total on the frame.",
  "The same cameras can be set up to track birds, activity, and issues on layer, breeder, and broiler houses.",
  "Processing can run on the farm, so the frames can stay on site.",
  "On a new farm we check the count on that farm's houses first."
];

export default function ComputerVisionPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Computer vision", path: "/computer-vision" }])} />
      <JsonLd data={computerVisionServiceGraph()} />

      <header className="mx-auto max-w-6xl px-6 pb-6 pt-10 sm:px-10 sm:pt-14">
        <h1 className="max-w-[18ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary">
          The farm data layer, starting with the eggs.
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-on-surface-variant">
          Cameras can be set up to track eggs, birds, activity, and issues. Egg counting on the A-frame is the reading below: the camera, then the same view with the count drawn on. Processing can run on the farm, so the frames can stay on site.
        </p>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:gap-4 sm:px-10">
        <figure>
          <div className="relative aspect-[3.8/1] bg-surface-container-low" style={{ border: "0.5px solid #BEC8CA" }}>
            <Image
              src="/images/real/vision-aframe-1.webp"
              alt="A-frame cages from an egg-counting camera."
              fill
              priority
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">The camera.</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[3.8/1] bg-surface-container-low" style={{ border: "0.5px solid #BEC8CA" }}>
            <Image
              src="/images/real/vision-aframe-detect-1.webp"
              alt="The same A-frame view with the count line and a box on each egg."
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">
            The same view, with the count line and a box on each egg.
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl font-semibold text-primary">How the count is made</h2>
        <ul className="mt-4 max-w-2xl space-y-2 font-sans text-base leading-relaxed text-on-surface-variant">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p className="mt-6 font-sans text-sm">
          <Link href="/ai-farm-agents" className="font-medium text-primary underline underline-offset-4">
            What an agent does with the record
          </Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/computer-vision"])}
        </p>
      </section>
    </div>
  );
}
