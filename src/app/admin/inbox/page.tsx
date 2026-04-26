"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MessageCircle,
  MoreHorizontal,
  Send,
  Plus,
  Calendar,
  Info,
  CheckCheck,
  ChevronLeft,
  Camera,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const contacts = [
  { id: 1, handle: "@ana_nails_fan", lastMsg: "Salut! Je voudrais agender...", time: "12:30", unread: 2, avatar: "A" },
  { id: 2, handle: "@be_costa", lastMsg: "Merci beaucoup pour hier!", time: "10:15", unread: 0, avatar: "B" },
  { id: 3, handle: "@clara_m", lastMsg: "Combien coûte le Nail Art?", time: "Hier", unread: 0, avatar: "C" },
];

const messages = [
  { id: 1, text: "Bonjour Lara! J'adore votre trabalho 😍", sent: false, time: "12:20" },
  { id: 2, text: "Merci Ana! C'est très gentil.", sent: true, time: "12:25" },
  { id: 3, text: "Je voudrais agender un Allongement Gel pour samedi prochain. Est-ce possible ?", sent: false, time: "12:30" },
];

export const dynamic = 'force-dynamic';

export default function InboxPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [msgInput, setMsgInput] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  return (
    <div className="relative h-[calc(100vh-160px)] flex gap-4 md:gap-6 animate-in fade-in duration-500">
      {/* Overlay - Instagram Pending */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#1a1a1a]/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center bg-[#0D0D0D] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4">Instagram Inbox</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            L&apos;intégration directe avec vos messages Instagram est en cours de configuration. Pour l&apos;activer, veuillez suivre os passos no guia técnico.
          </p>
          <a
            href="https://github.com/GuiCena122/lara-nails/blob/main/src/lib/instagram/README.md"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl transition-all text-sm"
          >
            Consulter le guide d&apos;activation <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Main Content (Blurred) */}
      <div className="flex-1 flex gap-4 md:gap-6 opacity-30 pointer-events-none grayscale-[0.5]">
        {/* Contact List */}
        <div className={cn(
          "w-full md:w-80 glass-dark rounded-3xl border border-white/5 flex flex-col overflow-hidden shrink-0",
          mobileView === "list" ? "flex" : "hidden md:flex"
        )}>
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-serif font-bold mb-4">Messages</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#e76f51] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  setMobileView("chat");
                }}
                className={cn(
                  "p-4 flex items-center gap-4 cursor-pointer transition-all border-l-2",
                  selectedContact.id === contact.id
                    ? "bg-[#e76f51]/10 border-[#e76f51]"
                    : "border-transparent hover:bg-white/5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center font-bold text-white relative">
                  {contact.avatar}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold truncate">{contact.handle}</p>
                    <span className="text-[10px] text-gray-500">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 truncate">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="bg-[#e76f51] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 glass-dark rounded-3xl border border-white/5 flex flex-col overflow-hidden",
          mobileView === "chat" ? "flex" : "hidden md:flex"
        )}>
          {/* Chat Header */}
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setMobileView("list")}
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
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-[#e76f51] transition-all bg-white/5 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-bold px-4">
                <Calendar className="w-4 h-4" /> Créer RDV
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-all"><MessageCircle className="w-5 h-5" /></button>
              <button className="p-2 text-gray-400 hover:text-white transition-all"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-8 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.sent ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[70%] p-4 rounded-2xl relative",
                  msg.sent
                    ? "bg-[#e76f51] text-white rounded-tr-none"
                    : "bg-white/10 text-gray-200 rounded-tl-none"
                )}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={cn(
                    "mt-2 flex items-center gap-1 text-[10px]",
                    msg.sent ? "text-white/70 justify-end" : "text-gray-500"
                  )}>
                    {msg.time}
                    {msg.sent && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all"><Plus className="w-5 h-5" /></button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  placeholder="Écrivez votre réponse..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-sm outline-none focus:border-[#e76f51] transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#e76f51] hover:scale-110 transition-all">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="hidden lg:block w-72 glass-dark rounded-3xl border border-white/5 p-6 space-y-8 shrink-0">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl font-bold border-2 border-[#e76f51]/30">
              {selectedContact.avatar}
            </div>
            <h4 className="font-serif font-bold text-lg">{selectedContact.handle}</h4>
            <p className="text-xs text-gray-500">Abonnée depuis 6 mois</p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Détails de la cliente</h5>
            <div className="bg-white/5 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between text-xs"><span className="text-gray-500">RDVs passés :</span><span className="font-bold">4</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Dernière visite :</span><span className="font-bold">12 Mars</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Note :</span><span className="text-amber-400 font-bold">5.0 ⭐</span></div>
            </div>
          </div>

          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-[#e76f51] hover:text-white transition-all flex items-center justify-center gap-2">
            <Info className="w-4 h-4" /> Voir profil complet
          </button>
        </div>
      </div>
    </div>
  );
}
