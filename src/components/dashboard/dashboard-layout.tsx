"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authSessionStore, getServerSnapshot } from "@/lib/auth-session";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Peserta Magang",
    href: "/participants",
    icon: Users,
  },
  {
    label: "Program Magang",
    href: "/programs",
    icon: Briefcase,
  },
  {
    label: "Laporan & Audit",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Pengaturan Sistem",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Sesi dibaca lewat external store (cookie-backed) agar aman terhadap
  // hydration dan langsung sinkron saat login/logout.
  const session = React.useSyncExternalStore(
    authSessionStore.subscribe,
    authSessionStore.getSession,
    getServerSnapshot,
  );
  const userEmail = session?.email ?? "admin@demo.id";
  const userRole = session?.role ?? "Administrator Verifikator";

  // Handle keyboard escape to close mobile drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    authSessionStore.clearSession();
    toast.info("Sesi Berakhir", {
      description: "Anda telah keluar dari workspace administrasi.",
    });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#E3E1DC] flex flex-col md:flex-row antialiased text-[#121212]">
      {/* Accessible Skip Link */}
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:bg-black focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
      >
        Lewati ke Konten Dashboard
      </a>

      {/* DESKTOP PERSISTENT SIDEBAR */}
      <aside
        aria-label="Admin Navigation Sidebar"
        className="hidden md:flex flex-col w-64 bg-[#121212] text-white border-r border-white/10 shrink-0 h-screen sticky top-0 z-30"
      >
        {/* Brand & Directorate Identity */}
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="w-8 h-8 rounded bg-white text-[#121212] flex items-center justify-center font-mono font-bold text-xs shadow-md">
              TV
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight uppercase text-white">
                TALENTA VOKASI
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                Kemnaker RI
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto" role="navigation">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-stone/60">
            Modul Operasional
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer",
                  isActive
                    ? "bg-[#374336] text-white font-bold border-l-2 border-white shadow-xs"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-stone/70")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer & Logout Action */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#0a0a0a]">
          {/* Current User Card */}
          <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#374336] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-mono font-semibold text-white truncate">
                {userEmail}
              </div>
              <div className="text-[10px] text-neutral-400 truncate font-mono">
                {userRole}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-mono uppercase tracking-wider text-danger-lt hover:text-white hover:bg-danger-lt/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>

          <div className="text-[9px] font-mono text-stone/60 text-center uppercase tracking-widest pt-1">
            Kemnaker RI • Workspace v2.0
          </div>
        </div>
      </aside>

      {/* MOBILE SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[80vw] bg-[#121212] text-white h-full flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-white text-[#121212] flex items-center justify-center font-mono font-bold text-xs">
                    TV
                  </div>
                  <span className="font-display font-bold text-sm uppercase">
                    TALENTA VOKASI
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/10"
                  aria-label="Tutup menu navigasi"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="mt-6 space-y-1.5" role="navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-3 rounded text-xs font-mono uppercase tracking-wider transition-all",
                        isActive
                          ? "bg-[#374336] text-white font-bold border-l-2 border-white"
                          : "text-neutral-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4 text-white" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="text-xs font-mono text-neutral-400 truncate">
                {userEmail}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-2 text-xs font-mono uppercase tracking-wider text-danger-lt hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Sesi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#E3E1DC]">
        {/* TOPBAR */}
        <header className="h-16 px-6 sm:px-8 border-b border-black/10 bg-[#E3E1DC]/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded text-neutral-700 hover:bg-black/5"
              aria-label="Buka navigasi mobile"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              {/* Bukan <h1>: setiap halaman modul sudah punya <h1> sendiri
                  di konten (WCAG: tepat satu h1 per halaman). */}
              <p className="font-display font-bold text-base sm:text-lg uppercase tracking-tight text-[#121212]">
                {pageTitle || "PORTAL ADMINISTRASI"}
              </p>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted">
                <span>Ditjen Binalavotas</span>
                <span>•</span>
                <span>Kemnaker RI</span>
              </div>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/5 border border-black/10 text-[10px] font-mono uppercase tracking-widest text-[#121212]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#374336]" />
              <span>Sesi Terotentikasi</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-[#121212] transition-colors"
            >
              <span>Beranda Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main id="dashboard-main" tabIndex={-1} className="flex-1 p-6 sm:p-8 lg:p-10 outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
