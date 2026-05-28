"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Typography } from "@/components/ui/Typography";
import { motion } from "framer-motion";

const menuItems = [
  { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, href: "/admin" },
  { id: "inbox", label: "Instagram Inbox", icon: MessageSquare, href: "/admin/inbox", badge: 3 },
  { id: "calendar", label: "Calendrier", icon: Calendar, href: "/admin/calendar" },
  { id: "clients", label: "Clientes", icon: Users, href: "/admin/clients" },
  { id: "settings", label: "Paramètres", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const currentTab = menuItems.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))?.id;
    if (currentTab) {
      const timer = setTimeout(() => setActiveTab(currentTab), 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
    } else {
      toast.success("À bientôt, Lara.");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-ivory text-brand-black selection:bg-brand-gold selection:text-white relative">
      {/* Sidebar Desktop - Alabaster & Gold Style */}
      <aside className="hidden md:flex w-72 border-r border-black/5 flex-col fixed inset-y-0 left-0 bg-white z-40">
        <div className="p-10 mb-4 text-center md:text-left">
          <Link href="/" className="group flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl border border-brand-gold/30 flex items-center justify-center text-brand-gold text-lg font-black group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-sm">
              L
            </div>
            <Typography variant="h4" serif className="text-brand-black tracking-tighter">
              Lara <span className="text-brand-gold">Pro</span>
            </Typography>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-3">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-5 py-4 rounded-3xl transition-all duration-500 group relative overflow-hidden",
                  isActive
                    ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20 shadow-sm"
                    : "text-black/40 hover:text-brand-black hover:bg-black/[0.02]"
                )}
              >
                {isActive && (
                   <motion.div
                     layoutId="activeGlow"
                     className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent opacity-50"
                   />
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon className={cn("w-5 h-5 transition-colors duration-500", isActive ? "text-brand-gold" : "text-black/20 group-hover:text-brand-gold/60")} />
                  <Typography variant="span" className={cn("text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500", isActive ? "opacity-100" : "opacity-80")}>
                    {item.label}
                  </Typography>
                </div>
                {item.badge ? (
                  <span className="bg-brand-gold text-white text-[9px] px-2 py-0.5 rounded-full font-black shadow-sm relative z-10">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={cn("w-3 h-3 transition-all duration-500 relative z-10", isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2")} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-rose-500/60 hover:text-rose-600 hover:bg-rose-500/5 rounded-[2rem] transition-all w-full text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <LogOut className="w-4 h-4" />
            Quitter
          </button>
        </div>
      </aside>

      {/* Main Content - Light Mode */}
      <main className="flex-1 flex flex-col md:ml-72 pb-28 md:pb-0 relative">
        {/* Header */}
        <header className="h-16 md:h-24 border-b border-black/5 flex items-center justify-between px-4 md:px-16 sticky top-0 bg-white/80 backdrop-blur-2xl z-30">
          <div className="flex flex-col">
            <Typography variant="label" className="text-[7px] mb-1 font-black opacity-30 uppercase tracking-widest">NAVIGATION</Typography>
            <Typography variant="h3" serif className="text-brand-black text-2xl">
              {menuItems.find(i => i.id === activeTab)?.label}
            </Typography>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <button onClick={() => toast.info("Aucune nouvelle notification")} className="relative p-3 text-black/20 hover:text-brand-gold transition-all duration-500 group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-brand-gold rounded-full shadow-[0_0_12px_rgba(201,166,107,0.4)]" />
            </button>

            <div className="flex items-center gap-5 group cursor-pointer p-1 pr-4 rounded-full border border-black/5 bg-white hover:border-brand-gold/30 transition-all duration-500 shadow-sm">
              <div className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center bg-brand-ivory shadow-inner overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Typography variant="h4" serif className="text-brand-gold text-lg relative z-10">L</Typography>
              </div>
              <div className="text-right hidden sm:block">
                <Typography variant="span" className="text-[9px] font-black block leading-none mb-1 tracking-widest text-brand-black uppercase">LARA NAILS</Typography>
                <Typography variant="label" className="text-[6px] font-black opacity-30 uppercase tracking-widest">DIRECTRICE</Typography>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden p-4 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Light Mode */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-[2.5rem] z-50 shadow-luxury p-2">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-2xl transition-all relative",
                  isActive ? "text-brand-gold scale-110" : "text-black/30 hover:text-black/60"
                )}
              >
                <item.icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute -bottom-1 w-1 h-1 bg-brand-gold rounded-full shadow-[0_0_8px_rgba(201,166,107,0.4)]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
