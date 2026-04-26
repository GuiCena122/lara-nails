"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#2C1A0E]/95 backdrop-blur-md py-4 shadow-xl shadow-black/20"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div className="w-[1px] h-8 bg-[#C9A05C] opacity-60" />
            <span className="font-serif text-2xl tracking-[0.12em] text-[#F5EFE6] italic font-light">
              Lara Nails
            </span>
            <div className="w-[1px] h-8 bg-[#C9A05C] opacity-60" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#F5EFE6]/70 hover:text-[#C9A05C] transition-colors duration-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              href="/admin"
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#2C1A0E] bg-[#C9A05C] px-6 py-3 hover:bg-[#F5EFE6] transition-colors duration-500"
            >
              Espace Privé
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 gap-[6px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={`w-6 h-[1px] bg-[#C9A05C] transition-all duration-500 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-6 h-[1px] bg-[#C9A05C] transition-all duration-500 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1px] bg-[#C9A05C] transition-all duration-500 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#2C1A0E] flex flex-col items-center justify-center gap-10"
          >
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A05C] to-transparent" />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-serif italic font-light text-[#F5EFE6] hover:text-[#C9A05C] transition-colors duration-500"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8"
            >
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2C1A0E] bg-[#C9A05C] px-8 py-4"
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
