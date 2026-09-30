"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Calendar,
  Filter,
  Download,
  ChevronDown,
  Search,
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export default function CleopatraDashboardPage() {
  const [activeRevenueTab, setActiveRevenueTab] = React.useState<"Overview" | "Analytics" | "Reports" | "Notifications">("Overview");
  const [tableSearch, setTableSearch] = React.useState("");

  const monthlyBars = [
    { month: "Jan", value: 22, height: "36%" },
    { month: "Feb", value: 24, height: "40%" },
    { month: "Mar", value: 16, height: "26%" },
    { month: "Apr", value: 35, height: "58%" },
    { month: "May", value: 32, height: "53%" },
    { month: "Jun", value: 42, height: "70%" },
    { month: "Jul", value: 30, height: "50%" },
    { month: "Aug", value: 36, height: "60%" },
    { month: "Sep", value: 22, height: "36%" },
    { month: "Oct", value: 40, height: "66%" },
    { month: "Nov", value: 45, height: "75%" },
    { month: "Dec", value: 52, height: "86%" },
  ];

  const transactions = [
    {
      initials: "OM",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "Paid",
      amount: "$1,999.00",
      avatarBg: "from-violet-500 to-purple-600",
    },
    {
      initials: "JL",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      status: "Pending",
      amount: "$39.00",
      avatarBg: "from-blue-500 to-indigo-600",
    },
    {
      initials: "IN",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      status: "Paid",
      amount: "$299.00",
      avatarBg: "from-emerald-400 to-teal-600",
    },
    {
      initials: "WK",
      name: "William Kim",
      email: "will@email.com",
      status: "Paid",
      amount: "$99.00",
      avatarBg: "from-amber-400 to-orange-500",
    },
    {
      initials: "SD",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      status: "Paid",
      amount: "$39.00",
      avatarBg: "from-rose-400 to-pink-600",
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      t.email.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* ========================================================
            1. PAGE HEADER (Matches Screenshot)
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-cyan-100/70 text-cyan-700 rounded-full border border-cyan-200">
                Live
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Overview Of Your Financial Performance
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Date Range Picker */}
            <button
              type="button"
              onClick={() => toast.info("Filter tanggal: 20 Jan - 09 Feb 2026")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Jan 20 - Feb 09, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Filter Button */}
            <button
              type="button"
              onClick={() => toast.info("Filter parameter aktif")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Filter</span>
            </button>

            {/* Download Report (Cyan Primary) */}
            <button
              type="button"
              onClick={() => toast.success("Laporan analitik Cleopatra berhasil diunduh (PDF/CSV)")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0096a6] hover:bg-[#008391] text-white rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            2. TOP METRICS ROW: 4 CARDS WITH SPARKLINES (Matches Screenshot)
           ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Revenue */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">$45,231.89</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600">+20.1%</span>
                <span className="text-slate-400">Vs Last Month</span>
              </div>
            </div>
            {/* Sparkline Wave 1 */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cyanGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 Q25,32 50,28 T100,24 T150,18 T200,10 L200,40 L0,40 Z"
                  fill="url(#cyanGradient1)"
                />
                <path
                  d="M0,30 Q25,32 50,28 T100,24 T150,18 T200,10"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Subscriptions */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Subscriptions</p>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">+2,350</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600">+180.1%</span>
                <span className="text-slate-400">From Last Month</span>
              </div>
            </div>
            {/* Sparkline Wave with Tooltip */}
            <div className="mt-3 h-10 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cyanGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,35 Q40,34 80,30 T140,16 T200,12 L200,40 L0,40 Z"
                  fill="url(#cyanGradient2)"
                />
                <path
                  d="M0,35 Q40,34 80,30 T140,16 T200,12"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
                <circle cx="140" cy="16" r="3.5" fill="#0891b2" />
              </svg>
              {/* Tooltip Pill from Screenshot */}
              <div className="absolute left-[58%] -top-4 -translate-x-1/2 bg-white text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded shadow-sm border border-slate-200 pointer-events-none flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>Series-1: $510</span>
              </div>
            </div>
          </div>

          {/* Card 3: Bounce Rate */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Bounce Rate</p>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-900">12.5%</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600">-4.0%</span>
                <span className="text-slate-400">From Last Week</span>
              </div>
            </div>
            {/* Sparkline Wave Downward */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M0,15 Q50,22 100,18 T160,28 T200,32"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Card 4: Active Now */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Active Now</p>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-900">+573</p>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600">+201</span>
                <span className="text-slate-400">Since Last Hour</span>
              </div>
            </div>
            {/* Sparkline Wave */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M0,28 Q30,15 70,22 T130,12 T200,8"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* ========================================================
            3. MIDDLE SECTION: 2:1 GRID (Revenue Overview & Sales by Country)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Overview Chart (2/3 col) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            {/* Header with Segmented Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">
                Revenue Overview
              </h2>

              <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-lg text-xs font-medium">
                {(["Overview", "Analytics", "Reports", "Notifications"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveRevenueTab(tab)}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      activeRevenueTab === tab
                        ? "bg-white text-slate-900 font-semibold shadow-xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart Area (Matches screenshot styling with $0k - $60k y-axis) */}
            <div className="pt-6">
              <div className="flex items-end gap-3 sm:gap-4 h-64 sm:h-72 w-full pt-4 pb-2">
                {/* Y-Axis scale */}
                <div className="flex flex-col justify-between h-full text-[11px] font-mono text-slate-400 pr-2 shrink-0 select-none pb-5">
                  <span>$60K</span>
                  <span>$50K</span>
                  <span>$40K</span>
                  <span>$30K</span>
                  <span>$20K</span>
                  <span>$10K</span>
                  <span>$0K</span>
                </div>

                {/* Bars Container */}
                <div className="flex-1 flex items-end justify-between h-full border-b border-slate-200 pb-2 relative">
                  {/* Subtle Gridlines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-slate-100 w-full" />
                    <div className="border-b border-slate-100 w-full" />
                    <div className="border-b border-slate-100 w-full" />
                    <div className="border-b border-slate-100 w-full" />
                    <div className="border-b border-slate-100 w-full" />
                    <div className="border-b border-slate-100 w-full" />
                  </div>

                  {monthlyBars.map((bar) => (
                    <div
                      key={bar.month}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                        ${bar.value},000
                      </div>

                      {/* Bar Fill (Matches Cleopatra Teal Color #0096a6) */}
                      <div
                        className="w-full max-w-[28px] sm:max-w-[34px] bg-[#0096a6] group-hover:bg-[#007f8c] rounded-t-sm transition-all duration-300 relative z-0"
                        style={{ height: bar.height }}
                      />

                      {/* Month Label */}
                      <span className="text-[11px] font-medium text-slate-500 mt-2 select-none">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sales By Country (1/3 col - Matches Screenshot) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <h2 className="text-base font-semibold text-slate-900 pb-4 border-b border-slate-100">
              Sales By Country
            </h2>

            <div className="space-y-6 pt-4">
              {/* United States */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">US</span>
                    <span className="font-medium text-slate-800">United States</span>
                  </div>
                  <span className="font-semibold text-slate-900">45%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              {/* United Kingdom */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">GB</span>
                    <span className="font-medium text-slate-800">United Kingdom</span>
                  </div>
                  <span className="font-semibold text-slate-900">28%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full" style={{ width: "28%" }} />
                </div>
              </div>

              {/* Germany */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">DE</span>
                    <span className="font-medium text-slate-800">Germany</span>
                  </div>
                  <span className="font-semibold text-slate-900">15%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full" style={{ width: "15%" }} />
                </div>
              </div>

              {/* France */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">FR</span>
                    <span className="font-medium text-slate-800">France</span>
                  </div>
                  <span className="font-semibold text-slate-900">8%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>

              {/* Other */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                    <span className="font-medium text-slate-800">Other</span>
                  </div>
                  <span className="font-semibold text-slate-900">4%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-950 rounded-full" style={{ width: "4%" }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            4. BOTTOM SECTION: 2:1 GRID (Recent Transactions & Monthly Target)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Transactions Table (2/3 col - Matches Screenshot) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
            {/* Header with Search and View All */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Recent Transactions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  You Made 265 Sales This Month.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-cyan-500 w-36 sm:w-44 transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Menampilkan seluruh riwayat transaksi")}
                  className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Dense Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium">
                  <tr>
                    <th className="py-3 px-6">Customer</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${tx.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                          >
                            {tx.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{tx.name}</p>
                            <p className="text-[11px] text-slate-400">{tx.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            tx.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900">
                        {tx.amount}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Target (1/3 col - Matches Screenshot) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">
                Monthly Target
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track Your Revenue Goal
              </p>
            </div>

            {/* Circular Gauge / Progress Circle */}
            <div className="py-6 flex items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#0096a6"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="42.7"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold font-mono text-slate-900">83%</span>
                  <span className="text-[11px] text-slate-400 font-medium">Completed</span>
                </div>
              </div>
            </div>

            {/* Footer Stats & Button */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-center">
                <div className="flex-1">
                  <p className="text-lg font-bold text-slate-900 font-mono">$12,450</p>
                  <p className="text-xs text-slate-400">Earned</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-200" />
                <div className="flex-1">
                  <p className="text-lg font-bold text-slate-900 font-mono">$15,000</p>
                  <p className="text-xs text-slate-400">Goal</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0096a6] rounded-full" style={{ width: "83%" }} />
                </div>
                <p className="text-xs text-center text-slate-500">
                  <span className="font-semibold text-slate-800 font-mono">$2,550</span> more to reach your goal
                </p>
              </div>

              <button
                type="button"
                onClick={() => toast.info("Detail kuota & revenue: 83% target tercapai")}
                className="w-full py-2.5 px-4 bg-[#0096a6] hover:bg-[#008391] text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer text-center"
              >
                View Details
              </button>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
