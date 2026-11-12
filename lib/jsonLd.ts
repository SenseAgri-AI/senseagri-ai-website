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

export function computerVisionServiceGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/computer-vision#service`,
    name: "SenseAgri computer vision",
    description:
      "Computer vision as the poultry farm's data layer: egg-counting cameras mounted on A-frame layer cages, egg counting for breeder houses, and bird activity tracking in broiler houses. Inference runs on the farm's own edge compute. The customer keeps ownership of the data.",
    url: `${siteConfig.url}/computer-vision`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: "Poultry computer vision and farm data capture",
    audience: {
      "@type": "BusinessAudience",
      name: "Commercial poultry operations"
    }
  };
}

export function farmAgentsServiceGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/ai-farm-agents#service`,
    name: "SenseAgri AI farm agents",
    description:
      "AI agents that connect securely to farm and company data the customer still owns. They catch issues, build reports, follow birds, work and open issues, spot inefficiencies, and analyse around the clock.",
    url: `${siteConfig.url}/ai-farm-agents`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: "AI agents for poultry farm operations",
    audience: {
      "@type": "BusinessAudience",
      name: "Commercial poultry operations"
    }
  };
}

export function securityPageGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/security#webpage`,
    name: "Security and data ownership",
    url: `${siteConfig.url}/security`,
    description:
      "Customer farm and company data remains the customer's. SenseAgri connects securely for computer vision and AI agents, runs inference on the farm where it can, and does not take ownership of the data.",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` }
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
