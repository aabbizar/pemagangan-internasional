"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Clock, AlertCircle } from "lucide-react";

/**
 * MODUL PROGRAM MAGANG — referensi Fase C (retokenisasi AETHEREAL).
 *
 * Aturan yang dipakai bersama oleh keempat halaman modul:
 * - Kontras: kartu `bg-white/85 border border-black/15 shadow-sm` (sama dengan
 *   halaman dashboard). Radius tajam; `rounded` 4px hanya untuk kontrol kecil.
 * - Status: token Palet Status Fungsional (Notis Kanonis, design-system.md)
 *   sebagai stempel mono bertepi 1px — bukan pill berdenyut, bukan emerald/cyan.
 * - Kontrol nonaktif: `disabled` membuatnya dikecualikan WCAG 1.4.3, tetapi
 *   token warnanya tetap disamakan agar tidak membawa hex legacy.
 * - Bahasa: Bahasa Indonesia, selaras sidebar dan halaman dashboard. Istilah
 *   teknis (G-to-G, Ausbildung, IHK/AHK, Binalavotas, MoU) tidak diterjemahkan.
 *   Angka desimal memakai koma Indonesia (mis. 10.000+, 94,8%).
 */
export default function ProgramsPage() {
  const programs = [
    {
      code: "PRG-JPN-2026",
      country: "Jepang",
      flag: "🇯🇵",
      scheme: "G-to-G Bilateral (IM Japan)",
      status: "Struktur Terbentuk",
      note: "Konten Menunggu Validasi",
      description:
        "Inisiatif magang teknis bilateral resmi antar-pemerintah yang berfokus pada manufaktur presisi, otomasi industri, dan mekatronika.",
      sectors: ["Manufaktur Mesin", "Otomasi Industri", "Pengelasan Presisi"],
    },
    {
      code: "PRG-DEU-2026",
      country: "Jerman",
      flag: "🇩🇪",
      scheme: "Bilateral VET (Ausbildung Duale)",
      status: "Struktur Terbentuk",
      note: "Konten Menunggu Validasi",
      description:
        "Kemitraan pendidikan kejuruan ganda dengan kamar dagang industri Jerman (IHK/AHK), memadukan instruksi kelas dan magang industri terintegrasi di lokasi.",
      sectors: ["Teknik Kelistrikan", "Mekatronika Hijau", "Logistik Modern"],
    },
    {
      code: "PRG-KOR-2026",
      country: "Korea Selatan",
      flag: "🇰🇷",
      scheme: "G-to-P (Technical Internship)",
      status: "Struktur Terbentuk",
      note: "Konten Menunggu Validasi",
      description:
        "Model kemitraan pemerintah-ke-swasta yang menghubungkan lulusan politeknik dengan perusahaan penerima berlisensi di bidang perkapalan dan mikroelektronika.",
      sectors: ["Perkapalan Maritim", "Semikonduktor", "Konstruksi Berat"],
    },
    {
      code: "PRG-AUS-2026",
      country: "Australia",
      flag: "🇦🇺",
      scheme: "IA-CEPA VET Traineeship",
      status: "Struktur Terbentuk",
      note: "Konten Menunggu Validasi",
      description:
        "Jalur kejuruan pada kemitraan ekonomi bilateral komprehensif dengan kompetensi tempat kerja bersertifikat di bidang agroteknologi dan perhotelan internasional.",
      sectors: ["Agroteknologi", "Manajemen Perhotelan", "Operasional Rantai Pasok"],
    },
  ];

  return (
    <DashboardLayout pageTitle="PROGRAM MAGANG">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Module Header Bar */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-success/10 text-success border-success/30 font-semibold">
              Struktur Terbentuk
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-warning/10 text-warning border-warning/30">
              Konten Menunggu Validasi
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-ink">
            Modul Program Magang
          </h1>

          <p className="text-xs sm:text-sm text-muted font-light max-w-2xl leading-relaxed">
            Katalog magang vokasi internasional, kerangka bilateral negara mitra,
            dan definisi kuota tujuan.
          </p>
        </div>

        {/* Established Program Structures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog) => (
            <div
              key={prog.code}
              className="bg-white/85 border border-black/15 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-black/30 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" role="img" aria-label={prog.country}>
                      {prog.flag}
                    </span>
                    <div>
                      <div className="text-xs font-mono text-muted">{prog.code}</div>
                      <h2 className="text-base font-bold font-display uppercase text-ink">
                        {prog.country} • {prog.scheme}
                      </h2>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 border bg-success/10 text-success border-success/30 shrink-0">
                    {prog.status}
                  </span>
                </div>

                <p className="text-xs text-muted font-light leading-relaxed my-3">
                  {prog.description}
                </p>

                {/* Priority Sectors */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted">
                    Sektor Vokasi Prioritas:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.sectors.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-mono px-2 py-0.5 bg-black/5 text-ink border border-black/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publication Notice */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5 text-warning">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{prog.note}</span>
                </span>
                <span className="text-muted">Binalavotas Staging</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ministerial Approval Policy Notice — informasi tata kelola (netral) */}
        <div className="bg-black/5 border border-black/10 p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-moss shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-ink leading-relaxed space-y-1">
            <span className="font-bold block text-sm font-display uppercase">
              Protokol Tata Kelola Kementerian
            </span>
            <p>
              Parameter program, alokasi perusahaan tuan rumah, dan penyaluran
              tunjangan dikelola sesuai MoU bilateral resmi. Dosir program akan
              dibuka untuk pendaftaran peserta setelah ratifikasi resmi Eselon II.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
