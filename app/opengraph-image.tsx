import { ImageResponse } from "next/og";

// Social share preview (WhatsApp, Slack, LinkedIn, X, iMessage…).
// Next auto-generates the OG + Twitter meta tags from this convention file,
// which is why the manual `openGraph.images` / `twitter.images` were dropped
// from app/layout.tsx — those would override the convention.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SenseAgri AI — South Africa's Poultry Intelligence Platform";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F172A",
          display: "flex",
          padding: 80,
          position: "relative"
        }}
      >
        {/* Subtle blueprint grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(79,184,197,0.06) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(79,184,197,0.06) 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Main row — logo + text */}
        <div style={{ display: "flex", alignItems: "center", gap: 64, zIndex: 1, flex: 1 }}>
          <svg viewBox="0 32 90 76" width="220" height="186" fill="none">
            <rect x="24" y="32" width="42" height="20" rx="10" fill="#2A8E9A" opacity="0.55" />
            <rect x="10" y="60" width="70" height="20" rx="10" fill="#2A8E9A" opacity="0.75" />
            <rect x="0" y="88" width="90" height="20" rx="10" fill="#2A8E9A" />
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                borderLeft: "2px solid #D4AF37",
                paddingLeft: 14,
                paddingTop: 4,
                paddingBottom: 4,
                fontSize: 18,
                fontWeight: 700,
                color: "#D4AF37",
                letterSpacing: 2.5,
                textTransform: "uppercase"
              }}
            >
              South Africa's Poultry Intelligence Platform
            </div>

            {/* Wordmark */}
            <div
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: "white",
                letterSpacing: -2,
                lineHeight: 1
              }}
            >
              SenseAgri AI
            </div>

            {/* Sub */}
            <div
              style={{
                fontSize: 28,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 640,
                lineHeight: 1.4,
                marginTop: 4
              }}
            >
              Continuous sensing, edge AI alerts, and weekly ROI reports — engineered for South African poultry operations.
            </div>
          </div>
        </div>

        {/* Footer tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            display: "flex",
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 3,
            textTransform: "uppercase"
          }}
        >
          Every signal. Every decision.
        </div>
      </div>
    ),
    size
  );
}
