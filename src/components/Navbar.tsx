"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Le Studio", href: "#philosophy" },
    { name: "Prestations", href: "#services" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 z-50">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif italic text-xl transition-transform group-hover:rotate-12">
              L
            </div>
            <span className="font-serif text-2xl tracking-tight text-text-charcoal group-hover:text-primary transition-colors">
              Lara <span className="italic font-light">Nails</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-text-charcoal/60 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/admin" 
              className="text-sm font-semibold text-text-charcoal/40 hover:text-text-charcoal transition-colors"
            >
              Espace Pro
            </Link>
            <Link 
              href="#contact" 
              className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-5xl text-text-charcoal flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto mb-20 flex flex-col gap-4">
              <Link 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-white text-center py-5 rounded-2xl font-bold text-lg"
              >
                Prendre Rendez-vous
              </Link>
              <Link 
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-4 text-text-charcoal/40 font-semibold"
              >
                Accès Professionnel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
