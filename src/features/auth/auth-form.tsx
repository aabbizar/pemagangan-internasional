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
} from "lucide-react";

const ACCEPTED_EMAIL = "admin@demo.id";
const ACCEPTED_OTP = "123456";
const RESEND_INTERVAL_SECONDS = 30;

export function AuthForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(RESEND_INTERVAL_SECONDS);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [otpError, setOtpError] = React.useState<string | null>(null);

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

    if (trimmedEmail.toLowerCase() !== ACCEPTED_EMAIL.toLowerCase()) {
      const err = `Email simulasi belum terdaftar. Gunakan ${ACCEPTED_EMAIL}`;
      setEmailError(err);
      toast.error("Akun Tidak Ditemukan", {
        description: `Gunakan akun demo: ${ACCEPTED_EMAIL}`,
      });
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
    }, 600);
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
        authSessionStore.setSession(email.trim(), "Administrator Verifikator");

        setStep("success");
        toast.success("Verifikasi Berhasil", {
          description: "Mengarahkan ke Dashboard Pemagangan...",
        });

        setTimeout(() => {
          router.push("/dashboard");
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

  const handleFillDemoEmail = () => {
    setEmail(ACCEPTED_EMAIL);
    setEmailError(null);
  };

  const handleFillDemoOtp = () => {
    setOtp(ACCEPTED_OTP);
    setOtpError(null);
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border border-black/15 shadow-sm p-6 sm:p-8">
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
            <div className="mb-6 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#374336] font-semibold">
                Gerbang Keamanan • Langkah 1 dari 2
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#121212]">
                Verifikasi Identitas
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light">
                Masukkan alamat email resmi Anda untuk menerima kode akses verifikasi.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email-address"
                    className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-800"
                  >
                    Alamat Email Resmi
                  </label>
                  <span className="text-[11px] font-mono text-muted">Wajib</span>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                    <Mail className="w-4 h-4" />
                  </div>
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
                    placeholder="admin@demo.id"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error-msg" : "email-helper-msg"}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-black/45 text-neutral-900 text-sm placeholder:text-muted focus:bg-white focus:border-[#374336] focus:ring-1 focus:ring-[#374336] transition-all outline-none"
                  />
                </div>

                {emailError ? (
                  <p
                    id="email-error-msg"
                    role="alert"
                    aria-live="polite"
                    className="text-xs text-danger font-medium pt-0.5"
                  >
                    {emailError}
                  </p>
                ) : (
                  <p id="email-helper-msg" className="text-[11px] text-muted font-mono">
                    Verifikasi tanpa kata sandi melalui kode OTP 6-digit.
                  </p>
                )}
              </div>

              {/* Demo Helper Badge */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#374336] shrink-0" />
                  <span className="text-xs text-neutral-700 font-mono">Akun Demo:</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemoEmail}
                  className="text-xs font-mono font-semibold text-[#121212] hover:bg-black/5 px-2.5 py-1 border border-black/20 transition-colors"
                  aria-label="Isi otomatis dengan email demo admin@demo.id"
                >
                  admin@demo.id
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#121212] text-[#E3E1DC] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#374336] transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2 font-mono text-xs">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memvalidasi Akun...
                  </span>
                ) : (
                  <>
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-muted font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>Arsitektur Keamanan Terenkripsi GovTech</span>
              </div>
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
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 bg-neutral-100 text-[#121212] border border-neutral-300 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#374336] font-semibold">
                Kode Verifikasi Terkirim
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#121212]">
                Masukkan 6-Digit OTP
              </h2>
              <p className="text-xs text-neutral-600 font-light max-w-xs mx-auto">
                Kode verifikasi telah dikirimkan ke{" "}
                <span className="font-semibold text-neutral-900 font-mono">{email}</span>
              </p>
            </div>

            {/* OTP Input Component */}
            <div className="py-2 flex flex-col items-center justify-center">
              <InputOtp
                value={otp}
                onChange={(val) => {
                  setOtp(val);
                  if (otpError) setOtpError(null);
                }}
                maxLength={6}
                autoFocus
                disabled={isLoading}
              />

              {otpError && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="text-xs text-danger font-medium text-center mt-3"
                >
                  {otpError}
                </p>
              )}
            </div>

            {/* Quick Demo OTP Auto-fill */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#374336] shrink-0" />
                <span className="text-xs text-neutral-700 font-mono">OTP Demo:</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemoOtp}
                className="text-xs font-mono font-semibold text-[#121212] hover:bg-black/5 px-2.5 py-1 border border-black/20 transition-colors"
                aria-label="Isi otomatis dengan kode OTP demo 123456"
              >
                123456
              </button>
            </div>

            {/* Actions & Resend Timer */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOtpVerification(otp)}
                disabled={isLoading || otp.length < 6}
                className="w-full py-3.5 px-6 bg-[#121212] text-[#E3E1DC] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#374336] transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2 font-mono text-xs">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi Kode...
                  </span>
                ) : (
                  <>
                    <span>Verifikasi & Masuk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setOtpError(null);
                  }}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ganti Email</span>
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={handleResendOtp}
                  className="text-[#374336] hover:underline disabled:text-neutral-400 font-mono text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>
                    {resendTimer > 0
                      ? `Kirim ulang (${resendTimer}s)`
                      : "Kirim Ulang Kode OTP"}
                  </span>
                </button>
              </div>
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
            className="text-center py-6 space-y-4"
          >
            <div className="w-16 h-16 bg-[#121212] text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-success-lt" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#374336] font-bold">
                Otorisasi Berhasil
              </div>
              <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-[#121212]">
                Selamat Datang
              </h2>
              <p className="text-xs text-neutral-600 font-light">
                Sesi administratif aktif. Mengalihkan ke workspace operasional...
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <div className="w-6 h-6 border-2 border-neutral-300 border-t-[#121212] rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
