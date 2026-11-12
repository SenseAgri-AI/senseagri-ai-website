import Link from "next/link";
import { formatDisplayDate, pageLastModified } from "@/lib/pageMeta";

type PageCloseProps = {
  title: string;
  body: string;
  updatedPath: string;
};

export default function PageClose({ title, body, updatedPath }: PageCloseProps) {
  return (
    <section
      className="grain relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
      style={{ background: "#002E35", borderTop: "0.5px solid #BEC8CA" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(8,124,131,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.08) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span
          className="mb-6 inline-flex items-center gap-2 border-l-2 border-tertiary px-3 py-1"
          style={{ background: "rgba(19,170,165,0.10)" }}
        >
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tertiary">
            Partner Programme
          </span>
        </span>
        <h2
          className="font-display font-semibold tracking-[-0.025em] text-white"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", lineHeight: 1.04 }}
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white/70">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-surface-container-low">
            Book a POC
          </Link>
          <Link
            href="/contact?intent=partner"
            className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-white/10"
            style={{ border: "0.5px solid rgba(255,255,255,0.55)" }}
          >
            For partners
          </Link>
        </div>
        <p className="mt-12 font-sans text-label-sm uppercase tracking-[0.06em] text-white/40">
          Last updated: {formatDisplayDate(pageLastModified[updatedPath])}
        </p>
      </div>
    </section>
  );
}
