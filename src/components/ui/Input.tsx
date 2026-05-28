import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-[1.5rem] border-[0.5px] border-black/10 bg-white/50 px-6 py-4 text-sm text-brand-black transition-all duration-500 placeholder:text-black/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold/50 focus-visible:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50 font-sans tracking-wide",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
