"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Store, 
  Bell, 
  Lock, 
  CreditCard, 
  Globe, 
  Camera,
  Save,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("salon");

  const tabs = [
    { id: "salon", label: "Studio", icon: Store },
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Lock },
    { id: "billing", label: "Paiements", icon: CreditCard },
  ];

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Enregistrement en cours...',
        success: 'Modifications enregistrées avec succès !',
        error: 'Erreur lors de la sauvegarde',
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success("Logo mis à jour !");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Paramètres</h2>
          <p className="text-gray-500 text-sm font-light">Gérez les configurations de votre studio et de votre compte.</p>
        </div>
        <button onClick={handleSave} className="bg-[#e76f51] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all">
          <Save className="w-4 h-4" /> Enregistrer les modifications
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
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

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "salon" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Studio Info */}
              <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#e76f51] to-[#a67c2e] flex items-center justify-center text-3xl font-bold border-4 border-white/5 shadow-2xl">
                      M
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-xl shadow-xl hover:scale-110 transition-all cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Lara Nails Studio</h3>
                    <p className="text-sm text-gray-500">Logo et branding de votre studio</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Nom du Studio</label>
                    <input type="text" defaultValue="Lara Nails" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Téléphone Professionnel</label>
                    <input type="text" defaultValue="+33 6 12 34 56 78" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Adresse</label>
                    <input type="text" defaultValue="12 Rue des Fleurs, 75001 Paris" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all" />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Horaires d'Ouverture</h3>
                    <p className="text-xs text-gray-500">Définissez vos créneaux de disponibilité</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                      <span className="text-sm font-medium">{day}</span>
                      <div className="flex items-center gap-4">
                        {day === "Dimanche" ? (
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Fermé</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input type="text" defaultValue="09:00" className="w-16 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none" />
                            <span className="text-gray-500">-</span>
                            <input type="text" defaultValue="19:00" className="w-16 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none" />
                          </div>
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={day !== "Dimanche"} className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#1a1a1a] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e76f51] peer-checked:after:bg-white"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 text-center py-20"
            >
              <User className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="font-serif italic text-lg text-gray-500">Paramètres de profil bientôt disponibles...</h3>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
