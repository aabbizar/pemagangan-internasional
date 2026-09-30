# Platform Information Architecture & Sitemap
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | MAP-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Active Architecture Blueprint |
| **Penyusun** | Staff UX Engineer & Information Architect |

---

## 1. Overview Struktur Navigasi

Sitemap ini mendefinisikan peta situs hierarkis untuk portal Pemagangan Internasional Kemnaker RI. Struktur ini memisahkan secara tegas zona publik (*Public Unauthenticated Zone*) dengan zona manajemen terproteksi (*Authenticated Executive & Admin Zone*).

```
                              [ Portal Kemnaker RI ]
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        ▼                                                                 ▼
[ Public Zone ]                                                 [ Protected Zone ]
        │                                                                 │
        ├─ / (Landing Page)                                               ├─ /dashboard (Overview)
        │   ├─ #tentang (About Program)                                   ├─ /participants (Future)
        │   ├─ #alur (Program Journey)                                    ├─ /programs (Future)
        │   ├─ #statistik (Statistics)                                    ├─ /reports (Future)
        │   └─ #faq (FAQ & Footer)                                        └─ /settings (Future)
        │
        └─ /login (Simulated Auth Gateway)
            └─ OTP Verification Dialog
```

---

## 2. Hierarki Halaman & Spesifikasi Rute

### 2.1. Public Facing Pages (Fase 1 PoC)

#### 1. Rute: `/` (Landing Page)
- **Tipe Rendering**: Server-Rendered Component (SSR / Static Generation dengan Client Hydration interaktif)
- **Akses**: Terbuka untuk umum (Public Unrestricted)
- **Tujuan**: Membangun kredibilitas, menyajikan informasi holistik program pemagangan luar negeri resmi Kemnaker RI, mengarahkan calon peserta dan mitra institusi vokasi ke kanal pendaftaran.
- **Struktur Seksi Internal**:
  - `Header & Topbar`: Logo Kemnaker, navigasi anchor, status gelombang berjalan, tautan masuk.
  - `Hero Section (#beranda)`: Headline visi vokasi internasional, trust badge, primary CTA ("Daftar Gelombang"), secondary CTA ("Pelajari Alur").
  - `About Program (#tentang)`: 4 pilar manfaat strategis (*Global Exposure, Industry Experience, Vocational Excellence, Career Readiness*).
  - `Program Journey (#alur)`: Visualisasi alur 5 fase dengan interaktivitas kurva berkelanjutan (*Liveline*).
  - `Statistics Preview (#statistik)`: Counter metrik dinamis (*Number Flow*): Peserta, Negara, Mitra Perusahaan, Kelulusan.
  - `FAQ & Closing CTA (#faq)`: Accordion tanya-jawab seputar legalitas, asuransi, visa, dan pembiayaan + banner pendaftaran penutup + footer resmi.

#### 2. Rute: `/login` (Gerbang Masuk Terpadu)
- **Tipe Rendering**: Client Component (`"use client"`)
- **Akses**: Terbuka untuk umum / staf internal
- **Tujuan**: Gerbang otentikasi aman berbasis One-Time Password (OTP) tanpa beban mengingat password bagi peserta atau staf verifikator.
- **Komponen Kunci**:
  - Formulir input email berpresisi tinggi.
  - Slot Input OTP 6-digit (`input-otp`) dengan indikator hitung mundur (resend OTP).
  - Alert toast (`sonner`) interaktif dengan petunjuk kode demo (`123456`).
  - Tautan kembali ke beranda kementerian.

---

### 2.2. Authenticated Management Pages (Phase 1 Mock & Future Placeholders)

#### 3. Rute: `/dashboard` (Mock Portal Eksekutif)
- **Status di PoC**: Aktif sebagai Mock Prototype setelah login berhasil.
- **Akses**: Terotentikasi (Simulated Session).
- **Tujuan**: Menampilkan ringkasan eksekutif bagi peninjau pimpinan: metrik kuota pendaftar, progres batch aktif, dan grafik penempatan negara.

#### 4. Rute: `/participants` (Data Calon & Alumni Pemagang)
- **Status di PoC**: *Future Placeholder Architecture* (Navigasi disiapkan di sidebar dashboard).
- **Rencana Phase 2**: Tabel data master peserta terintegrasi NIK Dukcapil, verifikasi paspor, status kelulusan seleksi fisik/bahasa, dan rekam jejak industri. Menggunakan `react-virtuoso` untuk rendering data 10.000+ baris tanpa lag.

#### 5. Rute: `/programs` (Katalog Program Pemagangan Bilateral)
- **Status di PoC**: *Future Placeholder Architecture*.
- **Rencana Phase 2**: Manajemen program kerja sama G-to-G dan G-to-P (Jepang IM Japan, Jerman Ausbildung/Meister, Korea Selatan EPS/E-7, Australia VET).

#### 6. Rute: `/reports` (Laporan Kinerja & Analitik Diplomasi Ketenagakerjaan)
- **Status di PoC**: *Future Placeholder Architecture*.
- **Rencana Phase 2**: Ekspor data berkala untuk Dewan Ketahanan Vokasi Nasional, Badan Perencanaan dan Pengembangan Ketenagakerjaan (Barenbang), dan Menteri Tenaga Kerja.

#### 7. Rute: `/settings` (Pengaturan Instansi, Hak Akses & Konfigurasi Sistem)
- **Status di PoC**: *Future Placeholder Architecture*.
- **Rencana Phase 2**: Pengaturan profil Sending Organization (SO), kuota penempatan per provinsi, audit log keamanan, dan integrasi API SIAPkerja.

---

## 3. Matriks Akses & Metadata Rute

| Rute URL | Judul Halaman (Meta Title) | Aksesibilitas | Status Implementasi |
| :--- | :--- | :--- | :--- |
| `/` | Pemagangan Internasional – Direktorat Bina Talenta Vokasi Kemnaker RI | Publik | **Fase 1 (Selesai Penuh)** |
| `/login` | Masuk Portal Pemagangan – Kemnaker RI | Publik | **Fase 1 (Selesai Penuh)** |
| `/dashboard` | Dashboard Eksekutif Pemagangan Vokasi – Kemnaker RI | Mock Authenticated | **Fase 1 (Mock Prototipe)** |
| `/participants` | Data Peserta & Alumni – Portal Pemagangan Kemnaker RI | Administrator | *Placeholder Fase 2* |
| `/programs` | Program Kemitraan Bilateral – Kemnaker RI | Administrator & SO | *Placeholder Fase 2* |
| `/reports` | Analitik & Laporan Penempatan – Kemnaker RI | Eksekutif & Asesor | *Placeholder Fase 2* |
| `/settings` | Konfigurasi Sistem & Audit Log – Kemnaker RI | Super Admin | *Placeholder Fase 2* |
