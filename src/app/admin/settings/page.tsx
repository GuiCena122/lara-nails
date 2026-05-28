'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Store, Bell, Lock, CreditCard, Camera, Save, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

type DayS = { day: string; open: string; close: string; active: boolean }

const DEFAULT: DayS[] = [
  { day: 'Lundi', open: '09:00', close: '19:00', active: true },
  { day: 'Mardi', open: '09:00', close: '19:00', active: true },
  { day: 'Mercredi', open: '09:00', close: '19:00', active: true },
  { day: 'Jeudi', open: '09:00', close: '19:00', active: true },
  { day: 'Vendredi', open: '09:00', close: '19:00', active: true },
  { day: 'Samedi', open: '10:00', close: '17:00', active: true },
  { day: 'Dimanche', open: '—', close: '—', active: false },
]

function SecurityTab() {
  const supabase = createClient()
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [updating, setUpdating] = useState(false)

  const changePassword = async () => {
    if (!currentPw || !newPw) { toast.error('Remplissez les deux champs.'); return }
    if (newPw.length < 6) { toast.error('6 caractères minimum.'); return }
    setUpdating(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Mot de passe mis à jour !')
      setCurrentPw('')
      setNewPw('')
    }
    setUpdating(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
      <h3 className="font-serif font-bold">Sécurité</h3>
      <div className="space-y-3">
        <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Mot de passe actuel</label><input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
        <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nouveau mot de passe</label><input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="6 caractères minimum" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
        <button onClick={changePassword} disabled={updating} className="px-5 py-3 bg-[#e76f51] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center gap-2">
          {updating ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          Changer le mot de passe
        </button>
      </div>
    </motion.div>
  )
}

const tabs = [
  { id: 'salon', label: 'Studio', icon: Store },
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Lock },
  { id: 'billing', label: 'Paiements', icon: CreditCard },
]

export default function SettingsPage() {
  const supabase = createClient()
  const [tab, setTab] = useState('salon')
  const [name, setName] = useState('Lara Cristina')
  const [phone, setPhone] = useState('+33 07 58 78 07 74')
  const [addr, setAddr] = useState('05 Route de Combault, 94350 Villiers-sur-Marne')
  const [sched, setSched] = useState<DayS[]>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lara-settings')
    if (saved) {
      try {
        const p = JSON.parse(saved)
        if (p.name) setName(p.name)
        if (p.phone) setPhone(p.phone)
        if (p.addr) setAddr(p.addr)
        if (p.sched) setSched(p.sched)
      } catch { /* ignore parse errors */ }
    }
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setAdminEmail(user.email)
    })
  }, [supabase])

  const save = () => {
    setSaving(true)
    localStorage.setItem('lara-settings', JSON.stringify({ name, phone, addr, sched }))
    setTimeout(() => { setSaving(false); toast.success('Modifications enregistrées !') }, 600)
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold">Paramètres</h2>
          <p className="text-gray-500 text-xs">Configurez votre studio.</p>
        </div>
        <button onClick={save} disabled={saving} className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50">
          {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          Enregistrer
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 glass-dark p-3 rounded-2xl border border-white/5 h-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all', tab === t.id ? 'bg-[#e76f51]/20 text-[#e76f51] border border-[#e76f51]/30' : 'text-gray-400 hover:text-white hover:bg-white/5')}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {tab === 'salon' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="glass-dark p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e76f51] to-[#a67c2e] flex items-center justify-center text-2xl font-bold border-2 border-white/5">L</div>
                    <label className="absolute -bottom-1 -right-1 p-1.5 bg-white text-black rounded-lg shadow cursor-pointer hover:scale-110"><Camera className="w-3.5 h-3.5" /><input type="file" className="hidden" accept="image/*" /></label>
                  </div>
                  <div><h3 className="font-bold">Lara Nails Studio</h3><p className="text-xs text-gray-500">Logo & branding</p></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1">Nom</label><input value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1">Téléphone</label><input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                  <div className="md:col-span-2 space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1">Adresse</label><input value={addr} onChange={e => setAddr(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><Clock className="w-5 h-5" /></div>
                  <div><h3 className="font-bold text-sm">Horaires</h3><p className="text-[10px] text-gray-500">Disponibilités</p></div>
                </div>
                <div className="space-y-3">
                  {sched.map((d, i) => (
                    <div key={d.day} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                      <span className="text-sm w-20">{d.day}</span>
                      <div className="flex items-center gap-3">
                        {d.active ? (
                          <div className="flex items-center gap-1.5">
                            <input type="time" value={d.open} onChange={e => setSched(prev => prev.map((x, j) => j === i ? { ...x, open: e.target.value } : x))} className="w-16 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none p-1" />
                            <span className="text-gray-500">-</span>
                            <input type="time" value={d.close} onChange={e => setSched(prev => prev.map((x, j) => j === i ? { ...x, close: e.target.value } : x))} className="w-16 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-[#e76f51] outline-none p-1" />
                          </div>
                        ) : <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Fermé</span>}
                        <label className="relative inline-flex cursor-pointer">
                          <input type="checkbox" checked={d.active} onChange={() => setSched(prev => prev.map((x, j) => j === i ? { ...x, active: !x.active } : x))} className="sr-only peer" />
                          <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e76f51] peer-checked:after:bg-white" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-serif font-bold">Profil Administrateur</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nom</label><input defaultValue="Lara" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-[#e76f51]" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label><input value={adminEmail} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none text-gray-400 cursor-not-allowed" /></div>
              </div>
            </motion.div>
          )}

          {tab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-serif font-bold">Notifications</h3>
              {['Rappel RDV (24h avant)', 'Nouveau message', 'Annulation', 'Rapport mensuel'].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl"><span className="text-sm">{l}</span>
                  <label className="relative inline-flex cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e76f51] peer-checked:after:bg-white" /></label>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'security' && <SecurityTab />}

          {tab === 'billing' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-serif font-bold">Paiements</h3>
              <div className="grid grid-cols-3 gap-4">
                {[{ l: 'CA du mois', v: '—' }, { l: 'Rendez-vous', v: '—' }, { l: 'Panier moyen', v: '—' }].map((s, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl text-center"><p className="text-xl font-bold text-[#e76f51] mb-1">{s.v}</p><p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.l}</p></div>
                ))}
              </div>
              <p className="text-xs text-gray-600 text-center">Module de facturation — bientôt disponible</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
