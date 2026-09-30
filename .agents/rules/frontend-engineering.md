# Frontend Engineering Standards (Curated from ECC)

Adapted from Affaan Mustafa's Everything Coding System (ECC) specifically for modern Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

---

## 1. Component Boundaries & Hydration Rules
- **Server Components by Default:** Keep components as Server Components unless they need client-side reactivity (`useState`, `useEffect`, event listeners, browser APIs).
- **Client Component Leaf Isolation:** Push `"use client"` down to the furthest leaves of the component tree (e.g., interactive buttons, number counters, accordion triggers).
- **Hydration Safety:** Never read `window`, `localStorage`, or `sessionStorage` during initial server render. Guard with `useEffect` or `typeof window !== "undefined"` checks.

---

## 2. TypeScript & Type Hygiene
- **Zero Type Coercion:** Do not use `any`. Use strict interfaces, generics, or Discriminated Unions for state machines (e.g. `type Step = 'email' | 'otp' | 'success'`).
- **Props Typing:** Export explicit interface props (`interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`).
- **No Implicit Globals:** Always import utilities from `@/lib/utils` and types from `@/types`.

---

## 3. Performance & Asset Delivery
- **Zero Cumulative Layout Shift (CLS):** Provide explicit aspect ratios or width/height containers for images, embeds, and dynamic text blocks.
- **Micro-Bundle Principle:** Prefer modular imports and tree-shakeable packages (`lucide-react`, `motion/react`, `lenis`).
- **Turbopack Compatibility:** Ensure all route exports (`metadata`, `viewport`) adhere strictly to Next.js 15 App Router specifications.

---

## 4. Verification Gate (Pre-Commit / Pre-Build)
Before declaring any frontend work complete:
1. Verify type correctness: `npm run build` or `npx tsc --noEmit` must return 0 errors.
2. Check console outputs: No hydration mismatches, no unsupported metadata warnings.
3. Test responsive layout: Verify viewports at 375px (mobile), 768px (tablet), and 1440px (desktop).
