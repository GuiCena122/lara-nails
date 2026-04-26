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
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Service } from "@/lib/types";

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
    fetchServices();
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
      toast.success("Prestation ajoutée !");
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
      toast.success("Prestation supprimée");
    }
  };

  const handleSave = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: 'Enregistrement...',
      success: 'Modifications enregistrées !',
      error: 'Erreur',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Paramètres</h2>
          <p className="text-gray-500 text-sm font-light">Gérez votre studio.</p>
        </div>
        <button onClick={handleSave} className="bg-[#e76f51] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all">
          <Save className="w-4 h-4" /> Enregistrer
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 glass-dark p-4 rounded-3xl border border-white/5 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-[#e76f51]/20 text-[#e76f51] border border-[#e76f51]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {activeTab === "salon" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#e76f51] to-[#a67c2e] flex items-center justify-center text-3xl font-bold border-4 border-white/5">L</div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-xl shadow-xl cursor-pointer hover:scale-110 transition-all">
                      <Camera className="w-4 h-4" />
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Lara Nails Studio</h3>
                    <p className="text-sm text-gray-500">Logo e branding</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Nom du Studio</label>
                    <input type="text" defaultValue="Lara Nails" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Téléphone</label>
                    <input type="text" defaultValue="+33 6 12 34 56 78" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Catalogue</h3>
                  <p className="text-sm text-gray-500">Gérez vos prestations</p>
                </div>
                <button onClick={() => setIsServiceModalOpen(true)} className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#e76f51]/20">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="glass-dark p-6 rounded-[1.5rem] border border-white/5 flex items-center justify-between group hover:border-[#e76f51]/30 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#e76f51]/10 flex items-center justify-center text-[#e76f51]"><Sparkles className="w-7 h-7" /></div>
                      <div>
                        <h4 className="font-bold text-lg">{service.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {service.duration_minutes} min</span>
                          <span className="text-xs font-black text-[#e76f51] bg-[#e76f51]/10 px-2 py-0.5 rounded-full uppercase">{service.price} €</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteService(service.id)} className="p-3 text-gray-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsServiceModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-8" >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Nouvelle Prestation</h3>
                <button onClick={() => setIsServiceModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nom</label>
                  <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Prix (€)</label>
                    <input required name="price" type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Durée (min)</label>
                    <input required name="duration" type="number" defaultValue="60" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold">Ajouter</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
