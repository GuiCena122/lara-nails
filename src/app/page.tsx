"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Camera, Check, Heart, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;
    if (btn) btn.disabled = true;

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1800)),
      {
        loading: "Envoi de votre demande...",
        success: () => {
          form.reset();
          if (btn) btn.disabled = false;
          return "Message envoyé ! Nous vous contacterons très bientôt.";
        },
        error: () => {
          if (btn) btn.disabled = false;
          return "Une erreur est survenue lors de l'envoi.";
        },
      }
    );
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  return (
    <main className="bg-bg-boutique selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />

      {/* ── SAVOIR-FAIRE ──────────────────────────── */}
      <section id="philosophy" className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div {...fadeUp} className="relative order-2 lg:order-1">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-text-charcoal/5">
              <img 
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=1000&auto=format&fit=crop" 
                alt="Studio ambiance" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Absolute badge */}
            <div className="absolute -top-6 -right-6 bg-white p-8 rounded-[2rem] shadow-xl border border-black/[0.03] max-w-[200px] hidden md:block">
              <Sparkles className="text-primary" size={32} />
              <p className="font-serif italic text-xl text-text-charcoal leading-tight">L'élégance à la française</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Notre Vision</span>
            <h2 className="font-serif text-5xl md:text-7xl text-text-charcoal leading-[1.1] mb-10">
              Un studio pensé pour <br />
              <span className="italic font-light text-primary">votre bien-être.</span>
            </h2>
            <p className="text-text-charcoal/60 text-lg leading-relaxed mb-12">
              Lara Nails n'est pas seulement um studio de manucure, c'est un refuge dédié à l'excellence. Nous pratiquons la manucure russe — une technique de précision qui garantit une hygiène clinique et une esthétique irréprochable.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Shield className="text-primary" />, title: "Hygiène Stricte", desc: "Instruments stérilisés selon les normas hospitalières." },
                { icon: <Heart className="text-primary" />, title: "Soins Sur-Mesure", desc: "Chaque prestation est adaptée à la nature de vos ongles." },
                { icon: <Sparkles className="text-primary" />, title: "Art Signature", desc: "Du minimalisme pur aux créations les plus artistiques." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-charcoal mb-1">{item.title}</h4>
                    <p className="text-sm text-text-charcoal/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRESTATIONS ───────────────────────────── */}
      <section id="services" className="section-padding bg-white/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Le Menu</span>
            <h2 className="font-serif text-5xl md:text-7xl text-text-charcoal">Prestations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Manucure Russe", price: "50€", desc: "Soin cuticule parfait, forme idéale et hydratation intense." },
              { name: "Gainage", price: "65€", desc: "Renforcement de l'ongle naturel pour une tenue de 4 semaines." },
              { name: "Extensions", price: "85€", desc: "Allongement sur chablon pour un résultat ultra-naturel." },
              { name: "Nail Art", price: "Dès 15€", desc: "Dessins à main levée, incrustations ou minimalisme." },
            ].map((service, i) => (
              <motion.div 
                key={i} 
                {...fadeUp} 
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="card-luxury flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 font-serif text-2xl font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  0{i+1}
                </div>
                <h3 className="font-serif text-2xl text-text-charcoal mb-4">{service.name}</h3>
                <p className="text-text-charcoal/50 text-sm leading-relaxed mb-8 grow">{service.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/[0.03]">
                  <span className="text-primary font-bold text-xl">{service.price}</span>
                  <button className="text-text-charcoal/30 group-hover:text-primary transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIE ──────────────────────────────── */}
      <section id="gallery" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Inspiration</span>
              <h2 className="font-serif text-5xl md:text-7xl text-text-charcoal leading-[0.9]">Galerie <br /><span className="italic font-light">Éditoriale</span></h2>
            </div>
            <a href="https://instagram.com" className="btn-outline flex items-center gap-2">
              <Camera size={18} /> @lara.nails.pro
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { src: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800", span: "row-span-2 col-span-2 md:col-span-1" },
              { src: "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=800", span: "md:row-span-1" },
              { src: "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=800", span: "md:row-span-1 md:col-span-2" },
              { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", span: "md:row-span-1" },
            ].map((img, i) => (
              <motion.div 
                key={i} 
                {...fadeUp}
                className={`overflow-hidden rounded-[2rem] shadow-xl ${img.span}`}
              >
                <img 
                  src={img.src} 
                  alt="Nail art gallery" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────── */}
      <section id="contact" className="section-padding bg-text-charcoal text-white rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Réservation</span>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] mb-12">
              Prête pour <br />
              <span className="italic font-light text-primary">l'expérience?</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">Localisation</p>
                  <p className="text-lg">12 Avenue de l'Élégance, Paris</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Camera size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">Instagram</p>
                  <p className="text-lg">@lara.nails.pro</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-4">Nom</label>
                  <input required type="text" placeholder="Votre nom" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-4">Téléphone</label>
                  <input required type="tel" placeholder="Votre numéro" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/30 ml-4">Service souhaité</label>
                <select required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  <option value="" disabled selected>Choisir une prestation</option>
                  <option className="bg-text-charcoal text-white">Manucure Russe</option>
                  <option className="bg-text-charcoal text-white">Gainage & Semi-Permanent</option>
                  <option className="bg-text-charcoal text-white">Extensions Gel</option>
                  <option className="bg-text-charcoal text-white">Nail Art</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Demander un rendez-vous
              </button>
            </form>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[10px] uppercase tracking-[0.2em]">
          <p>© 2026 Lara Nails — Tous droits réservés</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY BAR ────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-40">
        <div className="bg-white/80 backdrop-blur-2xl border border-black/[0.03] shadow-[0_-8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-charcoal/40 font-bold">À partir de</p>
            <p className="text-xl font-serif italic text-primary">50€</p>
          </div>
          <a href="#contact" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Réserver
          </a>
        </div>
      </div>

    </main>
  );
}
