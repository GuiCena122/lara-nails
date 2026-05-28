"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { LuxuryPreloader } from "@/components/ui/LuxuryPreloader";
import { BookingRitual } from "@/components/ui/BookingRitual";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import {
  Sparkles,
  Camera,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin
} from "lucide-react";

export default function Home() {

  const services = [
    {
      title: "Manucure Russe Signature",
      price: "50 €",
      duration: "60",
      description: "La perfection clinique pour vos cuticules. Une base saine pour une beauté durable.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
      macro: "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=1200",
    },
    {
      title: "Gainage & Semi-Permanent",
      price: "65 €",
      duration: "90",
      description: "Renforcement naturel de l'ongle avec une finition haute brillance.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800",
      macro: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200",
    },
    {
      title: "Extension Gel Prestige",
      price: "85 €",
      duration: "120",
      description: "Allongement sur-mesure sculpté pour une élégance naturelle et résistante.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800",
      macro: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
    },
    {
      title: "Nail Art d'Auteur",
      price: "Dès 15 €",
      duration: "30",
      description: "Chaque ongle devient une toile. Minimalisme ou extravagance maîtrisée.",
      image: "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=800",
      macro: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600",
    "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=600",
    "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=600",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600",
  ];

  return (
    <main className="bg-brand-ivory text-brand-black selection:bg-brand-gold selection:text-white min-h-screen">
      <LuxuryPreloader />
      <Navbar />
      <Hero />

      {/* ── SECTION: PHILOSOPHY ─────────────────────────── */}
      <section id="philosophy" className="py-20 md:py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-balance">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Visual side - The Stone (No Borders) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-t-[6rem] md:rounded-t-[15rem] rounded-b-[2rem] md:rounded-b-[3rem] overflow-hidden shadow-2xl group">
                <LuxuryImage
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
                  alt="Ambiance studio"
                  fill
                  aspectRatio="portrait"
                />
                <div className="absolute inset-0 bg-brand-black/5" />
              </div>

              {/* Floating card - Light Mode */}
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] border-[0.5px] border-brand-gold/20 max-w-[320px] hidden md:block shadow-luxury animate-float">
                <Typography variant="h3" serif className="text-brand-gold mb-4 text-3xl">✨</Typography>
                <Typography variant="h4" serif className="mb-2 text-brand-black">L&apos;Excellence Russe</Typography>
                <Typography variant="p" className="text-xs text-brand-black/40 text-balance leading-relaxed">Technique certifiée garantissant une hygiène irréprochable et un fini architectural.</Typography>
              </div>
            </motion.div>

            {/* Text side */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="label" className="text-brand-gold mb-6 block uppercase tracking-[0.4em] font-black">Notre Philosophie</Typography>
                <Typography variant="h1" serif className="mb-8 leading-none tracking-tighter text-brand-black text-balance">
                  Où la science <br /> rencontre <span className="gold-text-shine italic">l&apos;esthétique.</span>
                </Typography>
                <Typography variant="p" className="text-xl text-brand-black/40 italic font-light leading-relaxed text-balance">
                  Chez Lara Nails, nous croyons que la beleza das mãos é um art de vivre. Notre studio à Paris est conçu como um sanctuaire dédié à la précision et au luxe solar.
                </Typography>
              </motion.div>

              <div className="grid grid-cols-2 gap-10 pt-4">
                {[
                  { icon: ShieldCheck, title: "Hygiène Clinique", desc: "Stérilisation médicale" },
                  { icon: Award, title: "Expertise Russe", desc: "Formation certifiée" },
                  { icon: Sparkles, title: "Art Exclusif", desc: "Design sur-mesure" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-3"
                  >
                    <item.icon className="w-6 h-6 text-brand-gold" strokeWidth={1} />
                    <Typography variant="span" className="block font-black tracking-widest uppercase text-[10px] text-brand-black">{item.title}</Typography>
                    <Typography variant="label" className="text-[8px] opacity-40 uppercase tracking-widest font-black">{item.desc}</Typography>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <a href="#contact">
                  <Button variant="luxury" size="lg" className="group text-white">
                    Le Ritual de Réservation <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: SERVICES ─────────────────────────── */}
      <section id="services" className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-balance">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 text-balance">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-balance"
            >
              <Typography variant="label" className="text-brand-gold mb-6 block uppercase tracking-widest font-black">Prestations</Typography>
              <Typography variant="h1" serif className="leading-none text-4xl sm:text-6xl md:text-8xl tracking-tighter text-brand-black text-balance">Nos Soins <br /> <span className="gold-text-shine italic">Signature.</span></Typography>
            </motion.div>
            <Typography variant="p" className="max-w-xs text-black/40 text-sm italic font-light text-balance leading-relaxed">
              Une seleção rigorosa de cuidados adaptada às suas necessidades específicas de beleza.
            </Typography>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-balance">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} className={i % 2 !== 0 ? "lg:translate-y-12 shadow-xl" : "shadow-sm"} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: GALERIE ─────────────────────────────── */}
      <section id="gallery" className="py-20 md:py-32 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Typography variant="label" className="text-brand-gold mb-4 block uppercase tracking-widest font-black">Inspiration</Typography>
            <Typography variant="h2" serif className="text-5xl md:text-6xl tracking-tighter text-brand-black">Notre <span className="gold-text-shine italic">Univers.</span></Typography>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`overflow-hidden rounded-[2rem] md:rounded-[3rem] group relative shadow-sm hover:shadow-2xl transition-all duration-1000 ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}
              >
                <LuxuryImage
                  src={src}
                  alt="Nail art gallery"
                  fill
                  className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: RITUAL (BOOKING) ─────────────────────────── */}
      <section id="contact" className="py-20 md:py-60 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
             >
                <Typography variant="label" className="text-brand-gold mb-6 block uppercase tracking-[0.4em] font-black">VOTRE PARENTHÈSE EXCLUSIVE</Typography>
                <Typography variant="h1" serif className="mb-10 leading-tight tracking-tighter text-brand-black text-balance">
                  Le Ritual de <span className="gold-text-shine italic text-balance">Réservation.</span>
                </Typography>
                <Typography variant="p" className="text-xl text-black/40 max-w-2xl mx-auto italic font-light leading-relaxed text-balance">
                  Chaque rendez-vous est une promesse d&apos;excellence. Suivez les étapes pour sceller votre moment d&apos;exception.
                </Typography>
             </motion.div>
          </div>

          <BookingRitual />

          <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
             <div className="flex items-center gap-6 p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm group hover:border-brand-gold/20 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                   <MapPin size={24} />
                </div>
                <div>
                   <Typography variant="label" className="text-[7px] tracking-widest opacity-40 font-black">LOCALISATION</Typography>
                   <Typography variant="span" className="block text-sm font-bold mt-1 text-brand-black uppercase">12 Avenue de l&apos;Élégance, 75008 Paris</Typography>
                </div>
             </div>
             <div className="flex items-center gap-6 p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm group hover:border-brand-gold/20 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                   <Camera size={24} />
                </div>
                <div>
                   <Typography variant="label" className="text-[7px] tracking-widest opacity-40 font-black">INSTAGRAM</Typography>
                   <Typography variant="span" className="block text-sm font-bold mt-1 text-brand-black uppercase">@lara.nails.pro</Typography>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Light Luxury */}
      <footer className="py-20 md:py-32 border-t border-black/5 bg-brand-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start mb-24">
            <div className="md:col-span-5 space-y-8 text-balance">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl border border-brand-gold/30 flex items-center justify-center text-brand-gold text-lg font-black bg-white shadow-sm">L</div>
                 <Typography variant="h3" serif className="text-brand-black text-3xl tracking-tighter text-balance">Lara <span className="text-brand-gold text-balance">Nails</span></Typography>
              </div>
              <Typography variant="p" className="text-sm max-w-xs text-black/40 leading-relaxed italic font-light text-balance">
                L&apos;excellence à chaque geste, la perfection dans chaque détail. Votre studio privé de manucure russe au cœur de Paris.
              </Typography>
            </div>

            <div className="md:col-span-3 space-y-6 text-balance">
              <Typography variant="label" className="text-brand-gold tracking-widest uppercase font-black text-balance">Navigation</Typography>
              <nav className="flex flex-col gap-4 text-balance">
                {["Services", "Portfolio", "L'Univers", "Contact"].map(link => (
                  <a key={link} href={`#${link.toLowerCase().replace("'", "")}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-brand-gold transition-colors text-balance">{link}</a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-4 space-y-8 text-balance">
              <Typography variant="label" className="text-brand-gold tracking-widest uppercase font-black text-balance">Suivez notre Univers</Typography>
              <div className="flex items-center gap-6">
                 <button className="w-12 h-12 rounded-2xl bg-white border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all group shadow-sm">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                 </button>
                 <Typography variant="span" className="text-[10px] font-black uppercase tracking-widest text-black/30 text-balance">@lara.nails.pro</Typography>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-balance text-balance">
            <Typography variant="label" className="text-[7px] opacity-20 tracking-[0.4em] uppercase font-black text-balance">© 2026 LARA NAILS PRO PARIS — TOUS DROITS RÉSERVÉS</Typography>
            <div className="flex gap-10">
               <Typography variant="label" className="text-[7px] opacity-20 cursor-pointer hover:opacity-100 transition-opacity uppercase tracking-[0.4em] font-black">MENTIONS LÉGALES</Typography>
               <Typography variant="label" className="text-[7px] opacity-20 cursor-pointer hover:opacity-100 transition-opacity uppercase tracking-[0.4em] font-black">CONFIDENTIALITÉ</Typography>
            </div>
          </div>
        </div>
        {/* Soft Solar Glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      </footer>
    </main>
  );
}
