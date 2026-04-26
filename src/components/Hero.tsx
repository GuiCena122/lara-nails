"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-black">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-powder/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        {/* Left: Content (Col 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-brand-gold" />
            <Typography variant="label" className="text-brand-gold">
              Excellence & Luxe à Paris
            </Typography>
          </div>

          <Typography variant="h1" serif className="text-brand-ivory mb-10">
            L&apos;art de sublimer <br /> vos <span className="gold-text">mains.</span>
          </Typography>

          <Typography variant="p" className="text-brand-ivory/60 mb-12 max-w-lg text-lg">
            Plongez dans un univers où chaque detalhe est uma assinatura. Manucure russe certifiée et nail art d&apos;auteur pour uma elegância sans compromis.
          </Typography>

          <div className="flex flex-wrap gap-6">
            <Button variant="luxury" size="lg" className="tracking-widest">PRENDRE RDV</Button>
            <Button variant="outline" size="lg" className="tracking-widest border-white/10 text-brand-ivory hover:border-brand-gold">DÉCOUVRIR</Button>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-20 pt-12 border-t border-white/5">
            <div>
              <Typography variant="h3" serif className="text-brand-gold mb-1">5.0</Typography>
              <Typography variant="label" className="text-[8px]">Google Reviews</Typography>
            </div>
            <div>
              <Typography variant="h3" serif className="text-brand-gold mb-1">3+</Typography>
              <Typography variant="label" className="text-[8px]">Ans d&apos;expertise</Typography>
            </div>
            <div>
              <Typography variant="h3" serif className="text-brand-gold mb-1">2k</Typography>
              <Typography variant="label" className="text-[8px]">Poses uniques</Typography>
            </div>
          </div>
        </motion.div>

        {/* Right: Visual (Col 5) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-[4rem] overflow-hidden border border-brand-gold/20 shadow-luxury group">
            <Image
              src="/lara-portrait.png"
              alt="Lara Nails"
              fill
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-40" />

            {/* Floating Info */}
            <div className="absolute -bottom-6 -right-6 glass-luxury p-6 rounded-3xl border border-brand-gold/20 shadow-2xl animate-float">
               <Typography variant="h3" serif className="text-brand-gold">✨</Typography>
               <Typography variant="span" className="text-brand-ivory font-bold block mt-2 text-xs uppercase tracking-tighter">Technique Russe</Typography>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
