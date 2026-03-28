# Design System Strategy: Digital Husbandry

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Industrial Architect."** 

Moving away from the soft, rounded "bubble-ui" of the last decade, this system embraces **Digital Husbandry**: the practice of managing complex data with the precision of a master craftsman. It is a visual language of blueprints, high-end instrumentation, and technical rigor. 

We break the "standard template" look by utilizing a strict **0px radius (Sharp Edges)** across all components, creating a sense of structural permanence. Visual interest is not achieved through decorative fluff, but through **intentional asymmetry**, ultra-fine 0.5px hairlines, and technical grid overlays that suggest a layout "under construction" by an expert hand.

## 2. Colors & Surface Logic

This system rejects the "flat" web. We define space through tonal shifts and textural depth rather than borders.

### The Palette
*   **Primary (Petrol Teal - #002E35):** Our anchor. Used for high-intent actions and technical status indicators.
*   **Secondary (Deep Navy - #0F172A):** The "Control Room" color. Used for massive footers, technical sidebars, and high-contrast "Dark Mode" breakouts within a light page.
*   **Tertiary (Gold/Amber - #D4AF37):** The "Pathfinder." Use this sparingly for premium brand moments, critical alerts, and drawing the eye to the most important data point on a screen.
*   **Neutral (Mist - #F8FAFA):** Our expansive technical canvas.

### The "No-Line" Rule
Prohibit the use of standard 1px solid borders for sectioning. Boundaries must be defined by:
1.  **Background Color Shifts:** A `surface-container-low` section sitting against a `surface` background.
2.  **Subtle Tonal Transitions:** Using a `surface-variant` to indicate a clickable area.
3.  **The 0.5px Hairline:** If a line is required for technical "blueprint" aesthetics, it must be `outline-variant` at 0.5px thickness, never 1px.

### Signature Textures
To avoid a sterile look, apply a subtle **film grain texture** (2-3% opacity) over `secondary` and `primary_container` backgrounds. This mimics high-end physical materials and reduces digital banding.

## 3. Typography: The Editorial Voice

We pair the geometric rigor of **Manrope** with the functional clarity of **Inter**.

*   **Display & Headlines (Manrope):** Use a tighter letter-spacing (-0.02em) for `display-lg` to create a bold, "architectural" header style. This font represents the "Industrial" voice—commanding and precise.
*   **Body & Labels (Inter):** Set for maximum legibility. Use `label-md` and `label-sm` for technical metadata, always in ALL CAPS with +0.05em letter spacing to mimic serial numbers on industrial equipment.
*   **Hierarchy:** Use dramatic scale shifts. A `display-lg` headline should often sit adjacent to a `body-sm` metadata tag to create an editorial, high-end magazine feel.

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are forbidden. We use **Tonal Layering** to create a sense of "stacked schematics."

*   **The Layering Principle:** Depth is achieved by nesting. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that feels like stacked paper.
*   **Ambient "Shadows":** If an element must "float" (e.g., a dropdown), use a shadow with a massive blur (32px+) and ultra-low opacity (4% `on-surface`). The shadow should be tinted with Petrol Teal to keep it "in-atmosphere."
*   **Glassmorphism:** For floating overlays or technical chips, use `surface_container` at 80% opacity with a `20px backdrop-blur`. This ensures the UI feels like a high-tech lens over the data.

## 5. Components

### Buttons & Interaction
*   **Primary:** Solid `primary` background, white text, 0px radius. Use a 0.5px `tertiary` bottom-border to signify "Gold Precision."
*   **Secondary:** Ghost style. `outline` color 0.5px border, sharp edges.
*   **States:** On hover, primary buttons should shift to `primary_container`. No "bounce" animations; use linear, 150ms fades to maintain a professional tone.

### Technical Chips
*   **The AI Chip:** A `primary_container` fill with a `tertiary` (Gold) 0.5px left-border. This identifies high-value AI-generated insights.

### Inputs & Fields
*   **Structure:** No four-sided boxes. Use a "bottom-line-only" approach or a very subtle `surface-container-high` fill with a 0.5px `outline` bottom border.
*   **Error State:** Use `error` text, but highlight the field with a `tertiary` (Gold) accent to suggest "Correction Required" rather than "System Failure."

### Cards & Lists
*   **No Dividers:** Forbid the use of horizontal rules between list items. Use spacing (`spacing-4`) or alternating background tints (`surface` to `surface-container-low`) to separate content.
*   **The Grid Overlay:** For hero sections or large cards, watermark a subtle 24px square grid pattern using `outline-variant` at 5% opacity.

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Sharp Edge:** Every corner must be 0px. This is the visual signature of the system.
*   **Use Asymmetry:** Place a label in the far top-right of a container while the headline sits bottom-left. It feels intentional and bespoke.
*   **Use 0.5px Weights:** When lines are necessary, keep them razor-thin to maintain the "Precision" brand promise.

### Don’t:
*   **Don't Use Rounded Corners:** Any radius above 0px violates the "Digital Husbandry" aesthetic.
*   **Don't Use Standard Shadows:** Avoid the "floating box" look of generic material design.
*   **Don't Overuse Gold:** The `tertiary` Amber is a "Pathfinder." If everything is gold, nothing is important. Use it for less than 5% of the total screen real estate.