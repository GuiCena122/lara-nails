"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-12 flex items-center bg-[#fff5f6] overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#ffe8eb] rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col items-start z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-[#e76f51] mb-6 font-medium"
          >
            Studio de Beauté Premium
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2d2d2d] leading-[1.1] mb-8"
          >
            L'Art de la<br />
            <span className="italic text-[#f4a261]">Manucure</span><br />
            Réinventé.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-500 max-w-md text-lg font-light leading-relaxed mb-10"
          >
            Découvrez une approche délicate et artistique du soin des ongles. 
            Élégance, précision et produits de haute qualité dans une atmosphère apaisante.
          </motion.p>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            href="#contact"
            className="group flex items-center gap-4 border-b border-[#2d2d2d] pb-2 text-[#2d2d2d] uppercase tracking-widest text-xs font-bold hover:text-[#e76f51] hover:border-[#e76f51] transition-all"
          >
            Prendre Rendez-vous
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </div>

        {/* Image Grid/Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[60vh] lg:h-[80vh] w-full"
        >
          {/* Main Large Image */}
          <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-[#f4a261]/20 rounded-t-full overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=1000&auto=format&fit=crop" 
              alt="Manicure detail" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </div>
          
          {/* Accent Small Image */}
          <div className="absolute bottom-10 left-0 w-2/5 h-2/5 bg-[#e76f51]/10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=500&auto=format&fit=crop" 
              alt="Nail art" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
