"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Camera,
  ExternalLink,
  Plus,
  Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

const contacts = [
  { id: 1, handle: "@ana_nails_fan", lastMsg: "Salut! Je voudrais agender...", time: "12:30", unread: 2, avatar: "A" },
  { id: 2, handle: "@be_costa", lastMsg: "Merci beaucoup pour hier!", time: "10:15", unread: 0, avatar: "B" },
  { id: 3, handle: "@clara_m", lastMsg: "Combien coûte le Nail Art?", time: "Hier", unread: 0, avatar: "C" },
];

export const dynamic = 'force-dynamic';

export default function InboxPage() {
  const [selectedContact] = useState(contacts[0]);

  return (
    <div className="relative min-h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] flex gap-12 animate-in fade-in duration-1000 pb-10 bg-brand-ivory">
      {/* Overlay - The Silk Curtain (Instagram Integration) - Light Mode */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-white/40 backdrop-blur-xl rounded-[4rem] border border-black/5 shadow-luxury">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="max-w-xl text-center bg-white/90 border-[0.5px] border-brand-gold/30 p-8 sm:p-16 md:p-24 rounded-[3rem] md:rounded-[5rem] shadow-luxury relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />

          <div className="w-24 h-24 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-glow-gold relative">
            <Camera className="w-12 h-12 text-white" strokeWidth={1} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] rounded-[2.5rem] border-t-[0.5px] border-brand-gold/40"
            />
          </div>

          <Typography variant="h2" serif className="text-brand-black mb-6 tracking-tighter text-balance">Correspondance Instagram</Typography>
          <Typography variant="p" className="text-black/40 text-sm leading-relaxed mb-12 italic font-light text-balance">
             Élevez votre réactivité au rang d&apos;art. Centralisez vos échanges Instagram directement dans votre planner d&apos;exception.
          </Typography>

          <div className="space-y-6 text-balance text-balance">
            <Button
              variant="luxury"
              className="w-full h-20 group border-[0.5px] border-brand-gold/20 relative overflow-hidden text-white"
              onClick={() => window.open("https://github.com/GuiCena122/lara-nails/blob/main/src/lib/instagram/README.md", "_blank")}
            >
              <span className="relative z-10 tracking-[0.4em]">ACTIVER LE REGISTRE</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury" />
              <ExternalLink size={14} className="ml-3 relative z-10 opacity-60" />
            </Button>
            <Typography variant="label" className="text-[7px] opacity-20 tracking-[0.6em] font-black uppercase text-balance text-balance">REQUISITION VIA MÉTHODE META DEVELOPERS</Typography>
          </div>
        </motion.div>
      </div>

      {/* Main Content - The Stone Ledger (Blurred & Disabled) - Light Mode */}
      <div className="flex-1 flex gap-12 opacity-10 grayscale pointer-events-none select-none text-balance text-balance">
        {/* Contact List */}
        <div className={cn(
          "w-full md:w-96 bg-white rounded-[4rem] border-[0.5px] border-black/5 flex flex-col overflow-hidden shrink-0 shadow-sm"
        )}>
          <div className="p-10 border-b-[0.5px] border-black/5 bg-brand-ivory/10">
            <div className="flex items-center justify-between mb-8 text-balance text-balance">
               <Typography variant="h3" serif className="italic text-brand-black">Messages</Typography>
               <button className="text-brand-gold/40 hover:text-brand-gold transition-colors"><Plus size={18} /></button>
            </div>
            <div className="relative group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/20 group-focus-within:text-brand-gold transition-colors" />
              <input
                disabled
                type="text"
                placeholder="Parcourir les échanges..."
                className="w-full bg-transparent border-b-[0.5px] border-black/10 py-3 pl-8 pr-4 text-xs font-serif italic outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-1 text-balance text-balance text-balance">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "p-6 flex items-center gap-6 rounded-[2.5rem] transition-all duration-700 relative overflow-hidden group",
                  selectedContact.id === contact.id
                    ? "bg-brand-gold/5 border-[0.5px] border-brand-gold/20"
                    : "border-[0.5px] border-transparent"
                )}
              >
                <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center font-black text-brand-gold bg-white relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Typography variant="span" className="relative z-10">{contact.avatar}</Typography>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="span" className="text-xs font-bold tracking-tight text-brand-black">{contact.handle}</Typography>
                    <span className="text-[10px] opacity-20 uppercase tracking-widest font-black">{contact.time}</span>
                  </div>
                  <Typography variant="p" className="text-[10px] opacity-30 truncate italic leading-relaxed text-brand-black">{contact.lastMsg}</Typography>
                </div>
                {selectedContact.id === contact.id && (
                  <div className="absolute left-0 w-1 h-8 bg-brand-gold rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Placeholder (Editorial) - Light Mode */}
        <div className="flex-1 bg-white rounded-[4rem] border-[0.5px] border-black/5 flex flex-col overflow-hidden relative shadow-sm text-balance text-balance">
           <div className="p-10 border-b-[0.5px] border-black/5 bg-brand-ivory/10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full border border-brand-gold/10 bg-white" />
                 <div>
                    <Typography variant="span" className="text-sm font-bold tracking-tight text-brand-black uppercase">Correspondance Privée</Typography>
                    <Typography variant="label" className="text-[7px] text-green-600/40 block mt-1 tracking-[0.4em] font-black uppercase">ACTIF</Typography>
                 </div>
              </div>
           </div>

           <div className="flex-1 p-12 flex flex-col justify-center items-center opacity-[0.03] text-balance">
              <Typography variant="h1" className="text-[15vh] font-black tracking-tighter italic text-brand-black text-balance">LARA</Typography>
           </div>

           <div className="p-10 bg-brand-ivory/10 border-t-[0.5px] border-black/5">
              <div className="flex items-center gap-6">
                 <div className="flex-1 h-14 rounded-full border border-black/5 bg-white/50" />
                 <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center bg-white shadow-sm">
                    <Send size={16} className="text-brand-gold/20" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
