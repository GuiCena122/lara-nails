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
    { name: "Accueil", href: "#" },
    { name: "Prestations", href: "#services" },
    { name: "Inspiration", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className={`max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 rounded-full ${
        scrolled ? "glass-light shadow-lg py-3 mx-4 md:mx-auto" : ""
      }`}>
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e76f51] to-[#f4a261] flex items-center justify-center shadow-lg shadow-[#e76f51]/20">
            <span className="text-white font-serif font-bold text-sm">L</span>
          </div>
          <span className="font-serif text-xl tracking-wider text-[#2d2d2d] font-bold">Lara Nails</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-[#2d2d2d]/70 hover:text-[#e76f51] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e76f51] to-[#f4a261] transition-all group-hover:w-full rounded-full" />
            </Link>
          ))}
          <Link 
            href="/admin" 
            className="text-sm font-bold text-white bg-gradient-to-r from-[#e76f51] to-[#f4a261] px-5 py-2.5 rounded-full shadow-lg shadow-[#e76f51]/20 hover:shadow-[#e76f51]/40 hover:scale-105 transition-all"
          >
            Espace Pro
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-10 text-[#2d2d2d] bg-white/50 p-2 rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-4 right-4 glass-light rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-serif text-[#2d2d2d] hover:text-[#e76f51] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 w-full text-center text-sm font-bold text-white bg-gradient-to-r from-[#e76f51] to-[#f4a261] px-6 py-4 rounded-2xl shadow-lg"
          >
            Espace Pro
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
