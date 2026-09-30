"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { authSessionStore } from "@/lib/auth-session";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Info,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

export function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const router = useRouter();
  const [step, setStep] = React.useState<"form" | "success">("form");
  const [name, setName] = React.useState("");
  const [nik, setNik] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("Jepang");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !nik.trim() || !email.trim()) {
      toast.error("Mohon lengkapi seluruh formulir pendaftaran");
      return;
    }

    if (nik.trim().length !== 16) {
      toast.error("NIK harus berjumlah 16 digit");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simpan session baru sebagai Peserta Magang
      authSessionStore.setSession(email.trim(), "Peserta Magang", name.trim());
      setStep("success");
      toast.success("Pendaftaran Berhasil!", {
        description: `Selamat bergabung di ekosistem vokasi Kemnaker RI, ${name.trim()}!`,
      });
    }, 900);
  };

  const handleGoToPesertaDashboard = () => {
    router.push("/dashboard/peserta");
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="step-form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-neutral-900 tracking-tighter">
                Daftar Peserta
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Buat akun untuk memulai tahapan magang internasional bilateral.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">
                  Nama Lengkap Sesuai KTP
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-xs placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">
                  Nomor Induk Kependudukan (NIK 16 Digit)
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{16}"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                  placeholder="16 Digit NIK terdaftar di Dukcapil"
                  className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">
                  Alamat Email Aktif
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-xs placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-700">
                  Peminatan Negara Penempatan
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-xs focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none cursor-pointer"
                >
                  <option value="Jepang">🇯🇵 Jepang (JITCO Otomotif &amp; Presisi)</option>
                  <option value="Jerman">🇩🇪 Jerman (Ausbildung VET &amp; Mekatronika)</option>
                  <option value="Korea Selatan">🇰🇷 Korea Selatan (HRD Korea Manufaktur)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-6 mt-3 bg-blue-600 text-white font-medium text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mendaftarkan...
                  </span>
                ) : (
                  <>
                    <span>Daftar Akun Peserta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-neutral-600">
                  Sudah memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Masuk di sini
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-center py-6 space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-900">
                Pendaftaran Berhasil!
              </h2>
              <p className="text-xs text-neutral-600 font-normal max-w-sm mx-auto leading-relaxed">
                Akun kandidat magang atas nama <strong>{name}</strong> telah terdaftar. Anda dapat langsung mengakses portal belajar LMS dan dashboard peserta.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2.5 max-w-xs mx-auto">
              <button
                type="button"
                onClick={handleGoToPesertaDashboard}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Portal Peserta Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSwitchToLogin}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors py-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Login</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RegisterForm;
