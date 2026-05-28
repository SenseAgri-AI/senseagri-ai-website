import { ImageResponse } from "next/og";

// iOS Safari "Add to Home Screen" icon. Next auto-generates the
// <link rel="apple-touch-icon" href="/apple-icon"> tag.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <svg viewBox="0 32 90 76" width="140" height="118" fill="none">
          <rect x="24" y="32" width="42" height="20" rx="10" fill="#2A8E9A" opacity="0.55" />
          <rect x="10" y="60" width="70" height="20" rx="10" fill="#2A8E9A" opacity="0.75" />
          <rect x="0" y="88" width="90" height="20" rx="10" fill="#2A8E9A" />
        </svg>
      </div>
    ),
    size
  );
}
