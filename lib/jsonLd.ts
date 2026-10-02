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
      "Hands-on collaboration and data science solutions built around your farm’s needs. Contact SenseAgri AI to discuss your challenges and learn about an offering and pricing tailored to your operation.",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: "Poultry farm monitoring and intelligence",
    audience: {
      "@type": "BusinessAudience",
      name: "Commercial poultry operations"
    },
    termsOfService: `${siteConfig.url}/offering`
  };
}
