# AETHEREAL EXECUTION BLUEPRINT

**Status:** Implementation-Ready Blueprint  
**Objective:** Define exact architectural parameters for the 5-Chapter redesign, leaving zero ambiguity for the engineering phase.

---

## CHAPTER 01: MANIFESTO

**Goal:** Establish sovereign authority instantly upon load. No marketing, no soft landings. A brutalist, monumental statement of national intent.

**Layout Structure:** Full viewport height (`100vh`). Asymmetrical grid. Content pushed to the bottom and left, leaving immense negative space above.

**Content Hierarchy:**
1. Archival Metadata (Top left eyebrow, small).
2. The Manifesto (Colossal display text).
3. The Decree (Small, stark descriptive text block).

**Typography Hierarchy:**
- Manifesto: `Syncopate`, `10vw` to `12vw`, uppercase, extremely tight tracking (`tracking-tighter`), `leading-[0.8]`.
- Metadata: `monospace`, `10px`, uppercase, wide tracking (`tracking-widest`).
- Decree: `Helvetica Neue`, `16px`, `leading-relaxed`, maximum width `45ch`.

**Image Strategy:** Deep background. Heavy industrial noise overlay (`opacity-0.05`). A high-contrast, desaturated full-bleed background video or image (e.g., heavy machinery, slow-moving port infrastructure) heavily darkened by `#121212` overlays.

**Scroll Behavior:** Sticky pin. As the user scrolls, the background and Manifesto pin to the screen while Chapter 02 slides up over it.

**Motion Behavior:** 
- Load: Slow vertical reveal of the Manifesto (clip-path or staggering lines, 1.5s duration).
- Scroll: Extreme Z-axis parallax on the background image.

**Desktop Layout:** Left-aligned text block. Right side is entirely negative space.
**Tablet Layout:** Text scales down slightly. Maintains left alignment.
**Mobile Layout:** Text fills the width. Words intentionally break across lines for brutalist impact.

**Accessibility Notes:** The background image/video must not interfere with the contrast of the manifesto text. Ensure contrast ratio exceeds 7:1 (AAA).
**Anti AI Slop Notes:** ZERO call-to-action buttons here. No "Come join us" buttons. No bouncing arrows pointing down. 

---

## CHAPTER 02: PURPOSE (Why International Apprenticeship Exists)

**Goal:** Present the logical, objective necessity of the program. 

**Layout Structure:** Stark white/Stone concrete background. A split screen layout (50/50). Left side sticky, right side scrolling.

**Content Hierarchy:**
1. Chapter Numeral (`02`).
2. Core Thesis (Large pull quote).
3. Three distinct arguments (Qualifications, Career, System) presented as heavy typographic blocks, not cards.

**Typography Hierarchy:**
- Chapter Numeral: `Syncopate`, `8vw`, `text-transparent`, stroke only (outline).
- Core Thesis: `Syncopate`, `36px`, uppercase, `leading-tight`.
- Argument Titles: `Helvetica Neue`, `24px`, bold.
- Argument Body: `Helvetica Neue`, `15px`, light.

**Image Strategy:** Minimal. High-contrast, black-and-white portraits of intense focus or blueprint/schematic textures.

**Scroll Behavior:** The Left side (Core Thesis and Numeral) pins. The Right side (the three arguments) scrolls vertically past it.

**Motion Behavior:** Subtle fade-ups on the argument blocks as they enter the viewport. No bouncing.

**Desktop Layout:** 50/50 vertical split.
**Tablet Layout:** 100% width, sequential flow (Thesis, then arguments below).
**Mobile Layout:** Tight vertical padding, hairline borders separating arguments.

**Accessibility Notes:** Use semantic `<article>` or `<section>` tags for the arguments. Ensure the outline text is hidden from screen readers, providing a visually hidden fallback.
**Anti AI Slop Notes:** Delete the 3-column card grid. No Lucide icons. Information must look like a dossier, not a SaaS feature list.

---

## CHAPTER 03: HUMAN JOURNEY

**Goal:** Map the rigorous transformation from local talent to global worker.

**Layout Structure:** A vertical, asymmetrical timeline. No standard timeline nodes or dots. Heavy horizontal hairline borders separating each phase.

**Content Hierarchy:**
1. Phase Identifier (e.g., `PHASE I. PREPARATION`).
2. Phase Objective.
3. Spatial image representing the phase.

**Typography Hierarchy:**
- Phase Identifier: `monospace`, `12px`, uppercase.
- Phase Objective: `Helvetica Neue`, `48px`, bold, tight tracking.

**Image Strategy:** Asymmetrical placements. Some images are tall and narrow (`3:4`), others are wide (`16:9`). Images overlap text boundaries slightly to break the grid. Subject matter: Visceral, real human effort (welding, language study, airport departure).

**Scroll Behavior:** Native smooth scroll.
**Motion Behavior:** Images have subtle parallax (moving slower than the scroll speed) within their containers.

**Desktop Layout:** Staggered zig-zag placement of images and text blocks.
**Tablet Layout:** Centralized axis, images full width.
**Mobile Layout:** Strict vertical stack. Heavy borders (`1px solid #121212`) between phases.

**Accessibility Notes:** Ensure images have deeply descriptive alt text conveying the emotion of the journey.
**Anti AI Slop Notes:** Do not use glowing dots or standard "step 1, step 2" startup timelines. Treat it like chapters in an architecture book.

---

## CHAPTER 04: INSTITUTIONAL NETWORK

**Goal:** Establish overwhelming authority through international partnerships without looking like a "Trusted By" SaaS logo strip.

**Layout Structure:** A massive, full-width typographic marquee or a dense, structured list (like a museum sponsor wall).

**Content Hierarchy:**
1. Sovereign Partners (Japan, Germany, Korea).
2. Associated Ministries & Accreditations.

**Typography Hierarchy:**
- Partner Nations: `Syncopate`, `6vw`, uppercase.
- Accreditations: `Helvetica Neue`, `16px`, regular.

**Image Strategy:** No photos. Pure typography. Possibly subtle vector flags or national emblems treated in pure monochromatic `#121212`.

**Scroll Behavior:** Horizontal translation tied to vertical scroll (ScrollTrigger).
**Motion Behavior:** As the user scrolls down, the massive text moves horizontally across the screen.

**Desktop Layout:** Full bleed horizontal marquee.
**Tablet Layout:** Same, text scales accordingly.
**Mobile Layout:** Text scales down but breaks edges intentionally to show continuation.

**Accessibility Notes:** Marquees can cause motion sickness. Respect `prefers-reduced-motion` by disabling the horizontal movement and defaulting to a static grid.
**Anti AI Slop Notes:** Zero generic gray logos in a flex row. No "Trusted by 10,000+ companies" language.

---

## CHAPTER 05: NATIONAL COMMITMENT

**Goal:** The final authoritative decree and the ultimate conversion point.

**Layout Structure:** `100vh` height. Absolute center alignment. Deep Sovereign Navy (`#0A1C33`) background.

**Content Hierarchy:**
1. The Final Pledge.
2. The Action (The only CTA on the entire page).
3. Footer metadata.

**Typography Hierarchy:**
- The Pledge: `Syncopate`, `4vw`, uppercase, centered.
- The Action: `monospace`, `14px`, uppercase, bold.

**Image Strategy:** None. Pure color, noise texture, and typography.

**Scroll Behavior:** The "Reveal". The previous chapter scrolls up to reveal this chapter sitting fixed at the bottom of the stack (z-index: -1).

**Motion Behavior:** None on the text. The motion is the curtain-reveal effect of the scroll.

**Desktop Layout:** Centered, vast negative space.
**Tablet Layout:** Centered.
**Mobile Layout:** Centered, text scaled for readability.

**Accessibility Notes:** The single CTA must have massive contrast, massive hit area, and perfect focus management.
**Anti AI Slop Notes:** The CTA cannot say "Sign Up" or "Join Now". It must say something authoritative like "INITIATE PROTOCOL" or "ACCESS REGISTRY". No cartoonish footers.
