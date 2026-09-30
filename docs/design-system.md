# GovTech Design System Specification
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | DS-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Approved Design System Specification |
| **Penyusun** | Principal Product Designer & Staff UX Engineer |
| **Inspirasi Estetika** | Linear, Vercel, Stripe Sessions, GovTech Singapore |

---

> ## ⚠️ NOTIS KANONIS — AETHEREAL (Sept 2026)
>
> **Palet & tipografi pada Bab 2 dan Bab 3 di bawah telah digantikan oleh arah desain AETHEREAL.**
> Dokumen `aethereal-redesign.md` adalah **satu-satunya sumber kebenaran** design token.
>
> | Token | Nilai Kanonis | Catatan |
> | :--- | :--- | :--- |
> | Background / Stone | `#E3E1DC` | Kanvas utama (koreksi dari `#EAE8E3` di dokumen lama) |
> | Dark / Primary | `#121212` | Teks & latar gelap, header, sidebar |
> | Accent / Deep Moss | `#374336` | Aksen tunggal: CTA, seleksi, focus ring |
> | Text on Dark | `#E3E1DC` | Teks di atas latar gelap |
> | Border | `rgba(0,0,0,0.10)` / `border-black/15` | Hairline 1px, tanpa bayangan berat |
> | Display Font | `Syncopate` | Judul monumental, uppercase, tracking longgar |
> | Body Font | `Manrope` | Badan teks |
> | Mono Font | `monospace` | Label eyebrow, kode, metadata `font-mono uppercase` |
>
> ### Palet Status Fungsional (kanonik)
>
> AETHEREAL punya **satu** aksen, tetapi UI admin butuh membedakan status.
> Turunan berikut adalah satu-satunya warna status yang sah — sudah diverifikasi
> ≥ 4.5:1 pada latar `#FFFFFF` maupun tint `/10`. Didefinisikan di
> `src/app/globals.css` sebagai `--c-*` (CSS) dan `--color-*` (Tailwind).
>
> | Status | Latar terang | Latar gelap (`#121212`) | Pemakaian |
> | :--- | :--- | :--- | :--- |
> | Success | `#374336` (`success`) | `#93B492` (`success-lt`) | Terverifikasi, sesi aktif, lulus |
> | Warning | `#856519` (`warning`) | `#D6B05A` (`warning-lt`) | Menunggu, batas waktu menipis |
> | Danger | `#8C3A2E` (`danger`) | `#E08A7B` (`danger-lt`) | Ditolak, gagal, aksi destruktif |
>
> Pakai sebagai `bg-success/10 text-success border-success/30`. Label teks wajib
> ikut terbaca — warna tidak boleh jadi satu-satunya pembawa makna (WCAG 1.4.1).
>
> **Bab 2 (palet `#0A2342` / `#1D4ED8` / `#06B6D4`) dan Bab 3 (Geist) di bawah adalah Arsip (Legacy)** —
> hanya dipertahankan untuk referensi riwayat. Jangan dipakai untuk kode baru.
>
> **Bagian lain yang ikut berstatus Arsip** (nilainya bertentangan dengan AETHEREAL):
>
> - **§5 Border Radius** — skala `rounded-md/lg/xl/2xl/full` digantikan sudut tajam
>   (`rounded-none`) + `border` hairline. Dua pengecualian yang sah:
>   **(a)** `rounded` (4px, `--radius`) untuk kontrol kecil di area admin
>   (tombol, input, item navigasi); **(b)** `rounded-full` **hanya** untuk
>   indikator lingkaran fungsional seperti spinner muat (`animate-spin`) —
>   bukan untuk pill, badge, atau titik status.
> - **§5 Bayangan** — `shadow-subtle/card/elevated` digantikan `shadow-sm` maksimal;
>   perletakan (mis. drawer) dipisah oleh backdrop, bukan bayangan tebal.
> - **§7.1 Button Primary** `#1D4ED8` → `bg-ink text-stone`, hover `bg-moss`.
> - **§7.2 Badge Status** "pill + pulse indicator" → **dilarang** (aethereal-redesign.md
>   §1 menolak badge berdenyut). Ganti stempel mono `border` 1px, sudut tajam.
>   Warna status mengikuti tabel Palet Status Fungsional di atas.
> - **§7.3 Input OTP** aksen `#06B6D4` → `border-moss ring-moss/15`; kursor tidak
>   berdenyut (`animate-pulse` dilarang; WCAG 2.2.2).
> - **§8 sitasi hex** (`#0F172A`, `#1D4ED8`, `#06B6D4`, focus ring cyan) → ganti
>   `#121212` / `#374336`. **Aturan WCAG-nya sendiri tetap berlaku.**
>
> **File yang harus sinkron dengan notis ini:** `src/app/globals.css` (token runtime),
> `ponytail.config.json` (token untuk agent), `docs/aethereal-redesign.md`.

---

## 1. Filosofi Desain (Design Principles)

Platform Pemagangan Internasional Kemnaker RI menghindari stereotip situs web birokrasi pemerintah tradisional (yang seringkali padat banner berantakan, kontras warna bertabrakan, atau tata letak template kaku). Pendekatan desain kami bertumpu pada 5 pilar:

1. **Wibawa Kenegaraan & Estetika Arsitektural (Brutalist Architecture & Editorial Polish)**: Mengadopsi perpaduan palet stone/concrete (`#E3E1DC`), hitam kedaulatan (`#121212`), dan aksen deep moss (`#374336`) dengan tipografi `Syncopate` & `Manrope`, menghasilkan atmosfer portal berkelas monumen kenegaraan yang futuristik.
2. **Kejelasan Hierarki Informasi (Radical Clarity)**: Tipografi display proporsi lebar dengan kontras tinggi, tata letak spasial lapang, dan noise overlay fraktal halus.
3. **Sticky Card Stacking**: Menggunakan pola kartu bertumpuk (`sticky top-[12vh] h-[78vh]`) untuk 4 pilar manfaat program vokasi yang memberikan kesan editorial mewah.
4. **Footer Reveal Dinamis**: Halaman utama dibungkus dalam `.wrapper` dengan margin bawah yang mengungkap `.footer-sticky` dari balik kanvas saat pengguna menggulir ke titik akhir.
5. **Smooth Scroll Lenis**: Transisi gulir mentega 60 FPS menggunakan pustaka Lenis terintegrasi.

---

## 2. Palet Token Warna (Color Tokens) — ⚠️ ARSIP / LEGACY

> **Jangan dipakai.** Lihat Notis Kanonis di atas. Warna berlaku: `#E3E1DC` / `#121212` / `#374336`.

Sistem warna dikonfigurasi melalui variabel CSS semantik yang kompatibel dengan Tailwind CSS v4.

```
┌────────────────────────────────────────────────────────────────────────┐
│                       Color Swatches & Semantics                       │
├───────────────┬───────────┬──────────────┬─────────────────────────────┤
│ Token Name    │ Hex Code  │ Tailwind Var │ Peran Semantik              │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Primary       │ #0A2342   │ --primary    │ Dominan: Header, Judul Utama│
│               │           │              │ Wibawa Kementerian         │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Secondary     │ #1D4ED8   │ --secondary  │ Aksi Utama: Tombol CTA,     │
│               │           │              │ Tautan Aktif, Fokus Border  │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Accent        │ #06B6D4   │ --accent     │ Aksen Teknologi: Badge,     │
│               │           │              │ Garis Liveline, Sorotan     │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Background    │ #FFFFFF   │ --background │ Latar Kanvas Utama          │
│               │           │              │ Bersih & Lapang             │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Surface       │ #F8FAFC   │ --surface    │ Kartu, Modul Asimetris,     │
│               │           │              │ Latar Seksi Bergantian      │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Text Primary  │ #0F172A   │ --foreground │ Teks Badan Utama, Paragraf, │
│               │           │              │ Legibilitas Maksimum        │
├───────────────┼───────────┼──────────────┼─────────────────────────────┤
│ Text Muted    │ #475569   │ --muted      │ Deskripsi Sekunder, Keterangan│
│ Border Subt.  │ #E2E8F0   │ --border     │ Pembatas Kartu, Garis Grid   │
└───────────────┴───────────┴──────────────┴─────────────────────────────┘
```

### Palet Turunan & Aksen Fungsional
- **Success**: `#059669` (Emerald 600) – Status Terverifikasi, Gelombang Dibuka.
- **Warning**: `#D97706` (Amber 600) – Batas Akhir Pendaftaran Menipis.
- **Error / Destructive**: `#DC2626` (Red 600) – Validasi Gagal, Peringatan Penipuan.
- **Surface Elevation**: `#FFFFFF` dengan batas tipis `rgba(15, 23, 42, 0.08)`.

---

## 3. Sistem Tipografi (Typography Hierarchy) — ⚠️ ARSIP / LEGACY

> **Jangan dipakai.** Font berlaku: `Syncopate` (display) + `Manrope` (body) + `monospace` (label).

- **Primary Font**: `Geist Sans` (Next.js font integration)
- **Fallback Stack**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`
- **Monospace Stack**: `Geist Mono`, `JetBrains Mono`, `monospace` (digunakan pada kode OTP, nomor tahapan alur `01`, `02`, dan ID registrasi).

### Skala Tipografi Baku (Typography Scale)

| Level / Token | Ukuran Desktop | Ukuran Mobile | Line Height | Weight | Tracking | Kasus Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | 56px (3.5rem) | 36px (2.25rem)| 1.1 | 700 / Bold | -0.03em | Hero Section Title |
| **Heading 1 (H1)** | 40px (2.5rem) | 28px (1.75rem)| 1.2 | 700 / Bold | -0.02em | Judul Seksi Utama |
| **Heading 2 (H2)** | 28px (1.75rem)| 22px (1.375rem)| 1.3 | 600 / Semi | -0.015em| Judul Kartu Pilar & Journey |
| **Heading 3 (H3)** | 20px (1.25rem)| 18px (1.125rem)| 1.4 | 600 / Semi | -0.01em | Subjudul Fitur & FAQ Title |
| **Body Large** | 18px (1.125rem)| 16px (1.0rem) | 1.6 | 400 / Reg | normal | Paragraf Hero Lead |
| **Body Default** | 16px (1.0rem)  | 15px (0.9375rem)| 1.6 | 400 / Reg | normal | Teks Deskripsi Kartu |
| **Body Small** | 14px (0.875rem)| 13px (0.8125rem)| 1.5 | 500 / Med | +0.01em | Metadata, Durasi Alur |
| **Caption / Badge**| 12px (0.75rem) | 11px (0.6875rem)| 1.4 | 600 / Semi | +0.05em | Status Label, Eyebrow Text |

---

## 4. Spasi & Sistem Grid (Spacing & Grid)

### Skala Spasi (Spacing Scale 4px Base Grid)
- `space-1` = 4px | `space-2` = 8px | `space-3` = 12px | `space-4` = 16px
- `space-6` = 24px | `space-8` = 32px | `space-12` = 48px | `space-16` = 64px
- `space-24` = 96px | `space-32` = 128px

### Batasan Kontainer (Container Breakpoints)
- **Max Width**: `max-w-7xl` (1280px) untuk keterbacaan proporsional di layar ultra-wide.
- **Padding Horizontal**:
  - Seluler (< 640px): `px-4` (16px)
  - Tablet (640px – 1024px): `px-6` (24px)
  - Desktop (> 1024px): `px-8` (32px)
- **Padding Vertikal Seksi (Section Spacing)**:
  - Seluler: `py-16` (64px)
  - Desktop: `py-24` (96px) sampai `py-32` (128px) untuk memberikan pernapasan spasial yang lapang khas situs premium.

---

## 5. Sudut Kelengkungan & Bayangan (Border Radius & Shadows)

### Border Radius
- **Micro Elements (Badge, Tag)**: `rounded-md` (6px)
- **Inputs & Tombol Standar**: `rounded-lg` (8px)
- **Cards, Modul Konten**: `rounded-xl` (12px)
- **Container Unggulan / Banner**: `rounded-2xl` (16px)
- **Pills / Status Dots**: `rounded-full` (9999px)

### Sistem Bayangan (Subtle Elevation Shadows)
Menghindari drop-shadow pekat bernuansa kuno. Menggunakan kombinasi border presisi `1px` dengan bayangan difus sangat halus:
- `shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`
- `shadow-subtle`: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- `shadow-card`: `0 10px 15px -3px rgba(15, 23, 42, 0.04), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`
- `shadow-elevated`: `0 20px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`

---

## 6. Prinsip Animasi & Gerakan (Motion Principles)

Seluruh animasi wajib mematuhi 3 aturan emas:
1. **Purposeful (Fungsional)**: Animasi hanya ada untuk menunjukkan perubahan status (*state transition*), memandu arah baca (*focal guidance*), atau memberikan konfirmasi aksi.
2. **Minimal (Tidak Mengganggu)**: Tidak ada elemen yang berputar-putar tanpa henti, memantul-mantul (*bouncing*), atau meluncur dari kejauhan.
3. **Fast (Cepat & Responsif)**: Durasi transisi berada dalam rentang 150ms s.d. 300ms dengan timing function `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out).

### Spesifikasi Transisi Motion:
- **Hover Button / Card**: `transition: transform 200ms ease, box-shadow 200ms ease; transform: translateY(-2px);`
- **Fade In Scroll Reveal**: Opacity `0 -> 1`, TranslateY `12px -> 0px`, Durasi `400ms`.
- **Number Flow**: Pergeseran digit silindris dengan durasi `800ms` saat trigger viewport aktif.
- **Accordion Toggle**: Transisi tinggi konten lancar tanpa patah-patah (*height layout spring*).

---

## 7. Standar Komponen (Component Standards)

1. **Button**:
   - `Primary`: Latar `#1D4ED8`, teks putih, font semibold, hover latar `#1E40AF`, elevasi halus.
   - `Secondary / Outline`: Latar transparan, border `1px solid #E2E8F0`, teks `#0A2342`, hover latar `#F1F5F9`.
   - `Ghost`: Tanpa border, hover background halus, cocok untuk tombol navigasi sekunder.
2. **Badge Status**:
   - Bentuk pill dengan ikon penanda titik (pulse indicator) berukuran 6px.
   - Warna latar lembut dengan opacity 10% dan teks berwarna solid berbobot medium.
3. **Input OTP Field**:
   - Kotak persegi minimal 48x48px untuk aksesibilitas jemari layar sentuh.
   - Angka terpampang besar (24px) dengan font monospace.
   - Border aktif menggunakan aksen Cyan `#06B6D4` dengan ketebalan 2px ring.

---

## 8. Aturan Aksesibilitas (Accessibility Rules - WCAG 2.1 AA)

- **Rasio Kontras Teks**:
  - Teks `#0F172A` di atas `#FFFFFF`: Rasio **14.8:1** (Lolos AAA).
  - Teks `#475569` di atas `#FFFFFF`: Rasio **7.2:1** (Lolos AAA).
  - Teks `#1D4ED8` di atas `#FFFFFF`: Rasio **4.6:1** (Lolos AA).
- **Fokus Navigasi Keyboard**: Seluruh elemen interaktif (`<a>`, `<button>`, `<input>`) wajib memiliki indikator `:focus-visible` berwarna Accent `#06B6D4` dengan outline offset 2px.
- **Semantic HTML**: Menggunakan tag `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, dan `<footer>` secara hierarkis dan benar.
- **Screen Reader Support**: Tag tombol ikon wajib menyertakan atribut `aria-label` yang deskriptif.
