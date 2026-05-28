'use client'

import { useState, useMemo } from 'react'
import { Search, Send, Plus, Calendar, CheckCheck, ChevronLeft, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Message { id: number; text: string; sent: boolean; time: string }
interface Contact { id: number; handle: string; lastMsg: string; time: string; unread: number; avatar: string; messages: Message[] }

const init: Contact[] = [
  { id: 1, handle: '@ana_nails_fan', lastMsg: 'Je voudrais agender...', time: '12:30', unread: 2, avatar: 'A', messages: [
    { id: 1, text: "Bonjour Lara! J'adore votre travail 😍", sent: false, time: '12:20' },
    { id: 2, text: "Merci Ana! C'est très gentil.", sent: true, time: '12:25' },
    { id: 3, text: 'Je voudrais agender un Allongement Gel pour samedi.', sent: false, time: '12:30' },
  ]},
  { id: 2, handle: '@be_costa', lastMsg: 'Merci beaucoup!', time: '10:15', unread: 0, avatar: 'B', messages: [
    { id: 1, text: 'Merci beaucoup pour hier!', sent: false, time: '10:15' },
    { id: 2, text: "Avec plaisir! À bientôt ✨", sent: true, time: '10:20' },
  ]},
  { id: 3, handle: '@clara_m', lastMsg: 'Combien coûte le Nail Art?', time: 'Hier', unread: 0, avatar: 'C', messages: [
    { id: 1, text: 'Combien coûte le Nail Art?', sent: false, time: 'Hier' },
    { id: 2, text: 'Dès 15€ selon la complexité! 😊', sent: true, time: 'Hier' },
  ]},
]

export default function InboxPage() {
  const [cts, setCts] = useState(init)
  const [sel, setSel] = useState(1)
  const [input, setInput] = useState('')
  const [sterm, setSterm] = useState('')
  const [view, setView] = useState<'list'|'chat'>('list')
  const router = useRouter()

  const contact = cts.find(c => c.id === sel) || cts[0]
  const filtered = useMemo(() => cts.filter(c => c.handle.toLowerCase().includes(sterm.toLowerCase())), [cts, sterm])
  const totalUnread = cts.reduce((s, c) => s + c.unread, 0)

  const send = () => {
    const t = input.trim(); if (!t) return
    const now = new Date(); const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    setCts(prev => prev.map(c => c.id === sel ? { ...c, messages: [...c.messages, { id: Date.now(), text: t, sent: true, time }], lastMsg: t, time, unread: 0 } : c))
    setInput('')
  }

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] flex gap-4 animate-in fade-in">
      {/* List */}
      <div className={cn('w-full md:w-72 glass-dark rounded-2xl border border-white/5 flex flex-col shrink-0', view === 'list' ? 'flex' : 'hidden md:flex')}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-serif font-bold">Messages</h3>
            {totalUnread > 0 && <span className="bg-[#e76f51] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{totalUnread}</span>}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Rechercher..." value={sterm} onChange={e => setSterm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-[#e76f51]" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.map(c => (
            <div key={c.id} onClick={() => { setCts(prev => prev.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); setSel(c.id); setView('chat') }}
              className={cn('p-3 flex items-center gap-3 cursor-pointer transition-all border-l-2', sel === c.id ? 'bg-[#e76f51]/10 border-[#e76f51]' : 'border-transparent hover:bg-white/5')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center font-bold text-white relative shrink-0 text-sm">{c.avatar}<div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#251f1f] rounded-full" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5"><p className="text-sm font-bold truncate">{c.handle}</p><span className="text-[10px] text-gray-500 shrink-0">{c.time}</span></div>
                <div className="flex justify-between items-center"><p className="text-xs text-gray-400 truncate">{c.lastMsg}</p>{c.unread > 0 && <span className="bg-[#e76f51] text-white text-[10px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold shrink-0 ml-1">{c.unread}</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className={cn('flex-1 glass-dark rounded-2xl border border-white/5 flex flex-col', view === 'chat' ? 'flex' : 'hidden md:flex')}>
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('list')} className="md:hidden p-1.5 -ml-1 text-gray-400 hover:text-white rounded-xl"><ChevronLeft className="w-5 h-5" /></button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center font-bold text-sm">{contact.avatar}</div>
            <div><p className="text-sm font-bold">{contact.handle}</p><p className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> en ligne</p></div>
          </div>
          <button onClick={() => { router.push('/admin/calendar'); toast.info('Calendrier ouvert') }} className="p-2 text-gray-400 hover:text-[#e76f51] bg-white/5 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-bold px-3"><Calendar className="w-4 h-4" /> Créer RDV</button>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {contact.messages.map(m => (
            <div key={m.id} className={cn('flex', m.sent ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[75%] p-3 rounded-2xl', m.sent ? 'bg-[#e76f51] text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none')}>
                <p className="text-sm">{m.text}</p>
                <div className={cn('mt-1.5 flex items-center gap-1 text-[10px]', m.sent ? 'text-white/70 justify-end' : 'text-gray-500')}>{m.time}{m.sent && <CheckCheck className="w-3 h-3" />}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white/5 border-t border-white/5">
          <div className="flex items-center gap-3">
            <button onClick={() => toast.info('Pièce jointe bientôt')} className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white"><Plus className="w-4 h-4" /></button>
            <div className="flex-1 relative">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send() }} placeholder="Votre réponse..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm outline-none focus:border-[#e76f51]" />
              <button onClick={send} disabled={!input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#e76f51] hover:scale-110 disabled:opacity-30"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="hidden lg:flex w-64 glass-dark rounded-2xl border border-white/5 p-5 flex-col shrink-0">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl font-bold border-2 border-[#e76f51]/30">{contact.avatar}</div>
          <h4 className="font-serif font-bold">{contact.handle}</h4>
          <p className="text-xs text-gray-500">Abonnée depuis 6 mois</p>
        </div>
        <div className="mt-6 space-y-3 flex-1">
          <h5 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Détails</h5>
          <div className="bg-white/5 p-3 rounded-xl space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-500">RDVs :</span><span className="font-bold">{contact.messages.length}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Visite :</span><span className="font-bold">12 Mars</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">Note :</span><span className="text-amber-400 font-bold">5.0 ⭐</span></div>
          </div>
        </div>
        <button onClick={() => toast.info('Profil bientôt disponible')} className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-[#e76f51] hover:text-white flex items-center justify-center gap-2 mt-auto"><MessageCircle className="w-3.5 h-3.5" /> Profil complet</button>
      </div>
    </div>
  )
}
