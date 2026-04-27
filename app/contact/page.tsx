import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
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
      <section className="section-padding bg-hero-glow">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Contact"
            title="Book a pilot call."
            subtitle="Tell us about your farm and we will respond within one business day."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card px-10 py-10">
            <h3 className="font-display text-title-lg font-medium text-on-surface">Start the conversation</h3>
            <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
              Fields marked with * are required. We use this to scope a pilot that fits your operation.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="space-y-6">
            <div className="card px-8 py-8">
              <h3 className="font-display text-title-md font-medium text-on-surface">Book a call</h3>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Add your scheduling link below. Replace with your calendar URL.
              </p>
              <a
                className="link-underline mt-5 inline-flex"
                href="https://cal.com/placeholder"
                target="_blank"
                rel="noreferrer"
              >
                Schedule a time (placeholder)
              </a>
            </div>
            <div className="card px-8 py-8">
              <h3 className="font-display text-title-md font-medium text-on-surface">Contact details</h3>
              <div className="mt-5 space-y-2.5 font-sans text-title-sm text-on-surface-variant">
                <a href={`mailto:${siteConfig.links.email}`} className="block hover:text-primary transition-colors duration-150">
                  {siteConfig.links.email}
                </a>
                <a href={`tel:${siteConfig.links.phone}`} className="block hover:text-primary transition-colors duration-150">
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
