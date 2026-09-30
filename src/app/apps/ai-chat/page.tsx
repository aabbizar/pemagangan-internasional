"use client";

import * as React from "react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function CleopatraAIChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate Cleopatra AI Response
    setTimeout(() => {
      let replyText = "Based on Cleopatra platform real-time analytics: All core KPIs are performing within normal parameters (+20.1% vs last month).";
      if (text.toLowerCase().includes("top") || text.toLowerCase().includes("product")) {
        replyText = "Top-performing product this month: 'Pro Enterprise Plan' generating $24,800 with a +34% expansion rate.";
      } else if (text.toLowerCase().includes("drop") || text.toLowerCase().includes("sales")) {
        replyText = "Sales drop overview: Europe region experienced a temporary dip of -1.4% in mid-cycle before recovering to +3.8%.";
      } else if (text.toLowerCase().includes("region")) {
        replyText = "Best performing region: North America ($14,250) followed by Southeast Asia ($9,820) with 94% retention.";
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 py-8">
      {/* 1. Greeting Section */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-2">
        Hi! I&apos;m your Assistant.
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
        How can I help you today?
      </h2>
      <p className="text-slate-500 text-center mb-8 max-w-md">
        Ask me anything about your sales and I&apos;ll provide real-time insights
      </p>

      {/* Messages Stream if conversation started */}
      {messages.length > 0 && (
        <div className="w-full max-w-3xl mb-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-cyan-500 text-white"
                }`}
              >
                {msg.sender === "user" ? "You" : "AI"}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl p-4 text-sm ${
                  msg.sender === "user"
                    ? "bg-slate-900 text-white rounded-br-xs"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                <span
                  className={`text-[10px] mt-1.5 block ${
                    msg.sender === "user" ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Quick Actions Grid */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          <button
            type="button"
            onClick={() => toast.info("Quick actions customize panel")}
            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Actions
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: View Sales Performance */}
          <button
            type="button"
            onClick={() => handleSend("View Sales Performance for this quarter")}
            className="group relative bg-sky-50/60 border border-sky-200/80 rounded-xl p-4 text-left hover:bg-sky-100/60 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center mb-3 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="font-medium text-slate-900">View</div>
            <div className="text-sm text-slate-500">Sales Performance</div>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Card 2: Generate Sales Forecast */}
          <button
            type="button"
            onClick={() => handleSend("Generate Sales Forecast for next 6 months")}
            className="group relative bg-cyan-50/60 border border-cyan-200/80 rounded-xl p-4 text-left hover:bg-cyan-100/60 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center mb-3 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="font-medium text-slate-900">Generate</div>
            <div className="text-sm text-slate-500">Sales Forecast</div>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Card 3: Identify Performing Products */}
          <button
            type="button"
            onClick={() => handleSend("Identify Performing Products and top tiers")}
            className="group relative bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-left hover:bg-emerald-100/60 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mb-3 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="font-medium text-slate-900">Identify</div>
            <div className="text-sm text-slate-500">Performing Products</div>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Chat Input */}
      <div className="w-full max-w-3xl">
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Need quick insights...."
            className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
          />

          <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast.info("Add file attachment")}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Add file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => toast.info("Global web search active")}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Web Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => toast.info("Cleopatra Model Library")}
                className="px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                Library
              </button>
              <button
                type="button"
                onClick={() => toast.info("Voice record listening...")}
                className="px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Voice Record
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer"
              title="Send Message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Prompt Suggestions */}
      <div className="w-full max-w-3xl mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Latest Prompts</h3>
          <button
            type="button"
            onClick={() => toast.info("Prompts refreshed.")}
            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Prompts
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleSend("What's the top-performing product this month")}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            What&apos;s the top-performing product this month
          </button>
          <button
            type="button"
            onClick={() => handleSend("Sales drop overview")}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Sales drop overview
          </button>
          <button
            type="button"
            onClick={() => handleSend("Regions are performing the best")}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Regions are performing the best
          </button>
        </div>
      </div>
    </div>
  );
}
