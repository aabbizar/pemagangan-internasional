"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";

interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  price: string;
  type: string;
}

const properties: Property[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop&q=80",
    title: "The Horizon Grand Penthouse",
    location: "452 Metropolitan Ave, New York",
    beds: 4,
    baths: 3,
    sqft: "3,450 sqft",
    price: "$2,850,000",
    type: "Penthouse",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80",
    title: "Minimalist Modern Villa",
    location: "88 Silver Palm Dr, Miami",
    beds: 5,
    baths: 4,
    sqft: "4,200 sqft",
    price: "$3,400,000",
    type: "Villa",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop&q=80",
    title: "Glass Pavilion Residence",
    location: "1200 Sunset Hill, Los Angeles",
    beds: 3,
    baths: 2,
    sqft: "2,800 sqft",
    price: "$1,950,000",
    type: "Modern",
  },
];

export default function CleopatraRealEstatePage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real Estate Portfolio</h1>
          <p className="text-sm text-slate-500">Commercial &amp; residential luxury property assets and escrow pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.info("Filter property types")}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Filter Type ▾
          </button>
          <button
            type="button"
            onClick={() => toast.success("New listing wizard opened")}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            + New Listing
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Properties</p>
          <div className="text-2xl font-bold text-slate-900">4,892</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+8.4% YoY</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Active Listings</p>
          <div className="text-2xl font-bold text-slate-900">3,120</div>
          <span className="text-[11px] text-cyan-600 font-semibold">Available Now</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Pending Escrow</p>
          <div className="text-2xl font-bold text-slate-900">248</div>
          <span className="text-[11px] text-amber-600 font-semibold">Closing Q4</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Portfolio Value</p>
          <div className="text-2xl font-bold text-slate-900">$148.5M</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+14.2% return</span>
        </div>
      </div>

      {/* Main Grid: Property Cards + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Listings */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Featured Active Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover"
                    unoptimized
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {p.type}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded shadow-xs font-mono">
                    {p.price}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{p.title}</h3>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{p.location}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <span>{p.beds} Beds</span>
                    <span>•</span>
                    <span>{p.baths} Baths</span>
                    <span>•</span>
                    <span>{p.sqft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 col: Agents & Map preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Top Producing Brokers</h3>
            <div className="space-y-3">
              {[
                { name: "Victoria Sterling", sales: "$28.4M", closed: 14 },
                { name: "Marcus Davenport", sales: "$21.8M", closed: 9 },
                { name: "Sophia Chen", sales: "$19.2M", closed: 11 },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-semibold text-xs text-slate-900">{agent.name}</p>
                    <p className="text-[11px] text-slate-400">{agent.closed} closed deals</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                    {agent.sales}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
