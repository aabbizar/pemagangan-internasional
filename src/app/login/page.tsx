import Link from "next/link";
import { AuthForm } from "@/features/auth/auth-form";
import { ArrowLeft, Shield, Lock } from "lucide-react";

export const metadata = {
  title: "Akses Admin • Sistem Pemagangan Internasional Kemnaker RI",
  description: "Portal verifikasi identitas resmi pengelola operasional program pemagangan luar negeri Republik Indonesia.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden bg-[#E3E1DC]">
      {/* Top Back to Home Navigation */}
      <div className="w-full max-w-md mb-6 relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 hover:text-[#121212] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          Simulasi Verifikasi
        </span>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/5 border border-black/10 text-[#121212] text-[10px] font-mono uppercase tracking-widest mx-auto">
            <Lock className="w-3 h-3 text-[#374336]" />
            <span>Kementerian Ketenagakerjaan RI</span>
          </div>

          <h1 className="display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#121212]">
            AKSES ADMIN
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xs mx-auto leading-relaxed">
            Direktorat Jenderal Pembinaan Pelatihan Vokasi dan Produktivitas (Ditjen Binalavotas)
          </p>
        </div>

        {/* Multi-Step Authentication Form */}
        <AuthForm />

        {/* Security & Regulatory Verification Footer */}
        <div className="text-center space-y-1 pt-3 text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center justify-center gap-1.5 text-neutral-700">
            <Shield className="w-3.5 h-3.5 text-[#374336]" />
            <span>Protokol Identitas Terintegrasi SIAPkerja (Simulasi)</span>
          </div>
          <p className="text-neutral-500 text-[10px]">
            In-Memory Proof of Concept • Standar Keamanan GovTech Berbasis Peraturan Menteri
          </p>
        </div>
      </div>
    </div>
  );
}
