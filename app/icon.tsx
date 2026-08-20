import { ImageResponse } from "next/og";

// Browser-tab + Google search-result favicon. Next 14 auto-generates
// the <link rel="icon" ... type="image/png"> tag from this file.
//
// Sized 96×96 (multiple of 48) per Google's search-result favicon
// guidance — icons below 48px are commonly discarded and replaced
// with the generic globe. Browser tabs downscale from this cleanly.

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
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
        <svg viewBox="0 32 90 76" width="78" height="66" fill="none">
          <rect x="24" y="32" width="42" height="20" rx="10" fill="#2A8E9A" opacity="0.55" />
          <rect x="10" y="60" width="70" height="20" rx="10" fill="#2A8E9A" opacity="0.75" />
          <rect x="0" y="88" width="90" height="20" rx="10" fill="#2A8E9A" />
        </svg>
      </div>
    ),
    size
  );
}
