# Frontend Architecture Specification
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | ARCH-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Approved Architectural Blueprint |
| **Penyusun** | Senior Frontend Architect & Staff UX Engineer |
| **Tech Stack** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, Sonner, Number Flow, Input OTP |

---

## 1. Arsitektur Komponen & Pola Desain (System Overview)

Platform ini mengadopsi prinsip **Frontend-First Modular Architecture**. Desain sistem memisahkan secara tegas antara penyajian konten visual (UI Presentation Layer), logika interaksi pengguna (State & Interaction Layer), dan definisi data simulasi (Mock & Model Layer).

Pemisahan ini menjamin bahwa ketika Phase 2 dimulai (penambahan backend API, database PostgreSQL, dan integrasi SSO SIAPkerja), tim pengembang hanya perlu menukar adapter di `src/lib/` dan `src/features/` tanpa merombak struktur komponen tampilan yang telah disetujui eksekutif.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Arsitektur Tiga Lapis                           │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Presentation Layer (src/components/ & src/app/)                     │
│    ├── Landing Page Sections (Hero, About, Journey, Stats, FAQ)        │
│    ├── UI Primitives (Button, Badge, Accordion, Card, Input)           │
│    └── Shared Layouts (Navbar, Footer, Container)                      │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Feature & Domain Layer (src/features/ & src/hooks/)                 │
│    ├── Auth Simulated Feature (OTP Input, Session Mock, Validation)    │
│    ├── Journey Liveline Feature (Interactive step selector)            │
│    └── Number Counter Hook & Trigger Viewport Management               │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Foundation & Contract Layer (src/constants/, src/types/, src/lib/)   │
│    ├── Realistic Mock Datasets (Programs, Stats, Journey Steps, FAQs)  │
│    ├── Strict TypeScript Definitions (Participant, Batch, Metric)      │
│    └── Utilities (cn helper, motion variants, formatting helpers)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Struktur Direktori Proyek (Folder Structure)

Struktur direktori dirancang dengan rapi, modular, dan dapat diskalakan ke aplikasi berskala nasional:

```
pemagangan_paasep/
├── docs/                                 # Dokumentasi Arsitektur & Produk
│   ├── prd.md                            # Product Requirements Document
│   ├── poc.md                            # Proof of Concept Specification
│   ├── sitemap.md                        # Information Architecture & Sitemap
│   ├── user-flow.md                      # Diagram Alur Pengguna (Mermaid)
│   ├── design-system.md                  # Design System & Token Palet
│   └── frontend-architecture.md          # Arsitektur Frontend & Pola Kode
├── public/                               # Aset Statis Publik (Favicon, Logo Kemnaker, Badge SVG)
│   ├── logo-kemnaker.svg
│   └── og-image.png
├── src/
│   ├── app/                              # Next.js 15 App Router Routes
│   │   ├── layout.tsx                    # Root Layout (Geist Sans, Providers, Sonner Toaster)
│   │   ├── page.tsx                      # Landing Page Tunggal (5 Seksi Lengkap)
│   │   ├── login/
│   │   │   └── page.tsx                  # Halaman Otentikasi Simulasi OTP
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Halaman Mock Dashboard Eksekutif
│   │   ├── globals.css                   # Tailwind CSS v4 Directives & Variabel Warna
│   │   ├── favicon.ico
│   │   ├── robots.ts                     # SEO Crawler Rules
│   │   └── sitemap.ts                    # Dynamic XML Sitemap Generation
│   ├── components/                       # Komponen Antarmuka Terisolasi
│   │   ├── common/                       # Komponen Global (Navbar, Footer, ThemeToggle)
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── section-header.tsx
│   │   ├── landing/                      # 5 Seksi Khusus Landing Page
│   │   │   ├── hero-section.tsx          # Section 01: Hero Kenegaraan
│   │   │   ├── about-section.tsx         # Section 02: 4 Pilar Manfaat Vokasi
│   │   │   ├── journey-section.tsx       # Section 03: Alur 5 Tahap Liveline
│   │   │   ├── stats-section.tsx         # Section 04: Statistik Number Flow
│   │   │   └── faq-section.tsx           # Section 05: Accordion FAQ & Closing Banner
│   │   └── ui/                           # Primitif Desain (shadcn/ui compatible)
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── accordion.tsx
│   │       ├── input.tsx
│   │       └── input-otp.tsx
│   ├── features/                         # Modul Fungsional Spesifik
│   │   └── auth/
│   │       ├── auth-form.tsx             # Form Input Email + OTP Multi-Step
│   │       └── auth-context.tsx          # Client-side Mock Session Provider
│   ├── hooks/                            # Custom React Hooks
│   │   ├── use-in-view.ts                # Intersection Observer untuk Scroll Animation
│   │   └── use-countdown.ts              # Timer Countdown Kirim Ulang OTP
│   ├── lib/                              # Fungsi Utilitas Murni
│   │   ├── utils.ts                      # ClassNames Merger (clsx + tailwind-merge)
│   │   └── motion.ts                     # Reusable Motion Variants & Transition Presets
│   ├── types/                            # Definisi Tipe TypeScript Global
│   │   ├── navigation.ts
│   │   ├── program.ts
│   │   ├── statistic.ts
│   │   ├── faq.ts
│   │   └── auth.ts
│   └── constants/                        # Data Dummy Realistis & Konfigurasi Statis
│       ├── navigation-links.ts
│       ├── program-benefits.ts
│       ├── journey-steps.ts
│       ├── metrics-data.ts
│       └── faq-data.ts
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 3. Strategi Manajemen State (State Management Strategy)

1. **Server State & Static Content**:
   - Konten landing page (teks pilar, daftar alur langkah 01–05, data statistik historis, pertanyaan FAQ) dikelola secara deklaratif di `src/constants/`. Ini memastikan nol *waterfall fetch* dan indeksasi instan oleh mesin perayap (crawler).
2. **Local Component State (`useState`, `useReducer`)**:
   - Accordion FAQ menggunakan *uncontrolled / controlled hybrid state* untuk ekspansi item yang mulus.
   - Status pemilihan langkah aktif pada alur *Liveline* (`activeStepId: number`).
3. **Transient UI State (Auth Flow)**:
   - Alur masuk pada `/login` dikelola dengan state mesin dua langkah:
     - `step: 'EMAIL' | 'OTP' | 'SUCCESS'`
     - `email: string`
     - `otp: string`
     - `isSubmitting: boolean`
   - Data sesi disimpan sementara di memori browser (`sessionStorage` atau React Context) untuk mensimulasikan otentikasi saat berpindah rute ke `/dashboard`.
4. **Toast Feedback Dispatching**:
   - Menggunakan `sonner` via fungsi `toast.success()`, `toast.error()`, dan `toast.info()` yang dapat dipanggil dari mana saja tanpa *prop drilling*.

---

## 4. Hierarki Komponen Landing Page (Component Hierarchy)

```
RootLayout (src/app/layout.tsx)
 ├── Preloader (src/components/common/preloader.tsx)
 ├── NoiseOverlay (src/components/common/noise-overlay.tsx)
 ├── SmoothScrollProvider (src/components/common/smooth-scroll.tsx - Lenis)
 ├── Navbar (src/components/common/navbar.tsx)
 ├── Wrapper (src/app/page.tsx - Margin Bottom 75vh)
 │    ├── HeroSection (src/components/landing/hero-section.tsx)
 │    ├── AboutSection (src/components/landing/about-section.tsx - Sticky Card Stack)
 │    ├── JourneySection (src/components/landing/journey-section.tsx - Liveline)
 │    ├── StatsSection (src/components/landing/stats-section.tsx - Number Flow)
 │    └── FaqSection (src/components/landing/faq-section.tsx - Accordion & Final CTA)
 ├── Footer (src/components/common/footer.tsx - Sticky Reveal)
 └── Toaster (sonner)
```

---

## 5. Strategi Rendering (Rendering Strategy)

- **Landing Page (`/`)**: Hybrid Server-First Rendering. Struktur dokumen HTML utama di-render di server untuk memberikan First Contentful Paint (FCP) di bawah 800ms. Elemen interaktif (Number Flow, Liveline cursor, Accordion) di-hydrate secara selektif sebagai React 19 Client Components dengan boundary `"use client"`.
- **Halaman Login (`/login`)**: Dynamic Client Component yang berinteraksi langsung dengan event keyboard, clipboard paste OTP, dan timing countdown.
- **Halaman Dashboard (`/dashboard`)**: Client-side state protected mock view yang memeriksa ketersediaan sesi demo.

---

## 6. Optimasi Performa (Performance Optimization)

1. **Zero External Font Blocking**: Menggunakan `next/font/google` atau font lokal Geist Sans yang di-subset otomatis, menghindari pergeseran tata letak kumulatif (*Cumulative Layout Shift = 0*).
2. **Komposisi Vektor SVG Murni**: Ikonografi menggunakan `lucide-react` dengan tree-shaking otomatis dan grafik kurva Liveline berbasis formula SVG path matematis tanpa unduhan aset gambar raster raksasa.
3. **CSS Bundle Ultra Ramping via Tailwind CSS v4**: Menggunakan engine Tailwind CSS v4 berbasis Oxide yang hanya mengompilasi utility class yang digunakan, menghasilkan file CSS final < 25 KB.
4. **Isolasi Rerender**: Komponen penghitung Number Flow diisolasi dalam sub-komponen agar perubahan angka frame-by-frame tidak memicu render ulang seksi sekitarnya.

---

## 7. Strategi SEO & Metadata (SEO Strategy)

1. **Semantic OpenGraph & JSON-LD**:
   - `og:title`: *"Pemagangan Internasional – Direktorat Bina Talenta Vokasi Kemnaker RI"*
   - `og:description`: *"Portal resmi program pemagangan luar negeri berstandar industri global bagi lulusan pendidikan vokasi Indonesia bersama Kementerian Ketenagakerjaan RI."*
   - `og:type`: *"website"*
   - Skema JSON-LD terstruktur `GovernmentOrganization` dan `EducationalOccupationalProgram` disematkan di root layout.
2. **Hierarki Judul Ketat**:
   - Tepat satu tag `<h1>` per halaman (di Hero Section).
   - Tag `<h2>` untuk setiap judul seksi utama.
   - Tag `<h3>` untuk sub-fitur atau judul pertanyaan FAQ.
3. **Robots.txt & XML Sitemap**: Dihasilkan secara otomatis melalui API rute `src/app/robots.ts` dan `src/app/sitemap.ts`.

---

## 8. Strategi Aksesibilitas (Accessibility Strategy - WCAG 2.1 AA)

- **Fokus Keyboard Logis**: Urutan Tab mengikuti alur visual alami dari navigasi atas hingga tautan footer.
- **Status ARIA Interaktif**:
  - Accordion menyertakan `aria-expanded` dan `aria-controls`.
  - Input OTP menggunakan `inputmode="numeric"`, `autocomplete="one-time-code"`, serta `aria-label="Digit OTP ke-X"`.
- **Indikator Fokus Visual**: Ring outline kontras tinggi pada setiap elemen yang menerima fokus (`focus-visible:ring-2 focus-visible:ring-accent`).
- **Dukungan Pengurangan Gerak (Prefers-Reduced-Motion)**: Motion variants secara otomatis menonaktifkan transisi pergeseran (*translate*) jika pengguna mengaktifkan pengaturan OS pengurangan animasi.
