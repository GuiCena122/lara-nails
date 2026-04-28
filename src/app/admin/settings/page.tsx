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
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Service } from "@/lib/types";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("salon");
  const [services, setServices] = useState<Service[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const supabase = createClient();

  const tabs = [
    { id: "salon", label: "Studio", icon: Store },
    { id: "services", label: "Prestations", icon: Sparkles },
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Sécurité", icon: Lock },
  ];

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
    } else {
      if (data) setServices([...services, data[0] as Service]);
      setIsServiceModalOpen(false);
      toast.success("Prestation ajoutée au catalogue.");
    }
  };

  const handleDeleteService = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      setServices(services.filter(s => s.id !== id));
      toast.success("Prestation supprimée.");
    }
  };

  const handleSave = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: 'Enregistrement des modifications...',
      success: 'Configurations mises à jour avec succès.',
      error: 'Une erreur est survenue.',
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
        <div>
          <Typography variant="h3" serif className="text-brand-ivory mb-1 text-balance">Paramètres du Studio</Typography>
          <Typography variant="p" className="text-xs text-brand-ivory/40 italic font-light tracking-wide">Configurez votre identité et vos services premium.</Typography>
        </div>
        <Button variant="luxury" size="default" onClick={handleSave} className="group shadow-xl">
           <Save className="w-4 h-4 mr-2" /> SAUVEGARDER
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="glass-luxury p-5 rounded-[2.5rem] border border-white/5 sticky top-32">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                      isActive
                        ? "bg-brand-gold text-brand-black shadow-brand-gold/20 shadow-lg"
                        : "text-brand-ivory/40 hover:text-brand-ivory hover:bg-white/[0.03]"
                    )}
                  >
                    <tab.icon size={18} className={cn("transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                    <Typography variant="span" className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {tab.label}
                    </Typography>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-12">
          {activeTab === "salon" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="glass-luxury p-10 md:p-14 rounded-[4rem] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-8 mb-12 pb-12 border-b border-white/5 relative z-10">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-3xl bg-brand-black border border-brand-gold/20 flex items-center justify-center text-4xl font-black text-brand-gold shadow-2xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       L
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-3 bg-brand-gold text-brand-black rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-all border-4 border-brand-black">
                      <Camera size={18} />
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                  <div>
                    <Typography variant="h3" serif className="text-brand-ivory mb-1">Lara Nails Studio</Typography>
                    <Typography variant="label" className="text-brand-gold">IDENTITÉ VISUELLE</Typography>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 relative z-10">
                  <div className="space-y-3">
                    <Typography variant="label" className="px-2">Nom de l&apos;Établissement</Typography>
                    <input type="text" defaultValue="Lara Nails Paris" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-sm text-brand-ivory outline-none focus:border-brand-gold/30 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Typography variant="label" className="px-2">Téléphone Professionnel</Typography>
                    <input type="text" defaultValue="+33 6 12 34 56 78" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-sm text-brand-ivory outline-none focus:border-brand-gold/30 transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Typography variant="label" className="px-2">Adresse du Studio</Typography>
                    <input type="text" defaultValue="12 Avenue de l'Élégance, 75008 Paris" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-sm text-brand-ivory outline-none focus:border-brand-gold/30 transition-all" />
                  </div>
                </div>
              </div>

              <div className="glass-luxury p-10 md:p-14 rounded-[4rem] border border-white/5">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold"><Clock size={20} /></div>
                    <Typography variant="h3" serif className="text-brand-ivory">Horaires d&apos;Ouverture</Typography>
                 </div>

                 <div className="space-y-4">
                   {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                     <div key={day} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:border-brand-gold/20 transition-all">
                       <Typography variant="span" className="text-xs font-bold">{day.toUpperCase()}</Typography>
                       <div className="flex items-center gap-6">
                         {day === "Dimanche" ? (
                           <Typography variant="label" className="text-rose-400/60 font-black">FERMÉ</Typography>
                         ) : (
                           <div className="flex items-center gap-3">
                             <input type="text" defaultValue="09:00" className="w-16 bg-transparent border-b border-white/10 text-center text-[11px] font-black text-brand-gold focus:border-brand-gold outline-none pb-1" />
                             <span className="text-white/10">—</span>
                             <input type="text" defaultValue="19:00" className="w-16 bg-transparent border-b border-white/10 text-center text-[11px] font-black text-brand-gold focus:border-brand-gold outline-none pb-1" />
                           </div>
                         )}
                         <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" defaultChecked={day !== "Dimanche"} className="sr-only peer" />
                           <div className="w-12 h-6 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-brand-gold after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white/10 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-gold/10 border border-white/5"></div>
                         </label>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <div className="flex items-center justify-between px-4">
                <div>
                  <Typography variant="h3" serif className="text-brand-ivory mb-1">Catalogue de Soins</Typography>
                  <Typography variant="label" className="text-brand-gold">GESTION DES PRESTATIONS</Typography>
                </div>
                <Button variant="luxury" size="sm" onClick={() => setIsServiceModalOpen(true)} className="px-8 shadow-xl">
                  <Plus size={14} className="mr-2" /> AJOUTER
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    layoutId={service.id}
                    className="glass-luxury p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:border-brand-gold/30 transition-all duration-500 overflow-hidden relative"
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-lg">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <Typography variant="h4" serif className="text-lg group-hover:text-brand-gold transition-colors duration-500">{service.name}</Typography>
                        <div className="flex items-center gap-4 mt-1">
                          <Typography variant="label" className="text-[7px] flex items-center gap-1.5 opacity-30"><Clock size={10} /> {service.duration_minutes} MIN</Typography>
                          <Typography variant="label" className="text-[7px] font-black text-brand-gold">{service.price} €</Typography>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteService(service.id)} className="p-3 text-brand-ivory/10 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-all relative z-10">
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-balance">
                <div className="glass-luxury p-10 md:p-14 rounded-[4rem] border border-white/5 text-center">
                   <div className="w-20 h-20 rounded-3xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center mx-auto mb-8 text-brand-gold shadow-xl">
                      <ShieldCheck size={32} />
                   </div>
                   <Typography variant="h3" serif className="text-brand-ivory mb-3">Sécurité du Compte</Typography>
                   <Typography variant="p" className="text-sm text-brand-ivory/40 max-w-sm mx-auto italic mb-10 text-balance">
                      Gérez vos accès et la protection de vos données confidentielles.
                   </Typography>
                   <div className="flex justify-center gap-4">
                      <Button variant="outline">CHANGER LE MOT DE PASSE</Button>
                      <Button variant="outline">DOUBLE AUTHENTIFICATION</Button>
                   </div>
                </div>
             </motion.div>
          )}
        </div>
      </div>

      {/* New Service Modal */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-black/90 backdrop-blur-md" onClick={() => setIsServiceModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-md glass-luxury border border-brand-gold/20 rounded-[4rem] p-10 md:p-14 shadow-2xl overflow-hidden text-balance" >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                  <Typography variant="h3" serif className="text-brand-ivory mb-1 text-balance">Nouveau Soin</Typography>
                  <Typography variant="label" className="text-brand-gold text-balance">CATALOGUE PREMIUM</Typography>
                </div>
                <button onClick={() => setIsServiceModalOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-brand-gold"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddService} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <Typography variant="label" className="px-2 text-balance">Nom de la prestation</Typography>
                  <input required name="name" type="text" placeholder="Ex: Manucure Spa" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Typography variant="label" className="px-2 text-balance">Prix (€)</Typography>
                    <input required name="price" type="number" placeholder="0.00" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                  </div>
                  <div className="space-y-3">
                    <Typography variant="label" className="px-2 text-balance">Durée (min)</Typography>
                    <input required name="duration" type="number" defaultValue="60" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                  </div>
                </div>
                <Button type="submit" variant="luxury" size="lg" className="w-full py-7 group">
                   AJOUTER AU CATALOGUE <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
