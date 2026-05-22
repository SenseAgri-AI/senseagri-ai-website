import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a pilot call with SenseAgri AI. Share your farm details and we will schedule a 30-day pilot review."
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        headline="Book a"
        accentLine="pilot call."
        sub="Tell us about your farm and we will respond within one business day."
      />

      <section className="section-padding bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Form card */}
          <div
            className="bg-surface-container-lowest px-6 py-8 sm:px-8"
            style={{ border: "0.5px solid #BEC8CA" }}
          >
            <h3 className="font-display text-title-lg font-bold tracking-tight text-on-surface">
              Start the conversation
            </h3>
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
              <h3 className="font-display text-title-md font-bold tracking-tight text-on-surface">
                Book a call
              </h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Pick a time that suits you and we will walk you through a pilot.
              </p>
              <a
                className="link-underline mt-5 inline-flex"
                href="https://cal.com/placeholder"
                target="_blank"
                rel="noreferrer"
              >
                Schedule a time →
              </a>
            </div>
            <div
              className="bg-surface-container-lowest px-8 py-7"
              style={{ border: "0.5px solid #BEC8CA" }}
            >
              <h3 className="font-display text-title-md font-bold tracking-tight text-on-surface">
                Contact details
              </h3>
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
          </div>

        </div>
      </section>
    </div>
  );
}
