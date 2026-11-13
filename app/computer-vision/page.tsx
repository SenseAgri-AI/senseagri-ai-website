import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, computerVisionServiceGraph } from "@/lib/jsonLd";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

export const metadata: Metadata = {
  title: "Egg counting on the A-frame",
  description:
    "Cameras on the A-frame count eggs. Compare the clean still with the same frame showing the count, the line, and the detection boxes.",
  alternates: { canonical: "/computer-vision" },
  openGraph: {
    title: "Egg counting on the A-frame · SenseAgri AI",
    description:
      "Cameras on the A-frame count eggs. Compare the clean still with the same frame showing the count, the line, and the detection boxes.",
    url: "/computer-vision"
  }
};

const pairs = [
  {
    id: "cam-1",
    still: "/images/real/vision-aframe-1.webp",
    detect: "/images/real/vision-aframe-detect-1.webp",
    stillAlt: "A-frame layer cages from an egg-counting camera, with no count overlay.",
    detectAlt: "The same A-frame camera frame with the egg count, count line, zone boxes, and detection boxes.",
    stillCaption: "Camera 1. The row, with no overlay.",
    detectCaption: "Camera 1 at the frame’s own size, with the count, the line, and a box on each egg the model sees."
  },
  {
    id: "cam-2",
    still: "/images/real/vision-aframe-2.webp",
    detect: "/images/real/vision-aframe-detect-2.webp",
    stillAlt: "A second A-frame camera looking down the cages, with no count overlay.",
    detectAlt: "The second A-frame camera frame with the egg count, count line, zone boxes, and detection boxes.",
    stillCaption: "Camera 2. A second row.",
    detectCaption: "Camera 2 with the same overlay, at the size the camera records."
  }
];

export default function ComputerVisionPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Computer vision", path: "/computer-vision" }])} />
      <JsonLd data={computerVisionServiceGraph()} />

      <header className="mx-auto max-w-6xl px-6 pb-8 pt-10 sm:px-10 sm:pt-14">
        <h1 className="max-w-[18ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary">
          Counting eggs on the A-frame.
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-on-surface-variant">
          One camera looks down the row. Beside it is the same moment with the count, the line, and the boxes the model drew.
        </p>
      </header>

      {pairs.map((pair, index) => (
        <section
          key={pair.id}
          className="mx-auto max-w-6xl px-6 py-8 sm:px-10"
          style={{ borderTop: "0.5px solid #BEC8CA" }}
        >
          <figure>
            <Image
              src={pair.still}
              alt={pair.stillAlt}
              width={1600}
              height={900}
              priority={index === 0}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
              style={{ border: "0.5px solid #BEC8CA" }}
            />
            <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">{pair.stillCaption}</figcaption>
          </figure>
          <figure className="mt-5 w-full max-w-[640px]">
            <Image
              src={pair.detect}
              alt={pair.detectAlt}
              width={640}
              height={360}
              sizes="(max-width: 640px) 100vw, 640px"
              className="h-auto w-full max-w-[640px]"
              style={{ border: "0.5px solid #BEC8CA" }}
            />
            <figcaption className="mt-2 font-sans text-sm text-on-surface-variant">{pair.detectCaption}</figcaption>
          </figure>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <h2 className="font-display text-2xl font-semibold text-primary">How the count is made</h2>
        <div className="mt-4 max-w-2xl space-y-3 font-sans text-base leading-relaxed text-on-surface-variant">
          <p>The camera stays on the A-frame and watches the egg belt.</p>
          <p>The model marks each egg, draws the zone it is counting, and writes the running total on the frame.</p>
          <p>That total is what the dashboard stores for the camera. Breeder houses use the same count. In a broiler house the cameras follow how the birds move.</p>
          <p>Counting runs on the farm’s computer, so the frame is not sent away to be counted. The camera can be the CCTV already in the house.</p>
          <p>On a new farm we check the count on that farm’s houses first. Temperature, humidity, CO₂, ammonia, feed and water sensors are what already run on farms today.</p>
          <p>
            Your data stays yours. Connector access is limited to the cameras you approve, read-only by default. You own the count and can export or delete it.
          </p>
        </div>
        <p className="mt-6 font-sans text-sm">
          <Link href="/ai-farm-agents" className="font-medium text-primary underline underline-offset-4">
            What the agents do with the count
          </Link>
        </p>
        <p className="mt-10 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
          Last updated: {formatDisplayDate(pageLastModified["/computer-vision"])}
        </p>
      </section>
    </div>
  );
}
