import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { Sparkles } from "lucide-react";
import * as React from "react";

interface ServiceCardProps {
  title: string;
  price: string;
  duration: string;
  description: string;
  className?: string;
}

export function ServiceCard({ title, price, duration, description, className }: ServiceCardProps) {
  return (
    <div className={cn(
      "group relative glass-luxury p-8 rounded-[2.5rem] transition-all duration-500 hover:border-brand-gold/40 hover:-translate-y-2",
      className
    )}>
      <div className="flex items-start justify-between mb-8">
        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-300">
          <Sparkles className="w-7 h-7" />
        </div>
        <Typography variant="h3" serif className="text-brand-gold">{price}</Typography>
      </div>

      <Typography variant="h4" className="mb-2 group-hover:text-brand-gold transition-colors">{title}</Typography>
      <Typography variant="span" className="text-brand-gold/60 mb-4 block uppercase tracking-widest">{duration} MIN</Typography>
      <Typography variant="p" className="text-sm">{description}</Typography>

      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
