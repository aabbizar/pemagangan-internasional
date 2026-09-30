# Product Requirements Document (PRD)
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | PRD-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Approved for PoC Phase 1 |
| **Author** | Principal Product Designer & Technical Product Manager |
| **Stakeholder** | Direktorat Bina Talenta Vokasi & Pemagangan, Ditjen Binalavotas, Kemnaker RI |
| **Target Rilis PoC** | Q3 2026 |

---

## 1. Executive Summary

Indonesia memiliki potensi demografi dengan lebih dari 4,2 juta lulusan sekolah menengah kejuruan (SMK) dan politeknik vokasi setiap tahunnya. Namun, keterbatasan akses ke pasar kerja global berketerampilan tinggi (high-skill foreign placement), asimetri informasi lowongan magang internasional berizin resmi, serta proses birokrasi yang terfragmentasi seringkali menghambat talenta muda Indonesia untuk bersaing di kancah internasional.

Platform Pemagangan Internasional Kemnaker RI dirancang sebagai **Portal Gerbang Tunggal (Single Gateway of Vocational Excellence)** yang menghubungkan lulusan pendidikan vokasi nasional dengan institusi, industri global terkemuka, Sending Organizations (SO/LPK terakreditasi), dan Atase Ketenagakerjaan Republik Indonesia di berbagai negara mitra (Jepang, Jerman, Korea Selatan, Australia, dsb.).

Sebagai fase permulaan, implementasi **Proof of Concept (PoC) Frontend-First** difokuskan untuk memvalidasi *brand credibility*, kemudahan adopsi pengguna publik (calon pemagang, institusi pendidikan, industri), penyajian transparansi alur 5 tahapan pemagangan, serta pengalaman otentikasi calon administrator/verifikator tanpa ketergantungan backend aktif.

---

## 2. Problem Statement

1. **Fragmentasi Informasi Resmi**: Calon peserta magang sering terjebak informasi tidak valid atau calo ilegal yang mengatasnamakan pemagangan luar negeri karena belum adanya portal pusat milik pemerintah yang transparan, modern, dan mudah diakses.
2. **Kesenjangan Standar Kompetensi**: Banyak institusi vokasi belum memiliki visibilitas langsung terhadap standar kurikulum industri global (seperti *Meister* di Jerman, *Ginou Jisshuusei/Tokutei Ginou* di Jepang, atau standar AQF di Australia).
3. **Citra Layanan Publik yang Kaku**: Portal kementerian konvensional seringkali memiliki antarmuka yang lambat, padat teks, tidak responsif pada perangkat mobile, serta memberikan pengalaman pengguna yang inferior dibanding standar industri swasta global (mis. Stripe, Vercel, GovTech Singapore).
4. **Kebutuhan Transparansi Perjalanan Seleksi**: Peserta membutuhkan kepastian hukum, pemahaman komprehensif mengenai *journey* 5 fase (Registrasi, Seleksi, Pelatihan, Penempatan, Evaluasi), serta metriks ketercapaian secara terukur.

---

## 3. Product Vision

> *"Menjadi infrastruktur digital vokasi nasional terpercaya berkelas dunia yang membuka jalan bagi sejuta talenta muda Indonesia meraih karier internasional, meningkatkan daya saing industri dalam negeri, dan memperkuat diplomasi ketenagakerjaan Indonesia di tingkat global."*

Platform ini dibangun dengan standar GovTech modern: estetika editorial minimalis, performa instan (<1.2s LCP), aksesibilitas universal (WCAG 2.1 AA), dan arsitektur modular yang siap dihubungkan dengan Sistem Informasi Ketenagakerjaan Nasional (SIAPkerja/Kemnaker Core API) pada Phase 2.

---

## 4. Product Goals & Business Goals

### Product Goals (User-Facing)
- Menyajikan gerbang informasi terpadu yang kredibel, lugas, dan otoritatif dari Kemnaker RI.
- Memvisualisasikan alur pemagangan 5 fase secara interaktif melalui kurva garis dinamis (Liveline concept).
- Memberikan akses cepat ke statistik ketercapaian program (peserta, mitra industri, negara tujuan, tingkat kelulusan) dengan animasi numerik berpresisi tinggi.
- Menyediakan alur demo otentikasi login berbasis One-Time Password (OTP) yang mulus bagi administrator/staf verifikator dinas.

### Business Goals (Kemnaker & Stakeholder)
- Menurunkan angka penipuan pemagangan ilegal hingga 0% melalui rujukan kanal tunggal berdomain resmi `.go.id`.
- Meningkatkan serapan lulusan vokasi (D2/D3/D4/SMK) di perusahaan global dengan target 50.000+ peserta per tahun pada fase penuh.
- Memposisikan Kemnaker RI sebagai pelopor transformasi digital pemerintahan (GovTech) yang setara dengan GovTech Singapore (*Singpass*, *Tech.gov.sg*), Linear, dan Stripe.

---

## 5. User Types & User Personas

### 5.1. User Types
1. **Calon Pemagang (Talenta Vokasi)**: Siswa akhir/alumni SMK, mahasiswa/lulusan politeknik usia 18–28 tahun yang mencari penempatan magang resmi di luar negeri.
2. **Institusi Pendidikan Vokasi**: SMK dan Politeknik yang mencari kerja sama kemitraan kurikulum internasional dan penyaluran lulusan.
3. **Mitra Industri Internasional / Sending Organization (SO)**: Perusahaan penerima di luar negeri dan lembaga pelatihan kerja (LPK) berlisensi SO Kemnaker.
4. **Administrator & Verifikator Kemnaker**: Staf Direktorat Bina Talenta Vokasi yang mengelola program, memverifikasi dokumen pendaftar, dan menyusun laporan eksekutif.

### 5.2. User Personas

#### Persona A: Calon Peserta Magang
- **Nama**: Rizky Aditya, S.Tr.T (22 tahun)
- **Latar Belakang**: Lulusan Politeknik Negeri Manufaktur, kompetensi CNC & Otomasi Industri.
- **Kebutuhan**: Mencari kepastian program magang resmi ke Jepang atau Jerman tanpa calo, rincian hak saku/gaji, visa, asuransi, dan sertifikat kompetensi internasional.
- **Pain Points**: Bingung membedakan lembaga penyalur resmi dan calo ilegal; situs web pemerintah lama sering error dan membingungkan di smartphone.

#### Persona B: Staf Eksekutif Direktorat Kemnaker
- **Nama**: Ibu Sarah Wulandari, S.IP, M.PubPol (38 tahun)
- **Role**: Analis Kebijakan Ahli Muda, Dit. Bina Talenta Vokasi Kemnaker RI.
- **Kebutuhan**: Membutuhkan sistem otentikasi internal yang aman, ringkas, dan modern untuk memantau data pendaftar serta mendemonstrasikan dashboard analitik kepada pimpinan kementerian.
- **Pain Points**: Sistem lama memerlukan login berlapis yang rumit tanpa UI audit trail yang modern; membutuhkan portal presentasi representatif saat kunjungan delegasi luar negeri.

---

## 6. Assumptions & Scope

### 6.1. Asumsi Dasar (PoC Phase)
- Seluruh data yang disajikan di landing page bersifat simulasi realistis (realistic dummy data) berdasarkan data historis Binalavotas Kemnaker.
- Pengguna mengakses aplikasi mayoritas melalui perangkat modern (Chrome, Safari, Edge, Firefox) baik di layar seluler maupun desktop.
- Fase otentikasi menggunakan simulasi OTP 6-digit di sisi klien dengan Sonner toast notification tanpa pengiriman SMS/Email gateway nyata di Phase 1.

### 6.2. In-Scope (Phase 1 PoC)
1. **Landing Page Editorial Modern Berbasis Bab Interaktif**:
   - **Bab 01 – Hero Portal LMS (GlyphPortal & Live WebGL Shader)**: Zoom 3D eksplorasi makna "TALENTA" dan pengenalan konsep Learning Management System (LMS) modern dengan latar belakang shader dinamis bernuansa biru Kemnaker.
   - **Bab 02 – Standar Kompetensi & Informasi Program (Horizontal Scroll + Story Scroll FlowArt)**:
     - *Part 2A – Horizontal Scroll (21st.dev)*: 5 slide horizontal berwarna berani (Merah, Biru, Oranye, Kuning, Hijau) dengan watermark parallax teks raksasa dan ilustrasi karakter cutout.
     - *Part 2B – Story Scroll FlowArt (GSAP 3D Rotational Peeling)*: 5 tumpukan layar penuh interaktif tepat setelah slide hijau, menyajikan informasi lengkap:
       1. **Informasi Internship/Magang Bilateral** (Orange `#fd5200`): Kuota bilateral, standar industri mancanegara, dan advokasi hukum.
       2. **Informasi Bekerja Legal SSW** (Hitam `#000`): Status legal resmi, upah global standar industri lokal, dan mitra AO teruji.
       3. **Pelatihan Luring & Daring (Hybrid)** (Biru `#1A3DE8`): Benefit pelatihan LMS modern 80% teori dan 20% luring (pemantapan & UAS), serta informasi pendaftaran terpadu.
       4. **Syarat Magang & Kualifikasi Umum** (Krem `#F5F0E8`): Skor IQ > 92, Sertifikasi Bahasa, Domisili seluruh Indonesia kecuali Makassar & Papua.
       5. **Kualifikasi Khusus Caregiver** (Emerald `#052E16`): Syarat sertifikat perawat lansia, kuota terbuka pria/wanita dengan prioritas 90% wanita.
   - **Bab 03 – Nilai Keunggulan / Benefit Eksklusif**: Visualisasi 3 benefit program secara overlap dan sinematik:
     1. **Jaringan Terpercaya**: Integrasi institusi internasional kredibel.
     2. **Akses Penuh 1.5 Juta**: Unlock ekosistem modul LMS dengan investasi tunggal transparan.
     3. **Hybrid 80% / 20%**: Kurikulum cerdas online untuk teori dan offline untuk praktik & UAS komprehensif.
   - **Bab 04 – Jaringan Kemitraan Industri Global (Works Wheel)**: Roda 3D interaktif yang memutar sektor-sektor industri internasional unggulan (Otomotif, Robotika, Presisi, Semikonduktor, Kaigo, VET Jerman, dll.).
   - **Bab 05 – Tentang Kami (About 29 shadcnblock)**: Layout arsitektural bersih berlatar hitam pekat (`bg-black`), foto fasilitas modern, kartu misi dengan kutipan institusi, dan grid 3-kolom nilai utama (Transparansi Penuh, Standar Vokasi Global, Perlindungan Bilateral).
   - **Footer Kenegaraan**: Footer reveal minimalis berlatar **Live BackgroundShader** gradasi biru Kemnaker selaras dengan hero section, tautan navigasi esensial, dan hak cipta Ditjen Binalavotas.
2. **Simulated Auth Flow**:
   - Halaman `/login` dengan input email dinas / NIK calon peserta.
   - Komponen Input OTP 6-digit dengan countdown timer & simulasi validasi auto-fill kode `123456`.
   - Feedback responsif instan dengan Sonner toast.
   - Redireksi otomatis ke `/dashboard` prototipe eksekutif setelah sukses login.
3. **Dokumentasi Lengkap & Arsitektur Frontend**:
   - PRD, PoC Doc, Sitemap, User Flow, Design System, Frontend Architecture.

### 6.3. Out of Scope (Phase 1 PoC)
- Integrasi database relasional (PostgreSQL, Supabase, MySQL).
- Integrasi API Dukcapil (verifikasi KTP/NIK) atau SIAPkerja SSO.
- Backend pengiriman email/SMS gateway (Twilio, Sendgrid).
- Modul formulir pengunggahan berkas paspor/sertifikat multi-step (direncanakan Phase 2).
- Content Management System (CMS) backend untuk admin mengedit isi FAQ secara dinamis.

---

## 7. User Stories

| ID | As a... | I want to... | So that... |
| :--- | :--- | :--- | :--- |
| **US-01** | Pengunjung / Calon Pemagang | Melihat ringkasan resmi program pemagangan luar negeri Kemnaker dengan tampilan kredibel | Saya yakin program ini resmi, aman, dan dilindungi negara. |
| **US-02** | Pengunjung / Calon Pemagang | Mempelajari 5 tahapan alur magang dari pendaftaran hingga kepulangan | Saya dapat mempersiapkan syarat dokumen, bahasa, dan fisik secara terencana. |
| **US-03** | Calon Peserta & Stakeholder | Melihat angka keberhasilan dan jangkauan negara mitra secara transparan | Membangun kepercayaan terhadap integritas dan skala program vokasi nasional. |
| **US-04** | Pengunjung | Membaca syarat kualifikasi (IQ, bahasa, domisili, caregiver) secara terperinci | Saya mengetahui kelayakan diri sebelum mendaftar ke gelombang seleksi. |
| **US-05** | Administrator / Penguji | Masuk ke portal manajemen melalui alur simulasi OTP tanpa hambatan backend | Saya dapat menguji alur otentikasi modern dan mengevaluasi tata letak dashboard. |

---

## 8. Functional Requirements

### FR-01: Navigasi & Header
- Navigasi tetap (fixed/sticky) dengan efek blend mode tajam (*mix-blend-difference*).
- Logo resmi Kemnaker RI & Lembaga Pemagangan beresolusi tajam.
- Menu navigasi menuju jangkar seksi: `#purpose` (Kualifikasi & Info), `#journey` (Alur), `#network` (Kemitraan), `#commitment` (Tentang Kami).
- Tombol aksi cepat: "Login" (mengarahkan ke `/login`).

### FR-02: Bab 01 – Hero Portal LMS (GlyphPortal & Shader)
- Animasi interaktif portal pembesaran huruf "TALENTA" menuju dunia pembelajaran digital LMS.
- Latar belakang dinamis WebGL MeshGradient berkecepatan terkalibrasi (`speed: 0.35`) dengan palet biru Kemnaker (`#041222`, `#0A2540`, `#0284C7`, `#1E40AF`, `#38BDF8`).
- Penjelasan esensial 3 fungsi utama LMS (Pusat Belajar Terpadu, Monitoring & Evaluasi Real-Time, Standardisasi Sertifikasi Global).

### FR-03: Bab 02 – Standar Kompetensi & Informasi Program (Horizontal & Story Scroll)
- **Komponen 2A (Horizontal Scroll)**: 5 layar berturut-turut (Merah, Biru, Oranye, Kuning, Hijau) berlatar warna pekat dengan watermark dinamis (`MAGANG`, `BEKERJA`, `SYARAT`, `PELATIHAN`, `DAFTAR`) dan cutout ilustrasi profesional.
- **Komponen 2B (Story Scroll FlowArt GSAP)**: Begitu melewati slide hijau, transisi mulus masuk ke 5 tumpukan rotasi 30 derajat:
  - Stack 01 (`#fd5200`): Informasi Magang Global Bilateral.
  - Stack 02 (`#000000`): Jalur Bekerja Legal Specified Skilled Worker (SSW).
  - Stack 03 (`#F5F0E8`): Syarat Masuk (IQ > 92, Sertifikasi Bahasa JLPT/Goethe/TOPIK, Domisili seluruh Indonesia kecuali Makassar & Papua, Caregiver 90% wanita bersertifikat).
  - Stack 04 (`#1A3DE8`): Skema Pelatihan Hybrid (80% Daring LMS + 20% Karantina Luring, Mensetsu & UAS).
  - Stack 05 (`#000000`): Informasi Pendaftaran (Biaya Rp 1.500.000, kuota batch terbaru, registrasi terpadu).

### FR-04: Bab 03 – Alur Transformasi Peserta (Human Journey)
- 3 fase terpadu: **Fase I (Persiapan)**, **Fase II (Validasi)**, **Fase III (Penempatan)**.
- Parallax vertikal sinematik dengan kartu teks tumpang tindih (*overlapping editorial cards*).

### FR-05: Bab 04 – Jaringan Kemitraan Global (Works Wheel)
- Visualisasi silinder 3D (*Works Wheel*) yang merotasikan 9 sektor industri internasional mitra (JITCO Otomotif, Robotika Cerdas, IM Japan Presisi, Semikonduktor, Kaigo Keperawatan, IHK Jerman VET, HRD Korea Factory, dsb.).
- Interaksi gulir step-by-step yang terkunci halus (*wheel interceptor*).

### FR-06: Bab 05 – Tentang Kami (About 29) & Footer Shader
- Seksi About 29 berlatar hitam pekat (`bg-black`): Judul bersih *"Tentang Kami"*, penjelasan berbobot abu-abu cerah, visual fasilitas modern, kartu misi bertema gelap, dan 3 kolom nilai integritas lembaga.
- Footer reveal interaktif berlatar shader dinamis biru Kemnaker, teks besar *"LEMBAGA PEMAGANGAN"*, baris navigasi esensial, dan hak cipta Ditjen Binalavotas.

### FR-07: Alur Otentikasi Simulasi (Login & OTP)
- Input email valid (`nama@instansi.go.id` atau email umum).
- Input kode OTP 6 slot dengan keyboard numeric khusus dan auto-tab antar kotak.
- Toast feedback visual Sonner: pesan berhasil atau instruksi kode demo (`123456`).
- Redirect ke `/dashboard` mock overview.

---

## 9. Non-Functional Requirements

| Dimensi | Spesifikasi & Standar |
| :--- | :--- |
| **Kinerja (Lighthouse)** | Skor Performance ≥ 90, FCP < 1.0s, LCP < 1.8s, CLS < 0.05. |
| **Aksesibilitas** | Kepatuhan WCAG 2.1 Level AA, kontras warna minimum 4.5:1 untuk teks biasa, dukungan navigasi keyboard penuh. |
| **Desain Responsif** | Sempurna pada viewport Mobile (360px – 430px), Tablet (768px – 1024px), Desktop (1280px – 1920px). |
| **Estetika & Sensibilitas** | Menghindari tampilan template murah / AI slop; mengutamakan editorial layout bernuansa GovTech internasional (GovTech SG, Linear, Vercel). |
| **Keamanan Klien** | Sanitasi input email di sisi klien, pencegahan XSS melalui React JSX rendering default. |
| **Maintainability** | TypeScript Strict Mode, komponen modular arsitektur Atomic/Feature-driven, konfigurasi token warna Tailwind CSS terpusat. |

---

## 10. Success Metrics (KPIs)

- **First Impression Rating**: Skor evaluasi stakeholder internal Kemnaker ≥ 9.0/10 terhadap profesionalisme dan kredibilitas visual.
- **Task Completion Rate (Prototype)**: 100% penguji berhasil menavigasi dari halaman depan ke halaman login dan menyelesaikan alur OTP hingga dashboard mock.
- **Zero Layout Shift (CLS)**: Tidak ada pergeseran elemen yang mengganggu saat font Geist Sans dimuat atau saat Number Flow menganimasikan angka.
- **Lighthouse Suite Score**: Skor rata-rata ≥ 95 pada keempat kategori audit (Performance, Accessibility, Best Practices, SEO).

---

## 11. Risks & Mitigation Strategies

| Risiko Teridentifikasi | Dampak | Mitigasi Desain & Teknis |
| :--- | :--- | :--- |
| Persepsi publik bahwa program ini berbayar atau calo | Tinggi | Penempatan badge tegas *"Program Resmi Kemnaker RI – Bebas Biaya Pungutan Liar"* di Hero dan FAQ. |
| Beban komputasi animasi pada perangkat spesifikasi rendah | Sedang | Menggunakan CSS transforms berbasis GPU via modul Motion ringan; menghapus efek blur berat pada layar seluler jika terdeteksi penurunan frame rate. |
| Ketergantungan pustaka pihak ketiga | Rendah | Mengisolasi komponen wrapper (`NumberFlow`, `InputOtp`, `Liveline`) ke dalam folder `src/components/ui` atau `src/components/common` agar mudah diganti jika versi Next.js/React diperbarui. |

---

## 12. Future Roadmap (Phase 2 & Phase 3)

```
2026 Q3 (Phase 1 - Current PoC)
 ├── Finalisasi Dokumentasi PRD, UX Flow, Design System
 ├── Implementasi 5 Seksi Landing Page Eksklusif
 └── Simulasi Otentikasi OTP & Mock Dashboard

2026 Q4 (Phase 2 - Integrasi & Verifikasi Layanan)
 ├── Integrasi API SIAPkerja & Single Sign-On (SSO) Kemnaker
 ├── Formulir Pendaftaran Peserta Multi-Step (Upload Dokumen, Paspor, SKCK)
 └── Portal Sending Organization (LPK Terakreditasi)

2027 Q1-Q2 (Phase 3 - Skala Nasional & Penempatan Global)
 ├── Integrasi Sistem Visa & Kerjasama KBRI/Atnaker Mitra Luar Negeri
 ├── Sistem Evaluasi Magang Real-Time & Buku Log Harian Digital Peserta
 └── Penerbitan Sertifikat Vokasi Global Terverifikasi Kriptografis / Blockchain
```
