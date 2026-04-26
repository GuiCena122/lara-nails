"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { AnimatePresence } from "framer-motion";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicClients, setDynamicClients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*');
    
    if (appointments) {
      const clientsMap = new Map();
      
      appointments.forEach((apt: any) => {
        const email = apt.client_email || apt.client_phone; // Fallback to phone if no email
        if (!clientsMap.has(email)) {
          clientsMap.set(email, {
            id: apt.id,
            name: apt.client_name,
            email: apt.client_email,
            phone: apt.client_phone,
            visits: 0,
            spentValue: 0,
            rating: 5.0,
            status: "Nouveau"
          });
        }
        
        const client = clientsMap.get(email);
        client.visits += 1;
        client.spentValue += Number(apt.price || 0);
        
        if (client.visits >= 10) client.status = "Vip";
        else if (client.visits >= 3) client.status = "Régulier";
      });

      // Format spent values for display
      const formattedClients = Array.from(clientsMap.values()).map(c => ({
        ...c,
        spent: `${c.spentValue}€`
      }));

      setDynamicClients(formattedClients);
    }
  };

  const filteredClients = dynamicClients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Since clients are derived from appointments in this schema, we insert a placeholder appointment
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
    
    const { data, error } = await supabase
      .from('appointments')
      .insert([newApt])
      .select();
      
    if (error) {
      toast.error("Erreur: " + error.message);
      return;
    }
    
    // Refresh the local client state
    fetchClients();
    
    setIsModalOpen(false);
    toast.success("Nouvelle cliente ajoutée avec succès !");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Gestion des Clientes</h2>
          <p className="text-gray-500 text-sm font-light">Suivez la fidélité et l'historique de vos clientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.info("Fonctionnalité en cours de développement")} className="bg-white/5 text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all">
            <TrendingUp className="w-4 h-4 text-[#e76f51]" /> Statistiques Clientes
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all">
            <Plus className="w-4 h-4" /> Ajouter Cliente
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email ou téléphone..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[#e76f51] transition-all"
          />
        </div>
        <button onClick={() => toast.info("Filtres avancés bientôt disponibles")} className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-sm font-bold hover:bg-white/10 transition-all">
          <Filter className="w-4 h-4" /> Filtres
        </button>
      </div>

      {/* Clients Grid/Table */}
      <div className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Cliente</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Visites</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Dépenses Totales</th>
                <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Note</th>
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
                        <p className="font-bold text-sm mb-0.5 max-w-[120px] md:max-w-none truncate">{client.name}</p>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-[9px] md:text-[10px] text-gray-500">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-5">
                    <span className={cn(
                      "text-[9px] md:text-[10px] font-bold px-2 md:px-2.5 py-1 rounded-full uppercase tracking-widest whitespace-nowrap",
                      client.status === "Vip" ? "bg-[#e76f51]/20 text-[#e76f51]" : 
                      client.status === "Régulier" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5 font-medium text-sm hidden md:table-cell">{client.visits}</td>
                  <td className="px-4 md:px-8 py-5 font-bold text-sm text-[#e76f51] hidden md:table-cell">{client.spent}</td>
                  <td className="px-4 md:px-8 py-5 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{client.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Historique">
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
        <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-gray-500">Affichage de {paginatedClients.length} sur {filteredClients.length} clientes</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 bg-[#e76f51] rounded-lg text-xs font-bold text-white shadow-lg shadow-[#e76f51]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Nouvelle Cliente</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom Complet</label>
                  <input required name="name" type="text" placeholder="Ex: Clara Dupont" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input required name="email" type="email" placeholder="clara@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
                  <input required name="phone" type="tel" placeholder="+33 6 00 00 00 00" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all" />
                </div>

                <button type="submit" className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold shadow-lg shadow-[#e76f51]/20 hover:scale-[1.02] transition-transform">
                  Enregistrer
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
