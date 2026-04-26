"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#2C1A0E] flex items-end overflow-hidden">
      
      {/* Gold shimmer top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A05C] to-transparent z-20" />

      {/* Full bleed portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/lara-portrait.png"
          alt="Lara — Studio de Beauté"
          className="w-full h-full object-cover object-top"
        />
        {/* Rich gradient overlay — dark mahogany from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E] via-[#2C1A0E]/60 to-[#2C1A0E]/20" />
        {/* Subtle left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A0E]/70 via-transparent to-transparent" />
      </motion.div>

      {/* Gold corner ornament top-right */}
      <div className="absolute top-28 right-16 hidden lg:block z-10 opacity-40">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 0 L80 0 L80 80" stroke="#C9A05C" strokeWidth="1" fill="none" />
          <path d="M20 0 L80 0 L80 60" stroke="#C9A05C" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pb-24 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Gold eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[1px] bg-[#C9A05C]" />
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A05C] font-medium">
              Studio de Beauté d'Exception
            </p>
          </div>

          {/* Main title */}
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#F5EFE6] leading-[1.0] mb-8">
            L'Art<br />
            <em className="italic font-light text-[#C9A05C]">Sublime</em><br />
            <span className="font-light">du Soin.</span>
          </h1>

          <p className="text-[#F5EFE6]/70 text-base md:text-lg font-light leading-loose mb-12 max-w-md font-sans">
            Une expérience sensorielle unique. Manucure russe, nail art d'auteur et rituels de beauté dans un cadre d'exception.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 bg-[#C9A05C] text-[#2C1A0E] px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#F5EFE6] transition-colors duration-500"
            >
              Réserver
              <span className="w-6 h-[1px] bg-[#2C1A0E] group-hover:w-10 transition-all duration-700" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-4 border border-[#F5EFE6]/30 text-[#F5EFE6]/80 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-[#C9A05C] hover:text-[#C9A05C] transition-all duration-500"
            >
              Découvrir
            </a>
          </div>
        </motion.div>

        {/* Bottom gold badge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 right-16 hidden lg:flex flex-col items-end gap-2"
        >
          <div className="w-16 h-16 border border-[#C9A05C]/40 flex items-center justify-center">
            <span className="text-[#C9A05C] text-2xl font-serif italic">L</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#C9A05C]/60">Paris</p>
        </motion.div>
      </div>
    </section>
  );
}
