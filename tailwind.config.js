/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─── Core Design Tokens ─────────────────────────────────────────
        // Primary: Petrol Teal — anchor colour, high-intent actions
        primary: "#002E35",
        "primary-container": "#003F4A",
        // Live-signal aqua — high-contrast accent on deep navy backgrounds
        "primary-light": "#58C9C5",
        "on-primary": "#ffffff",

        // Secondary: Deep Navy — "Control Room" for footer & dark breakouts
        secondary: "#0F172A",
        "secondary-container": "#1E2D3D",
        "on-secondary": "#ffffff",
        "on-secondary-variant": "#7A9BA8",

        // Intelligence spectrum — sensing, active intelligence, and bright signal
        sensing: "#087C83",
        intelligence: "#13AAA5",
        signal: "#58C9C5",
        "signal-pale": "#A6E2DF",
        "signal-wash": "#E1F3F1",
        tertiary: "#13AAA5",
        "tertiary-container": "#A6E2DF",
        "on-tertiary": "#002E35",

        // Logo-pill teal — thin data lines (hero streams)
        pill: "#2A8E9A",
        // Signal gold — the insight node and one accent per viewport, never decoration
        gold: "#D4AF37",

        // Surface hierarchy — tonal layering, no drop shadows
        surface: "#F8FAFA",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#F2F4F4",
        "surface-container": "#ECEEEE",
        "surface-container-high": "#E6E8E8",
        "surface-container-highest": "#E1E3E3",
        "surface-variant": "#E2E6E8",

        // Text
        "on-surface": "#191C1D",
        "on-surface-variant": "#3F4849",

        // Lines — 0.5px hairlines only, never 1px solid boxes
        outline: "#6B7C80",
        "outline-variant": "#BEC8CA",

        error: "#B91C1C",

        // ─── Legacy aliases (remapped to new system) ──────────────────
        offwhite: "#F8FAFA",
        forest: {
          50: "#F2F4F4", 100: "#F2F4F4", 200: "#BEC8CA",
          300: "#002E35", 400: "#002E35", 500: "#002E35",
          600: "#002E35", 700: "#002E35", 800: "#002E35", 900: "#002E35"
        },
        charcoal: {
          50: "#F8FAFA", 100: "#ECEEEE", 200: "#BEC8CA",
          300: "#3F4849", 400: "#3F4849", 500: "#3F4849",
          600: "#3F4849", 700: "#191C1D", 800: "#191C1D", 900: "#191C1D"
        },
        // Amber remains reserved for operational warning states
        amber: { 400: "#D99A2B", 500: "#C78318", 600: "#A86610" }
      },

      fontFamily: {
        // Display & Headlines — Manrope (geometric, architectural)
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        // Body & Labels — Inter (functional, legible)
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Data & metadata — IBM Plex Mono (labels, units, timestamps)
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"]
      },

      fontSize: {
        "display-lg": ["3.5rem",  { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["2.75rem", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "title-lg":   ["1.5rem",  { lineHeight: "1.3"  }],
        "title-md":   ["1.125rem",{ lineHeight: "1.4"  }],
        "title-sm":   ["0.875rem",{ lineHeight: "1.4"  }],
        // Labels: quiet navigation precision; micro-labels opt into wider tracking.
        "label-md":   ["0.8125rem",{ lineHeight: "1.5", letterSpacing: "0.04em" }],
        "label-sm":   ["0.6875rem",{ lineHeight: "1.5", letterSpacing: "0.05em" }]
      },

      boxShadow: {
        // Teal-tinted ambient float — never a standard drop shadow
        float:   "0 8px 32px rgba(0, 46, 53, 0.07)",
        ambient: "0 8px 32px rgba(0, 46, 53, 0.04)",
        // Legacy
        soft: "0 8px 32px rgba(0, 46, 53, 0.04)",
        glow: "0 8px 32px rgba(0, 46, 53, 0.07)"
      },

      backgroundImage: {
        // Teal radial glow for hero sections
        "hero-glow":    "radial-gradient(circle at 15% 20%, rgba(0, 46, 53, 0.09), transparent 55%), radial-gradient(circle at 82% 10%, rgba(0, 63, 74, 0.06), transparent 45%)",
        "section-fade": "linear-gradient(180deg, rgba(248, 250, 250, 0.9), rgba(248, 250, 250, 0))"
      }
    }
  },
  plugins: []
};
