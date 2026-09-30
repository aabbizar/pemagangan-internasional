"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { InputOtp } from "@/components/ui/input-otp";
import { authSessionStore } from "@/lib/auth-session";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  UserCheck,
  ShieldAlert,
} from "lucide-react";

const ADMIN_EMAILS = ["superadmin@kemnaker.go.id", "admin@demo.id"];
const DEMO_PESERTA_EMAIL = "peserta@demo.id";
const ACCEPTED_OTP = "123456";
const RESEND_INTERVAL_SECONDS = 30;

export function AuthForm({ onSwitchToRegister }: { onSwitchToRegister?: () => void }) {
  const router = useRouter();
  const [step, setStep] = React.useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(RESEND_INTERVAL_SECONDS);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [otpError, setOtpError] = React.useState<string | null>(null);

  const isAdmin = ADMIN_EMAILS.includes(email.trim().toLowerCase());

  // 30s Mock Countdown Timer for OTP resend
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // STEP 1: Handle Email Submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      const err = "Format email tidak valid (contoh: nama@domain.com)";
      setEmailError(err);
      toast.error("Format email keliru", { description: err });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(RESEND_INTERVAL_SECONDS);
      toast.success("Kode Verifikasi Terkirim", {
        description: `Kode 6-digit dikirim ke ${trimmedEmail} (Kode Demo: 123456)`,
      });
    }, 500);
  };

  // STEP 2: Handle OTP Verification
  const handleOtpVerification = (submittedOtp: string) => {
    setOtpError(null);

    if (submittedOtp.length !== 6) {
      const err = "Masukkan 6 digit kode verifikasi lengkap";
      setOtpError(err);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (submittedOtp === ACCEPTED_OTP) {
        const isSuperAdmin = ADMIN_EMAILS.includes(email.trim().toLowerCase());

        if (isSuperAdmin) {
          authSessionStore.setSession(
            email.trim(),
            "Super Administrator",
            "Super Admin Verifikator"
          );
        } else {
          authSessionStore.setSession(
            email.trim(),
            "Peserta Magang",
            "Budi Santoso"
          );
        }

        setStep("success");
        const destination = isSuperAdmin ? "Dashboard Super Admin" : "Portal Peserta Magang";
        toast.success("Verifikasi Berhasil", {
          description: `Mengarahkan ke ${destination}...`,
        });

        setTimeout(() => {
          if (isSuperAdmin) {
            router.push("/dashboard");
          } else {
            router.push("/dashboard/peserta");
          }
        }, 900);
      } else {
        const err = "Kode OTP tidak cocok. Gunakan kode demo: 123456";
        setOtpError(err);
        toast.error("Kode Salah", { description: err });
      }
    }, 500);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_INTERVAL_SECONDS);
    setOtp("");
    setOtpError(null);
    toast.info("Kode OTP Dikirim Ulang", {
      description: `Kode demo tetap: 123456`,
    });
  };

  const handleFillAdminEmail = () => {
    setEmail("superadmin@kemnaker.go.id");
    setEmailError(null);
    toast.info("Kredensial Super Admin Terisi", {
      description: "Akun Super Admin disediakan langsung oleh developer/sistem.",
    });
  };

  const handleFillPesertaEmail = () => {
    setEmail(DEMO_PESERTA_EMAIL);
    setEmailError(null);
    toast.info("Kredensial Peserta Magang Terisi", {
      description: "Akun peserta magang terdaftar (Budi Santoso).",
    });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* STEP 1: EMAIL ENTRY */}
        {step === "email" && (
          <motion.div
            key="step-email"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-neutral-900 tracking-tighter">
                Masuk Dasbor
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Akses workspace Super Admin atau portal kandidat magang Anda.
              </p>
            </div>

            {/* Quick Demo Autofill Chips */}
            <div className="mb-6 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block font-semibold">
                Pilih Akun Cepat (Testing PoC):
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleFillAdminEmail}
                  className="flex-1 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-800 text-xs font-mono text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="truncate">
                    <span className="font-bold block">👑 Super Admin</span>
                    <span className="text-[10px] text-indigo-600 truncate block">superadmin@kemnaker.go.id</span>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-200/60 px-1.5 py-0.5 rounded text-indigo-900 shrink-0 ml-1">Pilih</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillPesertaEmail}
                  className="flex-1 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-mono text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="truncate">
                    <span className="font-bold block">🎓 Peserta Magang</span>
                    <span className="text-[10px] text-emerald-600 truncate block">peserta@demo.id</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-200/60 px-1.5 py-0.5 rounded text-emerald-900 shrink-0 ml-1">Pilih</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Alamat Email
                </label>

                <div className="relative">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="nama@instansi.go.id atau peserta@email.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error-msg" : "email-helper-msg"}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 text-sm placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  />
                </div>

                {emailError ? (
                  <p
                    id="email-error-msg"
                    role="alert"
                    aria-live="polite"
                    className="text-xs text-red-500 font-medium pt-0.5"
                  >
                    {emailError}
                  </p>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-6 mt-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span>Lanjutkan ke Verifikasi OTP</span>
                )}
              </button>

              {onSwitchToRegister && (
                <div className="pt-3 text-center">
                  <p className="text-sm text-neutral-600">
                    Belum memiliki akun peserta?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                      Daftar Akun Peserta
                    </button>
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === "otp" && (
          <motion.div
            key="step-otp"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-900">
                Masukkan Kode OTP
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Kode 6-digit telah dikirimkan ke{" "}
                <span className="font-semibold text-neutral-900">{email}</span>
              </p>
              <div className="inline-block mt-1">
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                  Kode Demo: 123456
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <InputOtp
                maxLength={6}
                value={otp}
                onChange={(val) => {
                  setOtp(val);
                  if (otpError) setOtpError(null);
                  if (val.length === 6) {
                    handleOtpVerification(val);
                  }
                }}
                disabled={isLoading}
              />

              {otpError && (
                <p className="text-xs text-red-500 font-medium text-center">
                  {otpError}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setOtp(ACCEPTED_OTP);
                  handleOtpVerification(ACCEPTED_OTP);
                }}
                className="text-xs font-mono text-blue-600 hover:underline cursor-pointer"
              >
                Isi Otomatis OTP (123456)
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setOtpError(null);
                }}
                className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ganti Email</span>
              </button>

              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={handleResendOtp}
                className="text-blue-600 hover:underline disabled:text-neutral-400 font-medium transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {resendTimer > 0
                    ? `Kirim ulang (${resendTimer}s)`
                    : "Kirim Ulang"}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS STATE */}
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
                Otorisasi Berhasil
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Sesi {isAdmin ? "Super Admin" : "Peserta Magang"} aktif. Mengalihkan ke dashboard...
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <div className="w-6 h-6 border-2 border-neutral-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AuthForm;
