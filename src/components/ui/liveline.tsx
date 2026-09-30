"use client";

/**
 * ⚠️ KODE MATI / WARISAN — JANGAN DIPAKAI SEBELUM DIROMBAK.
 *
 * Komponen ini TIDAK diimpor di file mana pun (dicek: 0 impor). Seluruh
 * gayanya masih memakai palet legacy (`#0A2342` / cyan / blue / slate) yang
 * ditandai ARSIP pada Notis Kanonis di docs/design-system.md.
 *
 * Rencana: dipakai kembali sebagai pelacak milestone peserta di Fase C/D
 * (lihat docs/component-inventory.md). Sebelum itu, retoken ke AETHEREAL:
 * `bg-ink` / `text-stone` / `border-moss`, sudut tajam, tanpa `rounded-full`
 * dan tanpa badge berdenyut.
 *
 * Catatan: section alur di landing (`src/components/landing/journey-section.tsx`)
 * adalah penggantinya dan sudah AETHEREAL.
 */
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { JourneyStep } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, MapPin, Award, ArrowRight, ShieldAlert } from "lucide-react";

interface LivelineProps {
  steps: JourneyStep[];
  className?: string;
}

export function Liveline({ steps, className }: LivelineProps) {
  const [activeStepId, setActiveStepId] = React.useState<number>(1);
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div className={cn("w-full flex flex-col gap-10", className)}>
      {/* Interactive Liveline Track (Desktop & Tablet) */}
      <div className="relative hidden md:block pt-4 pb-2">
        {/* Background track line */}
        <div className="absolute top-10 left-6 right-6 h-[3px] bg-slate-300 -translate-y-1/2 z-0 rounded-full" />

        {/* Animated active Liveline gradient */}
        <motion.div
          className="absolute top-10 left-6 h-[3px] bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-600 -translate-y-1/2 z-0 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          initial={false}
          animate={{
            width: `${((activeStepId - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Step Nodes */}
        <div
          role="tablist"
          aria-label="Tahapan Program Pemagangan Internasional"
          className="relative z-10 flex justify-between items-center"
        >
          {steps.map((step) => {
            const isActive = step.id === activeStepId;
            const isCompleted = step.id < activeStepId;

            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                id={`liveline-tab-${step.id}`}
                aria-selected={isActive}
                aria-controls={`liveline-panel-${step.id}`}
                onClick={() => setActiveStepId(step.id)}
                className="group flex flex-col items-center focus-visible:outline-none cursor-pointer"
              >
                {/* Node Circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 border-2",
                    isActive
                      ? "bg-[#0A2342] text-white border-cyan-400 ring-4 ring-cyan-100 scale-110 shadow-md"
                      : isCompleted
                      ? "bg-blue-600 text-white border-blue-600 hover:scale-105"
                      : "bg-white text-slate-500 border-slate-300 hover:border-slate-400 group-hover:scale-105"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span>{step.stageNumber}</span>
                  )}
                </div>

                {/* Node Title */}
                <span
                  className={cn(
                    "mt-3 text-xs md:text-sm font-semibold tracking-tight transition-colors font-display uppercase",
                    isActive
                      ? "text-[#0A2342] font-bold"
                      : isCompleted
                      ? "text-blue-700"
                      : "text-slate-500 group-hover:text-slate-800"
                  )}
                >
                  {step.title}
                </span>

                {/* Status Indicator */}
                <span className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-wide">
                  Stage {step.stageNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Selector Pills */}
      <div
        role="tablist"
        aria-label="Tahapan Program Mobile"
        className="flex md:hidden overflow-x-auto pb-2 gap-2 no-scrollbar"
      >
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`liveline-mobile-tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`liveline-panel-${step.id}`}
              onClick={() => setActiveStepId(step.id)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 font-display uppercase",
                isActive
                  ? "bg-[#0A2342] text-white border-cyan-500 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200"
              )}
            >
              <span className="font-mono text-[10px] opacity-75">#{step.stageNumber}</span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Feature Showcase Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          id={`liveline-panel-${activeStep.id}`}
          role="tabpanel"
          aria-labelledby={`liveline-tab-${activeStep.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 md:p-8 relative overflow-hidden"
        >
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A2342] via-blue-600 to-cyan-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Stage Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-50 text-cyan-900 border border-cyan-200 uppercase tracking-wider">
                  Timeline Stage {activeStep.stageNumber} of 05
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Status: Under Review
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-display uppercase">
                  {activeStep.title}
                </h3>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Timeline Specification:
                  </p>
                  <p className="text-slate-800 text-base font-medium">
                    {activeStep.description}
                  </p>
                </div>
              </div>

              {/* Progress Quick Switcher */}
              <div className="pt-2 flex items-center gap-3">
                {activeStepId > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStepId((prev) => prev - 1)}
                    className="text-xs font-mono font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-wider"
                  >
                    ← Previous Stage
                  </button>
                )}
                {activeStepId < steps.length && (
                  <button
                    type="button"
                    onClick={() => setActiveStepId((prev) => prev + 1)}
                    className="text-xs font-mono font-semibold text-blue-700 hover:text-blue-800 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>Next: {steps[activeStepId]?.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Stage Metadata State */}
            <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 md:p-6 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-blue-700 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">
                    Execution Location
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    {activeStep.location}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-200" />

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-cyan-700 shadow-2xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">
                    Key Deliverable
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    {activeStep.keyOutput}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-500 bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Notice: Detailed stage documentation will be populated following formal publication approval.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
