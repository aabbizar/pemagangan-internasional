"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/features/auth/auth-form";
import { RegisterForm } from "@/features/auth/register-form";
import { ArrowLeft, Shield } from "lucide-react";
import { BackgroundShader } from "@/components/ui/background-shader";
import { motion } from "motion/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-neutral-900">
      {/* Live Shader Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundShader />
      </div>
      
      {/* Dark overlay to make the card pop and shader feel like a deep modern blue/dark vibe */}
      <div className="absolute inset-0 z-0 bg-[#041222]/40 backdrop-blur-[2px]" />

      {/* Main Split Card */}
      <motion.div 
        layout
        className={`w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col min-h-[650px] ${
          isLogin ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        
        {/* Image & Branding Side */}
        <motion.div layout className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-blue-50/50 border-x border-blue-100/50">
          {/* Background Illustration */}
          <Image 
            src="/images/login-illustration.jpg" 
            alt="Kemnaker RI Login Illustration" 
            fill 
            className="object-cover opacity-90 mix-blend-multiply"
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent" />
          
          {/* Top Logo / Title */}
          <motion.div layout="position" className="relative z-10 flex items-center gap-3">
            <Image src="/Picture1.png" alt="Logo Kemnaker" width={40} height={40} className="w-10 h-auto drop-shadow-md" />
            <h2 className="text-white font-display text-2xl font-bold tracking-tight uppercase drop-shadow-md">
              Binalavotas.
            </h2>
          </motion.div>

          {/* Bottom Copy */}
          <motion.div layout="position" className="relative z-10 space-y-4">
            <p className="text-white/90 font-mono text-xs uppercase tracking-widest border-b border-white/30 pb-4 inline-block">
              {isLogin ? "Portal Keamanan Internal" : "Registrasi Peserta Baru"}
            </p>
            <h3 className="text-white font-sans text-2xl leading-tight max-w-[280px]">
              {isLogin 
                ? "Akses eksklusif untuk administrator dan verifikator program pemagangan internasional."
                : "Mulai langkah karir internasional Anda dengan platform pemagangan resmi Kemnaker RI."}
            </h3>
            <div className="flex items-center gap-2 pt-2 text-white/70 text-xs font-mono">
              <Shield className="w-4 h-4" />
              <span>GovTech Enforced Standard</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Side */}
        <motion.div layout className="w-full lg:w-[55%] p-8 sm:p-12 md:p-16 flex flex-col justify-center relative bg-white">
          {/* Back Button for Mobile (Desktop can use a different placement or keep it here) */}
          <Link
            href="/"
            className="absolute top-6 right-8 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 hover:text-neutral-800 transition-colors group"
          >
            <span>Kembali</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {isLogin ? (
            <AuthForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
