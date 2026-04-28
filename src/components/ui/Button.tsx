import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-bold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden group",
  {
    variants: {
      variant: {
        luxury: "bg-brand-gold text-brand-black shadow-luxury border border-brand-gold/20",
        outline: "border border-brand-gold/30 text-brand-gold hover:border-brand-gold hover:shadow-[0_0_20px_rgba(201,166,107,0.2)]",
        ghost: "text-brand-ivory hover:bg-white/5",
        ivory: "bg-brand-ivory text-brand-black hover:bg-white shadow-xl",
      },
      size: {
        default: "h-14 px-10 tracking-[0.2em] text-[11px]",
        sm: "h-10 px-6 tracking-[0.2em] text-[10px]",
        lg: "h-16 px-12 tracking-[0.2em] text-xs",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "luxury",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        {variant === 'luxury' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
