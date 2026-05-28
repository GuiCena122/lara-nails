'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Store,
  Bell,
  Lock,
  CreditCard,
  Camera,
  Save,
  Clock,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type DaySchedule = { day: string; open: string; close: string; active: boolean }

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: 'Lundi', open: '09:00', close: '19:00', active: true },
  { day: 'Mardi', open: '09:00', close: '19:00', active: true },
  { day: 'Mercredi', open: '09:00', close: '19:00', active: true },
  { day: 'Jeudi', open: '09:00', close: '19:00', active: true },
  { day: 'Vendredi', open: '09:00', close: '19:00', active: true },
  { day: 'Samedi', open: '10:00', close: '17:00', active: true },
  { day: 'Dimanche', open: '—', close: '—', active: false },
]

const tabs = [
  { id: 'salon', label: 'Studio', icon: Store },
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Lock },
  { id: 'billing', label: 'Paiements', icon: CreditCard },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('salon')
  const [studioName, setStudioName] = useState('Lara Nails')
  const [studioPhone, setStudioPhone] = useState('+33 6 12 34 56 78')
  const [studioAddress, setStudioAddress] = useState("12 Avenue de l'Élégance, Paris")
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE)
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Persiste no localStorage como MVP (substituir por Supabase quando tabela existir)
    const settings = { studioName, studioPhone, studioAddress, schedule }
    localStorage.setItem('lara-nails-settings', JSON.stringify(settings))

    setTimeout(() => {
      setSaving(false)
      toast.success('Modifications enregistrées avec succès !')
    }, 600)
  }

  const toggleDay = (idx: number) => {
    setSchedule(prev =>
      prev.map((d, i) => (i === idx ? { ...d, active: !d.active } : d))
    )
  }

  const updateScheduleTime = (idx: number, field: 'open' | 'close', value: string) => {
    setSchedule(prev =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Paramètres</h2>
          <p className="text-gray-500 text-sm font-light">
            Gérez les configurations de votre studio et de votre compte.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#e76f51] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#e76f51]/20 flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Enregistrer les modifications
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Tabs */}
        <div className="lg:col-span-1 glass-dark p-4 rounded-3xl border border-white/5 h-fit">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-[#e76f51]/20 text-[#e76f51] border border-[#e76f51]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* ── Studio Tab ── */}
          {activeTab === 'salon' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#e76f51] to-[#a67c2e] flex items-center justify-center text-3xl font-bold border-4 border-white/5 shadow-2xl">
                      L
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-xl shadow-xl hover:scale-110 transition-all cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={() => toast.success('Logo mis à jour !')}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Lara Nails Studio</h3>
                    <p className="text-sm text-gray-500">Logo et branding de votre studio</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                      Nom du Studio
                    </label>
                    <input
                      type="text"
                      value={studioName}
                      onChange={e => setStudioName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                      Téléphone Professionnel
                    </label>
                    <input
                      type="text"
                      value={studioPhone}
                      onChange={e => setStudioPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={studioAddress}
                      onChange={e => setStudioAddress(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Horaires d&apos;Ouverture</h3>
                    <p className="text-xs text-gray-500">Définissez vos créneaux de disponibilité</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {schedule.map((d, i) => (
                    <div
                      key={d.day}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all"
                    >
                      <span className="text-sm font-medium w-24">{d.day}</span>
                      <div className="flex items-center gap-4">
                        {d.active ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={d.open}
                              onChange={e => updateScheduleTime(i, 'open', e.target.value)}
                              className="w-20 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none p-1"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="time"
                              value={d.close}
                              onChange={e => updateScheduleTime(i, 'close', e.target.value)}
                              className="w-20 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none p-1"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                            Fermé
                          </span>
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={d.active}
                            onChange={() => toggleDay(i)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e76f51] peer-checked:after:bg-white" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Profile Tab ── */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">Profil Administrateur</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    defaultValue="Lara"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="lara@nails.pro"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Notifications Tab ── */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">Préférences de Notification</h3>
              {[
                { label: 'Rappel de rendez-vous (24h avant)', desc: 'Notification push + email' },
                { label: 'Nouveau message Instagram', desc: 'Notification push' },
                { label: 'Annulation de rendez-vous', desc: 'Notification push + email' },
                { label: 'Rapport mensuel', desc: 'Email uniquement' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e76f51] peer-checked:after:bg-white" />
                  </label>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Security Tab ── */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">Sécurité du Compte</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#e76f51] transition-all"
                  />
                </div>
                <button
                  onClick={() => toast.success('Mot de passe mis à jour avec succès !')}
                  className="px-6 py-3 bg-[#e76f51] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                >
                  <Check className="w-4 h-4 inline mr-2" />
                  Changer le mot de passe
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Billing Tab ── */}
          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">Paiements & Facturation</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'CA du mois', value: '—' },
                  { label: 'Rendez-vous facturés', value: '—' },
                  { label: 'Panier moyen', value: '—' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-2xl text-center">
                    <p className="text-2xl font-bold text-[#e76f51] mb-1">{stat.value}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 text-center mt-4">
                Module de facturation avancée — bientôt disponible
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
