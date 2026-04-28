"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import { GlowEffect } from "./ui/GlowEffect";
import Image from "next/image";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-brand-black">
      <GlowEffect />
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-powder/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center z-10 text-balance text-balance text-balance">
        {/* Left: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-brand-gold shadow-[0_0_8px_#C9A66B]" />
            <Typography variant="label" className="text-brand-gold tracking-[0.4em] uppercase text-balance text-balance text-balance">
              L&apos;Excellence à Paris
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h1" serif className="text-brand-ivory mb-10 leading-[0.95] lg:text-[10rem] tracking-tighter text-balance text-balance text-balance">
              L&apos;art de <br /> sublimer <br /> <span className="gold-text italic underline decoration-brand-gold/20 underline-offset-8">vos mains.</span>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="p" className="text-brand-ivory/50 mb-14 max-w-lg text-xl font-light tracking-wide italic leading-relaxed text-balance text-balance text-balance">
              Une parenthèse exclusive où o savoir-faire rencontre l&apos;élégance absolue do luxo parisien.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
            <Button variant="luxury" size="lg" className="px-14 py-7 tracking-[0.2em] shadow-[0_0_40px_rgba(201,166,107,0.3)] hover:scale-105">
              PRENDRE RDV
            </Button>
            <Button variant="outline" size="lg" className="px-14 py-7 border-white/10 text-brand-ivory/70 hover:border-brand-gold/50 hover:bg-white/[0.02]">
              DÉCOUVRIR
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[6rem] overflow-hidden border border-brand-gold/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] group">
            <Image
              src="/lara-portrait.png"
              alt="Lara Nails"
              fill
              className="object-cover object-top transition-transform duration-[3000ms] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              priority
            />
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />

            {/* Floating Info Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -left-12 glass-luxury p-10 rounded-[3rem] border border-brand-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 backdrop-blur-3xl"
            >
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-brand-gold flex items-center justify-center text-brand-black text-2xl shadow-xl">✨</div>
                  <div>
                    <Typography variant="span" className="text-brand-ivory font-black block text-sm tracking-widest uppercase">Signature Russe</Typography>
                    <Typography variant="label" className="text-[7px] tracking-[0.4em] text-brand-gold mt-1">MÉTHODE D&apos;EXCELLENCE</Typography>
                  </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
