"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90svh] flex items-center pt-24 overflow-hidden bg-bg-boutique">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit mb-8 font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Excellence en Manucure</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl text-text-charcoal leading-[0.9] mb-8">
            Révélez <br />
            <span className="italic font-light text-primary">l'éclat</span> de <br />
            vos mains.
          </h1>

          <p className="text-text-charcoal/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-md">
            Une approche boutique du soin des mains. Découvrez la perfection de la manucure russe et du nail art d'exception.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary flex items-center justify-center gap-2">
              Réserver une séance <ArrowRight size={18} />
            </a>
            <a href="#services" className="btn-outline flex items-center justify-center">
              Nos prestations
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 mt-16 pt-8 border-t border-text-charcoal/5">
            <div>
              <p className="text-2xl font-serif text-text-charcoal">5.0</p>
              <p className="text-xs uppercase tracking-wider text-text-charcoal/40 font-bold">Note Google</p>
            </div>
            <div className="w-[1px] h-10 bg-text-charcoal/10" />
            <div>
              <p className="text-2xl font-serif text-text-charcoal">500+</p>
              <p className="text-xs uppercase tracking-wider text-text-charcoal/40 font-bold">Clientes</p>
            </div>
          </div>
        </motion.div>

        {/* Right: High-Def Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white">
            <img 
              src="/lara-portrait.png" 
              alt="Lara — Studio de Beauté" 
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            
            {/* Floating Info Tag */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50"
            >
              <p className="text-text-charcoal font-serif italic text-xl mb-1">Manucure Russe</p>
              <p className="text-text-charcoal/50 text-xs font-semibold uppercase tracking-wider">Spécialité Maison</p>
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
}
