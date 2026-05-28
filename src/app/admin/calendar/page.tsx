"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreVertical,
  X,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Appointment, Service } from "@/lib/types";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

const daysOfWeek = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

export const dynamic = 'force-dynamic';

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [dynamicAppointments, setDynamicAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAppointments = useCallback(async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_time', { ascending: true });

    if (data) setDynamicAppointments(data as Appointment[]);
  }, []);

  const fetchServices = useCallback(async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('name');
    if (data) setServices(data as Service[]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointments();
      fetchServices();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAppointments, fetchServices]);

  const getDayFromDate = (dateStr: string) => {
    if (!dateStr) return 0;
    const d = new Date(dateStr + 'T12:00:00');
    return d.getDate();
  };

  const dayAppointments = dynamicAppointments.filter(apt => {
    const aptDay = getDayFromDate(apt.appointment_date);
    return aptDay === selectedDay;
  });

  const hasAptOnDay = (day: number) => {
    return dynamicAppointments.some(apt => getDayFromDate(apt.appointment_date) === day);
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const date = `2026-04-${selectedDay.toString().padStart(2, '0')}`;
    const time = formData.get("appointment_time") as string;

    const hasConflict = dynamicAppointments.some(
      apt => apt.appointment_date === date && apt.appointment_time === time
    );

    if (hasConflict) {
      toast.error("Ce créneau est déjà occupé dans le planner.");
      setIsSubmitting(false);
      return;
    }

    const newApt = {
      client_name: formData.get("client_name") as string,
      service_name: formData.get("service_name") as string,
      appointment_date: date,
      appointment_time: time,
      status: "confirmed"
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([newApt])
      .select();

    if (error) {
      toast.error("Erreur de registre: " + error.message);
    } else if (data && data.length > 0) {
      setDynamicAppointments([...dynamicAppointments, data[0] as Appointment]);
      setIsModalOpen(false);
      toast.success("Inscrit dans le planner.");
    }
    setIsSubmitting(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
          <Typography variant="label" className="text-brand-gold mb-4 block tracking-[0.4em] font-black uppercase">AGENDA ÉDITORIAL</Typography>
          <Typography variant="h1" serif className="text-6xl lg:text-8xl tracking-tighter text-brand-black text-balance">Le <br /> <span className="gold-text-shine italic">Planner.</span></Typography>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6 text-balance">
           <div className="text-right text-balance">
              <Typography variant="h3" serif className="text-black/10 text-4xl font-black">Avril</Typography>
              <Typography variant="span" className="text-[10px] font-black tracking-[0.5em] text-brand-gold">CALENDRIER DE PRÉCISION</Typography>
           </div>
           <Button variant="luxury" size="default" className="h-14 px-10 border-[0.5px] border-brand-gold/20 group text-white" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-3" /> <span className="tracking-[0.2em]">NOUVEAU RDV</span>
           </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16 text-balance">
        {/* The Silk Grid (Calendar) - Light Mode */}
        <div className="lg:col-span-7">
           <div className="flex items-center justify-between mb-10 text-balance">
              <div className="flex gap-8">
                 <button className="text-black/20 hover:text-brand-gold transition-colors"><ChevronLeft size={24} /></button>
                 <button className="text-black/20 hover:text-brand-gold transition-colors"><ChevronRight size={24} /></button>
              </div>
              <Typography variant="span" className="text-[10px] font-black tracking-[0.3em] opacity-40 uppercase">Aujourd&apos;hui: 28 Avril</Typography>
           </div>

           <div className="grid grid-cols-7 gap-[0.5px] bg-black/5 border-[0.5px] border-black/5 overflow-hidden rounded-[2rem] shadow-sm">
              {daysOfWeek.map(d => (
                <div key={d} className="bg-white p-4 text-center border-b-[0.5px] border-black/5">
                   <Typography variant="label" className="text-[7px] font-black opacity-30">{d}</Typography>
                </div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i + 1)}
                  className={cn(
                    "aspect-square bg-white p-6 flex flex-col items-center justify-center relative transition-all duration-700 group",
                    selectedDay === i + 1 ? "bg-brand-ivory" : "hover:bg-brand-ivory/50"
                  )}
                >
                  <Typography
                    variant="h3"
                    serif
                    className={cn(
                      "text-2xl transition-all duration-500",
                      selectedDay === i + 1 ? "text-brand-gold scale-125" : "text-brand-black/20 group-hover:text-brand-black/60"
                    )}
                  >
                    {i + 1}
                  </Typography>

                  {hasAptOnDay(i + 1) && (
                    <div className={cn(
                      "absolute bottom-4 w-1 h-1 rounded-full transition-all duration-500",
                      selectedDay === i + 1 ? "bg-brand-gold shadow-glow-gold scale-150" : "bg-brand-gold/40"
                    )} />
                  )}

                  {selectedDay === i + 1 && (
                     <motion.div
                       layoutId="plannerSelect"
                       className="absolute inset-0 border-[0.5px] border-brand-gold/60 z-10"
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                  )}
                </button>
              ))}
           </div>
        </div>

        {/* Selected Day View: The Daily Ritual (Light Mode) */}
        <div className="lg:col-span-5 space-y-12">
           <div className="flex flex-col gap-2 text-balance">
              <Typography variant="label" className="text-brand-gold tracking-[0.4em] font-black uppercase">SÉANCE DU JOUR</Typography>
              <Typography variant="h2" serif className="text-5xl italic text-brand-black">{selectedDay} Avril</Typography>
           </div>

           <div className="space-y-[0.5px] bg-black/5 border-[0.5px] border-black/5 rounded-[3rem] overflow-hidden shadow-sm">
              {dayAppointments.length > 0 ? (
                dayAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white p-10 group hover:bg-brand-ivory transition-all duration-500">
                     <div className="flex justify-between items-start mb-8 text-balance">
                        <Typography variant="h3" serif className="text-brand-gold text-3xl">{apt.appointment_time}</Typography>
                        <button className="p-2 text-black/10 hover:text-brand-gold transition-colors"><MoreVertical size={16} /></button>
                     </div>
                     <Typography variant="span" className="text-lg font-bold block mb-2 tracking-tight text-brand-black uppercase">{apt.client_name}</Typography>
                     <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-brand-gold/20" />
                        <Typography variant="label" className="text-[8px] opacity-40 tracking-[0.3em] font-black uppercase">{apt.service_name}</Typography>
                     </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-20 text-center">
                   <Typography variant="p" className="font-serif italic text-black/20 text-xl text-balance">Aucun rituel prévu.</Typography>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* New Ritual Modal - Light Mode */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-balance">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative w-full max-w-xl bg-white border border-brand-gold/20 rounded-[4rem] p-12 md:p-16 shadow-luxury overflow-hidden text-balance"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none text-balance" />

              <div className="flex items-center justify-between mb-12 relative z-10 text-balance">
                <div>
                   <Typography variant="h3" serif className="text-brand-black mb-2">Inscrire au Planner</Typography>
                   <Typography variant="label" className="text-brand-gold tracking-[0.2em] font-black">RÉSERVATION MANUELLE</Typography>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-black/5 rounded-full hover:bg-white/10 transition-colors text-brand-gold">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddAppointment} className="space-y-10 relative z-10 text-balance">
                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase">NOM DE LA CLIENTE</Typography>
                  <input required name="client_name" type="text" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black" />
                </div>

                <div className="space-y-4 text-balance">
                  <Typography variant="label" className="px-2 font-black uppercase">SIGNATURE DU SOIN</Typography>
                  <select required name="service_name" className="w-full bg-white border-b-[0.5px] border-black/10 p-4 text-sm outline-none focus:border-brand-gold text-brand-black/60 appearance-none cursor-pointer">
                    {services.length > 0 ? (
                      services.map(s => <option key={s.id} value={s.name}>{s.name} — {s.price}</option>)
                    ) : (
                      <>
                        <option>Manucure Russe Signature</option>
                        <option>Nail Art d&apos;Auteur</option>
                        <option>Extension Gel Prestige</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-12 text-balance">
                  <div className="space-y-4 opacity-40">
                    <Typography variant="label" className="px-2 font-black text-balance uppercase">DATE DU PLANNER</Typography>
                    <div className="p-4 text-2xl font-serif italic text-brand-black">{selectedDay} Avril 2026</div>
                  </div>
                  <div className="space-y-4 text-balance">
                    <Typography variant="label" className="px-2 font-black text-balance uppercase">HEURE DU RITUEL</Typography>
                    <input required name="appointment_time" type="time" defaultValue="14:00" className="w-full bg-transparent border-b-[0.5px] border-black/10 p-4 text-2xl font-serif italic outline-none focus:border-brand-gold transition-all text-brand-black" />
                  </div>
                </div>

                <Button disabled={isSubmitting} type="submit" variant="luxury" size="lg" className="w-full h-20 group border-[0.5px] border-brand-gold/20 mt-8 text-white">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><span className="relative z-10 tracking-[0.4em]">SCELLER DANS L&apos;AGENDA</span><div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
