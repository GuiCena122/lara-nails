"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      scrolled ? "bg-white/60 backdrop-blur-xl border-b border-rose-100 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-serif font-bold text-[#2d2d2d]">Lara Nails</span>
          <Heart className="w-4 h-4 text-[#e76f51] group-hover:scale-125 transition-transform fill-current" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-[#e76f51] transition-colors">Menu</Link>
          <Link href="#gallery" className="text-sm font-medium text-gray-600 hover:text-[#e76f51] transition-colors">Portfolio</Link>
          <Link href="/booking" className="px-6 py-2.5 bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white rounded-full text-sm font-semibold shadow-lg shadow-rose-100 hover:scale-105 transition-all">
            Prendre RDV
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-600">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-rose-50 p-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4 text-center">
            <Link href="#services" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Menu</Link>
            <Link href="#gallery" onClick={() => setMobileOpen(false)} className="text-lg font-medium">Portfolio</Link>
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="py-4 bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white rounded-2xl font-bold">
              Prendre RDV
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
