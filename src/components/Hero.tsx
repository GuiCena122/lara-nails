"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0D0D0D] flex items-center overflow-hidden pt-20">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e76f51]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#f4a261]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">

        {/* ── LEFT: Text ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col order-2 lg:order-1"
        >
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-[#e76f51] animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-wider uppercase">Studio de Beauté — Paris</span>
          </div>

          <h1 className="text-white text-6xl md:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tight mb-6">
            Beauty<br />
            <span className="text-[#e76f51]">Elevated.</span>
          </h1>

          <p className="text-white/50 text-lg font-light leading-relaxed mb-10 max-w-md">
            Manucure russe, nail art d'auteur et rituels de beauté premium dans un espace pensé pour l'excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group bg-[#e76f51] hover:bg-[#f4a261] text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e76f51]/30"
            >
              Prendre Rendez-vous →
            </a>
            <a
              href="#services"
              className="text-white/70 hover:text-white font-semibold text-sm px-8 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              Voir les soins
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { val: "500+", label: "Clientes" },
              { val: "5.0★", label: "Note Google" },
              { val: "3ans", label: "D'expertise" },
            ].map((s, i) => (
              <div key={i} className={`${i > 0 ? "pl-6 border-l border-white/10" : ""}`}>
                <p className="text-white font-black text-xl">{s.val}</p>
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Portrait ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          {/* Glow ring behind image */}
          <div className="absolute inset-8 bg-[#e76f51]/20 rounded-[2.5rem] blur-2xl" />

          {/* Image container — no overlay, full quality */}
          <div className="relative w-full max-w-[420px] lg:max-w-full lg:w-[480px] aspect-[3/4]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#e76f51]/20 to-transparent p-[1px]">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[#1a1a1a]">
                <img
                  src="/lara-portrait.png"
                  alt="Lara — Studio de Beauté"
                  className="w-full h-full object-cover object-top"
                  style={{ imageRendering: "crisp-edges" }}
                />
              </div>
            </div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e76f51]/15 flex items-center justify-center text-lg">💅</div>
              <div>
                <p className="text-white font-semibold text-sm">Manucure Russe</p>
                <p className="text-white/40 text-xs">Spécialité maison</p>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#e76f51] text-white rounded-2xl px-4 py-3 shadow-xl shadow-[#e76f51]/30"
            >
              <p className="font-black text-2xl leading-none">★ 5.0</p>
              <p className="text-white/80 text-[10px] font-medium uppercase tracking-wider">Google</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
