"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import Image from "next/image";
import Link from "next/link";

const letterAnimation: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.04 * i,
      duration: 1.2,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  })
};

const title = "L'Art de Sublimer Vos Mains.";

export default function Hero() {
  return (
    <section className="relative min-h-[90svh] flex items-center pt-16 md:pt-24 overflow-hidden bg-brand-ivory text-brand-black">
      {/* Dynamic Background Elements - Solar Luxury */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        {/* Left: Content */}
        <div className="lg:col-span-7 flex flex-col items-start pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-[0.5px] w-16 bg-brand-gold shadow-glow-gold" />
            <Typography variant="label" className="text-brand-gold tracking-[0.6em] text-[10px] font-black uppercase">
              ESTHÉTIQUE ÉDITORIALE • PARIS
            </Typography>
          </motion.div>

          <h1 className="relative flex flex-wrap font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] tracking-tighter text-brand-black mb-8 md:mb-14 text-balance">
            {title.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="mr-[0.3em] overflow-hidden flex pb-[0.1em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    custom={wordIndex * 5 + charIndex}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          >
            <Typography variant="p" className="text-xl md:text-2xl text-brand-black/40 max-w-xl italic font-light mb-16 leading-relaxed text-balance">
              Une immersion sensorielle au service de la précision. Bienvenue dans l&apos;ère da Haute Couture pour vos ongles.
            </Typography>

            <div className="flex flex-wrap gap-10">
               <Button
                variant="luxury"
                size="lg"
                className="group overflow-hidden px-16 h-16 border-[0.5px] border-brand-gold/20 text-white"
               >
                  <span className="relative z-10 tracking-[0.3em]">RITUEL DE SOIN</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  />
               </Button>

               <Link href="#services" className="group flex items-center gap-4 self-center">
                  <div className="w-10 h-[0.5px] bg-brand-gold/30 group-hover:w-16 transition-all duration-500" />
                  <Typography variant="span" className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-black/40 group-hover:text-brand-gold transition-colors">
                     VOIR LES SOINS
                  </Typography>
               </Link>
            </div>
          </motion.div>

          {/* Mobile Portrait — visible only on small screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            className="lg:hidden mt-12 w-full"
          >
            <div className="relative aspect-[3/4] max-h-[60svh] rounded-[3rem] overflow-hidden shadow-2xl mx-auto max-w-sm">
              <Image
                src="/lara-portrait.png"
                alt="Lara Nails"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Right: The Portrait (Clean Integration) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative aspect-[3/4] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden group shadow-[0_40px_80px_-20px_rgba(201,166,107,0.15)]">
            <Image
              src="/lara-portrait.png"
              alt="Lara Nails Editorial"
              fill
              className="object-cover object-top transition-transform duration-[3000ms] scale-110 group-hover:scale-100"
              style={{ transitionTimingFunction: 'var(--ease-luxury)' }}
              priority
            />

            {/* Soft Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/40 via-transparent to-transparent opacity-60" />

            {/* Grain Texture Layer */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />
          </div>

          {/* Floating Luxury Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -right-8 bottom-20 hidden xl:block origin-left rotate-90"
          >
             <Typography variant="label" className="text-brand-gold opacity-30 text-[8px] tracking-[0.8em] whitespace-nowrap uppercase font-black">L&apos;EXCELLENCE À CHAQUE GESTE</Typography>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
