"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    router.push("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, href: "/admin" },
    { id: "inbox", label: "Instagram Inbox", icon: MessageSquare, href: "/admin/inbox", badge: 3 },
    { id: "calendar", label: "Calendrier", icon: Calendar, href: "/admin/calendar" },
    { id: "clients", label: "Clientes", icon: Users, href: "/admin/clients" },
    { id: "settings", label: "Paramètres", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#251f1f] text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 border-r border-white/10 flex-col fixed inset-y-0 left-0 bg-[#251f1f] z-40">
        <div className="p-8">
          <Link href="/" className="text-xl font-serif font-bold gradient-text">
            Lara Pro
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                activeTab === item.id 
                  ? "bg-[#e76f51]/20 text-[#e76f51] border border-[#e76f51]/30" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-[#e76f51] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all w-full text-sm font-medium">
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64 pb-20 md:pb-0">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-[#251f1f]/80 backdrop-blur-md z-30">
          <h2 className="text-sm font-medium text-gray-400">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => toast.info("Aucune nouvelle notification")} className="relative p-2 text-gray-400 hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#e76f51] rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">Lara Nails</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e76f51] to-[#a67c2e] flex items-center justify-center text-xs font-bold shrink-0">
                M
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#251f1f]/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <div className="flex items-center justify-around p-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16",
                activeTab === item.id 
                  ? "text-[#e76f51]" 
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              <div className="relative">
                <item.icon className="w-5 h-5 mb-1" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e76f51] rounded-full border border-[#251f1f]" />
                )}
              </div>
              <span className="text-[9px] font-medium truncate w-full text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
