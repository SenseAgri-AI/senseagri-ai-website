import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/jsonLd";
import { pageLastModified, formatDisplayDate } from "@/lib/pageMeta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Poultry Welfare, AI Monitoring & Field Notes",
  description:
    "Field notes on poultry welfare, AI monitoring, and what the data from commercial poultry houses is teaching us. Practical research from SenseAgri AI.",
  alternates: { canonical: "/blog" }
};

const GOLD = "#D4AF37";
const PRIMARY = "#002E35";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  thumbnail: string;
  thumbnailAlt: string;
};

const posts: Post[] = [
  {
    slug: "flock-night-rest-score",
    title: "The Flock Night-Rest Score: measuring poultry sleep with AI",
    excerpt:
      "A nightly 0–100 sleep score for laying hens — measured from the sound of the shed and the conditions inside it. Peer-reviewed thresholds, delivered to the farmer's phone by morning.",
    category: "Poultry Welfare",
    publishedAt: "2026-08-20",
    readMinutes: 5,
    thumbnail: "/blog/flock-night-rest-score/sleeping-hen.jpg",
    thumbnailAlt: "A hen resting quietly — the subject of the Flock Night-Rest Score."
  }
];

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${siteConfig.url}/blog`,
  name: "SenseAgri AI — Blog",
  description:
    "Field notes on poultry welfare, AI monitoring, and what the data from commercial poultry houses is teaching us.",
  url: `${siteConfig.url}/blog`,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.publishedAt,
    url: `${siteConfig.url}/blog/${p.slug}`,
    author: { "@id": `${siteConfig.url}/#organization` }
  }))
};

export default function BlogIndexPage() {
  return (
    <div>
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbGraph([{ name: "Blog", path: "/blog" }])} />

      <PageHero
        dark
        accent="#4FB8C5"
        eyebrow="Blog"
        headline="Field notes on"
        accentLine="poultry intelligence."
        sub="What the data from commercial poultry houses is teaching us — welfare, behaviour, environment, and the AI that turns them into decisions."
      />

      <section className="bg-surface px-6 py-16 sm:px-10 lg:px-16" style={{ borderTop: "0.5px solid #BEC8CA" }}>
        <div className="mx-auto max-w-6xl">

          {/* Post list */}
          <ul className="grid gap-8 md:grid-cols-2 list-none pl-0">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-surface-container-lowest transition-colors duration-150 hover:bg-surface-container"
                  style={{ border: "0.5px solid #BEC8CA" }}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 2", background: "#F2F4F4" }}>
                    <Image
                      src={post.thumbnail}
                      alt={post.thumbnailAlt}
                      width={612}
                      height={408}
                      className="mx-auto block h-full w-auto max-w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 px-6 py-6" style={{ borderTop: "0.5px solid #BEC8CA" }}>

                    {/* Meta strip */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
                      <span style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 8 }} className="font-bold text-primary">
                        {post.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{formatDisplayDate(post.publishedAt)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readMinutes} min read</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-on-surface transition-colors duration-150 group-hover:text-primary">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-sans text-sm leading-relaxed text-on-surface-variant">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="mt-1 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary">
                      Read →
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-sans text-label-sm uppercase tracking-[0.06em] text-on-surface-variant/70">
            Last updated: {formatDisplayDate(pageLastModified["/blog"])}
          </p>

        </div>
      </section>

      {/* CTA */}
      <section
        className="grain relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16 text-center"
        style={{ background: PRIMARY, borderTop: "0.5px solid #BEC8CA" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42,142,154,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(42,142,154,0.08) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="relative z-10 mx-auto max-w-xl">
          <h2
            className="font-display font-extrabold tracking-tighter text-white"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: "1.05" }}
          >
            Want to see the platform on your farm?
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-white/70">
            The Partner Programme covers sensors, dashboard, AI, and hands-on onboarding.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary transition-colors duration-150 hover:bg-surface-container-low bg-white"
            style={{ boxShadow: `inset 0 -2px 0 0 ${GOLD}` }}
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
