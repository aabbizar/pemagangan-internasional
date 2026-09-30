"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Search, Filter, Download, Database } from "lucide-react";

/**
 * MODUL PESERTA MAGANG — referensi Fase C (retokenisasi AETHEREAL).
 *
 * Aturan yang dipakai bersama oleh keempat halaman modul:
 * - Kontras: kartu `bg-white/85 border border-black/15 shadow-sm` (sama dengan
 *   halaman dashboard). Radius tajam; `rounded` 4px hanya untuk kontrol kecil.
 * - Status: token Palet Status Fungsional (Notis Kanonis, design-system.md)
 *   sebagai stempel mono bertepi 1px — bukan pill berdenyut, bukan emerald/cyan.
 * - Kontrol nonaktif: `disabled` membuatnya dikecualikan WCAG 1.4.3, tetapi
 *   token warnanya tetap disamakan agar tidak membawa hex legacy.
 * - Bahasa: Bahasa Indonesia, selaras sidebar dan halaman dashboard. Istilah
 *   teknis (Dukcapil NIK, Dapodik, PostgreSQL PDN) tidak diterjemahkan.
 */
export default function ParticipantsPage() {
  return (
    <DashboardLayout pageTitle="PESERTA MAGANG">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Module Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/85 border border-black/15 shadow-sm p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-success/10 text-success border-success/30 font-semibold">
                Arsitektur Siap
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-warning/10 text-warning border-warning/30">
                Integrasi Data Tertunda
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-ink">
              Modul Peserta Magang
            </h1>
            <p className="text-xs sm:text-sm text-muted font-light mt-1">
              Registri dosir kandidat vokasi nasional dan penempatan magang internasional.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled
              className="px-3.5 py-2 rounded border border-black/25 text-xs font-mono text-muted bg-black/5 flex items-center gap-1.5 cursor-not-allowed"
              title="Fitur ekspor aktif setelah integrasi basis data"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ekspor CSV</span>
            </button>
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded bg-ink text-stone border border-ink text-xs font-mono font-semibold uppercase tracking-wider opacity-60 cursor-not-allowed flex items-center gap-1.5"
            >
              <span>+ Daftarkan Kandidat</span>
            </button>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <label htmlFor="participant-search" className="sr-only">
              Cari peserta
            </label>
            <input
              id="participant-search"
              type="text"
              disabled
              placeholder="Cari berdasarkan NIK, nama, atau sekolah vokasi…"
              className="w-full pl-9 pr-4 py-2 rounded bg-black/[0.03] border border-black/45 text-xs font-mono text-ink placeholder:text-muted cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled
              className="px-3 py-2 rounded border border-black/25 text-xs font-mono text-muted bg-black/5 flex items-center gap-1.5 cursor-not-allowed"
            >
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Saring Batch</span>
            </button>
            <span className="text-xs font-mono text-muted pl-2">0 Rekaman Dimuat</span>
          </div>
        </div>

        {/* EMPTY STATE — ilustrasi SVG bergaya blueprint arsitektural */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-5">
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
            <svg
              viewBox="0 0 240 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-black/10"
              aria-hidden="true"
            >
              {/* Background Architectural Grid Lines */}
              <defs>
                <pattern id="emptyGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeDasharray="2 2"
                  />
                </pattern>
                <linearGradient
                  id="blueprintGrad"
                  x1="0"
                  y1="0"
                  x2="240"
                  y2="240"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#374336" stopOpacity="0.12" />
                  <stop stopColor="#121212" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              <rect width="240" height="240" fill="url(#blueprintGrad)" />
              <rect width="240" height="240" fill="url(#emptyGrid)" />

              {/* Dossier Card Outline */}
              <rect
                x="50"
                y="45"
                width="140"
                height="150"
                fill="#FFFFFF"
                stroke="#121212"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />

              {/* Top Card Accent */}
              <path
                d="M 50 65 L 50 45 L 190 45 L 190 65 Z"
                fill="#121212"
                fillOpacity="0.85"
              />
              <circle cx="65" cy="55" r="3" fill="#374336" />
              <circle cx="75" cy="55" r="3" fill="#5C5C5C" />

              {/* Avatar Silhouette */}
              <circle cx="120" cy="100" r="20" fill="#E3E1DC" stroke="#8A8A8A" strokeWidth="1.5" />
              <path
                d="M 96 138 C 96 124.7 106.7 114 120 114 C 133.3 114 144 124.7 144 138"
                fill="#E3E1DC"
                stroke="#8A8A8A"
                strokeWidth="1.5"
              />

              {/* Identity Form Field Placeholders (sudut tajam) */}
              <rect x="75" y="150" width="90" height="5" fill="black" fillOpacity="0.2" />
              <rect x="85" y="162" width="70" height="5" fill="black" fillOpacity="0.1" />
              <rect x="95" y="174" width="50" height="4" fill="black" fillOpacity="0.1" />

              {/* Status Stamp */}
              <g transform="translate(155, 150)">
                <circle cx="18" cy="18" r="16" fill="#374336" />
                <path
                  d="M 12 18 L 16 22 L 24 14"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>

          <div className="space-y-2 max-w-md">
            <h2 className="text-lg font-bold font-display uppercase tracking-tight text-ink">
              Belum Ada Rekaman Peserta
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              Skema registri peserta telah ditetapkan dan divalidasi. Rekaman peserta
              akan tampil setelah integrasi layanan NIK Dukcapil dan pendaftaran
              pendaftar daring terhubung.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/5 border border-black/10 text-muted text-xs font-mono">
            <Database className="w-3.5 h-3.5 text-moss" aria-hidden="true" />
            <span>Target penyimpanan: PostgreSQL PDN (Row-Level Security)</span>
          </div>
        </div>

        {/* Integration Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/85 border border-black/15 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted block">
              Verifikasi Identitas
            </span>
            <div className="text-xs font-semibold text-ink">Kueri Langsung NIK Dukcapil</div>
            <p className="text-[11px] text-muted font-light pt-1">
              Verifikasi demografi otomatis untuk kewarganegaraan dan usia kandidat.
            </p>
          </div>

          <div className="p-4 bg-white/85 border border-black/15 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted block">
              Validasi Akademik
            </span>
            <div className="text-xs font-semibold text-ink">Gerbang Dapodik &amp; PDDikti</div>
            <p className="text-[11px] text-muted font-light pt-1">
              Verifikasi langsung ijazah SMK dan politeknik kandidat.
            </p>
          </div>

          <div className="p-4 bg-white/85 border border-black/15 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted block">
              Kesiapan Virtualisasi
            </span>
            <div className="text-xs font-semibold text-ink">Mesin React Virtuoso</div>
            <p className="text-[11px] text-muted font-light pt-1">
              Dirancang untuk merender 10.000+ dosir kandidat dengan windowing 60fps.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
