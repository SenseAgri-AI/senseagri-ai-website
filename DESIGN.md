# SenseAgri AI — Design System

## 1. Creative North Star: "Digital Husbandry"

Precision instrumentation meets agricultural intelligence. The visual language is borrowed from **technical blueprints, high-end field instruments, aerospace interfaces, and industrial control rooms** — sharp edges, hairline grids, tonal depth, and turquoise information illuminating petrol infrastructure. No decorative futurism. Every element earns its place.

> **Petrol infrastructure, illuminated by turquoise intelligence.**

---

## 2. Colour Palette

All tokens are registered in `tailwind.config.js`. Use the Tailwind class names below — never hardcode hex values in components.

### Core Colours

| Token | Class | Hex | Role |
|---|---|---|---|
| Primary | `text-primary` / `bg-primary` | `#002E35` | Petrol teal — anchor. High-intent actions, primary text on light backgrounds, convergence node fills. |
| Primary Light | `text-primary-light` / `bg-primary-light` | `#58C9C5` | Live-signal aqua — active paths and highlights on dark surfaces. |
| Primary Container | `bg-primary-container` | `#003F4A` | Slightly elevated primary, used for tonal cards on `bg-primary` backgrounds. |
| Secondary | `bg-secondary` | `#0F172A` | Deep navy — "Control Room". Used for footer, dark section breakouts, PEF chart panels. |
| Secondary Container | `bg-secondary-container` | `#1E2D3D` | Slightly lighter navy, nested cards inside secondary sections. |
| Core Teal | `text-sensing` / `bg-sensing` | `#087C83` | Core SenseAgri teal — structural transitions and charts. |
| Tertiary / Intelligence | `text-tertiary` / `bg-tertiary` | `#13AAA5` | Intelligence turquoise — analysis, selected states, and signal convergence. |
| Tertiary Container | `bg-tertiary-container` | `#A6E2DF` | Pale aqua — digital-twin and telemetry washes. |
| Signal Wash | `bg-signal-wash` | `#E1F3F1` | Ice turquoise — localized atmospheric wash on light surfaces. |
| Pill Teal | `text-pill` / `stroke-pill` | `#2A8E9A` | Logo-pill teal — thin data lines (hero streams). |
| Signal Gold | `text-gold` / `bg-gold` | `#D4AF37` | Signal only, under 5% of any screen: the insight node, one CTA accent, alert markers. Never a gradient or glow. |

### Surface Hierarchy (Light Canvas)

Use these for layering depth without shadows. Each step up is slightly darker.

| Token | Class | Hex | Use |
|---|---|---|---|
| Surface | `bg-surface` | `#F8FAFA` | Base page background. The expansive technical canvas. |
| Surface Container Lowest | `bg-surface-container-lowest` | `#ffffff` | Cards that need to "float" above surface. |
| Surface Container Low | `bg-surface-container-low` | `#F2F4F4` | Section backgrounds (alternating). Testimonials, FAQ. |
| Surface Container | `bg-surface-container` | `#ECEEEE` | Interactive chips, tonal labels, input fills. |
| Surface Container High | `bg-surface-container-high` | `#E6E8E8` | Hover/active state tint. |
| Surface Container Highest | `bg-surface-container-highest` | `#E1E3E3` | Strongest tonal surface. |
| Surface Variant | `bg-surface-variant` | `#E2E6E8` | Alternative surface for semantic differentiation. |

### Text Colours

| Token | Class | Hex | Use |
|---|---|---|---|
| On Surface | `text-on-surface` | `#191C1D` | Primary body text on light backgrounds. |
| On Surface Variant | `text-on-surface-variant` | `#3F4849` | Secondary text, captions, metadata on light backgrounds. |
| On Primary | `text-on-primary` | `#ffffff` | Text on `bg-primary`. |
| On Secondary | `text-on-secondary` | `#ffffff` | Text on `bg-secondary`. |
| On Secondary Variant | `text-on-secondary-variant` | `#7A9BA8` | Muted text on navy. |
| On Tertiary | `text-on-tertiary` | `#002E35` | Petrol text on turquoise backgrounds. |

### Lines & Outlines

| Token | Class | Hex | Use |
|---|---|---|---|
| Outline | `border-outline` | `#6B7C80` | Visible structural lines (axis labels, chart bases). |
| Outline Variant | `border-outline-variant` | `#BEC8CA` | Subtle separators, grid lines at low opacity. |

**The 0.5px Hairline Rule:** All borders are `0.5px` — never `1px`. Use `style={{ border: "0.5px solid ..." }}` inline when Tailwind's `border` (1px) is too heavy.

### Opacity Modifiers (Common Patterns)

```
text-primary/70    — secondary petrol text on aqua backgrounds
text-primary/50    — quiet labels on aqua surfaces
text-white/70      — body text on dark navy
text-white/40      — muted metadata on dark navy
text-white/10      — hairline separators on dark navy
rgba(0,46,53,0.12) — tonal chip fill on pale-aqua backgrounds
rgba(88,201,197,0.28) — live-signal hairline on dark navy panels
```

---

## 3. Logo

### Mark Specification

**File:** `/public/logo.svg`
**Component:** `components/LogoMark.tsx`
**Current component ViewBox:** `0 32 90 76`

The mark is the existing three-layer SenseAgri symbol. A refined logo is currently in development; preserve this geometry until approved final artwork is supplied.

| Element | Shape | Position | Colour | Opacity |
|---|---|---|---|---|
| Top pill | Rect 42×20 rx=10 | x=24, y=32 | `#2A8E9A` | 55% |
| Middle pill | Rect 70×20 rx=10 | x=10, y=60 | `#2A8E9A` | 75% |
| Bottom pill | Rect 90×20 rx=10 | x=0, y=88 | `#2A8E9A` | 100% |

**Spacing between layers:** 8px visual rhythm between the three pill layers.

### Context Variants

| Context | Container | Pill colour |
|---|---|---|
| On white/light surface | Deep navy/petrol where required for contrast | Current component values |
| On dark navy | Slightly elevated navy | Current component values |

Usage:
```tsx
// Current provisional mark
<LogoMark className="h-10 w-10" />
```

### Clear Space & Sizing

- Minimum size: `h-8 w-8` (32px tall)
- Keep the mark optically balanced within its container
- Clear space: ≥ half the mark width on all sides
- Do not redraw, recolour, or add elements while the new identity is being finalized

---

## 4. Typography

Fonts are loaded via `next/font` in `app/layout.tsx`.

| Role | Family | Variable |
|---|---|---|
| Display & Headlines | Manrope | `--font-manrope` → `font-display` |
| Body & Labels | Inter | `--font-inter` → `font-sans` |
| Data & Metadata | IBM Plex Mono | `--font-plex-mono` → `font-mono` |

Plex Mono is the instrument voice: labels, units, timestamps, stream names, table headers and section numbers. Uppercase, `0.08em–0.12em` tracking, tabular figures.

### Type Scale

| Token | Class | Size | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| Display LG | `text-display-lg` | 3.5rem | 1.05 | −0.025em | Page heroes (avoid — use clamp instead) |
| Display MD | `text-display-md` | 2.75rem | 1.1 | −0.025em | Section heroes |
| Display SM | `text-display-sm` | 2.25rem | 1.15 | −0.025em | Card headlines |
| Title LG | `text-title-lg` | 1.5rem | 1.3 | — | Sub-headlines |
| Title MD | `text-title-md` | 1.125rem | 1.4 | — | Lead body text |
| Title SM | `text-title-sm` | 0.875rem | 1.4 | — | Body text, descriptions |
| Label MD | `text-label-md` | 0.8125rem | 1.5 | +0.04em | Navigation and quiet metadata |
| Label SM | `text-label-sm` | 0.6875rem | 1.5 | +0.05em | Chart axes and compact metadata |

### Responsive Headlines (Preferred Pattern)

Use `clamp()` via inline style for hero/section headlines instead of the fixed scale:

```tsx
// Section headline
style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: "1.0" }}

// Hero headline
style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
```

### Weight and Tracking Hierarchy

| Weight | Tailwind | Use |
|---|---|---|
| 400 | `font-normal` | Long-form body text |
| 500 | `font-medium` | Wordmark, CTA labels, navigation |
| 600 | `font-semibold` | Section headings, card titles, micro-labels |
| 700 | `font-bold` | Hero headlines and selective emphasis |
| 800 | `font-extrabold` | Data values and decorative numerals only; never the default display treatment |

### Brand Wordmark Treatment

- Uppercase Manrope 500
- Wide tracking: `0.18em–0.22em`
- `SENSE` in petrol/navy, `AGRI` in intelligence turquoise
- `AI` may be retained as a smaller, quieter suffix while the final logo is in development
- Keep the wordmark narrow, clean, and generously spaced; never chunky

### Navigation and Micro-labels

- Navigation: Inter 500, uppercase, `0.04em–0.06em` tracking
- Eyebrows and intelligence terminology: Inter 600, uppercase, `0.14em–0.18em` tracking
- Buttons: Inter 500–600 with restrained `0.06em–0.10em` tracking

### Standard Patterns

```tsx
// Eyebrow / badge
<span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
  AI Operating System · Poultry Intelligence
</span>

// Section headline
<h2 className="font-display font-semibold text-primary"
    style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: "1.05", letterSpacing: "-0.025em" }}>

// Body paragraph
<p className="font-sans text-title-sm leading-relaxed text-on-surface-variant">

// Stat number (large)
<span className="font-display text-2xl font-extrabold tracking-tight text-tertiary">

// Chart / micro label
<text fontSize="7" fill="#6B7C80" fontFamily="Inter, sans-serif">
```

---

## 5. Spacing & Layout

- Max content width: `max-w-6xl` (standard sections), `max-w-4xl` (centred CTAs)
- Section padding: `section-padding` class = `py-20 px-6 sm:px-10 lg:px-16`
- Inner padding: `px-6 py-20 sm:px-10 lg:px-16` on `mx-auto max-w-6xl` wrappers
- Grid gaps: `gap-16` for two-column section grids

---

## 6. Background Textures

### Blueprint Grid

Applied to heroes, dark CTAs, and selected intelligence sections. All grids use **24px × 24px** pitch so lines align across sections.

```tsx
// On light surfaces — teal tint
style={{
  backgroundImage:
    "linear-gradient(to right, rgba(8,124,131,0.07) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.07) 0.5px, transparent 0.5px)",
  backgroundSize: "24px 24px"
}}

// On dark surfaces — quiet core-teal tint
style={{
  backgroundImage:
    "linear-gradient(to right, rgba(8,124,131,0.08) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(8,124,131,0.08) 0.5px, transparent 0.5px)",
  backgroundSize: "24px 24px"
}}
```

### Film Grain

Add the `grain` Tailwind class to `secondary` and dark breakout sections. Defined in `globals.css` as a 2–3% opacity SVG noise filter over the background.

### Intelligence Mist

Use localized aqua atmosphere around network fields, telemetry, or simulation outputs. Never wash the whole canvas.

```tsx
background: `radial-gradient(
  ellipse 55% 48% at 52% 48%,
  rgba(88,201,197,0.18) 0%,
  rgba(166,226,223,0.12) 34%,
  rgba(225,243,241,0.08) 52%,
  transparent 76%
)`
```

---

## 7. Components

### Buttons

```tsx
// Primary — solid petrol with a turquoise precision line
<a className="inline-flex items-center justify-center px-5 py-2.5
              bg-primary font-sans text-title-sm font-medium text-white
              transition-colors duration-150 hover:bg-primary-container"
   style={{ boxShadow: "inset 0 -0.5px 0 0 #13AAA5" }}>
  Book a Demo
</a>

// Ghost — hairline outline, no fill
<a className="inline-flex items-center justify-center px-5 py-2.5
              font-sans text-title-sm font-medium text-white
              transition-colors duration-150 hover:bg-white/10"
   style={{ border: "0.5px solid rgba(255,255,255,0.5)" }}>
  See How It Works
</a>
```

### Eyebrow Badge

```tsx
// On light background
<span className="inline-flex items-center gap-2 px-3 py-1 mb-8"
      style={{ borderLeft: "2px solid #13AAA5", background: "rgba(0,46,53,0.06)" }}>
  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
    Label Text
  </span>
</span>

// On dark background
<span className="inline-flex items-center gap-2 border-l-2 border-tertiary bg-primary/80 px-3 py-1">
  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
    Label Text
  </span>
</span>
```

### Tonal Chip (Sensor / Input Node)

```tsx
<div className="flex flex-col items-center gap-2 p-3"
     style={{ background: "rgba(0,46,53,0.12)", border: "0.5px solid rgba(0,46,53,0.2)" }}>
  <Icon className="h-5 w-5 text-primary" />
  <span className="text-center font-sans text-[8px] font-bold uppercase tracking-[0.06em] text-primary/70">
    Label
  </span>
</div>
```

### Dark Panel (Chart / Data Card)

```tsx
<div className="grain p-8"
     style={{ background: "#0F172A", border: "0.5px solid rgba(88,201,197,0.28)" }}>
  {/* content */}
</div>
```

---

## 8. Animation System

### Scroll Fly-In (SolutionScroll pattern)

Cards enter from alternate sides using `IntersectionObserver` + inline styles. **Never use dynamic Tailwind class names for animations** — Tailwind purges unused classes at build.

```tsx
// Double RAF before observer setup to guarantee initial opacity:0 paint
useEffect(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // set up IntersectionObserver here
    });
  });
}, []);

// Inline style (not Tailwind dynamic classes)
style={{
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : flyFrom, // "translateX(-90px)" or "translateX(90px)"
  transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
}}
```

### Active Card Highlight (centre-zone detection)

```tsx
// rootMargin shrinks the trigger zone to the centre third of the viewport
const observer = new IntersectionObserver(callback, {
  rootMargin: "-22% 0px -22% 0px",
  threshold: 0
});

// Active state styles
boxShadow: active
  ? `0 20px 60px rgba(0,0,0,0.35), inset 0 0 0 0.5px ${accentColor}40`
  : "0 4px 24px rgba(0,0,0,0.2)",
opacity: active ? 1 : 0.6,
transform: active ? "scale(1.025)" : "scale(1)",
```

### SVG Line Draw (PEF chart)

```css
/* globals.css */
.pef-line-draw {
  stroke-dasharray: 580;
  stroke-dashoffset: 580;
  animation: pef-draw 2.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
}

@keyframes pef-draw {
  to { stroke-dashoffset: 0; }
}

.pef-area-fade {
  opacity: 0;
  animation: pef-fade 0.8s ease-out 2.4s forwards;
}

@keyframes pef-fade {
  to { opacity: 1; }
}
```

### Animated Dashed Lines (convergence)

```tsx
<line ...>
  <animate
    attributeName="stroke-dashoffset"
    values="0;-54;0"
    dur="2.5s"
    repeatCount="indefinite"
  />
</line>
```

### Hero Reveal

Classes `hero-reveal`, `delay-1`, `delay-2`, `delay-3` — defined in `globals.css`. Slide up + fade in on page load.

### Reduced Motion

All animations must have `@media (prefers-reduced-motion: reduce)` overrides in `globals.css`.

---

## 9. Do's and Don'ts

### Do
- **Sharp edges everywhere** — 0px border-radius on all layout elements. Pills in the logo are the only exception (they use rx=10 in SVG, which is intentional mark geometry).
- **0.5px hairlines** — `style={{ border: "0.5px solid ..." }}` for all structural lines.
- **24px blueprint grids** — keep grid pitch consistent across all sections so lines visually continue.
- **Tonal layering** — use surface hierarchy to create depth, not shadows.
- **Turquoise as intelligence** — use it for sensing, signal paths, analysis, simulations, charts, and selected states.
- **Aqua as live signal** — brighter aqua marks motion, active telemetry, and information arriving in real time.
- **Petrol stays dominant** — authority and industrial credibility come from the deep anchor colour.
- **Inline styles for animations** — Tailwind purges dynamic class names; always use `style={{ ... }}` for scroll-driven transitions.

### Don't
- **No rounded corners** on UI components (buttons, cards, inputs, chips).
- **No 1px borders** — always 0.5px.
- **No standard drop shadows** — use `float` or `ambient` shadow tokens (teal-tinted, massive blur, ultra-low opacity) or tonal layering.
- **No dynamic Tailwind classes for animations** — they will be purged at build.
- **Don't turn the site tropical or neon** — turquoise should illuminate the system, not become every large surface.
- **Don't use extra-bold as the default heading weight** — reserve 800 for data and rare emphasis.
