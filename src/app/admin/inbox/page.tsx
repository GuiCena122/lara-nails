'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Send,
  Plus,
  Calendar,
  MoreHorizontal,
  CheckCheck,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Message {
  id: number
  text: string
  sent: boolean
  time: string
}

interface Contact {
  id: number
  handle: string
  lastMsg: string
  time: string
  unread: number
  avatar: string
  messages: Message[]
}

const initialContacts: Contact[] = [
  {
    id: 1,
    handle: '@ana_nails_fan',
    lastMsg: 'Je voudrais agender un Allongement Gel...',
    time: '12:30',
    unread: 2,
    avatar: 'A',
    messages: [
      { id: 1, text: "Bonjour Lara! J'adore votre travail 😍", sent: false, time: '12:20' },
      { id: 2, text: "Merci Ana! C'est très gentil.", sent: true, time: '12:25' },
      {
        id: 3,
        text: 'Je voudrais agender un Allongement Gel pour samedi prochain. Est-ce possible ?',
        sent: false,
        time: '12:30',
      },
    ],
  },
  {
    id: 2,
    handle: '@be_costa',
    lastMsg: 'Merci beaucoup pour hier!',
    time: '10:15',
    unread: 0,
    avatar: 'B',
    messages: [
      { id: 1, text: 'Merci beaucoup pour hier!', sent: false, time: '10:15' },
      { id: 2, text: "Avec plaisir Béa! À bientôt ✨", sent: true, time: '10:20' },
    ],
  },
  {
    id: 3,
    handle: '@clara_m',
    lastMsg: 'Combien coûte le Nail Art?',
    time: 'Hier',
    unread: 0,
    avatar: 'C',
    messages: [
      { id: 1, text: 'Bonjour! Combien coûte le Nail Art?', sent: false, time: 'Hier' },
      { id: 2, text: "Bonjour Clara! Le Nail Art démarre à 15€ selon la complexité. Je vous envoie mon catalogue si vous voulez 😊", sent: true, time: 'Hier' },
    ],
  },
]

export default function InboxPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedId, setSelectedId] = useState(contacts[0].id)
  const [msgInput, setMsgInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const router = useRouter()

  // ---- derived ----
  const selectedContact = contacts.find(c => c.id === selectedId) || contacts[0]

  const filteredContacts = useMemo(
    () => contacts.filter(c => c.handle.toLowerCase().includes(searchTerm.toLowerCase())),
    [contacts, searchTerm]
  )

  // ---- actions ----
  const handleSend = () => {
    const text = msgInput.trim()
    if (!text) return

    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const newMsg: Message = {
      id: Date.now(),
      text,
      sent: true,
      time,
    }

    setContacts(prev =>
      prev.map(c =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMsg: text,
              time,
              unread: 0,
            }
          : c
      )
    )
    setMsgInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSelectContact = (contact: Contact) => {
    setContacts(prev =>
      prev.map(c => (c.id === contact.id ? { ...c, unread: 0 } : c))
    )
    setSelectedId(contact.id)
    setMobileView('chat')
  }

  const totalUnread = contacts.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div className="h-[calc(100vh-160px)] flex gap-4 md:gap-6 animate-in fade-in">
      {/* Contact List */}
      <div
        className={cn(
          'w-full md:w-80 glass-dark rounded-3xl border border-white/5 flex flex-col overflow-hidden shrink-0',
          mobileView === 'list' ? 'flex' : 'hidden md:flex'
        )}
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-bold">Messages</h3>
            {totalUnread > 0 && (
              <span className="bg-[#e76f51] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {totalUnread} nouveau{totalUnread > 1 ? 'x' : ''}
              </span>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#e76f51] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs">
              Aucun contact trouvé
            </div>
          ) : (
            filteredContacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={cn(
                  'p-4 flex items-center gap-4 cursor-pointer transition-all border-l-2',
                  selectedId === contact.id
                    ? 'bg-[#e76f51]/10 border-[#e76f51]'
                    : 'border-transparent hover:bg-white/5'
                )}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center font-bold text-white relative shrink-0">
                  {contact.avatar}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold truncate">{contact.handle}</p>
                    <span className="text-[10px] text-gray-500 shrink-0 ml-2">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 truncate">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="bg-[#e76f51] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shrink-0 ml-2">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={cn(
          'flex-1 glass-dark rounded-3xl border border-white/5 flex flex-col overflow-hidden',
          mobileView === 'chat' ? 'flex' : 'hidden md:flex'
        )}
      >
        {/* Chat Header */}
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileView('list')}
              className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-all rounded-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center font-bold">
              {selectedContact.avatar}
            </div>
            <div>
              <p className="text-sm font-bold">{selectedContact.handle}</p>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> en ligne
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              router.push('/admin/calendar')
              toast.info('Calendrier ouvert — créez un rendez-vous pour cette cliente')
            }}
            className="p-2 text-gray-400 hover:text-[#e76f51] transition-all bg-white/5 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-bold px-4"
          >
            <Calendar className="w-4 h-4" /> Créer RDV
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {selectedContact.messages.map(msg => (
            <div key={msg.id} className={cn('flex', msg.sent ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[75%] p-4 rounded-2xl relative',
                  msg.sent
                    ? 'bg-[#e76f51] text-white rounded-tr-none'
                    : 'bg-white/10 text-gray-200 rounded-tl-none'
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div
                  className={cn(
                    'mt-2 flex items-center gap-1 text-[10px]',
                    msg.sent ? 'text-white/70 justify-end' : 'text-gray-500'
                  )}
                >
                  {msg.time}
                  {msg.sent && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 bg-white/5 border-t border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toast.info('Pièce jointe — bientôt disponible')}
              className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre réponse..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 pr-12 text-sm outline-none focus:border-[#e76f51] transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!msgInput.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#e76f51] hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="hidden lg:flex w-72 glass-dark rounded-3xl border border-white/5 p-6 flex-col shrink-0">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl font-bold border-2 border-[#e76f51]/30">
            {selectedContact.avatar}
          </div>
          <h4 className="font-serif font-bold text-lg">{selectedContact.handle}</h4>
          <p className="text-xs text-gray-500">Abonnée depuis 6 mois</p>
        </div>

        <div className="mt-8 space-y-4 flex-1">
          <h5 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            Détails de la cliente
          </h5>
          <div className="bg-white/5 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">RDVs passés :</span>
              <span className="font-bold">{selectedContact.messages.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Dernière visite :</span>
              <span className="font-bold">12 Mars</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Note :</span>
              <span className="text-amber-400 font-bold">5.0 ⭐</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => toast.info('Profil complet bientôt disponible')}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-[#e76f51] hover:text-white transition-all flex items-center justify-center gap-2 mt-auto"
        >
          <MessageCircle className="w-4 h-4" /> Voir profil complet
        </button>
      </div>
    </div>
  )
}
