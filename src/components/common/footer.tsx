"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BackgroundShader } from "@/components/ui/background-shader";

/**
 * Footer Reveal — Clean minimalist footer with live blue hero shader background
 */
export function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="footer-sticky relative w-full h-screen overflow-hidden bg-[#041222] text-white flex flex-col justify-center items-center">
      {/* Live Animated Shader Background matching Hero colors */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundShader
          colors={["#041222", "#0A2540", "#0284C7", "#1E40AF", "#38BDF8"]}
          speed={0.35}
          distortion={0.8}
          swirl={0.6}
        />
        {/* Subtle radial vignette overlay for contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041222]/60 via-transparent to-[#041222]/80" />
      </div>

      {/* Clean Minimalist Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-xs uppercase tracking-[0.3em] mb-4 text-cyan-300 font-mono font-semibold">
          Kementerian Ketenagakerjaan Republik Indonesia
        </div>

        <Link
          href="/login"
          className="font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-white hover:text-cyan-200 transition-colors uppercase block select-none tracking-tight"
        >
          LEMBAGA PEMAGANGAN
        </Link>

        <p className="text-sm sm:text-base text-neutral-300 font-sans mt-5 max-w-lg mx-auto leading-relaxed">
          Pusat resmi pembinaan vokasi dan penempatan program pemagangan luar negeri bilateral ke Jepang, Jerman, dan Korea Selatan.
        </p>

        {/* Clean, essential navigation */}
        <nav
          aria-label="Navigasi footer"
          className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-10 text-xs sm:text-sm uppercase tracking-widest text-neutral-300 font-mono"
        >
          <a href="#purpose" className="hover:text-cyan-300 transition-colors">
            Kualifikasi
          </a>
          <a href="#journey" className="hover:text-cyan-300 transition-colors">
            Alur
          </a>
          <a href="#network" className="hover:text-cyan-300 transition-colors">
            Kemitraan
          </a>
          <a href="#commitment" className="hover:text-cyan-300 transition-colors">
            Tentang Kami
          </a>
          <a
            href="https://kemnaker.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            kemnaker.go.id
          </a>
          <Link
            href="/login"
            className="hover:text-white text-cyan-300 border-b border-cyan-400/60 pb-0.5 transition-colors flex items-center gap-1 font-bold"
          >
            <span>Portal Admin</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </nav>

        {/* Clean, single-line copyright metadata */}
        <div className="mt-14 text-xs font-mono text-neutral-400 tracking-wider">
          &copy; 2026 KEMNAKER RI &bull; DITJEN BINALAVOTAS
        </div>
      </div>
    </footer>
  );
}

export default Footer;