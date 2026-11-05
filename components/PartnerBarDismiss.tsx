"use client";

export const PARTNER_BAR_STORAGE_KEY = "senseagri.partnerBar.v1";
export const PARTNER_BAR_DISMISS_CSS =
  ":root{--partner-bar-space:0px!important}.partner-trust-bar{display:none!important}";

export function dismissPartnerBar() {
  try {
    localStorage.setItem(PARTNER_BAR_STORAGE_KEY, "dismissed");
  } catch {
    // Private mode or blocked storage: still hide for this view.
  }

  let style = document.getElementById("partner-bar-dismissed");
  if (!style) {
    style = document.createElement("style");
    style.id = "partner-bar-dismissed";
    document.head.appendChild(style);
  }
  style.textContent = PARTNER_BAR_DISMISS_CSS;
}

export default function PartnerBarDismiss() {
  return (
    <button
      type="button"
      className="partner-dismiss"
      onClick={dismissPartnerBar}
      aria-label="Dismiss working with bar"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M2 2l10 10M12 2L2 12" />
      </svg>
    </button>
  );
}
