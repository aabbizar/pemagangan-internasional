/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import kemnakerLogo from "../../../public/Picture1.png";

/**
 * Navbar Landing — Anchor sesuai Redesign V3:
 * #manifesto, #purpose, #journey, #network, #commitment
 * Desktop: 4 link utama + Akses Admin
 * Mobile: drawer dengan 5 link + Akses Admin
 */
export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Tutup drawer dengan Escape (WCAG 2.1.1)
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Kunci scroll di belakang drawer
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileMenuOpen]);

  if (pathname !== "/") return null;

  return (
    <>
      <nav className="fixed top-0 w-full p-6 sm:p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none group">
          <Image
            src={kemnakerLogo}
            alt="Kemnaker Logo"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm sm:text-base tracking-wide uppercase">
              LEMBAGA PEMAGANGAN
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] opacity-80 font-mono text-cyan-300">
              KEMNAKER RI • DITJEN BINALAVOTAS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-sans font-semibold">
          <a href="#purpose" className="hover:opacity-60 transition-opacity">
            Kualifikasi
          </a>
          <a href="#journey" className="hover:opacity-60 transition-opacity">
            Alur
          </a>
          <a href="#network" className="hover:opacity-60 transition-opacity">
            Kemitraan
          </a>
          <a href="#commitment" className="hover:opacity-60 transition-opacity">
            Tentang Kami
          </a>
          <Link
            href="/login"
            className="hover:opacity-60 transition-opacity border-b border-white pb-1"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-xs uppercase tracking-widest font-mono cursor-pointer"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="landing-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : "MENU"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="landing-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi landing"
          className="fixed inset-0 z-40 bg-[#121212] text-white p-8 flex flex-col justify-between pt-28 animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-mono font-bold">
              Portal Navigasi Pemagangan
            </div>
            <div className="flex flex-col gap-6 font-sans font-bold text-2xl uppercase tracking-widest">
              <a href="#purpose" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">
                Kualifikasi
              </a>
              <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">
                Alur
              </a>
              <a href="#network" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">
                Kemitraan
              </a>
              <a href="#commitment" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">
                Tentang Kami
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity text-base border-b border-white w-max pb-1"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="text-xs text-neutral-400 font-mono uppercase tracking-widest border-t border-white/10 pt-4">
            KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA
          </div>
        </div>
      )}
    </>
  );
}