"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center pt-24 pb-12 overflow-hidden">
      
      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* Left: Image (7 columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 relative h-[60vh] lg:h-[80vh] w-full order-2 lg:order-1"
        >
          <div className="w-full h-full relative overflow-hidden bg-[#fafafa]">
            <img 
              src="/lara-portrait.png" 
              alt="Portrait de Lara" 
              className="w-full h-full object-cover object-top grayscale-[20%]"
            />
          </div>
          {/* Very thin architectural line */}
          <div className="absolute top-10 -right-8 w-16 h-[1px] bg-[#111111]/30 hidden lg:block" />
          <div className="absolute bottom-10 -left-8 w-16 h-[1px] bg-[#111111]/30 hidden lg:block" />
        </motion.div>

        {/* Right: Text Content (5 columns) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center order-1 lg:order-2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#111111]/50 mb-8 font-medium">
              Paris
            </p>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-7xl xl:text-8xl text-[#111111] leading-[1.05] tracking-tight mb-8">
              L'Art <br />
              de la <br />
              <span className="italic font-light text-[#111111]/80">Précision.</span>
            </h1>
            
            <div className="w-12 h-[1px] bg-[#111111]/20 mb-10" />

            <p className="text-[#111111]/60 text-sm md:text-base font-light leading-loose mb-12 max-w-md">
              Une approche architecturale du soin des mains. 
              Minimalisme, hygiène clinique et esthétique intemporelle pour celles qui exigent l'excellence.
            </p>

            <a 
              href="#contact"
              className="group inline-flex items-center gap-6"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111] font-medium group-hover:text-[#e76f51] transition-colors duration-500">
                Prendre Rendez-vous
              </span>
              <span className="w-12 h-[1px] bg-[#111111] group-hover:w-20 group-hover:bg-[#e76f51] transition-all duration-700 ease-[0.16,1,0.3,1]" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
