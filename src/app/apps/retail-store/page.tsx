"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";

interface RetailCustomer {
  id: string;
  avatar: string;
  name: string;
  date: string;
  email: string;
  phone: string;
  active: boolean;
}

const retailCustomers: RetailCustomer[] = [
  { id: "1", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", name: "Leslie Alexander", date: "5 Sep, 2025", email: "simmons@example.com", phone: "(406) 555-0120", active: true },
  { id: "2", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", name: "Kristin Watson", date: "2 Sep, 2025", email: "lawson@example.com", phone: "(505) 555-0125", active: true },
  { id: "3", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", name: "Cameron Williamson", date: "1 Sep, 2025", email: "curtis@example.com", phone: "(702) 555-0122", active: true },
  { id: "4", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", name: "Courtney Henry", date: "2 Sep, 2025", email: "rivera@example.com", phone: "(629) 555-0129", active: true },
  { id: "5", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80", name: "Cody Fisher", date: "2 Sep, 2025", email: "hill@example.com", phone: "(307) 555-0133", active: true },
  { id: "6", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80", name: "Annette Black", date: "2 Sep, 2025", email: "hanson@example.com", phone: "(239) 555-0108", active: false },
  { id: "7", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", name: "Jerome Bell", date: "2 Sep, 2025", email: "jennings@example.com", phone: "(907) 555-0101", active: true },
];

export default function CleopatraRetailStorePage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Retail Store Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">Customer List</h1>
          <p className="text-sm text-slate-500">
            Here&apos;s a quick glance at your customer data and performance updates.
          </p>
        </div>

        {/* Right: Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 min-w-[180px] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Total Customers</span>
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">2,23,763</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Then Last Month</span>
              <span className="text-rose-600 font-semibold">-14% ↘</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 min-w-[180px] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Total Active Customers</span>
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">89,922</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Then Last Month</span>
              <span className="text-emerald-600 font-semibold">+16% ↗</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 min-w-[180px] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Onboarding Process</span>
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">3,24,198</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Then Last Month</span>
              <span className="text-emerald-600 font-semibold">+24% ↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Customer Table (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Customer List</h2>
              <p className="text-xs text-slate-500">Keep an eye on your outstanding Customer and activity</p>
            </div>
            <button
              type="button"
              onClick={() => toast.info("Viewing all customers")}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-cyan-600" />
                  </th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Onboard Date</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {retailCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 text-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-cyan-600" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={cust.avatar}
                            alt={cust.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <span className="font-semibold text-slate-900 text-xs">{cust.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-slate-500">{cust.date}</td>
                    <td className="p-3 text-xs text-slate-600 font-mono">{cust.email}</td>
                    <td className="p-3 text-xs text-slate-500">{cust.phone}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          cust.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {cust.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => toast.info(`Viewing details for ${cust.name}`)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Analytics Sidebar (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Country Stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Customers by Region</h3>
            <div className="space-y-3">
              {[
                { country: "United States", count: "84,210", pct: "45%" },
                { country: "Japan & APAC", count: "52,190", pct: "28%" },
                { country: "United Kingdom", count: "31,800", pct: "18%" },
                { country: "Germany & EU", count: "16,400", pct: "9%" },
              ].map((c, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-medium">{c.country}</span>
                    <span className="text-slate-500 font-mono">{c.count}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: c.pct }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Product */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Best Selling Retail SKU</h3>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-xs">Quantum Edge Router Pro</p>
                <p className="text-[11px] text-slate-400">SKU: QER-8842</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                $124,900
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
