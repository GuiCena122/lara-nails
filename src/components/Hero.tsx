"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center bg-[#fff5f6] overflow-hidden pt-20">
      {/* Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#f4a261] rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#e76f51] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-white rounded-full blur-[100px] opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content in Glass Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-light p-10 md:p-14 rounded-[3rem] relative"
        >
          <div className="absolute -top-6 -left-6 bg-white p-4 rounded-3xl shadow-xl shadow-[#e76f51]/10 flex items-center justify-center">
            <Star className="w-8 h-8 text-[#e76f51] fill-[#f4a261]" />
          </div>

          <p className="text-[#e76f51] font-bold tracking-widest text-xs uppercase mb-4 ml-2">Studio Lara Nails</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#2d2d2d] leading-tight mb-6">
            Révélez la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e76f51] to-[#f4a261]">Magie</span> de <br />
            vos Mains.
          </h1>
          <p className="text-[#2d2d2d]/70 text-lg md:text-xl font-light leading-relaxed mb-10">
            Une expérience lumineuse et luxueuse. 
            Découvrez le parfait équilibre entre soin profond et design moderne pour des ongles éblouissants.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#e76f51]/30 hover:shadow-[#e76f51]/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Prendre Rendez-vous <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#gallery"
              className="bg-white text-[#2d2d2d] px-8 py-4 rounded-full font-bold shadow-lg shadow-black/5 hover:scale-105 transition-all flex items-center justify-center"
            >
              Voir la Galerie
            </a>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[3/4] rounded-[3rem] p-4 glass-light">
            <img 
              src="/lara-portrait.png" 
              alt="Portrait de Lara" 
              className="w-full h-full object-cover rounded-[2.5rem] shadow-inner"
            />
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 glass-light p-5 rounded-3xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                ✨
              </div>
              <div>
                <p className="text-[#2d2d2d] font-bold">100% Personnalisé</p>
                <p className="text-[#2d2d2d]/60 text-xs">Soin sur-mesure</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
