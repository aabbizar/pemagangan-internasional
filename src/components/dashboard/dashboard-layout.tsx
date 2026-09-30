"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authSessionStore, getServerSnapshot } from "@/lib/auth-session";
import {
  LayoutDashboard,
  BarChart3,
  Gauge,
  ShoppingCart,
  Coins,
  Mail,
  Calendar,
  Bot,
  Users,
  CheckSquare,
  Store,
  Contact,
  Package,
  Home,
  AlertOctagon,
  KeyRound,
  FileText,
  SlidersHorizontal,
  Search,
  Bell,
  Grid3X3,
  Palette,
  ChevronDown,
  ChevronRight,
  LogOut,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowLeftRight,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [dashboardsOpen, setDashboardsOpen] = React.useState(true);
  const [extraOpen, setExtraOpen] = React.useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const session = React.useSyncExternalStore(
    authSessionStore.subscribe,
    authSessionStore.getSession,
    getServerSnapshot
  );

  const isPesertaRoute = pathname.startsWith("/dashboard/peserta");
  const userEmail = session?.email ?? (isPesertaRoute ? "peserta@demo.id" : "superadmin@kemnaker.go.id");
  const userName = session?.name ?? (isPesertaRoute ? "Budi Santoso" : "Cody Fisher (Super Admin)");
  const userRole = session?.role ?? (isPesertaRoute ? "Peserta Magang" : "Super Administrator");

  const handleLogout = () => {
    authSessionStore.clearSession();
    toast.info("Sesi Berakhir", {
      description: "Anda telah keluar dari Cleopatra Dashboard.",
    });
    router.push("/login");
  };

  const toggleRoleView = () => {
    if (isPesertaRoute) {
      authSessionStore.setSession("superadmin@kemnaker.go.id", "Super Administrator", "Cody Fisher (Super Admin)");
      toast.success("Beralih ke Super Admin Dashboard");
      router.push("/dashboard");
    } else {
      authSessionStore.setSession("peserta@demo.id", "Peserta Magang", "Budi Santoso");
      toast.success("Beralih ke Portal Peserta Magang");
      router.push("/dashboard/peserta");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center shadow-xs">
        {/* Logo Section (matches 260px sidebar width) */}
        <div className="w-[260px] h-full flex items-center px-5 border-r border-slate-200 shrink-0 hidden lg:flex">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <Image
              src="/Picture1.png"
              alt="Kemnaker"
              width={32}
              height={32}
              className="w-8 h-8 object-contain drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                Kemnaker
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Header Toggle & Logo */}
        <div className="flex items-center px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors mr-2 cursor-pointer"
            aria-label="Toggle navigation"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/Picture1.png"
              alt="Kemnaker"
              width={28}
              height={28}
              className="w-7 h-7 object-contain drop-shadow-sm"
            />
            <span className="font-bold text-slate-900 text-lg">Kemnaker</span>
          </Link>
        </div>

        {/* Main Nav Area (after sidebar) */}
        <div className="flex-1 h-full flex items-center px-4 lg:px-5">
          {/* Desktop Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Center Horizontal Nav Links (Matches Screenshot: Home, Components, Alerts, Email) */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                !isPesertaRoute
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard/peserta"
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isPesertaRoute
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Portal Peserta
            </Link>
            <Link
              href="/#timeline"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Components
            </Link>
            <Link
              href="/reports"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Alerts
            </Link>
            <Link
              href="/apps/email"
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith("/apps/email")
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Email
            </Link>
          </nav>

          {/* Right Actions (Matches Screenshot: Search, Notifications with badge, Apps, Theme, Avatar) */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Quick Role Switcher Button for Testing */}
            <button
              type="button"
              onClick={toggleRoleView}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border border-cyan-200 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-600" />
              <span>{isPesertaRoute ? "Ganti ke Admin" : "Ganti ke Peserta"}</span>
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => toast.info("Pencarian cepat aktif (Ctrl+K).")}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Cari"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell with Red Dot Badge */}
            <button
              type="button"
              onClick={() => toast.info("3 kandidat baru menunggu verifikasi berkas.")}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Apps Grid Icon */}
            <button
              type="button"
              onClick={() => toast.info("Modul ekosistem Binalavotas terhubung.")}
              className="hidden sm:flex w-9 h-9 items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Apps"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            {/* Theme Toggle Icon */}
            <button
              type="button"
              onClick={() => toast.info("Theme: Cleopatra Modern Light (Active)")}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Theme"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* User Avatar with Dropdown */}
            <div className="relative ml-1 sm:ml-2">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-slate-200 hover:ring-cyan-500 transition-all cursor-pointer relative"
              >
                <Image
                  src="/images/user1.jpg"
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in duration-150">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/user1.jpg"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 truncate">
                        {userName}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                      <span className="inline-block mt-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200">
                        {userRole}
                      </span>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Beranda Publik Landing</span>
                    </Link>
                    <button
                      type="button"
                      onClick={toggleRoleView}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                      <span>Ganti ke {isPesertaRoute ? "Super Admin" : "Peserta Magang"}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar Sesi</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Cleopatra Sidebar (Fixed Left 260px) */}
      <aside
        className={`fixed top-16 left-0 w-[260px] h-[calc(100vh-4rem)] bg-white border-r border-slate-200 z-40 transition-all duration-300 overflow-y-auto ${
          sidebarCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0"
        } hidden lg:block`}
      >
        <div className="p-4 space-y-6">
          {/* DASHBOARDS MENU SECTION */}
          <div>
            <div
              onClick={() => setDashboardsOpen(!dashboardsOpen)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600"
            >
              <span>Dashboards</span>
              <span className="text-slate-400 text-sm font-mono">
                {dashboardsOpen ? "−" : "+"}
              </span>
            </div>

            {dashboardsOpen && (
              <div className="mt-1 space-y-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    !isPesertaRoute
                      ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center ${
                      !isPesertaRoute ? "bg-cyan-500 text-white" : "text-slate-500"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span>Analytics Dashboard</span>
                </Link>

                <Link
                  href="/dashboard/peserta"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isPesertaRoute
                      ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center ${
                      isPesertaRoute ? "bg-cyan-500 text-white" : "text-slate-500"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>Portal Peserta Magang</span>
                </Link>

                <Link
                  href="/dashboards/mission-control"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    pathname === "/dashboards/mission-control"
                      ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    pathname === "/dashboards/mission-control" ? "bg-cyan-500 text-white" : "text-slate-400"
                  }`}>
                    <Gauge className="w-4 h-4" />
                  </div>
                  <span>Mission Control</span>
                </Link>

                <Link
                  href="/dashboards/ecommerce"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    pathname === "/dashboards/ecommerce"
                      ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    pathname === "/dashboards/ecommerce" ? "bg-cyan-500 text-white" : "text-slate-400"
                  }`}>
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <span>ECommerce</span>
                </Link>

                <Link
                  href="/dashboards/crypto"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    pathname === "/dashboards/crypto"
                      ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    pathname === "/dashboards/crypto" ? "bg-cyan-500 text-white" : "text-slate-400"
                  }`}>
                    <Coins className="w-4 h-4" />
                  </div>
                  <span>Crypto Dashboard</span>
                </Link>
              </div>
            )}
          </div>

          {/* APPS MENU SECTION */}
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              APPS
            </p>
            <div className="space-y-1 text-sm">
              <Link
                href="/apps/email"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/email")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Mail className={`w-4 h-4 ${pathname.startsWith("/apps/email") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Email</span>
              </Link>
              <Link
                href="/apps/calendar"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/calendar")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Calendar className={`w-4 h-4 ${pathname.startsWith("/apps/calendar") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Calendar</span>
              </Link>
              <Link
                href="/apps/ai-chat"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/ai-chat")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Bot className={`w-4 h-4 ${pathname.startsWith("/apps/ai-chat") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>AI Chat</span>
              </Link>
              <Link
                href="/apps/user-management"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/user-management")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Users className={`w-4 h-4 ${pathname.startsWith("/apps/user-management") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>User Management</span>
              </Link>
              <Link
                href="/apps/todo"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/todo")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <CheckSquare className={`w-4 h-4 ${pathname.startsWith("/apps/todo") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Todo</span>
              </Link>
              <Link
                href="/apps/retail-store"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/retail-store")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Store className={`w-4 h-4 ${pathname.startsWith("/apps/retail-store") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Retail Store</span>
              </Link>
              <Link
                href="/apps/crm"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/crm")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Contact className={`w-4 h-4 ${pathname.startsWith("/apps/crm") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>CRM</span>
              </Link>
              <Link
                href="/apps/inventory"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/inventory")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Package className={`w-4 h-4 ${pathname.startsWith("/apps/inventory") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Inventory</span>
              </Link>
              <Link
                href="/apps/real-estate"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/apps/real-estate")
                    ? "bg-cyan-50/80 text-cyan-800 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Home className={`w-4 h-4 ${pathname.startsWith("/apps/real-estate") ? "text-cyan-600" : "text-slate-400"}`} />
                <span>Real Estate</span>
              </Link>
            </div>
          </div>

          {/* EXTRA MENU SECTION */}
          <div>
            <div
              onClick={() => setExtraOpen(!extraOpen)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-600"
            >
              <span>EXTRA</span>
              <span className="text-slate-400 text-sm font-mono">
                {extraOpen ? "−" : "+"}
              </span>
            </div>

            {extraOpen && (
              <div className="mt-1 space-y-1 text-sm">
                <Link
                  href="/reports"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <AlertOctagon className="w-4 h-4 text-slate-400" />
                  <span>Error Pages</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <KeyRound className="w-4 h-4 text-slate-400" />
                  <span>Authentication</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Utility Pages</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (When Opened on Small Screens) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Image
                    src="/Picture1.png"
                    alt="Kemnaker"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain drop-shadow-sm"
                  />
                  <span className="font-bold text-slate-900 text-lg">Kemnaker</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                    pathname === "/dashboard" ? "bg-cyan-50 text-cyan-800" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Analytics Dashboard
                </Link>
                <Link
                  href="/apps/ai-chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/ai-chat") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  AI Chat
                </Link>
                <Link
                  href="/apps/user-management"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/user-management") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  User Management
                </Link>
                <Link
                  href="/apps/email"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/email") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Email
                </Link>
                <Link
                  href="/apps/calendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/calendar") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Calendar
                </Link>
                <Link
                  href="/apps/todo"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/todo") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Todo
                </Link>
                <Link
                  href="/apps/retail-store"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname.startsWith("/apps/retail-store") ? "bg-cyan-50 text-cyan-800 font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Retail Store
                </Link>
                <Link
                  href="/dashboard/peserta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Portal Peserta Magang
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={toggleRoleView}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-cyan-800 bg-cyan-50 border border-cyan-200"
              >
                Ganti ke {isPesertaRoute ? "Super Admin" : "Peserta Magang"}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Keluar Sesi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Viewport (Exact 260px offset matching Screenshot) */}
      <main className="lg:ml-[260px] pt-16 min-h-screen bg-[#F8FAFC]">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default DashboardLayout;
