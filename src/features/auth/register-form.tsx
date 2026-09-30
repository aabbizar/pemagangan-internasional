"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [step, setStep] = React.useState<"form" | "success">("form");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1200);
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
            <div className="mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-neutral-900 tracking-tight">
                Daftar Peserta
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Buat akun untuk memulai perjalanan magang internasional Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">
                  Nama Lengkap Sesuai KTP
                </label>
                <input
                  type="text"
                  required
                  placeholder="Budi Santoso"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-sm placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{16}"
                  maxLength={16}
                  placeholder="16 Digit NIK"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-sm placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-sm placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-6 mt-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mendaftarkan...
                  </span>
                ) : (
                  <>
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 text-center">
                <p className="text-sm text-neutral-600">
                  Sudah memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 font-semibold hover:underline"
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
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-900">
                Pendaftaran Berhasil!
              </h2>
              <p className="text-sm text-neutral-500 font-normal max-w-sm mx-auto">
                Akun Anda telah berhasil dibuat. Silakan masuk dengan email Anda.
              </p>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                onClick={onSwitchToLogin}
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Halaman Login</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
