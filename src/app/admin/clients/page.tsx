"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Star,
  History,
  TrendingUp,
  Filter,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ClientProfile } from "@/lib/types";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicClients, setDynamicClients] = useState<ClientProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    fetchClients();
  }, [fetchClients]);

  const filteredClients = dynamicClients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (c.phone?.includes(searchTerm) ?? false)
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
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
      return;
    }

    fetchClients();
    setIsModalOpen(false);
    toast.success("Nouvelle cliente ajoutée !");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Gestion des Clientes</h2>
          <p className="text-gray-500 text-sm font-light">Suivez la fidélité et l'historique de vos clientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.info("Statistiques bientôt disponibles")} className="bg-white/5 text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all">
            <TrendingUp className="w-4 h-4 text-[#e76f51]" /> Statistiques
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all">
            <Plus className="w-4 h-4" /> Ajouter Cliente
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[#e76f51] transition-all"
          />
        </div>
        <button onClick={() => toast.info("Filtres em breve")} className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-sm font-bold hover:bg-white/10 transition-all">
          <Filter className="w-4 h-4" /> Filtres
        </button>
      </div>

      <div className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Cliente</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Visites</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Total</th>
                <th className="px-4 md:px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedClients.map((client, i) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-4 md:px-8 py-5">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#e76f51]/20 to-transparent flex items-center justify-center font-bold text-[#e76f51] border border-[#e76f51]/20 shrink-0">
                        {client.name ? client.name[0] : '?'}
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-0.5 truncate">{client.name}</p>
                        <div className="flex flex-col text-[9px] text-gray-500">
                          <span>{client.email}</span>
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-5">
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest",
                      client.status === "Vip" ? "bg-[#e76f51]/20 text-[#e76f51]" :
                      client.status === "Régulier" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5 font-medium text-sm hidden md:table-cell">{client.visits}</td>
                  <td className="px-4 md:px-8 py-5 font-bold text-sm text-[#e76f51] hidden md:table-cell">{client.spent}</td>
                  <td className="px-4 md:px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <History className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-8" >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Nouvelle Cliente</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom Complet</label>
                  <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
                  <input required name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <button type="submit" className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold">Enregistrer</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
