/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic design system tokens
        primary: "#00464f",
        "primary-container": "#005f6b",
        "primary-fixed": "#a7eefc",
        "on-primary": "#ffffff",
        surface: "#f8fafa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f4",
        "surface-container": "#eceeee",
        "surface-container-high": "#e6e8e8",
        "surface-container-highest": "#e1e3e3",
        "on-surface": "#191c1d",
        "on-surface-variant": "#3f4849",
        "outline-variant": "#bec8ca",
        tertiary: "#434025",
        "tertiary-fixed": "#eae3bf",
        "tertiary-container": "#5c5433",
        sage: "#4a7c59",
        "sage-container": "#d4edda",
        // Legacy aliases — mapped to new system tokens
        offwhite: "#f8fafa",
        forest: {
          50: "#f2f4f4",
          100: "#f2f4f4",
          200: "#bec8ca",
          300: "#00464f",
          400: "#00464f",
          500: "#00464f",
          600: "#00464f",
          700: "#00464f",
          800: "#00464f",
          900: "#00464f"
        },
        charcoal: {
          50: "#f8fafa",
          100: "#eceeee",
          200: "#bec8ca",
          300: "#3f4849",
          400: "#3f4849",
          500: "#3f4849",
          600: "#3f4849",
          700: "#191c1d",
          800: "#191c1d",
          900: "#191c1d"
        },
        amber: {
          400: "#434025",
          500: "#434025",
          600: "#434025"
        },
        signal: "#4a7c59"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        label: ["var(--font-space-grotesk)", "monospace"]
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title-lg": ["1.5rem", { lineHeight: "1.3" }],
        "title-md": ["1.125rem", { lineHeight: "1.4" }],
        "title-sm": ["0.875rem", { lineHeight: "1.4" }],
        "label-md": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.06em" }]
      },
      boxShadow: {
        ambient: "0 8px 32px rgba(25, 28, 29, 0.04)",
        float: "0 8px 32px rgba(25, 28, 29, 0.07)",
        // Legacy
        soft: "0 8px 32px rgba(25, 28, 29, 0.04)",
        glow: "0 8px 32px rgba(25, 28, 29, 0.07)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 15% 15%, rgba(0, 70, 79, 0.10), transparent 55%), radial-gradient(circle at 80% 10%, rgba(0, 95, 107, 0.07), transparent 45%)",
        "section-fade": "linear-gradient(180deg, rgba(248, 250, 250, 0.9), rgba(248, 250, 250, 0))",
        "btn-primary": "linear-gradient(135deg, #00464f 0%, #005f6b 100%)",
        "sense-line": "linear-gradient(180deg, transparent 0%, #eae3bf 50%, transparent 100%)"
      }
    }
  },
  plugins: []
};
