"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Appointment } from "@/lib/types";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState([
    { label: "CHIFFRE D'AFFAIRES", value: "0 €", trend: "+0%", positive: true, icon: DollarSign },
    { label: "CLIENTES ACTIVES", value: "0", trend: "+0%", positive: true, icon: Users },
    { label: "RENDEZ-VOUS", value: "0", trend: "+0%", positive: true, icon: Calendar },
    { label: "RÉTENTION", value: "100%", trend: "+0%", positive: true, icon: TrendingUp },
  ]);

  const fetchData = useCallback(async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      const typedData = data as Appointment[];
      setAppointments(typedData);

      const totalRevenue = typedData.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
      const uniqueClients = new Set(typedData.map(a => a.client_email || a.client_phone)).size;
      const totalAppointments = typedData.length;

      setStats([
        { label: "CHIFFRE D'AFFAIRES", value: `${totalRevenue} €`, trend: "+12.5%", positive: true, icon: DollarSign },
        { label: "CLIENTES ACTIVES", value: uniqueClients.toString(), trend: "+8.2%", positive: true, icon: Users },
        { label: "RENDEZ-VOUS", value: totalAppointments.toString(), trend: "+5.4%", positive: true, icon: Calendar },
        { label: "RÉTENTION", value: "78%", trend: "+5.1%", positive: true, icon: TrendingUp },
      ]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const displayAppointments = appointments.slice(0, 5);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 animate-in fade-in duration-1000 pb-20 text-balance bg-brand-ivory min-h-screen"
    >
      {/* Planner Header - Light Mode */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-[0.5px] border-black/10 pb-12">
        <div>
          <Typography variant="label" className="text-brand-gold mb-4 block tracking-[0.4em] font-black uppercase">PLANNER ÉDITORIAL</Typography>
          <Typography variant="h1" serif className="text-6xl lg:text-8xl tracking-tighter text-brand-black text-balance">Vue <br /> <span className="gold-text-shine italic text-balance">d&apos;ensemble.</span></Typography>
        </div>
        <div className="flex flex-col items-start md:items-end">
           <Typography variant="h3" serif className="text-black/10 mb-2 font-black uppercase">2026</Typography>
           <Typography variant="span" className="text-[10px] font-black tracking-[0.5em] text-brand-gold uppercase">AVRIL • SEMAINE 17</Typography>
        </div>
      </div>

      {/* Stats - Light Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.5px] bg-black/5 border-[0.5px] border-black/5 text-balance">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white p-10 group hover:bg-brand-ivory transition-colors duration-700 shadow-sm text-balance"
          >
            <div className="flex justify-between items-start mb-10 text-balance">
              <Typography variant="label" className="text-[8px] opacity-40 font-black uppercase">{stat.label}</Typography>
              <stat.icon size={14} className="text-brand-gold/60 group-hover:text-brand-gold transition-colors" />
            </div>
            <Typography variant="h2" serif className="text-5xl text-brand-black group-hover:scale-105 transition-transform duration-700 origin-left mb-4">{stat.value}</Typography>
            <div className={cn(
              "flex items-center gap-2 text-[9px] font-black tracking-widest",
              stat.positive ? "text-green-600" : "text-rose-600"
            )}>
              {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-16 text-balance">
        {/* Main Feed: The Silk List (Light) */}
        <motion.div variants={itemVariants} className="lg:col-span-8 text-balance">
           <div className="flex items-center justify-between mb-12 text-balance">
              <Typography variant="h3" serif className="text-3xl italic text-brand-black">Agenda Courant</Typography>
              <Link href="/admin/calendar" className="group flex items-center gap-3">
                 <Typography variant="label" className="text-[8px] text-brand-black/40 group-hover:text-brand-gold transition-colors font-black uppercase">VOIR LE PLANNER COMPLET</Typography>
                 <ArrowRight size={12} className="text-brand-gold group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>

           <div className="space-y-[0.5px] bg-black/5 border-[0.5px] border-black/5 rounded-[3rem] overflow-hidden shadow-sm text-balance">
              {displayAppointments.map((apt) => (
                <div key={apt.id} className="bg-white p-8 flex items-center justify-between group hover:bg-brand-ivory transition-all duration-500 text-balance">
                   <div className="flex items-center gap-10 text-balance">
                      <Typography variant="h4" serif className="text-brand-gold text-2xl w-20 shrink-0">{apt.appointment_time}</Typography>
                      <div className="h-12 w-[0.5px] bg-black/10" />
                      <div>
                         <Typography variant="span" className="text-sm font-bold block mb-1 tracking-tight text-brand-black uppercase">{apt.client_name}</Typography>
                         <Typography variant="label" className="text-[7px] opacity-40 tracking-[0.3em] font-black uppercase">{apt.service_name}</Typography>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        apt.status === "confirmed" ? "bg-brand-gold shadow-glow-gold" : "bg-black/5"
                      )} />
                      <Typography variant="label" className="text-[8px] opacity-20 font-black uppercase">{apt.status}</Typography>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Sidebar: Planner Metadata (Light) */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-12">
           <div className="p-10 bg-white border-[0.5px] border-brand-gold/20 rounded-[3rem] shadow-sm text-balance">
              <Typography variant="h4" serif className="mb-8 text-2xl text-brand-black">Notes de la Session</Typography>
              <Typography variant="p" className="text-xs italic leading-relaxed text-brand-black/40 mb-10 text-balance">
                 &quot;Le détail n&apos;est pas un détail, c&apos;est le produit lui-même.&quot; — Focus sur la qualité des cuticules pour la série de demain.
              </Typography>
              <Link href="/admin/calendar">
                <Button variant="luxury" className="w-full h-16 border-[0.5px] border-brand-gold/20 group text-white">
                   <span className="relative z-10 tracking-[0.3em]">AJOUTER AU PLANNER</span>
                </Button>
              </Link>
           </div>

           <div className="p-10 border-[0.5px] border-black/5 rounded-[3rem] bg-white shadow-sm text-balance">
              <Typography variant="label" className="text-brand-gold mb-6 block font-black uppercase">OBJECTIF SEMAINE</Typography>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-balance">
                    <Typography variant="span" className="text-[10px] opacity-60 font-bold uppercase">RETENTION CLIENTE</Typography>
                    <Typography variant="span" className="text-brand-gold font-bold uppercase">85%</Typography>
                 </div>
                 <div className="w-full h-[1px] bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="h-full bg-brand-gold shadow-glow-gold"
                    />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
