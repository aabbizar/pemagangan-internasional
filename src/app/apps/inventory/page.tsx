"use client";

import * as React from "react";
import { toast } from "sonner";

interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  statusColor: string;
}

const inventoryList: InventoryProduct[] = [
  { id: "1", name: "Cleopatra High-Speed Optical Transceiver", sku: "OPT-9921", category: "Hardware", stock: 450, price: "$289.00", status: "In Stock", statusColor: "bg-emerald-100 text-emerald-800" },
  { id: "2", name: "Modular Server Rack Enclosure 42U", sku: "RCK-4200", category: "Infrastructure", stock: 18, price: "$1,450.00", status: "Low Stock", statusColor: "bg-amber-100 text-amber-800" },
  { id: "3", name: "Edge Telemetry Sensor Node v2", sku: "SNS-0042", category: "IoT", stock: 890, price: "$85.00", status: "In Stock", statusColor: "bg-emerald-100 text-emerald-800" },
  { id: "4", name: "Fiber Patch Cord LC-LC Duplex 5m", sku: "FBR-0500", category: "Cabling", stock: 0, price: "$14.50", status: "Out of Stock", statusColor: "bg-rose-100 text-rose-800" },
  { id: "5", name: "Managed Industrial Switch 24-Port", sku: "SWT-2401", category: "Networking", stock: 65, price: "$640.00", status: "In Stock", statusColor: "bg-emerald-100 text-emerald-800" },
];

export default function CleopatraInventoryPage() {
  const [search, setSearch] = React.useState("");

  const filtered = inventoryList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory &amp; Warehousing</h1>
          <p className="text-sm text-slate-500">Real-time stock monitoring, replenish alerts, and SKU fulfillment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.info("Inventory report downloaded")}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Export Sheet
          </button>
          <button
            type="button"
            onClick={() => toast.success("New SKU form opened")}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-full">+12%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">2,847</div>
          <div className="text-xs text-slate-500 font-medium">Total Products</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">86%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">2,456</div>
          <div className="text-xs text-slate-500 font-medium">In Stock</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">11%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">324</div>
          <div className="text-xs text-slate-500 font-medium">Low Stock</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full">3%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">67</div>
          <div className="text-xs text-slate-500 font-medium">Out of Stock</div>
        </div>
      </div>

      {/* Search & Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-72">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product, SKU, category..."
              className="pl-9 pr-4 py-1.5 w-full bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} products listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock Units</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 text-xs">{item.name}</td>
                  <td className="p-3 text-xs font-mono text-slate-500">{item.sku}</td>
                  <td className="p-3 text-xs text-slate-600">{item.category}</td>
                  <td className="p-3 text-xs font-bold text-slate-800">{item.stock}</td>
                  <td className="p-3 text-xs font-mono text-slate-900">{item.price}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => toast.info(`Editing ${item.name}`)}
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
    </div>
  );
}
