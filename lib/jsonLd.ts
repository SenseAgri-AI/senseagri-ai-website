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
      "Cameras can be set up to track eggs, birds, activity, and issues on layer, breeder, and broiler houses. Processing can run on the farm, so frames can stay on site. Egg counting on A-frame cages is one reading already shown.",
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
      "Agents can be set up to connect to Big Dutchman, SKOV, Hytek, Vencomatic, and company records a customer approves. They can send a WhatsApp alert when a reading leaves its range, draft a weekly production report, and track open work. Access is read-only by default.",
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
      "The customer owns farm and company data and can export or delete it. Connector access is limited to what the customer approves and is read-only by default.",
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
