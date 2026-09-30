"use client";

import * as React from "react";
import { toast } from "sonner";

interface TodoTask {
  id: string;
  column: "todo" | "progress" | "review" | "completed";
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  progress: string;
  dueDate: string;
  assignee: string;
}

const initialTasks: TodoTask[] = [
  {
    id: "t1",
    column: "todo",
    tag: "Design System",
    tagColor: "bg-purple-100 text-purple-700",
    title: "Update Cleopatra Figma UI Kit v2.4",
    description: "Align color palette with semantic tokens and export SVG asset definitions.",
    progress: "1/4",
    dueDate: "Nov 02",
    assignee: "AR",
  },
  {
    id: "t2",
    column: "todo",
    tag: "Security",
    tagColor: "bg-rose-100 text-rose-700",
    title: "Implement PKCE OAuth 2.1 Handshake",
    description: "Upgrade identity provider token exchange for strict authorization code grant.",
    progress: "0/3",
    dueDate: "Nov 05",
    assignee: "JD",
  },
  {
    id: "t3",
    column: "progress",
    tag: "Frontend",
    tagColor: "bg-cyan-100 text-cyan-800",
    title: "Integrate Realtime Telemetry WebSocket",
    description: "Stream CPU load, active sessions, and request latency into Mission Control.",
    progress: "4/6",
    dueDate: "Oct 31",
    assignee: "CF",
  },
  {
    id: "t4",
    column: "progress",
    tag: "Marketing",
    tagColor: "bg-amber-100 text-amber-800",
    title: "Global Partner Onboarding Deck",
    description: "Review localized slide decks with Tokyo and London regional coordinators.",
    progress: "2/5",
    dueDate: "Nov 01",
    assignee: "ML",
  },
  {
    id: "t5",
    column: "review",
    tag: "Backend",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Database Query Indexing for /participants",
    description: "Added compound indexes on status + createdAt to drop P99 response time.",
    progress: "5/5",
    dueDate: "Today",
    assignee: "SJ",
  },
  {
    id: "t6",
    column: "completed",
    tag: "Release",
    tagColor: "bg-emerald-100 text-emerald-800",
    title: "Production Static Export Verification",
    description: "Successfully built Next.js App Router bundle with 0 TypeScript compilation errors.",
    progress: "8/8",
    dueDate: "Completed",
    assignee: "AR",
  },
];

export default function CleopatraTodoPage() {
  const [tasks, setTasks] = React.useState<TodoTask[]>(initialTasks);
  const [search, setSearch] = React.useState("");

  const columns = [
    { key: "todo", title: "To-do", count: tasks.filter((t) => t.column === "todo").length, dot: "bg-slate-400" },
    { key: "progress", title: "On Progress", count: tasks.filter((t) => t.column === "progress").length, dot: "bg-blue-500" },
    { key: "review", title: "In Review", count: tasks.filter((t) => t.column === "review").length, dot: "bg-amber-500" },
    { key: "completed", title: "Completed", count: tasks.filter((t) => t.column === "completed").length, dot: "bg-emerald-500" },
  ] as const;

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/20 to-transparent opacity-50 blur-2xl"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-2">
            Kanban Board
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Sprint &amp; Task Management
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Track engineering milestones, design deliverables, and platform deployment schedules in real time.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 pr-4 py-2 w-full bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            const newTask: TodoTask = {
              id: Date.now().toString(),
              column: "todo",
              tag: "General",
              tagColor: "bg-slate-100 text-slate-700",
              title: "New Team Objective #" + (tasks.length + 1),
              description: "Specify deliverables, criteria of acceptance, and review deadlines.",
              progress: "0/3",
              dueDate: "Soon",
              assignee: "ME",
            };
            setTasks((prev) => [newTask, ...prev]);
            toast.success("Tugas baru ditambahkan ke kolom To-do.");
          }}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {/* Kanban Board 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.column === col.key);
          return (
            <div key={col.key} className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 min-h-[420px] flex flex-col">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`}></span>
                  <h3 className="text-sm font-bold text-slate-800">{col.title}</h3>
                  <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full font-mono">
                    {col.count}
                  </span>
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow cursor-grab"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${task.tagColor}`}>
                        {task.tag}
                      </span>
                      <span className="text-[11px] text-slate-400">{task.dueDate}</span>
                    </div>

                    <h4 className="font-semibold text-sm text-slate-900 mb-1 leading-snug">
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{task.progress}</span>
                      </div>

                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    No tasks in this lane
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
