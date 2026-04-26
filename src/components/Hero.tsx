"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fff5f6]">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffe8eb] rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffc1c9]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white text-sm text-[#e76f51] mb-8 shadow-sm"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span className="font-medium uppercase tracking-[0.2em] text-[10px]">Lara Nails • Douceur & Beauté</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif font-bold text-[#2d2d2d] leading-[1.1] mb-8"
        >
          Sublimez votre <br />
          <span className="italic gradient-text">Féminité</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light"
        >
          Un moment de détente absolue pour des mains rayonnantes. Chez Lara Nails, nous prenons soin de vous avec douceur e passion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-10 py-5 bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white rounded-full font-bold shadow-xl shadow-rose-200 hover:scale-[1.05] transition-all">
            Réserver mon soin 🌸
          </button>
          <button className="px-10 py-5 bg-white border border-[#ffe8eb] text-[#e76f51] rounded-full font-bold hover:bg-[#fff5f6] transition-all">
            Voir le menu
          </button>
        </motion.div>
      </div>
    </section>
  );
};
