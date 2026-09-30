"use client";

import * as React from "react";
import { toast } from "sonner";

interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  initials: string;
  avatarBg: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
}

const emailList: EmailItem[] = [
  {
    id: "1",
    sender: "Michael Lee",
    senderEmail: "michael.lee@techcorp.io",
    initials: "ML",
    avatarBg: "from-blue-500 to-indigo-600",
    subject: "Follow-Up: Product Demo Feedback",
    preview: "Hi John, Thank you for attending the product demo yesterday. The team loved the new dashboard analytics...",
    time: "9:00 AM",
    unread: false,
  },
  {
    id: "2",
    sender: "Jane Doe",
    senderEmail: "jane.doe@business.com",
    initials: "JD",
    avatarBg: "from-amber-400 to-orange-500",
    subject: "Proposal for Partnership 🎉",
    preview: "Hi John, Hope this email finds you well. I'm reaching out to discuss a potential strategic synergy between our teams...",
    time: "10:15 AM",
    unread: true,
  },
  {
    id: "3",
    sender: "Sarah Jenkins",
    senderEmail: "s.jenkins@designstudio.co",
    initials: "SJ",
    avatarBg: "from-emerald-400 to-teal-600",
    subject: "Q3 Design System Sync Notes",
    preview: "Attached are the final Figma design tokens, component guide, and responsive viewport specs for the upcoming release...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    sender: "Alex Rivera",
    senderEmail: "alex@cryptosync.net",
    initials: "AR",
    avatarBg: "from-purple-500 to-pink-500",
    subject: "API Integration Webhook Updates",
    preview: "We have finalized the endpoint deprecation schedule. Please make sure to upgrade your webhook handlers by Friday...",
    time: "Oct 28",
    unread: false,
  },
];

export default function CleopatraEmailPage() {
  const [selectedEmail, setSelectedEmail] = React.useState<EmailItem>(emailList[1]);
  const [activeTab, setActiveTab] = React.useState<"All" | "Unread" | "Archive">("All");
  const [replyText, setReplyText] = React.useState("");

  const filteredEmails = emailList.filter((e) => {
    if (activeTab === "Unread") return e.unread;
    return true;
  });

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("Tulis pesan balasan terlebih dahulu.");
      return;
    }
    toast.success(`Balasan terkirim ke ${selectedEmail.sender}`);
    setReplyText("");
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Email Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Emails</h1>
          <p className="text-xs text-slate-500">Platform communications & inbox</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Email"
              className="pl-10 pr-4 py-2 w-full sm:w-48 md:w-64 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => toast.info("New message composer opened")}
            className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm shrink-0 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* Main Email Grid */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-xs min-h-0">
        {/* Column 1: Email List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 flex items-center gap-1 overflow-x-auto bg-slate-50/50">
            {(["All", "Unread", "Archive"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "text-slate-900 bg-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredEmails.map((item) => {
              const isSelected = selectedEmail.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedEmail(item)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-cyan-50/60 border-l-3 border-cyan-500"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-2xs`}
                    >
                      {item.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-semibold truncate ${isSelected ? "text-cyan-900" : "text-slate-900"}`}>
                          {item.sender}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.unread && <span className="w-2 h-2 rounded-full bg-cyan-500"></span>}
                          <span className="text-[11px] text-slate-400">{item.time}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-slate-700 truncate mb-0.5">
                        {item.subject}
                      </p>
                      <p className="text-xs text-slate-400 truncate leading-relaxed">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Email Content */}
        <div className="hidden md:flex md:flex-1 md:flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedEmail.avatarBg} flex items-center justify-center text-white text-sm font-bold`}
              >
                {selectedEmail.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{selectedEmail.sender}</span>
                  <span className="text-xs text-slate-500">&lt;{selectedEmail.senderEmail}&gt;</span>
                </div>
                <p className="text-xs text-slate-400">To: Richard Brown &lt;richard@cleopatra.io&gt;</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>{selectedEmail.time}</span>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6 space-y-4 flex-1">
            <h2 className="text-lg font-bold text-slate-900">{selectedEmail.subject}</h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>Hello Richard,</p>
              <p>{selectedEmail.preview}</p>
              <p>
                We have reviewed the latest Cleopatra dashboard architecture and were thoroughly impressed with the clean modular styling, realtime metric updates, and crisp typography.
              </p>
              <p>
                Looking forward to discussing next milestones on our scheduled calendar call tomorrow. Let us know if you need any additional assets or documentation before then.
              </p>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">{selectedEmail.sender}</p>
                <p>Enterprise Operations & Analytics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Reply Composer */}
        <div className="hidden xl:flex xl:w-96 xl:flex-col xl:border-l xl:border-slate-200 p-4 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span>Quick Reply</span>
          </h3>
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-lg p-2.5">
              <span>To: </span>
              <strong className="text-slate-800">{selectedEmail.senderEmail}</strong>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response here..."
              rows={8}
              className="w-full flex-1 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => toast.info("Attach file")}
                  className="p-1.5 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title="Attach file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSendReply}
                className="px-4 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Send Reply</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
