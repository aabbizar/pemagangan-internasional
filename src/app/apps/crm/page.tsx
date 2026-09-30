"use client";

import * as React from "react";
import { toast } from "sonner";

export default function CleopatraCRMPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* CRM Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CRM &amp; Sales Pipeline</h1>
          <p className="text-sm text-slate-500">Monitor customer relationship lifecycles, deal stages, and retention.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.info("Pipeline filter changed")}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            All Pipelines ▾
          </button>
          <button
            type="button"
            onClick={() => toast.success("New deal draft created")}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            + Add Deal
          </button>
        </div>
      </div>

      {/* CRM Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Leads</span>
            <span className="text-xs text-slate-400 font-mono">Q3</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">129</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">+24 vs last week</span>
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-semibold">-8%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Conversion Rate</span>
            <span className="text-xs text-slate-400 font-mono">Q3</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">24%</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">+8 vs last week</span>
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-semibold">-2%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">CLV (Cycle Length)</span>
            <span className="text-xs text-slate-400 font-mono">Q3</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">14d</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">+1d vs last week</span>
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-semibold">-4%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue & Pipeline Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pipeline Velocity &amp; Revenue</h2>
              <p className="text-xs text-slate-500">Realized versus projected enterprise deal closures</p>
            </div>
            <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
              Avg Deal: $42,500
            </span>
          </div>

          {/* Clean SVG Visualizer */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-100">
            {[
              { m: "May", h: "45%", val: "$34k" },
              { m: "Jun", h: "60%", val: "$48k" },
              { m: "Jul", h: "52%", val: "$41k" },
              { m: "Aug", h: "78%", val: "$62k" },
              { m: "Sep", h: "65%", val: "$51k" },
              { m: "Oct", h: "90%", val: "$74k" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val}
                </span>
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all group-hover:brightness-110"
                  style={{ height: bar.h }}
                ></div>
                <span className="text-xs text-slate-500 font-medium">{bar.m}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Projected Pipeline: $1.24M</span>
            <span>Win Ratio: 68.4%</span>
          </div>
        </div>

        {/* Right: Active CRM Leads (1/3) */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Recent Qualified Leads</h2>
          <div className="space-y-3">
            {[
              { company: "Apex Logistics Global", contact: "Mark Vance", val: "$85,000", stage: "Contract Sent", stageColor: "bg-emerald-100 text-emerald-800" },
              { company: "Nordic FinTech Solutions", contact: "Elena R.", val: "$62,000", stage: "Discovery Call", stageColor: "bg-blue-100 text-blue-800" },
              { company: "Sovereign Health AI", contact: "Dr. Chen", val: "$110,000", stage: "Proposal Review", stageColor: "bg-purple-100 text-purple-800" },
              { company: "Kanto Automotive", contact: "Kenji Sato", val: "$44,000", stage: "Negotiation", stageColor: "bg-amber-100 text-amber-800" },
            ].map((lead, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-900">{lead.company}</h4>
                  <span className="text-xs font-bold text-slate-900 font-mono">{lead.val}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{lead.contact}</span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${lead.stageColor}`}>
                    {lead.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
