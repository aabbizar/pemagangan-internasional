"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface JourneyPhaseData {
  id: string;
  title: string;
  desc: string;
  img: string;
  align: string;
}

const BENEFIT_PHASES: JourneyPhaseData[] = [
  {
    id: "I",
    title: "JARINGAN TERPERCAYA",
    desc: "Telah menjalin kerja sama resmi dengan berbagai lembaga dan institusi berskala internasional yang kredibel untuk menjamin penempatan Anda.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85", 
    align: "left",
  },
  {
    id: "II",
    title: "AKSES PENUH 1.5 JUTA",
    desc: "Cukup dengan investasi Rp 1.500.000, Anda sudah membuka akses ke seluruh ekosistem modul pembelajaran LMS berstandar industri secara penuh.",
    img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=85", 
    align: "right",
  },
  {
    id: "III",
    title: "HYBRID 80% / 20%",
    desc: "Kurikulum cerdas: 80% kelas online untuk penguasaan teori, dan 20% offline sebagai pemantapan praktik serta Ujian Akhir (UAS) komprehensif.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85", 
    align: "center",
  }
];

function JourneyPhase({ phase, index }: { phase: JourneyPhaseData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Subtle scaling effect based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col ${
        phase.align === "left" ? "md:items-start" : 
        phase.align === "right" ? "md:items-end" : "md:items-center"
      }`}
    >
      {/* Image Container */}
      <motion.div 
        initial={{ opacity: 0, clipPath: "inset(20% 20% 20% 20%)", filter: "blur(10px)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full md:w-[60%] lg:w-[45%] h-[50vh] md:h-[60vh] overflow-hidden bg-neutral-900 relative"
      >
        <motion.img 
          style={{ y, scale }}
          src={phase.img} 
          alt={`Fase ${phase.id}: ${phase.title}`} 
          className="absolute inset-0 w-full h-[130%] object-cover opacity-80 mix-blend-luminosity origin-center"
        />
      </motion.div>

      {/* Text Block - Overlapping */}
      <motion.div 
        initial={{ 
          opacity: 0, 
          x: phase.align === "left" ? -80 : phase.align === "right" ? 80 : 0, 
          y: phase.align === "center" ? 80 : 20,
          filter: "blur(8px)"
        }}
        whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        className={`mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 bg-[#121212] p-6 md:p-8 border border-[#E3E1DC]/20 z-10 w-full md:w-[400px] shadow-2xl ${
          phase.align === "left" ? "md:left-[40%] lg:left-[35%]" :
          phase.align === "right" ? "md:right-[40%] lg:right-[35%]" :
          "md:left-[50%] md:-translate-x-1/2 md:top-[80%]"
        }`}
      >
        <motion.span 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: false }}
          className="block h-[1px] bg-cyan-500/50 mb-4"
        />
        <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-3 block">
          BENEFIT {phase.id}
        </span>
        <h3 className="font-sans font-bold text-3xl uppercase tracking-tight mb-4 text-[#E3E1DC]">
          {phase.title}
        </h3>
        <p className="font-sans text-[15px] font-light text-neutral-400 leading-relaxed">
          {phase.desc}
        </p>
      </motion.div>
      
      {/* Vertical connector line (desktop only) */}
      {index !== BENEFIT_PHASES.length - 1 && (
        <motion.div 
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.1 }}
          className="hidden md:block absolute top-full left-1/2 w-[1px] h-32 md:h-48 bg-gradient-to-b from-cyan-500/40 to-transparent -translate-x-1/2 origin-top" 
        />
      )}
    </div>
  );
}

export function Chapter03HumanJourney() {
  return (
    <section id="journey" className="bg-[#121212] text-[#E3E1DC] py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <header className="mb-24 md:mb-48 border-t border-[#E3E1DC]/20 pt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className="mb-4">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cyan-400 border border-neutral-800 bg-neutral-900/70 px-3.5 py-1.5 backdrop-blur-sm inline-block">
                Bab 03 • Nilai Keunggulan
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.5 }}
            className="font-display uppercase text-4xl sm:text-5xl md:text-7xl tracking-tight max-w-4xl leading-[0.9]"
          >
            NILAI <br /> KEUNGGULAN
          </motion.h2>
        </header>

        <div className="space-y-32 md:space-y-48">
          {BENEFIT_PHASES.map((phase, i) => (
            <JourneyPhase key={phase.id} phase={phase} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
