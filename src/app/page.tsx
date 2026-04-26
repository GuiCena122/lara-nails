"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle2, Sparkles, Heart } from "lucide-react";
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
        loading: 'Envoi en cours...',
        success: () => {
          form.reset();
          if (btn) btn.disabled = false;
          return 'C\'est magique ! Votre demande a été envoyée.';
        },
        error: () => {
          if (btn) btn.disabled = false;
          return 'Erreur lors de l\'envoi';
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#fff5f6] text-[#2d2d2d] selection:bg-[#f4a261]/30 relative overflow-hidden">
      
      {/* Global Background Orbs */}
      <div className="fixed top-1/3 -left-64 w-[50rem] h-[50rem] bg-[#f4a261] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 -right-64 w-[60rem] h-[60rem] bg-[#e76f51] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <Navbar />
      <Hero />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="glass-light p-10 md:p-16 rounded-[3rem] text-center shadow-2xl shadow-[#e76f51]/5 relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] opacity-80" />
            
            <Heart className="w-12 h-12 text-[#e76f51] mx-auto mb-8 opacity-80" />
            
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight relative z-10 text-[#2d2d2d]">
              La beauté commence par <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e76f51] to-[#f4a261]">le soin profond.</span>
            </h2>
            <p className="text-[#2d2d2d]/80 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto relative z-10">
              Chez Lara Nails, nous sublimons vos ongles tout en respectant leur nature. Notre spécialité, la manucure russe, garantit une propreté immaculée, une pousse saine et une élégance qui dure des semaines.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { title: "Manucure Russe", desc: "Soin cuticule parfait" },
                { title: "Produits Premium", desc: "Respect de l'ongle" },
                { title: "Design Autoral", desc: "Art sur-mesure" }
              ].map((item, i) => (
                <div key={i} className="bg-white/50 p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-bold text-[#e76f51] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#2d2d2d]/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <Sparkles className="w-8 h-8 text-[#f4a261] mx-auto mb-4" />
            <h2 className="font-serif text-4xl md:text-6xl text-[#2d2d2d]">Le Menu</h2>
            <p className="text-[#2d2d2d]/60 mt-4 font-light">L'excellence à chaque rendez-vous.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Manucure Russe Signature", price: "50€", desc: "Soin complet des cuticules, forme parfaite et hydratation profonde." },
              { name: "Gainage & Vernis Semi-Permanent", price: "65€", desc: "Renforcement de l'ongle naturel pour une tenue jusqu'à 4 semaines." },
              { name: "Extension Gel (Chablon)", price: "85€", desc: "Allongement sur mesure, sans capsule, pour un résultat ultra-naturel." },
              { name: "Nail Art Autoral", price: "Dès 15€", desc: "Design minimaliste, textures, ou peintures à main levée." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-light p-8 rounded-[2.5rem] group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif text-[#2d2d2d] group-hover:text-[#e76f51] transition-colors">{service.name}</h3>
                  <div className="bg-white px-4 py-2 rounded-full text-[#e76f51] font-bold shadow-sm">
                    {service.price}
                  </div>
                </div>
                <p className="text-[#2d2d2d]/70 font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e76f51] mb-4 font-medium">Inspiration</p>
          <h2 className="font-serif text-4xl md:text-5xl">La Galerie</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop"
          ].map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="glass-light p-2 rounded-3xl"
            >
              <img src={src} alt="Nail Gallery" className="w-full h-[250px] md:h-[350px] object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="glass-light rounded-[3rem] p-8 md:p-16 grid md:grid-cols-2 gap-16 items-center shadow-2xl shadow-[#e76f51]/10 border-white relative overflow-hidden">
            
            {/* Background glow in contact card */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-6xl mb-6 text-[#2d2d2d]">Prête pour<br />l'expérience ?</h2>
              <p className="text-[#2d2d2d]/70 font-light mb-12 max-w-sm">
                Réservez votre créneau ou envoyez-nous vos inspirations pour un projet sur mesure.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-[#e76f51]" />
                  </div>
                  <span className="font-light text-[#2d2d2d]">12 Avenue de l'Élégance, Paris</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-[#e76f51] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <a href="#" className="font-light hover:underline text-[#2d2d2d]">@lara.nails.pro</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl relative z-10">
              <h3 className="text-2xl font-serif mb-6 text-[#2d2d2d]">Demande de RDV</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input required type="text" placeholder="Votre Nom" className="w-full bg-[#fff5f6] border border-transparent focus:border-[#e76f51]/30 rounded-2xl px-5 py-4 outline-none transition-colors text-[#2d2d2d]" />
                </div>
                <div>
                  <input required type="tel" placeholder="Téléphone" className="w-full bg-[#fff5f6] border border-transparent focus:border-[#e76f51]/30 rounded-2xl px-5 py-4 outline-none transition-colors text-[#2d2d2d]" />
                </div>
                <div>
                  <select required className="w-full bg-[#fff5f6] border border-transparent focus:border-[#e76f51]/30 rounded-2xl px-5 py-4 outline-none transition-colors text-[#2d2d2d]/80 appearance-none">
                    <option value="" disabled selected>Prestation souhaitée</option>
                    <option className="text-black">Manucure Russe</option>
                    <option className="text-black">Gainage</option>
                    <option className="text-black">Extension</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 mt-2 bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white rounded-2xl font-bold tracking-widest uppercase text-xs hover:shadow-lg hover:shadow-[#e76f51]/30 transition-all flex justify-center items-center gap-2">
                  Envoyer <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="relative z-10 text-[#2d2d2d]/40 py-8 text-center text-xs font-bold tracking-widest uppercase">
        © 2026 LARA NAILS. TOUS DROITS RÉSERVÉS.
      </footer>
    </main>
  );
}
