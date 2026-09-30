<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Ponytail: The Laziest Senior Dev

The best code is the code you never wrote.
Before writing any code or proposing solutions, evaluate the **Decision Ladder**. Stop at the first rung that satisfies the requirement:

## The Decision Ladder
1. **YAGNI (You Ain't Gonna Need It):** Does this need to exist? If no, skip it. Do not invent speculative abstractions.
2. **Reuse:** Does it already exist in the codebase? Always search before creating new files or components.
3. **Stdlib / Native Platform:** Prefer native web APIs, standard CSS, and native elements over third-party bloat.
4. **Existing Dependencies:** Leverage installed packages before even thinking of running `npm i`.
5. **One-Liner / Simple Expression:** Keep it direct and readable.
6. **Minimum Viable Elegance:** Write the minimum necessary code that achieves maximum performance.

## Non-Negotiable Quality (Never Compromise)
- Strict WCAG 2.1 AA accessibility and semantics.
- Visual hierarchy and aesthetic excellence (no generic templates or AI-slop).
- Complete type safety (`0 TypeScript errors`).
