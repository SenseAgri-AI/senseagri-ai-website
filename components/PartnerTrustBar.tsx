import PartnerBarDismiss from "@/components/PartnerBarDismiss";

const partners = [
  {
    name: "AFGRI Animal Feeds",
    href: "https://www.afgrianimalfeeds.co.za/",
    src: "/partners/afgri-animal-feeds.png",
    alt: "AFGRI Animal Feeds",
    width: 165,
    height: 96,
    logo: "afgri"
  },
  {
    name: "DOL Sensors",
    href: "https://www.dol-sensors.com/",
    src: "/partners/dol-sensors-wordmark.png",
    alt: "DOL Sensors",
    width: 479,
    height: 96,
    logo: "dol"
  },
  {
    name: "Annie's Eggs",
    href: "https://www.instagram.com/annies_eggs/",
    src: "/partners/annies-eggs.png",
    alt: "Annie's Eggs — Naturally Laid, Naturally Loved",
    width: 131,
    height: 96,
    logo: "annies"
  },
  {
    name: "LNX Solutions",
    href: "https://lnx-solutions.com/",
    src: "/partners/lnx-solutions.png",
    alt: "LNX Solutions",
    width: 211,
    height: 96,
    logo: "lnx"
  }
] as const;

function PartnerList() {
  return (
    <ul className="partner-list">
      {partners.map((partner) => (
        <li key={partner.name}>
          <a href={partner.href} target="_blank" rel="noopener noreferrer">
            <img
              src={partner.src}
              alt={partner.alt}
              width={partner.width}
              height={partner.height}
              data-logo={partner.logo}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function PartnerTrustBar() {
  return (
    <aside className="partner-trust-bar" aria-label="Trusted by and working with">
      <p className="partner-trust-label">
        <span className="partner-label-full">Trusted by / Working with</span>
        <span className="partner-label-short">Working with</span>
      </p>
      <div className="partner-marquee">
        <div className="partner-track">
          <PartnerList />
        </div>
      </div>
      <PartnerBarDismiss />
    </aside>
  );
}
