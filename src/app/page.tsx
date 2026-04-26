"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector('button');
    if (btn) btn.disabled = true;

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Transmission en cours...',
        success: () => {
          form.reset();
          if (btn) btn.disabled = false;
          return 'Votre demande a été reçue avec succès.';
        },
        error: () => {
          if (btn) btn.disabled = false;
          return 'Erreur de transmission';
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white">
      
      <Navbar />
      <Hero />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-40 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] uppercase tracking-[0.3em] text-[#111111]/50 mb-12 font-medium"
          >
            Le Manifeste
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl mb-12 leading-[1.2]"
          >
            L'excellence n'est pas un acte,<br />
            <span className="italic font-light">mais une habitude.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, delay: 0.4 }}
            className="text-[#111111]/60 text-sm md:text-base font-light leading-loose max-w-2xl mx-auto"
          >
            Chez Lara Nails, chaque prestation est exécutée avec la rigueur d'une clinique et le raffinement d'un atelier d'art. La manucure russe n'est pas simplement une technique, c'est notre engagement envers la santé absolue de l'ongle et une esthétique irréprochable.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-white">
        <div className="max-w-[1000px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-[#111111]/10 pb-12">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#111111]/50 mb-6 font-medium">Prestations</p>
              <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Le Menu</h2>
            </div>
          </div>

          <div className="space-y-12">
            {[
              { name: "Manucure Russe Signature", price: "50€", desc: "Soin complet des cuticules, forme parfaite et hydratation profonde." },
              { name: "Gainage & Semi-Permanent", price: "65€", desc: "Renforcement de l'ongle naturel pour une tenue prolongée." },
              { name: "Extension Gel (Chablon)", price: "85€", desc: "Allongement sur mesure, architecture parfaite." },
              { name: "Nail Art Autoral", price: "Dès 15€", desc: "Minimalisme et précision à main levée." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center relative"
              >
                <div className="flex-1 bg-white relative z-10 pr-8">
                  <h3 className="text-xl md:text-2xl font-serif text-[#111111] mb-2">{service.name}</h3>
                  <p className="text-xs text-[#111111]/50 font-light tracking-wide uppercase">{service.desc}</p>
                </div>
                
                {/* Dotted line connector */}
                <div className="hidden md:block absolute left-0 right-0 top-1/2 border-t border-dotted border-[#111111]/20 z-0" />
                
                <div className="mt-4 md:mt-0 bg-white relative z-10 pl-8 text-lg font-medium text-[#111111] group-hover:text-[#e76f51] transition-colors duration-500">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-24">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#111111]/50 mb-6 font-medium">Inspiration</p>
            <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">L'Éditorial</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop"
            ].map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: i * 0.2 }}
                className="overflow-hidden group"
              >
                <img 
                  src={src} 
                  alt="Nail Gallery" 
                  className="w-full h-[400px] md:h-[500px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1] scale-[1.01] group-hover:scale-105" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-40 bg-[#111111] text-white">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-24 items-center">
          
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-8 font-medium">
              Réservation
            </p>
            <h2 className="font-serif text-5xl md:text-7xl mb-12 text-white leading-[1.1]">
              L'Expérience<br />Sur-Mesure
            </h2>
            <p className="text-white/60 font-light mb-16 max-w-sm text-sm leading-loose">
              Contactez-nous pour réserver votre créneau exclusif ou pour une consultation personnalisée.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#e76f51] transition-colors duration-500" />
                <span className="font-light text-sm uppercase tracking-widest text-white/80">12 Avenue de l'Élégance, Paris</span>
              </div>
              <div className="flex items-center gap-6 group">
                <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#e76f51] transition-colors duration-500" />
                <a href="#" className="font-light text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-500">@lara.nails.pro</a>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-10 md:p-16 border border-white/5">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-12">Demande de Consultation</h3>
            <form onSubmit={handleContactSubmit} className="space-y-10">
              <div>
                <input 
                  required 
                  type="text" 
                  placeholder="NOM COMPLET" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-colors text-white text-[10px] tracking-[0.2em] uppercase placeholder:text-white/30" 
                />
              </div>
              <div>
                <input 
                  required 
                  type="tel" 
                  placeholder="TÉLÉPHONE" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-colors text-white text-[10px] tracking-[0.2em] uppercase placeholder:text-white/30" 
                />
              </div>
              <div>
                <select 
                  required 
                  className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-colors text-white/80 text-[10px] tracking-[0.2em] uppercase appearance-none"
                >
                  <option value="" disabled selected>SERVICE SOUHAITÉ</option>
                  <option className="text-black">Manucure Russe</option>
                  <option className="text-black">Gainage</option>
                  <option className="text-black">Extension</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="w-full pt-8 group flex items-center justify-between"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white group-hover:text-[#e76f51] transition-colors duration-500">
                  Envoyer la demande
                </span>
                <span className="w-12 h-[1px] bg-white/40 group-hover:bg-[#e76f51] group-hover:w-20 transition-all duration-700 ease-[0.16,1,0.3,1]" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 mt-40 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/30">
            © 2026 LARA NAILS
          </p>
          <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/30">
            PARIS
          </p>
        </div>
      </section>
    </main>
  );
}
