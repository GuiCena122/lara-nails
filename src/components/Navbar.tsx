"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "L'Univers", href: "#philosophy" },
    { label: "Portfolio", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-8 py-6",
      isScrolled ? "bg-brand-black/90 backdrop-blur-xl border-b border-brand-gold/10 py-4" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold text-lg font-black group-hover:border-brand-gold transition-all duration-500">
              L
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-brand-gold/40 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <Typography variant="h3" serif className="text-brand-ivory tracking-tighter text-xl">
            Lara <span className="text-brand-gold group-hover:text-brand-ivory transition-colors">Nails</span>
          </Typography>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="relative group overflow-hidden">
              <Typography variant="span" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-ivory/40 group-hover:text-brand-gold transition-all">
                {link.label}
              </Typography>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
          <Button variant="luxury" size="sm" className="px-8 tracking-[0.2em] text-[10px]">RÉSERVATION</Button>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-brand-gold hover:scale-110 transition-transform">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-6 right-6 mt-6 glass-luxury p-12 flex flex-col gap-10 md:hidden rounded-[3rem] border border-brand-gold/10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif font-bold text-brand-ivory hover:text-brand-gold transition-colors block"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Button variant="luxury" className="w-full py-6 text-sm tracking-widest mt-4">RÉSERVATION</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
