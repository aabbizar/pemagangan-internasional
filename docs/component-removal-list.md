# COMPONENT REMOVAL & REFACTORING LIST

**Status:** Implementation-Ready  
**Rule:** Execute this list precisely before writing new layouts.

---

## 1. COMPONENTS TO DELETE (Nuke List)
These components embody the AI-Slop / SaaS aesthetic and must be entirely removed from the codebase.

- `src/components/landing/card-stack-section.tsx` (Reason: SaaS feature cards)
- `src/components/landing/stats-section.tsx` (Reason: Generic number counters in a grid)
- `src/components/landing/faq-section.tsx` (Reason: SaaS accordion tropes)
- `src/components/ui/card.tsx` (Reason: We do not use cards in Aethereal design. We use structural typographic blocks)
- `src/components/ui/accordion.tsx` (Reason: Eradicating hidden information patterns)

---

## 2. COMPONENTS TO REWRITE (Complete Overhaul)
These files represent the core structure but must be completely gutted and rewritten from scratch to match the 5-Chapter Blueprint.

- `src/app/page.tsx`
  - *Action:* Gut the existing 7-section assembly. Replace with the 5 new Chapter components. Implement the global Lenis/ScrollTrigger context here.
- `src/components/landing/hero-section.tsx`
  - *Action:* Rename/Refactor into `chapter-01-manifesto.tsx`. Remove all buttons, badges, and gradients.
- `src/components/landing/about-section.tsx`
  - *Action:* Rename/Refactor into `chapter-02-purpose.tsx`. Destroy the 3-column grid.
- `src/components/landing/journey-section.tsx`
  - *Action:* Rename/Refactor into `chapter-03-human-journey.tsx`. Remove the generic step nodes, implement the asymmetrical vertical scroll path.
- `src/components/landing/final-section.tsx`
  - *Action:* Rename/Refactor into `chapter-05-commitment.tsx`. Implement the z-index -1 sticky footer reveal.

---

## 3. COMPONENTS TO CREATE (Net New)
- `src/components/landing/chapter-04-network.tsx`
  - *Action:* Build the massive typographic horizontal marquee for the institutional partners.

---

## 4. COMPONENTS TO KEEP (With Minor Audits)
These components provide core structural or primitive functionality that survives the redesign.

- `src/components/common/navbar.tsx`
  - *Audit:* Ensure it uses `Syncopate` / `monospace`. Remove any rounded buttons. Ensure sharp corners.
- `src/components/common/noise-overlay.tsx`
  - *Audit:* Ensure it remains at `0.04` opacity and covers the viewport.
- `src/components/ui/button.tsx`
  - *Audit:* Strip `rounded-md` classes. Enforce sharp `rounded-none`. Update hover states to rely on stark contrast (e.g., solid `#121212` inverting to solid `#E3E1DC`) rather than subtle lightness shifts.
- `src/components/ui/badge.tsx`
  - *Audit:* Strip `rounded-full`. Enforce `rounded-none`, `border-black`, `font-mono`.

---

## 5. CSS / CONFIGURATION UPDATES
- `src/app/globals.css`
  - *Action:* Purge old CSS variables (`--surface`, `--muted`, legacy colors). Inject the new `docs/design-tokens-v2.md` palette.
- `tailwind.config.ts` (if applicable) or `@theme` block in `globals.css`
  - *Action:* Hardcode the exact typography stack and 4-color palette to prevent accidental usage of default Tailwind colors (e.g., disable `slate`, `blue`, `indigo`).
