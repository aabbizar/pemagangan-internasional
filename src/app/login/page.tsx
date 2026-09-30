import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/features/auth/auth-form";
import { ArrowLeft, Shield } from "lucide-react";
import { BackgroundShader } from "@/components/ui/background-shader";

export const metadata = {
  title: "Akses Admin • Sistem Pemagangan Internasional Kemnaker RI",
  description: "Portal verifikasi identitas resmi pengelola operasional program pemagangan luar negeri Republik Indonesia.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-neutral-900">
      {/* Live Shader Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundShader />
      </div>
      
      {/* Dark overlay to make the card pop and shader feel like a deep modern blue/dark vibe */}
      <div className="absolute inset-0 z-0 bg-[#041222]/40 backdrop-blur-[2px]" />

      {/* Main Split Card */}
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row min-h-[650px]">
        
        {/* Left Side: Image & Branding */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-blue-900">
          {/* Background Image */}
          <Image 
            src="/images/login-bg.jpg" 
            alt="Kemnaker RI Login Background" 
            fill 
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#041222]/40 to-transparent" />
          
          {/* Top Logo / Title */}
          <div className="relative z-10">
            <h2 className="text-white font-display text-2xl font-bold tracking-tight uppercase">
              Binalavotas.
            </h2>
          </div>

          {/* Bottom Copy */}
          <div className="relative z-10 space-y-4">
            <p className="text-white/90 font-mono text-xs uppercase tracking-widest border-b border-white/20 pb-4 inline-block">
              Portal Keamanan Internal
            </p>
            <h3 className="text-white font-sans text-2xl leading-tight max-w-[280px]">
              Akses eksklusif untuk administrator dan verifikator program pemagangan internasional.
            </h3>
            <div className="flex items-center gap-2 pt-2 text-white/50 text-xs font-mono">
              <Shield className="w-4 h-4" />
              <span>GovTech Enforced Standard</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[55%] p-8 sm:p-12 md:p-16 flex flex-col justify-center relative bg-white">
          {/* Back Button for Mobile (Desktop can use a different placement or keep it here) */}
          <Link
            href="/"
            className="absolute top-6 right-8 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 hover:text-neutral-800 transition-colors group"
          >
            <span>Kembali</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <AuthForm />
        </div>
      </div>
    </div>
  );
}
