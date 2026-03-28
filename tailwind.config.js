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
        // Light teal — accent on deep navy backgrounds ("lighter shade of primary")
        "primary-light": "#2A8E9A",
        "on-primary": "#ffffff",

        // Secondary: Deep Navy — "Control Room" for footer & dark breakouts
        secondary: "#0F172A",
        "secondary-container": "#1E2D3D",
        "on-secondary": "#ffffff",
        "on-secondary-variant": "#7A9BA8",

        // Tertiary: Gold/Amber — "Pathfinder", < 5% screen usage
        tertiary: "#D4AF37",
        "tertiary-container": "#F5E8A0",
        "on-tertiary": "#191C1D",

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
        amber: { 400: "#D4AF37", 500: "#D4AF37", 600: "#D4AF37" },
        signal: "#2A8E9A"
      },

      fontFamily: {
        // Display & Headlines — Manrope (geometric, architectural)
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        // Body & Labels — Inter (functional, legible)
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },

      fontSize: {
        "display-lg": ["3.5rem",  { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "title-lg":   ["1.5rem",  { lineHeight: "1.3"  }],
        "title-md":   ["1.125rem",{ lineHeight: "1.4"  }],
        "title-sm":   ["0.875rem",{ lineHeight: "1.4"  }],
        // Labels: ALL CAPS + 0.05em tracking — mimics serial numbers on industrial equipment
        "label-md":   ["0.8125rem",{ lineHeight: "1.5", letterSpacing: "0.05em" }],
        "label-sm":   ["0.6875rem",{ lineHeight: "1.5", letterSpacing: "0.06em" }]
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
