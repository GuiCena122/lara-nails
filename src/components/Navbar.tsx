"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "La Maison", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[#111111]/10 py-5" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-serif text-xl md:text-2xl tracking-[0.1em] text-[#111111]">
              LARA NAILS
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#111111]/70 hover:text-[#e76f51] transition-colors duration-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/admin" 
              className="group relative text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111] transition-colors"
            >
              <span className="relative z-10 group-hover:text-[#e76f51] transition-colors duration-500">
                Espace Privé
              </span>
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111]/20 group-hover:bg-[#e76f51] transition-colors duration-500" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-[1px] bg-[#111111] transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`w-6 h-[1px] bg-[#111111] transition-all duration-500 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1px] bg-[#111111] transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-[#111111] hover:text-[#e76f51] transition-colors duration-500"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <Link 
                href="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#e76f51] border-b border-[#e76f51] pb-2"
              >
                Espace Privé
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
