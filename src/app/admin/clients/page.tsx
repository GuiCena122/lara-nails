"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search,
  Plus,
  History,
  TrendingUp,
  Filter,
  X,
  ChevronRight,
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
      toast.error("Erreur registre: " + error.message);
    } else {
      fetchClients();
      setIsModalOpen(false);
      toast.success("Client inscrit au livre d&apos;or.");
    }
    setIsSubmitting(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-20 text-balance bg-brand-ivory min-h-screen">
      {/* Ledger Header - Light Mode */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-[0.5px] border-black/10 pb-12">
        <div>
          <Typography variant="label" className="text-brand-gold mb-4 block tracking-[0.4em] font-black uppercase">REGISTRE DES CLIENTES</Typography>
          <Typography variant="h1" serif className="text-4xl sm:text-6xl lg:text-8xl tracking-tighter text-brand-black">Le Livre <br /> <span className="gold-text-shine italic">d&apos;Or.</span></Typography>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => toast.info("Statistiques bientôt disponíveis")} className="text-black/20 hover:text-brand-gold transition-colors p-4">
              <TrendingUp size={24} />
           </button>
           <Button variant="luxury" size="default" className="h-14 px-12 border-[0.5px] border-brand-gold/20 group text-white" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-3" /> <span className="tracking-[0.2em]">INSCRIRE</span>
           </Button>
        </div>
      </div>

      {/* Ledger Search Ritual - Light Mode */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" />
          <input
            type="text"
            placeholder="Parcourir por nom ou e-mail..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent border-b-[0.5px] border-black/10 py-4 md:py-5 pl-8 md:pl-10 pr-4 md:pr-6 text-base md:text-xl font-serif italic text-brand-black outline-none focus:border-brand-gold transition-all placeholder:text-black/10"
          />
        </div>
        <button onClick={() => toast.info("Filtres em breve")} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/30 hover:text-brand-black transition-all">
          <Filter size={14} /> FILTRER LE REGISTRE
        </button>
      </div>

      {/* The Gold Ledger (Table) - Light Mode */}
      <div className="bg-white rounded-[2rem] md:rounded-[4rem] border border-black/5 overflow-hidden shadow-sm relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[0.5px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

        <div className="overflow-x-auto text-balance">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-ivory/30 border-b border-black/5">
                <th className="px-4 md:px-10 py-4 md:py-8 text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/60">PRÉFÉRENCES & IDENTITÉ</th>
                <th className="px-4 md:px-10 py-4 md:py-8 text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/60 text-center">STATUT</th>
                <th className="px-4 md:px-10 py-4 md:py-8 text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/60 text-center hidden md:table-cell">SÉANCES</th>
                <th className="px-4 md:px-10 py-4 md:py-8 text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/60 text-right hidden md:table-cell">VALEUR ÉLÉVATION</th>
                <th className="px-4 md:px-10 py-4 md:py-8 text-right text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/60">ACTIONS</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-black/5"
            >
              {paginatedClients.map((client) => (
                <motion.tr
                  key={client.id}
                  variants={rowVariants}
                  className="hover:bg-brand-ivory/50 transition-colors group cursor-default"
                >
                  <td className="px-4 md:px-10 py-4 md:py-10">
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center font-black text-brand-gold bg-white shadow-sm relative overflow-hidden group-hover:border-brand-gold transition-all duration-700">
                         <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <Typography variant="h4" serif className="text-xl relative z-10">{client.name ? client.name[0] : '?'}</Typography>
                      </div>
                      <div>
                        <Typography variant="h4" serif className="text-2xl text-brand-black group-hover:text-brand-gold transition-colors duration-500">{client.name}</Typography>
                        <Typography variant="label" className="text-[7px] opacity-20 block mt-1 tracking-[0.2em] font-black uppercase">{client.email || "ANONYME"}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-10 py-4 md:py-10 text-center">
                    <span className={cn(
                      "text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] border shadow-sm",
                      client.status === "Vip" ? "bg-brand-gold text-white border-brand-gold" : "border-black/10 text-black/40"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-10 py-4 md:py-10 text-center hidden md:table-cell">
                    <Typography variant="span" className="text-lg font-serif italic text-black/60">{client.visits}</Typography>
                  </td>
                  <td className="px-4 md:px-10 py-4 md:py-10 text-right hidden md:table-cell">
                    <Typography variant="h3" serif className="text-brand-gold text-2xl group-hover:scale-110 transition-transform duration-500">{client.spent}</Typography>
                  </td>
                  <td className="px-4 md:px-10 py-4 md:py-10 text-right">
                    <div className="flex justify-end gap-6">
                      <button className="text-black/10 hover:text-brand-gold transition-all" title="Historique">
                        <History size={20} strokeWidth={1.5} />
                      </button>
                      <button className="text-black/10 hover:text-brand-gold transition-all">
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Ledger Pagination - Light Mode */}
        <div className="p-10 border-t border-black/5 flex items-center justify-between bg-brand-ivory/10">
          <Typography variant="label" className="text-[8px] opacity-20 tracking-[0.4em] uppercase font-black">
            PAGE {currentPage} SUR {Math.ceil(filteredClients.length / itemsPerPage)}
          </Typography>
          <div className="flex gap-10">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-[9px] font-black uppercase tracking-[0.3em] text-black/20 hover:text-brand-gold disabled:opacity-0 transition-all"
            >
              PRÉCÉDENT
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredClients.length / itemsPerPage), p + 1))}
              disabled={currentPage >= Math.ceil(filteredClients.length / itemsPerPage) || filteredClients.length === 0}
              className="text-[9px] font-black uppercase tracking-[0.3em] text-black/20 hover:text-brand-gold disabled:opacity-0 transition-all"
            >
              SUIVANT
            </button>
          </div>
        </div>
      </div>

      {/* Gold Register Modal - Light Mode */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-balance">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative w-full max-w-xl bg-white border border-brand-gold/20 rounded-[4rem] p-12 md:p-16 shadow-luxury overflow-hidden text-balance"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none text-balance" />

              <div className="flex items-center justify-between mb-16 relative z-10 text-balance">
                <div>
                   <Typography variant="h3" serif className="text-brand-black mb-2 text-balance">Inscription au Livre</Typography>
                   <Typography variant="label" className="text-brand-gold tracking-[0.3em] text-balance font-black">NOUVEAU PROFIL CLIENTE</Typography>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-black/5 rounded-full hover:bg-white/10 transition-colors text-brand-gold">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="space-y-12 relative z-10 text-balance">
                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase text-balance">NOM ET PRÉNOM</Typography>
                  <input required name="name" type="text" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-2xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black" />
                </div>
                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase text-balance">COORDONNÉES (E-MAIL)</Typography>
                  <input name="email" type="email" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black" />
                </div>
                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase text-balance">TÉLÉPHONE MOBILE</Typography>
                  <input required name="phone" type="tel" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black" />
                </div>
                <Button disabled={isSubmitting} type="submit" variant="luxury" size="lg" className="w-full h-20 group border-[0.5px] border-brand-gold/20 mt-8 text-white">
                   {isSubmitting ? <Loader2 className="animate-spin" /> : <><span className="relative z-10 tracking-[0.3em]">SCELLER LE PROFIL</span><div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
