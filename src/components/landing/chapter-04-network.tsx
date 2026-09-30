"use client";

import * as React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const PARTNERSHIP_WORKS: WorksWheelItem[] = [
  {
    title: "JITCO Otomotif",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "Robotika Cerdas",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "IM Japan Presisi",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "Semikonduktor",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "Kaigo Keperawatan",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "IHK Jerman VET",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "HRD Korea Factory",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "Infrastruktur Baja",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
  {
    title: "Teknologi Maritim",
    image: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80",
    href: "#network",
  },
];

export function Chapter04Network() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const lockRef = React.useRef(false);

  const count = PARTNERSHIP_WORKS.length;

  React.useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const total = containerRef.current.offsetHeight - window.innerHeight;
        if (total > 0) {
          const current = -rect.top;
          const p = Math.min(1, Math.max(0, current / total));
          setProgress(p);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Step-by-step wheel interceptor while sticky pinned
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      // Check if container is currently in active sticky viewing zone
      const isSticky = rect.top <= 8 && rect.bottom >= window.innerHeight - 8;
      if (!isSticky) return;

      const currentScroll = -rect.top;
      const currentStep = Math.round((currentScroll / total) * count);

      // Swallow trailing scroll inertia during transition so it never skips cards
      if (lockRef.current) {
        if ((e.deltaY > 0 && currentStep < count) || (e.deltaY < 0 && currentStep > 0)) {
          e.preventDefault();
        }
        return;
      }

      if (Math.abs(e.deltaY) < 16) return;

      if (e.deltaY > 0) {
        // Scrolling down: move EXACTLY 1 image step
        if (currentStep < count) {
          e.preventDefault();
          const nextStep = currentStep + 1;
          const targetY = window.scrollY + rect.top + (nextStep / count) * total;
          window.scrollTo({ top: targetY, behavior: "smooth" });

          lockRef.current = true;
          window.setTimeout(() => {
            lockRef.current = false;
          }, 360);
        }
        // When currentStep >= count, allow normal scroll to continue smoothly to Chapter 5!
      } else if (e.deltaY < 0) {
        // Scrolling up: move EXACTLY 1 image step back
        if (currentStep > 0) {
          e.preventDefault();
          const prevStep = currentStep - 1;
          const targetY = window.scrollY + rect.top + (prevStep / count) * total;
          window.scrollTo({ top: targetY, behavior: "smooth" });

          lockRef.current = true;
          window.setTimeout(() => {
            lockRef.current = false;
          }, 360);
        }
        // When currentStep <= 0, allow normal scroll to continue smoothly to Chapter 3!
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [count]);

  const handleSelectIndex = React.useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const total = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (index + 1) / PARTNERSHIP_WORKS.length;
    const targetY = window.scrollY + rect.top + targetProgress * total;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  return (
    <section
      id="network"
      ref={containerRef}
      className="relative w-full h-[360vh] bg-white text-neutral-900 border-t border-b border-neutral-200"
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex flex-col justify-between">
        {/* Clean, Minimalist Section Badge */}
        <div className="absolute top-24 left-6 sm:top-28 sm:left-12 z-20 pointer-events-none">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-500 border border-neutral-300 bg-white/80 px-3.5 py-1.5 backdrop-blur-sm inline-block">
            Bab 04 • Kemitraan Bilateral
          </span>
        </div>

        {/* 21st.dev WorksWheel with 1-by-1 step turning and spacious white background */}
        <WorksWheel
          items={PARTNERSHIP_WORKS}
          label="Kemitraan '26"
          action="Eksplorasi"
          progress={progress}
          onSelectIndex={handleSelectIndex}
          className="w-full h-full bg-white text-neutral-900"
        />
      </div>
    </section>
  );
}

export default Chapter04Network;
