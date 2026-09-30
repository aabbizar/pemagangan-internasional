"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";

interface CustomerUser {
  id: string;
  avatar: string;
  name: string;
  username: string;
  role: "General" | "Admin" | "Creator";
  roleColor: string;
  projects: number;
  projectsTotal: number;
  status: "Active" | "Pending" | "Inactive";
  enrolled: string;
}

const initialUsers: CustomerUser[] = [
  {
    id: "1",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    name: "Arlene McCoy",
    username: "arlenem",
    role: "General",
    roleColor: "bg-emerald-100 text-emerald-700",
    projects: 12,
    projectsTotal: 25,
    status: "Active",
    enrolled: "May 12, 2019",
  },
  {
    id: "2",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Brooklyn Simmons",
    username: "brooklyns",
    role: "Admin",
    roleColor: "bg-amber-100 text-amber-700",
    projects: 18,
    projectsTotal: 50,
    status: "Active",
    enrolled: "August 7, 2017",
  },
  {
    id: "3",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Maribel Koss",
    username: "maribelk",
    role: "General",
    roleColor: "bg-emerald-100 text-emerald-700",
    projects: 7,
    projectsTotal: 25,
    status: "Active",
    enrolled: "May 9, 2014",
  },
  {
    id: "4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Cody Fisher",
    username: "codyf",
    role: "Creator",
    roleColor: "bg-cyan-100 text-cyan-800",
    projects: 27,
    projectsTotal: 100,
    status: "Active",
    enrolled: "October 24, 2018",
  },
  {
    id: "5",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Darlene Robertson",
    username: "darlener",
    role: "General",
    roleColor: "bg-emerald-100 text-emerald-700",
    projects: 21,
    projectsTotal: 25,
    status: "Active",
    enrolled: "March 6, 2018",
  },
  {
    id: "6",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Cameron Williamson",
    username: "cameronw",
    role: "General",
    roleColor: "bg-emerald-100 text-emerald-700",
    projects: 6,
    projectsTotal: 25,
    status: "Active",
    enrolled: "July 14, 2015",
  },
  {
    id: "7",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    name: "Dianne Russell",
    username: "dianner",
    role: "Admin",
    roleColor: "bg-amber-100 text-amber-700",
    projects: 32,
    projectsTotal: 50,
    status: "Active",
    enrolled: "August 2, 2013",
  },
];

export default function CleopatraUserManagementPage() {
  const [activeTab, setActiveTab] = React.useState<"View all" | "General" | "Admin" | "Creator">("View all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const filteredUsers = initialUsers.filter((u) => {
    const matchesTab = activeTab === "View all" ? true : u.role === activeTab;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm">Find all platform customers here</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.success("Exported 12,345 records to CSV")}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("Invite customer modal opened")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Invite customer</span>
          </button>
        </div>
      </div>

      {/* 2. User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-5 shadow-2xs">
          <p className="text-sm text-slate-500 mb-1">General customers</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">11,450</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              +2.15%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <p className="text-sm text-slate-500 mb-1">Admins</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">812</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              -0.34%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <p className="text-sm text-slate-500 mb-1">Creators</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">83</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              +1.18%
            </span>
          </div>
        </div>
      </div>

      {/* 3. User Filters Toolbar */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">All customers (12,345)</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {(["View all", "General", "Admin", "Creator"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-48 sm:w-60 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>

            <button
              type="button"
              onClick={() => toast.info("Filter parameters: All filters open")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. User Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
              className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
            />
          </div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Projects</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Enrolled</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredUsers.map((user) => {
            const isSelected = selectedIds.includes(user.id);
            return (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3.5 items-center transition-colors ${
                  isSelected ? "bg-cyan-50/40" : "hover:bg-slate-50/80"
                }`}
              >
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(user.id)}
                    className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">@{user.username}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-md ${user.roleColor}`}>
                    {user.role}
                  </span>
                </div>

                <div className="col-span-2">
                  <span className="text-sm font-medium text-slate-900">{user.projects}</span>
                  <span className="text-sm text-slate-400">/{user.projectsTotal}</span>
                </div>

                <div className="col-span-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {user.status}
                  </span>
                </div>

                <div className="col-span-1">
                  <span className="text-xs text-slate-500">{user.enrolled}</span>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toast.info(`Options for ${user.name}`)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="6" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="18" r="1.5" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
