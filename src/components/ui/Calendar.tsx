import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";

export function Calendar() {
  const [selectedDay, setSelectedDay] = React.useState<number | null>(15);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="glass-luxury p-10 md:p-12 rounded-[4rem] border border-white/5 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.4)] relative overflow-hidden group">
      {/* Decorative inner glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/20 transition-colors duration-1000" />

      <div className="flex items-center justify-between mb-12 relative z-10 text-balance">
        <div>
          <Typography variant="h4" serif className="text-brand-ivory text-3xl mb-1">Avril 2026</Typography>
          <Typography variant="label" className="text-[9px] text-brand-gold tracking-[0.3em]">CHOISISSEZ UNE DATE</Typography>
        </div>
        <div className="flex gap-3">
          <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/30 text-brand-gold transition-all duration-300">
            <ChevronLeft size={20} />
          </button>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/30 text-brand-gold transition-all duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-8 text-center relative z-10">
        {["L", "M", "M", "J", "V", "S", "D"].map(d => (
          <Typography key={d} variant="label" className="text-[10px] text-brand-ivory/20 font-black">{d}</Typography>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 relative z-10">
        {days.map(d => (
          <motion.button
            key={d}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDay(d)}
            className={cn(
              "aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 relative",
              d === selectedDay
                ? "bg-brand-gold text-brand-black shadow-[0_0_20px_#C9A66B] scale-110 z-20"
                : "text-brand-ivory/50 hover:bg-white/5 hover:text-brand-ivory"
            )}
          >
            {d}
            {d === selectedDay && (
               <motion.div
                 layoutId="selectedDay"
                 className="absolute inset-0 rounded-2xl border-2 border-brand-ivory/20"
                 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
               />
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-12 pt-10 border-t border-white/5 relative z-10">
         <div className="flex items-center justify-between text-balance">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_8px_#C9A66B]" />
               <Typography variant="span" className="text-brand-ivory/80 text-[11px] uppercase tracking-[0.2em] font-bold">Jour sélectionné</Typography>
            </div>
            <Typography variant="span" serif className="text-brand-gold italic">15 Avril</Typography>
         </div>
      </div>
    </div>
  );
}
