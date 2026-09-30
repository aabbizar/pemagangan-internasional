'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export interface HorizontalScrollProps {
  headerTitle?: React.ReactNode;
}

/**
 * Swiss International Style watermark — deeply ghosted, white/6 opacity so it
 * acts as atmospheric texture without obstructing foreground content.
 * WCAG-safe: purely decorative (aria-hidden), never carries meaning.
 */
function ParallaxWatermark({
  text,
  scrollYProgress,
  index,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  light?: boolean;
}) {
  const start = Math.max(0, (index - 0.5) / 5);
  const end = Math.min(1, (index + 1.5) / 5);
  const x = useTransform(scrollYProgress, [start, end], [160, -160]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ x }}
      className="text-[22vw] font-black relative bottom-5 inline-block select-none pointer-events-none tracking-tighter whitespace-nowrap will-change-transform leading-none text-black"
    >
      {text}
    </motion.span>
  );
}

export default function HorizontalScroll({
  headerTitle,
}: HorizontalScrollProps): React.ReactElement {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw']);

  // Arrow indicator: rotates from → (0°) to ↓ (90°) as scroll progresses toward end
  const arrowRotate = useTransform(scrollYProgress, [0.8, 1], [0, 90]);
  // Fade-to-dark overlay intensifies on the last 30% of horizontal scroll travel
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.72]);

  return (
    <div id="purpose" className="relative w-full bg-[#111827]">
      {/* ── Section header — deep navy, fine grid, Swiss typography ── */}
      <header className="text-white relative w-full bg-[#111827] grid place-content-center h-[80vh] px-6 overflow-hidden">
        {/* Subtle dot-grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative z-10 text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            Bab 02 — Standar Kompetensi
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            {headerTitle ?? (
              <>
                Program
                <br />
                Unggulan
              </>
            )}
          </h1>
        </div>
      </header>

      {/* ── Horizontal scroll track — 500vh driver ── */}
      <div ref={targetRef} className="h-[500vh] relative w-full">
        {/* Pinned sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#111827] z-20">

          {/* Fade-to-dark overlay: intensifies as user approaches story scroll */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-40 pointer-events-none"
          />

          {/* Animated directional arrow cue */}
          <motion.div
            style={{ rotate: arrowRotate }}
            aria-hidden="true"
            className="absolute bottom-8 right-8 z-50 w-10 h-10 rounded-full border border-white/20
                       flex items-center justify-center bg-white/5 backdrop-blur-sm"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 text-white/70 fill-none stroke-current" strokeWidth={1.5}>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <motion.ul
            style={{ x }}
            className="flex h-screen w-[500vw] will-change-transform m-0 p-0 list-none"
          >
            {/* SLIDE 1 — MAGANG: warm coral-red, light watermark */}
            <li className="h-screen w-screen shrink-0 bg-[#C0392B] flex flex-col justify-center overflow-hidden items-center relative">
              <ParallaxWatermark text="MAGANG" scrollYProgress={scrollYProgress} index={0} light />
              <Image
                src="https://cdn.21st.dev/assets/mirror/a6/a60e580b9f2a59d3b114cab47c31750e3314dce9e45beaee7510e1ae70a4d77b.jpg"
                className="2xl:w-[550px] w-[380px] absolute bottom-0 z-10 object-contain pointer-events-none"
                width={500} height={500} alt="Program Magang" unoptimized priority
              />
            </li>

            {/* SLIDE 2 — BEKERJA: deep slate-blue, light watermark */}
            <li className="h-screen w-screen shrink-0 bg-[#1A3DE8] flex flex-col justify-center overflow-hidden items-center relative">
              <ParallaxWatermark text="BEKERJA" scrollYProgress={scrollYProgress} index={1} light />
              <Image
                src="https://cdn.21st.dev/assets/mirror/26/2643eec9dea394c7dd9359fcc59df20f318fa5c718efb7022c02a6d6f14d224a.jpg"
                className="2xl:w-[550px] w-[380px] absolute bottom-0 z-10 object-contain pointer-events-none"
                width={500} height={500} alt="Jalur Bekerja" unoptimized
              />
            </li>

            {/* SLIDE 3 — SYARAT: warm amber-sand, dark watermark */}
            <li className="h-screen w-screen shrink-0 bg-[#D4A843] flex flex-col justify-center overflow-hidden items-center relative">
              <ParallaxWatermark text="SYARAT" scrollYProgress={scrollYProgress} index={2} />
              <Image
                src="https://cdn.21st.dev/assets/mirror/2c/2c73cfbc9e2b2d98dd78296481256632ee231d2c2e579dad060631576642bab3.jpg"
                className="2xl:w-[550px] w-[380px] absolute bottom-0 z-10 object-contain pointer-events-none"
                width={500} height={500} alt="Syarat Kualifikasi" unoptimized
              />
            </li>

            {/* SLIDE 4 — PELATIHAN: sage teal-green, light watermark */}
            <li className="h-screen w-screen shrink-0 bg-[#1B6B5A] flex flex-col justify-center overflow-hidden items-center relative">
              <ParallaxWatermark text="PELATIHAN" scrollYProgress={scrollYProgress} index={3} light />
              <Image
                src="https://cdn.21st.dev/assets/mirror/be/be9ac439b8e4fc29314213d07097d8ffcb13bf2e9ab0479ba258d11878770dbc.jpg"
                className="2xl:w-[550px] w-[380px] absolute bottom-0 z-10 object-contain pointer-events-none"
                width={500} height={500} alt="Pelatihan Hybrid" unoptimized
              />
            </li>

            {/* SLIDE 5 — DAFTAR: deep navy close to wrapper, smooth handoff */}
            <li className="h-screen w-screen shrink-0 bg-[#0B132B] flex flex-col justify-center overflow-hidden items-center relative">
              <ParallaxWatermark text="DAFTAR" scrollYProgress={scrollYProgress} index={4} light />
              <Image
                src="https://cdn.21st.dev/assets/mirror/02/02e954c0f565c8567eaf687bdf03eb4091a61688bf29457935db861396879a45.jpg"
                className="2xl:w-[550px] w-[380px] absolute bottom-0 z-10 object-contain pointer-events-none"
                width={500} height={500} alt="Pendaftaran" unoptimized
              />
              {/* Bottom vignette matching wrapper so the last slide bleeds in seamlessly */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B132B]/90 pointer-events-none" />
            </li>
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
