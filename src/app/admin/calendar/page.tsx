'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  MoreVertical,
  Calendar as CalendarIcon,
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

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

interface Appointment {
  id: number
  client_name: string
  client_email: string | null
  client_phone: string | null
  service_name: string
  appointment_date: string
  appointment_time: string
  price: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApt, setEditingApt] = useState<Appointment | null>(null)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  // ---- month navigation ----
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7 // make Monday=0

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
    setSelectedDay(1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
    setSelectedDay(1)
  }

  // ---- data ----
  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_time', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    setAppointments(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  // ---- derived data ----
  const appointmentsOnDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(a => a.appointment_date === dateStr)
  }

  const hasAppointmentOnDay = (day: number) => {
    return appointmentsOnDay(day).length > 0
  }

  const dayAppointments = appointmentsOnDay(selectedDay)

  const formattedDate = (day: number) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // ---- CRUD ----
  const openNewModal = () => {
    setEditingApt(null)
    setIsModalOpen(true)
  }

  const openEditModal = (apt: Appointment) => {
    setEditingApt(apt)
    setMenuOpen(null)
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const dateStr = editingApt
      ? editingApt.appointment_date
      : formattedDate(selectedDay)

    const payload = {
      client_name: formData.get('client_name') as string,
      client_email: (formData.get('client_email') as string) || null,
      client_phone: (formData.get('client_phone') as string) || null,
      service_name: formData.get('service_name') as string,
      appointment_date: dateStr,
      appointment_time: formData.get('appointment_time') as string,
      price: Number(formData.get('price')) || 0,
      status: (formData.get('status') as string) || 'confirmed',
    }

    if (editingApt) {
      const { error: updateError } = await supabase
        .from('appointments')
        .update(payload)
        .eq('id', editingApt.id)

      if (updateError) {
        toast.error('Erreur lors de la modification: ' + updateError.message)
        setSaving(false)
        return
      }
      toast.success('Rendez-vous modifié avec succès !')
    } else {
      const { error: insertError } = await supabase
        .from('appointments')
        .insert([payload])

      if (insertError) {
        toast.error("Erreur lors de l'ajout: " + insertError.message)
        setSaving(false)
        return
      }
      toast.success('Rendez-vous ajouté avec succès !')
    }

    setSaving(false)
    setIsModalOpen(false)
    setEditingApt(null)
    fetchAppointments()
  }

  const handleDelete = async (id: number) => {
    setMenuOpen(null)
    const { error: deleteError } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (deleteError) {
      toast.error('Erreur lors de la suppression: ' + deleteError.message)
      return
    }
    toast.success('Rendez-vous supprimé.')
    fetchAppointments()
  }

  // ---- status helpers ----
  const statusBorder = (s: string) =>
    s === 'confirmed'
      ? 'border-l-[#4ade80]'
      : s === 'pending'
        ? 'border-l-amber-400'
        : 'border-l-rose-400'

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      confirmed: 'bg-green-500/20 text-green-400',
      pending: 'bg-amber-500/20 text-amber-400',
      cancelled: 'bg-rose-500/20 text-rose-400',
    }
    return map[s] || ''
  }

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      confirmed: 'Confirmé',
      pending: 'En attente',
      cancelled: 'Annulé',
    }
    return map[s] || s
  }

  // ---- error state ----
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <AlertTriangle className="w-7 h-7 text-rose-400" />
        <p className="text-gray-400 text-sm">Erreur de connexion</p>
        <p className="text-gray-600 text-xs">{error}</p>
        <button
          onClick={fetchAppointments}
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
          <h2 className="text-2xl font-serif font-bold">Calendrier des Rendez-vous</h2>
          <p className="text-gray-500 text-sm font-light">Gérez votre emploi du temps en temps réel.</p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" /> Nouveau RDV
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Mini Calendar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-dark p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-sm">
                {MONTHS[currentMonth]} {currentYear}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {DAYS_OF_WEEK.map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-500">
                  {d[0]}
                </span>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isSelected = selectedDay === day
                const hasAppt = hasAppointmentOnDay(day)
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      'aspect-square rounded-lg text-[10px] font-bold transition-all relative flex items-center justify-center',
                      isSelected
                        ? 'bg-[#e76f51] text-white shadow-lg'
                        : isToday
                          ? 'text-[#e76f51] ring-1 ring-[#e76f51]/30'
                          : 'text-gray-400 hover:bg-white/5',
                      hasAppt && !isSelected && 'text-[#e76f51]'
                    )}
                  >
                    {day}
                    {hasAppt && (
                      <span
                        className={cn(
                          'absolute bottom-1 w-1 h-1 rounded-full',
                          isSelected ? 'bg-white' : 'bg-[#e76f51]'
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="glass-dark p-6 rounded-3xl border border-white/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Légende</h4>
            <div className="space-y-3">
              {[
                { label: 'Confirmé', color: 'bg-green-500' },
                { label: 'En attente', color: 'bg-amber-500' },
                { label: 'Annulé', color: 'bg-rose-500' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-3">
                  <div className={cn('w-2 h-2 rounded-full', l.color)} />
                  <span className="text-xs text-gray-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day detail */}
        <div className="lg:col-span-3 glass-dark rounded-[2rem] border border-white/5 overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e76f51]/10 flex items-center justify-center text-[#e76f51]">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">{selectedDay} {MONTHS[currentMonth]} {currentYear}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  {dayAppointments.length} rendez-vous
                </p>
              </div>
            </div>
            <button
              onClick={openNewModal}
              className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 md:p-8 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            ) : dayAppointments.length > 0 ? (
              dayAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="text-right w-16 pt-1 shrink-0">
                    <p className="font-bold text-sm">{apt.appointment_time.slice(0, 5)}</p>
                    <p className="text-[10px] text-gray-500">60m</p>
                  </div>

                  <div className="flex-1 relative pb-6 border-l-2 border-[#e76f51]/20 pl-6 md:pl-8 group-last:border-transparent">
                    <div
                      className={cn(
                        'absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-[#1a1a1a]',
                        apt.status === 'confirmed'
                          ? 'bg-green-500'
                          : apt.status === 'pending'
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                      )}
                    />

                    <div
                      className={cn(
                        'bg-white/5 hover:bg-white/10 transition-all rounded-[1.5rem] p-4 md:p-6 border border-white/5 group-hover:border-[#e76f51]/30 border-l-4',
                        statusBorder(apt.status)
                      )}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                        <div>
                          <h4 className="font-bold text-base md:text-lg mb-1">{apt.client_name}</h4>
                          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase', statusBadge(apt.status))}>
                            {statusLabel(apt.status)}
                          </span>
                          <span className="text-[10px] font-bold bg-[#e76f51]/20 text-[#e76f51] px-2 py-0.5 rounded-full uppercase ml-2">
                            {apt.service_name}
                          </span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpen(menuOpen === apt.id ? null : apt.id)}
                            className="p-2 text-gray-500 hover:text-white transition-all"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {menuOpen === apt.id && (
                            <div className="absolute right-0 top-10 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 shadow-xl z-20 min-w-[120px]">
                              <button
                                onClick={() => openEditModal(apt)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 rounded-lg transition-all"
                              >
                                <Pencil className="w-3.5 h-3.5" /> Modifier
                              </button>
                              <button
                                onClick={() => handleDelete(apt.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Supprimer
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {apt.appointment_time.slice(0, 5)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <User className="w-3.5 h-3.5" /> Lara Nails
                        </div>
                        {apt.price > 0 && (
                          <div className="text-xs font-bold text-[#e76f51]">{apt.price} €</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <CalendarIcon className="w-16 h-16 mb-4 text-gray-600" />
                <p className="font-serif italic text-lg text-gray-500">Aucun rendez-vous pour ce jour.</p>
                <button
                  onClick={openNewModal}
                  className="mt-4 text-[#e76f51] text-sm font-medium hover:underline"
                >
                  + Ajouter un rendez-vous
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Add / Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                setIsModalOpen(false)
                setEditingApt(null)
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">
                  {editingApt ? 'Modifier le Rendez-vous' : 'Nouveau Rendez-vous'}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingApt(null)
                  }}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Nom de la cliente
                  </label>
                  <input
                    required
                    name="client_name"
                    type="text"
                    defaultValue={editingApt?.client_name || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Email
                    </label>
                    <input
                      name="client_email"
                      type="email"
                      defaultValue={editingApt?.client_email || ''}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Téléphone
                    </label>
                    <input
                      name="client_phone"
                      type="tel"
                      defaultValue={editingApt?.client_phone || ''}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Prestation
                  </label>
                  <select
                    required
                    name="service_name"
                    defaultValue={editingApt?.service_name || 'Manucure Russe'}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  >
                    <option>Manucure Russe</option>
                    <option>Gainage & Semi-Permanent</option>
                    <option>Extensions Gel</option>
                    <option>Nail Art</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Date
                    </label>
                    <input
                      disabled
                      type="text"
                      value={
                        editingApt
                          ? editingApt.appointment_date
                          : `${selectedDay} ${MONTHS[currentMonth]} ${currentYear}`
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Heure
                    </label>
                    <input
                      required
                      name="appointment_time"
                      type="time"
                      defaultValue={editingApt?.appointment_time?.slice(0, 5) || '14:00'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Prix (€)
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={editingApt?.price || 0}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Statut
                  </label>
                  <select
                    name="status"
                    defaultValue={editingApt?.status || 'confirmed'}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51] transition-all"
                  >
                    <option value="confirmed">Confirmé</option>
                    <option value="pending">En attente</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 mt-4 bg-[#e76f51] text-white rounded-xl font-bold shadow-lg shadow-[#e76f51]/20 hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingApt ? (
                    'Enregistrer les modifications'
                  ) : (
                    'Confirmer le RDV'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
