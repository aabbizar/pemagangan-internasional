"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AlertCircle } from "lucide-react";

/**
 * MODUL PENGATURAN SISTEM — referensi Fase C (retokenisasi AETHEREAL).
 *
 * Aturan yang dipakai bersama oleh keempat halaman modul:
 * - Kontras: kartu `bg-white/85 border border-black/15 shadow-sm` (sama dengan
 *   halaman dashboard). Radius tajam; `rounded` 4px hanya untuk kontrol kecil.
 * - Status: token Palet Status Fungsional (Notis Kanonis, design-system.md)
 *   sebagai stempel mono bertepi 1px — bukan pill berdenyut, bukan emerald/cyan.
 * - Label tabel parameter memakai `text-muted` (6,7:1), bukan slate 2,56:1
 *   yang gagal WCAG AA.
 * - Bahasa: Bahasa Indonesia, selaras sidebar dan halaman dashboard. Istilah
 *   teknis (RBAC, PostgreSQL, SSO SIAPkerja, OIDC, NIK, Dukcapil) tidak
 *   diterjemahkan.
 */
export default function SettingsPage() {
  const configSections = [
    {
      title: "Role-Based Access Control (RBAC)",
      status: "Model Akses Belum Didefinisikan",
      badgeColor: "bg-warning/10 text-warning border-warning/30",
      description:
        "Tingkatan izin yang memisahkan pendaftar publik, verifikator seleksi daerah, dan direktur eselon kementerian.",
      parameters: [
        { key: "Peran Bawaan", val: "Administrator Verifikator (Simulasi Fase 2B)" },
        {
          key: "Tingkatan Target",
          val: "Peserta | Verifikator | Persetujuan Eselon II | Superadmin",
        },
        {
          key: "Penerapan",
          val: "PostgreSQL Row-Level Security (RLS) via JWT Claims",
        },
      ],
    },
    {
      title: "Penyedia Identitas & Single Sign-On",
      status: "Model Akses Belum Didefinisikan",
      badgeColor: "bg-warning/10 text-warning border-warning/30",
      description:
        "Antarmuka OAuth 2.0 / OpenID Connect yang menautkan rekaman identitas terpadu SSO SIAPkerja Kemnaker.",
      parameters: [
        { key: "Protokol", val: "OpenID Connect (OIDC) + PKCE (RFC 7636)" },
        { key: "Issuer URI", val: "https://account.kemnaker.go.id (Integrasi Fase 3)" },
        {
          key: "Masa Aktif Token",
          val: "3.600 detik (Access) / 30 hari (Refresh dengan Rotasi)",
        },
      ],
    },
    {
      title: "Pencatatan Audit & Imutabilitas Forensik",
      status: "Standar Audit Disahkan",
      badgeColor: "bg-black/5 text-ink border-black/10",
      description:
        "Jejak audit anti-pemalsuan yang merekam perubahan status seleksi dan verifikasi dokumen peserta.",
      parameters: [
        { key: "Standar", val: "Pedoman Kepatuhan ISO 27001 & BSSN" },
        {
          key: "Mesin Penyimpanan",
          val: "Ledger Append-only dengan Integritas Hash Kriptografis",
        },
        { key: "Kebijakan Retensi", val: "7 tahun untuk catatan diplomatik bilateral" },
      ],
    },
    {
      title: "Residensi Data Nasional & Zona Cloud",
      status: "Zona Data Nasional Siap",
      badgeColor: "bg-success/10 text-success border-success/30",
      description:
        "Kepatuhan infrastruktur hosting berdaulat Indonesia mengacu pada UU PDP No. 27/2022.",
      parameters: [
        {
          key: "Penyedia Cloud",
          val: "Pusat Data Nasional (PDN), Data Center Tier IV",
        },
        {
          key: "Enkripsi Data Disimpan",
          val: "AES-256 dengan Manajemen Kunci HSM Nasional",
        },
        { key: "Masking PII", val: "Pengaburan NIK & Paspor Wajib" },
      ],
    },
  ];

  return (
    <DashboardLayout pageTitle="PENGATURAN SISTEM">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="bg-white/85 border border-black/15 shadow-sm p-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-warning/10 text-warning border-warning/30 font-semibold">
              Model Akses Belum Didefinisikan
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border bg-success/10 text-success border-success/30">
              Arsitektur Keamanan Siap
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-ink">
            Konfigurasi Sistem
          </h1>

          <p className="text-xs sm:text-sm text-muted font-light max-w-2xl leading-relaxed">
            Parameter keamanan, definisi peran kementerian, dan konfigurasi
            arsitektur Single Sign-On.
          </p>
        </div>

        {/* Configuration Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {configSections.map((sec) => (
            <div
              key={sec.title}
              className="bg-white/85 border border-black/15 shadow-sm p-6 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-base font-bold font-display uppercase text-ink">
                    {sec.title}
                  </h2>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border shrink-0 ${sec.badgeColor}`}
                  >
                    {sec.status}
                  </span>
                </div>

                <p className="text-xs text-muted font-light leading-relaxed">
                  {sec.description}
                </p>

                {/* Parameters Table */}
                <div className="mt-4 space-y-2 pt-2 border-t border-black/10">
                  {sec.parameters.map((p) => (
                    <div
                      key={p.key}
                      className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1 border-b border-black/10 gap-1"
                    >
                      <span className="font-mono text-muted text-[11px]">{p.key}</span>
                      <span className="font-mono text-ink text-[11px] font-medium sm:text-right">
                        {p.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono text-muted flex items-center justify-between">
                <span>Skema: Disahkan</span>
                <span>Konfigurasi Aktif: Simulasi Baca-Saja</span>
              </div>
            </div>
          ))}
        </div>

        {/* Echelon Sign-Off Notice — panel netral (bukan slate legacy) */}
        <div className="bg-black/5 border border-black/10 p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-muted leading-relaxed space-y-1">
            <h2 className="font-bold text-ink block text-sm font-display uppercase">
              Kebijakan Akses Administratif
            </h2>
            <p>
              Pemberian hak akses administratif wajib ditetapkan secara resmi
              melalui Biro Kepegawaian &amp; Ditjen Binalavotas. Tidak ada peran
              administratif nyata yang dapat ditetapkan sendiri atau diubah di
              dalam lingkungan demonstrator ini.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
