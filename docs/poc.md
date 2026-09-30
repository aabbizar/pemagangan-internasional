# Proof of Concept (PoC) Specification
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | POC-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Active Technical Specification |
| **Penyusun** | Principal Product Designer & Senior Frontend Architect |
| **Audience** | Pimpinan Kemnaker RI, Pejabat Pembuat Komitmen (PPK), Tim IT Pusdatin, Asesor Vokasi |

---

## 1. PoC Objectives

Proof of Concept (PoC) ini disusun untuk menguji dan memvalidasi kelayakan antarmuka serta pengalaman pengguna (*Frontend Feasibility & User Experience Viability*) platform digital Pemagangan Internasional sebelum dialokasikan anggaran penuh untuk pengembangan backend, infrastruktur data center, dan integrasi lintas kementerian.

### Sasaran Utama:
1. **Validasi Kredibilitas Visual Eksekutif**: Memastikan antarmuka portal memancarkan wibawa kenegaraan yang modern, bersih, bebas dari kekacauan visual (*clutter*), dan setara dengan standar portal pemerintahan maju (misal: GovTech Singapore, UK GDS).
2. **Validasi Pemahaman Alur Program**: Menguji apakah calon pemagang dapat memahami urutan 5 fase seleksi (Registrasi → Seleksi → Pelatihan → Penempatan → Evaluasi) tanpa ambigu melalui implementasi garis kontinuitas *Liveline*.
3. **Validasi Kecepatan & Responsivitas Frontend**: Membuktikan bahwa aplikasi berbasis Next.js 15 App Router dan Tailwind CSS v4 mampu memberikan waktu muat halaman instan dan interaksi mulus 60 FPS pada perangkat mobile maupun desktop.
4. **Validasi Alur Otentikasi Terpandu**: Mendemonstrasikan flow login modern berbasis email dan One-Time Password (OTP) 6-digit dengan umpan balik visual instan tanpa kerumitan kata sandi yang sering terlupakan oleh pengguna.

---

## 2. Validation Strategy

Strategi pengujian PoC dilakukan melalui pendekatan **Dual-Track Review**:

```
                  ┌────────────────────────────────────────┐
                  │          PoC Release v1.0.0            │
                  └───────────────────┬────────────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
  ┌────────────────────────┐                    ┌────────────────────────┐
  │ Track A: Stakeholder   │                    │ Track B: User Testing  │
  │ Review (Internal)      │                    │ (Lulusan Vokasi)       │
  └────────────┬───────────┘                    └────────────┬───────────┘
               │                                             │
               ├─ Keselarasan Regulasi Kemnaker              ├─ Kemudahan Membaca Alur
               ├─ Kesesuaian Identitas Kenegaraan            ├─ Kecepatan Input OTP
               └─ Keputusan Investasi Phase 2                └─ Kepercayaan Informasi
```

1. **Uji Penerimaan Internal (Internal Stakeholder Gate)**:
   - Sesi demo interaktif di hadapan Direktur Bina Talenta Vokasi dan tim teknis Pusdatin Kemnaker.
   - Evaluasi kesesuaian tone-of-voice, terminologi hukum ketenagakerjaan, serta hierarki visual data capaian.
2. **Uji Pengguna Terbatas (Cognitive Walkthrough Usability Test)**:
   - Pengujian terhadap 15 partisipan perwakilan (alumni SMK dan Politeknik).
   - Mengukur waktu yang dibutuhkan untuk memahami benefit program dan mencoba flow masuk akun.

---

## 3. What Will Be Demonstrated

Dalam fase PoC ini, fitur dan komponen yang didemonstrasikan secara penuh mencakup:

### 3.1. Landing Page Interaktif (5 Bab Interaktif Lengkap)
1. **Bab 01 – Hero Portal LMS (GlyphPortal & Live WebGL Shader)**:
   - Header terintegrasi dengan penanda institusional resmi Kemnaker RI.
   - Portal eksplorasi interaktif "TALENTA" menuju ekosistem pembelajaran digital LMS.
   - Latar belakang dinamis WebGL MeshGradient bernuansa biru Kemnaker.
2. **Bab 02 – Standar Kompetensi & Informasi Program (Horizontal Scroll + Story Scroll FlowArt)**:
   - *Sub-seksi 2A (Horizontal Scroll)*: 5 slide horizontal berlatar warna berani (Merah, Biru, Oranye, Kuning, Hijau) dengan watermark parallax teks raksasa dan ilustrasi cutout karakter.
   - *Sub-seksi 2B (Story Scroll FlowArt GSAP)*: 5 tumpukan layar penuh berputar 30 derajat tepat setelah slide hijau, menyajikan informasi lengkap:
     - 01 — Program Internship/Magang Bilateral (Orange `#fd5200`).
     - 02 — Jalur Bekerja Legal Specified Skilled Worker / SSW (Hitam `#000`).
     - 03 — Syarat Masuk & Kriteria Kualifikasi (Krem `#F5F0E8`): Skor IQ > 92, sertifikasi bahasa JLPT/Goethe/TOPIK, domisili seluruh Indonesia kecuali Makassar & Papua, Caregiver 90% wanita bersertifikat.
     - 04 — Pelatihan Hybrid Luring & Daring (Biru `#1A3DE8`): 80% daring LMS + 20% karantina luring, simulasi Mensetsu, dan UAS.
     - 05 — Informasi Pendaftaran (Hitam `#000`): Biaya registrasi Rp 1.500.000, kuota batch terbaru, registrasi online terpadu.
3. **Bab 03 – Alur Transformasi Peserta (Human Journey)**:
   - Representasi linier dinamis 3 fase (Persiapan, Validasi, Penempatan) dengan efek parallax sinematik.
4. **Bab 04 – Jaringan Kemitraan Industri Global (Works Wheel)**:
   - Silinder 3D interaktif yang memutar 9 sektor industri internasional mitra (Otomotif, Robotika, Presisi, Semikonduktor, Kaigo, VET Jerman, dll.).
5. **Bab 05 – Tentang Kami (About 29 shadcnblock) & Footer Live Shader**:
   - Seksi About 29 berlatar hitam pekat (`bg-black`): Judul bersih *"Tentang Kami"*, penjelasan abu-abu cerah, foto fasilitas modern, kartu misi bertema gelap, dan 3 kolom nilai integritas lembaga.
   - Footer reveal minimalis berlatar **Live BackgroundShader** gradasi biru Kemnaker selaras dengan hero section, tautan navigasi esensial, dan hak cipta Ditjen Binalavotas.

### 3.2. Simulasi Otentikasi Administrator / Calon Peserta
- Halaman Login beralamat di `/login`.
- Input field Email dengan validasi format klien.
- Komponen Input OTP 6-slot terstandardisasi dengan auto-focus dan auto-advance.
- Notifikasi toast Sonner untuk konfirmasi pengiriman kode demo dan status validasi.
- Redireksi instan ke mock dashboard `/dashboard`.

### 3.3. Halaman Mock Dashboard Eksekutif (`/dashboard`)
- Tampilan ringkas status pendaftaran, grafik distribusi negara, dan menu navigasi masa depan sebagai bukti kesiapan arsitektur ke tahap berikutnya.

---

## 4. What Is Deliberately Excluded

Untuk menjaga fokus pada validasi antarmuka dan kecepatan peluncuran PoC, hal-hal berikut secara sadar dikecualikan dari Phase 1:

| Komponen / Fitur | Alasan Pengecualian | Rencana Implementasi |
| :--- | :--- | :--- |
| **Koneksi Database Aktif** (PostgreSQL/Supabase) | Menghindari overhead setup infrastruktur sebelum arsitektur disetujui pimpinan. | Phase 2 (Desain skema tabel peserta, perusahaan, dan dokumen). |
| **Backend REST / GraphQL API** | Menjaga kode tetap portabel dan dapat dijalankan secara instan di lingkungan peninjauan lokal. | Phase 2 (Next.js Server Actions / FastAPI Kemnaker). |
| **SMS / WhatsApp OTP Gateway Real** | Mencegah biaya vendor gateway per request selama sesi review dan demo internal. | Phase 2 (Integrasi Telkom / Vendor SMS OTP resmi Kemnaker). |
| **Pengunggahan Berkas (S3 / Cloud Storage)** | Menghindari kompleksitas pengelolaan bucket dan hak akses dokumen sensitif (KTP/Paspor). | Phase 2 (Penyimpanan terenkripsi compliant BSSN). |
| **Manajemen Peran / RBAC Kompleks** | Belum diperlukan pada peninjauan landing page dan alur dasar. | Phase 2 (Integrasi IAM SIAPkerja Kemnaker). |

---

## 5. Stakeholder Review Criteria

Evaluasi PoC oleh dewan peninjau kementerian akan dinilai berdasarkan 5 kriteria utama:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Kriteria Penilaian PoC                            │
├────────────────────────┬─────────┬─────────────────────────────────────┤
│ Kategori               │ Bobot   │ Indikator Keberhasilan              │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ 1. Citra & Wibawa      │ 25%     │ Tampilan visual elegan, bebas AI-   │
│    (Brand Authority)   │         │ slop, mencerminkan institusi negara │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ 2. Kejelasan Alur      │ 25%     │ Alur 5 tahapan pemagangan dipahami  │
│    (Journey Clarity)   │         │ tanpa perlu penjelasan verbal       │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ 3. Performa & Respon   │ 20%     │ Tidak ada lag, animasi mulus, waktu │
│    (Performance)       │         │ buka cepat di koneksi 4G seluler    │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ 4. Aksesibilitas       │ 15%     │ Teks terbaca jelas (kontras tinggi),│
│    (Accessibility)     │         │ ramah perangkat layar sentuh        │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ 5. Kesiapan Kode       │ 15%     │ Kode terstruktur rapi, TypeScript   │
│    (Code Scalability)  │         │ strict, siap dihubungkan ke backend │
└────────────────────────┴─────────┴─────────────────────────────────────┘
```

---

## 6. Acceptance Criteria (Definisi Selesai PoC)

PoC dinyatakan selesai dan disetujui untuk dipresentasikan jika seluruh kriteria berikut terpenuhi:

1. [x] Seluruh 6 dokumen arsitektur dan perencanaan tersedia lengkap di direktori `/docs/`.
2. [x] Proyek Next.js 15 berjalan stabil tanpa galat kompilasi atau peringatan TypeScript (`0 errors`).
3. [x] Landing Page menampilkan 5 seksi persis sesuai mandat PRD tanpa placeholder `lorem ipsum`.
4. [x] Animasi Number Flow berjalan mulus saat seksi statistik digulir ke layar.
5. [x] Visualisasi tahapan pemagangan menampilkan kurva kontinuitas interaktif (*Liveline*).
6. [x] Alur simulasi login OTP menerima kode demo `123456`, memicu notifikasi Sonner, dan berhasil mengarahkan pengguna ke `/dashboard`.
7. [x] Palet warna mematuhi pedoman baku AETHEREAL (kanonis, lihat `docs/design-system.md` Notis Kanonis): Background `#E3E1DC`, Primary/Dark `#121212`, Accent `#374336`, Display `Syncopate`, Body `Manrope`. *(Sebelumnya memakai palet legacy `#0A2342`/`#1D4ED8`/`#06B6D4` — diganti mengikuti `docs/aethereal-redesign.md`.)*
8. [x] Nilai audit Lighthouse lokal mencapai skor target: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
