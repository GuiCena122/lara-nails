"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Typography } from "./ui/Typography";

const menuLinks = [
  { label: "L'Expérience", href: "#philosophy", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800" },
  { label: "Les Soins", href: "#services", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800" },
  { label: "Le Portfolio", href: "#gallery", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800" },
  { label: "Privatisation", href: "#contact", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-700 px-8 py-6 flex items-center justify-between",
        scrolled && !isOpen ? "bg-white/80 backdrop-blur-xl border-b border-brand-gold/10 py-4" : "bg-transparent"
      )}>
        <Link href="/" className="group flex items-center gap-4 z-[101]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold text-lg font-black group-hover:border-brand-gold transition-all duration-500 bg-white">
              L
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-brand-gold/40 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <Typography variant="h3" serif className="text-brand-black tracking-tighter text-xl">
            Lara <span className="text-brand-gold group-hover:text-brand-black transition-colors">Nails</span>
          </Typography>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-[101] flex items-center gap-3 group"
        >
          <Typography variant="label" className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-[0.4em] font-black">
            {isOpen ? "FERMER" : "MENU"}
          </Typography>
          <div className={cn(
            "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 bg-white",
            isOpen ? "border-brand-gold/40 text-brand-gold" : "border-brand-black/5 text-brand-black hover:border-brand-gold"
          )}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[90] bg-brand-ivory flex flex-col lg:flex-row shadow-2xl"
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />

            {/* Left: Links */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 pt-32 lg:pt-0 relative z-10">
              <div className="space-y-4 sm:space-y-6 lg:space-y-10">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    onMouseEnter={() => setHoveredLink(i)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-end gap-6"
                    >
                      <Typography variant="label" className="text-brand-gold mb-4 opacity-30 group-hover:opacity-100 transition-opacity font-black">
                        0{i + 1}
                      </Typography>
                      <Typography
                        variant="h1"
                        serif
                        className="text-3xl sm:text-5xl lg:text-8xl text-brand-black hover:text-brand-gold transition-colors duration-500 leading-none tracking-tighter"
                      >
                        {link.label}
                      </Typography>
                      <ArrowUpRight className="mb-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-gold" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 lg:mt-32 flex gap-12">
                 <div className="space-y-2">
                    <Typography variant="label" className="text-brand-gold font-black tracking-widest">INSTAGRAM</Typography>
                    <Typography variant="span" className="block text-brand-black/40 font-bold">@lara.nails.pro</Typography>
                 </div>
                 <div className="space-y-2">
                    <Typography variant="label" className="text-brand-gold font-black tracking-widest">STUDIO</Typography>
                    <Typography variant="span" className="block text-brand-black/40 font-bold">Paris, 8ème</Typography>
                 </div>
              </div>
            </div>

            {/* Right: Portfolio Preview (Desktop) */}
            <div className="hidden lg:block w-1/3 relative overflow-hidden bg-white border-l border-brand-gold/10">
               <AnimatePresence mode="wait">
                  {hoveredLink !== null ? (
                    <motion.div
                      key={hoveredLink}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.8, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                       <Image
                        src={menuLinks[hoveredLink].image}
                        alt="Preview"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                       />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.03 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                       <Typography variant="h1" className="text-[20vh] font-black opacity-5">LARA</Typography>
                    </motion.div>
                  )}
               </AnimatePresence>
               <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-transparent to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
