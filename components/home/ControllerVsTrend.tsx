import Link from "next/link";

// Brief 3.3 — what SenseAgri is and isn't. Replaces the old controller logo strip.
// Core offer: the farm's controllers already monitor 24/7; we're the intelligence
// on top. 24/7 language appears only in the secondary line about our sensors.

const ROWS: [string, string][] = [
  [
    "Watches the house minute by minute and sounds the alarm when a line is crossed",
    "Reads weeks of data and spots a trend days before it becomes an alarm"
  ],
  ["Tells you what is happening now", "Tells you why it's likely happening and what to check"],
  ["Uses the same thresholds for every flock", "Learns what normal looks like for each of your houses"],
  [
    "The same alert again and again, until nobody reacts",
    "A specific warning, sorted by category, only when it matters"
  ]
];

const SOURCES = [
  "Climate controllers",
  "Feed meters",
  "Water meters",
  "Egg counters",
  "Bird scales",
  "Silo levels",
  "Production records",
  "Spreadsheets"
];

function Ticker() {
  const line = SOURCES.join(" · ");
  return (
    <div className="ct-ticker overflow-hidden hairline-t hairline-b py-3" aria-label={`Sources the AI reads: ${SOURCES.join(", ")}`}>
      <div className="ct-ticker-track flex w-max font-mono text-[11px] uppercase tracking-[0.12em] text-on-surface-variant" aria-hidden="true">
        <span className="pr-8 whitespace-nowrap">{line} ·</span>
        <span className="pr-8 whitespace-nowrap">{line} ·</span>
      </div>
    </div>
  );
}

export default function ControllerVsTrend() {
  return (
    <section aria-labelledby="ct-title" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 sm:px-10 lg:px-16 lg:pb-16 lg:pt-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <h2
            id="ct-title"
            className="font-display font-bold text-primary lg:col-span-7"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)", lineHeight: 1.06, letterSpacing: "-0.02em", textWrap: "balance" }}
          >
            Your controller watches the moment. We read the trend.
          </h2>
          <p className="max-w-[46ch] font-sans text-on-surface-variant lg:col-span-5 lg:pt-2" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            Your farm already records more than anyone has time to read. Climate controllers, feed and water meters, egg
            counters, scales, production sheets. SenseAgri connects to almost every controller and on-farm device in use
            today, so there&apos;s no new hardware to start.
          </p>
        </div>

        {/* Instrument panel — two columns, one hairline between them */}
        <div className="mt-12 bg-surface-container-lowest" style={{ border: "0.5px solid #BEC8CA" }}>
          <div className="grid md:grid-cols-2">
            {/* Column heads, each with a sample of what the farmer actually sees */}
            <div className="px-5 py-5 sm:px-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-outline">Your controller</p>
              <p
                className="mt-4 inline-block bg-surface-container px-3 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-on-surface-variant"
                aria-label="Example controller alarm"
              >
                Alarm · Temp high · House 2
              </p>
            </div>
            <div className="ct-col-r px-5 py-5 sm:px-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-sensing">SenseAgri AI</p>
              <p
                className="mt-4 bg-signal-wash px-3 py-2 font-sans text-[14px] leading-snug text-primary"
                style={{ borderTop: "0.5px solid #D4AF37" }}
              >
                <span className="mr-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-sensing">House 2 ·</span>
                Afternoon temperature has run higher each day this week. Cooling isn&apos;t keeping up. Check the pads before
                Thursday.
              </p>
            </div>

            {ROWS.map(([left, right]) => (
              <div key={left} className="contents">
                <p className="hairline-t px-5 py-4 font-sans text-[15px] leading-relaxed text-on-surface-variant sm:px-7">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.1em] text-outline md:hidden">Controller</span>
                  {left}
                </p>
                <p className="ct-col-r hairline-t px-5 py-4 font-sans text-[15px] font-medium leading-relaxed text-primary sm:px-7">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.1em] text-sensing md:hidden">SenseAgri</span>
                  {right}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-[70ch] font-sans text-[15px] leading-relaxed text-on-surface-variant">
          Your controllers already watch your houses 24 hours a day. We don&apos;t replace that. We&apos;re the intelligence on
          top of it, making the data they collect worth something.
        </p>
        <p className="mt-2 font-sans text-[14px] text-on-surface-variant">
          Want us watching around the clock too? Add our sensors and we monitor 24/7.{" "}
          <Link href="/sensors" className="link-underline font-medium text-primary">
            See sensors →
          </Link>
        </p>
      </div>

      <Ticker />
    </section>
  );
}
