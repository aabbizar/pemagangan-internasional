"use client";

import * as React from "react";
import gsap from "gsap";

export function Preloader() {
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const subtextRef = React.useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = React.useState(false);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Hindari setState sinkron di body effect (lint react-hooks/set-state-in-effect)
      requestAnimationFrame(() => setRemoved(true));
      return;
    }

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        onComplete: () => {
          setRemoved(true);
        },
      });

      loadTl
        .to(barRef.current, { width: "100%", duration: 1.1, ease: "power2.inOut" })
        .to([textRef.current, subtextRef.current], { y: -30, opacity: 0, duration: 0.35, stagger: 0.05 })
        .to(loaderRef.current, { yPercent: -100, duration: 0.75, ease: "power4.inOut" });
    });

    return () => ctx.revert();
  }, []);

  if (removed) return null;

  return (
    <div ref={loaderRef} className="loader bg-[#121212] flex flex-col justify-center items-center text-white">
      <div className="text-center space-y-3 px-6">
        <div ref={subtextRef} className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-blue-400 font-semibold">
          KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA
        </div>
        <div ref={textRef} className="loader-text tracking-tight uppercase">
          LEMBAGA PEMAGANGAN
        </div>
      </div>
      <div ref={barRef} className="loader-bar" />
    </div>
  );
}
