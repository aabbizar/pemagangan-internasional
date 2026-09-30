"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { authSessionStore, getServerSnapshot } from "@/lib/auth-session";
import {
  GraduationCap,
  FileCheck2,
  CalendarCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Building2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

export default function PesertaDashboardPage() {
  const session = React.useSyncExternalStore(
    authSessionStore.subscribe,
    authSessionStore.getSession,
    getServerSnapshot
  );

  const participantName = session?.name || "Budi Santoso";
  const participantEmail = session?.email || "peserta@demo.id";

  const [activeTab, setActiveTab] = React.useState<"kurikulum" | "berkas" | "matching">("kurikulum");

  const lmsModules = [
    {
      id: "MOD-01",
      title: "Bahasa Asing Vokasi & Kosakata Industri",
      type: "Bahasa Jepang / Bunpou N4",
      progress: 100,
      status: "Selesai",
      score: "94 / 100",
      instructor: "Sensei Kenji Takahashi (JITCO)",
    },
    {
      id: "MOD-02",
      title: "Etika & Budaya Kerja Pabrik (Hou-Ren-So)",
      type: "Karakter & Disiplin Industri",
      progress: 100,
      status: "Selesai",
      score: "88 / 100",
      instructor: "Drs. H. Bambang Sujarwo (BPVP)",
    },
    {
      id: "MOD-03",
      title: "Standar Keselamatan Kerja (K3) & Metodologi 5S",
      type: "Kesehatan & Keamanan Kerja",
      progress: 68,
      status: "Sedang Berjalan",
      score: "Tahap Evaluasi",
      instructor: "Ir. Joko Prasetyo, M.T.",
    },
    {
      id: "MOD-04",
      title: "Praktik Pengoperasian Mesin & Assembly",
      type: "Vokasi Teknik Manufaktur",
      progress: 30,
      status: "Terkunci Sebagian",
      score: "Menunggu Jadwal Luring",
      instructor: "Tim Mentor Industri Vokasi",
    },
  ];

  const documents = [
    {
      name: "Kartu Tanda Penduduk (e-KTP)",
      number: "3273************",
      status: "Terverifikasi Dukcapil",
      verifiedAt: "28 Sep 2026",
      isSuccess: true,
    },
    {
      name: "Ijazah Vokasi SMK / Diploma",
      number: "IJZ-2024-SMK0981",
      status: "Terverifikasi Dapodik",
      verifiedAt: "29 Sep 2026",
      isSuccess: true,
    },
    {
      name: "Hasil Asesmen Skor IQ (>92)",
      number: "Skor Tes: 114 (Superior)",
      status: "Lolos Kualifikasi",
      verifiedAt: "29 Sep 2026",
      isSuccess: true,
    },
    {
      name: "Surat Keterangan Catatan Kepolisian (SKCK)",
      number: "SKCK/2026/POLDA/8821",
      status: "Terverifikasi Mabes Polri",
      verifiedAt: "30 Sep 2026",
      isSuccess: true,
    },
    {
      name: "Paspor Internasional 48 Halaman",
      number: "Dalam Proses Imigrasi",
      status: "Menunggu Antrean",
      verifiedAt: "Estimasi 7 Hari",
      isSuccess: false,
    },
  ];

  return (
    <DashboardLayout pageTitle="Portal Peserta Magang">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Welcome Cleopatra Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Kandidat Magang Resmi • Kemnaker RI</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Selamat Datang, {participantName}
              </h1>

              <p className="text-slate-500 text-sm max-w-2xl font-normal">
                No. Registrasi: <span className="font-mono font-medium text-slate-900">KMN-2026-08821</span> • Peminatan Negara:{" "}
                <span className="font-semibold text-cyan-700">Jepang (JITCO Otomotif)</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#timeline"
                className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2"
              >
                <span>Lihat Alur Tahapan</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>

              <button
                type="button"
                onClick={() => toast.success("Sertifikat kelulusan tahap awal berhasil diunduh!")}
                className="px-4 py-2 text-sm font-semibold bg-[#0096a6] hover:bg-[#008391] text-white rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Unduh Bukti Lolos</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar Banner */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider mb-2">
              <span className="font-bold text-slate-800">
                Progres Tahapan: Langkah 02 dari 05
              </span>
              <span className="text-cyan-700 font-bold">68% Selesai (Pelatihan LMS)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-teal-400 rounded-full transition-all duration-1000"
                style={{ width: "68%" }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-[11px] font-mono text-slate-500">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                ✓ 01. Asesmen IQ
              </span>
              <span className="text-cyan-700 font-bold flex items-center gap-1">
                ▶ 02. LMS Hybrid
              </span>
              <span>03. Uji UAS</span>
              <span>04. Wawancara User</span>
              <span>05. Visa & Terbang</span>
            </div>
          </div>
        </div>

        {/* 4 Cleopatra Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Skor IQ */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium text-slate-500">Skor Asesmen IQ</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
              114
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Memenuhi syarat (min. 92)</span>
            </div>
          </div>

          {/* Card 2: Bahasa */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium text-slate-500">Sertifikasi Bahasa</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              JLPT N4
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-cyan-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Lulus Terverifikasi JITCO</span>
            </div>
          </div>

          {/* Card 3: LMS Modules */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium text-slate-500">Progres LMS Vokasi</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
              34 <span className="text-sm text-slate-400 font-normal">/ 50 Modul</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-600">
              <Clock className="w-3.5 h-3.5" />
              <span>80% Daring • Aktif Berjalan</span>
            </div>
          </div>

          {/* Card 4: Tatap Muka Luring */}
          <div className="bg-white border border-slate-200/90 p-5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium text-slate-500">Diklat Luring (20%)</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              15 Okt 2026
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
              <span>Balai BPVP Bekasi</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Cleopatra Style) */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("kurikulum")}
            className={`pb-3 text-xs font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] flex items-center gap-2 ${
              activeTab === "kurikulum"
                ? "border-[#0096a6] text-[#0096a6] font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurikulum LMS Hybrid (80/20)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("berkas")}
            className={`pb-3 text-xs font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] flex items-center gap-2 ${
              activeTab === "berkas"
                ? "border-[#0096a6] text-[#0096a6] font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Dokumen &amp; Validasi NIK</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("matching")}
            className={`pb-3 text-xs font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] flex items-center gap-2 ${
              activeTab === "matching"
                ? "border-[#0096a6] text-[#0096a6] font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Matching Industri &amp; User</span>
          </button>
        </div>

        {/* Tab 1: Kurikulum LMS */}
        {activeTab === "kurikulum" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-neutral-900">
                  Daftar Modul Pembelajaran Aktif
                </h3>
                <p className="text-xs text-neutral-500 font-light">
                  Akses modul daring 80% dan persiapan pemantapan luring 20% sebelum UAS komprehensif.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-700">
                LMS Ver: 2026.3 • Sync Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {lmsModules.map((m) => (
                <div
                  key={m.id}
                  className="bg-white/90 border border-black/15 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-black/30 transition-colors"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-semibold border border-neutral-200">
                        {m.id}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">•</span>
                      <span className="text-xs text-blue-700 font-medium font-mono">{m.type}</span>
                    </div>

                    <h4 className="text-base font-bold font-sans text-neutral-900">
                      {m.title}
                    </h4>

                    <p className="text-xs text-neutral-500">
                      Instruktur Pengampu: <span className="font-medium text-neutral-700">{m.instructor}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-neutral-900">
                        {m.score}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Progres: {m.progress}%
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Membuka LMS: ${m.title}`)}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Pelajari</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Dokumen */}
        {activeTab === "berkas" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold font-display uppercase tracking-tight text-neutral-900">
                Status Verifikasi Berkas Administrasi
              </h3>
              <p className="text-xs text-neutral-500 font-light">
                Seluruh berkas terintegrasi langsung dengan database kependudukan dan dinas terkait.
              </p>
            </div>

            <div className="bg-white/90 border border-black/15 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-black/10 font-mono uppercase tracking-wider text-neutral-600">
                  <tr>
                    <th className="py-3.5 px-6">Nama Dokumen</th>
                    <th className="py-3.5 px-6">No. Identitas / Keterangan</th>
                    <th className="py-3.5 px-6">Status Validasi</th>
                    <th className="py-3.5 px-6 text-right">Tanggal Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-sans">
                  {documents.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-neutral-900">
                        {doc.name}
                      </td>
                      <td className="py-4 px-6 font-mono text-neutral-600">
                        {doc.number}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                            doc.isSuccess
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              doc.isSuccess ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-neutral-500">
                        {doc.verifiedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Matching Mitra */}
        {activeTab === "matching" && (
          <div className="space-y-4">
            <div className="bg-white/90 border border-black/15 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-semibold uppercase rounded-full">
                <span>Accepting Organization Terverifikasi Kemnaker</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold font-display uppercase tracking-tight text-neutral-900">
                    Toyota Auto Body Co., Ltd (Aichi, Jepang)
                  </h4>
                  <p className="text-sm text-neutral-600 font-light mt-1">
                    Divisi: Vokasi Teknisi Perakitan Otomotif &amp; Robotic Automation • Durasi Magang: 3 Tahun
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Jadwal Wawancara Online
                  </span>
                  <span className="text-base font-bold font-mono text-neutral-900">
                    24 Oktober 2026 • 09:00 WIB
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>Portofolio &amp; Hasil Tes IQ Telah Diterima Pihak User Asing</span>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Tautan Google Meet / Zoom akan aktif 24 jam sebelum jadwal.")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Lihat Panduan Wawancara
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
