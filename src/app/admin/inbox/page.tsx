"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Camera,
  ExternalLink
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
  const [mobileView] = useState<"list" | "chat">("list");

  return (
    <div className="relative h-[calc(100vh-160px)] flex gap-8 md:gap-12 animate-in fade-in duration-1000">
      {/* Overlay - Instagram Pending */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-[#0B0B0B]/40 backdrop-blur-xl rounded-[4rem] border border-white/5 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-center glass-luxury border border-brand-gold/20 p-12 md:p-16 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />

          <div className="w-24 h-24 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <Camera className="w-12 h-12 text-white" />
          </div>

          <Typography variant="h2" serif className="text-brand-ivory mb-6 tracking-tighter">Instagram Inbox</Typography>
          <Typography variant="p" className="text-brand-ivory/50 text-sm leading-relaxed mb-10 italic">
            Connectez votre compte professionnel pour centraliser vos échanges et offrir une réactivité hors pair à vos clientes.
          </Typography>

          <div className="space-y-4">
            <Button
              variant="luxury"
              className="w-full py-7 group"
              onClick={() => window.open("https://github.com/GuiCena122/lara-nails/blob/main/src/lib/instagram/README.md", "_blank")}
            >
              ACTIVER L&apos;INTÉGRATION <ExternalLink size={14} className="ml-3 group-hover:scale-110 transition-transform" />
            </Button>
            <Typography variant="label" className="text-[7px] opacity-30 tracking-[0.4em]">CONFIGURATION REQUISE VIA META DEVELOPERS</Typography>
          </div>
        </motion.div>
      </div>

      {/* Main Content (Blurred & Disabled) */}
      <div className="flex-1 flex gap-8 md:gap-12 opacity-10 grayscale pointer-events-none select-none text-balance">
        {/* Contact List */}
        <div className={cn(
          "w-full md:w-96 glass-luxury rounded-[3rem] border border-white/5 flex flex-col overflow-hidden shrink-0",
          mobileView === "list" ? "flex" : "hidden md:flex"
        )}>
          <div className="p-8 border-b border-white/5">
            <Typography variant="h4" serif className="mb-6">Messages</Typography>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                disabled
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-2 text-balance">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "p-5 flex items-center gap-5 rounded-[2rem] transition-all border-l-4",
                  selectedContact.id === contact.id
                    ? "bg-brand-gold/10 border-brand-gold"
                    : "border-transparent"
                )}
              >
                <div className="w-14 h-14 rounded-full bg-brand-black border border-brand-gold/20 flex items-center justify-center font-black text-brand-gold">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="span" className="text-xs font-bold truncate">{contact.handle}</Typography>
                    <span className="text-[10px] opacity-30">{contact.time}</span>
                  </div>
                  <Typography variant="p" className="text-[10px] opacity-40 truncate">{contact.lastMsg}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
