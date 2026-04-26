import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

export function Calendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const selectedDay = 15; // Placeholder

  return (
    <div className="glass-luxury p-10 rounded-[3rem] border border-white/5 w-full max-w-md">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Typography variant="h4" serif className="text-brand-ivory">Avril 2026</Typography>
          <Typography variant="label" className="text-[8px] text-brand-gold">Sélectionnez une date</Typography>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-white/5 hover:bg-brand-gold/20 text-brand-gold transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button className="p-2 rounded-xl bg-white/5 hover:bg-brand-gold/20 text-brand-gold transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-6 text-center">
        {["L", "M", "M", "J", "V", "S", "D"].map(d => (
          <Typography key={d} variant="label" className="text-[8px] text-brand-ivory/30">{d}</Typography>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map(d => (
          <button
            key={d}
            className={cn(
              "aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300",
              d === selectedDay
                ? "bg-brand-gold text-brand-black shadow-luxury scale-110"
                : "text-brand-ivory/60 hover:bg-white/5 hover:text-brand-gold"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            <Typography variant="span" className="text-brand-ivory/80 text-[10px] uppercase tracking-widest font-bold">Jour sélectionné</Typography>
         </div>
      </div>
    </div>
  );
}
