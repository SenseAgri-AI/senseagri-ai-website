import { siteConfig } from "@/lib/site";

type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbGraph(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`
      },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${siteConfig.url}${c.path}`
      }))
    ]
  };
}

export function pilotServiceGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#partner-programme`,
    name: "SenseAgri AI Partner Programme",
    description:
      "SenseAgri AI Partner Programme — founder pricing for commercial poultry operations. Includes full platform access (LoRaWAN sensors, dashboard, and edge AI), on-site installation and setup fully managed, hands-on onboarding and training, direct access to the SenseAgri AI team, and a product roadmap shaped by customer feedback. Pricing scoped to farm size and integration scope.",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: "Poultry farm monitoring and decision intelligence",
    audience: {
      "@type": "BusinessAudience",
      name: "Commercial poultry operations"
    },
    termsOfService: `${siteConfig.url}/pricing`
  };
}
