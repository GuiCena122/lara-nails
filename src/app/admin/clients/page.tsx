'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, MoreHorizontal, Mail, Phone, History, X, Trash2, Loader2, AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { statusBadge, statusLabel } from '@/lib/types'

interface ClientEntry { id: string; name: string; email: string | null; phone: string | null; visits: number; spent: number; lastVisit: string; status: string }

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientEntry[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const [menu, setMenu] = useState<string | null>(null)
  const [histClient, setHistClient] = useState<ClientEntry | null>(null)
  const [histAppts, setHistAppts] = useState<any[]>([])
  const [histLoading, setHistLoading] = useState(false)
  const perPage = 8
  const supabase = createClient()

  const fetchClients = useCallback(async () => {
    setLoading(true); setError(null)
    const { data, error: e } = await supabase.from('appointments').select('*').order('appointment_date', { ascending: false })
    if (e) { setError(e.message); setLoading(false); return }
    if (data) {
      const m = new Map<string, ClientEntry>()
      data.forEach((a: any) => {
        const k = a.client_email || a.client_phone || a.client_name || 'inconnu'
        if (!m.has(k)) m.set(k, { id: k, name: a.client_name || 'Inconnu', email: a.client_email, phone: a.client_phone, visits: 0, spent: 0, lastVisit: '', status: 'Nouveau' })
        const c = m.get(k)!; c.visits++; c.spent += Number(a.price || 0)
        if (a.appointment_date > c.lastVisit) c.lastVisit = a.appointment_date
        if (c.visits >= 10) c.status = 'Vip'; else if (c.visits >= 3) c.status = 'Régulier'
      })
      setClients(Array.from(m.values()))
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchClients() }, [fetchClients])

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search))
  const total = Math.max(1, Math.ceil(filtered.length / perPage))
  const safe = Math.min(page, total)
  const paginated = filtered.slice((safe - 1) * perPage, safe * perPage)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const { error: ie } = await supabase.from('appointments').insert([{
      client_name: fd.get('name'), client_email: fd.get('email') || null, client_phone: fd.get('phone') || null,
      service_name: 'Fiche cliente', appointment_date: new Date().toISOString().split('T')[0],
      appointment_time: '09:00', price: 0, status: 'confirmed', notes: 'Enregistrement client',
    }])
    if (ie) { toast.error(ie.message); return }
    setModal(false); toast.success('Cliente ajoutée !'); fetchClients()
  }

  const handleDelete = async (c: ClientEntry) => {
    setMenu(null)
    let q = supabase.from('appointments').delete()
    if (c.email) q = q.eq('client_email', c.email); else if (c.phone) q = q.eq('client_phone', c.phone); else q = q.eq('client_name', c.name)
    const { error: de } = await q
    if (de) { toast.error(de.message); return }
    toast.success('Cliente supprimée.'); fetchClients()
  }

  const openHistory = async (c: ClientEntry) => {
    setMenu(null); setHistClient(c); setHistLoading(true)
    let q = supabase.from('appointments').select('*').order('appointment_date', { ascending: false })
    if (c.email) q = q.eq('client_email', c.email)
    else if (c.phone) q = q.eq('client_phone', c.phone)
    else q = q.eq('client_name', c.name)
    const { data } = await q
    setHistAppts(data || [])
    setHistLoading(false)
  }

  const sClass = (s: string) => s === 'Vip' ? 'bg-[#e76f51]/20 text-[#e76f51]' : s === 'Régulier' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <AlertTriangle className="w-7 h-7 text-rose-400" />
      <p className="text-gray-400 text-sm">Erreur</p>
      <button onClick={fetchClients} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10"><RefreshCw className="w-4 h-4" /> Réessayer</button>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold">Clientes</h2>
          <p className="text-gray-500 text-xs">{clients.length} cliente{clients.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal(true)} className="bg-[#e76f51] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-all"><Plus className="w-4 h-4" /> Ajouter</button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[#e76f51] transition-all" />
      </div>

      <div className="glass-dark rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-500" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Cliente</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Visites</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:table-cell">Dépenses</th>
                    <th className="px-4 md:px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginated.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-16 text-gray-500 text-sm">Aucune cliente.</td></tr>
                  ) : paginated.map((c, i) => (
                    <motion.tr key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02]">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e76f51]/20 to-transparent flex items-center justify-center font-bold text-[#e76f51] border border-[#e76f51]/20 text-sm">{c.name?.[0]?.toUpperCase() || '?'}</div>
                          <div>
                            <p className="font-bold text-sm">{c.name}</p>
                            <div className="flex gap-2 text-[10px] text-gray-500">{c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}{c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4"><span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase', sClass(c.status))}>{c.status}</span></td>
                      <td className="px-4 md:px-6 py-4 font-medium text-sm hidden md:table-cell">{c.visits}</td>
                      <td className="px-4 md:px-6 py-4 font-bold text-sm text-[#e76f51] hidden md:table-cell">{c.spent} €</td>
                      <td className="px-4 md:px-6 py-4 text-right relative">
                        <button onClick={() => setMenu(menu === c.id ? null : c.id)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                        {menu === c.id && (
                          <div className="absolute right-0 top-10 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 shadow-xl z-20 min-w-[130px]">
                            <button onClick={() => openHistory(c)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 rounded-lg"><History className="w-3.5 h-3.5" /> Historique</button>
                            <button onClick={() => handleDelete(c)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-400/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /> Supprimer</button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length > perPage && (
              <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-gray-500">{paginated.length} sur {filtered.length}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safe === 1} className="px-3 py-2 bg-white/5 rounded-lg text-xs text-gray-400 hover:text-white disabled:opacity-50">Précédent</button>
                  <span className="px-2 py-2 text-xs text-gray-500">{safe}/{total}</span>
                  <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={safe === total} className="px-3 py-2 bg-[#e76f51] rounded-lg text-xs font-bold text-white disabled:opacity-50">Suivant</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Nouvelle Cliente</h3>
                <button onClick={() => setModal(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom</label><input required name="name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label><input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label><input name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                <button type="submit" className="w-full py-4 bg-[#e76f51] text-white rounded-xl font-bold hover:scale-[1.02] transition-transform">Enregistrer</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {histClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setHistClient(null); setHistAppts([]) }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold">{histClient.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{histClient.visits} visite{histClient.visits > 1 ? 's' : ''} · {histClient.spent}€</p>
                </div>
                <button onClick={() => { setHistClient(null); setHistAppts([]) }} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-4 h-4" /></button>
              </div>
              {histLoading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-500" /></div>
              ) : histAppts.length === 0 ? (
                <p className="text-center py-12 text-gray-500 text-sm">Aucun rendez-vous trouvé.</p>
              ) : (
                <div className="space-y-3">
                  {histAppts.map((a: any) => (
                    <div key={a.id} className="bg-white/5 rounded-xl p-4 flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{a.service_name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{a.appointment_date} · {a.appointment_time?.slice(0, 5)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#e76f51] text-sm">{a.price} €</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge(a.status)}`}>{statusLabel(a.status)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
