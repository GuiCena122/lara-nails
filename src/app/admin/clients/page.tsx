'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  History,
  Filter,
  X,
  Trash2,
  Pencil,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ClientEntry {
  id: string // dedup key
  name: string
  email: string | null
  phone: string | null
  visits: number
  spent: number
  lastVisit: string
  status: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const itemsPerPage = 8

  const fetchClients = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data: appointments, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    if (appointments) {
      const map = new Map<string, ClientEntry>()

      appointments.forEach((apt: any) => {
        const key = apt.client_email || apt.client_phone || apt.client_name || 'inconnu'

        if (!map.has(key)) {
          map.set(key, {
            id: key,
            name: apt.client_name || 'Inconnu',
            email: apt.client_email || null,
            phone: apt.client_phone || null,
            visits: 0,
            spent: 0,
            lastVisit: apt.appointment_date || '',
            status: 'Nouveau',
          })
        }

        const c = map.get(key)!
        c.visits += 1
        c.spent += Number(apt.price || 0)
        if (apt.appointment_date && apt.appointment_date > c.lastVisit) {
          c.lastVisit = apt.appointment_date
        }

        if (c.visits >= 10) c.status = 'Vip'
        else if (c.visits >= 3) c.status = 'Régulier'
      })

      setClients(Array.from(map.values()))
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  // ---- search & pagination ----
  const filtered = clients.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.phone && c.phone.includes(searchTerm))
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  )

  // ---- CRUD ----
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const payload = {
      client_name: formData.get('name') as string,
      client_email: (formData.get('email') as string) || null,
      client_phone: (formData.get('phone') as string) || null,
      service_name: 'Fiche cliente',
      appointment_date: new Date().toISOString().split('T')[0],
      appointment_time: '09:00',
      price: 0,
      status: 'confirmed',
    }

    const { error: insertError } = await supabase.from('appointments').insert([payload])

    if (insertError) {
      toast.error('Erreur: ' + insertError.message)
      return
    }

    setIsModalOpen(false)
    toast.success('Cliente ajoutée avec succès !')
    fetchClients()
  }

  const handleDeleteClient = async (client: ClientEntry) => {
    setMenuOpen(null)

    // Delete all appointments for this client (matched by email, phone, or name)
    let query = supabase.from('appointments').delete()

    if (client.email) {
      query = query.eq('client_email', client.email)
    } else if (client.phone) {
      query = query.eq('client_phone', client.phone)
    } else {
      query = query.eq('client_name', client.name)
    }

    const { error: deleteError } = await query

    if (deleteError) {
      toast.error('Erreur lors de la suppression: ' + deleteError.message)
      return
    }

    toast.success('Cliente et tous ses rendez-vous supprimés.')
    fetchClients()
  }

  // ---- status ----
  const statusClass = (s: string) =>
    s === 'Vip'
      ? 'bg-[#e76f51]/20 text-[#e76f51]'
      : s === 'Régulier'
        ? 'bg-blue-500/10 text-blue-400'
        : 'bg-green-500/10 text-green-400'

  // ---- error state ----
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <AlertTriangle className="w-7 h-7 text-rose-400" />
        <p className="text-gray-400 text-sm">Erreur de connexion</p>
        <p className="text-gray-600 text-xs">{error}</p>
        <button
          onClick={fetchClients}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Gestion des Clientes</h2>
          <p className="text-gray-500 text-sm font-light">
            {clients.length} cliente{clients.length !== 1 ? 's' : ''} enregistrée{clients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter Cliente
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou téléphone..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[#e76f51] transition-all"
          />
        </div>
        <button
          onClick={() => toast.info('Filtres avancés bientôt disponibles')}
          className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-sm font-bold hover:bg-white/10 transition-all text-gray-400"
        >
          <Filter className="w-4 h-4" /> Filtres
        </button>
      </div>

      {/* Table */}
      <div className="glass-dark rounded-[2rem] border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Cliente
                    </th>
                    <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Status
                    </th>
                    <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">
                      Visites
                    </th>
                    <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">
                      Dépenses
                    </th>
                    <th className="px-4 md:px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">
                      Dernière visite
                    </th>
                    <th className="px-4 md:px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-gray-500 text-sm">
                        {searchTerm
                          ? 'Aucune cliente trouvée pour cette recherche.'
                          : 'Aucune cliente enregistrée.'}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((client, i) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-4 md:px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e76f51]/20 to-transparent flex items-center justify-center font-bold text-[#e76f51] border border-[#e76f51]/20 shrink-0 text-sm">
                              {client.name ? client.name[0].toUpperCase() : '?'}
                            </div>
                            <div>
                              <p className="font-bold text-sm mb-0.5 max-w-[140px] md:max-w-none truncate">
                                {client.name}
                              </p>
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-[10px] text-gray-500">
                                {client.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {client.email}
                                  </span>
                                )}
                                {client.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" /> {client.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-5">
                          <span
                            className={cn(
                              'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest whitespace-nowrap',
                              statusClass(client.status)
                            )}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-5 font-medium text-sm hidden md:table-cell">
                          {client.visits}
                        </td>
                        <td className="px-4 md:px-8 py-5 font-bold text-sm text-[#e76f51] hidden md:table-cell">
                          {client.spent} €
                        </td>
                        <td className="px-4 md:px-8 py-5 text-sm text-gray-400 hidden md:table-cell">
                          {client.lastVisit || '—'}
                        </td>
                        <td className="px-4 md:px-8 py-5 text-right">
                          <div className="relative flex justify-end">
                            <button
                              onClick={() =>
                                setMenuOpen(menuOpen === client.id ? null : client.id)
                              }
                              className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {menuOpen === client.id && (
                              <div className="absolute right-0 top-10 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 shadow-xl z-20 min-w-[130px]">
                                <button
                                  onClick={() => {
                                    setMenuOpen(null)
                                    toast.info('Historique détaillé bientôt disponible')
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 rounded-lg transition-all"
                                >
                                  <History className="w-3.5 h-3.5" /> Historique
                                </button>
                                <button
                                  onClick={() => handleDeleteClient(client)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > itemsPerPage && (
              <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Affichage de {paginated.length} sur {filtered.length} clientes
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={safeCurrentPage === 1}
                    className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  <span className="px-3 py-2 text-xs text-gray-500">
                    {safeCurrentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={safeCurrentPage === totalPages}
                    className="px-4 py-2 bg-[#e76f51] rounded-lg text-xs font-bold text-white shadow-lg shadow-[#e76f51]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Nom Complet
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Ex: Clara Dupont"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="clara@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Téléphone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+33 6 00 00 00 00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold shadow-lg shadow-[#e76f51]/20 hover:scale-[1.02] transition-transform"
                >
                  Enregistrer
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
