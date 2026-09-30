import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge — AETHEREAL: label mono uppercase, hairline border, sudut kecil tajam.
 *
 * Varians status memakai Palet Status Fungsional dari Notis Kanonis
 * (docs/design-system.md). Turunan Bab 2 (`#059669` Emerald, `#D97706`
 * Amber, `#DC2626` Red) berstatus ARSIP dan tidak dipakai.
 * Warna TIDAK boleh jadi satu-satunya pembawa makna (WCAG 1.4.1) — label teks
 * selalu ikut terbaca.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "accent" | "outline" | "success" | "warning" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-black/5 text-ink border-black/10",
    secondary: "bg-stone text-ink border-black/15",
    accent: "bg-moss text-white border-moss",
    outline: "bg-transparent text-ink border-black/25",
    success: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger: "bg-danger/10 text-danger border-danger/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
