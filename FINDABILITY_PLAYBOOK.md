# The Findability Playbook — SEO + GEO Implementation Handover

> A step-by-step, framework-agnostic guide for coding agents, developers, and designers implementing search and AI-answer-engine optimisation on any company website. Reusable across projects. Written to be handed to a coding agent alongside the specific company's context, so the agent can generate a tailored plan and execute it.

---

## Contents

1. [What this document is](#1-what-this-document-is)
2. [How to use it (agent, solo, or with a designer)](#2-how-to-use-it)
3. [Definitions — SEO, GEO/AEO, SEM, GEM](#3-definitions)
4. [The three-layer model — technical / on-page / off-site](#4-the-three-layer-model)
5. [Phase 0 — Discovery & Audit](#5-phase-0--discovery--audit)
6. [Phase 1 — Technical Foundation](#6-phase-1--technical-foundation)
7. [Phase 2 — On-Page Structure & Content](#7-phase-2--on-page-structure--content)
8. [Phase 3 — Structured Data (JSON-LD)](#8-phase-3--structured-data-json-ld)
9. [Phase 4 — GEO / AEO Optimisation](#9-phase-4--geo--aeo-optimisation)
10. [Phase 5 — Off-Site Work (Manual — Requires Human)](#10-phase-5--off-site-work-manual)
11. [Common Myths & Anti-Patterns](#11-common-myths--anti-patterns)
12. [Verification & Metrics](#12-verification--metrics)
13. [Realistic Timeline Expectations](#13-realistic-timeline-expectations)
14. [Prompt Templates — For Handing to Coding Agents](#14-prompt-templates-for-agents)
15. [Handover Checklist Summary](#15-handover-checklist-summary)
16. [Appendices](#16-appendices)

---

## 1. What this document is

A complete, reusable playbook for taking any company website from "technically invisible" to "genuinely findable" — both in classic search engines (Google, Bing) and in AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews, Claude, Gemini).

It exists because SEO advice is fragmented, GEO advice is barely established, and most teams don't know the difference. This document treats them as a single discipline with two overlapping objectives.

**It is:**
- Framework-agnostic (examples use Next.js App Router, but principles apply anywhere).
- Company-agnostic (worked examples from a real B2B AgTech site, but the checklist works for any company).
- Actionable (every phase has concrete steps, files to touch, and verification).
- Honest (realistic timelines, no snake oil, no keyword-stuffing).

**It is NOT:**
- A guide to paid search (SEM) or paid AI-answer placement (GEM) — those are separate disciplines.
- A guide to content strategy at scale (blogging, content marketing, PR) — this covers foundations, not ongoing content.
- A shortcut around domain age. Nothing in here bypasses the fact that new domains take 3–12 months to rank on competitive terms, no matter how well the site is built.

---

## 2. How to use it

### 2a. With a coding agent (recommended path)

1. Give the agent this whole document.
2. Give the agent the specific company's context: website URL, repo path, positioning, target audience, target keywords, geographic focus.
3. Ask the agent to run **Phase 0 (Discovery & Audit)** against the specific site and produce a tailored plan.
4. Review the plan with the human stakeholder — confirm target keywords, positioning, honesty constraints.
5. Ask the agent to implement each subsequent phase as a separate branch + PR. One phase per PR keeps risk small.
6. Between phases, the human handles manual tasks (Phase 5) — GSC verification, backlinks, etc.

### 2b. Solo (developer / designer)

1. Read [Phase 0](#5-phase-0--discovery--audit) end-to-end first.
2. Work through phases 1 → 4 in order. Do not skip phase 1 to get to "the interesting stuff" — content changes are worthless if the site isn't technically indexable.
3. Do Phase 5 manual tasks in parallel — they don't gate code changes and they're often the biggest single unlock.

### 2c. With a designer + developer

- Designer owns Phase 2 (content structure), Phase 4 (GEO / positioning), and hero imagery.
- Developer owns Phase 1 (technical), Phase 3 (structured data).
- Human stakeholder / marketer owns Phase 5 (off-site).
- Sync at the end of each phase — every phase produces observable changes.

---

## 3. Definitions

Use these consistently. They are conflated constantly and it hurts communication.

| Term | Stands for | What it means |
|---|---|---|
| **SEO** | Search Engine Optimisation | Ranking on classic search engines (Google, Bing, DuckDuckGo). Unpaid. Slow. |
| **GEO / AEO** | Generative / Answer Engine Optimisation | Getting cited by AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews, Claude, Gemini). Unpaid. Also slow, but faster than SEO for well-structured content. |
| **SEM** | Search Engine Marketing | **Paid** search ads (Google Ads, Bing Ads). Fast results, ongoing spend. |
| **GEM** | Generative Engine Marketing | **Paid** placement in AI answer engines. Very early stage as of 2026 — Perplexity has a beta programme, OpenAI has hinted at one. Not yet a mature discipline. |

**Key relationships:**
- Bing's index powers Bing search, Yahoo, DuckDuckGo, **ChatGPT Search, Perplexity, and Microsoft Copilot**. So Bing Webmaster Tools is disproportionately important for GEO even though direct Bing traffic is small.
- Google's index powers Google search, Google AI Overviews, and Gemini's web search. GSC covers this.
- Both SEO and GEO benefit from the same underlying technical foundation. Do the technical work once, harvest twice.

---

## 4. The three-layer model

Findability is not one problem. It's three overlapping problems:

### Layer 1 — Technical (can crawlers reach and understand the site?)

- Server responds, robots.txt allows crawlers, sitemap enumerates pages, canonicals are correct, no accidental noindex, structured data present, HTTPS, fast enough.
- **If layer 1 is broken, nothing downstream matters.** A site that Google can't crawl won't rank no matter how good the copy is.
- This layer is 90% code, one-time work, and is what this document covers most thoroughly.

### Layer 2 — On-page (does the site say what it needs to say, in the right places?)

- Titles, descriptions, H1s, H2s, body copy contain the phrases users search for.
- Content is answer-first — LLMs can extract a clean sentence.
- Alt text is descriptive. Internal linking is thorough.
- **This layer is where content strategy meets code.** Half copywriter, half developer.

### Layer 3 — Off-site (does anyone else on the internet think this site matters?)

- Backlinks from other sites (LinkedIn, industry publications, directories).
- Brand mentions (even unlinked ones).
- Google Business Profile if applicable.
- Google Search Console + Bing Webmaster Tools submitting sitemaps.
- **This is the hardest layer and the biggest lever for a new domain.** It cannot be coded — it requires manual outreach, content marketing, or paid promotion.

**A common mistake:** teams spend months perfecting Layer 1 while completely ignoring Layer 3. Result: technically flawless site with zero traffic. Do them in parallel.

---

## 5. Phase 0 — Discovery & Audit

### Objective

Understand where the specific company's site sits right now on all three layers. Do not skip this. Skipping Phase 0 means solving problems that don't exist while missing ones that do.

### Human inputs required

Before an agent can run Phase 0, gather these from the human stakeholder:

- **Website URL** (production).
- **Repository path** (if the agent will code changes).
- **Business positioning**: what the company does, in one sentence.
- **Target audience**: who buys / uses this product?
- **Geographic focus**: local, national, continental, global?
- **Target keywords / queries**: what would an ideal customer type into Google? (Get 5–15.)
- **Known competitors**: 3–5 companies that currently rank for those queries.
- **Honesty constraints**: any claims the company is *not* ready to make publicly (roadmap items, pending validations, unshipped features).

### Audit checklist

- [ ] Does the site respond over HTTPS?
- [ ] Does the apex domain redirect to www (or vice versa) consistently?
- [ ] Is `robots.txt` present and not blocking anything important?
- [ ] Is `sitemap.xml` present, complete, and referenced from `robots.txt`?
- [ ] Does every important page have a unique `<title>` and `<meta name="description">`?
- [ ] Does every important page have a `<link rel="canonical">`?
- [ ] Is content server-side rendered (crawlers see real HTML, not a JS blob)?
- [ ] Are there any `<meta name="robots" content="noindex">` tags on pages that should be indexed?
- [ ] What structured data (JSON-LD) is present? (Test with Google's Rich Results Test.)
- [ ] Does every page have exactly one `<h1>` and a logical H2/H3 hierarchy?
- [ ] Do meaningful images have descriptive `alt` text? Are decorative images `alt=""`?
- [ ] What internal linking exists between pages? Any dead-end pages?
- [ ] How does each page open — does the first ~200 words state clearly what the site is about?
- [ ] Are there any pages that duplicate content?
- [ ] Is the site fast? (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Are there heavy unreferenced assets in the public folder eating crawl budget?
- [ ] Is the domain registered with Google Search Console + Bing Webmaster Tools?
- [ ] How many pages does Google currently know about? (`site:example.com` in Google.)
- [ ] Does the brand name search (`Company Name`) rank the site #1?
- [ ] What backlinks does the site have? (Check via Ahrefs, Moz, or a free alternative like linkody.)
- [ ] Does the company have social profiles (LinkedIn, Twitter, etc.) linked from the site? Do those profiles link back?

### Keyword research

For every target keyword the human gave in inputs, ask:

- **Intent**: is the user looking for information, comparing options, or ready to buy?
- **Competition**: who ranks in the top 10? Are they established players or beatable?
- **Long-tail variants**: what more-specific phrases lead to the same intent? (`AI poultry monitoring platform` → `AI poultry monitoring South Africa`, `AI poultry welfare monitoring`, `intelligent poultry farm monitoring`.)
- **Search volume**: is anyone actually typing this? (Rough check via Google's autocomplete + related searches.)

**Prioritise long-tail geo-qualified phrases over category-level ones.** A new domain will rank on `poultry welfare monitoring South Africa` in weeks; on `poultry monitoring` in months to years.

### Deliverable

The agent should produce, at the end of Phase 0:

1. A one-page audit summary — what's working, what's broken, what's missing.
2. A prioritised keyword shortlist (top 5–10 keywords the site should target, ranked by winnability × business value).
3. A plan for Phases 1–4, split into PRs.
4. A separate list of Phase 5 (manual, human) actions the stakeholder must handle.

---

## 6. Phase 1 — Technical Foundation

### Objective

Make the site trivially crawlable, correctly canonicalised, and understandable to search engines and AI answer engines. Everything in this phase is one-time work.

### 6.1 `robots.txt`

Explicitly **allow** the crawlers that matter. Do not rely on the default `allow-all` — some hosting providers (notably Cloudflare) have started blocking AI crawlers by default, and an explicit allowlist makes intent clear.

**Bots to allow explicitly:**

- **Search**: Googlebot, Bingbot, DuckDuckBot, YandexBot, Applebot.
- **AI (retrieval + answer engines)**: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended (Gemini), Applebot-Extended.
- **AI (training corpora)**: CCBot (Common Crawl — powers many LLM training sets), Amazonbot, Meta-ExternalAgent.

**Reference the sitemap** in `robots.txt`.

**Framework-specific note (Next.js App Router):** implement as `app/robots.ts` returning a `MetadataRoute.Robots` object. Next auto-serves it at `/robots.txt`.

### 6.2 `sitemap.xml`

Every publicly indexable page enumerated with an absolute URL and a `lastModified` timestamp. **Do not** use `new Date()` for `lastModified` — that lies (says every page updated today, on every deploy). Instead, keep per-route timestamps in a small map and bump them only when a page's content actually changes.

**Framework-specific note (Next.js App Router):** implement as `app/sitemap.ts` returning `MetadataRoute.Sitemap`. Keep `lastModified` values in a separate `lib/pageMeta.ts` file so both the sitemap and the visible "Last updated" line (Phase 4) draw from the same source.

### 6.3 Canonical URLs

Every page declares its own canonical via `<link rel="canonical">`. This tells search engines "if you see this content under multiple URLs (with query strings, tracking parameters, alternate protocols), this is the authoritative one."

**For a new site:** every page's canonical is itself. It's not just for duplicate-content edge cases — Google actively looks for the canonical tag and treats its absence as a soft signal.

**Framework-specific note (Next.js):** set `alternates: { canonical: "/route-path" }` in each page's exported `metadata`. The framework resolves it against `metadataBase`.

### 6.4 `metadataBase`

The base URL from which all relative canonical, OG, and Twitter image URLs are resolved. Set this **once** at the root. Without it, OG images and share previews may resolve to placeholder or broken URLs.

**Never** leave a placeholder like `https://example.com` or `https://mysite.example.com` in production. Grep for `example.com` across the codebase before every deploy and treat any hit as a bug.

### 6.5 HTTPS + apex → www redirect

Site must be HTTPS-only. Any HTTP request should 301/307 redirect to HTTPS.

Choose one canonical host — either apex (`example.com`) or www (`www.example.com`) — and 301 the other one to it. Splitting signals across both hurts ranking. **Recommendation**: use www as canonical (more flexible for future subdomains).

Verify with:
```sh
curl -sI https://example.com/          # should redirect
curl -sI https://www.example.com/      # should 200
```

### 6.6 Server-side rendering (SSR)

Search crawlers and most AI crawlers **do not execute JavaScript reliably**. If your content is only rendered client-side, expect large portions of your site to be invisible to crawlers.

- Next.js App Router — SSR by default (React Server Components). Good.
- Next.js Pages Router — SSR via `getServerSideProps` or SSG via `getStaticProps`. Good.
- Vite / Create React App — client-only by default. **Bad for SEO.** Consider pre-rendering critical routes with a tool like Prerender.io, or migrate to a framework with SSR/SSG.
- Vue / Nuxt — Nuxt SSR = good, plain Vue = client-only.
- Any framework — verify with `view-source` in the browser: if the initial HTML contains your body copy, SSR works.

### 6.7 Clean URL structure

- Human-readable slugs: `/pricing`, `/about`, `/solution` — not `/page?id=482`.
- Consistent trailing slash policy (with or without — pick one, stick to it, redirect the other).
- No mixed-case URLs.
- Lowercase, hyphens for word separators (not underscores).
- Descriptive: `/computer-vision-for-poultry`, not `/services/cv`.

### 6.8 Favicon

Every browser tab should show the brand mark. The `metadata.icons.icon = "/favicon.svg"` approach is fragile — SVG favicon support varies across browsers, and some render nothing. Use a PNG.

**Framework-specific note (Next.js 14):** create `app/icon.tsx` returning an `ImageResponse` at 32×32. Next auto-generates `<link rel="icon" type="image/png">`. Add `app/apple-icon.tsx` at 180×180 for iOS home-screen icons.

### 6.9 Semantic HTML hierarchy

Every page:

- Exactly **one** `<h1>`.
- `<h2>` for major sections.
- `<h3>` for subsections under an `<h2>` (do not skip levels — never `<h1>` → `<h3>`).
- Descriptive text inside — not "Section 1" or "More info".

An accessibility issue AND an SEO issue: search engines use heading hierarchy to model page structure.

### 6.10 Purge unused heavy assets

Static assets in `/public` are served regardless of whether the code references them. A 25 MB unused GIF eats bandwidth, hurts perceived load time, and wastes crawl budget.

**Process:**
1. `grep -rl <filename>` for each large asset to check whether any code references it.
2. Anything unreferenced — delete.
3. Anything referenced but oversized (a 1 MB PNG rendered at 72×72 pixels) — downsize the source.

### 6.11 Image optimisation

- Use `next/image` (or equivalent) with explicit `width` + `height` to prevent layout shift (CLS).
- Add `priority` and `fetchPriority="high"` to the LCP image (usually the hero) and **only** the LCP image.
- Set `sizes` to match the actual rendered dimensions so responsive delivery works.
- Prefer modern formats (WebP, AVIF) — Next.js does this automatically on optimised images.
- Keep source images sized reasonably. `next/image` resizes on the fly but has to fetch the source first.

### 6.12 `llms.txt`

An emerging convention (not universally supported yet, but zero downside). A markdown summary at `/llms.txt` describing what the site is, plus links to key pages and structured facts.

**Reality check as of 2026:** Google has said it ignores this. Some AI tools do read it. Adding it is 5 minutes of work with no downside — file it as future-proofing, not a silver bullet.

**Template:**

```md
# [Company Name]

> [One-paragraph description of what the company does, who it serves, what the product is.]

## Key pages
- [Home](https://www.example.com/): [purpose]
- [Product / Solution](https://www.example.com/solution): [purpose]
- [Pricing](https://www.example.com/pricing): [purpose]
- [About](https://www.example.com/about): [purpose]
- [Contact](https://www.example.com/contact): [purpose]

## Facts
- **Category**: [B2B SaaS / e-commerce / marketplace / etc.]
- **Geography**: [where you operate]
- **Founded**: [year]
- **Contact**: [email]
- **LinkedIn (company)**: [URL]
- **LinkedIn (founders)**: [URLs]

## Structured data
Machine-readable metadata (JSON-LD) is present in the `<head>` of every page (Organization, WebSite, [other types]). Sitemap: https://www.example.com/sitemap.xml.
```

### Phase 1 verification

- [ ] `robots.txt` reachable, lists sitemap + explicit crawler allowlist.
- [ ] `sitemap.xml` reachable, lists every public page with absolute URLs and honest `lastmod`.
- [ ] Every page has `<link rel="canonical">` pointing at itself.
- [ ] `view-source` on production shows real HTML for body content.
- [ ] Apex and www resolve consistently (one redirects to the other, both HTTPS).
- [ ] Rich Results Test on the homepage shows no structural warnings.
- [ ] Homepage LCP < 2.5s on PageSpeed Insights.
- [ ] `public/` has no unused >1 MB files.
- [ ] Browser tab shows favicon.

---

## 7. Phase 2 — On-Page Structure & Content

### Objective

Make each page tell search engines and AI answer engines exactly what it's about, in the slots they weight most heavily.

### 7.1 Per-page unique titles + descriptions

Every route has a distinct `<title>` (50–60 characters) and `<meta name="description">` (150–160 characters) that:

- **Lead with the target keyword** for that page.
- Are unique across the site (no page called just "Home" or "Solution").
- Read naturally — a search snippet is often a user's first impression.

**Framework-specific note (Next.js App Router):** each page exports `metadata`, and the root layout provides a `title.template`. Use the template for consistent branding (`"%s · Company Name"`).

### 7.2 Keyword-forward H1s and H2s

H1 and H2 text are two of the highest-weighted on-page signals. If your headlines are "Welcome" or "The system, end to end" — brand-poetry with zero keyword coverage — search engines can't rank you for the phrases users search.

**Rule:** every H1 and H2 on the site should contain at least one target keyword phrase from Phase 0's shortlist. This can be done without losing brand voice — for example:

- Instead of `The system, end to end.` (poetic, keywordless) → `AI poultry monitoring, end to end.` (poetic, keyword-forward).

**Homepage exception:** the hero H1 often has strong brand identity. Don't rewrite it if it's iconic. Instead, add a keyword-bearing H2 immediately below the hero — same SEO benefit, no brand disruption.

### 7.3 Answer-first opening ledes

AI answer engines (ChatGPT, Perplexity, Google AI Overviews) weight the **first ~200 words** of a page heavily when deciding whether to cite it. They look for a clean, extractable sentence that answers "what is this?"

**Every important page needs a plain-language "SenseAgri AI is a X for Y" opening sentence** somewhere in the first paragraph or two. It doesn't have to be the H1 — but it must be visible text a crawler can lift as a citation.

Example:

- Before: `Continuous sensing and causal AI — so you understand why, not just what.` (marketing copy, no entity name)
- After (in a paragraph below the hero): `SenseAgri AI is an end-to-end poultry monitoring and decision intelligence platform for commercial farms in South Africa. [Marketing copy continues.]`

### 7.4 Internal cross-linking

Every content page should link to at least 2–3 other pages on the site, using descriptive anchor text (not "click here").

**Anti-pattern:** the contact page dead-ends. Users who bounce to `/contact` and reconsider should have somewhere to go — a link back to `/solution` or `/pricing` or `/faq`.

**Anchor text matters:** an internal link that says `see the platform end-to-end` is more valuable than one that says `click here`. Search engines use anchor text as a hint about the destination page's topic.

### 7.5 Alt text

Every meaningful image gets descriptive alt text — one sentence, with keywords where they fit naturally, describing what the image shows.

**Decorative images** (dividers, backgrounds, purely aesthetic photos) get `alt=""` (empty). Not omitted, not "decoration" — literally empty. This tells screen readers to skip.

**Anti-pattern:** stuffing alt text with keywords ("poultry farm monitoring AI system for South African broiler operations"). Google detects this and discounts it. One honest descriptive sentence is better than a keyword salad.

### 7.6 FAQ page (highest single AEO win)

An FAQ page with `FAQPage` structured data is one of the most-cited formats by AI answer engines. The Q&A format matches exactly what an LLM lifts when constructing a citation.

**How to build one:**

1. Draft 5–10 questions that your target audience actually asks. Sources: sales call transcripts, support tickets, existing site copy.
2. Answers must be honest and specific. **Never fabricate claims.** If the site doesn't already say "we integrate with X", the FAQ can't claim it either.
3. Wire the Q&As into an accordion or expander component.
4. Emit `FAQPage` JSON-LD (see Phase 3).
5. Link to the FAQ from navbar + footer + contextual cross-links.

**Question templates that work well:**
- "How does [product] [do X]?"
- "What [inputs/hardware/etc.] does [product] use?"
- "Does [product] integrate with [common thing in the space]?"
- "What does [pricing tier / pilot / trial] cost?"
- "Do I need [technical prerequisite]?"

### Phase 2 verification

- [ ] Every route has a unique, keyword-bearing `<title>`.
- [ ] Every route has a keyword-bearing `<meta description>` around 150 chars.
- [ ] Every H1 on the site contains at least one target-keyword phrase.
- [ ] Every page opens with a clear "X is a Y for Z" sentence in the first 200 words.
- [ ] Every page has at least 2 internal links to other site pages, with descriptive anchor text.
- [ ] Every meaningful image has descriptive alt text; decorative images use `alt=""`.
- [ ] FAQ page exists, linked from navbar + footer, with 5+ Q&As.

---

## 8. Phase 3 — Structured Data (JSON-LD)

### Objective

Give machines (Google's Knowledge Graph, LLM answer engines) a machine-readable summary of what your entity is, where it operates, and how it relates to real-world objects like people and places.

Structured data doesn't directly change ranking — but it dramatically increases the odds of rich snippets in search results, entity recognition in AI answers, and knowledge-panel display.

### 8.1 Organization schema (highest-priority)

Emit an `Organization` graph in the root layout so it appears on every page. Include:

- `name`, `url`, `logo` (absolute URL)
- `description` (matches your positioning sentence)
- `foundingDate`
- `areaServed` (Country or Continent — real geography of operation)
- `address` (postal address if applicable)
- `contactPoint` (email, phone, contactType)
- **`sameAs`**: array of URLs to your entity elsewhere on the web — LinkedIn, Twitter, Crunchbase, GitHub. This is a **critical entity signal**. Google Knowledge Graph uses `sameAs` to build your company's entity profile.
- **`founder`**: array of `Person` graphs, each with `name`, `jobTitle`, `worksFor` (link back to the org by `@id`), and their own `sameAs` (personal LinkedIn). This surfaces founders as linked entities.

### 8.2 WebSite schema

Small graph identifying the website itself. Enables Google's sitelinks search box (a search bar in the SERP).

### 8.3 Product / Service / SoftwareApplication schema

Pick the type that fits your business:

- **SoftwareApplication**: SaaS, apps, platforms.
- **Service**: consultancies, agencies, hands-on services.
- **Product**: physical goods.

Include `name`, `description`, `applicationCategory` (for SoftwareApplication), `provider` linked to the Organization by `@id`, `areaServed`, `audience`.

**On pricing:** if you want pricing exposed in structured data, include an `offers` node with `price` and `priceCurrency`. If your pricing stance is "call for a quote" — **omit the price node**. Exposing a price in schema that contradicts your visible copy is worse than omitting it.

### 8.4 BreadcrumbList schema

On every subpage: a `BreadcrumbList` graph showing the path from Home → Current Page. For flat sites, this is a two-item list. Enables the breadcrumb display under your title in Google search results.

### 8.5 FAQPage schema

On the FAQ page: a `FAQPage` graph mapping each visible Q&A to a `Question` + `acceptedAnswer.Answer` node. **The most-cited structured data type in AI answer engines**, per multiple citation-tracking studies.

### 8.6 Article / BlogPosting schema

On any blog post or article: `Article` or `BlogPosting` graph with `headline`, `author`, `datePublished`, `dateModified`. Recency matters — AI answer engines weight `dateModified` when deciding whose article to cite for a topic.

### 8.7 Recency signals (visible + structured)

Two parallel signals:

1. **Sitemap `lastmod`** — bumps only when content actually changes (not per deploy).
2. **Visible "Last updated: [date]" line** at the bottom of key pages. AI answer engines read this and weight it.

Both should draw from the same source of truth (a single `pageMeta` file with per-route dates). Do not use `new Date()` anywhere — that lies.

### Phase 3 verification

- [ ] Google Rich Results Test passes on every page — Organization + WebSite everywhere; FAQPage on `/faq`; Service/Product/SoftwareApplication where relevant; BreadcrumbList on subpages.
- [ ] Schema.org validator (https://validator.schema.org/) — zero errors on every page.
- [ ] `sameAs` field on Organization includes every social profile you actually have.
- [ ] `view-source` on any page — inline `<script type="application/ld+json">` block(s) are present in the head or body.

---

## 9. Phase 4 — GEO / AEO Optimisation

### Objective

Content structure and signals that specifically increase the odds of being cited by AI answer engines. Overlaps with Phase 2 (on-page content) but focuses on the LLM-specific patterns.

### 9.1 Entity-named opening sentence

Every important page opens with a plain-language sentence that names the entity, category, audience, and geography.

Template: `[Entity Name] is a [category] for [audience] in [geography] that [outcome].`

This is the sentence an LLM will lift verbatim when asked "what is [Entity Name]?"

### 9.2 FAQ as extractable content

Covered in Phase 2 and 3. The FAQ page is the single highest-leverage GEO surface. Every question should be one a real user might ask an AI assistant. Every answer should be:

- Standalone (readable without the surrounding page context).
- Factual (verifiable claims only).
- Complete (a 2–4 sentence paragraph, not a one-word "yes").

### 9.3 Recency signals

AI answer engines actively weight recency when choosing whose content to cite. Two patterns:

- Visible "Last updated" line on evergreen pages.
- Real, honest `dateModified` in Article schema for blog posts.

**Do not fake recency** by bumping dates without updating content. LLMs can compare claimed dates against the actual first-crawled date, and inconsistency hurts trust.

### 9.4 Original data and statistics

The single strongest GEO signal, per multiple studies (Princeton/AI2 GEO study, KDD 2024): pages that include **specific statistics** and **cite original sources** get cited disproportionately more.

If your company has any original data — pilot results, industry benchmarks, sensor readings, survey responses — publish a data page. Even a single "State of [Industry] 2026" report with real numbers becomes an AEO magnet.

Examples of citable content:
- "In our pilots, feed:water ratio deviations preceded gut-health issues by 4–7 days on average."
- "According to our 2026 survey of 40 South African poultry operations, 78% still monitor house conditions manually."
- "SenseAgri sensors capture 1 reading per house per minute across 7 environmental parameters."

**Even without original research:** cite external sources with `<a>` tags. Pages that link out to authoritative sources get cited more than pages that just make claims.

### 9.5 E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust)

Google and Claude in particular favour content with clear provenance. Add:

- **Author bios** on articles — real names, credentials, a photo.
- **Company About page** with founder details, real contact info, physical address if applicable.
- **Person schema** for authors and founders (with `sameAs` linking to LinkedIn — see Phase 3).
- **Consistent contact info** across the site, in structured data, and on external profiles.

### 9.6 Answer-first structure within each page

Each page should follow the inverted-pyramid pattern:

1. Direct answer to the page's implicit question, in the first paragraph.
2. Supporting detail below.
3. Deep detail at the bottom.

LLM extraction reads top-down and stops as soon as it has a citable chunk. If your best sentence is buried in paragraph 8, it won't be cited.

### Phase 4 verification

- [ ] Every important page has an entity-named opening sentence in the first 200 words.
- [ ] FAQ page has 5+ Q&As, each Q is a real user question, each A is 2–4 self-contained sentences.
- [ ] At least one page contains specific statistics or data points from your own operation, work, or industry.
- [ ] Author / founder bios exist with real names, roles, and credentials.
- [ ] Contact info is consistent everywhere — site copy, structured data, LinkedIn, etc.
- [ ] Recency signals: visible "Last updated" on evergreen pages, honest `dateModified` on articles.

---

## 10. Phase 5 — Off-Site Work (Manual)

### Objective

Everything a coding agent cannot do. Requires a logged-in human. Every one of these is high-leverage and low-effort — skipping them wastes the technical foundation you just built.

### 10.1 Google Search Console (highest priority)

**What it is:** Google's official dashboard for site owners. Shows impressions, clicks, average position, indexing status, sitemap coverage, mobile issues, and Core Web Vitals.

**Setup (10 minutes):**

1. Go to https://search.google.com/search-console
2. Sign in with a Google account you'll keep long-term.
3. Add property → choose **Domain** (better — covers all subdomains) OR **URL prefix** (easier if you don't want DNS access).
4. Verify:
    - **Domain method**: add a TXT record to your DNS provider. Check nameservers first — if they're delegated (e.g. to Cloudflare or a hosting provider's DNS), the record goes there, not at the registrar.
    - **URL prefix method**: add a `<meta name="google-site-verification">` tag to `<head>` (in the root layout), deploy, click Verify.
5. Once verified: Sitemaps → Add new sitemap → enter the full URL of your sitemap → Submit.
6. For faster indexing of specific pages: URL Inspection → paste each key URL → click "Request indexing". Quota ~10/day.

### 10.2 Bing Webmaster Tools (second priority)

**What it is:** Bing's equivalent of GSC. Data on how you rank on Bing search.

**Why it matters disproportionately:** Bing's index also powers Yahoo, DuckDuckGo, and — critically — **ChatGPT Search, Perplexity, and Microsoft Copilot**. If you want AI answer engines to cite your site, you need to be indexed in Bing.

**Setup (5 minutes):**

1. Go to https://www.bing.com/webmasters
2. Sign in.
3. Click "Import from Google Search Console" (only works if GSC is set up).
4. Authorise, wait 30 seconds, done — no re-verification needed.
5. Bing gets the sitemap and site verification carried over.
6. Use Bing's URL Submission tool to fast-track indexing — Bing's URL submission actually works well (~10,000 URLs/day quota for verified sites).

### 10.3 Backlinks (the biggest ongoing lever)

**Why it matters:** Google's #1 authority signal is other credible sites linking to yours. A new domain with zero backlinks will not rank on competitive terms no matter how good the on-site work is.

**Free / low-effort backlink sources for a new company:**

- **LinkedIn Company Page** — create one, add the website URL. This is your first backlink.
- **Founder LinkedIn profiles** — add website URL in the profile.
- **Crunchbase** — free listing for a real company.
- **AngelList / Wellfound** — free.
- **Product Hunt** — if applicable to your product category.
- **Industry directories** — every industry has directories. Search "[your industry] company directory [country]" and list on 3–5 relevant ones.
- **Google Business Profile** — if you have a physical location.
- **Local news / press release** — cheap, works.

**Backlink outreach (higher effort):**

- Guest posts on industry blogs.
- Podcast appearances.
- Being interviewed by trade publications.
- Speaking at industry conferences (usually gets a link from the conference site).

**Anti-patterns to avoid:**

- Buying links (Google penalises this — don't).
- Link-exchange schemes (same).
- Comment spam or forum spam (same).
- Low-quality directory submissions (skip the shady ones — quality > quantity).

### 10.4 LinkedIn Company Page (specific because it's the easiest)

Ten minutes of work, produces a permanent backlink, and once linked in `Organization.sameAs` it becomes an entity signal.

1. Create a LinkedIn Company Page (https://www.linkedin.com/company/setup/new/).
2. Add company name, logo, tagline, website URL, industry, size.
3. Write a 200-word company description.
4. Post the launch announcement.
5. Ask team members to link their profiles to the company page.

### 10.5 Directory listings (5–10 targets)

Prioritise directories that:
- Are indexed by Google (check by searching `site:directory.com` — should have thousands of pages).
- Are relevant to your industry / geography.
- Don't charge for basic listings.

**Universal directories worth listing on (any B2B company):**
- Crunchbase
- AngelList / Wellfound
- LinkedIn Company Page
- Product Hunt (if you have a product to launch)
- G2 (if B2B software)
- Capterra (if B2B software)
- Google Business Profile (if local business)

### 10.6 Analytics beyond GSC

- **Google Analytics 4** — traffic, referral sources, user flow. Free. Install via a script tag or Next.js's `@vercel/analytics` for basic + GA4 for detailed.
- **Vercel Analytics** — if hosted on Vercel, basic traffic stats out of the box.
- **Referral traffic monitoring** — specifically watch for traffic from `chat.openai.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`. This is currently the main way to see AI-citation traffic.

### Phase 5 verification

- [ ] GSC verified for the production domain, sitemap submitted, all key pages requested for indexing.
- [ ] Bing WMT set up (imported from GSC), sitemap submitted, key URLs submitted.
- [ ] LinkedIn Company Page live with website URL.
- [ ] `Organization.sameAs` in JSON-LD includes every real social profile.
- [ ] Site listed on at least 3 relevant directories (Crunchbase + LinkedIn + 1+ industry-specific).
- [ ] Analytics installed (GA4 or Vercel Analytics or both).
- [ ] Monitoring referral traffic from AI answer engines.

---

## 11. Common Myths & Anti-Patterns

### Myths that persist despite being wrong

- **"Add hashtags to the website for SEO."** No. `#word` in body text has zero SEO value on a website. Hashtags work on social platforms (LinkedIn, Twitter, Instagram), not on your own site.
- **"Add a `<meta name="keywords">` tag."** Google explicitly stopped using this in 2009. Adding it is harmless but useless.
- **"Just use ChatGPT to generate content, it'll rank."** LLM-generated content that isn't reviewed, edited, or validated is spam — Google's helpful content update explicitly targets this. Use LLMs to draft, not to publish.
- **"SEO is a one-time job."** No. Technical SEO is largely one-time. Content and off-site work is ongoing. Rankings decay if you stop.
- **"If I do all the SEO right, I'll rank in a few weeks."** No. A new domain takes 3–12 months to rank on competitive terms regardless of on-page perfection. The site needs domain age and backlinks. Nothing bypasses this.

### Anti-patterns that actively hurt

- **Keyword stuffing** — repeating the same phrase 20 times on a page. Google detects, ranks lower.
- **Duplicate content** — the same content under multiple URLs without canonical tags. Splits ranking signal.
- **Cloaking** — showing different content to crawlers vs users. Manual penalty risk.
- **Buying backlinks** — most public link-selling services are known to Google. Penalty risk.
- **Auto-generated pages / doorway pages** — thin pages targeting narrow keywords with no real content. Penalty risk.
- **Faking recency** — bumping `dateModified` without changing content. LLMs cross-check.
- **Making claims the product can't deliver** — beyond legal risk, this destroys trust when discovered. Every claim on the site must be defensible.
- **Ignoring off-site work** — perfecting the site while never doing GSC / backlinks / social. Very common. Wastes the technical foundation.

### Positioning traps (from real projects)

- **"It's free" when it isn't.** Loose language about pricing (`free pilot`, `no cost`, `zero commitment`) causes real problems when it turns out the pilot has a fee. Be precise or be ambiguous — do not lie by simplification.
- **Over-claiming maturity.** New products often say "the platform delivers X" when the honest statement is "the platform is designed to deliver X, pilots validate it on your operation." The honest framing is usually better positioning.
- **Copying category leaders' claims.** If you say what SenseIt or Big Dutchman says, buyers assume you're smaller and worse at the same thing. Differentiate on positioning, not just execution.

---

## 12. Verification & Metrics

### Tools you should own

| Tool | Free? | What it does |
|---|---|---|
| Google Rich Results Test | Free | Validates structured data on any URL |
| Schema.org Validator | Free | Similar; catches schema-spec violations |
| Google Search Console | Free | Google impressions, clicks, position, indexing |
| Bing Webmaster Tools | Free | Bing equivalent; also feeds AI answer engines |
| Google PageSpeed Insights | Free | Core Web Vitals + Lighthouse audit |
| Google Analytics 4 | Free | Traffic, referrers, user flow |
| Ahrefs / Moz / Semrush | Paid | Backlink profiles, keyword research, competitor tracking |

### Metrics to actually track

**Month 1–2 (indexing phase):**
- Pages indexed (GSC → Pages → Indexed count).
- Sitemap coverage (GSC → Sitemaps).
- Brand-name query ranking (should hit #1 within weeks).

**Month 3–6 (early rankings phase):**
- Impressions per keyword (GSC → Performance → Queries).
- Average position per keyword (GSC → Performance → Queries).
- Referral traffic from AI answer engines.
- Backlink count (Ahrefs / Moz).

**Month 6+ (traction phase):**
- Non-brand organic clicks per month.
- Conversion rate from organic (into whatever your goal is — signup, contact form, purchase).
- Share of voice against competitors on target keywords.

### Manual GEO/AEO testing

Every 2–4 weeks, ask ChatGPT / Perplexity / Claude / Google AI Overviews queries relevant to your business:

- `What is [your company]?`
- `[category] for [audience] in [geography]`
- `Best [category] for [use case]`

Check whether your site is cited. If not, look at what pages ARE cited and understand why.

---

## 13. Realistic Timeline Expectations

**This is the section people skip and then get frustrated when rankings don't magic themselves into existence in two weeks.**

### Week 0 (launch)

Site is live, all technical work done, GSC + Bing WMT set up, LinkedIn posted.

**What ranks:** basically nothing except your exact company name.

### Week 1–2

- Google discovers and indexes the homepage.
- Brand-name query (`Your Company Name`) starts ranking your site #1.
- Bing indexes faster than Google — subpages should start appearing in `site:example.com` on bing.com.

### Week 2–6

- Google indexes subpages (via sitemap + internal links).
- First impressions appear in GSC on long-tail queries (`your specific product in your specific city`).
- Non-brand traffic remains essentially zero unless you have a very unusual competitive advantage.

### Month 2–4

- Long-tail geo-qualified queries can rank on page 2–5.
- One or two lucky niche queries might hit page 1 with a single backlink.
- Brand searches solid, non-brand still limited.

### Month 4–6

- Cumulative backlinks (if you've been doing outreach) start compounding.
- Long-tail queries can hit page 1 consistently.
- Medium-competition category terms start showing impressions.

### Month 6–12

- Competitive category terms have a real shot at page 1 — gated on backlink accumulation and content depth.
- First measurable non-brand organic traffic.
- AI answer engines start citing consistently.

### Month 12+

- Compounding. New content ranks faster because the domain has authority.
- Category-leader queries become winnable with sustained content + backlink work.

**The single biggest determinant of your timeline is backlinks.** A site with 10 quality backlinks after 6 months will vastly outperform a site with 0 backlinks after 12 months, regardless of on-page perfection.

**The second biggest is content depth.** Sites with 20+ substantive pages outrank sites with 5 pages, even on the same domain age. Blog posts and dedicated landing pages per keyword are the extension of this playbook once you have images and material.

---

## 14. Prompt Templates (for agents)

Copy-paste these when handing work to a coding agent. Fill the brackets with company-specific context.

### 14.1 Phase 0 audit prompt

```
You are a coding agent implementing SEO + GEO optimisation on a company website.

Read the entire FINDABILITY_PLAYBOOK.md attached to this context.

Then audit the site at [https://production-url.com]. The repo is at [/path/to/repo].

Company context:
- Category: [B2B SaaS / e-commerce / etc.]
- Positioning: [one-sentence description]
- Target audience: [description]
- Geographic focus: [SA / global / etc.]
- Target keywords (top 5–10): [list]
- Known competitors: [3–5 companies]
- Honesty constraints: [any claims not yet ready to make publicly]

Produce a Phase 0 audit report following the checklist in section 5. 
Follow with a prioritised implementation plan for Phases 1–4, split into 
one PR per phase. Then list Phase 5 (manual) actions the human stakeholder 
must handle.

Do not implement anything yet. Wait for approval on the plan.
```

### 14.2 Phase 1 implementation prompt

```
Implement Phase 1 (Technical Foundation) per FINDABILITY_PLAYBOOK.md 
section 6 on the current repo. 

Create a branch `seo/phase-1-technical-foundation` off main.
One PR with multiple focused commits — one commit per bullet in section 6.

Verify each item using the verification checklist at the end of section 6 
before opening the PR. Include the verification results in the PR body.
```

### 14.3 Phase 2 implementation prompt

```
Implement Phase 2 (On-Page Structure & Content) per FINDABILITY_PLAYBOOK.md 
section 7.

Target keywords for this pass: [list from Phase 0].

Draft any new copy conservatively — use only claims already present on the 
site or supplied by the human stakeholder. Never fabricate features, 
integrations, or statistics.

Create a branch `seo/phase-2-content-structure` off main.
Flag any drafted copy in the PR body for human review before merge.
```

### 14.4 Phase 3 implementation prompt

```
Implement Phase 3 (Structured Data) per FINDABILITY_PLAYBOOK.md 
section 8.

Use these entity facts (supplied by the human):
- Organization: [name, URL, logo, description, founded, address, contact]
- Founders: [name, jobTitle, LinkedIn URL each]
- Social profiles: [URLs for sameAs]
- Category (SoftwareApplication / Service / Product): [type + description]
- Pricing exposed in schema: [yes with prices / no, no offers node]

Create `lib/jsonLd.ts` helpers for reusable graphs. Use a small 
`components/JsonLd.tsx` wrapper so pages don't repeat the incantation.

Branch `seo/phase-3-structured-data` off main.
Verify with Google Rich Results Test before opening PR.
```

### 14.5 Phase 4 implementation prompt

```
Implement Phase 4 (GEO / AEO Optimisation) per FINDABILITY_PLAYBOOK.md 
section 9.

Priorities in order:
1. Entity-named opening sentence on / /solution /about (draft for review).
2. FAQ page with FAQPage JSON-LD (draft 5 Q&As using only claims 
   already on the site).
3. Visible "Last updated" line + honest sitemap lastmod (via pageMeta).
4. llms.txt file.

Any statistical claims must come from the human stakeholder — never 
fabricate numbers.

Branch `seo/phase-4-geo` off main.
```

### 14.6 Ongoing keyword-refresh prompt

```
Given the GSC Performance data at [attach export or paste queries + 
positions], identify:
1. Queries where the site is on page 2–3 (positions 11–30) — near-miss 
   keywords one small tweak could bump to page 1.
2. Queries with high impressions and low click-through — snippet 
   optimisation opportunities.
3. Queries where the site ranks 1–10 already — content-depth opportunities 
   (dedicated landing pages).

Propose specific edits for the top 3 opportunities. Do not implement 
without approval.
```

---

## 15. Handover Checklist Summary

The complete flat checklist, in order. Every item is either done, or documented as intentionally skipped.

### Phase 0 — Discovery
- [ ] Human inputs gathered (URL, repo, positioning, keywords, competitors, honesty constraints).
- [ ] Site audit complete (technical, on-page, off-site).
- [ ] Keyword shortlist agreed with stakeholder.
- [ ] Phased implementation plan approved.

### Phase 1 — Technical Foundation
- [ ] `robots.txt` with explicit crawler allowlist.
- [ ] `sitemap.xml` with all pages, honest `lastmod`.
- [ ] `<link rel="canonical">` on every page.
- [ ] `metadataBase` set; no `example.com` placeholders anywhere.
- [ ] HTTPS everywhere; apex ↔ www redirect consistent.
- [ ] Server-side rendered content.
- [ ] Clean URL structure (lowercase, hyphens, human-readable).
- [ ] Favicon works cross-browser (PNG via file convention).
- [ ] One H1 per page; logical H2/H3 hierarchy.
- [ ] Unused heavy assets purged from public folder.
- [ ] Hero image uses `priority` + `sizes` for LCP.
- [ ] `llms.txt` present.

### Phase 2 — On-Page Content
- [ ] Every route: unique keyword-bearing title + description.
- [ ] Every H1 + H2 contains a target keyword.
- [ ] Entity-named opening sentence on every important page.
- [ ] Internal cross-linking on every content page.
- [ ] Alt text: descriptive on meaningful, empty on decorative.
- [ ] FAQ page live with 5+ Q&As.

### Phase 3 — Structured Data
- [ ] Organization graph with `sameAs`, `founder`, contact, geography.
- [ ] WebSite graph.
- [ ] Product / Service / SoftwareApplication graph.
- [ ] BreadcrumbList on every subpage.
- [ ] FAQPage on /faq.
- [ ] Article / BlogPosting on any blog posts.
- [ ] Rich Results Test passes with zero errors.

### Phase 4 — GEO / AEO
- [ ] Answer-first opening on every important page.
- [ ] Extractable Q&A format on FAQ.
- [ ] Visible "Last updated" line on evergreen pages.
- [ ] Honest `dateModified` on articles.
- [ ] E-E-A-T signals (bios, credentials, real contact info).
- [ ] Original data or citations where possible.

### Phase 5 — Off-Site (Manual, Human)
- [ ] Google Search Console verified + sitemap submitted.
- [ ] Bing Webmaster Tools set up + sitemap submitted.
- [ ] LinkedIn Company Page created + website URL added.
- [ ] `Organization.sameAs` populated with real profile URLs.
- [ ] Site listed on 3+ relevant directories.
- [ ] Analytics installed and monitored.

---

## 16. Appendices

### Appendix A — Framework-specific notes

**Next.js App Router (13+)**
- `app/robots.ts` → returns `MetadataRoute.Robots`.
- `app/sitemap.ts` → returns `MetadataRoute.Sitemap`.
- `app/icon.tsx` / `app/apple-icon.tsx` → returns `ImageResponse`.
- `app/opengraph-image.tsx` → returns `ImageResponse`.
- Root layout: `export const metadata` with `metadataBase`, `title.template`, default `openGraph`, `twitter`.
- Per-page: `export const metadata` with `title`, `description`, `alternates.canonical`.
- JSON-LD: inline `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` in server component.

**Next.js Pages Router**
- `pages/api/robots.txt.ts` and `pages/api/sitemap.xml.ts` — routes returning correct headers.
- `<Head>` component from `next/head` for `<title>`, `<meta>`, canonical, JSON-LD.

**Astro**
- File-based routes with frontmatter → good SSR by default.
- `astro-seo` package handles metadata cleanly.
- `astro-sitemap` for sitemap.

**Nuxt (Vue)**
- `useHead` composable for per-page meta.
- `@nuxtjs/robots`, `@nuxtjs/sitemap` modules.

**SvelteKit**
- `+page.ts` `load` returning `head` config.
- Manual sitemap route.

**Vite + React (unopinionated)**
- Consider React Helmet or React 19's `<title>` directly.
- SSR-only viable with vite-plugin-ssr or Vike.

**Static HTML**
- All this still applies — set `<link rel="canonical">`, structured data, etc. manually in every file.

### Appendix B — Common Schema.org types

| Type | Use for |
|---|---|
| Organization | Companies, brands, non-profits |
| WebSite | The site itself (enables sitelinks search) |
| SoftwareApplication | SaaS, apps, platforms |
| Service | Consulting, agencies, hands-on services |
| Product | Physical goods, e-commerce items |
| LocalBusiness | Businesses with physical location + service area |
| Person | Founders, authors, staff |
| Article / BlogPosting | Blog posts and articles |
| FAQPage | FAQ pages |
| BreadcrumbList | Site navigation trail |
| Event | Webinars, launches, conferences |
| VideoObject | Embedded videos |
| Review / AggregateRating | Customer reviews |
| HowTo | Step-by-step tutorials |

### Appendix C — Recommended tools

**Free:**
- Google Search Console
- Bing Webmaster Tools
- Google Rich Results Test
- Schema.org Validator
- Google PageSpeed Insights
- Google Analytics 4
- Screaming Frog SEO Spider (free tier — audits up to 500 URLs)

**Paid (worth it once you have real traffic):**
- Ahrefs (backlink analysis, keyword research, ~$99/mo)
- Semrush (similar, ~$130/mo)
- Moz Pro (similar, ~$99/mo)
- ContentKing (real-time SEO monitoring, ~$40/mo)

### Appendix D — Reading list

- **Google's SEO Starter Guide** — https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- **Google Search Central Blog** — https://developers.google.com/search/blog
- **Schema.org documentation** — https://schema.org/docs/schemas.html
- **Princeton/AI2 GEO study (KDD 2024)** — foundational research on what content AI answer engines cite.
- **Perplexity, ChatGPT, Claude — search their public docs on citation and crawling** — evolving guidance.

---

*End of playbook. Version 1.0 — 2026-07-19.*

*Contributions and corrections welcome. Fork, adapt, use for any project.*
