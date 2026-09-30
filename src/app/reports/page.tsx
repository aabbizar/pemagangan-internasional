"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  BarChart3,
  Clock,
} from "lucide-react";

/**
 * MODUL LAPORAN & AUDIT — referensi Fase C (retokenisasi AETHEREAL).
 *
 * Aturan yang dipakai bersama oleh keempat halaman modul:
 * - Kontras: kartu `bg-white/85 border border-black/15 shadow-sm` (sama dengan
 *   halaman dashboard). Radius tajam; `rounded` 4px hanya untuk kontrol kecil.
 * - Status: token Palet Status Fungsional (Notis Kanonis, design-system.md)
 *   sebagai stempel mono bertepi 1px — bukan pill berdenyut, bukan emerald/cyan.
 * - Penundaan Fase 3 = status menunggu → `bg-warning/10 text-warning
 *   border-warning/30`; label deskriptif netral → `bg-black/5 border-black/10`.
 * - Bahasa: Bahasa Indonesia, selaras sidebar dan halaman dashboard. Istilah
 *   teknis (SKKNI, CSV, SO) tidak diterjemahkan.
 */
export default function ReportsPage() {
  const reportCategories = [
    {
      title: "Efisiensi Penempatan Bilateral",
      code: "REP-BPE-01",
      dimensions:
        "Durasi siklus batch, latensi pemrosesan visa, tingkat onboarding perusahaan tuan rumah",
      targetFormat: "Ringkasan Eksekutif Teragregasi & Dossier CSV",
    },
    {
      title: "Kesesuaian Kompetensi Vokasi",
      code: "REP-VCA-02",
      dimensions:
        "Korelasi jurusan politeknik / SMK dengan kebutuhan industri luar negeri",
      targetFormat: "Matriks Kecocokan Kurikulum (SKKNI vs Standar Internasional)",
    },
    {
      title: "Representasi Regional & Demografi",
      code: "REP-RRD-03",
      dimensions:
        "Distribusi kandidat per provinsi di 38 provinsi Indonesia",
      targetFormat: "Metrik Kesetaraan Geografis",
    },
    {
      title: "Kepatuhan Organisasi Pengirim (SO)",
      code: "REP-SOC-04",
      dimensions:
        "Lembaga pelatihan berlisensi, retensi peserta magang, kepatuhan regulasi",
      targetFormat: "Indeks Risiko Akreditasi",
    },
  ];

  return (
    <DashboardLayout pageTitle="LAPORAN & AUDIT">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Module Header Bar */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-black/5 text-ink border-black/10">
              Ruang Kerja Analitik Mendatang
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-warning/10 text-warning border-warning/30 font-semibold">
              Implementasi Ditunda
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-ink">
            Modul Laporan &amp; Audit
          </h1>

          <p className="text-xs sm:text-sm text-muted font-light max-w-2xl leading-relaxed">
            Skema analitik dan dimensi laporan kementerian untuk hasil magang
            vokasi internasional.
          </p>
        </div>

        {/* Deferred State Notice — status menunggu (Fase 3) */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-8 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 bg-warning/10 text-warning border border-warning/30 flex items-center justify-center">
            <BarChart3 className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-1.5 max-w-lg">
            <h2 className="text-lg font-bold font-display uppercase tracking-tight text-ink">
              Perhitungan Analitik Ditunda
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              Sesuai batas arsitektur Fase 2B, metrik sintetis dan grafik
              dekoratif sepenuhnya dikecualikan. Dimensi analitik di bawah
              mencerminkan taksonomi laporan yang disetujui untuk agregasi
              basis data Fase 3.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/5 border border-black/10 text-muted text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-warning" aria-hidden="true" />
            <span>Dijadwalkan pada Fase 3: Integrasi Mesin Analitik</span>
          </div>
        </div>

        {/* Established Reporting Schemas */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-muted">
            Dimensi Laporan yang Disetujui (Spesifikasi Taksonomi):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportCategories.map((rep) => (
              <div
                key={rep.code}
                className="bg-white/85 border border-black/15 shadow-sm p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted">{rep.code}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border bg-warning/10 text-warning border-warning/30">
                    Implementasi Ditunda
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display uppercase text-ink">
                  {rep.title}
                </h3>

                <div className="text-xs text-muted font-light space-y-1 bg-black/5 p-3 border border-black/10">
                  <span className="font-mono text-[10px] uppercase text-muted block">
                    Dimensi:
                  </span>
                  <p>{rep.dimensions}</p>
                </div>

                <div className="text-[11px] font-mono text-muted flex items-center justify-between pt-1">
                  <span>Keluaran: {rep.targetFormat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
