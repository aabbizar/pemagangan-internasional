'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

// ─────────────────────────────────────────────────────────────────
// FlowSection — individual card wrapper
// ─────────────────────────────────────────────────────────────────
export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative h-screen w-full select-none', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex h-screen w-full flex-col justify-between px-[4vw] pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8',
        'will-change-transform shadow-[0_-25px_60px_rgba(0,0,0,0.5)] overflow-hidden',
      )}
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────
// SegmentedProgress — story-style progress bar at top of story view
// ─────────────────────────────────────────────────────────────────
function SegmentedProgress({
  total,
  active,
  visible,
}: {
  total: number;
  active: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="story-progress-bar"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label={`Segmen ${active + 1} dari ${total}`}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] flex gap-1.5 pointer-events-none"
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              role="presentation"
              className="h-[3px] rounded-full overflow-hidden bg-white/25 backdrop-blur-sm shadow-sm"
              style={{ width: `clamp(28px, ${72 / total}px, 72px)` }}
            >
              <motion.div
                className="h-full bg-white rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i <= active ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// DirectionCue — arrow that rotates from → to ↓ once story is active
// ─────────────────────────────────────────────────────────────────
function DirectionCue({ storyActive }: { storyActive: boolean }) {
  return (
    <AnimatePresence>
      {storyActive && (
        <motion.div
          key="cue"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="fixed bottom-7 right-7 z-[60] w-10 h-10 rounded-full
                     border border-white/25 bg-black/40 backdrop-blur-sm
                     flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4 text-white/80 fill-none stroke-current"
            strokeWidth={1.5}
          >
            <path
              d="M8 3v10M4 9l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// FlowArt — GSAP-driven stacked card engine with progress bar + cue
// ─────────────────────────────────────────────────────────────────
export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) =>
  React.Children.count(children);

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [storyVisible, setStoryVisible] = useState(false);
  const total = childCount(children);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleActiveCard = useCallback(
    (i: number) => setActiveCard(i),
    [],
  );

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      // Track exact entry and exit of the story cards section
      triggers.push(
        ScrollTrigger.create({
          trigger: sections[0],
          start: 'top 60%',
          endTrigger: sections[sections.length - 1],
          end: 'bottom 20%',
          onToggle: (self) => setStoryVisible(self.isActive),
          onRefresh: (self) => setStoryVisible(self.isActive),
        }),
      );

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 10 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // Cards 2-N peel in at 25°; Card 1 sits flush
        if (i > 0) {
          gsap.set(inner, { rotation: 25, transformOrigin: 'bottom left' });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
              onEnter: () => handleActiveCard(i),
              onEnterBack: () => handleActiveCard(i),
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        } else {
          // First card becomes active once it enters view
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'top 80%',
              onEnter: () => handleActiveCard(0),
              onEnterBack: () => handleActiveCard(0),
            }),
          );
        }

        // Pinned stack mechanism
        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      const t1 = setTimeout(() => ScrollTrigger.refresh(), 300);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000);
      const t3 = setTimeout(() => ScrollTrigger.refresh(), 2600);

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener('resize', handleResize);
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [total, reducedMotion] },
  );

  return (
    <>
      {/* ── Story chrome: only visible while story section is in viewport ── */}
      <SegmentedProgress total={total} active={activeCard} visible={storyVisible} />
      <DirectionCue storyActive={storyVisible} />

      <div
        ref={containerRef}
        aria-label={ariaLabel}
        className={cx('w-full relative overflow-x-clip', className)}
      >
        {children}
      </div>
    </>
  );
};

export default FlowArt;
