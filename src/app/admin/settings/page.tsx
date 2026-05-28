"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Store,
  Lock,
  Camera,
  Save,
  Clock,
  Sparkles,
  Trash2,
  Plus,
  X,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Service } from "@/lib/types";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

const tabs = [
  { id: "salon", label: "STUDIO", icon: Store },
  { id: "services", label: "PRESTATIONS", icon: Sparkles },
  { id: "profile", label: "PROFIL", icon: User },
  { id: "security", label: "SÉCURITÉ", icon: Lock },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("salon");
  const [services, setServices] = useState<Service[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const fetchServices = useCallback(async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('name');
    if (data) setServices(data as Service[]);
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(() => fetchServices(), 0);
    return () => clearTimeout(timer);
  }, [fetchServices]);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const newService = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      duration_minutes: parseInt(formData.get("duration") as string),
    };

    const { data, error } = await supabase
      .from('services')
      .insert([newService])
      .select();

    if (error) {
      toast.error("Erreur: " + error.message);
    } else if (data) {
      setServices([...services, data[0] as Service]);
      setIsServiceModalOpen(false);
      toast.success("Inscrit au catalogue.");
    }
    setIsSubmitting(false);
  };

  const handleDeleteService = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Erreur de suppression.");
    } else {
      setServices(services.filter(s => s.id !== id));
      toast.success("Effacé du catalogue.");
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-20 text-balance bg-brand-ivory min-h-screen">
      {/* Settings Header - Light Mode */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-[0.5px] border-black/10 pb-12">
        <div>
          <Typography variant="label" className="text-brand-gold mb-4 block tracking-[0.4em] font-black uppercase text-balance">CONFIGURATIONS PLANNER</Typography>
          <Typography variant="h1" serif className="text-4xl sm:text-6xl lg:text-8xl tracking-tighter text-brand-black text-balance">Votre <br /> <span className="gold-text-shine italic text-balance">Identité.</span></Typography>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6 text-balance">
           <Typography variant="label" className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">RÉGLAGES DE PRÉCISION</Typography>
           <Button variant="luxury" size="default" className="h-14 px-8 md:px-12 border-[0.5px] border-brand-gold/20 group text-white whitespace-nowrap" onClick={() => toast.info("Sauvegarde automatique active")}>
              <Save className="w-4 h-4 mr-3" /> <span className="tracking-[0.2em]">SCELLER</span>
           </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16 text-balance">
        {/* Settings Navigation - Light Mode */}
        <div className="lg:col-span-3">
          <div className="space-y-[0.5px] bg-black/5 border-[0.5px] border-black/5 overflow-hidden rounded-[2rem] sticky top-32 shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-8 py-6 bg-white transition-all duration-500 group",
                    isActive ? "bg-brand-ivory" : "hover:bg-brand-ivory/50"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <tab.icon size={16} className={cn("transition-colors duration-500", isActive ? "text-brand-gold" : "text-black/20")} />
                    <Typography variant="span" className={cn("text-[10px] font-black tracking-[0.3em]", isActive ? "text-brand-gold" : "text-black/40")}>
                      {tab.label}
                    </Typography>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-glow-gold" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content - Light Mode */}
        <div className="lg:col-span-9 space-y-20 text-balance">
          <AnimatePresence mode="wait">
            {activeTab === "salon" && (
              <motion.div
                key="salon"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="space-y-12 text-balance"
              >
                <div className="flex flex-col gap-2 text-balance">
                   <Typography variant="label" className="text-brand-gold tracking-[0.4em] font-black uppercase text-balance">ACTE I</Typography>
                   <Typography variant="h2" serif className="text-5xl italic text-brand-black text-balance">L&apos;Établissement</Typography>
                </div>

                <div className="grid gap-12 text-balance">
                   <div className="flex items-center gap-12 pb-12 border-b-[0.5px] border-black/5 text-balance">
                      <div className="relative group">
                         <div className="w-32 h-32 rounded-[2.5rem] bg-white border-[0.5px] border-black/10 flex items-center justify-center text-5xl font-black text-brand-gold shadow-sm relative overflow-hidden transition-all duration-700 group-hover:border-brand-gold">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            L
                         </div>
                         <label className="absolute -bottom-2 -right-2 p-3 bg-brand-gold text-white rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-all border-[4px] border-white">
                            <Camera size={18} />
                            <input type="file" className="hidden" />
                         </label>
                      </div>
                      <div>
                         <Typography variant="h3" serif className="text-brand-black mb-2 text-balance">Signature Visuelle</Typography>
                         <Typography variant="p" className="text-xs text-black/40 italic font-light text-balance leading-relaxed">Le sceau de votre studio à Paris.</Typography>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 text-balance">
                      <div className="space-y-4 text-balance">
                         <Typography variant="label" className="px-2 font-black uppercase text-balance">NOM DU STUDIO</Typography>
                         <input type="text" defaultValue="Lara Nails Paris" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance" />
                      </div>
                      <div className="space-y-4 text-balance">
                         <Typography variant="label" className="px-2 font-black uppercase text-balance">CONTACT PRIVÉ</Typography>
                         <input type="text" defaultValue="+33 6 12 34 56 78" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance" />
                      </div>
                      <div className="md:col-span-2 space-y-4 text-balance">
                         <Typography variant="label" className="px-2 font-black uppercase text-balance text-balance">ADRESSE ÉDITORIALE</Typography>
                         <input type="text" defaultValue="12 Avenue de l'Élégance, 75008 Paris" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance text-balance" />
                      </div>
                   </div>
                </div>

                <div className="pt-20 text-balance">
                   <div className="flex flex-col gap-2 mb-12 text-balance text-balance">
                      <Typography variant="label" className="text-brand-gold tracking-[0.4em] font-black uppercase text-balance">ACTE II</Typography>
                      <Typography variant="h2" serif className="text-5xl italic text-brand-black text-balance">Disponibilités</Typography>
                   </div>
                   <div className="space-y-[0.5px] bg-black/5 border-[0.5px] border-black/5 rounded-[3rem] overflow-hidden shadow-sm text-balance">
                      {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                        <div key={day} className="bg-white p-8 flex items-center justify-between group hover:bg-brand-ivory transition-all duration-500">
                           <Typography variant="span" className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase text-balance">{day}</Typography>
                           <div className="flex items-center gap-10">
                              {day === "Dimanche" ? (
                                <Typography variant="label" className="text-rose-400/40 italic font-black uppercase text-balance">Fermeture Hebdomadaire</Typography>
                              ) : (
                                <div className="flex items-center gap-4">
                                   <input type="text" defaultValue="09:00" className="w-16 bg-transparent border-b-[0.5px] border-white/10 text-center text-[11px] font-black text-brand-gold focus:border-brand-gold outline-none pb-1" />
                                   <span className="text-black/5">—</span>
                                   <input type="text" defaultValue="19:00" className="w-16 bg-transparent border-b-[0.5px] border-white/10 text-center text-[11px] font-black text-brand-gold focus:border-brand-gold outline-none pb-1" />
                                </div>
                              )}
                              <div className="w-10 h-6 bg-black/5 rounded-full relative border-[0.5px] border-black/5 cursor-pointer">
                                 <div className={cn("absolute top-1 left-1 w-3.5 h-3.5 rounded-full transition-all duration-500", day === "Dimanche" ? "bg-black/10" : "bg-brand-gold translate-x-4 shadow-glow-gold")} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 text-balance"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 text-balance">
                   <div>
                      <Typography variant="label" className="text-brand-gold tracking-[0.4em] font-black uppercase text-balance">ACTE III</Typography>
                      <Typography variant="h2" serif className="text-5xl italic text-brand-black text-balance">Le Catalogue</Typography>
                   </div>
                   <Button variant="luxury" size="sm" className="px-10 h-14 border-[0.5px] border-brand-gold/20 group text-white" onClick={() => setIsServiceModalOpen(true)}>
                      <Plus size={14} className="mr-3" /> <span className="tracking-[0.2em]">AJOUTER</span>
                   </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-balance text-balance">
                   {services.map((service) => (
                     <div key={service.id} className="p-10 border-[0.5px] border-black/5 rounded-[3rem] bg-white hover:border-brand-gold/20 transition-all duration-700 group relative overflow-hidden shadow-sm hover:shadow-xl text-balance">
                        <div className="flex justify-between items-start mb-8 relative z-10 text-balance text-balance">
                           <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 border-[0.5px] border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700 shadow-sm">
                              <Sparkles size={24} strokeWidth={1} />
                           </div>
                           <button onClick={() => handleDeleteService(service.id)} className="p-3 text-black/10 hover:text-rose-400 transition-colors">
                              <Trash2 size={16} />
                           </button>
                        </div>
                        <Typography variant="h4" serif className="text-2xl text-brand-black group-hover:text-brand-gold transition-colors duration-500 mb-2 text-balance">{service.name}</Typography>
                        <div className="flex items-center gap-6 relative z-10 text-balance">
                           <Typography variant="label" className="text-[8px] opacity-30 flex items-center gap-2 font-black tracking-[0.2em] uppercase"><Clock size={10} /> {service.duration_minutes} MIN</Typography>
                           <div className="h-[0.5px] w-8 bg-brand-gold/20" />
                           <Typography variant="h4" serif className="text-brand-gold text-xl font-black">{service.price} €</Typography>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 text-balance"
              >
                <div className="flex flex-col gap-2 mb-12 text-balance text-balance">
                   <Typography variant="label" className="text-brand-gold tracking-[0.4em] font-black uppercase text-balance">ACTE IV</Typography>
                   <Typography variant="h2" serif className="text-5xl italic text-brand-black text-balance">Protection</Typography>
                </div>

                <div className="p-20 bg-white border-[0.5px] border-black/5 rounded-[4rem] text-center max-w-2xl mx-auto shadow-sm text-balance">
                   <div className="w-24 h-24 rounded-full border-[0.5px] border-brand-gold/20 flex items-center justify-center mx-auto mb-10 text-brand-gold shadow-glow-gold relative group bg-brand-ivory/20">
                      <ShieldCheck size={40} strokeWidth={1} className="group-hover:scale-110 transition-transform duration-1000" />
                   </div>
                   <Typography variant="h3" serif className="text-brand-black mb-6 italic text-balance">Sceau de Sécurité</Typography>
                   <Typography variant="p" className="text-sm text-black/40 max-w-sm mx-auto italic mb-12 leading-relaxed text-balance text-balance">
                      Gérez vos accès et assurez la confidentialité de votre registre d&apos;excellence.
                   </Typography>
                   <div className="flex flex-col sm:flex-row justify-center gap-6 text-balance text-balance">
                      <Button variant="outline" className="px-10 h-14 border-black/5 hover:border-brand-gold/30">MOT DE PASSE</Button>
                      <Button variant="outline" className="px-10 h-14 border-black/5 hover:border-brand-gold/30">DOUBLE AUTH</Button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Service Modal - Light Mode */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-balance">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={() => setIsServiceModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }} className="relative w-full max-w-xl bg-white border border-brand-gold/20 rounded-[4rem] p-12 md:p-16 shadow-luxury overflow-hidden text-balance" >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none text-balance" />
              <div className="flex items-center justify-between mb-16 relative z-10 text-balance text-balance">
                <div>
                  <Typography variant="h3" serif className="text-brand-black mb-2 text-balance">Nouvel Acte</Typography>
                  <Typography variant="label" className="text-brand-gold tracking-[0.3em] font-black uppercase text-balance text-balance text-balance">INSCRIPTION CATALOGUE</Typography>
                </div>
                <button onClick={() => setIsServiceModalOpen(false)} className="p-3 bg-black/5 rounded-full hover:bg-white/10 transition-colors text-brand-gold"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddService} className="space-y-12 relative z-10 text-balance text-balance">
                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase text-balance">NOM DU SOIN</Typography>
                  <input required name="name" type="text" placeholder="Ex: Manucure Russe" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-2xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance" />
                </div>
                <div className="grid grid-cols-2 gap-12 text-balance text-balance">
                  <div className="space-y-4 text-balance text-balance">
                    <Typography variant="label" className="px-2 font-black uppercase text-balance">PRIX (€)</Typography>
                    <input required name="price" type="number" placeholder="0.00" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance" />
                  </div>
                  <div className="space-y-4 text-balance text-balance">
                    <Typography variant="label" className="px-2 font-black uppercase text-balance">DURÉE (MIN)</Typography>
                    <input required name="duration" type="number" defaultValue="60" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black text-balance" />
                  </div>
                </div>
                <Button type="submit" variant="luxury" size="lg" className="w-full h-20 group border-[0.5px] border-brand-gold/20 mt-8 text-white">
                   <span className="relative z-10 tracking-[0.4em]">SCELLER NO CATALOGUE</span>
                   <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
