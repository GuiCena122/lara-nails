import { cn } from "@/lib/utils";
import * as React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label";
  serif?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", serif = false, ...props }, ref) => {
    const Component = variant as React.ElementType;

    const styles = {
      h1: "text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-balance",
      h2: "text-4xl md:text-6xl font-bold tracking-tight leading-tight",
      h3: "text-2xl md:text-4xl font-bold tracking-tight italic",
      h4: "text-xl md:text-2xl font-bold tracking-tight",
      p: "text-base md:text-lg font-light leading-relaxed opacity-60 tracking-wide",
      span: "text-xs md:text-sm font-bold tracking-[0.2em] uppercase",
      label: "text-[9px] font-black uppercase tracking-[0.4em] opacity-40",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          serif ? "font-serif" : "font-sans",
          styles[variant as keyof typeof styles],
          className
        )}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { Typography };
