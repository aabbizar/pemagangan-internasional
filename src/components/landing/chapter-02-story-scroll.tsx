'use client';

import * as React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

const UNIFIED_HEADLINE_CLASS =
  'text-[clamp(2.5rem,5.2vw,5.2rem)] font-bold leading-[0.86] uppercase tracking-tight';

export function Chapter02StoryScroll(): React.ReactElement {
  return (
    <FlowArt aria-label="Informasi Pemagangan Internasional" className="w-full">
      {/* 01 — INFORMASI INTERNSHIP / MAGANG */}
      <FlowSection
        aria-label="Informasi Program Internship"
        style={{ backgroundColor: '#fd5200', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            01 — Informasi Internship &amp; Magang
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
              Akses kuota resmi bilateral antar pemerintah dan mitra terakreditasi Kemnaker RI.
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
              Praktik kerja berstandar presisi di fasilitas manufaktur dan industri mancanegara.
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
              Perlindungan hak hukum, kontrak transparan, dan pendampingan KBRI di negara tujuan.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 02 — INFORMASI BEKERJA LEGAL */}
      <FlowSection
        aria-label="Jalur Bekerja Legal"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            02 — Informasi Bekerja Legal
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
          standar upah internasional, dan advokasi diplomasi bilateral penuh melalui pemerintah.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Pilar 01
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Status Legal
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
              Upah Global
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Gaji setara standar industri lokal, asuransi tenaga kerja, dan jaminan perlindungan penuh.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Pilar 03
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Mitra Teruji
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.85rem)] leading-relaxed text-neutral-300">
              Seluruh perusahaan penerima mitra telah melalui uji kelayakan legal secara komprehensif.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 03 — PELATIHAN LURING & DARING */}
      <FlowSection
        aria-label="Pelatihan Luring dan Daring"
        style={{ backgroundColor: '#1A3DE8', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            03 — Pelatihan Luring &amp; Daring
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Hybrid
            <br />
            Vokasi
            <br />
            Terpadu
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Metode pembelajaran modern yang dirancang khusus untuk memastikan peserta siap kerja. Mencakup modul digital intensif dan pembekalan tatap muka sebelum pelepasan.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          <div className="border border-white/10 bg-white/5 p-4 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block mb-0.5">
              Benefit Utama
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Benefit Pelatihan
            </p>
            <ul className="text-[clamp(0.75rem,0.9vw,0.9rem)] leading-relaxed text-blue-100/90 list-disc list-inside space-y-1">
              <li>Akses materi pembelajaran interaktif 24/7 via sistem LMS canggih.</li>
              <li>Mentoring bahasa asing secara intensif dengan native speaker.</li>
              <li>Simulasi wawancara kerja standar industri global.</li>
              <li>Bimbingan mental dan etos kerja profesional antar budaya.</li>
            </ul>
          </div>
          <div className="border border-white/10 bg-white/5 p-4 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 block mb-0.5">
              Administrasi
            </span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-white">
              Informasi Pendaftaran
            </p>
            <ul className="text-[clamp(0.75rem,0.9vw,0.9rem)] leading-relaxed text-blue-100/90 list-disc list-inside space-y-1">
              <li>Pendaftaran Batch 2026: Sedang Dibuka.</li>
              <li>Sistem seleksi dokumen dilakukan secara 100% online.</li>
              <li>Jadwal psikotes dan tes tertulis akan diinformasikan berkala.</li>
              <li>Verifikasi data diri terpusat melalui portal tunggal.</li>
            </ul>
          </div>
        </div>
      </FlowSection>

      {/* 04 — SYARAT MAGANG UMUM */}
      <FlowSection
        aria-label="Syarat Magang Umum"
        style={{ backgroundColor: '#F5F0E8', color: '#000' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85">
            04 — Syarat Magang &amp; Kualifikasi
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Kriteria
            <br />
            Seleksi
            <br />
            Bilateral
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90">
          Standar kualifikasi umum yang wajib dipenuhi oleh seluruh calon peserta pemagangan internasional untuk menjamin kualitas talenta vokasi Indonesia.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-black/25" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <div className="border border-black/15 bg-black/5 p-3.5 sm:p-5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Syarat 01
            </span>
            <p className="text-xs sm:text-base font-bold uppercase tracking-wider mb-1">
              IQ &gt; 92
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-relaxed text-black/75 mt-2">
              Wajib memiliki skor tes potensi akademik dan kesiapan mental dengan nilai IQ minimal di atas 92 poin.
            </p>
          </div>
          <div className="border border-black/15 bg-black/5 p-3.5 sm:p-5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Syarat 02
            </span>
            <p className="text-xs sm:text-base font-bold uppercase tracking-wider mb-1">
              Sertifikasi Bahasa
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-relaxed text-black/75 mt-2">
              Wajib memiliki salah satu kompetensi bahasa dasar (Jepang, Jerman, Korea, dsb) yang dibuktikan dengan sertifikat lembaga berwenang.
            </p>
          </div>
          <div className="border border-black/15 bg-black/5 p-3.5 sm:p-5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 block mb-0.5">
              Syarat 03
            </span>
            <p className="text-xs sm:text-base font-bold uppercase tracking-wider mb-1">
              Zona Domisili
            </p>
            <p className="text-[clamp(0.72rem,0.85vw,0.82rem)] leading-relaxed text-black/75 mt-2">
              Pendaftaran terbuka secara nasional untuk seluruh masyarakat Indonesia <strong>kecuali</strong> provinsi Papua dan area Makassar.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 05 — SYARAT KHUSUS CAREGIVER */}
      <FlowSection
        aria-label="Syarat Khusus Caregiver"
        style={{ backgroundColor: '#052E16', color: '#fff' }}
      >
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] opacity-85 text-emerald-200">
            05 — Kualifikasi Profesi Khusus
          </p>
          <hr className="my-2 sm:my-2.5 border-none border-t border-emerald-500/30" />
          <h2 className={UNIFIED_HEADLINE_CLASS}>
            Perawat
            <br />
            Lansia
            <br />
            (Caregiver)
          </h2>
        </div>

        <hr className="my-2 sm:my-2.5 border-none border-t border-emerald-500/30" />

        <p className="max-w-[60ch] text-[clamp(0.9rem,1.25vw,1.1rem)] font-normal leading-relaxed opacity-90 text-emerald-50">
          Sektor medis dan perawatan lansia (Caregiver) memiliki kualifikasi spesifik sesuai permintaan tinggi dari industri kesehatan global.
        </p>

        <hr className="my-2 sm:my-2.5 border-none border-t border-emerald-500/30" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          <div className="border border-emerald-500/20 bg-emerald-900/30 p-4 sm:p-5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block mb-0.5">
              Lisensi Wajib
            </span>
            <p className="text-xs sm:text-base font-bold uppercase tracking-wider mb-1 text-white">
              Sertifikat Keperawatan
            </p>
            <p className="text-[clamp(0.75rem,0.9vw,0.9rem)] leading-relaxed text-emerald-100/80 mt-2">
              Bagi yang memilih jalur Caregiver, diwajibkan telah menempuh pendidikan terkait atau memiliki sertifikasi profesi Perawat Lansia dari lembaga akreditasi.
            </p>
          </div>
          <div className="border border-emerald-500/20 bg-emerald-900/30 p-4 sm:p-5 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block mb-0.5">
              Demografi Prioritas
            </span>
            <p className="text-xs sm:text-base font-bold uppercase tracking-wider mb-1 text-white">
              Keterbukaan Gender
            </p>
            <p className="text-[clamp(0.75rem,0.9vw,0.9rem)] leading-relaxed text-emerald-100/80 mt-2">
              Sektor perawat lansia menerima pendaftaran pria maupun wanita secara bebas. Namun, permintaan industri menetapkan prioritas <strong>90% kuota wajib wanita</strong>.
            </p>
          </div>
        </div>
      </FlowSection>
    </FlowArt>
  );
}

export default Chapter02StoryScroll;
