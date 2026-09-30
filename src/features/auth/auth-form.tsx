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

export function AuthForm({ onSwitchToRegister }: { onSwitchToRegister?: () => void }) {
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
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-neutral-900 tracking-tighter">
                Selamat Datang
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Verifikasi identitas untuk masuk ke dasbor operasional.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-5" noValidate>
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
                    placeholder="nama@instansi.go.id"
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
                  <span>Lanjutkan</span>
                )}
              </button>

              {onSwitchToRegister && (
                <div className="pt-4 text-center">
                  <p className="text-sm text-neutral-600">
                    Belum memiliki akun?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Daftar Peserta
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
            <div className="text-center space-y-2 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-sans tracking-tight text-neutral-900">
                Masukkan Kode OTP
              </h2>
              <p className="text-sm text-neutral-500 font-normal">
                Kode 6 digit telah dikirimkan ke{" "}
                <span className="font-semibold text-neutral-900">{email}</span>
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
                  className="text-xs text-red-500 font-medium text-center mt-3"
                >
                  {otpError}
                </p>
              )}
            </div>

            {/* Quick Demo OTP Auto-fill */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm text-neutral-600">Gunakan OTP Demo:</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemoOtp}
                className="text-sm font-semibold text-neutral-900 hover:bg-neutral-200 px-3 py-1 rounded-md border border-neutral-300 transition-colors"
                aria-label="Isi otomatis dengan kode OTP demo 123456"
              >
                123456
              </button>
            </div>

            {/* Actions & Resend Timer */}
            <div className="space-y-4 pt-2">
              <button
                type="button"
                onClick={() => handleOtpVerification(otp)}
                disabled={isLoading || otp.length < 6}
                className="w-full py-2.5 px-6 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi...
                  </span>
                ) : (
                  <span>Masuk Dasbor</span>
                )}
              </button>

              <div className="flex items-center justify-between text-sm pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setOtpError(null);
                  }}
                  className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
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
                Sesi administratif aktif. Mengalihkan ke workspace operasional...
              </p>
            </div>

            <div className="pt-6 flex justify-center">
              <div className="w-6 h-6 border-2 border-neutral-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
