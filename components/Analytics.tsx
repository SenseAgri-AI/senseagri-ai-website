import Script from "next/script";

export default function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim();

  // GA stays off until NEXT_PUBLIC_ANALYTICS_ID is set (GA4 measurement ID, e.g. G-XXXXXXXX).
  if (!analyticsId || !/^[A-Za-z0-9_-]+$/.test(analyticsId)) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(analyticsId)});
        `}
      </Script>
    </>
  );
}
