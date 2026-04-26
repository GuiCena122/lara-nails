"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "La Philosophie", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl tracking-widest text-[#2d2d2d]">LARA NAILS</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-gray-500 hover:text-[#e76f51] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admin" 
            className="text-xs uppercase tracking-[0.2em] font-bold text-[#e76f51] hover:text-[#f4a261] transition-colors ml-4"
          >
            Espace Pro
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-10 text-[#2d2d2d]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full h-screen bg-[#fff5f6] flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-[#2d2d2d] hover:text-[#e76f51] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 border border-[#e76f51] text-[#e76f51] text-xs uppercase tracking-widest hover:bg-[#e76f51] hover:text-white transition-all"
          >
            Espace Pro
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
