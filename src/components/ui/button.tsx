import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button — AETHEREAL (docs/design-system.md Notis Kanonis).
 * Sudut tajam (radius 0), label mono uppercase, satu aksen deep moss.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono font-bold uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-stone disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.99]";

    const sizeStyles = {
      sm: "h-9 px-3.5 text-[10px] gap-1.5",
      md: "h-11 px-5 text-xs gap-2",
      lg: "h-13 px-7 text-xs gap-2.5",
    };

    const variantStyles = {
      primary: "bg-ink text-stone border border-ink hover:bg-moss hover:border-moss",
      secondary: "bg-moss text-white border border-moss hover:bg-ink hover:border-ink",
      accent: "bg-moss text-white border border-moss hover:bg-ink hover:border-ink",
      outline: "border border-black/25 bg-transparent text-ink hover:bg-black/5",
      ghost: "border border-transparent text-ink hover:bg-black/5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
