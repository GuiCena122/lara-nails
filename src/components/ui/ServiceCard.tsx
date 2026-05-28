"use client";

import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { Sparkles } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { LuxuryImage } from "./LuxuryImage";

interface ServiceCardProps {
  title: string;
  price: string;
  duration: string;
  description: string;
  image?: string;
  macro?: string;
  className?: string;
}

export function ServiceCard({ title, price, duration, description, image, macro, className }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={cn(
        "group relative bg-white/40 backdrop-blur-2xl p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3.5rem] transition-all duration-700 hover:-translate-y-4 border-[0.5px] border-brand-gold/10 hover:border-brand-gold/30 overflow-hidden shadow-luxury",
        className
      )}
    >
      {/* Cinematic Macro Reveal - Adjusted for Light Mode */}
      {image && macro && (
        <div className="absolute inset-0 z-0">
           <LuxuryImage
             src={image}
             alt={title}
             fill
             className="grayscale opacity-10 transition-all duration-[1500ms] group-hover:scale-110 group-hover:opacity-0"
           />
           <LuxuryImage
             src={macro}
             alt={`${title} macro`}
             fill
             className="absolute inset-0 scale-125 opacity-0 transition-all duration-[2000ms] group-hover:scale-100 group-hover:opacity-20"
           />
        </div>
      )}

      {/* Cinematic Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out pointer-events-none" />

      <div className="flex items-start justify-between mb-12 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-brand-gold/5 border-[0.5px] border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110 transition-all duration-700 shadow-sm">
          <Sparkles size={28} strokeWidth={1} />
        </div>
        <Typography variant="h3" serif className="text-brand-gold text-3xl group-hover:scale-110 transition-transform duration-700">{price}</Typography>
      </div>

      <div className="relative z-10">
        <Typography variant="h3" serif className="mb-4 text-3xl text-brand-black group-hover:text-brand-gold transition-colors duration-700 tracking-tight leading-tight">
          {title}
        </Typography>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[0.5px] w-12 bg-brand-gold/40 group-hover:w-20 transition-all duration-700" />
          <Typography variant="label" className="text-brand-gold/60 text-[9px] tracking-[0.4em] font-black uppercase">
            {duration} MIN DE RITUEL
          </Typography>
        </div>
        <Typography variant="p" className="text-base leading-relaxed text-brand-black/40 group-hover:text-brand-black/70 transition-colors duration-700 font-light italic text-balance">
          {description}
        </Typography>
      </div>

      {/* Luxury Decorative Accent */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-gold/[0.03] rounded-full blur-3xl group-hover:bg-brand-gold/5 transition-all duration-1000 pointer-events-none" />
    </motion.div>
  );
}
