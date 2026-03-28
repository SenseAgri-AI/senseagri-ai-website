import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  children?: ReactNode;
};

// Sharp container — 0px radius, tonal fill
export function IconWrapper({ className, children }: IconProps) {
  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center bg-surface-container text-primary ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
}

export function SignalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19h16" />
      <path d="M7 16a5 5 0 0 1 10 0" />
      <path d="M10 13a2 2 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </svg>
  );
}

export function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19h16" />
      <path d="M7 16v-5" />
      <path d="M12 16V8" />
      <path d="M17 16v-3" />
    </svg>
  );
}

export function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 4.6l-6.5 11.3a2 2 0 0 0 1.7 3h13a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0z" />
    </svg>
  );
}

export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 21c4-1 7-4 8-8" />
      <path d="M6 16c-1-6 3-11 12-12 0 9-5 13-12 12z" />
    </svg>
  );
}

export function CloudIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 18h11a4 4 0 0 0 0-8h-.5A6 6 0 0 0 6 9a4 4 0 0 0 0 8" />
    </svg>
  );
}

export function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
