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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-gold/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold text-lg font-black group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-300">
            L
          </div>
          <Typography variant="h3" serif className="text-brand-ivory tracking-tighter">
            Lara <span className="text-brand-gold">Nails</span>
          </Typography>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-ivory/50 hover:text-brand-gold transition-all">
              {link.label}
            </Link>
          ))}
          <Button variant="luxury" size="sm">RÉSERVATION</Button>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-brand-gold">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 glass-luxury p-10 flex flex-col gap-8 md:hidden rounded-[2rem]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest text-brand-ivory hover:text-brand-gold transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="luxury" className="w-full">RÉSERVATION</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
