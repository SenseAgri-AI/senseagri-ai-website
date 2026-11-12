import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageClose from "@/components/PageClose";
import AFrameVision from "@/components/AFrameVision";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph, computerVisionServiceGraph } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Computer vision — the farm's data layer",
  description:
    "Egg-counting cameras on A-frame layer cages, and bird activity in the broiler house. Computer vision is SenseAgri's data layer, with inference on the farm's own edge compute. Your data stays yours.",
  alternates: { canonical: "/computer-vision" }
};

const points = [
  {
    eyebrow: "Layers",
    title: "Cameras on the A-frame, counting eggs.",
    body: "On layer houses, egg-counting cameras are mounted on the A-frame cages. They watch the egg belt and count continuously, so production is a record from the house rather than a number from the last walk-through or a spreadsheet filled in afterwards. Breeder houses use the same vision approach to count eggs."
  },
  {
    eyebrow: "Broilers",
    title: "Bird movement, read as a welfare signal.",
    body: "In broiler houses, cameras track how birds move and where activity sits across the floor. That activity is a welfare and behaviour signal. It sits next to temperature, air, feed and water — it does not replace them."
  },
  {
    eyebrow: "The data layer",
    title: "What happens in the house becomes data.",
    body: "Vision is the farm's data layer. A frame becomes a count or an activity reading. That reading joins the house record the rest of the platform already keeps: environment, feed, water, production. Reports, alerts and the farm agents read from that record. They are not guessing from a note on a clipboard."
  },
  {
    eyebrow: "On the farm",
    title: "Inference stays with the house.",
    body: "Vision inference runs on the farm's own edge compute. There is no cloud round-trip for every frame. Cameras work with the CCTV the farm already uses. Sensing keeps running when connectivity is patchy, and the record syncs when the link returns. The pictures and the counts they produce stay the farm's data. SenseAgri connects to that data. It does not take ownership of it."
  }
];

export default function ComputerVisionPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Computer vision", path: "/computer-vision" }])} />
      <JsonLd data={computerVisionServiceGraph()} />

      <PageHero
        eyebrow="Computer vision"
        headline="The farm's"
        accentLine="data layer."
        sub="Egg-counting cameras on the A-frame, and bird activity in the broiler house, turn what happens on the farm into data the operation can use."
      />

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2
              className="font-display font-semibold tracking-[-0.025em] text-primary"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
            >
              Mounted on the cage. Counted into the house record.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-on-surface-variant">
              The computer vision work is physical. Cameras sit on the A-frame layer cages and count eggs as the belt moves. The same discipline — see the house, write it down as data, keep the inference on the farm — is how broiler activity is read. The drawing on this page is a schematic of that path.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
              The environmental sensor suite is what runs on farms today. Vision is proven on a farm’s own houses in the proof of concept, not assumed from another site.
            </p>
          </div>
          <AFrameVision idPrefix="vision-page" />
        </div>
      </section>

      {points.map((point, i) => (
        <section
          key={point.title}
          className="px-6 py-16 sm:px-10 lg:px-16"
          style={{
            background: i % 2 === 0 ? "#F2F4F4" : "#F8FAFA",
            borderTop: "0.5px solid #BEC8CA"
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <span
                className="mb-6 inline-flex items-center gap-2 px-3 py-1"
                style={{ borderLeft: "2px solid #13AAA5", background: "rgba(0,46,53,0.06)" }}
              >
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {point.eyebrow}
                </span>
              </span>
              <h2
                className="font-display font-semibold tracking-[-0.025em] text-primary"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", lineHeight: "1.05" }}
              >
                {point.title}
              </h2>
            </div>
            <p className="font-sans text-base leading-relaxed text-on-surface-variant lg:pt-1">{point.body}</p>
          </div>
        </section>
      ))}

      <section className="bg-surface px-6 py-14 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-sans text-title-sm leading-relaxed text-on-surface-variant">
            The record is only useful if something stays with it. Agents connect securely to this data — and to the company records you choose — without taking ownership.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ai-farm-agents" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              AI farm agents
            </Link>
            <Link href="/security" className="font-sans text-sm font-semibold text-primary underline underline-offset-4">
              Security and data ownership
            </Link>
          </div>
        </div>
      </section>

      <PageClose
        updatedPath="/computer-vision"
        title="See the data layer on your own cages."
        body="A proof of concept puts vision on your houses, next to the sensors you already run, before you commit any further."
      />
    </div>
  );
}
