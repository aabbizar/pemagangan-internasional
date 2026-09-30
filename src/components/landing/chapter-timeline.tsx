"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  Laptop,
  Award,
  Users2,
  PlaneTakeoff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface TimelineStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  requirements: string[];
  badges: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderGlow: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: "Langkah 01",
    number: "01",
    title: "Asesmen & Registrasi Mandiri",
    subtitle: "Validasi NIK Dukcapil & Tes Potensi Skolastik IQ",
    description:
      "Pendaftaran digital akun peserta secara mandiri. Verifikasi identitas kependudukan, unggah berkas akademik vokasi, dan pengerjaan asesmen IQ terstandar nasional secara objektif.",
    duration: "1 - 3 Hari Kerja",
    requirements: ["WNI usia min. 18 tahun", "Skor IQ minimal 92", "KTP & Ijazah SMK/Diploma/S1"],
    badges: ["Bebas Calo", "Seleksi Objektif"],
    icon: UserCheck,
    accentColor: "from-blue-500 to-cyan-400",
    borderGlow: "group-hover:border-cyan-400/60",
  },
  {
    step: "Langkah 02",
    number: "02",
    title: "Pelatihan Vokasi Hybrid Terpadu",
    subtitle: "80% Kurikulum Daring LMS + 20% Pembekalan Fisik Luring",
    description:
      "Akses penuh ekosistem modul pembelajaran LMS berstandar industri internasional. Pendalaman bahasa kerja (Jepang/Jerman/Korea), tata krama industri (Hou-Ren-So), dan karantina fisik luring intensif.",
    duration: "3 - 4 Bulan",
    requirements: ["Investasi LMS Rp 1.500.000", "Kehadiran LMS min. 85%", "Pemantapan Fisik Luring"],
    badges: ["Hybrid 80/20", "Modul Industri"],
    icon: Laptop,
    accentColor: "from-amber-500 to-orange-400",
    borderGlow: "group-hover:border-orange-400/60",
  },
  {
    step: "Langkah 03",
    number: "03",
    title: "Uji Kompetensi & Sertifikasi Bahasa",
    subtitle: "Ujian Akhir Semester (UAS) & Akreditasi Resmi",
    description:
      "Evaluasi komprehensif penguasaan materi vokasi melalui Ujian Akhir Semester (UAS) terstandar BPVP Kemnaker RI serta sertifikasi kecakapan bahasa negara tujuan yang diakui global.",
    duration: "2 - 3 Minggu",
    requirements: ["Lulus UAS min. 75", "JLPT N4 / Goethe A2 / TOPIK", "Sertifikat Vokasi Resmi"],
    badges: ["Akreditasi Kemnaker", "Standar Global"],
    icon: Award,
    accentColor: "from-emerald-500 to-teal-400",
    borderGlow: "group-hover:border-emerald-400/60",
  },
  {
    step: "Langkah 04",
    number: "04",
    title: "Matching Industri & Wawancara User",
    subtitle: "Seleksi Langsung dengan Pimpinan Perusahaan Asing",
    description:
      "Peserta yang lolos kualifikasi langsung dipertemukan dengan delegasi Accepting Organization atau perusahaan mitra resmi bilateral (Jepang JITCO, Jerman IHK, Korea HRD) via sesi wawancara langsung.",
    duration: "2 - 4 Minggu",
    requirements: ["Portofolio & Resume Terjemahan", "Wawancara User Langsung", "Penerbitan LoA Kerja"],
    badges: ["100% Mitra Terverifikasi", "Jaminan Kontrak"],
    icon: Users2,
    accentColor: "from-indigo-500 to-purple-400",
    borderGlow: "group-hover:border-purple-400/60",
  },
  {
    step: "Langkah 05",
    number: "05",
    title: "Penerbitan COE, Visa & Keberangkatan",
    subtitle: "Legalisasi Dokumen Bilateral & Pelepasan Resmi",
    description:
      "Pengurusan Certificate of Eligibility (COE), kontrak kerja bilateral tersahkan KBRI, penerbitan visa kerja resmi Kemnaker RI, serta pembekalan akhir (pre-departure briefing) sebelum terbang ke negara penempatan.",
    duration: "1 - 2 Bulan",
    requirements: ["COE & Visa Resmi", "Medical Checkup Akhir", "Pelepasan Resmi Kemnaker RI"],
    badges: ["Proteksi Penuh KBRI", "Terbang Resmi"],
    icon: PlaneTakeoff,
    accentColor: "from-rose-500 to-pink-400",
    borderGlow: "group-hover:border-pink-400/60",
  },
];

export function ChapterTimeline(): React.ReactElement {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  return (
    <section
      id="timeline"
      aria-label="Alur dan Tahapan Pemagangan Internasional"
      className="relative w-full bg-[#0B132B] text-white py-28 sm:py-36 overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience Subtle Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Roadmap • Alur Perjalanan Kandidat</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight leading-[1.05] text-white mb-6">
            LIMA TAHAP RESMI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">
              MENUJU PANGGUNG DUNIA.
            </span>
          </h2>

          <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Sistem seleksi dan pembinaan meritokratis yang transparan tanpa calo. Setiap tahap dirancang
            presisi untuk memastikan kompetensi vokasi dan perlindungan hukum bilateral Anda terjamin penuh.
          </p>
        </div>

        {/* Step Selector Tab for Quick Jump (Desktop & Tablet) */}
        <div className="hidden lg:grid grid-cols-5 gap-3 mb-16 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {TIMELINE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3 relative cursor-pointer ${
                  isCurrent
                    ? "bg-white/10 border border-white/20 shadow-lg text-white"
                    : "hover:bg-white/[0.04] text-neutral-400 hover:text-neutral-200 border border-transparent"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                      : "bg-white/5 text-neutral-400"
                  }`}
                >
                  {item.number}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 truncate">
                    {item.step}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-tight text-white truncate mt-0.5">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Vertical/Horizontal Timeline Pathway */}
        <div className="relative">
          {/* Connecting Vertical Track on Mobile/Tablet */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500/20 hidden sm:block lg:hidden" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-8 lg:gap-8">
            {TIMELINE_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 border backdrop-blur-md ${
                    isSelected
                      ? "bg-white/[0.07] border-white/30 shadow-2xl shadow-blue-900/30 scale-[1.01]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8">
                    
                    {/* Left: Step Indicator & Title */}
                    <div className="flex items-start gap-4 sm:gap-6 lg:w-[42%] shrink-0">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 shadow-inner ${
                          isSelected
                            ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-black border-cyan-300 shadow-cyan-500/40"
                            : "bg-white/10 text-white border-white/15"
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                            TAHAP {item.number}
                          </span>
                          <span className="text-neutral-500 text-xs font-mono">•</span>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {item.duration}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Detailed Description & Badges */}
                    <div className="lg:w-[38%] space-y-4">
                      <p className="text-sm sm:text-[15px] text-neutral-300 font-light leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-white/5 border border-white/15 text-neutral-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Checklist Requirements */}
                    <div className="lg:w-[20%] p-4 rounded-xl bg-black/30 border border-white/10 shrink-0 space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
                        Kriteria Utama:
                      </span>
                      <ul className="space-y-2">
                        {item.requirements.map((req, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-start gap-2 text-xs text-neutral-300 font-light leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-cyan-900/20 to-neutral-900/80 border border-cyan-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white">
              Siap Memulai Langkah Pertama Anda?
            </h4>
            <p className="text-neutral-300 text-sm font-light max-w-xl">
              Pendaftaran peserta magang terbuka sepanjang tahun untuk kuota penempatan Jepang, Jerman,
              dan Korea Selatan. Akses formulir digital sekarang.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Daftar Akun Peserta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#info-pemagangan"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors text-center"
            >
              Lihat Syarat Lengkap
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ChapterTimeline;
