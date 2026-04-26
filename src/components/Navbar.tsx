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
    { name: "Studio", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-50 relative">
            <div className="w-8 h-8 rounded-full bg-[#e76f51] flex items-center justify-center text-white text-sm font-black group-hover:scale-110 transition-transform duration-300">
              L
            </div>
            <span className="text-white text-lg font-bold tracking-tight">
              Lara <span className="text-[#e76f51]">Nails</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e76f51] group-hover:w-full transition-all duration-400 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-2 bg-[#e76f51] hover:bg-[#f4a261] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300"
          >
            Espace Pro
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 relative flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-400 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-400 ${mobileMenuOpen ? "opacity-0 w-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-400 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold text-white hover:text-[#e76f51] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[#e76f51] text-white text-sm font-bold px-8 py-4 rounded-full"
              >
                Espace Pro
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
