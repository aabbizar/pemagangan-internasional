'use client';

import * as React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

const UNIFIED_HEADLINE_CLASS =
  'text-[clamp(2.5rem,5.2vw,5.2rem)] font-bold leading-[0.86] uppercase tracking-tight';

export function Chapter02StoryScroll(): React.ReactElement {
  return (
    <FlowArt aria-label="Informasi Pemagangan Internasional" className="w-full">
      {/* 01 — INFORMASI INTERNSHIP / MAGANG (Orange #fd5200, text #fff) */}
      <FlowSection
        aria-label="Informasi Program Internship"
        style={{ backgroundColor: '#fd5200', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            01 — Program Internship &amp; Magang
          </p>
          <hr className="my-2.5 sm:my-3 border-none border-t border-black/30" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Magang
            <br />
            Kerja
            <br />
            Global
          </h2>
        </div>

        <hr className="my-2.5 sm:my-3 border-none border-t border-black/30" />

        <p className="max-w-[60ch] text-[clamp(0.95rem,1.3vw,1.18rem)] font-normal leading-relaxed opacity-95">
          Program resmi pemagangan kerja bilateral ke Jepang, Jerman, dan Korea Selatan di bawah
          pembinaan Ditjen Binalavotas, Kementerian Ketenagakerjaan RI untuk mencetak talenta vokasi
          berstandar industri internasional.
        </p>

        <hr className="my-2.5 sm:my-3 border-none border-t border-black/30" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Fokus 01
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Kuota Bilateral
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-black/80">
              Akses kuota resmi bilateral antar pemerintah (G-to-G dan SO terakreditasi Kemnaker RI).
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Fokus 02
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Standar Industri
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-black/80">
              Praktik kerja berstandar presisi di fasilitas manufaktur dan industri mitra luar negeri.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Fokus 03
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Advokasi Hukum
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-black/80">
              Perlindungan hak hukum, kontrak kerja transparan, dan pendampingan KBRI tanpa calo.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 02 — INFORMASI BEKERJA LEGAL / SSW (Black #000, text #fff) */}
      <FlowSection
        aria-label="Jalur Bekerja Legal"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            02 — Jalur Bekerja Legal (SSW)
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Karier
            <br />
            Resmi
            <br />
            Industri
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Penempatan tenaga kerja profesional Specified Skilled Worker (SSW) dengan kontrak resmi,
          standar upah internasional, dan advokasi diplomasi bilateral penuh melalui KBRI.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Pilar 01
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Status Pekerja Legal
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Izin kerja profesional resmi berjangka panjang dengan opsi perpanjangan kontrak berkala.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Pilar 02
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Upah &amp; Jaminan Sosial
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Gaji setara standar industri lokal, asuransi kecelakaan kerja, dan fasilitasi tempat tinggal.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Pilar 03
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Mitra Terverifikasi
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Seluruh Accepting Organization (AO) mitra telah melalui uji kelayakan legal Ditjen Binalavotas.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 03 — SYARAT MASUK & KRITERIA KUALIFIKASI (Cream #F5F0E8, text #000) */}
      <FlowSection
        aria-label="Syarat Masuk dan Kualifikasi"
        style={{ backgroundColor: '#F5F0E8', color: '#000' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            03 — Syarat Masuk &amp; Kualifikasi
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Syarat
            <br />
            Masuk
            <br />
            Seleksi
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Kriteria seleksi objektif terstandarisasi untuk memastikan kesiapan potensi akademik,
          penguasaan bahasa asing, serta kondisi fisik dan mental peserta.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="border border-black/15 bg-black/5 p-3 sm:p-3.5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Kriteria 01
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Skor IQ &gt; 92
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-snug text-black/75">
              Wajib memiliki hasil evaluasi tes potensi akademik terstandarisasi minimal skor IQ 92.
            </p>
          </div>

          <div className="border border-black/15 bg-black/5 p-3 sm:p-3.5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Kriteria 02
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Sertifikasi Bahasa
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-snug text-black/75">
              Memiliki salah satu sertifikasi resmi: JLPT (Jepang), Goethe (Jerman), atau EPS-TOPIK (Korea).
            </p>
          </div>

          <div className="border border-black/15 bg-black/5 p-3 sm:p-3.5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Kriteria 03
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Domisili Nasional
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-snug text-black/75">
              Terbuka untuk seluruh wilayah Indonesia Sabang–Merauke (kecuali alokasi Makassar &amp; Papua).
            </p>
          </div>

          <div className="border border-black/15 bg-black/5 p-3 sm:p-3.5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Kriteria 04
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              Caregiver 90% Wanita
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-snug text-black/75">
              Sertifikat perawat lansia, terbuka pria &amp; wanita dengan kuota prioritas 90% wanita.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 04 — PELATIHAN LURING & DARING (Royal Blue #1A3DE8, text #fff) */}
      <FlowSection
        aria-label="Pelatihan Luring dan Daring"
        style={{ backgroundColor: '#1A3DE8', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            04 — Pelatihan Luring &amp; Daring (Hybrid)
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Hybrid
            <br />
            Vokasi
            <br />
            Modern
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Skema kurikulum terpadu 80% daring berbasis platform LMS modern dan 20% karantina luring
          untuk pemantapan fisik, mental, dan simulasi industri nyata.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block mb-0.5">
              Metode 01
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              80% Daring LMS
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-blue-100/80">
              Modul e-learning vokasi 24/7, materi kurikulum terakreditasi, dan simulasi ujian berkala.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block mb-0.5">
              Metode 02
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              20% Karantina Luring
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-blue-100/80">
              Pemantapan fisik, pembinaan mental, simulasi wawancara user (Mensetsu), dan evaluasi UAS.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block mb-0.5">
              Metode 03
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Sertifikasi Resmi
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-blue-100/80">
              Penerbitan sertifikasi kompetensi resmi Ditjen Binalavotas yang diakui kementerian dan global.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 05 — INFORMASI PENDAFTARAN & REGISTRASI (Black #000, text #fff) */}
      <FlowSection
        aria-label="Informasi Pendaftaran dan Registrasi"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            05 — Informasi Pendaftaran &amp; Registrasi
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Mulai
            <br />
            Langkah
            <br />
            Karier
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Biaya registrasi transparan Rp 1.500.000 untuk unlock seluruh modul LMS &amp; evaluasi akhir.
          Gelombang pendaftaran batch terbaru resmi dibuka untuk alokasi keberangkatan tahun ini.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Biaya Resmi
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Biaya Rp 1,5 Juta
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Investasi transparan mencakup modul digital vokasi, bank latihan soal, dan persiapan karantina.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Alokasi Mitra
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Batch Terbaru Dibuka
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Kuota terbatas sesuai ketersediaan penempatan industri di Jepang, Jerman, dan Korea Selatan.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Prosedur Cepat
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Alur Terpadu Online
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Pendaftaran akun mandiri, verifikasi berkas administrasi online, dan tes kualifikasi terjadwal.
            </p>
          </div>
        </div>
      </FlowSection>
    </FlowArt>
  );
}

export default Chapter02StoryScroll;
