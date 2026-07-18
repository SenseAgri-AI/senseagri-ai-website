// Per-route "last content update" timestamps.
//
// AI answer engines (Perplexity, Google AI Overviews, and others) weight
// recency when deciding whether to cite a page. Rendering a visible
// "Last updated" line — and returning the same timestamp from the sitemap —
// gives them a real recency signal instead of the sitemap-lies-every-deploy
// pattern of `new Date()`.
//
// **When you meaningfully edit a page's content, bump its date here.**
// Purely cosmetic changes (typo fixes, wording tweaks) don't need a bump.

export const pageLastModified: Record<string, string> = {
  "/": "2026-07-18",
  "/solution": "2026-07-18",
  "/pricing": "2026-07-18",
  "/faq": "2026-07-18",
  "/about": "2026-07-18",
  "/contact": "2026-07-18"
};

export function formatDisplayDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
