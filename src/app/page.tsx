"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const GOLD = "#C9A05C";
const DARK = "#2C1A0E";
const CREAM = "#F5EFE6";
const MUTED = "#EDE0D4";

export default function Home() {

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;
    if (btn) btn.disabled = true;

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1800)),
      {
        loading: "Transmission en cours...",
        success: () => {
          form.reset();
          if (btn) btn.disabled = false;
          return "Votre demande a été reçue. Nous vous contacterons très prochainement.";
        },
        error: () => {
          if (btn) btn.disabled = false;
          return "Erreur lors de l'envoi. Veuillez réessayer.";
        },
      }
    );
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 1.4, ease: "easeOut" as const },
  };

  return (
    <main className="bg-[#F5EFE6] text-[#2C1A0E] selection:bg-[#C9A05C] selection:text-[#2C1A0E]">
      <Navbar />
      <Hero />

      {/* ── MANIFESTE ─────────────────────────────── */}
      <section id="philosophy" className="py-40 bg-[#F5EFE6] relative overflow-hidden">
        {/* Decorative large letter */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[28rem] font-serif italic text-[#EDE0D4] select-none pointer-events-none leading-none">L</div>

        <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#C9A05C]" />
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A05C] font-medium">Le Manifeste</p>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-[#2C1A0E] leading-[1.15] mb-10">
                Beauté & <br /><em className="italic font-light">Précision</em><br />Sans Compromis.
              </h2>
              <div className="w-24 h-[1px] bg-[#C9A05C] mb-10" />
              <p className="text-[#2C1A0E]/70 font-sans font-light text-base leading-loose max-w-md">
                Chez Lara Nails, chaque geste est une signature. Formées aux techniques les plus exigeantes, nos artistes combinent savoir-faire clinique et sensibilité artistique pour révéler le meilleur de vos mains.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800&auto=format&fit=crop"
                  alt="Soin manucure"
                  className="w-full h-[500px] object-cover"
                />
                {/* Gold border offset */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C9A05C]/40 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="grid grid-cols-3 gap-0 mt-28 border-t border-[#C9A05C]/30 pt-12"
          >
            {[
              { num: "500+", label: "Clientes fidèles" },
              { num: "5★", label: "Note Google" },
              { num: "100%", label: "Produits premium" },
            ].map((s, i) => (
              <div key={i} className={`text-center py-4 ${i < 2 ? "border-r border-[#C9A05C]/30" : ""}`}>
                <p className="font-serif text-5xl italic text-[#C9A05C] mb-2">{s.num}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#2C1A0E]/60 font-sans">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section id="services" className="py-40 bg-[#2C1A0E] relative overflow-hidden">
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A05C] to-transparent" />

        <div className="max-w-[1100px] mx-auto px-8 md:px-16">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-[#C9A05C]" />
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A05C] font-medium">Prestations</p>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl text-[#F5EFE6] italic font-light leading-tight">
                Le Menu
              </h2>
            </div>
            <p className="text-[#F5EFE6]/40 font-sans font-light text-sm mt-4 md:mt-0 max-w-xs text-right leading-relaxed">
              Chaque soin est personnalisé selon la morphologie et les désirs de la cliente.
            </p>
          </motion.div>

          <div className="space-y-0">
            {[
              { name: "Manucure Russe Signature", price: "50 €", desc: "Soin cuticule parfait, forme architecturale, hydratation intense." },
              { name: "Gainage & Semi-Permanent", price: "65 €", desc: "Renforcement de l'ongle naturel — résultat impeccable 4 semaines." },
              { name: "Extension Gel sur Chablon", price: "85 €", desc: "Allongement sur-mesure. Architecture parfaite, résultat ultra-naturel." },
              { name: "Nail Art Autoral", price: "Dès 15 €", desc: "Minimalisme, textures, aquarelle — chaque détail est une œuvre." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
                className="group grid grid-cols-12 gap-4 py-10 border-b border-[#F5EFE6]/10 hover:border-[#C9A05C]/40 transition-colors duration-700 items-center"
              >
                <div className="col-span-1 text-[#C9A05C]/40 font-serif text-2xl italic group-hover:text-[#C9A05C] transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 md:col-span-8">
                  <h3 className="font-serif text-2xl md:text-3xl italic text-[#F5EFE6] mb-2 group-hover:text-[#C9A05C] transition-colors duration-500">
                    {service.name}
                  </h3>
                  <p className="text-[#F5EFE6]/40 font-sans text-xs leading-relaxed uppercase tracking-widest">
                    {service.desc}
                  </p>
                </div>
                <div className="col-span-4 md:col-span-3 text-right">
                  <span className="font-serif text-2xl text-[#C9A05C]">{service.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A05C] to-transparent" />
      </section>

      {/* ── GALERIE ─────────────────────────────── */}
      <section id="gallery" className="py-40 bg-[#EDE0D4]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div {...fadeUp} className="text-center mb-24">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-12 h-[1px] bg-[#C9A05C]" />
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A05C] font-medium">Inspiration</p>
              <div className="w-12 h-[1px] bg-[#C9A05C]" />
            </div>
            <h2 className="font-serif text-5xl md:text-7xl text-[#2C1A0E] italic font-light">L'Éditorial</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600", tall: true },
              { src: "https://images.unsplash.com/photo-1516975080661-460d3c01c0f9?q=80&w=600", tall: false },
              { src: "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=600", tall: false },
              { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600", tall: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: i * 0.15 }}
                className={`overflow-hidden relative group ${i % 2 === 1 ? "md:mt-10" : ""}`}
              >
                <img
                  src={item.src}
                  alt="Nail art"
                  className="w-full h-[300px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                />
                {/* Gold frame on hover */}
                <div className="absolute inset-0 border border-[#C9A05C]/0 group-hover:border-[#C9A05C]/60 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────── */}
      <section id="contact" className="py-40 bg-[#2C1A0E] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A05C] to-transparent" />
        
        {/* Large background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[22rem] font-serif italic text-[#F5EFE6]/[0.02]">L</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 md:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">

            {/* Left column */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#C9A05C]" />
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A05C] font-medium">Rendez-vous</p>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl text-[#F5EFE6] italic font-light leading-[1.1] mb-10">
                Votre<br />Expérience<br /><em className="text-[#C9A05C]">sur-mesure</em>
              </h2>
              <p className="text-[#F5EFE6]/50 font-sans font-light text-sm leading-loose mb-14 max-w-sm">
                Réservez votre créneau exclusif ou partagez vos inspirations pour un projet unique.
              </p>

              <div className="space-y-6">
                {[
                  { label: "12 Avenue de l'Élégance, Paris" },
                  { label: "@lara.nails.pro" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-10 h-[1px] bg-[#C9A05C]/30 group-hover:bg-[#C9A05C] transition-colors duration-500" />
                    <span className="text-[#F5EFE6]/60 font-sans text-xs uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="border border-[#C9A05C]/20 p-10 md:p-14"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A05C] mb-10">Formulaire de Réservation</p>

              <form onSubmit={handleContactSubmit} className="space-y-8">
                {[
                  { type: "text", placeholder: "Nom & Prénom", required: true },
                  { type: "tel", placeholder: "Téléphone", required: true },
                  { type: "email", placeholder: "E-mail", required: false },
                ].map((field, i) => (
                  <div key={i} className="border-b border-[#F5EFE6]/15 focus-within:border-[#C9A05C] transition-colors duration-500 pb-3">
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-transparent text-[#F5EFE6] text-xs uppercase tracking-[0.2em] outline-none placeholder:text-[#F5EFE6]/25 font-sans"
                    />
                  </div>
                ))}

                <div className="border-b border-[#F5EFE6]/15 focus-within:border-[#C9A05C] transition-colors duration-500 pb-3">
                  <select
                    required
                    defaultValue=""
                    className="w-full bg-transparent text-[#F5EFE6]/60 text-xs uppercase tracking-[0.2em] outline-none appearance-none font-sans cursor-pointer"
                  >
                    <option value="" disabled>Prestation souhaitée</option>
                    <option className="text-black bg-white">Manucure Russe</option>
                    <option className="text-black bg-white">Gainage & Semi-Permanent</option>
                    <option className="text-black bg-white">Extension Gel</option>
                    <option className="text-black bg-white">Nail Art</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="group w-full mt-4 bg-[#C9A05C] text-[#2C1A0E] py-5 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#F5EFE6] transition-colors duration-500 flex items-center justify-center gap-4"
                >
                  Envoyer ma demande
                  <span className="w-6 h-[1px] bg-[#2C1A0E] group-hover:w-10 transition-all duration-700" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 mt-28 pt-8 border-t border-[#F5EFE6]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif italic text-[#F5EFE6]/20 text-sm">Lara Nails</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#F5EFE6]/20">© 2026 — Paris — Tous droits réservés</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#C9A05C]/40">L'Excellence sans compromis</p>
        </div>
      </section>
    </main>
  );
}
