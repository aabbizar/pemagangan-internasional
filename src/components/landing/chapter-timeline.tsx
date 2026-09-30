"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "#E3E1DC", // var(--color-foreground, #ffffff)
  mutedTextColor: "#9ca3af", // var(--color-muted-foreground, #a1a1aa)
  activeColor: "#06b6d4", // cyan-500
  backgroundColor: "#121212", // MATCH "Nilai Keunggulan" background
  duration: 1.4,
};

export function ChapterTimeline(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="bg-[#121212] text-[#E3E1DC] overflow-hidden border-t border-white/10">
      {/* Lead-in so the pinned timeline has somewhere to scroll in from. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center bg-[#121212]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
          <span>Roadmap • Alur Perjalanan Kandidat</span>
        </div>
        <h1 className="max-w-[20ch] text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight leading-[1.05] text-white mb-6">
          LIMA TAHAP RESMI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">
            MENUJU PANGGUNG DUNIA.
          </span>
        </h1>
        <p className="max-w-2xl text-base sm:text-lg font-light leading-relaxed text-neutral-300">
          Sistem seleksi dan pembinaan meritokratis yang transparan tanpa calo. Setiap tahap dirancang
          presisi untuk memastikan kompetensi vokasi dan perlindungan hukum bilateral Anda terjamin penuh.
        </p>
        <span className="mt-8 animate-bounce text-cyan-500 text-2xl">&darr;</span>
      </section>

      {/* Realistic usage: custom copy, a branded accent, tuned reveal speed. */}
      <Timeline
        title="LIMA TAHAP RESMI"
        periodLabel="2024 — 2026"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85"
        imageAlt="Team at work in a bright studio"
        duration={s.duration}
      />

      <section className="flex h-[50vh] items-center justify-center px-6 text-center text-sm text-neutral-400 bg-[#121212]">
        Dari pendaftaran pertama hingga pelepasan resmi ke negara tujuan.
      </section>
    </div>
  );
}

export default ChapterTimeline;
