"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "./Typography";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LuxuryImage } from "./LuxuryImage";

const steps = [
  { id: "service", title: "Le Soin", subtitle: "CHOISISSEZ VOTRE EXPÉRIENCE" },
  { id: "schedule", title: "Le Moment", subtitle: "SÉLECTIONNEZ VOTRE CRÉNEAU" },
  { id: "confirm", title: "L'Élévation", subtitle: "SCELLER VOTRE RITUEL" },
];

const services = [
  {
    id: "russe",
    title: "Manucure Russe Signature",
    price: "50 €",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
    macro: "https://images.unsplash.com/photo-1620002131971-ce4a9c68fc0e?q=80&w=1200",
  },
  {
    id: "semi",
    title: "Gainage & Semi-Permanent",
    price: "65 €",
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800",
    macro: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200",
  },
  {
    id: "extension",
    title: "Extension Gel Prestige",
    price: "85 €",
    duration: "120 min",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800",
    macro: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
  },
];

export function BookingRitual() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="w-full max-w-6xl mx-auto text-balance">
      {/* Stepper Progress - The Silk Thread (Gold on Ivory) */}
      <div className="flex justify-between mb-24 px-12 relative">
        <div className="absolute top-1 left-12 right-12 h-[0.5px] bg-black/5 -translate-y-1/2 z-0" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-6 relative z-10">
            <motion.div
              animate={{
                scale: i === step ? 1.8 : 1,
                backgroundColor: i <= step ? "#C9A66B" : "#E5E5E5",
                boxShadow: i === step ? "0 0 20px rgba(201, 166, 107, 0.3)" : "none"
              }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-700"
            />
            <Typography
              variant="label"
              className={cn(
                "text-[8px] tracking-[0.6em] transition-all duration-700 font-black",
                i === step ? "text-brand-gold opacity-100" : "text-brand-black opacity-20"
              )}
            >
              {s.id.toUpperCase()}
            </Typography>
          </div>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-[6rem] border-[0.5px] border-brand-gold/20 min-h-[750px] flex flex-col relative overflow-hidden shadow-luxury">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-service"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="flex-1 flex flex-col p-12 md:p-24"
            >
              <div className="mb-20">
                 <Typography variant="label" className="text-brand-gold mb-6 block tracking-[0.5em] uppercase font-black">ACTE I : LA DÉCOUVERTE</Typography>
                 <Typography variant="h1" serif className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] tracking-tighter text-brand-black">L&apos;Éveil de <br /> <span className="gold-text-shine italic">vos sens.</span></Typography>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedService(s); nextStep(); }}
                    className="group relative aspect-[3/4] rounded-[5rem] border-[0.5px] border-black/5 bg-brand-ivory overflow-hidden transition-all duration-1000 hover:border-brand-gold/40 shadow-sm hover:shadow-xl"
                  >
                    <div className="absolute inset-0 z-0">
                       <LuxuryImage
                         src={s.image}
                         alt={s.title}
                         fill
                         className="grayscale opacity-10 transition-all duration-[1500ms] group-hover:scale-110 group-hover:opacity-0"
                       />
                       <LuxuryImage
                         src={s.macro}
                         alt={`${s.title} macro`}
                         fill
                         className="absolute inset-0 scale-125 opacity-0 transition-all duration-[2000ms] group-hover:scale-100 group-hover:opacity-20"
                       />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-90" />

                    <div className="absolute inset-0 p-12 flex flex-col justify-end z-10 text-left">
                       <Typography variant="label" className="text-brand-gold mb-3 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-black tracking-widest">{s.price}</Typography>
                       <Typography variant="h3" serif className="text-2xl text-brand-black mb-4 group-hover:text-brand-gold transition-colors duration-500 leading-tight">{s.title}</Typography>
                       <div className="h-[0.5px] w-0 group-hover:w-12 bg-brand-gold/40 transition-all duration-1000" />
                    </div>

                    <div className="absolute inset-0 border-[0.5px] border-brand-gold/0 group-hover:border-brand-gold/20 rounded-[5rem] transition-all duration-1000 m-6 pointer-events-none" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-schedule"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="flex-1 flex flex-col items-center p-12 md:p-24"
            >
              <div className="w-full flex items-center justify-between mb-20">
                 <button onClick={prevStep} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:border-brand-gold transition-all duration-500 bg-white">
                       <ArrowLeft size={16} className="text-brand-black group-hover:text-brand-gold transition-colors" />
                    </div>
                    <Typography variant="label" className="text-[10px] tracking-[0.5em] opacity-40 group-hover:opacity-100 uppercase font-black">RETOUR</Typography>
                 </button>
                 <Typography variant="label" className="text-brand-gold tracking-[0.5em] uppercase font-black">ACTE II : LE RENDEZ-VOUS</Typography>
              </div>

              <div className="grid lg:grid-cols-2 gap-24 w-full items-center">
                 <Calendar />
                 <div className="space-y-16">
                    <div className="space-y-8 text-left text-balance">
                       <Typography variant="label" className="text-brand-gold/60 block tracking-[0.4em] font-black">SÉLECTIONNEZ UNE HEURE</Typography>
                       <div className="grid grid-cols-2 gap-6">
                          {["10:00", "11:30", "14:00", "16:30", "18:00", "19:30"].map(t => (
                            <button
                              key={t}
                              onClick={nextStep}
                              className="p-8 rounded-[2.5rem] border-[0.5px] border-black/5 bg-brand-ivory hover:border-brand-gold text-brand-black font-serif italic text-2xl transition-all duration-700 hover:bg-brand-gold hover:text-white shadow-sm hover:shadow-xl"
                            >
                               {t}
                            </button>
                          ))}
                       </div>
                    </div>
                    <div className="p-10 border-[0.5px] border-black/5 rounded-[4rem] bg-brand-gold/[0.02] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none" />
                       <Typography variant="p" className="text-sm italic leading-relaxed text-brand-black/40 font-light">
                          &quot;Le luxe est une question de temps. Choisissez le vôtre avec soin.&quot;
                       </Typography>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-confirm"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="flex-1 flex flex-col items-center justify-center text-center p-12 md:p-24"
            >
              {/* Central Totem - Light Mode */}
              <div className="w-40 h-40 rounded-full border-[0.5px] border-brand-gold/30 flex items-center justify-center text-brand-gold mb-20 shadow-luxury relative group bg-white">
                 <CheckCircle2 size={60} strokeWidth={0.5} className="group-hover:scale-110 transition-transform duration-1000" />
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-15px] rounded-full border-t-[0.5px] border-brand-gold/60"
                 />
                 <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-30px] rounded-full border-b-[0.5px] border-black/5"
                 />
              </div>

              <Typography variant="label" className="text-brand-gold mb-10 block tracking-[0.8em] uppercase font-black">ACTE III : L&apos;ÉLÉVATION</Typography>

              <Typography variant="h1" serif className="text-7xl md:text-[9rem] tracking-tighter mb-12 leading-[0.8] text-brand-black">
                 Votre <br /> <span className="gold-text-shine italic">Rituel.</span>
              </Typography>

              <div className="max-w-2xl mx-auto space-y-8 mb-20">
                <Typography variant="p" className="text-2xl text-brand-black/60 italic font-light leading-relaxed">
                   Vous avez scellé le soin <strong>{selectedService?.title}</strong>.
                </Typography>
                <div className="h-[0.5px] w-24 bg-brand-gold/40 mx-auto" />
                <Typography variant="p" className="text-lg text-brand-black/40 font-light tracking-wide uppercase">
                   C&apos;est um investimento précieux em sua <span className="text-brand-gold italic">Autoestima.</span>
                </Typography>
              </div>

              <div className="max-w-md w-full bg-brand-ivory p-14 rounded-[5rem] border-[0.5px] border-brand-gold/30 mb-20 relative overflow-hidden group/card text-left shadow-sm hover:shadow-xl transition-all">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                 <div className="flex justify-between items-center mb-10 pb-10 border-b border-black/5 relative z-10">
                    <Typography variant="span" className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">INVESTISSEMENT</Typography>
                    <Typography variant="h3" serif className="text-brand-gold text-4xl">{selectedService?.price}</Typography>
                 </div>
                 <div className="flex justify-between items-center relative z-10">
                    <Typography variant="label" className="text-[9px] tracking-[0.2em] text-brand-gold font-black">SÉANCE CONFIRMÉE</Typography>
                    <Typography variant="span" className="font-black text-brand-black uppercase tracking-[0.2em] text-[10px]">PARIS • 2026</Typography>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-12 w-full">
                <Button
                  variant="luxury"
                  size="lg"
                  className="px-32 h-24 text-sm tracking-[0.5em] border-[0.5px] border-brand-gold/40 group overflow-hidden relative shadow-luxury"
                  onClick={() => toast.success("Le rituel est officiellement scellé.")}
                >
                   <span className="relative z-10 text-white">SCELLER MON EXPÉRIENCE</span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury" />
                </Button>

                <button onClick={() => setStep(0)} className="text-brand-black/20 hover:text-brand-gold transition-all duration-500 text-[10px] font-black uppercase tracking-[0.8em] cursor-pointer hover:tracking-[1em] py-4">
                  ANNULER LE CÉRÉMONIAL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
