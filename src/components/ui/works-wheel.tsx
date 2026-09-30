/* eslint-disable @next/next/no-img-element */
"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// Tuned for discrete 1-by-1 step turning: each scroll gesture turns exactly 1 card.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  /** Progress from external sticky scroll container (0 to 1). */
  progress?: number;
  /** Callback when an item in the index is selected. */
  onSelectIndex?: (index: number) => void;
}

/* Scaled geometry: Enlarged cards with balanced ring radius for generous top/bottom whitespace */
const CARD_H = 0.30; // Enlarged card height
const CARD_MAX_W = 0.35; // Enlarged max width
const CARD_RATIO = 1.40; // Card width / height
const STEP = 38; // Degrees between cards on the drum
const DRUM = 2.15; // Drum radius
const LENS = 2.7; // Perspective distance
const RING_R = 0.94; // Compact iris ring radius so enlarged cards have ample white margin above & below
const BOW = 1.82;
const TITLE = 0.13;
const INDEX = 0.042;
const CULL = 1.6;

/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.14;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "Detail",
  progress,
  onSelectIndex,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const lockRef = React.useRef(false);

  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Drive target from external sticky progress if supplied
  React.useEffect(() => {
    if (progress !== undefined) {
      target.current = clamp(progress * (count + 0.1), 0, last + 1);
    }
  }, [progress, count, last]);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward target, write transforms
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const drag = React.useRef<number | null>(null);

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-white text-neutral-900 relative h-full w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-neutral-900 absolute inset-0 touch-pan-y outline-none focus-visible:outline-2 focus-visible:-outline-offset-4"
        style={{ perspective: `${metrics.depth}px` }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && progress !== undefined) {
            const currentStep = Math.round(progress * count);
            if (currentStep < count) {
              onSelectIndex?.(currentStep);
              event.preventDefault();
            }
          } else if (event.key === "ArrowUp" && progress !== undefined) {
            const currentStep = Math.round(progress * count);
            if (currentStep > 0) {
              onSelectIndex?.(currentStep - 2);
              event.preventDefault();
            }
          }
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] block focus:outline-none"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-neutral-100 shadow-neutral-900/15 relative block size-full overflow-hidden rounded-xl border border-neutral-200/80 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {action && item.href ? (
                      <span className="bg-white/90 text-neutral-900 shadow-sm pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 font-mono uppercase tracking-wider">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title in center */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-display uppercase font-semibold text-neutral-900 transition-opacity duration-200"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>

      {/* Front-card title on left side when drum turns */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[6%] sm:left-[8%] -translate-y-1/2 tracking-tight opacity-0 font-display uppercase font-bold text-neutral-900 transition-opacity duration-200 max-w-[30vw] leading-[1.05]"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>

      {/* Right-hand side index — Vertically centered, pure text, NO numbers */}
      <ol
        className="text-neutral-400 absolute top-1/2 -translate-y-1/2 right-[3%] sm:right-[5%] text-right leading-[2.2] z-20 font-sans tracking-wide"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => {
                if (onSelectIndex) {
                  onSelectIndex(i);
                } else {
                  to(i + 1);
                }
              }}
              className={cn(
                "cursor-pointer transition-colors outline-none focus-visible:text-neutral-900 hover:text-neutral-700 block ml-auto",
                i === active && "text-neutral-900 font-bold",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
