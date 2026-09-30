"use client";

import * as React from "react";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

interface CustomOtpProps {
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function InputOtp({
  value,
  onChange,
  maxLength = 6,
  disabled,
  autoFocus,
}: CustomOtpProps) {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      disabled={disabled}
      autoFocus={autoFocus}
      containerClassName="flex items-center justify-center gap-2 sm:gap-3"
      render={({ slots }) => (
        <div className="flex items-center gap-2 sm:gap-3">
          {slots.map((slot, index) => (
            <Slot key={index} {...slot} />
          ))}
        </div>
      )}
    />
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-11 h-14 sm:w-12 sm:h-16 text-xl sm:text-2xl font-mono font-bold flex items-center justify-center border bg-white text-ink transition-all select-none shadow-sm",
        props.isActive
          ? "border-moss ring-4 ring-moss/15 scale-105 z-10"
          : "border-black/20 hover:border-black/40",
        props.char && "border-ink bg-moss/5"
      )}
    >
      {props.char !== null ? props.char : ""}
      {props.hasFakeCaret && (
        /* Kursor statis. Tanpa animate-pulse: selain dilarang AETHEREAL (§1),
           WCAG 2.2.2 mewajibkan konten berdenyut > 5 dtk bisa dijeda. */
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-0.5 bg-moss" />
        </div>
      )}
    </div>
  );
}
