'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Plus, Clock, User, MoreVertical,
  Calendar as CalendarIcon, X, Trash2, Pencil,
  Loader2, AlertTriangle, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Appointment, statusBadge, statusLabel, statusBorder } from '@/lib/types'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const STAFF_NAME = 'Lara Cristina'
const DEFAULT_DURATION = '60m'
const CATEGORIES = ['Tradicional', 'Aplicação', 'Manutenção', 'Alongamento', 'Outros']

export default function CalendarPage() {
  const t = new Date()
  const [month, setMonth] = useState(t.getMonth())
  const [year, setYear] = useState(t.getFullYear())
  const [day, setDay] = useState(t.getDate())
  const [appts, setAppts] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Appointment | null>(null)
  const [menu, setMenu] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [formPrice, setFormPrice] = useState('0')
  const [serviceList, setServiceList] = useState<{name: string; price: number; category: string}[]>([])
  const supabase = createClient()

  useEffect(() => {
    supabase.from('services').select('name,price,category').eq('active', true).order('category').order('name').then(({ data }) => {
      if (data) setServiceList(data)
    })
  }, [supabase])

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7

  const fetchAppts = useCallback(async () => {
    setLoading(true); setError(null)
    const { data, error: e } = await supabase.from('appointments').select('*').order('appointment_time')
    if (e) { setError(e.message); setLoading(false); return }
    setAppts(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchAppts() }, [fetchAppts])

  const dateStr = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const onDay = (d: number) => appts.filter(a => a.appointment_date === dateStr(d))
  const hasOnDay = (d: number) => onDay(d).length > 0
  const dayAppts = onDay(day)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1); setDay(1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1); setDay(1) }

  const getServicePrice = (name: string) => serviceList.find(s => s.name === name)?.price || 0

  const openNew = () => { setEditing(null); setFormPrice('0'); setModal(true) }
  const openEdit = (a: Appointment) => { setEditing(a); setFormPrice(String(a.price || 0)); setMenu(null); setModal(true) }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const fd = new FormData(e.target as HTMLFormElement)
    const payload = {
      client_name: fd.get('client_name') as string,
      client_email: (fd.get('client_email') as string) || null,
      client_phone: (fd.get('client_phone') as string) || null,
      service_name: fd.get('service_name') as string,
      appointment_date: editing ? editing.appointment_date : dateStr(day),
      appointment_time: fd.get('appointment_time') as string,
      price: Number(fd.get('price')) || 0,
      status: (fd.get('status') as string) || 'confirmed',
      payment_type: (fd.get('payment_type') as string) || 'à vista',
    }

    if (editing) {
      const { error: ue } = await supabase.from('appointments').update(payload).eq('id', editing.id)
      if (ue) { toast.error(ue.message); setSaving(false); return }
      toast.success('Rendez-vous modifié !')
    } else {
      const { error: ie } = await supabase.from('appointments').insert([payload])
      if (ie) { toast.error(ie.message); setSaving(false); return }
      toast.success('Rendez-vous ajouté !')
    }
    setSaving(false); setModal(false); setEditing(null); fetchAppts()
  }

  const handleDelete = async (id: number) => {
    setMenu(null)
    const { error: de } = await supabase.from('appointments').delete().eq('id', id)
    if (de) { toast.error(de.message); return }
    toast.success('Rendez-vous supprimé.'); fetchAppts()
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <AlertTriangle className="w-7 h-7 text-rose-400" />
        <p className="text-gray-400 text-sm">Erreur</p>
        <button onClick={fetchAppts} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10">
          <RefreshCw className="w-4 h-4" /> Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold">Calendrier</h2>
          <p className="text-gray-500 text-xs">Gérez votre emploi du temps.</p>
        </div>
        <button onClick={openNew} className="bg-[#e76f51] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-all self-start">
          <Plus className="w-4 h-4" /> Nouveau RDV
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Mini Calendar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-dark p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">{MONTHS[month]} {year}</h3>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={nextMonth} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {DAYS.map(d => <span key={d} className="text-[10px] font-bold text-gray-500">{d[0]}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} className="aspect-square" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1
                const sel = day === d
                const has = hasOnDay(d)
                const today = d === t.getDate() && month === t.getMonth() && year === t.getFullYear()
                return (
                  <button key={d} onClick={() => setDay(d)} className={cn(
                    'aspect-square rounded-lg text-[10px] font-bold transition-all flex items-center justify-center relative',
                    sel ? 'bg-[#e76f51] text-white' : today ? 'text-[#e76f51] ring-1 ring-[#e76f51]/30' : 'text-gray-400 hover:bg-white/5',
                    has && !sel && 'text-[#e76f51]'
                  )}>
                    {d}
                    {has && <span className={cn('absolute bottom-0.5 w-1 h-1 rounded-full', sel ? 'bg-white' : 'bg-[#e76f51]')} />}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="glass-dark p-5 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Légende</h4>
            {[{ label: 'Confirmé', color: 'bg-green-500' }, { label: 'En attente', color: 'bg-amber-500' }, { label: 'Annulé', color: 'bg-rose-500' }].map(l => (
              <div key={l.label} className="flex items-center gap-3 py-1"><div className={cn('w-2 h-2 rounded-full', l.color)} /> <span className="text-xs text-gray-400">{l.label}</span></div>
            ))}
          </div>
        </div>

        {/* Day Detail */}
        <div className="lg:col-span-3 glass-dark rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e76f51]/10 flex items-center justify-center text-[#e76f51]"><CalendarIcon className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-sm">{day} {MONTHS[month]} {year}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{dayAppts.length} rendez-vous</p>
              </div>
            </div>
            <button onClick={openNew} className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg"><Plus className="w-4 h-4" /></button>
          </div>

          <div className="flex-1 p-4 md:p-6 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-500" /></div>
            ) : dayAppts.length > 0 ? dayAppts.map((a) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-4 group">
                <div className="text-right w-14 pt-1 shrink-0">
                  <p className="font-bold text-sm">{a.appointment_time?.slice(0, 5)}</p>
                  <p className="text-[10px] text-gray-500">{DEFAULT_DURATION}</p>
                </div>
                <div className="flex-1 relative pb-4 border-l-2 border-[#e76f51]/20 pl-4 md:pl-6 group-last:border-transparent">
                  <div className={cn('absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-[#251f1f]', a.status === 'confirmed' ? 'bg-green-500' : a.status === 'pending' ? 'bg-amber-400' : 'bg-rose-400')} />
                  <div className={cn('bg-white/5 hover:bg-white/10 transition-all rounded-2xl p-4 border border-white/5 group-hover:border-[#e76f51]/30 border-l-4', statusBorder(a.status))}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-sm mb-1">{a.client_name}</h4>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mr-2', statusBadge(a.status))}>{statusLabel(a.status)}</span>
                        <span className="text-[10px] font-bold bg-[#e76f51]/20 text-[#e76f51] px-2 py-0.5 rounded-full uppercase">{a.service_name}</span>
                        {a.payment_type && a.payment_type !== 'à vista' && (
                          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase">{a.payment_type}</span>
                        )}
                      </div>
                      <div className="relative">
                        <button onClick={() => setMenu(menu === a.id ? null : a.id)} className="p-1.5 text-gray-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        {menu === a.id && (
                          <div className="absolute right-0 top-8 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 shadow-xl z-20 min-w-[120px]">
                            <button onClick={() => openEdit(a)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 rounded-lg"><Pencil className="w-3.5 h-3.5" /> Modifier</button>
                            <button onClick={() => handleDelete(a.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-400/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /> Supprimer</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.appointment_time?.slice(0, 5)}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {STAFF_NAME}</span>
                      {a.price > 0 && <span className="font-bold text-[#e76f51]">{a.price} €</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-600">
                <CalendarIcon className="w-12 h-12 mb-3" />
                <p className="font-serif italic text-sm">Aucun rendez-vous.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setModal(false); setEditing(null) }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">{editing ? 'Modifier' : 'Nouveau'} RDV</h3>
                <button onClick={() => { setModal(false); setEditing(null) }} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom de la cliente</label>
                  <input required name="client_name" defaultValue={editing?.client_name || ''} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input name="client_email" defaultValue={editing?.client_email || ''} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
                    <input name="client_phone" defaultValue={editing?.client_phone || ''} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Prestation</label>
                  <select name="service_name" defaultValue={editing?.service_name || (serviceList[0]?.name || '')} onChange={e => setFormPrice(String(getServicePrice(e.target.value)))} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]">
                    {CATEGORIES.map(cat => {
                      const items = serviceList.filter(s => s.category === cat)
                      if (!items.length) return null
                      return (
                        <optgroup key={cat} label={cat}>
                          {items.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </optgroup>
                      )
                    })}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</label>
                    <input disabled value={editing ? editing.appointment_date : `${day} ${MONTHS[month]} ${year}`} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none text-gray-400 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heure</label>
                    <input required name="appointment_time" type="time" defaultValue={editing?.appointment_time?.slice(0, 5) || '14:00'} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Prix €</label>
                    <input name="price" type="number" min="0" step="0.01" value={formPrice} onChange={e => setFormPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Statut</label>
                  <select name="status" defaultValue={editing?.status || 'confirmed'} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]">
                    <option value="confirmed">Confirmé</option><option value="pending">En attente</option><option value="cancelled">Annulé</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Paiement</label>
                  <select name="payment_type" defaultValue={editing?.payment_type || 'à vista'} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]">
                    <option value="à vista">À vista</option><option value="fiado">Fiado</option><option value="parcelado">Parcelado</option>
                  </select>
                </div>
                <button type="submit" disabled={saving} className="w-full py-4 bg-[#e76f51] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editing ? 'Enregistrer' : 'Confirmer le RDV'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
