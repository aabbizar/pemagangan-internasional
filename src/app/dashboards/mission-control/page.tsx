"use client";

import * as React from "react";
import { toast } from "sonner";

export default function CleopatraMissionControlPage() {
  return (
    <div className="space-y-6">
      {/* CEO Pulse Bar - Sticky Real-Time Vitals */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs overflow-x-auto shadow-xs border-b border-slate-800">
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider">SYSTEM HEALTH: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">API Latency:</span>
            <span className="font-mono text-white font-semibold">18ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Global Cluster Load:</span>
            <span className="font-mono text-cyan-400 font-semibold">32.4%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Throughput:</span>
            <span className="font-mono text-white font-semibold">14,820 req/s</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className="text-[11px] text-slate-400 font-mono">NODE: us-east-prod-01</span>
          <button
            type="button"
            onClick={() => toast.info("Diagnostics report generated.")}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] transition-colors cursor-pointer"
          >
            Diagnostics
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Mission Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Mission Control Center</h1>
            <p className="text-sm text-slate-500">Autonomous infrastructure telemetry, security posture, and failover status.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              DEFCON 5 (ALL CLEAR)
            </span>
          </div>
        </div>

        {/* Main Grid: Sentiment / Global Nodes (2/3) + Crisis Monitor (1/3) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Global Edge Node Distribution</h2>
                <p className="text-xs text-slate-500">Active regional edge gateways routing Cleopatra sessions</p>
              </div>
              <span className="text-xs font-mono font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded">
                99.998% Uptime
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { region: "N. Virginia (us-east-1)", ping: "12ms", status: "Healthy" },
                { region: "Frankfurt (eu-central-1)", ping: "24ms", status: "Healthy" },
                { region: "Tokyo (ap-northeast-1)", ping: "42ms", status: "Healthy" },
                { region: "Singapore (ap-southeast-1)", ping: "38ms", status: "Healthy" },
              ].map((node, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-mono text-slate-400">{node.ping}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 truncate">{node.region}</p>
                  <p className="text-[11px] text-emerald-700 font-medium">{node.status}</p>
                </div>
              ))}
            </div>

            <div className="h-44 bg-slate-900 rounded-xl p-4 flex flex-col justify-between text-white relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Realtime Traffic Volume Waveform</span>
                <span className="text-cyan-400 font-mono">Peak: 4.8 Gbps</span>
              </div>
              <div className="h-24 flex items-end gap-1 px-2">
                {Array.from({ length: 36 }).map((_, idx) => {
                  const h = Math.sin(idx * 0.4) * 35 + 50;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-cyan-500/80 hover:bg-cyan-400 rounded-t-xs transition-all"
                      style={{ height: `${h}%` }}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>00:00 UTC</span>
                <span>12:00 UTC</span>
                <span>NOW (LIVE)</span>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Incident &amp; Crisis Monitor</h2>
            <div className="space-y-3">
              {[
                { title: "DDoS Mitigation Layer Engaged", desc: "Blocked 14.2k illegitimate SYN packets in Tokyo region.", time: "12m ago", severity: "Low", col: "text-blue-600 bg-blue-50" },
                { title: "Database Auto-Scaled Replicas", desc: "Read replica added in Frankfurt to absorb analytics spikes.", time: "1h ago", severity: "Info", col: "text-slate-600 bg-slate-100" },
                { title: "SSL Certificate Rotated", desc: "Automated Let's Encrypt renewal for *.cleopatra.io.", time: "4h ago", severity: "Routine", col: "text-emerald-600 bg-emerald-50" },
              ].map((inc, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${inc.col}`}>
                      {inc.severity}
                    </span>
                    <span className="text-[10px] text-slate-400">{inc.time}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900">{inc.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{inc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
