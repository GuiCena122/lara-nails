"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
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
        loading: "Envoi en cours...",
        success: () => { form.reset(); if (btn) btn.disabled = false; return "Demande reçue ! On vous contacte très vite."; },
        error: () => { if (btn) btn.disabled = false; return "Erreur. Veuillez réessayer."; },
      }
    );
  };

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.8, ease: "easeOut" as const },
  };

  const services = [
    { num: "01", name: "Manucure Russe Signature", price: "50 €", desc: "Cuticules parfaites, forme architecturale, hydratation profonde.", tag: "Best-seller" },
    { num: "02", name: "Gainage & Semi-Permanent", price: "65 €", desc: "Renforcement naturel de l'ongle. Tenue impeccable 4 semaines.", tag: "" },
    { num: "03", name: "Extension Gel sur Chablon", price: "85 €", desc: "Allongement sur-mesure. Résultat ultra-naturel et résistant.", tag: "Premium" },
    { num: "04", name: "Nail Art Autoral", price: "Dès 15 €", desc: "Minimalisme, textures, aquarelle — chaque détail est une signature.", tag: "" },
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
    <main className="bg-[#0D0D0D] text-white selection:bg-[#e76f51] selection:text-white">
      <Navbar />
      <Hero />

      {/* ── ABOUT / STUDIO ─────────────────────────── */}
      <section id="philosophy" className="py-32 bg-[#0D0D0D]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <motion.div {...fadeUp} className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
                alt="Ambiance studio"
                width={900}
                height={500}
                className="w-full h-[500px] object-cover rounded-3xl"
              />
              {/* Coral overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e76f51] flex items-center justify-center text-2xl flex-shrink-0">✨</div>
                <div>
                  <p className="font-bold text-white">Technique Russe Certifiée</p>
                  <p className="text-white/50 text-sm">L'hygiène clinique au service de la beauté</p>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}>
              <span className="inline-block bg-[#e76f51]/10 text-[#e76f51] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">Notre Studio</span>
              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                L&apos;art de<br />sublimer vos<br />
                <span className="text-[#e76f51]">mains.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8 font-light">
                Chez Lara Nails, chaque geste est une signature. Formées aux techniques les plus exigeantes, nos artistes combinent savoir-faire clinique et sensibilité artistique pour révéler le meilleur de vos mains.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", title: "Précision absolue", desc: "Chaque détail est pensé" },
                  { icon: "🌿", title: "Produits premium", desc: "Respect de l'ongle naturel" },
                  { icon: "✦", title: "Design exclusif", desc: "Art sur-mesure" },
                  { icon: "🔬", title: "Hygiène clinique", desc: "Stérilisation garantie" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 hover:border-[#e76f51]/30 transition-colors duration-300">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section id="services" className="py-32 bg-[#111111]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="inline-block bg-[#e76f51]/10 text-[#e76f51] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">Prestations</span>
              <h2 className="text-5xl md:text-6xl font-black">Nos Soins</h2>
            </div>
            <p className="text-white/40 text-sm font-light max-w-xs">Chaque soin est adapté à la morphologie et aux désirs de la cliente.</p>
          </motion.div>

          <div className="space-y-3">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#e76f51]/30 rounded-2xl p-6 md:p-8 grid grid-cols-12 gap-4 items-center transition-all duration-400 cursor-default"
              >
                <span className="col-span-1 text-[#e76f51] font-black text-sm opacity-60 group-hover:opacity-100 transition-opacity">{s.num}</span>
                <div className="col-span-7 md:col-span-8">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-xl group-hover:text-[#e76f51] transition-colors duration-300">{s.name}</h3>
                    {s.tag && <span className="text-[10px] bg-[#e76f51]/15 text-[#e76f51] font-bold px-2 py-1 rounded-full uppercase tracking-wide">{s.tag}</span>}
                  </div>
                  <p className="text-white/40 text-sm font-light">{s.desc}</p>
                </div>
                <div className="col-span-4 md:col-span-3 text-right">
                  <span className="text-white font-black text-2xl group-hover:text-[#e76f51] transition-colors duration-300">{s.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIE ─────────────────────────────── */}
      <section id="gallery" className="py-32 bg-[#0D0D0D]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block bg-[#e76f51]/10 text-[#e76f51] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">Inspiration</span>
            <h2 className="text-5xl md:text-6xl font-black">Notre Univers</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className={`overflow-hidden rounded-2xl group relative ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}
              >
                <Image
                  src={src}
                  alt="Nail art"
                  width={600}
                  height={i === 0 || i === 5 ? 800 : 400}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${i === 0 || i === 5 ? "h-[400px] md:h-full" : "h-[220px] md:h-[280px]"}`}
                />
                <div className="absolute inset-0 bg-[#e76f51]/0 group-hover:bg-[#e76f51]/10 transition-colors duration-500 rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────── */}
      <section id="contact" className="py-32 bg-[#111111]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left */}
            <motion.div {...fadeUp}>
              <span className="inline-block bg-[#e76f51]/10 text-[#e76f51] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">Réservation</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Prête pour<br />l&apos;expérience ?
              </h2>
              <p className="text-white/50 font-light text-base leading-relaxed mb-10 max-w-sm">
                Réservez votre créneau ou partagez vos inspirations pour un projet entièrement personnalisé.
              </p>
              <div className="space-y-4">
                {["📍 12 Avenue de l'Élégance, Paris", "📸 @lara.nails.pro"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/60 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 md:p-10"
            >
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {[
                  { type: "text", placeholder: "Nom & Prénom", required: true },
                  { type: "tel", placeholder: "Téléphone", required: true },
                  { type: "email", placeholder: "E-mail (optionnel)", required: false },
                ].map((field, i) => (
                  <input
                    key={i}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#e76f51]/50 rounded-xl px-5 py-4 text-white text-sm font-medium placeholder:text-white/25 outline-none transition-colors duration-300"
                  />
                ))}
                <select
                  required
                  defaultValue=""
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e76f51]/50 rounded-xl px-5 py-4 text-white/60 text-sm font-medium outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Prestation souhaitée</option>
                  <option className="bg-[#1a1a1a]">Manucure Russe</option>
                  <option className="bg-[#1a1a1a]">Gainage & Semi-Permanent</option>
                  <option className="bg-[#1a1a1a]">Extension Gel</option>
                  <option className="bg-[#1a1a1a]">Nail Art</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#e76f51] hover:bg-[#f4a261] text-white font-bold text-sm py-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#e76f51]/30 hover:scale-[1.01]"
                >
                  Envoyer ma demande →
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] border-t border-white/5 py-8">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#e76f51] flex items-center justify-center text-white text-xs font-black">L</div>
            <span className="text-white font-bold text-sm">Lara <span className="text-[#e76f51]">Nails</span></span>
          </div>
          <p className="text-white/25 text-xs font-medium">© 2026 Lara Nails — Paris. Tous droits réservés.</p>
          <p className="text-white/25 text-xs">L&apos;excellence, toujours.</p>
        </div>
      </footer>
    </main>
  );
}
