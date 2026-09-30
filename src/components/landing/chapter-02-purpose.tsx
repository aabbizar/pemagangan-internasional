"use client";

import * as React from "react";
import HorizontalScroll from "@/components/ui/horizontal-scroll";
import { Chapter02StoryScroll } from "@/components/landing/chapter-02-story-scroll";

/**
 * Chapter 02 layout wrapper.
 *
 * Transition design (Swiss / Framer-style):
 *  1. HorizontalScroll — 5 vibrant slides on deep-navy #111827 base.
 *     The last slide is #0B132B (matching the wrapper) — zero gap.
 *     A Framer Motion fade-to-dark overlay (opacity 0→0.72) activates
 *     on the last 30% of the horizontal travel to contextually focus
 *     the user before the story cards begin.
 *  2. Story Scroll — bg-[#0B132B] wrapper so Card 1 (#fd5200 orange)
 *     sits as a vivid contrast pop against the dark floor.
 *     A segmented progress bar and arrow cue are rendered as fixed
 *     overlays by FlowArt while the story section is visible.
 */
export function Chapter02Purpose(): React.ReactElement {
  return (
    <div className="relative w-full bg-[#0B132B]">
      {/* 1. Horizontal scroll — 5 slides with fade-to-dark and arrow indicator */}
      <HorizontalScroll />

      {/* 2. Story scroll — vivid cards against deep-navy canvas */}
      <div id="info-pemagangan" className="relative w-full bg-[#0B132B]">
        <Chapter02StoryScroll />
      </div>
    </div>
  );
}

export default Chapter02Purpose;
