"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  History,
  TrendingUp,
  Filter,
  X,
  Mail,
  Phone,
  ArrowRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ClientProfile } from "@/lib/types";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicClients, setDynamicClients] = useState<ClientProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchClients = useCallback(async () => {
    const { data: appointments } = await supabase
      .from('appointments')
      .select('*');

    if (appointments) {
      const clientsMap = new Map<string, ClientProfile>();

      appointments.forEach((apt) => {
        const email = apt.client_email || apt.client_phone || 'inconnu';
        if (!clientsMap.has(email)) {
          clientsMap.set(email, {
            id: apt.id,
            name: apt.client_name,
            email: apt.client_email,
            phone: apt.client_phone,
            visits: 0,
            spentValue: 0,
            rating: 5.0,
            status: "Nouveau",
            spent: "0€"
          });
        }

        const client = clientsMap.get(email)!;
        client.visits += 1;
        client.spentValue += Number(apt.price || 0);

        if (client.visits >= 10) client.status = "Vip";
        else if (client.visits >= 3) client.status = "Régulier";
      });

      const formattedClients = Array.from(clientsMap.values()).map(c => ({
        ...c,
        spent: `${c.spentValue}€`
      }));

      setDynamicClients(formattedClients);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchClients(), 0);
    return () => clearTimeout(timer);
  }, [fetchClients]);

  const filteredClients = dynamicClients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (c.phone?.includes(searchTerm) ?? false)
  );

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const newApt = {
      client_name: formData.get("name") as string,
      client_email: formData.get("email") as string,
      client_phone: formData.get("phone") as string,
      service_name: "Inscription",
      appointment_date: new Date().toISOString().split('T')[0],
      appointment_time: "00:00",
      price: 0,
      status: "confirmed"
    };

    const { error } = await supabase
      .from('appointments')
      .insert([newApt]);

    if (error) {
      toast.error("Erreur: " + error.message);
    } else {
      fetchClients();
      setIsModalOpen(false);
      toast.success("Nouvelle cliente enregistrée.");
    }
    setIsSubmitting(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
        <div>
          <Typography variant="h3" serif className="text-brand-ivory mb-1 text-balance">Portefeuille Clientes</Typography>
          <Typography variant="p" className="text-xs text-brand-ivory/40 italic font-light tracking-wide text-balance">Gestion de la fidélité et de l&apos;historique premium.</Typography>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => toast.info("Bientôt disponible")} className="bg-white/5 text-brand-ivory/60 px-6 py-3 rounded-2xl font-bold text-[10px] border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all uppercase tracking-widest text-balance">
            <TrendingUp size={14} className="text-brand-gold" /> Stats
          </button>
          <Button variant="luxury" size="default" onClick={() => setIsModalOpen(true)}>
             <Plus className="w-4 h-4 mr-2" /> AJOUTER CLIENTE
          </Button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" />
          <input
            type="text"
            placeholder="Rechercher uma cliente..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 text-sm text-brand-ivory outline-none focus:border-brand-gold/30 focus:bg-white/[0.05] transition-all"
          />
        </div>
        <button onClick={() => toast.info("Filtres em breve")} className="px-8 py-5 bg-white/5 rounded-[2rem] border border-white/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-ivory/40 hover:text-brand-ivory transition-all">
          <Filter size={16} /> Filtres
        </button>
      </div>

      <div className="glass-luxury rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto text-balance">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold text-balance text-balance">Informations</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold text-balance text-balance">Statut</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold hidden md:table-cell text-center text-balance text-balance text-balance">Visites</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold hidden md:table-cell text-right text-balance text-balance text-balance">Fidélité</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold text-balance text-balance">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-white/5"
            >
              {paginatedClients.map((client) => (
                <motion.tr
                  key={client.id}
                  variants={rowVariants}
                  className="hover:bg-brand-gold/[0.02] transition-colors group cursor-default"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-black border border-brand-gold/10 flex items-center justify-center font-black text-brand-gold shadow-lg group-hover:border-brand-gold transition-all duration-500 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <Typography variant="h4" serif className="text-lg relative z-10">{client.name ? client.name[0] : '?'}</Typography>
                      </div>
                      <div>
                        <Typography variant="h4" serif className="text-lg group-hover:text-brand-gold transition-colors duration-500">{client.name}</Typography>
                        <div className="flex items-center gap-4 text-[9px] text-brand-ivory/30 uppercase tracking-widest mt-0.5">
                           <span className="flex items-center gap-1.5"><Mail size={10} className="text-brand-gold/40" /> {client.email || "—"}</span>
                           <span className="flex items-center gap-1.5"><Phone size={10} className="text-brand-gold/40" /> {client.phone || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border shadow-sm",
                      client.status === "Vip" ? "bg-brand-gold text-brand-black border-brand-gold shadow-brand-gold/20" :
                      client.status === "Régulier" ? "bg-white/5 text-brand-ivory border-white/10" : "bg-white/5 text-brand-gold border-brand-gold/20"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center hidden md:table-cell">
                    <Typography variant="span" className="text-sm font-bold text-brand-ivory/60">{client.visits}</Typography>
                  </td>
                  <td className="px-8 py-6 text-right hidden md:table-cell">
                    <Typography variant="h4" serif className="text-brand-gold text-lg">{client.spent}</Typography>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="p-3 text-brand-ivory/20 hover:text-brand-gold transition-all bg-brand-black/40 rounded-xl hover:shadow-lg border border-transparent hover:border-brand-gold/20" title="Historique">
                        <History size={16} />
                      </button>
                      <button className="p-3 text-brand-ivory/20 hover:text-brand-gold transition-all bg-brand-black/40 rounded-xl hover:shadow-lg border border-transparent hover:border-brand-gold/20">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-8 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
        <Typography variant="label" className="text-[7px] opacity-30 uppercase">
          {paginatedClients.length} SUR {filteredClients.length} CLIENTES AFFICHÉES
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-6 border-white/5 hover:border-brand-gold/30"
          >
            PRÉCÉDENT
          </Button>
          <Button
            variant="luxury"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredClients.length / itemsPerPage), p + 1))}
            disabled={currentPage >= Math.ceil(filteredClients.length / itemsPerPage) || filteredClients.length === 0}
            className="px-6"
          >
            SUIVANT
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="relative w-full max-w-md glass-luxury border border-brand-gold/20 rounded-[4rem] p-10 md:p-14 shadow-2xl overflow-hidden text-balance text-balance"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                   <Typography variant="h3" serif className="text-brand-ivory mb-1 text-balance">Nouvelle Cliente</Typography>
                   <Typography variant="label" className="text-brand-gold text-balance text-balance">AJOUT MANUEL</Typography>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-brand-gold">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <Typography variant="label" className="px-2 text-balance">Nom Complet</Typography>
                  <input required name="name" type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                </div>
                <div className="space-y-3">
                  <Typography variant="label" className="px-2 text-balance">Email</Typography>
                  <input name="email" type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                </div>
                <div className="space-y-3">
                  <Typography variant="label" className="px-2 text-balance">Téléphone</Typography>
                  <input required name="phone" type="tel" className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm outline-none focus:border-brand-gold/40 focus:bg-white/[0.05] transition-all text-brand-ivory" />
                </div>
                <Button disabled={isSubmitting} type="submit" variant="luxury" size="lg" className="w-full py-7 group">
                   {isSubmitting ? <Loader2 className="animate-spin" /> : <>ENREGISTRER LA FICHE <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
