"use client";

import { cn } from "@/lib/utils";
import { Typography } from "./Typography";
import { Sparkles } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  price: string;
  duration: string;
  description: string;
  className?: string;
}

export function ServiceCard({ title, price, duration, description, className }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative glass-luxury p-8 md:p-10 rounded-[3rem] transition-all duration-700 hover:border-brand-gold/40 hover:-translate-y-3 overflow-hidden",
        className
      )}
    >
      {/* Shine Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div className="flex items-start justify-between mb-10 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black group-hover:scale-110 transition-all duration-500 shadow-lg">
          <Sparkles className="w-8 h-8" />
        </div>
        <Typography variant="h3" serif className="text-brand-gold group-hover:scale-110 transition-transform duration-500">{price}</Typography>
      </div>

      <div className="relative z-10">
        <Typography variant="h4" serif className="mb-3 text-2xl group-hover:text-brand-gold transition-colors duration-500 tracking-tight">
          {title}
        </Typography>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-[1px] w-8 bg-brand-gold/30" />
          <Typography variant="span" className="text-brand-gold/60 text-[10px] uppercase tracking-[0.3em] font-bold">
            {duration} MIN DE SOIN
          </Typography>
        </div>
        <Typography variant="p" className="text-sm leading-relaxed text-brand-ivory/50 group-hover:text-brand-ivory/80 transition-colors duration-500">
          {description}
        </Typography>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-tl-full translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
}
