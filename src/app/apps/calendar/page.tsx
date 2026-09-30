"use client";

import * as React from "react";
import { toast } from "sonner";

interface CalendarEvent {
  day: number;
  title: string;
  time: string;
  color: string;
}

const sampleEvents: CalendarEvent[] = [
  { day: 5, title: "Design Sprint Kickoff", time: "09:30 AM", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
  { day: 8, title: "Product Architecture Review", time: "02:00 PM", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { day: 14, title: "Board Strategy Sync", time: "11:00 AM", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { day: 19, title: "Cleopatra v2.4 Launch", time: "08:00 AM", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { day: 23, title: "Tokyo Operations Sync", time: "04:30 PM", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { day: 28, title: "Monthly Financial Audit", time: "10:00 AM", color: "bg-rose-100 text-rose-800 border-rose-300" },
];

export default function CleopatraCalendarPage() {
  const [viewMode, setViewMode] = React.useState<"Month" | "Week" | "Day">("Month");
  const [currentMonth, setCurrentMonth] = React.useState("October 2026");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900">Today</h2>
            <button
              type="button"
              onClick={() => toast.info("New task added to Today")}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button className="text-slate-900 font-semibold border-b-2 border-cyan-500 pb-1 cursor-pointer">
              To-dos
            </button>
            <button className="text-slate-500 hover:text-slate-900 pb-1 relative cursor-pointer">
              Events
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button className="text-slate-500 hover:text-slate-900 pb-1 cursor-pointer">
              Notes
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Today Tasks
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Marketing landing page QA", done: true },
                { label: "Wireframe UI flow with Figma", done: true },
                { label: "Tokyo partner onboarding call", done: false },
                { label: "UX research synthesis report", done: false },
              ].map((task, idx) => (
                <label key={idx} className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-slate-900">
                  <input
                    type="checkbox"
                    defaultChecked={task.done}
                    className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                  />
                  <span className={task.done ? "line-through text-slate-400 text-xs" : "text-xs"}>
                    {task.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Upcoming Events
            </h3>
            <div className="space-y-2.5">
              {sampleEvents.slice(0, 3).map((ev, i) => (
                <div key={i} className={`p-2.5 rounded-lg border text-xs ${ev.color}`}>
                  <p className="font-semibold">{ev.title}</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Oct {ev.day} • {ev.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Calendar View */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
        {/* Calendar Top Bar */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">{currentMonth}</h1>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setCurrentMonth("September 2026")}
                className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth("October 2026")}
                className="px-2.5 py-1 text-xs font-semibold hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer border-x border-slate-200"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth("November 2026")}
                className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              {(["Month", "Week", "Day"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    viewMode === mode
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => toast.info("Create event dialog opened")}
              className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>+ Event</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs min-w-[700px]">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold text-slate-500 py-2.5">
              <span>SUN</span>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
              {daysInMonth.map((day) => {
                const event = sampleEvents.find((e) => e.day === day);
                const isToday = day === 14;
                return (
                  <div
                    key={day}
                    className="min-h-[90px] p-2 hover:bg-slate-50/70 transition-colors relative flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday
                            ? "bg-cyan-500 text-white shadow-xs"
                            : "text-slate-700"
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    {event && (
                      <div
                        onClick={() => toast.info(`Event: ${event.title} at ${event.time}`)}
                        className={`mt-1 p-1 rounded border text-[11px] font-semibold truncate cursor-pointer hover:shadow-xs transition-shadow ${event.color}`}
                        title={`${event.title} (${event.time})`}
                      >
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
