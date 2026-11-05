import Script from "next/script";

export default function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim();

  if (!analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`}
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
