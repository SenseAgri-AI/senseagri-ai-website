import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact SenseAgri AI",
  description:
    "Contact Dylan Geldenhuys and Dr Ryan Nel at SenseAgri AI to discuss your farm’s needs and our proof of concept program.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <div>
      <JsonLd data={breadcrumbGraph([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        headline="Contact us."
        accentLine="Let’s talk about your farm."
        sub="Tell us about your farm and we will respond within one business day."
      />

      <section className="section-padding bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Form card */}
          <div
            className="bg-surface-container-lowest px-6 py-8 sm:px-8"
            style={{ border: "0.5px solid #BEC8CA" }}
          >
            <h2 className="font-display text-title-lg font-semibold tracking-[-0.02em] text-on-surface">
              Start the conversation
            </h2>
            <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
              Fields marked with * are required. We use this to scope a pilot that fits your operation.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            <div
              className="bg-surface-container-lowest px-8 py-7"
              style={{ border: "0.5px solid #BEC8CA" }}
            >
              <h2 className="font-display text-title-md font-semibold tracking-[-0.02em] text-on-surface">
                Contact Ryan
              </h2>
              <div className="mt-4">
                <p className="font-display text-base font-bold tracking-tight text-on-surface">
                  Dr Ryan Nel
                </p>
                <p className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-tertiary">
                  Co-Founder &amp; COO
                </p>
              </div>
              <div className="mt-4 space-y-2.5 font-sans text-title-sm text-on-surface-variant">
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="block transition-colors duration-150 hover:text-primary"
                >
                  {siteConfig.links.email}
                </a>
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="block transition-colors duration-150 hover:text-primary"
                >
                  {siteConfig.links.phone}
                </a>
              </div>
            </div>

            <div className="bg-surface-container-lowest px-8 py-7" style={{ border: "0.5px solid #BEC8CA" }}>
              <h2 className="font-display text-title-md font-semibold tracking-tight text-on-surface">Contact Dylan</h2>
              <p className="mt-4 font-display text-base font-bold tracking-tight text-on-surface">Dylan Geldenhuys</p>
              <p className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-tertiary">Co-Founder &amp; CEO</p>
              <div className="mt-4 space-y-2.5 font-sans text-title-sm text-on-surface-variant">
                <a href="mailto:dylan@senseagriai.com" className="block transition-colors hover:text-primary">dylan@senseagriai.com</a>
                <a href="tel:+27820440320" className="block transition-colors hover:text-primary">+27 82 044 0320</a>
              </div>
            </div>
          </div>

        </div>
        <div className="mx-auto mt-10 max-w-6xl text-center">
          <p className="font-sans text-title-sm text-on-surface-variant">
            Still deciding?{" "}
            <Link href="/capabilities" className="text-primary underline underline-offset-2 transition-colors duration-150 hover:text-primary-container">
              Explore our capabilities
            </Link>{" "}
            or read the{" "}
            <Link href="/faq" className="text-primary underline underline-offset-2 transition-colors duration-150 hover:text-primary-container">
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
