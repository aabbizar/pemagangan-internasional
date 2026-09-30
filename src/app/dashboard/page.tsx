"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Users,
  Briefcase,
  BarChart3,
  Settings,
  ArrowRight,
  ShieldCheck,
  Layers,
  Info,
} from "lucide-react";

export default function DashboardPage() {
  const modules = [
    {
      title: "Modul Peserta Magang",
      href: "/participants",
      icon: Users,
      status: "Arsitektur Siap",
      note: "Integrasi Data Terjadwal",
      badgeColor: "bg-black/5 text-[#121212] border-black/10",
      description: "Struktur registri master dipersiapkan untuk verifikasi NIK Dukcapil dan validasi ijazah vokasi SMK/Politeknik.",
    },
    {
      title: "Modul Program Magang",
      href: "/programs",
      icon: Briefcase,
      status: "Struktur Terverifikasi",
      note: "Validasi Kuota Bilateral",
      badgeColor: "bg-black/5 text-[#121212] border-black/10",
      description: "Taksonomi batch pemagangan internasional untuk kuota G-to-G Jepang, Ausbildung Jerman, dan Sending Organization terakreditasi.",
    },
    {
      title: "Laporan & Audit Analitik",
      href: "/reports",
      icon: BarChart3,
      status: "Ruang Analitik",
      note: "Siap Penerapan",
      badgeColor: "bg-black/5 text-[#121212] border-black/10",
      description: "Dimensi analitik kelulusan, KPI pemantauan keberangkatan, dan kepatuhan standar upah minimum KBRI.",
    },
    {
      title: "Pengaturan & Akses RBAC",
      href: "/settings",
      icon: Settings,
      status: "Model Akses Terdefinisi",
      note: "Sesuai Matriks Eselon",
      badgeColor: "bg-black/5 text-[#121212] border-black/10",
      description: "Matriks otorisasi hak akses (RBAC), integrasi SSO SIAPkerja, dan parameter audit log keamanan negara.",
    },
  ];

  return (
    <DashboardLayout pageTitle="WORKSPACE OPERASIONAL">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Workspace Header Notice */}
        <div className="bg-white/85 border border-black/15 p-6 sm:p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/10 text-[#121212] text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#374336]" />
            <span>Sistem Informasi Pemagangan • Kemnaker RI</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-[#121212]">
            Workspace Administrasi Operasional
          </h1>

          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
            Portal kendali terpadu untuk monitoring peserta, approval program bilateral, dan pelaporan kepatuhan pemagangan internasional.
          </p>

          <div className="pt-3 border-t border-black/10 flex flex-wrap items-center gap-6 text-xs font-mono text-muted">
            <div className="flex items-center gap-2">
              {/* Penanda status: kotak tajam (bukan pill berdenyut — AETHEREAL §1).
                  Makna tetap dibawa teks, bukan warna (WCAG 1.4.1). */}
              <span className="w-2 h-2 bg-success" aria-hidden="true" />
              <span>Sistem Sesi Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#374336]" />
              <span>Otoritas Verifikator BPVP / Ditjen Binalavotas</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="bg-white/85 border border-black/15 p-6 sm:p-7 flex flex-col justify-between hover:border-black/40 transition-colors shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#121212] text-[#E3E1DC] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 border ${m.badgeColor}`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold font-display uppercase tracking-tight text-[#121212] group-hover:text-[#374336] transition-colors">
                    {m.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light mt-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase">
                    {m.note}
                  </span>
                  <Link
                    href={m.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#121212] hover:text-[#374336] transition-colors"
                  >
                    <span>Buka Modul</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Assurance Bar */}
        <div className="p-4 bg-white/70 border border-black/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#374336] shrink-0" />
            <span>Kementerian Ketenagakerjaan RI • Standar Kepatuhan Permenaker No. 6 Tahun 2020</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            AETHEREAL ARCHITECTURAL GOVTECH
          </span>
        </div>

      </div>
    </DashboardLayout>
  );
}
