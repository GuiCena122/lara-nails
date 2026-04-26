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
      h1: "text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]",
      h2: "text-4xl md:text-5xl font-bold tracking-tight",
      h3: "text-2xl md:text-3xl font-bold",
      h4: "text-xl font-bold",
      p: "text-base md:text-lg font-light leading-relaxed opacity-80",
      span: "text-sm font-medium",
      label: "text-[10px] font-bold uppercase tracking-[0.2em] opacity-50",
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
