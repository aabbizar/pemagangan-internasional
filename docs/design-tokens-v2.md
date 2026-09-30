# DESIGN TOKENS V2 (AETHEREAL STANDARDS)

**Status:** Implementation-Ready  
**Rule:** These tokens overwrite all previous Tailwind configs and globals.

---

## 1. Color Usage Rules

The palette is ruthlessly restricted. Do not introduce new shades.

- **Stone Concrete Canvas (`#E3E1DC`)**
  - *Usage:* Primary background for the entire application. Replaces white.
- **Deep Charcoal (`#121212`)**
  - *Usage:* Primary text, heavy structural borders, inverted block backgrounds.
- **Deep Sovereign Navy (`#0A1C33`)**
  - *Usage:* Reserved exclusively for the final Chapter (National Commitment) or critical sovereign alerts.
- **Precision Cyan (`#06B6D4`)**
  - *Usage:* Strict limit < 5% of viewport. Used only for micro-accents, `focus-visible` rings, or the active node in a technical liveline.
- **Surface Pure (`#FFFFFF`)**
  - *Usage:* Strictly prohibited unless used inside isolated image masks or high-contrast inverted text blocks over `#121212`.

---

## 2. Typography Scale

Fonts: `Syncopate` (Display), `Helvetica Neue` (Body), `monospace` (Data).

- **Display Colossal:** `10vw` to `12vw` (`leading-[0.85]`, `tracking-tighter`, `uppercase`). Used only for Chapter 01.
- **Display Large:** `6vw` to `8vw` (`leading-[0.9]`, `tracking-tight`, `uppercase`). Used for Chapter numerals and Marquees.
- **Heading 1:** `48px` (`leading-tight`, `tracking-tight`). Primary section headers.
- **Heading 2:** `32px` (`leading-snug`).
- **Body Large:** `20px` (`leading-relaxed`, `font-light`).
- **Body Standard:** `16px` (`leading-relaxed`, `font-regular`).
- **Metadata / Eyebrow:** `10px` to `12px` (`font-mono`, `uppercase`, `tracking-widest`).

---

## 3. Spacing Scale

Rethink spacing. Embrace vast voids.

- **Micro (UI Elements):** `4px`, `8px`, `12px`
- **Component Internal:** `24px`, `32px`
- **Section Structural:** `64px`, `128px`
- **Architectural Voids:** `25vh`, `50vh` (Used to separate thoughts and force the user to scroll through silence).

---

## 4. Container Widths

- **No Constraints:** Backgrounds and structural lines bleed off the edge (`w-full`).
- **Max Content Width:** `max-w-[1440px]` for general alignment.
- **Reading Width:** Text blocks must never exceed `65ch` (characters) for body copy, or `45ch` for large introductory paragraphs.

---

## 5. Border System

- **Rule:** Borders are structural, not decorative.
- **Width:** `1px` ONLY. Hairline.
- **Color:** `#121212` on Stone backgrounds. `rgba(227, 225, 220, 0.15)` on Dark backgrounds.
- **Radius:** `0px` (Sharp corners). NO `rounded-md`, NO `rounded-xl`. The only exception is perfect circles (`rounded-full`) for small functional indicators (e.g., a recording dot or radio button).

---

## 6. Shadow System

- **Rule:** Shadows are strictly prohibited for layout and cards. Layout hierarchy is achieved through lines and contrast, not elevation.
- **Exception:** `shadow-sm` may be used exclusively for floating actionable elements (like a sticky navigation bar or a dropdown menu) to separate them from the scrolling canvas, but it must be harsh and minimal (`0 4px 12px rgba(0,0,0,0.1)`), never soft and diffused.

---

## 7. Noise Usage Rules

- **Texture:** A fractal noise SVG overlay must cover the entire viewport.
- **Opacity:** Maximum `0.04` on Stone backgrounds, `0.06` on Dark backgrounds.
- **Pointer Events:** `pointer-events-none` is mandatory to avoid blocking clicks.
- **Purpose:** To kill the sterility of digital pixels and enforce a print/architectural medium feel.
