"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Calendar } from "@/components/ui/Calendar";
import { LuxuryPreloader } from "@/components/ui/LuxuryPreloader";
import {
  Sparkles,
  MapPin,
  Camera,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight
} from "lucide-react";

export default function Home() {

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1800)),
      {
        loading: "Envoi en cours...",
        success: () => { form.reset(); if (btn) btn.disabled = false; return "Demande reçue ! On vous contacte très vite."; },
        error: () => { if (btn) btn.disabled = false; return "Erreur. Veuillez réessayer."; },
      }
    );
  };

  const services = [
    { title: "Manucure Russe Signature", price: "50 €", duration: "60", description: "La perfection clinique pour vos cuticules. Une base saine pour une beauté durable." },
    { title: "Gainage & Semi-Permanent", price: "65 €", duration: "90", description: "Renforcement naturel de l'ongle avec une finition haute brillance." },
    { title: "Extension Gel Prestige", price: "85 €", duration: "120", description: "Allongement sur-mesure sculpté pour une élégance naturelle et résistante." },
    { title: "Nail Art d'Auteur", price: "Dès 15 €", duration: "30", description: "Chaque ongle devient une toile. Minimalisme ou extravagance maîtrisée." },
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
    <main className="bg-brand-black text-brand-ivory selection:bg-brand-gold selection:text-brand-black min-h-screen">
      <LuxuryPreloader />
      <Navbar />
      <Hero />

      {/* ── ABOUT / STUDIO ─────────────────────────── */}
      <section id="philosophy" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
                  alt="Ambiance studio"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/20" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-10 -right-10 glass-luxury p-8 rounded-[3rem] border border-brand-gold/20 max-w-[280px] hidden md:block animate-float">
                <Typography variant="h3" serif className="text-brand-gold mb-4 text-3xl">✨</Typography>
                <Typography variant="h4" serif className="mb-2">L&apos;Excellence Russe</Typography>
                <Typography variant="p" className="text-xs">Technique certifiée garantissant une hygiène irréprochable et un fini architectural.</Typography>
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
                <Typography variant="label" className="text-brand-gold mb-6 block">Notre Philosophie</Typography>
                <Typography variant="h1" serif className="mb-8 leading-none">
                  Où la science <br /> rencontre <span className="gold-text italic">l&apos;esthétique.</span>
                </Typography>
                <Typography variant="p" className="text-lg text-brand-ivory/60 italic font-light">
                  Chez Lara Nails, nous croyons que la beauté des mains est un art de vivre. Notre studio à Paris est conçu comme un sanctuaire dédié à la précision et au luxe.
                </Typography>
              </motion.div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, title: "Hygiène Clinique", desc: "Stérilisation médicale" },
                  { icon: Award, title: "Expertise Russe", desc: "Formation certifiée" },
                  { icon: Clock, title: "Tenue Prolongée", desc: "Jusqu'à 4 semaines" },
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
                    <item.icon className="w-6 h-6 text-brand-gold" />
                    <Typography variant="span" className="block font-bold">{item.title}</Typography>
                    <Typography variant="label" className="text-[8px] opacity-40">{item.desc}</Typography>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" size="lg" className="group">
                En savoir plus <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section id="services" className="py-40 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="label" className="text-brand-gold mb-6 block">Prestations</Typography>
              <Typography variant="h1" serif className="leading-none text-6xl md:text-8xl">Nos Soins <br /> <span className="gold-text italic">Signature.</span></Typography>
            </motion.div>
            <Typography variant="p" className="max-w-xs text-brand-ivory/40 text-sm italic font-light">
              Une sélection rigoureuse de soins adaptés à vos besoins spécifiques.
            </Typography>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} className={i % 2 !== 0 ? "lg:translate-y-12" : ""} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIE ─────────────────────────────── */}
      <section id="gallery" className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Typography variant="label" className="text-brand-gold mb-4 block">Inspiration</Typography>
            <Typography variant="h2" serif className="text-5xl md:text-6xl">Notre <span className="gold-text italic">Univers.</span></Typography>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`overflow-hidden rounded-[2.5rem] group relative ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}
              >
                <Image
                  src={src}
                  alt="Nail art"
                  width={600}
                  height={i === 0 || i === 5 ? 800 : 400}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${i === 0 || i === 5 ? "h-[400px] md:h-full" : "h-[220px] md:h-[280px]"}`}
                />
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-500 rounded-[2.5rem]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / BOOKING ─────────────────────────── */}
      <section id="contact" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start">

            <div className="sticky top-40 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Typography variant="label" className="text-brand-gold mb-6 block">Réservation</Typography>
                <Typography variant="h1" serif className="mb-10 leading-tight">
                  Prête pour <br /> l&apos;expérience <span className="gold-text italic">Lara ?</span>
                </Typography>
                <Typography variant="p" className="text-lg text-brand-ivory/60 max-w-sm italic">
                  Réservez votre moment d&apos;exception dans notre studio parisien.
                </Typography>
              </motion.div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-brand-ivory/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><MapPin size={18} className="text-brand-gold" /></div>
                  <Typography variant="span" className="text-xs">12 Avenue de l&apos;Élégance, 75008 Paris</Typography>
                </div>
                <div className="flex items-center gap-4 text-brand-ivory/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Camera size={18} className="text-brand-gold" /></div>
                  <Typography variant="span" className="text-xs">@lara.nails.pro</Typography>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <Calendar />

              <div className="glass-luxury p-10 rounded-[3rem] border border-white/5">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <input required type="text" placeholder="Nom & Prénom" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 transition-all" />
                  <input required type="tel" placeholder="Téléphone" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 transition-all" />
                  <select required className="w-full bg-brand-black border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 transition-all text-brand-ivory/50">
                    <option value="" disabled selected>Prestation souhaitée</option>
                    {services.map((s, i) => <option key={i}>{s.title}</option>)}
                  </select>
                  <Button variant="luxury" size="lg" className="w-full py-7 tracking-[0.2em]">RÉSERVER MAINTENANT</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="py-32 border-t border-white/5 bg-brand-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-balance">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start mb-24">
            <div className="md:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl border border-brand-gold/30 flex items-center justify-center text-brand-gold text-lg font-black bg-white/[0.02] shadow-lg">L</div>
                 <Typography variant="h3" serif className="text-brand-ivory text-3xl tracking-tighter">Lara <span className="text-brand-gold">Nails</span></Typography>
              </div>
              <Typography variant="p" className="text-sm max-w-xs text-brand-ivory/40 leading-relaxed italic font-light">
                L&apos;excellence à chaque geste, la perfection dans chaque détail. Votre studio privé de manucure russe au cœur de Paris.
              </Typography>
            </div>

            <div className="md:col-span-3 space-y-6">
              <Typography variant="label" className="text-brand-gold tracking-widest uppercase">Navigation</Typography>
              <nav className="flex flex-col gap-4">
                {["Services", "Portfolio", "L'Univers", "Contact"].map(link => (
                  <a key={link} href={`#${link.toLowerCase().replace("'", "")}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ivory/40 hover:text-brand-gold transition-colors">{link}</a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-4 space-y-8">
              <Typography variant="label" className="text-brand-gold tracking-widest uppercase">Rejoignez-nous</Typography>
              <div className="flex items-center gap-6">
                 <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-brand-ivory/60 hover:text-brand-gold hover:border-brand-gold/40 transition-all group shadow-xl">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                 </button>
                 <Typography variant="span" className="text-[10px] font-black uppercase tracking-widest text-brand-ivory/30">@lara.nails.pro</Typography>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <Typography variant="label" className="text-[7px] opacity-20 tracking-[0.4em] uppercase">© 2026 LARA NAILS PRO PARIS — TOUS DROITS RÉSERVÉS</Typography>
            <div className="flex gap-10">
               <Typography variant="label" className="text-[7px] opacity-20 cursor-pointer hover:opacity-100 transition-opacity uppercase tracking-[0.4em]">MENTIONS LÉGALES</Typography>
               <Typography variant="label" className="text-[7px] opacity-20 cursor-pointer hover:opacity-100 transition-opacity uppercase tracking-[0.4em]">CONFIDENTIALITÉ</Typography>
            </div>
          </div>
        </div>
        {/* Soft Decorative Glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      </footer>
    </main>
  );
}
