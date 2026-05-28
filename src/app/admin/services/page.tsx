'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface Service {
  id: number
  name: string
  price: number
  category: string
  active: boolean
}

const CATEGORIES = ['Tradicional', 'Aplicação', 'Manutenção', 'Alongamento', 'Outros']

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchServices = useCallback(async () => {
    setLoading(true); setError(null)
    const { data, error: e } = await supabase.from('services').select('*').order('category').order('name')
    if (e) { setError(e.message); setLoading(false); return }
    setServices(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchServices() }, [fetchServices])

  const openNew = () => { setEditing(null); setModal(true) }
  const openEdit = (s: Service) => { setEditing(s); setModal(true) }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const fd = new FormData(e.target as HTMLFormElement)
    const payload = {
      name: fd.get('name') as string,
      price: Number(fd.get('price')) || 0,
      category: fd.get('category') as string,
      active: fd.get('active') === 'true',
    }

    if (editing) {
      const { error: ue } = await supabase.from('services').update(payload).eq('id', editing.id)
      if (ue) { toast.error(ue.message); setSaving(false); return }
      toast.success('Service modifié !')
    } else {
      const { error: ie } = await supabase.from('services').insert([payload])
      if (ie) { toast.error(ie.message); setSaving(false); return }
      toast.success('Service ajouté !')
    }
    setSaving(false); setModal(false); setEditing(null); fetchServices()
  }

  const handleDelete = async (id: number) => {
    const { error: de } = await supabase.from('services').delete().eq('id', id)
    if (de) { toast.error(de.message); return }
    toast.success('Service supprimé.'); fetchServices()
  }

  const grouped = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, Service[]>)

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <AlertTriangle className="w-7 h-7 text-rose-400" />
      <p className="text-gray-400 text-sm">Erreur</p>
      <button onClick={fetchServices} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10"><RefreshCw className="w-4 h-4" /> Réessayer</button>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold">Services</h2>
          <p className="text-gray-500 text-xs">{services.length} prestations</p>
        </div>
        <button onClick={openNew} className="bg-[#e76f51] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-all"><Plus className="w-4 h-4" /> Ajouter</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-500" /></div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map(cat => {
            const items = grouped[cat]
            if (!items?.length) return null
            return (
              <div key={cat} className="glass-dark rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-6 py-4 bg-white/5 border-b border-white/5">
                  <h3 className="font-bold text-sm text-[#e76f51] uppercase tracking-widest">{cat}</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {items.map(s => (
                    <div key={s.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#e76f51]/10 flex items-center justify-center text-[#e76f51]"><Sparkles className="w-4 h-4" /></div>
                        <div>
                          <p className={cn('font-medium text-sm', !s.active && 'line-through text-gray-500')}>{s.name}</p>
                          {!s.active && <span className="text-[10px] text-gray-600">Inactif</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-[#e76f51] text-sm">{s.price} €</span>
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(s)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setModal(false); setEditing(null) }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">{editing ? 'Modifier' : 'Nouveau'} Service</h3>
                <button onClick={() => { setModal(false); setEditing(null) }} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom</label>
                  <input required name="name" defaultValue={editing?.name || ''} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Prix (€)</label>
                    <input required name="price" type="number" min="0" step="0.01" defaultValue={editing?.price || 0} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Catégorie</label>
                    <select name="category" defaultValue={editing?.category || 'Outros'} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Statut</label>
                  <select name="active" defaultValue={editing ? String(editing.active) : 'true'} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]">
                    <option value="true">Actif</option><option value="false">Inactif</option>
                  </select>
                </div>
                <button type="submit" disabled={saving} className="w-full py-4 bg-[#e76f51] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editing ? 'Enregistrer' : 'Ajouter le service'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
