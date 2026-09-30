---
name: ui-ux-pro-max
description: Elite UI/UX and product design guidelines for web applications, embodying standards from Linear, Stripe, GovTech Singapore, and luxury architectural web design. Use whenever creating, styling, or auditing UI components, landing pages, layouts, and interactive experiences.
---

# UI/UX Pro Max: Elite Design & Component Craft

This skill defines the visual excellence, typography hierarchy, layout heuristics, and interaction design rules required to build world-class web applications.

---

## 1. Core Design Philosophy
- **Radical Intentionality:** Every pixel, margin, and typography scale must have a purpose. No filler elements, no decoration without narrative.
- **Anti-AI Slop:** Reject typical AI-generated landing page tropes (excessive blob gradients, generic centered SaaS cards, floating pastel spheres, cartoon vectors, and cookie-cutter 3-column feature grids).
- **Architectural & Editorial Polish:** Emulate the craft of Linear, Stripe Sessions, Raycast, and GovTech Singapore. Prefer asymmetrical layouts, tactile textures, and monumental typography over boring templates.

---

## 2. Color & Surface Hierarchy
- **Contrast Ratios:** Maintain minimum 4.5:1 for body copy and 3.0:1 for large display elements (compliant with WCAG 2.1 AA/AAA).
- **Tone Pairing:**
  - Primary Sovereign: `#0A2342` (Deep Navy Kemnaker RI)
  - Secondary Action: `#1D4ED8` (Royal Blue Focus)
  - High-Tech Accent: `#06B6D4` (Precision Cyan)
  - Tactile Canvas: `#EAE8E3` (Stone / Architectural Concrete)
  - Deep Surface: `#071322` / `#0C1C31` (Elevated Navy Slate)
- **Subtle Noise & Textures:** Use subtle fractal noise (`opacity-0.04`) to give physical warmth and authenticity to digital surfaces.

---

## 3. Typography Architecture
- **Display Headings (`font-display`):** Use wide, uppercase architectural typefaces (`Syncopate`) with deliberate letter-spacing (`tracking-tight` or `tracking-widest`).
- **Body & Editorial Copy:** Use balanced geometric sans (`Manrope`, `Geist Sans`) with comfortable line-heights (`1.6` - `1.7`) for effortless reading.
- **Monospace Accents:** Use `Geist Mono` for stage numbers (`01`, `02`), dates, OTP slots, and technical metadata.
- **Scale Discipline:** Never guess font sizes. Use consistent modular scales: `Display (64px+)`, `H1 (36-48px)`, `H2 (24-32px)`, `H3 (18-20px)`, `Body (15-16px)`, `Caption (11-13px)`.

---

## 4. Layout Innovations & Signature Patterns
- **Sticky Card Stacking:** Instead of flat 3-card grids, use sticky stack sections (`position: sticky; top: 12vh; height: 78vh;`) where cards stack over one another during scroll.
- **Dynamic Continuous Path (Liveline):** Connect multi-step journeys with an active SVG glowing path that responds dynamically to user interaction.
- **Parallax Footer Reveal:** Place the page inside a `.wrapper` with a large bottom margin (`75vh`), revealing a fixed monumental footer underneath.
- **Number Flow Dynamic Metrics:** Use animated rolling numbers (`@number-flow/react`) triggered on viewport entry for undeniable credibility.

---

## 5. Interaction & Motion Rules
- **Fast & Snappy:** Micro-animations must finish within 150ms to 300ms using snappy spring easings (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **No Scroll Hijacking:** Keep native scroll momentum; augment with buttery smooth scrolling (`lenis`) without trapping user input.
- **Interactive Feedback:** Every clickable element must have active `:hover`, `:active`, and high-contrast `:focus-visible` states.
- **Accessible State Transitions:** Provide feedback using non-intrusive toast notifications (`sonner`) and clear loading spinners.

---

## 6. Heuristic Checklist (Before Delivery)
- [ ] Is every heading paired with an informative, non-lorem-ipsum narrative?
- [ ] Are buttons styled with appropriate visual weight (Primary vs Outline vs Ghost)?
- [ ] Does the page look striking on mobile viewports (375px) without horizontal overflow?
- [ ] Are touch targets at least 44x44px on mobile devices?
- [ ] Does the visual tone feel authoritative, executive-ready, and internationally competitive?
