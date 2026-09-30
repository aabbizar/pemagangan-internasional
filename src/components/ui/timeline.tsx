"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  Tahap01: 1,
  Tahap02: 2,
  Tahap03: 3,
  Tahap04: 4,
  Tahap05: 5,
} as const;

type Month = keyof typeof monthOrder;

type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const topJourneyData: JourneyItem[] = [
  {
    id: "step-1",
    year: "Tahap 01",
    month: "Asesmen",
    content: "Validasi NIK Dukcapil & Tes Potensi Skolastik IQ",
  },
  {
    id: "step-3",
    year: "Tahap 03",
    month: "Sertifikasi",
    content: "Ujian Akhir Semester (UAS) & Akreditasi Resmi Bahasa",
  },
  {
    id: "step-5",
    year: "Tahap 05",
    month: "Keberangkatan",
    content: "Penerbitan COE, Visa & Pelepasan Resmi Ke Negara Tujuan",
  },
];

const bottomJourneyData: JourneyItem[] = [
  {
    id: "step-2",
    year: "Tahap 02",
    month: "Pelatihan",
    content: "80% Kurikulum Daring LMS + 20% Pembekalan Fisik Luring",
  },
  {
    id: "step-4",
    year: "Tahap 04",
    month: "Matching",
    content: "Seleksi Langsung dengan Pimpinan Perusahaan Asing",
  },
];

const allJourneyItems: JourneyItem[] = [
  ...topJourneyData,
  ...bottomJourneyData,
].sort((a, b) => {
  const aNum = parseInt(a.year.split(" ")[1]);
  const bNum = parseInt(b.year.split(" ")[1]);
  return aNum - bNum;
});

export default function Timeline({
  title = "LIMA TAHAP RESMI",
  periodLabel = "Roadmap • Alur Perjalanan Kandidat",
  textColor = "#E3E1DC",
  mutedTextColor = "#9ca3af",
  activeColor = "#06b6d4", // cyan-500
  backgroundColor = "#121212",
  imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
  imageAlt = "Team planning the roadmap",
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);
  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -57 : -65;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const createItemTimeline = (
      item: JourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.4,
          },
          "<",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    const positions: ReadonlyArray<readonly [number, number]> =
      window.innerWidth < 600
        ? [
            [22, 32],
            [28, 38],
            [36, 46],
            [45, 55],
            [52, 62],
          ]
        : [
            [6, 26],
            [16, 36],
            [26, 46],
            [35, 55],
            [45, 65],
          ];

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[200vw] max-[600px]:h-[400vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-[0%] pt-[10%] overflow-hidden max-[600px]:top-[5%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[30vw] w-[240vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[7vw]"
        >
          <div className="h-full w-[30vw] overflow-hidden rounded-[1vw] max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw]">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover grayscale brightness-75 mix-blend-luminosity"
            />
          </div>

          <div className="relative h-full w-full">
            <div className="w-full absolute left-0 top-[49%] tranlate-y-[-50%] flex items-center h-fit">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                style={activeStyle}
              ></div>
              <div
                className="h-px w-[0%] rounded-full journey-line shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                style={activeStyle}
              ></div>
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw]">
                <h2 className="w-[65%] text-[3vw] leading-[0.95] max-[600px]:text-[8.5vw] font-display font-bold">
                  {title}
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[30vw] px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative aspect-square rounded-full jd-${item.id} shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full jl-${item.id} shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="mt-[-1vw] space-y-[1vw] max-[600px]:mt-[-2vw]">
                      <h4
                        className={`title-${item.id} text-[2.5vw] leading-none max-[600px]:text-[6.4vw] font-bold font-sans tracking-tight`}
                      >
                        {item.year} <br className="hidden sm:block"/> {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[90%] text-[1.25vw] leading-[1.3] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[30%] h-full">
                <p
                  className=" text-[1.65vw] leading-none max-[600px]:text-[4.2vw] font-mono tracking-[0.2em] uppercase"
                  style={{color: activeColor}}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="w-full flex h-full gap-x-[20vw] ml-[7vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[7vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[25vw] px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full max-[600px]:h-full jl-${item.id} shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative w-auto aspect-square rounded-full jd-${item.id} shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">
                      <h4
                        className={`title-${item.id} text-[2.5vw] leading-none max-[600px]:text-[6.4vw] font-bold font-sans tracking-tight`}
                      >
                        {item.year} <br className="hidden sm:block"/> {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[90%] text-[1.25vw] leading-[1.3] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
