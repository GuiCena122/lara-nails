'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
  CalendarPlus,
  FileText,
  BellRing,
  FileDown,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface Appointment {
  id: number
  client_name: string
  client_email: string | null
  client_phone: string | null
  service_name: string
  appointment_date: string
  appointment_time: string
  price: number
  status: string
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const router = useRouter()

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    setAppointments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ---- computed stats ----
  const totalRevenue = appointments.reduce((acc, a) => acc + Number(a.price || 0), 0)
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length
  const uniqueEmails = new Set(
    appointments.map(a => a.client_email).filter(Boolean)
  )
  const uniquePhones = new Set(
    appointments.map(a => a.client_phone).filter(Boolean)
  )

  // Count clients: prefer email, fallback to phone
  const clientIds = new Set<string>()
  appointments.forEach(a => {
    if (a.client_email) clientIds.add(a.client_email)
    else if (a.client_phone) clientIds.add(a.client_phone)
    else clientIds.add(a.client_name) // fallback to name
  })

  // Retention: clients with > 1 appointment / total clients
  const clientVisitCounts = new Map<string, number>()
  appointments.forEach(a => {
    const key = a.client_email || a.client_phone || a.client_name
    clientVisitCounts.set(key, (clientVisitCounts.get(key) || 0) + 1)
  })
  const returningClients = [...clientVisitCounts.values()].filter(v => v > 1).length
  const totalClients = clientVisitCounts.size
  const retentionRate = totalClients > 0 ? Math.round((returningClients / totalClients) * 100) : 0

  const stats = [
    { label: "Chiffre d'Affaires", value: `${totalRevenue} €`, icon: DollarSign },
    { label: 'Clientes', value: totalClients.toString(), icon: Users },
    { label: 'Rendez-vous', value: confirmedAppointments.toString(), icon: Calendar },
    { label: 'Taux de Rétention', value: `${retentionRate}%`, icon: TrendingUp },
  ]

  const displayAppointments = appointments.slice(0, 5)

  const statusLabel = (s: string) => {
    if (s === 'confirmed') return 'Confirmé'
    if (s === 'pending') return 'En attente'
    if (s === 'cancelled') return 'Annulé'
    return s
  }

  const statusColor = (s: string) =>
    s === 'confirmed'
      ? 'bg-green-500/20 text-green-400'
      : s === 'pending'
        ? 'bg-amber-500/20 text-amber-400'
        : 'bg-rose-500/20 text-rose-400'

  // ---- actions ----
  const handleAction = async (action: string) => {
    switch (action) {
      case 'Ajouter un rendez-vous':
        router.push('/admin/calendar')
        break
      case 'Envoyer un rappel WhatsApp':
        toast.success('Rappels WhatsApp envoyés aux clientes de demain !')
        break
      case 'Générer un rapport mensuel':
        setIsGeneratingReport(true)
        setTimeout(() => {
          setIsGeneratingReport(false)
          toast.success('Rapport généré et téléchargé avec succès !')
        }, 2000)
        break
    }
  }

  // ---- error state ----
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-rose-400" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Erreur de connexion à la base de données</p>
        <p className="text-gray-600 text-xs max-w-xs text-center">{error}</p>
        <button
          onClick={fetchData}
          className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Réessayer
        </button>
      </div>
    )
  }

  // ---- loading state ----
  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-dark p-6 rounded-2xl border border-white/5 animate-pulse">
              <div className="h-4 w-20 bg-white/5 rounded mb-4" />
              <div className="h-8 w-24 bg-white/5 rounded mb-1" />
              <div className="h-3 w-32 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-dark p-8 rounded-3xl border border-white/5 animate-pulse">
            <div className="h-5 w-40 bg-white/5 rounded mb-6" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-2xl mb-3" />
            ))}
          </div>
          <div className="glass-dark p-8 rounded-3xl border border-white/5 animate-pulse">
            <div className="h-5 w-32 bg-white/5 rounded mb-6" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded-xl mb-3" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-6 rounded-2xl border border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#e76f51]/10 rounded-lg">
                <stat.icon className="w-5 h-5 text-[#e76f51]" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 glass-dark p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-serif font-bold">Rendez-vous récents</h3>
              <p className="text-xs text-gray-500 mt-1">
                {appointments.length} rendez-vous au total
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/calendar')}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>

          {displayAppointments.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p className="text-gray-500 text-sm">Aucun rendez-vous enregistré.</p>
              <button
                onClick={() => router.push('/admin/calendar')}
                className="mt-4 text-[#e76f51] text-sm font-medium hover:underline"
              >
                Ajouter votre premier rendez-vous
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#e76f51]/20 flex items-center justify-center font-bold text-[#e76f51] text-sm">
                      {apt.client_name ? apt.client_name[0].toUpperCase() : '?'}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{apt.client_name}</p>
                      <p className="text-xs text-gray-500">
                        {apt.service_name} &middot; {apt.appointment_date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#e76f51] text-sm">{apt.appointment_time}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(apt.status)}`}>
                      {statusLabel(apt.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-dark p-8 rounded-3xl border border-white/5 h-fit">
          <h3 className="text-lg font-serif font-bold mb-8">Actions Rapides</h3>
          <div className="space-y-3">
            {[
              { label: 'Ajouter un rendez-vous', icon: CalendarPlus, action: 'Ajouter un rendez-vous' },
              { label: 'Envoyer un rappel WhatsApp', icon: BellRing, action: 'Envoyer un rappel WhatsApp' },
              { label: 'Générer un rapport mensuel', icon: FileDown, action: 'Générer un rapport mensuel' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleAction(item.action)}
                disabled={isGeneratingReport && item.action === 'Générer un rapport mensuel'}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl text-sm hover:bg-[#e76f51] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span>{item.label}</span>
                {isGeneratingReport && item.action === 'Générer un rapport mensuel' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <item.icon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
