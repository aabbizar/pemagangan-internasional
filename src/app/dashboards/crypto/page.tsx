"use client";

import * as React from "react";
import { toast } from "sonner";

interface CryptoToken {
  rank: number;
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  volume24h: string;
  marketCap: string;
}

const tokens: CryptoToken[] = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: "$64,280.50", change24h: "+3.42%", isPositive: true, volume24h: "$28.4B", marketCap: "$1.26T" },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: "$3,450.20", change24h: "+2.18%", isPositive: true, volume24h: "$14.2B", marketCap: "$415.8B" },
  { rank: 3, symbol: "SOL", name: "Solana", price: "$152.80", change24h: "+8.94%", isPositive: true, volume24h: "$6.8B", marketCap: "$71.2B" },
  { rank: 4, symbol: "BNB", name: "BNB", price: "$582.40", change24h: "-0.65%", isPositive: false, volume24h: "$1.1B", marketCap: "$87.4B" },
  { rank: 5, symbol: "AVAX", name: "Avalanche", price: "$28.90", change24h: "+5.12%", isPositive: true, volume24h: "$840M", marketCap: "$11.6B" },
];

export default function CleopatraCryptoPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Crypto Market</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track your favorite tokens, DEX volume, and liquidity pools</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Last updated: Just now</span>
          <button
            type="button"
            onClick={() => toast.info("Market rates refreshed.")}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            title="Refresh"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Part A: Trending Token Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokens.slice(0, 4).map((t) => (
          <div key={t.symbol} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center">
                  {t.symbol.slice(0, 3)}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{t.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{t.symbol}</span>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  t.isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {t.change24h}
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">{t.price}</div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
              <span>Vol: {t.volume24h}</span>
              <span>Cap: {t.marketCap}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Part B: Market Table + Web3 Connect Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Market Table (3 cols) */}
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Cryptocurrency Spot Prices</h2>
            <span className="text-xs text-slate-400">Top 100 Sorted by Market Cap</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="p-3 w-10 text-center">#</th>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">24h %</th>
                  <th className="p-3">24h Volume</th>
                  <th className="p-3">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tokens.map((t) => (
                  <tr key={t.symbol} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 text-center text-slate-400 font-mono">{t.rank}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{t.name}</span>
                        <span className="text-slate-400 font-mono">{t.symbol}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">{t.price}</td>
                    <td className="p-3">
                      <span className={`font-semibold font-mono ${t.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        {t.change24h}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{t.volume24h}</td>
                    <td className="p-3 font-mono text-slate-900 font-semibold">{t.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Web3 Connect Card (1 col) */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Web3 Wallet Connection</h3>
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Connected Address</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="font-mono text-xs text-cyan-300 truncate">0x71C...9B42A8</p>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block">Total Portfolio Valuation</span>
              <span className="text-2xl font-bold font-mono text-white">$142,850.00</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.info("Wallet switched to Arbitrum One")}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Switch Network (Arbitrum One)
          </button>
        </div>
      </div>
    </div>
  );
}
