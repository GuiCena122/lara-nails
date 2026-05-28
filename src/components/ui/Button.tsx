import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-bold transition-all duration-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden group border-[0.5px] border-transparent",
  {
    variants: {
      variant: {
        luxury: "bg-brand-gold text-brand-black shadow-luxury border-brand-gold/20 hover:bg-[#D4B98B]",
        outline: "border-brand-gold/30 text-brand-black hover:border-brand-gold hover:bg-brand-gold/5",
        ghost: "text-brand-black/60 hover:bg-black/5 border-transparent",
        ivory: "bg-white text-brand-black shadow-xl border-brand-black/5 hover:bg-brand-ivory",
      },
      size: {
        default: "h-14 px-10 tracking-[0.25em] text-[10px]",
        sm: "h-10 px-6 tracking-[0.2em] text-[9px]",
        lg: "h-16 px-14 tracking-[0.3em] text-xs",
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
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
