# HANDOVER REPORT: Platform Pemagangan Internasional Kemnaker RI

**Dokumen ini dibuat untuk memberikan konteks menyeluruh mengenai arsitektur, fitur baru, struktur dashboard 2-level, dan panduan teknis kepada pengembang atau agen AI lain.**

---

## 1. Project Overview & Status
- **Nama Proyek:** Portal Pemagangan Internasional — Ditjen Binalavotas, Kementerian Ketenagakerjaan RI.
- **Fase Saat Ini:** Phase 2C (Arsitektur Landing Page Lengkap, Roadmap Timeline, & Cleopatra Dashboard 2-Level).
- **Quality Standard:**
  - Strict WCAG 2.1 Level AA Accessibility (contrast, focus states, skip-links).
  - **0 TypeScript Errors** (`npx tsc --noEmit` verified).
  - Responsive across all devices (Mobile, Tablet Android/iPad iOS, Laptop, Ultra-wide).

---

## 2. Arsitektur Landing Page (Order & Tata Letak Terkini)
Berdasarkan prinsip **User Psychology & Conversion Rate Optimization (CRO)**, tata letak urutan section pada landing page (`src/app/page.tsx`) telah distandarisasi sebagai berikut:

1. **Chapter 01: Manifesto (`Chapter01Manifesto`)**
   - Hero Hook, WebGL Shader background, 3D GlyphPortal "TALENTA", Primary Call-To-Action ("Mulai Langkahmu").
2. **Chapter 02: Purpose & Qualification (`Chapter02Purpose`)**
   - Horizontal slides & 5 stacking cards: Program Magang Bilateral, Bekerja Legal SSW, Pelatihan Hybrid Daring/Luring, Syarat Masuk (IQ min. 92, Sertifikasi Bahasa, Domisili seluruh Indonesia kecuali Papua & Makassar).
3. **Chapter Timeline (NEW): Roadmap 5 Tahapan Resmi (`ChapterTimeline`)**
   - Diletakkan tepat setelah Chapter 02 untuk menjawab alur proses kandidat dari nol hingga berangkat:
     - *Tahap 01:* Asesmen & Registrasi Mandiri (Validasi NIK Dukcapil & Tes IQ).
     - *Tahap 02:* Pelatihan Vokasi Hybrid (80% LMS Daring + 20% Pembekalan Luring).
     - *Tahap 03:* Ujian Akhir Semester & Sertifikasi Bahasa (JLPT N4 / Goethe / TOPIK).
     - *Tahap 04:* Matching Industri & Wawancara Delegasi User Asing.
     - *Tahap 05:* Penerbitan COE, Kontrak Bilateral, Visa & Pelepasan Resmi.
4. **Chapter 03: Human Journey (`Chapter03HumanJourney`)**
   - Nilai Keunggulan & Benefit: Jaringan Resmi Terpercaya, Akses LMS Penuh 1.5 Juta, Kurikulum Hybrid 80/20.
5. **Chapter 04: Global Network (`Chapter04Network`)**
   - 3D *Works Wheel* menampilkan jejaring mitra dan negara penempatan (Jepang JITCO/IM Japan, Jerman IHK/Ausbildung, Korea Selatan HRD).
6. **Chapter 05: Commitment & Legalitas (`Chapter05Commitment`)**
   - *About Us* resmi Ditjen Binalavotas Kemnaker RI, 3 pilar integritas (Transparansi, Standar Vokasi Global, Penempatan Resmi Bebas Calo).
   - *Catatan Senior UX:* Tetap dipertahankan di bagian bawah sebelum footer sebagai **Trust & Authority Closer**.

---

## 3. Cleopatra Dashboard System (Identik dengan Screenshot moesaid.github.io/cleopatra/pages/)
Dashboard kini menggunakan arsitektur dan aset otentik **Cleopatra UI 2.0**:

### Layout & Navigasi (Cleopatra Shell)
- **Top Navbar:** 
  - Logo Cleopatra & teks brand (lebar 260px sesuai sidebar).
  - Tombol sidebar toggle & menu horizontal (`Home`, `Portal Peserta`, `Components`, `Alerts`, `Email`).
  - Quick role switcher button (`👑 Super Admin` / `🎓 Peserta Magang`).
  - Search icon, Notifikasi lonceng dengan *red dot*, App grid switcher (3x3), Theme switcher, dan User Avatar (`/images/user1.jpg`).
- **Sidebar 260px (Pure White Clean Theme):**
  - Section `Dashboards` (+/-): `Analytics Dashboard` (Cyan-pill active), `Portal Peserta Magang`, `Mission Control`, `ECommerce`, `Crypto Dashboard`.
  - Section `APPS`: `Email`, `Calendar`, `AI Chat`, `User Management`, `Todo`, `Retail Store`, `CRM`, `Inventory`, `Real Estate`.
  - Section `EXTRA`: `Error Pages`, `Authentication`, `Utility Pages`.

### Halaman Super Admin (`/dashboard`)
1. **Header:** Title `Dashboard` + `Live` cyan badge + `Overview Of Your Financial Performance` + Date Range Picker (`Jan 20 - Feb 09, 2026`) + Filter + Tombol `Download Report` (Teal `#0096a6`).
2. **4 KPI Sparkline Cards:**
   - *Total Revenue:* `$45,231.89` (+20.1% Vs Last Month) + Wave Sparkline.
   - *Subscriptions:* `+2,350` (+180.1% From Last Month) + Sparkline & Tooltip `Series-1: $510`.
   - *Bounce Rate:* `12.5%` (-4.0% From Last Week) + Downward Sparkline.
   - *Active Now:* `+573` (Pulsing green dot) + `+201 Since Last Hour`.
3. **Middle Row (2:1 Grid):**
   - *Revenue Overview:* Segmented tabs (`Overview`, `Analytics`, `Reports`, `Notifications`) + 12 Monthly Bar Charts (Jan - Dec) dari `$0K` hingga `$60K` warna teal `#0096a6`.
   - *Sales By Country:* Progress bar horizontal untuk US (45%), GB (28%), DE (15%), FR (8%), Other (4%).
4. **Bottom Row (2:1 Grid):**
   - *Recent Transactions:* Dense table dengan avatar customer (`OM`, `JL`, `IN`, `WK`), search bar, status badges (`Paid`, `Pending`), dan nilai transaksi.
   - *Monthly Target:* Circular gauge progress ring (83% Completed), `$12,450` Earned / `$15,000` Goal, linear progress bar, dan tombol `View Details`.

### Halaman Peserta Magang (`/dashboard/peserta`)
- Memakai shell Cleopatra yang sama dengan tampilan personalisasi kandidat:
  - Header data peserta & nomor registrasi resmi.
  - Stepper alur 5 tahapan (68% Pelatihan LMS Selesai).
  - 4 Kartu KPI (Skor IQ 114, Bahasa JLPT N4, 34/50 Modul LMS, Diklat Luring 15 Okt 2026).
  - Tab Kurikulum LMS Hybrid, Validasi Berkas Dukcapil/Dapodik, dan Matching Industri User Jepang.

---

## 4. Alur Autentikasi & Registrasi (`/login`)
- **Split-Card Modern UI:** Live shader background, kartu animasi transisi slide halus antara mode Login dan Register.
- **Quick Demo Chips:** Tombol 1-klik untuk mengisi kredensial Super Admin atau Peserta Magang untuk kebutuhan testing cepat.
- **Input OTP 6-Digit:** InputOTP terstandar dengan countdown 30 detik dan pengisian otomatis demo (`123456`).
- **Pemisahan Peran Tegas (RBAC):**
  - Form Register hanya dapat membuat akun **Peserta Magang**.
  - Catatan resmi tercantum bahwa akun Super Admin hanya dikonfigurasi melalui developer environment.

---

## 5. Direktori & File Kunci
- [`src/app/page.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/app/page.tsx): Main landing page with reordered chapters.
- [`src/components/landing/chapter-timeline.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/landing/chapter-timeline.tsx): 5-step roadmap interactive timeline.
- [`src/app/dashboard/page.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/app/dashboard/page.tsx): Cleopatra Super Admin Dashboard.
- [`src/app/dashboard/peserta/page.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/app/dashboard/peserta/page.tsx): Cleopatra Peserta Magang Dashboard.
- [`src/components/dashboard/dashboard-layout.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/components/dashboard/dashboard-layout.tsx): Shared Cleopatra layout with dynamic role navigation.
- [`src/features/auth/auth-form.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/features/auth/auth-form.tsx): Dual-role authentication form.
- [`src/features/auth/register-form.tsx`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/features/auth/register-form.tsx): Participant registration with instant dashboard routing.
- [`src/lib/auth-session.ts`](file:///c:/Users/aabbizar/Documents/antigravity/pemagangan_paasep/src/lib/auth-session.ts): Cookie-backed session store with name and role support.
