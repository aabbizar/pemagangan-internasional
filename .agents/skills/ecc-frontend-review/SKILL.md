---
name: ecc-frontend-review
description: Curated ECC frontend architecture, code review, and quality verification skill. Use to review Next.js components, TypeScript type safety, accessibility standards, and production build integrity before shipping code.
---

# ECC Frontend Review & Verification

Adapted from the Everything Coding System (ECC) by Affaan Mustafa. This skill enforces rigorous engineering verification across frontend codebases.

---

## 1. Automated Verification Sequence
Whenever adding, refactoring, or verifying features:
1. **Type Check:** Run `npm run build` or `npx tsc --noEmit` to verify 0 type errors.
2. **Metadata & Viewport Check:** Ensure `viewport` is exported separately from `metadata` in Next.js 15+ App Router.
3. **Hydration Audit:** Verify there are no client/server markup mismatches or direct `window` references during SSR.
4. **Bundle Cleanliness:** Ensure all imports resolve correctly with import alias `@/*`.

---

## 2. Review Checklist
- **Component Architecture:**
  - Are client components properly tagged with `"use client"`?
  - Are common UI components modular and isolated in `src/components/ui/`?
  - Is dummy/mock data separated into `src/constants/`?
- **Accessibility & UX:**
  - Do interactive elements have appropriate ARIA attributes (`aria-expanded`, `aria-label`, `role`)?
  - Is form input properly accessible via keyboard navigation?
  - Are focus indicators clearly visible (`focus-visible:ring-2`)?
- **Code Cleanliness:**
  - Zero unused imports or dead code.
  - No `console.log` left behind in production paths.
  - Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
