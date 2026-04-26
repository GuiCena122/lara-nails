"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
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
        loading: 'Envoi de votre demande...',
        success: () => {
          form.reset();
          if (btn) btn.disabled = false;
          return 'Demande envoyée avec succès ! Nous vous recontacterons très vite.';
        },
        error: () => {
          if (btn) btn.disabled = false;
          return 'Erreur lors de l\'envoi';
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#fff5f6] text-[#2d2d2d] selection:bg-[#ffe8eb] selection:text-[#e76f51]">
      <Navbar />
      <Hero />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 bg-[#fefae0]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl mb-8 leading-tight"
          >
            "La beauté commence par le soin."
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl font-light leading-relaxed mb-12"
          >
            Chez Lara Nails, nous ne faisons pas que peindre vos ongles. Nous étudions leur nature, les renforçons et créons des œuvres d'art durables. Notre spécialité, la manucure russe, garantit une propreté immaculée et une pousse saine.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop" alt="Salon ambiance" className="w-full h-80 object-cover rounded-3xl opacity-90 shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#e76f51] mb-4 font-medium">Nos Prestations</p>
              <h2 className="font-serif text-4xl md:text-5xl">Le Menu</h2>
            </div>
            <p className="text-gray-500 mt-4 md:mt-0 font-light italic">Soins personnalisés sur rendez-vous.</p>
          </div>

          <div className="space-y-6">
            {[
              { name: "Manucure Russe Signature", price: "50€", desc: "Soin complet des cuticules, forme parfaite et hydratation profonde." },
              { name: "Gainage & Vernis Semi-Permanent", price: "65€", desc: "Renforcement de l'ongle naturel pour une tenue jusqu'à 4 semaines." },
              { name: "Extension Gel (Chablon)", price: "85€", desc: "Allongement sur mesure, sans capsule, pour un résultat ultra-naturel." },
              { name: "Nail Art Autoral", price: "Dès 15€", desc: "Design minimaliste, textures, ou peintures à main levée." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-gray-100 hover:border-[#e76f51]/30 hover:bg-[#fff5f6]/50 transition-all rounded-2xl"
              >
                <div>
                  <h3 className="text-xl font-serif mb-1 group-hover:text-[#e76f51] transition-colors">{service.name}</h3>
                  <p className="text-sm text-gray-500 font-light">{service.desc}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0 text-xl font-medium text-[#e76f51]">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-[#fff5f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e76f51] mb-4 font-medium">Inspiration</p>
          <h2 className="font-serif text-4xl md:text-5xl">L'Éditorial</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop"
          ].map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className={`rounded-2xl overflow-hidden shadow-lg ${i === 1 || i === 3 ? "md:mt-12" : ""}`}
            >
              <img src={src} alt="Nail Gallery" className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-32 bg-[#e76f51] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Prête pour<br />l'expérience ?</h2>
            <p className="text-white/80 font-light mb-12 max-w-sm">
              Réservez votre créneau ou envoyez-nous vos inspirations pour un projet sur mesure.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-white/60" />
                <span className="font-light">12 Avenue de l'Élégance, Paris</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 text-white/60 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <a href="#" className="font-light hover:underline">@lara.nails.pro</a>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-serif mb-6">Demande de RDV</h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <input required type="text" placeholder="Votre Nom" className="w-full bg-white/5 border-b border-white/30 px-4 py-3 outline-none focus:border-white transition-colors placeholder:text-white/50 text-white" />
              </div>
              <div>
                <input required type="tel" placeholder="Téléphone" className="w-full bg-white/5 border-b border-white/30 px-4 py-3 outline-none focus:border-white transition-colors placeholder:text-white/50 text-white" />
              </div>
              <div>
                <select required className="w-full bg-white/5 border-b border-white/30 px-4 py-3 outline-none focus:border-white transition-colors text-white/80 appearance-none">
                  <option value="" disabled selected>Prestation souhaitée</option>
                  <option className="text-black">Manucure Russe</option>
                  <option className="text-black">Gainage</option>
                  <option className="text-black">Extension</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-white text-[#e76f51] font-bold tracking-widest uppercase text-xs hover:bg-[#fff5f6] transition-colors flex justify-center items-center gap-2">
                Envoyer <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <footer className="bg-[#2d2d2d] text-white/40 py-8 text-center text-xs font-light tracking-widest">
        © 2026 LARA NAILS. TOUS DROITS RÉSERVÉS.
      </footer>
    </main>
  );
}
