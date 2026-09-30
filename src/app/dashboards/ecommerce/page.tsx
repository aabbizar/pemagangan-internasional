"use client";

import * as React from "react";
import { toast } from "sonner";

export default function CleopatraECommercePage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">E-Commerce Analytics</h1>
          <p className="text-sm text-slate-500">Global digital storefront performance, fulfillment orders, and checkout conversion.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.info("Filter range: Last 30 Days")}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Last 30 Days ▾
          </button>
          <button
            type="button"
            onClick={() => toast.success("Order report exported")}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Sales</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">$489,200</div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            +18.4% vs last mo
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Orders</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">14,280</div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            +8.2% vs last mo
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Average Order Value</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">$84.50</div>
          <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
            +3.5% vs last mo
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Cart Abandonment</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">21.8%</div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            -2.4% vs last mo
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          {/* Top Products */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Best Performing Storefront Products</h2>
            <div className="divide-y divide-slate-100">
              {[
                { name: "Cleopatra Pro Workspace Kit", category: "SaaS Software", sales: "1,240 units", revenue: "$124,000", growth: "+32%" },
                { name: "Minimalist Ergonomic Keyboard", category: "Hardware", sales: "840 units", revenue: "$75,600", growth: "+14%" },
                { name: "Ultra-Wide Precision Monitor 34\"", category: "Hardware", sales: "420 units", revenue: "$189,000", growth: "+22%" },
                { name: "Cloud Analytics Seat License", category: "SaaS Software", sales: "2,100 units", revenue: "$105,000", growth: "+41%" },
              ].map((prod, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{prod.name}</h4>
                    <span className="text-slate-400">{prod.category} • {prod.sales}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block">{prod.revenue}</span>
                    <span className="text-emerald-600 font-semibold text-[11px]">{prod.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
              <span className="text-xs text-slate-500 font-mono">Live Sync</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: "#ORD-9421", user: "Sophia Turner", item: "Workspace Kit", amt: "$149.00", status: "Delivered", col: "bg-emerald-100 text-emerald-800" },
                    { id: "#ORD-9420", user: "Lucas Vance", item: "Monitor 34\"", amt: "$450.00", status: "Processing", col: "bg-blue-100 text-blue-800" },
                    { id: "#ORD-9419", user: "Emi Takahashi", item: "Keyboard White", amt: "$89.00", status: "Delivered", col: "bg-emerald-100 text-emerald-800" },
                    { id: "#ORD-9418", user: "David Miller", item: "Cloud License", amt: "$50.00", status: "Dispatched", col: "bg-amber-100 text-amber-800" },
                  ].map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3 font-mono font-semibold text-slate-700">{ord.id}</td>
                      <td className="p-3 font-medium text-slate-900">{ord.user}</td>
                      <td className="p-3 text-slate-600">{ord.item}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">{ord.amt}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${ord.col}`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {/* Sales Distribution */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Channel Distribution</h3>
            <div className="space-y-3 pt-1">
              {[
                { ch: "Direct Web Store", pct: 54, val: "$264,168" },
                { ch: "Enterprise B2B Invoicing", pct: 31, val: "$151,652" },
                { ch: "Affiliate & Partner Referrals", pct: 15, val: "$73,380" },
              ].map((c, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-medium">{c.ch}</span>
                    <span className="text-slate-900 font-mono font-semibold">{c.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${c.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Inventory Threshold Alert</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              3 SKUs have dipped below minimum safety thresholds in the North America fulfillment warehouse.
            </p>
            <button
              type="button"
              onClick={() => toast.info("Opening purchase order requisition...")}
              className="mt-2 text-xs font-bold text-amber-900 underline cursor-pointer"
            >
              Reorder stock now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
