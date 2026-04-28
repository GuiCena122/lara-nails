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
  Download,
  Loader2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Appointment } from "@/lib/types";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState([
    { label: "Chiffre d'Affaires", value: "0 €", trend: "+0%", positive: true, icon: DollarSign },
    { label: "Clientes", value: "0", trend: "+0%", positive: true, icon: Users },
    { label: "Rendez-vous", value: "0", trend: "+0%", positive: true, icon: Calendar },
    { label: "Taux de Rétention", value: "100%", trend: "+0%", positive: true, icon: TrendingUp },
  ]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const router = useRouter();

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
        { label: "Chiffre d'Affaires", value: `${totalRevenue} €`, trend: "+12.5%", positive: true, icon: DollarSign },
        { label: "Clientes", value: uniqueClients.toString(), trend: "+8.2%", positive: true, icon: Users },
        { label: "Rendez-vous", value: totalAppointments.toString(), trend: "+5.4%", positive: true, icon: Calendar },
        { label: "Taux de Rétention", value: "78%", trend: "+5.1%", positive: true, icon: TrendingUp },
      ]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const displayAppointments = appointments.slice(0, 5);

  const handleAction = async (action: string) => {
    if (action === "Ajouter um rendez-vous") {
      router.push("/admin/calendar");
    } else if (action === "Générer um rapport mensuel") {
      setIsGeneratingReport(true);
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Génération du rapport...',
          success: () => {
            setIsGeneratingReport(false);
            return 'Rapport prêt.';
          },
          error: 'Erreur.',
        }
      );
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 animate-in fade-in duration-1000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group glass-luxury p-8 rounded-[2.5rem] border border-white/5 hover:border-brand-gold/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-3 bg-brand-gold/5 rounded-2xl border border-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-lg">
                <stat.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest",
                stat.positive ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"
              )}>
                {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.trend}
              </div>
            </div>
            <Typography variant="h2" serif className="text-brand-ivory mb-1 relative z-10 tracking-tighter">{stat.value}</Typography>
            <Typography variant="label" className="text-[8px] opacity-40 relative z-10 tracking-[0.4em] uppercase">{stat.label}</Typography>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 glass-luxury p-10 md:p-14 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden text-balance"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-12 relative z-10">
            <div>
              <Typography variant="h3" serif className="text-brand-ivory mb-1">Rendez-vous Récents</Typography>
              <Typography variant="label" className="text-[8px] opacity-30 tracking-[0.4em] uppercase text-balance text-balance">DERNIÈRES ACTIVITÉS DU STUDIO</Typography>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/calendar')}>VOIR TOUT</Button>
          </div>

          <div className="space-y-4 relative z-10">
            {displayAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-brand-gold/20 transition-all duration-500 group cursor-default">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center font-black text-brand-gold bg-brand-black shadow-xl group-hover:bg-brand-gold group-hover:text-brand-black transition-all">
                    {apt.client_name ? apt.client_name[0] : '?'}
                  </div>
                  <div>
                    <Typography variant="span" className="text-sm font-bold block mb-1">{apt.client_name}</Typography>
                    <Typography variant="label" className="text-[8px] opacity-40 italic tracking-widest">{apt.service_name} • {apt.appointment_date}</Typography>
                  </div>
                </div>
                <div className="text-right">
                  <Typography variant="h4" serif className="text-brand-gold text-2xl mb-1">{apt.appointment_time}</Typography>
                  <span className={cn(
                    "text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border",
                    apt.status === "confirmed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
                  )}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 space-y-8"
        >
          <div className="glass-luxury p-10 rounded-[4rem] border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-50" />
             <Typography variant="h4" serif className="text-brand-ivory mb-8 relative z-10">Actions Rapides</Typography>
             <div className="space-y-4 relative z-10 text-balance">
               <Button variant="luxury" className="w-full justify-between group py-6" onClick={() => handleAction("Ajouter um rendez-vous")}>
                  NOUVEAU SOIN <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Button>
               <Button
                variant="outline"
                className="w-full justify-between py-6 border-white/5 hover:border-brand-gold/30"
                disabled={isGeneratingReport}
                onClick={() => handleAction("Générer um rapport mensuel")}
               >
                  {isGeneratingReport ? "GÉNÉRATION..." : "RAPPORT MENSUEL"}
                  {isGeneratingReport ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
               </Button>
             </div>
          </div>

          <div className="glass-luxury p-10 rounded-[4rem] border border-brand-gold/10 bg-brand-gold/[0.02]">
             <Typography variant="label" className="text-brand-gold mb-6 block tracking-[0.4em] uppercase text-balance text-balance">PENSE-BÊTE DU JOUR</Typography>
             <Typography variant="p" className="text-xs italic text-brand-ivory/60 leading-relaxed font-light text-balance text-balance">
                &quot;Le luxe n&apos;est pas le contraire de la pauvreté, mais de la vulgarité.&quot; — Coco Chanel
             </Typography>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
