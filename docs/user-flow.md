# Platform User Flow Architecture
## Platform Pemagangan Internasional – Direktorat Bina Talenta Vokasi
### Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI)

---

| Dokumen ID | FLOW-VOKASI-INT-2026-V1 |
| :--- | :--- |
| **Status** | Approved Specification |
| **Penyusun** | Staff UX Engineer & Principal Product Designer |

---

## 1. Ikhtisar Alur Pengguna (Flow Overview)

Dokumen ini memetakan perjalanan pengalaman pengguna (*end-to-end user journeys*) untuk 3 skenario interaksi utama dalam platform Fase 1 PoC:
1. **Landing Visitor Flow**: Eksplorasi publik, pemahaman program vokasi, dan navigasi informasi.
2. **Admin / User Login Flow**: Masuk portal dengan otentikasi simulasi berbasis OTP 6-digit.
3. **Admin Dashboard Entry Flow**: Pengalihan sesi pasca login, validasi visual, dan eksplorasi ringkasan eksekutif.

---

## 2. Alur 01: Landing Visitor Flow (Eksplorasi Publik)

Alur ini dirancang untuk calon pemagang (alumni vokasi), pengajar, maupun perwakilan industri luar negeri yang mengunjungi portal untuk pertama kali.

```mermaid
flowchart TD
    A([Pengunjung Membuka URL Domain Utama '/']) --> B[Sistem Memuat Landing Page < 1.2s]
    B --> C[Pengunjung Melihat Hero Section]
    C --> D{Aksi Awal Pengunjung}
    
    D -->|Klik 'Pelajari Alur'| E[Smooth Scroll ke Section #alur 'Program Journey']
    D -->|Klik 'Daftar Gelombang'| F[Mengarahkan ke Halaman Masuk/Pendaftaran '/login']
    D -->|Gulir Halaman ke Bawah| G[Eksplorasi Seksi 'About Program']
    
    G --> H[Membaca 4 Pilar: Global Exposure, Industry, Excellence, Readiness]
    H --> I[Eksplorasi Alur 5 Tahap Liveline: 01 s.d 05]
    I --> J[Memasuki Seksi Statistik: Number Flow Menganimasikan Angka Capaian]
    
    J --> K[Eksplorasi Seksi Tanya Jawab FAQ]
    K --> L{Ada Pertanyaan Terbuka?}
    L -->|Ya| M[Klik Item Accordion FAQ untuk Ekspansi Jawaban]
    L -->|Tidak / Puas| N[Melihat Closing CTA Banner]
    
    N --> O{Keputusan Konversi}
    O -->|Klik 'Mulai Pendaftaran'| F
    O -->|Melihat Informasi Kontak/Legalitas| P[Membaca Informasi Footer & Alamat Kemnaker RI]
```

### Karakteristik UX Seksi Landing:
- **Zero Friction Navigation**: Header sticky memberikan akses cepat ke anchor navigasi kapan pun pengguna ingin melompat antar topik.
- **Progressive Disclosure**: Konten FAQ dirancang bertingkat (*collapsible accordion*) agar tidak membebani ruang vertikal di layar ponsel.
- **Micro-Delight**: Perubahan angka (*rolling digit effect*) pada seksi statistik memicu efek kepuasan visual tanpa mengganggu fokus baca.

---

## 3. Alur 02: Admin & User Login Flow (Simulasi Otentikasi OTP)

Alur masuk tanpa kata sandi (*passwordless auth*) menggunakan One-Time Password (OTP) 6-digit. Alur ini memberikan standar keamanan setara sistem perbankan dan portal publik modern tanpa risiko kelupaan kata sandi.

```mermaid
flowchart TD
    A([Pengguna Berada di '/login']) --> B[Pengguna Memasukkan Email Dinas / Email Pribadi]
    B --> C{Validasi Format Email di Sisi Klien}
    
    C -->|Format Tidak Valid| D[Tampilkan Pesan Error: 'Format email tidak valid']
    D --> B
    
    C -->|Format Valid| E[Pengguna Klik Tombol 'Kirim Kode Verifikasi']
    E --> F[Ubah State ke 'Step OTP' & Tampilkan Komponen Input OTP 6-Digit]
    F --> G[Sonner Toast: 'Kode verifikasi simulasi dikirim: 123456']
    
    G --> H[Pengguna Memasukkan Kode 6-Digit pada Slot OTP]
    H --> I{Apakah 6 Digit Lengkap Diisi?}
    
    I -->|Belum Lengkap| H
    I -->|Lengkap Terisi| J{Validasi Kode Otentikasi}
    
    J -->|Bukan '123456'| K[Sonner Toast Error: 'Kode verifikasi tidak sesuai. Gunakan 123456 untuk demo']
    K --> L[Clear OTP Input & Focus Slot Pertama]
    L --> H
    
    J -->|Tepat '123456'| M[Sonner Toast Success: 'Otentikasi Berhasil. Menyiapkan sesi eksekutif...']
    M --> N[Set Session Mock di Klien & Redirect ke '/dashboard']
```

### Penanganan Kasus Khusus (Edge Cases):
1. **Penyalinan Kode (Paste Support)**: Pengguna dapat menyalin (*copy-paste*) kode 6-digit langsung dari clipboard; komponen `input-otp` otomatis membagi karakter ke tiap sel.
2. **Kirim Ulang Kode (Resend OTP)**: Disediakan tombol *"Kirim Ulang Kode"* dengan proteksi countdown timer 60 detik untuk mencegah spam request.
3. **Penyaluran Tombol Demo Cepat**: Disediakan tombol utilitas *"Isi Otomatis Kode Demo"* untuk mempercepat peninjauan oleh dewan penguji/stakeholder.

---

## 4. Alur 03: Admin Dashboard Entry Flow (Tinjauan Eksekutif)

Alur transisi dari status terotentikasi menuju dashboard operasional.

```mermaid
flowchart TD
    A([Redirect Berhasil dari '/login']) --> B[Memuat Halaman '/dashboard']
    B --> C[Tampilkan Header Sesi Eksekutif Kemnaker RI]
    C --> D[Render Kartu Ringkasan Kunci: Total Calon, Kuota Aktif, Verifikasi Pending]
    
    D --> E[Render Distribusi Penempatan Negara: Jepang, Jerman, Korsel, Australia]
    E --> F[Render Akses Menu Manajemen Masa Depan]
    
    F --> G{Aksi Pengguna di Dashboard}
    G -->|Klik Menu Placeholder: Participants/Programs/Reports| H[Tampilkan Badge Informatif: 'Tersedia di Tahap Integrasi Phase 2']
    G -->|Klik 'Kembali ke Portal Publik'| I[Navigasi Kembali ke '/']
    G -->|Klik 'Keluar Sesi' (Logout)| J[Hapus Sesi & Arahkan Kembali ke '/login']
```

---

## 5. Matriks State & Feedback Komponen

| Titik Interaksi | Kondisi State | Komponen Feedback Visual | Teks Pesan / Aksi |
| :--- | :--- | :--- | :--- |
| Tombol Kirim Email | Loading | Spinner berputar halus pada tombol | *"Mengirim kode..."* |
| Input OTP Slot | Focused | Ring border warna Accent `#06B6D4` | Kursor berkedip di kotak aktif |
| Input OTP Slot | Kode Salah | Border warna Merah Kemenaker & Shake | *"Kode verifikasi tidak valid"* |
| Input OTP Slot | Sukses | Border Hijau & Toast Sonner | *"Verifikasi Berhasil! Mengalihkan..."* |
| Countdown Timer | Berjalan | Teks abu-abu sekunder | *"Kirim ulang kode dalam 00:45"* |
| Accordion FAQ | Terbuka | Ikon Chevron berotasi 180° | Transisi tinggi konten (*smooth height ease*) |
