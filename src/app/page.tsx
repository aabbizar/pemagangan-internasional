"use client";

import * as React from "react";
import { Chapter01Manifesto } from "@/components/landing/chapter-01-manifesto";
import { Chapter02Purpose } from "@/components/landing/chapter-02-purpose";
import { Chapter03HumanJourney } from "@/components/landing/chapter-03-human-journey";
import { Chapter04Network } from "@/components/landing/chapter-04-network";
import { Chapter05Commitment } from "@/components/landing/chapter-05-commitment";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="wrapper outline-none bg-white">
      <Chapter01Manifesto />
      <Chapter02Purpose />
      <Chapter03HumanJourney />
      <Chapter04Network />
      <Chapter05Commitment />
    </main>
  );
}
