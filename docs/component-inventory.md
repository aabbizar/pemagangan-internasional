# Component Inventory & Design System Catalog

**Project:** International Internship Platform (Talenta Vokasi — Kemnaker RI)  
**Phase:** Phase 1B — Design Freeze  
**Document:** Component Inventory  
**Audience:** Frontend Engineers, UI/UX Designers, Technical Product Managers  
**Date:** September 2026  

---

## 1. Overview & Architectural Philosophy

The International Internship Platform UI architecture is built around modular, decoupled components adhering to the **Ponytail Decision Ladder**:
1. **Reuse before creation:** Components leverage unified design tokens and shared utilities.
2. **Native platform preference:** Native CSS flexbox/grid and standard HTML semantics replace heavy third-party UI libraries.
3. **Enterprise durability:** Components are strictly typed with TypeScript, tested for WCAG 2.1 AA accessibility, and structured to transition into authenticated administrative dashboards in subsequent phases.

---

## 2. Core Component Inventory

### 2.1 Navigation Bar (`Navbar`)

- **Purpose:** Primary application header providing brand identification (Kemnaker Talenta Vokasi), anchor navigation across landing sections, and key call-to-actions ("Admin Access", "Explore"). Adapts seamlessly between transparent initial state and frosted backdrop blur on scroll.
- **Location:**  
  [`src/components/common/navbar.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/common/navbar.tsx)
- **Reusability:** High (100%). Modular header adaptable across all public routes, informational sub-portals, and external links.
- **Future Dashboard Compatibility:**
  - **Shared Header Elements:** The brand mark (`IP / INTERNSHIP PLATFORM`) and responsive drawer pattern will be repurposed as the top horizontal navigation bar for the participant and administrator portal.
  - **Extension Points:** Can easily accept user profile avatar menu, notification bells (`unreadCount`), and role switcher dropdowns (`Peserta`, `Verifikator`, `Superadmin`) in Phase 2A/2B.

---

### 2.2 Hero Section (`HeroSection`)

- **Purpose:** Sovereign introduction communicating the platform's official identity as the vocational talent gateway for international internships. Displays publication-ready validation status badge, main title, mission description, primary actions, and architectural readiness pills.
- **Location:**  
  [`src/components/landing/hero-section.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/hero-section.tsx)
- **Reusability:** Medium (Landing page and campaign splash pages).
- **Future Dashboard Compatibility:**
  - **Dashboard Welcome Banner:** The visual layout (gradient accent glow + abstract SVG grid background + status badges) directly translates into the participant onboarding dashboard hero banner ("Selamat Datang, [Nama Peserta] — Status Pendaftaran: Terverifikasi").
  - **CTA Actions:** Can swap public exploration buttons with dynamic action triggers ("Lanjutkan Dokumen", "Lihat Hasil Seleksi").

---

### 2.3 Overview Cards (`AboutSection` / Sticky Card Stack)

- **Purpose:** Presents 4 modular core pillars (Program Overview, Program Benefits, International Partners, Participant Opportunities) using an architectural sticky stacking card pattern. Replaces traditional infinite scroll fatigue with an engaging stacked card presentation.
- **Location:**  
  [`src/components/landing/about-section.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/about-section.tsx)
- **Reusability:** High. Reusable across educational dossiers, programmatic guidebooks, and institutional partner presentations.
- **Future Dashboard Compatibility:**
  - **Module Detail View:** The split-card layout (`1fr 1.25fr` grid: Left content + Right abstract visual preview) provides the exact template for Program Directory listings, Country Guides (e.g., Japan IM Japan, Germany Ausbildung), and Company Host Profiles in the dashboard.
  - **State Badging:** Built-in publication badges ("Pending Validation", "Under Review", "Approval Pending") directly map to administrative document audit workflows.

---

### 2.4 Liveline Timeline (`Liveline` / `JourneySection`)

- **Purpose:** Interactive 5-stage chronological progression tracking (Registrasi → Seleksi → Pelatihan → Penempatan → Evaluasi). Offers desktop timeline track with animated progress line, node status indicators, and mobile-friendly horizontal pill tab switcher.
- **Location:**  
  [`src/components/ui/liveline.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/ui/liveline.tsx)  
  [`src/components/landing/journey-section.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/journey-section.tsx)
- **Reusability:** Very High (Core Platform Engine).
- **Future Dashboard Compatibility:**
  - **Participant Tracker (Primary Dashboard Feature):** In Phase 2B and beyond, this identical `Liveline` component serves as the participant's live milestone tracker.
  - **Dynamic State Mapping:** Active step ID will bind to real backend status (`currentStep: 3 = Pelatihan Terpusat`), showing completed checkmarks on stages 1–2, active pulse on stage 3, and locked state on stages 4–5.
  - **Milestone Detail Panel:** Right-hand metadata cards already include fields for `Execution Location`, `Key Deliverable`, and `Document Requirements`.

---

### 2.5 Statistics Cards (`StatsSection` / Number Flow Cards)

- **Purpose:** Displays quantifiable platform metrics (Total Participants, Destination Countries, Partner Institutions, Program Success Rate) using real-time animated number transitions (`NumberFlow`) triggered upon viewport intersection.
- **Location:**  
  [`src/components/landing/stats-section.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/stats-section.tsx)
- **Reusability:** High. Usable in landing pages, public reports, and analytic summaries.
- **Future Dashboard Compatibility:**
  - **Admin Analytics KPI Widgets:** Perfectly architected for the Executive Dashboard / Ministry Overview screen.
  - **Data Integration Ready:** The card structure accepts props for dynamic percentage changes (`trend: +12%`), icon slots, time-filter toggles (`Bulan Ini`, `Tahun 2026`), and automated live polling updates without UI redesign.

---

### 2.6 FAQ Accordion (`AccordionItem` / `FaqSection`)

- **Purpose:** Clean, accessible disclosure mechanism for procedural inquiries, operational timelines, and data protection guidelines. Supports single-item expansion with smooth height transitions and full keyboard navigation.
- **Location:**  
  [`src/components/ui/accordion.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/ui/accordion.tsx)  
  [`src/components/landing/faq-section.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/faq-section.tsx)
- **Reusability:** High (Universal UI Primitive).
- **Future Dashboard Compatibility:**
  - **Applicant Help Center & Requirements Checklist:** Used in the participant portal for document submission instructions and visa checklist disclosures.
  - **Admin Verification Notes:** Repurposed in admin review screens to expand applicant validation histories and audit logs.

---

### 2.7 Footer Reveal (`Footer` / Sticky Reveal Effect)

- **Purpose:** Full-bleed fixed footer situated behind the main content wrapper. As the user completes the final section, the content wrapper scrolls away to reveal platform navigation links, compliance credentials, and administrative links.
- **Location:**  
  [`src/components/common/footer.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/common/footer.tsx)
- **Reusability:** High (Standardized across all public landing views).
- **Future Dashboard Compatibility:**
  - **Public vs Internal Separation:** For administrative screens, the sticky reveal is disabled in favor of a compact static footer containing versioning metadata, server health status, and ministry copyright.
  - **Shared Links:** Legal notices, privacy policy, and accessibility statements remain consistent across both layouts.

---

## 3. UI Primitives & Utility Inventory

| Primitive / Utility | File Location | Purpose & Standards |
| :--- | :--- | :--- |
| **`NoiseOverlay`** | `src/components/common/noise-overlay.tsx` | Ultra-subtle SVG fractal noise overlay (4% opacity) providing tactile architectural texture. |
| **`Preloader`** | `src/components/common/preloader.tsx` | Minimalist transition veil ensuring clean visual hydration before revealing page canvas. |
| **`SmoothScrollProvider`** | `src/components/common/smooth-scroll.tsx` | Lenis smooth scroll engine with automatic `prefers-reduced-motion` bypass. |
| **`cn` Utility** | `src/lib/utils.ts` | Tailwind class merger (`clsx` + `tailwind-merge`) avoiding specificity conflicts. |
| **Constants Registry** | `src/constants/index.ts` | Single source of truth for navigation links, journey steps, sample metrics, and publication states. |
| **TypeScript Definitions** | `src/types/index.ts` | Strict data contracts for `JourneyStep`, `MetricItem`, `FaqItem`, and `EditorialStatus`. |

---

## 4. Component Readiness Matrix

| Component | Responsive Tested (320px–1920px) | WCAG 2.1 AA Compliant | Reduced Motion Ready | Dashboard Ready |
| :--- | :---: | :---: | :---: | :---: |
| **Navbar** | Yes | Yes | Yes | Yes |
| **Hero Section** | Yes | Yes | Yes | Yes |
| **About Section** | Yes | Yes | Yes | Yes |
| **Liveline** | Yes | Yes | Yes | Yes |
| **Stats Section** | Yes | Yes | Yes | Yes |
| **Faq Section** | Yes | Yes | Yes | Yes |
| **Footer** | Yes | Yes | Yes | Yes |

*Inventory status: 100% frozen, documented, and verified.*
